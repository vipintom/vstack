#!/usr/bin/env node
/**
 * Migration script: Parse vstack-openchamber dashboard components, projections, API
 * Outputs content collection frontmatter files for Astro
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OPENCHAMBER_ROOT = path.resolve(__dirname, '../../vstack-openchamber');
const OUTPUT_ROOT = path.resolve(__dirname, '../src/content');

function readDir(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name);
}

function readFileSafe(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf-8');
  } catch {
    return null;
  }
}

function parseResourceMarkdown(content, slug) {
  const lines = content.split('\n');
  const frontmatter = {};
  let inFrontmatter = false;

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim() === '---') {
      if (!inFrontmatter) {
        inFrontmatter = true;
      } else {
        break;
      }
    } else if (inFrontmatter) {
      const [key, ...rest] = lines[i].split(':');
      if (key && rest.length) {
        frontmatter[key.trim()] = rest.join(':').trim();
      }
    }
  }

  return {
    slug,
    name: frontmatter.name || slug,
    category: frontmatter.category || 'reference',
    description: frontmatter.description || '',
    contentType: frontmatter.contentType || 'markdown',
    sourcePath: frontmatter.sourcePath || '',
    related: frontmatter.related ? frontmatter.related.split(',').map(s => s.trim()) : [],
    references: frontmatter.references ? frontmatter.references.split(',').map(s => s.trim()) : [],
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

function migrateResources() {
  console.log('\n📦 Migrating OpenChamber resources...');
  const resourcesDir = path.join(OPENCHAMBER_ROOT, 'docs');
  if (!fs.existsSync(resourcesDir)) {
    console.log('  No docs directory found, skipping');
    return;
  }
  const resourceDirs = readDir(resourcesDir);
  let count = 0;

  for (const resourceDir of resourceDirs) {
    const resourcePath = path.join(resourcesDir, resourceDir, 'README.md');
    const content = readFileSafe(resourcePath);
    if (content) {
      const data = parseResourceMarkdown(content, resourceDir);
      writeCollectionFile('resources', `openchamber-${resourceDir}`, data);
      count++;
    }
  }
  console.log(`  Total: ${count} resources`);
}

console.log('🚀 Starting vstack-openchamber migration...');
migrateResources();
console.log('\n✅ Migration complete!');