# Research Record: vstack-sharpen

**Date:** 2026-11-02
**Author:** Phase 3 continuation
**Reviewer:**

---

### vstack Purpose and Unique Boundary

- **What it owns:** Request clarification — restates request, identifies missing pieces (problem, done criteria, constraints, scope), proposes sharpened version with testable acceptance criteria, confirms with user.
- **What it explicitly does NOT own:** Discovery (how/why), planning (plan-loop), implementation (incremental-build), mode routing (mode)
- **How it differs from adjacent skills:**
  - `vstack-mode` = invokes sharpen when request vague (sharpen = clarifies)
  - `vstack-how` = runtime behaviour (sharpen = clarifies request)
  - `vstack-why` = design rationale (sharpen = clarifies request)
  - `vstack-plan-loop` = creates plan (sharpen = input to plan)

---

### Cursor pstack Analogue Inspected

- **Skill/Playbook:** (no direct analogue — sharpen is vstack-specific)
- **Repository URL:** N/A

---

### Independent Pack Analogue Inspected

- **Pack:** superpowers
- **Skill/Playbook:** brainstorming (drawing out intent) + writing-plans (clarity before planning)
- **Repository URL:** https://github.com/obra/superpowers
- **Date Inspected:** 2026-11-02
- **Key Files Read:** skills/brainstorming/SKILL.md, skills/writing-plans/SKILL.md

---

### Patterns Worth Adopting

**From superpowers brainstorming:**
- Answer first: goal, problem, smallest change
- Restate user's goal in each subagent brief
- Open each PR's "Why" with goal

**From superpowers writing-plans:**
- Announce: "I'm using the writing-plans skill"
- Spec as authority
- Bite-sized tasks

---

### Patterns to Adapt for vstack

| Reference pattern | vstack Adaptation |
|---|---|
| Goal restatement | Request restatement in own words |
| Intent before planning | Sharpen before discovery/planning |
| Testable acceptance criteria | 3-5 testable criteria |

---

### Host/Vendor-Specific Mechanics to Reject

- No host-specific mechanics in core sharpening pattern

---

### Overlap Implications for Neighbouring vstack Skills

| Skill | Overlap | Resolution |
|---|---|---|
| vstack-mode | Both routing | mode = invokes sharpen, sharpen = clarifies |
| vstack-how | Both investigate | sharpen = clarifies, how = discovers behaviour |
| vstack-why | Both investigate | sharpen = clarifies, why = discovers rationale |
| vstack-plan-loop | Both plan | sharpen = input, plan-loop = creates plan |

---

### vstack Design Decision

**Trigger conditions:**
- User request is vague, ambiguous, or missing acceptance criteria
- Before vstack-how/why or vstack-plan-loop
- When Lead cannot form a clear task breakdown

**Non-triggers:**
- Request already has clear problem statement and acceptance criteria

**Procedure (5 steps):**
1. Restate the request in your own words
2. Identify missing pieces:
   - What is the specific problem?
   - What does "done" look like? (acceptance criteria)
   - What are the constraints? (time, scope, risk, compatibility)
   - What is out of scope?
3. Propose a sharpened version with:
   - Clear problem statement
   - 3-5 testable acceptance criteria
   - Explicit scope boundaries
   - Risk level (low/medium/high/critical)
4. Confirm with user (or document assumptions if user unavailable)
5. Record the sharpened request as the delivery objective

**Output:**
- Sharpened problem statement
- Acceptance criteria (testable, specific)
- Scope boundaries
- Risk assessment

**Verification:**
- Acceptance criteria are testable (pass/fail determinable)
- Scope boundaries exclude known out-of-scope items
- Risk level matches potential blast radius

**Evaluation cases:**
- Request restatement accuracy
- Missing piece identification
- Acceptance criteria testability
- Risk assessment accuracy

---

### Sign-off

- **Author:** Phase 3 continuation
- **Reviewer:**
- **Date:** 2026-11-02