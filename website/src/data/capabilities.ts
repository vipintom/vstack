/**
 * Capability Data - Canonical Website Data
 * 
 * Source: vstack-playbook/docs/capability-matrix.md (verified 2026-11-04)
 * Release context: vstack-2026.11.03
 * 55 skills across 13 categories
 * Status values: full, partial, planned, none, unknown
 */

import type {
  CapabilityEntry,
  CapabilityCategory,
  CapabilityData,
  SourceProvenance,
  EvidenceClassification,
} from './types.js';

// ============================================================================
// Shared Provenance
// ============================================================================

const CAPABILITY_PROVENANCE: SourceProvenance = {
  repository: 'vipintom/vstack-playbook',
  path: 'docs/capability-matrix.md',
  revision: 'b896c4fd083c6fdf695756579acb03efb85ada65',
  verifiedAt: '2026-11-04',
  category: 'capability',
};

// ============================================================================
// Helper to create capabilities with consistent provenance
// ============================================================================

function createCapability(
  id: string,
  name: string,
  category: string,
  component: 'playbook' | 'opencode' | 'openchamber',
  status: CapabilityEntry['status'],
  description: string,
  notes?: string,
  documentationRef?: string,
  evidence: EvidenceClassification = 'verified'
): CapabilityEntry {
  return {
    id,
    name,
    category,
    component,
    description,
    status,
    notes,
    documentationRef,
    versionContext: 'vstack-2026.11.03',
    provenance: CAPABILITY_PROVENANCE,
    evidence,
  };
}

// ============================================================================
// All 55 Playbook Capabilities (from capability-matrix.md)
// ============================================================================

