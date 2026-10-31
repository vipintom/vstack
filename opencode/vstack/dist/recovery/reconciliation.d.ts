/**
 * State reconciliation utilities for vstack workflow
 * Validates and repairs consistency across workflow entities
 */
import { VstackPaths } from "../persistence/repository-root.js";
import { Delivery, Task, PhaseRun } from "../schemas/types.js";
export interface ReconciliationResult {
    deliveryId: string;
    checkedAt: string;
    issuesFound: ReconciliationIssue[];
    issuesFixed: ReconciliationIssue[];
    warnings: string[];
}
export interface ReconciliationIssue {
    type: "missing_file" | "orphaned_entity" | "inconsistent_reference" | "missing_evidence" | "cycle_detected" | "schema_violation";
    severity: "error" | "warning" | "info";
    entityType: "delivery" | "phase" | "task" | "agent_run" | "review" | "finding" | "evidence" | "approval";
    entityId: string;
    description: string;
    fixApplied: boolean;
    fixDescription?: string;
}
/**
 * Reconcile all deliveries in the project
 */
export declare function reconcileAll(paths: VstackPaths): Promise<ReconciliationResult[]>;
/**
 * Reconcile a single delivery
 */
export declare function reconcileDelivery(paths: VstackPaths, deliveryId: string): Promise<ReconciliationResult>;
/**
 * Quick health check for a delivery
 */
export declare function healthCheck(paths: VstackPaths, deliveryId: string): Promise<{
    healthy: boolean;
    delivery: Delivery | null;
    phaseRun: PhaseRun | null;
    activeTask: Task | null;
    issues: string[];
}>;
//# sourceMappingURL=reconciliation.d.ts.map