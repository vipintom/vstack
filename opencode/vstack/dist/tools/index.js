/**
 * vstack Tools - Main export
 * Registers ~7 cohesive tools under vstack_* namespace
 */
import { statusTools } from "./status-tools.js";
import { memoryTools } from "./memory-tools.js";
import { historyTools } from "./history-tools.js";
import { deliveryTools } from "./delivery-tools.js";
import { taskTools } from "./task-tools.js";
import { agentTools } from "./agent-tools.js";
import { checkTools } from "./check-tools.js";
export const vstackTools = [
    ...statusTools,
    ...memoryTools,
    ...historyTools,
    ...deliveryTools,
    ...taskTools,
    ...agentTools,
    ...checkTools,
];
export const toolsByNamespace = {
    status: statusTools,
    memory: memoryTools,
    history: historyTools,
    delivery: deliveryTools,
    task: taskTools,
    agent: agentTools,
    check: checkTools,
};
export function getToolByName(name) {
    return vstackTools.find(t => t.name === name);
}
export const allToolNames = vstackTools.map(t => t.name);
//# sourceMappingURL=index.js.map