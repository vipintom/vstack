import { getCollection } from 'astro:content';

export async function getSkillCardProps() {
  const skills = await getCollection('skills');
  return skills.map(skill => ({
    title: skill.data.name,
    description: skill.data.description,
    actionLabel: 'View',
    actionHref: '/playbook/skills/' + skill.slug + '/',
    badgeLabels: [skill.data.category],
    badgeVariants: ['info'],
  }));
}

export async function getSkillsEmptyState() {
  const skills = await getCollection('skills');
  return skills.length === 0;
}

export const docTitle = "Skills - vstack Playbook";
export const docDescription = "All 55 skills in the vstack playbook";
export const docSidebarTitle = "Playbook";