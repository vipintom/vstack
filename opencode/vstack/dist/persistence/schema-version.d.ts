/**
 * Schema version management for vstack workflow state
 * Handles migrations and version validation
 */
import { VstackPaths } from "./repository-root.js";
export declare const CURRENT_SCHEMA_VERSION = 1;
export declare const SUPPORTED_SCHEMA_VERSIONS: number[];
export interface SchemaVersionInfo {
    version: number;
    migratedAt: string;
    fromVersion: number | null;
}
export declare class SchemaVersionError extends Error {
    readonly code: "UNSUPPORTED_VERSION" | "MIGRATION_FAILED" | "VERSION_MISMATCH";
    readonly path?: string | undefined;
    constructor(message: string, code: "UNSUPPORTED_VERSION" | "MIGRATION_FAILED" | "VERSION_MISMATCH", path?: string | undefined);
}
/**
 * Check if a schema version is supported
 */
export declare function isSupportedSchemaVersion(version: number): boolean;
/**
 * Validate schema version in a file
 */
export declare function validateSchemaVersion(paths: VstackPaths, filePath: string, expectedVersion?: number): Promise<void>;
/**
 * Migrate a file from old schema version to current
 * Returns true if migration was performed
 */
export declare function migrateFileIfNeeded(paths: VstackPaths, filePath: string, migrators: Map<number, (data: unknown) => unknown>): Promise<boolean>;
/**
 * Create a schema version migration record
 */
export declare function createMigrationRecord(fromVersion: number | null): SchemaVersionInfo;
//# sourceMappingURL=schema-version.d.ts.map