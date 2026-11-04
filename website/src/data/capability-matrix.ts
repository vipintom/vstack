// Single source of truth for vstack capability matrix
// Derived from vstack-playbook/docs/capability-matrix.md

export interface CapabilityMatrixEntry {
  name: string;
  slug: string;
  category: string;
  opencode: 'full' | 'partial' | 'planned' | 'none';
  codex: 'full' | 'partial' | 'planned' | 'none';
  claude: 'full' | 'partial' | 'planned' | 'none';
  notes?: string;
}

export const capabilityMatrix: CapabilityMatrixEntry[] = [
  // Category: Understanding & Analysis (Foundation)
  { name: 'vstack-how', slug: 'vstack-how', category: 'Foundation', opencode: 'full', codex: 'full', claude: 'full', notes: 'Read/glob/grep/bash only' },
  { name: 'vstack-why', slug: 'vstack-why', category: 'Foundation', opencode: 'full', codex: 'full', claude: 'full', notes: 'Read/glob/grep/bash only' },
  { name: 'vstack-blast-radius', slug: 'vstack-blast-radius', category: 'Foundation', opencode: 'full', codex: 'full', claude: 'full', notes: 'Read/glob/grep/bash only' },
  { name: 'vstack-explain', slug: 'vstack-explain', category: 'Foundation', opencode: 'full', codex: 'full', claude: 'full', notes: 'Read/glob/grep/bash only' },

  // Category: Utils (New)
  { name: 'docker-compose', slug: 'docker-compose', category: 'Utils', opencode: 'full', codex: 'full', claude: 'full', notes: 'Read/write/bash for Dockerfiles, compose' },
  { name: 'makefile', slug: 'makefile', category: 'Utils', opencode: 'full', codex: 'full', claude: 'full', notes: 'Read/write/bash for Makefiles' },
  { name: 'gitignore', slug: 'gitignore', category: 'Utils', opencode: 'full', codex: 'full', claude: 'full', notes: 'Read/write for .gitignore patterns' },
  { name: 'vstack-unslop', slug: 'vstack-unslop', category: 'Utils', opencode: 'full', codex: 'full', claude: 'full', notes: 'Write/edit for cleanup' },
  { name: 'using-git-worktrees', slug: 'using-git-worktrees', category: 'Utils', opencode: 'full', codex: 'full', claude: 'full', notes: 'Bash for git worktree commands' },
  { name: 'unslop', slug: 'unslop', category: 'Utils', opencode: 'full', codex: 'full', claude: 'full', notes: 'Write/edit for cleanup' },

  // Category: Design & Architecture
  { name: 'vstack-architect', slug: 'vstack-architect', category: 'Architecture', opencode: 'full', codex: 'full', claude: 'full', notes: 'Requires vstack-arena for alternatives' },
  { name: 'vstack-arena', slug: 'vstack-arena', category: 'Architecture', opencode: 'full', codex: 'full', claude: 'full', notes: 'Parallel eval via subagents (all 3 harnesses)' },
  { name: 'vstack-blueprint', slug: 'vstack-blueprint', category: 'Architecture', opencode: 'full', codex: 'full', claude: 'full', notes: 'Write/edit needed for design artifacts' },
  { name: 'vstack-best-of-n', slug: 'vstack-best-of-n', category: 'Architecture', opencode: 'full', codex: 'full', claude: 'full', notes: 'Parallel candidates via subagents (all 3 harnesses)' },
  { name: 'vstack-design-audit', slug: 'vstack-design-audit', category: 'Architecture', opencode: 'full', codex: 'full', claude: 'full', notes: 'Read/glob/grep/bash only' },
  { name: 'vstack-performance', slug: 'vstack-performance', category: 'Architecture', opencode: 'full', codex: 'full', claude: 'full', notes: 'Bash for profiling/benchmarks' },
  { name: 'migration', slug: 'migration', category: 'Architecture', opencode: 'full', codex: 'full', claude: 'full', notes: 'Bash for migration commands' },
  { name: 'api-designer', slug: 'api-designer', category: 'Architecture', opencode: 'full', codex: 'full', claude: 'full', notes: 'Write/edit for API design' },
  { name: 'graphql-schema', slug: 'graphql-schema', category: 'Architecture', opencode: 'full', codex: 'full', claude: 'full', notes: 'Write/edit for GraphQL schemas' },
  { name: 'apollo-federation', slug: 'apollo-federation', category: 'Architecture', opencode: 'full', codex: 'full', claude: 'full', notes: 'Write/edit for federation schemas' },

  // Category: Planning & Task Management
  { name: 'vstack-mode', slug: 'vstack-mode', category: 'Planning', opencode: 'full', codex: 'full', claude: 'full', notes: 'Core routing skill; loads playbooks' },
  { name: 'vstack-sharpen', slug: 'vstack-sharpen', category: 'Planning', opencode: 'full', codex: 'full', claude: 'full', notes: 'Write/edit for brief' },
  { name: 'vstack-plan-loop', slug: 'vstack-plan-loop', category: 'Planning', opencode: 'full', codex: 'full', claude: 'full', notes: 'TodoWrite/TodoRead or todo tool' },
  { name: 'vstack-plan-review', slug: 'vstack-plan-review', category: 'Planning', opencode: 'full', codex: 'full', claude: 'full', notes: 'Read/glob/grep only' },
  { name: 'vstack-incremental-build', slug: 'vstack-incremental-build', category: 'Planning', opencode: 'full', codex: 'full', claude: 'full', notes: 'Write/edit/bash for implementation' },
  { name: 'vstack-ship', slug: 'vstack-ship', category: 'Planning', opencode: 'full', codex: 'full', claude: 'full', notes: 'Bash for git/PR commands' },
  { name: 'writing-plans', slug: 'writing-plans', category: 'Planning', opencode: 'full', codex: 'full', claude: 'full', notes: 'Write/edit for plan creation' },
  { name: 'vstack-blueprint', slug: 'vstack-blueprint', category: 'Planning', opencode: 'full', codex: 'full', claude: 'full', notes: 'Write/edit for design artifacts' },

  // Category: Implementation
  { name: 'vstack-tdd', slug: 'vstack-tdd', category: 'Implementation', opencode: 'full', codex: 'full', claude: 'full', notes: 'Write/edit/bash for test-first' },
  { name: 'vstack-debug', slug: 'vstack-debug', category: 'Implementation', opencode: 'full', codex: 'full', claude: 'full', notes: 'Bash for reproduction, write/edit for fix' },
  { name: 'vstack-prototype', slug: 'vstack-prototype', category: 'Implementation', opencode: 'full', codex: 'full', claude: 'full', notes: 'Write/edit/bash for spikes' },
  { name: 'vstack-refactor', slug: 'vstack-refactor', category: 'Implementation', opencode: 'full', codex: 'full', claude: 'full', notes: 'Write/edit/bash with verification' },
  { name: 'vstack-worktree', slug: 'vstack-worktree', category: 'Implementation', opencode: 'full', codex: 'partial', claude: 'partial', notes: 'Native worktrees in OpenCode/Claude; Codex: directory isolation' },
  { name: 'data-pipeline', slug: 'data-pipeline', category: 'Implementation', opencode: 'full', codex: 'full', claude: 'full', notes: 'Write/edit/bash for pipelines' },
  { name: 'fastapi-backend', slug: 'fastapi-backend', category: 'Implementation', opencode: 'full', codex: 'full', claude: 'full', notes: 'Write/edit for FastAPI' },
  { name: 'bubbletea', slug: 'bubbletea', category: 'Implementation', opencode: 'full', codex: 'full', claude: 'full', notes: 'Write/edit for TUI apps' },
  { name: 'angular-dashboard', slug: 'angular-dashboard', category: 'Implementation', opencode: 'full', codex: 'full', claude: 'full', notes: 'Write/edit for Angular' },

  // Category: Verification & Quality
  { name: 'vstack-verify-loop', slug: 'vstack-verify-loop', category: 'Verification', opencode: 'full', codex: 'full', claude: 'full', notes: 'Bash for test execution, vstack_check tool' },
  { name: 'vstack-create-verification', slug: 'vstack-create-verification', category: 'Verification', opencode: 'full', codex: 'full', claude: 'full', notes: 'Write/edit for verification artifacts' },
  { name: 'vstack-maintain-verification', slug: 'vstack-maintain-verification', category: 'Verification', opencode: 'full', codex: 'full', claude: 'full', notes: 'Write/edit for updates' },
  { name: 'vstack-verification-audit', slug: 'vstack-verification-audit', category: 'Verification', opencode: 'full', codex: 'full', claude: 'full', notes: 'Read/glob/grep/bash for audit' },
  { name: 'test-driven-development', slug: 'test-driven-development', category: 'Verification', opencode: 'full', codex: 'full', claude: 'full', notes: 'Write/edit/bash for test-first' },
  { name: 'safe-refactor', slug: 'safe-refactor', category: 'Verification', opencode: 'full', codex: 'full', claude: 'full', notes: 'Write/edit/bash with verification' },
  { name: 'verification-before-completion', slug: 'verification-before-completion', category: 'Verification', opencode: 'full', codex: 'full', claude: 'full', notes: 'Read/glob/grep/bash for verification' },

  // Category: Review
  { name: 'vstack-review-loop', slug: 'vstack-review-loop', category: 'Review', opencode: 'full', codex: 'full', claude: 'full', notes: 'Read/glob/grep/bash; reviewer needs read-only' },
  { name: 'vstack-review-rubrics', slug: 'vstack-review-rubrics', category: 'Review', opencode: 'full', codex: 'full', claude: 'full', notes: 'Read/glob/grep for rubric files' },
  { name: 'vstack-jury', slug: 'vstack-jury', category: 'Review', opencode: 'full', codex: 'full', claude: 'full', notes: 'Multiple reviewers via subagents (all 3 harnesses)' },
  { name: 'vstack-interrogate', slug: 'vstack-interrogate', category: 'Review', opencode: 'full', codex: 'full', claude: 'full', notes: 'Read/glob/grep/bash for adversarial review' },
  { name: 'caveman-review', slug: 'caveman-review', category: 'Review', opencode: 'full', codex: 'full', claude: 'full', notes: 'Compressed code review' },
  { name: 'receiving-code-review', slug: 'receiving-code-review', category: 'Review', opencode: 'full', codex: 'full', claude: 'full', notes: 'Read/glob/grep/bash for feedback' },
  { name: 'requesting-code-review', slug: 'requesting-code-review', category: 'Review', opencode: 'full', codex: 'full', claude: 'full', notes: 'Write/edit for PR preparation' },

  // Category: Debug/Recovery
  { name: 'vstack-unstick', slug: 'vstack-unstick', category: 'Debug/Recovery', opencode: 'full', codex: 'full', claude: 'full', notes: 'Read/glob/grep/bash; write for fix attempts' },
  { name: 'vstack-recovery', slug: 'vstack-recovery', category: 'Debug/Recovery', opencode: 'full', codex: 'full', claude: 'full', notes: 'Bash for git restore, write/edit for fixes' },
  { name: 'vstack-runtime-forensics', slug: 'vstack-runtime-forensics', category: 'Debug/Recovery', opencode: 'full', codex: 'full', claude: 'full', notes: 'Bash for logs/traces' },
  { name: 'vstack-trace-forensics', slug: 'vstack-trace-forensics', category: 'Debug/Recovery', opencode: 'full', codex: 'full', claude: 'full', notes: 'Bash for distributed traces' },
  { name: 'vstack-performance', slug: 'vstack-performance', category: 'Debug/Recovery', opencode: 'full', codex: 'full', claude: 'full', notes: 'Bash for profiling/benchmarks' },
  { name: 'systematic-debugging', slug: 'systematic-debugging', category: 'Debug/Recovery', opencode: 'full', codex: 'full', claude: 'full', notes: 'Bash for reproduction, write/edit for fix' },

  // Category: Continuity & Session Management
  { name: 'vstack-context-reset', slug: 'vstack-context-reset', category: 'Continuity', opencode: 'full', codex: 'full', claude: 'full', notes: 'Write/edit for PROGRESS.md' },
  { name: 'vstack-safe-pause', slug: 'vstack-safe-pause', category: 'Continuity', opencode: 'full', codex: 'full', claude: 'full', notes: 'Write/edit for checkpoint' },
  { name: 'vstack-session-pickup', slug: 'vstack-session-pickup', category: 'Continuity', opencode: 'full', codex: 'full', claude: 'full', notes: 'Read/glob/grep for state reconstruction' },
  { name: 'vstack-catchup', slug: 'vstack-catchup', category: 'Continuity', opencode: 'full', codex: 'full', claude: 'full', notes: 'Read/glob/grep for reconciliation' },
  { name: 'vstack-handoff', slug: 'vstack-handoff', category: 'Continuity', opencode: 'full', codex: 'full', claude: 'full', notes: 'Write/edit for handoff docs' },
  { name: 'vstack-ledger', slug: 'vstack-ledger', category: 'Continuity', opencode: 'full', codex: 'full', claude: 'full', notes: 'Write/edit for decision trail' },
  { name: 'vstack-lessons', slug: 'vstack-lessons', category: 'Continuity', opencode: 'full', codex: 'full', claude: 'full', notes: 'Write/edit for lessons learned' },
  { name: 'vstack-recall', slug: 'vstack-recall', category: 'Continuity', opencode: 'full', codex: 'full', claude: 'full', notes: 'Read/glob/grep for memory' },

  // Category: Delivery
  { name: 'vstack-ready', slug: 'vstack-ready', category: 'Delivery', opencode: 'full', codex: 'full', claude: 'full', notes: 'Read/glob/grep/bash' },
  { name: 'vstack-pr', slug: 'vstack-pr', category: 'Delivery', opencode: 'full', codex: 'full', claude: 'full', notes: 'Bash for gh CLI' },
  { name: 'vstack-watch-pr', slug: 'vstack-watch-pr', category: 'Delivery', opencode: 'full', codex: 'partial', claude: 'partial', notes: 'Needs background/long-running; fallback: polling' },
  { name: 'finishing-a-development-branch', slug: 'finishing-a-development-branch', category: 'Delivery', opencode: 'full', codex: 'full', claude: 'full', notes: 'Bash for git/PR commands' },
  { name: 'devops-engineer', slug: 'devops-engineer', category: 'Delivery', opencode: 'full', codex: 'full', claude: 'full', notes: 'Write/edit/bash for CI/CD' },

  // Category: Collaboration
  { name: 'subagent-driven-development', slug: 'subagent-driven-development', category: 'Collaboration', opencode: 'full', codex: 'full', claude: 'full', notes: 'Parallel subagents (all 3 harnesses)' },
  { name: 'dispatching-parallel-agents', slug: 'dispatching-parallel-agents', category: 'Collaboration', opencode: 'full', codex: 'full', claude: 'full', notes: 'Parallel subagents (all 3 harnesses)' },
  { name: 'vstack-swarm', slug: 'vstack-swarm', category: 'Collaboration', opencode: 'full', codex: 'full', claude: 'full', notes: 'Parallel builders via subagents (all 3 harnesses)' },
  { name: 'vstack-jury', slug: 'vstack-jury', category: 'Collaboration', opencode: 'full', codex: 'full', claude: 'full', notes: 'Multiple reviewers via subagents (all 3 harnesses)' },
  { name: 'vstack-handoff', slug: 'vstack-handoff', category: 'Collaboration', opencode: 'full', codex: 'full', claude: 'full', notes: 'Write/edit for handoff docs' },
  { name: 'vstack-session-pickup', slug: 'vstack-session-pickup', category: 'Collaboration', opencode: 'full', codex: 'full', claude: 'full', notes: 'Read/glob/grep for state reconstruction' },

  // Category: Extended
  { name: 'hallmark', slug: 'hallmark', category: 'Extended', opencode: 'full', codex: 'partial', claude: 'planned', notes: 'Write/edit for design' },
  { name: 'frontend-design', slug: 'frontend-design', category: 'Extended', opencode: 'full', codex: 'partial', claude: 'planned', notes: 'Write/edit for design' },
  { name: 'vstack-skill-authoring', slug: 'vstack-skill-authoring', category: 'Extended', opencode: 'full', codex: 'full', claude: 'full', notes: 'Write/edit for skill creation' },
  { name: 'vstack-skill-evaluation', slug: 'vstack-skill-evaluation', category: 'Extended', opencode: 'full', codex: 'partial', claude: 'partial', notes: 'Cross-harness testing needs all 3 harnesses' },
  { name: 'vstack-visual-parity', slug: 'vstack-visual-parity', category: 'Extended', opencode: 'full', codex: 'full', claude: 'full', notes: 'Read/glob/grep/bash; visual diff tools if available' },
  { name: 'vstack-figure-it-out', slug: 'vstack-figure-it-out', category: 'Extended', opencode: 'full', codex: 'full', claude: 'full', notes: 'Composes other skills' },
  { name: 'vstack-best-of-n', slug: 'vstack-best-of-n', category: 'Extended', opencode: 'full', codex: 'full', claude: 'full', notes: 'Parallel candidates via subagents' },
  { name: 'vstack-arena', slug: 'vstack-arena', category: 'Extended', opencode: 'full', codex: 'full', claude: 'full', notes: 'Parallel eval via subagents' },

  // Foundation skills (using-superpowers, find-skills, vstack-help, vstack-principles)
  { name: 'using-superpowers', slug: 'using-superpowers', category: 'Foundation', opencode: 'full', codex: 'full', claude: 'full', notes: 'Core routing skill' },
  { name: 'find-skills', slug: 'find-skills', category: 'Foundation', opencode: 'full', codex: 'full', claude: 'full', notes: 'Read only (reference)' },
  { name: 'vstack-help', slug: 'vstack-help', category: 'Foundation', opencode: 'full', codex: 'full', claude: 'full', notes: 'Read only (reference)' },
  { name: 'vstack-principles', slug: 'vstack-principles', category: 'Foundation', opencode: 'full', codex: 'full', claude: 'full', notes: 'Read only (reference)' },
];

