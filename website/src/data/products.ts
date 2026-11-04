/**
 * Product Data - Canonical Website Data
 * 
 * Source: Verified from upstream repositories (Phase 1)
 * Last verified: 2026-11-04
 * Release context: vstack-2026.11.03
 */

import type {
  ProductData,
  ProductIdentity,
  ProductDependency,
  ProductCapabilitySummary,
  ProductInstallationPath,
  SourceProvenance,
} from './types.js';

// ============================================================================
// Shared Provenance
// ============================================================================

const PLAYBOOK_PROVENANCE: SourceProvenance = {
  repository: 'vipintom/vstack-playbook',
  path: 'manifest.json',
  revision: 'b896c4fd083c6fdf695756579acb03efb85ada65',
  verifiedAt: '2026-11-04',
  category: 'product',
};

const OPENCODE_PROVENANCE: SourceProvenance = {
  repository: 'vipintom/vstack-opencode',
  path: 'package.json, src/index.ts, src/tools/index.ts',
  revision: '848124ec9b0d545fb7560acfa8078a9a07340d55',
  verifiedAt: '2026-11-04',
  category: 'product',
};

const OPENCHAMBER_PROVENANCE: SourceProvenance = {
  repository: 'vipintom/vstack-openchamber',
  path: 'package.json, panel/main.ts, panel/src/components/Dashboard.ts',
  revision: '0987a428fd7423586c151d31eabef84eb18bfff8',
  verifiedAt: '2026-11-04',
  category: 'product',
};

const CAPABILITY_MATRIX_PROVENANCE: SourceProvenance = {
  repository: 'vipintom/vstack-playbook',
  path: 'docs/capability-matrix.md',
  revision: 'b896c4fd083c6fdf695756579acb03efb85ada65',
  verifiedAt: '2026-11-04',
  category: 'capability',
};

const INTEGRATED_RELEASE_PROVENANCE: SourceProvenance = {
  repository: 'vipintom/vstack',
  path: 'compatibility/integrated-release.json',
  revision: 'HEAD',
  verifiedAt: '2026-11-04',
  category: 'release',
};

// ============================================================================
// Playbook Product Data
// ============================================================================

