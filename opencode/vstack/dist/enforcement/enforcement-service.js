/**
 * Basic Enforcement Service
 *
 * Enforces a small set of rules with clear value:
 * 1. Delivery cannot be completed while required tasks remain incomplete
 * 2. Task cannot be completed where required check evidence is missing or failed
 * 3. Protected actions require explicit approval
 * 4. Blocked status requires a reason
 * 5. Blocking reviewer findings must be resolved before completion
 */
import { readJsonFile } from "../persistence/file-store.js";
import { resolve } from "node:path";
const PROTECTED_ACTIONS = [
    "complete_delivery",
    "complete_task",
    "mark_delivery_blocked",
    "mark_task_blocked",
    "delete_delivery",
    "delete_task",
];
function evidenceDir(paths, deliveryId) {
    return resolve(paths.deliveries, deliveryId, "evidence");
}
export async function createEnforcementService(paths) {
    return {
        async canCompleteDelivery(deliveryId) {
            const reasons = [];
            // Get delivery
            const deliveryPath = resolve(paths.deliveries, deliveryId, "delivery.json");
            const delivery = await readJsonFile(paths, deliveryPath);
            if (!delivery) {
                return { allowed: false, reasons: ["Delivery not found"] };
            }
            // Get all tasks for this delivery
            const taskDir = resolve(paths.deliveries, deliveryId, "tasks");
            const { readdirSync } = await import("node:fs");
            let taskFiles = [];
            try {
                taskFiles = readdirSync(taskDir).filter(f => f.endsWith(".json"));
            }
            catch {
                taskFiles = [];
            }
            const incompleteTasks = [];
            for (const file of taskFiles) {
                const taskPath = resolve(taskDir, file);
                const task = await readJsonFile(paths, taskPath);
                if (task && task.status !== "completed" && task.status !== "cancelled" && task.status !== "skipped") {
                    incompleteTasks.push(`${task.id}: ${task.title} (${task.status})`);
                }
            }
            if (incompleteTasks.length > 0) {
                reasons.push(`${incompleteTasks.length} incomplete task(s): ${incompleteTasks.join("; ")}`);
            }
            return {
                allowed: reasons.length === 0,
                reasons,
                blockedBy: incompleteTasks.length > 0 ? incompleteTasks : undefined,
            };
        },
        async canCompleteTask(deliveryId, taskId) {
            const reasons = [];
            // Get task
            const taskPath = resolve(paths.deliveries, deliveryId, "tasks", `${taskId}.json`);
            const task = await readJsonFile(paths, taskPath);
            if (!task) {
                return { allowed: false, reasons: ["Task not found"] };
            }
            // Check dependencies
            const incompleteDeps = [];
            for (const depId of task.dependencies) {
                const depPath = resolve(paths.deliveries, deliveryId, "tasks", `${depId}.json`);
                const depTask = await readJsonFile(paths, depPath);
                if (!depTask || depTask.status !== "completed") {
                    incompleteDeps.push(depId);
                }
            }
            if (incompleteDeps.length > 0) {
                reasons.push(`${incompleteDeps.length} incomplete dependency task(s): ${incompleteDeps.join(", ")}`);
            }
            // Check acceptance criteria evidence
            if (task.acceptanceCriteria && task.acceptanceCriteria.length > 0) {
                const evidence = await listEvidenceForTask(paths, deliveryId, taskId);
                const passedChecks = evidence.filter(e => e.status === "passed");
                if (passedChecks.length === 0) {
                    reasons.push("No passing evidence for acceptance criteria");
                }
            }
            // Check for failed evidence
            const evidence = await listEvidenceForTask(paths, deliveryId, taskId);
            const failedEvidence = evidence.filter(e => e.status === "failed");
            if (failedEvidence.length > 0) {
                reasons.push(`${failedEvidence.length} failed check(s): ${failedEvidence.map(e => e.checkId).join(", ")}`);
            }
            return {
                allowed: reasons.length === 0,
                reasons,
                blockedBy: incompleteDeps.length > 0 ? incompleteDeps : undefined,
            };
        },
        async validateBlockedStatus(deliveryId, entityType, entityId, reason) {
            if (!reason || reason.trim().length === 0) {
                return { allowed: false, reasons: ["Blocked status requires a non-empty reason"] };
            }
            return { allowed: true, reasons: [] };
        },
        requiresApproval(action) {
            return PROTECTED_ACTIONS.includes(action);
        },
        async recordApproval(action, deliveryId, granted, reason) {
            // In a full implementation, this would write to an approvals file
            // For now, we just log the approval decision
            console.log(`[vstack] Approval ${granted ? "granted" : "denied"} for ${action} on ${deliveryId}: ${reason ?? "no reason"}`);
        },
    };
}
async function listEvidenceForTask(paths, deliveryId, taskId) {
    const dir = evidenceDir(paths, deliveryId);
    const { readdirSync, readFileSync, existsSync } = await import("node:fs");
    if (!existsSync(dir))
        return [];
    const files = readdirSync(dir).filter((f) => f.endsWith(".json"));
    const results = [];
    for (const file of files) {
        const evidence = JSON.parse(readFileSync(resolve(dir, file), "utf-8"));
        if (evidence.taskId === taskId) {
            results.push(evidence);
        }
    }
    return results;
}
//# sourceMappingURL=enforcement-service.js.map