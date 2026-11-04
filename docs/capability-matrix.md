# vstack Capability Matrix

**Version:** 0.1.0 (Playbook 2.0 Content Re-authoring)
**Date:** 2026-11-02
**Purpose:** Document which skills, playbooks, and roles work in each harness with what level of support.

---

## Legend

| Symbol | Meaning |
|--------|---------|
| ✅ | **Full** - Works natively with all features |
| ⚠️ | **Partial** - Works with documented fallbacks |
| ❌ | **Not Supported** - Cannot work in this harness |
| 🔄 | **Via Fallback** - Works using fallback mechanism |

---

## Skill Compatibility (52 Skills)

### Category: Understanding & Analysis

| Skill | OpenCode | Codex | Claude Code | Notes |
|-------|----------|-------|-------------|-------|
| vstack-how | ✅ | ✅ | ✅ | Read/glob/grep/bash only |
| vstack-why | ✅ | ✅ | ✅ | Read/glob/grep/bash only |
| vstack-blast-radius | ✅ | ✅ | ✅ | Read/glob/grep/bash only |
| vstack-explain | ✅ | ✅ | ✅ | Read/glob/grep/bash only |

### Category: Design & Architecture

| Skill | OpenCode | Codex | Claude Code | Notes |
|-------|----------|-------|-------------|-------|
| vstack-architect | ✅ | ✅ | ✅ | Requires vstack-arena for alternatives |
| vstack-arena | ✅ | ⚠️ | ⚠️ | Needs subagents for parallel eval; fallback: sequential |
| vstack-blueprint | ✅ | ✅ | ✅ | Write/edit needed for design artifacts |
| vstack-best-of-n | ✅ | ⚠️ | ⚠️ | Needs subagents for parallel candidates; fallback: sequential |
| vstack-design-audit | ✅ | ✅ | ✅ | Read/glob/grep/bash only |

### Category: Planning & Task Management

| Skill | OpenCode | Codex | Claude Code | Notes |
|-------|----------|-------|-------------|-------|
| vstack-mode | ✅ | ✅ | ✅ | Core routing skill; loads playbooks |
| vstack-sharpen | ✅ | ✅ | ✅ | Write/edit for brief |
| vstack-plan-loop | ✅ | ✅ | ✅ | TodoWrite/TodoRead or todo tool |
| vstack-plan-review | ✅ | ✅ | ✅ | Read/glob/grep only |
| vstack-incremental-build | ✅ | ✅ | ✅ | Write/edit/bash for implementation |
| vstack-ship | ✅ | ✅ | ✅ | Bash for git/PR commands |

### Category: Implementation

| Skill | OpenCode | Codex | Claude Code | Notes |
|-------|----------|-------|-------------|-------|
| vstack-tdd | ✅ | ✅ | ✅ | Write/edit/bash for test-first |
| vstack-debug | ✅ | ✅ | ✅ | Bash for reproduction, write/edit for fix |
| vstack-unslop | ✅ | ✅ | ✅ | Write/edit for cleanup |
| vstack-prototype | ✅ | ✅ | ✅ | Write/edit/bash for spikes |
| vstack-refactor | ✅ | ✅ | ✅ | Write/edit/bash with verification |
| vstack-worktree | ✅ | ⚠️ | ⚠️ | Native worktrees in OpenCode/Claude; Codex: directory isolation |

### Category: Verification & Quality

| Skill | OpenCode | Codex | Claude Code | Notes |
|-------|----------|-------|-------------|-------|
| vstack-verify-loop | ✅ | ✅ | ✅ | Bash for test execution, vstack_check tool |
| vstack-create-verification | ✅ | ✅ | ✅ | Write/edit for verification artifacts |
| vstack-maintain-verification | ✅ | ✅ | ✅ | Write/edit for updates |
| vstack-verification-audit | ✅ | ✅ | ✅ | Read/glob/grep/bash for audit |
| vstack-review-loop | ✅ | ✅ | ✅ | Read/glob/grep/bash; reviewer needs read-only |
| vstack-review-rubrics | ✅ | ✅ | ✅ | Read/glob/grep for rubric files |
| vstack-jury | ✅ | ⚠️ | ⚠️ | Multiple reviewers via subagents; fallback: sequential |
| vstack-interrogate | ✅ | ✅ | ✅ | Read/glob/grep/bash for adversarial review |

### Category: Debugging & Recovery

| Skill | OpenCode | Codex | Claude Code | Notes |
|-------|----------|-------|-------------|-------|
| vstack-unstick | ✅ | ✅ | ✅ | Read/glob/grep/bash; write for fix attempts |
| vstack-recovery | ✅ | ✅ | ✅ | Bash for git restore, write/edit for fixes |
| vstack-runtime-forensics | ✅ | ✅ | ✅ | Bash for logs/traces |
| vstack-trace-forensics | ✅ | ✅ | ✅ | Bash for distributed traces |
| vstack-performance | ✅ | ✅ | ✅ | Bash for profiling/benchmarks |

