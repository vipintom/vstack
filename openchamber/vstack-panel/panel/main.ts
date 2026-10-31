/**
 * vstack Workflow - OpenChamber Panel (Read-Only Dashboard)
 * Reads .vstack/ files and displays workflow state
 */

import { connectHost } from "@openchamber/sdk";
import { applyHostReady } from "@openchamber/sdk/ui";

const SUPPORTED_SCHEMA_VERSION = 1;
const POLL_INTERVAL = 3000;
const VSTACK_DIR = ".vstack";

interface Manifest {
  schemaVersion: number;
  vstackVersion: string;
  contentVersion: string;
  projectId: string;
  createdAt: string;
  updatedAt: string;
}

interface IndexState {
  schemaVersion: number;
  revision: number;
  updatedAt: string;
  activeDeliveries: DeliverySummary[];
}

interface DeliverySummary {
  id: string;
  title: string;
  type: string;
  profile: string;
  status: string;
  currentPhase: string;
  updatedAt: string;
  revision: number;
}

interface Delivery {
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

interface PhaseRun {
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

interface GateResult {
  gateId: string;
  status: "passed" | "failed" | "pending" | "skipped";
  evaluatedAt: string;
  evidenceIds: string[];
  details: Record<string, unknown>;
}

interface Task {
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

interface Evidence {
  id: string;
  deliveryId: string;
  taskId: string | null;
  phaseRunId: string | null;
  type: string;
  source: string;
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
  agentRunId: string | null;
  metadata: Record<string, unknown>;
}

interface ReviewRun {
  id: string;
  deliveryId: string;
  phaseRunId: string | null;
  profile: string;
  reviewers: any[];
  status: string;
  targetArtifacts: string[];
  scope: string;
  acceptanceRequirements: string[];
  findings: string[];
  consolidatedReportPath: string | null;
  startedAt: string;
  completedAt: string | null;
  revision: number;
}

interface Finding {
  id: string;
  deliveryId: string;
  reviewRunId: string;
  reviewerAgentId: string;
  lens: string;
  severity: string;
  category: string;
  title: string;
  explanation: string;
  filePath: string | null;
  lineRange: { start: number; end: number } | null;
  reproducibility: string | null;
  recommendation: string;
  status: string;
  owner: string | null;
  remediationTaskId: string | null;
  resolutionEvidenceIds: string[];
  firstSeenReviewRunId: string;
  lastReviewedReviewRunId: string | null;
  createdAt: string;
  updatedAt: string;
}

interface ReleaseCandidate {
  id: string;
  deliveryId: string;
  version: string;
  title: string;
  status: string;
  artifacts: any[];
  changelog: string;
  createdAt: string;
  updatedAt: string;
}

interface Deployment {
  id: string;
  releaseId: string;
  environment: string;
  status: string;
  healthChecks: any[];
  startedAt: string;
  completedAt: string | null;
}

let host: any = connectHost();
let currentProjectDir: string | null = null;
let lastRefreshTime: Date | null = null;
let refreshInterval: number | null = null;
let currentView: 'overview' | 'deliveries' | 'delivery-detail' | 'tasks' | 'quality' | 'reviews' | 'releases' | 'evidence' = 'overview';
let selectedDeliveryId: string | null = null;
let lastIndex: any = null;

host.onReady((ctx: any) => {
  applyHostReady(ctx, document.documentElement);
  document.body.dataset.theme = ctx.theme.mode;
  document.body.dataset.surface = ctx.surface;
  currentProjectDir = ctx.directory;
  loadDashboard();
  
  if (refreshInterval) clearInterval(refreshInterval);
  refreshInterval = window.setInterval(() => {
    if (document.visibilityState === "visible") {
      loadDashboard();
    }
  }, POLL_INTERVAL);
  
  host.onDirectory((dir: string) => {
    if (dir !== currentProjectDir) {
      currentProjectDir = dir;
      loadDashboard();
    }
  });
  
  window.addEventListener("beforeunload", () => {
    if (refreshInterval) clearInterval(refreshInterval);
  });
});

async function loadDashboard() {
  if (!currentProjectDir) {
    showEmptyState("No project open");
    return;
  }
  
  try {
    const manifest = await readManifest();
    if (!manifest) {
      showEmptyState("No vstack workflow found in this project");
      return;
    }
    
    if (manifest.schemaVersion !== SUPPORTED_SCHEMA_VERSION) {
      showErrorState(new Error(`Unsupported schema version: ${manifest.schemaVersion}. Expected ${SUPPORTED_SCHEMA_VERSION}`));
      return;
    }
    
    const index = await readIndex();
    if (!index) {
      showEmptyState("No active workflow state");
      return;
    }
    
    renderDashboard(index);
    lastRefreshTime = new Date();
    updateLastRefresh();
  } catch (error) {
    console.error("Failed to load dashboard:", error);
    if (error instanceof Error && error.message.includes("NOT_GRANTED")) {
      showErrorState(new Error("Files permission denied. Please approve the 'files' capability in OpenChamber Settings."));
    } else {
      showErrorState(error);
    }
  }
}

async function readManifest(): Promise<any> {
  const result = await host.readFile(".vstack/manifest.json");
  return JSON.parse(result.content);
}

async function readIndex(): Promise<any> {
  const result = await host.readFile(".vstack/state/index.json");
  return JSON.parse(result.content);
}

async function readDelivery(deliveryId: string): Promise<any> {
  const result = await host.readFile(`.vstack/deliveries/${deliveryId}/delivery.json`);
  return JSON.parse(result.content);
}

async function readPhaseRun(deliveryId: string, phaseRunId: string): Promise<any> {
  const result = await host.readFile(`.vstack/deliveries/${deliveryId}/phases/${phaseRunId}.json`);
  return JSON.parse(result.content);
}

async function readTasks(deliveryId: string): Promise<any[]> {
  try {
    const taskIds = await host.listDir(`.vstack/deliveries/${deliveryId}/tasks`);
    const tasks = [];
    for (const entry of taskIds.entries) {
      if (entry.kind === "file" && entry.name.endsWith(".json")) {
        const result = await host.readFile(`.vstack/deliveries/${deliveryId}/tasks/${entry.name}`);
        tasks.push(JSON.parse(result.content));
      }
    }
    return tasks;
  } catch {
    return [];
  }
}

async function readEvidence(deliveryId: string): Promise<Evidence[]> {
  try {
    const entries = await host.listDir(`.vstack/deliveries/${deliveryId}/evidence`);
    const evidence: Evidence[] = [];
    for (const entry of entries.entries) {
      if (entry.kind === "file" && entry.name.endsWith(".json")) {
        const result = await host.readFile(`.vstack/deliveries/${deliveryId}/evidence/${entry.name}`);
        evidence.push(JSON.parse(result.content));
      }
    }
    return evidence.sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime());
  } catch {
    return [];
  }
}

async function readReviews(deliveryId: string): Promise<ReviewRun[]> {
  try {
    const entries = await host.listDir(`.vstack/deliveries/${deliveryId}/reviews`);
    const reviews: ReviewRun[] = [];
    for (const entry of entries.entries) {
      if (entry.kind === "file" && entry.name.endsWith(".json")) {
        const result = await host.readFile(`.vstack/deliveries/${deliveryId}/reviews/${entry.name}`);
        reviews.push(JSON.parse(result.content));
      }
    }
    return reviews.sort((a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime());
  } catch {
    return [];
  }
}

async function readFindings(deliveryId: string): Promise<Finding[]> {
  try {
    const entries = await host.listDir(`.vstack/deliveries/${deliveryId}/findings`);
    const findings: Finding[] = [];
    for (const entry of entries.entries) {
      if (entry.kind === "file" && entry.name.endsWith(".json")) {
        const result = await host.readFile(`.vstack/deliveries/${deliveryId}/findings/${entry.name}`);
        findings.push(JSON.parse(result.content));
      }
    }
    return findings.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } catch {
    return [];
  }
}

async function readReleases(deliveryId: string): Promise<ReleaseCandidate[]> {
  try {
    const entries = await host.listDir(`.vstack/deliveries/${deliveryId}/releases`);
    const releases: ReleaseCandidate[] = [];
    for (const entry of entries.entries) {
      if (entry.kind === "file" && entry.name.endsWith(".json")) {
        const result = await host.readFile(`.vstack/deliveries/${deliveryId}/releases/${entry.name}`);
        releases.push(JSON.parse(result.content));
      }
    }
    return releases.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } catch {
    return [];
  }
}

async function readDeployments(deliveryId: string): Promise<Deployment[]> {
  try {
    const entries = await host.listDir(`.vstack/deliveries/${deliveryId}/deployments`);
    const deployments: Deployment[] = [];
    for (const entry of entries.entries) {
      if (entry.kind === "file" && entry.name.endsWith(".json")) {
        const result = await host.readFile(`.vstack/deliveries/${deliveryId}/deployments/${entry.name}`);
        deployments.push(JSON.parse(result.content));
      }
    }
    return deployments.sort((a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime());
  } catch {
    return [];
  }
}

function renderDashboard(index: any) {
  renderOverview(index);
  renderDeliveriesList(index);
  // renderDeliveryDetail() only called when a delivery is selected
  renderTasks();
  renderQuality();
  renderReviews();
  renderReleases();
  renderEvidence();
  updateLastRefresh();
  
  // Set up tab switching
  document.getElementById("tabs")?.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    if (!target.classList.contains("tab")) return;
    
    document.querySelectorAll(".tab").forEach(t => {
      t.classList.remove("active");
      t.setAttribute("aria-selected", "false");
    });
    document.querySelectorAll(".tab-panel").forEach(p => p.classList.remove("active"));
    
    target.classList.add("active");
    target.setAttribute("aria-selected", "true");
    document.getElementById(`panel-${target.dataset.tab}`)?.classList.add("active");
    
    currentView = target.dataset.tab as any;
    if (currentView === 'deliveries') renderDeliveriesList(index);
    else if (currentView === 'tasks' && selectedDeliveryId) renderTasks();
  });
  
  document.getElementById("refreshBtn")?.addEventListener("click", loadDashboard);
  
  // Store index for later use
  lastIndex = index;
}

function renderOverview(index: any) {
  const activeDelivery = index.activeDeliveries?.[0];
  
  document.getElementById("goal")!.textContent = activeDelivery?.title || "-";
  document.getElementById("status")!.textContent = activeDelivery?.status || "-";
  document.getElementById("currentStep")!.textContent = activeDelivery?.currentPhase || "-";
  document.getElementById("activeTask")!.textContent = "-";
  
  const badge = document.getElementById("statusBadge")!;
  badge.className = `status-badge status-${activeDelivery?.status || "idle"}`;
  badge.textContent = activeDelivery?.status || "Idle";
  
  const nextAction = activeDelivery 
    ? getNextActionHint(activeDelivery.status)
    : "Create a delivery (vstack_delivery_create)";
  document.getElementById("nextAction")!.textContent = nextAction;
  
  const completedCount = index.activeDeliveries?.filter((d: any) => d.status === "completed").length || 0;
  const totalCount = index.activeDeliveries?.length || 0;
  const progressPct = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;
  (document.getElementById("progressFill") as HTMLElement).style.width = `${progressPct}%`;
  document.getElementById("progressText")!.textContent = `${completedCount}/${totalCount} deliveries`;
  
  // Last updated
  document.getElementById("lastUpdated")!.textContent = index.updatedAt 
    ? `Last updated: ${new Date(index.updatedAt).toLocaleString()}` 
    : "Last updated: never";
}

function getNextActionHint(status: string): string {
  switch (status) {
    case "proposed": return "Start workflow (vstack_workflow_start)";
    case "active": return "Continue work on current phase";
    case "blocked": return "Resolve blocker";
    case "completed": return "Delivery completed";
    default: return "Check vstack_status tool";
  }
}

function renderDeliveriesList(index: any) {
  const container = document.getElementById("deliveriesList")!;
  const deliveries = index.activeDeliveries || [];
  
  if (deliveries.length === 0) {
    container.innerHTML = '<div class="empty-state">No active deliveries. Create one with vstack_delivery_create.</div>';
    return;
  }
  
  container.innerHTML = index.activeDeliveries.map((d: any) => `
    <div class="delivery-item ${d.id === selectedDeliveryId ? 'selected' : ''}" data-id="${d.id}">
      <div class="delivery-header">
        <span class="delivery-title">${escapeHtml(d.title)}</span>
        <span class="delivery-status status-${d.status}">${d.status}</span>
      </div>
      <div class="delivery-meta">
        <span>${d.type} • ${d.profile}</span>
        <span>${d.currentPhase}</span>
        <span>${d.revision} rev</span>
      </div>
    </div>
  `).join("");
  
  // Add click handlers
  document.querySelectorAll('.delivery-item').forEach(item => {
    item.addEventListener('click', () => {
      const id = item.getAttribute('data-id')!;
      selectedDeliveryId = id;
      currentView = 'delivery-detail';
      loadDeliveryDetail(id);
      showView('delivery-detail');
    });
  });
}

async function loadDeliveryDetail(deliveryId: string) {
  try {
    const [deliveryResult, phasesResult, tasksResult, agentsResult] = await Promise.all([
      host.readFile(`.vstack/deliveries/${deliveryId}/delivery.json`),
      host.listDir(`.vstack/deliveries/${deliveryId}/phases`),
      host.listDir(`.vstack/deliveries/${deliveryId}/tasks`),
      host.listDir(`.vstack/deliveries/${deliveryId}/agent-runs`),
    ]);
    
    const delivery = JSON.parse(deliveryResult.content);
    const phases = await loadPhaseRuns(deliveryId, phasesResult.entries);
    const tasks = await loadTasks(deliveryId, tasksResult.entries);
    const agents = await loadAgentRuns(deliveryId, agentsResult.entries);
    
    renderDeliveryDetail(delivery, phases, tasks, agents);
    showView("delivery-detail");
  } catch (error) {
    console.error("Failed to load delivery detail:", error);
    document.getElementById("deliveryDetail")!.innerHTML = '<div class="error-state">Failed to load delivery detail</div>';
  }
}

async function loadPhaseRuns(deliveryId: string, entries: any[]) {
  const phases: any[] = [];
  for (const entry of entries) {
    if (entry.kind === "file" && entry.name.endsWith(".json")) {
      const result = await host.readFile(`.vstack/deliveries/${deliveryId}/phases/${entry.name}`);
      phases.push(JSON.parse(result.content));
    }
  }
  return phases.sort((a, b) => a.runSequence - b.runSequence);
}

async function loadTasks(deliveryId: string, entries: any[]) {
  const tasks: any[] = [];
  for (const entry of entries) {
    if (entry.kind === "file" && entry.name.endsWith(".json")) {
      const result = await host.readFile(`.vstack/deliveries/${deliveryId}/tasks/${entry.name}`);
      tasks.push(JSON.parse(result.content));
    }
  }
  return tasks;
}

async function loadAgentRuns(deliveryId: string, entries: any[]) {
  const agents: any[] = [];
  for (const entry of entries) {
    if (entry.kind === "file" && entry.name.endsWith(".json")) {
      const result = await host.readFile(`.vstack/deliveries/${deliveryId}/agent-runs/${entry.name}`);
      agents.push(JSON.parse(result.content));
    }
  }
  return agents;
}

function renderDeliveryDetail(delivery: any, phases: any[], tasks: any[], agents: any[]) {
  const container = document.getElementById("deliveryDetail")!;
  
  container.innerHTML = `
    <div class="delivery-detail-header">
      <h2>${delivery.title}</h2>
      <div class="delivery-meta">
        <span class="type-badge type-${delivery.type}">${delivery.type}</span>
        <span class="profile-badge">${delivery.profile}</span>
        <span class="risk-badge risk-${delivery.risk}">${delivery.risk}</span>
      </div>
      <p>${delivery.description}</p>
    </div>
    
    <div class="detail-tabs">
      <nav class="sub-tabs" role="tablist">
        <button class="sub-tab active" role="tab" data-tab="phases" aria-selected="true">Phases (${phases.length})</button>
        <button class="sub-tab" role="tab" data-tab="tasks" aria-selected="false">Tasks (${tasks.length})</button>
        <button class="sub-tab" role="tab" data-tab="agents" aria-selected="false">Agents (${agents.length})</button>
        <button class="sub-tab" role="tab" data-tab="quality" aria-selected="false">Quality</button>
        <button class="sub-tab" role="tab" data-tab="reviews" aria-selected="false">Reviews</button>
      </nav>
      
      <div class="sub-tab-panel active" id="subpanel-phases" role="tabpanel">
        ${renderPhasesTable(phases)}
      </div>
      <div class="sub-tab-panel" id="subpanel-tasks" role="tabpanel">
        ${renderTasksTable(tasks)}
      </div>
      <div class="sub-tab-panel" id="subpanel-agents" role="tabpanel">
        ${renderAgentsTable(agents)}
      </div>
      <div class="sub-tab-panel" id="subpanel-quality" role="tabpanel">
        <div class="empty-state">Quality checks coming soon</div>
      </div>
      <div class="sub-tab-panel" id="subpanel-reviews" role="tabpanel">
        <div class="empty-state">Reviews coming soon</div>
      </div>
    </div>
  `;
  
  // Sub-tab switching
  Array.from(container.querySelectorAll(".sub-tab")).forEach((tab) => {
    tab.addEventListener("click", () => {
      Array.from(container.querySelectorAll(".sub-tab")).forEach(t => {
        t.classList.remove("active");
        t.setAttribute("aria-selected", "false");
      });
      Array.from(container.querySelectorAll(".sub-tab-panel")).forEach(p => p.classList.remove("active"));
      
      (tab as HTMLElement).classList.add("active");
      tab.setAttribute("aria-selected", "true");
      document.getElementById(`subpanel-${(tab as HTMLElement).dataset.tab}`)!.classList.add("active");
    });
  });
}

function renderPhasesTable(phases: any[]) {
  if (phases.length === 0) return '<div class="empty-state">No phases</div>';
  
  return `
    <table class="phases-table">
      <thead>
        <tr><th>Phase</th><th>Status</th><th>Sequence</th><th>Required Gates</th><th>Passed</th><th>Started</th><th>Completed</th></tr>
      </thead>
      <tbody>
        ${phases.map(p => `
          <tr class="phase-row status-${p.status}">
            <td>${p.phase}</td>
            <td><span class="status-badge ${getStatusClass(p.status)}">${p.status}</span></td>
            <td>${p.runSequence}</td>
            <td>${p.requiredGates.join(", ") || "None"}</td>
            <td>${p.gateResults?.filter((g: any) => g.status === "passed").length || 0}/${p.requiredGates.length}</td>
            <td>${p.startedAt ? formatDate(p.startedAt) : "-"}</td>
            <td>${p.completedAt ? formatDate(p.completedAt) : "-"}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
}

function renderTasksTable(tasks: any[]) {
  if (tasks.length === 0) return '<div class="empty-state">No tasks</div>';
  
  return `
    <table class="tasks-table">
      <thead>
        <tr><th>Title</th><th>Type</th><th>Status</th><th>Priority</th><th>Agent</th><th>Dependencies</th></tr>
      </thead>
      <tbody>
        ${tasks.map(t => `
          <tr class="task-row status-${t.status}">
            <td>${t.title}</td>
            <td><span class="type-badge type-${t.type}">${t.type}</span></td>
            <td><span class="status-badge ${getStatusClass(t.status)}">${t.status}</span></td>
            <td><span class="priority-badge priority-${t.priority}">${t.priority}</span></td>
            <td>${t.assignedAgentId || "-"}</td>
            <td>${t.dependencies?.join(", ") || "None"}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
}

function renderAgentsTable(agents: any[]) {
  if (agents.length === 0) return '<div class="empty-state">No agent runs</div>';
  
  return `
    <table class="agents-table">
      <thead>
        <tr><th>Agent</th><th>Task</th><th>Status</th><th>Session</th><th>Started</th><th>Completed</th></tr>
      </thead>
      <tbody>
        ${agents.map(a => `
          <tr>
            <td>${a.agentId}</td>
            <td>${a.taskId || "-"}</td>
            <td><span class="status-badge ${getStatusClass(a.status)}">${a.status}</span></td>
            <td>${a.sessionId?.slice(0, 8) || "-"}</td>
            <td>${formatDate(a.startedAt)}</td>
            <td>${a.completedAt ? formatDate(a.completedAt) : "-"}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
}

async function renderQuality() {
  const container = document.getElementById("qualityContent")!;
  
  if (!selectedDeliveryId) {
    container.innerHTML = '<div class="empty-state">Select a delivery to view quality checks</div>';
    return;
  }
  
  try {
    const [delivery, evidence] = await Promise.all([
      readDelivery(selectedDeliveryId),
      readEvidence(selectedDeliveryId),
    ]);
    
    if (evidence.length === 0) {
      container.innerHTML = '<div class="empty-state">No quality evidence recorded yet</div>';
      return;
    }
    
    // Group evidence by check type
    const byCheck = evidence.reduce((acc, e) => {
      const key = e.checkId || e.type;
      if (!acc[key]) acc[key] = [];
      acc[key].push(e);
      return acc;
    }, {} as Record<string, Evidence[]>);
    
    container.innerHTML = `
      <div class="quality-summary">
        <div class="quality-stats">
          <div class="stat">
            <span class="stat-value">${evidence.length}</span>
            <span class="stat-label">Total Checks</span>
          </div>
          <div class="stat">
            <span class="stat-value">${evidence.filter(e => e.status === "passed").length}</span>
            <span class="stat-label">Passed</span>
          </div>
          <div class="stat">
            <span class="stat-value">${evidence.filter(e => e.status === "failed").length}</span>
            <span class="stat-label">Failed</span>
          </div>
          <div class="stat">
            <span class="stat-value">${evidence.filter(e => e.status === "error" || e.status === "timeout").length}</span>
            <span class="stat-label">Errors</span>
          </div>
        </div>
      </div>
      
      <div class="quality-checks">
        ${Object.entries(byCheck).map(([checkId, checks]) => `
          <div class="check-group">
            <h4>${escapeHtml(checkId)} <span class="badge">${checks.length}</span></h4>
            <table class="evidence-table">
              <thead>
                <tr><th>Type</th><th>Status</th><th>Exit Code</th><th>Duration</th><th>Started</th><th>Summary</th></tr>
              </thead>
              <tbody>
                ${checks.map(e => `
                  <tr class="status-${e.status}">
                    <td><span class="type-badge type-${e.type}">${e.type}</span></td>
                    <td><span class="status-badge ${getStatusClass(e.status)}">${e.status}</span></td>
                    <td>${e.exitCode !== null ? e.exitCode : "-"}</td>
                    <td>${formatDuration(e.startedAt, e.completedAt)}</td>
                    <td>${formatDate(e.startedAt)}</td>
                    <td>${escapeHtml(e.summary || "-")}</td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        `).join("")}
      </div>
    `;
  } catch (error) {
    console.error("Failed to render quality:", error);
    container.innerHTML = '<div class="error-state">Failed to load quality data</div>';
  }
}

async function renderReviews() {
  const container = document.getElementById("reviewsContent")!;
  
  if (!selectedDeliveryId) {
    container.innerHTML = '<div class="empty-state">Select a delivery to view reviews</div>';
    return;
  }
  
  try {
    const [reviews, findings] = await Promise.all([
      readReviews(selectedDeliveryId),
      readFindings(selectedDeliveryId),
    ]);
    
    if (reviews.length === 0 && findings.length === 0) {
      container.innerHTML = '<div class="empty-state">No reviews conducted yet</div>';
      return;
    }
    
    let html = "";
    html += `
      <div class="reviews-summary">
        <div class="quality-stats">
          <div class="stat">
            <span class="stat-value">${reviews.length}</span>
            <span class="stat-label">Review Runs</span>
          </div>
          <div class="stat">
            <span class="stat-value">${findings.length}</span>
            <span class="stat-label">Total Findings</span>
          </div>
          <div class="stat">
            <span class="stat-value">${findings.filter(f => f.severity === "critical" || f.severity === "high").length}</span>
            <span class="stat-label">Critical/High</span>
          </div>
          <div class="stat">
            <span class="stat-value">${findings.filter(f => f.status === "fixed" || f.status === "resolved").length}</span>
            <span class="stat-label">Resolved</span>
          </div>
        </div>
      </div>
    `;
    
    if (reviews.length > 0) {
      html += `
        <div class="review-runs">
          <h4>Review Runs</h4>
          <table class="review-table">
            <thead>
              <tr><th>Profile</th><th>Status</th><th>Reviewers</th><th>Findings</th><th>Started</th><th>Completed</th></tr>
            </thead>
            <tbody>
              ${reviews.map(r => `
                <tr>
                  <td><span class="type-badge type-${r.profile}">${r.profile}</span></td>
                  <td><span class="status-badge ${getStatusClass(r.status)}">${r.status}</span></td>
                  <td>${r.reviewers?.length || 0}</td>
                  <td>${r.findings?.length || 0}</td>
                  <td>${formatDate(r.startedAt)}</td>
                  <td>${r.completedAt ? formatDate(r.completedAt) : "-"}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      `;
    }
    
    if (findings.length > 0) {
      const bySeverity = findings.reduce((acc, f) => {
        const list = acc[f.severity] ?? (acc[f.severity] = []);
        list.push(f);
        return acc;
      }, {} as Record<string, Finding[]>);
      
      const severityOrder = ["critical", "high", "medium", "low", "informational"];
      
      html += `
        <div class="findings">
          <h4>Findings by Severity</h4>
          ${severityOrder.map(sev => {
            const sevFindings = bySeverity[sev] || [];
            if (sevFindings.length === 0) return "";
            return `
              <div class="severity-group severity-${sev}">
                <h5>${sev.toUpperCase()} (${sevFindings.length})</h5>
                <table class="findings-table">
                  <thead>
                    <tr><th>Lens</th><th>Title</th><th>File</th><th>Status</th><th>Reviewer</th></tr>
                  </thead>
                  <tbody>
                    ${sevFindings.map(f => `
                      <tr>
                        <td><span class="type-badge type-${f.lens}">${f.lens}</span></td>
                        <td>${escapeHtml(f.title)}</td>
                        <td>${f.filePath ? `${escapeHtml(f.filePath)}${f.lineRange ? `:${f.lineRange.start}-${f.lineRange.end}` : ""}` : "-"}</td>
                        <td><span class="status-badge ${getStatusClass(f.status)}">${f.status}</span></td>
                        <td>${escapeHtml(f.reviewerAgentId || "-")}</td>
                      </tr>
                    `).join("")}
                  </tbody>
                </table>
              </div>
            `;
          }).join("")}
        </div>
      `;
    }
    
    container.innerHTML = html;
  } catch (error) {
    console.error("Failed to render reviews:", error);
    container.innerHTML = '<div class="error-state">Failed to load review data</div>';
  }
}

async function renderReleases() {
  const container = document.getElementById("releasesContent")!;
  
  if (!selectedDeliveryId) {
    container.innerHTML = '<div class="empty-state">Select a delivery to view releases</div>';
    return;
  }
  
  try {
    const [releases, deployments] = await Promise.all([
      readReleases(selectedDeliveryId),
      readDeployments(selectedDeliveryId),
    ]);
    
    if (releases.length === 0 && deployments.length === 0) {
      container.innerHTML = '<div class="empty-state">No releases or deployments yet</div>';
      return;
    }
    
    let html = "";
    
    if (releases.length > 0) {
      html += `
        <div class="releases-list">
          <h4>Release Candidates</h4>
          ${releases.map(r => `
            <div class="release-card status-${r.status}">
              <div class="release-header">
                <h5>${escapeHtml(r.title)} <span class="badge version">${escapeHtml(r.version)}</span></h5>
                <span class="status-badge ${getStatusClass(r.status)}">${r.status}</span>
              </div>
              <div class="release-meta">
                <span>Artifacts: ${r.artifacts?.length || 0}</span>
                <span>Created: ${formatDate(r.createdAt)}</span>
              </div>
              ${r.changelog ? `<div class="changelog">${escapeHtml(r.changelog)}</div>` : ""}
            </div>
          `).join("")}
        </div>
      `;
    }
    
    if (deployments.length > 0) {
      html += `
        <div class="deployments-list">
          <h4>Deployments</h4>
          <table class="deployments-table">
            <thead>
              <tr><th>Environment</th><th>Status</th><th>Health Checks</th><th>Started</th><th>Completed</th></tr>
            </thead>
            <tbody>
              ${deployments.map(d => `
                <tr class="status-${d.status}">
                  <td>${escapeHtml(d.environment)}</td>
                  <td><span class="status-badge ${getStatusClass(d.status)}">${d.status}</span></td>
                  <td>${d.healthChecks?.filter((h: any) => h.status === "passed").length || 0}/${d.healthChecks?.length || 0}</td>
                  <td>${formatDate(d.startedAt)}</td>
                  <td>${d.completedAt ? formatDate(d.completedAt) : "-"}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      `;
    }
    
    container.innerHTML = html;
  } catch (error) {
    console.error("Failed to render releases:", error);
    container.innerHTML = '<div class="error-state">Failed to load release data</div>';
  }
}

async function renderEvidence() {
  const container = document.getElementById("evidenceContent")!;
  
  if (!selectedDeliveryId) {
    container.innerHTML = '<div class="empty-state">Select a delivery to view evidence</div>';
    return;
  }
  
  try {
    const evidence = await readEvidence(selectedDeliveryId);
    
    if (evidence.length === 0) {
      container.innerHTML = '<div class="empty-state">No evidence recorded yet</div>';
      return;
    }
    
    // Group by source
    const bySource = evidence.reduce((acc, e) => {
      const list = acc[e.source] ?? (acc[e.source] = []);
      list.push(e);
      return acc;
    }, {} as Record<string, Evidence[]>);
    
    container.innerHTML = `
      <div class="evidence-summary">
        <div class="quality-stats">
          <div class="stat">
            <span class="stat-value">${evidence.length}</span>
            <span class="stat-label">Total Records</span>
          </div>
          <div class="stat">
            <span class="stat-value">${evidence.filter(e => e.status === "passed").length}</span>
            <span class="stat-label">Passed</span>
          </div>
          <div class="stat">
            <span class="stat-value">${evidence.filter(e => e.status === "failed").length}</span>
            <span class="stat-label">Failed</span>
          </div>
        </div>
      </div>
      
      <div class="evidence-list">
        ${Object.entries(bySource).map(([source, records]) => `
          <div class="evidence-source-group">
            <h4>${escapeHtml(source)} <span class="badge">${records.length}</span></h4>
            <table class="evidence-table">
              <thead>
                <tr><th>Type</th><th>Check</th><th>Status</th><th>Command</th><th>Commit</th><th>Duration</th><th>Summary</th></tr>
              </thead>
              <tbody>
                ${records.map(e => `
                  <tr class="status-${e.status}">
                    <td><span class="type-badge type-${e.type}">${e.type}</span></td>
                    <td>${escapeHtml(e.checkId)}</td>
                    <td><span class="status-badge ${getStatusClass(e.status)}">${e.status}</span></td>
                    <td><code>${escapeHtml(e.command?.join(" ") || "-")}</code></td>
                    <td><code>${escapeHtml(e.commitRef?.slice(0, 8) || "-")}</code></td>
                    <td>${formatDuration(e.startedAt, e.completedAt)}</td>
                    <td>${escapeHtml(e.summary || "-")}</td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        `).join("")}
      </div>
    `;
  } catch (error) {
    console.error("Failed to render evidence:", error);
    container.innerHTML = '<div class="error-state">Failed to load evidence data</div>';
  }
}

function renderTasks() {
  const container = document.getElementById("tasksList")!;
  
  if (!selectedDeliveryId) {
    container.innerHTML = '<div class="empty-state">Select a delivery to view tasks</div>';
    return;
  }
  
  // The actual rendering happens when delivery-detail is loaded
  // This is a fallback for direct tasks tab access
  container.innerHTML = '<div class="empty-state">Use Delivery Detail > Tasks tab for task view</div>';
}

function showView(view: string) {
  currentView = view as any;
  
  // Update main tabs
  document.querySelectorAll(".tab").forEach(t => {
    t.classList.remove("active");
    t.setAttribute("aria-selected", "false");
  });
  document.querySelectorAll(".tab-panel").forEach(p => p.classList.remove("active"));
  
  const activeTab = document.querySelector(`.tab[data-tab="${view}"]`);
  if (activeTab) {
    activeTab.classList.add("active");
    activeTab.setAttribute("aria-selected", "true");
  }
  
  const activePanel = document.getElementById(`panel-${view}`);
  if (activePanel) activePanel.classList.add("active");
}

function getStatusClass(status: string): string {
  const map: Record<string, string> = {
    "proposed": "status-proposed",
    "active": "status-active",
    "blocked": "status-blocked",
    "completed": "status-completed",
    "cancelled": "status-cancelled",
    "failed": "status-failed",
    "dispatched": "status-dispatched",
    "running": "status-running",
    "pending": "status-pending",
    "ready": "status-ready",
    "in_progress": "status-in_progress",
    "review": "status-review",
    "not_started": "status-not_started",
    "verifying": "status-verifying",
    "skipped": "status-skipped",
    "needs_rework": "status-needs_rework",
    "approved": "status-approved",
    "rejected": "status-rejected",
    "expired": "status-expired",
  };
  return map[status] || "status-unknown";
}

function formatDate(dateStr: string): string {
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } catch {
    return dateStr;
  }
}

function formatDuration(startedAt: string, completedAt: string): string {
  try {
    const start = new Date(startedAt).getTime();
    const end = new Date(completedAt).getTime();
    const ms = end - start;
    if (ms < 1000) return `${ms}ms`;
    if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
    return `${(ms / 60000).toFixed(1)}m`;
  } catch {
    return "-";
  }
}

function showEmptyState(message: string) {
  const overview = document.getElementById("overviewContent")!;
  overview.innerHTML = `<div class="empty-state">${message}</div>`;
}

function showErrorState(error: any) {
  const overview = document.getElementById("overviewContent")!;
  overview.innerHTML = `<div class="error-state">Error: ${error.message}</div>`;
}

function updateLastRefresh() {
  const el = document.getElementById("lastRefresh")!;
  el.textContent = lastRefreshTime ? `Last refreshed: ${lastRefreshTime.toLocaleTimeString()}` : "Last refreshed: never";
}

function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Initialize
async function main() {
  // All initialization is done via host.onReady
}

main();