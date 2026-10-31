/**
 * Activity Report Generator
 * Generates activity summaries from event log
 */
import { resolve } from "node:path";
import { writeJsonFile } from "../../persistence/file-store.js";
export async function publishActivityReport(paths, deliveryId) {
    const { readEvents } = await import("../../persistence/event-log.js");
    const events = await readEvents(paths, { deliveryId, limit: 500 });
    const report = {
        schemaVersion: 1,
        revision: 1,
        deliveryId,
        activities: events.map((e) => ({
            timestamp: e.timestamp,
            eventType: e.eventType,
            actor: `${e.actor.type}:${e.actor.id}`,
            entity: e.entity,
            summary: JSON.stringify(e.payload),
            outcome: e.payload?.outcome ? String(e.payload.outcome) : undefined,
        })).reverse(),
        generatedAt: new Date().toISOString(),
    };
    await writeJsonFile(paths, resolve(paths.reports, "activity", `${deliveryId}.json`), report);
}
//# sourceMappingURL=activity-reports.js.map