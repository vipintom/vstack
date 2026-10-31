/**
 * Check Execution Service
 *
 * Discovers, executes, and records check evidence.
 * Single generic runner for all check types.
 */
import { VstackPaths } from "../persistence/repository-root.js";
import { Evidence, EvidenceId } from "../schemas/types.js";
export interface CheckService {
    discoverChecks(workingDir: string): Promise<CheckDescriptor[]>;
    executeCheck(params: ExecuteCheckParams): Promise<CheckResult>;
    getEvidence(evidenceId: EvidenceId): Promise<Evidence | null>;
    listEvidence(deliveryId: string, taskId?: string): Promise<Evidence[]>;
}
export interface CheckDescriptor {
    id: string;
    name: string;
    command: string[];
    workingDirectory: string;
    category: "test" | "build" | "lint" | "typecheck" | "security" | "other";
}
export interface ExecuteCheckParams {
    deliveryId: string;
    taskId?: string | null;
    agentRunId?: string | null;
    checkId: string;
    command: string[];
    workingDirectory: string;
    commitRef: string;
    timeoutMs?: number;
    maxOutputBytes?: number;
    sessionId?: string | null;
}
export interface CheckResult {
    evidence: Evidence;
    stdout: string;
    stderr: string;
    exitCode: number | null;
    timedOut: boolean;
}
export declare function createCheckService(paths: VstackPaths): Promise<CheckService>;
//# sourceMappingURL=check-service.d.ts.map