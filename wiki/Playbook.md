# Playbook Overview

The vstack Playbook is a **harness-independent** collection of engineering practices. It contains no runtime code — only Markdown and YAML content that any AI harness can consume via the Agent Skills specification.

## Structure

```
playbook/
├── principles/           # 17 engineering principles
├── agents/
│   ├── roles/           # 3 canonical roles
│   └── adapters/
│       ├── opencode/    # OpenCode adapters (3 roles)
│       ├── codex/       # Codex CLI adapters (3 roles)
│       └── claude-code/ # Claude Code adapters (3 roles)
├── skills/              # 55 skills (Markdown + frontmatter)
├── workflows/           # 18 workflow recipes
├── resources/           # Rubrics, templates, references, project templates
├── scripts/             # Validation, install, packaging scripts
├── project-templates/   # Project-local skill templates
├── evaluations/         # Evaluation scenarios (300+ Tier 1/2)
├── manifest.json        # Canonical content manifest with contentHash (v2)
└── package.json         # @vipintom/vstack@0.1.0
```

## Installation

### Skills CLI (Recommended)

```bash
# From npm (after publish)
npx skills add @vipintom/vstack --agent opencode

# From GitHub (no npm needed)
npx skills add github:vipintom/vstack-playbook --agent opencode

# Install all 55 skills
npx skills add @vipintom/vstack --skill '*' --agent opencode

# For Codex
npx skills add @vipintom/vstack --agent codex

# For Claude Code
npx skills add @vipintom/vstack --agent claude-code
```

The Skills CLI recognizes the nested `playbook/skills/` structure automatically.

### Manual Installation

Copy to your harness's skills directory:

```bash
# OpenCode
cp -r vstack-playbook/ ~/.config/opencode/skills/vstack

# Claude Code
cp -r vstack-playbook/ ~/.config/claude-code/skills/vstack

# Codex
cp -r vstack-playbook/ ~/.config/codex/skills/vstack
```

### Validation

```bash
# Run validation script
node vstack-playbook/scripts/validate-content.js

# Output: 0 errors, 0 warnings
```

### Distribution Packaging

```bash
# Create distribution packages
cd vstack-playbook && npm run dist:package

# Output: vstack-playbook-v0.1.0.tar.gz (257KB), vstack-playbook-v0.1.0.zip (444KB) with SHA256
```

### Cross-Harness Installation Script

```bash
# Install for all harnesses
node vstack-playbook/scripts/install-playbook.js all /path/to/project

# Or per harness
node vstack-playbook/scripts/install-playbook.js opencode /path/to/project
node vstack-playbook/scripts/install-playbook.js codex /path/to/project
node vstack-playbook/scripts/install-playbook.js claude-code /path/to/project
```

## Components

### Principles (17)

| Principle | Description |
|---|---|
| Harness Independence First | Works without proprietary runtime |
| Procedures Over Vague Instructions | Concrete step-by-step required |
| Flexible Workflows, Not Mandatory Ceremony | Process fits task size and risk |
| Loops Are First-Class | Bounded feedback loops with escalation |
| Small, Purposeful Agent Team | Lead/Builder/Reviewer + skills |
| Evidence Before Completion | Executed check supports claim |
| Independent Challenge | Review with fresh context |
| Runtime Simplicity | Plugin adds only what instructions can't |
| Clear Source of Responsibility | Playbook=methodology, Plugin=runtime, OC=view |
| Degrade Gracefully | Works without advanced harness features |
| Understand Before Changing | Inspect before modify |
| Route Before Loading | Know what you're loading |
| Smallest Complete Change | Minimal verifiable increment |
| Challenge Assumptions | Test beliefs explicitly |
| Model Domain Explicitly | Types mirror domain |
| Respect Boundaries | Clear module ownership |
| Verifiable Increments | Every step has proof |

### Roles (3)

| Role | Focus | Core Skills |
|---|---|---|
| **Lead** | Planning, architecture, coordination | blueprint, blast-radius, lessons, mode |
| **Builder** | Implementation, testing, evidence | tdd, verify-loop, incremental-build, debug |
| **Reviewer** | Code review, security, quality | review-loop, interrogate, blast-radius, rubrics, jury |

### Skills (55)

