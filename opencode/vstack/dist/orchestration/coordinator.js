/**
 * Orchestration coordinator
 * Coordinates agent dispatch, task scheduling, and workflow execution
 */
import { v4 as uuidv4 } from "uuid";
import { agentRunId as createAgentRunId } from "../schemas/types.js";
import { readJsonFile, writeJsonFile, listFiles } from "../persistence/file-store.js";
import { appendEvent, EventPayloads } from "../persistence/event-log.js";
import { createTaskService } from "../tasks/task-service.js";
import { assignTasks } from "../tasks/assignment.js";
import { resolve } from "node:path";
/**
 * Create orchestration coordinator
 */
export async function createOrchestrator(paths, config) {
    const taskService = await createTaskService(paths);
    const activeDispatches = new Map();
    let dispatchCounter = 0;
    return {
        /**
         * Dispatch an agent for a task
         */
        async dispatchAgent(taskId, agentId, deliveryId, context = {}) {
            // Verify task exists and is ready
            const task = await taskService.getTask(taskId);
            if (!task) {
                return { agentRunId: "", sessionId: "", taskId, agentId, status: "failed", message: "Task not found" };
            }
            if (task.status !== "ready" && task.status !== "assigned") {
                return { agentRunId: "", sessionId: "", taskId, agentId, status: "failed", message: `Task not in assignable state: ${task.status}` };
            }
            // Create agent run record
            const agentRunId = createAgentRunId(`agrun_${uuidv4()}`);
            const sessionId = context.sessionId ?? `session_${uuidv4()}`;
            const now = new Date().toISOString();
            const agentRun = {
                schemaVersion: 1,
                id: agentRunId,
                deliveryId,
                taskId,
                agentId,
                sessionId,
                worktreePath: context.worktree ?? null,
                status: "dispatched",
                dispatchPrompt: `Work on task: ${task.title}\n\nDescription: ${task.description}\n\nAcceptance Criteria:\n${task.acceptanceCriteria.map(c => `- ${c}`).join("\n")}\n\nWork Scope: ${task.workScope}`,
                contextReferences: [],
                startedAt: now,
                completedAt: null,
                resultSummary: null,
                error: null,
                revision: 1,
            };
            // Save agent run
            const agentRunPath = resolve(paths.deliveries, deliveryId, "agent-runs", `${agentRunId}.json`);
            await writeJsonFile(paths, agentRunPath, agentRun);
            // Update task
            await taskService.updateTask(taskId, {
                status: "assigned",
                assignedAgentId: agentId,
                assignedSessionId: sessionId,
            });
            // Track active dispatch
            activeDispatches.set(agentRunId, { taskId, sessionId, startedAt: now });
            // Log event
            await appendEvent(paths, EventPayloads.agentDispatched(deliveryId, agentRunId, agentId, taskId));
            // In real implementation, this would call OpenCode's session.create
            // For now, we simulate the dispatch
            dispatchCounter++;
            return {
                agentRunId,
                sessionId,
                taskId,
                agentId,
                status: "dispatched",
                message: `Agent ${agentId} dispatched for task ${taskId}`,
            };
        },
        /**
         * Get next ready task and dispatch appropriate agent
         */
        async dispatchNextTask(deliveryId, phaseRunId, availableAgents) {
            const readyTasks = await taskService.getReadyTasks(deliveryId, phaseRunId);
            if (readyTasks.length === 0) {
                return null;
            }
            // Assign tasks to agents
            const assignments = assignTasks(readyTasks, availableAgents);
            for (const assignment of assignments) {
                if (assignment.agentId && assignment.confidence > 0.5) {
                    // Dispatch the agent
                    const result = await this.dispatchAgent(assignment.taskId, assignment.agentId, deliveryId, { sessionId: undefined } // Would be created by OpenCode
                    );
                    if (result.status === "dispatched") {
                        return result;
                    }
                }
            }
            return null;
        },
        /**
         * Check and update agent run statuses
         */
        async checkAgentRuns(deliveryId) {
            const agentRunIds = listFiles(paths, resolve(paths.deliveries, deliveryId, "agent-runs"));
            for (const agentRunId of agentRunIds) {
                const agentRunPath = resolve(paths.deliveries, deliveryId, "agent-runs", `${agentRunId}.json`);
                const agentRun = await readJsonFile(paths, agentRunPath);
                if (!agentRun)
                    continue;
                if (agentRun.status === "dispatched" || agentRun.status === "running") {
                    // In real implementation, check OpenCode session status
                    // For now, mark as running if dispatched
                    if (agentRun.status === "dispatched") {
                        const updated = { ...agentRun, status: "running", revision: agentRun.revision + 1 };
                        await writeJsonFile(paths, agentRunPath, updated);
                    }
                }
            }
        },
        /**
         * Complete an agent run
         */
        async completeAgentRun(agentRunId, deliveryId, result) {
            const agentRunPath = resolve(paths.deliveries, deliveryId, "agent-runs", `${agentRunId}.json`);
            const agentRun = await readJsonFile(paths, agentRunPath);
            if (!agentRun)
                throw new Error(`Agent run ${agentRunId} not found`);
            const updated = {
                ...agentRun,
                status: result.success ? "completed" : "failed",
                completedAt: new Date().toISOString(),
                resultSummary: result.summary,
                error: result.error ?? null,
                revision: agentRun.revision + 1,
            };
            await writeJsonFile(paths, agentRunPath, updated);
            // Update task if associated
            if (agentRun.taskId) {
                const task = await taskService.getTask(agentRun.taskId);
                if (task) {
                    if (result.success) {
                        await taskService.updateTask(agentRun.taskId, {
                            status: "completed",
                            resultSummary: result.summary,
                        });
                    }
                    else {
                        await taskService.updateTask(agentRun.taskId, {
                            status: "failed",
                            blocker: {
                                type: "technical",
                                message: result.error || "Agent run failed",
                                details: { agentRunId },
                                at: new Date().toISOString(),
                                blockingTaskIds: [],
                            },
                        });
                    }
                }
            }
            activeDispatches.delete(agentRunId);
        },
        /**
         * Cancel an agent run
         */
        async cancelAgentRun(agentRunId, deliveryId, reason) {
            const agentRunPath = resolve(paths.deliveries, deliveryId, "agent-runs", `${agentRunId}.json`);
            const agentRun = await readJsonFile(paths, agentRunPath);
            if (!agentRun)
                throw new Error(`Agent run ${agentRunId} not found`);
            const updated = {
                ...agentRun,
                status: "cancelled",
                completedAt: new Date().toISOString(),
                error: reason,
                revision: agentRun.revision + 1,
            };
            await writeJsonFile(paths, agentRunPath, updated);
            // Update task if associated
            if (agentRun.taskId) {
                await taskService.updateTask(agentRun.taskId, {
                    status: "ready",
                    blocker: {
                        type: "external",
                        message: `Agent cancelled: ${reason}`,
                        details: { agentRunId },
                        at: new Date().toISOString(),
                        blockingTaskIds: [],
                    },
                });
            }
            activeDispatches.delete(agentRunId);
        },
        /**
         * Get active dispatches
         */
        getActiveDispatches() {
            return Array.from(activeDispatches.entries()).map(([id, info]) => ({
                agentRunId: id,
                ...info,
            }));
        },
        /**
         * Get scheduler status
         */
        async getSchedulerStatus(deliveryId, phaseRunId) {
            const tasks = await taskService.listTasks(deliveryId, { phaseRunId });
            return {
                readyTasks: tasks.filter(t => t.status === "ready" || t.status === "pending").length,
                inProgressTasks: tasks.filter(t => t.status === "in_progress" || t.status === "assigned").length,
                activeAgents: activeDispatches.size,
                maxConcurrent: config.maxConcurrentAgents,
            };
        },
        /**
         * Run scheduling cycle
         */
        async runSchedulingCycle(deliveryId, phaseRunId, availableAgents) {
            const readyTasks = await taskService.getReadyTasks(deliveryId, phaseRunId);
            const activeCount = activeDispatches.size;
            const availableSlots = config.maxConcurrentAgents - activeCount;
            if (availableSlots <= 0) {
                return {
                    scheduled: [],
                    skipped: readyTasks.map(t => t.id),
                    reason: "Max concurrent agents reached",
                    estimatedStart: {},
                };
            }
            // Assign tasks to agents
            const assignments = assignTasks(readyTasks.slice(0, availableSlots), availableAgents);
            const scheduled = [];
            const estimatedStart = {};
            for (const assignment of assignments) {
                if (assignment.agentId && assignment.confidence > 0.5) {
                    const result = await this.dispatchAgent(assignment.taskId, assignment.agentId, deliveryId, {});
                    if (result.status === "dispatched") {
                        scheduled.push(assignment.taskId);
                        estimatedStart[assignment.taskId] = Date.now();
                    }
                }
            }
            const skipped = readyTasks
                .filter(t => !scheduled.includes(t.id))
                .map(t => t.id);
            return {
                scheduled,
                skipped,
                reason: skipped.length > 0 ? "Not all tasks could be scheduled" : "All ready tasks scheduled",
                estimatedStart,
            };
        },
    };
}
//# sourceMappingURL=coordinator.js.map