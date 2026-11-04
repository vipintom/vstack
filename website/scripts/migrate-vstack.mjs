#!/usr/bin/env node
/**
 * Migration script: Parse vstack umbrella contracts, ADRs, compatibility, wiki
 * Outputs content collection frontmatter files for Astro
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const VSTACK_ROOT = path.resolve(__dirname, '../../vstack');
const OUTPUT_ROOT = path.resolve(__dirname, '../src/content');

function readFileSafe(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf-8');
  } catch {
    return null;
  }
}

function parseResourceMarkdown(content, slug, category = 'reference') {
  const nameMatch = content.match(/^#\s+(.+)$/m);
  const name = nameMatch ? nameMatch[1] : slug;

  // Get first paragraph as description
  const lines = content.split('\n');
  let description = '';
  let inHeading = false;
  for (const line of lines) {
    if (line.startsWith('#')) {
      inHeading = true;
      continue;
    }
    if (inHeading && line.trim()) {
      description = line.trim();
      break;
    }
  }

  return {
    slug,
    name,
    category,
    description,
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

function migrateDir(sourceDir, collection, prefix, category) {
  console.log(`\n📦 Migrating ${prefix}...`);
  if (!fs.existsSync(sourceDir)) {
    console.log(`  No ${prefix} directory found, skipping`);
    return 0;
  }
  const files = fs.readdirSync(sourceDir)
    .filter(f => f.endsWith('.md') || f.endsWith('.json'));
  let count = 0;

  for (const file of files) {
    const content = readFileSafe(path.join(sourceDir, file));
    if (content) {
      const slug = `${prefix}${file.replace(/\.(md|json)$/, '')}`;
      const data = parseResourceMarkdown(content, slug, category);
      writeCollectionFile(collection, slug, data);
      count++;
    }
  }
  console.log(`  Total: ${count} ${prefix}`);
  return count;
}

console.log('🚀 Starting vstack (umbrella) migration...');
migrateDir(path.join(VSTACK_ROOT, 'contracts/projections/v1'), 'resources', 'projection-', 'specification');
migrateDir(path.join(VSTACK_ROOT, 'adrs'), 'resources', 'adr-', 'decision-record');
migrateDir(path.join(VSTACK_ROOT, 'compatibility'), 'resources', 'compat-', 'reference');
migrateDir(path.join(VSTACK_ROOT, 'wiki'), 'resources', 'wiki-', 'reference');
console.log('\n✅ Migration complete!');