/**
 * File store for vstack workflow state
 * Provides atomic writes, locking, schema validation, and revision-based optimistic concurrency
 */
import { VstackPaths } from "./repository-root.js";
export interface WriteOptions {
    expectedRevision?: number;
}
export interface ReadOptions {
    validateSchema?: boolean;
}
export declare class FileStoreError extends Error {
    readonly code: "NOT_FOUND" | "PARSE_ERROR" | "REVISION_CONFLICT" | "PATH_TRAVERSAL" | "LOCK_FAILED" | "IO_ERROR" | "SCHEMA_VALIDATION_ERROR";
    readonly path?: string | undefined;
    constructor(message: string, code: "NOT_FOUND" | "PARSE_ERROR" | "REVISION_CONFLICT" | "PATH_TRAVERSAL" | "LOCK_FAILED" | "IO_ERROR" | "SCHEMA_VALIDATION_ERROR", path?: string | undefined);
}
export declare function validateAgainstSchema(data: unknown, schema: Record<string, unknown>): {
    valid: boolean;
    errors: string[];
};
export declare function loadSchema(schemaPath: string): Promise<Record<string, unknown>>;
/**
 * Read a JSON file with optional schema validation
 */
export declare function readJsonFile<T>(paths: VstackPaths, filePath: string, schemaPath?: string, options?: ReadOptions): Promise<T | null>;
/**
 * Write a JSON file atomically with optional revision check
 */
export declare function writeJsonFile<T extends {
    revision?: number;
}>(paths: VstackPaths, filePath: string, data: T, schemaPath?: string, options?: WriteOptions): Promise<void>;
/**
 * Delete a file
 */
export declare function deleteFile(paths: VstackPaths, filePath: string): void;
/**
 * List files in a directory
 */
export declare function listFiles(paths: VstackPaths, dirPath: string, extension?: string): string[];
/**
 * Read a file as raw string
 */
export declare function readFile(paths: VstackPaths, filePath: string): string | null;
/**
 * Write a file as raw string atomically
 */
export declare function writeFile(paths: VstackPaths, filePath: string, content: string): Promise<void>;
/**
 * Check if file exists
 */
export declare function fileExists(paths: VstackPaths, filePath: string): boolean;
/**
 * Get file stats (mtime, size)
 */
export declare function getFileStats(paths: VstackPaths, filePath: string): {
    mtime: Date;
    size: number;
} | null;
//# sourceMappingURL=file-store.d.ts.map