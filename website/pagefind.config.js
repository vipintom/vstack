/** @type {import('pagefind').PagefindConfig} */
export default {
  rootSelector: 'main',
  excludeSelectors: [
    'nav',
    'footer',
    '.nav',
    '.doc-sidebar',
    '.skip-link',
    '#search-ui',
    '.search-ui-container',
  ],
  glob: '**/*.html',
  verbose: false,
};