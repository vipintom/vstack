# ADR-0015: External Research Mandate Per Skill

**Date:** 2026-11-02
**Status:** Accepted

## Context

The PRD requires that every skill be authored with external research against relevant skill packs. The primary reference is Cursor's pstack, with at least one independent pack per skill.

## Decision

**Every skill must have a completed external research record before content review.**

Requirements per skill:
1. Search Cursor pstack for closest analogue; inspect actual `SKILL.md`/playbook source (not just README)
2. Inspect at least one additional independent skill pack when a meaningful analogue exists (Superpowers, DeepSeek Stack, Anthropic Skills, TStack, t3dotgg/tstack)
3. Read relevant source end-to-end; capture URL, exact file URL, commit/revision, date
4. Extract useful method: triggers, procedure, decision points, artifacts, stop conditions, verification, fallbacks, composition
5. Identify host-specific assumptions, model/vendor dependencies, unsupported tools, unnecessary ceremony, patterns NOT to transfer
6. Compare against vstack's distinct purpose and neighbouring vstack content
6. Write original vstack instructions — do NOT bulk-copy third-party skills
7. Check source licence/attribution before reusing code/substantial text
8. Add research decision and source snapshot to per-skill research ledger

## Minimum Research Evidence

- One pstack-family source check where a direct/adjacent analogue exists
- One independent pack check where a relevant analogue exists
- If neither has a useful analogue, record sources searched, why no suitable analogue exists, which general design patterns were considered, and why the vstack method must be original

## Rationale

1. The Implementation Plan Section 2.2 makes this mandatory: "External research is mandatory for every skill. This is not an optional inspiration exercise."

2. Prevents superficial research, copy/paste from external sources, and licence issues
3. Ensures vstack adapts patterns for its distinct purpose (portable, harness-independent, Lead/Builder/Reviewer model)
4. Documents rejections of host-specific mechanics

## Consequences

- ~47 skills require research records (all active skills minus 2 retired)
- Research records stored in `docs/research/records/<skill-id>.md`
- Priority skills for multiple analogues: mode, architect, TDD, verification, swarm, review, session pickup, skill authoring
- Research records must be complete before content review and stable promotion

## References

- PRD Section 3.1: Primary reference: Cursor pstack
- PRD Section 18.4: Skill re-authoring requirements
- Implementation Plan Section 2.2: External research is mandatory for every skill
- Implementation Plan Section 7: External skill-pack research programme