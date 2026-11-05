# Lighthouse Audit Fixes — Design Document

> **Generated via vstack-architect / vstack-arena synthesis**
> **Source:** vstack-interrogate root cause analysis of 31-page Astro 5 website audit

---

## Problem Statement

Lighthouse 13.6.0 desktop audit of 31 pages reveals:

| Category | Current Avg | Target | Gap |
|---|---|---|---|
| Performance | ~68% | 90% | -22% |
| Accessibility | ~99% | 100% | -1% |
| Best Practices | 96% | 95% | ✓ Met |
| SEO | 100% | 100% | ✓ Met |

Six verified root causes block target achievement.

---

## Root Causes & Design Solutions

### RC1: Capabilities Page DOM Explosion (Performance)

**Location:** `src/pages/capabilities/index.astro:111-165`

**Problem:** Server-renders all 106+ capability cards (55 playbook + 23 opencode + 2 openchamber + harness summaries) simultaneously → ~10,000 DOM nodes, 17.8s main-thread work, 10,280ms TBT.

**Solution: Component-Level Code Splitting + Lazy Hydration**

```astro
<!-- BEFORE: All components rendered at build time -->
{['playbook', 'opencode', 'openchamber'].map(component => (
  <div data-component={component} class="component-section">
    {capabilities.map(cap => <CapabilityCard {...cap} />)}
  </div>
))}

<!-- AFTER: Default to Playbook only, lazy-load others via client:visible -->
<div data-component="playbook" class="component-section">
  {playbookCapabilities.map(cap => <CapabilityCard {...cap} />)}
</div>

<div data-component="opencode" class="component-section" style="display: none;">
  <OpencodeCapabilities client:visible />
</div>

<div data-component="openchamber" class="component-section" style="display: none;">
  <OpenchamberCapabilities client:visible />
</div>
```

**Files to Modify:**
- `src/pages/capabilities/index.astro` — Split into default + lazy components
- Create `src/components/OpencodeCapabilities.astro` — 23 tool cards
- Create `src/components/OpenchamberCapabilities.astro` — 2 interface cards
- Create `src/components/HarnessSummary.astro` — extracted details component

**Trade-offs:**
- ✅ Reduces initial DOM by ~70% (only 55 cards initially)
- ✅ Preserves SSR for SEO on primary content
- ⚠️ Component switching requires JS (already noted in UI)
- ⚠️ New component files add build complexity

**Estimated Impact:** Performance 42 → 75+ on capabilities page

---

### RC2: Render-Blocking Google Fonts (Performance)

**Location:** `src/layouts/Layout.astro:62-64`, `src/styles/global.css:45-47`

**Problem:** Three font families preloaded synchronously with `preload` + `media="print" onload` pattern blocks first paint.

```html
<!-- CURRENT: Blocks LCP -->
<link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Geist+Variable:wght@400;700&family=IBM+Plex+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Geist+Variable:wght@400;700&family=IBM+Plex+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" media="print" onload="this.media='all'" />
```

**Solution: Font Display Swap + Subset + Self-Host Critical**

```html
<!-- OPTIMIZED: Non-blocking with font-display: swap -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Geist+Variable:wght@400;700&display=swap" />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Geist+Variable:wght@400;700&display=swap" media="print" onload="this.media='all'" />

<!-- Defer secondary fonts -->
<link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600&display=swap" />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600&display=swap" media="print" onload="this.media='all'" />

<!-- Mono font: only for code blocks, defer aggressively -->
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap" media="print" onload="this.media='all'" />
```

**CSS Update (`global.css`):**
```css
@font-face {
  font-family: 'Geist Variable';
  src: url('https://fonts.gstatic.com/s/geistvariable/v2/...') format('woff2');
  font-display: swap;  /* Critical: prevents invisible text */
  font-weight: 400 700;
}
```

**Alternative Considered:** Self-host fonts via `@fontsource` packages
- Rejected: Adds ~200KB to bundle, increases build complexity
- Current approach: Keep Google Fonts, optimize loading

**Files to Modify:**
- `src/layouts/Layout.astro:62-64` — Split font loads, add display=swap
- `src/styles/global.css:45-47` — Add @font-face with font-display: swap

**Estimated Impact:** LCP 4.4s → <2.5s on capabilities page

---

### RC3: Heading Order Violations (Accessibility)

**Location:** `src/layouts/Doc.astro`, all page templates

**Problem:** Page templates start with `<h1>` inside `<Section>`, but sidebar/nav may have `<h2>`/`<h3>` before main content. 15 pages affected.

**Solution: Consistent Heading Hierarchy via Layout Contract**

```astro
<!-- Doc.astro: Enforce heading structure -->
<Layout title={title} description={description}>
  <Nav />
  <Toast />
  <div class="doc-layout">
    {sidebarItems && <DocSidebar title={sidebarTitle || 'Documentation'} items={sidebarItems} />}
    <div class="doc-content">
      <main id="main-content">
        <!-- Page content MUST start with h1 -->
        <slot />
      </main>
    </div>
  </div>
  <Footer />
</Layout>
```

