# Design System — avilagustavo.com

> **This document is the source of truth.** It is reverse-engineered from the implemented site (`src/pages/index.astro`, `src/components/*.astro`, `src/styles/global.css`). When the code and this document disagree, the code wins until the next sync — but every visual decision should be reconciled back here.

---

## 1. Creative North Star — "The Kinetic Architect"

A dark-mode interface that feels like navigating a self-illuminated terminal. The system has two voices: the **Architect** (Bebas Neue display, brutal scale, restrained motion) and the **Developer** (Inter, precise micro-typography, terminal HUD treatments).

Depth is achieved through **stacked translucent black surfaces with green-tinted ghost borders**, **conic-gradient sweep glows**, and **3D perspective panels driven by scroll**. Light is the green pulse `#47df9b` and its lighter cousins (`#7ef6c4`, `#edfff7`).

The hero uses a **Z-space stage** (`.z-space`): a sticky viewport of `100vh` with `perspective: 1200px` where panels translate, tilt and scale on scroll while a Three.js shader and particle field render behind them. This is the signature pattern.

---

## 2. Color tokens

The canonical tokens live in `src/styles/global.css` under `:root`. Component scopes also use raw values — they are documented here so they can be migrated to tokens over time.

### Surface (deepest → lightest)

| Token / value                         | Use                                                  |
| ------------------------------------- | ---------------------------------------------------- |
| `#000`                                | `body.portfolio-home` — the absolute floor           |
| `--surface: #020504`                  | `:root` and `<html>` background                      |
| `--surface-low: #050806`              | Reserved for nested low-elevation regions            |
| `rgba(0, 0, 0, 0.62)` → `0.92`        | Translucent surface tier (cards, topbar, CTAs)       |
| `--surface-high: rgba(0, 0, 0, 0.78)` | Topbar / sticky chrome                               |
| `--surface-ghost: rgba(71, 223, 155, 0.08)` | Faint primary-tinted wash (e.g. kinetic grid)  |

> The full token contract lives in `src/styles/global.css`. Components should reach for `var(--surface)`, `var(--surface-high)`, etc. before introducing new raw values.

### Primary — "The Pulse"

| Value     | Use                                                          |
| --------- | ------------------------------------------------------------ |
| `#47df9b` | Hover color, focus rings, conic-gradient sweep, form labels  |
| `#7ef6c4` | Mid-glow halo (hero scroll wheel, GUI accents)               |
| `#edfff7` | Highest-luminance light (hero scroll-hint copy, headlines)   |
| `#003822` | `--accent-dark` — reserved (currently unused in components)  |

### Text

| Token                          | Value     | Use                                       |
| ------------------------------ | --------- | ----------------------------------------- |
| `var(--text-primary)`          | `#f4f7fb` | Hero name, brand badge, primary headlines |
| `var(--text-secondary)`        | `#bdc7d9` | Default body, social links, footer        |
| `var(--text-muted)`            | `#bbcabe` | Footer prose, contact-copy paragraphs     |
| Hero phases                    | `#e4ebf8` / `#d6deee` / `#dbe4f4` | Sequenced hero subtitles (still raw — keep until a "phase" token earns its place) |
| ProjectsMonitor surface text   | `#f0ece4` | Frame text in the projects monitor (warm — intentional contrast against cool body text) |

> **Rule:** body text is never pure white. The off-white spectrum (`#f4f7fb` ↘ `#bbcabe`) is what gives the dark mode its photographic warmth.

### Outlines (ghost borders only)

| Token / value                          | Use                                       |
| -------------------------------------- | ----------------------------------------- |
| `--outline-soft: rgba(71, 223, 155, 0.16)` | Reserved primary ghost outline        |
| `--outline-white: rgba(255, 255, 255, 0.28)` | Default neutral ghost outline (CTAs) |
| `rgba(71, 223, 155, 0.08 → 0.5)`       | All primary-tinted borders in components  |
| `rgba(255, 255, 255, 0.06 → 0.28)`     | All neutral-tinted borders                |

### Shadows / Glows

