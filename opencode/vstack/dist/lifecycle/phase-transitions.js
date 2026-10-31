/**
 * Phase transition validation and execution
 * Enforces valid state transitions and gate requirements
 */
import { phaseRunId } from "../schemas/types.js";
import { readJsonFile, writeJsonFile } from "../persistence/file-store.js";
import { appendEvent, EventPayloads } from "../persistence/event-log.js";
import { getProfile, getNextPhase, getRequiredGates, canSkipPhase } from "./profiles.js";
import { resolve } from "node:path";
/**
 * Valid phase transitions (from -> allowed to)
 */
const VALID_PHASE_TRANSITIONS = {
    intake: ["discovery", "design", "planning", "implementation"],
    discovery: ["design", "planning", "implementation", "intake"],
    design: ["planning", "implementation", "discovery", "release_preparation"],
    planning: ["implementation", "design", "discovery"],
    implementation: ["validation", "planning", "design"],
    validation: ["review", "implementation", "planning"],
    review: ["release_preparation", "validation", "implementation", "deployment"],
    release_preparation: ["deployment", "validation", "review", "post_release"],
    deployment: ["post_release", "release_preparation", "review"],
    post_release: ["completed", "deployment", "release_preparation"],
    completed: [],
};
/**
 * Validate if a phase transition is allowed
 */
export function canTransitionPhase(fromPhase, toPhase) {
    return VALID_PHASE_TRANSITIONS[fromPhase]?.includes(toPhase) ?? false;
}
/**
 * Check if all required gates for a phase are satisfied
 */
export async function checkPhaseGates(paths, deliveryId, phaseRunId, profileId) {
    const profile = getProfile(profileId);
    const phaseRunPath = resolve(paths.deliveries, deliveryId, "phases", `${phaseRunId}.json`);
    const phaseRun = await readJsonFile(paths, phaseRunPath);
    if (!phaseRun) {
        return { satisfied: false, missingGates: ["other"] };
    }
    const requiredGates = getRequiredGates(profileId, phaseRun.phase);
    const missingGates = [];
    for (const gateId of requiredGates) {
        const gateResult = phaseRun.gateResults.find(gr => gr.gateId === gateId);
        if (!gateResult || gateResult.status !== "passed") {
            missingGates.push(gateId);
        }
    }
    return { satisfied: missingGates.length === 0, missingGates };
}
/**
 * Request a phase transition
 */
export async function requestPhaseTransition(paths, context, targetPhase, options = {}) {
    const { delivery, currentPhaseRun, profileId, actorId, actorType, sessionId, toolId } = context;
    // Validate transition
    if (!canTransitionPhase(delivery.currentPhase, targetPhase)) {
        return {
            success: false,
            message: `Invalid phase transition: ${delivery.currentPhase} -> ${targetPhase}`,
        };
    }
    // Check if skipping a required phase
    if (targetPhase !== getNextPhase(profileId, delivery.currentPhase)) {
        const profile = getProfile(profileId);
        const skippedPhases = profile.phases
            .slice(profile.phases.findIndex(p => p.phase === delivery.currentPhase) + 1, profile.phases.findIndex(p => p.phase === targetPhase))
            .filter(p => p.required);
        if (skippedPhases.length > 0 && !options.skipGates) {
            return {
                success: false,
                message: `Cannot skip required phases: ${skippedPhases.map(p => p.phase).join(", ")}. Use skipGates option with reason.`,
                requiredGates: skippedPhases.flatMap(p => p.requiredGates),
            };
        }
    }
    // Check gates for current phase (if not skipping)
    if (!options.skipGates && currentPhaseRun) {
        const { satisfied, missingGates } = await checkPhaseGates(paths, delivery.id, currentPhaseRun.id, profileId);
        if (!satisfied) {
            return {
                success: false,
                message: `Required gates not satisfied for phase ${delivery.currentPhase}: ${missingGates.join(", ")}`,
                requiredGates: getRequiredGates(profileId, delivery.currentPhase),
                missingGates,
            };
        }
    }
    // Check approval requirement
    const targetPhaseReq = getProfile(profileId).phases.find(p => p.phase === targetPhase);
    if (targetPhaseReq?.approvalRequired && !options.skipApproval) {
        return {
            success: false,
            message: `Approval required for phase ${targetPhase}`,
            approvalRequired: true,
            approvalType: targetPhaseReq.approvalType,
            newPhase: targetPhase,
        };
    }
    // Check if phase can be skipped
    if (targetPhase !== getNextPhase(profileId, delivery.currentPhase)) {
        if (!canSkipPhase(profileId, targetPhase)) {
            return {
                success: false,
                message: `Phase ${targetPhase} cannot be skipped in profile ${profileId}`,
            };
        }
        if (!options.skipReason) {
            return {
                success: false,
                message: `Skip reason required for phase ${targetPhase}`,
            };
        }
    }
    // Execute transition
    return await executePhaseTransition(paths, context, targetPhase, options);
}
/**
 * Execute a validated phase transition
 */
