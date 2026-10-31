/**
 * Build execution and validation
 * Handles project building across different languages/frameworks
 */
import { VstackPaths } from "../persistence/repository-root.js";
export interface BuildConfig {
    commands: BuildCommand[];
    timeout: number;
    requiredArtifacts: string[];
    cacheDir?: string;
}
export interface BuildCommand {
    name: string;
    command: string[];
    workingDirectory: string;
    description: string;
    required: boolean;
}
export interface BuildResult {
    success: boolean;
    commandResults: CommandResult[];
    artifacts: BuildArtifact[];
    duration: number;
    startedAt: string;
    completedAt: string;
}
export interface CommandResult {
    name: string;
    exitCode: number | null;
    stdout: string;
    stderr: string;
    duration: number;
}
export interface BuildArtifact {
    path: string;
    type: "binary" | "library" | "package" | "docker" | "other";
    size: number;
    checksum?: string;
}
/**
 * Create build manager
 */
export declare function createBuildManager(paths: VstackPaths): Promise<{
    /**
     * Discover build configuration from project
     */
    discoverBuildConfig(projectRoot: string): Promise<BuildConfig>;
    /**
     * Execute build
     */
    executeBuild(config: BuildConfig, deliveryId: string, taskId: string | null, phaseRunId: string | null, commitRef: string): Promise<BuildResult>;
    /**
     * Validate build artifacts
     */
    validateArtifacts(artifacts: BuildArtifact[]): Promise<{
        valid: boolean;
        errors: string[];
    }>;
}>;
//# sourceMappingURL=build.d.ts.map