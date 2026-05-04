# CLAUDE.md

Personal portfolio for Gustavo Avila — a single-page Astro site built around heavy 3D/shader VFX and a strict dark-mode design system.

## Stack

- **Astro 4** static site, deploys to `https://avilagustavo.com`
- **Three.js** loaded from `https://esm.sh/three@0.161.0` via `<script type="module" is:inline>` — not an npm dep
- **Lucide** for icons (npm package)
- No framework integrations (no React/Vue), no test runner, no linter — plain Astro + vanilla JS in islands

## Commands

| Command           | Purpose                       |
| :---------------- | :---------------------------- |
| `npm run dev`     | Astro dev server (port 4321)  |
| `npm run build`   | Build to `./dist/`            |
| `npm run preview` | Preview built site            |

## Architecture

- **`src/pages/index.astro`** — the entire site is one route. ~1000 lines of markup + scoped styles. Content is hard-coded except featured projects.
- **`src/pages/ty.astro`** — thank-you page (form submission landing).
- **`src/components/`** — four self-contained `.astro` islands, each carrying its own `<script type="module" is:inline>` and scoped styles:
  - `BaseHead.astro` — meta tags, fonts (Bebas Neue + Inter from Google Fonts), OG/Twitter cards
  - `HeroMouseDistortion.astro` — Three.js fragment-shader mouse-reactive hero background
  - `ProjectsMonitor.astro` — featured projects media panel ("monitor" UI)
  - `ScrollSpace3D.astro` — scroll-driven 3D scene
- **`src/content/proyectos/`** — Astro content collection of project markdown files. Schema in `src/content/config.ts` (Spanish field names retained). Frontmatter: `title, description, pubDate, heroImage, previewVideo?, category, url`. `index.astro` shows the 4 most recent.
- **`src/styles/global.css`** — only global tokens (CSS custom properties for the palette) + reset + the `.noise` overlay + `.button-outline` shared component. Everything else is scoped per-component.
- **`public/`** — static assets (project screenshots, logo, CV, `noise.svg`).

## Design system

`DESIGN.md` is authoritative — read it before any visual change. Hard rules to enforce:

- **No 1px solid borders** for sectioning. Use background tonal shifts or VFX dividers instead. The `--outline-soft` / `--outline-white` tokens exist only for ghost-border accessibility fallbacks.
- **Dark mode only.** Surface base is `#020504` / `#091421`; primary accent is `#47df9b` ("the Pulse"), used sparingly as a light source.
- **Body text never pure white** — use `--text-secondary` (`#bdc7d9`) or `--text-muted`.
- **Two typefaces only**: Bebas Neue for display headlines (the "Architect" voice), Inter for everything else (body, UI, labels).
- **Glassmorphism** uses `backdrop-blur` ≥ 20px on semi-transparent surfaces, not opaque cards.
- **Asymmetry over center-alignment** — push elements to viewport edges; let large type overflow containers.
- **Glows, not drop-shadows.** When elevation is needed: 40–80px blur at ~6% opacity, tinted with the background color.

## Conventions observed in the codebase

- Tabs for indentation in `.astro` and `.css` files.
- BEM-style class names (`.topbar__brand-logo`, `.home-shell`, etc.).
- All Three.js / interactive scripts are inline modules inside the component that owns them — no shared `src/scripts/` directory.
- Respect `prefers-reduced-motion`: shader components check `matchMedia('(prefers-reduced-motion: reduce)')` and downgrade. Match this pattern when adding new motion.
- External links use `target="_blank" rel="noreferrer"`.