async function executePhaseTransition(paths, context, targetPhase, options) {
    const { delivery, currentPhaseRun, profileId, actorId, actorType, sessionId, toolId } = context;
    // Create new phase run
    const profile = getProfile(profileId);
    const targetPhaseReq = profile.phases.find(p => p.phase === targetPhase);
    const runSequence = (currentPhaseRun?.runSequence ?? 0) + 1;
    const newPhaseRun = {
        schemaVersion: 1,
        id: phaseRunId(`phrun_${crypto.randomUUID().replace(/-/g, "").slice(0, 16)}`),
        deliveryId: delivery.id,
        phase: targetPhase,
        runSequence,
        status: "not_started",
        startedAt: null,
        completedAt: null,
        blockedAt: null,
        blockedReason: null,
        approvalRequired: targetPhaseReq?.approvalRequired ?? false,
        approvalId: null,
        gateResults: [],
        requiredGates: targetPhaseReq?.requiredGates ?? [],
        optionalGates: targetPhaseReq?.optionalGates ?? [],
        skipReason: options.skipReason ?? null,
        skipBy: options.skipReason ? actorId : null,
        revision: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };
    // Write new phase run
    const phaseRunPath = resolve(paths.deliveries, delivery.id, "phases", `${newPhaseRun.id}.json`);
    await writeJsonFile(paths, phaseRunPath, newPhaseRun);
    // Complete current phase run if exists
    if (currentPhaseRun) {
        const completedPhaseRun = {
            ...currentPhaseRun,
            status: options.skipReason ? "skipped" : "completed",
            completedAt: new Date().toISOString(),
            skipReason: options.skipReason ?? currentPhaseRun.skipReason,
            skipBy: options.skipReason ? actorId : currentPhaseRun.skipBy,
            revision: currentPhaseRun.revision + 1,
            updatedAt: new Date().toISOString(),
        };
        await writeJsonFile(paths, phaseRunPath.replace(newPhaseRun.id, currentPhaseRun.id), completedPhaseRun);
    }
    // Update delivery
    const updatedDelivery = {
        ...delivery,
        currentPhase: targetPhase,
        currentPhaseRunId: newPhaseRun.id,
        status: targetPhase === "completed" ? "completed" : "active",
        updatedAt: new Date().toISOString(),
        revision: delivery.revision + 1,
    };
    const deliveryPath = resolve(paths.deliveries, delivery.id, "delivery.json");
    await writeJsonFile(paths, deliveryPath, updatedDelivery);
    // Log event
    await appendEvent(paths, {
        ...EventPayloads.phaseAdvanced(delivery.id, currentPhaseRun?.id ?? "", newPhaseRun.id, delivery.currentPhase, targetPhase),
        actor: { type: actorType, id: actorId },
        source: { sessionId: sessionId ?? null, toolId: toolId ?? null },
    });
    return {
        success: true,
        message: `Transitioned to ${targetPhase}`,
        newPhase: targetPhase,
        newPhaseRunId: newPhaseRun.id,
    };
}
/**
 * Start a phase (mark as active)
 */
export async function startPhase(paths, deliveryId, phaseRunId, actorId, actorType, sessionId, toolId) {
    const phaseRunPath = resolve(paths.deliveries, deliveryId, "phases", `${phaseRunId}.json`);
    const phaseRun = await readJsonFile(paths, phaseRunPath);
    if (!phaseRun) {
        return { success: false, message: "Phase run not found" };
    }
    if (phaseRun.status !== "not_started" && phaseRun.status !== "ready") {
        return { success: false, message: `Cannot start phase in status: ${phaseRun.status}` };
    }
    const updatedPhaseRun = {
        ...phaseRun,
        status: "active",
        startedAt: new Date().toISOString(),
        revision: phaseRun.revision + 1,
        updatedAt: new Date().toISOString(),
    };
    await writeJsonFile(paths, phaseRunPath, updatedPhaseRun);
    // Update delivery if this is the current phase
    const deliveryPath = resolve(paths.deliveries, deliveryId, "delivery.json");
    const delivery = await readJsonFile(paths, deliveryPath);
    if (delivery && delivery.currentPhaseRunId === phaseRunId) {
        const updatedDelivery = {
            ...delivery,
            status: "active",
            updatedAt: new Date().toISOString(),
            revision: delivery.revision + 1,
        };
        await writeJsonFile(paths, deliveryPath, updatedDelivery);
    }
    await appendEvent(paths, {
        ...EventPayloads.phaseEntered(deliveryId, phaseRunId, phaseRun.phase),
        actor: { type: actorType, id: actorId },
        source: { sessionId: sessionId ?? null, toolId: toolId ?? null },
    });
    return { success: true, message: `Started phase ${phaseRun.phase}` };
}
/**
 * Block a phase
 */
