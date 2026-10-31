/**
 * Session tracker
 * Monitors OpenCode sessions and tracks their lifecycle
 */
import { AgentRunId, TaskId } from "../schemas/types.js";
import { VstackPaths } from "../persistence/repository-root.js";
export interface SessionInfo {
    sessionId: string;
    agentRunId: AgentRunId;
    taskId: TaskId | null;
    deliveryId: string;
    agentId: string;
    status: "created" | "active" | "completed" | "failed" | "cancelled" | "unknown";
    startedAt: string;
    lastActivity: string;
    worktreePath: string | null;
    messageCount: number;
    toolCalls: number;
}
export interface SessionEvent {
    sessionId: string;
    type: "started" | "prompt_sent" | "tool_called" | "tool_completed" | "completed" | "failed" | "cancelled" | "interrupted" | "message_received";
    timestamp: string;
    details: Record<string, unknown>;
}
export interface SessionSummary {
    sessionId: string;
    agentRunId: AgentRunId;
    deliveryId: string;
    taskId: TaskId | null;
    agentId: string;
    duration: number;
    messageCount: number;
    toolCalls: number;
    status: string;
    outcome: "success" | "failure" | "cancelled" | "timeout";
}
/**
 * Create session tracker
 */
export interface SessionTracker {
    registerSession(sessionId: string, agentRunId: AgentRunId, taskId: TaskId | null, deliveryId: string, agentId: string, worktreePath: string | null): SessionInfo;
    updateSessionStatus(sessionId: string, status: SessionInfo["status"]): SessionInfo | null;
    recordActivity(sessionId: string, type: "prompt_sent" | "tool_called" | "tool_completed" | "message_received"): void;
    recordEvent(sessionId: string, type: SessionEvent["type"], details: Record<string, unknown>): void;
    getSession(sessionId: string): SessionInfo | null;
    getActiveSessions(): SessionInfo[];
    getDeliverySessions(deliveryId: string): SessionInfo[];
    getAgentRunSessions(agentRunId: AgentRunId): SessionInfo[];
    completeSession(sessionId: string, outcome: "success" | "failure" | "cancelled" | "timeout"): Promise<SessionSummary | null>;
    checkStaleSessions(maxInactivityMs?: number): SessionInfo[];
    handleStaleSessions(maxInactivityMs?: number): Promise<void>;
    cleanupOldSessions(maxAgeMs?: number): number;
    getSessionEvents(sessionId: string, limit?: number): SessionEvent[];
    getAllEvents(limit?: number): SessionEvent[];
    getStats(): {
        totalSessions: number;
        activeSessions: number;
        completedSessions: number;
        failedSessions: number;
        avgDuration: number;
        avgMessages: number;
        avgToolCalls: number;
    };
}
export declare function createSessionTracker(paths: VstackPaths): Promise<SessionTracker>;
/**
 * Session tracker with OpenCode integration
 */
export interface OpenCodeSessionTracker {
    trackSession(sessionId: string, agentRunId: AgentRunId): void;
    onPrompt(sessionId: string, prompt: string): void;
    onToolCall(sessionId: string, toolName: string, args: unknown): void;
    onToolResult(sessionId: string, toolName: string, result: unknown): void;
    onComplete(sessionId: string, outcome: "success" | "failure"): void;
}
/**
 * Create OpenCode-integrated session tracker
 */
export declare function createOpenCodeSessionTracker(baseTracker: SessionTracker): OpenCodeSessionTracker;
//# sourceMappingURL=session-tracker.d.ts.map