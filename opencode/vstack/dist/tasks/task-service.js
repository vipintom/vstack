/**
 * Task service for vstack workflow
 * Manages task creation, assignment, dependencies, and state transitions
 */
import { v4 as uuidv4 } from "uuid";
import { taskId, deliveryId, phaseRunId, } from "../schemas/types.js";
import { readJsonFile, writeJsonFile, listFiles } from "../persistence/file-store.js";
import { appendEvent, EventPayloads } from "../persistence/event-log.js";
import { resolve } from "node:path";
export async function createTaskService(paths) {
    return {
        async createTask(params) {
            const newTaskId = taskId(`tsk_${uuidv4()}`);
            const now = new Date().toISOString();
            const task = {
                schemaVersion: 1,
                id: newTaskId,
                deliveryId: deliveryId(params.deliveryId),
                phaseRunId: phaseRunId(params.phaseRunId),
                title: params.title,
                description: params.description,
                type: params.type,
                status: "pending",
                priority: params.priority,
                dependencies: params.dependencies,
                assignedAgentId: params.ownerAgentId,
                assignedSessionId: null,
                workScope: params.workScope,
                acceptanceCriteria: params.acceptanceCriteria,
                expectedOutputs: params.expectedOutputs,
                requiredSkills: params.requiredSkills,
                worktreePath: params.worktreePath,
                attemptCount: 0,
                maxAttempts: params.maxAttempts,
                resultSummary: null,
                evidenceIds: [],
                blocker: null,
                revision: 1,
                createdAt: now,
                updatedAt: now,
                completedAt: null,
                startedAt: null,
            };
            // Validate dependencies exist
            for (const depId of params.dependencies) {
                const depPath = resolve(paths.deliveries, params.deliveryId, "tasks", `${depId}.json`);
                const depTask = await readJsonFile(paths, depPath);
                if (!depTask) {
                    throw new Error(`Dependency task not found: ${depId}`);
                }
            }
            // Check for cycles
            const allTasks = await this.listTasks(deliveryId(params.deliveryId));
            const cycles = detectCycles([...allTasks, task]);
            if (cycles.length > 0 && cycles[0]) {
                throw new Error(`Adding task would create dependency cycle: ${cycles[0].join(" -> ")}`);
            }
            // Write task
            const taskPath = resolve(paths.deliveries, params.deliveryId, "tasks", `${taskId}.json`);
            await writeJsonFile(paths, taskPath, task);
            // Log event
            await appendEvent(paths, EventPayloads.taskCreated(params.deliveryId, taskId.toString(), params.title, params.phaseRunId));
            return task;
        },
        async getTask(taskId) {
            // Need to find which delivery this task belongs to
            const deliveryIds = listFiles(paths, paths.deliveries);
            for (const deliveryId of deliveryIds) {
                const taskPath = resolve(paths.deliveries, deliveryId, "tasks", `${taskId}.json`);
                const task = await readJsonFile(paths, taskPath);
                if (task)
                    return task;
            }
            return null;
        },
        async listTasks(deliveryId, filters = {}) {
            const taskIds = listFiles(paths, resolve(paths.deliveries, deliveryId, "tasks"));
            const tasks = [];
            for (const taskId of taskIds) {
                const taskPath = resolve(paths.deliveries, deliveryId, "tasks", `${taskId}.json`);
                const task = await readJsonFile(paths, taskPath);
                if (!task)
                    continue;
                if (filters.status && !filters.status.includes(task.status))
                    continue;
                if (filters.type && !filters.type.includes(task.type))
                    continue;
                if (filters.phaseRunId && task.phaseRunId !== filters.phaseRunId)
                    continue;
                if (filters.assignedAgentId && task.assignedAgentId !== filters.assignedAgentId)
                    continue;
                tasks.push(task);
            }
            // Sort by createdAt
            tasks.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
            return tasks;
        },
        async updateTask(taskId, updates) {
            // Find task
            const deliveryIds = listFiles(paths, paths.deliveries);
            let task = null;
            let taskPath = "";
            let deliveryId = "";
            for (const id of deliveryIds) {
                const path = resolve(paths.deliveries, id, "tasks", `${taskId}.json`);
                const found = await readJsonFile(paths, path);
                if (found) {
                    task = found;
                    taskPath = path;
                    deliveryId = id;
                    break;
                }
            }
            if (!task)
                throw new Error(`Task ${taskId} not found`);
            // Validate status transition
            if (updates.status && !canTaskTransition(task.status, updates.status)) {
                throw new Error(`Invalid task transition: ${task.status} -> ${updates.status}`);
            }
            const updatedTask = {
                ...task,
                ...updates,
                updatedAt: new Date().toISOString(),
                revision: task.revision + 1,
                completedAt: updates.status === "completed" ? new Date().toISOString() : task.completedAt,
                startedAt: updates.status === "in_progress" && !task.startedAt ? new Date().toISOString() : task.startedAt,
            };
            await writeJsonFile(paths, taskPath, updatedTask);
            // If task completed, update evidence
            if (updates.status === "completed" && updates.resultSummary) {
                // Evidence would be added via separate call
            }
            return updatedTask;
        },
        async assignTask(taskId, agentId, sessionId) {
            return this.updateTask(taskId, {
                assignedAgentId: agentId,
                assignedSessionId: sessionId,
                status: "assigned",
            });
        },
        async completeTask(taskId, resultSummary, evidenceIds) {
            const task = await this.getTask(taskId);
            if (!task)
                throw new Error(`Task ${taskId} not found`);
            return this.updateTask(taskId, {
                status: "completed",
                resultSummary,
                evidenceIds: [...task.evidenceIds, ...evidenceIds],
            });
        },
        async blockTask(taskId, blocker) {
            const task = await this.getTask(taskId);
            if (!task)
                throw new Error(`Task ${taskId} not found`);
            return this.updateTask(taskId, {
                status: "blocked",
                blocker: { ...blocker, at: new Date().toISOString() },
            });
        },
        async unblockTask(taskId) {
            const task = await this.getTask(taskId);
            if (!task)
                throw new Error(`Task ${taskId} not found`);
            if (!task.blocker)
                throw new Error("Task not blocked");
            return this.updateTask(taskId, {
                status: "ready",
                blocker: null,
            });
        },
        async addDependency(taskId, dependsOnTaskId) {
            const task = await this.getTask(taskId);
            if (!task)
                throw new Error(`Task ${taskId} not found`);
            if (task.dependencies.includes(dependsOnTaskId)) {
                throw new Error(`Dependency already exists: ${dependsOnTaskId}`);
            }
            // Check if dependency task exists
            const depTask = await this.getTask(dependsOnTaskId);
            if (!depTask)
                throw new Error(`Dependency task not found: ${dependsOnTaskId}`);
            // Check for cycles
            const allTasks = await this.listTasks(task.deliveryId);
            const testTask = { ...task, dependencies: [...task.dependencies, dependsOnTaskId] };
            const cycles = detectCycles([...allTasks.filter(t => t.id !== taskId), testTask]);
            if (cycles.length > 0 && cycles[0]) {
                throw new Error(`Adding dependency would create cycle: ${cycles[0].join(" -> ")}`);
            }
            return this.updateTask(taskId, {
                dependencies: [...task.dependencies, dependsOnTaskId],
            });
        },
        async removeDependency(taskId, dependsOnTaskId) {
            const task = await this.getTask(taskId);
            if (!task)
                throw new Error(`Task ${taskId} not found`);
            if (!task.dependencies.includes(dependsOnTaskId)) {
                throw new Error(`Dependency not found: ${dependsOnTaskId}`);
            }
            return this.updateTask(taskId, {
                dependencies: task.dependencies.filter(d => d !== dependsOnTaskId),
            });
        },
        async getReadyTasks(deliveryId, phaseRunId) {
            const tasks = await this.listTasks(deliveryId, { phaseRunId });
            const completedTaskIds = new Set(tasks.filter(t => t.status === "completed").map(t => t.id));
            return tasks.filter(task => {
                if (task.status !== "pending" && task.status !== "ready")
                    return false;
                return task.dependencies.every(depId => completedTaskIds.has(depId));
            });
        },
        async getTaskDependencies(taskId) {
            const task = await this.getTask(taskId);
            return task?.dependencies ?? [];
        },
        async getTaskDependents(taskId) {
            const task = await this.getTask(taskId);
            if (!task)
                return [];
            const deliveryId = task.deliveryId;
            const allTasks = await this.listTasks(deliveryId);
            return allTasks
                .filter(t => t.dependencies.includes(taskId))
                .map(t => t.id);
        },
    };
}
/**
 * Valid task status transitions
 */
