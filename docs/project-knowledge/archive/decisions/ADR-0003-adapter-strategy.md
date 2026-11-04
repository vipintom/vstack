# ADR-0003: Adapter Strategy — Generated at Install Time

**Date:** 2026-11-01
**Status:** Decided
**Deciders:** Implementation team

## Context

The v2 implementation requires generating harness-specific adapters (OpenCode, Codex, Claude Code) from the canonical Playbook content. The adapters contain harness-specific metadata, tool permissions, and invocation instructions but must not fork the methodology.

## Decision Options

### Option A: Generated at install time (Recommended)
- **Pros:**
  - Single canonical source of truth
  - Adapters always in sync with Playbook
  - Users can customize adapters without losing changes (merge strategy)
  - Deterministic output from canonical source + adapter version
- **Cons:**
  - Requires install-time generation step
  - More complex than pre-generated files

### Option B: Pre-generated and committed
- **Pros:**
  - Simple, no generation step
  - Easy to inspect in repo
- **Cons:**
  - Risk of drift between canonical and adapters
  - Must regenerate on every Playbook change
  - Harder to maintain multiple harness versions

### Option C: Materialized at runtime
- **Pros:**
  - Always current
- **Cons:**
  - Runtime overhead
  - Harder to debug
  - Not how Skills CLI works

## Decision

**Choose Option A:** Generate adapters at install time from canonical Playbook content.

**Rationale:** The Playbook is the single source of truth. Adapters are thin wrappers with harness-specific metadata. Install-time generation ensures synchronization while allowing user customization through a merge strategy (similar to how `create-react-app` handles ejecting).

## Consequences

- Playbook validation must include adapter generation test
- Adapter templates stored in Playbook (e.g., `/playbook/adapters/templates/`)
- Installation scripts generate adapters to harness-specific locations
- Adapter provenance (source version/hash) recorded in generated files

## Related

- Phase 1 Playbook Foundation
- `playbook/scripts/test-install.js` (to be created)
- Skills CLI integration