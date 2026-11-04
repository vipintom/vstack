# External Skill Pack Reference Catalogue

**Date:** 2026-11-02
**Phase:** 0.5 — External Reference Snapshot
**Purpose:** Pin reviewed commits for each reference pack used during content re-authoring

---

## Reference Packs (Per Implementation Plan Section 7)

| Pack | Repository | Commit/Release Pinned | Date Inspected | Licence | Relevant Content |
|---|---|---|---|---|---|
| **Cursor pstack (Primary)** | https://github.com/cursor/plugins/tree/main/pstack | `main` branch, commit `a1b2c3d` (example - to be pinned) | TBD | MIT | poteto-mode, architect, arena, swarm, interrogate, figure-it-out, show-me-your-work |
| **painhardcore/pstack (Portable)** | https://github.com/painhardcore/pstack | `main` branch, commit `e4f5g6h` (example - to be pinned) | TBD | MIT | Cross-harness installation, adapter generation, portability patterns |
| **obra/superpowers** | https://github.com/obra/superpowers | `main` branch, commit `i7j8k9l` (example - to be pinned) | TBD | MIT | Brainstorming, writing-plans, TDD, debugging, code review, subagent work |
| **aicodeking/deepseek-stack** | https://github.com/aicodeking/deepseek-stack | `main` branch, commit `m0n1o2p` (example - to be pinned) | TBD | Apache-2.0 | Verify loops, unstick, context reset, ledger, review loops, lessons, swarm, portability |
| **Anthropic Skills** | https://github.com/anthropics/skills | `main` branch, commit `q3r4s5t` (example - to be pinned) | TBD | MIT | Skill folder format, metadata, progressive disclosure, references |
| **t3dotgg/tstack** | https://github.com/t3dotgg/tstack | `main` branch, commit `u6v7w8x` (example - to be pinned) | TBD | MIT | PR lifecycle, council review, full-send/full-stop, delivery |
| **TStack** | https://tstack.dev/ | Documentation at https://tstack.dev/docs (to be inspected) | TBD | Various | Engineering doctrine, project context, ADRs, TDD, bug diagnosis |

---

## Per-Skill Research Requirements (Implementation Plan Section 7.2)

For **EVERY** skill in the final active inventory:

| Requirement | Details |
|---|---|
| **Primary analogue** | One from Cursor pstack when direct/adjacent analogue exists |
| **Independent analogue** | One from another pack when one exists |
| **Multiple analogues** | For high-value/high-risk skills: mode, architect, TDD, verification, swarm, review, session pickup, skill authoring |
| **No analogue** | Documented decision with sources searched |

---

## Skill → Reference Pack Mapping (Initial)

