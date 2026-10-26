# Onyx Security Solutions

Marketing website for Onyx Security Solutions, built with Astro and Tailwind CSS v4.

The design system lives in [`docs/design-system.md`](docs/design-system.md); read it before building UI.

## Commands

Requires Node >= 22.23.4.

| Command | Action |
| :-- | :-- |
| `npm install` | Install dependencies |
| `npm run dev` | Dev server at `localhost:4321` |
| `npm run build` | Static build to `./dist/` |
| `npm run preview` | Serve the build locally |
| `npx astro check` | Type-check `.astro` files |
| `node scripts/trim-logos.mjs` | Crop transparent padding from the brand logos |
| `node scripts/make-favicons.mjs` | Regenerate favicons from the icon logo |