const playbookCapabilities: CapabilityEntry[] = [
  // Foundation (4 skills)
  createCapability(
    'using-superpowers',
    'using-superpowers',
    'Foundation',
    'playbook',
    { opencode: 'full', codex: 'full', claudeCode: 'full' },
    'Core routing skill; loads playbooks',
    'Core routing skill',
    '/playbook/skills/using-superpowers/'
  ),
  createCapability(
    'find-skills',
    'find-skills',
    'Foundation',
    'playbook',
    { opencode: 'full', codex: 'full', claudeCode: 'full' },
    'Discover and install skills',
    'Read only (reference)',
    '/playbook/skills/find-skills/'
  ),
  createCapability(
    'vstack-help',
    'vstack-help',
    'Foundation',
    'playbook',
    { opencode: 'full', codex: 'full', claudeCode: 'full' },
    'Quick reference for vstack skills and workflows',
    'Read only (reference)',
    '/playbook/skills/vstack-help/'
  ),
  createCapability(
    'vstack-principles',
    'vstack-principles',
    'Foundation',
    'playbook',
    { opencode: 'full', codex: 'full', claudeCode: 'full' },
    'Reference for all 17 engineering principles',
    'Read only (reference)',
    '/playbook/skills/vstack-principles/'
  ),

  // Discovery (6 skills)
  createCapability(
    'vstack-how',
    'vstack-how',
    'Discovery',
    'playbook',
    { opencode: 'full', codex: 'full', claudeCode: 'full' },
    'Code walkthroughs and runtime behavior explanations',
    'Read/glob/grep/bash only',
    '/playbook/skills/vstack-how/'
  ),
  createCapability(
    'vstack-why',
    'vstack-why',
    'Discovery',
    'playbook',
    { opencode: 'full', codex: 'full', claudeCode: 'full' },
    'Investigate design rationale using git history, PRs, ADRs',
    'Read/glob/grep/bash only',
    '/playbook/skills/vstack-why/'
  ),
  createCapability(
    'vstack-blast-radius',
    'vstack-blast-radius',
    'Discovery',
    'playbook',
    { opencode: 'full', codex: 'full', claudeCode: 'full' },
    'Identify affected callers, components, data contracts for proposed changes',
    'Read/glob/grep/bash only',
    '/playbook/skills/vstack-blast-radius/'
  ),
  createCapability(
    'vstack-explain',
    'vstack-explain',
    'Discovery',
    'playbook',
    { opencode: 'full', codex: 'full', claudeCode: 'full' },
    'Produce concise, source-grounded explanations from discovery findings',
    'Read/glob/grep/bash only',
    '/playbook/skills/vstack-explain/'
  ),
  createCapability(
    'vstack-recall',
    'vstack-recall',
    'Discovery',
    'playbook',
    { opencode: 'full', codex: 'full', claudeCode: 'full' },
    'Retrieve relevant project knowledge and previous decisions',
    'Read/glob/grep for memory',
    '/playbook/skills/vstack-recall/'
  ),
  createCapability(
    'vstack-figure-it-out',
    'vstack-figure-it-out',
    'Discovery',
    'playbook',
    { opencode: 'full', codex: 'full', claudeCode: 'full' },
    'Design bespoke playbooks when no existing one fits',
    'Composes other skills',
    '/playbook/skills/vstack-figure-it-out/'
  ),

  // Architecture (10 skills)
  createCapability(
    'vstack-architect',
    'vstack-architect',
    'Architecture',
    'playbook',
    { opencode: 'full', codex: 'full', claudeCode: 'full' },
    'Cross-boundary design: sketch types, signatures, module structure before code',
    'Requires vstack-arena for alternatives',
    '/playbook/skills/vstack-architect/'
  ),
  createCapability(
    'vstack-blueprint',
    'vstack-blueprint',
    'Architecture',
    'playbook',
    { opencode: 'full', codex: 'full', claudeCode: 'full' },
    'Turn accepted design into interfaces, components, data flows',
    'Write/edit needed for design artifacts',
    '/playbook/skills/vstack-blueprint/'
  ),
  createCapability(
    'vstack-design-audit',
    'vstack-design-audit',
    'Architecture',
    'playbook',
    { opencode: 'full', codex: 'full', claudeCode: 'full' },
    'Audit existing design or implementation against quality attributes',
    'Read/glob/grep/bash only',
    '/playbook/skills/vstack-design-audit/'
  ),
  createCapability(
    'migration',
    'migration',
    'Architecture',
    'playbook',
    { opencode: 'full', codex: 'full', claudeCode: 'full' },
    'Implement reversible compatibility-safe transitions',
    'Bash for migration commands',
    '/playbook/skills/migration/'
  ),
  createCapability(
    'vstack-performance',
    'vstack-performance',
    'Architecture',
    'playbook',
    { opencode: 'full', codex: 'full', claudeCode: 'full' },
    'Establish baseline and investigate measured performance issues',
    'Bash for profiling/benchmarks',
    '/playbook/skills/vstack-performance/'
  ),
  createCapability(
    'api-designer',
    'api-designer',
    'Architecture',
    'playbook',
    { opencode: 'full', codex: 'full', claudeCode: 'full' },
    'Design REST/GraphQL APIs, create OpenAPI specifications',
    'Write/edit for API design',
    '/playbook/skills/api-designer/'
  ),
  createCapability(
    'graphql-schema',
    'graphql-schema',
    'Architecture',
    'playbook',
    { opencode: 'full', codex: 'full', claudeCode: 'full' },
    'Design and change GraphQL schemas following best practices',
    'Write/edit for GraphQL schemas',
    '/playbook/skills/graphql-schema/'
  ),
  createCapability(
    'apollo-federation',
    'apollo-federation',
    'Architecture',
    'playbook',
    { opencode: 'full', codex: 'full', claudeCode: 'full' },
    'Author Apollo Federation subgraph schemas',
    'Write/edit for federation schemas',
    '/playbook/skills/apollo-federation/'
  ),
  createCapability(
    'angular-dashboard',
    'angular-dashboard',
    'Architecture',
    'playbook',
    { opencode: 'full', codex: 'full', claudeCode: 'full' },
    'Angular dashboard development with RxJS, forms, charts',
    'Write/edit for Angular',
    '/playbook/skills/angular-dashboard/'
  ),
  createCapability(
    'frontend-design',
    'frontend-design',
    'Architecture',
    'playbook',
    { opencode: 'full', codex: 'partial', claudeCode: 'planned' },
    'Guidance for distinctive, intentional visual design',
    'Write/edit for design',
    '/playbook/skills/frontend-design/'
  ),

  // Planning (8 skills)
  createCapability(
    'vstack-mode',
    'vstack-mode',
    'Planning',
    'playbook',
    { opencode: 'full', codex: 'full', claudeCode: 'full' },
    'Central operating entry point: frames outcome, reads principles, selects playbook',
    'Core routing skill; loads playbooks',
    '/playbook/skills/vstack-mode/'
  ),
  createCapability(
    'vstack-sharpen',
    'vstack-sharpen',
    'Planning',
    'playbook',
    { opencode: 'full', codex: 'full', claudeCode: 'full' },
    'Clarify and improve underspecified requests',
    'Write/edit for brief',
    '/playbook/skills/vstack-sharpen/'
  ),
  createCapability(
    'vstack-plan-loop',
    'vstack-plan-loop',
    'Planning',
    'playbook',
    { opencode: 'full', codex: 'full', claudeCode: 'full' },
    'Create, challenge and refine actionable plans',
    'TodoWrite/TodoRead or todo tool',
    '/playbook/skills/vstack-plan-loop/'
  ),
  createCapability(
    'vstack-plan-review',
    'vstack-plan-review',
    'Planning',
    'playbook',
    { opencode: 'full', codex: 'full', claudeCode: 'full' },
    'Independently challenge assumptions, omissions, dependencies in a plan',
    'Read/glob/grep only',
    '/playbook/skills/vstack-plan-review/'
  ),
  createCapability(
    'writing-plans',
    'writing-plans',
    'Planning',
    'playbook',
    { opencode: 'full', codex: 'full', claudeCode: 'full' },
    'Write implementation plans for multi-step tasks',
    'Write/edit for plan creation',
    '/playbook/skills/writing-plans/'
  ),
  createCapability(
    'vstack-incremental-build',
    'vstack-incremental-build',
    'Planning',
    'playbook',
    { opencode: 'full', codex: 'full', claudeCode: 'full' },
    'Keep implementation changes small, reviewable and verifiable',
    'Write/edit/bash for implementation',
    '/playbook/skills/vstack-incremental-build/'
  ),
  createCapability(
    'vstack-best-of-n',
    'vstack-best-of-n',
    'Planning',
    'playbook',
    { opencode: 'full', codex: 'full', claudeCode: 'full' },
    'Run bounded independent attempts for competing solutions',
    'Parallel candidates via subagents (all 3 harnesses)',
    '/playbook/skills/vstack-best-of-n/'
  ),
  createCapability(
    'vstack-ship',
    'vstack-ship',
    'Planning',
    'playbook',
    { opencode: 'full', codex: 'full', claudeCode: 'full' },
    'Execute explicitly authorized delivery actions',
    'Bash for git/PR commands',
    '/playbook/skills/vstack-ship/'
  ),

  // Verification (7 skills)
  createCapability(
    'vstack-tdd',
    'vstack-tdd',
    'Verification',
    'playbook',
    { opencode: 'full', codex: 'full', claudeCode: 'full' },
    'Test-first implementation: Red-Green-Refactor with mandatory failure verification',
    'Write/edit/bash for test-first',
    '/playbook/skills/vstack-tdd/'
  ),
  createCapability(
    'vstack-verify-loop',
    'vstack-verify-loop',
    'Verification',
    'playbook',
    { opencode: 'full', codex: 'full', claudeCode: 'full' },
    'Broad verification execution: test suites, integration checks, acceptance criteria',
    'Bash for test execution, vstack_check tool',
    '/playbook/skills/vstack-verify-loop/'
  ),
  createCapability(
    'vstack-create-verification',
    'vstack-create-verification',
    'Verification',
    'playbook',
    { opencode: 'full', codex: 'full', claudeCode: 'full' },
    'Inspect project and create project-specific verification skill',
    'Write/edit for verification artifacts',
    '/playbook/skills/vstack-create-verification/'
  ),
  createCapability(
    'vstack-maintain-verification',
    'vstack-maintain-verification',
    'Verification',
    'playbook',
    { opencode: 'full', codex: 'full', claudeCode: 'full' },
    'Keep project verification instructions aligned with actual code',
    'Write/edit for updates',
    '/playbook/skills/vstack-maintain-verification/'
  ),
  createCapability(
    'vstack-verification-audit',
    'vstack-verification-audit',
    'Verification',
    'playbook',
    { opencode: 'full', codex: 'full', claudeCode: 'full' },
    'Identify untested acceptance criteria, weak checks, gaps',
    'Read/glob/grep/bash for audit',
    '/playbook/skills/vstack-verification-audit/'
  ),
  createCapability(
    'test-driven-development',
    'test-driven-development',
    'Verification',
    'playbook',
    { opencode: 'full', codex: 'full', claudeCode: 'full' },
    'Test-first implementation for bug fixes with clear, cheap test paths',
    'Write/edit/bash for test-first',
    '/playbook/skills/test-driven-development/'
  ),
  createCapability(
    'safe-refactor',
    'safe-refactor',
    'Verification',
    'playbook',
    { opencode: 'full', codex: 'full', claudeCode: 'full' },
    'Restructure code while preserving behavior with verification',
    'Write/edit/bash with verification',
    '/playbook/skills/safe-refactor/'
  ),

  // Debug/Recovery (6 skills)
  createCapability(
    'vstack-debug',
    'vstack-debug',
    'Debug/Recovery',
    'playbook',
    { opencode: 'full', codex: 'full', claudeCode: 'full' },
    'Systematic root cause investigation: reproduce, gather evidence, test fix',
    'Bash for reproduction, write/edit for fix',
    '/playbook/skills/vstack-debug/'
  ),
  createCapability(
    'vstack-recovery',
    'vstack-recovery',
    'Debug/Recovery',
    'playbook',
    { opencode: 'full', codex: 'full', claudeCode: 'full' },
    'Restore safe state after failed, interrupted or partially applied work',
    'Bash for git restore, write/edit for fixes',
    '/playbook/skills/vstack-recovery/'
  ),
  createCapability(
    'vstack-runtime-forensics',
    'vstack-runtime-forensics',
    'Debug/Recovery',
    'playbook',
    { opencode: 'full', codex: 'full', claudeCode: 'full' },
    'Diagnose live runtime symptoms using available instrumentation',
    'Bash for logs/traces',
    '/playbook/skills/vstack-runtime-forensics/'
  ),
  createCapability(
    'vstack-trace-forensics',
    'vstack-trace-forensics',
    'Debug/Recovery',
    'playbook',
    { opencode: 'full', codex: 'full', claudeCode: 'full' },
    'Interpret profiling, tracing or memory artifacts',
    'Bash for distributed traces',
    '/playbook/skills/vstack-trace-forensics/'
  ),
  createCapability(
    'systematic-debugging',
    'systematic-debugging',
    'Debug/Recovery',
    'playbook',
    { opencode: 'full', codex: 'full', claudeCode: 'full' },
    'Diagnose ambiguous failures before editing',
    'Bash for reproduction, write/edit for fix',
    '/playbook/skills/systematic-debugging/'
  ),
  createCapability(
    'vstack-unstick',
    'vstack-unstick',
    'Debug/Recovery',
    'playbook',
    { opencode: 'full', codex: 'full', claudeCode: 'full' },
    'Break out of repeating failure cycles',
    'Read/glob/grep/bash; write for fix attempts',
    '/playbook/skills/vstack-unstick/'
  ),

  // Collaboration (5 skills)
  createCapability(
    'subagent-driven-development',
    'subagent-driven-development',
    'Collaboration',
    'playbook',
    { opencode: 'full', codex: 'full', claudeCode: 'full' },
    'Execute implementation plans with independent tasks via subagents',
    'Parallel subagents (all 3 harnesses)',
    '/playbook/skills/subagent-driven-development/'
  ),
  createCapability(
    'dispatching-parallel-agents',
    'dispatching-parallel-agents',
    'Collaboration',
    'playbook',
    { opencode: 'full', codex: 'full', claudeCode: 'full' },
    'Fan out 2+ independent tasks that can be worked without shared state',
    'Parallel subagents (all 3 harnesses)',
    '/playbook/skills/dispatching-parallel-agents/'
  ),
  createCapability(
    'vstack-swarm',
    'vstack-swarm',
    'Collaboration',
    'playbook',
    { opencode: 'full', codex: 'full', claudeCode: 'full' },
    'Fan out N parallel workers for coverage matrices, races, gauntlets',
    'Parallel builders via subagents (all 3 harnesses)',
    '/playbook/skills/vstack-swarm/'
  ),
  createCapability(
    'vstack-jury',
    'vstack-jury',
    'Collaboration',
    'playbook',
    { opencode: 'full', codex: 'full', claudeCode: 'full' },
    'Coordinate 2-3 independent reviewers for high-risk work',
    'Multiple reviewers via subagents (all 3 harnesses)',
    '/playbook/skills/vstack-jury/'
  ),
  createCapability(
    'vstack-handoff',
    'vstack-handoff',
    'Collaboration',
    'playbook',
    { opencode: 'full', codex: 'full', claudeCode: 'full' },
    'Create complete worker-to-Lead or session-to-session handoff',
    'Write/edit for handoff docs',
    '/playbook/skills/vstack-handoff/'
  ),

  // Review (7 skills)
  createCapability(
    'vstack-review-loop',
    'vstack-review-loop',
    'Review',
    'playbook',
    { opencode: 'full', codex: 'full', claudeCode: 'full' },
    'Obtain fresh-context review and resolve findings',
    'Read/glob/grep/bash; reviewer needs read-only',
    '/playbook/skills/vstack-review-loop/'
  ),
  createCapability(
    'receiving-code-review',
    'receiving-code-review',
    'Review',
    'playbook',
    { opencode: 'full', codex: 'full', claudeCode: 'full' },
    'Handle code review feedback with technical rigor',
    'Read/glob/grep/bash for feedback',
    '/playbook/skills/receiving-code-review/'
  ),
  createCapability(
    'requesting-code-review',
    'requesting-code-review',
    'Review',
    'playbook',
    { opencode: 'full', codex: 'full', claudeCode: 'full' },
    'Prepare focused, reviewable PR with evidence',
    'Write/edit for PR preparation',
    '/playbook/skills/requesting-code-review/'
  ),
  createCapability(
    'caveman-review',
    'caveman-review',
    'Review',
    'playbook',
    { opencode: 'full', codex: 'full', claudeCode: 'full' },
    'Compressed code review - one line per finding',
    'Compressed code review',
    '/playbook/skills/caveman-review/'
  ),
  createCapability(
    'vstack-review-rubrics',
    'vstack-review-rubrics',
    'Review',
    'playbook',
    { opencode: 'full', codex: 'full', claudeCode: 'full' },
    'Supply reusable review lenses for security, performance, etc.',
    'Read/glob/grep for rubric files',
    '/playbook/skills/vstack-review-rubrics/'
  ),
  createCapability(
    'vstack-interrogate',
    'vstack-interrogate',
    'Review',
    'playbook',
    { opencode: 'full', codex: 'full', claudeCode: 'full' },
    'Adversarial review: adversaries try to break a change/design',
    'Read/glob/grep/bash for adversarial review',
    '/playbook/skills/vstack-interrogate/'
  ),

  // Continuity (7 skills)
  createCapability(
    'vstack-session-pickup',
    'vstack-session-pickup',
    'Continuity',
    'playbook',
    { opencode: 'full', codex: 'full', claudeCode: 'full' },
    'Resume or take over in-flight work from prior session',
    'Read/glob/grep for state reconstruction',
    '/playbook/skills/vstack-session-pickup/'
  ),
  createCapability(
    'vstack-safe-pause',
    'vstack-safe-pause',
    'Continuity',
    'playbook',
    { opencode: 'full', codex: 'full', claudeCode: 'full' },
    'Leave work in clean, resumable and non-misleading state',
    'Write/edit for checkpoint',
    '/playbook/skills/vstack-safe-pause/'
  ),
  createCapability(
    'vstack-catchup',
    'vstack-catchup',
    'Continuity',
    'playbook',
    { opencode: 'full', codex: 'full', claudeCode: 'full' },
    'Reconstruct current task or project context after interruption',
    'Read/glob/grep for reconciliation',
    '/playbook/skills/vstack-catchup/'
  ),
  createCapability(
    'vstack-context-reset',
    'vstack-context-reset',
    'Continuity',
    'playbook',
    { opencode: 'full', codex: 'full', claudeCode: 'full' },
    'Preserve progress and resume after context interruption',
    'Write/edit for PROGRESS.md',
    '/playbook/skills/vstack-context-reset/'
  ),
  createCapability(
    'vstack-ledger',
    'vstack-ledger',
    'Continuity',
    'playbook',
    { opencode: 'full', codex: 'full', claudeCode: 'full' },
    'Record important decisions, pivots, failed approaches and evidence',
    'Write/edit for decision trail',
    '/playbook/skills/vstack-ledger/'
  ),
  createCapability(
    'vstack-lessons',
    'vstack-lessons',
    'Continuity',
    'playbook',
    { opencode: 'full', codex: 'full', claudeCode: 'full' },
    'Convert recurring mistakes into durable improvements',
    'Write/edit for lessons learned',
    '/playbook/skills/vstack-lessons/'
  ),

  // Delivery (5 skills)
  createCapability(
    'vstack-ready',
    'vstack-ready',
    'Delivery',
    'playbook',
    { opencode: 'full', codex: 'full', claudeCode: 'full' },
    'Produce merge-readiness assessment without merging',
    'Read/glob/grep/bash',
    '/playbook/skills/vstack-ready/'
  ),
  createCapability(
    'vstack-pr',
    'vstack-pr',
    'Delivery',
    'playbook',
    { opencode: 'full', codex: 'full', claudeCode: 'full' },
    'Prepare focused, reviewable pull request with evidence',
    'Bash for gh CLI',
    '/playbook/skills/vstack-pr/'
  ),
  createCapability(
    'vstack-watch-pr',
    'vstack-watch-pr',
    'Delivery',
    'playbook',
    { opencode: 'full', codex: 'partial', claudeCode: 'partial' },
    'Monitor CI and review findings, then address and reverify',
    'Needs background/long-running; fallback: polling',
    '/playbook/skills/vstack-watch-pr/'
  ),
  createCapability(
    'finishing-a-development-branch',
    'finishing-a-development-branch',
    'Delivery',
    'playbook',
    { opencode: 'full', codex: 'full', claudeCode: 'full' },
    'Decide how to integrate work when implementation complete',
    'Bash for git/PR commands',
    '/playbook/skills/finishing-a-development-branch/'
  ),
  createCapability(
    'devops-engineer',
    'devops-engineer',
    'Delivery',
    'playbook',
    { opencode: 'full', codex: 'full', claudeCode: 'full' },
    'Create Dockerfiles, CI/CD pipelines, Kubernetes manifests, Terraform',
    'Write/edit/bash for CI/CD',
    '/playbook/skills/devops-engineer/'
  ),

  // Extended (9 skills)
  createCapability(
    'hallmark',
    'hallmark',
    'Extended',
    'playbook',
    { opencode: 'full', codex: 'partial', claudeCode: 'planned' },
    'Design skill for websites and new pages that look designed, not generated',
    'Write/edit for design',
    '/playbook/skills/hallmark/'
  ),
  createCapability(
    'vstack-skill-authoring',
    'vstack-skill-authoring',
    'Extended',
    'playbook',
    { opencode: 'full', codex: 'full', claudeCode: 'full' },
    'Write skills to v2 contract standard: draft, validate, evaluate',
    'Write/edit for skill creation',
    '/playbook/skills/vstack-skill-authoring/'
  ),
  createCapability(
    'vstack-skill-evaluation',
    'vstack-skill-evaluation',
    'Extended',
    'playbook',
    { opencode: 'full', codex: 'partial', claudeCode: 'partial' },
    'Evaluate skill trigger accuracy, procedure quality, outputs',
    'Cross-harness testing needs all 3 harnesses',
    '/playbook/skills/vstack-skill-evaluation/'
  ),
  createCapability(
    'vstack-visual-parity',
    'vstack-visual-parity',
    'Extended',
    'playbook',
    { opencode: 'full', codex: 'full', claudeCode: 'full' },
    'Verify UI behaviour and visual appearance against defined reference',
    'Read/glob/grep/bash; visual diff tools if available',
    '/playbook/skills/vstack-visual-parity/'
  ),
  createCapability(
    'vstack-arena',
    'vstack-arena',
    'Extended',
    'playbook',
    { opencode: 'full', codex: 'full', claudeCode: 'full' },
    'Parallel candidate generation, cross-judgment, base selection, grafting',
    'Parallel eval via subagents (all 3 harnesses)',
    '/playbook/skills/vstack-arena/'
  ),

  // Implementation (4 skills)
  createCapability(
    'data-pipeline',
    'data-pipeline',
    'Implementation',
    'playbook',
    { opencode: 'full', codex: 'full', claudeCode: 'full' },
    'Python data pipelines for OCR PDF extraction, ETL, sampling',
    'Write/edit/bash for pipelines',
    '/playbook/skills/data-pipeline/'
  ),
  createCapability(
    'fastapi-backend',
    'fastapi-backend',
    'Implementation',
    'playbook',
    { opencode: 'full', codex: 'full', claudeCode: 'full' },
    'FastAPI Python async backend with SQLAlchemy 2.0, PostgreSQL',
    'Write/edit for FastAPI',
    '/playbook/skills/fastapi-backend/'
  ),
  createCapability(
    'bubbletea',
    'bubbletea',
    'Implementation',
    'playbook',
    { opencode: 'full', codex: 'full', claudeCode: 'full' },
    'Build terminal user interfaces with Go and Bubbletea framework',
    'Write/edit for TUI apps',
    '/playbook/skills/bubbletea/'
  ),
  createCapability(
    'vstack-refactor',
    'vstack-refactor',
    'Implementation',
    'playbook',
    { opencode: 'full', codex: 'full', claudeCode: 'full' },
    'Preserve behaviour while improving structure with equivalence evidence',
    'Write/edit/bash with verification',
    '/playbook/skills/vstack-refactor/'
  ),

  // Utils (3 skills) - NEW in v0.1.0
  createCapability(
    'docker-compose',
    'docker-compose',
    'Utils',
    'playbook',
    { opencode: 'full', codex: 'full', claudeCode: 'full' },
    'Multi-stage Dockerfiles, compose overrides, dotenvx secrets, health checks',
    'Read/write/bash for Dockerfiles, compose',
    '/playbook/skills/docker-compose/'
  ),
  createCapability(
    'makefile',
    'makefile',
    'Utils',
    'playbook',
    { opencode: 'full', codex: 'full', claudeCode: 'full' },
    'Self-documenting targets, dotenvx integration, env-specific commands',
    'Read/write/bash for Makefiles',
    '/playbook/skills/makefile/'
  ),
  createCapability(
    'gitignore',
    'gitignore',
    'Utils',
    'playbook',
    { opencode: 'full', codex: 'full', claudeCode: 'full' },
    'Universal + language-specific .gitignore patterns',
    'Read/write for .gitignore patterns',
    '/playbook/skills/gitignore/'
  ),
];

