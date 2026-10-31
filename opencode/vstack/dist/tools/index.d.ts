/**
 * vstack Tools - Main export
 * Registers ~7 cohesive tools under vstack_* namespace
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
export declare const toolsByNamespace: {
    status: VstackTool[];
    memory: VstackTool[];
    history: VstackTool[];
    delivery: VstackTool[];
    task: VstackTool[];
    agent: VstackTool[];
    check: VstackTool[];
};
export declare function getToolByName(name: string): VstackTool | undefined;
export declare const allToolNames: string[];
//# sourceMappingURL=index.d.ts.map