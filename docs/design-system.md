# Onyx Security — Design System

Source of truth for the Onyx Security Solutions website (Astro + Tailwind CSS v4).
Everything here is derived from the Onyx design system: `tokens.json`, the brand guide, the component specs and the logo files. When building UI, use the tokens and components below; do not invent colors, fonts, radii or spacing.

- **Brand:** Onyx Security Solutions, a Romanian company that designs, installs and maintains security systems.
- **Tagline:** CONSULT. DESIGN. SECURE.
- **Look:** a faceted black panther with gold eyes. Near-black ground, one gold accent used sparingly, silver and graphite for structure, wide-tracked uppercase type, square edges with occasional cut corners.
- **Default theme:** dark. Light is opt-in per page or section with `data-theme="light"`.

---

## 1. Setup

### 1.1 Files

```
src/
├─ styles/global.css            ← section 2, pasted whole
├─ assets/brand/logos/          ← the 6 PNGs from Design System/project/assets/Logos/
├─ components/ui/               ← Logo, Button, Eyebrow, SectionHeading, ServiceCard, TextField (.astro)
├─ components/layout/NavBar.astro
└─ layouts/BaseLayout.astro     ← imports global.css and the font
```

### 1.2 Font

Montserrat, weights 400, 500 and 600. Self-host it with Fontsource:

```bash
npm i @fontsource-variable/montserrat
```

```astro
---
// src/layouts/BaseLayout.astro
import "@fontsource-variable/montserrat";
import "../styles/global.css";
const { title, theme } = Astro.props; // theme: undefined (dark) | "light"
---
<html lang="ro" data-theme={theme}>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title}</title>
  </head>
  <body><slot /></body>
</html>
```

If you load Montserrat from Google Fonts instead, the family name is `"Montserrat"`; the stack below covers both.

---

## 2. `src/styles/global.css`

Paste as is. Semantic colors are CSS variables that change with the theme; Tailwind utilities point at them, so `bg-surface`, `text-ink` etc. switch automatically and you rarely need a `dark:`/`light:` prefix.

