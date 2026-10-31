/**
 * Agent coordination tools
 * Dispatch, monitor, and manage agent sessions
 */
export const agentTools = [
    {
        name: "vstack_agent_dispatch",
        description: "Dispatch an agent for a task with context, scope, and session metadata",
        input: {
            type: "object",
            properties: {
                deliveryId: { type: "string" },
                taskId: { type: "string" },
                agentId: { type: "string" },
                context: {
                    type: "object",
                    properties: {
                        prompt: { type: "string" },
                        worktreePath: { type: "string" },
                        parentSessionId: { type: "string" },
                        contextFiles: { type: "array", items: { type: "string" } },
                    },
                    required: ["prompt"],
                },
            },
            required: ["deliveryId", "taskId", "agentId", "context"],
            additionalProperties: false,
        },
        execute: async (input, context) => {
            return { content: JSON.stringify({ agentRunId: "agrun_123", sessionId: "session_123", status: "dispatched" }) };
        },
    },
    {
        name: "vstack_agent_status",
        description: "Inspect active/finished agent runs",
        input: {
            type: "object",
            properties: {
                deliveryId: { type: "string" },
                agentRunId: { type: "string" },
            },
            required: ["deliveryId"],
            additionalProperties: false,
        },
        execute: async (input, context) => {
            return { content: JSON.stringify({ agentRuns: [] }) };
        },
    },
    {
        name: "vstack_agent_cancel",
        description: "Cancel a workflow-owned agent run safely",
        input: {
            type: "object",
            properties: {
                deliveryId: { type: "string" },
                agentRunId: { type: "string" },
                reason: { type: "string" },
            },
            required: ["deliveryId", "agentRunId", "reason"],
            additionalProperties: false,
        },
        execute: async (input, context) => {
            return { content: JSON.stringify({ success: true, message: "Agent cancelled" }) };
        },
    },
    {
        name: "vstack_agent_handoff",
        description: "Record a handoff and next expected owner",
        input: {
            type: "object",
            properties: {
                deliveryId: { type: "string" },
                fromAgentRunId: { type: "string" },
                toAgentId: { type: "string" },
                toTaskId: { type: "string" },
                reason: { type: "string" },
            },
            required: ["deliveryId", "fromAgentRunId", "toAgentId", "toTaskId", "reason"],
            additionalProperties: false,
        },
        execute: async (input, context) => {
            return { content: JSON.stringify({ success: true, message: "Handoff recorded" }) };
        },
    },
];
//# sourceMappingURL=agent-tools.js.map