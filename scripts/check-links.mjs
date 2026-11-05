#!/usr/bin/env node
// Check that every local Markdown link in a directory resolves.
// Usage: node scripts/check-links.mjs [root]   (default: wiki)
import { readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";

const root = process.argv[2] ?? "wiki";
const files = [];

function walk(directory) {
  for (const name of readdirSync(directory)) {
    if (name === "node_modules" || name === ".git") continue;
    const path = join(directory, name);
    if (statSync(path).isDirectory()) walk(path);
    else if (name.endsWith(".md")) files.push(path);
  }
}

walk(root);

const broken = [];
const linkPattern = /!?\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;

for (const file of files) {
  const text = readFileSync(file, "utf8");
  for (const match of text.matchAll(linkPattern)) {
    const target = match[1];
    if (/^(https?:|mailto:|#)/.test(target)) continue;
    const path = target.split("#")[0];
    if (!path) continue;
    try {
      statSync(resolve(dirname(file), path));
    } catch {
      broken.push(`${file}: ${target}`);
    }
  }
}

if (broken.length > 0) {
  console.error(`broken local links: ${broken.length}`);
  for (const line of broken) console.error(line);
  process.exit(1);
}

console.log(`local links: ${files.length} Markdown files, 0 broken`);
