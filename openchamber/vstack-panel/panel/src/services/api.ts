/**
 * vstack Workflow - OpenChamber API Service
 * Handles communication with OpenChamber host for file reading
 */

import { connectHost } from "@openchamber/sdk";
import type { 
  Manifest, 
  IndexState, 
  Delivery, 
  PhaseRun, 
  Task, 
  AgentRun 
} from "../types";

const host = connectHost();
let currentProjectDir: string | null = null;

export function setProjectDir(dir: string) {
  currentProjectDir = dir;
}

export function getProjectDir(): string | null {
  return currentProjectDir;
}

export async function readManifest(): Promise<any> {
  const result = await host.readFile(".vstack/manifest.json");
  return JSON.parse(result.content);
}

export async function readIndex(): Promise<any> {
  const result = await host.readFile(".vstack/state/index.json");
  return JSON.parse(result.content);
}

export async function readDelivery(deliveryId: string): Promise<any> {
  const result = await host.readFile(`.vstack/deliveries/${deliveryId}/delivery.json`);
  return JSON.parse(result.content);
}

export async function readPhaseRun(deliveryId: string, phaseRunId: string): Promise<any> {
  const result = await host.readFile(`.vstack/deliveries/${deliveryId}/phases/${phaseRunId}.json`);
  return JSON.parse(result.content);
}

export async function readTasks(deliveryId: string): Promise<any[]> {
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

export async function readAgentRuns(deliveryId: string): Promise<any[]> {
  try {
    const agentsResult = await host.listDir(`.vstack/deliveries/${deliveryId}/agent-runs`);
    const agents = [];
    for (const entry of agentsResult.entries) {
      if (entry.kind === "file" && entry.name.endsWith(".json")) {
        const result = await host.readFile(`.vstack/deliveries/${deliveryId}/agent-runs/${entry.name}`);
        agents.push(JSON.parse(result.content));
      }
    }
    return agents;
  } catch {
    return [];
  }
}

export async function loadPhaseRuns(deliveryId: string, entries: any[]): Promise<any[]> {
  const phases: any[] = [];
  for (const entry of entries) {
    if (entry.kind === "file" && entry.name.endsWith(".json")) {
      const result = await host.readFile(`.vstack/deliveries/${deliveryId}/phases/${entry.name}`);
      phases.push(JSON.parse(result.content));
    }
  }
  return phases.sort((a, b) => a.runSequence - b.runSequence);
}

export async function loadTasks(deliveryId: string, entries: any[]): Promise<any[]> {
  const tasks: any[] = [];
  for (const entry of entries) {
    if (entry.kind === "file" && entry.name.endsWith(".json")) {
      const result = await host.readFile(`.vstack/deliveries/${deliveryId}/tasks/${entry.name}`);
      tasks.push(JSON.parse(result.content));
    }
  }
  return tasks;
}

export async function loadAgentRuns(deliveryId: string, entries: any[]): Promise<any[]> {
  const agents: any[] = [];
  for (const entry of entries) {
    if (entry.kind === "file" && entry.name.endsWith(".json")) {
      const result = await host.readFile(`.vstack/deliveries/${deliveryId}/agent-runs/${entry.name}`);
      agents.push(JSON.parse(result.content));
    }
  }
  return agents;
}