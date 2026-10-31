/**
 * Atomic write utilities for vstack workflow state
 * Provides transaction-like operations for multi-file updates
 */
import { validateVstackPath, ensureVstackDirs } from "./repository-root.js";
import { writeJsonFile, readJsonFile, FileStoreError, validateAgainstSchema, loadSchema } from "./file-store.js";
/**
 * Execute multiple file writes atomically (all-or-nothing)
 * Uses a temporary directory and moves files into place on success
 */
export async function atomicWriteBatch(paths, operations) {
    const tempDir = validateVstackPath(paths, resolve(paths.root, `.tmp.${Date.now()}.${Math.random().toString(36).slice(2)}`));
    try {
        // Create temp directory
        await ensureVstackDirs(paths);
        const fs = await import("node:fs");
        if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir, { recursive: true });
        }
        // Write all files to temp directory first
        const tempFiles = [];
        for (const op of operations) {
            const fileName = op.filePath.split("/").pop() || "file.json";
            const tempPath = resolve(tempDir, fileName);
            // Validate schema if provided
            if (op.schemaPath) {
                const schema = await loadSchema(op.schemaPath);
                const validation = validateAgainstSchema(op.data, schema);
                if (!validation.valid) {
                    throw new FileStoreError(`Schema validation failed: ${validation.errors.join(", ")}`, "SCHEMA_VALIDATION_ERROR", op.filePath);
                }
            }
            // Check revision if provided
            if (op.expectedRevision !== undefined && op.data && typeof op.data === "object" && "revision" in op.data) {
                const currentData = await readJsonFile(paths, op.filePath);
                if (currentData && typeof currentData === "object" && "revision" in currentData) {
                    if (currentData.revision !== op.expectedRevision) {
                        throw new FileStoreError(`Revision conflict for ${op.filePath}`, "REVISION_CONFLICT", op.filePath);
                    }
                }
            }
            fs.writeFileSync(tempPath, JSON.stringify(op.data, null, 2), "utf-8");
            tempFiles.push(tempPath);
        }
        // All validations passed - now atomically move each file into place
        for (let i = 0; i < operations.length; i++) {
            const op = operations[i];
            if (!op)
                continue;
            const validatedPath = validateVstackPath(paths, op.filePath);
            const targetDir = dirname(validatedPath);
            if (!fs.existsSync(targetDir)) {
                fs.mkdirSync(targetDir, { recursive: true });
            }
            const tempFile = tempFiles[i];
            if (!tempFile)
                continue;
            fs.renameSync(tempFile, validatedPath);
        }
    }
    catch (error) {
        // Cleanup temp directory on error
        try {
            const fs = await import("node:fs");
            if (fs.existsSync(tempDir)) {
                fs.rmSync(tempDir, { recursive: true, force: true });
            }
        }
        catch { }
        throw error;
    }
    finally {
        // Ensure temp directory is cleaned up
        try {
            const fs = await import("node:fs");
            if (fs.existsSync(tempDir)) {
                fs.rmSync(tempDir, { recursive: true, force: true });
            }
        }
        catch { }
    }
}
/**
 * Read-modify-write pattern with atomic update
 */
export async function atomicUpdate(paths, filePath, updater, schemaPath) {
    const validatedPath = validateVstackPath(paths, filePath);
    // Read current
    const current = await readJsonFile(paths, validatedPath, schemaPath);
    // Apply update
    const updated = updater(current);
    // Write back atomically with revision check
    await writeJsonFile(paths, validatedPath, updated, schemaPath, {
        expectedRevision: current?.revision,
    });
    return updated;
}
/**
 * Safely increment revision and update timestamp
 */
export function createRevisionBump(data, updates = {}) {
    return {
        ...data,
        ...updates,
        revision: data.revision + 1,
        updatedAt: new Date().toISOString(),
    };
}
/**
 * Create initial revisioned object
 */
export function createInitialRevisioned(data, revision = 1) {
    const now = new Date().toISOString();
    return {
        ...data,
        revision,
        createdAt: now,
        updatedAt: now,
    };
}
// Need to import path for resolve/dirname
import { resolve, dirname } from "node:path";
//# sourceMappingURL=atomic-write.js.map