# Research Record: vstack-runtime-forensics

**Date:** 2026-11-02
**Author:** Phase 3 continuation
**Reviewer:**

---

### vstack Purpose and Unique Boundary

- **What it owns:** Live runtime diagnosis — characterizes symptoms, gathers live data (logs, metrics, traces), correlates, hypothesizes and probes safely, diagnoses root cause, applies immediate mitigation.
- **What it explicitly does NOT own:** Post-mortem trace analysis (trace-forensics), performance optimization (performance), code-level debugging (debug), verification execution (verify-loop)
- **How it differs from adjacent skills:**
  - `vstack-trace-forensics` = post-mortem artifacts (runtime-forensics = live system)
  - `vstack-performance` = baseline/optimization (runtime-forensics = incident response)
  - `vstack-debug` = code-level reproduction (runtime-forensics = live diagnosis)
  - `vstack-verify-loop` = verification (runtime-forensics = diagnosis)

---

### Cursor pstack Analogue Inspected

- **Skill/Playbook:** (no direct analogue — runtime forensics is vstack-specific)
- **Repository URL:** N/A

---

### Independent Pack Analogue Inspected

- **Pack:** superpowers
- **Skill/Playbook:** systematic-debugging (systematic investigation)
- **Repository URL:** https://github.com/obra/superpowers
- **Date Inspected:** 2026-11-02
- **Key Files Read:** skills/systematic-debugging/SKILL.md

---

### Patterns Worth Adopting

**From superpowers systematic-debugging:**
- Iron Law: NO FIXES WITHOUT ROOT CAUSE INVESTIGATION
- Four phases: Investigation → Pattern Analysis → Hypothesis & Testing → Implementation
- Component boundary instrumentation
- Backward tracing

---

### Patterns to Adapt for vstack

| Reference pattern | vstack Adaptation |
|---|---|
| Four phases | 5 phases: Characterize → Gather → Correlate → Hypothesize/Probe → Diagnose/Mitigate |
| Component boundary instrumentation | Live data gathering (logs, metrics, traces) |
| Backward tracing | Time-correlation of live data |

---

### Host/Vendor-Specific Mechanics to Reject

- No host-specific mechanics in core runtime forensics pattern

---

### Overlap Implications for Neighbouring vstack Skills

| Skill | Overlap | Resolution |
|---|---|---|
| vstack-trace-forensics | Both traces | runtime-forensics = live, trace-forensics = artifacts |
| vstack-performance | Both perf | runtime-forensics = incident, performance = optimization |
| vstack-debug | Both diagnosis | runtime-forensics = live, debug = code-level |
| vstack-verify-loop | Both execute | runtime-forensics = diagnosis, verify-loop = verification |

---

### vstack Design Decision

**Trigger conditions:**
- Live system showing symptoms (errors, latency, crashes)
- When vstack-debug needs runtime context
- When vstack-performance needs live data

**Non-triggers:**
- For code-level bugs reproducible in test
- Without runtime access

**Procedure (5 steps):**
1. Characterize symptom — what, when, frequency, scope, error messages, stack traces, affected users/requests
2. Gather live data — logs (recent, correlated), metrics (latency, error rate, saturation), traces (request flows), system state (memory, CPU, connections)
3. Correlate — time-correlate logs/metrics/traces, identify pattern (sudden/gradual, constant/intermittent), narrow to component/dependency
4. Hypothesize and probe — form hypothesis, safe probe (increase log level, add metric, test request), observe effect
5. Diagnose and mitigate — root cause identified, immediate mitigation (config, restart, scale), long-term fix via vstack-debug/vstack-performance

**Output:**
- Root cause or narrowed hypothesis
- Immediate mitigation
- Long-term fix plan

**Verification:**
- Symptom mitigated
- Root cause plausible
- No new symptoms from mitigation

**Evaluation cases:**
- Symptom characterization completeness
- Live data gathering breadth
- Correlation accuracy
- Probe safety
- Mitigation effectiveness

---

### Sign-off

- **Author:** Phase 3 continuation
- **Reviewer:**
- **Date:** 2026-11-02