export async function blockPhase(paths, deliveryId, phaseRunId, reason, actorId, actorType, sessionId, toolId) {
    const phaseRunPath = resolve(paths.deliveries, deliveryId, "phases", `${phaseRunId}.json`);
    const phaseRun = await readJsonFile(paths, phaseRunPath);
    if (!phaseRun) {
        return { success: false, message: "Phase run not found" };
    }
    if (phaseRun.status === "completed" || phaseRun.status === "skipped" || phaseRun.status === "cancelled") {
        return { success: false, message: `Cannot block phase in status: ${phaseRun.status}` };
    }
    const updatedPhaseRun = {
        ...phaseRun,
        status: "blocked",
        blockedAt: new Date().toISOString(),
        blockedReason: reason,
        revision: phaseRun.revision + 1,
        updatedAt: new Date().toISOString(),
    };
    await writeJsonFile(paths, phaseRunPath, updatedPhaseRun);
    // Update delivery status
    const deliveryPath = resolve(paths.deliveries, deliveryId, "delivery.json");
    const delivery = await readJsonFile(paths, deliveryPath);
    if (delivery && delivery.currentPhaseRunId === phaseRunId) {
        const updatedDelivery = {
            ...delivery,
            status: "blocked",
            updatedAt: new Date().toISOString(),
            revision: delivery.revision + 1,
        };
        await writeJsonFile(paths, deliveryPath, updatedDelivery);
    }
    await appendEvent(paths, {
        ...EventPayloads.phaseEntered(deliveryId, phaseRunId, phaseRun.phase, { type: actorType, id: actorId }, { type: "phase", id: phaseRunId }, { sessionId: sessionId ?? null, toolId: toolId ?? null }),
        eventType: "phase_blocked",
        payload: { phaseRunId, reason, phase: phaseRun.phase },
    });
    return { success: true, message: `Phase blocked: ${reason}` };
}
/**
 * Unblock a phase
 */
export async function unblockPhase(paths, deliveryId, phaseRunId, actorId, actorType, sessionId, toolId) {
    const phaseRunPath = resolve(paths.deliveries, deliveryId, "phases", `${phaseRunId}.json`);
    const phaseRun = await readJsonFile(paths, phaseRunPath);
    if (!phaseRun) {
        return { success: false, message: "Phase run not found" };
    }
    if (phaseRun.status !== "blocked") {
        return { success: false, message: `Phase not blocked, current status: ${phaseRun.status}` };
    }
    const previousStatus = phaseRun.startedAt ? "active" : "ready";
    const updatedPhaseRun = {
        ...phaseRun,
        status: previousStatus,
        blockedAt: null,
        blockedReason: null,
        revision: phaseRun.revision + 1,
        updatedAt: new Date().toISOString(),
    };
    await writeJsonFile(paths, phaseRunPath, updatedPhaseRun);
    // Update delivery status
    const deliveryPath = resolve(paths.deliveries, deliveryId, "delivery.json");
    const delivery = await readJsonFile(paths, deliveryPath);
    if (delivery && delivery.currentPhaseRunId === phaseRunId) {
        const updatedDelivery = {
            ...delivery,
            status: "active",
            updatedAt: new Date().toISOString(),
            revision: delivery.revision + 1,
        };
        await writeJsonFile(paths, deliveryPath, updatedDelivery);
    }
    await appendEvent(paths, {
        ...EventPayloads.phaseEntered(deliveryId, phaseRunId, phaseRun.phase, { type: actorType, id: actorId }, { type: "phase", id: phaseRunId }, { sessionId: sessionId ?? null, toolId: toolId ?? null }),
        eventType: "phase_advanced",
        payload: { phaseRunId, phase: phaseRun.phase, action: "unblocked" },
    });
    return { success: true, message: `Phase unblocked, resumed to ${previousStatus}` };
}
/**
 * Get valid next phases for current phase in profile
 */
export function getValidNextPhases(profileId, currentPhase) {
    return VALID_PHASE_TRANSITIONS[currentPhase] ?? [];
}
//# sourceMappingURL=phase-transitions.js.map