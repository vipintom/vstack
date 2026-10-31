# vstack Delivery Profiles Reference

Profiles define the applicable phase sequence, phase requirements, gates, and approval rules for different types of work.

## bug-fix

**Typical Path**: Intake → Discovery → Implementation → Validation → Review → Completed

**Phases**:
1. **Intake** — Capture bug report, reproduction steps, impact assessment
2. **Discovery** — Root cause analysis, identify fix scope
3. **Implementation** — Minimal fix with regression test
4. **Validation** — Build, lint, typecheck, tests, acceptance verification
5. **Review** — Quick independent review (correctness, regression, design alignment)
6. **Completed** — All gates satisfied

**Gates**: Build, lint, typecheck, tests, quick review
**Approvals**: None by default

---

## feature

**Typical Path**: Intake → Discovery → Design → Planning → Implementation → Validation → Review → Release Preparation → optional Deployment → Post-release → Completed

**Phases**:
1. **Intake** — Capture feature request, constraints, expected outcome
2. **Discovery** — Requirements, codebase exploration, technical research
3. **Design** — Technical approach, alternatives, ADRs, API contracts
4. **Planning** — Task breakdown, dependencies, acceptance criteria
5. **Implementation** — Coding, configuration, documentation contributions
6. **Validation** — Build, lint, typecheck, unit/integration/E2E tests, acceptance
7. **Review** — Quick or full independent review based on risk
8. **Release Preparation** — Version, changelog, artifact validation
9. **Deployment** (optional) — Environment preflight, approval, deployment
10. **Post-release** — Smoke tests, health checks, observability review

**Gates**: Build, lint, typecheck, all tests, review, release validation
**Approvals**: Design (if policy), Release, Production deployment

---

## refactor

**Typical Path**: Intake → Discovery → Planning → Implementation → Validation → Review → Completed

**Phases**:
1. **Intake** — Refactoring goal, scope, risk assessment
2. **Discovery** — Current implementation analysis, test coverage mapping
3. **Planning** — Task breakdown, dependency ordering, safety checks
4. **Implementation** — Incremental changes with continuous verification
5. **Validation** — Build, lint, typecheck, full test suite, regression check
6. **Review** — Quick review (correctness, regression, design alignment)

**Gates**: Build, lint, typecheck, full test suite, quick review
**Approvals**: None by default

---

## architecture-change

**Typical Path**: Intake → Discovery → Design → Design Review → Planning → Implementation → Validation → Review → Release

**Phases**:
1. **Intake** — Architecture change proposal, impact assessment
2. **Discovery** — Current architecture analysis, constraint mapping
3. **Design** — New architecture, alternatives, trade-offs, ADRs
4. **Design Review** — Full review with architecture/security lenses
5. **Planning** — Phased implementation, migration strategy
6. **Implementation** — Phased changes with continuous validation
7. **Validation** — Build, lint, typecheck, integration tests, migration tests
8. **Review** — Full review
9. **Release** — Coordinated release with migration

**Gates**: Build, lint, typecheck, integration tests, full review, design review
**Approvals**: Design, Release, Production deployment

---

## infrastructure-change

**Typical Path**: Intake → Discovery → Design → Planning → Implementation → Validation → Review → Deployment → Post-release

**Phases**:
1. **Intake** — Infrastructure change request, impact assessment
2. **Discovery** — Current infrastructure analysis, dependency mapping
3. **Design** — Target state, migration plan, rollback plan
4. **Planning** — Phased deployment, validation checkpoints
5. **Implementation** — Infrastructure as code changes
6. **Validation** — Plan validation, staging deployment, smoke tests
7. **Review** — Full review (architecture, security, operations)
8. **Deployment** — Production deployment with approval
9. **Post-release** — Health monitoring, rollback readiness

**Gates**: Plan validation, staging deployment, full review, deployment approval
**Approvals**: Design, Production deployment, Destructive migration

---

## documentation

**Typical Path**: Intake → Discovery → Documentation/Implementation → Review → Completed

**Phases**:
1. **Intake** — Documentation need, audience, scope
2. **Discovery** — Current docs audit, gap analysis
3. **Documentation/Implementation** — Writing, updating, restructuring
4. **Review** — Quick review (correctness, completeness, clarity)
5. **Completed** — Published and linked

**Gates**: Quick review
**Approvals**: None by default

---

## release-only

**Typical Path**: Intake → Release Preparation → Validation → Approval → Deployment/Publish if configured → Post-release

**Phases**:
1. **Intake** — Release scope, version determination
2. **Release Preparation** — Changelog, artifact validation, release notes
3. **Validation** — Full test suite, security scans, artifact verification
4. **Approval** — Release approval gate
5. **Deployment/Publish** (if configured) — Package publish, deployment
6. **Post-release** — Smoke tests, health verification

**Gates**: Full test suite, security scans, release validation, release approval
**Approvals**: Release, Publish (if external), Production deployment (if configured)