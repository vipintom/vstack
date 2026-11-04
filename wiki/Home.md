# vstack

**An engineering playbook with optional OpenCode runtime plugin and OpenChamber read-only visualization.**

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)]()
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)]()
[![Tests](https://img.shields.io/badge/tests-103%2F103%20PASS-brightgreen)]()
[![License](https://img.shields.io/badge/license-MIT-blue)]()
[![Version](https://img.shields.io/badge/version-0.1.0-blue)]()

---

## Overview

vstack is a portable engineering playbook that codifies how effective software teams work. It consists of three packages:

1. **Playbook** (`/playbook/`) — Portable content: principles, roles, skills, workflows (Markdown/YAML). Works without any plugin, harness-independent.
2. **OpenCode Plugin** (`/opencode/vstack/`) — Runtime engine for OpenCode: persistent memory, delivery/task tracking, agent coordination, evidence, enforcement with completion gates.
3. **OpenChamber Plugin** (`/openchamber/vstack-panel/`) — Read-only visualization of published projections.

---

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

Typecheck passes; build deferred — requires `@openchamber/sdk` access.

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
| **Capability Matrix** | [Harness Compatibility](https://github.com/vstack/playbook/blob/main/docs/capability-matrix.md) |

---

## Key Features

### 🎯 Playbook (Portable)
- **17 Engineering Principles** — Harness independence, procedures over vague instructions, flexible workflows, loops first-class, small purposeful agent team, evidence before completion, independent challenge, runtime simplicity, clear responsibility, degrade gracefully, understand before changing, route before loading, smallest complete change, challenge assumptions, model domain explicitly, respect boundaries, verifiable increments
- **3 Canonical Roles** — Lead, Builder, Reviewer
- **55 Skills** — From architecture to testing, each as standalone Markdown with Agent Skills frontmatter (2 legacy retired, 3 utils added)
- **18 Workflow Recipes** — Investigation, bug fix, feature delivery, architecture change, infrastructure change, documentation, skill maintenance, refactoring, performance investigation, prototype, multi-phase delivery, autonomous execution, PR preparation/monitoring, worktree cleanup, runtime/trace forensics, visual parity
- **Resources** — 7 review rubrics, 4 templates, 1 reference, 1 project template (verification skill)
- **Canonical Manifest** — `playbook/manifest.json` with schemaVersion=2, contentHash (SHA256), all skills/roles/workflows/resources/adapters
- **Distribution** — npm package `@vstack/playbook@0.1.0`, tarball (257KB), zip (444KB), SHA256 checksums

### ⚡ OpenCode Plugin
- **Persistent Memory** — Project knowledge that survives sessions (CRUD, categories, search, supersede, index)
- **Delivery/Task Tracking** — Lightweight CRUD with dependencies, task contracts, write-scope isolation
- **Agent Coordination** — Dispatch builders/reviewers with handoff recording, worktree support
- **Evidence-Based Checks** — Execute tests, builds, lint with recorded evidence (provenance, outcome, commitRef)
- **6 Completion Gates** — all_tasks_complete, required_evidence, blocking_findings, approval_required, evidence_freshness, approvals_resolved
- **Action-Scoped Approvals** — scopeHash reuse prevention, expiration support
- **23 Cohesive Tools** — Status, memory, history, delivery, task, agent, check, assignment, decision, checkpoint, lesson, recovery, verification, sessionPickup, verificationSkill, skillValidate, verificationMaintain, evaluation, lessonPromotion, review

### 📊 OpenChamber (Read-Only)
- **Projection-Driven** — Reads only published reports, never authoritative data
- **Delivery Dashboard** — Active deliveries with task relationships
- **Delivery Detail** — Tasks, agents, evidence, review sessions, decisions, recoveries, checkpoints, lessons, verification index
- **Activity Timeline** — Event log from agent runs and tool executions
- **Memory Catalogue** — Searchable project knowledge
- **Quality Summaries** — Check counts by type, review findings

---

## Architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│    Playbook     │     │  OpenCode       │     │  OpenChamber    │
│  (Portable)     │     │  Plugin         │     │  (Visualization)│
├─────────────────┤     ├─────────────────┤     ├─────────────────┤
│ Principles      │────▶│ Loads skills    │────▶│ Reads projections│
│ Roles           │     │ Provisions agents│    │ Dashboard       │
│ 55 Skills       │     │ Persistence     │     │ Activity        │
│ 18 Workflows    │     │ 23 Tools        │     │ Memory          │
│ Resources       │     │ 6 Gates         │     │ Quality         │
│ Manifest v2     │     │ Projections     │     │                 │
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
| opencode/vstack | ✅ PASS | ✅ PASS | ✅ 103/103 |
| openchamber/vstack-panel | ✅ PASS | ✅ PASS | N/A |
| playbook (validation) | N/A | N/A | ✅ 0 errors |

---

## Release

**v0.1.0 Released** — 2026-11-02

See [IMPLEMENTATION-STATUS.md](../docs/project-knowledge/IMPLEMENTATION-STATUS.md) for release notes.

---

## License

MIT License — see [LICENSE](../LICENSE) for details.