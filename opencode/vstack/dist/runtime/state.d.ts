/**
 * Runtime state bootstrap and projection refresh.
 *
 * Called during plugin setup and after every vstack tool execution so the
 * OpenChamber panel always sees a manifest and a current dashboard index.
 */
import { VstackPaths } from "../persistence/repository-root.js";
import { DashboardIndex } from "../dashboard/index-generator.js";
export declare function initializeRuntimeState(paths: VstackPaths): Promise<DashboardIndex>;
export declare function refreshRuntimeState(paths: VstackPaths): Promise<DashboardIndex>;
//# sourceMappingURL=state.d.ts.map