| Pattern                                          | Use                                       |
| ------------------------------------------------ | ----------------------------------------- |
| `--shadow-glow: 0 0 60px rgba(71, 223, 155, 0.12)` | Default ambient halo                    |
| `0 0 16px rgba(71, 223, 155, 0.08)`              | Button hover bloom                        |
| `0 0 0 3px rgba(71, 223, 155, 0.14), 0 0 0 6px rgba(71, 223, 155, 0.2)` | Focus ring (double layer) |
| `0 30px 90px rgba(0, 0, 0, 0.45)`                | Projects frame ambient lift               |
| `0 16px 60px rgba(0, 0, 0, 0.34)`                | Media shell lift                          |
| `0 12px 30px rgba(0, 0, 0, 0.28)`                | Scroll-hint lift                          |

> **Rule:** shadow color is a tint of the background or the primary, **never pure black at high opacity**. Spread/blur is large (≥30px), opacity is small (≤0.45).

---

## 3. Typography

Loaded from Google Fonts in `BaseHead.astro`:

```
Bebas Neue
Inter (400, 500, 600, 700, 800)
```

**`IBM Plex Mono`** is loaded alongside Bebas Neue and Inter and used only for `.hero__scroll-label` — a single terminal-style HUD micro-label. Any new mono usage should reuse this same family at the same scale to preserve its signal.

### Roles

| Role                  | Family       | Weight | Size                              | Tracking | Used in                                  |
| --------------------- | ------------ | ------ | --------------------------------- | -------- | ---------------------------------------- |
| Display — Hero name   | Bebas Neue   | 500    | `clamp(5.8rem, 19.5vw, 21rem)`    | `0`      | `.hero__name`                            |
| Display — Section     | Bebas Neue   | 700    | `clamp(2.25rem, 4vw, 3.8rem)`     | `0`      | `.contact-copy h2`                       |
| Display — Project     | Bebas Neue   | 700    | `clamp(3.8rem, 8.4vw, 8rem)`      | `0`      | `.projects-monitor__copy h3`             |
| Display — HUD counter | Bebas Neue   | 700    | `clamp(1.5rem, 2.2vw, 2.2rem)`    | `0`      | `.projects-monitor__hud-counter strong`  |
| Body — Hero subtitle  | Inter        | 500–600 | `clamp(1.1rem, 2.6vw, 2.05rem)`  | `0`      | `.hero__phase`                           |
| Body — Default        | Inter        | 400    | `18px / 1.7`                      | `0`      | `body`                                   |
| Brand badge           | Inter        | 400    | `1.9rem` / `1.2rem` (name)        | `0`      | `.topbar__brand-badge`, `.topbar__brand-name` |
| UI label / button     | Inter        | 500    | `0.78rem` (CTA), `0.82rem` (link) | `0.04em` | `.topbar__cta`, `.topbar__social-link`   |
| HUD label             | Inter        | 600    | `0.82rem` UPPERCASE               | `0.14em` | `.projects-monitor__hud`                 |
| Project role caption  | Inter        | 400    | `0.86rem` UPPERCASE               | `0.16em` | `.projects-monitor__copy-role`           |
| Form label            | Inter        | 400    | `0.76rem` UPPERCASE               | `0.04em` | `.contact-form span` (`#47df9b`)         |
| Footer copyright      | Inter        | 400    | `0.72rem` UPPERCASE               | `0.04em` | `.page-footer p`                         |
| Mono label (HUD)      | IBM Plex Mono | 700   | `0.58rem` UPPERCASE               | `0.16em` | `.hero__scroll-label`                    |

> **Rules:**
> - Bebas Neue: always `letter-spacing: 0`. Never tracked.
> - Inter UPPERCASE: always tracked between `0.04em` and `0.16em`. The wider the tracking, the more "terminal" the read.
> - Mix freely: huge Bebas Neue headlines next to tiny Inter UPPERCASE labels is the signature contrast.
> - Body line-height is `1.7` — never tighten it on prose.

---

## 4. Surface hierarchy & ghost borders