```css
@import "tailwindcss";

/* Light theme is opt-in: <html data-theme="light"> or any wrapper with data-theme="light" */
@custom-variant light (&:where([data-theme="light"], [data-theme="light"] *));

/* ---------- Theme values (dark is the default) ---------- */
:root {
  --surface: #0f0f0f;      /* brand-onyx */
  --surface-alt: #474747;  /* brand-graphite */
  --ink: #ffffff;          /* brand-white */
  --ink-muted: #aaaaaa;    /* brand-silver */
  --line: #474747;         /* brand-graphite */
  --line-strong: #aaaaaa;  /* brand-silver */
  --accent: #e3a600;       /* brand-gold */
  --on-accent: #0f0f0f;    /* brand-onyx */
  --accent-ink: #e3a600;   /* brand-gold */
  --focus: #e3a600;        /* brand-gold */
  color-scheme: dark;
}

[data-theme="light"] {
  --surface: #ffffff;      /* brand-white */
  --surface-alt: #e2e2e2;  /* brand-mist */
  --ink: #0f0f0f;          /* brand-onyx */
  --ink-muted: #474747;    /* brand-graphite */
  --line: #e2e2e2;         /* brand-mist */
  --line-strong: #474747;  /* brand-graphite */
  --accent: #e3a600;       /* brand-gold */
  --on-accent: #0f0f0f;    /* brand-onyx */
  --accent-ink: #0f0f0f;   /* gold can't be text on white, falls back to onyx */
  --focus: #0f0f0f;        /* brand-onyx */
  color-scheme: light;
}

/* ---------- Tailwind tokens ---------- */
@theme inline {
  /* Semantic colors: use these in components */
  --color-surface: var(--surface);
  --color-surface-alt: var(--surface-alt);
  --color-ink: var(--ink);
  --color-ink-muted: var(--ink-muted);
  --color-line: var(--line);
  --color-line-strong: var(--line-strong);
  --color-accent: var(--accent);
  --color-on-accent: var(--on-accent);
  --color-accent-ink: var(--accent-ink);
  --color-focus: var(--focus);
}

@theme {
  /* Brand palette (fixed in both themes). Prefer the semantic colors above. */
  --color-brand-onyx: #0f0f0f;
  --color-brand-gold: #e3a600;
  --color-brand-white: #ffffff;
  --color-brand-silver: #aaaaaa;
  --color-brand-mist: #e2e2e2;
  --color-brand-graphite: #474747;

  /* Type */
  --font-sans: "Montserrat Variable", "Montserrat", "Helvetica Neue", Arial, sans-serif;

  --text-display: 56px;
  --text-display--line-height: 60px;
  --text-display--letter-spacing: 0.08em;
  --text-display--font-weight: 500;

  --text-headline: 36px;
  --text-headline--line-height: 44px;
  --text-headline--letter-spacing: 0.08em;
  --text-headline--font-weight: 500;

  --text-title: 20px;
  --text-title--line-height: 28px;
  --text-title--letter-spacing: 0.06em;
  --text-title--font-weight: 600;

  --text-eyebrow: 12px;
  --text-eyebrow--line-height: 16px;
  --text-eyebrow--letter-spacing: 0.24em;
  --text-eyebrow--font-weight: 500;

  --text-body-lg: 18px;
  --text-body-lg--line-height: 28px;

  --text-body: 16px;
  --text-body--line-height: 26px;

  --text-small: 14px;
  --text-small--line-height: 22px;

  --text-button: 13px;
  --text-button--line-height: 16px;
  --text-button--letter-spacing: 0.14em;
  --text-button--font-weight: 600;

  /* Radius: square brand. Only buttons/badges get 2px. */
  --radius-sm: 2px;

  /* Spacing: Tailwind v4's default 4px step already matches the Onyx scale.
     space-1=p-1 (4px), space-2=p-2, space-3=p-3, space-4=p-4 (16px), space-6=p-6 (24px),
     space-8=p-8 (32px), space-12=p-12 (48px), space-24=p-24 (96px). Don't override --spacing. */
}

/* ---------- Brand utilities ---------- */

/* Cut corners from the octagonal O in the ONYX wordmark */
@utility chamfer-sm {
  clip-path: polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px);
}
@utility chamfer-tr {
  clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%);
}
@utility chamfer-lg {
  clip-path: polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px);
}

/* The 40px x 2px gold rule under headings and service titles */
@utility rule-gold {
  display: block;
  width: 40px;
  height: 2px;
  background-color: var(--accent);
}

/* ---------- Base ---------- */
@layer base {
  body {
    @apply bg-surface text-ink font-sans text-body antialiased;
  }
  :focus-visible {
    outline: 2px solid var(--focus);
    outline-offset: 2px;
  }
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { transition: none !important; animation: none !important; }
  }
}
```

---

## 3. Tokens reference

### 3.1 Brand palette

The palette is exactly these six colors. Nothing else.

| Token | Hex | Name | Use |
|---|---|---|---|
| `brand-onyx` | `#0f0f0f` | Onyx black | Page background in dark, text in light. Never pure `#000`. |
| `brand-gold` | `#e3a600` | Vision gold | The single accent. Fills, rules, marks. Text only on onyx (8.9:1). |
| `brand-white` | `#ffffff` | Stone white | Text in dark, page background in light. |
| `brand-silver` | `#aaaaaa` | Silver | Secondary text on onyx (8.3:1), control borders in dark. Never text on white. |
| `brand-mist` | `#e2e2e2` | Mist | Alternate band and hairlines in light. |
| `brand-graphite` | `#474747` | Graphite | Secondary text on white (9.3:1); hairlines and alternate band in dark. |

### 3.2 Semantic colors (use these)

| Tailwind | Dark | Light | Use |
|---|---|---|---|
| `bg-surface` | onyx | white | Page background and cards. |
| `bg-surface-alt` | graphite | mist | Alternating bands, footer, row hover. In dark, only `text-ink` and accent on it. |
| `text-ink` | white | onyx | Headlines and body text. |
| `text-ink-muted` | silver | graphite | Secondary text, captions, descriptions. |
| `border-line` | graphite | mist | Decorative hairlines, card outlines. Never the only boundary of a control. |
| `border-line-strong` | silver | graphite | Input and secondary-button borders. |
| `bg-accent` | gold | gold | Primary button, gold rule, active underline, icons on dark. |
| `text-on-accent` | onyx | onyx | Text on gold fills. Never white on gold. |
| `text-accent-ink` | gold | onyx | Accent-colored text: eyebrows, active links. |
| `outline-focus` | gold | onyx | 2px focus ring, 2px offset. |

