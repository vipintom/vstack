/**
 * History Service
 *
 * Query and retrieve activity history from the event log.
 */
import { readEvents, initializeEventLog } from "../persistence/event-log.js";
export async function createHistoryService(paths) {
    return {
        async getRecentEvents(options = {}) {
            await initializeEventLog(paths);
            return readEvents(paths, {
                limit: options.limit || 50,
                eventType: options.eventTypes?.[0],
                fromSequence: options.fromDate ? undefined : undefined,
                reverse: true,
            });
        },
        async getDeliveryHistory(deliveryId, options = {}) {
            await initializeEventLog(paths);
            return readEvents(paths, {
                deliveryId,
                limit: options.limit || 100,
                eventType: options.eventTypes?.[0],
                reverse: true,
            });
        },
        async getTaskHistory(deliveryId, taskId, options = {}) {
            await initializeEventLog(paths);
            return readEvents(paths, {
                deliveryId,
                entityId: taskId,
                entityType: "task",
                limit: options.limit || 50,
                reverse: true,
            });
        },
        async getAgentRunHistory(agentRunId, options = {}) {
            await initializeEventLog(paths);
            return readEvents(paths, {
                entityId: agentRunId,
                entityType: "agent_run",
                limit: options.limit || 50,
                reverse: true,
            });
        },
        async getEventStats() {
            await initializeEventLog(paths);
            const allEvents = await readEvents(paths, { limit: 10000 });
            const deliveryIds = new Set();
            const taskIds = new Set();
            const agentRunIds = new Set();
            let checksCount = 0;
            let reviewsCount = 0;
            for (const event of allEvents) {
                if (event.entity.type === "delivery")
                    deliveryIds.add(event.entity.id);
                if (event.entity.type === "task")
                    taskIds.add(event.entity.id);
                if (event.entity.type === "agent_run")
                    agentRunIds.add(event.entity.id);
                if (event.eventType === "check_completed" || event.eventType === "check_failed")
                    checksCount++;
                if (event.eventType === "review_started" || event.eventType === "review_completed")
                    reviewsCount++;
            }
            const firstEvent = allEvents.length > 0 ? allEvents[0] : null;
            const lastEvent = allEvents.length > 0 ? allEvents[allEvents.length - 1] : null;
            return {
                totalEvents: allEvents.length,
                deliveriesCount: deliveryIds.size,
                tasksCount: taskIds.size,
                agentRunsCount: agentRunIds.size,
                checksCount,
                reviewsCount,
                dateRange: {
                    first: firstEvent?.timestamp ?? null,
                    last: lastEvent?.timestamp ?? null,
                },
            };
        },
    };
}
//# sourceMappingURL=history-service.js.map