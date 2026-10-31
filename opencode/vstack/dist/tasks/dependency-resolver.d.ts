/**
 * Task dependency resolver
 * Handles topological sorting, critical path analysis, and scheduling
 */
import { Task, TaskType } from "../schemas/types.js";
export interface TopologicalOrder {
    ordered: Task[];
    levels: Task[][];
    hasCycles: boolean;
    cycles: string[][];
}
export interface CriticalPathResult {
    criticalPath: Task[];
    totalDuration: number;
    parallelizableGroups: Task[][];
    bottlenecks: Task[];
}
export interface SchedulePlan {
    tasks: ScheduledTask[];
    maxParallelism: number;
    estimatedDuration: number;
}
export interface ScheduledTask {
    task: Task;
    earliestStart: number;
    latestStart: number;
    slack: number;
    dependsOn: string[];
    parallelGroup: number;
}
/**
 * Perform topological sort on tasks
 */
export declare function topologicalSort(tasks: Task[]): TopologicalOrder;
/**
 * Calculate critical path
 */
export declare function calculateCriticalPath(tasks: Task[], durationEstimates: Map<string, number>): CriticalPathResult;
/**
 * Create schedule plan with parallelism limit
 */
export declare function createSchedulePlan(tasks: Task[], maxParallelism: number, durationEstimates: Map<string, number>): SchedulePlan;
/**
 * Estimate task duration based on type and complexity
 */
export declare function estimateTaskDuration(task: Task, baseEstimates: Map<TaskType, number>): number;
/**
 * Get default duration estimates for task types
 */
export declare function getDefaultDurationEstimates(): Map<TaskType, number>;
//# sourceMappingURL=dependency-resolver.d.ts.map