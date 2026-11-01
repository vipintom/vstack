/**
 * Agent Run Store
 *
 * Tracks agent session dispatches and outcomes.
 * Simple CRUD + status tracking.
 */
import { readJsonFile, writeJsonFile, listFiles } from "../persistence/file-store.js";
import { resolve } from "node:path";
import { v4 as uuidv4 } from "uuid";
function agentRunDir(paths, deliveryId) {
    return resolve(paths.deliveries, deliveryId, "agent-runs");
}
function agentRunFile(paths, deliveryId, agentRunId) {
    return resolve(agentRunDir(paths, deliveryId), `${agentRunId}.json`);
}
async function findAgentRunImpl(paths, agentRunId) {
    const deliveryDirs = listFiles(paths, resolve(paths.deliveries));
    for (const dir of deliveryDirs) {
        const path = resolve(paths.deliveries, dir, "agent-runs", `${agentRunId}.json`);
        const run = await readJsonFile(paths, path);
        if (run)
            return { run, deliveryId: dir, path };
    }
    return null;
}
export async function createAgentRunStore(paths) {
    return {
        async createAgentRun(params) {
            const id = `run_${uuidv4()}`;
            const now = new Date().toISOString();
            const agentRun = {
                schemaVersion: 1,
                id,
                deliveryId: params.deliveryId,
                taskId: params.taskId,
                agentId: params.agentId,
                sessionId: params.sessionId,
                worktreePath: params.worktreePath,
                status: "dispatched",
                dispatchPrompt: params.objective,
                contextReferences: params.contextReferences,
                startedAt: now,
                completedAt: null,
                resultSummary: null,
                error: null,
                handoffSummary: null,
                revision: 1,
            };
            // Ensure agent-runs directory exists
            const { mkdirSync } = await import("node:fs");
            const agentRunDirPath = agentRunDir(paths, params.deliveryId);
            mkdirSync(agentRunDirPath, { recursive: true });
            await writeJsonFile(paths, agentRunFile(paths, params.deliveryId, id), agentRun);
            return agentRun;
        },
        async getAgentRun(agentRunId) {
            const found = await findAgentRunImpl(paths, agentRunId);
            return found?.run ?? null;
        },
        async listAgentRuns(deliveryId, filters = {}) {
            const dir = agentRunDir(paths, deliveryId);
            if (!require("node:fs").existsSync(dir))
                return [];
            const runIds = listFiles(paths, dir);
            const runs = [];
            for (const runId of runIds) {
                const run = await readJsonFile(paths, resolve(dir, `${runId}.json`));
                if (!run)
                    continue;
                if (filters.status && !filters.status.includes(run.status))
                    continue;
                if (filters.role && run.agentId !== `vstack-${filters.role}`)
                    continue;
                if (filters.taskId && run.taskId !== filters.taskId)
                    continue;
                runs.push(run);
            }
            runs.sort((a, b) => b.startedAt.localeCompare(a.startedAt));
            return runs;
        },
        async updateAgentRun(agentRunId, updates) {
            const found = await findAgentRunImpl(paths, agentRunId);
            if (!found)
                throw new Error(`Agent run ${agentRunId} not found`);
            const updated = {
                ...found.run,
                ...updates,
                revision: found.run.revision + 1,
            };
            await writeJsonFile(paths, found.path, updated);
            return updated;
        },
        async recordHandoff(agentRunId, handoffSummary) {
            const found = await findAgentRunImpl(paths, agentRunId);
            if (!found)
                throw new Error(`Agent run ${agentRunId} not found`);
            const updated = {
                ...found.run,
                handoffSummary,
                status: "completed",
                completedAt: new Date().toISOString(),
                revision: found.run.revision + 1,
            };
            await writeJsonFile(paths, found.path, updated);
            return updated;
        },
    };
}
//# sourceMappingURL=agent-run-store.js.map