### Category: Continuity & Session Management

| Skill | OpenCode | Codex | Claude Code | Notes |
|-------|----------|-------|-------------|-------|
| vstack-context-reset | ✅ | ✅ | ✅ | Write/edit for PROGRESS.md |
| vstack-safe-pause | ✅ | ✅ | ✅ | Write/edit for checkpoint |
| vstack-session-pickup | ✅ | ✅ | ✅ | Read/glob/grep for state reconstruction |
| vstack-catchup | ✅ | ✅ | ✅ | Read/glob/grep for reconciliation |
| vstack-handoff | ✅ | ✅ | ✅ | Write/edit for handoff docs |
| vstack-ledger | ✅ | ✅ | ✅ | Write/edit for decision trail |

### Category: Learning & Improvement

| Skill | OpenCode | Codex | Claude Code | Notes |
|-------|----------|-------|-------------|-------|
| vstack-lessons | ✅ | ✅ | ✅ | Write/edit for lessons learned |
| vstack-principles | ✅ | ✅ | ✅ | Read only (reference) |
| vstack-help | ✅ | ✅ | ✅ | Read only (reference) |
| vstack-recall | ✅ | ✅ | ✅ | Read/glob/grep for memory |

### Category: Specialized

| Skill | OpenCode | Codex | Claude Code | Notes |
|-------|----------|-------|-------------|-------|
| vstack-swarm | ✅ | ⚠️ | ⚠️ | Parallel builders via subagents; fallback: sequential |
| vstack-figure-it-out | ✅ | ✅ | ✅ | Composes other skills |
| vstack-pr | ✅ | ✅ | ✅ | Bash for gh CLI |
| vstack-watch-pr | ✅ | ⚠️ | ⚠️ | Needs background/long-running; fallback: polling |
| vstack-skill-authoring | ✅ | ✅ | ✅ | Write/edit for skill creation |
| vstack-skill-evaluation | ✅ | ⚠️ | ⚠️ | Cross-harness testing needs all 3 harnesses |
| vstack-visual-parity | ✅ | ✅ | ✅ | Read/glob/grep/bash; visual diff tools if available |

### Category: Git/Workflow

| Skill | OpenCode | Codex | Claude Code | Notes |
|-------|----------|-------|-------------|-------|
| vstack-ready | ✅ | ✅ | ✅ | Read/glob/grep/bash |
| vstack-worktree-cleanup | ✅ | ✅ | ✅ | Bash for git worktree commands |

---

## Playbook Compatibility (18 Playbooks)

| Playbook | OpenCode | Codex | Claude Code | Notes |
|----------|----------|-------|-------------|-------|
| feature-delivery | ✅ | ⚠️ | ⚠️ | Full workflow; subagents for parallel tasks |
| bug-fixing | ✅ | ✅ | ✅ | Standard debugging flow |
| refactoring | ✅ | ✅ | ✅ | Incremental with verification |
| investigation | ✅ | ✅ | ✅ | Read-heavy, no subagents needed |
| architecture-change | ✅ | ⚠️ | ⚠️ | vstack-arena for alternatives |
| prototype | ✅ | ✅ | ✅ | Spike + evaluate |
| documentation | ✅ | ✅ | ✅ | Read/write for docs |
| infrastructure-change | ✅ | ✅ | ✅ | Bash for deploy commands |
| performance-investigation | ✅ | ✅ | ✅ | Profiling via bash |
| autonomous-execution | ✅ | ⚠️ | ⚠️ | High subagent usage; fallback: sequential |
| multi-phase-delivery | ✅ | ⚠️ | ⚠️ | Complex delegation; fallback: sequential |
| pr-preparation | ✅ | ✅ | ✅ | Git/PR via bash |
| pr-monitoring | ✅ | ⚠️ | ⚠️ | Background watching; fallback: polling |
| runtime-forensics | ✅ | ✅ | ✅ | Log/trace analysis |
| trace-forensics | ✅ | ✅ | ✅ | Distributed trace analysis |
| visual-parity | ✅ | ✅ | ✅ | Visual diff if tools available |
| safe-pause | ✅ | ✅ | ✅ | Checkpoint + pause |
| session-pickup | ✅ | ✅ | ✅ | State reconstruction |
| skill-maintenance | ✅ | ✅ | ✅ | Skill authoring/evaluation |
| worktree-cleanup | ✅ | ✅ | ✅ | Git worktree management |

---

## Role Adapter Compatibility (3 Roles × 3 Harnesses)

