#!/usr/bin/env node
/**
 * Migration script: Parse vstack-playbook skills, workflows, principles, resources
 * Outputs content collection frontmatter files for Astro
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PLAYBOOK_ROOT = path.resolve(__dirname, '../../vstack-playbook');
const OUTPUT_ROOT = path.resolve(__dirname, '../src/content');

function readFileSafe(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf-8');
  } catch {
    return null;
  }
}

function parseSkillMarkdown(content, slug) {
  const lines = content.split('\n');
  const frontmatter = {};
  let inFrontmatter = false;
  let frontmatterEnd = 0;

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim() === '---') {
      if (!inFrontmatter) {
        inFrontmatter = true;
      } else {
        frontmatterEnd = i;
        break;
      }
    } else if (inFrontmatter) {
      const [key, ...rest] = lines[i].split(':');
      if (key && rest.length) {
        frontmatter[key.trim()] = rest.join(':').trim();
      }
    }
  }

  // Extract category from triggers/when to use sections
  let category = 'Foundation';
  const fullContent = content.toLowerCase();
  if (fullContent.includes('verification') || fullContent.includes('test-first') || fullContent.includes('verify')) category = 'Verification';
  else if (fullContent.includes('debug') || fullContent.includes('recovery') || fullContent.includes('forensics')) category = 'Debug/Recovery';
  else if (fullContent.includes('architect') || fullContent.includes('design')) category = 'Architecture';
  else if (fullContent.includes('plan')) category = 'Planning';
  else if (fullContent.includes('review')) category = 'Review';
  else if (fullContent.includes('collab') || fullContent.includes('handoff') || fullContent.includes('swarm') || fullContent.includes('jury')) category = 'Collaboration';
  else if (fullContent.includes('continuity') || fullContent.includes('lesson') || fullContent.includes('unslop') || fullContent.includes('unstick')) category = 'Continuity';
  else if (fullContent.includes('deliver') || fullContent.includes('ship') || fullContent.includes('pr')) category = 'Delivery';
  else if (fullContent.includes('extended') || fullContent.includes('prototype') || fullContent.includes('arena') || fullContent.includes('best-of-n')) category = 'Extended';
  else if (fullContent.includes('implement')) category = 'Implementation';
  else if (fullContent.includes('utils') || fullContent.includes('docker') || fullContent.includes('makefile') || fullContent.includes('gitignore')) category = 'Utils';
  else if (fullContent.includes('discovery') || fullContent.includes('how') || fullContent.includes('why') || fullContent.includes('recall') || fullContent.includes('blast')) category = 'Discovery';

  return {
    slug,
    name: frontmatter.name || slug,
    category,
    description: frontmatter.description || '',
    lifecycle: frontmatter.lifecycle || 'stable',
    triggers: [],
    whenNotToUse: [],
    prerequisites: [],
    procedure: [],
    outputs: [],
    verification: '',
    failureHandling: {},
    dependsOn: [],
    related: [],
    references: [],
    harnessSupport: {
      opencode: 'full',
      codex: 'partial',
      claude: 'planned',
    },
    status: 'stable',
  };
}

function parseWorkflowMarkdown(content, slug) {
  // Extract first heading as name
  const nameMatch = content.match(/^#\s+(.+)$/m);
  const name = nameMatch ? nameMatch[1].replace('Workflow: ', '') : slug;

  // Extract description from first paragraph
  const descMatch = content.match(/^##\s+\w+\n\n(.+?)(?=\n##|\n$)/s);
  const description = descMatch ? descMatch[1].trim() : '';

  return {
    slug,
    name,
    category: 'Workflows',
    description,
    whenToUse: [],
    whenNotToUse: [],
    prerequisites: [],
    steps: [],
    verification: '',
    rollback: '',
    related: [],
    references: [],
    riskLevel: 'Medium',
    rigour: 'Standard',
  };
}

function parsePrincipleMarkdown(content, slug) {
  const nameMatch = content.match(/^#\s+Principle:\s*(.+)$/m);
  const name = nameMatch ? nameMatch[1] : slug;

  const summaryMatch = content.match(/##\s+Summary\n\n(.+?)(?=\n##|\n$)/s);
  const statement = summaryMatch ? summaryMatch[1].trim() : '';

  const triggerMatch = content.match(/##\s+Trigger\n\n(.+?)(?=\n##|\n$)/s);
  const triggers = triggerMatch ? triggerMatch[1].split('\n').filter(l => l.trim()).map(l => l.replace(/^[-*]\s*/, '')) : [];

  return {
    slug,
    name,
    category: 'Principles',
    statement,
    rationale: '',
    triggers,
    whenToApply: [],
    whenNotToApply: [],
    examples: [],
    related: [],
    references: [],
  };
}

