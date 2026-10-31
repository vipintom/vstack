/**
 * Delivery lifecycle engine
 * Coordinates phase transitions, gate evaluation, and profile management
 */
import { VstackPaths } from "../persistence/repository-root.js";
import { Delivery, PhaseRun, DeliveryPhase, DeliveryStatus, ProfileId, EvidenceType, DeliveryId } from "../schemas/types.js";
import { TransitionResult } from "./phase-transitions.js";
export interface LifecycleEngine {
    createDelivery(params: CreateDeliveryParams): Promise<Delivery>;
    getDelivery(deliveryId: string): Promise<Delivery | null>;
    listDeliveries(filter?: DeliveryFilter): Promise<Delivery[]>;
    startDelivery(deliveryId: string, actorId: string, actorType: "plugin" | "agent" | "human", sessionId?: string): Promise<Delivery>;
    advancePhase(deliveryId: DeliveryId, targetPhase: DeliveryPhase, options: AdvanceOptions): Promise<TransitionResult>;
    blockPhase(deliveryId: DeliveryId, reason: string, actorId: string, actorType: "plugin" | "agent" | "human"): Promise<TransitionResult>;
    unblockPhase(deliveryId: DeliveryId, actorId: string, actorType: "plugin" | "agent" | "human"): Promise<TransitionResult>;
    finishDelivery(deliveryId: DeliveryId, actorId: string, actorType: "plugin" | "agent" | "human"): Promise<Delivery>;
    getPhaseStatus(deliveryId: DeliveryId): Promise<PhaseStatus>;
    evaluateGates(deliveryId: DeliveryId): Promise<GateEvaluation>;
    skipPhase(deliveryId: DeliveryId, targetPhase: DeliveryPhase, reason: string, actorId: string): Promise<TransitionResult>;
}
export interface CreateDeliveryParams {
    title: string;
    description: string;
    type: Delivery["type"];
    profile: ProfileId;
    acceptanceCriteria: string[];
    risk: Delivery["risk"];
    labels: string[];
    createdBy: string;
}
export interface DeliveryFilter {
    status?: DeliveryStatus[];
    profile?: ProfileId[];
    type?: Delivery["type"][];
    limit?: number;
    offset?: number;
}
export interface AdvanceOptions {
    skipGates?: boolean;
    skipApproval?: boolean;
    skipReason?: string;
    actorId: string;
    actorType: "plugin" | "agent" | "human";
    sessionId?: string;
    toolId?: string;
}
export interface PhaseStatus {
    delivery: Delivery;
    currentPhaseRun: PhaseRun | null;
    profile: ProfileId;
    nextPhases: DeliveryPhase[];
    gates: GateStatus[];
    blocked: boolean;
    blockReason: string | null;
    canAdvance: boolean;
    advanceBlockers: string[];
}
export interface GateStatus {
    gateId: EvidenceType;
    required: boolean;
    status: "passed" | "failed" | "pending" | "skipped";
    evidenceIds: string[];
    evaluatedAt: string | null;
}
export interface GateEvaluation {
    phase: DeliveryPhase;
    allRequiredPassed: boolean;
    gates: GateStatus[];
    missingRequired: EvidenceType[];
}
export declare function createLifecycleEngine(paths: VstackPaths): Promise<LifecycleEngine>;
//# sourceMappingURL=lifecycle-engine.d.ts.map