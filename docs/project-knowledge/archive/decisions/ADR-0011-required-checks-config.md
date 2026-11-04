# ADR-0011: Project-Specific Required Checks Configuration

**Date:** 2026-11-01
**Status:** Decided
**Deciders:** Implementation team

## Context

The v2 PRD requires project-specific required checks for completion gates. Must use a small typed configuration convention, not a generic policy DSL.

## Decision

**Typed configuration file: `.vstack/required-checks.json` (or `.vstack/checks.config.json`)**

**Schema:**
```json
{
  "version": 1,
  "delivery": {
    "requiredChecks": ["typecheck", "build", "test:unit", "test:e2e"],
    "optionalChecks": ["lint", "security:scan"]
  },
  "task": {
    "requiredChecks": ["typecheck", "test:unit"],
    "byType": {
      "feature": ["test:e2e"],
      "bugfix": ["test:regression"]
    }
  },
  "approvals": {
    "protectedActions": ["merge", "deploy", "release"],
    "requiredApprovers": 1
  }
}
```

**Rationale:**
- Simple JSON with explicit structure — no DSL complexity
- Versioned for forward compatibility
- Delivery-level and task-level requirements
- Type-specific overrides for different workflow types
- Approval configuration separate from check requirements
- Easy to validate, migrate, and document

## Consequences

- `enforcement/enforcement-service.ts` reads config at startup
- Completion gates check against configured required checks
- Missing config → defaults to minimal checks (typecheck, build)
- Config changes require explicit user action (not auto-detected)
- OpenChamber displays configured vs actual checks

## Related

- `opencode/vstack/src/enforcement/enforcement-service.ts`
- `opencode/vstack/src/schemas/types.ts` — config schema
- Phase 4 Completion gates and permissions
- Phase 5 OpenChamber gate status view