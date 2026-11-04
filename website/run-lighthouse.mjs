import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';
import fs from 'fs';
import path from 'path';

const urls = [
  'http://localhost:4335/vstack/',
  'http://localhost:4335/vstack/capabilities/',
  'http://localhost:4335/vstack/compatibility/',
  'http://localhost:4335/vstack/install/',
  'http://localhost:4335/vstack/install/opencode-plugin/',
  'http://localhost:4335/vstack/install/playbook/',
  'http://localhost:4335/vstack/install/removal/',
  'http://localhost:4335/vstack/install/upgrade/',
  'http://localhost:4335/vstack/openchamber/',
  'http://localhost:4335/vstack/openchamber/installation/',
  'http://localhost:4335/vstack/openchamber/limitations/',
  'http://localhost:4335/vstack/openchamber/notes/',
  'http://localhost:4335/vstack/openchamber/plans/',
  'http://localhost:4335/vstack/openchamber/protocol/',
  'http://localhost:4335/vstack/openchamber/todos/',
  'http://localhost:4335/vstack/openchamber/troubleshooting/',
  'http://localhost:4335/vstack/opencode-plugin/',
  'http://localhost:4335/vstack/opencode-plugin/agents/',
  'http://localhost:4335/vstack/opencode-plugin/configuration/',
  'http://localhost:4335/vstack/opencode-plugin/diagnostics/',
  'http://localhost:4335/vstack/opencode-plugin/gates/',
  'http://localhost:4335/vstack/opencode-plugin/permissions/',
  'http://localhost:4335/vstack/opencode-plugin/projections/',
  'http://localhost:4335/vstack/opencode-plugin/stores/',
  'http://localhost:4335/vstack/opencode-plugin/tools/',
  'http://localhost:4335/vstack/playbook/',
  'http://localhost:4335/vstack/playbook/principles/',
  'http://localhost:4335/vstack/playbook/resources/',
  'http://localhost:4335/vstack/playbook/skills/',
  'http://localhost:4335/vstack/playbook/workflows/',
  'http://localhost:4335/vstack/troubleshooting/',
];

const outputDir = '/home/ubuntu/code/personal/vstack-workflow/vstack/website/lighthouse-results';

async function runLighthouse(url, index) {
  const chrome = await chromeLauncher.launch({ 
    chromeFlags: ['--headless', '--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage'] 
  });
  
  try {
    const result = await lighthouse(url, {
      port: chrome.port,
      output: 'json',
      onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
      formFactor: 'desktop',
      screenEmulation: { disabled: true },
      throttling: { cpuSlowdownMultiplier: 1, rttMs: 0, throughputKbps: 10240, requestLatencyMs: 0 },
    });
    
    const safeName = url.replace(/[^a-zA-Z0-9]/g, '_').replace(/_+/g, '_').replace(/^_|_$/g, '');
    const filename = `${index.toString().padStart(2, '0')}_${safeName}.json`;
    const filepath = path.join(outputDir, filename);
    
    fs.writeFileSync(filepath, JSON.stringify(result.lhr, null, 2));
    
    const categories = result.lhr.categories;
    console.log(`[${index}/${urls.length}] ${url}`);
    console.log(`  Performance: ${Math.round(categories.performance.score * 100)}`);
    console.log(`  Accessibility: ${Math.round(categories.accessibility.score * 100)}`);
    console.log(`  Best Practices: ${Math.round(categories['best-practices'].score * 100)}`);
    console.log(`  SEO: ${Math.round(categories.seo.score * 100)}`);
    console.log(`  PWA: N/A`);
    console.log(`  Saved: ${filename}`);
    
    return { url, lhr: result.lhr, filepath };
  } finally {
    await chrome.kill();
  }
}

async function main() {
  console.log(`Running Lighthouse on ${urls.length} URLs...\n`);
  
  const results = [];
  for (let i = 0; i < urls.length; i++) {
    try {
      const result = await runLighthouse(urls[i], i + 1);
      results.push(result);
    } catch (err) {
      console.error(`Failed: ${urls[i]}`, err.message);
    }
  }
  
  // Generate summary report
  const summary = results.map(r => ({
    url: r.url,
    performance: Math.round(r.lhr.categories.performance.score * 100),
    accessibility: Math.round(r.lhr.categories.accessibility.score * 100),
    bestPractices: Math.round(r.lhr.categories['best-practices'].score * 100),
    seo: Math.round(r.lhr.categories.seo.score * 100),
  }));
  
  fs.writeFileSync(
    path.join(outputDir, 'summary.json'),
    JSON.stringify(summary, null, 2)
  );
  
  // Generate markdown report
  let md = '# Lighthouse Audit Report\n\n';
  md += `**Date:** ${new Date().toISOString()}\n`;
  md += `**Base URL:** http://localhost:4335/vstack/\n`;
  md += `**Pages Tested:** ${results.length}\n\n`;
  
  md += '## Summary Scores\n\n';
  md += '| Page | Performance | Accessibility | Best Practices | SEO |\n';
  md += '|------|-------------|---------------|----------------|-----|\n';
  
  for (const s of summary) {
    md += `| ${s.url.replace('http://localhost:4335/vstack/', '/')} | ${s.performance} | ${s.accessibility} | ${s.bestPractices} | ${s.seo} |\n`;
  }
  
  md += '\n## Detailed Issues by Category\n\n';
  
  // Collect all audit results
  const categories = ['performance', 'accessibility', 'best-practices', 'seo'];
  for (const cat of categories) {
    md += `### ${cat.charAt(0).toUpperCase() + cat.slice(1)}\n\n`;
    
    // Find failed audits across all pages
    const failedAudits = new Map();
    for (const r of results) {
      const audits = r.lhr.categories[cat].auditRefs;
      for (const auditRef of audits) {
        const audit = r.lhr.audits[auditRef.id];
        if (audit && audit.score !== null && audit.score < 1) {
          const key = auditRef.id;
          if (!failedAudits.has(key)) {
            failedAudits.set(key, {
              id: auditRef.id,
              title: audit.title,
              description: audit.description,
              score: audit.score,
              pages: []
            });
          }
          failedAudits.get(key).pages.push({ url: r.url, score: audit.score, numericValue: audit.numericValue, displayValue: audit.displayValue });
        }
      }
    }
    
    if (failedAudits.size === 0) {
      md += 'No issues found.\n\n';
      continue;
    }
    
    // Sort by number of pages affected, then by score
    const sorted = Array.from(failedAudits.values()).sort((a, b) => 
      b.pages.length - a.pages.length || a.score - b.score
    );
    
    for (const audit of sorted) {
      md += `#### ${audit.title} (${audit.id})\n`;
      md += `${audit.description}\n\n`;
      md += `**Score:** ${Math.round(audit.score * 100)}/100 | **Pages affected:** ${audit.pages.length}\n\n`;
      md += '| Page | Score | Value |\n';
      md += '|------|-------|-------|\n';
      for (const p of audit.pages) {
        const val = p.displayValue || (p.numericValue !== undefined ? `${p.numericValue}ms` : 'N/A');
        md += `| ${p.url.replace('http://localhost:4335/vstack/', '/')} | ${Math.round(p.score * 100)} | ${val} |\n`;
      }
      md += '\n';
    }
  }
  
  fs.writeFileSync(
    path.join(outputDir, 'report.md'),
    md
  );
  
  console.log('\n✅ Done! Reports saved to:', outputDir);
  console.log('  - summary.json');
  console.log('  - report.md');
  console.log('  - Individual JSON files per page');
}

main().catch(console.error);