### 3.3 Contrast rules

- Gold on white is 2.2:1: **never gold text on a light background.** Use `text-accent-ink`.
- Silver on white is 2.3:1: never silver text in light. Use `text-ink-muted`.
- Silver on graphite is 4.0:1: on `bg-surface-alt` in dark, don't use `text-ink-muted` for body text.
- White on gold is 2.2:1: text on gold is always `text-on-accent`.
- There is **no red or green** in the palette. Errors use a 2px `border-ink`, a "!" marker and a clear sentence. Success uses a sentence plus a gold rule.

### 3.4 Type styles

All Montserrat. The first four are always uppercase; add `uppercase` with them.

| Tailwind | Size / line | Weight | Tracking | Case | Use |
|---|---|---|---|---|---|
| `text-display uppercase` | 56/60 | 500 | 0.08em | UPPER | Hero headline, one per page. |
| `text-headline uppercase` | 36/44 | 500 | 0.08em | UPPER | Section headings, followed by a gold rule. |
| `text-title uppercase` | 20/28 | 600 | 0.06em | UPPER | Card titles, sub-sections. |
| `text-eyebrow uppercase` | 12/16 | 500 | 0.24em | UPPER | Labels above headings, nav links, form labels. |
| `text-body-lg` | 18/28 | 400 | 0 | Sentence | Hero subline, intros. |
| `text-body` | 16/26 | 400 | 0 | Sentence | Default running text. |
| `text-small` | 14/22 | 400 | 0 | Sentence | Card descriptions, help text, footer. |
| `text-button uppercase` | 13/16 | 600 | 0.14em | UPPER | Button and CTA labels. |

On phones, step the hero down: `text-headline md:text-display`.
Keep paragraphs at `max-w-[65ch]`. Give headings `text-balance`.

### 3.5 Spacing, radius, shape

| Onyx token | Value | Tailwind | Use |
|---|---|---|---|
| space-1 | 4px | `1` | Icon-to-label gap in small controls |
| space-2 | 8px | `2` | Eyebrow to heading; tight stacks |
| space-3 | 12px | `3` | Heading to gold rule; input vertical padding |
| space-4 | 16px | `4` | Min. side gutter on phones; input horizontal padding |
| space-6 | 24px | `6` | Card padding; grid gaps |
| space-8 | 32px | `8` | Large button horizontal padding; heading block to content |
| space-12 | 48px | `12` | Desktop side gutter; section padding on phones |
| space-24 | 96px | `24` | Section padding on desktop |

- Sections: `py-12 md:py-24`, gutters `px-4 md:px-12`.
- Radius: `rounded-none` for cards, images, inputs, bands; `rounded-sm` (2px) for buttons and badges only.
- Cut corners: `chamfer-sm` (8px) on the primary button and card media (`chamfer-tr`), `chamfer-lg` (20px) on hero image frames. One cut element per area, not everything.
- Borders: 1px hairlines (`border border-line`), 1px control borders (`border border-line-strong`), gold rule 40×2px (`rule-gold`).
- No shadows, no gradients in UI.
- Motion: `transition-colors duration-150` on color/border only.

---

## 4. Components (Astro)

All components are static markup. Copy them into `src/components/`.

### 4.1 Logo

Full-color PNG artwork. It cannot be tinted, so the right file is picked for the ground.

```astro
---
// src/components/ui/Logo.astro
import { Image } from "astro:assets";
import landscapeDark from "../../assets/brand/logos/onyx-landscape-on-dark.png";
import landscapeLight from "../../assets/brand/logos/onyx-landscape-on-light.png";
import portraitDark from "../../assets/brand/logos/onyx-portrait-on-dark.png";
import portraitLight from "../../assets/brand/logos/onyx-portrait-on-light.png";
import iconDark from "../../assets/brand/logos/onyx-icon-on-dark.png";
import iconLight from "../../assets/brand/logos/onyx-icon-on-light.png";

interface Props {
  variant?: "landscape" | "portrait" | "icon";
  /** Force one artwork regardless of theme (e.g. over a photo). */
  ground?: "dark" | "light";
  height?: number;
  class?: string;
}
const { variant = "landscape", ground, height = 40, class: cls } = Astro.props;
const art = {
  landscape: { dark: landscapeDark, light: landscapeLight },
  portrait: { dark: portraitDark, light: portraitLight },
  icon: { dark: iconDark, light: iconLight },
}[variant];
const alt = "Onyx Security Solutions";
---
<span class:list={["inline-flex items-center", cls]}>
  {ground !== "light" && (
    <Image src={art.dark} alt={alt} height={height}
      class:list={["block w-auto", !ground && "light:hidden"]} style={`height:${height}px`} />
  )}
  {ground !== "dark" && (
    <Image src={art.light} alt={ground ? alt : ""} aria-hidden={ground ? undefined : "true"} height={height}
      class:list={["w-auto", ground ? "block" : "hidden light:block"]} style={`height:${height}px`} />
  )}
</span>
```

