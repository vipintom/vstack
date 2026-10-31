/**
 * Finding resolution and remediation
 * Handles fixing findings, re-review, and closure
 */
import { readJsonFile, writeJsonFile, listFiles } from "../persistence/file-store.js";
import { createTaskService } from "../tasks/task-service.js";
import { resolve } from "node:path";
/**
 * Create resolution manager
 */
export async function createResolutionManager(paths) {
    const taskService = await createTaskService(paths);
    return {
        /**
         * Create remediation plan for findings
         */
        async createRemediationPlan(deliveryId, findingIds, assignedAgent) {
            const plans = [];
            for (const findingId of findingIds) {
                // Get finding details
                const findingPath = resolve(paths.deliveries, deliveryId, "findings", `${findingId}.json`);
                const finding = await readJsonFile(paths, findingPath);
                if (!finding)
                    continue;
                // Create remediation task
                const taskId = `tsk_${crypto.randomUUID().replace(/-/g, "").slice(0, 16)}`;
                // Create task via task service
                await taskService.createTask({
                    deliveryId,
                    phaseRunId: finding.phaseRunId ?? "", // Would need proper phase run ID
                    title: `Fix: ${finding.title}`,
                    description: `Remediate finding ${findingId}: ${finding.title}\n\n${finding.explanation}\n\nRecommendation: ${finding.recommendation}`,
                    type: "implementation",
                    priority: mapSeverityToPriority(finding.severity),
                    dependencies: [],
                    acceptanceCriteria: [
                        `Finding ${findingId} is resolved`,
                        finding.recommendation,
                    ],
                    expectedOutputs: [
                        "Fixed code",
                        "Updated tests",
                        "Evidence of fix",
                    ],
                    requiredSkills: ["vstack-implementation", "vstack-testing"],
                    workScope: finding.filePath || "affected files",
                    worktreePath: null,
                    maxAttempts: 2,
                    ownerAgentId: assignedAgent,
                });
                const plan = {
                    findingId,
                    remediationTaskId: taskId,
                    description: finding.title,
                    steps: [
                        "Analyze finding and understand root cause",
                        "Implement fix per recommendation",
                        "Add/update tests to prevent regression",
                        "Run relevant tests to verify fix",
                        "Submit for re-review",
                    ],
                    acceptanceCriteria: [
                        `Finding ${findingId} is resolved`,
                        finding.recommendation,
                    ],
                    estimatedEffort: estimateEffort(finding.severity),
                    assignedAgent,
                    dependencies: [],
                };
                plans.push(plan);
            }
            return plans;
        },
        /**
         * Assign findings to agents for remediation
         */
        async assignFindings(deliveryId, assignments) {
            for (const { findingId, agentId } of assignments) {
                const findingPath = resolve(paths.deliveries, deliveryId, "findings", `${findingId}.json`);
                const finding = await readJsonFile(paths, findingPath);
                if (!finding)
                    continue;
                // Update finding
                const updatedFinding = {
                    ...finding,
                    owner: agentId,
                    status: "accepted",
                    updatedAt: new Date().toISOString(),
                };
                await writeJsonFile(paths, findingPath, updatedFinding);
            }
        },
        /**
         * Submit finding for re-review after fix
         */
        async submitForReReview(deliveryId, findingId, evidenceIds, resolvedBy, notes) {
            const findingPath = resolve(paths.deliveries, deliveryId, "findings", `${findingId}.json`);
            const finding = await readJsonFile(paths, findingPath);
            if (!finding)
                throw new Error(`Finding ${findingId} not found`);
            const updatedFinding = {
                ...finding,
                status: "fixed",
                resolutionEvidenceIds: evidenceIds,
                owner: resolvedBy,
                updatedAt: new Date().toISOString(),
                notes: notes ?? finding.notes,
            };
            await writeJsonFile(paths, findingPath, updatedFinding);
        },
        /**
         * Request re-review for fixed findings
         */
        async requestReReview(request) {
            // In real implementation, this would call the review orchestrator
            // to start a new review run targeting the fixed findings
            return {
                newReviewRunId: `revrun_${crypto.randomUUID().replace(/-/g, "").slice(0, 16)}`,
                message: `Re-review requested for ${request.fixedFindingIds.length} findings`,
            };
        },
        /**
         * Check if all findings are resolved
         */
        async areAllFindingsResolved(deliveryId, reviewRunId) {
            const findingIds = listFiles(paths, resolve(paths.deliveries, deliveryId, "findings"));
            let open = 0, fixed = 0, falsePositive = 0, deferred = 0;
            for (const findingId of findingIds) {
                const findingPath = resolve(paths.deliveries, deliveryId, "findings", `${findingId}.json`);
                const finding = await readJsonFile(paths, findingPath);
                if (!finding)
                    continue;
                if (finding.reviewRunId !== reviewRunId)
                    continue;
                switch (finding.status) {
                    case "open":
                        open++;
                        break;
                    case "fixed":
                        fixed++;
                        break;
                    case "false_positive":
                    case "deferred":
                        deferred++;
                        break;
                }
            }
            return {
                allResolved: open === 0,
                open,
                fixed,
                falsePositive,
                deferred,
            };
        },
        /**
         * Close findings after re-review confirms fix
         */
        async closeFixedFindings(deliveryId, reReviewRunId, confirmedFixedFindingIds) {
            for (const findingId of confirmedFixedFindingIds) {
                const findingPath = resolve(paths.deliveries, deliveryId, "findings", `${findingId}.json`);
                const finding = await readJsonFile(paths, findingPath);
                if (!finding)
                    continue;
                // Update to closed (using fixed status with re-review confirmation)
                const updatedFinding = {
                    ...finding,
                    status: "fixed",
                    lastReviewedReviewRunId: reReviewRunId,
                    updatedAt: new Date().toISOString(),
                };
                await writeJsonFile(paths, findingPath, updatedFinding);
            }
        },
        /**
         * Get resolution statistics
         */
        async getResolutionStats(deliveryId, reviewRunId) {
            const findingIds = listFiles(paths, resolve(paths.deliveries, deliveryId, "findings"));
            let total = 0, open = 0, fixed = 0, falsePositive = 0, deferred = 0;
            let totalFixTime = 0;
            let fixCount = 0;
            for (const findingId of findingIds) {
                const findingPath = resolve(paths.deliveries, deliveryId, "findings", `${findingId}.json`);
                const finding = await readJsonFile(paths, findingPath);
                if (!finding)
                    continue;
                if (finding.reviewRunId !== reviewRunId)
                    continue;
                total++;
                switch (finding.status) {
                    case "open":
                        open++;
                        break;
                    case "fixed":
                        fixed++;
                        if (finding.createdAt && finding.updatedAt) {
                            const created = new Date(finding.createdAt).getTime();
                            const resolved = new Date(finding.updatedAt).getTime();
                            totalFixTime += (resolved - created) / (1000 * 60 * 60); // hours
                            fixCount++;
                        }
                        break;
                    case "false_positive":
                        falsePositive++;
                        break;
                    case "deferred":
                        deferred++;
                        break;
                }
            }
            return {
                total,
                open,
                fixed,
                falsePositive,
                deferred,
                resolutionRate: total > 0 ? (fixed + falsePositive) / total : 1,
                avgTimeToFix: fixCount > 0 ? totalFixTime / fixCount : 0,
            };
        },
    };
}
function mapSeverityToPriority(severity) {
    return severity;
}
function estimateEffort(severity) {
    switch (severity) {
        case "critical":
        case "high": return "large";
        case "medium": return "medium";
        case "low":
        case "informational": return "small";
        default: return "medium";
    }
}
//# sourceMappingURL=resolution.js.map