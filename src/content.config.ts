import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { serviceSlugs } from "./data/service-slugs";

// Completed installations shown on /proiecte and on the home page.
// One Markdown file per project in src/content/proiecte/; the body is the project description.
const proiecte = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/proiecte" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      /** One sentence for cards. */
      summary: z.string(),
      location: z.string(),
      clientType: z.enum(["locuință", "companie", "instituție"]),
      services: z.array(z.enum(serviceSlugs)).min(1),
      year: z.number().int(),
      /** Photo next to the Markdown file, e.g. "./cover.jpg". Dark, low-key, cropped 4:3. */
      cover: image().optional(),
      coverAlt: z.string().optional(),
      /** Drafts show in `astro dev` only. */
      draft: z.boolean().default(false),
    }),
});

export const collections = { proiecte };