The site does **not** prohibit borders. It uses **ghost borders** — 1px outlines with very low alpha (≤0.28 white, ≤0.5 primary). A solid opaque border is still forbidden.

### The four layers (bottom → top)

1. **Floor** — `body.portfolio-home` `#000`
2. **Kinetic grid** — `:root#020504` painted with two `linear-gradient` lines at `rgba(71,223,155,0.04)`, 72px × 72px tile
3. **Sticky chrome** — translucent `rgba(0,0,0,0.78)` + `backdrop-filter: blur(16px)` + bottom ghost border
4. **Floating cards** — translucent `rgba(0,0,0,0.62 → 0.82)` + `backdrop-filter: blur(20px)` + ghost border + ambient glow

Nesting a translucent card inside a translucent topbar inside a kinetic-grid backdrop produces the "tech-glass stack" the system relies on for depth.

### Border tokens — when to use which

| Border                                       | When                                                              |
| -------------------------------------------- | ----------------------------------------------------------------- |
| `1px solid rgba(255, 255, 255, 0.18 → 0.28)` | Neutral controls (CTAs, social link tiles)                        |
| `1px solid rgba(71, 223, 155, 0.08 → 0.28)`  | Primary surfaces (forms, project frame, top of topbar)            |
| `1px dashed rgba(255, 255, 255, 0.08)`       | Sectional dividers inside a card (HUD baseline)                   |
| Conic-gradient `::after` mask                | Animated sweep border (projects-monitor frame). Reserved for hero pieces. |

### Roundness scale

| Size      | Use                                                              |
| --------- | ---------------------------------------------------------------- |
| `0.8rem`  | Small logo (≤720px)                                              |
| `0.95rem` | Logo (default), media shell (≤720px)                             |
| `1rem`    | Buttons, inputs, social tiles                                    |
| `1.2rem`  | Media shell, projects frame on mobile                            |
| `1.5rem`  | Contact form/copy cards                                          |
| `1.75rem` | Projects-monitor frame (default)                                 |
| `999px`   | Pill (scroll hint, scroll wheel)                                 |

---

## 5. Components

### 5.1 Topbar (`.topbar`)

Sticky `top: 0`, `z-index: 20`, `padding: 1.5rem 2rem` (1.2rem 1.25rem ≤960, column layout ≤720). Surface `rgba(0,0,0,0.78)` + `backdrop-filter: blur(16px)`, ghost border bottom `rgba(71,223,155,0.08)`.

- **Brand**: 2.7rem logo (rounded `0.95rem`, double-shadow ring), `©2026` badge in Inter `1.9rem`, brand name in Inter `1.2rem`, `400`.
- **Actions**: nowrap flex with `--topbar-action-gap: 0.9rem` (0.8rem ≤960, 0.65rem ≤720).
- **Social tiles**: 2.5rem squares (2.35rem ≤720), `border-radius: 1rem`, ghost white border, hover lifts `-2px` and tints border + box-shadow primary.

### 5.2 CTA button (`.topbar__cta`)

The system's only button style. `min-height: 44px` (a11y), `max-width: 164px`, `padding: 0.7rem 0.9rem`, `font-size: 0.78rem`, `letter-spacing: 0.04em`, `font-weight: 500`, `border-radius: 1rem`, surface `rgba(0,0,0,0.72)`, `backdrop-filter: blur(20px)`, ghost white border `0.28`, color `rgba(245,248,255,0.94)`.

- **Hover**: text `#47df9b`, border `rgba(71,223,155,0.5)`, surface `rgba(0,0,0,0.92)`, glow `0 0 16px rgba(71,223,155,0.08)`, `translateY(-1px)`.
- **Focus / active**: double ring `0 0 0 3px rgba(71,223,155,0.14), 0 0 0 6px rgba(71,223,155,0.2)`, border `rgba(71,223,155,0.62)`.
- **`.contact-submit-button` modifier**: removes the `max-width: 164px` cap (full-width inside the form).

> **Rule:** every interactive non-link control on the page should follow this pattern. If a new control is added, it inherits or extends `.topbar__cta` rather than introducing a new visual.

