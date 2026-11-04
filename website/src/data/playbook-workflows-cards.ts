import { getCollection } from 'astro:content';

export async function getWorkflowCardProps() {
  const workflows = await getCollection('workflows');
  return workflows.map(workflow => ({
    title: workflow.data.name,
    description: workflow.data.description,
    actionLabel: 'View',
    actionHref: '/playbook/workflows/' + workflow.slug + '/',
    badgeLabels: [workflow.data.riskLevel || 'Medium'],
    badgeVariants: workflow.data.riskLevel === 'Low' ? ['pass'] : workflow.data.riskLevel === 'High' ? ['warn'] : ['info'],
  }));
}

export async function getWorkflowsEmptyState() {
  const workflows = await getCollection('workflows');
  return workflows.length === 0;
}

export const docTitle = "Workflows - vstack Playbook";
export const docDescription = "18 workflows for common engineering scenarios";
export const docSidebarTitle = "Playbook";