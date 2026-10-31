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