# Known Issues

**Last updated:** 2026-11-01 (All phases complete)

## Resolved Blocking Issues

### 1. Evidence TypeScript Error — **RESOLVED 2026-11-01**
- **File:** `opencode/vstack/src/quality/evidence-ledger.ts:103`
- **Error:** `Type 'Evidence' has no properties in common with type '{ revision?: number | undefined; }.'`
- **Root cause:** `writeJsonFile<T extends { revision?: number }>` requires revision field; `Evidence` interface lacked it
- **Resolution:** Added `revision: number` to `Evidence` interface (ADR-0001)
- **Files changed:** `schemas/types.ts`, `quality/evidence-ledger.ts`, `quality/security.ts`, `quality/test.ts`
- **Verification:** `pnpm typecheck` PASS, `pnpm test` 26/26 PASS

### 2. Delivery ID Prefix Inconsistency — **RESOLVED 2026-11-01**
- **Issue:** Lifecycle engine used `del_` prefix while delivery-store, task-store, index-generator, projection loaders used `dlv_`
- **Impact:** Dashboard index and projection publisher couldn't find deliveries created by lifecycle engine
- **Resolution:** Unified all components to use `dlv_` prefix
- **Files changed:** `lifecycle/lifecycle-engine.ts`, `dashboard/index-generator.ts`, `dashboard/projections/loaders.ts`

### 3. Missing Directory Creation in Stores — **RESOLVED 2026-11-01**
- **Issue:** `createTask`, `createDelivery`, `createAgentRun`, `createMemoryItem` didn't create parent directories before writing
- **Impact:** ENOENT errors in test environments with fresh temp directories
- **Resolution:** Added `mkdirSync(dir, { recursive: true })` before all `writeJsonFile` calls
- **Files changed:** `tasks/task-store.ts`, `deliveries/delivery-store.ts`, `agents/agent-run-store.ts`, `memory/memory-store.ts`, `orchestration/agent-dispatch.ts`

---

## Deferred Issues (Documented Per Plan)

### 4. OpenChamber Build Fails
- **Error:** `@openchamber/sdk` not resolvable — `bunx @openchamber/sdk/scripts/bundle-guest.ts` fails with hostname resolution
- **Impact:** Cannot build OpenChamber extension
- **Workaround:** Deferred per plan; typecheck passes
- **Status:** Documented as prototype limitation; requires SDK access to resolve

---

## Architecture Limitations (Documented Per Plan)

### 5. Single-Machine/Local-Filesystem Assumption
- No multi-host coordination
- `.vstack/` state not shared across machines

### 6. No Event Compaction/Replay
- History grows unbounded in `.vstack/state/events.jsonl`
- No retention policy or compaction implemented

### 7. OpenChamber Polling
- Dashboard refreshes at 2-5s interval (not real-time)
- No WebSocket/push notification support

### 8. Enforcement Bounded by OpenCode Permission API
- Approval stub only — real enforcement requires OpenCode permission API
- Bypass possible via shell commands

### 9. Memory Curation Manual
- No auto-promotion from history to memory
- No decay/archive policies implemented

### 10. No Generic Workflow Engine
- Workflows are Markdown recipes only (in Playbook)
- No TypeScript state machine or scheduler

### 11. No Scheduler/Priority Queue
- Agent dispatch is immediate, not queued
- No priority-based execution ordering

### 12. No Deployment Platform
- Release/deployment modules deferred (P2)
- No rollback automation

### 13. No Cross-Process Concurrency Tests
- Locks and revision conflicts tested only in single-process unit tests
- Real multi-session behavior unvalidated

### 14. No Migration Runner Tests
- Schema version tracking exists but migration execution not tested end-to-end

---

## Functional Gaps (Future Work)

### 15. Memory Auto-Curation
- Manual `createItem` only
- No automatic extraction from history/events
- No relevance scoring or decay

### 16. OpenChamber Real-Time Updates
- Polling-based only
- No server-sent events or WebSocket

### 17. Advanced Enforcement
- Approval is stub only
- No signed attestations or audit trail beyond event log

### 18. Cross-Harness Portability Validation
- Playbook validated for OpenCode only
- Claude Code, Codex, other harnesses not tested

---

## Test Coverage Gaps

### 19. No Integration Tests (Previously)
- Now have E2E test covering full workflow

### 20. No OpenChamber Tests
- No UI/integration tests for OpenChamber panel

### 21. No Migration Tests
- Schema migration not tested end-to-end

### 22. No Concurrent Session Tests
- Multi-user/multi-session behavior unvalidated