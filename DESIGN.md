# Design System

Concrete tokens. No vibes. Implemented in `packages/ui/` as Tailwind v4 theme + CSS vars.

## Principles

1. **Dark canvas, iridescent accents.** Neutral 950 backgrounds. Iridescent gradient reserved for AI-interactive surfaces only.
2. **Type does the work.** Strong type hierarchy beats decorative imagery.
3. **No filler chrome.** Borders, shadows, gradients earn their pixels or disappear.
4. **Motion explains causality.** Animation reveals where state came from. No purely decorative motion.
5. **A11y is non-negotiable.** WCAG AA min, AAA on body text. Focus states always visible.

## Color

CSS variables, light + dark. Tailwind v4 `@theme` exports.

```css
@theme {
  /* Neutral canvas (dark default) */
  --color-bg:        oklch(0.145 0 0);    /* near-black */
  --color-surface:   oklch(0.205 0 0);    /* card */
  --color-surface-2: oklch(0.245 0 0);    /* elevated */
  --color-border:    oklch(0.305 0 0);
  --color-fg:        oklch(0.985 0 0);    /* primary text */
  --color-fg-muted:  oklch(0.708 0 0);    /* secondary */
  --color-fg-dim:    oklch(0.556 0 0);    /* tertiary */

  /* Brand: Cool Blue (consulting authority) */
  --color-brand-50:  oklch(0.97 0.02 240);
  --color-brand-500: oklch(0.62 0.19 250);
  --color-brand-600: oklch(0.55 0.21 252);
  --color-brand-700: oklch(0.48 0.20 254);

  /* Accent: iridescent (AI surfaces only) */
  --gradient-iridescent: linear-gradient(
    135deg,
    oklch(0.75 0.18 220) 0%,
    oklch(0.65 0.22 290) 50%,
    oklch(0.70 0.20 340) 100%
  );

  /* Semantic */
  --color-success: oklch(0.70 0.17 145);
  --color-warning: oklch(0.78 0.16 80);
  --color-danger:  oklch(0.62 0.22 25);
  --color-info:    var(--color-brand-500);
}

/* Light mode override */
:root[data-theme="light"] {
  --color-bg:        oklch(0.985 0.005 90);  /* Cloud Dancer */
  --color-surface:   oklch(1 0 0);
  --color-surface-2: oklch(0.97 0 0);
  --color-border:    oklch(0.92 0 0);
  --color-fg:        oklch(0.15 0 0);
  --color-fg-muted:  oklch(0.42 0 0);
  --color-fg-dim:    oklch(0.55 0 0);
}
```

Contrast guarantees:
- `fg` on `bg`: 16.1:1 (AAA)
- `fg-muted` on `bg`: 7.2:1 (AAA)
- `brand-500` on `bg`: 4.8:1 (AA)
- All interactive text ≥ 4.5:1

Iridescent gradient is **decorative only**. Never put text on it without solid scrim.

## Typography

```css
@theme {
  --font-sans:    "Inter Variable", system-ui, sans-serif;
  --font-display: "Space Grotesk Variable", var(--font-sans);
  --font-mono:    "JetBrains Mono Variable", ui-monospace, monospace;
}
```

Scale (1.250 / Major Third), modular via clamp() for fluid type:

| Token | Mobile | Desktop | Use |
|---|---|---|---|
| `text-xs` | 12 | 12 | Captions, labels |
| `text-sm` | 14 | 14 | Body small, UI |
| `text-base` | 16 | 16 | Body |
| `text-lg` | 18 | 18 | Body large, lead |
| `text-xl` | 20 | 22 | Subheads |
| `text-2xl` | 24 | 28 | H4 |
| `text-3xl` | 28 | 36 | H3 |
| `text-4xl` | 34 | 48 | H2 |
| `text-5xl` | 42 | 64 | H1 |
| `text-6xl` | 52 | 84 | Display |
| `text-7xl` | 64 | 112 | Hero |

Line height: 1.0 display, 1.15 headings, 1.5 body, 1.6 long-form.
Letter spacing: -0.04em display, -0.02em headings, 0 body, 0.04em uppercase labels.
Body weight: 400. Headings: 600. Display: 500 (lighter looks sharper at scale).

## Spacing

4px base. Use named scale, not arbitrary px.

`0, 1(4), 2(8), 3(12), 4(16), 5(20), 6(24), 8(32), 10(40), 12(48), 16(64), 20(80), 24(96), 32(128), 40(160)`

Rhythm: section padding `py-24` desktop / `py-16` mobile. Container max `max-w-7xl` (1280px) for marketing, `max-w-5xl` (1024px) for long-form.

## Radius

`sm 4 / md 8 / lg 12 / xl 16 / 2xl 24 / full 9999`

