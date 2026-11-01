/**
 * File store for vstack workflow state
 * Provides atomic writes, locking, schema validation, and revision-based optimistic concurrency
 */
import { existsSync, readFileSync, writeFileSync, renameSync, readdirSync, unlinkSync, statSync, } from "node:fs";
import { validateVstackPath, ensureVstackDirs } from "./repository-root.js";
export class FileStoreError extends Error {
    code;
    path;
    constructor(message, code, path) {
        super(message);
        this.code = code;
        this.path = path;
        this.name = "FileStoreError";
    }
}
// Simple JSON schema validator (basic validation only)
// In production, use a proper JSON Schema validator like ajv
export function validateAgainstSchema(data, schema) {
    const errors = [];
    // Basic required field check
    if (schema.required && Array.isArray(schema.required)) {
        for (const field of schema.required) {
            if (data && typeof data === "object" && !(field in data)) {
                errors.push(`Missing required field: ${field}`);
            }
        }
    }
    // Basic type checks for properties
    if (schema.properties && data && typeof data === "object") {
        for (const [field, propSchema] of Object.entries(schema.properties)) {
            if (field in data) {
                const value = data[field];
                const prop = propSchema;
                if (prop.type === "string" && typeof value !== "string") {
                    errors.push(`Field ${field} must be a string`);
                }
                else if (prop.type === "integer" && typeof value !== "number") {
                    errors.push(`Field ${field} must be an integer`);
                }
                else if (prop.type === "boolean" && typeof value !== "boolean") {
                    errors.push(`Field ${field} must be a boolean`);
                }
                else if (prop.type === "array" && !Array.isArray(value)) {
                    errors.push(`Field ${field} must be an array`);
                }
                else if (prop.type === "object" && (typeof value !== "object" || value === null)) {
                    errors.push(`Field ${field} must be an object`);
                }
                if (prop.const !== undefined && value !== prop.const) {
                    errors.push(`Field ${field} must be ${JSON.stringify(prop.const)}`);
                }
                if (prop.enum && Array.isArray(prop.enum) && !prop.enum.includes(value)) {
                    errors.push(`Field ${field} must be one of: ${prop.enum.join(", ")}`);
                }
                if (prop.pattern && typeof prop.pattern === "string" && typeof value === "string") {
                    const regex = new RegExp(prop.pattern);
                    if (!regex.test(value)) {
                        errors.push(`Field ${field} does not match pattern: ${prop.pattern}`);
                    }
                }
                if (prop.minLength !== undefined && prop.minLength !== null && typeof prop.minLength === "number" && typeof value === "string" && value.length < prop.minLength) {
                    errors.push(`Field ${field} must be at least ${prop.minLength} characters`);
                }
                if (prop.minimum !== undefined && prop.minimum !== null && typeof prop.minimum === "number" && typeof value === "number" && value < prop.minimum) {
                    errors.push(`Field ${field} must be at least ${prop.minimum}`);
                }
            }
        }
    }
    return { valid: errors.length === 0, errors };
}
let schemaCache = new Map();
export async function loadSchema(schemaPath) {
    if (schemaCache.has(schemaPath)) {
        return schemaCache.get(schemaPath);
    }
    const fs = await import("node:fs");
    const content = fs.readFileSync(schemaPath, "utf-8");
    const schema = JSON.parse(content);
    schemaCache.set(schemaPath, schema);
    return schema;
}
/**
 * Read a JSON file with optional schema validation
 */
export async function readJsonFile(paths, filePath, schemaPath, options = {}) {
    const validatedPath = validateVstackPath(paths, filePath);
    if (!existsSync(validatedPath)) {
        return null;
    }
    try {
        const content = readFileSync(validatedPath, "utf-8");
        const data = JSON.parse(content);
        if (options.validateSchema && schemaPath) {
            const schema = await loadSchema(schemaPath);
            const validation = validateAgainstSchema(data, schema);
            if (!validation.valid) {
                throw new FileStoreError(`Schema validation failed for ${filePath}: ${validation.errors.join(", ")}`, "SCHEMA_VALIDATION_ERROR", validatedPath);
            }
        }
        return data;
    }
    catch (error) {
        if (error instanceof FileStoreError)
            throw error;
        if (error instanceof SyntaxError) {
            throw new FileStoreError(`Failed to parse JSON: ${error.message}`, "PARSE_ERROR", validatedPath);
        }
        throw new FileStoreError(`Failed to read file: ${error instanceof Error ? error.message : "unknown error"}`, "IO_ERROR", validatedPath);
    }
}
/**
 * Write a JSON file atomically with optional revision check
 */