### 5.3 Hero (`.hero`, `.hero__name`, `.hero__phase`, `.hero__scroll-hint`)

Lives inside the **Z-space** (`.z-space`, `min-height: 320vh` desktop / `300vh` ≤960 / `320vh` ≤720). The viewport is `position: sticky; top: 82px; height: calc(100vh - 82px)` (74px top ≤960, 128px ≤720), with `perspective: 1200px` and `isolation: isolate`. A vertical gradient veil (`::before`) deepens the top and bottom edges.

- **Hero name** — Bebas Neue `clamp(5.8rem, 19.5vw, 21rem)`, color `#f4f7fb`, dynamic `text-shadow` driven by `--title-glow` (white at low alpha + green halo). Translates and tilts via JS-driven CSS variables (`--title-shift-x/y`, `--title-tilt`). Always overflows comfortably; never wrap.
- **Hero phases** — Inter, three sequenced subtitles cross-fading on scroll (`--hero-seq-creative-opacity`, `--based-opacity`, `--slogan-opacity`), each with subtle color and weight differences.
- **Scroll hint** — pill `1.9rem × 3.15rem`, primary ghost border, animated wheel inside (`@keyframes hero-scroll-wheel`, 2s ease-in-out infinite). Floats bottom-center on desktop, bottom-right on ≤960. Glow `0 0 16px rgba(71,223,155,0.18)`.

> **Rule:** the hero never wraps onto a second line and never centers vertically — it sits ~13.5vh below center to leave room for the scroll hint and to accommodate the projects panel rising from below.

### 5.4 ProjectsMonitor (`.projects-monitor*`)

The signature card. A "monitor" frame containing a media shell (image + autoplaying video crossfade), copy stack, HUD, ticks, and an animated conic-gradient sweep border.

- **Frame** — `padding: clamp(1.5rem, 3vw, 2.4rem)`, `border-radius: 1.75rem`, `border: 1px solid rgba(71,223,155,0.28)`. Two pseudo-elements:
  - `::before` static gradient outline (top→bottom primary fade)
  - `::after` conic-gradient sweep, `animation: projects-monitor-border-rotate 3.2s linear infinite`, with `drop-shadow(0 0 8px rgba(71,223,155,0.28))`
- **HUD** — top row, `border-bottom: 1px dashed rgba(255,255,255,0.08)`, label tracked `0.14em`, counter mixes Bebas Neue (current) + Inter (total).
- **Media shell** — `border-radius: 1.2rem`, radial primary glow at top, deep gradient base. Tilts on pointer with `perspective(1400px)` (`--shell-tilt-x/y`, `--shell-lift`). Two `media-layer`s for image↔video crossfade, plus a `media-shade` gradient, scanline `media-noise`, and a faint primary `media-grid`.
- **Frame line** — `1px rgba(255,255,255,0.08)` divider above the title block, asymmetric (`right: 17rem` on desktop) to suggest a UI tab cut.
- **Tick marks** — 14 stacked horizontal lines on the right edge, varying width by `(--tick-index % 4)`. Hidden ≤960.
- **Copy stack** — bottom-centered title (Bebas Neue display) + role caption (Inter UPPERCASE tracked `0.16em`), with a black gradient `copy-backdrop` for legibility over media.

> **Rule:** the conic-gradient sweep is reserved for the projects monitor. Adding it to other components dilutes its signal as "this is featured work."

### 5.5 Contact (`.section-block--contact`, `.contact-form`, `.contact-copy`)

- Two-column grid `0.9fr / 1.1fr`, collapses to single column ≤960.
- Both panels use `border: 1px solid rgba(71,223,155,0.1)`, `border-radius: 1.5rem`, `background: rgba(0,0,0,0.62)`, `backdrop-filter: blur(20px)`, `padding: 1.7rem`.
- **Inputs** — surface `rgba(0,0,0,0.82)`, primary-tinted ghost border, `border-radius: 1rem`, padding `1rem 1.05rem`, color `#d9e3f6`. Focus state: border `rgba(71,223,155,0.42)`, glow `0 0 0 4px rgba(71,223,155,0.08)`.
- **Form labels** — uppercase `0.76rem` Inter `0.04em` tracked, color `#47df9b`. The only place the primary is used as fill text — it signals "this is a control."
- **Submit** — `.topbar__cta.contact-submit-button` (full width).

