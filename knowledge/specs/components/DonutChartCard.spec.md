# DonutChartCard — Numeric Specification

- Status: partial
- Source-of-truth order: PDF (page N) > component doc > implemented CSS
- CSS block: `.ds-donut-chart` (styles.css:1278–1358)
- Export: packages/ui/src/components/DonutChartCard.tsx
- PDF reference: none cited

## Dimensions
| Property | Value | Unit | Source | Delta vs PDF/doc |
|----------|------:|------|--------|------------------|
| layout min-height | 132 | px | styles.css:1308 | none cited |
| chart width | 120 | px | styles.css:1320 | none cited |
| chart max-width | 120 | px | styles.css:1317 | none cited |
| chart left offset | 90 | px | styles.css:1316 | none cited |
| stat gap | 2 | px | styles.css:1325 | none cited |
| segment rotation | -90 | deg | styles.css:1302 | none cited |

## Color
| Role | Value | Matching --ds-* token? | Source | Delta |
|------|-------|------------------------|--------|-------|
| track stroke | #8a8b87 | --ds-color-ink-soft (semantic dup) | styles.css:1297 | — |
| track opacity | 0.25 | UNTOKENIZED — candidate | styles.css:1298 | — |
| stat strong | #fff | UNTOKENIZED — candidate | styles.css:1330 | — |
| stat span | #8a8b87 | --ds-color-ink-soft (semantic dup) | styles.css:1338 | — |

## Typography
| Element | Font family | Size | Weight | Letter-spacing | Line-height | Casing | Source |
|---------|-------------|------|--------|----------------|-------------|--------|--------|
| primary strong | var(--ds-font-body) | 1.75rem | 700 | UNVERIFIED | 1.05 | none | styles.css:1329–styles.css:1334 |
| secondary strong | var(--ds-font-body) | 1.35rem | 700 | UNVERIFIED | — | none | styles.css:1356–styles.css:1357 |
| stat label | var(--ds-font-body) | 0.75rem | 300 | UNVERIFIED | 1.25 | none | styles.css:1337–styles.css:1342 |

## Spacing
| Region | Padding | Gap | Margin | Source |
|--------|---------|-----|--------|--------|
| stat | — | 2px | — | styles.css:1325 |
| secondary position | bottom 0 / left 0 | — | — | styles.css:1352–styles.css:1353 |
| primary position | right 0 / top 50% | — | — | styles.css:1346–styles.css:1347 |

## Variants / modifiers present in CSS
| Class | Effect | Source | Backed by CSS? (yes/no) |
|-------|--------|--------|-------------------------|
| .ds-donut-chart__stat--primary | position | styles.css:1345 | yes |
| .ds-donut-chart__stat--secondary | position + smaller strong | styles.css:1351; styles.css:1356 | yes |
| .ds-donut-chart__track | track stroke | styles.css:1296 | yes |
| .ds-donut-chart__segment | rotation origin | styles.css:1301 | yes |

## Deltas & open questions (facts only — DO NOT resolve)
- Stroke width constant `STROKE = 14` cited in knowledge/components/DonutChartCard.md as TSX — not a styles.css literal (UNVERIFIED in CSS).
- PDF page not cited.
