/**
 * History Service
 *
 * Query and retrieve activity history from the event log.
 */
import { VstackPaths } from "../persistence/repository-root.js";
import { Event } from "../persistence/event-log.js";
export interface HistoryService {
    getRecentEvents(options?: HistoryOptions): Promise<Event[]>;
    getDeliveryHistory(deliveryId: string, options?: HistoryOptions): Promise<Event[]>;
    getTaskHistory(deliveryId: string, taskId: string, options?: HistoryOptions): Promise<Event[]>;
    getAgentRunHistory(agentRunId: string, options?: HistoryOptions): Promise<Event[]>;
    getEventStats(): Promise<EventStats>;
}
export interface HistoryOptions {
    limit?: number;
    eventTypes?: Event["eventType"][];
    fromDate?: string;
    toDate?: string;
}
export interface EventStats {
    totalEvents: number;
    deliveriesCount: number;
    tasksCount: number;
    agentRunsCount: number;
    checksCount: number;
    reviewsCount: number;
    dateRange: {
        first: string | null;
        last: string | null;
    };
}
export declare function createHistoryService(paths: VstackPaths): Promise<HistoryService>;
//# sourceMappingURL=history-service.d.ts.map