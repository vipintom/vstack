/**
 * Projection Data Loaders
 * Loads data from .vstack/ for generating projections
 */
import { VstackPaths } from "../../persistence/repository-root.js";
export declare function loadDeliveries(paths: VstackPaths): Promise<any[]>;
export declare function getTasksForDelivery(paths: VstackPaths, deliveryId: string): Promise<any[]>;
export declare function getAgentRunsForDelivery(paths: VstackPaths, deliveryId: string): Promise<any[]>;
export declare function getEvidenceForDelivery(paths: VstackPaths, deliveryId: string): Promise<any[]>;
//# sourceMappingURL=loaders.d.ts.map