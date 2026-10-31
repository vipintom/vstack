/**
 * Deployment management
 * Handles deployment planning, execution, and rollback
 */
import { VstackPaths } from "../persistence/repository-root.js";
export interface DeploymentConfig {
    strategy: "rolling" | "blue-green" | "canary" | "recreate";
    environment: string;
    timeout: number;
    healthChecks: HealthCheckConfig[];
    rollbackOnFailure: boolean;
    requiredApprovals: string[];
}
export interface HealthCheckConfig {
    name: string;
    type: "http" | "tcp" | "command" | "grpc";
    endpoint?: string;
    command?: string[];
    expectedStatus?: number;
    timeout: number;
    interval: number;
    retries: number;
}
export interface DeploymentPlan {
    id: string;
    deliveryId: string;
    environment: string;
    strategy: string;
    version: string;
    steps: DeploymentStep[];
    rollbackPlan: RollbackPlan;
    requiredApprovals: string[];
    createdAt: string;
    revision?: number;
}
export interface DeploymentStep {
    name: string;
    type: "pre_check" | "deploy" | "health_check" | "smoke_test" | "traffic_switch" | "post_check";
    command?: string[];
    healthCheck?: string;
    timeout: number;
    rollbackAction?: string;
}
export interface RollbackPlan {
    strategy: "reverse" | "redeploy_previous" | "manual";
    steps: RollbackStep[];
    maxRollbackTime: number;
    triggerConditions: string[];
}
export interface RollbackStep {
    name: string;
    command?: string[];
    timeout: number;
}
export interface DeploymentResult {
    deploymentId: string;
    status: "success" | "failed" | "rolled_back" | "partial";
    startedAt: string;
    completedAt: string;
    stepsCompleted: string[];
    failedStep?: string;
    error?: string;
    healthCheckResults: HealthCheckResult[];
}
export interface HealthCheckResult {
    name: string;
    passed: boolean;
    attempts: number;
    latencyMs: number;
    error?: string;
}
/**
 * Create deployment manager
 */
export declare function createDeploymentManager(paths: VstackPaths): Promise<{
    /**
     * Create deployment plan
     */
    createDeploymentPlan(deliveryId: string, version: string, config: DeploymentConfig): Promise<DeploymentPlan>;
    /**
     * Execute deployment
     */
    executeDeployment(plan: DeploymentPlan, config: DeploymentConfig): Promise<DeploymentResult>;
    /**
     * Rollback deployment
     */
    rollback(plan: DeploymentPlan): Promise<void>;
    /**
     * Run health check
     */
    runHealthCheck(config: HealthCheckConfig): Promise<any>;
    /**
     * Generate deployment steps
     */
    generateDeploymentSteps(config: DeploymentConfig): any[];
    /**
     * Generate rollback plan
     */
    generateRollbackPlan(config: DeploymentConfig): any;
}>;
//# sourceMappingURL=deployment.d.ts.map