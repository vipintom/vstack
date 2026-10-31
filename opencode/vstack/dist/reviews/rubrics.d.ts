/**
 * Review rubrics
 * Defines review criteria, lenses, and scoring guidelines
 */
export type ReviewLens = "correctness_regression" | "architecture_design" | "security_data" | "performance_resources" | "maintainability_style" | "test_adequacy" | "documentation_migration";
export type FindingSeverity = "critical" | "high" | "medium" | "low" | "informational";
export interface RubricCriterion {
    id: string;
    lens: ReviewLens;
    title: string;
    description: string;
    severityThresholds: {
        critical: string;
        high: string;
        medium: string;
        low: string;
        informational: string;
    };
    weight: number;
}
export interface ReviewProfile {
    id: string;
    name: string;
    description: string;
    lenses: ReviewLens[];
    criteria: RubricCriterion[];
    passingThreshold: number;
    requiredLenses: ReviewLens[];
}
export interface ReviewScore {
    total: number;
    maxPossible: number;
    byLens: Record<ReviewLens, {
        score: number;
        max: number;
    }>;
    passed: boolean;
}
/**
 * Default rubric criteria
 */
export declare const DEFAULT_RUBRIC_CRITERIA: RubricCriterion[];
/**
 * Review profiles
 */
export declare const REVIEW_PROFILES: {
    quick: {
        id: string;
        name: string;
        description: string;
        lenses: readonly ["correctness_regression", "architecture_design", "security_data"];
        requiredLenses: string[];
        passingThreshold: number;
    };
    full: {
        id: string;
        name: string;
        description: string;
        lenses: readonly ["correctness_regression", "architecture_design", "security_data", "performance_resources", "maintainability_style", "test_adequacy", "documentation_migration"];
        requiredLenses: string[];
        passingThreshold: number;
    };
};
/**
 * Score findings against rubric
 */
export declare function scoreFindings(findings: any[], criteria: typeof DEFAULT_RUBRIC_CRITERIA): ReviewScore;
/**
 * Get review profile
 */
export declare function getReviewProfile(profile: "quick" | "full"): typeof REVIEW_PROFILES.quick | typeof REVIEW_PROFILES.full;
/**
 * Check if review passes
 */
export declare function doesReviewPass(findings: any[], profile: "quick" | "full"): boolean;
//# sourceMappingURL=rubrics.d.ts.map