# Contributing to vstack

Thank you for contributing! This guide covers the contribution process.

## Code of Conduct

This project follows the [Contributor Covenant](https://www.contributor-covenant.org/). By participating, you agree to uphold this code.

## Getting Started

### Prerequisites

- Node.js >= 20
- pnpm >= 9
- Git

### Setup

```bash
# Fork and clone
git clone https://github.com/your-fork/vstack.git
cd vstack

# Install dependencies
pnpm install

# Verify setup
pnpm test
pnpm typecheck
pnpm build
```

## Development Workflow

### 1. Create Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

### 2. Make Changes

Follow the implementation patterns:
- TypeScript strict mode
- ES2022, ESM only
- Named exports (no default in source)
- Tests co-located: `*.test.ts` next to source
- Documentation updated with changes

### 3. Run Checks

```bash
# Typecheck
pnpm typecheck

# Tests
pnpm test

# Build
pnpm build
```

### 4. Commit

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```bash
git add .
git commit -m "feat: add new projection type for deployments"
# or
git commit -m "fix: resolve directory creation bug in task store"
```

### 5. Push and PR

```bash
git push origin feature/your-feature-name
# Open PR on GitHub
```

## Project Structure

```
vstack/
├── playbook/              # Portable content (Markdown/YAML)
│   ├── principles/
│   ├── agents/
│   ├── skills/
│   ├── workflows/
│   └── resources/
├── opencode/vstack/       # OpenCode plugin
│   ├── src/
│   │   ├── persistence/
│   │   ├── memory/
│   │   ├── deliveries/
│   │   ├── tasks/
│   │   ├── agents/
│   │   ├── history/
│   │   ├── quality/
│   │   ├── enforcement/
│   │   ├── orchestration/
│   │   ├── dashboard/
│   │   ├── skills/
│   │   └── agents/
│   └── test/
├── openchamber/vstack-panel/  # OpenChamber extension
│   └── panel/
├── docs/                  # Documentation
└── wiki/                  # This wiki
```

## Contribution Types

### Playbook Content

- Principles, roles, skills, workflows, resources
- Pure Markdown/YAML — no TypeScript
- Follow Agent Skills frontmatter format
- Test with `npx skills add ./playbook`

### Plugin Code

- TypeScript in `opencode/vstack/src/`
- Follow existing patterns
- Add tests for new functionality
- Update documentation

### OpenChamber

- TypeScript in `openchamber/vstack-panel/panel/`
- Read-only projection consumers
- No direct data access

### Documentation

- Wiki pages in `wiki/`
- Project knowledge in `docs/project-knowledge/`
- Keep in sync with implementation

## Testing Requirements

| Change Type | Required Tests |
|---|---|
| New store method | Unit test + integration |
| New tool command | Unit test + E2E scenario |
| New projection | Generator test + API test |
| Playbook skill | Frontmatter validation |
| Bug fix | Regression test |

Run all tests before PR:
```bash
pnpm test
```

## Pull Request Checklist

- [ ] Typecheck passes (`pnpm typecheck`)
- [ ] All tests pass (`pnpm test`)
- [ ] Build succeeds (`pnpm build`)
- [ ] Documentation updated
- [ ] CHANGELOG entry (if applicable)
- [ ] Conventional commit messages

## Release Process

Maintainers handle releases:

1. Update version in `package.json`
2. Generate CHANGELOG
3. Create git tag
4. Publish to npm
5. Update wiki if needed

## Questions?

- Open a GitHub Discussion
- Check existing issues
- Review `docs/project-knowledge/` for architecture decisions