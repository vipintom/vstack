# Review Lens: Security & Data

## Purpose
Verify the implementation protects data and resists abuse.

## Questions to Answer

### Input Validation & Sanitization
- [ ] Are all external inputs validated (API, user, file, env)?
- [ ] Is validation allow-list (not block-list)?
- [ ] Are outputs encoded for context (HTML, SQL, shell, JSON)?

### Authentication & Authorization
- [ ] Are permissions checked at every access point?
- [ ] Is authorization centralized, not scattered?
- [ ] Are tokens/secrets handled correctly (no logs, no URLs)?

### Data Protection
- [ ] Is sensitive data encrypted at rest and in transit?
- [ ] Is PII minimized and access-controlled?
- [ ] Are secrets externalized (env, vault, not code)?

### Injection & Abuse
- [ ] SQL/NoSQL: parameterized queries only?
- [ ] Command: no shell interpolation, argv arrays only?
- [ ] Path: no traversal, validated against allow-list?
- [ ] Rate limiting / DoS protection on public endpoints?

## Severity Guide
- **Critical:** RCE, SQLi, auth bypass, data exposure
- **High:** Missing authz, weak validation, secret leakage
- **Medium:** Insufficient rate limiting, weak encryption
- **Low:** Missing security headers, info disclosure
- **Informational:** Hardening opportunities

## Evidence Required
- Security test results (SAST, dependency scan)
- Threat model reference (if applicable)
- Penetration test results (if available)