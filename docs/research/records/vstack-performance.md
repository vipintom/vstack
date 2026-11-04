# Research Record: vstack-performance

**Date:** 2026-11-02
**Author:** Phase 3 continuation
**Reviewer:**

---

### vstack Purpose and Unique Boundary

- **What it owns:** Performance baseline establishment and optimization — defines metrics, benchmarks current code, identifies bottlenecks via profiling, hypothesizes and tests optimizations, verifies improvements.
- **What it explicitly does NOT own:** Live runtime diagnosis (runtime-forensics), trace/profile analysis (trace-forensics), code-level debugging (debug), verification execution (verify-loop)
- **How it differs from adjacent skills:**
  - `vstack-runtime-forensics` = live system symptoms (performance = baseline + optimization)
  - `vstack-trace-forensics` = post-mortem trace analysis (performance = active optimization)
  - `vstack-debug` = failure reproduction (performance = measurable slowness)
  - `vstack-verify-loop` = functional verification (performance = performance verification)

---

### Cursor pstack Analogue Inspected

- **Skill/Playbook:** (no direct analogue — performance optimization is vstack-specific)
- **Repository URL:** N/A

---

### Independent Pack Analogue Inspected

- **Pack:** superpowers
- **Skill/Playbook:** verification-before-completion (evidence-based verification)
- **Repository URL:** https://github.com/obra/superpowers
- **Date Inspected:** 2026-11-02
- **Key Files Read:** skills/verification-before-completion/SKILL.md

---

### Patterns Worth Adopting

**From poteto-mode principles:**
- Prove It Works: evidence-based optimization
- Model Domain Explicitly: metrics, bottlenecks, trade-offs

**From superpowers verification-before-completion:**
- Run verification commands, confirm output
- Evidence before assertions

---

### Patterns to Adapt for vstack

| Reference pattern | vstack Adaptation |
|---|---|
| Evidence-based verification | Evidence-based optimization (baseline vs optimized metrics) |
| Failure modes handled honestly | Optimization trade-offs documented |

---

### Host/Vendor-Specific Mechanics to Reject

- No host-specific mechanics in core performance pattern

---

### Overlap Implications for Neighbouring vstack Skills

| Skill | Overlap | Resolution |
|---|---|---|
| vstack-runtime-forensics | Both runtime | runtime-forensics = live diagnosis, performance = baseline/optimization |
| vstack-trace-forensics | Both traces | trace-forensics = analysis, performance = optimization |
| vstack-debug | Both investigation | debug = failure, performance = slowness |
| vstack-verify-loop | Both verification | verify-loop = functional, performance = performance metrics |

---

### vstack Design Decision

**Trigger conditions:**
- When performance requirements exist
- When vstack-verify-loop reveals performance regression
- When vstack-lessons identifies performance patterns

**Non-triggers:**
- For functional correctness issues
- Without measurable performance criteria

**Procedure (5 steps):**
1. Establish baseline — define metrics (latency, throughput, memory, CPU), run benchmark with current code, record baseline with environment details
2. Identify bottleneck — profile under load, analyze: CPU, memory, I/O, lock contention, GC, locate hot paths
3. Hypothesize and test — form optimization hypothesis, implement minimal change, benchmark and compare
4. Verify — confirm improvement meets criteria, run functional verification, check for regressions
5. Document — baseline vs optimized metrics, changes made, trade-offs (complexity, maintainability)

**Output:**
- Baseline and optimized metrics
- Bottleneck analysis
- Optimized code with verification

**Verification:**
- Metrics improve per criteria
- Functional correctness maintained
- No unexpected regressions

**Evaluation cases:**
- Baseline establishment
- Bottleneck identification
- Optimization hypothesis testing
- Verification of improvement
- Trade-off documentation

---

### Sign-off

- **Author:** Phase 3 continuation
- **Reviewer:**
- **Date:** 2026-11-02