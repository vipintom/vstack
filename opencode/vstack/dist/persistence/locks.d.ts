/**
 * Cross-process file locking for vstack workflow state
 * Uses atomic file creation (O_CREAT | O_EXCL) for lock acquisition
 */
import { VstackPaths } from "./repository-root.js";
export interface LockOptions {
    timeoutMs?: number;
    retryIntervalMs?: number;
    maxRetries?: number;
}
export interface Lock {
    release(): void;
    isValid(): boolean;
}
export declare class LockError extends Error {
    readonly code: "TIMEOUT" | "ALREADY_HELD" | "STALE_LOCK" | "IO_ERROR";
    readonly lockPath?: string | undefined;
    constructor(message: string, code: "TIMEOUT" | "ALREADY_HELD" | "STALE_LOCK" | "IO_ERROR", lockPath?: string | undefined);
}
/**
 * Acquire an exclusive lock for a specific resource
 * Returns a Lock object with release() method
 */
export declare function acquireLock(paths: VstackPaths, resourceName: string, options?: LockOptions): Promise<Lock>;
/**
 * Acquire lock with automatic release (using try/finally pattern)
 */
export declare function withLock<T>(paths: VstackPaths, resourceName: string, fn: () => Promise<T>, options?: LockOptions): Promise<T>;
/**
 * Check if a lock is currently held
 */
export declare function isLocked(paths: VstackPaths, resourceName: string): boolean;
/**
 * Get lock metadata if held
 */
export declare function getLockInfo(paths: VstackPaths, resourceName: string): {
    pid: number;
    acquiredAt: string;
    hostname: string;
} | null;
/**
 * Force release a lock (use with caution - only for recovery)
 */
export declare function forceReleaseLock(paths: VstackPaths, resourceName: string): boolean;
//# sourceMappingURL=locks.d.ts.map