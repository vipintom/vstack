# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Initial vstack implementation (phases 0-6)
- Playbook package with 7 principles, 3 roles, 15 skills, 3 workflows
- OpenCode plugin with persistence, runtime stores, enforcement, projections
- OpenChamber extension (read-only, projection-based)
- E2E test coverage for full feature delivery workflow

## [0.1.0] - 2026-11-01

### Added
- **Playbook Package**
  - 7 engineering principles (bias to deletion, foundational thinking, domain modeling, boundary discipline, idempotence, root-cause debugging, verifiable sequencing, delegation)
  - 3 canonical roles: Lead, Builder, Reviewer
  - 3 thin OpenCode agent adapters
  - 15 skills with Agent Skills frontmatter
  - 3 workflow recipes: bug-fix, feature-delivery, context-interruption
  - 4 rubrics, 4 templates, references

- **OpenCode Plugin**
  - Persistence layer: file-store, locks, atomic-write, event-log, repository-root, schema-version
  - Memory store: CRUD, categories, search, supersede, index
  - Delivery store: CRUD, status transitions
  - Task store: CRUD, dependencies, cycles, ready tasks
  - Agent run store: Dispatch tracking, handoff recording
  - History service: Event querying, stats
  - Check service: Discover, execute, evidence recording
  - Enforcement service: 5 basic rules
  - Agent dispatch: Integrated with agentRunStore
  - Dashboard: Projection publisher + index generator
  - ~7 cohesive tools: status, memory, history, delivery, task, agent, check
  - Skills loader: Loads Playbook skills via findAgentsSkillsRoot
  - Agent installer: Filesystem provisioning to .opencode/agents/

- **OpenChamber Extension**
  - Projection-based API (reads only .vstack/reports/ and .vstack/state/index.json)
  - Delivery dashboard with task progress
  - Activity timeline
  - Memory browser
  - Quality view
  - Staleness detection via revision/timestamp

- **Testing**
  - 25 unit tests passing
  - 1 comprehensive E2E test (full feature delivery workflow)
  - TypeScript strict mode passing
  - Build passing

### Fixed
- Evidence revision field (ADR-0001) — Added revision to Evidence interface
- Delivery ID prefix inconsistency — Unified on "dlv_" across all components
- Directory creation bugs — All stores now create parent directories before writing

### Known Limitations
- OpenChamber build deferred (requires @openchamber/sdk access)
- No cross-process concurrency tests
- No migration runner tests
- Memory curation is manual
- Enforcement approval is stub only
- Single-machine/local-filesystem assumption

---

## Version History

| Version | Date | Notes |
|---|---|---|
| 0.1.0 | 2026-11-01 | Initial release — all 6 phases complete |
