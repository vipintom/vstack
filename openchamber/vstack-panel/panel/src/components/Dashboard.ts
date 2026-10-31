/**
 * vstack Workflow - OpenChamber Dashboard Component
 * Main dashboard rendering logic
 */

import type { IndexState, Delivery, PhaseRun, Task, AgentRun, DeliverySummary } from "../types";
import { 
  readDelivery, 
  readPhaseRun, 
  readTasks, 
  readAgentRuns,
  loadPhaseRuns,
  loadTasks,
  loadAgentRuns,
  getProjectDir 
} from "../services/api";
import { 
  renderPhasesTable, 
  renderTasksTable, 
  renderAgentsTable,
  escapeHtml 
} from "../components/render";

let currentView: 'overview' | 'deliveries' | 'delivery-detail' | 'tasks' | 'quality' | 'reviews' | 'releases' | 'evidence' = 'overview';
let selectedDeliveryId: string | null = null;
let lastIndex: any = null;

export async function renderDashboard(index: any) {
  renderOverview(index);
  renderDeliveriesList(index);
  renderDeliveryDetail();
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
    if (currentView === 'deliveries') renderDeliveriesList(lastIndex);
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
  
  container.innerHTML = deliveries.map((d: any) => `
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
      renderDeliveryDetail(id);
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

async function loadPhaseRuns(deliveryId: string, entries: any[]): Promise<any[]> {
  const phases: any[] = [];
  for (const entry of entries) {
    if (entry.kind === "file" && entry.name.endsWith(".json")) {
      const result = await host.readFile(`.vstack/deliveries/${deliveryId}/phases/${entry.name}`);
      phases.push(JSON.parse(result.content));
    }
    return phases.sort((a, b) => a.runSequence - b.runSequence);
  }

async function loadTasks(deliveryId: string, entries: any[]): Promise<any[]> {
  const tasks: any[] = [];
  for (const entry of entries) {
    if (entry.kind === "file" && entry.name.endsWith(".json")) {
      const result = await host.readFile(`.vstack/deliveries/${deliveryId}/tasks/${entry.name}`);
      tasks.push(JSON.parse(result.content));
    }
    return tasks;
  }

async function loadAgentRuns(deliveryId: string, entries: any[]): Promise<any[]> {
  const agents: any[] = [];
  for (const entry of entries) {
    if (entry.kind === "file" && entry.name.endsWith(".json")) {
      const result = await host.readFile(`.vstack/deliveries/${deliveryId}/agent-runs/${entry.name}`);
      agents.push(JSON.parse(result.content));
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
  container.querySelectorAll(".sub-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      container.querySelectorAll(".sub-tab").forEach(t => {
        t.classList.remove("active");
        t.setAttribute("aria-selected", "false");
      });
      container.querySelectorAll(".sub-tab-panel").forEach(p => p.classList.remove("active"));
      
      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");
      document.getElementById(`subpanel-${tab.dataset.tab}`)!.classList.add("active");
    });
  });
}

function renderTasks() {
  const container = document.getElementById("tasksList")!;
  const deliveryId = selectedDeliveryId;
  
  if (!deliveryId) {
    container.innerHTML = '<div class="empty-state">Select a delivery to view tasks</div>';
    return;
  }
  
  try {
    const tasks = await readTasks(deliveryId);
    
    if (tasks.length === 0) {
      container.innerHTML = '<div class="empty-state">No tasks for this delivery</div>';
      return;
    }
    
    container.innerHTML = tasks.map((t: any) => `
      <div class="task-item">
        <div class="task-header">
          <span class="task-title">${escapeHtml(t.title)}</span>
          <span class="task-status status-${t.status}">${t.status}</span>
        </div>
        <div class="task-meta">
          <span>Type: ${t.type}</span>
          <span>Priority: ${t.priority}</span>
          <span>Assigned: ${t.assignedAgentId || "none"}</span>
        </div>
        <div class="task-meta">
          <span>Dependencies: ${t.dependencies.join(", ") || "none"}</span>
        </div>
      </div>
    `).join("");
  } catch (error) {
    container.innerHTML = `<div class="error-state">Error loading tasks: ${error instanceof Error ? error.message : "unknown"}</div>`;
  }
}

function renderQuality() {
  document.getElementById("qualityContent")!.innerHTML = '<div class="empty-state">Quality gate status will be shown here</div>';
}

function renderReviews() {
  document.getElementById("reviewsContent")!.innerHTML = '<div class="empty-state">Review status will be shown here</div>';
}

function renderReleases() {
  document.getElementById("releasesContent")!.innerHTML = '<div class="empty-state">Release status will be shown here</div>';
}

function renderEvidence() {
  document.getElementById("evidenceContent")!.innerHTML = '<div class="empty-state">Evidence log will be shown here</div>';
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
    "completed": "status-completed",
    "blocked": "status-blocked",
    "failed": "status-failed",
    "cancelled": "status-cancelled",
    "skipped": "status-skipped",
    "needs_rework": "status-needs_rework",
    "not_started": "status-not_started",
    "ready": "status-ready",
    "active": "status-active",
    "verifying": "status-verifying",
    "blocked": "status-blocked",
    "completed": "status-completed",
    "skipped": "status-skipped",
    "failed": "status-failed",
    "cancelled": "status-cancelled",
    "pending": "status-pending",
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

// Initialize
main();