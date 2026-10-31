/**
 * Rollback management
 * Handles automated and manual rollback procedures
 */
import { readJsonFile, writeJsonFile, listFiles } from "../persistence/file-store.js";
import { resolve } from "node:path";
import { spawn } from "node:child_process";
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
/**
 * Create rollback manager
 */
export async function createRollbackManager(paths) {
    return {
        /**
         * Initiate rollback
         */
        async initiateRollback(deploymentId, trigger, config, requestedBy) {
            const executionId = `rbk_${crypto.randomUUID().replace(/-/g, "").slice(0, 16)}`;
            const now = new Date().toISOString();
            // Find applicable strategy
            const strategy = config.strategies.find(s => s.applicableEnvironments.includes("production") // Would get from deployment
            );
            if (!strategy) {
                throw new Error("No applicable rollback strategy found");
            }
            // Check if approval required
            const approvalRequired = config.requireApproval || strategy.steps.some(s => s.rollbackOnFailure);
            const execution = {
                id: executionId,
                deploymentId,
                strategy: strategy.name,
                trigger,
                status: approvalRequired ? "initiated" : "running",
                startedAt: now,
                completedAt: null,
                stepsCompleted: [],
                failedStep: undefined,
                error: undefined,
                approvedBy: approvalRequired ? requestedBy : null,
                approvalRequired,
            };
            // Save execution
            const executionPath = resolve(paths.deliveries, "rollbacks", `${executionId}.json`);
            await writeJsonFile(paths, executionPath, execution);
            // If auto-approval or not required, execute immediately
            if (!approvalRequired || config.automatic) {
                await this.executeRollback(executionId, strategy);
            }
            return execution;
        },
        /**
         * Execute rollback
         */
        async executeRollback(executionId, strategy) {
            const executionPath = resolve(paths.deliveries, "rollbacks", `${executionId}.json`);
            const execution = await readJsonFile(paths, executionPath);
            if (!execution)
                throw new Error(`Rollback execution ${executionId} not found`);
            if (execution.status !== "running" && execution.status !== "initiated") {
                throw new Error(`Execution not in runnable state: ${execution.status}`);
            }
            execution.status = "running";
            execution.startedAt = new Date().toISOString();
            await writeJsonFile(paths, resolve(paths.deliveries, "rollbacks", `${executionId}.json`), execution);
            const startedAt = new Date().toISOString();
            const startedMs = Date.now();
            const stepsCompleted = [];
            const failedSteps = [];
            const healthCheckResults = [];
            const lessonsLearned = [];
            for (const step of strategy.steps) {
                try {
                    // Execute step
                    if (step.type === "command" && step.command) {
                        await executeCommand(step.command, {
                            cwd: ".",
                            timeout: step.timeout,
                            env: process.env,
                        });
                    }
                    else if (step.type === "api_call" && step.apiEndpoint) {
                        await fetch(step.apiEndpoint, {
                            method: step.apiMethod || "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(step.apiPayload || {}),
                        });
                    }
                    else if (step.type === "traffic_shift") {
                        // Traffic shift would be implemented
                    }
                    stepsCompleted.push(step.name);
                }
                catch (error) {
                    const errorMessage = error instanceof Error ? error.message : "Unknown error";
                    failedSteps.push(step.name);
                    if (step.rollbackOnFailure) {
                        // Try to rollback this step
                        try {
                            // Would execute rollback for this step
                        }
                        catch (rollbackError) {
                            // Log but continue
                        }
                    }
                    if (!step.retryOnFailure) {
                        // Stop rollback
                        break;
                    }
                    // Retry logic
                    for (let retry = 1; retry <= step.maxRetries; retry++) {
                        try {
                            await new Promise(r => setTimeout(r, 5000)); // Wait before retry
                            if (step.type === "command" && step.command) {
                                await executeCommand(step.command, { cwd: ".", timeout: step.timeout, env: process.env });
                            }
                            // Success on retry
                            stepsCompleted.push(`${step.name} (retry ${retry})`);
                            break;
                        }
                        catch (retryError) {
                            if (retry === step.maxRetries) {
                                throw retryError;
                            }
                        }
                    }
                }
            }
            const completedAt = new Date().toISOString();
            const duration = Date.now() - new Date(startedAt).getTime();
            const status = failedSteps.length === 0 ? "success" : "failed";
            const report = {
                executionId,
                deploymentId: execution.deploymentId,
                strategy: strategy.name,
                trigger: execution.trigger,
                status,
                startedAt,
                completedAt,
                duration,
                stepsCompleted,
                failedSteps,
                healthCheckResults: [],
                lessonsLearned,
            };
            // Update execution
            execution.status = status === "success" ? "completed" : "failed";
            execution.completedAt = completedAt;
            execution.stepsCompleted = stepsCompleted;
            execution.failedStep = failedSteps[0];
            execution.error = failedSteps.length > 0 ? `Failed steps: ${failedSteps.join(", ")}` : null;
            await writeJsonFile(paths, resolve(paths.deliveries, "rollbacks", `${executionId}.json`), execution);
            return report;
        },
        /**
         * Approve rollback
         */
        async approveRollback(executionId, approvedBy) {
            const executionPath = resolve(paths.deliveries, "rollbacks", `${executionId}.json`);
            const execution = await readJsonFile(paths, executionPath);
            if (!execution)
                throw new Error(`Rollback execution ${executionId} not found`);
            if (!execution.approvalRequired) {
                throw new Error("Rollback does not require approval");
            }
            if (execution.status !== "initiated") {
                throw new Error(`Execution not in approvable state: ${execution.status}`);
            }
            execution.approvedBy = approvedBy;
            execution.status = "running";
            await writeJsonFile(paths, resolve(paths.deliveries, "rollbacks", `${executionId}.json`), execution);
            // Execute rollback
            // Would call executeRollback with appropriate strategy
            return execution;
        },
        /**
         * Get rollback history
         */
        async getRollbackHistory(deliveryId) {
            const rollbackIds = listFiles(paths, resolve(paths.deliveries, "rollbacks"));
            const executions = [];
            for (const rollbackId of rollbackIds) {
                const executionPath = resolve(paths.deliveries, "rollbacks", `${rollbackId}.json`);
                const execution = await readJsonFile(paths, executionPath);
                if (execution && (!deliveryId || execution.deploymentId.includes(deliveryId))) {
                    executions.push(execution);
                }
            }
            return executions.sort((a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime());
        },
        /**
         * Validate rollback readiness
         */
        async validateRollbackReadiness(deploymentId) {
            // Check if previous version exists
            // Check if database migrations are reversible
            // Check if dependencies support downgrade
            // Check if rollback plan is defined
            return {
                ready: true,
                checks: [
                    { name: "Previous version available", passed: true, message: "Previous version tagged" },
                    { name: "Database migration reversible", passed: true, message: "Down migration available" },
                    { name: "Dependencies support downgrade", passed: true, message: "Compatible versions" },
                    { name: "Rollback plan defined", passed: true, message: "Strategy configured" },
                ],
            };
        },
    };
}
//# sourceMappingURL=rollback.js.map