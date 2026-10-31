/**
 * vstack Workflow - OpenChamber API Service (Refactored)
 * 
 * Reads ONLY published projections from .vstack/reports/ and .vstack/state/
 * Never reads delivery/task/evidence internals directly.
 */

import { connectHost } from "@openchamber/sdk";
import type { 
  Manifest, 
  DashboardIndex,
  DeliveryDetailReport,
  ActivitySummary,
  MemoryIndexReport,
  QualitySummaryReport,
} from "../types";

const host = connectHost();
let currentProjectDir: string | null = null;

export function setProjectDir(dir: string) {
  currentProjectDir = dir;
}

export function getProjectDir(): string | null {
  return currentProjectDir;
}

export async function readManifest(): Promise<Manifest | null> {
  try {
    const result = await host.readFile(".vstack/manifest.json");
    return JSON.parse(result.content);
  } catch {
    return null;
  }
}

export async function readDashboardIndex(): Promise<DashboardIndex | null> {
  try {
    const result = await host.readFile(".vstack/state/index.json");
    return JSON.parse(result.content);
  } catch {
    return null;
  }
}

export async function readDeliveryReport(deliveryId: string): Promise<DeliveryDetailReport | null> {
  try {
    const result = await host.readFile(`.vstack/reports/deliveries/${deliveryId}.json`);
    return JSON.parse(result.content);
  } catch {
    return null;
  }
}

export async function readActivityReport(deliveryId: string): Promise<ActivitySummary | null> {
  try {
    const result = await host.readFile(`.vstack/reports/activity/${deliveryId}.json`);
    return JSON.parse(result.content);
  } catch {
    return null;
  }
}

export async function readMemoryIndex(): Promise<MemoryIndexReport | null> {
  try {
    const result = await host.readFile(".vstack/reports/memory-index.json");
    return JSON.parse(result.content);
  } catch {
    return null;
  }
}

export async function readQualitySummary(deliveryId: string): Promise<QualitySummaryReport | null> {
  try {
    const result = await host.readFile(`.vstack/reports/quality/${deliveryId}.json`);
    return JSON.parse(result.content);
  } catch {
    return null;
  }
}

export async function readManifest(): Promise<Manifest | null> {
  try {
    const result = await host.readFile(".vstack/manifest.json");
    return JSON.parse(result.content);
  } catch {
    return null;
  }
}

export async function listReports(): Promise<string[]> {
  try {
    const result = await host.listDir(".vstack/reports/deliveries");
    return result.entries
      .filter(e => e.kind === "file" && e.name.endsWith(".json"))
      .map(e => e.name.replace(".json", ""));
  } catch {
    return [];
  }
}