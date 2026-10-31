/**
 * vstack Workflow - OpenChamber Panel Types
 * Type definitions for the read-only dashboard
 */

export const SUPPORTED_SCHEMA_VERSION = 1;
export const POLL_INTERVAL = 3000;
export const VSTACK_DIR = ".vstack";

export interface Manifest {
  schemaVersion: number;
  vstackVersion: string;
  contentVersion: string;
  projectId: string;
  createdAt: string;
  updatedAt: string;
}

export interface IndexState {
  schemaVersion: number;
  revision: number;
  updatedAt: string;
  activeDeliveries: DeliverySummary[];
}

export interface DeliverySummary {
  id: string;
  title: string;
  type: string;
  profile: string;
  status: string;
  currentPhase: string;
  updatedAt: string;
  revision: number;
}

export interface Delivery {
  id: string;
  title: string;
  description: string;
  type: string;
  profile: string;
  status: string;
  currentPhase: string;
  currentPhaseRunId: string | null;
  createdAt: string;
  updatedAt: string;
  revision: number;
  acceptanceCriteria: string[];
  risk: string;
  labels: string[];
  references: Record<string, string | undefined>;
  createdBy: string;
}

export interface PhaseRun {
  id: string;
  deliveryId: string;
  phase: string;
  runSequence: number;
  status: string;
  startedAt: string | null;
  completedAt: string | null;
  blockedAt: string | null;
  blockedReason: string | null;
  approvalRequired: boolean;
  approvalId: string | null;
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
  evidenceIds: string[];
  details: Record<string, unknown>;
}

export interface Task {
  id: string;
  deliveryId: string;
  phaseRunId: string;
  title: string;
  description: string;
  type: string;
  status: string;
  priority: string;
  dependencies: string[];
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
  evidenceIds: string[];
  blocker: any | null;
  revision: number;
  createdAt: string;
  updatedAt: string;
  completedAt: string | null;
  startedAt: string | null;
}

export interface AgentRun {
  id: string;
  deliveryId: string;
  taskId: string | null;
  agentId: string;
  sessionId: string;
  status: string;
  startedAt: string;
  completedAt: string | null;
}

export type ViewType = 'overview' | 'deliveries' | 'delivery-detail' | 'tasks' | 'quality' | 'reviews' | 'releases' | 'evidence';

export interface DashboardState {
  manifest: Manifest | null;
  index: IndexState | null;
  selectedDeliveryId: string | null;
  currentView: ViewType;
  lastRefreshTime: Date | null;
}