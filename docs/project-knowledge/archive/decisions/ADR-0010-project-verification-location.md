# ADR-0010: Project Verification Skill Location

**Date:** 2026-11-01
**Status:** Decided
**Deciders:** Implementation team

## Context

The v2 PRD requires project-specific verification skills that teach agents how to verify the real application. These must live in the project itself (not in the Playbook) at the active harness's standard project skill path.

## Decision

**Project verification skills live in the project's harness-specific skill directory:**
- OpenCode: `.opencode/skills/<project>-verification/`
- Codex: `.codex/skills/<project>-verification/`
- Claude Code: `.claude/skills/<project>-verification/`

**Canonical template** stored in Playbook at `/playbook/project-templates/verification-skill/`

**Plugin indexes** the skill at `.vstack/verification/index.json` with:
- `path`: absolute path to skill directory
- `harness`: `opencode` | `codex` | `claude-code`
- `contentHash`: SHA256 of skill content
- `version`: skill version
- `lastValidated`: timestamp
- `status`: `current` | `stale` | `missing`

**Rationale:** 
- Project-specific skills belong to the project, not the Playbook
- Each harness has its own skill discovery mechanism
- Template ensures consistency while allowing project customization
- Plugin index enables freshness detection without duplicating content

## Consequences

- `vstack-create-verification` skill generates skill in harness-specific location
- `vstack-maintain-verification` compares template hash with actual skill hash
- Plugin only indexes, never duplicates skill content
- Cross-harness projects may have multiple verification skills (one per harness)

## Related

- `playbook/project-templates/verification-skill/` — canonical template
- `opencode/vstack/src/skills/skill-loader.ts` — loads project verification skills
- Phase 3 Project verification skill creation/maintenance
- Phase 4 Project verification indexing