const VALID_TASK_TRANSITIONS = {
    pending: ["ready", "assigned", "completed", "cancelled", "skipped", "needs_rework"],
    ready: ["in_progress", "assigned", "completed", "cancelled", "skipped", "blocked", "needs_rework"],
    assigned: ["in_progress", "ready", "completed", "cancelled", "blocked", "needs_rework"],
    in_progress: ["review", "completed", "blocked", "failed", "cancelled", "needs_rework"],
    review: ["completed", "failed", "in_progress", "blocked", "needs_rework"],
    completed: [],
    blocked: ["ready", "in_progress", "cancelled", "failed", "needs_rework"],
    failed: ["ready", "in_progress", "cancelled", "needs_rework"],
    cancelled: [],
    skipped: [],
    needs_rework: ["ready", "in_progress", "cancelled"],
};
export function canTaskTransition(from, to) {
    return VALID_TASK_TRANSITIONS[from]?.includes(to) ?? false;
}
/**
 * Detect dependency cycles in task graph
 */
function detectCycles(tasks) {
    const taskMap = new Map(tasks.map(t => [t.id, t]));
    const visited = new Set();
    const recStack = new Set();
    const cycles = [];
    function dfs(taskId, path) {
        if (recStack.has(taskId)) {
            const cycleStart = path.indexOf(taskId);
            cycles.push(path.slice(cycleStart).concat(taskId));
            return;
        }
        if (visited.has(taskId))
            return;
        visited.add(taskId);
        recStack.add(taskId);
        path.push(taskId);
        const task = taskMap.get(taskId);
        if (task?.dependencies) {
            for (const depId of task.dependencies) {
                dfs(depId, [...path]);
            }
        }
        recStack.delete(taskId);
        path.pop();
    }
    for (const task of tasks) {
        if (!visited.has(task.id)) {
            dfs(task.id, []);
        }
    }
    return cycles;
}
/**
 * Get task execution order (topological sort)
 */
