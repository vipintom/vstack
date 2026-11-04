# Research Record: vstack-skill-evaluation

**Date:** 2026-11-02
**Author:** Phase 3 continuation
**Reviewer:**

---

### vstack Purpose and Unique Boundary

- **What it owns:** Skill quality evaluation — static validation, behavioural scenario testing (trigger accuracy, procedure quality, failure handling, harness fallbacks), cross-harness evaluation, regression evaluation.
- **What it explicitly does NOT own:** Skill creation (skill-authoring), skill content review (review-loop), skill execution (other skills)
- **How it differs from adjacent skills:**
  - `vstack-skill-authoring` = writes skill (skill-evaluation = evaluates)
  - `vstack-review-loop` = reviews content (skill-evaluation = evaluates behaviour)
  - `vstack-verify-loop` = executes verification (skill-evaluation = evaluates skill's verification)

---

### Cursor pstack Analogue Inspected

- **Skill/Playbook:** (no direct analogue — skill evaluation is vstack-specific)
- **Repository URL:** N/A

---

### Independent Pack Analogue Inspected

- **Pack:** anthropics/skills
- **Skill/Playbook:** skill-creator (evaluation loop)
- **Repository URL:** https://github.com/anthropics/skills
- **Date Inspected:** 2026-11-02
- **Key Files Read:** skills/skill-creator/SKILL.md

---

### Patterns Worth Adopting

**From anthropics skill-creator:**
- Core loop: Capture intent → Interview/research → Write → Test cases → Run with/without skill → Evaluate → Improve → Repeat
- Blind comparison: independent comparator for A/B
- Three-level loading: metadata always, body on trigger, resources as needed

**From poteto-mode principles:**
- Encode Lessons in Structure: evaluation as structured scenarios
- Procedures over vague instructions: explicit evaluation criteria

---

### Patterns to Adapt for vstack

| Reference pattern | vstack Adaptation |
|---|---|
| Test cases in evals/evals.json | Evaluation scenarios in playbook/evaluations/scenarios/ |
| Blind comparison | Independent reviewer for skill evaluation |
| Three-level loading | v2 contract: frontmatter, body, references |

---

### Host/Vendor-Specific Mechanics to Reject

- Anthropic-specific eval viewer (generate_review.py)
- Platform-specific packaging

---

### Overlap Implications for Neighbouring vstack Skills

| Skill | Overlap | Resolution |
|---|---|---|
| vstack-skill-authoring | Both skill quality | authoring = writes, evaluation = evaluates |
| vstack-review-loop | Both review | review-loop = content, evaluation = behaviour |
| vstack-verify-loop | Both verification | verify-loop = executes, evaluation = evaluates |

---

### vstack Design Decision

**Trigger conditions:**
- Before promoting a skill to Stable
- After modifying a skill's trigger, procedure, output, safety rule, or stop condition
- When adding a new skill to the playbook
- Periodic regression evaluation of Stable skills

**Non-triggers:**
- For skills in Draft state (use informal testing)
- For one-off procedure validation

**Procedure (5 phases):**

**1. Static Validation:**
- Run structural validator: `pnpm --filter @vstack/playbook validate`
- Verify frontmatter, required sections, unique IDs, link resolution
- Check for unbounded loops, missing stop/escalation conditions
- Verify no proprietary OpenCode APIs in canonical content

**2. Behavioural Scenario Testing:**
For each skill, run representative scenarios covering:

**Trigger Accuracy:**
- Skill triggers when it should (positive cases)
- Skill does not trigger when it shouldn't (negative cases)
- Edge cases at trigger boundaries

**Procedure Quality:**
- Steps are actionable and produce expected outputs
- Evidence requirements are met
- Stop conditions fire correctly

**Failure Handling:**
- Retry bounds respected
- Escalation triggers at correct thresholds
- Fallback behaviour works when optional capabilities missing

**Harness Fallbacks:**
- Test with subagents unavailable (sequential fallback)
- Test with worktrees unavailable (branch/directory fallback)
- Test with persistent plugin unavailable (project files fallback)

**3. Cross-Harness Evaluation:**
- Install skill via Skills CLI in clean OpenCode, Codex, Claude Code profiles
- Verify skill loads, invokes, produces expected outputs
- Test selective installation (single skill subset)

**4. Regression Evaluation:**
- Compare current results with previous evaluation baseline
- Identify regressions and false positives
- Update evaluation status and changelog

**5. Record Results:**
- Store results in `evals/results/<skill>-<model>-<harness>-<date>.json`
- Include: scenario ID, fixture version, model/harness/version, date, prompts, actual evidence, deterministic PASS/FAIL, qualitative rubric scores, evaluator, limitations

**Output:**
- Evaluation report with deterministic PASS/FAIL for each scenario
- Qualitative assessment with rubric scores
- Regression comparison with previous version
- Updated skill evaluation status (Draft/Experimental/Stable/Deprecated)

**Verification:**
- All Tier 1 (deterministic) assertions PASS
- Tier 2 (qualitative) assessments documented
- No regressions from previous evaluation
- Results stored with full provenance

**Evaluation cases:**
- Static validation completeness
- Trigger accuracy (positive/negative)
- Procedure fidelity
- Failure handling bounds
- Harness fallback coverage
- Cross-harness installation
- Regression detection

---

### Sign-off

- **Author:** Phase 3 continuation
- **Reviewer:**
- **Date:** 2026-11-02