| Skill | Category | Description |
|---|---|---|
| vstack-skill-authoring | Foundation | Skill creation guidelines |
| vstack-skill-evaluation | Foundation | Skill evaluation methodology |
| vstack-how | Discovery | Code walkthroughs |
| vstack-why | Discovery | Design rationale |
| vstack-blast-radius | Discovery | Impact analysis |
| vstack-explain | Discovery | Code explanation |
| vstack-recall | Discovery | Context retrieval |
| vstack-architect | Architecture | System design decisions |
| vstack-blueprint | Architecture | Technical specifications |
| vstack-arena | Architecture | Design comparison |
| vstack-design-audit | Architecture | Design review |
| vstack-prototype | Architecture | Prototyping |
| vstack-plan-loop | Planning | Draft/challenge/refine planning |
| vstack-plan-review | Planning | Fresh-context plan validation |
| vstack-incremental-build | Planning | Incremental delivery |
| vstack-refactor | Planning | Safe refactoring |
| vstack-unslop | Planning | AI tell removal |
| vstack-create-verification | Verification | Project verification skill creation |
| vstack-maintain-verification | Verification | Verification maintenance |
| vstack-verification-audit | Verification | Verification quality audit |
| vstack-debug | Debug/Recovery | Systematic debugging |
| vstack-recovery | Debug/Recovery | Failure recovery |
| vstack-unstick | Debug/Recovery | Getting unstuck |
| vstack-swarm | Collaboration | Parallel execution |
| vstack-best-of-n | Collaboration | Best-of-N evaluation |
| vstack-worktree | Collaboration | Worktree management |
| vstack-handoff | Collaboration | Context handoff |
| vstack-interrogate | Review | Deep code review |
| vstack-jury | Review | Jury evaluation |
| vstack-review-rubrics | Review | Review criteria |
| vstack-ledger | Continuity | Decision/lesson tracking |
| vstack-safe-pause | Continuity | Safe interruption |
| vstack-session-pickup | Continuity | Session resumption |
| vstack-pr | Delivery | PR preparation |
| vstack-watch-pr | Delivery | PR monitoring |
| vstack-ready | Delivery | Readiness check |
| vstack-ship | Delivery | Release execution |
| vstack-performance | Extended | Performance optimization |
| vstack-runtime-forensics | Extended | Runtime analysis |
| vstack-trace-forensics | Extended | Trace analysis |
| vstack-visual-parity | Extended | Visual regression |
| vstack-tdd | Implementation | Test-driven development |
| vstack-verify-loop | Verification | Verification loops |
| vstack-mode | Foundation | Mode routing |
| vstack-sharpen | Foundation | Request clarification |
| vstack-help | Foundation | Help system |
| vstack-principles | Foundation | Principles reference |
| vstack-lessons | Continuity | Pattern-to-improvement |
| vstack-context-reset | Continuity | Checkpoint preservation |
| vstack-figure-it-out | Foundation | Bespoke playbook design |
| docker-compose | Utils | Docker & Docker Compose patterns |
| makefile | Utils | Modern Makefile automation |
| gitignore | Utils | .gitignore templates & patterns |

### Workflows (18)

| Workflow | Category | Use Case |
|---|---|---|
| investigation | Core Must | Deep codebase investigation |
| architecture-change | Core Must | Architectural decisions |
| infrastructure-change | Core Must | Infrastructure modifications |
| documentation | Core Must | Documentation updates |
| skill-maintenance | Core Must | Skill updates/validation |
| feature-delivery | Should/Could | Full feature delivery |
| bug-fixing | Should/Could | Bug fix with evidence |
| refactoring | Should/Could | Safe refactoring |
| performance-investigation | Should/Could | Performance analysis |
| prototype | Should/Could | Prototyping |
| multi-phase-delivery | Should/Could | Multi-phase features |
| autonomous-execution | Should/Could | Autonomous delivery |
| pr-preparation | Should/Could | PR readiness |
| pr-monitoring | Should/Could | PR tracking |
| worktree-cleanup | Should/Could | Worktree management |
| runtime-forensics | Should/Could | Runtime investigation |
| trace-forensics | Should/Could | Trace analysis |
| visual-parity | Should/Could | Visual regression |

### Resources

- **Rubrics (7):** Architecture Design, Correctness/Regression, Security/Data, Performance/Resources, Maintainability/Style, Test Adequacy, Documentation/Migration
- **Templates (4):** Delivery Plan, Review Finding, Handoff, Task
- **References (1):** Quick Reference
- **Project Templates (1):** Verification Skill

## Harness Compatibility

The playbook uses the **Agent Skills specification** (Markdown with YAML frontmatter), supported by:

- OpenCode ✅ (live validated, 103/103 tests)
- Codex CLI ✅ (TOML adapters, sandbox modes)
- Claude Code ✅ (YAML frontmatter, disallowedTools)
- Any harness implementing the spec

No TypeScript, no runtime dependencies, no build step for the playbook itself.

## Manifest

Canonical content inventory at `playbook/manifest.json`:

- `schemaVersion`: 2, `playbookVersion`: "0.1.0", `contentHash` (SHA256)
- All 17 principles, 3 roles, **55 skills**, 18 workflows, resources
- 9 adapters (3 harnesses × 3 roles) with capability matrices
- Compatibility: opencode >=2.2.0, codex >=0.1.0, claude-code >=1.0.0
- Phase 6 status tracking

## Capability Matrix

See [docs/capability-matrix.md](https://github.com/vstack/playbook/blob/main/docs/capability-matrix.md) for detailed harness compatibility of all 55 skills, 18 workflows, and 3 roles across OpenCode, Codex, and Claude Code.