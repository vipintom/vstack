# Research Record: vstack-trace-forensics

**Date:** 2026-11-02
**Author:** Phase 3 continuation
**Reviewer:**

---

### vstack Purpose and Unique Boundary

- **What it owns:** Post-mortem trace/profile/memory analysis — interprets profiling, tracing, or memory artifacts to identify root causes and quantify impact.
- **What it explicitly does NOT own:** Live runtime diagnosis (runtime-forensics), performance optimization (performance), code-level debugging (debug)
- **How it differs from adjacent skills:**
  - `vstack-runtime-forensics` = live system (trace-forensics = artifacts)
  - `vstack-performance` = optimization (trace-forensics = analysis)
  - `vstack-debug` = code-level (trace-forensics = artifact interpretation)
  - `vstack-verify-loop` = verification (trace-forensics = analysis)

---

### Cursor pstack Analogue Inspected

- **Skill/Playbook:** (no direct analogue — trace forensics is vstack-specific)
- **Repository URL:** N/A

---

### Independent Pack Analogue Inspected

- **Pack:** superpowers
- **Skill/Playbook:** systematic-debugging (analysis phase)
- **Repository URL:** https://github.com/obra/superpowers
- **Date Inspected:** 2026-11-02
- **Key Files Read:** skills/systematic-debugging/SKILL.md

---

### Patterns Worth Adopting

**From superpowers systematic-debugging:**
- Pattern analysis: find working examples, compare against references, identify differences
- Hypothesis testing: minimal tests, verify before continuing

---

### Patterns to Adapt for vstack

| Reference pattern | vstack Adaptation |
|---|---|
| Working examples comparison | Trace/profile comparison (baseline vs incident) |
| Hypothesis testing | Trace-based hypothesis validation |

---

### Host/Vendor-Specific Mechanics to Reject

- No host-specific mechanics in core trace forensics pattern

---

### Overlap Implications for Neighbouring vstack Skills

| Skill | Overlap | Resolution |
|---|---|---|
| vstack-runtime-forensics | Both traces | trace-forensics = artifacts, runtime-forensics = live |
| vstack-performance | Both perf | trace-forensics = analysis, performance = optimization |
| vstack-debug | Both diagnosis | trace-forensics = artifacts, debug = code-level |
| vstack-verify-loop | Both execute | trace-forensics = analysis, verify-loop = verification |

---

### vstack Design Decision

**Trigger conditions:**
- When vstack-runtime-forensics or vstack-performance produces traces
- When memory/CPU profiling available
- For post-mortem analysis

**Non-triggers:**
- For live diagnosis (use vstack-runtime-forensics)
- Without trace/profiling data

**Procedure (6 steps):**
1. Identify analysis target — specific request trace, profile time range, memory snapshot
2. Analyze traces — service map and dependencies, latency breakdown per span, error spans and causes, critical path identification
3. Analyze profiles — CPU: hot functions, lock contention; Memory: allocation sites, retention, leaks; GC: frequency, pause times, promotion rate
4. Analyze memory — heap: retained objects, dominator tree; leaks: growing objects, root references; fragmentation
5. Synthesize findings — correlate trace + profile + memory, identify root cause, quantify impact
6. Recommend actions — code changes, config changes, architecture changes

**Output:**
- Analysis report with findings
- Quantified impact
- Actionable recommendations

**Verification:**
- Findings grounded in trace/profile data
- Recommendations specific and testable

**Evaluation cases:**
- Trace analysis completeness
- Profile analysis depth
- Memory analysis accuracy
- Cross-correlation (trace+profile+memory)
- Recommendation actionability

---

### Sign-off

- **Author:** Phase 3 continuation
- **Reviewer:**
- **Date:** 2026-11-02