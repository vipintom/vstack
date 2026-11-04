import { agents } from './opencode-agents';

export const agentCardProps = agents.map(agent => ({
  title: agent.name,
  description: agent.description,
  actionLabel: 'View',
  actionHref: '/opencode-plugin/agents/' + agent.slug + '/',
  badgeLabels: ['Agent'],
  badgeVariants: ['info'],
}));

export const emptyState = agents.length === 0;

export const docTitle = "Agents - OpenCode Plugin";
export const docDescription = "Specialist agents for the vstack OpenCode plugin";
export const docSidebarTitle = "OpenCode Plugin";