# Research Record: vstack-skill-authoring

**Date:** 2026-11-02
**Author:** Phase 3 kickoff
**Reviewer:** 

---

### vstack Purpose and Unique Boundary

- **What it owns:** Writing skills to v2 contract standard — draft, static validation, external research, evaluation, lifecycle management.
- **What it explicitly does NOT own:** Skill execution (other skills), skill content review (review-loop), skill evaluation (skill-evaluation — separate skill)
- **How it differs from adjacent skills:**
  - `vstack-skill-evaluation` = scenario testing, harness validation (authoring = writing + static validation + lifecycle)
  - `vstack-review-loop` = review of skill content (authoring = creation)
  - `vstack-principles` = principle content (authoring = skill creation process)

---

### Cursor pstack Analogue Inspected

- **Skill/Playbook:** authoring-a-skill (playbook) + create-skill (Cursor built-in)
- **Repository URL:** https://github.com/cursor/plugins/tree/main/pstack/skills/poteto-mode/playbooks/authoring-a-skill.md
- **Date Inspected:** 2026-11-02
- **Key Files Read:** Playbook via web search, skill-creator from anthropics/skills

---

### Independent Pack Analogue Inspected

- **Pack:** anthropics/skills
- **Skill/Playbook:** skill-creator
- **Repository URL:** https://github.com/anthropics/skills
- **Date Inspected:** 2026-11-02
- **Key Files Read:** skills/skill-creator/SKILL.md

---

### Patterns Worth Adopting

**From poteto-mode authoring-a-skill playbook:**
- **File structure:** SKILL.md + references/ + scripts/
- **Progressive disclosure:** metadata (~100 words) → SKILL.md body (<500 lines) → bundled resources
- **Domain organization:** references/ per variant (aws.md, gcp.md, azure.md)
- **Principle of Lack of Surprise:** no malware, no misleading intent
- **Writing patterns:** imperative, output format templates, examples
- **Test cases:** 2-3 realistic prompts, save to evals/evals.json

**From anthropics skill-creator:**
- **Core loop:** Capture intent → Interview/research → Write SKILL.md → Test cases → Run with/without skill → Evaluate → Improve → Repeat
- **Progressive disclosure:** 3 levels (metadata, body, bundled resources)
- **Description optimization:** trigger eval queries (should/should-not), optimization loop
- **Blind comparison:** independent comparator for A/B
- **Package and present:** .skill file output
- **Three-level loading:** metadata always, body on trigger, resources as needed

**From poteto-mode principles:**
- **Encode Lessons in Structure:** "You catch yourself writing the same instruction a second time. Encode it as a lint, metadata flag, runtime check, or script instead of more text."
- **Procedures over vague instructions:** explicit templates, automated validation

---

### Patterns to Adapt for vstack

| Reference pattern | vstack Adaptation |
|---|---|
| Cursor skill format (.cursor/skills/) | Portable: playbook/skills/<name>/SKILL.md |
| Anthropic skill format | Compatible: SKILL.md with YAML frontmatter |
| Progressive disclosure (3 levels) | Keep — v2 contract has this |
| Description as primary trigger | Keep — v2 frontmatter has description |
| Test cases in evals/evals.json | vstack: evaluation scenarios in playbook/evaluations/ |
| Description optimization loop | vstack: separate skill-evaluation for trigger testing |
| Blind comparison | vstack: review-loop for skill review |

---

### Host/Vendor-Specific Mechanics to Reject

- Cursor-specific skill installation
- Anthropic-specific eval viewer (generate_review.py)
- Platform-specific packaging (.skill file)

---

### Overlap Implications for Neighbouring vstack Skills

| Skill | Overlap | Resolution |
|---|---|---|
| vstack-skill-evaluation | Both handle skill quality | Authoring = write + static validate + lifecycle, Evaluation = behavioral scenarios + harness tests |
| vstack-review-loop | Both review | Review-loop = content review, Authoring = creation process |
| vstack-principles | Both content | Principles = principle content, Authoring = skill creation |

---

### vstack Design Decision

**Trigger conditions:**
- "Create skill for X" / "Write skill"
- "Update skill X"
- "Author skill to v2 contract"
- Skill maintenance work

**Non-triggers:**
- "Use skill X" → direct invocation or playbook
- "Evaluate skill X" → skill-evaluation
- "How does skill X work?" → investigation

**Procedure (per v2 contract):**
1. **Sharpen** — purpose, trigger, scope, change type (new/update/evaluate/deprecate)
2. **Author** — write to v2 template (all sections, N/A explicit, frontmatter)
3. **External Research** (new skills) — Cursor pstack + 1 independent pack, record in docs/research/records/
4. **Static Validation** — frontmatter, required sections, links resolve, no proprietary APIs
5. **Evaluate** — scenario testing (trigger precision, procedure fidelity, outputs), cross-harness install test, regression check
6. **Review** — contract compliance, trigger accuracy, fallback completeness
7. **Release** — lifecycle: Draft → Experimental → Stable (with evidence at each gate)
8. **Maintain** — regression eval on changes, deprecation with migration

**v2 Template sections (required):**
- Frontmatter (name, description)
- When to Use (triggers)
- Non-Triggers
- Prerequisites
- Procedure (steps with Action/Evidence/Decision/Skill routing/Principle/Role)
- Expected Outputs
- Verification
- Stop Conditions
- Fallbacks
- Migration Record

**External Research Requirements:**
- Cursor pstack analogue (primary)
- At least 1 independent pack (superpowers, deepseek-stack, Anthropic, t3dotgg/tstack, TStack)
- Research record in docs/research/records/<skill-id>.md
- Source URLs, commits, dates, key findings

**Lifecycle Gates:**
- **Draft:** Written, static validation passed
- **Experimental:** Evaluation scenarios pass, at least 1 harness tested
- **Stable:** Cross-harness validated, review passed, regression eval clean
- **Deprecated:** Replacement defined, migration tested, removal target

**Evaluation cases:**
- Static validation catches missing sections
- Trigger precision (positive/negative)
- Procedure fidelity
- Cross-harness install
- Lifecycle gate enforcement
- Deprecation migration test

---

### Sign-off

- **Author:** Phase 3 kickoff
- **Reviewer:** 
- **Date:** 2026-11-02