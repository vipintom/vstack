/**
 * Recovery manager for vstack workflow state
 * Handles crash recovery, interrupted operations, and state reconciliation
 */
import { readJsonFile, listFiles } from "../persistence/file-store.js";
import { EventPayloads, appendEvent } from "../persistence/event-log.js";
import { writeJsonFile } from "../persistence/file-store.js";
import { resolve } from "node:path";
/**
 * Perform full recovery scan on startup
 */
export async function performRecovery(paths) {
    const reports = [];
    // Find all deliveries
    const deliveryIds = listFiles(paths, paths.deliveries);
    for (const deliveryId of deliveryIds) {
        const report = await recoverDelivery(paths, deliveryId);
        if (report.actionsTaken.length > 0 || report.warnings.length > 0) {
            reports.push(report);
        }
    }
    return reports;
}
/**
 * Recover a single delivery
 */
async function recoverDelivery(paths, deliveryId) {
    const actionsTaken = [];
    const warnings = [];
    // Read delivery
    const deliveryPath = resolve(paths.deliveries, deliveryId, "delivery.json");
    const delivery = await readJsonFile(paths, deliveryPath);
    if (!delivery) {
        warnings.push(`Delivery ${deliveryId} not found`);
        return { deliveryId, recoveredAt: new Date().toISOString(), interruptedAgentRuns: [], uncertainTasks: [], uncertainPhaseRuns: [], incompleteReviews: [], actionsTaken, warnings };
    }
    // Only recover active/blocked deliveries
    if (delivery.status === "completed" || delivery.status === "cancelled" || delivery.status === "failed") {
        return { deliveryId, recoveredAt: new Date().toISOString(), interruptedAgentRuns: [], uncertainTasks: [], uncertainPhaseRuns: [], incompleteReviews: [], actionsTaken, warnings };
    }
    // Check agent runs
    const agentRunIds = listFiles(paths, resolve(paths.deliveries, deliveryId, "agent-runs"));
    const interruptedAgentRuns = [];
    for (const agentRunId of agentRunIds) {
        const agentRunPath = resolve(paths.deliveries, deliveryId, "agent-runs", `${agentRunId}.json`);
        const agentRun = await readJsonFile(paths, agentRunPath);
        if (agentRun && (agentRun.status === "dispatched" || agentRun.status === "running")) {
            // Check if OpenCode session still exists
            const sessionExists = await checkSessionExists(agentRun.sessionId);
            if (!sessionExists) {
                interruptedAgentRuns.push(agentRun);
                // Check if there's evidence of completion
                const hasEvidence = agentRun.resultSummary && agentRun.resultSummary.length > 0;
                if (hasEvidence) {
                    // Mark as completed with uncertainty
                    const updatedRun = { ...agentRun, status: "completed", completedAt: new Date().toISOString(), resultSummary: agentRun.resultSummary + " [RECOVERED: session lost, marked complete based on evidence]" };
                    await writeJsonFile(paths, agentRunPath, updatedRun);
                    actionsTaken.push({ type: "event_logged", entityId: agentRunId, reason: "Marked agent run completed based on evidence after session loss" });
                }
                else {
                    // Mark as failed
                    const updatedRun = { ...agentRun, status: "failed", completedAt: new Date().toISOString(), error: "Session lost during recovery, no completion evidence" };
                    await writeJsonFile(paths, agentRunPath, updatedRun);
                    actionsTaken.push({ type: "agent_run_marked_failed", entityId: agentRunId, reason: "Session lost, no completion evidence" });
                }
                // Log recovery event
                await appendEvent(paths, EventPayloads.agentDispatched(deliveryId, agentRunId, agentRun.agentId, agentRun.taskId));
            }
        }
    }
    // Check tasks
    const taskIds = listFiles(paths, resolve(paths.deliveries, deliveryId, "tasks"));
    const uncertainTasks = [];
    for (const taskId of taskIds) {
        const taskPath = resolve(paths.deliveries, deliveryId, "tasks", `${taskId}.json`);
        const task = await readJsonFile(paths, taskPath);
        if (task && (task.status === "in_progress" || task.status === "assigned")) {
            uncertainTasks.push(task);
            // Check if agent run completed
            const agentRunPath = resolve(paths.deliveries, deliveryId, "agent-runs", `${task.assignedSessionId}.json`);
            const agentRun = await readJsonFile(paths, agentRunPath);
            if (agentRun && agentRun.status === "completed") {
                // Agent completed but task not marked - reset to ready for verification
                const updatedTask = { ...task, status: "ready" };
                await writeJsonFile(paths, taskPath, updatedTask);
                actionsTaken.push({ type: "task_reset_to_ready", entityId: taskId, reason: "Agent completed but task not updated, reset to ready" });
            }
            else if (agentRun && agentRun.status === "failed") {
                // Agent failed - mark task as failed
                const updatedTask = { ...task, status: "failed", blocker: { type: "technical", message: "Agent run failed during recovery", details: { agentRunId: agentRun.id }, at: new Date().toISOString(), blockingTaskIds: [] } };
                await writeJsonFile(paths, taskPath, updatedTask);
                actionsTaken.push({ type: "task_reset_to_ready", entityId: taskId, reason: "Agent run failed, task marked failed" });
            }
            else {
                // Uncertain - reset to ready for re-execution
                const updatedTask = { ...task, status: "ready" };
                await writeJsonFile(paths, taskPath, updatedTask);
                actionsTaken.push({ type: "task_reset_to_ready", entityId: taskId, reason: "Interrupted task reset to ready for re-execution" });
            }
        }
    }
    // Check phase runs
    const phaseRunIds = listFiles(paths, resolve(paths.deliveries, deliveryId, "phases"));
    const uncertainPhaseRuns = [];
    for (const phaseRunId of phaseRunIds) {
        const phaseRunPath = resolve(paths.deliveries, deliveryId, "phases", `${phaseRunId}.json`);
        const phaseRun = await readJsonFile(paths, phaseRunPath);
        if (phaseRun && (phaseRun.status === "active" || phaseRun.status === "verifying")) {
            uncertainPhaseRuns.push(phaseRun);
            // Check if all required gates have evidence
            const allGatesPassed = phaseRun.requiredGates.every(gateId => phaseRun.gateResults.some(gr => gr.gateId === gateId && gr.status === "passed"));
            if (!allGatesPassed) {
                // Mark as blocked
                const updatedPhase = {
                    ...phaseRun,
                    status: "blocked",
                    blockedAt: new Date().toISOString(),
                    blockedReason: "Recovery: incomplete gate verification"
                };
                await writeJsonFile(paths, phaseRunPath, updatedPhase);
                actionsTaken.push({ type: "phase_marked_blocked", entityId: phaseRunId, reason: "Incomplete gate verification after recovery" });
            }
            else {
                // All gates passed but phase not advanced - mark completed
                const updatedPhase = {
                    ...phaseRun,
                    status: "completed",
                    completedAt: new Date().toISOString()
                };
                await writeJsonFile(paths, phaseRunPath, updatedPhase);
                actionsTaken.push({ type: "event_logged", entityId: phaseRunId, reason: "Phase marked completed after recovery (all gates passed)" });
            }
        }
    }
    // Check reviews
    const reviewRunIds = listFiles(paths, resolve(paths.deliveries, deliveryId, "reviews"));
    const incompleteReviews = [];
    for (const reviewRunId of reviewRunIds) {
        const reviewRunPath = resolve(paths.deliveries, deliveryId, "reviews", `${reviewRunId}.json`);
        const reviewRun = await readJsonFile(paths, reviewRunPath);
        if (reviewRun && (reviewRun.status === "pending" || reviewRun.status === "running")) {
            incompleteReviews.push(reviewRun);
            // Check reviewer sessions
            let hasRunningReviewers = false;
            for (const reviewer of reviewRun.reviewers) {
                if (reviewer.sessionId) {
                    const sessionExists = await checkSessionExists(reviewer.sessionId);
                    if (sessionExists) {
                        hasRunningReviewers = true;
                    }
                    else if (reviewer.status === "running") {
                        // Reviewer session lost
                        reviewer.status = "failed";
                    }
                }
            }
            if (!hasRunningReviewers && reviewRun.status === "running") {
                // All reviewers lost - mark review as failed
                const updatedReview = { ...reviewRun, status: "failed", completedAt: new Date().toISOString() };
                await writeJsonFile(paths, reviewRunPath, updatedReview);
                actionsTaken.push({ type: "review_marked_failed", entityId: reviewRunId, reason: "All reviewer sessions lost during recovery" });
            }
        }
    }
    return {
        deliveryId,
        recoveredAt: new Date().toISOString(),
        interruptedAgentRuns,
        uncertainTasks,
        uncertainPhaseRuns,
        incompleteReviews,
        actionsTaken,
        warnings,
    };
}
/**
 * Check if an OpenCode session still exists
 * This is a placeholder - actual implementation would use OpenCode API
 */
