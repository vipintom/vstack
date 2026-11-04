import { gates } from './opencode-gates';

export const gateCardProps = gates.map(gate => ({
  title: gate.name,
  description: gate.description,
  actionLabel: 'View',
  actionHref: '/opencode-plugin/gates/' + gate.slug + '/',
  badgeLabels: ['Gate'],
  badgeVariants: ['warn'],
}));

export const emptyState = gates.length === 0;

export const docTitle = "Gates - OpenCode Plugin";
export const docDescription = "Quality gates for the vstack OpenCode plugin";
export const docSidebarTitle = "OpenCode Plugin";