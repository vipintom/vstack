/**
 * Release Data - Canonical Website Data
 * 
 * Source: vstack/compatibility/integrated-release.json
 * Last verified: 2026-11-04
 */

import type {
  ReleaseData,
  ReleaseComponent,
  ReleaseCompatibility,
  SourceProvenance,
} from './types.js';

// ============================================================================
// Shared Provenance
// ============================================================================

const INTEGRATED_RELEASE_PROVENANCE: SourceProvenance = {
  repository: 'vipintom/vstack',
  path: 'compatibility/integrated-release.json',
  revision: 'HEAD',
  verifiedAt: '2026-11-04',
  category: 'release',
};

// ============================================================================
// Components
// ============================================================================

export const releaseComponents: ReleaseComponent[] = [
  {
    id: 'playbook',
    name: 'vstack Playbook',
    repository: 'vipintom/vstack-playbook',
    version: '0.1.0',
    tag: 'v0.1.0',
    commit: 'b896c4fd083c6fdf695756579acb03efb85ada65',
    provenance: {
      ...INTEGRATED_RELEASE_PROVENANCE,
      path: 'compatibility/integrated-release.json components.playbook',
    },
  },
  {
    id: 'opencode',
    name: 'vstack OpenCode Plugin',
    repository: 'vipintom/vstack-opencode',
    version: '0.1.0',
    tag: 'v0.1.0',
    commit: '848124ec9b0d545fb7560acfa8078a9a07340d55',
    provenance: {
      ...INTEGRATED_RELEASE_PROVENANCE,
      path: 'compatibility/integrated-release.json components.opencode',
    },
  },
  {
    id: 'openchamber',
    name: 'vstack OpenChamber',
    repository: 'vipintom/vstack-openchamber',
    version: '0.1.0',
    tag: 'v0.1.0',
    commit: '0987a428fd7423586c151d31eabef84eb18bfff8',
    provenance: {
      ...INTEGRATED_RELEASE_PROVENANCE,
      path: 'compatibility/integrated-release.json components.openchamber',
    },
  },
];

// ============================================================================
// Compatibility
// ============================================================================

export const releaseCompatibility: ReleaseCompatibility = {
  status: 'tested',
  notes: 'All components pass clean-clone validation. OpenCode: 103/103 tests pass (including E2E tests in repo). Playbook: 0 errors validation. OpenChamber: build + typecheck pass. Projection protocol v1 producer/consumer validated. Capability matrix updated for native subagent support in Codex/Claude Code. CSP headers added to OpenChamber panels.',
  evidenceSummary: '3 components, 3 harnesses, 55 skills, 18 playbooks, 3 roles tested. OpenCode live validated with E2E tests. Codex/Claude Code adapters syntax validated.',
  scope: 'This tested status applies ONLY to the specific component revisions identified in this release (vstack-2026.11.03). It does not imply compatibility with other version combinations or future releases.',
  provenance: {
    ...INTEGRATED_RELEASE_PROVENANCE,
    path: 'compatibility/integrated-release.json compatibility',
  },
};

// ============================================================================
// Integrated Release Data
// ============================================================================

export const integratedRelease: ReleaseData = {
  schemaVersion: 1,
  release: 'vstack-2026.11.03',
  releasedAt: '2026-11-03T15:00:00.000Z',
  components: releaseComponents,
  protocolVersion: '1',
  compatibility: releaseCompatibility,
  provenance: INTEGRATED_RELEASE_PROVENANCE,
};

// ============================================================================
// Helper Functions
// ============================================================================

export function getComponentById(id: string): ReleaseComponent | undefined {
  return releaseComponents.find(c => c.id === id);
}

export function getComponentRepositoryUrl(component: ReleaseComponent): string {
  return `https://github.com/${component.repository}`;
}

export function getComponentTagUrl(component: ReleaseComponent): string {
  return `https://github.com/${component.repository}/tree/${component.tag}`;
}

export function getComponentCommitUrl(component: ReleaseComponent): string {
  return `https://github.com/${component.repository}/commit/${component.commit}`;
}

// ============================================================================
// Release Terminology (from PRD)
// ============================================================================

export const releaseTerminology = {
  latest: {
    term: 'Latest',
    meaning: 'Most recent published version known to the website',
    warning: 'Only use when evidence establishes this fact',
  },
  integratedRelease: {
    term: 'Integrated Release',
    meaning: 'A release record identifying coordinated component revisions',
    example: 'vstack-2026.11.03',
  },
  tested: {
    term: 'Tested',
    meaning: 'A compatibility claim supported by an explicit test record',
    warning: 'Must identify scope and specific component revisions',
  },
  supported: {
    term: 'Supported',
    meaning: 'A version or combination explicitly declared supported',
  },
  documented: {
    term: 'Documented',
    meaning: 'A version or combination covered by the available documentation',
  },
} as const;

// ============================================================================
// Version Context Helpers
// ============================================================================

export function formatReleaseContext(release: ReleaseData): string {
  return `Integrated release ${release.release} (${new Date(release.releasedAt).toLocaleDateString()})`;
}

export function getReleaseBadgeText(release: ReleaseData): string {
  return `${release.release} · ${release.compatibility.status}`;
}