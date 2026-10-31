# Review Lens: Maintainability & Style

## Purpose
Verify the code is readable, consistent, and easy to modify.

## Questions to Answer

### Readability
- [ ] Can a new contributor understand the flow in 5 minutes?
- [ ] Are names descriptive (no abbreviations, clear intent)?
- [ ] Are functions small and single-purpose?
- [ ] Is nesting depth reasonable (< 3 levels)?

### Consistency
- [ ] Does it follow project style guide (lint passes)?
- [ ] Are patterns used consistently?
- [ ] Are error handling patterns uniform?

### Documentation
- [ ] Are public APIs documented (purpose, params, returns, errors)?
- [ ] Are complex algorithms commented (why, not what)?
- [ ] Are TODOs actionable with owner/date?

### Technical Debt
- [ ] Are there no dead code, commented-out code, unused imports?
- [ ] Are magic numbers replaced with constants?
- [ ] Are type annotations present (no `any` without reason)?

## Severity Guide
- **Critical:** Unreadable, inconsistent, blocks future work
- **High:** Significant inconsistency, missing critical docs
- **Medium:** Style violations, unclear names, missing types
- **Low:** Minor style, missing TODO context
- **Informational:** Alternative style preference

## Evidence Required
- Lint/typecheck results
- Code samples demonstrating issues