# LineChartCard — Numeric Specification

- Status: partial
- Source-of-truth order: PDF (page N) > component doc > implemented CSS
- CSS block: `.ds-line-chart` (styles.css:1278–1294; 1360–1372)
- Export: packages/ui/src/components/LineChartCard.tsx
- PDF reference: none cited

## Dimensions
| Property | Value | Unit | Source | Delta vs PDF/doc |
|----------|------:|------|--------|------------------|
| grid stroke-width | 1 | px (unitless 1 in CSS) | styles.css:1362 | none cited |
| line stroke-width | 2 | (unitless) | styles.css:1371 | none cited |
| area opacity | 0.18 | — | styles.css:1366 | none cited |
| label font-size | 8 | px | styles.css:1291 | none cited |

## Color
| Role | Value | Matching --ds-* token? | Source | Delta |
|------|-------|------------------------|--------|-------|
| label fill | #8a8b87 | --ds-color-ink-soft (semantic dup) | styles.css:1289 | — |
| grid stroke | rgb(255 255 255 / 0.08) | UNTOKENIZED — candidate | styles.css:1361 | — |
| series color default | var(--ds-color-teal) via prop default | --ds-color-teal | knowledge/components/LineChartCard.md | — |

## Typography
| Element | Font family | Size | Weight | Letter-spacing | Line-height | Casing | Source |
|---------|-------------|------|--------|----------------|-------------|--------|--------|
| label | var(--ds-font-display) | 8px | UNVERIFIED | 0.08em | UNVERIFIED | uppercase | styles.css:1287–styles.css:1293 |

## Spacing
| Region | Padding | Gap | Margin | Source |
|--------|---------|-----|--------|--------|
| (CSS) | UNVERIFIED | UNVERIFIED | UNVERIFIED | path geometry in TSX; not styles.css |

## Variants / modifiers present in CSS
| Class | Effect | Source | Backed by CSS? (yes/no) |
|-------|--------|--------|-------------------------|
| .ds-line-chart__grid | grid stroke | styles.css:1360 | yes |
| .ds-line-chart__area | area opacity | styles.css:1365 | yes |
| .ds-line-chart__line | stroke width | styles.css:1369 | yes |
| .ds-line-chart__label | labels | styles.css:1288 | yes |

## Deltas & open questions (facts only — DO NOT resolve)
- Point radius 3 cited in knowledge/components/LineChartCard.md as implementation detail in SVG/TSX — not present as a CSS literal (UNVERIFIED in styles.css).
- PDF page not cited.
