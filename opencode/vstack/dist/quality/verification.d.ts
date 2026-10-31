/**
 * Verification engine
 * Runs phase/delivery verification and evaluates quality gates
 */
import { VstackPaths } from "../persistence/repository-root.js";
import { EvidenceId } from "../schemas/types.js";
export interface VerificationConfig {
    requireAllGates: boolean;
    allowManualVerification: boolean;
    autoRunOnPhaseComplete: boolean;
}
export interface PhaseVerificationResult {
    phase: string;
    phaseRunId: string;
    passed: boolean;
    requiredGatesPassed: number;
    requiredGatesTotal: number;
    optionalGatesPassed: number;
    optionalGatesTotal: number;
    failedGates: string[];
    missingGates: string[];
    evidenceIds: EvidenceId[];
    duration: number;
}
export interface DeliveryVerificationResult {
    deliveryId: string;
    passed: boolean;
    phaseResults: PhaseVerificationResult[];
    overallEvidenceIds: EvidenceId[];
    duration: number;
}
/**
 * Create verification engine
 */
export declare function createVerificationEngine(paths: VstackPaths): Promise<{
    /**
     * Verify a phase (run all required gates)
     */
    verifyPhase(deliveryId: string, phaseRunId: string, config: VerificationConfig): Promise<PhaseVerificationResult>;
    /**
     * Verify entire delivery
     */
    verifyDelivery(deliveryId: string, config: VerificationConfig): Promise<DeliveryVerificationResult>;
    /**
     * Get commit reference for delivery
     */
    getCommitRef(deliveryId: string): Promise<string>;
}>;
//# sourceMappingURL=verification.d.ts.map