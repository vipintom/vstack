# AGENTS.md — vstack Agent Guidance

This file provides guidance for AI agents working on the vstack repository. Follow these instructions when making changes.

## Project Overview

vstack is an engineering playbook with three packages:
1. **Playbook** (`/playbook/`) — Portable content: principles, roles, skills, workflows (Markdown/YAML)
2. **OpenCode Plugin** (`/opencode/vstack/`) — Runtime: memory, delivery/tasks, agent coordination, history, evidence, enforcement
3. **OpenChamber Plugin** (`/openchamber/vstack-panel/`) — Read-only visualization of plugin state

## Mandatory Working Practice

**Maintain the project knowledge base** at `docs/project-knowledge/` continuously:

- **Session start:** Read `README.md`, `CURRENT-STATE.md`, `IMPLEMENTATION-STATUS.md`, relevant architecture/decision pages. Inspect actual repo state.
- **During work:** Update architecture/decision records for material decisions. Record discoveries, blockers, compatibility findings.
- **Session end:** Update `CURRENT-STATE.md`, `IMPLEMENTATION-STATUS.md`, `WORK-LOG.md`. Record exact test commands/results. Update `KNOWN-ISSUES.md`. State next task + blockers.
- **Never** defer documentation — it's part of definition of done.

## Responsibility Boundaries (Enforce Strictly)

| Concern | Playbook | OpenCode Plugin | OpenChamber |
|---|---|---|---|
| Principles/roles/skills/workflows | Defines | Makes available | Displays |
| Task/delivery state | Explains methodology | Owns runtime records | Reads projections |
| Agent reasoning | Guides | Does not reimplement | None |
| Memory methodology | Defines practices | Persists/retrieves | Browses views |
| History | Defines events | Records actual events | Displays published |
| Verification | Defines procedures | Executes/records checks | Displays evidence |
| Enforcement | Describes standards | Enforces small set | Displays gate status |
| Visualization | None | Publishes read model | Owns presentation |

**Rules:**
1. Skill = procedure; plugin tool = deterministic capability/recording
2. Workflow = Markdown recipe, NOT TypeScript state machine
3. Plugin owns authoritative runtime records; agents use plugin tools for mutations
4. OpenChamber **NEVER** mutates authoritative records
5. Event log = audit record, not full event sourcing
6. Playbook works without plugins; skills document fallbacks
7. Harness wrappers adapt invocation only, not methodology

## Simplicity Constraints

- Direct services over registries/frameworks/state machines
- Module justified only if: owns real responsibility, has reusable behavior, or makes tested boundary safer
- No wrapper layers just to pass deps or mirror directory tree
- ~7 cohesive tools max (status, memory, history, delivery, task, agent, check)
- No generic workflow interpreter, scheduler, deployment platform, policy engine

## Package Conventions

- TypeScript strict, ES2022, ESM only (`"type": "module"`)
- No default exports in source; named exports, default only in entry points
- Tests co-located: `*.test.ts` next to source
- Plugin entry point: `index.ts` re-exports all public API

## Current Phase

**Phase 0: Baseline & Knowledge Base** — Complete initial inventory, fix blocking issues, establish knowledge base.

**Blocking Issues:**
1. Evidence revision field (ADR-0001) — fix in progress
2. OpenChamber SDK unavailable — defer build, typecheck passes

## Key Files to Reference

- `vstack-prd.md` — Product requirements (authority for WHAT)
- `vstack-implementation-plan.md` — Engineering plan (authority for HOW)
- `docs/project-knowledge/` — Current state, architecture, inventory, decisions
- `opencode/vstack/src/schemas/types.ts` — Core entity definitions
- `opencode/vstack/src/persistence/file-store.ts` — Persistence primitives

## Testing Requirements

- Run `pnpm test` in package dir before claiming changes work
- Record: date, env, exact command, pass/fail, output, test type
- Build success ≠ workflow works — need E2E scenarios with evidence
- No test reported as passing unless actually executed

## Security & Safety

- Validate paths; keep mutations inside project data root
- Bound all process timeouts and output capture
- No unsafe shell interpolation
- Explicit auth for destructive/external operations
- No secrets/credentials in memory/history
- Distinguish: approval requested ≠ recorded ≠ granted ≠ executed

## Git Practice

- Preserve known-good baseline via tag/branch before major changes
- Don't delete historical source — mark deferred/obsolete first
- Small, reversible commits with clear intent

## When Uncertain

1. Check `docs/project-knowledge/` for existing decisions
2. Read actual source — don't trust audit/plan blindly
3. Run tests to verify behavior
4. Ask for clarification on product decisions (not implementation details already in plan)