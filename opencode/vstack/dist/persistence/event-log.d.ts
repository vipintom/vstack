/**
 * Append-only event log for vstack workflow state
 * Provides durable audit trail of all state transitions
 */
import { VstackPaths } from "./repository-root.js";
import { Event } from "../schemas/types.js";
export type { Event, EventId, eventId } from "../schemas/types.js";
/**
 * Initialize event sequence from existing log
 */
export declare function initializeEventLog(paths: VstackPaths): Promise<void>;
/**
 * Append an event to the log
 */
export declare function appendEvent(paths: VstackPaths, event: Omit<Event, "eventId" | "sequence" | "schemaVersion"> & {
    schemaVersion?: number;
}): Promise<Event>;
/**
 * Read events from the log (with optional filtering)
 */
export declare function readEvents(paths: VstackPaths, options?: {
    deliveryId?: string;
    entityType?: Event["entity"]["type"];
    entityId?: string;
    eventType?: Event["eventType"];
    fromSequence?: number;
    toSequence?: number;
    limit?: number;
    reverse?: boolean;
}): Promise<Event[]>;
/**
 * Get event log statistics
 */
export declare function getEventLogStats(paths: VstackPaths): Promise<{
    totalEvents: number;
    firstEvent: Event | null;
    lastEvent: Event | null;
    fileSize: number;
}>;
/**
 * Create standard event payloads for common operations
 */
