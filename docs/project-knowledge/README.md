# Project Knowledge Base

## Purpose

This directory contains the authoritative engineering documentation for vstack itself — how it is built, the decisions made, the current implementation state, tests that have actually run, and the next useful action. It is distinct from runtime project memory (`.vstack/`) which is a product capability vstack provides to projects using it.

## Update Rules

- **Session start:** Read README.md, CURRENT-STATE.md, IMPLEMENTATION-STATUS.md, and relevant architecture/decision pages. Inspect actual repository state.
- **During work:** Update architecture/decision records when material design decisions are made. Record discoveries, deviations, blockers, compatibility findings as they occur.
- **Session end:** Update CURRENT-STATE.md, IMPLEMENTATION-STATUS.md, WORK-LOG.md. Record exact test commands and results. Update KNOWN-ISSUES.md. State next recommended task and any blocking question.
- **Never** wait until milestone to write — documentation is part of definition of done for each substantial task.

## Contents

| File | Purpose |
|---|---|
| `CURRENT-STATE.md` | What exists, what works, what is next |
| `ARCHITECTURE.md` | Current package boundaries and data flow |
| `COMPONENT-INVENTORY.md` | Existing modules and reuse/refactor/remove decisions |
| `IMPLEMENTATION-STATUS.md` | Milestones, completed work, outstanding work |
| `TESTING.md` | Test commands, prerequisites, verified results |
| `KNOWN-ISSUES.md` | Confirmed defects, limitations, workarounds |
| `WORK-LOG.md` | Concise chronological implementation log |
| `decisions/` | Architecture decision records (ADRs) |

## Project Status

**All 6 implementation phases complete** (2026-11-01)

- **Phase 0:** Baseline & Knowledge Base ✅
- **Phase 1:** Playbook Foundation ✅
- **Phase 2:** OpenCode Integration ✅
- **Phase 3:** Runtime Foundation ✅
- **Phase 4:** Agent Coordination & Enforcement ✅
- **Phase 5:** OpenChamber Visualization ✅
- **Phase 6:** E2E Validation ✅

**Test Results:** 26/26 PASS (opencode/vstack), Typecheck PASS, Build PASS

**Git Tags:** `phase-0-baseline`, `phase-3-complete`, `phase-4-complete`, `phase-5-complete`, `phase-6-complete`

## Open Source Readiness

See IMPLEMENTATION-STATUS.md for open items before public release.