// ============================================================================
// OpenCode Plugin Capabilities (23 tools)
// ============================================================================

const opencodeCapabilities: CapabilityEntry[] = [
  // Status tools
  createCapability(
    'vstack_status',
    'vstack_status',
    'status',
    'opencode',
    { opencode: 'full', codex: 'none', claudeCode: 'none' },
    'Show vstack system status and configuration',
    'OpenCode-only tool',
    '/opencode-plugin/tools/#vstack_status',
    'verified'
  ),

  // Memory tools
  createCapability(
    'vstack_memory',
    'vstack_memory',
    'memory',
    'opencode',
    { opencode: 'full', codex: 'none', claudeCode: 'none' },
    'Manage project memory: notes, decisions, patterns',
    'OpenCode-only tool',
    '/opencode-plugin/tools/#vstack_memory',
    'verified'
  ),
  createCapability(
    'vstack_memory_search',
    'vstack_memory_search',
    'memory',
    'opencode',
    { opencode: 'full', codex: 'none', claudeCode: 'none' },
    'Search project memory entries',
    'OpenCode-only tool',
    '/opencode-plugin/tools/#vstack_memory_search',
    'verified'
  ),

  // History tools
  createCapability(
    'vstack_history',
    'vstack_history',
    'history',
    'opencode',
    { opencode: 'full', codex: 'none', claudeCode: 'none' },
    'View and query delivery history and events',
    'OpenCode-only tool',
    '/opencode-plugin/tools/#vstack_history',
    'verified'
  ),

  // Delivery tools
  createCapability(
    'vstack_delivery',
    'vstack_delivery',
    'delivery',
    'opencode',
    { opencode: 'full', codex: 'none', claudeCode: 'none' },
    'Create and manage deliveries (work units)',
    'OpenCode-only tool',
    '/opencode-plugin/tools/#vstack_delivery',
    'verified'
  ),
  createCapability(
    'vstack_delivery_list',
    'vstack_delivery_list',
    'delivery',
    'opencode',
    { opencode: 'full', codex: 'none', claudeCode: 'none' },
    'List all deliveries with filters',
    'OpenCode-only tool',
    '/opencode-plugin/tools/#vstack_delivery_list',
    'verified'
  ),
  createCapability(
    'vstack_delivery_advance',
    'vstack_delivery_advance',
    'delivery',
    'opencode',
    { opencode: 'full', codex: 'none', claudeCode: 'none' },
    'Advance delivery to next phase',
    'OpenCode-only tool',
    '/opencode-plugin/tools/#vstack_delivery_advance',
    'verified'
  ),

  // Task tools
  createCapability(
    'vstack_task',
    'vstack_task',
    'task',
    'opencode',
    { opencode: 'full', codex: 'none', claudeCode: 'none' },
    'Create and manage tasks within deliveries',
    'OpenCode-only tool',
    '/opencode-plugin/tools/#vstack_task',
    'verified'
  ),
  createCapability(
    'vstack_task_list',
    'vstack_task_list',
    'task',
    'opencode',
    { opencode: 'full', codex: 'none', claudeCode: 'none' },
    'List tasks with filtering and sorting',
    'OpenCode-only tool',
    '/opencode-plugin/tools/#vstack_task_list',
    'verified'
  ),

  // Agent tools
  createCapability(
    'vstack_agent',
    'vstack_agent',
    'agent',
    'opencode',
    { opencode: 'full', codex: 'none', claudeCode: 'none' },
    'Dispatch and manage specialist agents (Builder, Reviewer, Lead)',
    'OpenCode-only tool',
    '/opencode-plugin/tools/#vstack_agent',
    'verified'
  ),

  // Check tools
  createCapability(
    'vstack_check',
    'vstack_check',
    'check',
    'opencode',
    { opencode: 'full', codex: 'none', claudeCode: 'none' },
    'Run verification checks and quality gates',
    'OpenCode-only tool',
    '/opencode-plugin/tools/#vstack_check',
    'verified'
  ),

  // Phase 2 tools
  createCapability(
    'vstack_assignment',
    'vstack_assignment',
    'assignment',
    'opencode',
    { opencode: 'full', codex: 'none', claudeCode: 'none' },
    'Manage task assignments and ownership',
    'OpenCode-only tool',
    '/opencode-plugin/tools/#vstack_assignment',
    'verified'
  ),
  createCapability(
    'vstack_decision',
    'vstack_decision',
    'decision',
    'opencode',
    { opencode: 'full', codex: 'none', claudeCode: 'none' },
    'Record and query architectural decisions',
    'OpenCode-only tool',
    '/opencode-plugin/tools/#vstack_decision',
    'verified'
  ),
  createCapability(
    'vstack_checkpoint',
    'vstack_checkpoint',
    'checkpoint',
    'opencode',
    { opencode: 'full', codex: 'none', claudeCode: 'none' },
    'Create and manage checkpoints for safe pause/resume',
    'OpenCode-only tool',
    '/opencode-plugin/tools/#vstack_checkpoint',
    'verified'
  ),
  createCapability(
    'vstack_lesson',
    'vstack_lesson',
    'lesson',
    'opencode',
    { opencode: 'full', codex: 'none', claudeCode: 'none' },
    'Capture and promote lessons learned',
    'OpenCode-only tool',
    '/opencode-plugin/tools/#vstack_lesson',
    'verified'
  ),
  createCapability(
    'vstack_recovery',
    'vstack_recovery',
    'recovery',
    'opencode',
    { opencode: 'full', codex: 'none', claudeCode: 'none' },
    'Recover from failed or interrupted work',
    'OpenCode-only tool',
    '/opencode-plugin/tools/#vstack_recovery',
    'verified'
  ),
  createCapability(
    'vstack_verification',
    'vstack_verification',
    'verification',
    'opencode',
    { opencode: 'full', codex: 'none', claudeCode: 'none' },
    'Manage verification artifacts and evidence',
    'OpenCode-only tool',
    '/opencode-plugin/tools/#vstack_verification',
    'verified'
  ),
  createCapability(
    'vstack_session_pickup',
    'vstack_session_pickup',
    'sessionPickup',
    'opencode',
    { opencode: 'full', codex: 'none', claudeCode: 'none' },
    'Resume work from previous session',
    'OpenCode-only tool',
    '/opencode-plugin/tools/#vstack_session_pickup',
    'verified'
  ),

  // Verification skill tools
  createCapability(
    'vstack_verification_skill',
    'vstack_verification_skill',
    'verificationSkill',
    'opencode',
    { opencode: 'full', codex: 'none', claudeCode: 'none' },
    'Create project-specific verification skills',
    'OpenCode-only tool',
    '/opencode-plugin/tools/#vstack_verification_skill',
    'verified'
  ),
  createCapability(
    'vstack_skill_validate',
    'vstack_skill_validate',
    'skillValidate',
    'opencode',
    { opencode: 'full', codex: 'none', claudeCode: 'none' },
    'Validate skill content against v2 contract',
    'OpenCode-only tool',
    '/opencode-plugin/tools/#vstack_skill_validate',
    'verified'
  ),
  createCapability(
    'vstack_verification_maintain',
    'vstack_verification_maintain',
    'verificationMaintain',
    'opencode',
    { opencode: 'full', codex: 'none', claudeCode: 'none' },
    'Maintain verification instructions alignment',
    'OpenCode-only tool',
    '/opencode-plugin/tools/#vstack_verification_maintain',
    'verified'
  ),

  // Evaluation tools
  createCapability(
    'vstack_evaluation',
    'vstack_evaluation',
    'evaluation',
    'opencode',
    { opencode: 'full', codex: 'none', claudeCode: 'none' },
    'Run skill evaluation scenarios',
    'OpenCode-only tool',
    '/opencode-plugin/tools/#vstack_evaluation',
    'verified'
  ),
  createCapability(
    'vstack_lesson_promotion',
    'vstack_lesson_promotion',
    'lessonPromotion',
    'opencode',
    { opencode: 'full', codex: 'none', claudeCode: 'none' },
    'Promote lessons through evaluation pipeline',
    'OpenCode-only tool',
    '/opencode-plugin/tools/#vstack_lesson_promotion',
    'verified'
  ),

  // Review tools
  createCapability(
    'vstack_review',
    'vstack_review',
    'review',
    'opencode',
    { opencode: 'full', codex: 'none', claudeCode: 'none' },
    'Manage review cycles and findings',
    'OpenCode-only tool',
    '/opencode-plugin/tools/#vstack_review',
    'verified'
  ),

  // Quality tools
  createCapability(
    'vstack_check_discover',
    'vstack_check_discover',
    'quality',
    'opencode',
    { opencode: 'full', codex: 'none', claudeCode: 'none' },
    'Discover available checks in project',
    'OpenCode-only tool',
    '/opencode-plugin/tools/#vstack_check_discover',
    'verified'
  ),
  createCapability(
    'vstack_check_run',
    'vstack_check_run',
    'quality',
    'opencode',
    { opencode: 'full', codex: 'none', claudeCode: 'none' },
    'Execute specific checks',
    'OpenCode-only tool',
    '/opencode-plugin/tools/#vstack_check_run',
    'verified'
  ),
  createCapability(
    'vstack_evidence_record',
    'vstack_evidence_record',
    'quality',
    'opencode',
    { opencode: 'full', codex: 'none', claudeCode: 'none' },
    'Record evidence for check execution',
    'OpenCode-only tool',
    '/opencode-plugin/tools/#vstack_evidence_record',
    'verified'
  ),
  createCapability(
    'vstack_gate_evaluate',
    'vstack_gate_evaluate',
    'quality',
    'opencode',
    { opencode: 'full', codex: 'none', claudeCode: 'none' },
    'Evaluate quality gate criteria',
    'OpenCode-only tool',
    '/opencode-plugin/tools/#vstack_gate_evaluate',
    'verified'
  ),
  createCapability(
    'vstack_verify',
    'vstack_verify',
    'quality',
    'opencode',
    { opencode: 'full', codex: 'none', claudeCode: 'none' },
    'Run full verification suite',
    'OpenCode-only tool',
    '/opencode-plugin/tools/#vstack_verify',
    'verified'
  ),
];

