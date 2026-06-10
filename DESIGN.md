# Design

## Color

**Strategy:** Committed dual-tone. Blue carries institutional authority (navigation, headings, trusted structural elements). Red drives action (primary CTAs, membership call-to-action, emphasis). White provides breathing room. Color is voice here — don't hedge with neutral gray surfaces.

**Design reference:** [World Peace Foundation](https://worldpeacefoundation.org) — institutional credibility through editorial restraint, content-first layouts, generous whitespace, and strong typographic hierarchy. Applied to CAPACE: take that structural discipline and apply it with committed color rather than black-and-white austerity.

All values in OKLCH. The existing pastel red and blue have been shifted to full saturation while preserving hue identity.

```css
:root {
  /* Brand colors */
  --color-red:          oklch(0.52 0.22 18);
  --color-red-dark:     oklch(0.42 0.20 18);
  --color-red-light:    oklch(0.93 0.06 18);

  --color-blue:         oklch(0.46 0.19 248);
  --color-blue-dark:    oklch(0.36 0.18 248);
  --color-blue-light:   oklch(0.93 0.06 248);

  /* Surfaces */
  --color-bg:           oklch(0.985 0.004 248);
  --color-surface:      oklch(0.97 0.006 248);
  --color-white:        oklch(0.99 0 0);

  /* Ink */
  --color-ink:          oklch(0.18 0.025 248);
  --color-ink-muted:    oklch(0.50 0.028 248);

  /* Border */
  --color-border:       oklch(0.88 0.014 248);
}
```

**Contrast targets (WCAG AA):**
- Body ink (`--color-ink`) on `--color-bg`: verified ≥ 7:1
- `--color-ink-muted` on `--color-bg`: verify ≥ 4.5:1 — if not, shift lightness down to ~0.45
- White text on `--color-blue`: verify ≥ 4.5:1
- White text on `--color-red`: verify ≥ 4.5:1

## Typography

**Brand-voice words:** warm, authoritative, grounded.  
**Physical object:** a well-designed trade association yearbook from a respected regional institution — printed, substantial, forward-looking.

**Primary family: Manrope** (Google Fonts, variable weight 200–800)  
Geometric-humanist with warm rounded forms and a slight technical quality appropriate for a digital-commerce chamber. Variable font — use weight as the primary hierarchy tool. Does not appear on the reflex-reject list.

Single-family approach: weight contrast alone (300 body → 700/800 headings) is stronger than adding a second family without a voice reason.

```css
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap');

:root {
  --font-base: 'Manrope', system-ui, sans-serif;
}
```

**Scale (fluid, modular — 1.333 ratio):**

```css
:root {
  --text-sm:      clamp(0.80rem, 1.5vw,  0.875rem);
  --text-base:    1rem;                                  /* 16px */
  --text-md:      clamp(1.05rem, 1.8vw,  1.125rem);
  --text-lg:      clamp(1.15rem, 2vw,    1.33rem);
  --text-xl:      clamp(1.33rem, 2.5vw,  1.77rem);
  --text-2xl:     clamp(1.6rem,  3.5vw,  2.36rem);
  --text-3xl:     clamp(2rem,    4.5vw,  3.15rem);
  --text-display: clamp(2.5rem,  6vw,    4.5rem);
}
```

**Assignments:**
- Display hero heading: `--text-display`, weight 800
- H1: `--text-3xl`, weight 700
- H2: `--text-2xl`, weight 700
- H3: `--text-xl`, weight 600
- Body: `--text-base`, weight 400, line-height 1.65
- Body large (lead paragraph): `--text-md`, weight 300, line-height 1.7
- Labels / meta: `--text-sm`, weight 600, no all-caps
- Body line length: max 68ch

## Spacing

4px base unit. Use these tokens; vary for rhythm — generous separations between sections, tight groupings within.

```css
:root {
  --space-1:  4px;
  --space-2:  8px;
  --space-3:  12px;
  --space-4:  16px;
  --space-6:  24px;
  --space-8:  32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
  --space-24: 96px;
  --space-32: 128px;
}
```

Section vertical padding: `clamp(var(--space-16), 10vw, var(--space-32))`  
Content max-width: 1200px (marketing), 720px (prose/blog)  
Gutter: `clamp(var(--space-6), 5vw, var(--space-10))`

## Layout

**Reference move:** WPF uses a centered single-column hero with a bold mission statement (no full-bleed image), then drops into a generous three-column content grid. That pattern — restraint at the top, content density below — is the structural template for CAPACE.

- **Hero:** centered, single-column, typographic-led. Large bold heading, one lead sentence, one or two CTAs. Clean white or `--color-bg` background. The heading does the work; don't compete with a full-bleed image unless a real, decisive photo is available.
- **Content sections:** three-column grid for news, events, and blog (`repeat(3, 1fr)`, collapses to 2 then 1 on mobile). Image-top card structure: thumbnail → category label → title → meta (date, author).
- Fluid single-column grid for member directory (two-column on desktop)
- Break the centered column for emphasis — stats sections can use asymmetric two-column splits (large number + label offset from explanatory text)
- Z-index scale: `dropdown(100) sticky(200) modal-backdrop(300) modal(400) toast(500) tooltip(600)`
- Cards are reserved for: member directory, event listings, blog index. Not for stats, not for process steps.

### Editorial content patterns (from WPF reference)

**Large date stamps.** For news and events, render the date as a large typographic element — day/month in `--text-2xl` weight 700 `--color-blue`, year in `--text-sm` weight 400 `--color-ink-muted` — flush left above the card title. More expressive than a small metadata line; lets the date be part of the design.

**Category tags.** Plain linked text, not pill badges. `--text-sm` weight 600, `--color-red` for brand category links. No border, no background. Sits above or below the card title depending on the surface.

**Section labels.** Bold weight, `--text-base` or `--text-lg`, `--color-ink`. Short, direct ("Actividades recientes", "Socios destacados"). No eyebrow treatment, no tracking, no uppercase.

## Motion

**Energy: Subtle.** Motion confirms actions and guides attention; it does not perform.

```css
:root {
  --ease-out: cubic-bezier(0.25, 1, 0.5, 1);   /* ease-out-quart */
  --duration-fast: 150ms;
  --duration-base: 250ms;
  --duration-slow: 350ms;
}

/* Pattern for scroll reveals */
.reveal {
  opacity: 1;
  transform: none;
}

@media (prefers-reduced-motion: no-preference) {
  .reveal[data-state="hidden"] {
    opacity: 0;
    transform: translateY(12px);
  }
  .reveal[data-state="visible"] {
    opacity: 1;
    transform: none;
    transition: opacity var(--duration-slow) var(--ease-out),
                transform var(--duration-slow) var(--ease-out);
  }
}
```

**Rules:**
- Default visible. Never gate content visibility behind a JS-triggered class.
- No bounce, no elastic easing.
- Page-load: a single coordinated fade on hero text + CTA (stagger 60ms between elements). One entrance, not one per section.
- Hover states: `--duration-fast` transitions on color, background, border-color, box-shadow.
- Scroll reveals only on content below the fold, and only when `prefers-reduced-motion: no-preference`.

## Components

### Buttons

Two variants. Both use Manrope 600.

**Primary (red — for join, contact, high-intent CTAs):**
```css
.btn-primary {
  background: var(--color-red);
  color: var(--color-white);
  padding: var(--space-3) var(--space-8);
  border-radius: 6px;
  font-weight: 600;
  transition: background var(--duration-fast) var(--ease-out);
}
.btn-primary:hover { background: var(--color-red-dark); }
```

**Secondary (blue — for learn more, secondary actions):**
```css
.btn-secondary {
  background: transparent;
  color: var(--color-blue);
  border: 1.5px solid var(--color-blue);
  padding: var(--space-3) var(--space-8);
  border-radius: 6px;
  font-weight: 600;
  transition: background var(--duration-fast) var(--ease-out),
              color var(--duration-fast) var(--ease-out);
}
.btn-secondary:hover {
  background: var(--color-blue);
  color: var(--color-white);
}
```

### Hero section

Centered, typographic-led. `--color-bg` or white background — no gradient, no full-bleed overlay (unless a real decisive photo is available). Structure:

```
[nav]
──────────────────────────────────────────────
  [pre-label: org type — small, --color-red, weight 600]

  [Display heading, Manrope 800, --color-ink, text-wrap: balance]

  [Lead sentence, --text-md, weight 300, --color-ink-muted, max 60ch]

  [btn-primary "Asociarse"] [btn-secondary "Conocer más"]
──────────────────────────────────────────────
[content sections below]
```

No hero stat counters. Keep the fold clean. Stats live in a dedicated section below.

### Navigation

Sticky top nav. Blue background (`--color-blue`), white text, red accent on active/hover items. Max-width contained; full-width bg. Logo left, links center-right, "Asociarse" CTA button (red) rightmost.

### Cards (member / event use only)

White background, `--color-border` border at 1px, `border-radius: 8px`. No drop shadow by default — use border. On hover: subtle `box-shadow: 0 4px 16px oklch(0 0 0 / 0.08)` with `--duration-fast` transition.

### Stats / Impact numbers

Not in cards. Use large Manrope 800 numbers in `--color-blue` or `--color-red` on the `--color-bg` surface, with a short label in `--text-sm` weight 500 `--color-ink-muted` directly below. No icon, no card, no border. Let the number be the thing.

## Imagery

**Reference move:** WPF uses imagery purposefully in content cards (research area illustrations, documentary photography) but lets the hero be typographic. CAPACE follows the same logic: imagery serves the content, not the decoration.

- **Hero:** typography-led by default. If real event or team photography is available, a full-bleed hero with overlaid text is a strong move. Without real assets, keep the hero clean and white — a strong headline beats a generic stock photo.
- **Content cards:** image-top thumbnails for news, events, and blog. Consistent aspect ratio (16:9 or 3:2). Use real CAPACE event photos wherever available.
- When stock photos are necessary, search for specific scenes in Paraguayan or regional Latin American professional contexts — verify Unsplash photo IDs before referencing.
- Alt text in Spanish, specific ("Equipo de CAPACE en el Congreso de Ecommerce 2024", not "personas en reunión")
- Avoid: handshake stock photos, office-generic imagery, international "business" photography with no local specificity

## Anti-pattern reminders

- No side-stripe borders (border-left accent on cards/callouts)
- No gradient text
- No glassmorphism
- No identical icon-heading-text card grids repeated for every section
- No eyebrow labels (`SOBRE NOSOTROS · PROCESO · SERVICIOS`) above every heading
- No numbered section markers (01 / 02 / 03) unless the section genuinely is a sequence
