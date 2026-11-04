# Research Record: vstack-design-audit

**Date:** 2026-11-02
**Author:** Phase 3 continuation
**Reviewer:**

---

### vstack Purpose and Unique Boundary

- **What it owns:** Structured design/implementation audit — evaluates against defined quality attributes (correctness, security, performance, maintainability, scalability, observability, operability), scores each, produces prioritized findings.
- **What it explicitly does NOT own:** Review of implementation (review-loop), adversarial review (interrogate), multi-reviewer (jury), verification execution (verify-loop)
- **How it differs from adjacent skills:**
  - `vstack-review-loop` = reviews implementation (design-audit = audits design/implementation)
  - `vstack-interrogate` = adversarial (design-audit = cooperative audit)
  - `vstack-jury` = multi-reviewer (design-audit = single auditor)
  - `vstack-review-rubrics` = supplies lenses (design-audit = uses attributes)
  - `vstack-architect` = design validation (design-audit = audits existing)

---

### Cursor pstack Analogue Inspected

- **Skill/Playbook:** (no direct analogue — design audit is vstack-specific)
- **Repository URL:** N/A

---

### Independent Pack Analogue Inspected

- **Pack:** superpowers
- **Skill/Playbook:** receiving-code-review (lenses) + systematic-debugging (analysis)
- **Repository URL:** https://github.com/obra/superpowers
- **Date Inspected:** 2026-11-02
- **Key Files Read:** skills/receiving-code-review/SKILL.md, skills/systematic-debugging/SKILL.md

---

### Patterns Worth Adopting

**From superpowers receiving-code-review:**
- Lens categories: Correctness, Architecture, Security, Performance, Maintainability
- Severity: Blocker, Major, Minor, Note
- Evidence-backed findings

**From superpowers systematic-debugging:**
- Root cause investigation
- Evidence-based analysis

---

### Patterns to Adapt for vstack

| Reference pattern | vstack Adaptation |
|---|---|
| 5 lens categories | 7 quality attributes (correctness, security, performance, maintainability, scalability, observability, operability) |
| Severity levels | PASS/CONCERN/FAIL per attribute |
| Evidence-backed findings | Code references for each finding |

---

### Host/Vendor-Specific Mechanics to Reject

- No host-specific mechanics in core design audit pattern

---

### Overlap Implications for Neighbouring vstack Skills

| Skill | Overlap | Resolution |
|---|---|---|
| vstack-review-loop | Both assess | review-loop = implementation, design-audit = design/implementation |
| vstack-interrogate | Both challenge | design-audit = cooperative, interrogate = adversarial |
| vstack-jury | Both multi | design-audit = single, jury = multiple |
| vstack-review-rubrics | Both lenses | review-rubrics = provides, design-audit = uses |
| vstack-architect | Both design | architect = creates, design-audit = audits |

---

### vstack Design Decision

**Trigger conditions:**
- Before major changes to assess current state
- After implementation to validate against design
- When inheriting unfamiliar code
- As part of vstack-review-loop for high-risk changes

**Non-triggers:**
- For routine changes with clear scope
- When design is already validated

**Procedure (5 steps):**
1. Define audit scope and attributes — attributes: correctness, security, performance, maintainability, scalability, observability, operability; select relevant subset; define pass/fail criteria per attribute
2. Inspect against each attribute:
   - Correctness: invariants, edge cases, error handling, state consistency
   - Security: authorization, input validation, secrets, data exposure, attack surface
   - Performance: complexity, resource usage, bottlenecks, scalability limits
   - Maintainability: coupling, cohesion, naming, documentation, test coverage
   - Scalability: horizontal/vertical limits, partition strategy, state management
   - Observability: logging, metrics, tracing, alerting coverage
   - Operability: deployment, rollback, config, debugging support
3. Collect evidence — code references for each finding, metrics/benchmarks where available, test coverage gaps
4. Score and summarize — Per-attribute: PASS / CONCERN / FAIL; Overall: acceptable / needs improvement / blocking; Prioritize findings by risk
5. Report findings — structured findings with location, severity, evidence, recommendation; recommendations per finding; risk of not addressing

**Output:**
- Audit report with per-attribute scores
- Structured findings (location, severity, evidence, recommendation)
- Prioritized improvement list

**Verification:**
- All scoped attributes evaluated
- Findings grounded in code evidence
- Recommendations actionable

**Evaluation cases:**
- Attribute coverage
- Finding evidence quality
- Scoring accuracy
- Recommendation actionability

---

### Sign-off

- **Author:** Phase 3 continuation
- **Reviewer:**
- **Date:** 2026-11-02