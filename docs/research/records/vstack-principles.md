# Research Record: vstack-principles

**Date:** 2026-11-02
**Author:** Phase 3 continuation
**Reviewer:**

---

### vstack Purpose and Unique Boundary

- **What it owns:** Core decision rules — 10 principles applied in order when making decisions, each with trigger, behavior, and example. Not a router, not a procedure.
- **What it explicitly does NOT own:** Skill procedures (skills), playbook workflows (playbooks), skill selection (help), mode routing (mode)
- **How it differs from adjacent skills:**
  - `vstack-mode` = invokes principles (principles = decision rules)
  - `vstack-help` = finds skills (principles = guides decisions)
  - `vstack-sharpen` = clarifies request (principles = guides sharpening)
  - Principle leaf files = individual principle details (principles skill = applies them)

---

### Cursor pstack Analogue Inspected

- **Skill/Playbook:** (no direct analogue — principles as decision rules is vstack-specific)
- **Repository URL:** N/A

---

### Independent Pack Analogue Inspected

- **Pack:** superpowers
- **Skill/Playbook:** principles (as methodology) + brainstorming (intent)
- **Repository URL:** https://github.com/obra/superpowers
- **Date Inspected:** 2026-11-02
- **Key Files Read:** skills/brainstorming/SKILL.md (references principles)

---

### Patterns Worth Adopting

**From poteto-mode principles:**
- 10 principles with triggers, behaviors, examples
- Apply in order when making decisions
- Name the principle that shaped each decision
- Principles change decisions, they are not slogans

**From superpowers brainstorming:**
- Principles as intent alignment
- Document principles that shaped decisions

---

### Patterns to Adapt for vstack

| poteto-pattern | vstack Adaptation |
|---|---|
| 10 principles in order | Same 10 principles with triggers |
| Name principle for each decision | Same — cite principle that shaped choice |
| Leaf files for each principle | Principles skill applies leaf files |

---

### Host/Vendor-Specific Mechanics to Reject

- No host-specific mechanics in core principles pattern

---

### Overlap Implications for Neighbouring vstack Skills

| Skill | Overlap | Resolution |
|---|---|---|
| vstack-mode | Both use principles | mode = invokes, principles = rules |
| vstack-help | Both guide | help = finds skills, principles = decision rules |
| vstack-sharpen | Both clarify | sharpen = clarifies, principles = guides |
| Principle leaf files | Both content | principles skill = applies, leaf files = content |

---

### vstack Design Decision

**Trigger conditions:**
- As a reference during any decision
- When evaluating a proposed approach
- When resolving ambiguity in a skill or workflow

**Non-triggers:**
- As a substitute for a specific skill's procedure

**Procedure (10 principles applied in order):**
1. Harness independence first — Does this work without proprietary runtime?
2. Procedures over vague instructions — Is there a concrete step-by-step?
3. Flexible workflows — Does the process fit the task size and risk?
4. Loops first — Is there a bounded feedback loop with escalation?
5. Small team — Can this use Lead/Builder/Reviewer + skills?
6. Evidence before completion — What executed check supports the claim?
7. Independent challenge — Is review sufficiently context-separated?
8. Runtime simplicity — Does the plugin add only what instructions can't?
9. Clear responsibility — Who owns this: playbook, plugin, or OpenChamber?
10. Degrade gracefully — Does it work without advanced harness features?

**Output:**
- Decision aligned with principles
- Documented adaptation if harness requires it

**Verification:**
- Decision traceable to specific principle(s)
- No principle violated without documented reason

**Evaluation cases:**
- Principle application in order
- Decision traceability
- Harness adaptation documentation

---

### Sign-off

- **Author:** Phase 3 continuation
- **Reviewer:**
- **Date:** 2026-11-02