# ChartCard — Numeric Specification

- Status: partial
- Source-of-truth order: PDF (page N) > component doc > implemented CSS
- CSS block: `.ds-chart-card` (styles.css — PDF-context block)
- Export: packages/ui/src/components/ChartCard.tsx
- PDF reference: p.9 "GRAFICOS" (page index 8) — found 2026-08-05, was "none cited". Legend on that
  page ("Fondo: cuando está en pantalla de reporting: #060606 - 20% de opacidad. Borde: 0,75pt -
  #c1c1c1") applies to the shared `.ds-chart-card` shell used by Bar/Donut/Line; the per-chart-type
  legend blocks ("Barras"/"Torta"/"Líneas") belong to the individual chart specs.
- Scale: display values = PDF annotation ÷ 2 (see [specs/README.md — Scale calibration](../README.md#scale-calibration))

Corrected 2026-08-05: the Storybook `Gallery` story had no explicit dark decorator background —
same bug as `Empty`/`SideBar`/etc. (backgrounds addon not registered in
`packages/ui/.storybook/main.ts`). `.ds-chart-card`'s 20%-opacity black background washed out light
gray on Storybook's default canvas instead of looking dark. Fixed in `ChartCard.stories.tsx`'s
meta-level decorator (`background: var(--ds-color-pdf-surface)`), same pattern as the other fixed
stories.

## Dimensions
| Property | Value | Unit | Source | Delta vs PDF/doc |
|----------|------:|------|--------|------------------|
| border-width | 0.75 | px | styles.css | **changed 2026-08-05** — was `--ds-border-width-1` (1px); PDF legend says "Borde: 0,75pt", the hairline convention used everywhere else in this file (`--ds-border-width-hair`). |
| border-radius | var(--ds-radius-xs) → 2 | px | styles.css | — |
| min-width | 110 | px | styles.css | display = 220÷2 |
| max-width | 280 | px | styles.css (added 2026-07-28) | native SVG `viewBox` width shared by Line/BarChartCard — not a PDF measurement, an intrinsic one; caps growth in a wide grid cell instead of upscaling. See anti-examples §7. |
| padding | 5 | px | styles.css | display = 10÷2 |
| gap | 5 | px | styles.css | display = 10÷2 |
| body min-height | 60 | px | styles.css | display = 120÷2 |
| body gap | 6 | px | styles.css | was `--ds-space-3` → 6px calibrated |

## Color
| Role | Value | Matching --ds-* token? | Source | Delta |
|------|-------|------------------------|--------|-------|
| background | rgb(6 6 6 / 0.2) | --ds-color-pdf-surface-a20 | styles.css | — |
| border | rgb(193 193 193 / 0.6) | --ds-color-pdf-line-a60 | styles.css | — |
| title | #8a8b87 | --ds-color-pdf-ink-muted | styles.css | — |
| footer | #ffffff | --ds-color-white | styles.css | — |

## Typography
| Element | Font family | Size | Weight | Letter-spacing | Line-height | Casing | Source |
|---------|-------------|------|--------|----------------|-------------|--------|--------|
| title | var(--ds-font-display) | 0.9rem (`--ds-text-chart`) | 700 | 0.25em | 1.25 | uppercase | rem — not scaled |
| footer | var(--ds-font-body) | 0.9rem | 300 | UNVERIFIED | UNVERIFIED | none | rem — not scaled |

## Spacing
| Region | Padding | Gap | Margin | Source |
|--------|---------|-----|--------|--------|
| root | 5px | 5px | — | styles.css (display scale) |
| body | — | 6px | — | styles.css |
| title | — | — | 0 | styles.css |

## Variants / modifiers present in CSS
| Class | Effect | Source | Backed by CSS? (yes/no) |
|-------|--------|--------|-------------------------|
| (none) | single appearance | styles.css | yes |

## Deltas & open questions (facts only — DO NOT resolve)
- **Title/footer font-size is `rem`-based (0.9rem ≈ 14.4px), not the PDF's literal ÷2 value.** PDF
  legend says "Título: Source Code Bold - 16pt" for all three chart types → ÷2 = 8px, and doesn't
  give a footer size directly (footer is the chart's own free-text description, not a Barras/
  Torta/Líneas legend field). Not changed this session — a 8px title reads as too small for a real
  UI element compared to the PDF's abstract spec diagram, and no evidence surfaced that the
  original `rem` choice was accidental rather than a deliberate legibility tradeoff (the same kind
  of tension flagged for ficha `MetricCard` label contrast in `component-roadmap.md`). Flagging
  the literal delta here without resolving it either way.
- Hardcoded PDF greys vs dual `--ds-*` palette — duplication candidates only.
