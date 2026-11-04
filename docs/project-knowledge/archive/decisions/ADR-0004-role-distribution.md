# ADR-0004: Role Distribution — Separate from Skill Installation

**Date:** 2026-11-01
**Status:** Decided
**Deciders:** Implementation team

## Context

Each harness (OpenCode, Codex, Claude Code) has its own native agent/role definition format. The v2 plan requires determining how to distribute the three canonical roles (Lead, Builder, Reviewer) separately from standard skill installation.

## Decision Options

### Option A: Separate installation mechanism per harness (Recommended)
- **Pros:**
  - Each harness manages roles natively
  - Skills CLI doesn't need to understand role formats
  - Clear separation of concerns
- **Cons:**
  - Multiple installation steps for users

### Option B: Bundle roles with skills via Skills CLI
- **Pros:**
  - Single install command
- **Cons:**
  - Skills CLI may not support role/agent definitions
  - Couples role distribution to skill distribution

### Option C: Embed role definitions in Playbook skills
- **Pros:**
  - Everything in one place
- **Cons:**
  - Violates separation: roles ≠ skills
  - Harness-specific agent definitions don't belong in canonical content

## Decision

**Choose Option A:** Role definitions are installed separately from skills, using each harness's native mechanism.

**Rationale:** The canonical Playbook contains role *responsibilities* (Markdown content). Harness-specific agent *definitions* (YAML/JSON with tool permissions, model config) are adapters. The Skills CLI installs skills; a separate install step or script handles role adapters. This matches the v1 prototype where OpenCode agents are provisioned via filesystem to `.opencode/agents/`.

## Consequences

- Playbook `agents/roles/` = canonical role content (Markdown)
- Playbook `agents/adapters/<harness>/` = harness-specific agent definitions
- Installation: 1) `npx skills add` for skills, 2) harness-specific command for roles
- Documentation must clearly separate these two steps

## Related

- `playbook/agents/roles/*.md` — canonical role content
- `playbook/agents/adapters/opencode/*.md` — OpenCode agent adapters
- `opencode/vstack/src/agents/agent-installer.ts` — provisions agents via filesystem
- Phase 1 Playbook Foundation