/**
 * Approval management
 * Handles approval workflows for protected operations
 */
import { readJsonFile, writeJsonFile, listFiles } from "../persistence/file-store.js";
import { appendEvent, EventPayloads } from "../persistence/event-log.js";
import { resolve } from "node:path";
/**
 * Create approval manager
 */
export async function createApprovalManager(paths) {
    return {
        async requestApproval(type, title, description, requestedBy, details, evidenceIds, config) {
            const requestId = `apr_${crypto.randomUUID().replace(/-/g, "").slice(0, 16)}`;
            const now = new Date().toISOString();
            const requiredApprovals = 1;
            const approvers = ["human"];
            const request = {
                id: `apr_${crypto.randomUUID().replace(/-/g, "").slice(0, 16)}`,
                type,
                title,
                description,
                requestedBy,
                requestedAt: now,
                status: "pending",
                details,
                evidenceIds,
                approvers: ["human"],
                requiredApprovals: 1,
                currentApprovals: 0,
                decidedBy: null,
                decidedAt: null,
                reason: null,
                expiresAt: new Date(Date.now() + 86400000).toISOString(),
                metadata: {},
                revision: 1,
            };
            const requestPath = resolve(paths.deliveries, "approvals", `${requestId}.json`);
            await writeJsonFile(paths, requestPath, request);
            await appendEvent(paths, EventPayloads.approvalRequested("unknown", requestId, type));
            return request;
        },
        async approveRequest(requestId, approvedBy, reason) {
            const requestPath = resolve(paths.deliveries, "approvals", `${requestId}.json`);
            const request = await readJsonFile(paths, requestPath);
            if (!request)
                throw new Error(`Approval ${requestId} not found`);
            if (request.status !== "pending")
                throw new Error(`Not pending: ${request.status}`);
            const updated = {
                ...request,
                status: "approved",
                decidedBy: approvedBy,
                decidedAt: new Date().toISOString(),
                reason: reason ?? "Approved",
                revision: (request.revision ?? 0) + 1,
            };
            await writeJsonFile(paths, requestPath, updated);
            await appendEvent(paths, EventPayloads.approvalGranted("unknown", requestId, approvedBy));
            return updated;
        },
        async rejectRequest(requestId, rejectedBy, reason) {
            const requestPath = resolve(paths.deliveries, "approvals", `${requestId}.json`);
            const request = await readJsonFile(paths, requestPath);
            if (!request)
                throw new Error(`Approval ${requestId} not found`);
            if (request.status !== "pending")
                throw new Error(`Not pending`);
            const updated = {
                ...request,
                status: "rejected",
                decidedBy: rejectedBy,
                decidedAt: new Date().toISOString(),
                reason,
                revision: (request.revision ?? 0) + 1,
            };
            await writeJsonFile(paths, requestPath, updated);
            await appendEvent(paths, EventPayloads.approvalRejected("unknown", requestId, rejectedBy));
            return updated;
        },
        async getPendingApprovals() {
            const approvalIds = listFiles(paths, resolve(paths.deliveries, "approvals"));
            const pending = [];
            for (const approvalId of approvalIds) {
                const approval = await readJsonFile(paths, resolve(paths.deliveries, "approvals", `${approvalId}.json`));
                if (approval && approval.status === "pending") {
                    pending.push(approval);
                }
            }
            return pending;
        },
        async checkExpiredApprovals() {
            const approvalIds = listFiles(paths, resolve(paths.deliveries, "approvals"));
            const expired = [];
            for (const id of approvalIds) {
                const approval = await readJsonFile(paths, resolve(paths.deliveries, "approvals", `${id}.json`));
                if (approval && approval.status === "pending" && new Date() > new Date(approval.expiresAt)) {
                    const updated = { ...approval, status: "expired" };
                    await writeJsonFile(paths, resolve(paths.deliveries, "approvals", `${id}.json`), updated);
                    expired.push(id);
                }
            }
            return expired;
        },
    };
}
//# sourceMappingURL=approvals.js.map