/**
 * vstack Tools - Main export
 * Registers all tools under vstack_* namespace
 */
export interface VstackTool {
    name: string;
    description: string;
    input: Record<string, unknown>;
    execute: (input: any, context: any) => Promise<{
        content: string;
    }>;
}
export declare const vstackTools: VstackTool[];
/**
 * Get all tools grouped by namespace
 */
export declare const toolsByNamespace: {
    delivery: VstackTool[];
    workflow: VstackTool[];
    task: VstackTool[];
    agent: VstackTool[];
    quality: VstackTool[];
    review: VstackTool[];
    release: VstackTool[];
};
/**
 * Get tool by name
 */
export declare function getToolByName(name: string): VstackTool | undefined;
/**
 * Get all tool names
 */
export declare const allToolNames: string[];
//# sourceMappingURL=index.d.ts.map