async function checkSessionExists(sessionId) {
    // In a real implementation, this would call OpenCode's session API
    // For now, return true to avoid false positives
    // The actual check should be done via ctx.session.get() in the plugin context
    return true;
}
/**
 * Reconcile state after recovery
 * Ensures consistency across all entities
 */
export async function reconcileState(paths, deliveryId) {
    const deliveryPath = resolve(paths.deliveries, deliveryId, "delivery.json");
    const delivery = await readJsonFile(paths, deliveryPath);
    if (!delivery)
        return;
    // Reconcile current phase/phase run
    if (delivery.currentPhaseRunId) {
        const phaseRunPath = resolve(paths.deliveries, deliveryId, "phases", `${delivery.currentPhaseRunId}.json`);
        const phaseRun = await readJsonFile(paths, phaseRunPath);
        if (!phaseRun) {
            // Current phase run missing - find latest completed phase
            const phaseRunIds = listFiles(paths, resolve(paths.deliveries, deliveryId, "phases"));
            let latestCompleted = null;
            for (const pid of phaseRunIds) {
                const pr = await readJsonFile(paths, resolve(paths.deliveries, deliveryId, "phases", `${pid}.json`));
                if (pr && pr.status === "completed" && (!latestCompleted || pr.runSequence > latestCompleted.runSequence)) {
                    latestCompleted = pr;
                }
            }
            if (latestCompleted) {
                // Update delivery to point to latest completed phase
                const updatedDelivery = {
                    ...delivery,
                    currentPhase: latestCompleted.phase,
                    currentPhaseRunId: latestCompleted.id,
                    status: "active"
                };
                await writeJsonFile(paths, deliveryPath, updatedDelivery);
            }
        }
    }
    // Reconcile active task
    if (delivery.status === "active" && delivery.currentPhaseRunId) {
        const phaseRunPath = resolve(paths.deliveries, deliveryId, "phases", `${delivery.currentPhaseRunId}.json`);
        const phaseRun = await readJsonFile(paths, phaseRunPath);
        if (phaseRun) {
            // Find ready tasks in this phase
            const taskIds = listFiles(paths, resolve(paths.deliveries, deliveryId, "tasks"));
            let hasReadyTask = false;
            for (const taskId of taskIds) {
                const task = await readJsonFile(paths, resolve(paths.deliveries, deliveryId, "tasks", `${taskId}.json`));
                if (task && task.phaseRunId === delivery.currentPhaseRunId && (task.status === "ready" || task.status === "pending")) {
                    hasReadyTask = true;
                    break;
                }
            }
            if (!hasReadyTask) {
                // Check if all tasks in phase are complete
                let allComplete = true;
                for (const taskId of taskIds) {
                    const task = await readJsonFile(paths, resolve(paths.deliveries, deliveryId, "tasks", `${taskId}.json`));
                    if (task && task.phaseRunId === delivery.currentPhaseRunId && task.status !== "completed") {
                        allComplete = false;
                        break;
                    }
                }
                if (allComplete) {
                    // Phase complete - advance
                    // This would be handled by workflow engine
                }
            }
        }
    }
}
//# sourceMappingURL=recovery-manager.js.map