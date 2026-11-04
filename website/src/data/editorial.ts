/**
 * Editorial Content - Website-Owned Presentation Metadata
 * 
 * This file contains content that is genuinely presentation-specific
 * and not represented upstream. It must not silently override
 * authoritative product facts.
 */

import type { EditorialContent, NavigationItem } from './types.js';

// ============================================================================
// Navigation Structure
// ============================================================================

export const primaryNavigation: NavigationItem[] = [
  { label: 'Home', href: '/' },
  { 
    label: 'Products', 
    href: '/products/',
    children: [
      { label: 'Playbook', href: '/playbook/' },
      { label: 'OpenCode Plugin', href: '/opencode-plugin/' },
      { label: 'OpenChamber', href: '/openchamber/' },
      { label: 'Compare', href: '/products/compare/' },
    ]
  },
  { label: 'Architecture', href: '/architecture/' },
  { label: 'Capabilities', href: '/capabilities/' },
  { label: 'Documentation', href: '/docs/' },
  { label: 'Releases', href: '/releases/' },
  { label: 'GitHub', href: 'https://github.com/vipintom', external: true },
];

export const footerNavigation = {
  playbook: [
    { label: 'All Skills', href: '/playbook/skills/' },
    { label: 'Workflows', href: '/playbook/workflows/' },
    { label: 'Principles', href: '/playbook/principles/' },
    { label: 'Resources', href: '/playbook/resources/' },
    { label: 'Capability Matrix', href: '/compatibility/' },
    { label: 'Install', href: '/install/' },
  ],
  opencodePlugin: [
    { label: 'Tools', href: '/opencode-plugin/tools/' },
    { label: 'Stores', href: '/opencode-plugin/stores/' },
    { label: 'Gates', href: '/opencode-plugin/gates/' },
    { label: 'Agents', href: '/opencode-plugin/agents/' },
    { label: 'Projections', href: '/opencode-plugin/projections/' },
    { label: 'Install', href: '/install/#opencode' },
  ],
  openchamber: [
    { label: 'Panel', href: '/openchamber/' },
    { label: 'Dashboard', href: '/openchamber/dashboard/' },
    { label: 'Notes', href: '/openchamber/notes/' },
    { label: 'Todos', href: '/openchamber/todos/' },
    { label: 'Plans', href: '/openchamber/plans/' },
    { label: 'Installation', href: '/openchamber/installation/' },
  ],
  meta: [
    { label: 'Playbook Repo', href: 'https://github.com/vipintom/vstack-playbook', external: true },
    { label: 'OpenCode Plugin Repo', href: 'https://github.com/vipintom/vstack-opencode', external: true },
    { label: 'OpenChamber Repo', href: 'https://github.com/vipintom/vstack-openchamber', external: true },
    { label: 'Compatibility', href: '/compatibility/' },
  ],
};

// ============================================================================
// Hero Section (Homepage)
// ============================================================================

export const heroContent: EditorialContent = {
  id: 'hero',
  type: 'hero',
  target: '/',
  title: 'vstack',
  body: `
# vstack

**Portable engineering playbook for AI-assisted development**

Three independent components. One coherent ecosystem.

- **Playbook**: 55 skills, 18 workflows, 17 principles — harness-agnostic methodology
- **OpenCode Plugin**: 23 tools, 3 agents, 6 stores, 7 gates — OpenCode runtime
- **OpenChamber**: Read-only Panel + Dashboard — visualization companion
  `.trim(),
  sourceNote: 'Product identity and value proposition derived from PRD v2.1 and verified component data.',
};

// ============================================================================
// Product Introductions
// ============================================================================

