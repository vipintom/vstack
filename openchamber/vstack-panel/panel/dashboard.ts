/**
 * vstack Dashboard - Full Screen Page
 * Reads .vstack/ files and displays comprehensive workflow state
 */

import { connectHost } from "@openchamber/sdk";
import { applyHostReady } from "@openchamber/sdk/ui";

const SUPPORTED_SCHEMA_VERSION = 1;
const POLL_INTERVAL = 3000;

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
let currentView: 'overview' | 'quality' | 'reviews' | 'releases' | 'evidence' = 'overview';
let selectedDeliveryId: string | null = null;
let allDeliveries: DeliverySummary[] = [];

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
  
  document.getElementById("refreshBtn")?.addEventListener("click", loadDashboard);
  
  document.getElementById("deliverySelect")?.addEventListener("change", (e) => {
    selectedDeliveryId = (e.target as HTMLSelectElement).value || null;
    renderCurrentView();
  });
  
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
    renderCurrentView();
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
    
    allDeliveries = index.activeDeliveries || [];
    updateDeliverySelect();
    
    // Auto-select first delivery if none selected
    if (!selectedDeliveryId && allDeliveries.length > 0) {
      selectedDeliveryId = allDeliveries[0]!.id;
      updateDeliverySelect();
    }
    
    renderCurrentView();
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

function updateDeliverySelect() {
  const select = document.getElementById("deliverySelect") as HTMLSelectElement | null;
  if (!select) return;
  
  select.innerHTML = '<option value="">Select delivery...</option>' + 
    allDeliveries.map(d => `<option value="${d.id}" ${d.id === selectedDeliveryId ? "selected" : ""}>${escapeHtml(d.title)} (${d.status})</option>`).join("");
  select.disabled = allDeliveries.length === 0;
}

function renderCurrentView() {
  switch (currentView) {
    case 'overview':
      renderOverview();
      break;
    case 'quality':
      renderQuality();
      break;
    case 'reviews':
      renderReviews();
      break;
    case 'releases':
      renderReleases();
      break;
    case 'evidence':
      renderEvidence();
      break;
  }
}

