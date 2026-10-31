/**
 * Load vstack skills from the @vstack/agents-skills content package.
 *
 * Skills are plain directories containing a SKILL.md with YAML frontmatter.
 * The loader walks nested role and workflow skill directories and returns
 * the values required by OpenCode's Skill.Info.
 */
export interface LoadedSkill {
    id: string;
    name: string;
    description?: string;
    autoinvoke?: boolean;
    path: string;
    content: string;
}
export declare function loadSkillsFromDirectory(skillsRoot: string): Promise<LoadedSkill[]>;
/**
 * Locate the agents-skills package or playbook. Checks an explicit override, the
 * project's node_modules, then the monorepo sibling layout used in development.
 */
export declare function findAgentsSkillsRoot(projectRoot: string, pluginRoot?: string): string | null;
//# sourceMappingURL=skill-loader.d.ts.map