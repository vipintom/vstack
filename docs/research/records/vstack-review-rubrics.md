# Research Record: vstack-review-rubrics

**Date:** 2026-11-02
**Author:** Phase 3 continuation
**Reviewer:**

---

### vstack Purpose and Unique Boundary

- **What it owns:** Reusable review lenses/criteria — supplying structured quality attribute checks for security, performance, maintainability, accessibility, and data integrity.
- **What it explicitly does NOT own:** Review process (review-loop), multi-reviewer coordination (jury), adversarial review (interrogate)
- **How it differs from adjacent skills:**
  - `vstack-review-loop` = applies rubrics (rubrics = defines them)
  - `vstack-jury` = uses shared rubric (rubrics = provides)
  - `vstack-interrogate` = uses adversarial lenses (rubrics = cooperative lenses)
  - `vstack-design-audit` = structured audit (rubrics = component of audit)

---

### Cursor pstack Analogue Inspected

- **Skill/Playbook:** (no direct analogue — rubrics are vstack-specific)
- **Repository URL:** N/A

---

### Independent Pack Analogue Inspected

- **Pack:** superpowers
- **Skill/Playbook:** receiving-code-review (lens categories) + correctness-regression rubric
- **Repository URL:** https://github.com/obra/superpowers
- **Date Inspected:** 2026-11-02
- **Key Files Read:** skills/receiving-code-review/SKILL.md, resources/rubrics/

---

### Patterns Worth Adopting

**From superpowers receiving-code-review:**
- Lens categories: Correctness, Architecture, Security, Performance, Maintainability
- Severity levels: Blocker, Major, Minor, Note

**From poteto-mode principles:**
- Encode Lessons in Structure: rubrics encode review patterns
- Procedures over vague instructions: explicit criteria per lens

---

### Patterns to Adapt for vstack

| Reference pattern | vstack Adaptation |
|---|---|
| 5 lens categories | 5 rubric categories (Security, Performance, Maintainability, Accessibility, Data Integrity) |
| Severity levels | Critical/High/Medium/Low/Informational |
| Systematic application | Each lens independently, then consolidate |

---

### Host/Vendor-Specific Mechanics to Reject

- No host-specific mechanics in core rubric pattern

---

### Overlap Implications for Neighbouring vstack Skills

| Skill | Overlap | Resolution |
|---|---|---|
| vstack-review-loop | Both lenses | rubrics = defines, review-loop = applies |
| vstack-jury | Both rubrics | rubrics = provides, jury = consumes shared |
| vstack-interrogate | Both lenses | rubrics = cooperative, interrogate = adversarial |
| vstack-design-audit | Both structured | design-audit = audit process, rubrics = lenses |

---

### vstack Design Decision

**Trigger conditions:**
- "Apply rubrics for..." / "Review lenses for..."
- For every vstack-review-loop
- For vstack-jury shared rubric
- For vstack-interrogate systematic challenge
- As reference for self-review

**Non-triggers:**
- As substitute for domain expertise
- For domains not covered by available rubrics

**Procedure:**
1. Select applicable rubrics for review scope
2. Apply systematically — each lens independently
3. Generate findings per lens
4. Consolidate — deduplicate, prioritize

**Available Rubrics (5 categories):**

**Security & Data Integrity:**
- Authorization: every endpoint/data access checked
- Input validation: all untrusted input validated at boundaries
- Secrets: no hardcoded secrets, proper rotation
- Encryption: data at rest/in transit
- Audit: sensitive operations logged
- Injection: SQL, command, XSS, path traversal prevented

**Performance & Resources:**
- Complexity: algorithmic bounds appropriate
- Database: queries indexed, N+1 avoided
- Memory: no leaks, bounded caches
- Concurrency: no deadlocks, proper pooling
- Scaling: horizontal/vertical limits known

**Maintainability & Style:**
- Coupling: low between modules, high cohesion
- Naming: consistent, intention-revealing
- Duplication: DRY, no copy-paste
- Abstraction: appropriate level, not over-engineered
- Documentation: public APIs documented, decisions recorded

**Accessibility & UX:**
- Semantic HTML, ARIA where needed
- Keyboard navigation
- Color contrast
- Error messages actionable
- Loading states

**Data Integrity & Correctness:**
- Invariants: encoded in types/schemas
- Transactions: ACID where required
- Idempotency: retryable operations safe
- Migrations: backward compatible, tested
- Edge cases: null, empty, boundary, concurrent

**Output:**
- Findings tagged by rubric/lens
- Coverage across applicable quality attributes

**Verification:**
- All applicable rubrics applied
- Findings reference specific rubric criteria
- No quality attribute silently ignored

**Evaluation cases:**
- Rubric selection for scope
- Systematic application per lens
- Finding consolidation
- Coverage completeness

---

### Sign-off

- **Author:** Phase 3 continuation
- **Reviewer:**
- **Date:** 2026-11-02