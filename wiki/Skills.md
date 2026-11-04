# Skills Reference

vstack includes 55 skills. Each is a standalone Markdown file with Agent Skills frontmatter, making them portable across harnesses.

## Skill Index

| Skill | Category | Purpose |
|---|---|---|
| `vstack-skill-authoring` | Foundation | Skill creation guidelines |
| `vstack-skill-evaluation` | Foundation | Skill evaluation methodology |
| `vstack-how` | Discovery | Code walkthroughs |
| `vstack-why` | Discovery | Design rationale |
| `vstack-blast-radius` | Discovery | Impact analysis for changes |
| `vstack-explain` | Discovery | Code explanation |
| `vstack-recall` | Discovery | Context retrieval |
| `docker-compose` | Utils | Docker & Docker Compose patterns with dotenvx secrets |
| `makefile` | Utils | Modern Makefile automation patterns |
| `gitignore` | Utils | Comprehensive .gitignore templates & patterns |
| `vstack-architect` | Architecture | System architecture decisions and tradeoffs |
| `vstack-blueprint` | Architecture | Detailed technical specifications |
| `vstack-arena` | Architecture | Design comparison and selection |
| `vstack-design-audit` | Architecture | Design review methodology |
| `vstack-prototype` | Architecture | Prototyping and validation |
| `vstack-plan-loop` | Planning | Work planning and estimation |
| `vstack-plan-review` | Planning | Fresh-context plan validation |
| `vstack-incremental-build` | Planning | Incremental delivery patterns |
| `vstack-refactor` | Planning | Safe refactoring methodology |
| `vstack-unslop` | Planning | AI tell removal from writing |
| `vstack-create-verification` | Verification | Project verification skill creation |
| `vstack-maintain-verification` | Verification | Verification skill maintenance |
| `vstack-verification-audit` | Verification | Verification quality audit |
| `vstack-debug` | Debug/Recovery | Systematic debugging methodology |
| `vstack-recovery` | Debug/Recovery | Failure recovery and unsticking |
| `vstack-unstick` | Debug/Recovery | Getting unstuck techniques |
| `vstack-swarm` | Collaboration | Parallel execution coordination |
| `vstack-best-of-n` | Collaboration | Best-of-N evaluation |
| `vstack-worktree` | Collaboration | Worktree management |
| `vstack-handoff` | Collaboration | Context handoff between sessions |
| `vstack-interrogate` | Review | Deep code review methodology |
| `vstack-jury` | Review | Jury evaluation procedure |
| `vstack-review-rubrics` | Review | Review criteria and rubrics |
| `vstack-ledger` | Continuity | Decision/lesson tracking |
| `vstack-safe-pause` | Continuity | Safe work interruption |
| `vstack-session-pickup` | Continuity | Session resumption with validation |
| `vstack-pr` | Delivery | PR preparation |
| `vstack-watch-pr` | Delivery | PR monitoring |
| `vstack-ready` | Delivery | Readiness check |
| `vstack-ship` | Delivery | Release execution |
| `vstack-performance` | Extended | Performance optimization |
| `vstack-runtime-forensics` | Extended | Runtime forensics |
| `vstack-trace-forensics` | Extended | Trace forensics |
| `vstack-visual-parity` | Extended | Visual regression testing |
| `vstack-tdd` | Implementation | Test-driven development |
| `vstack-verify-loop` | Verification | Verification and validation loops |
| `vstack-mode` | Foundation | Mode routing (Quick/Standard/Advanced) |
| `vstack-sharpen` | Foundation | Skill improvement |
| `vstack-help` | Foundation | Help system |
| `vstack-principles` | Foundation | Principles reference |
| `vstack-lessons` | Continuity | Pattern-to-improvement |
| `vstack-context-reset` | Continuity | Context reset |
| `vstack-figure-it-out` | Foundation | Bespoke playbook design |

**Retired (v1 legacy):** `vstack-debugging`, `vstack-discovery` — superseded by dedicated skills

**Added (v2 utils):** `docker-compose`, `makefile`, `gitignore` — utility skills for common DevOps tasks

## Skill Format

Each skill follows the Agent Skills specification:

