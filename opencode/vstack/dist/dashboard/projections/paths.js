/**
 * Projection Path Helpers
 * Centralized path resolution for all projection files
 */
import { resolve } from "node:path";
export function deliveryReportPath(paths, deliveryId) {
    return resolve(paths.reports, "deliveries", `${deliveryId}.json`);
}
export function activityReportPath(paths, deliveryId) {
    return resolve(paths.reports, "activity", `${deliveryId}.json`);
}
export function memoryIndexPath(paths) {
    return resolve(paths.reports, "memory-index.json");
}
export function qualitySummaryPath(paths, deliveryId) {
    return resolve(paths.reports, "quality", `${deliveryId}.json`);
}
export function ensureProjectionDirs(paths) {
    const { mkdirSync } = require("node:fs");
    const { resolve } = require("node:path");
    mkdirSync(resolve(paths.reports, "deliveries"), { recursive: true });
    mkdirSync(resolve(paths.reports, "activity"), { recursive: true });
    mkdirSync(resolve(paths.reports, "quality"), { recursive: true });
}
//# sourceMappingURL=paths.js.map