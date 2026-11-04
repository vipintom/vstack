# ADR-0014: No Grandfathering Policy

**Date:** 2026-11-02
**Status:** Accepted

## Context

The Playbook 2.0 Content Re-authoring initiative requires a full rewrite of all active content (skills, workflows/playbooks, principles, roles, adapters, rubrics, templates, references). The prior independent audit rated skills as Strong/Adequate/Complete, but these ratings reflect the prior implementation quality, not v2 compliance.

## Decision

**No skill, playbook, principle, role, adapter, rubric, template, or reference is exempt from full re-authoring because of its prior audit rating.**

- Prior Strong/Adequate/Complete labels are diagnostic input only
- Every active item must be rebuilt against the v2 content contract (PRD Sections 9, 10, 11)
- A rewrite must improve the actual instructions, triggers, decision criteria, outputs, verification, failure handling, and composition
- Cosmetic edits, metadata-only changes, or adding missing headings do not count as re-authoring
- Existing prose may inform the rewrite but is not automatically approved v2 content

## Rationale

1. The PRD explicitly states: "No skill or playbook is exempt because it was rated Strong, Adequate or Complete in the audit. Those labels describe the prior implementation only." (Section 18.2)

2. Structural completeness and passing validation ≠ behavioural quality. The audit's structural findings are inputs, not the complete content standard (PRD Section 2.4).

3. Allowing grandfathering would defeat the purpose of the re-authoring initiative, which is to raise the quality of the entire active Playbook to v2 standards.

## Consequences

- Full re-authoring of 53 skills, 18 workflows, 7/10 principles, 3 roles, 9 adapters, 7 rubrics, 4 templates, 1 reference
- More work upfront, but ensures consistent v2 quality across the entire catalogue
- Migration ledger must record disposition for every item with evidence
- No exceptions — if an item is not ready, it must be marked experimental/deprecated with a supported replacement path

## References

- PRD Section 18.2: Non-negotiable full re-authoring policy
- PRD Section 22.2: Release acceptance criteria
- Implementation Plan Section 2.1: Complete re-authoring; preserve knowledge, not legacy prose