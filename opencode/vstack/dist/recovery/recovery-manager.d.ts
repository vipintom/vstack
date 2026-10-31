/**
 * Recovery manager for vstack workflow state
 * Handles crash recovery, interrupted operations, and state reconciliation
 */
import { VstackPaths } from "../persistence/repository-root.js";
import { Task, AgentRun, PhaseRun, ReviewRun } from "../schemas/types.js";
export interface RecoveryReport {
    deliveryId: string;
    recoveredAt: string;
    interruptedAgentRuns: AgentRun[];
    uncertainTasks: Task[];
    uncertainPhaseRuns: PhaseRun[];
    incompleteReviews: ReviewRun[];
    actionsTaken: RecoveryAction[];
    warnings: string[];
}
export interface RecoveryAction {
    type: "agent_run_marked_failed" | "task_reset_to_ready" | "phase_marked_blocked" | "review_marked_failed" | "event_logged";
    entityId: string;
    reason: string;
}
/**
 * Perform full recovery scan on startup
 */
export declare function performRecovery(paths: VstackPaths): Promise<RecoveryReport[]>;
/**
 * Reconcile state after recovery
 * Ensures consistency across all entities
 */
export declare function reconcileState(paths: VstackPaths, deliveryId: string): Promise<void>;
//# sourceMappingURL=recovery-manager.d.ts.map