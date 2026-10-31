/**
 * Simplified Task Store
 *
 * CRUD + dependencies for tasks without phase coupling.
 * Works with simplified delivery model.
 */
import { VstackPaths } from "../persistence/repository-root.js";
import { Task, TaskId, TaskStatus, TaskType } from "../schemas/types.js";
export interface TaskStore {
    createTask(params: CreateTaskParams): Promise<Task>;
    getTask(taskId: TaskId): Promise<Task | null>;
    listTasks(deliveryId: string, filters?: TaskFilters): Promise<Task[]>;
    updateTask(taskId: TaskId, updates: TaskUpdates): Promise<Task>;
    deleteTask(taskId: TaskId): Promise<void>;
    addDependency(taskId: TaskId, dependsOnTaskId: TaskId): Promise<Task>;
    removeDependency(taskId: TaskId, dependsOnTaskId: TaskId): Promise<Task>;
    getReadyTasks(deliveryId: string): Promise<Task[]>;
    getTaskDependencies(taskId: TaskId): Promise<TaskId[]>;
    getTaskDependents(deliveryId: string, taskId: TaskId): Promise<TaskId[]>;
}
export interface CreateTaskParams {
    deliveryId: string;
    title: string;
    description: string;
    type: TaskType;
    priority: "low" | "medium" | "high" | "critical";
    dependencies: TaskId[];
    acceptanceCriteria: string[];
    expectedOutputs: string[];
    requiredSkills: string[];
    workScope: string;
    worktreePath: string | null;
    maxAttempts: number;
    assignedAgentId: string | null;
}
export interface TaskFilters {
    status?: TaskStatus[];
    type?: TaskType[];
    assignedAgentId?: string;
}
export interface TaskUpdates {
    title?: string;
    description?: string;
    status?: TaskStatus;
    priority?: Task["priority"];
    acceptanceCriteria?: string[];
    expectedOutputs?: string[];
    workScope?: string;
    worktreePath?: string | null;
    resultSummary?: string;
    evidenceIds?: string[];
    dependencies?: TaskId[];
    assignedAgentId?: string;
    assignedSessionId?: string;
}
export declare function createTaskStore(paths: VstackPaths): Promise<TaskStore>;
//# sourceMappingURL=task-store.d.ts.map