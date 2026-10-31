/**
 * Agent Run Store
 *
 * Tracks agent session dispatches and outcomes.
 * Simple CRUD + status tracking.
 */
import { VstackPaths } from "../persistence/repository-root.js";
import { AgentRun, AgentRunId, AgentRunStatus } from "../schemas/types.js";
export interface AgentRunStore {
    createAgentRun(params: CreateAgentRunParams): Promise<AgentRun>;
    getAgentRun(agentRunId: AgentRunId): Promise<AgentRun | null>;
    listAgentRuns(deliveryId: string, filters?: AgentRunFilters): Promise<AgentRun[]>;
    updateAgentRun(agentRunId: AgentRunId, updates: AgentRunUpdates): Promise<AgentRun>;
    recordHandoff(agentRunId: AgentRunId, handoffSummary: string): Promise<AgentRun>;
}
export interface CreateAgentRunParams {
    deliveryId: string;
    taskId: string | null;
    agentId: string;
    sessionId: string;
    role: "lead" | "builder" | "reviewer";
    objective: string;
    contextReferences: string[];
    worktreePath: string | null;
}
export interface AgentRunFilters {
    status?: AgentRunStatus[];
    role?: "lead" | "builder" | "reviewer";
    taskId?: string;
}
export interface AgentRunUpdates {
    status?: AgentRunStatus;
    resultSummary?: string;
    error?: string;
    completedAt?: string;
    handoffSummary?: string;
}
export declare function createAgentRunStore(paths: VstackPaths): Promise<AgentRunStore>;
//# sourceMappingURL=agent-run-store.d.ts.map