function parseResourceMarkdown(content, slug) {
  const nameMatch = content.match(/^#\s+(.+)$/m);
  const name = nameMatch ? nameMatch[1] : slug;

  return {
    slug,
    name,
    category: 'reference',
    description: '',
    contentType: 'markdown',
    sourcePath: '',
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
  // Remove slug from data - Astro generates it from filename
  const { slug: _, ...frontmatterData } = data;
  const frontmatter = Object.entries(frontmatterData)
    .map(([k, v]) => `${k}: ${JSON.stringify(v)}`)
    .join('\n');
  const content = `---\n${frontmatter}\n---\n`;
  fs.writeFileSync(filePath, content);
  console.log(`  ✓ ${collection}/${slug}.md`);
}

function migrateSkills() {
  console.log('\n📦 Migrating skills...');
  const skillsDir = path.join(PLAYBOOK_ROOT, 'skills');
  if (!fs.existsSync(skillsDir)) {
    console.log('  No skills directory found');
    return;
  }
  const skillDirs = fs.readdirSync(skillsDir, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name);
  let count = 0;

  for (const skillDir of skillDirs) {
    const skillPath = path.join(skillsDir, skillDir, 'SKILL.md');
    const content = readFileSafe(skillPath);
    if (content) {
      const data = parseSkillMarkdown(content, skillDir);
      writeCollectionFile('skills', skillDir, data);
      count++;
    }
  }
  console.log(`  Total: ${count} skills`);
}

function migrateWorkflows() {
  console.log('\n📦 Migrating workflows...');
  const workflowsDir = path.join(PLAYBOOK_ROOT, 'workflows');
  if (!fs.existsSync(workflowsDir)) {
    console.log('  No workflows directory found');
    return;
  }
  const workflowFiles = fs.readdirSync(workflowsDir)
    .filter(f => f.endsWith('.md'));
  let count = 0;

  for (const workflowFile of workflowFiles) {
    const workflowPath = path.join(workflowsDir, workflowFile);
    const content = readFileSafe(workflowPath);
    if (content) {
      const slug = workflowFile.replace('.md', '');
      const data = parseWorkflowMarkdown(content, slug);
      writeCollectionFile('workflows', slug, data);
      count++;
    }
  }
  console.log(`  Total: ${count} workflows`);
}

function migratePrinciples() {
  console.log('\n📦 Migrating principles...');
  const principlesDir = path.join(PLAYBOOK_ROOT, 'principles');
  if (!fs.existsSync(principlesDir)) {
    console.log('  No principles directory found');
    return;
  }
  const principleFiles = fs.readdirSync(principlesDir)
    .filter(f => f.endsWith('.md') && f !== 'index.md');
  let count = 0;

  for (const principleFile of principleFiles) {
    const principlePath = path.join(principlesDir, principleFile);
    const content = readFileSafe(principlePath);
    if (content) {
      const slug = principleFile.replace('.md', '');
      const data = parsePrincipleMarkdown(content, slug);
      writeCollectionFile('principles', slug, data);
      count++;
    }
  }
  console.log(`  Total: ${count} principles`);
}

function migrateResources() {
  console.log('\n📦 Migrating resources...');
  const resourcesDir = path.join(PLAYBOOK_ROOT, 'resources');
  if (!fs.existsSync(resourcesDir)) {
    console.log('  No resources directory found');
    return;
  }
  let count = 0;

  function processDir(dir, prefix = '') {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        processDir(fullPath, `${prefix}${entry.name}-`);
      } else if (entry.name.endsWith('.md')) {
        const content = readFileSafe(fullPath);
        if (content) {
          const slug = `${prefix}${entry.name.replace('.md', '')}`;
          const data = parseResourceMarkdown(content, slug);
          writeCollectionFile('resources', slug, data);
          count++;
        }
      }
    }
  }

  processDir(resourcesDir);
  console.log(`  Total: ${count} resources`);
}

console.log('🚀 Starting vstack-playbook migration...');
migrateSkills();
migrateWorkflows();
migratePrinciples();
migrateResources();
console.log('\n✅ Migration complete!');