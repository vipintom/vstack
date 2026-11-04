# OpenCode Plugin

The vstack OpenCode plugin provides runtime infrastructure for the playbook within OpenCode.

## Installation

```bash
# Development
npm install /path/to/vstack/opencode/vstack

# Production (when published)
npm install @vstack/opencode
```

## Features

### Persistence Layer
- **File Store** — Atomic reads/writes with revision tracking
- **Locks** — Cross-process locking with stale recovery
- **Event Log** — Append-only JSONL audit trail
- **Repository Root** — Worktree-aware path resolution
- **Schema Version** — Migration tracking

### Runtime Stores

| Store | Purpose |
|---|---|
| `memory-store` | Project knowledge (CRUD, categories, search, supersede, index) |
| `delivery-store` | Delivery lifecycle (CRUD, status transitions, phases) |
| `task-store` | Task management (CRUD, dependencies, cycles, ready tasks, contracts) |
| `assignment-store` | Task assignments with contracts, write-scope conflict detection |
| `decision-store` | Decision ledger with supersession model |
| `checkpoint-store` | Progress checkpoints with PROGRESS.md index |
| `lesson-store` | Lessons with lifecycle and promotion |
| `recovery-store` | Failure recovery with rounds, assumption probes |
| `verification-index-store` | Project verification index with freshness tracking |
| `agent-run-store` | Agent dispatch tracking + handoff |
| `history-service` | Event querying and statistics |
| `check-service` | Check execution + evidence recording (provenance/outcome) |
| `evidence-ledger` | Evidence provenance (4 types), outcome (7 types), freshness |
| `review-store` | Review sessions, independence states (4), findings, dispositions (5) |
| `enforcement-service` | 6 completion gates, action-scoped approvals with scopeHash |

### Completion Gates (6)

1. **all_tasks_complete** — All tasks completed/cancelled/skipped (error)
2. **required_evidence** — Required evidence exists and passes with provenance (error)
3. **blocking_findings** — All blocking review findings resolved (error)
4. **approval_required** — Action-scoped approval granted, not expired, scopeHash matches (error)
5. **evidence_freshness** — Evidence not stale (configurable max age, warning)
6. **approvals_resolved** — All pending approvals resolved (error)

### Action-Scoped Approvals

- `scopeHash` (SHA256 of `action:targetId`) prevents approval reuse
- Expiration support via `expiresAt`
- Scope validation via `validateApprovalScope()`

### Tools (23)

| Tool | Purpose |
|---|---|
| `vstack_status` | Dashboard, deliveries, tasks, agents |
| `vstack_memory` | Memory CRUD, search, index |
| `vstack_history` | Event log, statistics |
| `vstack_delivery` | Delivery CRUD, status transitions |
| `vstack_task` | Task CRUD, dependencies, ready tasks, contracts |
| `vstack_agent` | Dispatch, handoff, session tracking |
| `vstack_check` | Check discovery, execution, evidence |
| `vstack_assignment` | Task assignments with contracts |
| `vstack_decision` | Decision ledger |
| `vstack_checkpoint` | Progress checkpoints |
| `vstack_lesson` | Lessons and promotion |
| `vstack_recovery` | Failure recovery |
| `vstack_verification` | Project verification index |
| `vstack_session_pickup` | Session resumption |
| `vstack_verification_skill` | Project verification skill generator |
| `vstack_skill_validate` | Skill authoring validator |
| `vstack_verification_maintain` | Verification maintenance |
| `vstack_evaluation` | Behavioural evaluation suite |
| `vstack_lesson_promotion` | Lesson promotion |
| `vstack_review` | Review sessions and findings |

## Commands

| Command | Description |
|---|---|
| `/vstack status` | Show dashboard |
| `/vstack delivery create` | Create delivery |
| `/vstack task create` | Create task |
| `/vstack agent dispatch` | Dispatch agent |
| `/vstack check execute` | Run check |
| `/vstack memory create` | Add memory item |
| `/vstack assignment create` | Create assignment |
| `/vstack decision create` | Record decision |
| `/vstack checkpoint create` | Create checkpoint |
| `/vstack lesson create` | Record lesson |
| `/vstack recovery create` | Start recovery |
| `/vstack verification create` | Create verification index |
| `/vstack session_pickup` | Resume session |
| `/vstack verification_skill generate` | Generate verification skill |
| `/vstack skill_validate` | Validate skill |
| `/vstack verification_maintain` | Maintain verification |
| `/vstack evaluation run-suite` | Run evaluation suite |
| `/vstack lesson_promotion` | Promote lesson |
| `/vstack review create` | Create review session |

## Agent Provisioning

The plugin provisions native OpenCode agents via filesystem:

```
.opencode/agents/
├── vstack-lead.md
├── vstack-builder.md
└── vstack-reviewer.md
```

These are thin adapters wrapping the playbook roles.

## Projection Publishing

After every tool execution, projections are published to `.vstack/reports/`:

```
.vstack/reports/
├── deliveries/<id>.json     # Delivery detail (v2: tasks, agents, evidence, reviewSessions, decisions, recoveries, checkpoints, lessons, verificationIndex)
├── activity/<id>.json       # Activity timeline
├── memory-index.json        # Memory catalogue
└── quality/<id>.json        # Quality summaries
```

OpenChamber reads these — never the authoritative data.

## Configuration

```typescript
// opencode/vstack/src/index.ts
const config = {
  defaultModel: "anthropic/claude-3.5-sonnet",
  maxSteps: { default: 50 },
  defaultPermissions: ["read", "glob", "grep", "edit", "shell", "tool", "subagent", "skill"],
  enableWorktrees: false,
};
```

## Development

```bash
cd opencode/vstack

# Install dependencies
pnpm install

# Run tests
pnpm test

# Typecheck
pnpm typecheck

# Build
pnpm build
```

## Architecture

See [Architecture](Architecture.md) for full data flow diagram.

## Status

| Check | Status |
|---|---|
| Typecheck | ✅ PASS |
| Build | ✅ PASS |
| Tests | ✅ 103/103 PASS |