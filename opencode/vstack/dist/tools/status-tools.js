/**
 * vstack_status - Project status, delivery summary, active tasks, blockers, next-ready tasks
 */
export const statusTool = {
    name: "vstack_status",
    description: "Get project status: deliveries, active tasks, blockers, ready tasks",
    input: {
        type: "object",
        properties: {
            deliveryId: { type: "string", description: "Optional delivery ID for detailed status" },
        },
    },
    execute: async (input, context) => {
        const { vstack } = context;
        const { deliveryStore, taskStore, agentRunStore } = vstack;
        if (input.deliveryId) {
            const delivery = await deliveryStore.getDelivery(input.deliveryId);
            if (!delivery)
                return { content: JSON.stringify({ error: "Delivery not found" }) };
            const tasks = await taskStore.listTasks(delivery.id);
            const agentRuns = await agentRunStore.listAgentRuns(delivery.id);
            const readyTasks = await taskStore.getReadyTasks(delivery.id);
            return { content: JSON.stringify({
                    delivery,
                    tasks,
                    agentRuns,
                    readyTasks,
                    summary: {
                        totalTasks: tasks.length,
                        completedTasks: tasks.filter((t) => t.status === "completed").length,
                        inProgressTasks: tasks.filter((t) => t.status === "in_progress").length,
                        blockedTasks: tasks.filter((t) => t.status === "blocked").length,
                        readyTasks: readyTasks.length,
                        activeAgents: agentRuns.filter((r) => r.status === "running" || r.status === "dispatched").length,
                    },
                }) };
        }
        // Overall project status
        const deliveries = await deliveryStore.listDeliveries({ limit: 10 });
        const activeDeliveries = deliveries.filter((d) => d.status === "active" || d.status === "blocked");
        let allTasks = [];
        let allAgentRuns = [];
        for (const d of activeDeliveries) {
            const tasks = await taskStore.listTasks(d.id);
            allTasks.push(...tasks);
            const runs = await agentRunStore.listAgentRuns(d.id);
            allAgentRuns.push(...runs);
        }
        return { content: JSON.stringify({
                deliveries: activeDeliveries,
                summary: {
                    activeDeliveries: activeDeliveries.length,
                    totalTasks: allTasks.length,
                    completedTasks: allTasks.filter((t) => t.status === "completed").length,
                    inProgressTasks: allTasks.filter((t) => t.status === "in_progress").length,
                    blockedTasks: allTasks.filter((t) => t.status === "blocked").length,
                    activeAgents: allAgentRuns.filter((r) => r.status === "running" || r.status === "dispatched").length,
                },
            }) };
    },
};
export const statusTools = [statusTool];
//# sourceMappingURL=status-tools.js.map