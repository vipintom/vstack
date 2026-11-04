# Canonical Roles

vstack defines 3 canonical roles. Each role is a Markdown file with Agent Skills frontmatter, making them portable across harnesses.

## Role Definitions

### Lead (`vstack-lead`)

**Focus:** Planning, architecture, coordination, decision-making

**Responsibilities:**
- Owns delivery objective, scope, and acceptance criteria
- Workflow/skill selection for the delivery
- Task decomposition and dependency management
- Agent delegation and coordination
- Integration of completed work
- Communication of status, blockers, and completion
- Context preservation across interruptions
- Verification completeness and review disposition
- Final handback report
- Decision trail entries (for long-running work via `vstack-ledger`)
- Checkpoint updates (via `vstack-context-reset`)

**Core Skills:**
- `vstack-mode` (always first)
- `vstack-sharpen` (underspecified requests)
- `vstack-plan-loop` (planning)
- `vstack-blast-radius` (risk assessment)
- `vstack-blueprint` (after `vstack-architect`)
- `vstack-review-loop` (request review)
- `vstack-jury` (high-risk)
- `vstack-context-reset` (checkpoints)
- `vstack-safe-pause` (session end)
- `vstack-ledger` (decision trail)
- `vstack-lessons` (learning)

**Adapters:**
- OpenCode: `playbook/agents/adapters/opencode/vstack-lead.md` (live validated)
- Codex: `playbook/agents/adapters/codex/vstack-lead.md` (TOML, sandbox_mode=workspace-write)
- Claude Code: `playbook/agents/adapters/claude-code/vstack-lead.md` (YAML, tools include Agent)

---

### Builder (`vstack-builder`)

**Focus:** Implementation, testing, evidence generation

**Responsibilities:**
- Task execution within accepted scope
- Code changes and implementation decisions
- Test creation and execution
- Debugging and failure diagnosis
- Evidence generation for completed work
- Implementation reporting with evidence pointers
- Checkpoint updates (via `vstack-context-reset`)
- Decision trail entries (for long-running tasks via `vstack-ledger`)

**Core Skills:**
- `vstack-tdd` (test-first implementation)
- `vstack-incremental-build` (small verified steps)
- `vstack-verify-loop` (execute checks, record evidence)
- `vstack-debug` (diagnose failures)
- `vstack-unstick` (3+ failed attempts)
- `vstack-recovery` (restore safe state)
- `vstack-how` / `vstack-why` / `vstack-blast-radius` (understanding)
- `vstack-unslop` (cleanup)
- `vstack-plan-loop` (if delegated)

**Adapters:**
- OpenCode: `playbook/agents/adapters/opencode/vstack-builder.md` (live validated)
- Codex: `playbook/agents/adapters/codex/vstack-builder.md` (TOML, sandbox_mode=workspace-write)
- Claude Code: `playbook/agents/adapters/claude-code/vstack-builder.md` (YAML, tools include Write, Edit)

---

### Reviewer (`vstack-reviewer`)

**Focus:** Code review, security audit, quality validation

**Responsibilities:**
- Independent assessment of work against requirements
- Finding classification (severity, category, reproducibility)
- Recommendation for remediation
- Re-review after fixes when warranted
- Independence level documented: confirmed/declared/not_independent/unknown

**Core Skills:**
- `vstack-review-loop` (primary procedure)
- `vstack-review-rubrics` (applies requested lenses)
- `vstack-jury` (coordinates multiple reviewers)
- `vstack-interrogate` (adversarial stance)
- `vstack-principles` (evaluation criteria)

**Adapters:**
- OpenCode: `playbook/agents/adapters/opencode/vstack-reviewer.md` (live validated)
- Codex: `playbook/agents/adapters/codex/vstack-reviewer.md` (TOML, sandbox_mode=read-only)
- Claude Code: `playbook/agents/adapters/claude-code/vstack-reviewer.md` (YAML, disallowedTools: Write, Edit, TodoWrite)

---

## Role Interaction

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│    Lead     │────▶│   Builder   │────▶│  Reviewer   │
│  (Plans)    │     │ (Executes)  │     │ (Validates) │
└─────────────┘     └─────────────┘     └─────────────┘
       │                   │                   │
       ▼                   ▼                   ▼
  Creates tasks        Runs checks        Records findings
  Sets acceptance      Produces evidence  Approves/blocks
  Coordinates          Hands off          Closes delivery
```

**Authority Matrix:**

| Action | Lead | Builder | Reviewer |
|---|---|---|---|
| Playbook selection | ✅ Unilateral | ❌ | ❌ |
| Task decomposition | ✅ Unilateral | ❌ | ❌ |
| Worker delegation | ✅ Unilateral | ❌ (sub-agents) | ❌ |
| Implementation approach | ❌ | ✅ Unilateral | ❌ |
| Scope expansion | ✅ Requires user approval | ❌ Requires Lead | ❌ |
| Review findings | ❌ | ❌ | ✅ Unilateral |
| Review disposition | ✅ Unilateral | ❌ | ❌ |
| Approving completion | ❌ | ❌ | ❌ (reports to Lead) |

---

## Cross-Harness Adapters (9 Total)

| Role | OpenCode | Codex CLI | Claude Code |
|---|---|---|---|
| **Lead** | ✅ Live validated | ✅ TOML valid | ✅ YAML valid |
| **Builder** | ✅ Live validated | ✅ TOML valid | ✅ YAML valid |
| **Reviewer** | ✅ Live validated | ✅ `read-only` sandbox | ✅ `disallowedTools` |

Each adapter is a **thin mapping** — it documents how the canonical role maps to harness capabilities, with honest fallbacks. No methodology is forked into the adapter.

## Customization

Roles are harness-independent Markdown. To customize:

1. Copy `playbook/agents/roles/<role>.md` to your project
2. Modify responsibilities, skills, or prompts
3. Install via Skills CLI or copy to harness skills directory

The adapters in `playbook/agents/adapters/<harness>/` map the role to harness-specific agent formats. Replace them for other harnesses.

See [docs/capability-matrix.md](https://github.com/vstack/playbook/blob/main/docs/capability-matrix.md) for detailed role adapter capabilities per harness.