export const productIntros: Record<string, EditorialContent> = {
  playbook: {
    id: 'playbook-intro',
    type: 'product-intro',
    target: '/playbook/',
    title: 'vstack Playbook',
    body: `
The **vstack Playbook** is the reusable methodology and knowledge layer of the ecosystem.

It provides structured guidance for agentic development through:
- **55 Skills** — Reusable procedures for AI-assisted development tasks
- **18 Workflows** — Composable recipes for common scenarios (feature delivery, bug fixing, refactoring, etc.)
- **17 Principles** — Engineering guidelines that govern design decisions
- **3 Roles** — Lead, Builder, Reviewer with harness-specific adapters

All content is Markdown/YAML with **zero runtime code**, making it portable across OpenCode, Codex, and Claude Code.
    `.trim(),
    sourceNote: 'Derived from Playbook manifest.json (55 skills, 18 workflows, 17 principles, 3 roles) and capability-matrix.md',
  },
  opencode: {
    id: 'opencode-intro',
    type: 'product-intro',
    target: '/opencode-plugin/',
    title: 'vstack OpenCode Plugin',
    body: `
The **vstack OpenCode Plugin** is the harness-specific runtime and execution layer.

It integrates the Playbook methodology with OpenCode and provides:
- **23 Tools** — Discrete capabilities: task management, memory, verification, delivery tracking
- **3 Specialist Agents** — Builder (implementation), Reviewer (verification), Lead (coordination)
- **6 Persistent Stores** — Delivery, history, memory, quality, tasks, session data
- **7 Quality Gates** — Verification, review, security, performance, and more
- **Projection Publishing** — Emits structured data for OpenChamber visualization

Requires **@opencode/plugin@2.2.0** (peer dependency, exact version).
    `.trim(),
    sourceNote: 'Derived from OpenCode Plugin package.json (23 tools, 3 agents, 6 stores, 7 gates) and src/index.ts',
  },
  openchamber: {
    id: 'openchamber-intro',
    type: 'product-intro',
    target: '/openchamber/',
    title: 'vstack OpenChamber',
    body: `
**OpenChamber** is a companion visualization interface for runtime information.

It presents projections published by the OpenCode Plugin through:
- **Panel** — Side panel for quick access to Notes, Todos, Plans
- **Dashboard** — Full-page view with deliveries, tasks, quality gates, activity timeline, memory index

**Key distinction**: OpenChamber is **read-only**. It consumes projections from the runtime but does not mutate state. It is an optional companion, not a required dependency.
    `.trim(),
    sourceNote: 'Derived from OpenChamber package.json (Panel + Dashboard) and panel/main.ts, Dashboard.ts (read-only projection consumption)',
  },
};

// ============================================================================
// Architecture Summary (Homepage)
// ============================================================================

export const architectureSummary: EditorialContent = {
  id: 'architecture-summary',
  type: 'architecture-summary',
  target: '/',
  title: 'How vstack Works Together',
  body: `
The vstack ecosystem separates **reusable methodology** from **harness-specific execution** and **visualization**:

1. **Playbook** defines methodology (skills, workflows, principles) — harness-agnostic
2. **OpenCode Plugin** consumes Playbook skills and provides runtime execution
3. **Runtime** publishes projections (structured data about deliveries, tasks, quality)
4. **OpenChamber** reads projections for read-only visualization (Panel + Dashboard)
5. **Umbrella Repository** coordinates contracts, compatibility matrix, integrated releases

This separation means:
- Playbook works independently (no runtime required)
- OpenCode Plugin loads Playbook skills via Skills CLI
- OpenChamber is optional — only needed for visualization
- Integrated releases coordinate tested component revisions
  `.trim(),
  sourceNote: 'Architecture relationships verified from integrated-release.json, component repositories, and PRD v2.1 Section 3.6',
};

// ============================================================================
// Product Comparison
// ============================================================================

