/**
 * Evidence ledger.
 *
 * Stores structured evidence records under the delivery folder and keeps
 * bounded stdout/stderr logs next to them.
 */
import { VstackPaths } from "../persistence/repository-root.js";
import { Evidence, EvidenceSource, EvidenceType } from "../schemas/types.js";
export interface RecordEvidenceParams {
    deliveryId: string;
    taskId?: string | null;
    phaseRunId?: string | null;
    type: EvidenceType;
    source: EvidenceSource;
    checkId: string;
    command: string[];
    workingDirectory: string;
    commitRef: string;
    startedAt?: string;
    completedAt?: string;
    exitCode?: number | null;
    status: Evidence["status"];
    stdout?: string;
    stderr?: string;
    stdoutPath?: string | null;
    stderrPath?: string | null;
    summary: string;
    executionId: string;
    sessionId?: string | null;
    agentRunId?: string | null;
    metadata?: Record<string, unknown>;
}
export interface EvidenceFilters {
    type?: EvidenceType[];
    status?: Evidence["status"][];
    checkId?: string;
}
export interface EvidenceLedger {
    record(params: RecordEvidenceParams): Promise<Evidence>;
    list(deliveryId: string, filters?: EvidenceFilters): Promise<Evidence[]>;
    get(deliveryId: string, evidenceId: string): Promise<Evidence | null>;
}
export declare function createEvidenceLedger(paths: VstackPaths): Promise<EvidenceLedger>;
//# sourceMappingURL=evidence-ledger.d.ts.map