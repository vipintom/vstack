# vstack

**An engineering playbook with optional OpenCode runtime plugin and OpenChamber read-only visualization.**

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)]()
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)]()
[![Tests](https://img.shields.io/badge/tests-26%2F26%20PASS-brightgreen)]()
[![License](https://img.shields.io/badge/license-MIT-blue)]()

---

## Overview

vstack is a portable engineering playbook that codifies how effective software teams work. It consists of three packages:

1. **Playbook** (`/playbook/`) — Portable content: principles, roles, skills, workflows (Markdown/YAML). Works without any plugin, harness-independent.
2. **OpenCode Plugin** (`/opencode/vstack/`) — Runtime engine for OpenCode: persistent memory, delivery/task tracking, agent coordination, evidence, basic enforcement.
3. **OpenChamber Plugin** (`/openchamber/vstack-panel/`) — Read-only visualization of published projections.

## Quick Start

### Install Playbook (Harness-Independent)

```bash
# Using Skills CLI (recommended)
npx skills add /path/to/vstack/playbook

# Or copy manually
cp -r playbook/ ~/.config/your-harness/skills/vstack
```

### OpenCode Plugin

```bash
# In your project
cd your-project
npm install /path/to/vstack/opencode/vstack

# Or link for development
npm link /path/to/vstack/opencode/vstack
```

### OpenChamber Extension

Currently deferred — requires `@openchamber/sdk` access.

---

## Documentation

| Topic | Link |
|---|---|
| **Getting Started** | [Getting Started](Getting-Started.md) |
| **Playbook** | [Playbook Overview](Playbook.md) |
| **Principles** | [Engineering Principles](Principles.md) |
| **Roles** | [Canonical Roles](Roles.md) |
| **Skills** | [Skills Reference](Skills.md) |
| **Workflows** | [Workflow Recipes](Workflows.md) |
| **OpenCode Plugin** | [Plugin Guide](OpenCode-Plugin.md) |
| **Tools** | [Tools Reference](Tools.md) |
| **Projections** | [Projection System](Projections.md) |
| **OpenChamber** | [Visualization](OpenChamber.md) |
| **Architecture** | [Architecture](Architecture.md) |
| **Contributing** | [Contributing](Contributing.md) |

---

## Key Features

### 🎯 Playbook (Portable)
- **7 Engineering Principles** — Bias to deletion, foundational thinking, domain modeling, boundary discipline, idempotence, root-cause debugging, verifiable sequencing, delegation
- **3 Canonical Roles** — Lead, Builder, Reviewer
- **15 Skills** — From architecture to testing, each as standalone Markdown
- **3 Workflow Recipes** — Bug fix, feature delivery, context interruption

### ⚡ OpenCode Plugin
- **Persistent Memory** — Project knowledge that survives sessions
- **Delivery/Task Tracking** — Lightweight CRUD with dependencies
- **Agent Coordination** — Dispatch builders/reviewers with handoff recording
- **Evidence-Based Checks** — Execute tests, builds, lint with recorded evidence
- **5 Enforcement Rules** — Completion checks, blocked reasons, approval stubs
- **~7 Cohesive Tools** — Status, memory, history, delivery, task, agent, check

### 📊 OpenChamber (Read-Only)
- **Projection-Driven** — Reads only published reports, never authoritative data
- **Delivery Dashboard** — Active deliveries with task relationships
- **Activity Timeline** — Event log from agent runs and tool executions
- **Memory Catalogue** — Searchable project knowledge
- **Quality Summaries** — Check counts by type

---

## Architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│    Playbook     │     │  OpenCode       │     │  OpenChamber    │
│  (Portable)     │     │  Plugin         │     │  (Visualization)│
├─────────────────┤     ├─────────────────┤     ├─────────────────┤
│ Principles      │────▶│ Loads skills    │────▶│ Reads projections│
│ Roles           │     │ Provisions agents│    │ Dashboard       │
│ Skills          │     │ Persistence     │     │ Activity        │
│ Workflows       │     │ Tools (7)       │     │ Memory          │
│ Resources       │     │ Enforcement     │     │ Quality         │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                              │
                              ▼
                       ┌─────────────────┐
                       │  .vstack/       │
                       │  (Authoritative)│
                       ├─────────────────┤
                       │ deliveries/     │
                       │ tasks/          │
                       │ agent-runs/     │
                       │ memory/         │
                       │ state/events    │
                       │ reports/        │
                       └─────────────────┘
```

---

## Status

| Package | Typecheck | Build | Tests |
|---|---|---|---|
| opencode/vstack | ✅ PASS | ✅ PASS | ✅ 26/26 |
| openchamber/vstack-panel | ✅ PASS | ⏸️ DEFERRED | N/A |

---

## License

MIT License — see [LICENSE](../LICENSE) for details.
