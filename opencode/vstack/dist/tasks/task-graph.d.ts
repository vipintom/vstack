/**
 * Task graph management
 * Handles task graph creation, visualization, and analysis
 */
import { Task, TaskId } from "../schemas/types.js";
export interface TaskGraphNode {
    id: TaskId;
    task: Task;
    x?: number;
    y?: number;
    level: number;
}
export interface TaskGraphEdge {
    from: TaskId;
    to: TaskId;
    type: "depends_on" | "blocks" | "related";
}
export interface TaskGraph {
    nodes: TaskGraphNode[];
    edges: TaskGraphEdge[];
    metadata: {
        totalTasks: number;
        completed: number;
        inProgress: number;
        pending: number;
        blocked: number;
        failed: number;
        criticalPathLength: number;
        maxParallelism: number;
    };
}
export interface TaskGraphLayout {
    nodes: Map<TaskId, {
        x: number;
        y: number;
    }>;
    width: number;
    height: number;
}
/**
 * Build a task graph from tasks
 */
export declare function buildTaskGraph(tasks: Task[]): TaskGraph;
/**
 * Layout task graph for visualization
 */
export declare function layoutTaskGraph(graph: TaskGraph): TaskGraphLayout;
/**
 * Find all paths between two tasks
 */
export declare function findPaths(tasks: Task[], from: TaskId, to: TaskId): TaskId[][];
/**
 * Get all downstream tasks (transitive dependents)
 */
export declare function getDownstreamTasks(tasks: Task[], taskId: TaskId): Task[];
/**
 * Get all upstream tasks (transitive dependencies)
 */
export declare function getUpstreamTasks(tasks: Task[], taskId: TaskId): Task[];
/**
 * Find tasks that can run in parallel (no dependencies between them)
 */
export declare function findParallelizableGroups(tasks: Task[]): Task[][];
/**
 * Check if two tasks can run in parallel
 */
export declare function canRunInParallel(tasks: Task[], taskA: TaskId, taskB: TaskId): boolean;
/**
 * Export graph to DOT format for Graphviz
 */
export declare function exportToDot(graph: TaskGraph): string;
/**
 * Export graph to Mermaid format
 */
export declare function exportToMermaid(graph: TaskGraph): string;
/**
 * Alias for buildTaskGraph
 */
export declare const createTaskGraph: typeof buildTaskGraph;
/**
 * Get tasks that are ready to run (dependencies satisfied)
 */
export declare function getReadyTasks(tasks: Task[]): Task[];
/**
 * Get execution order (topological sort)
 */
export declare function getExecutionOrder(tasks: Task[]): Task[];
/**
 * Alias for findParallelizableGroups
 */
export declare const getParallelizableGroups: typeof findParallelizableGroups;
//# sourceMappingURL=task-graph.d.ts.map