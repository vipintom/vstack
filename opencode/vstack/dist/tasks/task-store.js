/**
 * Simplified Task Store
 *
 * CRUD + dependencies for tasks without phase coupling.
 * Works with simplified delivery model.
 */
import { readJsonFile, writeJsonFile, listFiles, listDirs, deleteFile } from "../persistence/file-store.js";
import { resolve } from "node:path";
import { v4 as uuidv4 } from "uuid";
function taskDir(paths, deliveryId) {
    return resolve(paths.deliveries, deliveryId, "tasks");
}
function taskFile(paths, deliveryId, taskId) {
    return resolve(taskDir(paths, deliveryId), `${taskId}.json`);
}
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
function canTaskTransition(from, to) {
    return VALID_TASK_TRANSITIONS[from]?.includes(to) ?? false;
}
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
async function getAllTasksImpl(paths, deliveryId) {
    const taskIds = listFiles(paths, taskDir(paths, deliveryId));
    const tasks = [];
    for (const taskId of taskIds) {
        const task = await readJsonFile(paths, taskFile(paths, deliveryId, taskId));
        if (task)
            tasks.push(task);
    }
    tasks.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
    return tasks;
}
async function findTaskImpl(paths, taskId) {
    const deliveryDirs = listDirs(paths, resolve(paths.deliveries));
    for (const dir of deliveryDirs) {
        const taskPath = resolve(paths.deliveries, dir, "tasks", `${taskId}.json`);
        const task = await readJsonFile(paths, taskPath);
        if (task)
            return { task, taskPath };
    }
    return null;
}
async function updateTaskImpl(paths, taskId, updates) {
    const found = await findTaskImpl(paths, taskId);
    if (!found)
        throw new Error(`Task ${taskId} not found`);
    const { task, taskPath } = found;
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
        evidenceIds: updates.evidenceIds ? updates.evidenceIds.map(e => e) : task.evidenceIds,
    };
    await writeJsonFile(paths, taskPath, updatedTask);
    return updatedTask;
}
export async function createTaskStore(paths) {
    return {
        async createTask(params) {
            const newTaskId = `tsk_${uuidv4()}`;
            const now = new Date().toISOString();
            // Validate dependencies exist
            for (const depId of params.dependencies) {
                const depTask = await readJsonFile(paths, taskFile(paths, params.deliveryId, depId));
                if (!depTask) {
                    throw new Error(`Dependency task not found: ${depId}`);
                }
            }
            // Check for cycles
            const allTasks = await getAllTasksImpl(paths, params.deliveryId);
            const testTask = {
                id: newTaskId,
                deliveryId: params.deliveryId,
                dependencies: params.dependencies,
            };
            const cycles = detectCycles([...allTasks, testTask]);
            if (cycles.length > 0 && cycles[0]) {
                throw new Error(`Adding task would create dependency cycle: ${cycles[0].join(" -> ")}`);
            }
            const task = {
                schemaVersion: 1,
                id: newTaskId,
                deliveryId: params.deliveryId,
                phaseRunId: null,
                title: params.title,
                description: params.description,
                type: params.type,
                status: "pending",
                priority: params.priority,
                dependencies: params.dependencies,
                assignedAgentId: params.assignedAgentId,
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
            // Ensure task directory exists
            const { mkdirSync } = await import("node:fs");
            const taskDirPath = taskDir(paths, params.deliveryId);
            mkdirSync(taskDirPath, { recursive: true });
            await writeJsonFile(paths, taskFile(paths, params.deliveryId, newTaskId), task);
            return task;
        },
        async getTask(taskId) {
            const found = await findTaskImpl(paths, taskId);
            return found?.task ?? null;
        },
        async listTasks(deliveryId, filters = {}) {
            const tasks = await getAllTasksImpl(paths, deliveryId);
            let filtered = tasks;
            if (filters.status)
                filtered = filtered.filter(t => filters.status.includes(t.status));
            if (filters.type)
                filtered = filtered.filter(t => filters.type.includes(t.type));
            if (filters.assignedAgentId)
                filtered = filtered.filter(t => t.assignedAgentId === filters.assignedAgentId);
            return filtered;
        },
        async updateTask(taskId, updates) {
            return updateTaskImpl(paths, taskId, updates);
        },
        async deleteTask(taskId) {
            let task = null;
            let foundDeliveryId = null;
            const taskAttempt = await readJsonFile(paths, taskFile(paths, "", taskId));
            if (taskAttempt) {
                task = taskAttempt;
                foundDeliveryId = task.deliveryId;
            }
            else {
                // Find the task first
                const found = await (async () => {
                    const deliveryDirs = listDirs(paths, resolve(paths.deliveries));
                    for (const dir of deliveryDirs) {
                        const t = await readJsonFile(paths, taskFile(paths, dir, taskId));
                        if (t)
                            return { task: t, deliveryId: dir };
                    }
                    return null;
                })();
                if (!found)
                    throw new Error(`Task ${taskId} not found`);
                task = found.task;
                foundDeliveryId = found.deliveryId;
            }
            if (!foundDeliveryId)
                throw new Error(`Task ${taskId} not found`);
            // Check dependents
            const allTasks = await getAllTasksImpl(paths, foundDeliveryId);
            const dependents = allTasks.filter(t => t.dependencies.includes(taskId));
            if (dependents.length > 0) {
                throw new Error(`Cannot delete task: ${dependents.length} tasks depend on it`);
            }
            await deleteFile(paths, taskFile(paths, foundDeliveryId, taskId));
        },
        async addDependency(taskId, dependsOnTaskId) {
            const task = await readJsonFile(paths, taskFile(paths, "", taskId));
            if (!task)
                throw new Error(`Task ${taskId} not found`);
            if (task.dependencies.includes(dependsOnTaskId)) {
                throw new Error(`Dependency already exists: ${dependsOnTaskId}`);
            }
            const depTask = await readJsonFile(paths, taskFile(paths, task.deliveryId, dependsOnTaskId));
            if (!depTask)
                throw new Error(`Dependency task not found: ${dependsOnTaskId}`);
            if (depTask.deliveryId !== task.deliveryId) {
                throw new Error(`Dependency must be in same delivery`);
            }
            const allTasks = await getAllTasksImpl(paths, task.deliveryId);
            const testTask = { ...task, dependencies: [...task.dependencies, dependsOnTaskId] };
            const cycles = detectCycles([...allTasks.filter(t => t.id !== taskId), testTask]);
            if (cycles.length > 0 && cycles[0]) {
                throw new Error(`Adding dependency would create cycle: ${cycles[0].join(" -> ")}`);
            }
            return updateTaskImpl(paths, taskId, {
                dependencies: [...task.dependencies, dependsOnTaskId],
            });
        },
        async removeDependency(taskId, dependsOnTaskId) {
            const task = await readJsonFile(paths, taskFile(paths, "", taskId));
            if (!task)
                throw new Error(`Task ${taskId} not found`);
            if (!task.dependencies.includes(dependsOnTaskId)) {
                throw new Error(`Dependency not found: ${dependsOnTaskId}`);
            }
            return updateTaskImpl(paths, taskId, {
                dependencies: task.dependencies.filter(d => d !== dependsOnTaskId),
            });
        },
        async getReadyTasks(deliveryId) {
            const tasks = await getAllTasksImpl(paths, deliveryId);
            const completedTaskIds = new Set(tasks.filter(t => t.status === "completed").map(t => t.id));
            return tasks.filter(task => {
                if (task.status !== "pending" && task.status !== "ready")
                    return false;
                return task.dependencies.every(depId => completedTaskIds.has(depId));
            });
        },
        async getTaskDependencies(taskId) {
            const found = await findTaskImpl(paths, taskId);
            return found?.task.dependencies ?? [];
        },
        async getTaskDependents(deliveryId, taskId) {
            const allTasks = await getAllTasksImpl(paths, deliveryId);
            return allTasks
                .filter((t) => t.dependencies.includes(taskId))
                .map((t) => t.id);
        },
    };
}
//# sourceMappingURL=task-store.js.map