// ============================================================================
// OpenChamber Capabilities (2 interfaces)
// ============================================================================

const openchamberCapabilities: CapabilityEntry[] = [
  createCapability(
    'openchamber-panel',
    'OpenChamber Panel',
    'Panel',
    'openchamber',
    { opencode: 'full', codex: 'full', claudeCode: 'full' },
    'Read-only side panel for OpenChamber showing project Notes, Todos, Plans',
    'Requires @openchamber/sdk@2.5.3 and OpenChamber host >=1.24.0',
    '/openchamber/',
    'verified'
  ),
  createCapability(
    'openchamber-dashboard',
    'OpenChamber Dashboard',
    'Dashboard',
    'openchamber',
    { opencode: 'full', codex: 'full', claudeCode: 'full' },
    'Full-page dashboard visualizing deliveries, tasks, quality, activity, memory',
    'Reads published projections from .vstack/ directory',
    '/openchamber/',
    'verified'
  ),
];

// ============================================================================
// Combine All Capabilities
// ============================================================================

export const allCapabilities: CapabilityEntry[] = [
  ...playbookCapabilities,
  ...opencodeCapabilities,
  ...openchamberCapabilities,
];

// ============================================================================
// Group by Category
// ============================================================================

function groupByCategory(capabilities: CapabilityEntry[]): CapabilityCategory[] {
  const categoryMap = new Map<string, CapabilityEntry[]>();
  
  for (const cap of capabilities) {
    const existing = categoryMap.get(cap.category) || [];
    existing.push(cap);
    categoryMap.set(cap.category, existing);
  }

  const categories: CapabilityCategory[] = [];
  for (const [name, caps] of categoryMap) {
    // Summary by component
    const playbookCaps = caps.filter(c => c.component === 'playbook');
    const opencodeCaps = caps.filter(c => c.component === 'opencode');
    const openchamberCaps = caps.filter(c => c.component === 'openchamber');

    const summary = {
      playbook: countByStatus(playbookCaps, 'playbook'),
      opencode: countByStatus(opencodeCaps, 'opencode'),
      openchamber: countByStatus(openchamberCaps, 'openchamber'),
    };

    categories.push({
      name,
      capabilities: caps,
      count: caps.length,
      summary,
    });
  }

  // Sort categories: Foundation first, then alphabetical
  const priorityOrder = [
    'Foundation', 'Discovery', 'Architecture', 'Planning', 'Verification',
    'Debug/Recovery', 'Collaboration', 'Review', 'Continuity', 'Delivery',
    'Extended', 'Implementation', 'Utils', 'status', 'memory', 'history',
    'delivery', 'task', 'agent', 'check', 'assignment', 'decision',
    'checkpoint', 'lesson', 'recovery', 'verification', 'sessionPickup',
    'verificationSkill', 'skillValidate', 'verificationMaintain', 'evaluation',
    'lessonPromotion', 'review', 'quality', 'Panel', 'Dashboard'
  ];
  
  categories.sort((a, b) => {
    const aIndex = priorityOrder.indexOf(a.name);
    const bIndex = priorityOrder.indexOf(b.name);
    if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
    if (aIndex !== -1) return -1;
    if (bIndex !== -1) return 1;
    return a.name.localeCompare(b.name);
  });

  return categories;
}

