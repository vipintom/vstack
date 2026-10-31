/**
 * vstack OpenCode Plugin
 * Main entry point for the vstack workflow engine
 */
import { Plugin } from "@opencode/plugin";
import { vstackTools } from "./tools/index.js";
import { createLifecycleEngine } from "./lifecycle/lifecycle-engine.js";
import { createTaskService } from "./tasks/task-service.js";
import { createSessionTracker } from "./orchestration/session-tracker.js";
import { createAgentDispatch } from "./orchestration/agent-dispatch.js";
import { GateRegistry } from "./quality/gates.js";
import { createReviewOrchestrator } from "./reviews/review-orchestrator.js";
import { createReleaseManager } from "./release/release-preparation.js";
import { createDeploymentManager } from "./release/deployment.js";
import { createRollbackManager } from "./release/rollback.js";
import { createPostReleaseManager } from "./release/post-release.js";
import { createPolicyManager } from "./policy/permissions.js";
import { performRecovery } from "./recovery/recovery-manager.js";
import { resolveVstackRoot, ensureVstackDirs } from "./persistence/repository-root.js";
import { initializeEventLog } from "./persistence/event-log.js";
import { initializeRuntimeState, refreshRuntimeState } from "./runtime/state.js";
import { loadSkillsFromDirectory, findAgentsSkillsRoot } from "./skills/skill-loader.js";
import { installAgents } from "./agents/agent-installer.js";
import { join } from "node:path";
export default Plugin.define({
    id: "vstack",
    async setup(ctx) {
        const projectRoot = ctx.location.project.canonical || ctx.location.directory;
        const vstackRoot = await resolveVstackRoot(projectRoot);
        console.log(`[vstack] Initializing for project: ${projectRoot}`);
        // Ensure .vstack directories exist
        await ensureVstackDirs(vstackRoot);
        // Initialize event log
        await initializeEventLog(vstackRoot);
        // Initialize runtime state (manifest + dashboard index)
        const initialIndex = await initializeRuntimeState(vstackRoot);
        console.log(`[vstack] Dashboard index initialized: revision ${initialIndex.revision}`);
        // Initialize core services
        const lifecycleEngine = await createLifecycleEngine(vstackRoot);
        const taskService = await createTaskService(vstackRoot);
        const sessionTracker = await createSessionTracker(vstackRoot);
        const agentDispatchConfig = {
            defaultModel: null,
            maxSteps: { default: 50 },
            defaultPermissions: ["read", "glob", "grep", "edit", "shell", "tool", "subagent", "skill"],
            enableWorktrees: false,
        };
        const agentDispatch = createAgentDispatch(vstackRoot, agentDispatchConfig, ctx);
        const qualityGates = new GateRegistry();
        const reviewOrchestrator = createReviewOrchestrator(vstackRoot);
        const releaseManager = createReleaseManager(vstackRoot);
        const deploymentManager = createDeploymentManager(vstackRoot);
        const rollbackManager = createRollbackManager(vstackRoot);
        const postReleaseManager = createPostReleaseManager(vstackRoot);
        const policyManager = createPolicyManager(vstackRoot);
        // Load skills from agents-skills package
        const skillsRoot = findAgentsSkillsRoot(projectRoot, vstackRoot.root);
        if (skillsRoot) {
            const skills = await loadSkillsFromDirectory(join(skillsRoot, "skills"));
            console.log(`[vstack] Loaded ${skills.length} skills from ${skillsRoot}`);
            const skillRegistration = await ctx.skill.transform((editor) => {
                for (const skill of skills) {
                    editor.add({
                        id: skill.id,
                        name: skill.name,
                        description: skill.description,
                        autoinvoke: skill.autoinvoke,
                        path: skill.path,
                        content: skill.content,
                    });
                }
            });
        }
        // Install agent definitions from agents-skills
        if (skillsRoot) {
            const agentSourceDir = join(skillsRoot, "agents", "opencode-v2");
            const agentTargetDir = join(projectRoot, ".opencode", "agents");
            const statePath = join(vstackRoot.root, "agents.json");
            const result = await installAgents(agentSourceDir, agentTargetDir, statePath, "0.1.0");
            console.log(`[vstack] Agent install: ${result.installed.length} installed, ${result.updated.length} updated, ${result.unchanged.length} unchanged, ${result.skipped.length} skipped`);
            // Reload agents so OpenCode picks them up
            await ctx.agent.reload();
        }
        // Register tools
        const toolRegistration = await ctx.tool.transform((editor) => {
            editor.namespace({
                name: "vstack",
                description: "vstack workflow engine tools",
            });
            // Register all vstack tools
            for (const tool of vstackTools) {
                editor.add({
                    name: tool.name,
                    description: tool.description,
                    input: tool.input,
                    options: { namespace: "vstack" },
                    execute: async (input, context) => {
                        const result = await tool.execute(input, {
                            ...context,
                            vstack: {
                                lifecycleEngine,
                                taskService,
                                sessionTracker,
                                agentDispatch,
                                qualityGates,
                                reviewOrchestrator,
                                releaseManager,
                                deploymentManager,
                                rollbackManager,
                                postReleaseManager,
                                policyManager,
                                vstackRoot,
                            }
                        });
                        return { content: JSON.stringify(result) };
                    },
                });
            }
        });
        // Register slash commands
        const commandRegistration = await ctx.command.transform((editor) => {
            editor.add({
                name: "vstack",
                description: "Show vstack status and available actions",
                execute: async (invocation) => {
                    // Would show status
                },
            });
            editor.add({
                name: "vstack-start",
                description: "Start a new delivery workflow",
                execute: async (invocation) => {
                    // Would start workflow
                },
            });
            editor.add({
                name: "vstack-status",
                description: "Show current workflow status",
                execute: async (invocation) => {
                    // Would show status
                },
            });
            editor.add({
                name: "vstack-review",
                description: "Start a review cycle",
                execute: async (invocation) => {
                    // Would start review
                },
            });
            editor.add({
                name: "vstack-resume",
                description: "Resume interrupted workflow",
                execute: async (invocation) => {
                    // Would resume workflow
                },
            });
            editor.add({
                name: "vstack-report",
                description: "Generate delivery report",
                execute: async (invocation) => {
                    // Would generate report
                },
            });
        });
        // Session context hook - inject vstack context into agent sessions
        const sessionHook = await ctx.session.hook("context", async (event) => {
            // event is SessionContext - add workflow context
            // This runs before the model request is built
        });
        // Tool hook - record evidence and refresh dashboard index after vstack tool execution
        const toolHook = await ctx.tool.hook("execute.after", async (event) => {
            if (event.tool.startsWith("vstack_") && event.status === "completed") {
                // Refresh dashboard index so OpenChamber sees the update
                await refreshRuntimeState(vstackRoot);
            }
        });
        // Permission hook - enforce vstack approval policies
        const permissionHook = await ctx.permission.hook("evaluate", async (event) => {
            // Check if operation requires approval via policyManager
            // The actual enforcement happens in tool execution
        });
        // Run recovery on startup
        const recoveryResults = await performRecovery(vstackRoot);
        if (recoveryResults.length > 0) {
            console.log(`[vstack] Recovery completed: ${recoveryResults.length} deliveries recovered`);
        }
        // Cleanup on unload
        return () => {
            toolRegistration.dispose();
            commandRegistration.dispose();
            sessionHook.dispose();
            toolHook.dispose();
            permissionHook.dispose();
        };
    },
});
//# sourceMappingURL=index.js.map