#!/usr/bin/env node
/**
 * Migration script: Parse vstack-opencode tools, stores, gates, agents
 * Outputs content collection frontmatter files for Astro
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OPENCODE_ROOT = path.resolve(__dirname, '../../vstack-opencode');
const OUTPUT_ROOT = path.resolve(__dirname, '../src/content');

function readFileSafe(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf-8');
  } catch {
    return null;
  }
}

function parseToolMarkdown(content, slug) {
  return {
    name: slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    category: 'tools',
    description: '',
    signature: '',
    parameters: {},
    returns: '',
    examples: [],
    related: [],
    references: [],
  };
}

function parseStoreMarkdown(content, slug) {
  return {
    name: slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    category: 'stores',
    description: '',
    schema: {},
    projections: [],
    related: [],
    references: [],
  };
}

function parseGateMarkdown(content, slug) {
  return {
    name: slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    category: 'gates',
    description: '',
    condition: '',
    action: '',
    related: [],
    references: [],
  };
}

function parseAgentMarkdown(content, slug) {
  return {
    name: slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    category: 'agents',
    description: '',
    model: '',
    tools: [],
    related: [],
    references: [],
  };
}

function writeCollectionFile(collection, slug, data) {
  const dir = path.join(OUTPUT_ROOT, collection);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  const filePath = path.join(dir, `${slug}.md`);
  const frontmatter = Object.entries(data)
    .map(([k, v]) => `${k}: ${JSON.stringify(v)}`)
    .join('\n');
  const content = `---\n${frontmatter}\n---\n`;
  fs.writeFileSync(filePath, content);
  console.log(`  ✓ ${collection}/${slug}.md`);
}

function migrateTools() {
  console.log('\n📦 Migrating OpenCode tools...');
  const toolsDir = path.join(OPENCODE_ROOT, 'src/tools');
  if (!fs.existsSync(toolsDir)) {
    console.log('  No tools directory found');
    return;
  }
  const toolFiles = fs.readdirSync(toolsDir)
    .filter(f => f.endsWith('.ts') && f !== 'index.ts');
  let count = 0;

  for (const toolFile of toolFiles) {
    const slug = toolFile.replace('.ts', '').replace('-tools', '');
    const data = parseToolMarkdown('', slug);
    writeCollectionFile('tools', slug, data);
    count++;
  }
  console.log(`  Total: ${count} tools`);
}

function migrateStores() {
  console.log('\n📦 Migrating OpenCode stores...');
  const storesDir = path.join(OPENCODE_ROOT, 'src/stores');
  if (!fs.existsSync(storesDir)) {
    console.log('  No stores directory found');
    return;
  }
  const storeDirs = fs.readdirSync(storesDir, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name);
  let count = 0;

  for (const storeDir of storeDirs) {
    const data = parseStoreMarkdown('', storeDir);
    writeCollectionFile('stores', storeDir, data);
    count++;
  }
  console.log(`  Total: ${count} stores`);
}

function migrateGates() {
  console.log('\n📦 Migrating OpenCode gates...');
  const gatesDir = path.join(OPENCODE_ROOT, 'src/gates');
  if (!fs.existsSync(gatesDir)) {
    console.log('  No gates directory found');
    return;
  }
  const gateDirs = fs.readdirSync(gatesDir, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name);
  let count = 0;

  for (const gateDir of gateDirs) {
    const data = parseGateMarkdown('', gateDir);
    writeCollectionFile('gates', gateDir, data);
    count++;
  }
  console.log(`  Total: ${count} gates`);
}

function migrateAgents() {
  console.log('\n📦 Migrating OpenCode agents...');
  const agentsDir = path.join(OPENCODE_ROOT, 'src/agents');
  if (!fs.existsSync(agentsDir)) {
    console.log('  No agents directory found');
    return;
  }
  const agentDirs = fs.readdirSync(agentsDir, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name);
  let count = 0;

  for (const agentDir of agentDirs) {
    const data = parseAgentMarkdown('', agentDir);
    writeCollectionFile('agents', agentDir, data);
    count++;
  }
  console.log(`  Total: ${count} agents`);
}

console.log('🚀 Starting vstack-opencode migration...');
migrateTools();
migrateStores();
migrateGates();
migrateAgents();
console.log('\n✅ Migration complete!');