function countByStatus(caps: CapabilityEntry[], component: 'playbook' | 'opencode' | 'openchamber'): Record<string, number> {
  const counts: Record<string, number> = {
    full: 0,
    partial: 0,
    planned: 0,
    none: 0,
    unknown: 0,
  };
  
  for (const cap of caps) {
    // For playbook capabilities, all harnesses have same status typically
    // For opencode/openchamber, they only work in their harness
    const status = cap.status.opencode; // Use opencode as primary
    if (counts[status] !== undefined) {
      counts[status]++;
    }
  }
  
  return counts;
}

export const capabilityCategories: CapabilityCategory[] = groupByCategory(allCapabilities);

// ============================================================================
// Summary Statistics
// ============================================================================

export const capabilitySummary = {
  total: allCapabilities.length,
  byComponent: {
    playbook: allCapabilities.filter(c => c.component === 'playbook').length,
    opencode: allCapabilities.filter(c => c.component === 'opencode').length,
    openchamber: allCapabilities.filter(c => c.component === 'openchamber').length,
  },
  byStatus: {
    full: allCapabilities.filter(c => c.status.opencode === 'full').length,
    partial: allCapabilities.filter(c => c.status.opencode === 'partial').length,
    planned: allCapabilities.filter(c => c.status.opencode === 'planned').length,
    none: allCapabilities.filter(c => c.status.opencode === 'none').length,
    unknown: allCapabilities.filter(c => c.status.opencode === 'unknown').length,
  },
  byCategory: Object.fromEntries(
    capabilityCategories.map(c => [c.name, c.count])
  ),
};

