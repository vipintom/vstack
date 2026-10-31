# Quality Gate Types Reference

Each gate is a deterministic rule set that must pass before a phase can advance.

## Standard Gates

| Gate ID | Name | Phase | Required | Description |
|---|---|---|---|---|
| `build` | Build | Validation | Yes | Project builds successfully |
| `lint` | Lint | Validation | Yes | Code passes linting rules |
| `typecheck` | Type Check | Validation | Yes | Type checking passes |
| `test:unit` | Unit Tests | Validation | Yes | Unit test suite passes |
| `test:integration` | Integration Tests | Validation | Configurable | Integration test suite passes |
| `test:e2e` | E2E Tests | Validation | Configurable | End-to-end test suite passes |
| `coverage` | Coverage Threshold | Validation | Configurable | Code coverage meets threshold |
| `security:deps` | Dependency Vulnerability | Validation | Yes | No critical/high vulns in deps |
| `security:secrets` | Secret Scan | Validation | Yes | No secrets in codebase |
| `security:review` | Security Review | Review | Configurable | Security-focused review passed |
| `architecture:review` | Architecture Review | Review | Configurable | Architecture review passed |
| `acceptance` | Acceptance Criteria | Validation | Yes | All acceptance criteria verified |
| `release:artifacts` | Release Artifacts | Release | Yes | Artifacts valid and signed |
| `deploy:health` | Deployment Health | Deployment | Yes | Post-deployment smoke tests pass |

## Gate Configuration

Each gate has:
- **ID and name**: Unique identifier
- **Phase/transition**: Which phase transition it protects
- **Required flag**: Whether failure blocks advancement
- **Command/check definition**: How to execute the check
- **Timeout and retry policy**: Execution limits
- **Acceptable result status**: What constitutes pass
- **Approval requirement**: If human approval needed
- **Evidence freshness**: Commit/revision reference requirements

## Evidence Requirements

For each gate execution, record:
- Unique evidence ID
- Evidence type
- Source: `plugin_execution` | `agent_review` | `human_approval` | `external_ci` | `manual_attestation`
- Command/check ID
- Command line (redacted)
- Working directory/worktree
- Git commit/tree/diff reference
- Start/end timestamps
- Exit code and normalized status
- Stdout/stderr file references or bounded excerpts
- Result summary
- Tool/session/agent run ID
- Schema version

## Fail Closed

Missing, stale, malformed, or ambiguous evidence must not satisfy a mandatory gate.