export declare const EventPayloads: {
    deliveryCreated: (deliveryId: string, title: string, profile: string, actor?: Event["actor"], entity?: Event["entity"], source?: Event["source"]) => {
        deliveryId: any;
        eventType: "delivery_created";
        payload: {
            deliveryId: string;
            title: string;
            profile: string;
        };
        actor: {
            type: "plugin" | "agent" | "human" | "system";
            id: string;
        };
        entity: {
            type: "delivery" | "phase" | "task" | "agent_run" | "review" | "finding" | "evidence" | "approval";
            id: string;
        };
        source: {
            sessionId: string | null;
            toolId: string | null;
        };
        timestamp: string;
    };
    deliveryUpdated: (deliveryId: string, changes: Record<string, unknown>, actor?: Event["actor"], entity?: Event["entity"], source?: Event["source"]) => {
        deliveryId: any;
        eventType: "delivery_updated";
        payload: {
            deliveryId: string;
            changes: Record<string, unknown>;
        };
        actor: {
            type: "plugin" | "agent" | "human" | "system";
            id: string;
        };
        entity: {
            type: "delivery" | "phase" | "task" | "agent_run" | "review" | "finding" | "evidence" | "approval";
            id: string;
        };
        source: {
            sessionId: string | null;
            toolId: string | null;
        };
        timestamp: string;
    };
    phaseEntered: (deliveryId: string, phaseRunId: string, phase: string, actor?: Event["actor"], entity?: Event["entity"], source?: Event["source"]) => {
        deliveryId: any;
        eventType: "phase_entered";
        payload: {
            deliveryId: string;
            phaseRunId: string;
            phase: string;
        };
        actor: {
            type: "plugin" | "agent" | "human" | "system";
            id: string;
        };
        entity: {
            type: "delivery" | "phase" | "task" | "agent_run" | "review" | "finding" | "evidence" | "approval";
            id: string;
        };
        source: {
            sessionId: string | null;
            toolId: string | null;
        };
        timestamp: string;
    };
    phaseAdvanced: (deliveryId: string, fromPhaseRunId: string, toPhaseRunId: string, fromPhase: string, toPhase: string, actor?: Event["actor"], entity?: Event["entity"], source?: Event["source"]) => {
        deliveryId: any;
        eventType: "phase_advanced";
        payload: {
            deliveryId: string;
            fromPhaseRunId: string;
            toPhaseRunId: string;
            fromPhase: string;
            toPhase: string;
        };
        actor: {
            type: "plugin" | "agent" | "human" | "system";
            id: string;
        };
        entity: {
            type: "delivery" | "phase" | "task" | "agent_run" | "review" | "finding" | "evidence" | "approval";
            id: string;
        };
        source: {
            sessionId: string | null;
            toolId: string | null;
        };
        timestamp: string;
    };
    taskCreated: (deliveryId: string, taskId: string, title: string, phaseRunId: string, actor?: Event["actor"], entity?: Event["entity"], source?: Event["source"]) => {
        deliveryId: any;
        eventType: "task_created";
        payload: {
            deliveryId: string;
            taskId: string;
            title: string;
            phaseRunId: string;
        };
        actor: {
            type: "plugin" | "agent" | "human" | "system";
            id: string;
        };
        entity: {
            type: "delivery" | "phase" | "task" | "agent_run" | "review" | "finding" | "evidence" | "approval";
            id: string;
        };
        source: {
            sessionId: string | null;
            toolId: string | null;
        };
        timestamp: string;
    };
    taskAssigned: (deliveryId: string, taskId: string, agentId: string, sessionId: string, actor?: Event["actor"], entity?: Event["entity"], source?: Event["source"]) => {
        deliveryId: any;
        eventType: "task_assigned";
        payload: {
            deliveryId: string;
            taskId: string;
            agentId: string;
            sessionId: string;
        };
        actor: {
            type: "plugin" | "agent" | "human" | "system";
            id: string;
        };
        entity: {
            type: "delivery" | "phase" | "task" | "agent_run" | "review" | "finding" | "evidence" | "approval";
            id: string;
        };
        source: {
            sessionId: string | null;
            toolId: string | null;
        };
        timestamp: string;
    };
    taskCompleted: (deliveryId: string, taskId: string, evidenceIds: string[], actor?: Event["actor"], entity?: Event["entity"], source?: Event["source"]) => {
        deliveryId: any;
        eventType: "task_completed";
        payload: {
            deliveryId: string;
            taskId: string;
            evidenceIds: string[];
        };
        actor: {
            type: "plugin" | "agent" | "human" | "system";
            id: string;
        };
        entity: {
            type: "delivery" | "phase" | "task" | "agent_run" | "review" | "finding" | "evidence" | "approval";
            id: string;
        };
        source: {
            sessionId: string | null;
            toolId: string | null;
        };
        timestamp: string;
    };
    agentDispatched: (deliveryId: string, agentRunId: string, agentId: string, taskId: string | null, actor?: Event["actor"], entity?: Event["entity"], source?: Event["source"]) => {
        deliveryId: any;
        eventType: "agent_dispatched";
        payload: {
            deliveryId: string;
            agentRunId: string;
            agentId: string;
            taskId: string | null;
        };
        actor: {
            type: "plugin" | "agent" | "human" | "system";
            id: string;
        };
        entity: {
            type: "delivery" | "phase" | "task" | "agent_run" | "review" | "finding" | "evidence" | "approval";
            id: string;
        };
        source: {
            sessionId: string | null;
            toolId: string | null;
        };
        timestamp: string;
    };
    checkCompleted: (deliveryId: string, evidenceId: string, checkId: string, status: "passed" | "failed" | "timeout" | "error" | "cancelled", actor?: Event["actor"], entity?: Event["entity"], source?: Event["source"]) => {
        deliveryId: any;
        eventType: "check_completed";
        payload: {
            deliveryId: string;
            evidenceId: string;
            checkId: string;
            status: "cancelled" | "failed" | "passed" | "error" | "timeout";
        };
        actor: {
            type: "plugin" | "agent" | "human" | "system";
            id: string;
        };
        entity: {
            type: "delivery" | "phase" | "task" | "agent_run" | "review" | "finding" | "evidence" | "approval";
            id: string;
        };
        source: {
            sessionId: string | null;
            toolId: string | null;
        };
        timestamp: string;
    };
    reviewStarted: (deliveryId: string, reviewRunId: string, profile: string, actor?: Event["actor"], entity?: Event["entity"], source?: Event["source"]) => {
        deliveryId: any;
        eventType: "review_started";
        payload: {
            deliveryId: string;
            reviewRunId: string;
            profile: string;
        };
        actor: {
            type: "plugin" | "agent" | "human" | "system";
            id: string;
        };
        entity: {
            type: "delivery" | "phase" | "task" | "agent_run" | "review" | "finding" | "evidence" | "approval";
            id: string;
        };
        source: {
            sessionId: string | null;
            toolId: string | null;
        };
        timestamp: string;
    };
    findingOpened: (deliveryId: string, findingId: string, severity: string, lens: string, actor?: Event["actor"], entity?: Event["entity"], source?: Event["source"]) => {
        deliveryId: any;
        eventType: "finding_opened";
        payload: {
            deliveryId: string;
            findingId: string;
            severity: string;
            lens: string;
        };
        actor: {
            type: "plugin" | "agent" | "human" | "system";
            id: string;
        };
        entity: {
            type: "delivery" | "phase" | "task" | "agent_run" | "review" | "finding" | "evidence" | "approval";
            id: string;
        };
        source: {
            sessionId: string | null;
            toolId: string | null;
        };
        timestamp: string;
    };
    approvalRequested: (deliveryId: string, approvalId: string, type: string, actor?: Event["actor"], entity?: Event["entity"], source?: Event["source"]) => {
        deliveryId: any;
        eventType: "approval_requested";
        payload: {
            deliveryId: string;
            approvalId: string;
            type: string;
        };
        actor: {
            type: "plugin" | "agent" | "human" | "system";
            id: string;
        };
        entity: {
            type: "delivery" | "phase" | "task" | "agent_run" | "review" | "finding" | "evidence" | "approval";
            id: string;
        };
        source: {
            sessionId: string | null;
            toolId: string | null;
        };
        timestamp: string;
    };
    approvalGranted: (deliveryId: string, approvalId: string, decidedBy: string, actor?: Event["actor"], entity?: Event["entity"], source?: Event["source"]) => {
        deliveryId: any;
        eventType: "approval_granted";
        payload: {
            deliveryId: string;
            approvalId: string;
            decidedBy: string;
        };
        actor: {
            type: "plugin" | "agent" | "human" | "system";
            id: string;
        };
        entity: {
            type: "delivery" | "phase" | "task" | "agent_run" | "review" | "finding" | "evidence" | "approval";
            id: string;
        };
        source: {
            sessionId: string | null;
            toolId: string | null;
        };
        timestamp: string;
    };
    approvalRejected: (deliveryId: string, approvalId: string, decidedBy: string, actor?: Event["actor"], entity?: Event["entity"], source?: Event["source"]) => {
        deliveryId: any;
        eventType: "approval_rejected";
        payload: {
            deliveryId: string;
            approvalId: string;
            decidedBy: string;
        };
        actor: {
            type: "plugin" | "agent" | "human" | "system";
            id: string;
        };
        entity: {
            type: "delivery" | "phase" | "task" | "agent_run" | "review" | "finding" | "evidence" | "approval";
            id: string;
        };
        source: {
            sessionId: string | null;
            toolId: string | null;
        };
        timestamp: string;
    };
};
//# sourceMappingURL=event-log.d.ts.map