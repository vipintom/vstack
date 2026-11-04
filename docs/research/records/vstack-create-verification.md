# Research Record: vstack-create-verification

**Date:** 2026-11-02
**Author:** Phase 3 continuation
**Reviewer:**

---

### vstack Purpose and Unique Boundary

- **What it owns:** Project verification skill generation — inspects a project and creates a harness-specific verification skill that can drive the real application.
- **What it explicitly does NOT own:** Verification execution (verify-loop), verification maintenance (maintain-verification), verification audit (verification-audit)
- **How it differs from adjacent skills:**
  - `vstack-verify-loop` = executes verification (create-verification = generates the skill)
  - `vstack-maintain-verification` = keeps skill current (create-verification = initial creation)
  - `vstack-verification-audit` = finds gaps (create-verification = establishes baseline)

---

### Cursor pstack Analogue Inspected

- **Skill/Playbook:** create-verification-skill
- **Repository URL:** https://github.com/cursor/plugins/tree/main/pstack/skills/create-verification-skill
- **Commit/Revision:** main branch, commit 5aa2dae2726d09d219397fbbedc1e9500a239d28
- **Date Inspected:** 2026-11-02
- **Key Files Read:** SKILL.md

---

### Independent Pack Analogue Inspected

- **Pack:** deepseek-stack
- **Skill/Playbook:** ds-create-verification (closest analogue)
- **Repository URL:** https://github.com/aicodeking/deepseek-stack
- **Date Inspected:** 2026-11-02
- **Key Files Read:** N/A (not found at expected path)

---

### Patterns Worth Adopting

**From poteto-mode create-verification-skill:**
- 12-step inspection: structure → surface → prerequisites → run commands → health checks → driving → observation → isolation → cleanup → gaps → generate → validate
- Launch/Doctor/Drive/Evidence/Cleanup/Helpers — complete verification harness
- Doctor = read-only health check before driving
- Feature map — seed top 3-5 features with sub-features, how to reach, drive, gotchas
- Prove before handover — launch, doctor, drive ONE feature, capture evidence, cleanup

---

### Patterns to Adapt for vstack

| poteto-pattern | vstack Adaptation |
|---|---|
| Project-local skill (.cursor/skills/) | Harness-specific skill directory (project's .opencode/skills/ or equivalent) |
| Playwright/CDP for web | Abstract: "harness recipe" — project provides |
| Feature map with 4 H2s | vstack can bundle reference format |
| Prove before handover | Same — validate skill works before done |

---

### Host/Vendor-Specific Mechanics to Reject

- Cursor-specific skill installation path (.cursor/skills/)
- Playwright/CDP specific harness
- Browser-based evidence capture only

---

### Overlap Implications for Neighbouring vstack Skills

| Skill | Overlap | Resolution |
|---|---|---|
| vstack-verify-loop | Both verification | create-verification = generates skill, verify-loop = executes |
| vstack-maintain-verification | Both skill lifecycle | create = initial, maintain = ongoing |
| vstack-verification-audit | Both gaps | audit = finds gaps, create = establishes baseline |

---

### vstack Design Decision

**Trigger conditions:**
- First time using vstack on a project
- When no project verification skill exists
- When project changes require new verification approach

**Non-triggers:**
- When project verification skill exists and is current
- For projects without runnable application (libraries only)

**Procedure (12 steps):**
1. Inspect project structure (package.json, build config, entry points, existing tests)
2. Classify application surface (Web, Mobile, CLI, Desktop, Service/Library)
3. Determine prerequisites (services, config, test data)
4. Establish run commands (install, build, start dev, start test)
5. Verify health checks (correct instance, health endpoint, port/URL)
6. Define application driving (browser automation, API client, CLI invocation)
7. Define observation channels (responses, logs, screenshots, DB state)
8. Define isolation (test DB, ephemeral ports, test config, no prod data)
9. Define cleanup (stop processes, clean test data, reset config)
10. Identify gaps (what cannot be automated, manual steps, flaky areas)
11. Generate skill — create SKILL.md in project's harness skill directory using template
12. Validate — run skill against representative scenario, Lead/Reviewer inspect

**Output:**
- Project verification skill at harness-specific location
- Skill includes: setup, run, health, drive, observe, cleanup, gaps
- Validation evidence

**Verification:**
- Skill executes setup → run → health → drive → observe → cleanup
- At least one representative journey verified
- Lead/Reviewer approval

**Evaluation cases:**
- Full harness cycle works
- Representative journey verified
- Gaps documented
- Cross-harness install works

---

### Sign-off

- **Author:** Phase 3 continuation
- **Reviewer:**
- **Date:** 2026-11-02