# Research Record: vstack-debug

**Date:** 2026-11-02
**Author:** Phase 3 kickoff
**Reviewer:** 

---

### vstack Purpose and Unique Boundary

- **What it owns:** Failure reproduction, evidence gathering, hypothesis formation, minimal testing — systematic root cause investigation before fixes.
- **What it explicitly does NOT own:** Fix implementation (tdd), verification (verify-loop), assumption breaking (unstick), design (architect)
- **How it differs from adjacent skills:**
  - `vstack-verify-loop` = verification execution (debug = failure investigation)
  - `vstack-unstick` = assumption breaking after 3+ failures (debug = normal investigation)
  - `vstack-tdd` = test-first fix (debug = investigation before fix)
  - `vstack-runtime-forensics` = live system diagnosis (debug = code-level reproduction)

---

### Cursor pstack Analogue Inspected

- **Skill/Playbook:** debugging (in poteto-mode principles)
- **Repository URL:** https://github.com/cursor/plugins/tree/main/pstack/skills/poteto-mode
- **Date Inspected:** 2026-11-02
- **Key Files Read:** poteto-mode SKILL.md (principles section)

---

### Independent Pack Analogue Inspected

- **Pack:** superpowers
- **Skill/Playbook:** systematic-debugging
- **Repository URL:** https://github.com/obra/superpowers
- **Date Inspected:** 2026-11-02
- **Key Files Read:** skills/systematic-debugging/SKILL.md

---

### Patterns Worth Adopting

**From poteto-mode principles:**
- **Fix Root Causes:** "Trace each symptom back to the first place the system went wrong and fix it there."
- **Attack the Premise:** "Two or more fixes that share one premise have failed the same gate. Write the premise down and test it directly."

**From superpowers systematic-debugging:**
- **Iron Law:** NO FIXES WITHOUT ROOT CAUSE INVESTIGATION FIRST
- **Four Phases:** Root Cause Investigation → Pattern Analysis → Hypothesis & Testing → Implementation
- **Phase 1:** Read errors, reproduce consistently, check recent changes, gather evidence at component boundaries, trace data flow
- **Phase 2:** Find working examples, compare against references, identify differences, understand dependencies
- **Phase 3:** Form single hypothesis, test minimally (one variable), verify before continuing, admit when don't know
- **Phase 4:** Create failing test case, implement single fix, verify fix, if 3+ fixes failed → question architecture
- **Red flags:** "quick fix", "just try", "skip test", "probably X", "one more fix attempt"
- **3+ failures = architectural problem** — discuss with human partner

---

### Patterns to Adapt for vstack

| superpowers-pattern | vstack Adaptation |
|---|---|
| Component boundary instrumentation | Keep — multi-component evidence gathering |
| Backward tracing (root-cause-tracing.md) | vstack can bundle reference |
| Defense in depth after root cause | vstack can bundle reference |
| Condition-based waiting | vstack can bundle reference |

---

### Host/Vendor-Specific Mechanics to Reject

- No host-specific mechanics in core debugging pattern

---

### Overlap Implications for Neighbouring vstack Skills

| Skill | Overlap | Resolution |
|---|---|---|
| vstack-verify-loop | Both execute | Debug = investigation, Verify-loop = verification |
| vstack-unstick | Both handle failures | Debug = first 2 attempts, Unstick = 3+ with assumption breaking |
| vstack-tdd | Both test | Debug = reproduction, TDD = test-first fix |
| vstack-runtime-forensics | Both diagnose | Runtime-forensics = live system, Debug = code-level reproduction |

---

### vstack Design Decision

**Trigger conditions:**
- "Debug this" / "Diagnose this failure"
- Test failure reproduction
- Bug reproduction before fix
- Unexpected behavior investigation
- After 2 failed fixes → unstick

**Non-triggers:**
- 3+ failed attempts → unstick
- Live system symptoms → runtime-forensics
- Design phase → architect

**Procedure (4 phases):**
1. **Root Cause Investigation**
   - Read errors completely (stack traces, line numbers, codes)
   - Reproduce consistently (exact steps, every time?)
   - Check recent changes (git diff, commits, deps, env)
   - Gather evidence at component boundaries
   - Trace data flow backward to source
2. **Pattern Analysis**
   - Find working examples in codebase
   - Compare against reference implementations
   - Identify differences (list every difference)
   - Understand dependencies
3. **Hypothesis & Testing**
   - Form single hypothesis (specific, written)
   - Test minimally (one variable, smallest change)
   - Verify before continuing
   - If don't know → admit, research, ask
4. **Implementation**
   - Create failing test case (mandatory)
   - Implement single fix (root cause)
   - Verify fix (test passes, suite green)
   - If 3+ fixes failed → question architecture with human

**Rules:**
- NO FIXES WITHOUT ROOT CAUSE INVESTIGATION
- If 3+ fixes failed → STOP, question architecture
- Don't skip test, don't guess, don't bundle fixes
- Red flags: "quick fix", "just try", "skip test", "one more attempt"

**Evaluation cases:**
- Errors read completely before hypothesis
- Reproduction consistent before investigation
- Evidence at component boundaries
- Single hypothesis tested minimally
- Failing test before fix
- 3+ failures → architecture discussion

---

### Sign-off

- **Author:** Phase 3 kickoff
- **Reviewer:** 
- **Date:** 2026-11-02