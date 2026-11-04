# Engineering Principles

vstack is built on 17 core principles. These aren't aspirations — they're enforceable decision rules that shape every design decision. Each principle has a trigger, behavior, and example.

## Principles in Order of Application

Apply these principles in order when making decisions:

### 1. Harness Independence First

**Trigger:** Choosing between portable instructions vs. proprietary runtime features.

**Behavior:** Does this work without proprietary runtime? If not, document fallback.

**Example:** Use Skills CLI / Markdown skills instead of OpenCode-only agents.

### 2. Procedures Over Vague Instructions

**Trigger:** Writing a skill, playbook, or agent instruction.

**Behavior:** Is there a concrete step-by-step with Action/Evidence/Decision? If missing → BLOCKED.

**Example:** Skill must have numbered Procedure with explicit outputs.

### 3. Flexible Workflows, Not Mandatory Ceremony

**Trigger:** Selecting process rigour for a task.

**Behavior:** Match rigour to risk level (Low/Medium/High/Critical). If over-engineered → simplify.

**Example:** Quick mode for trivial bug fix; Advanced for architecture change.

### 4. Loops Are First-Class

**Trigger:** Designing any iterative process.

**Behavior:** Identify feedback loops (TDD, verify-loop, debug, unstick) with iteration bounds and escalation path.

**Example:** `vstack-unstick` has 3-failure limit, 2-round max, clean restart.

### 5. Small, Purposeful Agent Team

**Trigger:** Staffing a delivery.

**Behavior:** Map work to Lead/Builder/Reviewer + skills. If role unclear → BLOCKED.

**Example:** Feature delivery uses 1 Lead, N Builders, 1 Reviewer.

### 6. Evidence Before Completion

**Trigger:** Claiming work is done.

**Behavior:** Require executed verification for each acceptance criterion. No evidence → NOT VERIFIED.

**Example:** `vstack-verify-loop` records VERIFIED/NOT_VERIFIED/INCONCLUSIVE/BLOCKED.

### 7. Independent Challenge

**Trigger:** Reviewing work.

**Behavior:** Ensure review uses fresh context (new session or explicit reset). Same-context = weaker review.

**Example:** Reviewer invoked via `agent` tool with only review package.

### 8. Runtime Simplicity

**Trigger:** Adding plugin services vs. instructions.

**Behavior:** Prefer harness tools over plugin services; instructions first.

**Example:** `vstack-check` tool is just a wrapper; instructions can run checks directly.

### 9. Clear Source of Responsibility

**Trigger:** Ambiguity about who owns a concern.

**Behavior:** Assign ownership: Playbook=methodology, Plugin=runtime, OpenChamber=view.

**Example:** Event log = plugin; Playbook = workflow definition.

### 10. Degrade Gracefully

**Trigger:** Using advanced harness features.

**Behavior:** Test/verify fallback paths (sequential, directory isolation, manual checks).

**Example:** Subagents unavailable → sequential; worktrees unavailable → branches.

### 11. Understand Before Changing

**Trigger:** Modifying unfamiliar code.

**Behavior:** Use `vstack-how`/`vstack-why` to build mental model before changes.

**Example:** Investigation workflow before refactoring.

### 12. Route Before Loading

**Trigger:** Starting non-trivial work.

**Behavior:** Use `vstack-mode` to select playbook; don't assume.

**Example:** "Fix bug" → bug-fixing playbook, not feature-delivery.

### 13. Smallest Complete Change

**Trigger:** Sizing a change.

**Behavior:** Decompose into smallest verifiable units. Each: baseline → change → verify → commit.

**Example:** `vstack-incremental-build` enforces per-step verification.

### 14. Challenge Assumptions

**Trigger:** Stuck on same approach.

**Behavior:** Use `vstack-unstick` after 3 failures: name assumption, cheapest probe, 3 different approaches.

**Example:** If caching fix fails 3×, question "is caching the issue?"

### 15. Model Domain Explicitly

**Trigger:** Designing types, APIs, schemas.

**Behavior:** Types mirror domain concepts. No primitive obsession (no `string` for UserId).

**Example:** `vstack-blueprint` requires interface-first design.

### 16. Respect Boundaries

**Trigger:** Cross-module changes.

**Behavior:** Each module owns one responsibility. Dependencies point inward. No circular deps.

**Example:** Lead owns scope; Builder owns implementation; Reviewer owns findings.

### 17. Verifiable Increments

**Trigger:** Completing a step.

**Behavior:** Every step produces evidence. Completion requires verification. No "trust me."

**Example:** `vstack-verify-loop` per-task + integration; PROGRESS.md checkpoints.

---

## Applying Principles

These principles map directly to vstack implementation:

| Principle | Implementation |
|---|---|
| Harness Independence First | Playbook works without plugins; Skills CLI portable |
| Procedures Over Vague Instructions | All 55 skills have Procedure with Action/Evidence/Decision |
| Flexible Workflows | 4 modes (Quick/Standard/Advanced/Extended) risk-calibrated |
| Loops Are First-Class | TDD, verify-loop, debug, unstick all bounded with escalation |
| Small, Purposeful Agent Team | 3 roles + 55 skills; no generic scheduler/lifecycle engine |
| Evidence Before Completion | `vstack_check` tool records VERIFIED/NOT_VERIFIED/INCONCLUSIVE/BLOCKED |
| Independent Challenge | Reviewer fresh session; `disallowedTools` / `sandbox_mode: read-only` |
| Runtime Simplicity | ~7 tools max; plugin adds only what instructions can't |
| Clear Responsibility | Playbook/Plugin/OpenChamber separation documented in AGENTS.md |
| Degrade Gracefully | Sequential fallback, branch isolation, manual checks documented |
| Understand Before Changing | Investigation workflow; `vstack-how`/`vstack-why` before changes |
| Route Before Loading | `vstack-mode` 9-phase routing with 21 request shapes |
| Smallest Complete Change | `vstack-incremental-build` decomposition with per-step verify |
| Challenge Assumptions | `vstack-unstick` 10-step: assumption → probe → 3 approaches |
| Model Domain Explicitly | Branded IDs, explicit schemas, typed stores in plugin |
| Respect Boundaries | Authority matrix per role; no shared mutable state |
| Verifiable Increments | PROGRESS.md checkpoints; evidence per acceptance criterion |

---

## Principle Files

Each principle has a leaf file in `playbook/principles/`:

1. `harness-independence-first.md`
2. `procedures-over-vague-instructions.md`
3. `flexible-workflows-not-mandatory-ceremony.md`
4. `loops-are-first-class.md`
5. `small-purposeful-agent-team.md`
6. `evidence-before-completion.md`
7. `independent-challenge.md`
8. `runtime-simplicity.md`
9. `clear-source-of-responsibility.md`
10. `degrade-gracefully.md`
11. `understand-before-changing.md`
12. `route-before-loading.md`
13. `smallest-complete-change.md`
14. `challenge-assumptions.md`
15. `model-domain-explicitly.md`
16. `respect-boundaries.md`
17. `verifiable-increments.md`

Plus `index.md` as compact reference linking to all leaf files.