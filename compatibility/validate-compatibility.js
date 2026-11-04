#!/usr/bin/env node
/**
 * Compatibility Validator
 * Validates the integrated release manifest and compatibility matrix
 */

import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { parse } from "yaml";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, "..");

function loadJson(path) {
  return JSON.parse(readFileSync(path, "utf-8"));
}

function loadYaml(path) {
  const content = readFileSync(path, "utf-8");
  return parse(content);
}

function validateSemVer(version) {
  const semverRegex = /^\d+\.\d+\.\d+(?:-[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?(?:\+[0-9A-Za-z-]+)?$/;
  return semverRegex.test(version);
}

function validateGitTag(tag) {
  const tagRegex = /^v\d+\.\d+\.\d+(?:-[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?$/;
  return tagRegex.test(tag);
}

function validateCommitSha(sha) {
  const shaRegex = /^[0-9a-f]{40}$/;
  return shaRegex.test(sha);
}

function validateRepoFormat(repo) {
  const repoRegex = /^[a-zA-Z0-9-]+\/[a-zA-Z0-9-]+$/;
  // Allow placeholder for pre-publish validation
  if (repo.includes("<github-username>")) return true;
  return repoRegex.test(repo);
}

function validateReleaseId(id) {
  const releaseRegex = /^vstack-\d{4}\.\d{2}\.\d{2}(?:-\w+)?$/;
  return releaseRegex.test(id);
}

function validateRfc3339(timestamp) {
  const date = new Date(timestamp);
  return !isNaN(date.getTime()) && date.toISOString() === timestamp;
}

function validateIntegratedRelease(manifest, schema) {
  const errors = [];

  // Basic structure validation
  if (manifest.schemaVersion !== 1) {
    errors.push("schemaVersion must be 1");
  }

  if (!validateReleaseId(manifest.release)) {
    errors.push(`release must match pattern vstack-YYYY.MM.DD[-suffix], got: ${manifest.release}`);
  }

  if (!validateRfc3339(manifest.releasedAt)) {
    errors.push(`releasedAt must be valid RFC 3339 timestamp, got: ${manifest.releasedAt}`);
  }

  // Component validation
  const requiredComponents = ["playbook", "opencode", "openchamber"];
  for (const comp of requiredComponents) {
    if (!manifest.components[comp]) {
      errors.push(`Missing required component: ${comp}`);
      continue;
    }
    const c = manifest.components[comp];
    if (!validateRepoFormat(c.repository)) {
      errors.push(`Component ${comp}: repository must be in format 'owner/repo', got: ${c.repository}`);
    }
    if (!validateSemVer(c.version)) {
      errors.push(`Component ${comp}: version must be valid semver, got: ${c.version}`);
    }
    if (!validateGitTag(c.tag)) {
      errors.push(`Component ${comp}: tag must be v-prefixed semver, got: ${c.tag}`);
    }
    if (!validateCommitSha(c.commit)) {
      errors.push(`Component ${comp}: commit must be 40-char SHA, got: ${c.commit}`);
    }
  }

  // Protocol validation
  if (!manifest.protocol?.version) {
    errors.push("protocol.version is required");
  } else if (!/^\d+$/.test(manifest.protocol.version)) {
    errors.push(`protocol.version must be integer string, got: ${manifest.protocol.version}`);
  }

  // Compatibility validation
  if (!manifest.compatibility?.status) {
    errors.push("compatibility.status is required");
  } else if (!["tested", "untested", "partial", "failed"].includes(manifest.compatibility.status)) {
    errors.push(`compatibility.status must be one of: tested, untested, partial, failed`);
  }
  if (!manifest.compatibility?.notes) {
    errors.push("compatibility.notes is required");
  }

  return errors;
}

function validateMatrix(matrix) {
  const errors = [];

  if (!matrix.schemaVersion || matrix.schemaVersion !== 1) {
    errors.push("matrix.schemaVersion must be 1");
  }

  if (!matrix.updatedAt || !validateRfc3339(matrix.updatedAt)) {
    errors.push("matrix.updatedAt must be valid RFC 3339 timestamp");
  }

  const validStatuses = ["supported-and-tested", "supported-with-limitations", "format-compatible-only", "not-supported", "not-tested"];
  const requiredHarnesses = ["opencode", "codex", "claude-code"];

  for (const harness of requiredHarnesses) {
    if (!matrix.harnesses?.[harness]) {
      errors.push(`Missing harness in matrix: ${harness}`);
      continue;
    }
    const h = matrix.harnesses[harness];
    if (h.skills?.status && !validStatuses.includes(h.skills.status)) {
      errors.push(`Harness ${harness}: skills.status must be one of: ${validStatuses.join(", ")}`);
    }
    if (h.runtime?.status && !validStatuses.includes(h.runtime.status)) {
      errors.push(`Harness ${harness}: runtime.status must be one of: ${validStatuses.join(", ")}`);
    }
  }

  if (!matrix.protocol?.producer?.opencode) {
    errors.push("protocol.producer.opencode is required");
  }
  if (!matrix.protocol?.consumer?.openchamber) {
    errors.push("protocol.consumer.openchamber is required");
  }

  return errors;
}

function main() {
  console.log("🔍 Validating vstack compatibility artifacts...\n");

  let allErrors = [];

  // Validate integrated release manifest
  const manifestPath = join(ROOT, "compatibility", "integrated-release.json");
  if (!existsSync(manifestPath)) {
    console.error("❌ integrated-release.json not found");
    process.exit(1);
  }
  const manifest = loadJson(manifestPath);
  const manifestErrors = validateIntegratedRelease(manifest);
  if (manifestErrors.length > 0) {
    console.error("❌ Integrated Release Manifest validation failed:");
    for (const e of manifestErrors) console.error(`  - ${e}`);
    allErrors.push(...manifestErrors.map(e => `manifest: ${e}`));
  } else {
    console.log("✅ Integrated Release Manifest valid");
  }

  // Validate compatibility matrix
  const matrixPath = join(ROOT, "compatibility", "matrix.yaml");
  if (!existsSync(matrixPath)) {
    console.error("❌ compatibility/matrix.yaml not found");
    process.exit(1);
  }
  const matrix = loadYaml(matrixPath);
  const matrixErrors = validateMatrix(matrix);
  if (matrixErrors.length > 0) {
    console.error("❌ Compatibility Matrix validation failed:");
    for (const e of matrixErrors) console.error(`  - ${e}`);
    allErrors.push(...matrixErrors.map(e => `matrix: ${e}`));
  } else {
    console.log("✅ Compatibility Matrix valid");
  }

  // Validate evidence exists for supported claims
  console.log("\n📋 Checking evidence for supported claims...");
  const evidenceChecks = [];

  // Check OpenCode runtime has evidence
  if (matrix.harnesses?.opencode?.runtime?.status === "supported-and-tested") {
    const evidence = matrix.harnesses.opencode.runtime.evidence || [];
    if (evidence.length === 0) {
      evidenceChecks.push("OpenCode runtime: no evidence recorded for supported-and-tested claim");
    } else {
      console.log(`  ✅ OpenCode runtime: ${evidence.length} evidence entries`);
    }
  }

  // Check OpenCode plugin producer has evidence
  if (matrix.protocol?.producer?.opencode?.status === "supported-and-tested") {
    const evidence = matrix.protocol.producer.opencode.evidence || [];
    if (evidence.length === 0) {
      evidenceChecks.push("OpenCode producer: no evidence recorded for supported-and-tested claim");
    } else {
      console.log(`  ✅ OpenCode producer: ${evidence.length} evidence entries`);
    }
  }

  // Check OpenChamber consumer has evidence
  if (matrix.protocol?.consumer?.openchamber?.status === "supported-and-tested") {
    const evidence = matrix.protocol.consumer.openchamber.evidence || [];
    if (evidence.length === 0) {
      evidenceChecks.push("OpenChamber consumer: no evidence recorded for supported-and-tested claim");
    } else {
      console.log(`  ✅ OpenChamber consumer: ${evidence.length} evidence entries`);
    }
  }

  if (evidenceChecks.length > 0) {
    console.warn("\n⚠️  Evidence warnings:");
    for (const e of evidenceChecks) console.warn(`  - ${e}`);
  }

  // Summary
  console.log("\n" + "=".repeat(50));
  if (allErrors.length === 0) {
    console.log("✅ All compatibility validations PASSED");
    console.log(`   Release: ${manifest.release}`);
    console.log(`   Protocol: v${manifest.protocol.version}`);
    console.log(`   Components: ${Object.keys(manifest.components).join(", ")}`);
    process.exit(0);
  } else {
    console.log(`❌ ${allErrors.length} validation error(s)`);
    process.exit(1);
  }
}

main();