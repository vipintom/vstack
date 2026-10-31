# Testing

**Last updated:** 2026-11-01 (Phase 0 baseline)

## Test Commands

### OpenCode Plugin (`opencode/vstack/`)

| Command | Description | Status |
|---|---|---|
| `pnpm test` | Run vitest unit tests | ✅ **25 tests PASS** (2026-11-01) |
| `pnpm typecheck` | TypeScript compile check | ❌ **FAIL** — evidence-ledger.ts error |
| `pnpm build` | Full build (tsc) | ❌ **FAIL** — same TS error |
| `pnpm lint` | ESLint | Not run |

**Test Results (2026-11-01):**
```
✓ test/agent-installer.test.ts (4 tests) 14ms
✓ test/check-discovery.test.ts (6 tests) 28ms
✓ test/evidence-ledger.test.ts (4 tests) 13ms
✓ test/skill-loader.test.ts (2 tests) 7ms
✓ test/runtime-state.test.ts (3 tests) 18ms
✓ test/execution-adapter.test.ts (6 tests) 440ms
Test Files  6 passed (6)
Tests  25 passed (25)
```

**Environment:** Node 20+, pnpm 9+, vitest 2.1.9, TypeScript 5.6.0

### OpenChamber Plugin (`openchamber/vstack-panel/`)

| Command | Description | Status |
|---|---|---|
| `pnpm typecheck` | TypeScript compile check | ✅ **PASS** (2026-11-01) |
| `pnpm build` | Bundle with @openchamber/sdk | ❌ **FAIL** — SDK not accessible |
| `pnpm dev` | Watch mode build | Not tested |

### Root Workspace (`vstack/`)

| Command | Description | Status |
|---|---|---|
| `pnpm build` | Build all packages | ❌ **FAIL** — opencode + openchamber fail |
| `pnpm typecheck` | Typecheck all packages | ❌ **FAIL** — opencode fails |
| `pnpm lint` | Lint all packages | Not run |
| `pnpm test` | Test all packages | Partial — only opencode has tests |

## Test Coverage Notes

- **No integration tests** — only unit tests for isolated modules
- **No end-to-end tests** — no delivery workflow execution tested
- **No OpenChamber tests** — no UI/integration tests
- **No cross-process concurrency tests** — locks/revision conflicts untested
- **No migration tests** — schema-version tracking exists but no migration runner

## Prerequisites

- Node.js >= 20
- pnpm >= 9
- OpenCode environment (for plugin runtime tests)
- OpenChamber SDK (for extension build — currently unavailable)

## Verified Results Log

| Date | Package | Command | Result | Notes |
|---|---|---|---|---|
| 2026-11-01 | opencode/vstack | pnpm test | 25/25 PASS | All unit tests pass |
| 2026-11-01 | opencode/vstack | pnpm typecheck | FAIL | Evidence revision field missing |
| 2026-11-01 | openchamber/vstack-panel | pnpm typecheck | PASS | No TS errors |
| 2026-11-01 | openchamber/vstack-panel | pnpm build | FAIL | @openchamber/sdk unavailable |
| 2026-11-01 | root | pnpm build | FAIL | Two packages fail |

## Required Test Additions (Per Plan Section 11)

### Playbook Content Tests (Phase 1)
- Frontmatter validation
- Unique skill names
- Internal reference resolution
- Workflow recipe references valid skills/roles
- No OpenCode API dependencies in core content
- Cross-harness install tests (OpenCode, Claude Code, Codex)

### Plugin Unit Tests (Phase 3-4)
- Project-root resolution
- File-store read/write/schema validation
- Atomic writes & lock behavior
- Stale lock recovery
- Revision conflict detection
- History append & malformed-tail handling
- Memory CRUD
- Delivery/task status updates
- Dependency cycle detection & ready-task calculation
- Agent-run state mapping
- Check execution timeout/output limits/result mapping
- Evidence association & completion checks
- Approval requirements & permission decisions
- Dashboard projection generation
- Agent installer idempotency & user-customization protection

### Integration Tests (Phase 4)
- Delivery create → task create → dependency update → status update → history event
- Memory update → new plugin session → memory retrieval
- Agent dispatch → session association → completion event
- Agent interruption → recovery detection → explicit resume
- Check execution → evidence record → completion check
- Review finding creation → resolution → completion status
- State mutation → dashboard index refresh
- Concurrent updates → revision conflict/locking behavior
- Old-format fixture → migration → post-migration schema validation

### OpenChamber Tests (Phase 5)
- Valid projection load
- Missing projection
- Unsupported projection version
- Stale projection timestamp
- Partial/corrupt report
- Refresh after revision change
- Detail-page lazy load
- History paging/limits
- No write/command/session/mutation calls from extension

### E2E Scenarios (Phase 6)
- **Scenario A:** Standalone bug fix (Playbook only, no plugins)
- **Scenario B:** OpenCode feature delivery (plan → tasks → builder → evidence → reviewer → complete)
- **Scenario C:** Context interruption (interrupt → restart → resume without duplication)
- **Scenario D:** Non-OpenCode portability (same Playbook in another harness)

## Test Reporting Rules

Every test report MUST include:
- Date and environment/version
- Exact command or manual procedure
- Pass/fail/blocked/skipped result
- Relevant output or concise failure summary
- Test type: unit / integration / compatibility / end-to-end

**Build success ≠ workflow works.** E2E scenarios with recorded evidence required.