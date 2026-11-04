# Research Record: vstack-interrogate

**Date:** 2026-11-02
**Author:** Phase 3 kickoff
**Reviewer:** 

---

### vstack Purpose and Unique Boundary

- **What it owns:** Adversarial review — adversaries try to break a change/design, findings survive only when proven by a run against real code.
- **What it explicitly does NOT own:** Design synthesis (arena), cooperative verification (swarm), implementation (tdd), debugging (debug)
- **How it differs from adjacent skills:**
  - `vstack-arena` = design synthesis with cross-judge (interrogate = adversarial findings)
  - `vstack-swarm` = cooperative verification (interrogate = adversarial)
  - `vstack-review-loop` = structured review with lenses (interrogate = multi-model adversarial)

---

### Cursor pstack Analogue Inspected

- **Skill/Playbook:** interrogate
- **Repository URL:** https://github.com/cursor/plugins/tree/main/pstack/skills/interrogate
- **Commit/Revision:** main branch, commit 3a49e73a4ffd56f682288dd145be9345bfec7434
- **Date Inspected:** 2026-11-02
- **Key Files Read:** SKILL.md

---

### Independent Pack Analogue Inspected

- **Pack:** superpowers
- **Skill/Playbook:** requesting-code-review / receiving-code-review
- **Repository URL:** https://github.com/obra/superpowers
- **Date Inspected:** 2026-11-02
- **Key Files Read:** skills/requesting-code-review/SKILL.md, skills/receiving-code-review/SKILL.md

---

### Patterns Worth Adopting

**From poteto-mode interrogate:**
- **Frame** — scope = branch diff + working tree, intent restated via in-your-own-words
- **Fan out** — uses arena Phase A (runners) + Phase B, with adversary brief: "Break this change. Prove each finding with a run."
- **Adversary brief** — repros in own worktree, report: title, exact command, output, required output
- **Verify** — rerun each finding's command, keep only if output shows failure breaking intent
- **Skip arena C/D/E** — keep ALL verified findings (not one adversary's list), merge shared root cause
- **Output** — Intent, Findings (command, output, how breaks intent, adversaries), Dropped (count + why per adversary)

**From superpowers requesting-code-review:**
- **Structured review package** — objective, criteria, diff, evidence, lenses
- **Fresh context reviewer** — independent assessment
- **Lens-based findings** — Correctness, Architecture, Security, Performance, Maintainability
- **Finding severity** — Blocker, Major, Minor, Note

---

### Patterns to Adapt for vstack

| poteto-pattern | vstack Adaptation |
|---|---|
| arena runners for adversaries | Abstract: "adversary model capability tier" |
| interrogate reviewers line in pstack-models.mdc | Capability tier: "adversary models" |
| in-your-own-words skill for intent | vstack can bundle or use how/why |
| Worktree isolation for adversaries | Fallback: directory isolation |
| Skip arena C/D/E (keep all findings) | Keep — adversarial finds different failures |

---

### Host/Vendor-Specific Mechanics to Reject

- pstack-models.mdc for reviewer selection
- Cursor Task tool specifics
- Specific model slugs
- Cursor worktree handling

---

### Overlap Implications for Neighbouring vstack Skills

| Skill | Overlap | Resolution |
|---|---|---|
| vstack-arena | Both use arena structure | Arena = design synthesis, Interrogate = adversarial review |
| vstack-swarm | Both parallel | Swarm = cooperative, Interrogate = adversarial |
| vstack-review-loop | Both review | Review-loop = structured lenses, Interrogate = multi-model adversarial |
| vstack-jury | Both multi-reviewer | Jury = 3 reviewers with lenses, Interrogate = adversarial findings |

---

### vstack Design Decision

**Trigger conditions:**
- "Interrogate this" / "Adversarial review" / "Multi-model review"
- "Challenge this" / "Stress test this code" / "Find blind spots"
- "Tear this apart"
- When design/change needs adversarial pressure before shipping

**Non-triggers:**
- Cooperative verification → swarm
- Design synthesis → arena
- Standard review → review-loop
- Jury review → jury

**Procedure:**
1. **Frame** — scope (branch diff + working tree), intent (in-your-own-words)
2. **Fan out** — adversaries via arena Phase A+B with adversary brief
3. **Verify** — rerun each finding's command, keep only proven failures
4. **Output** — Intent, Findings (command, output, breaks intent, adversaries), Dropped

**Adversary brief:** "Break this change. Prove each finding with a run against real code (failing test, repro script, command output). Keep repros in own worktree. Report: title, exact command, output, required output. Leave out anything not run."

**Output format:**
- Intent (restated)
- Findings: for each verified — command, output, how breaks intent, adversaries
- Dropped: per adversary, count + why
- "No verified findings" when none survive

**Evaluation cases:**
- Intent restatement accuracy
- Adversary findings with repro commands
- Verification rerun keeps only proven
- Dropped findings documented
- Multiple adversaries merge shared root cause

---

### Sign-off

- **Author:** Phase 3 kickoff
- **Reviewer:** 
- **Date:** 2026-11-02