Cards: `lg`. Buttons: `md`. Inputs: `md`. Pill nav: `full`. Hero panels: `2xl`.

## Elevation

No big drop shadows. Use subtle layered shadows + 1px borders.

```css
--shadow-1: 0 1px 0 0 oklch(1 0 0 / 0.05) inset, 0 1px 2px oklch(0 0 0 / 0.4);
--shadow-2: 0 1px 0 0 oklch(1 0 0 / 0.06) inset, 0 4px 12px oklch(0 0 0 / 0.5);
--shadow-3: 0 1px 0 0 oklch(1 0 0 / 0.08) inset, 0 16px 40px oklch(0 0 0 / 0.6);
```

Glass surface (product cards):
```css
backdrop-filter: blur(20px) saturate(1.4);
background: oklch(1 0 0 / 0.04);
border: 1px solid oklch(1 0 0 / 0.08);
```

## Motion

```css
--ease-out:      cubic-bezier(0.16, 1, 0.3, 1);    /* expressive */
--ease-standard: cubic-bezier(0.4, 0, 0.2, 1);     /* material */
--ease-in:       cubic-bezier(0.4, 0, 1, 1);

--dur-instant: 75ms;
--dur-fast:    150ms;
--dur-base:    200ms;   /* default */
--dur-slow:    300ms;
--dur-reveal:  500ms;   /* hero, page transitions */
```

Rules:
- Hover/press: 150ms
- Modal/dialog enter: 200ms ease-out, exit 150ms ease-in
- Scroll-triggered reveal: 500ms ease-out, stagger 50ms per child
- Honor `prefers-reduced-motion`: disable all non-essential motion

## Components (priority order for `packages/ui`)

P0 (ship for v1):
- `Button` — variants: primary, secondary, ghost, link; sizes: sm/md/lg
- `Input`, `Textarea`, `Select`, `Checkbox`, `Switch`, `Label`, `Field` (compound)
- `Card`, `CardHeader`, `CardBody`, `CardFooter`
- `Badge`, `Tag`
- `Dialog`, `Sheet`, `Popover`, `Tooltip`, `DropdownMenu` (Radix)
- `Tabs`, `Accordion`
- `Toast` + `Toaster`
- `Skeleton`, `Spinner`
- `Container`, `Section`, `Grid`, `Stack` (layout primitives)
- `Heading`, `Text`, `Code`, `Kbd`
- `Logo`, `LogoMark`
- `Nav`, `NavItem`, `Footer`
- `Hero`, `HeroDemo` (interactive AI widget shell)
- `MetricStat`, `LogoCloud`, `Testimonial`
- `CaseStudyCard`, `ProductCard`, `InsightCard`
- `CodeBlock` (Shiki, copy-to-clipboard)
- `MdxComponents` (insights rendering)

P1 (post-v1):
- `Chart` wrappers (Tremor or visx)
- `DataTable` (TanStack Table)
- `Command` (cmdk palette, ⌘K)
- `Avatar`, `Comment`, `ActivityFeed`

All components composable, polymorphic via `asChild` (Radix Slot). No `forwardRef` boilerplate where avoidable (React 19 lets refs through props).

## Layout patterns

- **Bento grid** for `/studio` portfolio (asymmetric, varied tile sizes, story-driven)
- **Editorial column** for `/insights/*` (max-w-prose, drop caps optional)
- **Split hero** for solution pages (copy left, demo right, mobile stacks)
- **Single pane of glass** for authed product dashboards (left nav rail + main + right detail)

## Iconography

- Lucide as base set
- Custom AI-domain icons (model, agent, RAG, embedding) commissioned later — placeholder Lucide for v1
- Stroke 1.5px standard, 2px on small sizes for legibility

## Accessibility checklist (per page)

- [ ] All interactive elements keyboard reachable, visible focus ring (2px brand-500 + 2px offset)
- [ ] Heading order strict (no skipped levels)
- [ ] Form labels explicit, error messages linked via `aria-describedby`
- [ ] Color never sole signal (status uses icon + text + color)
- [ ] Live demo widgets announce results via `aria-live="polite"`
- [ ] Reduced motion alt for any auto-playing visual
- [ ] Tested with VoiceOver (Safari) + NVDA (Firefox) per release

## Don'ts

- No glowing neural-net abstract backgrounds
- No purple-blue radial gradients on hero (overused; tired)
- No 3D blob shaders (perf cost, dated)
- No autoplay video with audio
- No "AI sparkle" emoji-style icons in product UI
- No Lottie animations >100KB
- No font weights below 400 on body text

## Reference inspiration (vet, don't copy)

Linear, Vercel, Stripe Press, Anthropic, Replit, Arc browser site, Cursor, Modal, Hex.
