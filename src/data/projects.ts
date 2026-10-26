import { getCollection } from "astro:content";

/** Projects to show, newest first. Drafts are included only in development. */
export const getProjects = async () =>
  (await getCollection("proiecte", ({ data }) => import.meta.env.DEV || !data.draft)).sort(
    (a, b) => b.data.year - a.data.year,
  );