**Page Template Standard:**
```astro
<!-- Every page: single h1 at slot root -->
<Doc title="Page Title" description="...">
  <Section id="unique-id" aria-labelledby="page-title">
    <h1 id="page-title">Page Title</h1>  <!-- ALWAYS h1, never h2/h3 -->
    <p class="lead">Description...</p>
    <!-- Subsections use h2, h3... -->
    <Section id="subsection" aria-labelledby="sub-title">
      <h2 id="sub-title">Subsection</h2>
    </Section>
  </Section>
</Doc>
```

**Sidebar Fix:** `DocSidebar.astro` — Change any heading to use `<h2>` with `aria-level="2"` or visually hidden

**Files to Modify:**
- `src/layouts/Doc.astro` — Add documentation comment enforcing h1 at slot root
- `src/components/DocSidebar.astro` — Ensure sidebar headings use correct level
- All 15 affected pages — Verify h1 at content root, proper h2/h3 hierarchy

**Affected Pages (from audit):**
- install/opencode-plugin.astro, install/playbook.astro, install/removal.astro, install/upgrade.astro
- openchamber/index.astro, openchamber/installation.astro
- opencode-plugin/index.astro, opencode-plugin/agents.astro, opencode-plugin/gates.astro, opencode-plugin/stores.astro, opencode-plugin/tools.astro
- playbook/index.astro, playbook/principles.astro, playbook/resources.astro, playbook/skills.astro, playbook/workflows.astro
- troubleshooting.astro

**Estimated Impact:** Accessibility 94-99 → 100 on affected pages

---

### RC4: Warning Box Color Contrast (Accessibility)

**Location:** `src/styles/global.css` (color tokens), page-specific styles

**Problem:** `--color-warning: oklch(65% 0.18 85)` on background `oklch(65% 0.18 85 / 0.1)` fails WCAG AA (ratio ~2.1:1, need 4.5:1).

```css
/* CURRENT: Insufficient contrast */
.warning-box {
  background: var(--color-warning, oklch(65% 0.18 85 / 0.1));
  border: 1px solid var(--color-warning, oklch(65% 0.18 85 / 0.3));
}
.warning-box h3 { color: var(--color-warning); }  /* FAILS on this background */
```

**Solution: Darken Warning Token for Text, Lighten Background**

```css
/* global.css: Update token values */
--color-warning: oklch(55% 0.18 85);        /* Darker for text (was 65%) */
--color-warning-bg: oklch(85% 0.12 85 / 0.15);  /* Lighter, more opaque background */
--color-warning-border: oklch(55% 0.18 85 / 0.4);
```

```css
/* Page styles: Use new tokens */
.warning-box {
  background: var(--color-warning-bg);
  border: 1px solid var(--color-warning-border);
  border-radius: var(--radius-lg);
  padding: var(--space-xl);
}
.warning-box h3 { color: var(--color-warning); }  /* Now passes */
.warning-box p { color: var(--color-ink); }        /* Body text on warning bg */
.warning-box ul { color: var(--color-ink-muted); }
```

**Files to Modify:**
- `src/styles/global.css:32` — Update warning token, add bg/border tokens
- `src/pages/install/opencode-plugin.astro:205-213` — Use new tokens
- `src/pages/install/upgrade.astro:210-218` — Use new tokens

**Estimated Impact:** Contrast ratio 2.1:1 → 5.2:1 (WCAG AA pass)

---

### RC5: Skip Link Focus Clipping (Accessibility)

**Location:** `src/components/Nav.astro:23, 109-130`, `src/styles/base.css:11-12`

**Problem:** Skip link uses `top: -100%` absolute positioning, but nav has `position: sticky; top: 0; z-index: var(--z-sticky-nav);` — skip link appears behind nav when focused.

**Solution: Skip Link Inside Nav, Higher Z-Index**

```astro
<!-- Nav.astro: Move skip link inside nav, before wordmark -->
<nav class="nav" role="navigation" aria-label="Main navigation">
  <a href="#main-content" class="skip-link">Skip to main content</a>
  <a href={withBase('/')} class="nav-wordmark" aria-label="vstack home">vstack</a>
  ...
</nav>
```

```css
/* base.css: Ensure skip link escapes sticky context */
.skip-link {
  position: absolute;
  top: -100%;
  left: 50%;
  transform: translateX(-50%);
  z-index: var(--z-tooltip);  /* 600 > nav's 300 */
  ...
}
.skip-link:focus {
  top: var(--space-md);
  /* Add: ensure it's above sticky nav */
  position: fixed;  /* Fixed viewport positioning escapes sticky */
  top: var(--space-md);
  left: 50%;
  transform: translateX(-50%);
}
```

**Files to Modify:**
- `src/components/Nav.astro:23` — Move skip link to be first child of nav
- `src/styles/base.css:109-130` — Update skip-link focus to use fixed positioning

