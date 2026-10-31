/**
 * vstack Workflow - OpenChamber Panel Types
 * Type definitions for the read-only dashboard (projection-based)
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

export interface DashboardIndex {
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

export interface DeliveryDetailReport {
  schemaVersion: 1;
  delivery: {
    id: string;
    title: string;
    description: string;
    type: string;
    status: string;
    currentPhase: string;
    profile: string;
    risk: string;
    labels: string[];
    acceptanceCriteria: string[];
    createdAt: string;
    updatedAt: string;
    createdBy: string;
  };
  tasks: Array<{
    id: string;
    title: string;
    type: string;
    status: string;
    priority: string;
    dependencies: string[];
    acceptanceCriteria: string[];
    assignedAgentId: string | null;
    workScope: string;
    createdAt: string;
    updatedAt: string;
    completedAt: string | null;
  }>;
  agentRuns: Array<{
    id: string;
    agentId: string;
    taskId: string | null;
    role: string;
    status: string;
    startedAt: string;
    completedAt: string | null;
    resultSummary: string | null;
    error: string | null;
  }>;
  evidence: Array<{
    id: string;
    checkId: string;
    type: string;
    status: string;
    exitCode: number | null;
    summary: string;
    completedAt: string;
    taskId: string | null;
  }>;
  reviewFindings: Array<{
    id: string;
    severity: string;
    category: string;
    title: string;
    status: string;
    taskId: string | null;
  }>;
  generatedAt: string;
}

export interface ActivitySummary {
  schemaVersion: 1;
  deliveryId: string;
  activities: Array<{
    timestamp: string;
    eventType: string;
    actor: string;
    entity: { type: string; id: string };
    summary: string;
    outcome?: string;
  }>;
  generatedAt: string;
}

export interface MemoryIndexReport {
  schemaVersion: 1;
  categories: Record<string, Array<{
    id: string;
    title: string;
    category: string;
    status: string;
    updatedAt: string;
    tags: string[];
  }>>;
  generatedAt: string;
}

export interface QualitySummaryReport {
  schemaVersion: 1;
  deliveryId: string;
  checksTotal: number;
  checksPassed: number;
  checksFailed: number;
  checksSkipped: number;
  checksByType: Record<string, { passed: number; failed: number }>;
  reviewFindings: { critical: number; high: number; medium: number; low: number };
  generatedAt: string;
}

export type ViewType = 'overview' | 'deliveries' | 'delivery-detail' | 'tasks' | 'quality' | 'memory' | 'history' | 'evidence';

export interface DashboardState {
  manifest: Manifest | null;
  index: DashboardIndex | null;
  selectedDeliveryId: string | null;
  currentView: ViewType;
  lastRefreshTime: Date | null;
  isStale: boolean;
  lastError: string | null;
}

export interface FreshnessInfo {
  indexRevision: number;
  indexUpdatedAt: string;
  deliveryReportGeneratedAt: string | null;
  activityReportGeneratedAt: string | null;
  isStale: boolean;
  staleThresholdMs: number;
}