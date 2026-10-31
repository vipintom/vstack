/**
 * Phase transition validation and execution
 * Enforces valid state transitions and gate requirements
 */
import { VstackPaths } from "../persistence/repository-root.js";
import { Delivery, PhaseRun, DeliveryPhase, EvidenceType, ProfileId, DeliveryId, PhaseRunId } from "../schemas/types.js";
export interface TransitionResult {
    success: boolean;
    message: string;
    newPhase?: DeliveryPhase;
    newPhaseRunId?: string;
    requiredGates?: EvidenceType[];
    missingGates?: EvidenceType[];
    approvalRequired?: boolean;
    approvalType?: string;
}
export interface PhaseTransitionContext {
    delivery: Delivery;
    currentPhaseRun: PhaseRun | null;
    profileId: ProfileId;
    actorId: string;
    actorType: "plugin" | "agent" | "human";
    sessionId?: string;
    toolId?: string;
}
/**
 * Validate if a phase transition is allowed
 */
export declare function canTransitionPhase(fromPhase: DeliveryPhase, toPhase: DeliveryPhase): boolean;
/**
 * Check if all required gates for a phase are satisfied
 */
export declare function checkPhaseGates(paths: VstackPaths, deliveryId: DeliveryId, phaseRunId: PhaseRunId, profileId: ProfileId): Promise<{
    satisfied: boolean;
    missingGates: EvidenceType[];
}>;
/**
 * Request a phase transition
 */
export declare function requestPhaseTransition(paths: VstackPaths, context: PhaseTransitionContext, targetPhase: DeliveryPhase, options?: {
    skipGates?: boolean;
    skipApproval?: boolean;
    skipReason?: string;
}): Promise<TransitionResult>;
/**
 * Start a phase (mark as active)
 */
export declare function startPhase(paths: VstackPaths, deliveryId: DeliveryId, phaseRunId: PhaseRunId, actorId: string, actorType: "plugin" | "agent" | "human", sessionId?: string, toolId?: string): Promise<TransitionResult>;
/**
 * Block a phase
 */
export declare function blockPhase(paths: VstackPaths, deliveryId: DeliveryId, phaseRunId: PhaseRunId, reason: string, actorId: string, actorType: "plugin" | "agent" | "human", sessionId?: string, toolId?: string): Promise<TransitionResult>;
/**
 * Unblock a phase
 */
export declare function unblockPhase(paths: VstackPaths, deliveryId: DeliveryId, phaseRunId: PhaseRunId, actorId: string, actorType: "plugin" | "agent" | "human", sessionId?: string, toolId?: string): Promise<TransitionResult>;
/**
 * Get valid next phases for current phase in profile
 */
export declare function getValidNextPhases(profileId: ProfileId, currentPhase: DeliveryPhase): DeliveryPhase[];
//# sourceMappingURL=phase-transitions.d.ts.map