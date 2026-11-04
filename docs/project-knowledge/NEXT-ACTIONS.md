# Next Actions — Phase 12: First Independent Releases

---

## Current Status: READY TO EXECUTE

All validation passes, all 4 component repos ready for release.

---

## Remaining Steps (Requires Manual Action)

| Step | Description | Blocked By |
|------|-------------|------------|
| 1 | Replace `<github-username>` placeholders in all 4 repos | GitHub username decision |
| 2 | Verify npm `@vstack` scope ownership | npm account access |
| 3 | Create 4 GitHub repositories under personal account | GitHub account |
| 4 | Push all 4 repos to GitHub | Steps 1-3 |
| 5 | Publish npm packages (`@vstack/playbook`, `@vstack/opencode`) | Steps 2, 4 |
| 6 | Publish OpenChamber extension via Git URL/ZIP | Step 4 |
| 7 | Tag umbrella with `vstack-2026.11.02` | Step 4 |
| 8 | Migration announcement | Steps 4-7 |

---

## Quick Start Commands (After GitHub Push)

```bash
# Playbook (any harness)
npx skills add https://github.com/<username>/vstack-playbook.git -a opencode

# OpenCode Plugin
npm install @vstack/opencode

# OpenChamber Extension
# Settings → Extensions → Install from URL → https://github.com/<username>/vstack-openchamber.git
```

---

## Verification Checklist (Post-Release)

- [ ] All 4 repos pushed to GitHub with correct HEAD
- [ ] npm packages published with provenance
- [ ] OpenChamber extension installable via Git URL
- [ ] Integrated release manifest accessible
- [ ] Umbrella tagged `vstack-2026.11.02`
- [ ] Migration announcement published
- [ ] Documentation links resolve (wiki, READMEs)

---

## Validation Commands (Pre-Push)

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

---

## Key References

| Repo | Local Path |
|------|------------|
| Playbook | `/home/ubuntu/code/personal/vstack-workflow/vstack-playbook.git` |
| OpenCode | `/home/ubuntu/code/personal/vstack-workflow/vstack-opencode.git` |
| OpenChamber | `/home/ubuntu/code/personal/vstack-workflow/vstack-openchamber.git` |
| Umbrella | `/home/ubuntu/code/personal/vstack-workflow/vstack` |
