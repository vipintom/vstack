/**
 * Repository root resolution for vstack workflow state
 * Uses OpenCode's canonical project root to ensure single source of truth across worktrees
 */
import { resolve, relative, isAbsolute } from "node:path";
export class VstackPathError extends Error {
    code;
    path;
    constructor(message, code, path) {
        super(message);
        this.code = code;
        this.path = path;
        this.name = "VstackPathError";
    }
}
/**
 * Resolve the canonical vstack root directory for a project.
 * Uses OpenCode's canonical project root to ensure all worktrees share the same state.
 */
export async function resolveVstackRoot(projectRoot) {
    if (!projectRoot || typeof projectRoot !== "string") {
        throw new VstackPathError("Project root is required", "INVALID_PROJECT_ROOT");
    }
    // Resolve to absolute path
    const canonicalRoot = resolve(projectRoot);
    // Validate it's a real directory
    const fs = await import("node:fs");
    if (!fs.existsSync(canonicalRoot) || !fs.statSync(canonicalRoot).isDirectory()) {
        throw new VstackPathError(`Project root does not exist: ${canonicalRoot}`, "NOT_FOUND", canonicalRoot);
    }
    const vstackRoot = resolve(canonicalRoot, ".vstack");
    // Prevent path traversal - ensure .vstack is inside project root
    const relativePath = relative(canonicalRoot, vstackRoot);
    if (relativePath.startsWith("..") || relativePath === "" || isAbsolute(relativePath)) {
        throw new VstackPathError(`vstack directory would escape project root: ${vstackRoot}`, "PATH_TRAVERSAL", vstackRoot);
    }
    return {
        root: vstackRoot,
        state: resolve(vstackRoot, "state"),
        deliveries: resolve(vstackRoot, "deliveries"),
        config: resolve(vstackRoot, "config"),
        reports: resolve(vstackRoot, "reports"),
        locks: resolve(vstackRoot, "state", "locks"),
        events: resolve(vstackRoot, "state", "events.jsonl"),
        index: resolve(vstackRoot, "state", "index.json"),
        manifest: resolve(vstackRoot, "manifest.json"),
    };
}
/**
 * Ensure all vstack directories exist
 */
export async function ensureVstackDirs(paths) {
    const fs = await import("node:fs");
    const dirs = [
        paths.root,
        paths.state,
        paths.deliveries,
        paths.config,
        paths.reports,
        paths.locks,
    ];
    for (const dir of dirs) {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
    }
}
/**
 * Validate a path is within the vstack root
 */
export function validateVstackPath(paths, targetPath, label = "path") {
    const resolvedTarget = resolve(targetPath);
    const resolvedRoot = resolve(paths.root);
    const relativePath = relative(resolvedRoot, resolvedTarget);
    if (relativePath.startsWith("..") || relativePath === "" || isAbsolute(relativePath)) {
        throw new VstackPathError(`${label} would escape vstack root: ${targetPath}`, "PATH_TRAVERSAL", targetPath);
    }
    return resolvedTarget;
}
/**
 * Get delivery directory path
 */
export function getDeliveryDir(paths, deliveryId) {
    if (!/^del_[a-zA-Z0-9_-]+$/.test(deliveryId)) {
        throw new VstackPathError(`Invalid delivery ID format: ${deliveryId}`, "PATH_TRAVERSAL", deliveryId);
    }
    return validateVstackPath(paths, resolve(paths.deliveries, deliveryId), "delivery directory");
}
/**
 * Get task file path
 */
export function getTaskPath(paths, deliveryId, taskId) {
    if (!/^tsk_[a-zA-Z0-9_-]+$/.test(taskId)) {
        throw new VstackPathError(`Invalid task ID format: ${taskId}`, "PATH_TRAVERSAL", taskId);
    }
    const deliveryDir = getDeliveryDir(paths, deliveryId);
    return validateVstackPath(paths, resolve(deliveryDir, "tasks", `${taskId}.json`), "task file");
}
/**
 * Get phase run file path
 */
export function getPhaseRunPath(paths, deliveryId, phaseRunId) {
    if (!/^phrun_[a-zA-Z0-9_-]+$/.test(phaseRunId)) {
        throw new VstackPathError(`Invalid phase run ID format: ${phaseRunId}`, "PATH_TRAVERSAL", phaseRunId);
    }
    const deliveryDir = getDeliveryDir(paths, deliveryId);
    return validateVstackPath(paths, resolve(deliveryDir, "phases", `${phaseRunId}.json`), "phase run file");
}
/**
 * Get agent run file path
 */
export function getAgentRunPath(paths, deliveryId, agentRunId) {
    if (!/^agrun_[a-zA-Z0-9_-]+$/.test(agentRunId)) {
        throw new VstackPathError(`Invalid agent run ID format: ${agentRunId}`, "PATH_TRAVERSAL", agentRunId);
    }
    const deliveryDir = getDeliveryDir(paths, deliveryId);
    return validateVstackPath(paths, resolve(deliveryDir, "agent-runs", `${agentRunId}.json`), "agent run file");
}
/**
 * Get review run file path
 */
export function getReviewRunPath(paths, deliveryId, reviewRunId) {
    if (!/^revrun_[a-zA-Z0-9_-]+$/.test(reviewRunId)) {
        throw new VstackPathError(`Invalid review run ID format: ${reviewRunId}`, "PATH_TRAVERSAL", reviewRunId);
    }
    const deliveryDir = getDeliveryDir(paths, deliveryId);
    return validateVstackPath(paths, resolve(deliveryDir, "reviews", `${reviewRunId}.json`), "review run file");
}
/**
 * Get finding file path
 */
export function getFindingPath(paths, deliveryId, findingId) {
    if (!/^fnd_[a-zA-Z0-9_-]+$/.test(findingId)) {
        throw new VstackPathError(`Invalid finding ID format: ${findingId}`, "PATH_TRAVERSAL", findingId);
    }
    const deliveryDir = getDeliveryDir(paths, deliveryId);
    return validateVstackPath(paths, resolve(deliveryDir, "findings", `${findingId}.json`), "finding file");
}
/**
 * Get evidence file path
 */
export function getEvidencePath(paths, deliveryId, evidenceId) {
    if (!/^evd_[a-zA-Z0-9_-]+$/.test(evidenceId)) {
        throw new VstackPathError(`Invalid evidence ID format: ${evidenceId}`, "PATH_TRAVERSAL", evidenceId);
    }
    const deliveryDir = getDeliveryDir(paths, deliveryId);
    return validateVstackPath(paths, resolve(deliveryDir, "evidence", `${evidenceId}.json`), "evidence file");
}
/**
 * Get approval file path
 */
export function getApprovalPath(paths, deliveryId, approvalId) {
    if (!/^apr_[a-zA-Z0-9_-]+$/.test(approvalId)) {
        throw new VstackPathError(`Invalid approval ID format: ${approvalId}`, "PATH_TRAVERSAL", approvalId);
    }
    const deliveryDir = getDeliveryDir(paths, deliveryId);
    return validateVstackPath(paths, resolve(deliveryDir, "approvals", `${approvalId}.json`), "approval file");
}
/**
 * Get artifact file path
 */
export function getArtifactPath(paths, deliveryId, artifactName) {
    const deliveryDir = getDeliveryDir(paths, deliveryId);
    return validateVstackPath(paths, resolve(deliveryDir, "artifacts", artifactName), "artifact file");
}
//# sourceMappingURL=repository-root.js.map