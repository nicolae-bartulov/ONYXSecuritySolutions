# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Project

Marketing website for **Onyx Security Solutions**, a Romanian company that designs, installs and maintains security systems (CCTV, alarms, intercom, access control, gate automation). Built with Astro 7 + Tailwind CSS v4 (via `@tailwindcss/vite` in `astro.config.mjs`, no `tailwind.config.js`). Requires Node >= 22.23.4.

The repo is at the starter stage: only `src/pages/index.astro` (Astro boilerplate), `src/styles/global.css` and the brand logos exist. Layouts and components described in the design system have not been created yet.

## Commands

- `npm run dev` — dev server at `localhost:4321` (prefer `astro dev --background` per AGENTS.md)
- `npm run build` — static build to `./dist/`
- `npm run preview` — serve the build
- `npx astro check` — type-check `.astro` files (tsconfig extends `astro/tsconfigs/strict`)

There is no linter or test suite configured.

## Design system

`docs/design-system.md` is the source of truth for all UI. Read it before building any page or component. It contains ready-to-copy Astro code for `BaseLayout`, `Logo`, `Button`, `Eyebrow`, `SectionHeading`, `ServiceCard`, `NavBar` and `TextField`, plus the intended file layout (`src/layouts/`, `src/components/ui/`, `src/components/layout/`). Do not invent colors, fonts, radii, spacing or shadows.

Key mechanics spread across `global.css` and the doc:

- **Theming is attribute-based, not OS-based.** Dark is the default (`:root`); light is opt-in with `data-theme="light"` on `<html>` or any wrapper. Custom variants `light:` and `dark:` follow that attribute, not `prefers-color-scheme`.
- **Use semantic color utilities** (`bg-surface`, `bg-surface-alt`, `text-ink`, `text-ink-muted`, `border-line`, `border-line-strong`, `bg-accent`, `text-on-accent`, `text-accent-ink`). They are CSS variables that swap per theme, so `dark:`/`light:` prefixes are rarely needed. `brand-*` colors are fixed and should be avoided in components.
- **Contrast rules:** never gold or silver text on light backgrounds (use `text-accent-ink` / `text-ink-muted`); text on gold is always `text-on-accent`. No red/green in the palette — errors use a 2px `border-ink` and a "!" marker.
- **Type scale** is custom (`text-display`, `text-headline`, `text-title`, `text-eyebrow`, `text-body-lg`, `text-body`, `text-small`, `text-button`). Display/headline/title/eyebrow/button are always paired with `uppercase`; write the source text in sentence case.
- **Shape:** square brand — `rounded-none` everywhere except `rounded-sm` (2px) on buttons/badges. Brand utilities `chamfer-sm`, `chamfer-tr`, `chamfer-lg` (cut corners) and `rule-gold` (40×2px accent rule) are defined in `global.css`. No shadows or gradients.
- **Font:** Montserrat via `@fontsource-variable/montserrat` (not yet installed), imported in `BaseLayout` together with `global.css`.
- **Logos** are PNGs in `src/assets/brand/logos/` named `onyx-{landscape|portrait|icon}-on-{dark|light}.png`; the `Logo` component picks the variant per theme using `astro:assets` `<Image>`.

`src/styles/global.css` is the live version of the theme and has diverged slightly from the snippet in section 2 of the doc (it adds the `dark:` custom variant and sets `--spacing: 4px`); edit `global.css` directly rather than re-pasting the doc's version.

## Content

- Site copy is **Romanian with full diacritics**, using comma-below ș ț (never cedilla ş ţ). `<html lang="ro">`. The tagline "Consult. Design. Secure." stays in English.
- Polite plural address ("Solicitați o ofertă"), calm tone, no exclamation marks or emoji.
- Primary CTA "Solicită ofertă", secondary "Vezi soluțiile". Service order and taglines are listed in section 5 of the design doc.
- Planned routes (from the NavBar spec): `/solutii`, `/proiecte`, `/despre-noi`, `/contact`.
