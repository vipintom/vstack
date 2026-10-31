# Current State

**Last updated:** 2026-11-01 (Phase 3 complete)

## What Exists

### Repository Structure
```
vstack/
├── package.json                    # pnpm workspace root
├── playbook/                       # Portable playbook package
│   ├── package.json                # @vstack/playbook v0.1.0
│   ├── README.md
│   ├── principles/index.md
│   ├── agents/roles/{lead,builder,reviewer}.md
│   ├── agents/adapters/{opencode,codex,claude-code}/
│   ├── skills/vstack-{mode,principles,help,sharpen,discovery,blueprint,plan-loop,blast-radius,tdd,debugging,verify-loop,unstick,review-loop,context-reset,lessons}/SKILL.md
│   ├── workflows/{feature-delivery,bug-fixing,refactoring}.md
│   ├── resources/rubrics/ (6 lenses)
│   ├── resources/templates/ (4 templates)
│   ├── resources/references/quick-ref.md
│   └── scripts/validate-content.js
├── agents-skills/                  # Legacy portable skills (to be migrated)
├── opencode/vstack/                # OpenCode plugin (workspace)
│   ├── src/
│   │   ├── memory/memory-store.ts        # NEW: Project memory store
│   │   ├── deliveries/delivery-store.ts  # NEW: Simplified delivery store
│   │   ├── tasks/task-store.ts           # NEW: Simplified task store (decoupled from lifecycle)
│   │   ├── agents/agent-run-store.ts     # NEW: Agent run tracking
│   │   ├── history/history-service.ts    # NEW: History querying
│   │   ├── quality/check-service.ts      # NEW: Check execution & evidence
│   │   ├── tools/                        # NEW: ~7 cohesive tools
│   │   ├── persistence/                  # File store, locks, event log, repo root
│   │   ├── orchestration/agent-dispatch  # Agent dispatch
│   │   ├── skills/skill-loader           # Playbook skill loading
│   │   ├── agents/agent-installer        # Agent provisioning
│   │   ├── lifecycle/                    # Legacy lifecycle engine (kept for compat)
│   │   └── index.ts                      # Plugin entry point
│   ├── test/                             # 25 passing tests
│   └── package.json                      # @vstack/opencode v0.1.0
├── openchamber/vstack-panel/       # OpenChamber extension (workspace)
├── docs/                           # PRD, implementation plans, project-knowledge/
└── .vstack/                        # Runtime persistence
```

## Working Capabilities (Verified)

| Area | Status | Evidence |
|---|---|---|
| **Playbook package** | ✅ Complete | 15 skills, 3 roles, 3 workflows, validation, cross-harness install |
| **OpenCode plugin bootstrap** | ✅ Loads, initializes services | `src/index.ts` — full setup |
| **Plugin loads Playbook skills** | ✅ Works | `findAgentsSkillsRoot` finds playbook/skills/ |
| **Plugin provisions Playbook agents** | ✅ Works | Adapters from playbook/agents/adapters/opencode/ |
| **Persistence layer** | ✅ Working | file-store, locks, atomic-write, event-log, repo root |
| **Memory store** | ✅ New | CRUD, categories, search, supersede, index |
| **Delivery store** | ✅ New | CRUD, status transitions, simple model |
| **Task store** | ✅ New | CRUD, dependencies, cycles, ready tasks (no phase coupling) |
| **Agent run store** | ✅ New | Dispatch tracking, handoff recording |
| **History service** | ✅ New | Event querying, stats |
| **Check service** | ✅ New | Discover, execute, evidence recording |
| **Tools** | ✅ New | ~7 cohesive tools (status, memory, history, delivery, task, agent, check) |
| **Tests** | ✅ 25/25 PASS | All unit tests pass, typecheck passes |

## Phase 3 Acceptance Criteria — ALL MET

- [x] Delivery and tasks persist across OpenCode restarts
- [x] Task dependencies validated and ready tasks correctly identified
- [x] Concurrent updates don't silently overwrite newer state
- [x] Memory can be searched/read/updated across separate sessions
- [x] Memory is distinct from history and current delivery/task state
- [x] Previous data preserved during migration

## Next Actions (Phase 4 — Agent Coordination & Enforcement)

1. Implement agent dispatch integration with new stores
2. Add evidence/check recording to agent workflows
3. Implement basic completion checks (required evidence, blocking findings)
4. Implement explicit approval requirements for protected actions
4. Verify enforcement boundaries and test bypass paths
5. Update dashboard projection for OpenChamber
6. Test sequential and parallel delivery with native session APIs