```markdown
---
name: vstack-skill-name
description: One-line description
lifecycle: draft|experimental|stable|deprecated
---

# Skill Name

## When to Use (Positive Triggers)
<Trigger conditions>

## When Not to Use (Negative Triggers)
<Explicit non-triggers>

## Required Context / Inputs
<What's needed before starting>

## Preconditions
<Must be true before invoking>

## Procedure
<Step-by-step with Action/Evidence/Decision>

## Expected Outputs
<Artifacts produced>

## Verification
<Evidence recording: VERIFIED/NOT_VERIFIED/INCONCLUSIVE/BLOCKED>

## Stop Conditions
<Completion/Blocked/Inconclusive/Safe-pause>

## Failure Handling
<Table of failure modes and responses>

## Escalation
<When to escalate and to whom>

## Skill / Role / Tool Routing
<What skills, roles, tools this invokes>

## Examples
<Concrete positive/negative examples>

## Dependencies / References
<Related skills, principles, playbooks>

## Migration Record
<Previous version, disposition, research record>
```

## Installation

### Skills CLI (All Skills at Once) — Recommended

```bash
# From npm (after publish)
npx skills add @vipintom/vstack --skill '*' --agent opencode

# From GitHub (no npm needed)
npx skills add github:vipintom/vstack-playbook --skill '*' --agent opencode

# For Codex
npx skills add @vipintom/vstack --skill '*' --agent codex

# For Claude Code
npx skills add @vipintom/vstack --skill '*' --agent claude-code

# Install specific skill
npx skills add @vipintom/vstack --skill vstack-tdd --agent opencode
```

### Individual Skills

```bash
# From npm
npx skills add @vipintom/vstack --skill vstack-tdd --agent opencode

# From GitHub
npx skills add github:vipintom/vstack-playbook --skill vstack-tdd --agent opencode
```

### Manual (Legacy)

```bash
# Copy to harness skills directory
cp vstack-playbook/skills/vstack-tdd.md ~/.config/opencode/skills/vstack-tdd.md
```

### Cross-Harness Install Script

```bash
# Install for Codex/Claude Code
node vstack-playbook/scripts/install-playbook.js codex /path/to/project
node vstack-playbook/scripts/install-playbook.js claude-code /path/to/project
```

## Using Skills in OpenCode

After installation, skills are available as `@vstack-*` agents:

```bash
# In OpenCode
@skill vstack-tdd "Write tests for the authentication module"
@skill vstack-blast-radius "Analyze impact of changing User model"
@skill vstack-debug "Investigate the login timeout issue"
@skill vstack-verify-loop "Run verification for delivery dlv_xxx"
@skill vstack-create-verification "Create project verification skill"
```

## Skill Dependencies

Some skills reference others:

| Skill | References |
|---|---|
| `vstack-blueprint` | `vstack-architect`, `vstack-blast-radius` |
| `vstack-verify-loop` | `vstack-tdd`, `vstack-debug`, `vstack-unstick` |
| `vstack-review-loop` | `vstack-blast-radius`, `vstack-review-rubrics`, `vstack-interrogate` |
| `vstack-create-verification` | `vstack-verify-loop`, `vstack-maintain-verification` |
| `vstack-session-pickup` | `vstack-safe-pause`, `vstack-ledger` |
| `vstack-figure-it-out` | All skills (composes bespoke playbooks) |

## Creating Custom Skills

1. Create `<name>.md` in `playbook/skills/`
2. Add Agent Skills frontmatter with `lifecycle`
3. Follow the v2 template format
4. Run validation: `node playbook/scripts/validate-content.js`
5. Run `npx skills add ./playbook` to reinstall

## Harness Compatibility

Skills work with any harness supporting the Agent Skills spec:

- OpenCode ✅ (native plugin loader, live validated)
- Codex CLI ✅ (TOML agent definitions with sandbox modes)
- Claude Code ✅ (YAML frontmatter with disallowedTools)
- Custom harnesses ✅ (implement the spec)

See [docs/capability-matrix.md](https://github.com/vstack/playbook/blob/main/docs/capability-matrix.md) for detailed per-skill harness support.

## Validation

```bash
# Validate all playbook content
node playbook/scripts/validate-content.js
# Output: 0 errors, 0 warnings
```

## Evaluation

All 55 skills have behavioral evaluation scenarios (300+ Tier 1/2 scenarios):

```bash
# Evaluation scenarios located at
playbook/evaluations/scenarios/skills/<skill-name>-eval.md
```

## Lifecycle

| Lifecycle | Meaning |
|---|---|
| `draft` | Initial version, not validated |
| `experimental` | Structure validated, needs behavioral testing |
| `stable` | Behavioral evaluation passed, production ready |
| `deprecated` | Superseded, do not use for new work |

Current: 55 skills at various stages, all structure-validated.