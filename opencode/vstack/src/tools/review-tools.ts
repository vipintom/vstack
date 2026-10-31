/**
 * Review tools
 * Start and manage independent Goldfish reviews
 */

import type { VstackTool } from "./index.js";

export const reviewTools: VstackTool[] = [
  {
    name: "vstack_review_start",
    description: "Start independent review run(s) with specified profile",
    input: {
      type: "object",
      properties: {
        deliveryId: { type: "string" },
        phaseRunId: { type: "string" },
        profile: { type: "string", enum: ["quick", "full", "custom"] },
        targetArtifacts: { type: "array", items: { type: "string" } },
        scope: { type: "string" },
        acceptanceRequirements: { type: "array", items: { type: "string" } },
        lenses: { type: "array", items: { type: "string" } },
      },
      required: ["deliveryId", "profile"],
      additionalProperties: false,
    },
    execute: async (input: any, context: any) => {
      return { content: JSON.stringify({ reviewRunId: "revrun_123", status: "started" }) };
    },
  },
  
  {
    name: "vstack_review_record",
    description: "Record immutable reviewer output and findings",
    input: {
      type: "object",
      properties: {
        reviewRunId: { type: "string" },
        reviewerAgentId: { type: "string" },
        lens: { type: "string", enum: ["correctness_regression", "architecture_design", "security_data", "performance_resources", "maintainability_style", "test_adequacy", "documentation_migration"] },
        findings: {
          type: "array",
          items: {
            type: "object",
            properties: {
              severity: { type: "string", enum: ["critical", "high", "medium", "low", "informational"] },
              category: { type: "string" },
              title: { type: "string" },
              explanation: { type: "string" },
              filePath: { type: "string" },
              lineRange: { type: "object", properties: { start: { type: "number" }, end: { type: "number" } } },
              reproducibility: { type: "string" },
              recommendation: { type: "string" },
            },
            required: ["severity", "category", "title", "explanation", "recommendation"],
          },
        },
        findingsPath: { type: "string" },
      },
      required: ["reviewRunId", "reviewerAgentId", "lens", "findings"],
      additionalProperties: false,
    },
    execute: async (input: any, context: any) => {
      return { content: JSON.stringify({ findingsRecorded: input.findings.length, findingIds: [] }) };
    },
  },
  
  {
    name: "vstack_finding_update",
    description: "Track finding status/resolution evidence",
    input: {
      type: "object",
      properties: {
        findingId: { type: "string" },
        status: { type: "string", enum: ["open", "accepted", "fixed", "false_positive", "deferred"] },
        resolutionEvidenceIds: { type: "array", items: { type: "string" } },
        owner: { type: "string" },
        remediationTaskId: { type: "string" },
      },
      required: ["findingId", "status"],
      additionalProperties: false,
    },
    execute: async (input: any, context: any) => {
      return { content: JSON.stringify({ success: true, findingId: input.findingId, status: input.status }) };
    },
  },
];