/**
 * Quality gates system
 * Defines and evaluates quality gates for phase transitions
 */
import { EvidenceType, EvidenceSource } from "../schemas/types.js";
export interface GateDefinition {
    id: string;
    name: string;
    description: string;
    type: EvidenceType;
    required: boolean;
    phase: string[];
    command: string[];
    workingDirectory: string;
    timeout: number;
    retryPolicy: RetryPolicy;
    passCriteria: PassCriteria;
    environment?: Record<string, string>;
}
export interface RetryPolicy {
    maxRetries: number;
    retryDelay: number;
    retryOn: ("timeout" | "error" | "failed")[];
}
export interface PassCriteria {
    type: "exit_code" | "output_contains" | "output_matches" | "custom";
    expectedExitCode?: number;
    expectedOutput?: string;
    outputPattern?: string;
    customEvaluator?: string;
}
export interface GateEvaluationResult {
    gateId: string;
    status: "passed" | "failed" | "skipped" | "error";
    evidence: GateEvidence;
    evaluatedAt: string;
    duration: number;
    retries: number;
}
export interface GateEvidence {
    command: string[];
    exitCode: number | null;
    stdout: string;
    stderr: string;
    stdoutPath: string | null;
    stderrPath: string | null;
    startedAt: string;
    completedAt: string;
    source: EvidenceSource;
    checkId: string;
    commitRef: string;
    workingDirectory: string;
}
/**
 * Default quality gates
 */
export declare const DEFAULT_GATES: GateDefinition[];
/**
 * Get gates for a phase
 */
export declare function getGatesForPhase(phase: string): GateDefinition[];
/**
 * Get required gates for a phase
 */
export declare function getRequiredGatesForPhase(phase: string): GateDefinition[];
/**
 * Get optional gates for a phase
 */
export declare function getOptionalGatesForPhase(phase: string): GateDefinition[];
/**
 * Gate registry for custom gates
 */
export declare class GateRegistry {
    private gates;
    register(gate: GateDefinition): void;
    get(id: string): GateDefinition | undefined;
    getAll(): GateDefinition[];
    remove(id: string): boolean;
    clear(): void;
}
/**
 * Gate evaluator
 */
export interface GateEvaluator {
    evaluate(gate: GateDefinition, context: EvaluationContext): Promise<GateEvaluationResult>;
}
export interface EvaluationContext {
    deliveryId: string;
    phaseRunId: string;
    workingDirectory: string;
    commitRef: string;
    environment: Record<string, string>;
}
/**
 * Default gate evaluator (executes command and checks criteria)
 */
export declare function defaultGateEvaluator(gate: GateDefinition, context: EvaluationContext): Promise<GateEvaluationResult>;
//# sourceMappingURL=gates.d.ts.map