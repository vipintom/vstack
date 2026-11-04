# Research Record: vstack-best-of-n

**Date:** 2026-11-02
**Author:** Phase 3 continuation
**Reviewer:**

---

### vstack Purpose and Unique Boundary

- **What it owns:** Empirical comparison of competing implementations — running bounded independent attempts for problems where multiple materially different solutions may be viable.
- **What it explicitly does NOT own:** Design alternatives (arena), parallel coverage (swarm), adversarial review (interrogate), implementation (tdd)
- **How it differs from adjacent skills:**
  - `vstack-arena` = design/code bakeoff with rubric and cross-judge (best-of-n = implementation comparison)
  - `vstack-swarm` = coverage/races (best-of-n = alternative implementations of same problem)
  - `vstack-interrogate` = adversarial findings (best-of-n = constructive alternatives)
  - `vstack-architect` = identifies need for alternatives (invokes best-of-n)

---

### Cursor pstack Analogue Inspected

- **Skill/Playbook:** (no direct analogue — best-of-n is vstack-specific)
- **Repository URL:** N/A

---

### Independent Pack Analogue Inspected

- **Pack:** deepseek-stack
- **Skill/Playbook:** ds-best-of-n
- **Repository URL:** https://github.com/aicodeking/deepseek-stack
- **Date Inspected:** 2026-11-02
- **Key Files Read:** N/A (not found at expected path)

---

### Patterns Worth Adopting

**From poteto-mode arena:**
- Rubric defined before candidates (prevents gaming)
- Cross-judge from different model family
- Grafting not mechanical paste
- Verification on synthesized result

**From superpowers test-driven-development:**
- Evidence-based evaluation (run tests, not descriptions)
- Minimal, focused evaluation

---

### Patterns to Adapt for vstack

| Reference pattern | vstack Adaptation |
|---|---|
| Arena rubric | Best-of-n rubric (correctness, simplicity, performance, maintainability, testability) |
| Arena cross-judge | Single evaluator with rubric (simpler) |
| Arena graft | Select strongest or combine improvements |
| Arena verification | Full verification on final result |

---

### Host/Vendor-Specific Mechanics to Reject

- Cursor-specific isolation (worktree) — fallback to directory isolation
- Model-specific runners — abstract to capability tiers

---

### Overlap Implications for Neighbouring vstack Skills

| Skill | Overlap | Resolution |
|---|---|---|
| vstack-arena | Both alternatives | arena = design bakeoff, best-of-n = implementation bakeoff |
| vstack-swarm | Both parallel | swarm = coverage/races, best-of-n = competing implementations |
| vstack-interrogate | Both multiple agents | interrogate = adversarial, best-of-n = constructive |
| vstack-verify-loop | Both verify | verify-loop = verification execution, best-of-n = evaluation of alternatives |

---

### vstack Design Decision

**Trigger conditions:**
- "Best of n for..." / "Compare implementations of..."
- When multiple materially different solutions may be viable
- When design uncertainty is high and empirical comparison helps
- When vstack-arena needs implementation candidates

**Non-triggers:**
- Predictable mechanical edits
- When additional cost not justified
- Routine implementation
- Design phase → vstack-arena

**Procedure (6 steps):**
1. Define common task — single prompt with acceptance criteria, shared constraints, explicit out-of-scope
2. Define comparison rubric — criteria (correctness, simplicity, performance, maintainability, testability), weights, PASS/FAIL thresholds
3. Generate candidates — default 3 independent attempts, isolated workspaces, same base commit
4. Evaluate candidates — run equivalent verification on each, score against rubric, compare actual code/evidence
5. Select and integrate — choose strongest or combine improvements, re-run full verification on final result, record selection rationale
6. Clean up — discard non-selected workspaces, keep selected changes

**Output:**
- Selected implementation
- Rubric scores for each candidate
- Selection rationale
- Discarded approaches documented

**Verification:**
- All candidates evaluated against same rubric
- Final result passes full verification
- Selection based on evidence, not descriptions

**Evaluation cases:**
- Rubric defined before generation
- Isolation maintained
- Evidence-based scoring
- Selection rationale documented
- Cleanup of non-selected
- Time-box adherence (2-4 hours)

---

### Sign-off

- **Author:** Phase 3 continuation
- **Reviewer:**
- **Date:** 2026-11-02