| vstack Skill | Primary (Cursor pstack) | Independent (Other) | Status |
|---|---|---|---|
| vstack-mode | poteto-mode | superpowers brainstorming/planning | ☐ |
| vstack-help | — | Anthropic Skills (discovery metadata) | ☐ |
| vstack-principles | poteto-mode principles | — | ☐ |
| vstack-sharpen | poteto-mode (request framing) | superpowers brainstorming | ☐ |
| vstack-how | poteto-mode how | deepseek-stack ds-explain | ☐ |
| vstack-why | poteto-mode why | TStack (engineering doctrine/ADRs) | ☐ |
| vstack-catchup | poteto-mode catchup | deepseek-stack ds-ledger/ds-catchup | ☐ |
| vstack-blast-radius | poteto-mode blast-radius | superpowers (impact analysis) | ☐ |
| vstack-explain | poteto-mode explain | superpowers (communication) | ☐ |
| vstack-recall | — | deepseek-stack ds-ledger | ☐ |
| vstack-architect | poteto-mode architect | deepseek-stack ds-blueprint | ☐ |
| vstack-blueprint | poteto-mode figure-it-out (design phase) | superpowers writing-plans | ☐ |
| vstack-arena | poteto-mode arena | deepseek-stack ds-best-of-n | ☐ |
| vstack-design-audit | — | superpowers (design review) | ☐ |
| vstack-prototype | poteto-mode prototype | superpowers brainstorming | ☐ |
| vstack-plan-review | poteto-mode plan-loop | superpowers executing-plans | ☐ |
| vstack-incremental-build | — | superpowers executing-plans | ☐ |
| vstack-refactor | — | superpowers safe-refactor | ☐ |
| vstack-unslop | — | — | ☐ |
| vstack-create-verification | poteto-mode create-verification-skill | Anthropic Skills (template format) | ☐ |
| vstack-maintain-verification | poteto-mode maintain-verification-skill | — | ☐ |
| vstack-verification-audit | — | deepseek-stack ds-verify-loop | ☐ |
| vstack-debug | poteto-mode debugging | deepseek-stack ds-debugging, superpowers systematic-debugging | ☐ |
| vstack-recovery | poteto-mode recovery | deepseek-stack ds-recovery | ☐ |
| vstack-swarm | poteto-mode swarm | deepseek-stack ds-swarm, superpowers dispatching-parallel-agents | ☐ |
| vstack-best-of-n | poteto-mode arena (candidate mode) | deepseek-stack ds-best-of-n | ☐ |
| vstack-worktree | poteto-mode worktree | superpowers using-git-worktrees | ☐ |
| vstack-handoff | poteto-mode handoff | deepseek-stack ds-catchup | ☐ |
| vstack-interrogate | poteto-mode interrogate | deepseek-stack ds-review-loop, superpowers requesting/receiving-code-review | ☐ |
| vstack-jury | poteto-mode interrogate (multi-reviewer) | deepseek-stack ds-jury, t3dotgg/tstack council | ☐ |
| vstack-review-rubrics | poteto-mode rubrics | TStack (review criteria) | ☐ |
| vstack-ledger | poteto-mode show-me-your-work | deepseek-stack ds-ledger | ☐ |
| vstack-safe-pause | poteto-mode pause | deepseek-stack ds-context-reset | ☐ |
| vstack-session-pickup | poteto-mode pickup | deepseek-stack ds-catchup | ☐ |
| vstack-pr | poteto-mode PR workflow | t3dotgg/tstack file-pr | ☐ |
| vstack-watch-pr | poteto-mode PR monitoring | t3dotgg/tstack takeover | ☐ |
| vstack-ready | poteto-mode readiness | t3dotgg/tstack full-send | ☐ |
| vstack-ship | poteto-mode shipping | t3dotgg/tstack full-send/full-stop | ☐ |
| vstack-performance | poteto-mode performance | TStack (engineering doctrine) | ☐ |
| vstack-runtime-forensics | — | TStack (observability) | ☐ |
| vstack-trace-forensics | — | TStack (trace analysis) | ☐ |
| vstack-visual-parity | poteto-mode visual-parity | — | ☐ |
| vstack-tdd | poteto-mode tdd | superpowers test-driven-development, deepseek-stack ds-tdd | ☐ |
| vstack-verify-loop | poteto-mode verify-loop | deepseek-stack ds-verify-loop | ☐ |
| vstack-unstick | poteto-mode unstick | deepseek-stack ds-unstick | ☐ |
| vstack-debugging | poteto-mode debugging | superpowers systematic-debugging | ☐ |
| vstack-mode | poteto-mode | painhardcore/pstack portable invocation | ☐ |
| vstack-help | — | Anthropic Skills (skill discovery) | ☐ |
| vstack-principles | poteto-mode principles | — | ☐ |
| vstack-discovery | poteto-mode discovery | deepseek-stack ds-explain | ☐ |
| vstack-context-reset | poteto-mode context-reset | deepseek-stack ds-context-reset | ☐ |
| vstack-plan-loop | poteto-mode plan-loop | superpowers writing-plans, deepseek-stack ds-plan-loop | ☐ |
| vstack-skill-authoring | poteto-mode skill-authoring | Anthropic Skills (authoring guidance) | ☐ |
| vstack-skill-evaluation | poteto-mode evaluation | superpowers (evaluation approach) | ☐ |

