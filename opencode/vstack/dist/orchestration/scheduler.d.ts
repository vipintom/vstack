/**
 * Task scheduler
 * Schedules tasks based on dependencies, priority, agent availability, and parallelism limits
 */
import { Task, TaskId } from "../schemas/types.js";
import { AgentProfile } from "../tasks/assignment.js";
export type TaskPriority = "low" | "medium" | "high" | "critical";
export interface SchedulerConfig {
    maxConcurrentTasks: number;
    maxConcurrentAgents: number;
    priorityWeights: Record<TaskPriority, number>;
    enableWorktreeIsolation: boolean;
    rebalanceInterval: number;
}
export interface ScheduledTask {
    taskId: TaskId;
    agentId: string;
    scheduledAt: string;
    estimatedDuration: number;
    priority: number;
    dependencies: TaskId[];
}
export interface ScheduleResult {
    scheduled: ScheduledTask[];
    deferred: TaskId[];
    conflicts: ScheduleConflict[];
    nextRunAt: string;
}
export interface ScheduleConflict {
    taskId: TaskId;
    type: "agent_overload" | "dependency_not_ready" | "worktree_conflict" | "resource_exhausted";
    message: string;
}
/**
 * Default scheduler configuration
 */
export declare const DEFAULT_SCHEDULER_CONFIG: SchedulerConfig;
/**
 * Create a task scheduler
 */
export declare function createScheduler(config?: Partial<SchedulerConfig>): {
    /**
     * Create a schedule for ready tasks
     */
    createSchedule(readyTasks: Task[], availableAgents: AgentProfile[], currentAssignments: Map<TaskId, {
        agentId: string;
        scheduledAt: string;
    }>): ScheduleResult;
    /**
     * Rebalance schedule (move tasks between agents)
     */
    rebalance(scheduled: ScheduledTask[], availableAgents: AgentProfile[]): ScheduleResult;
    /**
     * Check if rebalance is needed
     */
    shouldRebalance(scheduled: ScheduledTask[], availableAgents: AgentProfile[]): boolean;
    /**
     * Get next task to schedule
     */
    getNextTask(readyTasks: Task[], availableAgents: AgentProfile[]): Task | null;
};
/**
 * Get schedule statistics
 */
export declare function getScheduleStats(scheduled: ScheduledTask[], availableAgents: AgentProfile[]): {
    totalScheduled: number;
    agentUtilization: Record<string, {
        tasks: number;
        capacity: number;
        utilization: number;
    }>;
    averagePriority: number;
    estimatedTotalDuration: number;
};
//# sourceMappingURL=scheduler.d.ts.map