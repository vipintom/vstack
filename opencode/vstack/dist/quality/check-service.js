/**
 * Check Execution Service
 *
 * Discovers, executes, and records check evidence.
 * Single generic runner for all check types.
 */
import { evidenceId } from "../schemas/types.js";
import { readJsonFile, writeJsonFile, listFiles } from "../persistence/file-store.js";
import { appendEvent, EventPayloads } from "../persistence/event-log.js";
import { resolve } from "node:path";
import { v4 as uuidv4 } from "uuid";
import { existsSync, mkdirSync, writeFileSync, readdirSync, readFileSync } from "node:fs";
function evidenceDir(paths, deliveryId) {
    return resolve(paths.deliveries, deliveryId, "evidence");
}
function evidenceFile(paths, deliveryId, evidenceId) {
    return resolve(evidenceDir(paths, deliveryId), `${evidenceId}.json`);
}
const COMMON_CHECKS = [
    { id: "test:unit", name: "Unit Tests", command: ["npm", "test", "--", "--run"], workingDirectory: ".", category: "test" },
    { id: "test:integration", name: "Integration Tests", command: ["npm", "test", "--", "--run"], workingDirectory: ".", category: "test" },
    { id: "build", name: "Build", command: ["npm", "run", "build"], workingDirectory: ".", category: "build" },
    { id: "lint", name: "Lint", command: ["npm", "run", "lint"], workingDirectory: ".", category: "lint" },
    { id: "typecheck", name: "Type Check", command: ["npm", "run", "typecheck"], workingDirectory: ".", category: "typecheck" },
];
function inferEvidenceType(checkId) {
    if (checkId.startsWith("test:"))
        return "test:unit";
    if (checkId === "build")
        return "build";
    if (checkId === "lint")
        return "lint";
    if (checkId === "typecheck")
        return "typecheck";
    if (checkId.startsWith("security:"))
        return "security:deps";
    return "other";
}
export async function createCheckService(paths) {
    return {
        async discoverChecks(workingDir) {
            return COMMON_CHECKS.filter(c => {
                try {
                    existsSync(resolve(workingDir, "package.json"));
                    return true;
                }
                catch {
                    return false;
                }
            });
        },
        async executeCheck(params) {
            const { executeCommand } = await import("../quality/execution-adapter.js");
            const result = await executeCommand(params.command, {
                workingDirectory: params.workingDirectory || process.cwd(),
                timeoutMs: params.timeoutMs || 120000,
                maxOutputBytes: params.maxOutputBytes || 100000,
            });
            const id = evidenceId(`evd_${uuidv4().replace(/-/g, "").slice(0, 16)}`);
            const now = new Date().toISOString();
            const evidence = {
                schemaVersion: 1,
                id,
                deliveryId: params.deliveryId,
                taskId: params.taskId,
                phaseRunId: null,
                type: inferEvidenceType(params.checkId),
                source: "plugin_execution",
                checkId: params.checkId,
                command: params.command,
                workingDirectory: params.workingDirectory || process.cwd(),
                commitRef: params.commitRef,
                startedAt: now,
                completedAt: now,
                exitCode: result.exitCode,
                status: result.timedOut ? "timeout" : (result.exitCode === 0 ? "passed" : "failed"),
                stdoutPath: result.stdout ? `${evidenceDir(paths, params.deliveryId)}/${id}.stdout.log` : null,
                stderrPath: result.stderr ? `${evidenceDir(paths, params.deliveryId)}/${id}.stderr.log` : null,
                summary: `${params.checkId}: ${result.timedOut ? "timeout" : (result.exitCode === 0 ? "passed" : `failed (exit ${result.exitCode})`)}`,
                executionId: `exec_${uuidv4().replace(/-/g, "").slice(0, 16)}`,
                sessionId: params.sessionId ?? null,
                agentRunId: (params.agentRunId ?? null),
                metadata: {
                    timedOut: result.timedOut,
                    stdoutBytes: result.stdout?.length || 0,
                    stderrBytes: result.stderr?.length || 0,
                },
                revision: 0,
            };
            // Write evidence
            const dir = evidenceDir(paths, params.deliveryId);
            mkdirSync(dir, { recursive: true });
            if (result.stdout) {
                writeFileSync(`${dir}/${id}.stdout.log`, result.stdout, "utf-8");
            }
            if (result.stderr) {
                writeFileSync(`${dir}/${id}.stderr.log`, result.stderr, "utf-8");
            }
            await writeJsonFile(paths, evidenceFile(paths, params.deliveryId, id), evidence);
            // Log event
            await appendEvent(paths, EventPayloads.checkCompleted(params.deliveryId, id, params.checkId, evidence.status));
            return {
                evidence,
                stdout: result.stdout || "",
                stderr: result.stderr || "",
                exitCode: result.exitCode,
                timedOut: result.timedOut,
            };
        },
        async getEvidence(evidenceId) {
            const deliveryDirs = listFiles(paths, resolve(paths.deliveries));
            for (const dir of deliveryDirs) {
                const path = resolve(paths.deliveries, dir, "evidence", `${evidenceId}.json`);
                const evidence = await readJsonFile(paths, path);
                if (evidence)
                    return evidence;
            }
            return null;
        },
        async listEvidence(deliveryId, taskId) {
            const dir = evidenceDir(paths, deliveryId);
            if (!existsSync(dir))
                return [];
            const files = readdirSync(dir).filter((f) => f.endsWith(".json"));
            const results = [];
            for (const file of files) {
                const evidence = JSON.parse(readFileSync(resolve(dir, file), "utf-8"));
                if (taskId && evidence.taskId !== taskId)
                    continue;
                results.push(evidence);
            }
            results.sort((a, b) => b.completedAt.localeCompare(a.completedAt));
            return results;
        },
    };
}
//# sourceMappingURL=check-service.js.map