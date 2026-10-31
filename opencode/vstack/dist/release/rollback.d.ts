/**
 * Rollback management
 * Handles automated and manual rollback procedures
 */
import { VstackPaths } from "../persistence/repository-root.js";
export interface RollbackConfig {
    enabled: boolean;
    automatic: boolean;
    triggers: RollbackTrigger[];
    strategies: RollbackStrategy[];
    maxRollbackTime: number;
    requireApproval: boolean;
}
export interface RollbackTrigger {
    type: "health_check_failure" | "metric_threshold" | "error_rate" | "manual" | "approval_rejected";
    conditions: RollbackCondition[];
    severity: "warning" | "critical";
}
export interface RollbackCondition {
    metric: string;
    operator: ">" | "<" | ">=" | "<=" | "==" | "!=";
    threshold: number;
    window: string;
}
export interface RollbackStrategy {
    name: string;
    type: "reverse" | "redeploy_previous" | "blue_green_switch" | "canary_pause" | "manual";
    steps: RollbackStep[];
    maxDuration: number;
    applicableEnvironments: string[];
}
export interface RollbackStep {
    name: string;
    type: "command" | "api_call" | "traffic_shift" | "database_migration" | "notification";
    command?: string[];
    apiEndpoint?: string;
    apiMethod?: string;
    apiPayload?: Record<string, unknown>;
    timeout: number;
    retryOnFailure: boolean;
    maxRetries: number;
    rollbackOnFailure: boolean;
}
export interface RollbackExecution {
    id: string;
    deploymentId: string;
    strategy: string;
    trigger: string;
    status: "initiated" | "running" | "completed" | "failed" | "cancelled";
    startedAt: string;
    completedAt: string | null;
    stepsCompleted: string[];
    failedStep?: string;
    error?: string;
    approvedBy: string | null;
    approvalRequired: boolean;
    revision?: number;
}
export interface RollbackReport {
    executionId: string;
    deploymentId: string;
    strategy: string;
    trigger: string;
    status: "success" | "failed" | "partial";
    startedAt: string;
    completedAt: string;
    duration: number;
    stepsCompleted: string[];
    failedSteps: string[];
    healthCheckResults: HealthCheckResult[];
    lessonsLearned: string[];
}
export interface HealthCheckResult {
    name: string;
    passed: boolean;
    latencyMs: number;
    timestamp: string;
}
/**
 * Create rollback manager
 */
export declare function createRollbackManager(paths: VstackPaths): Promise<{
    /**
     * Initiate rollback
     */
    initiateRollback(deploymentId: string, trigger: string, config: RollbackConfig, requestedBy: string): Promise<RollbackExecution>;
    /**
     * Execute rollback
     */
    executeRollback(executionId: string, strategy: RollbackStrategy): Promise<RollbackReport>;
    /**
     * Approve rollback
     */
    approveRollback(executionId: string, approvedBy: string): Promise<RollbackExecution>;
    /**
     * Get rollback history
     */
    getRollbackHistory(deliveryId?: string): Promise<RollbackExecution[]>;
    /**
     * Validate rollback readiness
     */
    validateRollbackReadiness(deploymentId: string): Promise<{
        ready: boolean;
        checks: Array<{
            name: string;
            passed: boolean;
            message: string;
        }>;
    }>;
}>;
//# sourceMappingURL=rollback.d.ts.map