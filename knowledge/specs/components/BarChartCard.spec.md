# BarChartCard — Numeric Specification

- Status: partial
- Source-of-truth order: PDF (page N) > component doc > implemented CSS
- CSS block: `.ds-bar-chart / .ds-bar-chart__label` (styles.css — PDF-context block)
- Export: packages/ui/src/components/BarChartCard.tsx
- PDF reference: none cited
- Scale: display values = PDF annotation ÷ 2 (see [specs/README.md — Scale calibration](../README.md#scale-calibration))

## Dimensions
| Property | Value | Unit | Source | Delta vs PDF/doc |
|----------|------:|------|--------|------------------|
| svg max-width | 100% | % | styles.css | none cited |
| label font-size | 4 | px | styles.css | display = 8÷2 |

## Color
| Role | Value | Matching --ds-* token? | Source | Delta |
|------|-------|------------------------|--------|-------|
| label fill | #8a8b87 | --ds-color-pdf-ink-muted | styles.css | — |
| bar fill | inline SVG attr (not CSS) | UNTOKENIZED — candidate | knowledge/components/BarChartCard.md | — |

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
- `.ds-bar-chart__bar` has no CSS; fill is inline (knowledge/components/BarChartCard.md).
- Chart container metrics belong to ChartCard.spec.md.
- PDF page not cited.
- SVG viewBox constants in TSX were not changed (responsive via CSS `width: 100%`).
