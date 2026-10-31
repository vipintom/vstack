/**
 * vstack Workflow - OpenChamber Panel (Read-Only Dashboard)
 * Main entry point
 */

import { connectHost } from "@openchamber/sdk";
import { applyHostReady } from "@openchamber/sdk/ui";
import type { Manifest, IndexState, Delivery, PhaseRun, Task, AgentRun } from "./types";
import { 
  readManifest, 
  readIndex, 
  readDelivery, 
  readPhaseRun, 
  loadPhaseRuns,
  loadTasks,
  loadAgentRuns,
  setProjectDir,
  getProjectDir
} from "./services/api";
import { 
  renderOverview, 
  renderDeliveriesList, 
  renderDeliveryDetail, 
  renderTasks,
  showView,
  updateLastRefresh,
  showEmptyState,
  showErrorState,
  escapeHtml
} from "./components/render";

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
  activeDeliveries: any[];
}

let host = connectHost();
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
  }, 3000);
  
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
    
    if (manifest.schemaVersion !== 1) {
      showErrorState(new Error(`Unsupported schema version: ${manifest.schemaVersion}. Expected 1`));
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

async function loadPhaseRuns(deliveryId: string, entries: any[]) {
  // Use the API service
  const { loadPhaseRuns } = await import("./services/api");
  return loadPhaseRuns(deliveryId, entries);
}

async function loadTasks(deliveryId: string, entries: any[]) {
  const { loadTasks } = await import("./services/api");
  return loadTasks(deliveryId, getProjectDir() || "", entries);
}

async function loadAgentRuns(deliveryId: string, entries: any[]) {
  const { loadAgentRuns } = await import("./services/api");
  return loadAgentRuns(deliveryId, entries);
}

function renderDashboard(index: any) {
  renderOverview(index);
  renderDeliveriesList(index);
  renderDeliveryDetail();
  renderTasks();
  renderQuality();
  renderReviews();
  renderReleases();
  renderEvidence();
  updateLastRefresh();
  
  // Store index for later use
  lastIndex = index;
}

let lastIndex: any = null;
let selectedDeliveryId: string | null = null;

function renderDeliveryDetail() {
  if (!selectedDeliveryId) return;
  
  const { loadPhaseRuns, loadTasks, loadAgentRuns } = require("./services/api");
  
  loadDeliveryDetail(selectedDeliveryId).then(delivery => {
    loadPhaseRuns(delivery.id, []).then(phases => {
      loadTasks(delivery.id, []).then(tasks => {
        loadAgentRuns(delivery.id).then(agents => {
          renderDeliveryDetail(delivery, phases, tasks, agents);
          showView("delivery-detail");
        });
      });
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
  
  const { readTasks } = require("./services/api");
  readTasks(deliveryId).then(tasks => {
    const container = document.getElementById("tasksList")!;
    
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
  });
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

function updateLastRefresh() {
  const el = document.getElementById("lastRefresh")!;
  el.textContent = lastRefreshTime ? `Last refreshed: ${lastRefreshTime.toLocaleTimeString()}` : "Last refreshed: never";
}

function showEmptyState(message: string) {
  const overview = document.getElementById("overviewContent")!;
  overview.innerHTML = `<div class="empty-state">${message}</div>`;
}

function showErrorState(error: any) {
  const overview = document.getElementById("overviewContent")!;
  overview.innerHTML = `<div class="error-state">Error: ${error.message}</div>`;
}

function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Initialize
async function main() {
  // All initialization is done via host.onReady at module level
}

// Initialize
main();