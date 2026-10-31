---
name: vstack-release
description: "Version strategy, release notes, packaging and release candidate preparation. Use to prepare and validate releases."
---

# Skill: vstack-release

Use this skill when preparing a release: version selection, changelog generation, artifact validation, and release candidate preparation.

## When to Use

- Preparing a release candidate
- Selecting version number
- Generating release notes
- Validating release artifacts
- Creating release tags

## Procedure

1. **Determine Version**
   - Review changes since last release
   - Apply semantic versioning (major/minor/patch)
   - Confirm with lead/stakeholders

2. **Generate Release Notes**
   - Collect changes from workflow history, commits, PRs
   - Categorize: features, fixes, breaking changes, dependencies
   - Write user-facing summary
   - Include migration notes for breaking changes

3. **Validate Release Candidate**
   - Run full test suite
   - Run lint, typecheck, security scans
   - Verify build artifacts
   - Check packaging and signatures

4. **Prepare Artifacts**
   - Build distribution packages
   - Generate checksums and signatures
   - Create release notes file
   - Prepare deployment manifests

5. **Approval and Publishing**
   - Obtain required approvals
   - Create release tag
   - Publish to package registry (with approval)
   - Update version references

## Inputs

- Completed delivery with passing gates
- Commit history and workflow records
- Build and test results

## Outputs

- Version number
- Release notes (CHANGELOG.md, GitHub Release)
- Validated artifacts
- Release tag
- Published packages (after approval)

## Safety and Approval

- **Publishing requires explicit human approval**
- Version selection should be confirmed
- Release candidate must pass all quality gates
- Rollback plan should exist

## Fallback (No vstack Plugin)

- Use standard release tools (changesets, semantic-release)
- Follow project release process
- Manual approval steps