/**
 * Repository root resolution for vstack workflow state
 * Uses OpenCode's canonical project root to ensure single source of truth across worktrees
 */
export interface VstackPaths {
    root: string;
    state: string;
    deliveries: string;
    config: string;
    reports: string;
    locks: string;
    events: string;
    index: string;
    manifest: string;
    memory: string;
}
export declare class VstackPathError extends Error {
    readonly code: "NOT_FOUND" | "PATH_TRAVERSAL" | "NOT_CANONICAL" | "INVALID_PROJECT_ROOT";
    readonly path?: string | undefined;
    constructor(message: string, code: "NOT_FOUND" | "PATH_TRAVERSAL" | "NOT_CANONICAL" | "INVALID_PROJECT_ROOT", path?: string | undefined);
}
/**
 * Resolve the canonical vstack root directory for a project.
 * Uses OpenCode's canonical project root to ensure all worktrees share the same state.
 */
export declare function resolveVstackRoot(projectRoot: string): Promise<VstackPaths>;
/**
 * Ensure all vstack directories exist
 */
export declare function ensureVstackDirs(paths: VstackPaths): Promise<void>;
/**
 * Validate a path is within the vstack root
 */
export declare function validateVstackPath(paths: VstackPaths, targetPath: string, label?: string): string;
/**
 * Get delivery directory path
 */
export declare function getDeliveryDir(paths: VstackPaths, deliveryId: string): string;
/**
 * Get task file path
 */
export declare function getTaskPath(paths: VstackPaths, deliveryId: string, taskId: string): string;
/**
 * Get phase run file path
 */
export declare function getPhaseRunPath(paths: VstackPaths, deliveryId: string, phaseRunId: string): string;
/**
 * Get agent run file path
 */
export declare function getAgentRunPath(paths: VstackPaths, deliveryId: string, agentRunId: string): string;
/**
 * Get review run file path
 */
export declare function getReviewRunPath(paths: VstackPaths, deliveryId: string, reviewRunId: string): string;
/**
 * Get finding file path
 */
export declare function getFindingPath(paths: VstackPaths, deliveryId: string, findingId: string): string;
/**
 * Get evidence file path
 */
export declare function getEvidencePath(paths: VstackPaths, deliveryId: string, evidenceId: string): string;
/**
 * Get approval file path
 */
export declare function getApprovalPath(paths: VstackPaths, deliveryId: string, approvalId: string): string;
/**
 * Get artifact file path
 */
export declare function getArtifactPath(paths: VstackPaths, deliveryId: string, artifactName: string): string;
//# sourceMappingURL=repository-root.d.ts.map