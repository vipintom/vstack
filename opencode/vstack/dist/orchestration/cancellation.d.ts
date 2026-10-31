/**
 * Cancellation manager
 * Handles graceful cancellation of tasks, agent runs, and workflows
 */
import { AgentRunId, TaskId, DeliveryId } from "../schemas/types.js";
import { VstackPaths } from "../persistence/repository-root.js";
export interface CancellationConfig {
    gracefulTimeout: number;
    forceKillTimeout: number;
    cascadeToDependents: boolean;
    notifyOnCancel: boolean;
}
export interface CancellationResult {
    cancelled: string[];
    failed: string[];
    reason: string;
}
export interface CancellationScope {
    type: "task" | "agent_run" | "phase" | "delivery";
    entityId: string;
    deliveryId: DeliveryId;
    reason: string;
    initiatedBy: "user" | "system" | "timeout" | "error" | "approval_rejected";
}
/**
 * Default cancellation configuration
 */
export declare const DEFAULT_CANCELLATION_CONFIG: CancellationConfig;
/**
 * Create cancellation manager
 */
export declare function createCancellationManager(paths: VstackPaths, config?: Partial<CancellationConfig>): Promise<{
    /**
     * Cancel a task and optionally its dependents
     */
    cancelTask(deliveryId: DeliveryId, taskId: TaskId, scope: CancellationScope): Promise<CancellationResult>;
    /**
     * Cancel an agent run by session ID
     */
    cancelAgentRunBySession(deliveryId: DeliveryId, sessionId: string, reason: string): Promise<boolean>;
    /**
     * Cancel an agent run by ID
     */
    cancelAgentRun(deliveryId: DeliveryId, agentRunId: AgentRunId, scope: CancellationScope): Promise<CancellationResult>;
    /**
     * Cancel all tasks in a phase
     */
    cancelPhase(deliveryId: DeliveryId, phaseRunId: string, scope: CancellationScope): Promise<CancellationResult>;
    /**
     * Cancel entire delivery
     */
    cancelDelivery(deliveryId: DeliveryId, scope: CancellationScope): Promise<CancellationResult>;
    /**
     * Get dependent tasks (tasks that depend on the given task)
     */
    getDependentTasks(deliveryId: DeliveryId, taskId: TaskId): Promise<TaskId[]>;
    /**
     * Graceful cancellation with timeout
     */
    gracefulCancel(scope: CancellationScope, onProgress?: (cancelled: string, remaining: number) => void): Promise<CancellationResult>;
    /**
     * Force cancel (immediate)
     */
    forceCancel(scope: CancellationScope): Promise<CancellationResult>;
    /**
     * Wait for graceful shutdown
     */
    waitForGracefulShutdown(scope: CancellationScope, timeout: number): Promise<void>;
}>;
//# sourceMappingURL=cancellation.d.ts.map