---

## Research Record Template (Per Skill)

**File:** `docs/research/records/<skill-id>.md`

```markdown
## Research Record: <skill-id>

**Date:** YYYY-MM-DD
**Author:** 
**Reviewer:** 

### vstack Purpose and Unique Boundary
- What specific outcome does this skill own?
- What does it explicitly NOT own?
- How does it differ from adjacent skills?

### Cursor pstack Analogue Inspected
- **Skill/Playbook:** 
- **Repository URL:** https://github.com/cursor/plugins/blob/main/pstack/skills/<name>/SKILL.md
- **Commit/Revision:** 
- **Date Inspected:** 
- **Key Files Read:** SKILL.md, any referenced rubrics/resources

### Independent Pack Analogue Inspected
- **Pack:** (superpowers / deepseek-stack / Anthropic / t3dotgg/tstack / TStack)
- **Skill/Playbook:** 
- **Repository URL:** 
- **Commit/Revision:** 
- **Date Inspected:** 
- **Key Files Read:** 

### Patterns Worth Adopting
- Trigger definitions:
- Procedure structure:
- Decision points:
- Output/evidence requirements:
- Failure handling:
- Fallback behaviour:

### Patterns to Adapt for vstack
- Host-specific assumptions to remove:
- Procedure modifications for portability:
- Integration with vstack principles/roles:
- Trigger refinement:

### Host/Vendor-Specific Mechanics to Reject
- Cursor-only commands/APIs:
- Model/vendor dependencies:
- Unsupported tool assumptions:
- Unnecessary ceremony:

### Overlap Implications for Neighbouring vstack Skills
- Skills with similar triggers:
- Skills with overlapping procedures:
- Resolution (merge/keep separate/reference):

### Licence/Attribution Notes
- Source licence:
- Attribution required:
- Code/text copied (if any):

### vstack Design Decision
- Final trigger conditions:
- Procedure outline:
- Output/evidence specifications:
- Stop/escalation/fallback:
- Evaluation cases this research suggests:

### Sign-off
- **Author:** 
- **Reviewer:** 
- **Date:** 
```

---

## Research Progress Tracker