export const playbookProduct: ProductData = {
  identity: {
    id: 'playbook',
    name: 'vstack Playbook',
    shortDescription: 'Portable playbook: 55 skills, 18 workflows, 17 principles. Works with OpenCode, Codex, and Claude Code.',
    description: 'The vstack Playbook is the reusable methodology and knowledge layer of the ecosystem. It provides structured guidance for agentic development through skills, workflows, principles, and roles. All content is Markdown/YAML with zero runtime code, making it portable across AI harnesses.',
    repository: 'https://github.com/vipintom/vstack-playbook',
    packageName: '@vipintom/vstack',
    version: '0.1.0',
    versionContext: 'integrated-release:vstack-2026.11.03',
    purpose: 'Define reusable methodology for AI-assisted development through skills, workflows, principles, and roles.',
    independentValue: 'The Playbook can be used independently without the OpenCode Plugin or OpenChamber. Skills and workflows are harness-agnostic Markdown procedures that work with any AI assistant supporting file operations.',
    limitations: [
      'Harness-specific features (subagents, read-only enforcement, worktree isolation) require adapter support',
      'Codex and Claude Code adapters are syntax-validated only; live validation pending',
    ],
    provenance: PLAYBOOK_PROVENANCE,
  },
  dependencies: [
    {
      name: 'Node.js',
      version: '>=20',
      type: 'required',
      description: 'Required for npm package installation and Skills CLI',
      provenance: { ...PLAYBOOK_PROVENANCE, path: 'package.json engines' },
    },
  ],
  capabilities: {
    total: 55,
    byStatus: {
      full: 52,
      partial: 2,
      planned: 1,
      none: 0,
      unknown: 0,
    },
    byCategory: {
      'Foundation': 4,
      'Discovery': 6,
      'Architecture': 10,
      'Planning': 8,
      'Verification': 7,
      'Debug/Recovery': 6,
      'Collaboration': 5,
      'Review': 8,
      'Continuity': 7,
      'Delivery': 5,
      'Extended': 9,
      'Implementation': 7,
      'Utils': 3,
    },
    provenance: CAPABILITY_MATRIX_PROVENANCE,
  },
  installation: [
    {
      id: 'playbook-skills-cli',
      name: 'OpenCode Skills CLI (Recommended)',
      command: 'opencode skill install vstack',
      prerequisites: ['OpenCode installed', 'Project initialized'],
      dependencies: [
        {
          name: 'OpenCode',
          package: '@opencode/cli',
          version: '>=2.2.0',
          type: 'required',
          description: 'OpenCode CLI with skill installation support',
          provenance: { ...PLAYBOOK_PROVENANCE, path: 'manifest.json compatibility.opencode' },
        },
      ],
      verification: 'documentation-verified',
      versionContext: '0.1.0',
      documentationUrl: 'https://github.com/vipintom/vstack-playbook#installation',
      provenance: PLAYBOOK_PROVENANCE,
    },
    {
      id: 'playbook-codex',
      name: 'Codex Skills',
      command: 'codex skill add vstack',
      prerequisites: ['Codex installed', 'Codex skills support'],
      dependencies: [
        {
          name: 'Codex',
          version: '>=0.1.0',
          type: 'required',
          description: 'Codex with skills configuration support',
          provenance: { ...PLAYBOOK_PROVENANCE, path: 'manifest.json compatibility.codex' },
        },
      ],
      verification: 'documentation-verified',
      versionContext: '0.1.0',
      documentationUrl: 'https://github.com/vipintom/vstack-playbook#codex',
      provenance: PLAYBOOK_PROVENANCE,
    },
    {
      id: 'playbook-claude-code',
      name: 'Claude Code Skills',
      command: 'claude skill install vstack',
      prerequisites: ['Claude Code installed', 'Claude Code skills support'],
      dependencies: [
        {
          name: 'Claude Code',
          version: '>=1.0.0',
          type: 'required',
          description: 'Claude Code with skills field support',
          provenance: { ...PLAYBOOK_PROVENANCE, path: 'manifest.json compatibility.claude-code' },
        },
      ],
      verification: 'documentation-verified',
      versionContext: '0.1.0',
      documentationUrl: 'https://github.com/vipintom/vstack-playbook#claude-code',
      provenance: PLAYBOOK_PROVENANCE,
    },
    {
      id: 'playbook-manual',
      name: 'Manual Download',
      command: 'Download vstack-playbook-0.1.0.tgz from GitHub Releases',
      prerequisites: ['Node.js >=20'],
      dependencies: [],
      verification: 'documentation-verified',
      versionContext: '0.1.0',
      documentationUrl: 'https://github.com/vipintom/vstack-playbook/releases',
      provenance: PLAYBOOK_PROVENANCE,
    },
  ],
  documentationUrls: [
    {
      label: 'Skills Reference',
      url: '/playbook/skills/',
      provenance: PLAYBOOK_PROVENANCE,
    },
    {
      label: 'Workflows Reference',
      url: '/playbook/workflows/',
      provenance: PLAYBOOK_PROVENANCE,
    },
    {
      label: 'Principles Reference',
      url: '/playbook/principles/',
      provenance: PLAYBOOK_PROVENANCE,
    },
    {
      label: 'Capability Matrix',
      url: '/compatibility/',
      provenance: CAPABILITY_MATRIX_PROVENANCE,
    },
    {
      label: 'GitHub Repository',
      url: 'https://github.com/vipintom/vstack-playbook',
      provenance: PLAYBOOK_PROVENANCE,
    },
    {
      label: 'npm Package',
      url: 'https://www.npmjs.com/package/@vipintom/vstack',
      provenance: PLAYBOOK_PROVENANCE,
    },
  ],
  releaseContext: 'vstack-2026.11.03',
};

// ============================================================================
// OpenCode Plugin Product Data
// ============================================================================