Rules:
- **Landscape** in the header (40px) and footer (32px). **Portrait** for splash, 404, print (min 120px). **Icon** for favicon, avatars, watermarks.
- `*-on-dark` = silver wordmark, white whiskers. `*-on-light` = black wordmark, black whiskers.
- Clear space = height of the wordmark's O on every side.
- Never recolor, stretch, outline, add shadows or place on gold. Never retype "ONYX" in Montserrat; the wordmark is custom lettering.

### 4.2 Button

```astro
---
// src/components/ui/Button.astro
interface Props {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  class?: string;
}
const { variant = "primary", size = "md", href, type = "button", disabled, class: cls } = Astro.props;
const Tag = href ? "a" : "button";
const sizes = { sm: "px-4 py-2.5", md: "px-6 py-3", lg: "px-8 py-4" };
const variants = {
  primary: `${sizes[size]} bg-accent text-on-accent chamfer-sm hover:bg-ink hover:text-surface focus-visible:[clip-path:none]`,
  secondary: `${sizes[size]} rounded-sm border border-line-strong text-ink hover:border-accent`,
  ghost: "py-3 border-b-2 border-accent text-accent-ink hover:text-ink",
};
---
<Tag
  href={href}
  type={href ? undefined : type}
  disabled={href ? undefined : disabled}
  class:list={[
    "inline-flex items-center justify-center gap-2 whitespace-nowrap text-button uppercase no-underline",
    "transition-colors duration-150 cursor-pointer disabled:opacity-45 disabled:cursor-not-allowed",
    variants[variant],
    cls,
  ]}
><slot /></Tag>
```

Rules:
- **Primary** (gold, chamfered): once per screen, for the action leading to a quote. Label: "Solicită ofertă".
- **Secondary** (outline): beside the primary. Label: "Vezi soluțiile", "Despre noi".
- **Ghost** (gold underline): inline links in cards and sections ("Detalii CCTV").
- Labels are verbs, 2–3 words. No icons on primary buttons.

### 4.3 Eyebrow

The wide-tracked label, same voice as "— SECURITY SOLUTIONS —" under the wordmark.

```astro
---
// src/components/ui/Eyebrow.astro
interface Props { rule?: "none" | "leading" | "both"; class?: string }
const { rule = "none", class: cls } = Astro.props;
const bar = "inline-block w-8 h-0.5 bg-accent";
---
<span class:list={["inline-flex items-center gap-3 text-eyebrow uppercase text-accent-ink", cls]}>
  {(rule === "leading" || rule === "both") && <span class={bar} aria-hidden="true" />}
  <span><slot /></span>
  {rule === "both" && <span class={bar} aria-hidden="true" />}
</span>
```

Rules: 1–3 words, one line. `rule="both"` for centered compositions and the tagline; `rule="leading"` for left-aligned section labels. Never a heading on its own.

### 4.4 SectionHeading

Opens every section: eyebrow, uppercase headline, gold rule, optional lead.

```astro
---
// src/components/ui/SectionHeading.astro
import Eyebrow from "./Eyebrow.astro";
interface Props {
  eyebrow?: string;
  lead?: string;
  as?: "h1" | "h2" | "h3";
  size?: "display" | "headline";
  align?: "start" | "center";
  class?: string;
}
const { eyebrow, lead, as: Tag = "h2", size = "headline", align = "start", class: cls } = Astro.props;
---
<div class:list={[
  "flex flex-col gap-3 max-w-[44rem]",
  align === "center" ? "items-center text-center mx-auto" : "items-start",
  cls,
]}>
  {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
  <Tag class:list={[
    "m-0 text-ink uppercase text-balance",
    size === "display" ? "text-headline md:text-display" : "text-title md:text-headline",
  ]}><slot /></Tag>
  <span class="rule-gold" aria-hidden="true" />
  {lead && <p class="mt-2 text-body-lg text-ink-muted max-w-[38rem]">{lead}</p>}
</div>
```

