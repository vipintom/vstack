/**
 * Test execution and management
 * Handles unit, integration, and E2E test execution
 */
import { VstackPaths } from "../persistence/repository-root.js";
import { EvidenceId } from "../schemas/types.js";
export interface TestConfig {
    suites: TestSuite[];
    timeout: number;
    coverageThreshold?: number;
    maxParallel: number;
}
export interface TestSuite {
    id: string;
    name: string;
    type: "unit" | "integration" | "e2e";
    command: string[];
    workingDirectory: string;
    timeout: number;
    required: boolean;
    coverageEnabled: boolean;
    coverageThreshold?: number;
    retryPolicy: RetryPolicy;
}
export interface RetryPolicy {
    maxRetries: number;
    retryDelay: number;
    retryOn: ("failed" | "flaky" | "timeout")[];
}
export interface TestResult {
    suiteId: string;
    status: "passed" | "failed" | "skipped" | "error" | "timeout" | "cancelled";
    totalTests: number;
    passedTests: number;
    failedTests: number;
    skippedTests: number;
    duration: number;
    coverage?: CoverageResult;
    stdout: string;
    stderr: string;
    exitCode: number | null;
    startedAt: string;
    completedAt: string;
    evidenceId: EvidenceId | null;
}
export interface CoverageResult {
    lines: {
        total: number;
        covered: number;
        percentage: number;
    };
    functions: {
        total: number;
        covered: number;
        percentage: number;
    };
    branches: {
        total: number;
        covered: number;
        percentage: number;
    };
    statements: {
        total: number;
        covered: number;
        percentage: number;
    };
}
export interface TestRunSummary {
    totalSuites: number;
    passedSuites: number;
    failedSuites: number;
    totalTests: number;
    passedTests: number;
    failedTests: number;
    overallCoverage?: CoverageResult;
    duration: number;
}
/**
 * Create test manager
 */
export declare function createTestManager(paths: VstackPaths): Promise<{
    /**
     * Discover test configuration from project
     */
    discoverTestConfig(projectRoot: string): Promise<TestConfig>;
    /**
     * Run test suite
     */
    runTestSuite(suite: TestSuite, deliveryId: string, taskId: string | null, phaseRunId: string | null, commitRef: string): Promise<TestResult>;
    /**
     * Run all test suites
     */
    runAllTests(config: TestConfig, deliveryId: string, taskId: string | null, phaseRunId: string | null, commitRef: string): Promise<TestRunSummary>;
}>;
//# sourceMappingURL=test.d.ts.map