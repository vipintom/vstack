/**
 * Release preparation and management
 * Handles versioning, changelogs, artifact validation, and release candidate creation
 */
import { VstackPaths } from "../persistence/repository-root.js";
export interface ReleaseConfig {
    versionStrategy: "semver" | "calver" | "custom";
    autoChangelog: boolean;
    requireApproval: boolean;
    signArtifacts: boolean;
    publishToRegistry: boolean;
}
export interface ReleaseCandidate {
    version: string;
    type: "major" | "minor" | "patch" | "prerelease";
    changelog: string;
    artifacts: ReleaseArtifact[];
    validationResults: ValidationResult[];
    status: "draft" | "pending_approval" | "approved" | "rejected" | "published";
    createdAt: string;
    approvedAt?: string;
    approvedBy?: string;
    publishedAt?: string;
    revision?: number;
}
export interface ReleaseArtifact {
    path: string;
    type: "npm" | "docker" | "binary" | "archive" | "other";
    size: number;
    checksum: string;
    signature?: string;
}
export interface ValidationResult {
    check: string;
    passed: boolean;
    details: string;
}
export interface ChangelogEntry {
    version: string;
    date: string;
    categories: {
        added: string[];
        changed: string[];
        deprecated: string[];
        removed: string[];
        fixed: string[];
        security: string[];
    };
}
/**
 * Create release manager
 */
export declare function createReleaseManager(paths: VstackPaths): Promise<{
    /**
     * Prepare a release candidate
     */
    prepareRelease(deliveryId: string, versionType: "major" | "minor" | "patch" | "prerelease", config: ReleaseConfig): Promise<ReleaseCandidate>;
    /**
     * Get current version from package.json or git tags
     */
    getCurrentVersion(): Promise<string>;
    /**
     * Calculate next version
     */
    calculateVersion(current: string, type: "major" | "minor" | "patch" | "prerelease"): string;
    /**
     * Generate changelog from delivery history
     */
    generateChangelog(deliveryId: string, version: string): Promise<string>;
    /**
     * Build release artifacts
     */
    buildArtifacts(config: ReleaseConfig): Promise<any[]>;
    /**
     * Validate release artifacts
     */
    validateArtifacts(artifacts: any[], config: ReleaseConfig): Promise<any[]>;
    /**
     * Approve release candidate
     */
    approveRelease(deliveryId: string, approvedBy: string): Promise<ReleaseCandidate>;
    /**
     * Publish release
     */
    publishRelease(deliveryId: string, config: ReleaseConfig): Promise<void>;
}>;
//# sourceMappingURL=release-preparation.d.ts.map