Rules: headlines ≤ 6 words. `size="display"` with `as="h1"` for the hero only. Align `start` by default; `center` only for short closing sections. Don't replace the 40px rule with a full-width line.

### 4.5 ServiceCard

```astro
---
// src/components/ui/ServiceCard.astro
interface Props { title: string; description?: string; href?: string; class?: string }
const { title, description, href, class: cls } = Astro.props;
const Tag = href ? "a" : "article";
---
<Tag
  href={href}
  class:list={[
    "flex flex-col min-w-0 bg-surface text-ink border border-line no-underline",
    href && "transition-colors duration-150 hover:border-accent",
    cls,
  ]}
>
  {Astro.slots.has("media") && (
    <div class="aspect-[4/3] bg-surface-alt overflow-hidden chamfer-tr [&>*]:size-full [&>*]:object-cover">
      <slot name="media" />
    </div>
  )}
  <div class="flex flex-col gap-3 p-6">
    {Astro.slots.has("icon") && (
      <span class="inline-flex size-8 text-accent light:text-ink [&>svg]:size-full" aria-hidden="true">
        <slot name="icon" />
      </span>
    )}
    <h3 class="m-0 text-title uppercase">{title}</h3>
    {description && <p class="m-0 text-small text-ink-muted">{description}</p>}
    <span class="rule-gold" aria-hidden="true" />
  </div>
</Tag>
```

Usage:

```astro
<div class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
  <ServiceCard title="CCTV" description="Vizibilitate în orice condiții." href="/solutii/cctv">
    <svg slot="icon" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="square">…</svg>
  </ServiceCard>
</div>
```

Rules: media is a dark product or installation photo cropped 4:3; or use a 32px line icon instead. Grid: 4 across desktop, 2 tablet, 1 phone, `gap-6`.

### 4.6 NavBar

```astro
---
// src/components/layout/NavBar.astro
import Logo from "../ui/Logo.astro";
import Button from "../ui/Button.astro";
const links = [
  { label: "Soluții", href: "/solutii" },
  { label: "Despre noi", href: "/despre-noi" },
  { label: "Contact", href: "/contact" },
];
const path = Astro.url.pathname;
---
<header class="sticky top-0 z-50 flex flex-wrap items-center gap-8 px-6 py-4 bg-surface border-b border-line">
  <a href="/" aria-label="Onyx Security Solutions, acasă" class="inline-flex">
    <Logo variant="landscape" height={40} />
  </a>
  <nav aria-label="Principal" class="ml-auto hidden md:flex flex-wrap gap-6">
    {links.map((l) => {
      const active = path.startsWith(l.href);
      return (
        <a href={l.href} aria-current={active ? "page" : undefined}
          class:list={[
            "py-2 text-eyebrow uppercase text-ink no-underline border-b-2 transition-colors duration-150 hover:text-accent-ink",
            active ? "border-accent" : "border-transparent",
          ]}>{l.label}</a>
      );
    })}
  </nav>
  <Button href="/contact#oferta" size="sm" class="ml-auto md:ml-0">Solicită ofertă</Button>
</header>
```

Rules: max 4 links. Opaque `bg-surface`, never transparent over the hero. Below `md`, links collapse into a menu button (to build); the CTA stays visible.

### 4.7 TextField

