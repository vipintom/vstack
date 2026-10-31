# Full Review Rubric

Comprehensive review for high-risk deliveries: architecture changes, security-sensitive work, infrastructure changes, or when explicitly requested.

## Required Lenses

| Lens | Focus | Reviewer |
|---|---|---|
| Architecture & Design | Scalability, infrastructure economics, unmitigated risk | `vstack-design` |
| Codebase Fit | Fit with actual codebase, existing patterns, real constraints | `vstack-codebase-details` |
| Alignment & Scope | Right problem, right scope, right reason | `vstack-zoom-out` |
| Comprehension & Structure | Fresh reader understanding, completeness, flow | `vstack-comprehension`, `vstack-structural` |
| Implementation Readiness | Plan complete, ordered, executable | `vstack-implementation-readiness` |
| Security & Data | Vulnerabilities, data handling, auth/authorization | `vstack-design` (security focus) |
| Performance & Resources | Latency, throughput, resource utilization | `vstack-design` (performance focus) |
| Maintainability & Style | Clarity, precision, writing quality | `vstack-style` |
| Test Adequacy | Coverage, meaningful assertions, regression protection | `vstack-test-engineer` |

## Reviewer Assignment

Multiple independent reviewers (Goldfish), each running in fresh context with read-only ruleset. Dispatch from primary session.

## Process

1. Primary session dispatches reviewers per lens
2. Each reviewer writes findings to `.wgm/reports/`
3. `vstack-synthesizer` consolidates findings
4. Consolidated report maps findings → reviewers → merged severity → disposition
5. Findings rated Critical/High block advancement

## Finding Severity Thresholds

- **Critical**: Blocks release — must fix before advancement
- **High**: Should fix — blocks advancement if in critical path
- **Medium**: Should fix — can advance with tracking
- **Low**: Nice to fix — document and track
- **Informational**: No action required

## Re-review

Re-review all Critical and High findings. Medium and below tracked.

## Timebox

Maximum 30 steps per reviewer session. Confirm before dispatching >3 reviewers.