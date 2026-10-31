/**
 * Delivery Report Generator
 * Generates delivery detail reports for OpenChamber
 */
import { writeJsonFile } from "../../persistence/file-store.js";
import { getTasksForDelivery, getAgentRunsForDelivery, getEvidenceForDelivery } from "./loaders.js";
import { deliveryReportPath } from "./paths.js";
export async function publishDeliveryReport(paths, delivery) {
    const tasks = await getTasksForDelivery(paths, delivery.id);
    const agentRuns = await getAgentRunsForDelivery(paths, delivery.id);
    const evidence = await getEvidenceForDelivery(paths, delivery.id);
    const report = {
        schemaVersion: 1,
        revision: 1,
        delivery: {
            id: delivery.id,
            title: delivery.title,
            description: delivery.description,
            type: delivery.type,
            status: delivery.status,
            currentPhase: delivery.currentPhase,
            profile: delivery.profile,
            risk: delivery.risk,
            labels: delivery.labels || [],
            acceptanceCriteria: delivery.acceptanceCriteria || [],
            createdAt: delivery.createdAt,
            updatedAt: delivery.updatedAt,
            createdBy: delivery.createdBy,
        },
        tasks: tasks.map(t => ({
            id: t.id,
            title: t.title,
            type: t.type,
            status: t.status,
            priority: t.priority,
            dependencies: t.dependencies || [],
            acceptanceCriteria: t.acceptanceCriteria || [],
            assignedAgentId: t.assignedAgentId,
            workScope: t.workScope,
            createdAt: t.createdAt,
            updatedAt: t.updatedAt,
            completedAt: t.completedAt,
        })),
        agentRuns: agentRuns.map(r => ({
            id: r.id,
            agentId: r.agentId,
            taskId: r.taskId,
            role: r.agentId.replace("vstack-", ""),
            status: r.status,
            startedAt: r.startedAt,
            completedAt: r.completedAt,
            resultSummary: r.resultSummary,
            error: r.error,
        })),
        evidence: evidence.map(e => ({
            id: e.id,
            checkId: e.checkId,
            type: e.type,
            status: e.status,
            exitCode: e.exitCode,
            summary: e.summary,
            completedAt: e.completedAt,
            taskId: e.taskId,
        })),
        reviewFindings: [],
        generatedAt: new Date().toISOString(),
    };
    await writeJsonFile(paths, deliveryReportPath(paths, delivery.id), report);
}
//# sourceMappingURL=delivery-reports.js.map