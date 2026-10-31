/**
 * Task tools
 * Manage task creation, assignment, and tracking
 */
export const taskTools = [
    {
        name: "vstack_plan_set",
        description: "Record plan metadata and artifact path",
        input: {
            type: "object",
            properties: {
                deliveryId: { type: "string" },
                phaseRunId: { type: "string" },
                planPath: { type: "string" },
                steps: {
                    type: "array",
                    items: {
                        type: "object",
                        properties: {
                            stepId: { type: "string" },
                            title: { type: "string" },
                            description: { type: "string" },
                            acceptanceCriteria: { type: "array", items: { type: "string" } },
                            dependsOn: { type: "array", items: { type: "string" } },
                        },
                        required: ["stepId", "title", "description"],
                    },
                },
            },
            required: ["deliveryId", "phaseRunId", "planPath", "steps"],
            additionalProperties: false,
        },
        execute: async (input, context) => {
            return { content: JSON.stringify({ success: true, stepsCreated: input.steps.length }) };
        },
    },
    {
        name: "vstack_task_create",
        description: "Create a task with owner, phase, acceptance criteria",
        input: {
            type: "object",
            properties: {
                deliveryId: { type: "string" },
                phaseRunId: { type: "string" },
                title: { type: "string" },
                description: { type: "string" },
                type: { type: "string", enum: ["discovery", "design", "planning", "implementation", "testing", "review", "documentation", "release", "deployment", "operations", "other"] },
                priority: { type: "string", enum: ["low", "medium", "high", "critical"] },
                dependencies: { type: "array", items: { type: "string" } },
                acceptanceCriteria: { type: "array", items: { type: "string" } },
                expectedOutputs: { type: "array", items: { type: "string" } },
                requiredSkills: { type: "array", items: { type: "string" } },
                workScope: { type: "string" },
                maxAttempts: { type: "number", default: 3 },
                ownerAgentId: { type: "string" },
            },
            required: ["deliveryId", "phaseRunId", "title", "description", "type"],
            additionalProperties: false,
        },
        execute: async (input, context) => {
            return { content: JSON.stringify({ taskId: "tsk_123", status: "created" }) };
        },
    },
    {
        name: "vstack_task_update",
        description: "Change task state through validated transitions",
        input: {
            type: "object",
            properties: {
                taskId: { type: "string" },
                status: { type: "string", enum: ["pending", "ready", "assigned", "in_progress", "review", "completed", "blocked", "failed", "cancelled", "skipped", "needs_rework"] },
                priority: { type: "string", enum: ["low", "medium", "high", "critical"] },
                workScope: { type: "string" },
                acceptanceCriteria: { type: "array", items: { type: "string" } },
                expectedOutputs: { type: "array", items: { type: "string" } },
                resultSummary: { type: "string" },
            },
            required: ["taskId"],
            additionalProperties: false,
        },
        execute: async (input, context) => {
            return { content: JSON.stringify({ success: true, taskId: input.taskId }) };
        },
    },
    {
        name: "vstack_task_assign",
        description: "Assign an agent/session to a task",
        input: {
            type: "object",
            properties: {
                taskId: { type: "string" },
                agentId: { type: "string" },
                sessionId: { type: "string" },
            },
            required: ["taskId", "agentId", "sessionId"],
            additionalProperties: false,
        },
        execute: async (input, context) => {
            return { content: JSON.stringify({ success: true, taskId: input.taskId }) };
        },
    },
    {
        name: "vstack_task_ready",
        description: "Return eligible tasks whose dependencies are satisfied",
        input: {
            type: "object",
            properties: {
                deliveryId: { type: "string" },
                phaseRunId: { type: "string" },
            },
            required: ["deliveryId", "phaseRunId"],
            additionalProperties: false,
        },
        execute: async (input, context) => {
            return { content: JSON.stringify({ readyTasks: [] }) };
        },
    },
    {
        name: "vstack_task_get",
        description: "Retrieve task detail",
        input: {
            type: "object",
            properties: {
                taskId: { type: "string" },
            },
            required: ["taskId"],
            additionalProperties: false,
        },
        execute: async (input, context) => {
            return { content: JSON.stringify({ task: { id: input.taskId } }) };
        },
    },
    {
        name: "vstack_task_list",
        description: "List tasks by delivery/phase/status/owner",
        input: {
            type: "object",
            properties: {
                deliveryId: { type: "string" },
                phaseRunId: { type: "string" },
                status: { type: "array", items: { type: "string" } },
                ownerAgentId: { type: "string" },
            },
            required: ["deliveryId"],
            additionalProperties: false,
        },
        execute: async (input, context) => {
            return { content: JSON.stringify({ tasks: [] }) };
        },
    },
    {
        name: "vstack_task_dependency_add",
        description: "Add a validated dependency (rejects cycles)",
        input: {
            type: "object",
            properties: {
                taskId: { type: "string" },
                dependsOnTaskId: { type: "string" },
            },
            required: ["taskId", "dependsOnTaskId"],
            additionalProperties: false,
        },
        execute: async (input, context) => {
            return { content: JSON.stringify({ success: true }) };
        },
    },
    {
        name: "vstack_task_complete",
        description: "Complete task with required result/evidence references",
        input: {
            type: "object",
            properties: {
                taskId: { type: "string" },
                resultSummary: { type: "string" },
                evidenceIds: { type: "array", items: { type: "string" } },
            },
            required: ["taskId", "resultSummary", "evidenceIds"],
            additionalProperties: false,
        },
        execute: async (input, context) => {
            return { content: JSON.stringify({ success: true, taskId: input.taskId }) };
        },
    },
];
//# sourceMappingURL=task-tools.js.map