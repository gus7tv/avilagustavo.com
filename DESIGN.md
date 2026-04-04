# Design System Document: High-End Digital Portfolio

## 1. Overview & Creative North Star
### Creative North Star: "The Kinetic Architect"
This design system is built for a dual-identity professional—the Designer and the Developer. It moves beyond the flat, static nature of typical portfolios to embrace **The Kinetic Architect**—a philosophy where code and art collide in a 3D, high-tech space.

The system breaks the "template" look by rejecting rigid, boxy grids in favor of **intentional asymmetry**. We utilize large-scale typography that overflows container edges, overlapping 3D VFX elements that break the Z-axis, and high-contrast tonal shifts that prioritize depth over structural lines. The goal is to make the user feel as though they are navigating a sophisticated terminal or a futuristic gallery rather than a website.

---

## 2. Colors
The palette is a high-contrast, dark-mode-first system designed to make the vibrant neon accents feel like light emitting from a screen.

*   **Primary (`#47df9b`):** The "Pulse." Use this for high-priority interactive elements and glow effects.
*   **Surface & Background (`#091421`):** A deep, midnight void. This is the foundation of the system.
*   **Secondary (`#bdc7d9`):** Used for supporting text and non-critical interactive states.

### The "No-Line" Rule
**Explicit Instruction:** Do not use 1px solid borders for sectioning or card definition. The use of lines creates a "boxed-in" feel that contradicts the futuristic aesthetic. 
*   **Boundaries** must be defined solely through background color shifts. For example, a `surface-container-low` section sitting on a `surface` background provides all the separation necessary.
*   **VFX as Dividers:** Use 3D abstract elements or soft gradients to suggest transitions between content blocks.

### Surface Hierarchy & Nesting
Treat the UI as physical layers of tech-glass. 
*   **Background (`#091421`):** The base floor.
*   **Surface-Container-Low:** The primary content area.
*   **Surface-Container-Highest:** Floating elements, modals, or focused cards. 
Nesting a `surface-container-highest` card within a `surface-container-low` section creates "nested depth," making the UI feel constructed rather than printed.

### The "Glass & Gradient" Rule
To achieve the "Vexel" inspired aesthetic (Ref: Image 2):
*   **Glassmorphism:** Use semi-transparent surface colors with a `backdrop-blur` (min 20px). This allows 3D VFX backgrounds to bleed through the UI, integrating the content with the environment.
*   **Signature Textures:** Apply linear gradients (Primary to Primary-Container) at 45-degree angles on CTAs and Hero accents to simulate light refraction.

---

## 3. Typography
The system uses a calculated tension between a clean sans-serif (**Inter**) and a tech-forward display font (**Bebas Neue**).

*   **Display (Bebas Neue):** Ultra-large (`3.5rem`+). This is the "Architect" voice. Headlines should use confident spacing and, where appropriate, intentional overlapping with 3D elements to create depth.
*   **Body (Inter):** The "Developer" voice. Clean, readable, and functional. Maintain generous line height (`1.6`) to balance the aggressive display typography.
*   **Labels (Bebas Neue):** Used for metadata (e.g., "// PROJECT 01"). This evokes a "coding terminal" aesthetic.

Hierarchy conveys identity: Big, bold headers represent creative vision, while small, precise mono-style labels represent technical execution.

---

## 4. Elevation & Depth
Elevation is expressed through light and tonal layering, not shadows.

*   **The Layering Principle:** Stacking tiers (e.g., `surface-container-lowest` on top of `surface-container-low`) creates natural lift. 
*   **Ambient Shadows:** If a floating effect is required, use a shadow with a blur of `40px` to `80px` at `6%` opacity. The shadow color must be a tint of the background (`#091421`), never pure black.
*   **The "Ghost Border" Fallback:** If accessibility requires a border, use the `outline-variant` token at **15% opacity**. It should feel like a faint glimmer on the edge of a glass pane, not a solid line.
*   **Glow Effects:** Inspired by Image 4, use the Primary color (`#47df9b`) with a heavy blur as a "Backlight" behind key portfolio pieces to simulate a self-illuminating display.

---

## 5. Components

### Buttons
*   **Primary:** High-gloss. Gradient background (`primary` to `primary-container`). No border. `xl` roundedness. 
*   **Secondary:** Glassmorphic. `surface-variant` at 40% opacity with `backdrop-blur`. 
*   **States:** On hover, the primary button should "bloom" (increase inner glow), while the secondary button increases opacity.

### Cards & Lists
*   **Rule:** Forbid divider lines.
*   **Implementation:** Use vertical whitespace (from the spacing scale) or subtle background shifts (`surface-container-low` vs `surface-container-high`).
*   **Interactive Cards:** On hover, a card should scale slightly (1.02x) and transition from `surface-container` to a glassmorphic state with a `primary` ghost border.

### Input Fields
*   **Style:** Underline only or minimal glass container. Labels should use the `label-sm` (Bebas Neue) to mimic terminal inputs.
*   **Focus State:** The underline should transform into a `primary` glow.

### Additional Signature Components
*   **3D Hero Wrapper:** A container specifically for Three.js or Spline elements that sits behind the `display-lg` typography.
*   **The "Terminal" Chip:** Action chips using the mono font and a `primary` ghost border for tagging skills (e.g., `[ React ]`, `[ GLSL ]`).

---

## 6. Do's and Don'ts

### Do:
*   **Do** use extreme scale. Make your headlines huge and your metadata tiny.
*   **Do** allow 3D elements to "clash" with text. Overlapping creates a professional, editorial feel (Ref: Image 5).
*   **Do** use the `primary` green accent sparingly as a light source.

### Don't:
*   **Don't** use 100% opaque borders. They kill the futuristic, glass-like depth.
*   **Don't** use standard "drop shadows" (small blur, high opacity). They feel dated and "web 2.0."
*   **Don't** align everything to a center axis. Embrace the "Kinetic" asymmetry—push some elements to the far edges of the viewport to create tension.
*   **Don't** use pure white for body text. Use `on-surface-variant` (`#bbcabe`) to reduce eye strain and maintain the dark-mode atmosphere.

---
*Director’s Final Note: Remember, you are not building a website; you are building an interface for the future. Every pixel should feel like it was placed with surgical precision, yet the overall composition should feel alive and breathing.*
