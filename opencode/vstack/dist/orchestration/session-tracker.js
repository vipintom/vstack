/**
 * Session tracker
 * Monitors OpenCode sessions and tracks their lifecycle
 */
export async function createSessionTracker(paths) {
    const sessions = new Map();
    const sessionEvents = [];
    const MAX_EVENTS = 1000;
    const tracker = {
        /**
         * Register a new session
         */
        registerSession(sessionId, agentRunId, taskId, deliveryId, agentId, worktreePath) {
            const now = new Date().toISOString();
            const sessionInfo = {
                sessionId,
                agentRunId,
                taskId,
                deliveryId,
                agentId,
                status: "created",
                startedAt: now,
                lastActivity: now,
                worktreePath,
                messageCount: 0,
                toolCalls: 0,
            };
            sessions.set(sessionId, sessionInfo);
            return sessionInfo;
        },
        /**
         * Update session status
         */
        updateSessionStatus(sessionId, status) {
            const session = sessions.get(sessionId);
            if (!session)
                return null;
            session.status = status;
            session.lastActivity = new Date().toISOString();
            return session;
        },
        /**
         * Record session activity
         */
        recordActivity(sessionId, type) {
            const session = sessions.get(sessionId);
            if (!session)
                return;
            session.lastActivity = new Date().toISOString();
            if (type === "tool_called")
                session.toolCalls++;
            if (type === "message_received")
                session.messageCount++;
            // Record event
            this.recordEvent(sessionId, type, {});
        },
        /**
         * Record session event
         */
        recordEvent(sessionId, type, details) {
            const event = {
                sessionId,
                type,
                timestamp: new Date().toISOString(),
                details,
            };
            sessionEvents.push(event);
            // Trim events if too many
            if (sessionEvents.length > MAX_EVENTS) {
                sessionEvents.shift();
            }
        },
        /**
         * Get session info
         */
        getSession(sessionId) {
            return sessions.get(sessionId) ?? null;
        },
        /**
         * Get all active sessions
         */
        getActiveSessions() {
            return Array.from(sessions.values()).filter(s => s.status === "active" || s.status === "created");
        },
        /**
         * Get sessions for a delivery
         */
        getDeliverySessions(deliveryId) {
            return Array.from(sessions.values()).filter(s => s.deliveryId === deliveryId);
        },
        /**
         * Get sessions for an agent run
         */
        getAgentRunSessions(agentRunId) {
            return Array.from(sessions.values()).filter(s => s.agentRunId === agentRunId);
        },
        /**
         * Get session events
         */
        getSessionEvents(sessionId, limit = 50) {
            return sessionEvents
                .filter(e => e.sessionId === sessionId)
                .slice(-limit);
        },
        /**
         * Get all session events
         */
        getAllEvents(limit = 100) {
            return sessionEvents.slice(-limit);
        },
        /**
         * Complete a session
         */
        async completeSession(sessionId, outcome) {
            const session = sessions.get(sessionId);
            if (!session)
                return null;
            session.status = outcome === "success" ? "completed" : "failed";
            session.lastActivity = new Date().toISOString();
            const duration = Date.now() - new Date(session.startedAt).getTime();
            const summary = {
                sessionId,
                agentRunId: session.agentRunId,
                deliveryId: session.deliveryId,
                taskId: session.taskId,
                agentId: session.agentId,
                duration,
                messageCount: session.messageCount,
                toolCalls: session.toolCalls,
                status: session.status,
                outcome,
            };
            // Record event
            this.recordEvent(sessionId, outcome === "success" ? "completed" : "failed", { outcome });
            return summary;
        },
        /**
         * Check for stale sessions
         */
        checkStaleSessions(maxInactivityMs = 10 * 60 * 1000) {
            const now = Date.now();
            const stale = [];
            for (const session of sessions.values()) {
                if (session.status === "active" || session.status === "created") {
                    const lastActivity = new Date(session.lastActivity).getTime();
                    if (now - lastActivity > maxInactivityMs) {
                        stale.push(session);
                    }
                }
            }
            return stale;
        },
        /**
         * Handle stale sessions
         */
        async handleStaleSessions(maxInactivityMs = 10 * 60 * 1000) {
            const stale = this.checkStaleSessions(maxInactivityMs);
            for (const session of stale) {
                // Mark as failed due to timeout
                await this.completeSession(session.sessionId, "timeout");
                // Update agent run if exists
                if (session.agentRunId) {
                    // Would update agent run in persistence
                }
            }
        },
        /**
         * Get session statistics
         */
        getStats() {
            const allSessions = Array.from(sessions.values());
            const completed = allSessions.filter(s => s.status === "completed");
            const failed = allSessions.filter(s => s.status === "failed");
            const durations = completed.map(s => {
                // Would need end time - for now estimate
                return 0;
            });
            return {
                totalSessions: allSessions.length,
                activeSessions: allSessions.filter(s => s.status === "active" || s.status === "created").length,
                completedSessions: completed.length,
                failedSessions: failed.length,
                avgDuration: 0,
                avgMessages: allSessions.reduce((sum, s) => sum + s.messageCount, 0) / Math.max(allSessions.length, 1),
                avgToolCalls: allSessions.reduce((sum, s) => sum + s.toolCalls, 0) / Math.max(allSessions.length, 1),
            };
        },
        /**
         * Clean up old sessions
         */
        cleanupOldSessions(maxAgeMs = 24 * 60 * 60 * 1000) {
            const now = Date.now();
            let cleaned = 0;
            for (const [sessionId, session] of sessions) {
                const startedAt = new Date(session.startedAt).getTime();
                if (now - startedAt > maxAgeMs && session.status !== "active") {
                    sessions.delete(sessionId);
                    cleaned++;
                }
            }
            return cleaned;
        },
    };
    return tracker;
}
/**
 * Create OpenCode-integrated session tracker
 */
export function createOpenCodeSessionTracker(baseTracker) {
    return {
        trackSession(sessionId, agentRunId) {
            // Session already registered via base tracker
        },
        onPrompt(sessionId, prompt) {
            baseTracker.recordActivity(sessionId, "prompt_sent");
        },
        onToolCall(sessionId, toolName, args) {
            baseTracker.recordActivity(sessionId, "tool_called");
        },
        onToolResult(sessionId, toolName, result) {
            baseTracker.recordActivity(sessionId, "tool_completed");
        },
        onComplete(sessionId, outcome) {
            baseTracker.completeSession(sessionId, outcome === "success" ? "success" : "failure");
        },
    };
}
//# sourceMappingURL=session-tracker.js.map