/**
 * Projection Path Helpers
 * Centralized path resolution for all projection files
 */
import { VstackPaths } from "../../persistence/repository-root.js";
export declare function deliveryReportPath(paths: VstackPaths, deliveryId: string): string;
export declare function activityReportPath(paths: VstackPaths, deliveryId: string): string;
export declare function memoryIndexPath(paths: VstackPaths): string;
export declare function qualitySummaryPath(paths: VstackPaths, deliveryId: string): string;
export declare function ensureProjectionDirs(paths: VstackPaths): void;
//# sourceMappingURL=paths.d.ts.map