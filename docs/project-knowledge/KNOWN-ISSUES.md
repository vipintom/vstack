# Known Issues — vstack v0.1.0

---

## Architecture Constraints (By Design)

| # | Constraint | Impact |
|---|------------|--------|
| 1 | Single-machine / local filesystem | No multi-host coordination; `.vstack/` not shared across machines |
| 2 | No event compaction/replay | History grows unbounded in `.vstack/state/events.jsonl`; no retention policy |
| 3 | OpenChamber polling (not real-time) | Dashboard refreshes at interval; no WebSocket/SSE |
| 4 | Enforcement bounded by host API | Approval recording may be stub; bypass possible via shell |
| 5 | No generic workflow engine | Workflows = Markdown recipes only; no TS state machine/scheduler |
| 6 | No scheduler/priority queue | Agent dispatch immediate, not queued; no priority ordering |
| 7 | No deployment platform | Release/deployment modules deferred; no rollback automation |

---

## Functional Gaps (v2 Core Scope)

| # | Gap | Status |
|---|-----|--------|
| 8 | Memory curation manual | No auto-promotion from history; no decay/archive policies |
| 9 | Cross-harness portability | Codex/Claude Code adapters marked unsupported; content re-authoring must produce tested adapters |

---

## Test Coverage Gaps

| # | Gap | Status |
|---|-----|--------|
| 10 | No OpenChamber integration tests | No UI/integration tests for panel |
| 11 | No concurrent session tests | Multi-user/multi-session unvalidated |
| 12 | No migration tests | N/A (greenfield — no v1 migration) |

---

## Known Limitations (Carried Forward)

| # | Limitation | Status |
|---|------------|--------|
| 1 | OpenChamber SDK | ✅ NOW AVAILABLE — build passes |
| 2 | Codex/Claude Code adapters | ❌ Not implemented; content re-authoring must produce tested adapters |
| 3 | No token cost budget | Routing learning uses vstack persistence; no budget enforcement |
| 4 | Project-specific skills in project | By design per ADR-0010 |
| 5 | Approval expiry not enforced | Records support `expiresAt` but no auto-expire |
| 6 | Worktree strategy limited | Only `opencode-native` strategy supported |
| 7 | Jury procedure is playbook skill only | No runtime jury orchestration; by design |
| 8 | Extended execution is methodology | Requires manual checkpoints; workflows = Markdown recipes |

---

## Phase 11b Complete — Missing Content Resolved

All previously missing content created:
- 16 principle leaf files in `principles/`
- 15 workflow files in `workflows/` (total 18)
- Playbook validation: 0 errors, 0 warnings
- E2E tests: 103/103 pass with full manifest

---

## Resolved in v0.1.0 Release

| Issue | Resolution |
|-------|------------|
| Evidence TypeScript error | Added `revision` field |
| Delivery ID prefix inconsistency | Unified to `dlv_` |
| Missing directory creation | Fixed in stores |
| OpenChamber SDK build | Now PASS |
| Manifest duplicate `vstack-ledger` | Fixed; validation PASS |
