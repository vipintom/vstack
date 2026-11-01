/**
 * Project Memory Store
 *
 * Curated project knowledge, distinct from runtime state and history.
 * Stores: project overview, architecture, conventions, decisions, lessons, handoffs.
 */
import { readJsonFile, writeJsonFile, listFiles, fileExists, deleteFile } from "../persistence/file-store.js";
import { resolve } from "node:path";
function categoryDir(paths, category) {
    return resolve(paths.memory, category);
}
function itemPath(paths, category, id) {
    return resolve(categoryDir(paths, category), `${id}.json`);
}
function indexPath(paths) {
    return resolve(paths.memory, "index.json");
}
async function updateIndexImpl(paths) {
    const allCategories = [
        "overview", "architecture", "conventions",
        "decisions", "lessons", "handoffs", "constraints"
    ];
    const items = [];
    for (const cat of allCategories) {
        const dir = categoryDir(paths, cat);
        if (!fileExists(paths, dir))
            continue;
        const files = listFiles(paths, dir);
        for (const file of files) {
            const item = await readJsonFile(paths, resolve(dir, `${file}.json`));
            if (item)
                items.push(item);
        }
    }
    const fullIndex = {
        schemaVersion: 1,
        items,
        updatedAt: new Date().toISOString(),
        revision: 1,
    };
    await writeJsonFile(paths, indexPath(paths), fullIndex);
}
async function getCategoryIndexImpl(paths, category) {
    const dir = categoryDir(paths, category);
    if (!fileExists(paths, dir))
        return [];
    const files = listFiles(paths, dir);
    const items = [];
    for (const file of files) {
        const item = await readJsonFile(paths, resolve(dir, `${file}.json`));
        if (item)
            items.push(item);
    }
    return items.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}
async function getFullIndexImpl(paths) {
    const allCategories = [
        "overview", "architecture", "conventions",
        "decisions", "lessons", "handoffs", "constraints"
    ];
    const items = [];
    for (const cat of allCategories) {
        const catItems = await getCategoryIndexImpl(paths, cat);
        items.push(...catItems);
    }
    return {
        schemaVersion: 1,
        items,
        updatedAt: new Date().toISOString(),
        revision: 1,
    };
}
export async function createMemoryStore(paths) {
    return {
        async listCategories() {
            return [
                "overview", "architecture", "conventions",
                "decisions", "lessons", "handoffs", "constraints"
            ];
        },
        async getCategoryIndex(category) {
            return getCategoryIndexImpl(paths, category);
        },
        async createItem(category, item) {
            const dir = categoryDir(paths, category);
            const id = `mem_${crypto.randomUUID().replace(/-/g, "").slice(0, 16)}`;
            const now = new Date().toISOString();
            const memoryItem = {
                schemaVersion: 1,
                id,
                category,
                title: item.title,
                content: item.content,
                source: item.source,
                tags: item.tags || [],
                status: "current",
                createdAt: now,
                updatedAt: now,
                revision: 1,
            };
            // Ensure category directory exists
            const { mkdirSync } = await import("node:fs");
            const categoryDirPath = categoryDir(paths, category);
            mkdirSync(categoryDirPath, { recursive: true });
            await writeJsonFile(paths, itemPath(paths, category, id), memoryItem);
            await updateIndexImpl(paths);
            return memoryItem;
        },
        async getItem(category, id) {
            return readJsonFile(paths, itemPath(paths, category, id));
        },
        async updateItem(category, id, updates) {
            const existing = await readJsonFile(paths, itemPath(paths, category, id));
            if (!existing)
                throw new Error(`Memory item not found: ${category}/${id}`);
            const updated = {
                ...existing,
                ...updates,
                updatedAt: new Date().toISOString(),
                revision: existing.revision + 1,
            };
            await writeJsonFile(paths, itemPath(paths, category, id), updated);
            await updateIndexImpl(paths);
            return updated;
        },
        async deleteItem(category, id) {
            await deleteFile(paths, itemPath(paths, category, id));
            await updateIndexImpl(paths);
        },
        async supersedeItem(category, id, newItemId) {
            const existing = await readJsonFile(paths, itemPath(paths, category, id));
            if (!existing)
                throw new Error(`Memory item not found: ${category}/${id}`);
            await writeJsonFile(paths, itemPath(paths, category, id), {
                ...existing,
                status: "superseded",
                supersededBy: newItemId,
                updatedAt: new Date().toISOString(),
                revision: existing.revision + 1,
            });
            await updateIndexImpl(paths);
        },
        async searchItems(query, categories) {
            const targetCategories = categories || [
                "overview", "architecture", "conventions",
                "decisions", "lessons", "handoffs", "constraints"
            ];
            const results = [];
            const lowerQuery = query.toLowerCase();
            for (const cat of targetCategories) {
                const items = await getCategoryIndexImpl(paths, cat);
                for (const item of items) {
                    if (item.status !== "current")
                        continue;
                    if (item.title.toLowerCase().includes(lowerQuery) ||
                        item.content.toLowerCase().includes(lowerQuery) ||
                        item.tags.some((t) => t.toLowerCase().includes(lowerQuery))) {
                        results.push(item);
                    }
                }
            }
            return results.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
        },
        async getFullIndex() {
            return getFullIndexImpl(paths);
        },
        async updateIndex() {
            await updateIndexImpl(paths);
        },
    };
}
//# sourceMappingURL=memory-store.js.map