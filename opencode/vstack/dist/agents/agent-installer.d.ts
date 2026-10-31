/**
 * Agent definition installer.
 *
 * OpenCode loads agents from `.opencode/agents/*.md`. The plugin copies the
 * portable vstack agent wrappers into that directory, marks managed files,
 * and refuses to overwrite files the user has edited.
 */
export interface AgentInstallResult {
    version: string;
    installed: string[];
    updated: string[];
    unchanged: string[];
    skipped: Array<{
        file: string;
        reason: "user_customized" | "unmanaged_file";
    }>;
}
/**
 * Insert the managed marker after YAML frontmatter so OpenCode still parses
 * the agent definition correctly.
 */
export declare function markAgentContent(content: string, version: string): string;
export declare function installAgents(sourceDir: string, targetDir: string, statePath: string, version: string): Promise<AgentInstallResult>;
//# sourceMappingURL=agent-installer.d.ts.map