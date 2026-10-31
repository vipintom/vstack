/**
 * Approval management
 * Handles approval workflows for protected operations
 */
import { VstackPaths } from "../persistence/repository-root.js";
export type ApprovalType = "design_approval" | "release_approval" | "publish_approval" | "production_deployment_approval" | "destructive_migration_approval" | "rollback_approval" | "scope_change_approval" | "external_api_approval";
export interface ApprovalRequest {
    id: string;
    type: ApprovalType;
    title: string;
    description: string;
    requestedBy: string;
    requestedAt: string;
    status: "pending" | "approved" | "rejected" | "expired";
    details: Record<string, unknown>;
    evidenceIds: string[];
    approvers: string[];
    requiredApprovals: number;
    currentApprovals: number;
    decidedBy: string | null;
    decidedAt: string | null;
    reason: string | null;
    expiresAt: string;
    metadata: Record<string, unknown>;
}
export interface ApprovalConfig {
    defaultTimeout: number;
    requiredApprovers: Record<string, number>;
    approversByType: Record<string, string[]>;
    autoApproveConditions: Record<string, string[]>;
    escalationTimeout: number;
    escalationApprovers: string[];
}
export interface ApprovalResult {
    requestId: string;
    success: boolean;
    decision: "approved" | "rejected";
    decidedBy: string;
    decidedAt: string;
    reason: string | null;
}
/**
 * Create approval manager
 */
export declare function createApprovalManager(paths: VstackPaths): Promise<{
    requestApproval(type: string, title: string, description: string, requestedBy: string, details: Record<string, unknown>, evidenceIds: string[], config: ApprovalConfig): Promise<{
        id: string;
        type: string;
        title: string;
        description: string;
        requestedBy: string;
        requestedAt: string;
        status: string;
        details: Record<string, unknown>;
        evidenceIds: string[];
        approvers: string[];
        requiredApprovals: number;
        currentApprovals: number;
        decidedBy: null;
        decidedAt: null;
        reason: null;
        expiresAt: string;
        metadata: {};
        revision: number;
    }>;
    approveRequest(requestId: string, approvedBy: string, reason?: string): Promise<any>;
    rejectRequest(requestId: string, rejectedBy: string, reason: string): Promise<any>;
    getPendingApprovals(): Promise<any[]>;
    checkExpiredApprovals(): Promise<string[]>;
}>;
//# sourceMappingURL=approvals.d.ts.map