export const opencodePluginProduct: ProductData = {
  identity: {
    id: 'opencode-plugin',
    name: 'vstack OpenCode Plugin',
    shortDescription: 'OpenCode runtime: 23 tools, 3 agents, 6 stores, 7 gates. Persistent state, quality gates, specialist agents.',
    description: 'The vstack OpenCode Plugin is the harness-specific runtime and execution layer. It integrates the reusable Playbook methodology with OpenCode and provides runtime capabilities, state management, and published projections for OpenChamber visualization.',
    repository: 'https://github.com/vipintom/vstack-opencode',
    packageName: '@vipintom/vstack-opencode',
    version: '0.1.0',
    versionContext: 'integrated-release:vstack-2026.11.03',
    purpose: 'Provide OpenCode-specific runtime execution, persistent state, quality gates, and projection publishing.',
    independentValue: 'The OpenCode Plugin can be used with just OpenCode. It loads Playbook skills via the Skills CLI and provides the vstack_* tool namespace, agent definitions, and persistent stores.',
    limitations: [
      'Requires OpenCode >=2.2.0 (peer dependency)',
      'Only works with OpenCode harness',
      'Projection publishing requires OpenChamber for visualization (optional)',
    ],
    provenance: OPENCODE_PROVENANCE,
  },
  dependencies: [
    {
      name: '@opencode/plugin',
      package: '@opencode/plugin',
      version: '2.2.0',
      type: 'peer',
      description: 'OpenCode plugin API - exact version required',
      provenance: { ...OPENCODE_PROVENANCE, path: 'package.json dependencies' },
    },
    {
      name: '@opencode/schema',
      package: '@opencode/schema',
      version: '2.2.0',
      type: 'peer',
      description: 'OpenCode schema definitions',
      provenance: { ...OPENCODE_PROVENANCE, path: 'package.json dependencies' },
    },
    {
      name: 'vstack Playbook',
      package: '@vipintom/vstack',
      version: '0.1.0',
      type: 'companion',
      description: 'Playbook skills loaded via Skills CLI',
      provenance: { ...OPENCODE_PROVENANCE, path: 'src/index.ts skill loading' },
    },
  ],
  capabilities: {
    total: 23,
    byStatus: {
      full: 23,
      partial: 0,
      planned: 0,
      none: 0,
      unknown: 0,
    },
    byCategory: {
      'status': 1,
      'memory': 2,
      'history': 1,
      'delivery': 3,
      'task': 2,
      'agent': 1,
      'check': 1,
      'assignment': 1,
      'decision': 1,
      'checkpoint': 1,
      'lesson': 1,
      'recovery': 1,
      'verification': 1,
      'sessionPickup': 1,
      'verificationSkill': 1,
      'skillValidate': 1,
      'verificationMaintain': 1,
      'evaluation': 1,
      'lessonPromotion': 1,
      'review': 1,
      'release': 8,
      'workflow': 4,
      'quality': 5,
    },
    provenance: OPENCODE_PROVENANCE,
  },
  installation: [
    {
      id: 'opencode-npm',
      name: 'npm Installation',
      command: 'npm install @vipintom/vstack-opencode@0.1.0',
      prerequisites: ['OpenCode >=2.2.0 installed', 'Node.js >=20', 'Project initialized with OpenCode'],
      dependencies: [
        {
          name: '@opencode/plugin',
          package: '@opencode/plugin',
          version: '2.2.0',
          type: 'peer',
          description: 'Exact peer dependency - must match OpenCode version',
          provenance: { ...OPENCODE_PROVENANCE, path: 'package.json dependencies' },
        },
      ],
      verification: 'documentation-verified',
      versionContext: '0.1.0',
      documentationUrl: 'https://github.com/vipintom/vstack-opencode#installation',
      provenance: OPENCODE_PROVENANCE,
    },
  ],
  documentationUrls: [
    {
      label: 'Tools Reference',
      url: '/opencode-plugin/tools/',
      provenance: OPENCODE_PROVENANCE,
    },
    {
      label: 'Agents Reference',
      url: '/opencode-plugin/agents/',
      provenance: OPENCODE_PROVENANCE,
    },
    {
      label: 'Stores Reference',
      url: '/opencode-plugin/stores/',
      provenance: OPENCODE_PROVENANCE,
    },
    {
      label: 'Gates Reference',
      url: '/opencode-plugin/gates/',
      provenance: OPENCODE_PROVENANCE,
    },
    {
      label: 'Projections',
      url: '/opencode-plugin/projections/',
      provenance: OPENCODE_PROVENANCE,
    },
    {
      label: 'GitHub Repository',
      url: 'https://github.com/vipintom/vstack-opencode',
      provenance: OPENCODE_PROVENANCE,
    },
    {
      label: 'npm Package',
      url: 'https://www.npmjs.com/package/@vipintom/vstack-opencode',
      provenance: OPENCODE_PROVENANCE,
    },
  ],
  releaseContext: 'vstack-2026.11.03',
};

// ============================================================================
// OpenChamber Product Data
// ============================================================================

