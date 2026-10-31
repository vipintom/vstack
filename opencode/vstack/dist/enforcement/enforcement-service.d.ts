/**
 * Basic Enforcement Service
 *
 * Enforces a small set of rules with clear value:
 * 1. Delivery cannot be completed while required tasks remain incomplete
 * 2. Task cannot be completed where required check evidence is missing or failed
 * 3. Protected actions require explicit approval
 * 4. Blocked status requires a reason
 * 5. Blocking reviewer findings must be resolved before completion
 */
import { VstackPaths } from "../persistence/repository-root.js";
export interface EnforcementService {
    canCompleteDelivery(deliveryId: string): Promise<EnforcementResult>;
    canCompleteTask(deliveryId: string, taskId: string): Promise<EnforcementResult>;
    validateBlockedStatus(deliveryId: string, entityType: "delivery" | "task", entityId: string, reason: string): Promise<EnforcementResult>;
    requiresApproval(action: ProtectedAction): boolean;
    recordApproval(action: ProtectedAction, deliveryId: string, granted: boolean, reason?: string): Promise<void>;
}
export interface EnforcementResult {
    allowed: boolean;
    reasons: string[];
    blockedBy?: string[];
}
export type ProtectedAction = "complete_delivery" | "complete_task" | "mark_delivery_blocked" | "mark_task_blocked" | "delete_delivery" | "delete_task";
export declare function createEnforcementService(paths: VstackPaths): Promise<EnforcementService>;
//# sourceMappingURL=enforcement-service.d.ts.map