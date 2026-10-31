# Current State

**Last updated:** 2026-11-01 (Phase 4 complete)

## What Exists

### Repository Structure
```
vstack/
├── package.json                    # pnpm workspace root
├── playbook/                       # Portable playbook package
├── agents-skills/                  # Legacy portable skills (to be migrated)
├── opencode/vstack/                # OpenCode plugin (workspace)
│   ├── src/
│   │   ├── memory/memory-store.ts        # Project memory store
│   │   ├── deliveries/delivery-store.ts  # Simplified delivery store
│   │   ├── tasks/task-store.ts           # Simplified task store
│   │   ├── agents/agent-run-store.ts     # Agent run tracking
│   │   ├── history/history-service.ts    # History querying
│   │   ├── quality/check-service.ts      # Check execution & evidence
│   │   ├── enforcement/enforcement-service.ts  # Basic enforcement rules
│   │   ├── orchestration/agent-dispatch.ts     # Agent dispatch
│   │   ├── tools/                        # ~7 cohesive tools
│   │   ├── persistence/                  # File store, locks, event log, repo root
│   │   ├── skills/skill-loader           # Playbook skill loading
│   │   ├── agents/agent-installer        # Agent provisioning
│   │   ├── lifecycle/                    # Legacy lifecycle engine
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
| **Memory store** | ✅ | CRUD, categories, search, supersede, index |
| **Delivery store** | ✅ | CRUD, status transitions, simple model |
| **Task store** | ✅ | CRUD, dependencies, cycles, ready tasks (no phase coupling) |
| **Agent run store** | ✅ | Dispatch tracking, handoff recording |
| **History service** | ✅ | Event querying, stats |
| **Check service** | ✅ | Discover, execute, evidence recording |
| **Enforcement service** | ✅ | 5 basic rules: completion checks, blocked reason, approval |
| **Tools** | ✅ | ~7 cohesive tools (status, memory, history, delivery, task, agent, check) |
| **Agent dispatch** | ✅ | Integrated with agentRunStore, proper handoff |
| **Tests** | ✅ 25/25 PASS | All unit tests pass, typecheck passes |

## Phase 4 Acceptance Criteria — ALL MET

- [x] Lead can dispatch Builder and Reviewer sessions and relate them to tasks
- [x] Session outcomes are persisted and visible after restart
- [x] Interrupted sessions are marked honestly and can be resumed deliberately
- [x] A check run by the plugin records the actual observed result
- [x] Required evidence is checked before a protected completion transition
- [x] Approval state is recorded and the supported OpenCode permission boundary is tested
- [x] Plugin tools remain small and understandable
- [x] No generic workflow engine or scheduler has been introduced

## Next Actions (Phase 5 — OpenChamber Visualization)

1. Audit existing OpenChamber UI components
2. Define dashboard projection contract
3. Extend OpenCode index generator to publish summary/read-model data
4. Refactor OpenChamber data layer to read only projections
5. Remove direct reads of delivery/task/evidence internals
6. Implement freshness, loading, stale and unavailable states
7. Validate SDK methods and extension metadata