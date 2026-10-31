/**
 * Task service for vstack workflow
 * Manages task creation, assignment, dependencies, and state transitions
 */
import { Task, TaskId, TaskStatus, TaskType, EvidenceId, DeliveryId } from "../schemas/types.js";
import { VstackPaths } from "../persistence/repository-root.js";
export interface TaskService {
    createTask(params: CreateTaskParams): Promise<Task>;
    getTask(taskId: TaskId): Promise<Task | null>;
    listTasks(deliveryId: DeliveryId, filters?: TaskFilters): Promise<Task[]>;
    updateTask(taskId: TaskId, updates: TaskUpdates): Promise<Task>;
    assignTask(taskId: TaskId, agentId: string, sessionId: string): Promise<Task>;
    completeTask(taskId: TaskId, resultSummary: string, evidenceIds: EvidenceId[]): Promise<Task>;
    blockTask(taskId: TaskId, blocker: TaskBlocker): Promise<Task>;
    unblockTask(taskId: TaskId): Promise<Task>;
    addDependency(taskId: string, dependsOnTaskId: string): Promise<Task>;
    removeDependency(taskId: string, dependsOnTaskId: string): Promise<Task>;
    getReadyTasks(deliveryId: string, phaseRunId: string): Promise<Task[]>;
    getTaskDependencies(taskId: string): Promise<TaskId[]>;
    getTaskDependents(taskId: string): Promise<TaskId[]>;
}
export interface CreateTaskParams {
    deliveryId: string;
    phaseRunId: string;
    title: string;
    description: string;
    type: TaskType;
    priority: Task["priority"];
    dependencies: TaskId[];
    acceptanceCriteria: string[];
    expectedOutputs: string[];
    requiredSkills: string[];
    workScope: string;
    worktreePath: string | null;
    maxAttempts: number;
    ownerAgentId: string | null;
}
export interface TaskFilters {
    status?: TaskStatus[];
    type?: TaskType[];
    phaseRunId?: string;
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
    evidenceIds?: EvidenceId[];
    dependencies?: TaskId[];
    blocker?: Task["blocker"];
    assignedAgentId?: string;
    assignedSessionId?: string;
}
export interface TaskBlocker {
    type: "dependency" | "external" | "resource" | "approval" | "technical" | "other";
    message: string;
    details: Record<string, unknown>;
    blockingTaskIds: TaskId[];
}
export declare function createTaskService(paths: VstackPaths): Promise<TaskService>;
export declare function canTaskTransition(from: TaskStatus, to: TaskStatus): boolean;
/**
 * Get task execution order (topological sort)
 */
export declare function getTaskExecutionOrder(tasks: Task[]): Task[];
//# sourceMappingURL=task-service.d.ts.map