**Estimated Impact:** Skip link audit score 0 → 100

---

### RC6: Console Errors (Best Practices)

**Location:** `src/components/SearchPagefind.astro:109-139`, `dist/` static files

**Problem:** Three sources of console errors:
1. **Pagefind** `import.meta` in bundled JS triggers CSP/ESM warnings
2. **Missing optional files**: `llms.txt`, `robots.txt` return 404 (exist in dist but path mismatch with `/vstack/` base)
3. **Pagefind search** tries to load `.well-known/` paths for indexing

**Solution A: Pagefind Config + Fix Base Path**

```astro
<!-- SearchPagefind.astro: Fix script loading -->
<script>
  if (typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', () => {
      const script = document.createElement('script');
      // Use base path for pagefind assets
      script.src = '/vstack/_pagefind/pagefind.js';
      script.async = true;
      script.onload = () => { ... };
      document.head.appendChild(script);
    });
  }
</script>
```

**Solution B: Add Missing Static Files**

```bash
# In website dist build, ensure these exist at /vstack/ paths:
dist/vstack/llms.txt        # Copy from dist/llms.txt
dist/vstack/robots.txt      # Copy from dist/robots.txt
dist/vstack/.well-known/    # Create directory with security.txt
```

**Solution C: Pagefind Config (pagefind.config.js)**

```js
// website/pagefind.config.js
module.exports = {
  source: 'dist',
  output: 'dist/_pagefind',
  glob: '**/*.html',
  excludeSelectors: ['.skip-link', 'nav', 'footer', '.search-ui-container'],
  // Prevent .well-known requests
  rootSelector: 'main',
};
```

**Files to Modify:**
- `src/components/SearchPagefind.astro:115` — Fix pagefind.js path with base
- `package.json` — Add pagefind config or build step to copy files
- Create `pagefind.config.js` at website root

**Estimated Impact:** Console errors eliminated (informational — BP already at 96%)

---

## Implementation Sequence

| Phase | Task | Depends On | Files |
|---|---|---|---|
| 1 | Fix Skip Link (RC5) | — | Nav.astro, base.css |
| 2 | Fix Warning Contrast (RC4) | — | global.css, 2 page styles |
| 3 | Fix Heading Order (RC3) | — | Doc.astro, DocSidebar.astro, 15 pages |
| 4 | Fix Font Loading (RC2) | — | Layout.astro, global.css |
| 5 | Fix Capabilities DOM (RC1) | — | capabilities/index.astro, 3 new components |
| 6 | Fix Console Errors (RC6) | Build verification | SearchPagefind.astro, pagefind.config.js |

**Phases 1-3 can run in parallel** (independent files)
**Phases 4-6 should be sequential** (Layout.astro and capabilities are high-impact)

---

## Risk Mitigation

| Risk | Mitigation |
|---|---|
| Capabilities lazy-load breaks SEO | Primary 55 cards stay SSR; lazy components use `client:visible` (hydrates on scroll) |
| Font changes cause FOUT | `font-display: swap` + preconnect; test both themes |
| Heading changes break sidebar | DocSidebar uses semantic `<nav>` + `<h2>` with `aria-level` |
| Warning color change affects other components | New tokens are additive; old token preserved for backward compat |
| Pagefind base path breaks search | Test search on all pages after deploy; verify `_pagefind` loads |

---

## Verification Plan

Per fix, run Lighthouse on affected pages:

```bash
# After each phase, verify:
npx lighthouse http://localhost:4321/capabilities/ --only-categories=performance
npx lighthouse http://localhost:4321/install/opencode-plugin/ --only-categories=accessibility
npx lighthouse http://localhost:4321/ --only-categories=accessibility,best-practices
```

**Target Scores Post-Fix:**
- Performance: Capabilities 42→75+, Home 58→85+, others 65→80+
- Accessibility: All pages 100%
- Best Practices: 96% maintained (console errors fixed)
- SEO: 100% maintained

---

## Synthesis Note (Arena)

**Base Candidate:** Candidate 1 (Component splitting + font optimization + accessibility fixes)
**Judge Verdict:** Candidate 1 chosen for architectural soundness — component splitting follows Astro islands pattern, font optimization uses standard web perf techniques, accessibility fixes are minimal surgical changes.

**Grafts from Candidate 2:**
- Pagefind config file approach (cleaner than inline fixes)
- Fixed positioning for skip link (more robust than z-index battle)

**Rejections from Candidate 2:**
- Self-hosted fonts — adds bundle size, build complexity
- Complete heading rewrite — overkill; convention enforcement sufficient

**Convergence:** All 6 root causes addressed with minimal, idiomatic Astro changes. No escape hatches or workarounds introduced.

---

## Next Steps

1. **Review this design** — confirm approach captures requirements
2. **Choose execution method:**
   - Subagent-driven (thorough, independent review per task)
   - Native (fastest, single review at end)
3. **Implement per sequence** — run Lighthouse verification after each phase