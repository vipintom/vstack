# Research Record: vstack-worktree

**Date:** 2026-11-02
**Author:** Phase 3 continuation
**Reviewer:**

---

### vstack Purpose and Unique Boundary

- **What it owns:** Isolated workspace management — creates, configures, executes in, inspects, and cleans git worktrees for parallel work isolation.
- **What it explicitly does NOT own:** Parallel execution (swarm/best-of-n), worker isolation (swarm uses worktree), candidate isolation (best-of-n uses worktree), handoff (sequential fallback)
- **How it differs from adjacent skills:**
  - `vstack-swarm` = parallel workers (uses worktree for isolation)
  - `vstack-best-of-n` = candidate isolation (uses worktree)
  - `vstack-handoff` = sequential fallback (worktree = parallel isolation)
  - `vstack-recovery` = state restoration (worktree = isolated workspace)

---

### Cursor pstack Analogue Inspected

- **Skill/Playbook:** (no direct analogue — worktree management is vstack-specific)
- **Repository URL:** N/A

---

### Independent Pack Analogue Inspected

- **Pack:** superpowers
- **Skill/Playbook:** using-git-worktrees (workspace isolation)
- **Repository URL:** https://github.com/obra/superpowers
- **Date Inspected:** 2026-11-02
- **Key Files Read:** skills/using-git-worktrees/SKILL.md

---

### Patterns Worth Adopting

**From superpowers using-git-worktrees:**
- Detect existing isolation first
- Prefer native tools, fallback to git worktrees
- Submodule guard: GIT_DIR != GIT_COMMON also true in submodules
- Clean removal with force option

---

### Patterns to Adapt for vstack

| Reference pattern | vstack Adaptation |
|---|---|
| Native tools first | Harness provides isolation, fallback to git worktree |
| Submodule guard | Check for submodule before assuming worktree |
| Clean removal | Worktree cleanup with verification |

---

### Host/Vendor-Specific Mechanics to Reject

- Cursor-specific native worktree tools
- Submodule-specific handling

---

### Overlap Implications for Neighbouring vstack Skills

| Skill | Overlap | Resolution |
|---|---|---|
| vstack-swarm | Both isolation | swarm = uses worktree, worktree = provides |
| vstack-best-of-n | Both isolation | best-of-n = uses worktree, worktree = provides |
| vstack-handoff | Both fallback | handoff = sequential, worktree = parallel |
| vstack-recovery | Both state | recovery = restores, worktree = isolates |

---

### vstack Design Decision

**Trigger conditions:**
- For vstack-swarm worker isolation
- For vstack-best-of-n candidate isolation
- When concurrent writers need separation

**Non-triggers:**
- When sequential execution is simpler
- When harness doesn't support worktrees
- For single-threaded work

**Procedure (6 steps):**
1. Create worktree — `git worktree add <path> <base-commit>`, verify clean state, record worktree path and purpose
2. Configure workspace — install dependencies if needed, apply project config, set up tooling
3. Execute work — worker operates in worktree, changes isolated to worktree, commit within worktree
4. Inspect and validate — review changes in worktree, run verification, confirm isolation (no cross-worktree writes)
5. Integrate or discard — If PASS: merge or cherry-pick to main, If DISCARD: remove worktree
6. Clean up — `git worktree remove <path>`, verify no orphaned worktrees, clean build artifacts

**Output:**
- Isolated workspace for work
- Clean integration or clean removal
- No cross-contamination

**Verification:**
- Worktree changes don't affect other worktrees
- Integration passes verification
- Clean removal leaves no artifacts

**Evaluation cases:**
- Worktree creation
- Workspace configuration
- Isolation verification
- Clean integration/removal

---

### Sign-off

- **Author:** Phase 3 continuation
- **Reviewer:**
- **Date:** 2026-11-02