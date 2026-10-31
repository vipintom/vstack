/**
 * vstack Workflow State Types
 * Core domain types for delivery lifecycle, tasks, evidence, and events
 */
export type DeliveryPhase = "intake" | "discovery" | "design" | "planning" | "implementation" | "validation" | "review" | "release_preparation" | "deployment" | "post_release" | "completed";
export type DeliveryStatus = "proposed" | "active" | "blocked" | "completed" | "cancelled" | "failed";
export type PhaseRunStatus = "not_started" | "ready" | "active" | "waiting_for_approval" | "blocked" | "verifying" | "completed" | "skipped" | "failed" | "cancelled";
export type TaskStatus = "pending" | "ready" | "assigned" | "in_progress" | "review" | "completed" | "blocked" | "failed" | "cancelled" | "skipped" | "needs_rework";
export type AgentRunStatus = "dispatched" | "running" | "completed" | "failed" | "cancelled";
export type TaskType = "discovery" | "design" | "planning" | "implementation" | "testing" | "review" | "documentation" | "release" | "deployment" | "operations" | "other";
export type DeliveryType = "feature" | "bugfix" | "refactor" | "migration" | "infrastructure" | "documentation" | "operations" | "release" | "other";
export type ProfileId = "bug-fix" | "feature" | "refactor" | "architecture-change" | "infrastructure-change" | "documentation" | "release-only";
export type EvidenceType = "build" | "lint" | "typecheck" | "test:unit" | "test:integration" | "test:e2e" | "coverage" | "security:deps" | "security:secrets" | "security:review" | "architecture:review" | "acceptance" | "release:artifacts" | "deploy:health" | "manual_attestation" | "other";
export type EvidenceSource = "plugin_execution" | "agent_review" | "human_approval" | "external_ci" | "manual_attestation";
export type FindingSeverity = "critical" | "high" | "medium" | "low" | "informational";
export type FindingStatus = "open" | "accepted" | "fixed" | "false_positive" | "deferred";
export type ReviewLens = "correctness_regression" | "architecture_design" | "security_data" | "performance_resources" | "maintainability_style" | "test_adequacy" | "documentation_migration";
export type ApprovalStatus = "pending" | "approved" | "rejected" | "expired";
export type EventType = "delivery_created" | "delivery_updated" | "delivery_started" | "delivery_completed" | "delivery_cancelled" | "delivery_failed" | "phase_entered" | "phase_advanced" | "phase_skipped" | "phase_reopened" | "phase_blocked" | "task_created" | "task_assigned" | "task_started" | "task_completed" | "task_blocked" | "task_reopened" | "task_cancelled" | "agent_dispatched" | "agent_completed" | "agent_failed" | "agent_cancelled" | "check_started" | "check_completed" | "check_failed" | "check_timed_out" | "review_started" | "review_completed" | "finding_opened" | "finding_resolved" | "finding_deferred" | "gate_evaluated" | "gate_passed" | "gate_failed" | "approval_requested" | "approval_granted" | "approval_rejected" | "approval_expired" | "release_prepared" | "release_validated" | "release_published" | "deployment_prepared" | "deployment_executed" | "deployment_rolled_back" | "smoke_test_completed" | "post_release_recorded";
export type DeliveryId = string & {
    readonly __brand: unique symbol;
};
export type PhaseRunId = string & {
    readonly __brand: unique symbol;
};
export type TaskId = string & {
    readonly __brand: unique symbol;
};
export type AgentRunId = string & {
    readonly __brand: unique symbol;
};
export type ReviewRunId = string & {
    readonly __brand: unique symbol;
};
export type FindingId = string & {
    readonly __brand: unique symbol;
};
export type EvidenceId = string & {
    readonly __brand: unique symbol;
};
export type ApprovalId = string & {
    readonly __brand: unique symbol;
};
export type EventId = string & {
    readonly __brand: unique symbol;
};
export declare function deliveryId(id: string): DeliveryId;
export declare function phaseRunId(id: string): PhaseRunId;
export declare function taskId(id: string): TaskId;
export declare function agentRunId(id: string): AgentRunId;
export declare function reviewRunId(id: string): ReviewRunId;
export declare function findingId(id: string): FindingId;
export declare function evidenceId(id: string): EvidenceId;
export declare function approvalId(id: string): ApprovalId;
export declare function eventId(id: string): EventId;
export interface Delivery {
    schemaVersion: 1;
    id: DeliveryId;
    title: string;
    description: string;
    type: DeliveryType;
    profile: ProfileId;
    status: DeliveryStatus;
    currentPhase: DeliveryPhase;
    currentPhaseRunId: PhaseRunId | null;
    createdAt: string;
    updatedAt: string;
    revision: number;
    acceptanceCriteria: string[];
    risk: "low" | "medium" | "high" | "critical";
    labels: string[];
    references: {
        request?: string;
        discovery?: string;
        design?: string;
        plan?: string;
        releaseNotes?: string;
        postRelease?: string;
    };
    createdBy: string;
}
export interface PhaseRun {
    schemaVersion: 1;
    id: PhaseRunId;
    deliveryId: DeliveryId;
    phase: DeliveryPhase;
    runSequence: number;
    status: PhaseRunStatus;
    startedAt: string | null;
    completedAt: string | null;
    blockedAt: string | null;
    blockedReason: string | null;
    approvalRequired: boolean;
    approvalId: ApprovalId | null;
    gateResults: GateResult[];
    requiredGates: string[];
    optionalGates: string[];
    skipReason: string | null;
    skipBy: string | null;
    revision: number;
    createdAt: string;
    updatedAt: string;
}
export interface GateResult {
    gateId: string;
    status: "passed" | "failed" | "pending" | "skipped";
    evaluatedAt: string;
    evidenceIds: EvidenceId[];
    details: Record<string, unknown>;
}
export interface Task {
    schemaVersion: 1;
    id: TaskId;
    deliveryId: DeliveryId;
    phaseRunId: PhaseRunId;
    title: string;
    description: string;
    type: TaskType;
    status: TaskStatus;
    priority: "low" | "medium" | "high" | "critical";
    dependencies: TaskId[];
    assignedAgentId: string | null;
    assignedSessionId: string | null;
    workScope: string;
    acceptanceCriteria: string[];
    expectedOutputs: string[];
    requiredSkills: string[];
    worktreePath: string | null;
    attemptCount: number;
    maxAttempts: number;
    resultSummary: string | null;
    evidenceIds: EvidenceId[];
    blocker: Blocker | null;
    revision: number;
    createdAt: string;
    updatedAt: string;
    completedAt: string | null;
    startedAt: string | null;
}
export interface Blocker {
    type: "dependency" | "external" | "resource" | "approval" | "technical" | "other";
    message: string;
    details: Record<string, unknown>;
    at: string;
    blockingTaskIds: TaskId[];
}
export interface AgentRun {
    schemaVersion: 1;
    id: AgentRunId;
    deliveryId: DeliveryId;
    taskId: TaskId | null;
    agentId: string;
    sessionId: string;
    worktreePath: string | null;
    status: "dispatched" | "running" | "completed" | "failed" | "cancelled";
    dispatchPrompt: string;
    contextReferences: string[];
    startedAt: string;
    completedAt: string | null;
    resultSummary: string | null;
    error: string | null;
    revision: number;
}
export interface ReviewRun {
    schemaVersion: 1;
    id: ReviewRunId;
    deliveryId: DeliveryId;
    phaseRunId: PhaseRunId | null;
    profile: "quick" | "full" | "custom";
    reviewers: ReviewerAssignment[];
    status: "pending" | "running" | "completed" | "failed" | "cancelled";
    targetArtifacts: string[];
    scope: string;
    acceptanceRequirements: string[];
    findings: FindingId[];
    consolidatedReportPath: string | null;
    startedAt: string;
    completedAt: string | null;
    revision: number;
}
export interface ReviewerAssignment {
    agentId: string;
    lens: ReviewLens;
    sessionId: string | null;
    status: "pending" | "running" | "completed" | "failed";
    reportPath: string | null;
    startedAt: string | null;
    completedAt: string | null;
}
export interface Finding {
    schemaVersion: 1;
    id: FindingId;
    deliveryId: DeliveryId;
    reviewRunId: ReviewRunId;
    reviewerAgentId: string;
    lens: ReviewLens;
    severity: FindingSeverity;
    category: string;
    title: string;
    explanation: string;
    filePath: string | null;
    lineRange: {
        start: number;
        end: number;
    } | null;
    reproducibility: string | null;
    recommendation: string;
    status: FindingStatus;
    owner: string | null;
    remediationTaskId: TaskId | null;
    resolutionEvidenceIds: EvidenceId[];
    firstSeenReviewRunId: ReviewRunId;
    lastReviewedReviewRunId: ReviewRunId | null;
    createdAt: string;
    updatedAt: string;
}
export interface Evidence {
    schemaVersion: 1;
    id: EvidenceId;
    deliveryId: DeliveryId;
    taskId: TaskId | null;
    phaseRunId: PhaseRunId | null;
    type: EvidenceType;
    source: EvidenceSource;
    checkId: string;
    command: string[];
    workingDirectory: string;
    commitRef: string;
    startedAt: string;
    completedAt: string;
    exitCode: number | null;
    status: "passed" | "failed" | "error" | "timeout" | "cancelled";
    stdoutPath: string | null;
    stderrPath: string | null;
    summary: string;
    executionId: string;
    sessionId: string | null;
    agentRunId: AgentRunId | null;
    metadata: Record<string, unknown>;
}
export interface Approval {
    schemaVersion: 1;
    id: ApprovalId;
    deliveryId: DeliveryId;
    phaseRunId: PhaseRunId | null;
    type: "design" | "release" | "publish" | "production_deployment" | "destructive_migration" | "rollback" | "scope_change" | "other";
    title: string;
    description: string;
    requestedBy: string;
    requestedAt: string;
    status: ApprovalStatus;
    decidedBy: string | null;
    decidedAt: string | null;
    reason: string | null;
    expiresAt: string | null;
    metadata: Record<string, unknown>;
}
export interface Event {
    schemaVersion: 1;
    eventId: EventId;
    sequence: number;
    timestamp: string;
    actor: {
        type: "plugin" | "agent" | "human" | "system";
        id: string;
    };
    entity: {
        type: "delivery" | "phase" | "task" | "agent_run" | "review" | "finding" | "evidence" | "approval";
        id: string;
    };
    deliveryId: DeliveryId;
    eventType: EventType;
    payload: Record<string, unknown>;
    source: {
        sessionId: string | null;
        toolId: string | null;
    };
}
export interface ProjectConfig {
    schemaVersion: 1;
    project: {
        name: string;
        defaultProfile: ProfileId;
    };
    orchestration: {
        mode: "assisted" | "supervised" | "autonomous";
        maxConcurrentAgents: number;
        maxRetriesPerTask: number;
        maxReviewRuns: number;
        allowParallelTasks: boolean;
        requireTaskAcceptanceCriteria: boolean;
    };
    review: {
        defaultProfile: "quick" | "full";
        quick: {
            independent: boolean;
            requiredLenses: ReviewLens[];
        };
        full: {
            independent: boolean;
            riskBasedLenses: ReviewLens[];
        };
    };
    approvals: {
        designApproval: boolean;
        releaseApproval: boolean;
        publishApproval: boolean;
        productionDeploymentApproval: boolean;
        destructiveMigrationApproval: boolean;
    };
    quality: {
        requireBuild: boolean;
        requireConfiguredTests: boolean;
        requireIndependentReview: boolean;
        requireCurrentRevisionEvidence: boolean;
    };
    worktrees: {
        enabled: boolean;
        strategy: "opencode-native";
        maxConcurrentWorktrees: number;
    };
    gitTracking: {
        trackConfig: boolean;
        trackProfiles: boolean;
        trackDeliveryState: boolean;
        trackEvidence: boolean;
        trackEvents: boolean;
    };
}
export interface Manifest {
    schemaVersion: 1;
    vstackVersion: string;
    contentVersion: string;
    projectId: string;
    createdAt: string;
    updatedAt: string;
}
//# sourceMappingURL=types.d.ts.map