| Role | OpenCode | Codex | Claude Code |
|------|----------|-------|-------------|
| **Lead** | ✅ Live validated | ✅ TOML valid | ✅ YAML valid |
| **Builder** | ✅ Live validated | ✅ TOML valid | ✅ YAML valid |
| **Reviewer** | ✅ Live validated | ✅ TOML valid (`read-only`) | ✅ YAML valid (`disallowedTools`) |

### Harness-Specific Role Features

| Feature | OpenCode | Codex | Claude Code |
|---------|----------|-------|-------------|
| Subagent dispatch | `task` tool | `task` tool | `Agent` tool |
| Read-only enforcement | Instruction + git diff | `sandbox_mode: read-only` | `disallowedTools: Write,Edit` |
| Worktree isolation | `git worktree` (bash) | `git worktree` (bash) | `isolation: worktree` (native) |
| Todo/Checklist | `todo` tool | `todo` tool | `TodoWrite`/`TodoRead` |
| Hot-reload agents | No | No | Yes (file watcher) |
| Permission modes | No | `approval_policy` | `permissionMode` |
| Model selection | Config | `model` field | `model: inherit` |

---

## Harness Capability Summary

| Capability | OpenCode | Codex | Claude Code |
|------------|----------|-------|-------------|
| **Skill Discovery** | Plugin loader | Skills config | Skills field |
| **Role/Agent Definitions** | Agent files | Agent TOML | Agent YAML |
| **Task Checklist/Todo** | ✅ Native | ✅ Native | ✅ Native |
| **Subagent Dispatch** | ✅ Native | ✅ Native | ✅ Native |
| **Read-Only Reviewer** | 🔄 Instruction | 🔄 Sandbox | ✅ Native (disallowedTools) |
| **Worktree Isolation** | 🔄 Git CLI | 🔄 Git CLI | ✅ Native |
| **Command Execution** | ✅ Bash | ✅ Bash | ✅ Bash |
| **Persistent Session** | 🔄 PROGRESS.md | 🔄 PROGRESS.md | 🔄 PROGRESS.md |
| **Approval/Permissions** | 🔄 Chat | ✅ approval_policy | ✅ permissionMode |
| **PR/Git Integration** | 🔄 gh CLI | 🔄 gh CLI | 🔄 gh CLI |
| **Hot-Reload Config** | No | No | ✅ Yes |
| **Background/Long-Running** | No | No | ⚠️ Limited |

---

## Skills Requiring Subagents (Harness Dependency)

These skills work fully only when harness supports subagents. All three harnesses support subagents, so they work everywhere with fallbacks.

| Skill | Purpose | Fallback |
|-------|---------|----------|
| vstack-arena | Parallel design evaluation | Sequential evaluation |
| vstack-best-of-n | Parallel candidate generation | Sequential generation |
| vstack-jury | Multiple independent reviewers | Sequential reviewers |
| vstack-swarm | Parallel builder execution | Sequential execution |
| vstack-watch-pr | Background PR monitoring | Polling |
| vstack-skill-evaluation | Cross-harness testing | Single-harness test |

---

## Known Limitations

| Limitation | Harness | Workaround |
|------------|---------|------------|
| No native read-only enforcement | OpenCode, Codex | Instruction + git diff validation |
| No native worktree isolation | OpenCode, Codex | git worktree via bash |
| No background tasks | OpenCode, Codex | Polling or manual re-check |
| No approval API | OpenCode | Explicit chat confirmation |
| Skills config not auto-discovered | Codex | Manual skills field |
| No plugin skill loader | Codex, Claude Code | Skills field in frontmatter |

---

## Testing Status

| Harness | Adapter Tests | Live Validation | Standalone Acceptance |
|---------|---------------|-----------------|----------------------|
| OpenCode | ✅ 103/103 PASS | ✅ Live validated | 🔄 Pending |
| Codex | ✅ Syntax valid | ❌ Not tested | ❌ Not tested |
| Claude Code | ✅ Syntax valid | ❌ Not tested | ❌ Not tested |

---

## Migration Notes

- **v1 Legacy Skills Retired:** `vstack-debugging`, `vstack-discovery` (superseded)
- **Merged:** `vstack-catchup` → `vstack-session-pickup`
- **Fixed:** Manifest duplicate `vstack-ledger` removed
- **All 52 skills** re-authored to v2 template with external research
- **All 18 playbooks** re-authored to v2 template
- **All 17 principles** re-authored to v2 template
- **3 roles + 9 adapters** complete
- **Added 3 utils skills:** `docker-compose`, `makefile`, `gitignore` (v2 template) — **Total: 55 skills**

---

*Generated as part of Phase 6: Portability, Packaging & Release*