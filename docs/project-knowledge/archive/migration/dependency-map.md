# Dependency Map — vstack Repository Split

**Date:** 2026-11-02  
**Source:** `/home/ubuntu/code/personal/vstack` baseline commit `86da1605`

---

## Cross-Package Dependency Inventory

| Source Path | Dependency/Assumption | Current Resolution | Target Resolution | Required Action |
|-------------|----------------------|-------------------|-------------------|-----------------|
| `opencode/vstack/src/skills/skill-loader.ts` | Playbook skills/workflows/roles location | Relative path `../../playbook` from plugin root; `node_modules/@vstack/playbook` fallback | Configurable `playbookRoot` via plugin config; document discovery order | Add config option; remove hardcoded relative path |
| `opencode/vstack/src/skills/skill-validator.ts` | Playbook root for validation | `config.playbookRoot` (from skill-loader) | Same configurable root | Ensure config propagated |
| `opencode/vstack/src/tools/skill-validate-tools.ts` | Playbook root for validation tool | Parameter `playbookRoot` defaults to `resolve(vstackRoot, "../../playbook")` | Tool parameter required or config-driven | Make playbookRoot required or read from config |
| `opencode/vstack/src/skills/verification-skill-generator.ts` | Project template for verification skill | Hardcoded `resolve(__dirname, "../../../playbook/project-templates/verification-skill/SKILL.md.hbs")` | Template bundled in runtime package or fetched from playbook repo | Bundle template in opencode package or add template path config |
| `opencode/vstack/test/verification-skill.test.ts` | Template path for test | Absolute path `/home/ubuntu/code/personal/vstack/playbook/project-templates/verification-skill/SKILL.md.hbs` | Test fixture copied to test/fixtures/ | Copy template to test fixtures |
| `opencode/vstack/test/evaluation-suite.test.ts` | Template path for test | Absolute path `/home/ubuntu/code/personal/vstack/playbook/project-templates/verification-skill/SKILL.md.hbs` | Test fixture copied to test/fixtures/ | Copy template to test fixtures |
| `opencode/vstack/test/manifest-validation.test.ts` | Playbook root for manifest validation | Absolute path `/home/ubuntu/code/personal/vstack/playbook` | Test fixture or configurable | Use test fixture |
| `opencode/vstack/test/adapter-installation.test.ts` | Playbook root for adapter tests | Absolute path `/home/ubuntu/code/personal/vstack/playbook` | Test fixture or configurable | Use test fixture |
| `opencode/vstack/test/openchamber.test.ts` | OpenChamber panel types path | Absolute path `/home/ubuntu/code/personal/vstack/openchamber/vstack-panel/panel/src/types/index.ts` | Use pinned schema snapshot | Copy types to test fixtures or use schema snapshot |
| `opencode/vstack/test/openchamber.test.ts` | OpenChamber API service path | Absolute path `/home/ubuntu/code/personal/vstack/openchamber/vstack-panel/panel/src/services/api.ts` | Not needed — tests runtime only | Remove or mock |
| `openchamber/vstack-panel/panel/src/services/api.ts` | Projection paths | Reads `.vstack/` via OpenChamber host API | No change — uses documented contract | None (contract-based) |
| `openchamber/vstack-panel/panel/src/components/Dashboard.ts` | Projection paths | Reads `.vstack/deliveries/...` via host API | No change — uses documented contract | None (contract-based) |
| `openchamber/vstack-panel/panel/src/main.ts` | Projection paths | Reads `.vstack/` via host API | No change — uses documented contract | None (contract-based) |
| `openchamber/vstack-panel/panel/dashboard.ts` | Projection paths | Reads `.vstack/` via host API | No change — uses documented contract | None (contract-based) |
| `opencode/vstack/src/dashboard/projections/*.ts` | Internal persistence modules | Relative imports within opencode package (`../../persistence/`, `../../schemas/`, `../../tasks/`, `../../quality/`) | No change — internal to package | None |

---

## Workspace-Level Dependencies

