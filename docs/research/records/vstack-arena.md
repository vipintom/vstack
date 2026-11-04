# Research Record: vstack-arena

**Date:** 2026-11-02
**Author:** Phase 3 kickoff
**Reviewer:** 

---

### vstack Purpose and Unique Boundary

- **What it owns:** Parallel candidate generation, cross-judgment, base selection, grafting. Produces ONE synthesized artifact from N parallel candidates.
- **What it explicitly does NOT own:** Design process (architect invokes arena), implementation (tdd), verification (verify-loop), design rationale (why)
- **How it differs from adjacent skills:**
  - `vstack-architect` = invokes arena for design alternatives (arena is mechanism)
  - `vstack-swarm` = parallel workers for coverage/races/gauntlets (arena = design/code bakeoffs)
  - `vstack-best-of-n` = special case of arena for prototype comparison

---

### Cursor pstack Analogue Inspected

- **Skill/Playbook:** arena
- **Repository URL:** https://github.com/cursor/plugins/tree/main/pstack/skills/arena
- **Commit/Revision:** main branch, commit 276eb958ee333a81105a66ef3f417b72ddf88126
- **Date Inspected:** 2026-11-02
- **Key Files Read:** SKILL.md

---

### Independent Pack Analogue Inspected

- **Pack:** deepseek-stack
- **Skill/Playbook:** ds-best-of-n
- **Repository URL:** https://github.com/aicodeking/deepseek-stack
- **Date Inspected:** 2026-11-02
- **Key Files Read:** N/A (skill not found at expected path)

---

### Patterns Worth Adopting

**From poteto-mode arena:**
- **Phase A: Frame** — artifact, 3-6 gradeable rubric criteria, runner selection (different model families), worktree isolation
- **Phase B: Fan out** — all N in one message, run_in_background, each with own output path
- **Phase C: Cross-judge** — judge from DIFFERENT model family, scores against rubric, recommends base
- **Phase D: Pick base** — criterion-by-criterion scoring, agreement confirms, disagreement = bias/rubric issue
- **Phase E: Graft** — walk losers for 1-2 things each, fold by hand, not mechanical paste
- **Phase F: Verify** — prove-it-works on synthesized artifact
- **Outputs:** Synthesized artifact + synthesis note (base, why, judge verdict, grafts, rejections, convergence, verification)

---

### Patterns to Adapt for vstack

| poteto-pattern | vstack Adaptation |
|---|---|
| arena runners from pstack-models.mdc | Abstract: "judgment model + fast model from different families" |
| cross-judge pool from different family | Capability tier: "cross-family judge" |
| auto/inherit-parent model resolution | Adapter handles model selection |
| Task tool with model parameter | Abstract: "dispatch with model capability" |
| git worktree for isolation | Fallback: directory isolation |
| Candidates see only task, not rubric | Keep — prevents gaming |

---

### Host/Vendor-Specific Mechanics to Reject

- pstack-models.mdc for runner/judge selection
- Specific model slugs
- Cursor Task tool with model parameter
- Cursor-specific worktree handling
- run_in_background: true

---

### Overlap Implications for Neighbouring vstack Skills

| Skill | Overlap | Resolution |
|---|---|---|
| vstack-architect | Architect invokes arena | Arena = candidate generation mechanism |
| vstack-swarm | Both parallel | Swarm = coverage/races, Arena = design bakeoffs with rubric |
| vstack-best-of-n | Special case of arena | Best-of-n = prototype comparison, Arena = general design/code bakeoff |
| vstack-interrogate | Both use arena structure | Interrogate = adversarial review, Arena = design synthesis |

---

### vstack Design Decision

**Trigger conditions:**
- "Arena this" / "Throw it in the arena"
- Design or code bakeoff needed
- When one attempt would lock in wrong shape
- Explicit user request for parallel candidates

**Non-triggers:**
- Straightforward implementation (no alternatives)
- Single clear approach
- When architect not invoked (arena is architect's mechanism)

**Procedure (6 phases):**
1. **Frame** — artifact, rubric (3-6 criteria), runners (different families), isolation
2. **Fan out** — N parallel with own output paths
3. **Cross-judge** — judge from different family, scores against rubric
4. **Pick base** — criterion-by-criterion, agreement confirms
5. **Graft** — 1-2 things per loser, fold by hand
6. **Verify** — prove-it-works on synthesized artifact

**Outputs:**
- Synthesized artifact
- Synthesis note: base, why, judge verdict, grafts, rejections, convergence, verification

**Evaluation cases:**
- Frame with rubric and isolation
- N parallel candidates with distinct outputs
- Cross-judge from different family
- Criterion-by-criterion base selection
- Grafting (not mechanical paste)
- Verification of synthesized artifact

---

### Sign-off

- **Author:** Phase 3 kickoff
- **Reviewer:** 
- **Date:** 2026-11-02