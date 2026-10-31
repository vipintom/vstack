/**
 * Runtime state bootstrap and projection refresh.
 *
 * Called during plugin setup and after every vstack tool execution so the
 * OpenChamber panel always sees a manifest and a current dashboard index.
 */
import { ensureManifest, refreshDashboardIndex } from "../dashboard/index-generator.js";
export async function initializeRuntimeState(paths) {
    await ensureManifest(paths);
    return refreshDashboardIndex(paths);
}
export async function refreshRuntimeState(paths) {
    await ensureManifest(paths);
    return refreshDashboardIndex(paths);
}
//# sourceMappingURL=state.js.map