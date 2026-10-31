# Known Issues

**Last updated:** 2026-11-01 (Phase 0 baseline)

## Blocking Issues

### 1. Evidence TypeScript Error — **RESOLVED 2026-11-01**
- **File:** `opencode/vstack/src/quality/evidence-ledger.ts:103`
- **Error:** `Type 'Evidence' has no properties in common with type '{ revision?: number | undefined; }.'`
- **Root cause:** `writeJsonFile<T extends { revision?: number }>` requires revision field; `Evidence` interface lacked it
- **Resolution:** Added `revision: number` to `Evidence` interface (ADR-0001)
- **Files changed:** `schemas/types.ts`, `quality/evidence-ledger.ts`, `quality/security.ts`, `quality/test.ts`
- **Verification:** `pnpm typecheck` PASS, `pnpm test` 25/25 PASS

### 2. OpenChamber Build Fails
- **Error:** `@openchamber/sdk` not resolvable — `bunx @openchamber/sdk/scripts/bundle-guest.ts` fails with hostname resolution
- **Impact:** Cannot build OpenChamber extension; blocks Phase 5 work
- **Workaround:** Defer OpenChamber build until SDK access resolved; typecheck passes
- **Investigation needed:** Check if SDK is published to npm, requires auth, or different import path

## Architecture Issues (Per New Plan)

### 3. Over-Engineered Lifecycle Engine
- **Modules:** `lifecycle/lifecycle-engine.ts`, `profiles.ts`, `phase-transitions.ts`, `reentry.ts`
- **Issue:** Complex phase state machine with 10 phases, re-entry logic, profile registry — exceeds prototype scope
- **Plan action:** Transform profiles to Markdown recipes; simplify to basic delivery/task transition validation

### 4. Specialized Quality Engines
- **Modules:** `quality/build.ts`, `test.ts`, `security.ts`, `acceptance.ts`, `verification.ts`
- **Issue:** Separate engines for each check type — duplicates execution-adapter; plan calls for single generic check runner
- **Plan action:** Defer to P2; keep execution-adapter + evidence-ledger only

### 5. Release/Deployment Engine
- **Modules:** `release/release-preparation.ts`, `deployment.ts`, `rollback.ts`, `post-release.ts`
- **Issue:** Full deployment platform — explicitly out of prototype scope (P2)
- **Plan action:** Defer; remove from active execution path

### 6. Orchestration Framework
- **Modules:** `orchestration/coordinator.ts`, `scheduler.ts`, `cancellation.ts`
- **Issue:** Separate coordination layer, priority scheduler, complex cancellation — plan says remove
- **Plan action:** Defer; keep basic agent-dispatch + session-tracker only

### 7. Policy/Autonomy Framework
- **Modules:** `policy/autonomy.ts`, `permissions.ts`, `approvals.ts` (complex parts)
- **Issue:** Elaborate autonomy modes, general policy registry — plan says simplify to few explicit rules
- **Plan action:** Refactor to small protected-action rules only

### 8. Recovery/Reconciliation Complexity
- **Modules:** `recovery/recovery-manager.ts`, `reconciliation.ts`
- **Issue:** Complex auto-healing, speculative retry — plan says simple honest recovery only
- **Plan action:** Reduce to interrupted-session detection + explicit resume

### 9. OpenChamber Reads Internals Directly
- **Module:** `openchamber/vstack-panel/panel/src/services/api.ts`
- **Issue:** Reads delivery/task/evidence files directly — violates read-only projection boundary
- **Plan action:** Refactor to read only `.vstack/state/index.json` + published reports

### 10. Agent Installation Uses Unsupported API
- **Module:** `opencode/vstack/src/index.ts` lines 71-82
- **Issue:** Uses `ctx.agent.transform` with `editor.add()` — API investigation found this doesn't exist
- **Plan action:** Provision native agent files via filesystem to OpenCode-recognized location

## Functional Gaps

### 11. No Migration Runner
- **Module:** `persistence/schema-version.ts` tracks versions but no migration execution
- **Plan action:** Implement minimal migration support for actual schema changes

### 12. No Cross-Process Concurrency Tests
- **Modules:** `persistence/locks.ts`, `file-store.ts` revision conflicts
- **Plan action:** Test concurrent updates from separate OpenCode sessions before claiming correctness

### 13. Skills CLI Layout Unvalidated
- **Issue:** Plan Section 4.3 requires testing `npx skills add` against proposed `playbook/skills/` structure before finalizing
- **Plan action:** Test in Phase 0/1 boundary

### 14. Duplicate Skill Trees Risk
- **Current:** Skills in `agents-skills/skills/` AND will be in `playbook/skills/`
- **Plan action:** Avoid duplicate trees; use single canonical location Skills CLI recognizes

## Limitations (Documented Per Plan)

- Single-machine/local-filesystem assumption — no multi-host coordination
- No event compaction/replay — history grows unbounded
- OpenChamber polling at 2-5s — not real-time
- Enforcement bounded by OpenCode permission API — bypass via shell possible
- Memory curation manual — no auto-promotion from history