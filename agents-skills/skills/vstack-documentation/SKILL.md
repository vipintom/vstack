---
name: vstack-documentation
description: "README, API docs, architecture docs, ADRs, migrations and changelogs. Use to create and maintain project documentation."
---

# Skill: vstack-documentation

Use this skill when creating or updating documentation: READMEs, API documentation, architecture documents, ADRs, migration guides, and changelogs.

## When to Use

- Creating project or module READMEs
- Documenting APIs and interfaces
- Writing architecture decision records
- Creating migration guides
- Generating changelogs
- Updating docs after implementation

## Procedure

1. **Identify Documentation Needs**
   - What changed that needs documentation?
   - Who is the audience?
   - What format and location?

2. **Write Clear Documentation**
   - Use consistent structure and tone
   - Include: purpose, usage, examples, constraints
   - Keep it close to the code it documents
   - Link to related docs

3. **Documentation Types**
   - **README**: Project overview, setup, usage, contributing
   - **API Docs**: Endpoints, parameters, responses, errors
   - **Architecture Docs**: System design, data flows, decisions
   - **ADRs**: Context, decision, consequences, alternatives
   - **Migration Guides**: Version changes, breaking changes, steps
   - **Changelogs**: User-facing changes, grouped by type

4. **Review and Validate**
   - Verify accuracy against implementation
   - Check links and examples work
   - Ensure accessibility and clarity

## Inputs

- Implementation changes
- Design decisions
- API contracts
- Release notes

## Outputs

- Updated documentation files
- ADRs in `docs/adr/`
- Changelog entries
- Migration guides

## Safety and Approval

- Documentation changes follow standard review process
- Public API docs may require additional review

## Fallback (No vstack Plugin)

- Write docs in project's standard locations
- Follow project documentation conventions