# Current State

**Last updated:** 2026-11-01 (Phase 0 baseline inventory)

## What Exists

### Repository Structure
```
vstack/
├── package.json                    # pnpm workspace root
├── agents-skills/                  # Portable skills & agent definitions (workspace)
│   ├── skills/                     # 11 skill directories (vstack-*)
│   ├── agents/opencode-v2/         # 6 OpenCode agent definitions
│   └── resources/                  # rubrics, templates, references
├── opencode/vstack/                # OpenCode plugin (workspace)
│   ├── src/                        # 45+ TypeScript modules
│   ├── test/                       # 6 test files, 25 tests passing
│   ├── dist/                       # Build output
│   └── package.json                # @vstack/opencode v0.1.0
├── openchamber/vstack-panel/       # OpenChamber extension (workspace)
│   ├── panel/                      # Panel + dashboard entry points
│   └── package.json                # @vstack/openchamber v0.1.0
├── docs/                           # PRD, implementation plans, project-knowledge/
└── .vstack/                        # Runtime persistence (project-local)
    ├── manifest.json
    ├── deliveries/
    ├── reports/
    └── state/
```

### Working Capabilities (Verified)

| Area | Status | Evidence |
|---|---|---|
| **OpenCode plugin bootstrap** | Loads, initializes services, registers tools/commands/skills/agents | `src/index.ts` — full setup with lifecycle engine, task service, session tracker, agent dispatch, gates, review orchestrator, release/deployment/rollback, policy manager |
| **Persistence layer** | File store (atomic writes, locks, revision concurrency), event log, repository root resolution | `src/persistence/*` — all modules present; tests pass for file-store basics |
| **Skills loading** | Loads from `agents-skills/skills/` via `ctx.skill.transform` | `src/skills/skill-loader.ts` + test passes (2 tests) |
| **Agent installation** | Copies agent definitions from `agents-skills/agents/opencode-v2/` to `.opencode/agents/` | `src/agents/agent-installer.ts` + test passes (4 tests) |
| **Task graph & dependencies** | Task service, dependency resolver, assignment | `src/tasks/*` — modules present |
| **Lifecycle engine** | 10-phase profiles, phase transitions, re-entry logic | `src/lifecycle/*` — modules present |
| **Quality gates** | Gate registry, check discovery, execution adapter, evidence ledger, build/test/security/acceptance engines | `src/quality/*` — modules present; evidence-ledger has TS error |
| **Review orchestration** | Review orchestrator, findings, resolution, rubrics | `src/reviews/*` — modules present |
| **Release/Deployment** | Release prep, deployment, rollback, post-release | `src/release/*` — modules present |
| **Agent dispatch & tracking** | OpenCode session dispatch, session tracker | `src/orchestration/agent-dispatch.ts`, `session-tracker.ts` |
| **Recovery** | Recovery manager, reconciliation | `src/recovery/*` — modules present |
| **Policy/Permissions** | Permissions, approvals, autonomy modes | `src/policy/*` — modules present |
| **Tools** | 7 tool namespaces (task, delivery, release, workflow, agent, review, quality) | `src/tools/*` — modules present |
| **Dashboard index** | Generates projection for OpenChamber | `src/dashboard/index-generator.ts` |
| **OpenChamber UI** | Panel + dashboard entry points, API service, components | `openchamber/vstack-panel/panel/*` |
| **Tests** | 25 tests pass (agent-installer, check-discovery, evidence-ledger, skill-loader, runtime-state, execution-adapter) | `pnpm test` ✓ |

### TypeScript Error (Blocking Build)

**File:** `src/quality/evidence-ledger.ts:103`
**Error:** `Type 'Evidence' has no properties in common with type '{ revision?: number | undefined; }.'`
**Cause:** `writeJsonFile` requires `T extends { revision?: number }` but `Evidence` interface lacks `revision` field.
**Impact:** `pnpm typecheck` fails; `pnpm build` fails for opencode package.

### OpenChamber Build Issue

**Error:** `@openchamber/sdk` not available — `bunx @openchamber/sdk/scripts/bundle-guest.ts` fails to resolve hostname.
**Impact:** Cannot build OpenChamber extension. May need SDK installed or different build approach.

### Duplicate check-discovery.ts Discrepancy

Audit reported duplicate path discrepancy. **Actual:** Only one file exists at `src/quality/check-discovery.ts`. No duplicate found.

## What Works End-to-End

- Plugin initializes all services on startup
- Skills load from agents-skills package
- Agent definitions install to `.opencode/agents/`
- Persistence layer reads/writes with atomic ops and locking
- Event log appends
- Dashboard index generates
- All 25 unit tests pass

## What Is Stubs / Unverified

| Module | Concern |
|---|---|
| `lifecycle-engine.ts` | Complex phase state machine — unverified if phases execute correctly |
| `phase-transitions.ts` / `reentry.ts` | Re-entry logic — no integration tests |
| `gate` engines (build, test, security, acceptance) | Separate engines — may duplicate execution-adapter |
| `review-orchestrator.ts` | Multi-reviewer jury — unverified |
| `release/*` modules | Deployment/rollback — likely stubs |
| `orchestration/scheduler.ts` | Priority scheduler — unverified |
| `policy/autonomy.ts` | Autonomy modes — unverified |
| `recovery/*` | Recovery/reconciliation — unverified |
| OpenChamber UI | Reads from `.vstack/state/` directly — not projection-based per new plan |

## Next Actions (Phase 0 Completion)

1. Fix evidence-ledger.ts TypeScript error (add `revision` to Evidence or adjust writeJsonFile)
2. Verify openchamber build — determine if SDK available or defer
3. Complete component inventory with reuse/refactor/remove decisions per Section 9
4. Document OpenCode/OpenChamber API versions used
5. Create initial ADR for Evidence revision field decision