# LineChartCard — Numeric Specification

- Status: partial
- Source-of-truth order: PDF (page N) > component doc > implemented CSS
- CSS block: `.ds-line-chart` (styles.css — PDF-context block)
- Export: packages/ui/src/components/LineChartCard.tsx
- PDF reference: p.9 "GRAFICOS" (page index 8), "Líneas" legend block — found 2026-08-05, was "none
  cited". Legend: "Número: Montserrat Extra Light - 10pt - #FFFFFF - #ff0404. Referencia:
  Montserrat Extra Light - 16pt - #8a8b87. Línea: 0,75pt - #c1c1c1. Fondo cuadrícula: 0,25pt -
  #8a8b87."
- Scale: display values = PDF annotation ÷ 2 (see [specs/README.md — Scale calibration](../README.md#scale-calibration))

## Dimensions
| Property | Value | Unit | Source | Delta vs PDF/doc |
|----------|------:|------|--------|------------------|
| grid stroke-width | 0.5 | (unitless CSS; was 1) | styles.css | display = 1÷2 |
| line stroke-width | 1 | (unitless; was 2) | styles.css | display = 2÷2 |
| area opacity | 0.18 | — | styles.css | — |
| label font-size | 4 | px | styles.css | display = 8÷2 |

## Color
| Role | Value | Matching --ds-* token? | Source | Delta |
|------|-------|------------------------|--------|-------|
| label fill | #8a8b87 | --ds-color-pdf-ink-muted | styles.css | — |
| grid stroke | rgb(255 255 255 / 0.08) | UNTOKENIZED — candidate | styles.css | — |
| series color default | var(--ds-color-pdf-line) (#c1c1c1) via prop default | --ds-color-pdf-line | LineChartCard.tsx (changed 2026-08-05) | was `--ds-color-teal` — PDF legend: "Línea: 0,75pt - #c1c1c1", a gray line, not teal. Line/area/point all derive from this one `color` prop, so all three followed. |

## Typography
| Element | Font family | Size | Weight | Letter-spacing | Line-height | Casing | Source |
|---------|-------------|------|--------|----------------|-------------|--------|--------|
| label | var(--ds-font-display) | 4px | UNVERIFIED | 0.08em | UNVERIFIED | uppercase | styles.css — display = 8÷2 |

## Spacing
| Region | Padding | Gap | Margin | Source |
|--------|---------|-----|--------|--------|
| (CSS) | UNVERIFIED | UNVERIFIED | UNVERIFIED | path geometry in TSX; not styles.css |

## Variants / modifiers present in CSS
| Class | Effect | Source | Backed by CSS? (yes/no) |
|-------|--------|--------|-------------------------|
| .ds-line-chart__grid | grid stroke | styles.css | yes |
| .ds-line-chart__area | area opacity | styles.css | yes |
| .ds-line-chart__line | stroke width | styles.css | yes |
| .ds-line-chart__label | labels | styles.css | yes |

## Deltas & open questions (facts only — DO NOT resolve)
- Point radius 3 cited in knowledge/components/LineChartCard.md as TSX — not present as a CSS literal.
- **Not implemented: per-point red highlight.** PDF legend's "Número: ... #FFFFFF - #ff0404" and
  the visible red-highlighted low point + "50" label in the PDF's own "Líneas" example suggest a
  specific data point (e.g. a low/alert value) can get a red number label distinct from the rest.
  `LineChartCard` has no such per-point override today — every point/label shares the one `color`
  prop. Not attempted this session (would be a real API addition, not a CSS fix).
- Same page-extraction caveat as `BarChartCard.spec.md`/`DonutChartCard.spec.md` — page index 8
  mixes this reference diagram with an unrelated dashboard mockup in overlapping coordinates.
- SVG viewBox constants in TSX were not changed.
