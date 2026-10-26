// The site can be served from a sub-path (GitHub Pages: /ONYXSecuritySolutions, set by `--base`
// in the deploy workflow). Root-relative links must go through `url()` to include it.
const base = import.meta.env.BASE_URL.replace(/\/$/, "");

/** Prefixes a root-relative path ("/contact#oferta") with the base path; other URLs pass through. */
export const url = (path: string) => (path.startsWith("/") ? `${base}${path}` : path);
