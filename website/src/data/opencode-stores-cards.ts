import { stores } from './opencode-stores';

export const storeCardProps = stores.map(store => ({
  title: store.name,
  description: store.description,
  actionLabel: 'View',
  actionHref: '/opencode-plugin/stores/' + store.slug + '/',
  badgeLabels: ['Store'],
  badgeVariants: ['pass'],
}));

export const emptyState = stores.length === 0;

export const docTitle = "Stores - OpenCode Plugin";
export const docDescription = "Persistent state stores for the vstack OpenCode plugin";
export const docSidebarTitle = "OpenCode Plugin";