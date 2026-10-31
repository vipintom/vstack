/**
 * Delivery tools
 * Manage delivery lifecycle
 */
export const deliveryTools = [
    {
        name: "vstack_status",
        description: "Read current project state, active delivery, phase, blockers, and next action",
        input: { type: "object", properties: {}, additionalProperties: false },
        execute: async (_input, context) => {
            return { content: JSON.stringify({ status: "ready", message: "vstack ready" }) };
        },
    },
    {
        name: "vstack_delivery_create",
        description: "Create a delivery record and select/confirm lifecycle profile",
        input: {
            type: "object",
            properties: {
                title: { type: "string" },
                description: { type: "string" },
                type: { type: "string", enum: ["feature", "bugfix", "refactor", "migration", "infrastructure", "documentation", "operations", "release", "other"] },
                profile: { type: "string", enum: ["bug-fix", "feature", "refactor", "architecture-change", "infrastructure-change", "documentation", "release-only"] },
                acceptanceCriteria: { type: "array", items: { type: "string" } },
            },
            required: ["title", "description", "type", "profile"],
            additionalProperties: false,
        },
        execute: async (input, context) => {
            return { content: JSON.stringify({ deliveryId: "del_123", status: "created" }) };
        },
    },
    {
        name: "vstack_delivery_get",
        description: "Retrieve a delivery with summary",
        input: {
            type: "object",
            properties: { deliveryId: { type: "string" } },
            required: ["deliveryId"],
            additionalProperties: false,
        },
        execute: async (input, context) => {
            return { content: JSON.stringify({ delivery: { id: input.deliveryId, title: "Sample" } }) };
        },
    },
    {
        name: "vstack_delivery_list",
        description: "List active/recent deliveries",
        input: {
            type: "object",
            properties: {
                status: { type: "array", items: { type: "string" } },
                limit: { type: "number", default: 20 },
            },
            additionalProperties: false,
        },
        execute: async (input, context) => {
            return { content: JSON.stringify({ deliveries: [] }) };
        },
    },
    {
        name: "vstack_delivery_update",
        description: "Update delivery metadata",
        input: {
            type: "object",
            properties: {
                deliveryId: { type: "string" },
                title: { type: "string" },
                description: { type: "string" },
                acceptanceCriteria: { type: "array", items: { type: "string" } },
                labels: { type: "array", items: { type: "string" } },
            },
            required: ["deliveryId"],
            additionalProperties: false,
        },
        execute: async (input, context) => {
            return { content: JSON.stringify({ success: true, deliveryId: input.deliveryId }) };
        },
    },
];
//# sourceMappingURL=delivery-tools.js.map