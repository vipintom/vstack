/**
 * Autonomy policy management
 * Controls agent autonomy levels and behavioral constraints
 */
export type AutonomyMode = "assisted" | "supervised" | "autonomous";
export interface AutonomyConfig {
    defaultMode: AutonomyMode;
    modes: Record<AutonomyMode, AutonomyModeConfig>;
    transitions: AutonomyTransition[];
}
export interface AutonomyModeConfig {
    name: string;
    description: string;
    allowedActions: string[];
    requiresApproval: string[];
    maxConcurrentTasks: number;
    stepLimit: number;
    toolsAllowed: string[];
    skillsAllowed: string[];
    requiresHumanConfirmation: string[];
    forbiddenActions: string[];
}
export interface AutonomyTransition {
    from: AutonomyMode;
    to: AutonomyMode;
    requiresApproval: boolean;
    approvers: string[];
    conditions: string[];
}
export interface AutonomyPolicy {
    agentId: string;
    currentMode: AutonomyMode;
    overrides: Partial<AutonomyModeConfig>;
    lastTransition: string | null;
    transitionHistory: AutonomyTransitionRecord[];
}
export interface AutonomyTransitionRecord {
    from: AutonomyMode;
    to: AutonomyMode;
    timestamp: string;
    requestedBy: string;
    approvedBy: string | null;
    reason: string;
}
/**
 * Default autonomy configurations
 */
export declare const DEFAULT_AUTONOMY_CONFIG: AutonomyConfig;
/**
 * Create autonomy manager
 */
export declare function createAutonomyManager(paths: string): Promise<{
    getCurrentMode(agentId: string): "supervised";
    getModeConfig(mode: "assisted" | "supervised" | "autonomous"): AutonomyModeConfig;
    canPerformAction(agentId: string, action: string): boolean;
    getRequiredApprovals(agentId: string, action: string): string[];
    requestModeTransition(from: "assisted" | "supervised" | "autonomous", to: "assisted" | "supervised" | "autonomous", requestedBy: string, reason: string): Promise<boolean>;
    getTransitionHistory(agentId: string): any[];
}>;
//# sourceMappingURL=autonomy.d.ts.map