/**
 * Agent dispatch manager
 * Handles OpenCode session creation, agent assignment, and lifecycle
 */
import { AgentRunId, AgentRunStatus, Delivery, Task } from "../schemas/types.js";
import { VstackPaths } from "../persistence/repository-root.js";
export interface AgentDispatchConfig {
    defaultModel: string | null;
    maxSteps: Record<string, number>;
    defaultPermissions: string[];
    enableWorktrees: boolean;
}
export interface DispatchOptions {
    task?: Task;
    delivery: Delivery;
    agentId: string;
    worktreePath?: string;
    parentSessionId?: string;
    customPrompt?: string;
    contextFiles?: string[];
}
export interface DispatchResult {
    agentRunId: AgentRunId;
    sessionId: string;
    status: "created" | "failed";
    message: string;
}
export interface AgentSessionInfo {
    sessionId: string;
    agentId: string;
    taskId: string | null;
    deliveryId: string;
    status: AgentRunStatus;
    startedAt: string;
    lastActivity: string;
    worktreePath: string | null;
}
/**
 * Create agent dispatch manager
 */
export declare function createAgentDispatch(paths: VstackPaths, config: AgentDispatchConfig, opencodeContext: any): Promise<{
    /**
     * Dispatch a new agent for a task
     */
    dispatchAgent(options: DispatchOptions): Promise<DispatchResult>;
    /**
     * Build task prompt for agent
     */
    buildTaskPrompt(task: Task, delivery: Delivery): string;
    /**
     * Update agent run status
     */
    updateAgentRunStatus(agentRunId: AgentRunId, deliveryId: string, status: AgentRunStatus, resultSummary?: string, error?: string): Promise<void>;
    /**
     * Send prompt to agent session
     */
    sendPrompt(agentRunId: AgentRunId, deliveryId: string, prompt: string, opencodeContext: any): Promise<void>;
    /**
     * Interrupt agent session
     */
    interruptAgent(agentRunId: AgentRunId, deliveryId: string, opencodeContext: any): Promise<void>;
    /**
     * Get agent session info
     */
    getSessionInfo(sessionId: string): AgentSessionInfo | null;
    /**
     * Get all active sessions
     */
    getActiveSessions(): AgentSessionInfo[];
    /**
     * Get sessions for a delivery
     */
    getDeliverySessions(deliveryId: string): AgentSessionInfo[];
    /**
     * Check if session is still active
     */
    isSessionActive(sessionId: string, opencodeContext: any): Promise<boolean>;
    /**
     * Clean up completed sessions
     */
    cleanupCompletedSessions(): void;
}>;
/**
 * Default agent dispatch configuration
 */
export declare const DEFAULT_AGENT_DISPATCH_CONFIG: AgentDispatchConfig;
//# sourceMappingURL=agent-dispatch.d.ts.map