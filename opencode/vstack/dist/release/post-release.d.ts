/**
 * Post-release verification and monitoring
 * Handles smoke tests, health checks, and post-release observations
 */
import { VstackPaths } from "../persistence/repository-root.js";
export interface PostReleaseConfig {
    smokeTests: SmokeTestConfig[];
    monitoring: MonitoringConfig;
    observationPeriod: number;
    autoRollbackOnFailure: boolean;
}
export interface SmokeTestConfig {
    name: string;
    command: string[];
    workingDirectory: string;
    timeout: number;
    required: boolean;
    description: string;
}
export interface MonitoringConfig {
    metrics: MetricConfig[];
    alertThresholds: AlertThreshold[];
    dashboardUrl?: string;
}
export interface MetricConfig {
    name: string;
    query: string;
    expectedRange: {
        min?: number;
        max?: number;
    };
    criticalBelow?: number;
    criticalAbove?: number;
}
export interface AlertThreshold {
    metric: string;
    condition: "above" | "below" | "rate_of_change";
    threshold: number;
    severity: "warning" | "critical";
    duration: number;
}
export interface PostReleaseObservation {
    schemaVersion: 1;
    id: string;
    deliveryId: string;
    deploymentId: string;
    startTime: string;
    endTime: string | null;
    status: "active" | "completed" | "failed" | "rolled_back";
    smokeTestResults: SmokeTestResult[];
    metrics: MetricObservation[];
    alerts: AlertEvent[];
    notes: string;
    createdBy: string;
    revision?: number;
}
export interface SmokeTestResult {
    testName: string;
    passed: boolean;
    duration: number;
    output: string;
    error?: string;
}
export interface MetricObservation {
    metricName: string;
    value: number;
    timestamp: string;
    withinExpectedRange: boolean;
}
export interface AlertEvent {
    alertId: string;
    metric: string;
    condition: string;
    threshold: number;
    actualValue: number;
    severity: "warning" | "critical";
    timestamp: string;
    acknowledged: boolean;
    acknowledgedBy?: string;
    acknowledgedAt?: string;
}
/**
 * Create post-release manager
 */
export declare function createPostReleaseManager(paths: VstackPaths): Promise<{
    /**
     * Start post-release observation
     */
    startObservation(deliveryId: string, deploymentId: string, config: PostReleaseConfig, createdBy: string): Promise<PostReleaseObservation>;
    /**
     * Run a single smoke test
     */
    runSmokeTest(test: SmokeTestConfig): Promise<SmokeTestResult>;
    /**
     * Record metric observation
     */
    recordMetric(deliveryId: string, observationId: string, metricName: string, value: number): Promise<void>;
    /**
     * Check metrics and trigger alerts
     */
    checkMetrics(observation: PostReleaseObservation, config: PostReleaseConfig): Promise<AlertEvent[]>;
    /**
     * Complete observation period
     */
    completeObservation(deliveryId: string, observationId: string, notes: string): Promise<PostReleaseObservation>;
    /**
     * Get post-release summary
     */
    getPostReleaseSummary(deliveryId: string): Promise<{
        observations: number;
        totalSmokeTests: number;
        passedSmokeTests: number;
        failedSmokeTests: number;
        alerts: number;
        criticalAlerts: number;
        averageMetrics: Record<string, number>;
    }>;
}>;
//# sourceMappingURL=post-release.d.ts.map