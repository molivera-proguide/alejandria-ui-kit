# LinearBarChartCard — Numeric Specification

- Status: measured
- Source-of-truth order: PDF (page 9) > component doc > implemented CSS
- CSS block: `.ds-linear-bar-chart*` (styles.css, right before the Scrollbar block)
- Export: packages/ui/src/components/LinearBarChartCard.tsx
- PDF reference: p.9 "GRAFICOS" › "Barras lineal horizontal" / "Barras lineal vertical" (`doc[8]`,
  mediabox 1920×1080 confirms @2×) — **not** `doc[9]`/p.10, which is a separate page (also titled
  "GRAFICOS") already covered by `BarChartCard`/`DonutChartCard`/`LineChartCard`.
- New component 2026-08-06: `knowledge/component-roadmap.md` had marked "Gráficos | p.9–10 | ✅ | ✅"
  attributing both pages to the existing 4 chart components — that was stale/incorrect for p.9;
  only p.10's chart types were ever built. See `knowledge/fidelity-pass/next-steps.md`.

## Dimensions
| Property | Value | Unit | Source | Delta vs PDF/doc |
|----------|------:|------|--------|------------------|
| line/bar stroke | 2.5 | px | styles.css | PDF «Barra lineal: 5pt» @2× ÷2. `get_drawings()`'s own measured stroke width on this page is `4.436` (@2×) → ÷2 = 2.218px, not 2.5px — see the "0.887 ratio" note below; the legend's round number was used, not the diagram's raw measured value. |
| horizontal row gap | 9 | px | styles.css | measured from `get_drawings()` row-line y-coordinates (deltas ≈17.75pt @2× between consecutive rows) ÷2 |
| vertical bar-to-bar gap (`.ds-linear-bar-chart--vertical`'s `column-gap`, uniform across the whole chart) | 15 | px | styles.css | measured from `get_drawings()` bar-center x-coordinates: consistent ≈35.49pt @2× center-to-center spacing across the whole chart (not tighter within a month-group than between groups) ÷2 ≈17.7px, minus the 2.5px stroke width ≈15px edge-to-edge. **Fixed twice**: first pass used an unmeasured `4px` (overlapping value labels); second pass (user-reported, same session) nested each group in its own flex row with this 15px gap *inside* the group but `justify-content: space-between` *between* groups of differing bar counts — inconsistent spacing overall, since space-between's distributed gap depends on how much leftover space each group's flex item has. Rewritten to a single CSS grid (one column per bar, spanning group boundaries) so `column-gap: 15px` alone governs every bar-to-bar distance, matching the PDF's own uniform spacing; group labels use `grid-column: start / span count` to stay centered under their own bars without needing a per-group wrapper. |
| bar-value offset above bar (vertical) | 10 | px (`top: -10px`) | styles.css | not independently measured; chosen to clear the label text above the bar tip, same spirit as other "no PDF figure, reasonable default" gaps elsewhere in this kit |
| ring→label gap (n/a here) | — | — | — | (not applicable to this component) |

## The "0.887 ratio" — a page-specific scale artifact (facts only)

On this specific PDF page, every text-size and stroke-width measurement taken directly from
`get_drawings()`/`get_text()` comes out to almost exactly **0.887×** the round number the page's own
prose legend states for that same element:

| Element | Legend (round, @2×) | Measured (`get_drawings()`/`get_text()`, @2×) | Ratio |
|---------|---------------------:|----------------------------------------------:|------:|
| Título / Referencia font-size | 16pt | 14.19pt | 0.887 |
| Número grande font-size | 20pt | 17.74pt | 0.887 |
| Barra lineal stroke-width | 5pt | 4.436pt | 0.887 |

This is consistent across three unrelated properties (two different font-size roles and a stroke
width), which rules out per-element noise — it reads as a uniform ~88.7% down-scale applied to this
one diagram instance during export (e.g. a Figma frame resized after its type styles were already
set), not a deliberate design change. **This spec uses the legend's round numbers ÷2 as the true
values** (8px/10px title/número, 2.5px stroke), not the diagram's own raw measured figures — the
opposite of the usual "trust geometry over legend" rule from earlier pages in this pass, because
here the legend's numbers are round/clean and the geometry is the one showing a uniform, explicable
distortion. The PDF's "Torta" section on this same page (see `ProgressRing.spec.md`) shows **no**
such ratio — its measured stroke widths (15pt/7pt) and font sizes (18pt/20pt) match its own legend
exactly, confirming this is a page-*instance* artifact (this one diagram), not a page-*wide*
extraction problem.

## Color
| Role | Value | Matching --ds-* token? | Source | Delta |
|------|-------|------------------------|--------|-------|
| line/bar default | #e6e6e6 | --ds-color-pdf-line-light | `get_drawings()` stroke `(0.902, 0.902, 0.902)` on every non-highlighted line/bar | PDF legend literally says «Barra lineal: 5pt - #FFFFFF - #ff0404», i.e. white default — but the diagram's own drawn color is #e6e6e6, not #ffffff. Unlike the size/stroke-width ratio above, colors on this page showed **no** systematic distortion elsewhere (every text-color measurement matched its legend exactly) — this specific delta (FFFFFF vs e6e6e6) is treated as a loose/imprecise legend statement, same pattern as other pages' minor color rounding, and the measured color was used. |
| line/bar destacada | #ff0404 | --ds-color-pdf-critical | `get_drawings()` stroke `(1.0, 0.016, 0.016)` on the top-ranked row/bar; legend «Número o referencia destacada: #ff0404» | exact match |
| label/value text | #ffffff | --ds-color-white | `get_text()` span color `0xffffff` on non-highlighted rows | exact match |
| destacada text | #ff0404 | --ds-color-pdf-critical | `get_text()` span color `0xff0404` on the highlighted row's label *and* value | exact match — confirms "destacada" applies to label+value text too, not only the line |

## Typography
| Element | Font family | Size (legend, ÷2) | Weight | Casing | Source |
|---------|-------------|-------------------:|--------|--------|--------|
| Título (chart title, owned by `ChartCard`, not this component) | Montserrat Extra Light | 8px | 300 | uppercase | PDF «Título: Montserrat Extra Light - 16pt - #8a8b87 - Uppercase» |
| Número grande (horizontal value) | Montserrat Bold | 10px | 700 | none | PDF «Número grande: Montserrat Bold - 20pt - #FFFFFF» |
| Número chico (vertical bar-value) | Montserrat Extra Light | 5px | 300 | none | PDF «Número chico: Montserrat Extra Light - 10pt - #FFFFFF» |
| Referencia (row/group label) | Montserrat Extra Light | 8px | 300 | none | PDF «Referencia: Montserrat Extra Light - 16pt - #FFFFFF» |

All four sizes above are the legend's own round pt values ÷2 — see the "0.887 ratio" section for
why the diagram's raw measured sizes (which are ~11% smaller) were not used directly.

## Variants / modifiers present in CSS
| Class | Effect | Backed by CSS? |
|-------|--------|-----------------|
| `.ds-linear-bar-chart--horizontal` | ranking rows | yes |
| `.ds-linear-bar-chart--vertical` | grouped bars | yes |
| `.ds-linear-bar-chart__row--highlighted` | red line + text | yes |
| `.ds-linear-bar-chart__bar-vertical--highlighted` | red bar + value text | yes |

## Deltas & open questions (facts only — DO NOT resolve)

- **No background track:** the PDF draws only the value-proportional line/bar, no full-width/height
  backdrop behind it (confirmed: `get_drawings()` has exactly one shape per data point on this
  page, not two). `.ds-linear-bar-chart__track`/`.ds-linear-bar-chart__bar-vertical`'s parent are
  plain layout containers, not a second visible "track" element.
- **Horizontal row's bar-column width (40px) is not a PDF measurement** — the PDF's own bar-area
  spans up to ~83px display (166.36pt @2× max observed length) before the label/value columns
  begin at fixed x-positions independent of each row's own bar length. This component instead ties
  the bar's own container to a fixed 40px column and label/value to `1fr`/`auto` — a reasonable
  generic layout for arbitrary data, not a literal replica of the one PDF example's exact
  coordinates (same category of simplification `BarChartCard`/`LineChartCard` already make with
  their own fixed `CHART_WIDTH`/`CHART_HEIGHT` constants).
- **Vertical `.ds-linear-bar-chart--vertical`'s row-1 height (70px, via `grid-template-rows`) is not a PDF measurement** — a plot
  budget chosen to fit comfortably inside `ChartCard`'s existing chrome, same category as
  `BarChartCard`'s own `CHART_HEIGHT` constant.
- **Default color legend delta** — see Color table above (#FFFFFF stated, #e6e6e6 measured).
