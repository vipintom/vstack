/**
 * Acceptance criteria verification
 * Handles validation of acceptance criteria for tasks and deliveries
 */
import { VstackPaths } from "../persistence/repository-root.js";
export interface AcceptanceCriterion {
    id: string;
    description: string;
    type: "functional" | "non_functional" | "security" | "performance" | "usability";
    verificationMethod: "automated_test" | "manual_test" | "inspection" | "demonstration" | "analysis";
    status: "pending" | "verified" | "failed" | "waived";
    evidence?: string;
    verifiedAt?: string;
    verifiedBy?: string;
    notes?: string;
}
export interface AcceptanceCriteriaConfig {
    requireAllVerified: boolean;
    allowWaivers: boolean;
    waiverRequiresApproval: boolean;
}
export interface VerificationResult {
    criterionId: string;
    status: "verified" | "failed" | "waived";
    evidence?: string;
    verifiedAt: string;
    verifiedBy: string;
    notes?: string;
}
export interface AcceptanceReport {
    deliveryId: string;
    totalCriteria: number;
    verified: number;
    failed: number;
    waived: number;
    pending: number;
    overallPassed: boolean;
    verifications: VerificationResult[];
    generatedAt: string;
}
/**
 * Create acceptance criteria manager
 */
export declare function createAcceptanceManager(paths: VstackPaths): Promise<{
    /**
     * Add acceptance criteria to a task/delivery
     */
    addCriteria(deliveryId: string, criteria: Omit<AcceptanceCriterion, "id" | "status">[]): Promise<AcceptanceCriterion[]>;
    /**
     * Get acceptance criteria for a delivery
     */
    getCriteria(deliveryId: string): Promise<AcceptanceCriterion[]>;
    /**
     * Verify a single criterion
     */
    verifyCriterion(deliveryId: string, criterionId: string, verification: VerificationResult): Promise<AcceptanceCriterion | null>;
    /**
     * Verify multiple criteria (batch)
     */
    verifyCriteria(deliveryId: string, verifications: VerificationResult[]): Promise<AcceptanceCriterion[]>;
    /**
     * Generate acceptance report
     */
    generateReport(deliveryId: string): Promise<AcceptanceReport>;
    /**
     * Check if all criteria are satisfied
     */
    areAllSatisfied(deliveryId: string): Promise<boolean>;
    /**
     * Get pending criteria
     */
    getPendingCriteria(deliveryId: string): Promise<AcceptanceCriterion[]>;
    /**
     * Waive a criterion (requires approval)
     */
    waiveCriterion(deliveryId: string, criterionId: string, approvedBy: string, reason: string): Promise<AcceptanceCriterion | null>;
}>;
//# sourceMappingURL=acceptance.d.ts.map