export const productComparison: EditorialContent = {
  id: 'product-comparison',
  type: 'comparison',
  target: '/products/compare/',
  title: 'Choose the Right Component',
  body: `
| Aspect | Playbook | OpenCode Plugin | OpenChamber |
|--------|----------|-----------------|-------------|
| **Purpose** | Reusable methodology | OpenCode runtime | Read-only visualization |
| **Format** | Markdown/YAML skills | TypeScript plugin | React panel/page |
| **Harness** | OpenCode, Codex, Claude Code | OpenCode only | OpenChamber host |
| **Runtime** | None (static content) | Owns runtime state | Consumes projections |
| **Dependencies** | Node.js ≥20 | @opencode/plugin@2.2.0 | @openchamber/sdk@2.5.3 |
| **Install** | \`opencode skill install vstack\` | \`npm i @vipintom/vstack-opencode\` | Git submodule / ZIP |
| **Independence** | Fully independent | Requires OpenCode | Optional companion |

**Start here:**
- Want methodology only? → **Playbook**
- Using OpenCode for execution? → **OpenCode Plugin** (+ Playbook via Skills CLI)
- Want to visualize workflow state? → **OpenChamber** (requires OpenCode Plugin)
  `.trim(),
  sourceNote: 'Comparison synthesized from verified component data in products.ts and PRD v2.1 Section 3.6',
};

// ============================================================================
// Getting Started
// ============================================================================

export const gettingStarted: EditorialContent = {
  id: 'getting-started',
  type: 'getting-started',
  target: '/',
  title: 'Getting Started',
  body: `
## Quick Start

### Option 1: Playbook Only (any harness)
\`\`\`bash
opencode skill install vstack
\`\`\`
Installs all 55 skills to your AI harness.

### Option 2: OpenCode Runtime + Playbook
\`\`\`bash
# In your OpenCode project
npm install @vipintom/vstack-opencode@0.1.0
opencode skill install vstack
\`\`\`

### Option 3: Full Ecosystem (OpenCode + Visualization)
\`\`\`bash
# OpenCode Plugin + Playbook
npm install @vipintom/vstack-opencode@0.1.0
opencode skill install vstack

# OpenChamber (in OpenChamber host)
git submodule add https://github.com/vipintom/vstack-openchamber .vstack/openchamber
\`\`\`

## Next Steps
- [Explore Playbook Skills](/playbook/skills/) — Browse all 55 skills by category
- [View Capability Matrix](/compatibility/) — Cross-harness support
- [Architecture Deep Dive](/architecture/) — Component relationships
- [Installation Guide](/install/) — Detailed instructions per component
  `.trim(),
  sourceNote: 'Installation commands verified from component package.json and manifest.json',
};

// ============================================================================
// Release Information (Homepage)
// ============================================================================

export const releaseInfo: EditorialContent = {
  id: 'release-info',
  type: 'other',
  target: '/',
  title: 'Current Release',
  body: `
## Integrated Release: **vstack-2026.11.03**

| Component | Version | Tag | Commit |
|-----------|---------|-----|--------|
| Playbook | 0.1.0 | v0.1.0 | b896c4fd |
| OpenCode Plugin | 0.1.0 | v0.1.0 | 848124ec |
| OpenChamber | 0.1.0 | v0.1.0 | 0987a428 |

**Compatibility**: Tested (clean-clone validation passed)

> **Note**: This tested status applies only to the specific component revisions above. It does not imply compatibility with other version combinations.
  `.trim(),
  sourceNote: 'Direct from integrated-release.json verified in Phase 1',
};

// ============================================================================
// All Editorial Content Export
// ============================================================================

export const allEditorialContent: EditorialContent[] = [
  heroContent,
  productIntros.playbook,
  productIntros.opencode,
  productIntros.openchamber,
  architectureSummary,
  productComparison,
  gettingStarted,
  releaseInfo,
];

export function getEditorialContentById(id: string): EditorialContent | undefined {
  return allEditorialContent.find(c => c.id === id);
}

export function getEditorialContentByTarget(target: string): EditorialContent[] {
  return allEditorialContent.filter(c => c.target === target);
}