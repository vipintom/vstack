#!/usr/bin/env node
/**
 * vstack Playbook Content Validation
 * Validates skill frontmatter, unique names, references, and workflow integrity
 */

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, resolve, extname } from "node:path";

const PLAYBOOK_ROOT = resolve(process.cwd());

function findFiles(dir, extension = ".md") {
  const results = [];
  function walk(current) {
    for (const entry of readdirSync(current)) {
      const full = join(current, entry);
      if (statSync(full).isDirectory()) {
        walk(full);
      } else if (extname(full) === extension) {
        results.push(full);
      }
    }
  }
  walk(dir);
  return results;
}

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;
  const fm = {};
  for (const line of match[1].split("\n")) {
    const [key, ...rest] = line.split(":");
    if (key && rest.length) {
      fm[key.trim()] = rest.join(":").trim();
    }
  }
  return fm;
}

function validateSkills() {
  const skillsDir = join(PLAYBOOK_ROOT, "skills");
  const skillDirs = readdirSync(skillsDir).filter(d => statSync(join(skillsDir, d)).isDirectory());
  const errors = [];
  const warnings = [];
  const skillNames = new Set();
  const skillPaths = new Map();

  for (const dir of skillDirs) {
    const skillPath = join(skillsDir, dir, "SKILL.md");
    if (!statSync(skillPath).isFile()) {
      errors.push(`Skill ${dir}: missing SKILL.md`);
      continue;
    }

    const content = readFileSync(skillPath, "utf-8");
    const fm = parseFrontmatter(content);

    if (!fm) {
      errors.push(`Skill ${dir}: missing frontmatter`);
      continue;
    }

    if (!fm.name) {
      errors.push(`Skill ${dir}: missing 'name' in frontmatter`);
    } else {
      if (skillNames.has(fm.name)) {
        errors.push(`Duplicate skill name: ${fm.name} (in ${dir} and ${skillPaths.get(fm.name)})`);
      }
      skillNames.add(fm.name);
      skillPaths.set(fm.name, dir);
    }

    if (!fm.description) {
      warnings.push(`Skill ${dir}: missing 'description' in frontmatter`);
    }

    // Check for required sections
    const requiredSections = ["## When to Use", "## Procedure", "## Expected Outputs", "## Verification", "## Stop Conditions"];
    for (const section of requiredSections) {
      if (!content.includes(section)) {
        warnings.push(`Skill ${dir}: missing section '${section}'`);
      }
    }
  }

  return { errors, warnings, skillCount: skillNames.size };
}

function validateWorkflows() {
  const workflowsDir = join(PLAYBOOK_ROOT, "workflows");
  if (!statSync(workflowsDir).isDirectory()) return { errors: [], warnings: [] };

  const files = findFiles(workflowsDir);
  const errors = [];
  const warnings = [];

  for (const file of files) {
    const content = readFileSync(file, "utf-8");

    // Check for required sections
    const requiredSections = ["## Trigger", "## Roles", "## Skill Sequence", "## Risk Adaptation"];
    for (const section of requiredSections) {
      if (!content.includes(section)) {
        warnings.push(`Workflow ${file}: missing section '${section}'`);
      }
    }
  }

  return { errors, warnings };
}

function validateRoles() {
  const rolesDir = join(PLAYBOOK_ROOT, "agents", "roles");
  if (!statSync(rolesDir).isDirectory()) return { errors: [], warnings: [] };

  const files = findFiles(rolesDir);
  const errors = [];
  const warnings = [];
  const requiredRoles = ["lead.md", "builder.md", "reviewer.md"];
  const foundRoles = new Set();

  for (const file of files) {
    const name = file.split("/").pop();
    foundRoles.add(name);
    const content = readFileSync(file, "utf-8");

    const requiredSections = ["## Mission", "## Responsibilities", "## Expected Inputs", "## Expected Outputs", "## Skill Selection Behavior", "## Collaboration", "## Evidence", "## Escalation"];
    for (const section of requiredSections) {
      if (!content.includes(section)) {
        warnings.push(`Role ${name}: missing section '${section}'`);
      }
    }
  }

  for (const req of requiredRoles) {
    if (!foundRoles.has(req)) {
      errors.push(`Missing required role: ${req}`);
    }
  }

  return { errors, warnings };
}

function validateReferences() {
  // Check that workflows reference existing skills
  const skillsDir = join(PLAYBOOK_ROOT, "skills");
  const skillDirs = readdirSync(skillsDir).filter(d => statSync(join(skillsDir, d)).isDirectory());
  const skillNames = new Set();

  for (const dir of skillDirs) {
    const skillPath = join(skillsDir, dir, "SKILL.md");
    if (statSync(skillPath).isFile()) {
      const content = readFileSync(skillPath, "utf-8");
      const fm = parseFrontmatter(content);
      if (fm && fm.name) skillNames.add(fm.name);
    }
  }

  const workflowsDir = join(PLAYBOOK_ROOT, "workflows");
  if (!statSync(workflowsDir).isDirectory()) return { errors: [], warnings: [] };

  const files = findFiles(workflowsDir);
  const errors = [];
  const warnings = [];

  for (const file of files) {
    const content = readFileSync(file, "utf-8");

    // Find skill references (backticks with vstack- prefix)
    const refs = content.match(/`vstack-[\w-]+`/g) || [];
    for (const ref of refs) {
      const skillName = ref.replace(/`/g, "");
      if (!skillNames.has(skillName)) {
        warnings.push(`Workflow ${file}: references unknown skill '${skillName}'`);
      }
    }
  }

  return { errors, warnings };
}

function main() {
  console.log("Validating vstack Playbook content...\n");

  let totalErrors = 0;
  let totalWarnings = 0;

  const validations = [
    { name: "Skills", fn: validateSkills },
    { name: "Workflows", fn: validateWorkflows },
    { name: "Roles", fn: validateRoles },
    { name: "References", fn: validateReferences },
  ];

  for (const v of validations) {
    const result = v.fn();
    console.log(`${v.name}: ${result.errors.length} errors, ${result.warnings.length} warnings`);
    for (const e of result.errors) console.log(`  ERROR: ${e}`);
    for (const w of result.warnings) console.log(`  WARN:  ${w}`);
    totalErrors += result.errors.length;
    totalWarnings += result.warnings.length;
  }

  console.log(`\nTotal: ${totalErrors} errors, ${totalWarnings} warnings`);

  if (totalErrors > 0) {
    console.log("\n❌ Validation FAILED");
    process.exit(1);
  } else {
    console.log("\n✅ Validation PASSED");
    process.exit(0);
  }
}

main();