/**
 * Permissions and policy management
 * Defines agent permissions, approval policies, and autonomy modes
 */
import { VstackPaths } from "../persistence/repository-root.js";
export type AutonomyMode = "assisted" | "supervised" | "autonomous";
export type ApprovalType = "design_approval" | "release_approval" | "publish_approval" | "production_deployment_approval" | "destructive_migration_approval" | "rollback_approval" | "scope_change_approval" | "external_api_approval";
export type AgentRole = "vstack-lead" | "vstack-architect" | "vstack-developer" | "vstack-test-engineer" | "vstack-reviewer" | "vstack-operator" | "human";
export interface PermissionRule {
    action: string;
    resource: string;
    effect: "allow" | "deny";
    conditions?: Record<string, unknown>;
}
export interface AgentPermissions {
    role: AgentRole;
    permissions: PermissionRule[];
    autonomyMode: AutonomyMode;
    maxConcurrentTasks: number;
    allowedTools: string[];
    allowedSkills: string[];
}
export interface ApprovalPolicy {
    type: ApprovalType;
    required: boolean;
    approvers: string[];
    timeout: number;
    autoApproveIf: string[];
    requiresEvidence: boolean;
}
export interface PolicyConfig {
    autonomyMode: AutonomyMode;
    agentPermissions: Record<AgentRole, AgentPermissions>;
    approvalPolicies: Record<ApprovalType, ApprovalPolicy>;
    protectedOperations: ProtectedOperation[];
    defaultTimeout: number;
}
export interface ProtectedOperation {
    id: string;
    name: string;
    description: string;
    approvalType: ApprovalType;
    requiresEvidence: boolean;
    allowedRoles: AgentRole[];
    cooldown?: number;
}
/**
 * Default policy configuration
 */
export declare const DEFAULT_POLICY_CONFIG: PolicyConfig;
/**
 * Create policy manager
 */
export declare function createPolicyManager(paths: VstackPaths): Promise<{
    /**
     * Get agent permissions
     */
    getAgentPermissions(role: AgentRole): AgentPermissions | null;
    /**
     * Check if agent has permission
     */
    hasPermission(role: AgentRole, action: string, resource: string): boolean;
    /**
     * Get approval policy
     */
    getApprovalPolicy(type: ApprovalType): ApprovalPolicy | null;
    /**
     * Check if operation requires approval
     */
    requiresApproval(operationId: string): ProtectedOperation | null;
    /**
     * Get protected operations for role
     */
    getProtectedOperationsForRole(role: AgentRole): ProtectedOperation[];
    /**
     * Check if autonomy mode allows action
     */
    canAutonomousAct(role: AgentRole, action: string): boolean;
    /**
     * Get all agent roles
     */
    getAllRoles(): AgentRole[];
    /**
     * Update agent permissions (requires admin)
     */
    updateAgentPermissions(role: AgentRole, permissions: Partial<AgentPermissions>): Promise<AgentPermissions | null>;
    /**
     * Update approval policy
     */
    updateApprovalPolicy(type: ApprovalType, policy: Partial<ApprovalPolicy>): Promise<ApprovalPolicy | null>;
}>;
//# sourceMappingURL=permissions.d.ts.map