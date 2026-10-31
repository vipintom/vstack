/**
 * Orchestration coordinator
 * Coordinates agent dispatch, task scheduling, and workflow execution
 */
import { TaskId, AgentRunId, DeliveryId } from "../schemas/types.js";
import { VstackPaths } from "../persistence/repository-root.js";
import { AgentProfile } from "../tasks/assignment.js";
export interface OrchestratorConfig {
    maxConcurrentAgents: number;
    defaultAgentProfiles: AgentProfile[];
    enableWorktrees: boolean;
    worktreeStrategy: "opencode-native";
}
export interface DispatchResult {
    agentRunId: AgentRunId;
    sessionId: string;
    taskId: TaskId;
    agentId: string;
    status: "dispatched" | "failed";
    message: string;
}
export interface SchedulerResult {
    scheduled: TaskId[];
    skipped: TaskId[];
    reason: string;
    estimatedStart: Record<TaskId, number>;
}
/**
 * Create orchestration coordinator
 */
export declare function createOrchestrator(paths: VstackPaths, config: OrchestratorConfig): Promise<{
    /**
     * Dispatch an agent for a task
     */
    dispatchAgent(taskId: TaskId, agentId: string, deliveryId: DeliveryId, context?: {
        sessionId?: string;
        worktree?: string;
    }): Promise<DispatchResult>;
    /**
     * Get next ready task and dispatch appropriate agent
     */
    dispatchNextTask(deliveryId: DeliveryId, phaseRunId: string, availableAgents: AgentProfile[]): Promise<DispatchResult | null>;
    /**
     * Check and update agent run statuses
     */
    checkAgentRuns(deliveryId: string): Promise<void>;
    /**
     * Complete an agent run
     */
    completeAgentRun(agentRunId: AgentRunId, deliveryId: string, result: {
        success: boolean;
        summary: string;
        error?: string;
    }): Promise<void>;
    /**
     * Cancel an agent run
     */
    cancelAgentRun(agentRunId: AgentRunId, deliveryId: string, reason: string): Promise<void>;
    /**
     * Get active dispatches
     */
    getActiveDispatches(): {
        taskId: TaskId;
        sessionId: string;
        startedAt: string;
        agentRunId: AgentRunId;
    }[];
    /**
     * Get scheduler status
     */
    getSchedulerStatus(deliveryId: DeliveryId, phaseRunId: string): Promise<{
        readyTasks: number;
        inProgressTasks: number;
        activeAgents: number;
        maxConcurrent: number;
    }>;
    /**
     * Run scheduling cycle
     */
    runSchedulingCycle(deliveryId: DeliveryId, phaseRunId: string, availableAgents: AgentProfile[]): Promise<SchedulerResult>;
}>;
//# sourceMappingURL=coordinator.d.ts.map