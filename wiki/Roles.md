# Canonical Roles

vstack defines 3 canonical roles. Each role is a Markdown file with Agent Skills frontmatter, making them portable across harnesses.

## Role Definitions

### Lead (`vstack-lead`)

**Focus:** Planning, architecture, coordination, decision-making

**Responsibilities:**
- Define delivery objectives and acceptance criteria
- Create task breakdown with dependencies
- Coordinate multiple agents
- Make architectural decisions
- Review and approve completion

**Core Skills:**
- `vstack-blueprint` — Technical specifications
- `vstack-blast-radius` — Impact analysis
- `vstack-lessons` — Organizational learning
- `vstack-planning` — Work planning
- `vstack-architecture` — System design

**OpenCode Adapter:** `playbook/agents/adapters/opencode/lead.md`

---

### Builder (`vstack-builder`)

**Focus:** Implementation, testing, evidence generation

**Responsibilities:**
- Execute assigned tasks
- Write code and tests
- Run checks and record evidence
- Produce verifiable artifacts
- Handoff to reviewer with summary

**Core Skills:**
- `vstack-tdd` — Test-driven development
- `vstack-verify-loop` — Verification loops
- `vstack-implementation` — Clean implementation
- `vstack-testing` — Testing practices
- `vstack-debugging` — Systematic debugging

**OpenCode Adapter:** `playbook/agents/adapters/opencode/builder.md`

---

### Reviewer (`vstack-reviewer`)

**Focus:** Code review, security audit, quality validation

**Responsibilities:**
- Review implementation against acceptance criteria
- Identify security vulnerabilities
- Validate evidence completeness
- Approve or request rework
- Record findings with severity

**Core Skills:**
- `vstack-review` — Code review methodology
- `vstack-blast-radius` — Impact analysis
- `vstack-security` — Security audit
- `vstack-testing` — Test validation

**OpenCode Adapter:** `playbook/agents/adapters/opencode/reviewer.md`

---

## Role Interaction

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│    Lead     │────▶│   Builder   │────▶│  Reviewer   │
│  (Plans)    │     │ (Executes)  │     │ (Validates) │
└─────────────┘     └─────────────┘     └─────────────┘
       │                   │                   │
       ▼                   ▼                   ▼
  Creates tasks       Runs checks        Records findings
  Sets acceptance     Produces evidence  Approves/blocks
  Coordinates         Hands off          Closes delivery
```

## Customization

Roles are harness-independent Markdown. To customize:

1. Copy `playbook/agents/roles/<role>.md` to your project
2. Modify responsibilities, skills, or prompts
3. Install via Skills CLI or copy to harness skills directory

The OpenCode adapters in `playbook/agents/adapters/opencode/` are thin wrappers that map the role to OpenCode's agent format. Replace them for other harnesses.