// ============================================================================
// Harness Summary (for Playbook capabilities only)
// ============================================================================

const playbookOnly = allCapabilities.filter(c => c.component === 'playbook');

export const harnessSummary = [
  {
    harness: 'OpenCode',
    full: playbookOnly.filter(c => c.status.opencode === 'full').length,
    partial: playbookOnly.filter(c => c.status.opencode === 'partial').length,
    planned: playbookOnly.filter(c => c.status.opencode === 'planned').length,
    none: playbookOnly.filter(c => c.status.opencode === 'none').length,
  },
  {
    harness: 'Codex',
    full: playbookOnly.filter(c => c.status.codex === 'full').length,
    partial: playbookOnly.filter(c => c.status.codex === 'partial').length,
    planned: playbookOnly.filter(c => c.status.codex === 'planned').length,
    none: playbookOnly.filter(c => c.status.codex === 'none').length,
  },
  {
    harness: 'Claude Code',
    full: playbookOnly.filter(c => c.status.claudeCode === 'full').length,
    partial: playbookOnly.filter(c => c.status.claudeCode === 'partial').length,
    planned: playbookOnly.filter(c => c.status.claudeCode === 'planned').length,
    none: playbookOnly.filter(c => c.status.claudeCode === 'none').length,
  },
];

// ============================================================================
// Capability Data Export
// ============================================================================

export const capabilityData: CapabilityData = {
  capabilities: allCapabilities,
  byCategory: capabilityCategories,
  summary: capabilitySummary,
  provenance: CAPABILITY_PROVENANCE,
};

// ============================================================================
// Helper Functions
// ============================================================================

export function getCapabilitiesByComponent(component: 'playbook' | 'opencode' | 'openchamber'): CapabilityEntry[] {
  return allCapabilities.filter(c => c.component === component);
}

export function getCapabilitiesByCategory(category: string): CapabilityEntry[] {
  return allCapabilities.filter(c => c.category === category);
}

export function getCapabilityById(id: string): CapabilityEntry | undefined {
  return allCapabilities.find(c => c.id === id);
}

export function getCapabilitiesByStatus(status: CapabilityEntry['status']['opencode']): CapabilityEntry[] {
  return allCapabilities.filter(c => c.status.opencode === status);
}