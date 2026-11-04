# vstack Project Knowledge — Consolidated (Greenfield)

**Last updated:** 2026-11-02  
**Status:** v0.1.0 Released + Playbook 2.0 Content Re-authoring Complete

---

## Quick Navigation

| File | Purpose |
|------|---------|
| `CURRENT-STATE.md` | What exists, working capabilities, validation status |
| `ARCHITECTURE.md` | System boundaries, data flow, responsibility matrix |
| `DECISIONS.md` | 23 Architectural Decision Records (condensed) |
| `KNOWN-ISSUES.md` | Technical debt, limitations, functional gaps |
| `NEXT-ACTIONS.md` | Phase 12 release steps, blockers |

---

## Project Summary

| Aspect | Status |
|--------|--------|
| **Playbook 2.0 Content** | ✅ 55 skills, 18 playbooks, 17 principles, 3 roles, 9 adapters, 7 rubrics |
| **OpenCode Plugin** | ✅ 23 tools, 7 services, 103/103 tests pass |
| **OpenChamber Extension** | ✅ Build + typecheck pass, Git/ZIP distribution ready |
| **Repository Split** | ✅ 4 independent repos ready for GitHub push |
| **Validation** | ✅ All green (0 errors, 0 warnings) |

---

## Component Repositories (Ready for Release)

| Repo | Version | HEAD | Distribution |
|------|---------|------|--------------|
| `vstack-playbook.git` | 0.1.0 | `2143b2e` | GitHub + Skills CLI |
| `vstack-opencode.git` | 0.1.0 | `2916d84` | npm `@vstack/opencode` |
| `vstack-openchamber.git` | 0.1.0 | `49412fe` | Git URL / ZIP |
| `vstack` (umbrella) | meta | `vstack-2026.11.02` | GitHub |

---

## Key Contracts

- **Projection Protocol v1** — `contracts/projections/v1/` (7 JSON schemas)
- **Compatibility Matrix** — `compatibility/matrix.yaml` (schema v1)
- **Integrated Release** — `compatibility/integrated-release.json` (validated)

---

## Quick Validation Commands

```bash
# Umbrella
cd vstack && node compatibility/validate-compatibility.js

# Playbook
cd vstack-playbook && node scripts/validate-content.js

# OpenCode
cd vstack-opencode && pnpm test && pnpm build && pnpm typecheck

# OpenChamber
cd vstack-openchamber && pnpm build && pnpm typecheck
```