export async function writeJsonFile(paths, filePath, data, schemaPath, options = {}) {
    const validatedPath = validateVstackPath(paths, filePath);
    await ensureVstackDirs(paths);
    // Validate schema if requested
    if (schemaPath) {
        const schema = await loadSchema(schemaPath);
        const validation = validateAgainstSchema(data, schema);
        if (!validation.valid) {
            throw new FileStoreError(`Schema validation failed for ${filePath}: ${validation.errors.join(", ")}`, "SCHEMA_VALIDATION_ERROR", validatedPath);
        }
    }
    // Revision check (optimistic concurrency)
    if (options.expectedRevision !== undefined && data.revision !== undefined) {
        const currentData = await readJsonFile(paths, filePath);
        if (currentData && typeof currentData === "object" && "revision" in currentData) {
            const currentRevision = currentData.revision;
            if (currentRevision !== options.expectedRevision) {
                throw new FileStoreError(`Revision conflict: expected ${options.expectedRevision}, current is ${currentRevision}`, "REVISION_CONFLICT", validatedPath);
            }
        }
    }
    // Atomic write via temp file + rename
    const tempPath = `${validatedPath}.tmp.${Date.now()}.${Math.random().toString(36).slice(2)}`;
    try {
        writeFileSync(tempPath, JSON.stringify(data, null, 2), "utf-8");
        renameSync(tempPath, validatedPath);
    }
    catch (error) {
        // Cleanup temp file on error
        try {
            unlinkSync(tempPath);
        }
        catch { }
        throw new FileStoreError(`Failed to write file: ${error instanceof Error ? error.message : "unknown error"}`, "IO_ERROR", validatedPath);
    }
}
/**
 * Delete a file
 */
export function deleteFile(paths, filePath) {
    const validatedPath = validateVstackPath(paths, filePath);
    if (existsSync(validatedPath)) {
        unlinkSync(validatedPath);
    }
}
/**
 * List files in a directory
 */
export function listFiles(paths, dirPath, extension = ".json") {
    const validatedPath = validateVstackPath(paths, dirPath);
    if (!existsSync(validatedPath)) {
        return [];
    }
    try {
        return readdirSync(validatedPath)
            .filter(name => name.endsWith(extension))
            .map(name => name.slice(0, -extension.length));
    }
    catch {
        return [];
    }
}
/**
 * List directories in a directory
 */
export function listDirs(paths, dirPath) {
    const validatedPath = validateVstackPath(paths, dirPath);
    if (!existsSync(validatedPath)) {
        return [];
    }
    try {
        return readdirSync(validatedPath, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name);
    }
    catch {
        return [];
    }
}
/**
 * Read a file as raw string
 */
export function readFile(paths, filePath) {
    const validatedPath = validateVstackPath(paths, filePath);
    if (!existsSync(validatedPath)) {
        return null;
    }
    return readFileSync(validatedPath, "utf-8");
}
/**
 * Write a file as raw string atomically
 */
export async function writeFile(paths, filePath, content) {
    const validatedPath = validateVstackPath(paths, filePath);
    await ensureVstackDirs(paths);
    const tempPath = `${validatedPath}.tmp.${Date.now()}.${Math.random().toString(36).slice(2)}`;
    try {
        writeFileSync(tempPath, content, "utf-8");
        renameSync(tempPath, validatedPath);
    }
    catch (error) {
        try {
            unlinkSync(tempPath);
        }
        catch { }
        throw new FileStoreError(`Failed to write file: ${error instanceof Error ? error.message : "unknown error"}`, "IO_ERROR", validatedPath);
    }
}
/**
 * Check if file exists
 */
export function fileExists(paths, filePath) {
    const validatedPath = validateVstackPath(paths, filePath);
    return existsSync(validatedPath);
}
/**
 * Get file stats (mtime, size)
 */
export function getFileStats(paths, filePath) {
    const validatedPath = validateVstackPath(paths, filePath);
    if (!existsSync(validatedPath)) {
        return null;
    }
    const stats = statSync(validatedPath);
    return { mtime: stats.mtime, size: stats.size };
}
//# sourceMappingURL=file-store.js.map