```astro
---
// src/components/ui/TextField.astro
interface Props {
  id: string;
  label: string;
  type?: string;
  name?: string;
  placeholder?: string;
  required?: boolean;
  hint?: string;
  error?: string;
  multiline?: boolean;
  rows?: number;
  class?: string;
}
const { id, label, type = "text", name = id, placeholder, required, hint, error, multiline, rows = 4, class: cls } = Astro.props;
const hintId = hint || error ? `${id}-hint` : undefined;
const control = [
  "font-sans text-body text-ink bg-surface rounded-none px-4 py-3",
  "placeholder:text-ink-muted focus:outline-2 focus:outline-focus focus:outline-offset-0",
  error ? "border-2 border-ink" : "border border-line-strong",
];
---
<div class:list={["flex flex-col gap-2 min-w-0", cls]}>
  <label for={id} class="text-eyebrow uppercase text-ink-muted">{label}</label>
  {multiline
    ? <textarea id={id} name={name} rows={rows} placeholder={placeholder} required={required}
        aria-describedby={hintId} aria-invalid={error ? "true" : undefined} class:list={[control, "resize-y"]} />
    : <input id={id} name={name} type={type} placeholder={placeholder} required={required}
        aria-describedby={hintId} aria-invalid={error ? "true" : undefined} class:list={control} />}
  {error
    ? <p id={hintId} class="m-0 text-small font-semibold text-ink"><span aria-hidden="true">! </span>{error}</p>
    : hint && <p id={hintId} class="m-0 text-small text-ink-muted">{hint}</p>}
</div>
```

Rules: short labels ("Nume", "Telefon", "Mesaj"). Errors say how to fix it ("Introduceți un număr de telefon valid.").

---

## 5. Content and voice

- Site copy is **Romanian with full diacritics** (ă, â, î, ș, ț). Use comma-below **ș ț**, never cedilla ş ţ. The tagline "Consult. Design. Secure." stays in English.
- Address visitors with the polite plural: "Solicitați o ofertă", "Spuneți-ne ce doriți să protejați".
- Headlines are short declarative statements, often three one-word sentences: "Consult. Design. Secure." Service lines come as pairs of short phrases: "Acces sigur. Control complet."
- Write uppercase text in sentence case in the source; the `uppercase` class does the rest.
- Calm and precise. Promise reliability, not fear. No exclamation marks, no emoji, no "hacker" stock imagery.
- Primary CTA: **"Solicită ofertă"**. Secondary: **"Vezi soluțiile"**.

Services, in this order, with their lines:

| Service | Line |
|---|---|
| CCTV | Vizibilitate în orice condiții. |
| Antifracție | Protecție care contează. |
| Interfonie | — |
| Control acces | Acces sigur. Control complet. |
| Automatizări porți | Confort și siguranță zilnică. |
| Service & mentenanță | — |
| Consultanță | — |

Reference headlines: "Consult. Design. Secure.", "Tehnologie pentru siguranță reală.", "Sisteme de securitate pentru locuințe, companii și instituții."

---

## 6. Layout and imagery

- Dark pages by default; use `data-theme="light"` on long reading pages, forms and legal pages.
- Gold stays under roughly 5% of any screen. It should read as the panther's eyes in the dark.
- Left-aligned layouts with generous negative space. Center only short closing sections.
- Alternate bands with `bg-surface-alt` sparingly; in dark it's graphite, so keep text `text-ink` there.
- Photography: low-key, dark hardware (cameras, sensors, keypads, gates) and modern architecture at dusk with warm practical light. Products on dark grounds, never cut out on white.
- Hero: a close crop of the panther (eyes, one side of the face) on dark, text on the solid side. Image frames get `chamfer-lg`.

## 7. Iconography

- Thin line icons: 1.5px stroke on a 32px grid, square caps, `currentColor`. Gold on dark, ink on light. A short gold rule under service icons.
- No emoji, no filled or duotone icons.
- The official icon set (CCTV, Antifracție, Interfonie, Control acces, Automatizări porți, Service & mentenanță, Consultanță) is shown on the moodboard but **not supplied as files yet**. Until it is, use placeholders in that style and replace them later.

## 8. States

| State | Treatment |
|---|---|
| Hover, primary button | Inverts to `bg-ink text-surface` |
| Hover, outlines and cards | Border turns `border-accent` |
| Hover, links | `text-accent-ink` |
| Active nav link | 2px gold underline, `aria-current="page"` |
| Focus | 2px solid `focus` ring, 2px offset, on every interactive element |
| Disabled | 45% opacity, `cursor-not-allowed` |
| Error | 2px `border-ink`, bold message starting with "!" |

## 9. Not yet in the system

- Montserrat font files (loaded from Fontsource or Google Fonts for now)
- The icon set from the moodboard
- SVG logos (export from `Onyx logo.ai`) and a favicon
- A mobile menu for the NavBar
