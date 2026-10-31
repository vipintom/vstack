/**
 * vstack Tools - Main export
 * Registers all tools under vstack_* namespace
 */
import { deliveryTools } from "./delivery-tools.js";
import { workflowTools } from "./workflow-tools.js";
import { taskTools } from "./task-tools.js";
import { agentTools } from "./agent-tools.js";
import { qualityTools } from "./quality-tools.js";
import { reviewTools } from "./review-tools.js";
import { releaseTools } from "./release-tools.js";
export const vstackTools = [
    ...deliveryTools,
    ...workflowTools,
    ...taskTools,
    ...agentTools,
    ...qualityTools,
    ...reviewTools,
    ...releaseTools,
];
/**
 * Get all tools grouped by namespace
 */
export const toolsByNamespace = {
    delivery: deliveryTools,
    workflow: workflowTools,
    task: taskTools,
    agent: agentTools,
    quality: qualityTools,
    review: reviewTools,
    release: releaseTools,
};
/**
 * Get tool by name
 */
export function getToolByName(name) {
    return vstackTools.find(t => t.name === name);
}
/**
 * Get all tool names
 */
export const allToolNames = vstackTools.map(t => t.name);
//# sourceMappingURL=index.js.map