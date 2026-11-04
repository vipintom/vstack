import { getCollection } from 'astro:content';

export async function getResourceCardProps() {
  const resources = await getCollection('resources');
  return resources.map(resource => ({
    title: resource.data.name,
    description: resource.data.description || 'Resource documentation',
    actionLabel: 'View',
    actionHref: '/playbook/resources/' + resource.slug + '/',
    badgeLabels: [resource.data.category || 'reference'],
    badgeVariants: ['info'],
  }));
}

export async function getResourcesEmptyState() {
  const resources = await getCollection('resources');
  return resources.length === 0;
}

export const docTitle = "Resources - vstack Playbook";
export const docDescription = "Reference materials, templates, and rubrics";
export const docSidebarTitle = "Playbook";