# Review Lens: Architecture & Design

## Purpose
Verify the solution has sound structure, clear boundaries, and appropriate patterns.

## Questions to Answer

### Boundaries & Coupling
- [ ] Are module boundaries clear and respected?
- [ ] Is coupling minimized (depend on abstractions, not concretions)?
- [ ] Are responsibilities cohesive (single purpose per module)?
- [ ] Are cross-cutting concerns separated (logging, auth, errors)?

### Patterns & Consistency
- [ ] Does it follow established project patterns?
- [ ] Are similar problems solved similarly?
- [ ] Are anti-patterns avoided (god objects, circular deps, leaky abstractions)?

### Extensibility
- [ ] Can known future needs be accommodated without rewrite?
- [ ] Are extension points explicit (interfaces, plugins, events)?
- [ ] Is configuration separated from code?

### Abstraction Level
- [ ] Are abstractions at the right level (not too abstract, not too concrete)?
- [ ] Do interfaces hide implementation details?
- [ ] Is the "happy path" simple?

## Severity Guide
- **Critical:** Fundamental boundary violation, unmaintainable structure
- **High:** Tight coupling, leaky abstractions, pattern violations
- **Medium:** Missed abstraction opportunity, inconsistent patterns
- **Low:** Minor structural improvement possible
- **Informational:** Alternative pattern worth considering

## Evidence Required
- Architecture decision record (if applicable)
- Dependency graph or boundary diagram
- Pattern conformance examples