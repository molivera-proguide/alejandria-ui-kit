# BarChartCard — Numeric Specification

- Status: partial
- Source-of-truth order: PDF (page N) > component doc > implemented CSS
- CSS block: `.ds-bar-chart / .ds-bar-chart__label` (styles.css — PDF-context block)
- Export: packages/ui/src/components/BarChartCard.tsx
- PDF reference: p.9 "GRAFICOS" (page index 8), "Barras" legend block — found 2026-08-05, was "none
  cited". Legend: "Título: Source Code Bold - 16pt - #8a8b87 - Uppercase - Interletrado 410.
  Referencia: Montserrat Extra Light - 16pt - #FFFFFF. Barra tradicional: 15px de ancho - #c1c1c1 -
  #8a8b87 - #060606. Fondo cuadrícula: 0,25pt - #8a8b87."
- Scale: display values = PDF annotation ÷ 2 (see [specs/README.md — Scale calibration](../README.md#scale-calibration))

## Dimensions
| Property | Value | Unit | Source | Delta vs PDF/doc |
|----------|------:|------|--------|------------------|
| svg max-width | 100% | % | styles.css | — |
| label font-size | 4 | px | styles.css | display = 8÷2 |
| bar outline | 0.75 | px (SVG stroke-width, unitless in viewBox coords) | styles.css (added 2026-08-05) | not a PDF measurement — added because the darkest fill in the grayscale cycle (`--ds-color-pdf-surface`, #060606) is visually identical to `.ds-chart-card`'s own background; without an outline that bar disappears entirely. See Color below. |
| bar width (PDF legend) | 15 | px (as literally stated in the legend, not confirmed ÷2) | PDF legend | **not applied** — bar width in code is computed from `CHART_WIDTH`/data length/gap in `BarChartCard.tsx`, not a fixed px; this legend value wasn't cross-checked against a clean vector measurement this session (the PDF page mixes this reference diagram with an unrelated, larger dashboard mockup in the same coordinate space, which made isolating a clean vector bbox for just the "Barras" bars unreliable — see Deltas). |

## Color
| Role | Value | Matching --ds-* token? | Source | Delta |
|------|-------|------------------------|--------|-------|
| label fill | #8a8b87 | --ds-color-pdf-ink-muted | styles.css | — |
| bar fill (default cycle) | #c1c1c1 / #8a8b87 / #060606 | --ds-color-pdf-line / --ds-color-pdf-ink-muted / --ds-color-pdf-surface | BarChartCard.tsx (changed 2026-08-05) | **was a 5-color rainbow** (`--ds-color-teal/blue/green/amber/coral`) — PDF legend explicitly gives 3 grayscale hex values for "Barra tradicional", not a rainbow. Cycling 3 colors across N bars means the pattern repeats; `BarChartDatum.color` still overrides per-datum as before. |
| bar outline | rgb(193 193 193 / 0.6) | --ds-color-pdf-line-a60 | styles.css (added 2026-08-05) | not a PDF-specified value — a defensive visibility fix, see Dimensions above |

## Typography
| Element | Font family | Size | Weight | Letter-spacing | Line-height | Casing | Source |
|---------|-------------|------|--------|----------------|-------------|--------|--------|
| label | var(--ds-font-display) | 4px | UNVERIFIED | 0.08em | UNVERIFIED | uppercase | styles.css — display = 8÷2 |

## Spacing
| Region | Padding | Gap | Margin | Source |
|--------|---------|-----|--------|--------|
| (CSS) | UNVERIFIED | UNVERIFIED | UNVERIFIED | layout constants live in TSX (viewBox coords) |

## Variants / modifiers present in CSS
| Class | Effect | Source | Backed by CSS? (yes/no) |
|-------|--------|--------|-------------------------|
| .ds-bar-chart | display block sizing | styles.css | yes |
| .ds-bar-chart__label | label typography/fill | styles.css | yes |
| .ds-bar-chart__bar | bar fill | knowledge/components/BarChartCard.md | no |

## Deltas & open questions (facts only — DO NOT resolve)
- `.ds-bar-chart__bar` now has a CSS rule (added 2026-08-05, the outline above); fill remains
  inline via the SVG `fill` attribute, set from `CHART_COLORS`/`BarChartDatum.color` in the TSX.
- Chart container metrics belong to ChartCard.spec.md.
- **PDF page's own vector data for this specific reference diagram was not cleanly isolated.**
  `page.get_drawings()`/`get_text()` on page index 8 returned a mix of this "Barras" reference
  diagram AND an unrelated, much larger dashboard mockup (precipitation/incident data) that
  appears to share the same page — possibly overlapping PDF layers/OCGs, since some text spans
  came back duplicated at identical coordinates with different colors. The 3-color fill cycle and
  the overall legend text are trusted (read directly off the user-supplied screenshot, unambiguous
  text); the exact bar width/spacing numbers were not independently re-derived from a clean vector
  bbox this session the way TaskCard/InvestigationCard's were — treat those two as provisional if
  ever revisited.
- SVG viewBox constants in TSX were not changed (responsive via CSS `width: 100%`).
