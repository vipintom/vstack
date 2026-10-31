/**
 * Simplified Delivery Store
 *
 * CRUD operations for deliveries without lifecycle engine coupling.
 * Status: active | blocked | completed | cancelled
 */
import { readJsonFile, writeJsonFile, listFiles, deleteFile } from "../persistence/file-store.js";
import { deliveryId } from "../schemas/types.js";
import { resolve } from "node:path";
import { v4 as uuidv4 } from "uuid";
function deliveryDir(paths) {
    return resolve(paths.deliveries);
}
function deliveryFile(paths, deliveryId) {
    return resolve(deliveryDir(paths), deliveryId, "delivery.json");
}
export async function createDeliveryStore(paths) {
    return {
        async createDelivery(params) {
            const id = deliveryId(`dlv_${uuidv4()}`);
            const now = new Date().toISOString();
            const delivery = {
                schemaVersion: 1,
                id,
                title: params.title,
                description: params.objective,
                type: params.type,
                profile: "feature",
                status: "active",
                currentPhase: "planning",
                currentPhaseRunId: null,
                createdAt: now,
                updatedAt: now,
                revision: 1,
                acceptanceCriteria: params.acceptanceCriteria,
                risk: params.risk,
                labels: params.labels,
                references: {},
                createdBy: params.createdBy,
            };
            await writeJsonFile(paths, deliveryFile(paths, id), delivery);
            return delivery;
        },
        async getDelivery(deliveryId) {
            return readJsonFile(paths, deliveryFile(paths, deliveryId));
        },
        async listDeliveries(filter = {}) {
            const dirs = listFiles(paths, deliveryDir(paths));
            const deliveries = [];
            for (const dir of dirs) {
                const delivery = await readJsonFile(paths, deliveryFile(paths, dir));
                if (!delivery)
                    continue;
                if (filter.status && !filter.status.includes(delivery.status))
                    continue;
                if (filter.type && !filter.type.includes(delivery.type))
                    continue;
                deliveries.push(delivery);
            }
            deliveries.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
            const offset = filter.offset || 0;
            const limit = filter.limit || deliveries.length;
            return deliveries.slice(offset, offset + limit);
        },
        async updateDelivery(deliveryId, updates) {
            const delivery = await readJsonFile(paths, deliveryFile(paths, deliveryId));
            if (!delivery)
                throw new Error(`Delivery ${deliveryId} not found`);
            const updated = {
                ...delivery,
                ...updates,
                updatedAt: new Date().toISOString(),
                revision: delivery.revision + 1,
            };
            await writeJsonFile(paths, deliveryFile(paths, deliveryId), updated);
            return updated;
        },
        async deleteDelivery(deliveryId) {
            await deleteFile(paths, deliveryFile(paths, deliveryId));
        },
    };
}
//# sourceMappingURL=delivery-store.js.map