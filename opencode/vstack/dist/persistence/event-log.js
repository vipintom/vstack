/**
 * Append-only event log for vstack workflow state
 * Provides durable audit trail of all state transitions
 */
import { ensureVstackDirs } from "./repository-root.js";
import { eventId } from "../schemas/types.js";
import { v4 as uuidv4 } from "uuid";
let eventSequence = 0;
let sequenceInitialized = false;
/**
 * Initialize event sequence from existing log
 */
export async function initializeEventLog(paths) {
    if (sequenceInitialized)
        return;
    const eventsPath = paths.events;
    const fs = await import("node:fs");
    if (!eventsPath || !fs.existsSync(eventsPath)) {
        eventSequence = 0;
        sequenceInitialized = true;
        return;
    }
    try {
        const content = fs.readFileSync(eventsPath, "utf-8");
        const lines = content.trim().split("\n").filter(Boolean);
        if (lines.length > 0) {
            const lastLine = lines[lines.length - 1];
            if (lastLine) {
                const lastEvent = JSON.parse(lastLine);
                eventSequence = lastEvent.sequence || 0;
            }
        }
    }
    catch {
        eventSequence = 0;
    }
    sequenceInitialized = true;
}
/**
 * Get next event sequence number
 */
function getNextSequence() {
    return ++eventSequence;
}
/**
 * Append an event to the log
 */
export async function appendEvent(paths, event) {
    await initializeEventLog(paths);
    await ensureVstackDirs(paths);
    const { schemaVersion: _, timestamp: __, ...eventData } = event;
    const fullEvent = {
        schemaVersion: 1,
        eventId: eventId(uuidv4()),
        sequence: getNextSequence(),
        timestamp: new Date().toISOString(),
        ...eventData,
    };
    const fs = await import("node:fs");
    const line = JSON.stringify(fullEvent) + "\n";
    // Append to file (atomic on POSIX for single writes)
    if (paths.events) {
        fs.appendFileSync(paths.events, line, "utf-8");
    }
    return fullEvent;
}
/**
 * Read events from the log (with optional filtering)
 */
export async function readEvents(paths, options = {}) {
    await initializeEventLog(paths);
    const eventsPath = paths.events;
    const fs = await import("node:fs");
    if (!fs.existsSync(eventsPath)) {
        return [];
    }
    const content = fs.readFileSync(eventsPath, "utf-8");
    const lines = content.trim().split("\n").filter(Boolean);
    let events = lines.map(line => JSON.parse(line));
    // Apply filters
    if (options.deliveryId) {
        events = events.filter(e => e.deliveryId === options.deliveryId);
    }
    if (options.entityType) {
        events = events.filter(e => e.entity.type === options.entityType);
    }
    if (options.entityId) {
        events = events.filter(e => e.entity.id === options.entityId);
    }
    if (options.eventType) {
        events = events.filter(e => e.eventType === options.eventType);
    }
    if (options.fromSequence !== undefined) {
        events = events.filter(e => e.sequence >= options.fromSequence);
    }
    if (options.toSequence !== undefined) {
        events = events.filter(e => e.sequence <= options.toSequence);
    }
    // Sort by sequence
    if (options.reverse) {
        events.reverse();
    }
    // Apply limit
    if (options.limit && options.limit > 0) {
        events = events.slice(0, options.limit);
    }
    return events;
}
/**
 * Get event log statistics
 */
export async function getEventLogStats(paths) {
    await initializeEventLog(paths);
    const eventsPath = paths.events;
    const fs = await import("node:fs");
    if (!fs.existsSync(eventsPath)) {
        return { totalEvents: 0, firstEvent: null, lastEvent: null, fileSize: 0 };
    }
    const stats = fs.statSync(eventsPath);
    const content = fs.readFileSync(eventsPath, "utf-8");
    const lines = content.trim().split("\n").filter(Boolean);
    let firstEvent = null;
    let lastEvent = null;
    if (lines.length > 0) {
        const firstLine = lines[0];
        const lastLine = lines[lines.length - 1];
        if (firstLine)
            firstEvent = JSON.parse(firstLine);
        if (lastLine)
            lastEvent = JSON.parse(lastLine);
    }
    return {
        totalEvents: lines.length,
        firstEvent,
        lastEvent,
        fileSize: stats.size,
    };
}
/**
 * Create standard event payloads for common operations
 */
