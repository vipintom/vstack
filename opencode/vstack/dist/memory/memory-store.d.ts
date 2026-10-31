/**
 * Project Memory Store
 *
 * Curated project knowledge, distinct from runtime state and history.
 * Stores: project overview, architecture, conventions, decisions, lessons, handoffs.
 */
import { VstackPaths } from "../persistence/repository-root.js";
export type MemoryCategory = "overview" | "architecture" | "conventions" | "decisions" | "lessons" | "handoffs" | "constraints";
export interface MemoryItem {
    schemaVersion: 1;
    id: string;
    category: MemoryCategory;
    title: string;
    content: string;
    source?: string;
    tags: string[];
    status: "current" | "superseded";
    supersededBy?: string;
    createdAt: string;
    updatedAt: string;
    revision: number;
}
export interface MemoryIndex {
    schemaVersion: 1;
    items: MemoryItem[];
    updatedAt: string;
    revision: number;
}
export interface MemoryStore {
    listCategories(): Promise<MemoryCategory[]>;
    getCategoryIndex(category: MemoryCategory): Promise<MemoryItem[]>;
    createItem(category: MemoryCategory, item: Omit<MemoryItem, "id" | "schemaVersion" | "createdAt" | "updatedAt" | "status">): Promise<MemoryItem>;
    getItem(category: MemoryCategory, id: string): Promise<MemoryItem | null>;
    updateItem(category: MemoryCategory, id: string, updates: Partial<Omit<MemoryItem, "id" | "schemaVersion" | "createdAt">>): Promise<MemoryItem>;
    deleteItem(category: MemoryCategory, id: string): Promise<void>;
    supersedeItem(category: MemoryCategory, id: string, newItemId: string): Promise<void>;
    searchItems(query: string, categories?: MemoryCategory[]): Promise<MemoryItem[]>;
    getFullIndex(): Promise<MemoryIndex>;
    updateIndex(): Promise<void>;
}
export declare function createMemoryStore(paths: VstackPaths): Promise<MemoryStore>;
//# sourceMappingURL=memory-store.d.ts.map