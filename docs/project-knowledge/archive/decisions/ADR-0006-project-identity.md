# ADR-0006: Project Identity and .vstack Ownership Across Worktrees

**Date:** 2026-11-01
**Status:** Decided
**Deciders:** Implementation team

## Context

The v2 implementation must decide how `.vstack/` state is managed across main checkout and Git worktrees. The v1 prototype's `repository-root.ts` handles worktree resolution.

## Decision Options

### Option A: Single canonical `.vstack/` at repo root, shared by all worktrees (Recommended)
- **Pros:**
  - Single source of truth for project memory, history, deliveries
  - Worktrees are transient; project state persists
  - Simpler implementation
  - Matches v1 prototype behavior
- **Cons:**
  - Concurrent worktrees may conflict on `.vstack/` writes
  - Need locking for cross-worktree access

### Option B: Per-worktree `.vstack/` with sync
- **Pros:**
  - Isolation between worktrees
- **Cons:**
  - Complex sync logic
  - Memory/history fragmentation
  - Duplicate project knowledge

## Decision

**Choose Option A:** Single canonical `.vstack/` at repository root, shared by all worktrees. Use existing `repository-root.ts` to resolve the root from any worktree.

**Rationale:** Project memory, history, and delivery state are project-scoped, not worktree-scoped. Worktrees are transient development environments. The v1 prototype already implements correct worktree resolution in `repository-root.ts`. Cross-worktree concurrency is handled by file locks in `persistence/locks.ts`.

## Consequences

- `.vstack/` created at repository root (found via `repository-root.ts`)
- All worktrees read/write same `.vstack/`
- File locks prevent concurrent write corruption
- Agent runs track worktree/branch context in records
- No sync logic needed

## Related

- `opencode/vstack/src/persistence/repository-root.ts`
- `opencode/vstack/src/persistence/locks.ts`
- `opencode/vstack/src/schemas/types.ts` — entity records include `branch`/`worktree` fields
- Phase 0 worktree proof