### 5.6 Footer (`.page-footer`)

`padding: 4rem 0 1rem`, flex space-between (column ≤720), `max-width: 1280px`. Copy: Inter `0.72rem` UPPERCASE tracked `0.04em`, color `#bbcabe`. Same hover behavior as social links (text → `#47df9b`).

---

## 6. Motion

### Transition vocabulary

| Duration | Easing | Use                                          |
| -------- | ------ | -------------------------------------------- |
| `180ms`  | `ease` | Standard hover (color, border, background)   |
| `220ms`  | `ease` | Surface transforms (tilt, lift)              |
| `240ms`  | `ease` | Copy crossfade in projects monitor           |
| `260ms`  | `ease-out` | Hero name transform                      |
| `320ms`  | `ease-out` | Hero name text-shadow                    |

### Named animations

- `projects-monitor-border-rotate` — 3.2s linear infinite, drives the conic-gradient `--projects-border-angle` from `0deg → 360deg`.
- `hero-scroll-wheel` — 2s ease-in-out infinite, drops the wheel inside the scroll hint and pulses opacity.

### `prefers-reduced-motion`

**Hard requirement.** Every component with motion must check `matchMedia('(prefers-reduced-motion: reduce)')` (in JS) **and** carry a `@media (prefers-reduced-motion: reduce)` block disabling its transitions/animations. The global rule in `global.css` already shortens all durations to `0.01ms`, but component-level rules disable specific transforms. New motion follows this same dual gate.

---

## 7. Layout

| Setting                  | Desktop          | ≤960px       | ≤720px       |
| ------------------------ | ---------------- | ------------ | ------------ |
| `.section-block` max     | `1280px`         | —            | —            |
| `main` padding           | `0 2rem 4rem`    | `1rem 1.25rem 3rem` | —     |
| Topbar padding           | `1.5rem 2rem`    | `1.2rem 1.25rem` | column |
| Z-space height           | `320vh`          | `300vh`      | `320vh`      |
| Z-space sticky offset    | `82px`           | `74px`       | `128px`      |
| Section-block top pad    | `5.5rem`         | —            | —            |

**Breakpoints:** `960px` (tablet) and `720px` (mobile). No other breakpoints. Rely on `clamp()` between them.

---

## 8. Do / Don't

### Do
- Use **ghost borders** (≤0.5 alpha primary, ≤0.28 alpha white) for all 1px outlines.
- Layer translucent black surfaces with `backdrop-filter` to build depth instead of solid panels.
- Use the primary `#47df9b` as **light**: hover color, focus ring, glow halo, animated sweep — not as fill on large areas (the only fill exception is small UPPERCASE form labels).
- Use extreme scale contrast: clamped huge Bebas Neue + tiny tracked Inter UPPERCASE labels in the same view.
- Respect `prefers-reduced-motion` in **both** JS (skip shader/scroll listeners) and CSS (kill transitions).
- Reuse `.topbar__cta` for any new button. The system has one button.

### Don't
- Don't use **opaque** borders or borders ≥0.5 alpha. They flatten the glass stack.
- Don't use pure black drop-shadows with small blur and high opacity. Glows are big-blur, low-alpha.
- Don't fill body text with pure white. Stay in the off-white spectrum (`#f4f7fb` → `#bbcabe`).
- Don't add a second button shape, a second card radius scale, or a second display typeface. The system tolerates only what's catalogued above — extend the existing tokens before introducing new ones.
- Don't replicate the conic-gradient sweep border outside the ProjectsMonitor. It is the visual signature of "featured work."
- Don't tighten body line-height below `1.7`.

---

---

*Director's note: this is an interface for the future, but it is also a maintained product. Every new pixel must justify itself against the catalog above. When in doubt, reach for a token that already exists.*
