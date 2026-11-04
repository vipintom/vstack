import { getCollection } from 'astro:content';

export async function getPrincipleCardProps() {
  const principles = await getCollection('principles');
  return principles.map(principle => ({
    title: principle.data.name,
    description: principle.data.statement,
    actionLabel: 'View',
    actionHref: '/playbook/principles/' + principle.slug + '/',
    badgeLabels: ['Principle'],
    badgeVariants: ['pass'],
  }));
}

export async function getPrinciplesEmptyState() {
  const principles = await getCollection('principles');
  return principles.length === 0;
}

export const docTitle = "Principles - vstack Playbook";
export const docDescription = "17 engineering principles that guide vstack";
export const docSidebarTitle = "Playbook";