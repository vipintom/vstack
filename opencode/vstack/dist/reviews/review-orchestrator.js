/**
 * Review orchestrator
 * Manages Goldfish review process with fresh-context reviewers
 */
import { reviewRunId, deliveryId, phaseRunId, findingId } from "../schemas/types.js";
import { readJsonFile, writeJsonFile } from "../persistence/file-store.js";
import { resolve } from "node:path";
import { randomUUID } from "node:crypto";
/**
 * Create review orchestrator
 */
export async function createReviewOrchestrator(paths) {
    return {
        /**
         * Start a review run
         */
        async startReview(deliveryIdParam, phaseRunIdParam, config, targetArtifacts, acceptanceRequirements) {
            const now = new Date().toISOString();
            // Create reviewer assignments
            const reviewers = config.lenses.map(lens => ({
                agentId: "vstack-reviewer",
                lens,
                sessionId: null,
                status: "pending",
                reportPath: null,
                startedAt: null,
                completedAt: null,
            }));
            const newReviewRunId = reviewRunId(`rr_${randomUUID().replace(/-/g, "").slice(0, 16)}`);
            const newDeliveryId = deliveryId(deliveryIdParam);
            const newPhaseRunId = phaseRunIdParam ? phaseRunId(phaseRunIdParam) : null;
            const reviewRun = {
                schemaVersion: 1,
                id: newReviewRunId,
                deliveryId: newDeliveryId,
                phaseRunId: newPhaseRunId,
                profile: config.profile,
                reviewers,
                status: "pending",
                targetArtifacts,
                scope: config.lenses.join(", "),
                acceptanceRequirements,
                findings: [],
                consolidatedReportPath: null,
                startedAt: now,
                completedAt: null,
                revision: 1,
            };
            // Save review run
            const reviewRunPath = resolve(paths.deliveries, deliveryIdParam, "reviews", `${newReviewRunId}.json`);
            await writeJsonFile(paths, reviewRunPath, reviewRun);
            // Dispatch reviewers if independent
            if (config.independent) {
                // In real implementation, dispatch via session tracker
                // For now, mark as running
                for (const reviewer of reviewers) {
                    reviewer.status = "running";
                    reviewer.startedAt = new Date().toISOString();
                    // Would dispatch vstack-reviewer agent here
                }
                reviewRun.status = "running";
                await writeJsonFile(paths, reviewRunPath, reviewRun);
            }
            // Log event
            // await appendEvent(paths, EventPayloads.reviewStarted(deliveryIdParam, newReviewRunId, config.profile));
            return reviewRun;
        },
        /**
         * Record reviewer findings
         */
        async recordReviewerFindings(reviewRunIdParam, reviewerAgentId, lens, deliveryIdParam, findings) {
            const reviewRunPath = resolve(paths.deliveries, "reviews", `${reviewRunIdParam}.json`);
            // Would read review run to get deliveryId
            // For now, assume deliveryId is known
            const now = new Date().toISOString();
            const recordedFindings = findings.map(f => ({
                schemaVersion: 1,
                id: findingId(`fnd_${randomUUID().replace(/-/g, "").slice(0, 16)}`),
                deliveryId: deliveryId(deliveryIdParam),
                reviewRunId: reviewRunId(reviewRunIdParam),
                reviewerAgentId,
                lens: f.lens,
                severity: f.severity,
                category: f.category,
                title: f.title,
                explanation: f.explanation,
                filePath: f.filePath ?? null,
                lineRange: f.lineRange ?? null,
                reproducibility: f.reproducibility ?? null,
                recommendation: f.recommendation,
                status: "open",
                owner: null,
                remediationTaskId: null,
                resolutionEvidenceIds: [],
                firstSeenReviewRunId: reviewRunId(reviewRunIdParam),
                lastReviewedReviewRunId: null,
                createdAt: now,
                updatedAt: now,
                revision: 1,
            }));
            // Save findings
            for (const finding of recordedFindings) {
                const findingPath = resolve(paths.deliveries, deliveryIdParam, "findings", `${finding.id}.json`);
                await writeJsonFile(paths, findingPath, finding);
            }
            // Update review run
            // const reviewRun = await readJsonFile(paths, reviewRunPath);
            // reviewRun.findings.push(...recordedFindings.map(f => f.id));
            // await writeJsonFile(paths, reviewRunPath, reviewRun);
            return recordedFindings;
        },
        /**
         * Synthesize findings from all reviewers
         */
        async synthesizeFindings(reviewRunIdParam, deliveryIdParam) {
            // Get all findings for this review run
            const findingIds = listFiles(paths, resolve(paths.deliveries, deliveryIdParam, "findings"))
                .filter(id => id.startsWith("fnd_"));
            const findings = [];
            for (const findingId of findingIds) {
                const findingPath = resolve(paths.deliveries, deliveryIdParam, "findings", `${findingId}.json`);
                const finding = await readJsonFile(paths, findingPath);
                if (finding && finding.reviewRunId === reviewRunId) {
                    findings.push(finding);
                }
            }
            // Deduplicate findings
            const deduplication = await this.deduplicateFindings(findings);
            // Generate summary
            const bySeverity = this.countBySeverity(findings);
            const byLens = this.countByLens(findings);
            const report = {
                reviewRunId: reviewRunIdParam,
                deliveryId: deliveryIdParam,
                generatedAt: new Date().toISOString(),
                summary: {
                    totalFindings: findings.length,
                    bySeverity,
                    byLens: this.countByLens(findings),
                },
                findings,
                deduplication,
                coverage: {
                    reviewed: [], // Would track what was reviewed
                    notReviewed: [],
                    gaps: [],
                },
                recommendations: this.generateRecommendations(findings),
                revision: 1,
            };
            // Save consolidated report
            const reportPath = resolve(paths.deliveries, deliveryIdParam, "reviews", `${reviewRunIdParam}_consolidated.json`);
            await writeJsonFile(paths, reportPath, report);
            // Update review run
            // const reviewRun = await readJsonFile(paths, reviewRunPath);
            // reviewRun.consolidatedReportPath = reportPath;
            // reviewRun.status = "completed";
            // reviewRun.completedAt = new Date().toISOString();
            // await writeJsonFile(paths, reviewRunPath, reviewRun);
            return report;
        },
        /**
         * Deduplicate findings
         */
        async deduplicateFindings(findings) {
            const deduplication = {};
            const groups = new Map();
            // Group by location and category
            for (const finding of findings) {
                const key = `${finding.filePath}:${finding.lineRange?.start}:${finding.category}:${finding.title.substring(0, 50)}`;
                const group = groups.get(key) ?? [];
                group.push(finding);
                groups.set(key, group);
            }
            for (const [key, group] of groups) {
                if (group.length > 1) {
                    // Find highest severity
                    const severityOrder = { critical: 4, high: 3, medium: 2, low: 1, informational: 0 };
                    const merged = group.reduce((max, f) => severityOrder[f.severity] > severityOrder[max.severity] ? f : max);
                    deduplication[merged.id] = {
                        originalFindings: group.map(f => f.id),
                        mergedSeverity: merged.severity,
                        disposition: "accepted",
                    };
                }
            }
            return deduplication;
        },
        /**
         * Complete review run
         */
        async completeReview(reviewRunId, deliveryId) {
            const report = await this.synthesizeFindings(reviewRunId, deliveryId);
            // Determine if review passed
            const criticalCount = report.findings.filter(f => f.severity === "critical").length;
            const highCount = report.findings.filter(f => f.severity === "high").length;
            const passed = criticalCount === 0 && highCount === 0;
            return {
                reviewRunId,
                passed,
                findings: report.findings.map(f => f.id),
                consolidatedReportPath: `reviews/${reviewRunId}_consolidated.json`,
                summary: {
                    totalFindings: report.findings.length,
                    bySeverity: report.summary.bySeverity,
                    byLens: report.summary.byLens,
                },
                recommendations: report.recommendations,
            };
        },
        /**
         * Count findings by severity
         */
        countBySeverity(findings) {
            const counts = {};
            for (const f of findings) {
                counts[f.severity] = (counts[f.severity] || 0) + 1;
            }
            return counts;
        },
        /**
         * Count findings by lens
         */
        countByLens(findings) {
            const counts = {};
            for (const f of findings) {
                counts[f.lens] = (counts[f.lens] || 0) + 1;
            }
            return counts;
        },
        /**
         * Generate recommendations
         */
        generateRecommendations(findings) {
            const recs = [];
            const critical = findings.filter(f => f.severity === "critical").length;
            const high = findings.filter(f => f.severity === "high").length;
            if (critical > 0) {
                recs.push(`Address ${critical} critical findings before proceeding`);
            }
            if (high > 0) {
                recs.push(`Resolve ${high} high-severity findings`);
            }
            // Add lens-specific recommendations
            const byLens = this.countByLens(findings);
            for (const [lens, count] of Object.entries(byLens)) {
                if (count > 0) {
                    recs.push(`Review ${lens} findings (${count} total)`);
                }
            }
            return recs;
        },
    };
}
/**
 * Helper to list files
 */
function listFiles(paths, dirPath) {
    const fs = require("node:fs");
    const { validateVstackPath } = require("../persistence/repository-root.js");
    const validatedPath = validateVstackPath(paths, dirPath);
    if (!fs.existsSync(validatedPath))
        return [];
    try {
        return fs.readdirSync(validatedPath)
            .filter((name) => name.endsWith(".json"))
            .map((name) => name.slice(0, -5));
    }
    catch {
        return [];
    }
}
//# sourceMappingURL=review-orchestrator.js.map