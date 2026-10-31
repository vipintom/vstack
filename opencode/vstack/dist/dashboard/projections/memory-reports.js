/**
 * Memory Index Report Generator
 * Generates memory index report for OpenChamber
 */
import { resolve } from "node:path";
import { readJsonFile, writeJsonFile } from "../../persistence/file-store.js";
export async function publishMemoryIndex(paths) {
    const memoryIndexPath_ = resolve(paths.memory, "index.json");
    let memoryIndex = { items: [] };
    if (require("node:fs").existsSync(memoryIndexPath_)) {
        try {
            const result = await readJsonFile(paths, memoryIndexPath_);
            if (result)
                memoryIndex = result;
        }
        catch { }
    }
    const report = {
        schemaVersion: 1,
        revision: 1,
        categories: {},
        generatedAt: new Date().toISOString(),
    };
    for (const item of memoryIndex.items || []) {
        const category = item.category;
        if (!report.categories[category])
            report.categories[category] = [];
        report.categories[category].push({
            id: item.id,
            title: item.title,
            category: item.category,
            status: item.status,
            updatedAt: item.updatedAt || item.updatedAt,
            tags: item.tags || [],
        });
    }
    await writeJsonFile(paths, resolve(paths.reports, "memory-index.json"), report);
}
//# sourceMappingURL=memory-reports.js.map