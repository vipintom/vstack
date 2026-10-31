/**
 * Deployment management
 * Handles deployment planning, execution, and rollback
 */
import { writeJsonFile } from "../persistence/file-store.js";
import { resolve } from "node:path";
import { spawn } from "node:child_process";
import { randomUUID } from "node:crypto";
/**
 * Create deployment manager
 */
export async function createDeploymentManager(paths) {
    return {
        /**
         * Create deployment plan
         */
        async createDeploymentPlan(deliveryId, version, config) {
            const deploymentId = `dep_${randomUUID().replace(/-/g, "").slice(0, 16)}`;
            const steps = this.generateDeploymentSteps(config);
            const plan = {
                id: deploymentId,
                deliveryId,
                environment: config.environment,
                strategy: config.strategy,
                version,
                steps,
                rollbackPlan: this.generateRollbackPlan(config),
                requiredApprovals: config.requiredApprovals,
                createdAt: new Date().toISOString(),
            };
            // Save plan
            const planPath = resolve(paths.deliveries, deliveryId, "deployments", `${deploymentId}.json`);
            await writeJsonFile(paths, planPath, plan);
            return plan;
        },
        /**
         * Execute deployment
         */
        async executeDeployment(plan, config) {
            const deploymentId = plan.id;
            const startedAt = new Date().toISOString();
            const startedMs = Date.now();
            const stepsCompleted = [];
            const healthCheckResults = [];
            for (const step of plan.steps) {
                try {
                    if (step.type === "health_check" && step.healthCheck) {
                        // Run health check
                        const healthCheckConfig = config.healthChecks.find(h => h.name === step.healthCheck);
                        if (healthCheckConfig) {
                            const result = await this.runHealthCheck(healthCheckConfig);
                            healthCheckResults.push(result);
                            if (!result.passed) {
                                if (config.rollbackOnFailure) {
                                    await this.rollback(plan);
                                }
                                return {
                                    deploymentId,
                                    status: "failed",
                                    startedAt,
                                    completedAt: new Date().toISOString(),
                                    stepsCompleted,
                                    failedStep: step.name,
                                    error: `Health check failed: ${step.name}`,
                                    healthCheckResults,
                                };
                            }
                        }
                    }
                    else if (step.command) {
                        // Execute deployment command
                        const result = await executeCommand(step.command, {
                            cwd: ".",
                            timeout: step.timeout,
                            env: process.env,
                        });
                        if (result.exitCode !== 0) {
                            if (config.rollbackOnFailure) {
                                await this.rollback(plan);
                            }
                            return {
                                deploymentId,
                                status: "failed",
                                startedAt,
                                completedAt: new Date().toISOString(),
                                stepsCompleted,
                                failedStep: step.name,
                                error: `Command failed: ${step.command.join(" ")}`,
                                healthCheckResults,
                            };
                        }
                    }
                    stepsCompleted.push(step.name);
                    // Log step completion
                    // await appendEvent(paths, EventPayloads.deploymentStepCompleted(plan.id, step.name));
                }
                catch (error) {
                    if (config.rollbackOnFailure) {
                        await this.rollback(plan);
                    }
                    return {
                        deploymentId,
                        status: "failed",
                        startedAt,
                        completedAt: new Date().toISOString(),
                        stepsCompleted,
                        failedStep: step.name,
                        error: error instanceof Error ? error.message : "Unknown error",
                        healthCheckResults,
                    };
                }
            }
            const completedAt = new Date().toISOString();
            return {
                deploymentId,
                status: "success",
                startedAt,
                completedAt,
                stepsCompleted,
                healthCheckResults,
            };
        },
        /**
         * Rollback deployment
         */
        async rollback(plan) {
            for (const step of plan.rollbackPlan.steps) {
                if (step.command) {
                    await executeCommand(step.command, {
                        cwd: ".",
                        timeout: step.timeout,
                        env: process.env,
                    });
                }
            }
        },
        /**
         * Run health check
         */
        async runHealthCheck(config) {
            const startTime = Date.now();
            const maxAttempts = config.retries;
            let lastError;
            for (let attempt = 1; attempt <= maxAttempts; attempt++) {
                try {
                    let passed = false;
                    let latencyMs = 0;
                    switch (config.type) {
                        case "http":
                            // HTTP health check
                            const controller = new AbortController();
                            const timeoutId = setTimeout(() => controller.abort(), config.timeout);
                            try {
                                const response = await fetch(config.endpoint, {
                                    method: "GET",
                                    signal: controller.signal,
                                });
                                latencyMs = Date.now() - startTime;
                                passed = response.status === (config.expectedStatus || 200);
                            }
                            finally {
                                clearTimeout(timeoutId);
                            }
                            break;
                        case "tcp":
                            // TCP port check
                            // Would use net.connect
                            passed = true;
                            latencyMs = Date.now() - startTime;
                            break;
                        case "command":
                            const result = await executeCommand(config.command, {
                                cwd: ".",
                                timeout: config.timeout,
                                env: process.env,
                            });
                            passed = result.exitCode === 0;
                            latencyMs = Date.now() - startTime;
                            break;
                    }
                    if (passed) {
                        return {
                            name: config.name,
                            passed: true,
                            attempts: attempt,
                            latencyMs,
                        };
                    }
                }
                catch (error) {
                    lastError = error instanceof Error ? error.message : "Unknown error";
                }
                // Wait before retry
                if (attempt < maxAttempts) {
                    await new Promise(r => setTimeout(r, config.interval));
                }
            }
            return {
                name: config.name,
                passed: false,
                attempts: maxAttempts,
                latencyMs: 0,
                error: lastError,
            };
        },
        /**
         * Generate deployment steps
         */
        generateDeploymentSteps(config) {
            const steps = [];
            // Pre-deployment checks
            steps.push({
                name: "pre_deployment_check",
                type: "pre_check",
                command: ["echo", "Pre-deployment checks"],
                timeout: 60000,
            });
            // Deploy based on strategy
            if (config.strategy === "blue-green") {
                steps.push({
                    name: "deploy_blue",
                    type: "deploy",
                    command: ["echo", "Deploying to blue environment"],
                    timeout: 300000,
                });
                steps.push({
                    name: "health_check_blue",
                    type: "health_check",
                    timeout: 60000,
                });
                steps.push({
                    name: "switch_traffic",
                    type: "traffic_switch",
                    command: ["echo", "Switching traffic to blue"],
                    timeout: 60000,
                });
            }
            else if (config.strategy === "rolling") {
                steps.push({
                    name: "deploy_rolling",
                    type: "deploy",
                    command: ["echo", "Rolling deployment"],
                    timeout: 600000,
                });
            }
            else {
                steps.push({
                    name: "deploy",
                    type: "deploy",
                    command: ["echo", "Deploying"],
                    timeout: 300000,
                });
            }
            // Post-deployment checks
            steps.push({
                name: "post_deployment_health",
                type: "health_check",
                timeout: 120000,
            });
            steps.push({
                name: "smoke_tests",
                type: "smoke_test",
                command: ["echo", "Running smoke tests"],
                timeout: 180000,
            });
            return steps;
        },
        /**
         * Generate rollback plan
         */
        generateRollbackPlan(config) {
            return {
                strategy: "reverse",
                steps: [
                    { name: "revert_traffic", command: ["echo", "Reverting traffic"], timeout: 60000 },
                    { name: "rollback_deployment", command: ["echo", "Rolling back deployment"], timeout: 300000 },
                    { name: "verify_rollback", command: ["echo", "Verifying rollback"], timeout: 60000 },
                ],
                maxRollbackTime: 600000,
                triggerConditions: ["health_check_failed", "smoke_test_failed", "manual_trigger"],
            };
        },
    };
}
async function executeCommand(command, options) {
    const [cmd, ...args] = command;
    if (!cmd) {
        return { exitCode: -1, stdout: "", stderr: "Empty command" };
    }
    return new Promise((resolve) => {
        const child = spawn(cmd, args, {
            cwd: options.cwd,
            env: options.env,
            stdio: ["ignore", "pipe", "pipe"],
        });
        let stdout = "";
        let stderr = "";
        if (child.stdout) {
            child.stdout.on("data", (data) => { stdout += data.toString(); });
        }
        if (child.stderr) {
            child.stderr.on("data", (data) => { stderr += data.toString(); });
        }
        const timeout = setTimeout(() => {
            child.kill("SIGTERM");
        }, options.timeout);
        child.on("close", (code) => {
            clearTimeout(timeout);
            resolve({ exitCode: code, stdout, stderr });
        });
        child.on("error", (err) => {
            clearTimeout(timeout);
            resolve({ exitCode: null, stdout, stderr: err.message });
        });
    });
}
//# sourceMappingURL=deployment.js.map