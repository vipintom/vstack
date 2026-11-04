# Research Record: vstack-tdd

**Date:** 2026-11-02
**Author:** Phase 3 kickoff
**Reviewer:** 

---

### vstack Purpose and Unique Boundary

- **What it owns:** Test-first implementation for bug fixes with clear, cheap test paths. Red-Green-Refactor cycle with mandatory failure verification.
- **What it explicitly does NOT own:** Design (architect), verification beyond the test (verify-loop), debugging (debug), unstick (unstick)
- **How it differs from adjacent skills:**
  - `vstack-verify-loop` = broader verification (tdd = single test-first cycle)
  - `vstack-debug` = failure reproduction and hypothesis testing (tdd = test-first for known bug)
  - `vstack-unstick` = breaking assumption cycles (tdd = normal cycle)

---

### Cursor pstack Analogue Inspected

- **Skill/Playbook:** tdd
- **Repository URL:** https://github.com/cursor/plugins/tree/main/pstack/skills/tdd
- **Commit/Revision:** main branch, commit 1064da72ceca07bf7f36bddebada585bb59da7bc
- **Date Inspected:** 2026-11-02
- **Key Files Read:** SKILL.md

---

### Independent Pack Analogue Inspected

- **Pack:** superpowers
- **Skill/Playbook:** test-driven-development
- **Repository URL:** https://github.com/obra/superpowers
- **Date Inspected:** 2026-11-02
- **Key Files Read:** skills/test-driven-development/SKILL.md

---

### Patterns Worth Adopting

**From poteto-mode tdd:**
- **Scope:** Bug fixes with clear, cheap local test target
- **Skip when:** test path unclear, expensive, integration-heavy, not requested
- **Iron Law:** NO PRODUCTION CODE WITHOUT A FAILING TEST FIRST
- **Red-Green-Refactor** with mandatory verify steps
- **Good tests:** one behavior, clear name, real code (no mocks unless unavoidable)
- **Guardrails:** don't change tests to match wrong implementation, don't weaken assertions, keep focused
- **If impractical:** closest executable check (script, manual repro, snapshot, log assertion)

**From superpowers test-driven-development:**
- **Iron Law:** "If you didn't watch the test fail, you don't know if it tests the right thing"
- **Delete code before test** — start over
- **Red-Green-Refactor** cycle with verification
- **Test quality:** minimal, clear, shows intent, real code
- **Common rationalizations** table (excuse vs reality)
- **Red flags:** code before test, test passes immediately, can't explain failure
- **Debugging integration:** bug found → write failing test reproducing it → TDD cycle

---

### Patterns to Adapt for vstack

| poteto-pattern | vstack Adaptation |
|---|---|
| Cursor-specific test commands | Abstract: "project test command" — harness provides |
| Jest/TypeScript examples | Language-agnostic: pattern applies to any test framework |

---

### Host/Vendor-Specific Mechanics to Reject

- No host-specific mechanics in core TDD pattern
- Jest-specific examples adapted to generic

---

### Overlap Implications for Neighbouring vstack Skills

| Skill | Overlap | Resolution |
|---|---|---|
| vstack-verify-loop | Both verify | TDD = single test-first cycle, Verify-loop = broader verification suite |
| vstack-debug | Both reproduce failures | Debug = hypothesis testing, TDD = test-first for known bug |
| vstack-unstick | Both handle stuck | Unstick = assumption breaking, TDD = normal cycle |
| vstack-architect | Both design then implement | Architect = sketch, TDD = test-first implementation |

---

### vstack Design Decision

**Trigger conditions:**
- Bug fix with clear, cheap test path
- Explicit user request for TDD
- Regression test needed
- NOT: throwaway prototypes, generated code, config files, unclear/expensive test paths

**Procedure (Iron Law):**
1. **Understand bug** — intended vs current behavior, smallest reproduction
2. **Choose narrowest executable check** — existing test path preferred
3. **Write failing test FIRST** — one behavior, clear name, real code
4. **Verify RED** — watch it fail correctly (mandatory)
5. **GREEN** — minimal code to pass
6. **Verify GREEN** — test passes, suite green (mandatory)
7. **REFACTOR** — clean up, keep tests green
8. **Repeat** for next behavior

**If failing test impractical:** closest executable check (script, manual, snapshot, log assertion)

**Guardrails:**
- Don't change tests to match wrong implementation
- Don't weaken assertions
- Keep regression test focused
- No new test over bad test

**Output/evidence:**
- Failing-before test + failure output
- Passing-after test run + nearby validation
- If no failing-before: state why + closest check used

**Evaluation cases:**
- Red phase: test fails for expected reason
- Green phase: minimal code, test passes
- Refactor: tests stay green
- Full suite green after
- Impractical test path → closest executable check
- Guardrail violations caught

---

### Sign-off

- **Author:** Phase 3 kickoff
- **Reviewer:** 
- **Date:** 2026-11-02