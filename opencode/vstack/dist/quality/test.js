/**
 * Test execution and management
 * Handles unit, integration, and E2E test execution
 */
import { evidenceId } from "../schemas/types.js";
import { resolve } from "node:path";
import { spawn } from "node:child_process";
import { randomUUID } from "node:crypto";
/**
 * Create test manager
 */
export async function createTestManager(paths) {
    return {
        /**
         * Discover test configuration from project
         */
        async discoverTestConfig(projectRoot) {
            const fs = await import("node:fs");
            const suites = [];
            // Check package.json
            const packageJsonPath = resolve(projectRoot, "package.json");
            if (fs.existsSync(packageJsonPath)) {
                const pkg = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));
                const scripts = pkg.scripts ?? {};
                if (scripts.test) {
                    suites.push({
                        id: "test:unit",
                        name: "Unit Tests",
                        type: "unit",
                        command: ["npm", "test"],
                        workingDirectory: projectRoot,
                        timeout: 180000,
                        required: true,
                        coverageEnabled: !!pkg.jest || !!pkg.vitest || pkg.scripts?.coverage,
                        coverageThreshold: pkg.jest?.coverageThreshold?.global?.statements || 80,
                        retryPolicy: { maxRetries: 1, retryDelay: 10000, retryOn: ["flaky", "failed"] },
                    });
                }
                if (scripts["test:unit"]) {
                    suites.push({
                        id: "test:unit",
                        name: "Unit Tests",
                        type: "unit",
                        command: ["npm", "run", "test:unit"],
                        workingDirectory: projectRoot,
                        timeout: 180000,
                        required: true,
                        coverageEnabled: true,
                        retryPolicy: { maxRetries: 1, retryDelay: 10000, retryOn: ["flaky", "failed"] },
                    });
                }
                if (scripts["test:integration"]) {
                    suites.push({
                        id: "test:integration",
                        name: "Integration Tests",
                        type: "integration",
                        command: ["npm", "run", "test:integration"],
                        workingDirectory: projectRoot,
                        timeout: 300000,
                        required: false,
                        coverageEnabled: false,
                        retryPolicy: { maxRetries: 1, retryDelay: 10000, retryOn: ["flaky", "failed"] },
                    });
                }
                if (scripts["test:e2e"]) {
                    suites.push({
                        id: "test:e2e",
                        name: "E2E Tests",
                        type: "e2e",
                        command: ["npm", "run", "test:e2e"],
                        workingDirectory: projectRoot,
                        timeout: 600000,
                        required: false,
                        coverageEnabled: false,
                        retryPolicy: { maxRetries: 1, retryDelay: 15000, retryOn: ["flaky", "failed"] },
                    });
                }
            }
            // Check for pytest
            if (fs.existsSync(resolve(projectRoot, "pytest.ini")) ||
                fs.existsSync(resolve(projectRoot, "pyproject.toml"))) {
                suites.push({
                    id: "test:python",
                    name: "Python Tests",
                    type: "unit",
                    command: ["python", "-m", "pytest"],
                    workingDirectory: projectRoot,
                    timeout: 300000,
                    required: true,
                    coverageEnabled: true,
                    retryPolicy: { maxRetries: 1, retryDelay: 10000, retryOn: ["flaky", "failed"] },
                });
            }
            // Check for Cargo (Rust)
            if (fs.existsSync(resolve(projectRoot, "Cargo.toml"))) {
                suites.push({
                    id: "test:rust",
                    name: "Rust Tests",
                    type: "unit",
                    command: ["cargo", "test"],
                    workingDirectory: projectRoot,
                    timeout: 300000,
                    required: true,
                    coverageEnabled: false,
                    retryPolicy: { maxRetries: 1, retryDelay: 10000, retryOn: ["flaky", "failed"] },
                });
            }
            // Check for Go
            if (fs.existsSync(resolve(projectRoot, "go.mod"))) {
                suites.push({
                    id: "test:go",
                    name: "Go Tests",
                    type: "unit",
                    command: ["go", "test", "./..."],
                    workingDirectory: projectRoot,
                    timeout: 300000,
                    required: true,
                    coverageEnabled: true,
                    retryPolicy: { maxRetries: 1, retryDelay: 10000, retryOn: ["flaky", "failed"] },
                });
            }
            return {
                suites,
                timeout: 300000,
                maxParallel: 3,
            };
        },
        /**
         * Run test suite
         */
        async runTestSuite(suite, deliveryId, taskId, phaseRunId, commitRef) {
            const startedAt = new Date().toISOString();
            const startedMs = Date.now();
            const result = await executeCommand(suite.command, {
                cwd: suite.workingDirectory,
                timeout: suite.timeout,
                env: { ...process.env, CI: "true" },
            });
            const completedAt = new Date().toISOString();
            const duration = Date.now() - startedMs;
            // Parse test output for counts
            const counts = parseTestOutput(result.stdout, result.stderr);
            // Create evidence
            const evidenceIdValue = evidenceId(`evd_${randomUUID().replace(/-/g, "").slice(0, 16)}`);
            const evidence = {
                schemaVersion: 1,
                id: evidenceIdValue,
                deliveryId: deliveryId,
                taskId: taskId,
                phaseRunId: phaseRunId,
                type: suite.type === "unit" ? "test:unit" : (suite.type === "integration" ? "test:integration" : "test:e2e"),
                source: "plugin_execution",
                checkId: suite.id,
                command: suite.command,
                workingDirectory: suite.workingDirectory,
                commitRef,
                startedAt,
                completedAt,
                exitCode: result.exitCode,
                status: result.timedOut ? "timeout" : (result.exitCode === 0 ? "passed" : "failed"),
                stdoutPath: null,
                stderrPath: null,
                summary: `${suite.name}: ${counts.passed}/${counts.total} passed`,
                executionId: `exec_${crypto.randomUUID().replace(/-/g, "").slice(0, 16)}`,
                sessionId: null,
                agentRunId: null,
                metadata: {
                    duration,
                    totalTests: counts.total,
                    passedTests: counts.passed,
                    failedTests: counts.failed,
                    skippedTests: counts.skipped,
                },
            };
            return {
                suiteId: suite.id,
                status: evidence.status,
                totalTests: counts.total,
                passedTests: counts.passed,
                failedTests: counts.failed,
                skippedTests: counts.skipped,
                duration,
                coverage: undefined, // Would parse coverage report
                stdout: result.stdout,
                stderr: result.stderr,
                exitCode: result.exitCode,
                startedAt,
                completedAt,
                evidenceId: evidenceIdValue,
            };
        },
        /**
         * Run all test suites
         */
        async runAllTests(config, deliveryId, taskId, phaseRunId, commitRef) {
            const startedAt = new Date().toISOString();
            const startedMs = Date.now();
            const results = [];
            // Run suites with limited parallelism
            for (const suite of config.suites) {
                if (!suite.required && config.suites.some(s => s.required && results.some(r => r.status === "failed"))) {
                    // Skip optional suites if required ones failed
                    continue;
                }
                const result = await this.runTestSuite(suite, deliveryId, taskId, phaseRunId, commitRef);
                results.push(result);
            }
            const completedAt = new Date().toISOString();
            const duration = Date.now() - startedMs;
            // Calculate summary
            const summary = {
                totalSuites: results.length,
                passedSuites: results.filter(r => r.status === "passed").length,
                failedSuites: results.filter(r => r.status === "failed").length,
                totalTests: results.reduce((sum, r) => sum + r.totalTests, 0),
                passedTests: results.reduce((sum, r) => sum + r.passedTests, 0),
                failedTests: results.reduce((sum, r) => sum + r.failedTests, 0),
                overallCoverage: undefined,
                duration,
            };
            return summary;
        },
    };
}
/**
 * Execute command
 */
