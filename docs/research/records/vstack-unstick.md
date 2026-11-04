# Research Record: vstack-unstick

**Date:** 2026-11-02
**Author:** Phase 3 kickoff
**Reviewer:** 

---

### vstack Purpose and Unique Boundary

- **What it owns:** Breaking out of repeating failure cycles — name the shared assumption, test it directly, list different approaches, pick one, restart clean.
- **What it explicitly does NOT own:** Normal implementation (tdd), verification (verify-loop), debugging (debug), design (architect)
- **How it differs from adjacent skills:**
  - `vstack-debug` = reproduction + hypothesis testing (unstick = assumption breaking after 3+ failures)
  - `vstack-tdd` = normal test-first cycle (unstick = cycle breaker)
  - `vstack-verify-loop` = verification execution (unstick = approach change)

---

### Cursor pstack Analogue Inspected

- **Skill/Playbook:** (not found in pstack — implied in poteto-mode principles)
- **Repository URL:** N/A
- **Date Inspected:** 2026-11-02

---

### Independent Pack Analogue Inspected

- **Pack:** deepseek-stack
- **Skill/Playbook:** ds-unstick
- **Repository URL:** https://github.com/aicodeking/deepseek-stack
- **Commit/Revision:** main branch (inspected via web search)
- **Date Inspected:** 2026-11-02
- **Key Files Read:** SKILL.md (via web fetch)

---

### Patterns Worth Adopting

**From deepseek-stack ds-unstick:**
- **Trigger:** After 2+ failed fixes with same error/wrong behavior
- **Step 1:** Stop editing, don't try third variation
- **Step 2:** Write failed attempts (what changed + what happened + exact error)
- **Step 3:** Name the SHARED assumption (one sentence)
- **Step 4:** Test assumption with cheapest probe (print, log, which, grep, minimal script)
- **Step 5:** If false → found real problem, plan fix from new fact
- **Step 6:** If holds → list 3 DIFFERENT approaches (different mechanism/library/layer/data path)
- **Step 7:** Pick one, say why in one sentence
- **Step 8:** Restart clean (git stash/checkout) if debris
- **Step 9:** Record in PROGRESS.md (via context-reset)
- **Step 10:** Return to verify-loop with new approach
- **Stop when:** probe explains failure OR new approach passes check
- **Two rounds max:** then report to user with attempts, assumptions, evidence

**From poteto-mode principles:**
- **Attack the Premise:** "Two or more fixes that share one premise have failed the same gate. Write the premise down and test it directly before you write another fix that assumes it."
- **Fix Root Causes:** "Trace each symptom back to the first place the system went wrong and fix it there."
- **Redesign from First Principles:** "Integrating a new requirement into an existing design. Redesign as if it had been foundational from day one."

---

### Patterns to Adapt for vstack

| deepseek-pattern | vstack Adaptation |
|---|---|
| PROGRESS.md for recording | vstack-unstick records to ledger/checkpoint |
| git stash/checkout for clean restart | Abstract: "clean state restart" — harness provides |
| Cheapest probe for assumption test | Keep — minimal probe principle |
| 3 different approaches (mechanism/layer/data path) | Keep — materially different |

---

### Host/Vendor-Specific Mechanics to Reject

- PROGUST.md specific to deepseek-stack
- git stash/checkout as only clean restart method

---

### Overlap Implications for Neighbouring vstack Skills

| Skill | Overlap | Resolution |
|---|---|---|
| vstack-debug | Both handle failures | Debug = reproduction + hypothesis, Unstick = assumption breaking after 3+ |
| vstack-tdd | Both cycles | TDD = normal cycle, Unstick = cycle breaker |
| vstack-verify-loop | Both execute | Verify-loop = verification, Unstick = approach change |
| vstack-architect | Both design | Architect = sketch, Unstick = assumption test on implementation |

---

### vstack Design Decision

**Trigger conditions:**
- 3+ failed fix attempts on same task (same error/wrong behavior)
- Explicit user request: "unstick this"
- Notice retrying small variations
- Same assumption failing repeatedly

**Non-triggers:**
- First or second failure → debug/tdd normal cycle
- Different errors each time → debug each
- Design phase → architect

**Procedure (10 steps):**
1. Stop editing, no third variation
2. Failed attempts list: change + result + exact error
3. Name shared assumption (one sentence)
4. Test assumption with cheapest probe (print, log, which, grep, minimal script)
5. If false → plan fix from new fact
6. If holds → list 3 materially different approaches (mechanism/library/layer/data path)
7. Pick one, say why in one sentence
8. Restart clean if debris (git stash/checkout)
9. Record false assumption/chosen approach in checkpoint
10. Return to verify-loop with new approach

**Stop conditions:**
- Probe explains failure OR new approach passes check
- Two rounds of unstick failed → report to user with attempts, assumptions, evidence

**Rules:**
- Do not repeat failed fix even with small changes
- Evidence beats reasoning
- Keep failed-attempt list (most useful for report)
- Clean state before new approach

**Evaluation cases:**
- Trigger after 3 failures
- Failed attempts documented
- Shared assumption named
- Probe tests assumption directly
- 3 materially different approaches listed
- Clean restart before new approach
- Checkpoint recording
- Two-round limit

---

### Sign-off

- **Author:** Phase 3 kickoff
- **Reviewer:** 
- **Date:** 2026-11-02