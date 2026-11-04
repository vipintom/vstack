# Research Record: vstack-jury

**Date:** 2026-11-02
**Author:** Phase 3 continuation
**Reviewer:**

---

### vstack Purpose and Unique Boundary

- **What it owns:** Multi-reviewer coordination for high-risk changes — coordinating 2-3 independent reviewers with identical brief and rubric, synthesizing findings, resolving disagreements.
- **What it explicitly does NOT own:** Single review (review-loop), adversarial review (interrogate), review rubrics (review-rubrics)
- **How it differs from adjacent skills:**
  - `vstack-review-loop` = single independent reviewer (jury = multiple)
  - `vstack-interrogate` = adversarial, tries to break (jury = cooperative assessment)
  - `vstack-review-rubrics` = provides lenses (jury consumes rubrics)

---

### Cursor pstack Analogue Inspected

- **Skill/Playbook:** (no direct analogue — jury is vstack-specific multi-reviewer)
- **Repository URL:** N/A

---

### Independent Pack Analogue Inspected

- **Pack:** superpowers
- **Skill/Playbook:** requesting-code-review (structured review) + receiving-code-review (fresh context)
- **Repository URL:** https://github.com/obra/superpowers
- **Date Inspected:** 2026-11-02
- **Key Files Read:** skills/requesting-code-review/SKILL.md, skills/receiving-code-review/SKILL.md

---

### Patterns Worth Adopting

**From superpowers requesting-code-review:**
- Structured review package (objective, criteria, diff, evidence, lenses)
- Fresh context reviewer (independent assessment)
- Lens-based findings (Correctness, Architecture, Security, Performance, Maintainability)
- Finding severity (Blocker, Major, Minor, Note)

**From superpowers receiving-code-review:**
- Technical evaluation, not emotional agreement
- Verification required, not performative acceptance
- Independent assessment

---

### Patterns to Adapt for vstack

| Reference pattern | vstack Adaptation |
|---|---|
| Single reviewer | 2-3 reviewers with identical brief |
| Review package | Identical brief + rubric for all reviewers |
| Lens-based findings | Consensus/disagreement analysis |
| Severity levels | Lead disposition for disagreements |

---

### Host/Vendor-Specific Mechanics to Reject

- No host-specific mechanics in core multi-reviewer pattern

---

### Overlap Implications for Neighbouring vstack Skills

| Skill | Overlap | Resolution |
|---|---|---|
| vstack-review-loop | Both review | review-loop = single, jury = multiple for high-risk |
| vstack-interrogate | Both multiple agents | jury = cooperative, interrogate = adversarial |
| vstack-review-rubrics | Both use rubrics | rubrics = provides lenses, jury = consumes |

---

### vstack Design Decision

**Trigger conditions:**
- "Jury review this" / "Multiple reviewers for..."
- High-risk changes (security, data integrity, production, migration)
- When single reviewer insufficient
- When stakeholder confidence requires multiple independent opinions

**Non-triggers:**
- Routine changes
- When single independent reviewer sufficient
- When time/budget doesn't justify

**Procedure (7 steps):**
1. Select reviewers — 2 or 3, sufficiently separated context (different sessions, ideally different models), domain expertise for risk areas
2. Provide identical brief — objective, criteria, out-of-scope, base commit/diff, architecture constraints, verification evidence, pre-defined rubric
3. Conduct independent reviews — each works independently, fresh context, no communication during review
4. Collect findings — structured findings per reviewer: severity, location, evidence, reasoning, independence status
5. Compare and synthesize — identify consensus findings, identify disagreements, validate against actual code
6. Resolve — consensus findings must address, disagreements Lead validates/decides, missing/timed-out reviewer not an approval
7. Report — consolidated findings, consensus vs disagreement, independence status, Lead disposition

**Output:**
- Consolidated findings from all reviewers
- Consensus/disagreement analysis
- Independence status per reviewer
- Lead disposition

**Verification:**
- All reviewers received identical brief
- Findings compared against source code
- No missing reviewer treated as approval

**Evaluation cases:**
- Identical brief for all reviewers
- Independence maintained
- Consensus identification
- Disagreement resolution by Lead
- Independence status tracking
- Time-box adherence (2-4 hours)

---

### Sign-off

- **Author:** Phase 3 continuation
- **Reviewer:**
- **Date:** 2026-11-02