# Research Record: vstack-plan-review

**Date:** 2026-11-02
**Author:** Phase 3 continuation
**Reviewer:**

---

### vstack Purpose and Unique Boundary

- **What it owns:** Independent plan challenge — fresh context review of assumptions, omissions, dependencies, unnecessary steps, alternatives, and acceptance criteria.
- **What it explicitly does NOT own:** Plan creation (plan-loop), implementation (incremental-build), review of implementation (review-loop), adversarial review (interrogate)
- **How it differs from adjacent skills:**
  - `vstack-plan-loop` = creates plan (plan-review = challenges)
  - `vstack-review-loop` = reviews implementation (plan-review = reviews plan)
  - `vstack-interrogate` = adversarial (plan-review = cooperative challenge)
  - `vstack-jury` = multi-reviewer (plan-review = single reviewer)

---

### Cursor pstack Analogue Inspected

- **Skill/Playbook:** (no direct analogue — plan review is vstack-specific)
- **Repository URL:** N/A

---

### Independent Pack Analogue Inspected

- **Pack:** superpowers
- **Skill/Playbook:** receiving-code-review (fresh context review) + writing-plans (plan quality)
- **Repository URL:** https://github.com/obra/superpowers
- **Date Inspected:** 2026-11-02
- **Key Files Read:** skills/receiving-code-review/SKILL.md, skills/writing-plans/SKILL.md

---

### Patterns Worth Adopting

**From superpowers receiving-code-review:**
- Fresh context (new session, no implementation history)
- Read only the review package
- Apply lenses systematically
- Structured findings with severity

**From superpowers writing-plans:**
- Self-review checklists: spec coverage, step scan, type consistency, review focus
- DRY, YAGNI, TDD, frequent commits

---

### Patterns to Adapt for vstack

| Reference pattern | vstack Adaptation |
|---|---|
| Fresh context review | Explicit fresh context requirement (new session or reset) |
| Lens-based findings | Challenge categories: assumptions, omissions, dependencies, unnecessary, alternatives |
| Severity levels | Blocker/Major/Minor/Note |

---

### Host/Vendor-Specific Mechanics to Reject

- No host-specific mechanics in core plan review pattern

---

### Overlap Implications for Neighbouring vstack Skills

| Skill | Overlap | Resolution |
|---|---|---|
| vstack-plan-loop | Both plan | plan-loop = creates, plan-review = challenges |
| vstack-review-loop | Both review | plan-review = plan, review-loop = implementation |
| vstack-interrogate | Both challenge | plan-review = cooperative, interrogate = adversarial |
| vstack-jury | Both review | plan-review = single, jury = multiple |

---

### vstack Design Decision

**Trigger conditions:**
- After vstack-plan-loop creates a plan
- Before implementing Standard or Advanced mode tasks
- When plan has high risk or uncertainty

**Non-triggers:**
- For Quick mode tasks (no formal plan)
- For plans with trivial, obvious steps

**Procedure (6 steps):**
1. Use fresh context — start new session or explicitly reset context, do not carry implementation reasoning into review
2. Challenge each plan element:
   - Assumptions: what must be true for each step to work? Are they verified?
   - Omissions: what steps are missing? (integration, cleanup, migration, rollback, config, docs)
   - Dependencies: correctly ordered? Any circular deps?
   - Unnecessary steps: can any step be removed or simplified?
   - Alternatives: is there a simpler approach?
3. Verify risky assumptions — for each unverified assumption: can it be tested before implementation? Mark assumptions that must be validated first
4. Check acceptance criteria — does each step have meaningful verification? Are criteria observable and specific? Do criteria collectively satisfy delivery acceptance?
5. Assess scope and risk — does plan match workflow mode? Are high-risk steps identified with extra verification?
6. Produce review findings — findings: missing steps, unverified assumptions, unnecessary complexity, simpler alternatives; severity: Blocker/Major/Minor/Note; proposed revisions

**Output:**
- Review findings with severity
- Revised plan (or confirmation)
- List of assumptions to verify before implementation

**Verification:**
- Review conducted in fresh context
- All assumptions explicitly addressed
- No unverified critical assumptions remain

**Evaluation cases:**
- Fresh context enforcement
- Assumption challenge completeness
- Omission detection
- Dependency validation
- Alternative identification

---

### Sign-off

- **Author:** Phase 3 continuation
- **Reviewer:**
- **Date:** 2026-11-02