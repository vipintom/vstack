/**
 * Review orchestrator
 * Manages Goldfish review process with fresh-context reviewers
 */
import { VstackPaths } from "../persistence/repository-root.js";
import { ReviewRun, ReviewLens, Finding } from "../schemas/types.js";
export interface ReviewConfig {
    profile: "quick" | "full" | "custom";
    lenses: ReviewLens[];
    independent: boolean;
    maxReviewers: number;
    requireConsensus: boolean;
}
export interface ReviewerAssignment {
    agentId: string;
    lens: ReviewLens;
    sessionId: string | null;
    status: "pending" | "running" | "completed" | "failed";
    reportPath: string | null;
    startedAt: string | null;
    completedAt: string | null;
}
export interface ReviewResult {
    reviewRunId: string;
    passed: boolean;
    findings: string[];
    consolidatedReportPath: string | null;
    summary: {
        totalFindings: number;
        bySeverity: Record<string, number>;
        byLens: Record<string, number>;
    };
    recommendations: string[];
}
export interface ConsolidatedReport {
    reviewRunId: string;
    deliveryId: string;
    generatedAt: string;
    summary: {
        totalFindings: number;
        bySeverity: Record<string, number>;
        byLens: Record<string, number>;
    };
    findings: Finding[];
    deduplication: DeduplicationMap;
    coverage: {
        reviewed: string[];
        notReviewed: string[];
        gaps: string[];
    };
    recommendations: string[];
    revision?: number;
}
export interface DeduplicationMap {
    [findingId: string]: {
        originalFindings: string[];
        mergedSeverity: string;
        disposition: "accepted" | "rejected" | "deferred";
    };
}
/**
 * Create review orchestrator
 */
export declare function createReviewOrchestrator(paths: VstackPaths): Promise<{
    /**
     * Start a review run
     */
    startReview(deliveryIdParam: string, phaseRunIdParam: string | null, config: ReviewConfig, targetArtifacts: string[], acceptanceRequirements: string[]): Promise<ReviewRun>;
    /**
     * Record reviewer findings
     */
    recordReviewerFindings(reviewRunIdParam: string, reviewerAgentId: string, lens: string, deliveryIdParam: string, findings: Omit<Finding, "schemaVersion" | "id" | "deliveryId" | "reviewRunId" | "reviewerAgentId" | "firstSeenReviewRunId" | "lastReviewedReviewRunId" | "createdAt" | "updatedAt">[]): Promise<Finding[]>;
    /**
     * Synthesize findings from all reviewers
     */
    synthesizeFindings(reviewRunIdParam: string, deliveryIdParam: string): Promise<ConsolidatedReport>;
    /**
     * Deduplicate findings
     */
    deduplicateFindings(findings: Finding[]): Promise<DeduplicationMap>;
    /**
     * Complete review run
     */
    completeReview(reviewRunId: string, deliveryId: string): Promise<ReviewResult>;
    /**
     * Count findings by severity
     */
    countBySeverity(findings: Finding[]): Record<string, number>;
    /**
     * Count findings by lens
     */
    countByLens(findings: Finding[]): Record<string, number>;
    /**
     * Generate recommendations
     */
    generateRecommendations(findings: Finding[]): string[];
}>;
//# sourceMappingURL=review-orchestrator.d.ts.map