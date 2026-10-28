import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // TODO(content): replace with the final production domain
  site: "https://www.onyxsecurity.ro",
  trailingSlash: "never",
  integrations: [sitemap()],
  // The stylesheet is small (~7 KB gzipped): inlining it saves a render-blocking request.
  build: { inlineStylesheets: "always" },
  vite: {
    plugins: [tailwindcss()],
  },
});
