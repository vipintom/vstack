# vstack

**Engineering playbook and agent workflow ecosystem — now as 4 independent GitHub repositories.**

vstack codifies how effective software teams work — as portable Markdown/YAML content any AI harness can consume, plus a runtime plugin for OpenCode and a read-only dashboard for OpenChamber.

## Repository Architecture (v2.0.0)

This repository (`vstack`) is the **umbrella/meta repository** containing:
- Product identity and architecture
- Shared contracts (projection protocol v1 schemas)
- Compatibility matrix
- Integrated release metadata
- Project knowledge base

### Component Repositories (Independent)

| Repository | Role | Distribution | Location |
|------------|------|--------------|----------|
| `vstack` | Umbrella/meta repo | GitHub | `github.com/vipintom/vstack` |
| `vstack-playbook` | Portable skills & engineering playbook | npm `@vipintom/vstack` + Skills CLI | `github.com/vipintom/vstack-playbook` |
| `vstack-opencode` | OpenCode runtime plugin | npm `@vipintom/vstack-opencode` | `github.com/vipintom/vstack-opencode` |
| `vstack-openchamber` | OpenChamber visualization extension | Git URL or built ZIP | `github.com/vipintom/vstack-openchamber` |

**Key principle:** Components communicate through documented interfaces (versioned projection schemas in umbrella), not direct npm dependencies.

## Quick Start

### Playbook Only (Harness-Independent)

Works with any harness supporting the Agent Skills specification:

```bash
# Install via Skills CLI from npm (recommended, after publish)
npx skills add @vipintom/vstack --agent opencode

# Or from GitHub (no npm publish needed)
npx skills add github:vipintom/vstack-playbook --agent opencode

# Install all 55 skills
npx skills add @vipintom/vstack --skill '*' --agent opencode
```

### Cross-Harness Install Script

```bash
# Clone playbook repo
git clone https://github.com/vipintom/vstack-playbook.git

# Install for all harnesses
node vstack-playbook/scripts/install-playbook.js all /path/to/your/project

# Or per harness
node vstack-playbook/scripts/install-playbook.js opencode /path/to/project
node vstack-playbook/scripts/install-playbook.js codex /path/to/project
node vstack-playbook/scripts/install-playbook.js claude-code /path/to/project
```

### OpenCode Plugin

```bash
# In your project directory
cd your-project

# Production (from npm)
npm install @vipintom/vstack-opencode

# Or from GitHub (no npm publish needed)
# npm install github:vipintom/vstack-opencode

# Development (from local clone)
npm install /path/to/vstack-opencode
```

Then register in `opencode.jsonc`:

```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "plugins": ["@vipintom/vstack-opencode"]
}
```

Or via OpenCode CLI:
```bash
opencode plugin add @vipintom/vstack-opencode
# Or from GitHub
opencode plugin add github:vipintom/vstack-opencode
```

### OpenChamber Extension

```bash
# Via OpenChamber Extension Manager (recommended)
# Settings → Extensions → Install from URL → https://github.com/vipintom/vstack-openchamber.git

# Or via CLI (if available)
openchamber extension add https://github.com/vipintom/vstack-openchamber.git

# Or manually
git clone https://github.com/vipintom/vstack-openchamber.git
cd vstack-openchamber
pnpm install
pnpm build
# In OpenChamber Settings → Extensions → Load Unpacked → select panel/ directory
```

## Documentation

### Umbrella Repository (this repo)

| Topic | Link |
|---|---|
| **Product Requirements** | [docs/vstack-revised-structure-prd.md](docs/vstack-revised-structure-prd.md) |
| **Implementation Plan** | [docs/vstack-structure-implementation-plan.md](docs/vstack-structure-implementation-plan.md) |
| **Projection Protocol v1** | [docs/projection-protocol.md](docs/projection-protocol.md) |
| **Capability Matrix** | [docs/capability-matrix.md](docs/capability-matrix.md) |
| **Project Knowledge Base** | [docs/project-knowledge/](docs/project-knowledge/) |
| **Architecture Decision Records** | [docs/project-knowledge/architecture/](docs/project-knowledge/architecture/) |

### Component Repositories