| Source | Dependency | Current Resolution | Target Resolution | Required Action |
|--------|------------|-------------------|-------------------|-----------------|
| Root `package.json` | `workspaces: ["agents-skills", "opencode/*", "openchamber/*"]` | pnpm workspace | Remove — each component gets own package.json | Delete root package.json after split |
| Root `pnpm-workspace.yaml` | Workspace package list | pnpm workspace | Remove — each component manages own deps | Delete after split |
| Root `scripts` | `build`, `typecheck`, `lint`, `test` via `pnpm --filter '*'` | Workspace orchestration | Each component owns its own scripts | Move scripts to component package.json |
| `playbook/package.json` | `publishConfig` for npm | Registry config | Keep if npm publication desired; else remove | Decide per PRD (not required for playbook) |
| `opencode/vstack/package.json` | `publishConfig` for npm | Registry config | Keep — required for `@vstack/opencode` npm publication | Verify `@vstack` scope ownership first |
| `openchamber/vstack-panel/package.json` | `publishConfig` for npm | Registry config | Remove — PRD says npm not required for extension | Remove publishConfig |

---

## Build/Toolchain Dependencies

| Component | Toolchain | Current | Target | Action |
|-----------|-----------|---------|--------|--------|
| Playbook | Node.js >=20 | Root workspace Node | Own Node version in package.json | Add engines field, document install |
| OpenCode | Node.js >=20, TypeScript 5.6, Vitest 2.1 | Root workspace | Own lockfile, own TypeScript config | Copy tsconfig, create package-lock/pnpm-lock |
| OpenChamber | Bun (for bundle-guest), TypeScript 5.6 | Root workspace, Bun from SDK | Own lockfile, pin @openchamber/sdk version | Pin SDK version, document Bun requirement |

---

## Runtime/Integration Contract Dependencies

| Contract | Producer | Consumer | Current State | Target State |
|----------|----------|----------|---------------|--------------|
| Projection schemas (types.ts) | OpenCode runtime | OpenChamber extension | Types defined in opencode/src/schemas/types.ts; OpenChamber has parallel types in panel/src/types/index.ts | Canonical JSON Schemas in umbrella `vstack/contracts/projections/v1/`; both components carry pinned snapshots |
| Projection file paths | OpenCode runtime | OpenChamber extension | Hardcoded `.vstack/` paths in both | Documented in umbrella `contracts/projections/v1/README.md` and `docs/projection-protocol.md` |
| Protocol version | OpenCode runtime | OpenChamber extension | Implicit v1 (schemaVersion: 1) | Explicit protocol version in envelope/manifest |
| Playbook content format | Playbook | OpenCode (skill discovery) | Skills CLI format; OpenCode loads via native discovery | No change — Skills CLI format is the contract |

---

## Summary of Required Actions by Phase

### Phase 1 (Contracts)
- [ ] Extract canonical JSON Schemas from `opencode/vstack/src/schemas/types.ts`
- [ ] Create sanitized fixtures from test runs
- [ ] Define protocol version policy
- [ ] Create schema snapshot metadata format

### Phase 2 (Extraction)
- [ ] Create 3 empty GitHub repos
- [ ] Filter history for each package
- [ ] Validate extracted content

### Phase 3 (Independence)
- [ ] Remove hardcoded playbook paths from opencode (skill-loader, skill-validator, skill-validate-tools, verification-skill-generator)
- [ ] Replace absolute test paths with fixtures
- [ ] Add configurable playbookRoot to opencode plugin config
- [ ] Bundle verification-skill template in opencode package
- [ ] Create own lockfiles for each component
- [ ] Pin @openchamber/sdk version

### Phase 4 (Playbook)
- [ ] Ensure skills/ at repo root
- [ ] Verify selective installation works
- [ ] Update install scripts for independent repo

### Phase 5 (OpenCode)
- [ ] Verify plugin entry point
- [ ] Test OpenCode plugin install from npm
- [ ] Add projection producer validation

### Phase 6 (OpenChamber)
- [ ] Verify extension manifest
- [ ] Test Git/ZIP installation
- [ ] Add consumer-side schema validation

### Phase 7 (Umbrella)
- [ ] Convert monorepo to umbrella
- [ ] Add contracts, compatibility matrix, release manifest