/**
 * Simplified Delivery Store
 *
 * CRUD operations for deliveries without lifecycle engine coupling.
 * Status: active | blocked | completed | cancelled
 */
import { VstackPaths } from "../persistence/repository-root.js";
import { Delivery, DeliveryId, DeliveryStatus, DeliveryType } from "../schemas/types.js";
export interface DeliveryStore {
    createDelivery(params: CreateDeliveryParams): Promise<Delivery>;
    getDelivery(deliveryId: DeliveryId): Promise<Delivery | null>;
    listDeliveries(filter?: DeliveryFilter): Promise<Delivery[]>;
    updateDelivery(deliveryId: DeliveryId, updates: DeliveryUpdates): Promise<Delivery>;
    deleteDelivery(deliveryId: DeliveryId): Promise<void>;
}
export interface CreateDeliveryParams {
    title: string;
    objective: string;
    type: DeliveryType;
    acceptanceCriteria: string[];
    risk: "low" | "medium" | "high" | "critical";
    labels: string[];
    createdBy: string;
}
export interface DeliveryUpdates {
    title?: string;
    objective?: string;
    status?: DeliveryStatus;
    acceptanceCriteria?: string[];
    blockedReason?: string;
    completedAt?: string;
}
export interface DeliveryFilter {
    status?: DeliveryStatus[];
    type?: DeliveryType[];
    limit?: number;
    offset?: number;
}
export declare function createDeliveryStore(paths: VstackPaths): Promise<DeliveryStore>;
//# sourceMappingURL=delivery-store.d.ts.map