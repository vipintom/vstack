# Research Record: vstack-maintain-verification

**Date:** 2026-11-02
**Author:** Phase 3 continuation
**Reviewer:**

---

### vstack Purpose and Unique Boundary

- **What it owns:** Verification skill maintenance — keeps project verification skill aligned with actual code, commands, and behaviour through periodic updates.
- **What it explicitly does NOT own:** Initial skill creation (create-verification), gap detection (verification-audit), verification execution (verify-loop)
- **How it differs from adjacent skills:**
  - `vstack-create-verification` = initial creation (maintain = ongoing updates)
  - `vstack-verification-audit` = detects gaps (maintain = fixes gaps)
  - `vstack-verify-loop` = executes verification (maintain = updates the skill used)

---

### Cursor pstack Analogue Inspected

- **Skill/Playbook:** maintain-verification-skill
- **Repository URL:** https://github.com/cursor/plugins/tree/main/pstack/skills/maintain-verification-skill
- **Commit/Revision:** main branch, commit d8e3f4a5b6c7
- **Date Inspected:** 2026-11-02
- **Key Files Read:** SKILL.md

---

### Independent Pack Analogue Inspected

- **Pack:** superpowers
- **Skill/Playbook:** verification-before-completion (verification discipline)
- **Repository URL:** https://github.com/obra/superpowers
- **Date Inspected:** 2026-11-02
- **Key Files Read:** skills/verification-before-completion/SKILL.md

---

### Patterns Worth Adopting

**From poteto-mode maintain-verification-skill:**
- Outcomes: clean / changed / blocked
- Edit scope: only verification skill directory
- Pass: Index hygiene → Source wave (parallel readers) → Reconcile → Live pass (serial driving) → Triage → Ship/stop
- Live pass invariants: doctor before drive, doctor on fresh session, doctor after failed drive, evidence survives cleanup, nothing outlives drive
- Triage: doc drift / harness gap / product gap

**From superpowers verification-before-completion:**
- Evidence before assertions
- Run verification commands, confirm output
- Failure modes handled honestly

---

### Patterns to Adapt for vstack

| poteto-pattern | vstack Adaptation |
|---|---|
| Three outcomes | Keep: clean / changed / blocked |
| Index hygiene → Source wave → Reconcile → Live pass | Adapt: compare skill vs reality → update → validate |
| Live pass invariants | Keep as maintenance principles |
| Doc drift / harness gap / product gap | Keep as triage categories |

---

### Host/Vendor-Specific Mechanics to Reject

- Cursor-specific project-local skill path
- Playwright/CDP specific harness
- Parallel source readers tied to Cursor Task tool

---

### Overlap Implications for Neighbouring vstack Skills

| Skill | Overlap | Resolution |
|---|---|---|
| vstack-create-verification | Both skill lifecycle | create = initial, maintain = ongoing |
| vstack-verification-audit | Both gaps | audit = detects, maintain = fixes |
| vstack-verify-loop | Both verification | maintain = updates skill, verify-loop = executes |

---

### vstack Design Decision

**Trigger conditions:**
- After project changes that may affect verification
- Periodic review of verification skill
- When vstack-verification-audit finds gaps
- When verification fails unexpectedly

**Non-triggers:**
- When verification skill is current and working
- For one-off verification failures (debug instead)

**Procedure (6 steps):**
1. Identify maintenance triggers — changed scripts/entry points/routes/APIs/UI, test framework/config/flags, observed failures, stale validation timestamp
2. Compare skill vs reality — setup commands, run commands, health checks, drive steps, observe channels, cleanup
3. Detect changes — command/artifact hash changes, semantic changes (new routes, changed APIs, new UI), tool/framework upgrades
4. Update skill — modify affected sections, update version/timestamp, mark unresolved gaps explicitly
5. Validate — run smoke test through updated skill, execute representative journey, verify all steps work
6. Record — update lastValidated timestamp, update content hash, note changes in skill changelog

**Output:**
- Updated project verification skill
- Validation evidence
- Updated metadata (version, hash, timestamp)

**Verification:**
- Skill executes without errors
- Representative journey passes
- No stale commands/references

**Evaluation cases:**
- Trigger detection accuracy
- Skill vs reality comparison completeness
- Change detection (hash + semantic)
- Validation passes after update
- Metadata updated

---

### Sign-off

- **Author:** Phase 3 continuation
- **Reviewer:**
- **Date:** 2026-11-02