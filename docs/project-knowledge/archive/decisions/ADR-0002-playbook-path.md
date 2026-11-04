# ADR-0002: Canonical Playbook Path and Skills CLI Layout

**Date:** 2026-11-01
**Status:** Decided
**Deciders:** Implementation team

## Context

The v2 implementation plan requires determining the canonical Playbook content location that is compatible with the Skills CLI (`npx skills add`). The existing v1 prototype has the Playbook at `/playbook/` with skills in `/playbook/skills/`.

## Decision Options

### Option A: Keep `/playbook/skills/` as canonical (Recommended)
- **Pros:**
  - Already tested and working with Skills CLI
  - No file moves needed
  - Existing v1 prototype validates this layout
- **Cons:**
  - Not a root-level `skills/` directory (some CLI tools expect this)

### Option B: Move to root-level `/skills/`
- **Pros:**
  - Matches some CLI tool expectations
- **Cons:**
  - Requires moving files and updating all references
  - No proven benefit over Option A

## Decision

**Choose Option A:** Keep `/playbook/skills/` as the canonical Playbook content root.

**Rationale:** The Skills CLI proof (Phase 0) confirmed that `npx skills add` supports nested `playbook/skills/` structure. The existing v1 prototype already works with this layout. Moving files adds risk without benefit.

## Consequences

- Playbook package remains at `/playbook/`
- Skills CLI installation works without modification
- Adapter generation reads from `/playbook/`
- No migration needed

## Related

- Phase 0 Skills CLI proof
- `playbook/package.json` files array
- `opencode/vstack/src/skills/skill-loader.ts` `findAgentsSkillsRoot` function