// Category summary for statistics
export const categorySummary = [
  { category: 'Foundation', count: capabilityMatrix.filter(s => s.category === 'Foundation').length },
  { category: 'Discovery', count: capabilityMatrix.filter(s => s.category === 'Discovery').length },
  { category: 'Architecture', count: capabilityMatrix.filter(s => s.category === 'Architecture').length },
  { category: 'Planning', count: capabilityMatrix.filter(s => s.category === 'Planning').length },
  { category: 'Verification', count: capabilityMatrix.filter(s => s.category === 'Verification').length },
  { category: 'Debug/Recovery', count: capabilityMatrix.filter(s => s.category === 'Debug/Recovery').length },
  { category: 'Collaboration', count: capabilityMatrix.filter(s => s.category === 'Collaboration').length },
  { category: 'Review', count: capabilityMatrix.filter(s => s.category === 'Review').length },
  { category: 'Continuity', count: capabilityMatrix.filter(s => s.category === 'Continuity').length },
  { category: 'Delivery', count: capabilityMatrix.filter(s => s.category === 'Delivery').length },
  { category: 'Extended', count: capabilityMatrix.filter(s => s.category === 'Extended').length },
  { category: 'Implementation', count: capabilityMatrix.filter(s => s.category === 'Implementation').length },
  { category: 'Utils', count: capabilityMatrix.filter(s => s.category === 'Utils').length },
];

// Harness summary
export const harnessSummary = [
  {
    harness: 'OpenCode',
    full: capabilityMatrix.filter(s => s.opencode === 'full').length,
    partial: capabilityMatrix.filter(s => s.opencode === 'partial').length,
    planned: capabilityMatrix.filter(s => s.opencode === 'planned').length,
    none: capabilityMatrix.filter(s => s.opencode === 'none').length,
  },
  {
    harness: 'Codex',
    full: capabilityMatrix.filter(s => s.codex === 'full').length,
    partial: capabilityMatrix.filter(s => s.codex === 'partial').length,
    planned: capabilityMatrix.filter(s => s.codex === 'planned').length,
    none: capabilityMatrix.filter(s => s.codex === 'none').length,
  },
  {
    harness: 'Claude Code',
    full: capabilityMatrix.filter(s => s.claude === 'full').length,
    partial: capabilityMatrix.filter(s => s.claude === 'partial').length,
    planned: capabilityMatrix.filter(s => s.claude === 'planned').length,
    none: capabilityMatrix.filter(s => s.claude === 'none').length,
  },
];