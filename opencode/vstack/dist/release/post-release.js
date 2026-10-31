/**
 * Post-release verification and monitoring
 * Handles smoke tests, health checks, and post-release observations
 */
import { readJsonFile, writeJsonFile } from "../persistence/file-store.js";
import { resolve } from "node:path";
import { spawn } from "node:child_process";
import { randomUUID } from "node:crypto";
/**
 * Create post-release manager
 */
export async function createPostReleaseManager(paths) {
    return {
        /**
         * Start post-release observation
         */
        async startObservation(deliveryId, deploymentId, config, createdBy) {
            const observationId = `obs_${randomUUID().replace(/-/g, "").slice(0, 16)}`;
            const startTime = new Date().toISOString();
            const observation = {
                schemaVersion: 1,
                id: observationId,
                deliveryId,
                deploymentId,
                startTime,
                endTime: null,
                status: "active",
                smokeTestResults: [],
                metrics: [],
                alerts: [],
                notes: "",
                createdBy,
            };
            // Run initial smoke tests
            for (const test of config.smokeTests) {
                const result = await this.runSmokeTest(test);
                observation.smokeTestResults.push(result);
                if (!result.passed && test.required) {
                    observation.status = "failed";
                }
            }
            // Save observation
            const obsPath = resolve(paths.deliveries, deliveryId, "post-release", `${observationId}.json`);
            await writeJsonFile(paths, obsPath, observation);
            return observation;
        },
        /**
         * Run a single smoke test
         */
        async runSmokeTest(test) {
            const startTime = Date.now();
            try {
                const result = await executeCommand(test.command, {
                    cwd: test.workingDirectory,
                    timeout: test.timeout,
                    env: process.env,
                });
                const duration = Date.now() - startTime;
                const passed = result.exitCode === 0;
                return {
                    testName: test.name,
                    passed,
                    duration,
                    output: result.stdout,
                    error: passed ? undefined : result.stderr,
                };
            }
            catch (error) {
                const duration = Date.now() - startTime;
                return {
                    testName: test.name,
                    passed: false,
                    duration,
                    output: "",
                    error: error instanceof Error ? error.message : "Unknown error",
                };
            }
        },
        /**
         * Record metric observation
         */
        async recordMetric(deliveryId, observationId, metricName, value) {
            const obsPath = resolve(paths.deliveries, deliveryId, "post-release", `${observationId}.json`);
            const observation = await readJsonFile(paths, obsPath);
            if (!observation)
                return;
            const metric = {
                metricName,
                value,
                timestamp: new Date().toISOString(),
                withinExpectedRange: true, // Would check against expected range
            };
            observation.metrics.push(metric);
            await writeJsonFile(paths, resolve(paths.deliveries, deliveryId, "post-release", `${observationId}.json`), observation);
        },
        /**
         * Check metrics and trigger alerts
         */
        async checkMetrics(observation, config) {
            const newAlerts = [];
            for (const alert of config.monitoring.alertThresholds) {
                const latestMetric = observation.metrics
                    .filter(m => m.metricName === alert.metric)
                    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())[0];
                if (!latestMetric)
                    continue;
                let triggered = false;
                switch (alert.condition) {
                    case "above":
                        triggered = latestMetric.value > alert.threshold;
                        break;
                    case "below":
                        triggered = latestMetric.value < alert.threshold;
                        break;
                    case "rate_of_change":
                        // Would calculate rate of change
                        break;
                }
                if (triggered) {
                    const alertEvent = {
                        alertId: `alert_${randomUUID().replace(/-/g, "").slice(0, 16)}`,
                        metric: alert.metric,
                        condition: alert.condition,
                        threshold: alert.threshold,
                        actualValue: latestMetric.value,
                        severity: alert.severity,
                        timestamp: new Date().toISOString(),
                        acknowledged: false,
                    };
                    newAlerts.push(alertEvent);
                }
            }
            return newAlerts;
        },
        /**
         * Complete observation period
         */
        async completeObservation(deliveryId, observationId, notes) {
            const obsPath = resolve(paths.deliveries, deliveryId, "post-release", `${observationId}.json`);
            const observation = await readJsonFile(paths, obsPath);
            if (!observation)
                throw new Error(`Observation ${observationId} not found`);
            const completedObs = {
                ...observation,
                endTime: new Date().toISOString(),
                status: "completed",
                notes: (observation.notes || "") + "\n" + notes,
            };
            await writeJsonFile(paths, resolve(paths.deliveries, deliveryId, "post-release", `${observationId}.json`), completedObs);
            return completedObs;
        },
        /**
         * Get post-release summary
         */
        async getPostReleaseSummary(deliveryId) {
            const obsIds = listFiles(paths, resolve(paths.deliveries, deliveryId, "post-release"));
            let totalSmokeTests = 0;
            let passedSmokeTests = 0;
            let alerts = 0;
            let criticalAlerts = 0;
            const metricSums = {};
            for (const obsId of obsIds) {
                const obsPath = resolve(paths.deliveries, deliveryId, "post-release", obsId);
                const observation = await readJsonFile(paths, obsPath);
                if (!observation)
                    continue;
                totalSmokeTests += observation.smokeTestResults.length;
                passedSmokeTests += observation.smokeTestResults.filter((r) => r.passed).length;
                alerts += observation.alerts.length;
                criticalAlerts += observation.alerts.filter((a) => a.severity === "critical").length;
                for (const metric of observation.metrics ?? []) {
                    const key = metric.metricName;
                    if (!metricSums[key]) {
                        metricSums[key] = { sum: 0, count: 0 };
                    }
                    metricSums[key].sum += metric.value;
                    metricSums[key].count++;
                }
            }
            const averageMetrics = {};
            for (const [name, data] of Object.entries(metricSums)) {
                averageMetrics[name] = data.sum / data.count;
            }
            return {
                observations: listFiles(paths, resolve(paths.deliveries, deliveryId, "post-release")).length,
                totalSmokeTests,
                passedSmokeTests,
                failedSmokeTests: totalSmokeTests - passedSmokeTests,
                alerts,
                criticalAlerts,
                averageMetrics,
            };
        },
    };
}
function listFiles(paths, dirPath) {
    const fs = require("node:fs");
    const { validateVstackPath } = require("../persistence/repository-root.js");
    const validatedPath = validateVstackPath(paths, dirPath);
    if (!fs.existsSync(validatedPath))
        return [];
    try {
        return fs.readdirSync(validatedPath)
            .filter((name) => name.endsWith(".json"))
            .map((name) => name.slice(0, -5));
    }
    catch {
        return [];
    }
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
//# sourceMappingURL=post-release.js.map