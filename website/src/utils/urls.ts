const BASE_URL = import.meta.env.BASE_URL;

/**
 * Prefix an internal path with Astro's configured base URL.
 *
 * GitHub Pages:
 *   /playbook/ -> /vstack/playbook/
 *
 * Root deployment:
 *   /playbook/ -> /playbook/
 */
export function withBase(path: string): string {
  const normalizedPath = path.replace(/^\/+/, '');
  return `${BASE_URL}${normalizedPath}`;
}