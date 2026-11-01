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

### Runtime Stores
| Store | Purpose |
|---|---|
| `memory-store` | Project knowledge (CRUD, categories, search) |
| `delivery-store` | Delivery lifecycle (CRUD, status transitions) |
| `task-store` | Task management (CRUD, dependencies, ready tasks) |
| `agent-run-store` | Agent dispatch tracking + handoff |
| `history-service` | Event querying and statistics |
| `check-service` | Check execution + evidence recording |

### Enforcement (5 Rules)
1. Delivery cannot complete with incomplete tasks
2. Task cannot complete with failed evidence or incomplete dependencies
3. Blocked status requires a reason
4. Protected actions require approval (stub)
5. Completion checks before protected transitions

### Tools (~7)
| Tool | Purpose |
|---|---|
| `vstack_status` | Dashboard, deliveries, tasks, agents |
| `vstack_memory` | Memory CRUD, search, index |
| `vstack_history` | Event log, statistics |
| `vstack_delivery` | Delivery CRUD, status transitions |
| `vstack_task` | Task CRUD, dependencies, ready tasks |
| `vstack_agent` | Dispatch, handoff, session tracking |
| `vstack_check` | Check discovery, execution, evidence |

## Commands

| Command | Description |
|---|---|
| `/vstack status` | Show dashboard |
| `/vstack delivery create` | Create delivery |
| `/vstack task create` | Create task |
| `/vstack agent dispatch` | Dispatch agent |
| `/vstack check execute` | Run check |
| `/vstack memory create` | Add memory item |

## Agent Provisioning

The plugin provisions native OpenCode agents via filesystem:

```
.opencode/agents/
├── vstack-lead.md
├── vstack-builder.md
└── vstack-reviewer.md
```

These are thin adapters wrapping the playbook roles. No `ctx.agent.transform` editor API used (unsupported).

## Projection Publishing

After every tool execution, projections are published to `.vstack/reports/`:

```
.vstack/reports/
├── deliveries/<id>.json     # Delivery detail
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