| Skill | pstack Analogue | Independent Analogue | Research Record | Status |
|---|---|---|---|---|
| vstack-mode | poteto-mode | superpowers brainstorming | ☐ | ⏳ |
| vstack-help | — | Anthropic Skills | ☐ | ⏳ |
| vstack-principles | poteto-mode principles | — | ☐ | ⏳ |
| vstack-sharpen | poteto-mode framing | superpowers brainstorming | ☐ | ⏳ |
| vstack-how | poteto-mode how | deepseek-stack ds-explain | ☐ | ⏳ |
| vstack-why | poteto-mode why | TStack ADRs | ☐ | ⏳ |
| vstack-catchup | poteto-mode catchup | deepseek-stack ds-ledger | ☐ | ⏳ |
| vstack-blast-radius | poteto-mode blast-radius | superpowers impact analysis | ☐ | ⏳ |
| vstack-explain | poteto-mode explain | superpowers communication | ☐ | ⏳ |
| vstack-recall | — | deepseek-stack ds-ledger | ☐ | ⏳ |
| vstack-architect | poteto-mode architect | deepseek-stack ds-blueprint | ☐ | ⏳ |
| vstack-blueprint | poteto-mode figure-it-out | superpowers writing-plans | ☐ | ⏳ |
| vstack-arena | poteto-mode arena | deepseek-stack ds-best-of-n | ☐ | ⏳ |
| vstack-design-audit | — | superpowers design review | ☐ | ⏳ |
| vstack-prototype | poteto-mode prototype | superpowers brainstorming | ☐ | ⏳ |
| vstack-plan-review | poteto-mode plan-loop | superpowers executing-plans | ☐ | ⏳ |
| vstack-incremental-build | — | superpowers executing-plans | ☐ | ⏳ |
| vstack-refactor | — | superpowers safe-refactor | ☐ | ⏳ |
| vstack-unslop | — | — | ☐ | ⏳ |
| vstack-create-verification | poteto-mode create-verification | Anthropic Skills template | ☐ | ⏳ |
| vstack-maintain-verification | poteto-mode maintain-verification | — | ☐ | ⏳ |
| vstack-verification-audit | — | deepseek-stack ds-verify-loop | ☐ | ⏳ |
| vstack-debug | poteto-mode debugging | deepseek-stack ds-debugging | ☐ | ⏳ |
| vstack-recovery | poteto-mode recovery | deepseek-stack ds-recovery | ☐ | ⏳ |
| vstack-swarm | poteto-mode swarm | deepseek-stack ds-swarm | ☐ | ⏳ |
| vstack-best-of-n | poteto-mode arena | deepseek-stack ds-best-of-n | ☐ | ⏳ |
| vstack-worktree | poteto-mode worktree | superpowers using-git-worktrees | ☐ | ⏳ |
| vstack-handoff | poteto-mode handoff | deepseek-stack ds-catchup | ☐ | ⏳ |
| vstack-interrogate | poteto-mode interrogate | deepseek-stack ds-review-loop | ☐ | ⏳ |
| vstack-jury | poteto-mode interrogate | deepseek-stack ds-jury | ☐ | ⏳ |
| vstack-review-rubrics | poteto-mode rubrics | TStack review criteria | ☐ | ⏳ |
| vstack-ledger | poteto-mode show-me-your-work | deepseek-stack ds-ledger | ☐ | ⏳ |
| vstack-safe-pause | poteto-mode pause | deepseek-stack ds-context-reset | ☐ | ⏳ |
| vstack-session-pickup | poteto-mode pickup | deepseek-stack ds-catchup | ☐ | ⏳ |
| vstack-pr | poteto-mode PR | t3dotgg/tstack file-pr | ☐ | ⏳ |
| vstack-watch-pr | poteto-mode PR monitoring | t3dotgg/tstack takeover | ☐ | ⏳ |
| vstack-ready | poteto-mode readiness | t3dotgg/tstack full-send | ☐ | ⏳ |
| vstack-ship | poteto-mode shipping | t3dotgg/tstack full-send/stop | ☐ | ⏳ |
| vstack-performance | poteto-mode performance | TStack doctrine | ☐ | ⏳ |
| vstack-runtime-forensics | — | TStack observability | ☐ | ⏳ |
| vstack-trace-forensics | — | TStack trace analysis | ☐ | ⏳ |
| vstack-visual-parity | poteto-mode visual-parity | — | ☐ | ⏳ |
| vstack-tdd | poteto-mode tdd | superpowers TDD, deepseek-stack ds-tdd | ☐ | ⏳ |
| vstack-verify-loop | poteto-mode verify-loop | deepseek-stack ds-verify-loop | ☐ | ⏳ |
| vstack-unstick | poteto-mode unstick | deepseek-stack ds-unstick |� | ⏳ |
| vstack-debugging | poteto-mode debugging | superpowers systematic-debugging | ☐ | ⏳ |
| vstack-skill-authoring | poteto-mode skill-authoring | Anthropic Skills authoring | ☐ | ⏳ |
| vstack-skill-evaluation | poteto-mode evaluation | superpowers evaluation | ☐ | ⏳ |

**Total: ~47 skills requiring research records**

---

## Notes

1. **Cursor pstack is the PRIMARY reference** — inspect actual `SKILL.md` files, not just README listings
2. **painhardcore/pstack** is a portable adaptation of Cursor pstack — useful for portability patterns but NOT an independent methodology source
3. **Independent packs** must be genuinely separate projects (superpowers, deepseek-stack, Anthropic Skills, t3dotgg/tstack, TStack)
4. **Pin exact commits** — repositories change; record the commit SHA inspected
5. **Licence check** — MIT/Apache-2.0 generally permissive; verify before copying code/substantial text
6. **Synthesize, don't copy** — write original vstack instructions; external patterns inform but don't dictate
7. **Document rejections** — recording why a pattern was rejected shows considered adaptation