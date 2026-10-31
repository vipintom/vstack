# ADR-0001: Evidence Revision Field for Optimistic Concurrency

**Date:** 2026-11-01
**Status:** Proposed
**Deciders:** Implementation team

## Context

The `writeJsonFile` function in `persistence/file-store.ts` requires a generic type `T extends { revision?: number }` for optimistic concurrency control. The `Evidence` interface in `schemas/types.ts` does not have a `revision` field, causing a TypeScript error at `evidence-ledger.ts:103` when calling `writeJsonFile`.

All other persisted entities (`Delivery`, `PhaseRun`, `Task`, `AgentRun`, `ReviewRun`, `Finding`, `Approval`, `Event`) include a `revision: number` field. `Evidence` is the only entity missing it.

## Decision Options

### Option A: Add `revision?: number` to Evidence (Recommended)
- **Pros:**
  - Consistent with all other entity types
  - Enables optimistic concurrency for evidence records
  - Minimal change — one field addition
  - Aligns with file-store design pattern
- **Cons:**
  - Requires migration for existing evidence records (add default revision: 0)
  - Evidence is append-mostly; concurrent updates less likely but possible

### Option B: Remove revision requirement from writeJsonFile
- **Pros:** No schema change needed
- **Cons:**
  - Breaks optimistic concurrency pattern for all entities
  - Removes safety for multi-process writes
  - Inconsistent with rest of codebase

### Option C: Overload writeJsonFile for Evidence
- **Pros:** Keeps Evidence unchanged
- **Cons:**
  - Special-casing undermines generic file-store
  - Adds complexity to persistence layer

## Decision

**Choose Option A:** Add `revision?: number` to `Evidence` interface.

**Rationale:** Consistency across all entity types is paramount for maintainability. The file-store pattern is designed around revision-based optimistic concurrency. Evidence records, while primarily append-only, can be updated (e.g., adding metadata, correcting status). The migration is trivial (default revision: 0).

## Consequences

- **Schema change:** Evidence schema version increments (1 → 2)
- **Migration needed:** Add `revision: 0` to existing evidence records on read/write
- **Test updates:** Evidence tests should verify revision behavior
- **File-store unchanged:** Continues to work uniformly for all entities

## Implementation

1. Add `revision?: number` to `Evidence` interface in `schemas/types.ts`
2. Update `evidence-ledger.ts` to include revision in created evidence (default 0)
3. Add migration logic in `schema-version.ts` or evidence-ledger for existing records
4. Run typecheck and build to verify
5. Update evidence tests to cover revision

## Related

- `schemas/types.ts` — Evidence interface (line 405-428)
- `persistence/file-store.ts` — writeJsonFile signature (line 169)
- `quality/evidence-ledger.ts` — record function (line 57-104)
- `persistence/schema-version.ts` — migration support