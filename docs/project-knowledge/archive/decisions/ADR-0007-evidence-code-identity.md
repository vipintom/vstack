# ADR-0007: Evidence Code Identity — Commit SHA with Diff Fingerprint

**Date:** 2026-11-01
**Status:** Decided
**Deciders:** Implementation team

## Context

Evidence records must associate verification results with the code state they verify. The v2 PRD requires commit/diff association and stale evidence detection for dirty working trees.

## Decision Options

### Option A: Commit SHA + optional diff fingerprint (Recommended)
- **Pros:**
  - Commit SHA is stable and universally available
  - Diff fingerprint detects uncommitted changes
  - Works with dirty working trees
  - Git-native, no external dependencies
- **Cons:**
  - Requires Git access at evidence recording time
  - Diff computation adds overhead

### Option B: Tree hash only
- **Pros:**
  - Represents exact file tree state
- **Cons:**
  - Doesn't capture history/commit context
  - Harder to correlate with PRs/CI

### Option C: File-level content hashes
- **Pros:**
  - Precise change detection
- **Cons:**
  - High overhead
  - Overkill for evidence association

## Decision

**Choose Option A:** Evidence records store `commitSha` (required) and `diffFingerprint` (optional, for dirty trees).

**Rationale:** Commit SHA provides stable, traceable link to Git history. Diff fingerprint (hash of `git diff HEAD`) detects uncommitted changes. When working tree is clean, diff fingerprint is empty/null. When dirty, it captures the working state. This allows stale detection: if current `commitSha` != evidence `commitSha` OR current diff != evidence `diffFingerprint`, evidence is stale.

## Consequences

- `Evidence` schema includes `commitSha: string` and `diffFingerprint?: string`
- Evidence recording captures `git rev-parse HEAD` and `git diff HEAD | sha256`
- Stale detection in `quality/check-service.ts` and OpenChamber projections
- Dirty tree behavior: evidence recorded with current commit + diff fingerprint
- Provenance `plugin_observed` only when plugin executes check directly

## Related

- `opencode/vstack/src/schemas/types.ts` — Evidence interface
- `opencode/vstack/src/quality/check-service.ts` — evidence recording
- `opencode/vstack/src/quality/execution-adapter.ts` — process execution
- Phase 4 Evidence provenance and freshness