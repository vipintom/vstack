#!/usr/bin/env node
/**
 * Validate all SKILL.md files have required frontmatter
 */

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const SKILLS_DIR = join(import.meta.dirname, "..", "skills");
const ROLES_DIR = join(SKILLS_DIR, "roles");

function validateSkill(filePath) {
  const content = readFileSync(filePath, "utf-8");
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  
  if (!frontmatterMatch) {
    return { valid: false, error: "Missing frontmatter" };
  }
  
  const frontmatter = frontmatterMatch[1];
  const errors = [];
  
  if (!frontmatter.includes("name:")) {
    errors.push("Missing 'name' field");
  }
  
  if (!frontmatter.includes("description:")) {
    errors.push("Missing 'description' field");
  }
  
  // Extract name for validation
  const nameMatch = frontmatter.match(/name:\s*(.+)/);
  if (nameMatch) {
    const name = nameMatch[1].trim().replace(/^["']|["']$/g, "");
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(name)) {
      errors.push(`Invalid name format: ${name} (must be kebab-case)`);
    }
  }
  
  return { valid: errors.length === 0, errors };
}

function walkDir(dir) {
  const results = [];
  const entries = readdirSync(dir);
  
  for (const entry of entries) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);
    
    if (stat.isDirectory()) {
      results.push(...walkDir(fullPath));
    } else if (entry === "SKILL.md") {
      results.push(fullPath);
    }
  }
  
  return results;
}

console.log("Validating vstack skills...\n");

const skillFiles = [...walkDir(SKILLS_DIR), ...walkDir(ROLES_DIR)];
let allValid = true;

for (const file of skillFiles) {
  const relative = file.replace(SKILLS_DIR + "/", "").replace(ROLES_DIR + "/", "roles/");
  const result = validateSkill(file);
  
  if (result.valid) {
    console.log(`✓ ${relative}`);
  } else {
    console.log(`✗ ${relative}`);
    for (const err of result.errors) {
      console.log(`  - ${err}`);
    }
    allValid = false;
  }
}

console.log(`\n${allValid ? "All skills valid!" : "Some skills have errors."}`);
process.exit(allValid ? 0 : 1);