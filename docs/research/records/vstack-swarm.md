# Research Record: vstack-swarm

**Date:** 2026-11-02
**Author:** Phase 3 kickoff
**Reviewer:** 

---

### vstack Purpose and Unique Boundary

- **What it owns:** Parallel worker fan-out for coverage matrices, races, gauntlets, exploration partitions. Returns ONE consolidated report.
- **What it explicitly does NOT own:** Design alternatives (arena), implementation (tdd), verification (verify-loop), adversarial review (interrogate)
- **How it differs from adjacent skills:**
  - `vstack-arena` = design/code bakeoffs with rubric and cross-judge (swarm = coverage/races)
  - `vstack-interrogate` = adversarial review (swarm = cooperative verification)
  - `vstack-best-of-n` = special case for prototype comparison

---

### Cursor pstack Analogue Inspected

- **Skill/Playbook:** swarm
- **Repository URL:** https://github.com/cursor/plugins/tree/main/pstack/skills/swarm
- **Commit/Revision:** main branch, commit 4a1abb26cce3450f9b14056109f974edaeff4ec1
- **Date Inspected:** 2026-11-02
- **Key Files Read:** SKILL.md

---

### Independent Pack Analogue Inspected

- **Pack:** superpowers
- **Skill/Playbook:** dispatching-parallel-agents
- **Repository URL:** https://github.com/obra/superpowers
- **Date Inspected:** 2026-11-02
- **Key Files Read:** N/A (part of core methodology)

---

### Patterns Worth Adopting

**From poteto-mode swarm:**
- **Phase A: Frame** — done predicate, shape (slices/race/mixed), worker model, isolation
- **Phase B: Fan out** — all N in one message, run_in_background, each with own writable output
- **Phase C: Aggregate** — read results, drop missing SHAs/method, respawn once, gap tracking
- **Phase D: Report** — consolidated report with result table, issues, gaps, race rule
- **Shapes:** Slices (coverage), Race N on identical briefs, Mixed
- **Race rules:** first pass, rank all, best-of (declared upfront)

---

### Patterns to Adapt for vstack

| poteto-pattern | vstack Adaptation |
|---|---|
| swarm workers from pstack-models.mdc | Abstract: "fast worker model" capability tier |
| run_in_background: true | Abstract: "background dispatch" — harness maps |
| environment: cloud vs local | Abstract: "isolated execution environment" |
| cloud_base_branch for non-default branch | Abstract: "branch specification" |
| subagent_type: generalPurpose | Abstract: "worker agent dispatch" |

---

### Host/Vendor-Specific Mechanics to Reject

- pstack-models.mdc for worker model
- Cursor Task tool specifics
- run_in_background: true
- environment: cloud/local
- cloud_base_branch parameter
- Specific model slugs

---

### Overlap Implications for Neighbouring vstack Skills

| Skill | Overlap | Resolution |
|---|---|---|
| vstack-arena | Both parallel with candidates | Arena = bakeoff with rubric/judge, Swarm = coverage/races |
| vstack-interrogate | Both spawn multiple | Interrogate = adversarial, Swarm = cooperative verification |
| vstack-best-of-n | Special case of swarm | Best-of-n = prototype race, Swarm = general coverage/races |
| vstack-skill-authoring | Both can spawn parallel | Skill-authoring uses swarm for eval runs |

---

### vstack Design Decision

**Trigger conditions:**
- "Swarm this" / "Check all packages against..."
- Coverage matrices (test every package/module)
- Races (N workers on identical brief)
- Exploration partitions (divide and conquer)
- Gauntlets (stress test with variations)

**Non-triggers:**
- Design bakeoffs → arena
- Adversarial review → interrogate
- Single task → feature-delivery/bug-fixing

**Procedure (4 phases):**
1. **Frame** — done predicate, shape (slices/race/mixed), worker model, isolation
2. **Fan out** — N parallel, background, own outputs
3. **Aggregate** — read, drop incomplete, respawn once, track gaps
4. **Report** — consolidated: result table, issue one-liners, gaps, race rule

**Shapes:**
- **Slices:** Partition work (e.g., one package per worker)
- **Race:** N workers on identical brief (first pass / rank all / best-of)
- **Mixed:** Combination

**Evaluation cases:**
- Slice shape with coverage
- Race shape with declared rule
- Gap handling (dropout, missing SHA)
- Consolidated report format
- Result table with PASS/ISSUES/BLOCKED

---

### Sign-off

- **Author:** Phase 3 kickoff
- **Reviewer:** 
- **Date:** 2026-11-02