export const openchamberProduct: ProductData = {
  identity: {
    id: 'openchamber',
    name: 'vstack OpenChamber',
    shortDescription: 'Read-only panel for OpenChamber project knowledge. Notes, Todos, Plans visualization. React + TypeScript.',
    description: 'OpenChamber is a companion visualization interface for runtime information. It presents projections published by the OpenCode Plugin runtime through a Panel and Dashboard. Its role in this ecosystem is read-only visualization of those projections.',
    repository: 'https://github.com/vipintom/vstack-openchamber',
    packageName: '@vstack/openchamber',
    version: '0.1.0',
    versionContext: 'integrated-release:vstack-2026.11.03',
    purpose: 'Visualize runtime projections (deliveries, tasks, quality, activity, memory) through a read-only Panel and Dashboard.',
    independentValue: 'OpenChamber is an optional companion for visualizing vstack workflow state. It requires the OpenCode Plugin to publish projections but can be used independently to view any OpenChamber-compatible project data.',
    limitations: [
      'Read-only - does not mutate runtime state',
      'Requires @openchamber/sdk@2.5.3',
      'Requires OpenChamber host application (v1.24.0+)',
      'Requires vstack OpenCode Plugin to publish projections for vstack workflow data',
      'Distribution via Git URL or built ZIP only (not on npm)',
    ],
    provenance: OPENCHAMBER_PROVENANCE,
  },
  dependencies: [
    {
      name: '@openchamber/sdk',
      package: '@openchamber/sdk',
      version: '2.5.3',
      type: 'required',
      description: 'OpenChamber SDK for panel/page development',
      provenance: { ...OPENCHAMBER_PROVENANCE, path: 'package.json devDependencies' },
    },
    {
      name: 'OpenChamber Host',
      version: '>=1.24.0',
      type: 'required',
      description: 'OpenChamber application to load the panel/page',
      provenance: { ...OPENCHAMBER_PROVENANCE, path: 'package.json openchamber.engines' },
    },
    {
      name: 'vstack OpenCode Plugin',
      package: '@vipintom/vstack-opencode',
      version: '0.1.0',
      type: 'companion',
      description: 'Publishes projections that OpenChamber visualizes',
      provenance: { ...OPENCHAMBER_PROVENANCE, path: 'integrated-release.json' },
    },
  ],
  capabilities: {
    total: 2,
    byStatus: {
      full: 2,
      partial: 0,
      planned: 0,
      none: 0,
      unknown: 0,
    },
    byCategory: {
      'Panel': 1,
      'Dashboard': 1,
    },
    provenance: OPENCHAMBER_PROVENANCE,
  },
  installation: [
    {
      id: 'openchamber-git',
      name: 'Git Submodule / Clone',
      command: 'git submodule add https://github.com/vipintom/vstack-openchamber .vstack/openchamber',
      prerequisites: ['OpenChamber host installed', 'Git'],
      dependencies: [
        {
          name: '@openchamber/sdk',
          package: '@openchamber/sdk',
          version: '2.5.3',
          type: 'required',
          description: 'OpenChamber SDK',
          provenance: { ...OPENCHAMBER_PROVENANCE, path: 'package.json devDependencies' },
        },
      ],
      verification: 'documentation-verified',
      versionContext: '0.1.0',
      documentationUrl: 'https://github.com/vipintom/vstack-openchamber#installation',
      provenance: OPENCHAMBER_PROVENANCE,
    },
    {
      id: 'openchamber-zip',
      name: 'Built ZIP Distribution',
      command: 'Download openchamber-guest-bundle from GitHub Releases',
      prerequisites: ['OpenChamber host installed'],
      dependencies: [],
      verification: 'documentation-verified',
      versionContext: '0.1.0',
      documentationUrl: 'https://github.com/vipintom/vstack-openchamber/releases',
      provenance: OPENCHAMBER_PROVENANCE,
    },
  ],
  documentationUrls: [
    {
      label: 'Panel Overview',
      url: '/openchamber/',
      provenance: OPENCHAMBER_PROVENANCE,
    },
    {
      label: 'Notes',
      url: '/openchamber/notes/',
      provenance: OPENCHAMBER_PROVENANCE,
    },
    {
      label: 'Todos',
      url: '/openchamber/todos/',
      provenance: OPENCHAMBER_PROVENANCE,
    },
    {
      label: 'Plans',
      url: '/openchamber/plans/',
      provenance: OPENCHAMBER_PROVENANCE,
    },
    {
      label: 'Installation Guide',
      url: '/openchamber/installation/',
      provenance: OPENCHAMBER_PROVENANCE,
    },
    {
      label: 'GitHub Repository',
      url: 'https://github.com/vipintom/vstack-openchamber',
      provenance: OPENCHAMBER_PROVENANCE,
    },
  ],
  releaseContext: 'vstack-2026.11.03',
};

// ============================================================================
// All Products Export
// ============================================================================

export const allProducts = [
  playbookProduct,
  opencodePluginProduct,
  openchamberProduct,
] as const;

export type ProductId = 'playbook' | 'opencode-plugin' | 'openchamber';

export function getProductById(id: ProductId): ProductData {
  switch (id) {
    case 'playbook': return playbookProduct;
    case 'opencode-plugin': return opencodePluginProduct;
    case 'openchamber': return openchamberProduct;
  }
}