export function getTaskExecutionOrder(tasks) {
    const taskMap = new Map(tasks.map(t => [t.id, t]));
    const inDegree = new Map();
    const graph = new Map();
    // Initialize
    for (const task of tasks) {
        inDegree.set(task.id, 0);
        graph.set(task.id, []);
    }
    // Build graph
    for (const task of tasks) {
        for (const depId of task.dependencies) {
            if (taskMap.has(depId)) {
                graph.get(depId).push(task.id);
                inDegree.set(task.id, (inDegree.get(task.id) || 0) + 1);
            }
        }
    }
    // Topological sort
    const queue = [];
    for (const [taskId, degree] of inDegree) {
        if (degree === 0)
            queue.push(taskId);
    }
    const result = [];
    while (queue.length > 0) {
        const taskId = queue.shift();
        const task = taskMap.get(taskId);
        if (task)
            result.push(task);
        for (const dependentId of graph.get(taskId) || []) {
            const newDegree = (inDegree.get(dependentId) || 0) - 1;
            inDegree.set(dependentId, newDegree);
            if (newDegree === 0) {
                queue.push(dependentId);
            }
        }
    }
    if (result.length !== tasks.length) {
        // Cycle detected
        return tasks;
    }
    return result;
}
//# sourceMappingURL=task-service.js.map