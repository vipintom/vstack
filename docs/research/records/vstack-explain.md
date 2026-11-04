# Research Record: vstack-explain

**Date:** 2026-11-02
**Author:** Phase 3 continuation
**Reviewer:**

---

### vstack Purpose and Unique Boundary

- **What it owns:** Communication/synthesis — producing concise, source-grounded explanations for specific audiences (developer, reviewer, stakeholder) from findings produced by discovery skills.
- **What it explicitly does NOT own:** Discovery (how/why), decision recording (ledger), review (review-loop)
- **How it differs from adjacent skills:**
  - `vstack-how` = raw runtime behaviour discovery (explain consumes how's output)
  - `vstack-why` = design rationale discovery (explain consumes why's output)
  - `vstack-review-loop` = structured review with lenses (explain = communication artifact for review)
  - `vstack-ledger` = decision trail recording (explain = input to ledger)

---

### Cursor pstack Analogue Inspected

- **Skill/Playbook:** (no direct analogue in pstack — explain is a vstack-specific communication skill)
- **Repository URL:** N/A
- **Date Inspected:** 2026-11-02

---

### Independent Pack Analogue Inspected

- **Pack:** superpowers
- **Skill/Playbook:** receiving-code-review (communication of findings) + writing-plans (structured communication)
- **Repository URL:** https://github.com/obra/superpowers
- **Date Inspected:** 2026-11-02
- **Key Files Read:** skills/receiving-code-review/SKILL.md, skills/writing-plans/SKILL.md

---

### Patterns Worth Adopting

**From superpowers receiving-code-review:**
- Structured feedback format with categories
- Evidence-backed findings
- Clear recommendations

**From superpowers writing-plans:**
- Audience-aware communication
- Lead with conclusion
- DRY, YAGNI in communication

**From poteto-mode principles:**
- Encode Lessons in Structure: communication patterns as templates
- Procedures over vague instructions: explicit output format

---

### Patterns to Adapt for vstack

| Reference pattern | vstack Adaptation |
|---|---|
| Review feedback format | Explanation template with audience variants |
| Plan structure | Explanation structure (Context → Findings → Inferences → Unknowns → Implications) |
| Evidence citations | File:line references mandatory |

---

### Host/Vendor-Specific Mechanics to Reject

- No host-specific mechanics in core communication pattern

---

### Overlap Implications for Neighbouring vstack Skills

| Skill | Overlap | Resolution |
|---|---|---|
| vstack-how | Both investigate | how = raw facts, explain = synthesized communication |
| vstack-why | Both investigate | why = historical rationale, explain = communication of findings |
| vstack-review-loop | Both produce structured output | review-loop = assessment, explain = communication artifact |
| vstack-ledger | Both record decisions | ledger = decision trail, explain = communication for ledger |

---

### vstack Design Decision

**Trigger conditions:**
- "Explain this to..." / "Communicate findings to..."
- After vstack-how/vstack-why produce findings that need communication
- Preparing review briefs for vstack-review-loop
- Documenting decisions for vstack-ledger

**Non-triggers:**
- Raw discovery → vstack-how/vstack-why
- Decision recording → vstack-ledger
- Review assessment → vstack-review-loop

**Procedure:**
1. Determine audience and purpose (developer/reviewer/stakeholder)
2. Select key findings (focus on decision-relevant, omit dead ends, include unknowns)
3. Structure explanation: Context → Key findings (with sources) → Inferences (labeled, confidence) → Unknowns → Implications
4. Ground in sources: every claim has file:line or evidence reference
5. Keep concise: lead with conclusion, support with evidence, no fluff

**Output format:**
- Context: what investigated and why
- Key findings: observed facts with source refs
- Inferences: labeled as such with confidence
- Unknowns: explicitly stated
- Implications: for current task/decision

**Evaluation cases:**
- Audience-appropriate detail level
- All claims have source citations
- Inferences separated from observations
- Unknowns explicit
- Concise (10-20 min time-box)

---

### Sign-off

- **Author:** Phase 3 continuation
- **Reviewer:**
- **Date:** 2026-11-02