export const EventPayloads = {
    deliveryCreated: (deliveryId, title, profile, actor = { type: "plugin", id: "system" }, entity = { type: "delivery", id: deliveryId }, source = { sessionId: null, toolId: null }) => ({
        deliveryId: deliveryId,
        eventType: "delivery_created",
        payload: { deliveryId, title, profile },
        actor,
        entity,
        source,
        timestamp: new Date().toISOString(),
    }),
    deliveryUpdated: (deliveryId, changes, actor = { type: "plugin", id: "system" }, entity = { type: "delivery", id: deliveryId }, source = { sessionId: null, toolId: null }) => ({
        deliveryId: deliveryId,
        eventType: "delivery_updated",
        payload: { deliveryId, changes },
        actor,
        entity,
        source,
        timestamp: new Date().toISOString(),
    }),
    phaseEntered: (deliveryId, phaseRunId, phase, actor = { type: "plugin", id: "system" }, entity = { type: "phase", id: phaseRunId }, source = { sessionId: null, toolId: null }) => ({
        deliveryId: deliveryId,
        eventType: "phase_entered",
        payload: { deliveryId, phaseRunId, phase },
        actor,
        entity,
        source,
        timestamp: new Date().toISOString(),
    }),
    phaseAdvanced: (deliveryId, fromPhaseRunId, toPhaseRunId, fromPhase, toPhase, actor = { type: "plugin", id: "system" }, entity = { type: "phase", id: toPhaseRunId }, source = { sessionId: null, toolId: null }) => ({
        deliveryId: deliveryId,
        eventType: "phase_advanced",
        payload: { deliveryId, fromPhaseRunId, toPhaseRunId, fromPhase, toPhase },
        actor,
        entity,
        source,
        timestamp: new Date().toISOString(),
    }),
    taskCreated: (deliveryId, taskId, title, phaseRunId, actor = { type: "plugin", id: "system" }, entity = { type: "task", id: taskId }, source = { sessionId: null, toolId: null }) => ({
        deliveryId: deliveryId,
        eventType: "task_created",
        payload: { deliveryId, taskId, title, phaseRunId },
        actor,
        entity,
        source,
        timestamp: new Date().toISOString(),
    }),
    taskAssigned: (deliveryId, taskId, agentId, sessionId, actor = { type: "plugin", id: "system" }, entity = { type: "task", id: taskId }, source = { sessionId, toolId: null }) => ({
        deliveryId: deliveryId,
        eventType: "task_assigned",
        payload: { deliveryId, taskId, agentId, sessionId },
        actor,
        entity,
        source,
        timestamp: new Date().toISOString(),
    }),
    taskCompleted: (deliveryId, taskId, evidenceIds, actor = { type: "plugin", id: "system" }, entity = { type: "task", id: taskId }, source = { sessionId: null, toolId: null }) => ({
        deliveryId: deliveryId,
        eventType: "task_completed",
        payload: { deliveryId, taskId, evidenceIds },
        actor,
        entity,
        source,
        timestamp: new Date().toISOString(),
    }),
    agentDispatched: (deliveryId, agentRunId, agentId, taskId, actor = { type: "plugin", id: "system" }, entity = { type: "agent_run", id: agentRunId }, source = { sessionId: null, toolId: null }) => ({
        deliveryId: deliveryId,
        eventType: "agent_dispatched",
        payload: { deliveryId, agentRunId, agentId, taskId },
        actor,
        entity,
        source,
        timestamp: new Date().toISOString(),
    }),
    checkCompleted: (deliveryId, evidenceId, checkId, status, actor = { type: "plugin", id: "system" }, entity = { type: "evidence", id: evidenceId }, source = { sessionId: null, toolId: null }) => ({
        deliveryId: deliveryId,
        eventType: "check_completed",
        payload: { deliveryId, evidenceId, checkId, status },
        actor,
        entity,
        source,
        timestamp: new Date().toISOString(),
    }),
    reviewStarted: (deliveryId, reviewRunId, profile, actor = { type: "plugin", id: "system" }, entity = { type: "review", id: reviewRunId }, source = { sessionId: null, toolId: null }) => ({
        deliveryId: deliveryId,
        eventType: "review_started",
        payload: { deliveryId, reviewRunId, profile },
        actor,
        entity,
        source,
        timestamp: new Date().toISOString(),
    }),
    findingOpened: (deliveryId, findingId, severity, lens, actor = { type: "plugin", id: "system" }, entity = { type: "finding", id: findingId }, source = { sessionId: null, toolId: null }) => ({
        deliveryId: deliveryId,
        eventType: "finding_opened",
        payload: { deliveryId, findingId, severity, lens },
        actor,
        entity,
        source,
        timestamp: new Date().toISOString(),
    }),
    approvalRequested: (deliveryId, approvalId, type, actor = { type: "plugin", id: "system" }, entity = { type: "approval", id: approvalId }, source = { sessionId: null, toolId: null }) => ({
        deliveryId: deliveryId,
        eventType: "approval_requested",
        payload: { deliveryId, approvalId, type },
        actor,
        entity,
        source,
        timestamp: new Date().toISOString(),
    }),
    approvalGranted: (deliveryId, approvalId, decidedBy, actor = { type: "plugin", id: "system" }, entity = { type: "approval", id: approvalId }, source = { sessionId: null, toolId: null }) => ({
        deliveryId: deliveryId,
        eventType: "approval_granted",
        payload: { deliveryId, approvalId, decidedBy },
        actor,
        entity,
        source,
        timestamp: new Date().toISOString(),
    }),
    approvalRejected: (deliveryId, approvalId, decidedBy, actor = { type: "plugin", id: "system" }, entity = { type: "approval", id: approvalId }, source = { sessionId: null, toolId: null }) => ({
        deliveryId: deliveryId,
        eventType: "approval_rejected",
        payload: { deliveryId, approvalId, decidedBy },
        actor,
        entity,
        source,
        timestamp: new Date().toISOString(),
    }),
};
//# sourceMappingURL=event-log.js.map