/**
 * Atomic write utilities for vstack workflow state
 * Provides transaction-like operations for multi-file updates
 */
import { VstackPaths } from "./repository-root.js";
export interface AtomicOperation<T> {
    execute(): Promise<T>;
    rollback(): Promise<void>;
}
/**
 * Execute multiple file writes atomically (all-or-nothing)
 * Uses a temporary directory and moves files into place on success
 */
export declare function atomicWriteBatch(paths: VstackPaths, operations: Array<{
    filePath: string;
    data: unknown;
    schemaPath?: string;
    expectedRevision?: number;
}>): Promise<void>;
/**
 * Read-modify-write pattern with atomic update
 */
export declare function atomicUpdate<T extends {
    revision?: number;
}>(paths: VstackPaths, filePath: string, updater: (current: T | null) => T, schemaPath?: string): Promise<T>;
/**
 * Safely increment revision and update timestamp
 */
export declare function createRevisionBump<T extends {
    revision: number;
    updatedAt: string;
}>(data: T, updates?: Partial<T>): T;
/**
 * Create initial revisioned object
 */
export declare function createInitialRevisioned<T extends {
    revision: number;
    createdAt: string;
    updatedAt: string;
}>(data: Omit<T, "revision" | "createdAt" | "updatedAt">, revision?: number): T;
//# sourceMappingURL=atomic-write.d.ts.map