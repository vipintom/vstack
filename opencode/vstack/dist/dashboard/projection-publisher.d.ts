/**
 * Projection Publisher
 * Main entry point for generating all OpenChamber projections
 */
import { VstackPaths } from "../persistence/repository-root.js";
export declare function publishProjections(paths: VstackPaths): Promise<void>;
export { loadDeliveries } from "./projections/loaders.js";
export { publishDeliveryReport } from "./projections/delivery-reports.js";
export { publishActivityReport } from "./projections/activity-reports.js";
export { publishMemoryIndex } from "./projections/memory-reports.js";
export { publishQualitySummary } from "./projections/quality-reports.js";
export { ensureProjectionDirs } from "./projections/paths.js";
//# sourceMappingURL=projection-publisher.d.ts.map