| Repository | Documentation |
|---|---|
| `vstack-playbook` | [wiki/Playbook.md](https://github.com/vipintom/vstack-playbook/wiki/Playbook.md) |
| `vstack-opencode` | [wiki/OpenCode-Plugin.md](https://github.com/vipintom/vstack-opencode/wiki/OpenCode-Plugin.md) |
| `vstack-openchamber` | [README.md](https://github.com/vipintom/vstack-openchamber/blob/main/README.md) |

## Key Features

### 🎯 Playbook (Portable, Zero Dependencies)
- **17 Principles** — Decision rules with triggers, behaviors, examples
- **3 Roles** — Lead (planning), Builder (execution), Reviewer (validation)
- **55 Skills** — Standalone Markdown with lifecycle, triggers, procedures, verification
- **18 Workflows** — Human-readable recipes (Quick/Standard/Advanced/Extended modes)
- **9 Adapters** — OpenCode, Codex CLI, Claude Code for all 3 roles
- **Capability Matrix** — Per-skill/workflow/role harness compatibility
- **Distribution** — npm package, tarball, zip with SHA256, Skills CLI compatible

### ⚡ OpenCode Plugin (Runtime)
- **Persistent Memory** — Project knowledge surviving sessions
- **Delivery/Task Tracking** — Lightweight CRUD with contracts, dependencies
- **Agent Coordination** — Dispatch builders/reviewers with handoff recording
- **Evidence-Based Checks** — Executed tests/builds/lint with provenance
- **6 Completion Gates** — Enforced before task/delivery completion
- **23 Tools** — Status, memory, history, delivery, task, agent, check, assignment, decision, checkpoint, lesson, recovery, verification, sessionPickup, verificationSkill, skillValidate, verificationMaintain, evaluation, lessonPromotion, review
- **Projection Producer** — Generates OpenChamber-compatible v1 projections

### 📊 OpenChamber (Read-Only Visualization)
- **Projection-Driven** — Reads only published reports, never authoritative data
- **Delivery Dashboard** — Active deliveries with task progress
- **Delivery Detail** — Full quality trail (tasks, agents, evidence, reviews, decisions, recoveries, checkpoints, lessons, verification)
- **Activity Timeline** — Event log with filtering
- **Memory Catalogue** — Searchable project knowledge
- **Quality Summaries** — Check counts, review findings

## Development

### Umbrella Repository

```bash
# Validate projection contracts
pnpm run validate:contracts

# View project knowledge base
cat docs/project-knowledge/CURRENT-STATE.md
```

### Component Repositories

```bash
# Playbook
cd vstack-playbook
pnpm install
pnpm validate       # Content validation (0 errors, 0 warnings)

# OpenCode Plugin
cd vstack-opencode
pnpm install
pnpm build          # TypeScript compile
pnpm typecheck      # TypeScript strict check
pnpm test           # 103 tests (all passing)

# OpenChamber Extension
cd vstack-openchamber
pnpm install
pnpm build          # Bundle with @openchamber/sdk
pnpm typecheck      # TypeScript check
```

## Status

| Component | Typecheck | Build | Tests | Distribution |
|---|---|---|---|---|
| `vstack-playbook` | N/A | N/A | Validation: 0 errors | npm tarball, zip, Skills CLI |
| `vstack-opencode` | ✅ PASS | ✅ PASS | ✅ 103/103 PASS | npm `@vipintom/vstack-opencode` |
| `vstack-openchamber` | ✅ PASS | ✅ PASS | N/A | Git URL, built ZIP |

## Harness Compatibility

| Harness | Playbook | Adapters | Plugin |
|---|---|---|---|
| OpenCode | ✅ Skills CLI | ✅ 3 roles (live validated) | ✅ Full runtime |
| Codex CLI | ✅ Skills CLI | ✅ 3 roles (TOML, sandbox modes) | N/A |
| Claude Code | ✅ Skills CLI | ✅ 3 roles (YAML, disallowedTools) | N/A |
| Custom | ✅ Agent Skills spec | Implement adapters | N/A |

## Projection Protocol

Components communicate via the **vstack projection protocol v1** (defined in `contracts/projections/v1/`):

- **Producer**: OpenCode plugin (`@vipintom/vstack-opencode`) publishes projections to `.vstack/`
- **Consumer**: OpenChamber extension (Git URL: `github.com/vipintom/vstack-openchamber`) reads projections from `.vstack/`
- **Contract**: 7 JSON schemas in `contracts/projections/v1/` (manifest, index, delivery, phase, task, review, quality)
- **Versioning**: Schema version in `manifest.json`; consumers must handle gracefully

See [docs/projection-protocol.md](docs/projection-protocol.md) for full specification.

## License

MIT License — see [LICENSE](LICENSE) for details.