# LineChartCard — Numeric Specification

- Status: partial
- Source-of-truth order: PDF (page N) > component doc > implemented CSS
- CSS block: `.ds-line-chart` (styles.css — PDF-context block)
- Export: packages/ui/src/components/LineChartCard.tsx
- PDF reference: none cited
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
| series color default | var(--ds-color-teal) via prop default | --ds-color-teal | knowledge/components/LineChartCard.md | — |

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
- PDF page not cited.
- SVG viewBox constants in TSX were not changed.
