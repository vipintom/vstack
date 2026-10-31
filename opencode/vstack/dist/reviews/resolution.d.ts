/**
 * Finding resolution and remediation
 * Handles fixing findings, re-review, and closure
 */
import { VstackPaths } from "../persistence/repository-root.js";
export interface ResolutionConfig {
    requireReReview: boolean;
    maxReReviewRuns: number;
    autoCreateRemediationTasks: boolean;
    reReviewOnFix: boolean;
}
export interface RemediationPlan {
    findingId: string;
    remediationTaskId: string;
    description: string;
    steps: string[];
    acceptanceCriteria: string[];
    estimatedEffort: "small" | "medium" | "large";
    assignedAgent: string;
    dependencies: string[];
}
export interface ReReviewRequest {
    deliveryId: string;
    originalReviewRunId: string;
    fixedFindingIds: string[];
    scope: string;
    profile: "quick" | "full";
}
export interface ReReviewResult {
    newReviewRunId: string;
    fixedFindings: string[];
    remainingFindings: string[];
    newFindings: string[];
}
/**
 * Create resolution manager
 */
export declare function createResolutionManager(paths: VstackPaths): Promise<{
    /**
     * Create remediation plan for findings
     */
    createRemediationPlan(deliveryId: string, findingIds: string[], assignedAgent: string): Promise<RemediationPlan[]>;
    /**
     * Assign findings to agents for remediation
     */
    assignFindings(deliveryId: string, assignments: Array<{
        findingId: string;
        agentId: string;
    }>): Promise<void>;
    /**
     * Submit finding for re-review after fix
     */
    submitForReReview(deliveryId: string, findingId: string, evidenceIds: string[], resolvedBy: string, notes?: string): Promise<void>;
    /**
     * Request re-review for fixed findings
     */
    requestReReview(request: {
        deliveryId: string;
        originalReviewRunId: string;
        fixedFindingIds: string[];
        scope: string;
        profile: "quick" | "full";
    }): Promise<{
        newReviewRunId: string;
        message: string;
    }>;
    /**
     * Check if all findings are resolved
     */
    areAllFindingsResolved(deliveryId: string, reviewRunId: string): Promise<{
        allResolved: boolean;
        open: number;
        fixed: number;
        falsePositive: number;
        deferred: number;
    }>;
    /**
     * Close findings after re-review confirms fix
     */
    closeFixedFindings(deliveryId: string, reReviewRunId: string, confirmedFixedFindingIds: string[]): Promise<void>;
    /**
     * Get resolution statistics
     */
    getResolutionStats(deliveryId: string, reviewRunId: string): Promise<{
        total: number;
        open: number;
        fixed: number;
        falsePositive: number;
        deferred: number;
        resolutionRate: number;
        avgTimeToFix: number;
    }>;
}>;
//# sourceMappingURL=resolution.d.ts.map