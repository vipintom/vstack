# ADR-0005: OpenCode API Version and Capability Baseline

**Date:** 2026-11-01
**Status:** Decided
**Deciders:** Implementation team

## Context

The v2 implementation must pin the verified OpenCode API version and document actual session/skill/permission APIs available. The v1 prototype uses `@opencode/plugin@2.2.0` and `@opencode/schema@2.2.0`.

## Decision

**Pin `@opencode/plugin@2.2.0` and `@opencode/schema@2.2.0` as the verified baseline.**

**Verified Capabilities:**
- `ctx.skill.transform` — registers Playbook skills ✅
- `ctx.tool.transform` — registers ~7 cohesive tools ✅
- `ctx.command.transform` — registers slash commands ✅
- `ctx.session.hook("context")` — session context injection ✅
- `ctx.tool.hook("execute.after")` — projection publishing ✅
- `ctx.permission.hook("evaluate")` — approval enforcement (stub) ✅
- `ctx.agent.reload()` — reload agents after install ✅
- `ctx.agent.transform` — does NOT expose `editor.add()` → agent provisioning uses filesystem ✅
- Session creation, dispatch, status, completion detection ✅
- Fresh-session reviewer dispatch ✅
- Read-only permission support — not fully enforced (bypass via shell) ⚠️
- Event hooks for activity recording ✅
- Worktree APIs — available via `repository-root.ts` ✅

**Unsupported/Unverified:**
- Model selection via API
- Native read-only reviewer enforcement
- Screenshot/visual comparison APIs
- Distributed session coordination

## Consequences

- All v2 implementation targets OpenCode 2.2.0 APIs
- Approval enforcement remains stubbed (no hard enforcement without permission API)
- Agent provisioning uses filesystem, not `ctx.agent.transform.editor.add()`
- Read-only reviewer is procedural, not hard-enforced
- Version pin prevents breaking changes

## Related

- `opencode/vstack/package.json` dependencies
- `opencode/vstack/src/index.ts` plugin bootstrap
- `opencode/vstack/src/agents/agent-installer.ts` filesystem provisioning
- Phase 0 OpenCode API proof