async function executeCommand(command, options) {
    const [cmd, ...args] = command;
    if (!cmd) {
        return { exitCode: -1, stdout: "", stderr: "Empty command", timedOut: false };
    }
    return new Promise((resolve) => {
        const child = spawn(cmd, args, {
            cwd: options.cwd,
            env: options.env,
            stdio: ["ignore", "pipe", "pipe"],
        });
        let stdout = "";
        let stderr = "";
        let timedOut = false;
        if (child.stdout) {
            child.stdout.on("data", (data) => { stdout += data.toString(); });
        }
        if (child.stderr) {
            child.stderr.on("data", (data) => { stderr += data.toString(); });
        }
        const timeout = setTimeout(() => {
            timedOut = true;
            child.kill("SIGTERM");
        }, options.timeout);
        child.on("close", (code) => {
            clearTimeout(timeout);
            resolve({ exitCode: code, stdout, stderr, timedOut });
        });
        child.on("error", (err) => {
            clearTimeout(timeout);
            resolve({ exitCode: null, stdout, stderr: err.message, timedOut: false });
        });
    });
}
/**
 * Parse test output for counts
 */
function parseTestOutput(stdout, stderr) {
    // Try common test output patterns
    const patterns = [
        // Jest: Test Suites: 1 passed, 1 total; Tests: 3 passed, 3 total
        /Tests?:\s*(\d+)\s*(?:passed|failed|skipped)/gi,
        // Vitest: Test Files  1 passed (1); Tests  3 passed (3)
        /Tests\s+(\d+)\s+passed/gi,
        // Pytest: 3 passed, 1 failed, 2 skipped
        /(\d+)\s+(passed|failed|skipped)/gi,
        // Go test: PASS/FAIL with counts
        /(PASS|FAIL)\s+.*?(\d+)/gi,
        // Cargo test: test result: ok. 3 passed; 0 failed
        /test result:.*?(\d+)\s+passed/gi,
    ];
    let total = 0, passed = 0, failed = 0, skipped = 0;
    const output = stdout + "\n" + stderr;
    for (const pattern of patterns) {
        const matches = [...output.matchAll(pattern)];
        for (const match of matches) {
            if (match[1]) {
                const num = parseInt(match[1], 10);
                if (!isNaN(num)) {
                    if (match[0].includes("passed"))
                        passed += num;
                    else if (match[0].includes("failed"))
                        failed += num;
                    else if (match[0].includes("skipped"))
                        skipped += num;
                    else
                        total += num;
                }
            }
        }
    }
    // If we couldn't parse, estimate from exit code
    if (total === 0 && passed === 0 && failed === 0) {
        // Default assumption
        total = 1;
        passed = 0;
        failed = 1;
    }
    total = Math.max(total, passed + failed + skipped);
    return { total, passed, failed, skipped };
}
//# sourceMappingURL=test.js.map