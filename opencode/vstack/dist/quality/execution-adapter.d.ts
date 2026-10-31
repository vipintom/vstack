/**
 * Verified process execution adapter.
 *
 * Runs a command without a shell, captures bounded stdout/stderr, and
 * reports a structured result. Never throws for process failures.
 */
export interface ExecutionOptions {
    workingDirectory: string;
    timeoutMs?: number;
    maxOutputBytes?: number;
    environment?: Record<string, string>;
    signal?: AbortSignal;
}
export interface ExecutionResult {
    exitCode: number | null;
    stdout: string;
    stderr: string;
    timedOut: boolean;
    cancelled: boolean;
    truncated: boolean;
    durationMs: number;
    startedAt: string;
    completedAt: string;
}
export declare function executeCommand(command: string[], options: ExecutionOptions): Promise<ExecutionResult>;
//# sourceMappingURL=execution-adapter.d.ts.map