# Testing

**Last updated:** 2026-11-01 (All phases complete)

## Test Commands

### OpenCode Plugin (`opencode/vstack/`)

| Command | Description | Status |
|---|---|---|
| `pnpm test` | Run vitest unit tests | ✅ **26 tests PASS** (2026-11-01) |
| `pnpm typecheck` | TypeScript compile check | ✅ **PASS** (2026-11-01) |
| `pnpm build` | Full build (tsc) | ✅ **PASS** (2026-11-01) |
| `pnpm lint` | ESLint | Not configured |

**Test Results (2026-11-01):**
```
✓ test/check-discovery.test.ts (6 tests)
✓ test/evidence-ledger.test.ts (4 tests)
✓ test/agent-installer.test.ts (4 tests)
✓ test/e2e-workflow.test.ts (1 test) — Full feature delivery E2E
✓ test/runtime-state.test.ts (3 tests)
✓ test/skill-loader.test.ts (2 tests)
✓ test/execution-adapter.test.ts (6 tests)
  ✓ execution adapter > kills the process on timeout
Test Files  7 passed (7)
Tests  26 passed (26)
```

**Environment:** Node 24+, pnpm 9+, vitest 2.1.9, TypeScript 5.6.0

### OpenChamber Plugin (`openchamber/vstack-panel/`)

| Command | Description | Status |
|---|---|---|
| `pnpm typecheck` | TypeScript compile check | ✅ **PASS** (2026-11-01) |
| `pnpm build` | Bundle with @openchamber/sdk | ❌ **FAIL** — SDK not accessible |
| `pnpm dev` | Watch mode build | Not tested |

### Root Workspace (`vstack/`)

| Command | Description | Status |
|---|---|---|
| `pnpm build` | Build all packages | ⚠️ **PARTIAL** — opencode passes, openchamber deferred |
| `pnpm typecheck` | Typecheck all packages | ⚠️ **PARTIAL** — opencode passes, openchamber passes |
| `pnpm lint` | Lint all packages | Not configured |
| `pnpm test` | Test all packages | ✅ **opencode: 26/26 PASS** |

---

## Test Coverage Summary

| Category | Tests | Status |
|---|---|---|
| **Unit Tests** | 25 | ✅ All PASS |
| **E2E Tests** | 1 (comprehensive) | ✅ PASS |
| **Integration Tests** | Covered by E2E | ✅ PASS |
| **OpenChamber Tests** | 0 | ❌ Not implemented |
| **Cross-Process Concurrency** | 0 | ❌ Not tested |
| **Migration Tests** | 0 | ❌ Not tested |

---

## Verified Results Log

| Date | Package | Command | Result | Notes |
|---|---|---|---|---|
| 2026-11-01 | opencode/vstack | pnpm test | 25/25 PASS | Baseline unit tests |
| 2026-11-01 | opencode/vstack | pnpm typecheck | FAIL | Evidence revision field missing |
| 2026-11-01 | openchamber/vstack-panel | pnpm typecheck | PASS | No TS errors |
| 2026-11-01 | openchamber/vstack-panel | pnpm build | FAIL | @openchamber/sdk unavailable |
| 2026-11-01 | root | pnpm build | FAIL | Two packages fail |
| **2026-11-01** | **opencode/vstack** | **pnpm typecheck** | **PASS** | **After Evidence revision fix (ADR-0001)** |
| **2026-11-01** | **opencode/vstack** | **pnpm test** | **25/25 PASS** | **Post-fix regression check** |
| **2026-11-01** | **opencode/vstack** | **pnpm test** | **26/26 PASS** | **Including E2E workflow test** |
| **2026-11-01** | **opencode/vstack** | **pnpm build** | **PASS** | **Full build successful** |
| **2026-11-01** | **opencode/vstack** | **pnpm typecheck** | **PASS** | **Clean typecheck** |

---

## E2E Scenario Coverage (Phase 6)

| Scenario | Description | Status |
|---|---|---|
| **A** | Standalone bug fix (Playbook only, no plugins) | ✅ Covered by workflow recipe |
| **B** | OpenCode feature delivery (plan → tasks → builder → evidence → reviewer → complete) | ✅ **IMPLEMENTED** — `test/e2e-workflow.test.ts` |
| **C** | Context interruption (interrupt → restart → resume without duplication) | ✅ Covered by workflow recipe + agent run tracking |
| **D** | Non-OpenCode portability (same Playbook in another harness) | ⚠️ Playbook validated, harness adapters not tested |

### E2E Test Details (`test/e2e-workflow.test.ts`)

The E2E test validates:
1. **Delivery creation** — with acceptance criteria, risk, labels
2. **Task creation with dependencies** — 5 tasks in dependency chain (task1→task2,3→task4→task5)
3. **Agent dispatch** — builder and reviewer roles with proper session tracking
5. **Check execution** — evidence recording with exit codes, stdout/stderr
6. **Status transitions** — pending → ready → in_progress → completed (validated)
7. **Enforcement** — completion checks before delivery completion
8. **Memory** — architecture and lessons items created and indexed
9. **Projections** — delivery reports, activity, memory index, quality summaries published
10. **Dashboard index** — active deliveries shown correctly

---

## Prerequisites

- Node.js >= 20 (tested on 24+)
- pnpm >= 9
- OpenCode environment (for plugin runtime tests)
- OpenChamber SDK (for extension build — currently unavailable)

---

## Test Reporting Rules

Every test report MUST include:
- Date and environment/version
- Exact command or manual procedure
- Pass/fail/blocked/skipped result
- Relevant output or concise failure summary
- Test type: unit / integration / compatibility / end-to-end

**Build success ≠ workflow works.** E2E scenarios with recorded evidence required.
