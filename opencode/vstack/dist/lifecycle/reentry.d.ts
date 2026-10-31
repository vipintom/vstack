/**
 * Phase re-entry handling
 * Allows returning to earlier phases when requirements change
 */
import { VstackPaths } from "../persistence/repository-root.js";
import { Delivery, PhaseRun, DeliveryPhase, PhaseRunStatus } from "../schemas/types.js";
import { getProfile } from "./profiles.js";
export interface ReentryResult {
    success: boolean;
    delivery: Delivery;
    newPhaseRun: PhaseRun;
    message: string;
    reenteredFrom: DeliveryPhase;
}
export interface ReentryContext {
    delivery: Delivery;
    currentPhaseRun: PhaseRun;
    targetPhase: DeliveryPhase;
    reason: string;
    actor: {
        type: "plugin" | "agent" | "human";
        id: string;
    };
}
/**
 * Re-enter a previous phase
 * Creates a new phase run for the target phase with incremented runSequence
 */
export declare function reenterPhase(paths: VstackPaths, context: ReentryContext): Promise<ReentryResult>;
/**
 * Check if re-entry is allowed for a phase
 */
export declare function canReenterPhase(delivery: Delivery, currentPhaseRun: PhaseRun, targetPhase: DeliveryPhase, profile: ReturnType<typeof getProfile>): {
    allowed: boolean;
    reason: string;
};
/**
 * Get re-entry history for a delivery
 */
export declare function getReentryHistory(paths: VstackPaths, deliveryId: string): Promise<Array<{
    phaseRunId: string;
    phase: DeliveryPhase;
    runSequence: number;
    status: PhaseRunStatus;
    startedAt: string | null;
    completedAt: string | null;
}>>;
/**
 * Resume a delivery from a specific phase run
 */
export declare function resumeFromPhaseRun(paths: VstackPaths, deliveryId: string, phaseRunId: string, actor: {
    type: "plugin" | "agent" | "human";
    id: string;
}): Promise<ReentryResult>;
//# sourceMappingURL=reentry.d.ts.map