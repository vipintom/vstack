# Architectural Decisions — vstack v0.1.0 (23 ADRs Condensed)

---

## Runtime Decisions (ADR-0001 to ADR-0013)

| ADR | Title | Decision |
|-----|-------|----------|
| **0001** | Evidence Revision Field | Added `revision` field to evidence for optimistic concurrency; stores both `createdAt` and `updatedAt` |
| **0002** | Playbook Path | Canonical playbook path is `/playbook/skills/` at repo root for Skills CLI discovery |
| **0003** | Adapter Strategy | Adapters generated at install time from canonical roles; not checked into playbook repo |
| **0004** | Role Distribution | 3 canonical roles (Lead, Builder, Reviewer) with harness-specific adapters; separate from skill installation |
| **0005** | OpenCode API Version | `@opencode/plugin@2.2.0` + `@opencode/schema@2.2.0`; agent provisioning via filesystem, not `ctx.agent.transform` |
| **0006** | Project Identity | Single `.vstack/` at repo root, shared by worktrees; config via `opencode.jsonc` |
| **0007** | Evidence Code Identity | Commit SHA + diff fingerprint for provenance; enables routing learning |
| **0008** | Reviewer Independence | 4-state enum: `independent` / `shared-context` / `author` / `unknown` |
| **0009** | Checkpoint Canonicality | Single `PROGRESS.md` + plugin index; no duplicate state |
| **0010** | Project Verification Location | Project-specific skills live in project itself (not playbook); per ADR-0010 |
| **0011** | Required Checks Config | Typed JSON at `.vstack/required-checks.json` (not YAML, not hardcoded) |
| **0012** | Scenario Evaluation | Tier 1 (deterministic) + Tier 2 (qualitative) per skill; 12 minimum PRD scenarios |
| **0013** | Projection Compatibility | Versioned schema (protocol v1, schema v1 per type); graceful degradation for consumers |

---

## Content Governance Decisions (ADR-0014 to ADR-0023)

| ADR | Title | Decision |
|-----|-------|----------|
| **0014** | No Grandfathering | Full re-authoring required; prior Strong/Complete ratings do not exempt |
| **0015** | External Research Mandate | Per-skill: Cursor pstack + 1 independent pack; pinned commits; synthesis not copy |
| **0016** | Capability Registry & Overlap | One row per canonical item; pairwise overlap analysis mandatory before drafting |
| **0017** | Behavioural Evaluation | Structural validation ≠ quality; 12 min PRD scenarios + positive/negative triggers + fidelity |
| **0018** | Lifecycle & Promotion | Draft → Candidate → Active → Deprecated; promotion by evidence, not count |
| **0019** | Canonical Ownership | Single procedure owner; playbook owns orchestration, skill owns method; links not copies |
| **0020** | Migration Ledger | Every file tracked: disposition, target owner, evidence; no parallel active catalogue |
| **0021** | Adapter Validation | Must test in actual harness (OpenCode live, Codex/Claude Code syntax + extraction) |
| **0022** | No Fixed Catalogue Target | Final count by distinct user value; merge/keep/split on trigger/method/output/outcome |
| **0023** | Progressive Disclosure | Core procedure + references; index/discovery ≠ second copy; compact routing |

---

## Key Principles (From Decisions)

1. **Skill = procedure; plugin tool = deterministic capability/recording**
2. **Workflow = Markdown recipe, NOT TypeScript state machine**
3. **Plugin owns authoritative runtime records; agents use plugin tools for mutations**
4. **OpenChamber NEVER mutates authoritative records**
5. **Event log = audit record, not full event sourcing**
6. **Playbook works without plugins; skills document fallbacks**
7. **Harness wrappers adapt invocation only, not methodology**
8. **No parallel active catalogue** — v2 replaces, doesn't layer
9. **Manifest = single source of truth** — contentHash, stable IDs, canonical paths
10. **No fixed catalogue target** — merge/keep/split by distinct value
