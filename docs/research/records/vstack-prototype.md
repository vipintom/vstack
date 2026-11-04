# Research Record: vstack-prototype

**Date:** 2026-11-02
**Author:** Phase 3 continuation
**Reviewer:**

---

### vstack Purpose and Unique Boundary

- **What it owns:** Disposable experiments — builds minimal code to resolve empirical or design uncertainty, answers specific question, discards prototype, records findings.
- **What it explicitly does NOT own:** Architecture design (architect), detailed design (blueprint), implementation (incremental-build/tdd), verification (verify-loop)
- **How it differs from adjacent skills:**
  - `vstack-architect` = identifies uncertainties (prototype = resolves them)
  - `vstack-blueprint` = detailed spec (prototype = disposable experiment)
  - `vstack-incremental-build` = production code (prototype = disposable)
  - `vstack-verify-loop` = verification (prototype = measurement)

---

### Cursor pstack Analogue Inspected

- **Skill/Playbook:** (no direct analogue — prototype is vstack-specific)
- **Repository URL:** N/A

---

### Independent Pack Analogue Inspected

- **Pack:** deepseek-stack
- **Skill/Playbook:** ds-prototype (closest analogue)
- **Repository URL:** https://github.com/aicodeking/deepseek-stack
- **Date Inspected:** 2026-11-02
- **Key Files Read:** N/A (not found at expected path)

---

### Patterns Worth Adopting

**From poteto-mode principles:**
- Prove It Works: evidence-based experimentation
- Smallest Complete Change: minimal experiment

**From superpowers test-driven-development:**
- Red-Green-Refactor: apply to experiment (define success, build, measure)

---

### Patterns to Adapt for vstack

| Reference pattern | vstack Adaptation |
|---|---|
| Architect identifies uncertainties | Prototype resolves architect's uncertainties |
| Minimal experiment | Smallest code to answer question |
| Evidence-based | Measurements, observations, documented learnings |

---

### Host/Vendor-Specific Mechanics to Reject

- No host-specific mechanics in core prototype pattern

---

### Overlap Implications for Neighbouring vstack Skills

| Skill | Overlap | Resolution |
|---|---|---|
| vstack-architect | Both uncertainty | architect = identifies, prototype = resolves |
| vstack-blueprint | Both design | blueprint = spec, prototype = experiment |
| vstack-incremental-build | Both code | incremental-build = production, prototype = disposable |
| vstack-verify-loop | Both verify | verify-loop = functional, prototype = experimental measurement |

---

### vstack Design Decision

**Trigger conditions:**
- When vstack-architect has competing designs with empirical uncertainty
- When vstack-how cannot determine behaviour without execution
- When performance characteristics are unknown
- When integration feasibility is unclear

**Non-triggers:**
- When uncertainty can be resolved by reading code/docs
- For production code (prototype is disposable)
- When cost exceeds value of information

**Procedure (5 steps):**
1. Define the question — what specific uncertainty does this resolve? What would constitute a clear answer?
2. Design minimal experiment — smallest code to answer the question, disposable (not production quality), isolated from production systems
3. Define success criteria — quantitative (latency < X, throughput > Y), qualitative (API feels right, integration works), failure conditions
4. Build and run — time-boxed implementation, instrument for measurement, run in representative environment
5. Analyze results — compare against success criteria, note unexpected behaviours, document learnings
6. Decide and clean up — answer the question, discard prototype code, record findings in vstack-ledger or project memory

**Output:**
- Answer to the uncertainty question
- Evidence (measurements, observations)
- Decision rationale
- Prototype discarded

**Verification:**
- Question answered with evidence
- Prototype code not merged
- Findings recorded

**Evaluation cases:**
- Question definition clarity
- Experiment minimality
- Success criteria measurability
- Result analysis completeness
- Cleanup enforcement

---

### Sign-off

- **Author:** Phase 3 continuation
- **Reviewer:**
- **Date:** 2026-11-02