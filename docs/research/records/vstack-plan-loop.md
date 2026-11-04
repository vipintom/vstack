# Research Record: vstack-plan-loop

**Date:** 2026-11-02
**Author:** Phase 3 continuation
**Reviewer:**

---

### vstack Purpose and Unique Boundary

- **What it owns:** Plan creation, challenge, and refinement — breaks work into verifiable tasks with acceptance criteria, identifies dependencies, assigns task types, estimates risk, challenges and refines.
- **What it explicitly does NOT own:** Discovery (how/why/blast-radius), blueprint (detailed design), implementation (incremental-build/tdd), review (review-loop)
- **How it differs from adjacent skills:**
  - `vstack-discovery` (retired) → `vstack-how`/`vstack-why`/`vstack-blast-radius` = discovery (plan-loop = consumes discovery)
  - `vstack-blueprint` = detailed design (plan-loop = consumes blueprint)
  - `vstack-incremental-build` = implementation discipline (plan-loop = provides plan)
  - `vstack-review-loop` = review (plan-review = challenges plan)

---

### Cursor pstack Analogue Inspected

- **Skill/Playbook:** (no direct analogue — plan-loop is vstack-specific)
- **Repository URL:** N/A

---

### Independent Pack Analogue Inspected

- **Pack:** superpowers
- **Skill/Playbook:** writing-plans (plan creation) + executing-plans (plan execution)
- **Repository URL:** https://github.com/obra/superpowers
- **Date Inspected:** 2026-11-02
- **Key Files Read:** skills/writing-plans/SKILL.md, skills/executing-plans/SKILL.md

---

### Patterns Worth Adopting

**From superpowers writing-plans:**
- DRY, YAGNI, TDD, frequent commits
- Exact interfaces, names, signatures, values from spec, tests per task
- Self-review checklists: spec coverage, step scan, type consistency, review focus

**From superpowers executing-plans:**
- Brief is the spec
- Ledger is your memory
- TDD is the per-task gate
- Final reviewer is second pair of eyes

---

### Patterns to Adapt for vstack

| Reference pattern | vstack Adaptation |
|---|---|
| Exact interfaces/names | Plan specifies task boundaries, acceptance criteria |
| Self-review checklists | Plan challenge phase (independent or with Reviewer) |
| Brief as spec | Plan with tasks, dependencies, criteria, risk |

---

### Host/Vendor-Specific Mechanics to Reject

- No host-specific mechanics in core planning pattern

---

### Overlap Implications for Neighbouring vstack Skills

| Skill | Overlap | Resolution |
|---|---|---|
| vstack-how/why/blast-radius | Both discovery | discovery = input, plan-loop = plans |
| vstack-blueprint | Both design | blueprint = detailed spec, plan-loop = task plan |
| vstack-plan-review | Both plan | plan-loop = creates, plan-review = challenges |
| vstack-incremental-build | Both execution | plan-loop = plan, incremental-build = executes |

---

### vstack Design Decision

**Trigger conditions:**
- After vstack-how/why/blast-radius (and vstack-blueprint if architectural)
- Before any implementation with multiple steps or dependencies
- When Lead needs to coordinate multiple tasks/agents

**Non-triggers:**
- For single-step trivial changes
- When plan already exists and is validated

**Procedure (5 steps):**
1. Draft initial plan — break into tasks with clear boundaries, define acceptance criteria per task, identify dependencies, assign task types (discovery, implementation, test, review), estimate risk per task
2. Challenge the plan (independently or with Reviewer) — are tasks truly independent where parallel? Are acceptance criteria testable? Are dependencies correctly identified? Is risk appropriately addressed? Does it degrade gracefully without advanced harness features?
3. Refine — incorporate challenges, split/merge tasks, adjust criteria
4. Validate — Lead confirms plan enables coordination and evidence
5. Record — plan with tasks, dependencies, criteria, risk levels

**Output:**
- Task list with: title, description, acceptance criteria, dependencies, type, risk
- Dependency graph
- Risk assessment per task
- Coordination notes for Lead

**Verification:**
- All tasks have testable acceptance criteria
- Dependencies form a DAG (no cycles)
- High-risk tasks have review/evidence requirements specified
- Plan works sequentially if parallel unavailable

**Evaluation cases:**
- Task decomposition quality
- Acceptance criteria testability
- Dependency graph acyclic
- Risk assessment accuracy
- Graceful degradation

---

### Sign-off

- **Author:** Phase 3 continuation
- **Reviewer:**
- **Date:** 2026-11-02