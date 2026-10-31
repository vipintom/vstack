---
name: vstack-operations
description: "Deployment, smoke checks, monitoring, rollback and post-release verification. Use for deployment and operational validation."
---

# Skill: vstack-operations

Use this skill when deploying to environments, running smoke tests, monitoring post-release health, or executing rollbacks.

## When to Use

- Deploying to staging or production
- Running post-deployment validation
- Monitoring release health
- Executing rollbacks
- Operational incident response

## Procedure

1. **Prepare Deployment**
   - Review deployment plan and rollback procedure
   - Verify release candidate is approved
   - Confirm target environment readiness
   - Obtain deployment approval (if required)

2. **Execute Deployment**
   - Follow deployment runbook
   - Apply migrations (with approval for destructive)
   - Deploy artifacts
   - Verify deployment success

3. **Run Smoke Tests**
   - Execute critical path tests
   - Verify health endpoints
   - Check key metrics
   - Validate user-facing functionality

4. **Monitor Post-Release**
   - Watch error rates, latency, traffic
   - Check alerting and dashboards
   - Verify business metrics
   - Document observations

5. **Rollback (if needed)**
   - Execute rollback procedure
   - Verify rollback success
   - Run smoke tests on rolled-back version
   - Communicate status

6. **Close Post-Release**
   - Confirm stability period passed
   - Record post-release evidence
   - Update runbooks if needed
   - Communicate completion

## Inputs

- Approved release candidate
- Deployment plan and rollback procedure
- Environment access and credentials

## Outputs

- Deployment records
- Smoke test results
- Health monitoring observations
- Rollback records (if executed)
- Post-release summary

## Safety and Approval

- **Production deployment requires explicit human approval**
- Destructive migrations require explicit approval
- Rollback with external impact requires approval
- Operator role has scoped permissions for these operations

## Fallback (No vstack Plugin)

- Use standard deployment tools (CI/CD, scripts)
- Follow project deployment process
- Manual approval gates