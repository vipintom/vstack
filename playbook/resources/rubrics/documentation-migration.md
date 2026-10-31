# Review Lens: Documentation & Migration

## Purpose
Verify that documentation is accurate and migrations are safe.

## Questions to Answer

### Documentation
- [ ] Are public APIs documented with examples?
- [ ] Are architectural decisions recorded (ADR)?
- [ ] Are setup/usage instructions current?
- [ ] Are breaking changes documented with migration guide?

### Migration Safety
- [ ] Is there a rollback plan?
- [ ] Are data migrations tested (forward + backward)?
- [ ] Is backward compatibility maintained during transition?
- [ ] Are feature flags used for gradual rollout?
- [ ] Is monitoring/alerting in place for migration?

### Changelog & Communication
- [ ] Are changes summarized for stakeholders?
- [ ] Are version numbers updated correctly?
- [ ] Are deprecation notices given with timeline?

## Severity Guide
- **Critical:** Data loss risk, no rollback, breaking change without notice
- **High:** Missing migration tests, no rollback plan, undocumented breaking change
- **Medium:** Incomplete docs, missing ADR, partial migration guide
- **Low:** Minor doc gaps, version not updated
- **Informational:** Doc improvement suggestions

## Evidence Required
- Migration test results
- Rollback test results
- Documentation diff
- Monitoring dashboard (if applicable)