function renderOverview() {
  const grid = document.getElementById("overviewGrid")!;
  
  if (allDeliveries.length === 0) {
    grid.innerHTML = '<div class="empty-state">No active deliveries. Create one with vstack_delivery_create.</div>';
    return;
  }
  
  const activeDelivery = selectedDeliveryId 
    ? allDeliveries.find(d => d.id === selectedDeliveryId) 
    : allDeliveries[0];
  
  if (!activeDelivery) {
    grid.innerHTML = '<div class="empty-state">No delivery selected</div>';
    return;
  }
  
  const deliveryTasks = selectedDeliveryId ? allDeliveries.length : 0;
  const completedCount = allDeliveries.filter(d => d.status === "completed").length;
  const totalCount = allDeliveries.length;
  const progressPct = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;
  
  grid.innerHTML = `
    <div class="card">
      <h3>Delivery: ${escapeHtml(activeDelivery.title)}</h3>
      <div class="stat-row"><span class="stat-label">Type</span><span class="stat-value"><span class="type-badge type-${activeDelivery.type}">${activeDelivery.type}</span></span></div>
      <div class="stat-row"><span class="stat-label">Profile</span><span class="stat-value">${escapeHtml(activeDelivery.profile)}</span></div>
      <div class="stat-row"><span class="stat-label">Status</span><span class="stat-value"><span class="status-badge-cell status-${activeDelivery.status}">${activeDelivery.status}</span></span></div>
      <div class="stat-row"><span class="stat-label">Current Phase</span><span class="stat-value">${escapeHtml(activeDelivery.currentPhase)}</span></div>
      <div class="stat-row"><span class="stat-label">Revision</span><span class="stat-value">${activeDelivery.revision}</span></div>
      <div class="stat-row"><span class="stat-label">Updated</span><span class="stat-value">${formatDate(activeDelivery.updatedAt)}</span></div>
    </div>
    
    <div class="card">
      <h3>Workflow Progress</h3>
      <div class="stat-row"><span class="stat-label">Total Deliveries</span><span class="stat-value">${totalCount}</span></div>
      <div class="stat-row"><span class="stat-label">Completed</span><span class="stat-value passed">${completedCount}</span></div>
      <div class="stat-row"><span class="stat-label">Active</span><span class="stat-value">${allDeliveries.filter(d => d.status === "active").length}</span></div>
      <div class="stat-row"><span class="stat-label">Blocked</span><span class="stat-value warning">${allDeliveries.filter(d => d.status === "blocked").length}</span></div>
      <div class="stat-row"><span class="stat-label">Progress</span><span class="stat-value">${progressPct.toFixed(0)}%</span></div>
    </div>
    
    <div class="card" style="grid-column: 1 / -1;">
      <h3>All Deliveries</h3>
      <div class="table-wrapper">
        <table>
          <thead>
            <tr><th>Title</th><th>Type</th><th>Profile</th><th>Status</th><th>Phase</th><th>Revision</th><th>Updated</th></tr>
          </thead>
          <tbody>
            ${allDeliveries.map(d => `
              <tr class="${d.id === selectedDeliveryId ? 'selected' : ''}" style="cursor: pointer;" data-id="${d.id}">
                <td>${escapeHtml(d.title)}</td>
                <td><span class="type-badge type-${d.type}">${d.type}</span></td>
                <td>${escapeHtml(d.profile)}</td>
                <td><span class="status-badge-cell status-${d.status}">${d.status}</span></td>
                <td>${escapeHtml(d.currentPhase)}</td>
                <td>${d.revision}</td>
                <td>${formatDate(d.updatedAt)}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `;
  
  // Add click handlers for delivery rows
  document.querySelectorAll('#overviewGrid tbody tr[data-id]').forEach(row => {
    row.addEventListener('click', () => {
      const id = row.getAttribute('data-id')!;
      selectedDeliveryId = id;
      updateDeliverySelect();
      renderCurrentView();
    });
  });
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
            <span class="stat-value passed">${evidence.filter(e => e.status === "passed").length}</span>
            <span class="stat-label">Passed</span>
          </div>
          <div class="stat">
            <span class="stat-value failed">${evidence.filter(e => e.status === "failed").length}</span>
            <span class="stat-label">Failed</span>
          </div>
          <div class="stat">
            <span class="stat-value warning">${evidence.filter(e => e.status === "error" || e.status === "timeout").length}</span>
            <span class="stat-label">Errors</span>
          </div>
        </div>
      </div>
      
      <div class="quality-checks">
        ${Object.entries(byCheck).map(([checkId, checks]) => `
          <div class="check-group">
            <h4>${escapeHtml(checkId)} <span class="badge">${checks.length}</span></h4>
            <div class="table-wrapper">
              <table class="evidence-table">
                <thead>
                  <tr><th>Type</th><th>Status</th><th>Exit Code</th><th>Duration</th><th>Started</th><th>Summary</th></tr>
                </thead>
                <tbody>
                  ${checks.map(e => `
                    <tr class="status-${e.status}">
                      <td><span class="type-badge type-${e.type}">${e.type}</span></td>
                      <td><span class="status-badge-cell status-${e.status}">${e.status}</span></td>
                      <td>${e.exitCode !== null ? e.exitCode : "-"}</td>
                      <td>${formatDuration(e.startedAt, e.completedAt)}</td>
                      <td>${formatDate(e.startedAt)}</td>
                      <td>${escapeHtml(e.summary || "-")}</td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            </div>
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
            <span class="stat-value failed">${findings.filter(f => f.severity === "critical" || f.severity === "high").length}</span>
            <span class="stat-label">Critical/High</span>
          </div>
          <div class="stat">
            <span class="stat-value passed">${findings.filter(f => f.status === "fixed" || f.status === "resolved").length}</span>
            <span class="stat-label">Resolved</span>
          </div>
        </div>
      </div>
    `;
    
    if (reviews.length > 0) {
      html += `
        <div class="review-runs">
          <h4>Review Runs</h4>
          <div class="table-wrapper">
            <table class="review-table">
              <thead>
                <tr><th>Profile</th><th>Status</th><th>Reviewers</th><th>Findings</th><th>Started</th><th>Completed</th></tr>
              </thead>
              <tbody>
                ${reviews.map(r => `
                  <tr>
                    <td><span class="type-badge type-${r.profile}">${r.profile}</span></td>
                    <td><span class="status-badge-cell status-${r.status}">${r.status}</span></td>
                    <td>${r.reviewers?.length || 0}</td>
                    <td>${r.findings?.length || 0}</td>
                    <td>${formatDate(r.startedAt)}</td>
                    <td>${r.completedAt ? formatDate(r.completedAt) : "-"}</td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
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
                <div class="table-wrapper">
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
                          <td><span class="status-badge-cell status-${f.status}">${f.status}</span></td>
                          <td>${escapeHtml(f.reviewerAgentId || "-")}</td>
                        </tr>
                      `).join("")}
                    </tbody>
                  </table>
                </div>
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
                <span class="status-badge-cell status-${r.status}">${r.status}</span>
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
          <div class="table-wrapper">
            <table class="deployments-table">
              <thead>
                <tr><th>Environment</th><th>Status</th><th>Health Checks</th><th>Started</th><th>Completed</th></tr>
              </thead>
              <tbody>
                ${deployments.map(d => `
                  <tr class="status-${d.status}">
                    <td>${escapeHtml(d.environment)}</td>
                    <td><span class="status-badge-cell status-${d.status}">${d.status}</span></td>
                    <td>${d.healthChecks?.filter((h: any) => h.status === "passed").length || 0}/${d.healthChecks?.length || 0}</td>
                    <td>${formatDate(d.startedAt)}</td>
                    <td>${d.completedAt ? formatDate(d.completedAt) : "-"}</td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
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
            <span class="stat-value passed">${evidence.filter(e => e.status === "passed").length}</span>
            <span class="stat-label">Passed</span>
          </div>
          <div class="stat">
            <span class="stat-value failed">${evidence.filter(e => e.status === "failed").length}</span>
            <span class="stat-label">Failed</span>
          </div>
        </div>
      </div>
      
      <div class="evidence-list">
        ${Object.entries(bySource).map(([source, records]) => `
          <div class="evidence-source-group">
            <h4>${escapeHtml(source)} <span class="badge">${records.length}</span></h4>
            <div class="table-wrapper">
              <table class="evidence-table">
                <thead>
                  <tr><th>Type</th><th>Check</th><th>Status</th><th>Command</th><th>Commit</th><th>Duration</th><th>Summary</th></tr>
                </thead>
                <tbody>
                  ${records.map(e => `
                    <tr class="status-${e.status}">
                      <td><span class="type-badge type-${e.type}">${e.type}</span></td>
                      <td>${escapeHtml(e.checkId)}</td>
                      <td><span class="status-badge-cell status-${e.status}">${e.status}</span></td>
                      <td><code>${escapeHtml(e.command?.join(" ") || "-")}</code></td>
                      <td><code>${escapeHtml(e.commitRef?.slice(0, 8) || "-")}</code></td>
                      <td>${formatDuration(e.startedAt, e.completedAt)}</td>
                      <td>${escapeHtml(e.summary || "-")}</td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            </div>
          </div>
        `).join("")}
      </div>
    `;
  } catch (error) {
    console.error("Failed to render evidence:", error);
    container.innerHTML = '<div class="error-state">Failed to load evidence data</div>';
  }
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
  const grid = document.getElementById("overviewGrid")!;
  grid.innerHTML = `<div class="empty-state">${message}</div>`;
}

function showErrorState(error: any) {
  const grid = document.getElementById("overviewGrid")!;
  grid.innerHTML = `<div class="error-state">Error: ${error.message}</div>`;
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