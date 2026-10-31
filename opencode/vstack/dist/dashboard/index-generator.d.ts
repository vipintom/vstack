/**
 * Dashboard index generation.
 *
 * `.vstack/state/index.json` is the small, frequently-polled projection of
 * active deliveries used by the OpenChamber extension. It is regenerated from
 * delivery files; the revision only advances when the projection changes.
 */
import { VstackPaths } from "../persistence/repository-root.js";
import { Manifest } from "../schemas/types.js";
export interface DashboardDeliverySummary {
    id: string;
    title: string;
    type: string;
    profile: string;
    status: string;
    currentPhase: string;
    updatedAt: string;
    revision: number;
}
export interface DashboardIndex {
    schemaVersion: 1;
    revision: number;
    updatedAt: string;
    activeDeliveries: DashboardDeliverySummary[];
}
/**
 * Read the current index, or a synthetic empty index when it does not exist.
 */
export declare function readDashboardIndex(paths: VstackPaths): Promise<DashboardIndex>;
/**
 * Rebuild the dashboard index from delivery files.
 * Returns the existing index untouched when the projection has not changed.
 */
export declare function refreshDashboardIndex(paths: VstackPaths): Promise<DashboardIndex>;
/**
 * Ensure `.vstack/manifest.json` exists so readers can detect the store.
 */
export declare function ensureManifest(paths: VstackPaths): Promise<Manifest>;
//# sourceMappingURL=index-generator.d.ts.map