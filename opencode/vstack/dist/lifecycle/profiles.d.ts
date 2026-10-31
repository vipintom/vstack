/**
 * Delivery lifecycle profiles
 * Define phase sequences, requirements, gates, and approval rules for different work types
 */
import { ProfileId, DeliveryPhase, EvidenceType } from "../schemas/types.js";
export interface PhaseRequirement {
    phase: DeliveryPhase;
    required: boolean;
    requiredGates: EvidenceType[];
    optionalGates: EvidenceType[];
    approvalRequired: boolean;
    approvalType?: "design" | "release" | "publish" | "production_deployment" | "destructive_migration" | "rollback" | "scope_change";
    skipAllowed: boolean;
    skipRequiresReason: boolean;
}
export interface LifecycleProfile {
    id: ProfileId;
    name: string;
    description: string;
    phases: PhaseRequirement[];
    defaultParallelism: number;
    maxReviewRuns: number;
}
export declare const LIFECYCLE_PROFILES: Record<ProfileId, LifecycleProfile>;
/**
 * Get a lifecycle profile by ID
 */
export declare function getProfile(profileId: ProfileId): LifecycleProfile;
/**
 * Get all available profile IDs
 */
export declare function getAvailableProfiles(): ProfileId[];
/**
 * Get the next phase in a profile
 */
export declare function getNextPhase(profileId: ProfileId, currentPhase: DeliveryPhase): DeliveryPhase | null;
/**
 * Check if a phase can be skipped in a profile
 */
export declare function canSkipPhase(profileId: ProfileId, phase: DeliveryPhase): boolean;
/**
 * Get required gates for a phase in a profile
 */
export declare function getRequiredGates(profileId: ProfileId, phase: DeliveryPhase): EvidenceType[];
/**
 * Get optional gates for a phase in a profile
 */
export declare function getOptionalGates(profileId: ProfileId, phase: DeliveryPhase): EvidenceType[];
/**
 * Check if approval is required for a phase in a profile
 */
export declare function isApprovalRequired(profileId: ProfileId, phase: DeliveryPhase): boolean;
/**
 * Get approval type for a phase in a profile
 */
export declare function getApprovalType(profileId: ProfileId, phase: DeliveryPhase): PhaseRequirement["approvalType"] | undefined;
//# sourceMappingURL=profiles.d.ts.map