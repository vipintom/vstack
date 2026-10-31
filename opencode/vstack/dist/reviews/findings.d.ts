/**
 * Review findings management
 * Handles finding creation, tracking, and resolution
 */
import { VstackPaths } from "../persistence/repository-root.js";
export interface FindingConfig {
    requireRecommendation: boolean;
    requireEvidence: boolean;
    allowDeferred: boolean;
    maxFindingsPerReview: number;
}
export interface Finding {
    schemaVersion: 1;
    id: string;
    deliveryId: string;
    reviewRunId: string;
    reviewerAgentId: string;
    lens: "correctness_regression" | "architecture_design" | "security_data" | "performance_resources" | "maintainability_style" | "test_adequacy" | "documentation_migration";
    severity: "critical" | "high" | "medium" | "low" | "informational";
    category: string;
    title: string;
    explanation: string;
    filePath: string | null;
    lineRange: {
        start: number;
        end: number;
    } | null;
    reproducibility: string | null;
    recommendation: string;
    status: "open" | "accepted" | "fixed" | "false_positive" | "deferred";
    owner: string | null;
    remediationTaskId: string | null;
    resolutionEvidenceIds: string[];
    firstSeenReviewRunId: string;
    lastReviewedReviewRunId: string | null;
    createdAt: string;
    updatedAt: string;
    notes?: string;
    revision?: number;
}
export interface FindingFilters {
    severity?: ("critical" | "high" | "medium" | "low" | "informational")[];
    lens?: string[];
    status?: ("open" | "accepted" | "fixed" | "false_positive" | "deferred")[];
    reviewerAgentId?: string;
    reviewRunId?: string[];
    limit?: number;
    offset?: number;
}
/**
 * Create findings manager
 */
export declare function createFindingsManager(paths: VstackPaths): Promise<{
    /**
     * Create a new finding
     */
    createFinding(deliveryId: string, reviewRunId: string, finding: Omit<Finding, "id" | "schemaVersion" | "createdAt" | "updatedAt" | "status" | "owner" | "remediationTaskId" | "resolutionEvidenceIds" | "firstSeenReviewRunId" | "lastReviewedReviewRunId">): Promise<Finding>;
    /**
     * Get finding by ID
     */
    getFinding(deliveryId: string, findingId: string): Promise<Finding | null>;
    /**
     * List findings with filters
     */
    listFindings(deliveryId: string, filters?: FindingFilters): Promise<Finding[]>;
    /**
     * Update finding status
     */
    updateFindingStatus(deliveryId: string, findingId: string, status: Finding["status"], updates?: Partial<Finding>): Promise<Finding | null>;
    /**
     * Assign finding to owner
     */
    assignFinding(deliveryId: string, findingId: string, owner: string, remediationTaskId?: string): Promise<Finding | null>;
    /**
     * Resolve finding
     */
    resolveFinding(deliveryId: string, findingId: string, resolution: {
        status: "fixed" | "false_positive" | "deferred";
        resolutionEvidenceIds: string[];
        resolvedBy: string;
        notes?: string;
    }): Promise<Finding | null>;
    /**
     * Get finding statistics
     */
    getStatistics(deliveryId: string): Promise<{
        total: number;
        bySeverity: Record<string, number>;
        byStatus: Record<string, number>;
        byLens: Record<string, number>;
        open: number;
        resolved: number;
    }>;
    /**
     * Deduplicate findings across reviewers
     */
    deduplicateFindings(deliveryId: string, reviewRunId: string): Promise<{
        originalCount: number;
        deduplicatedCount: number;
        duplicates: Array<{
            original: string;
            duplicates: string[];
        }>;
    }>;
}>;
//# sourceMappingURL=findings.d.ts.map