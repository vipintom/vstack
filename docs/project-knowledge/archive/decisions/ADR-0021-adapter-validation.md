# ADR-0021: Adapter Validation in Actual Harnesses

**Date:** 2026-11-02
**Status:** Accepted

## Context

The PRD requires three harness adapters (OpenCode, Codex, Claude Code). The audit reports that only OpenCode adapters are runtime-used; Codex and Claude Code adapter files exist but are not installed or functionally verified.

## Decision

**All adapter files must be validated in their actual harnesses during re-authoring. A file's existence does not prove functional integration.**

### Adapter Requirements (PRD Section 17.4, 11.4)

Adapters are thin host-specific mappings that:
- Preserve canonical procedure semantics
- Are thin and deterministic
- Avoid duplicating full skill/playbook instructions
- Are versioned against supported host versions
- Are tested for clean installation, selective installation, updates, idempotency
- Preserve user-owned/customized files
- Report unsupported features rather than simulate success

### Validation Gates

**Source/Static Checks (Phase 1):**
- Adapter references current canonical role/playbook/skill semantics
- Does not fork methodology
- Documents unsupported APIs/capabilities honestly
- Thin mapping format (not full skill copy)

**Installation/Integration Tests (Phase 6):**
- Clean installation in target harness
- Selective installation of individual skills/subsets
- Update and uninstall without removing user files
- Capability fallback behaviour verified
- Role provisioning works with harness native agent format
- Skill discovery and invocation works
- Task checklist/todo support verified
- Subagent dispatch and concurrency tested (where harness supports)
- Read-only reviewer enforcement tested (where harness supports)
- Workspace isolation (worktrees) tested (where harness supports)
- Command execution and artifact access verified
- Persistent session state and handoff tested
- Hooks/approval/permission mechanisms tested
- PR/Git provider integration tested

### Capability Matrix

For each harness, document and test availability/limitations for:
- Skill discovery and invocation
- Role/agent definitions
- Task checklist/todo support
- Subagent dispatch and concurrency
- Read-only reviewer enforcement
- Model selection/diversity
- Worktree or workspace isolation
- Command execution and artifact access
- Persistent session state and handoff
- Hooks/approval/permission mechanisms
- PR/Git provider integration

### Honest Fallbacks

- Missing capabilities documented, not simulated
- Sequential fallback for subagent dispatch when unavailable
- Portable procedure must work without host-specific features
- Adapter files clearly mark host-specific examples with portable fallback

## Rationale

1. PRD Section 17.1: Three supported targets (OpenCode, Codex, Claude Code)
2. PRD Section 17.3: Capability matrix must be explicit and tested
3. PRD Section 17.4: Adapters must be tested for installation, updates, fallbacks
4. PRD Section 22.5: "OpenCode, Codex and Claude Code adapters are tested against explicit versions"
5. Implementation Plan Section 3.2: "Codex and Claude Code adapters not implemented (marked unsupported in manifest)" — must be resolved
6. Implementation Plan Section 19.3: "Validate standalone Playbook installation and operation without the OpenCode plugin"

## Consequences

- Phase 1: Re-author adapters as thin mappings with honest capability documentation
- Phase 6: Live validation in Codex and Claude Code (new requirement)
- OpenCode adapters already have runtime integration; Codex/Claude Code need new integration work
- Capability matrix published in release documentation
- Unsupported features clearly marked, not simulated

## References

- PRD Section 11.4: Harness adapters
- PRD Section 17: Cross-harness portability and adapters
- PRD Section 22.5: Portability acceptance criteria
- Implementation Plan Section 11.6: Re-author canonical roles and adapters
- Implementation Plan Section 19.3: Phase 6 portability validation
- Audit finding: Codex/Claude Code adapters present but untested