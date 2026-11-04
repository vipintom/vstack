# ADR-0009: Checkpoint Canonicality — Single Portable Artifact

**Date:** 2026-11-01
**Status:** Decided
**Deciders:** Implementation team

## Context

Long-running work needs a portable progress checkpoint (`PROGRESS.md`). The v2 PRD requires one canonical checkpoint artifact with plugin index/reference, not duplicate authoritative stores.

## Decision

**Single canonical checkpoint artifact: `PROGRESS.md` (Markdown) at project root or delivery directory. Plugin stores lightweight index only.**

**Structure:**
- `PROGRESS.md` — human/agent readable, portable handoff artifact
- `.vstack/checkpoints/<delivery-id>/index.json` — plugin index with:
  - `path`: path to PROGRESS.md
  - `contentHash`: SHA256 of PROGRESS.md content
  - `timestamp`: last update
  - `deliveryId`: associated delivery
  - `branch`/`commit`: repository state at checkpoint
  - `freshness`: `current` | `stale` | `unknown`

**Rationale:** 
- Markdown is portable, human-readable, harness-independent
- Plugin index enables fast UI lookup and stale detection
- No duplicate authoritative content — PROGRESS.md is source of truth
- On pickup: validate current repo state (branch/commit) against checkpoint, then read PROGRESS.md

## Consequences

- `vstack-context-reset` skill writes/updates `PROGRESS.md`
- Plugin indexes checkpoint on tool execution hook
- OpenChamber reads PROGRESS.md directly for content, uses index for freshness
- Stale detection: contentHash mismatch OR branch/commit mismatch
- No PROGRESS.md duplication in `.vstack/`

## Related

- `playbook/skills/vstack-context-reset/SKILL.md`
- `opencode/vstack/src/dashboard/projections/` — checkpoint projection
- Phase 2 Handoff, progress checkpoint and safe pause
- Phase 5 OpenChamber checkpoint view