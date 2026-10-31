/**
 * Task assignment and agent matching
 * Matches tasks to appropriate agents based on skills, availability, and workload
 */
import { Task, TaskType, TaskId } from "../schemas/types.js";
export interface AgentProfile {
    id: string;
    name: string;
    type: "vstack-lead" | "vstack-architect" | "vstack-developer" | "vstack-test-engineer" | "vstack-reviewer" | "vstack-operator";
    skills: string[];
    maxConcurrentTasks: number;
    currentTasks: string[];
    availability: "available" | "busy" | "offline";
}
export interface AssignmentResult {
    taskId: TaskId;
    agentId: string;
    confidence: number;
    reason: string;
    alternatives: Array<{
        agentId: string;
        confidence: number;
        reason: string;
    }>;
}
export interface WorkloadReport {
    agentId: string;
    assignedTasks: number;
    maxConcurrent: number;
    utilization: number;
    queuedTasks: string[];
}
/**
 * Default agent profiles with their capabilities
 */
export declare const DEFAULT_AGENT_PROFILES: AgentProfile[];
/**
 * Task type to agent type mapping
 */
export declare const TASK_TYPE_AGENT_MAP: Record<TaskType, string[]>;
/**
 * Skill to agent type mapping
 */
export declare const SKILL_AGENT_MAP: Record<string, string[]>;
/**
 * Find best agent for a task
 */
export declare function findBestAgent(task: Task, availableAgents: AgentProfile[]): AssignmentResult;
/**
 * Assign multiple tasks optimally
 */
export declare function assignTasks(tasks: Task[], agents: AgentProfile[]): AssignmentResult[];
/**
 * Get workload report for all agents
 */
export declare function getWorkloadReport(agents: AgentProfile[]): WorkloadReport[];
/**
 * Rebalance workloads
 */
export declare function rebalanceWorkload(assignments: AssignmentResult[], agents: AgentProfile[], maxIterations?: number): AssignmentResult[];
/**
 * Check if agent can handle task type
 */
export declare function canAgentHandleTaskType(agent: AgentProfile, taskType: TaskType): boolean;
/**
 * Get required agent for task type (most specialized)
 */
export declare function getRequiredAgentForTaskType(taskType: TaskType): string | null;
//# sourceMappingURL=assignment.d.ts.map