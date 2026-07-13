# BarChartCard — Numeric Specification

- Status: partial
- Source-of-truth order: PDF (page N) > component doc > implemented CSS
- CSS block: `.ds-bar-chart / .ds-bar-chart__label` (styles.css:1278–1294 (shared chart SVG); labels 1287–1294)
- Export: packages/ui/src/components/BarChartCard.tsx
- PDF reference: none cited

## Dimensions
| Property | Value | Unit | Source | Delta vs PDF/doc |
|----------|------:|------|--------|------------------|
| svg max-width | 100% | % | styles.css:1283 | none cited |
| label font-size | 8 | px | styles.css:1291 | none cited |
| label letter-spacing | 0.08 | em | styles.css:1292 | none cited |

## Color
| Role | Value | Matching --ds-* token? | Source | Delta |
|------|-------|------------------------|--------|-------|
| label fill | #8a8b87 | --ds-color-ink-soft (semantic dup) | styles.css:1289 | — |
| bar fill | inline SVG attr (not CSS) | UNTOKENIZED — candidate | knowledge/components/BarChartCard.md; no CSS rule for .ds-bar-chart__bar | — |

## Typography
| Element | Font family | Size | Weight | Letter-spacing | Line-height | Casing | Source |
|---------|-------------|------|--------|----------------|-------------|--------|--------|
| label | var(--ds-font-display) | 8px | UNVERIFIED | 0.08em | UNVERIFIED | uppercase | styles.css:1287–styles.css:1293 |

## Spacing
| Region | Padding | Gap | Margin | Source |
|--------|---------|-----|--------|--------|
| (CSS) | UNVERIFIED | UNVERIFIED | UNVERIFIED | layout constants live in TSX per BarChartCard.md (not styles.css) |

## Variants / modifiers present in CSS
| Class | Effect | Source | Backed by CSS? (yes/no) |
|-------|--------|--------|-------------------------|
| .ds-bar-chart | display block sizing | styles.css:1278 | yes |
| .ds-bar-chart__label | label typography/fill | styles.css:1287 | yes |
| .ds-bar-chart__bar | bar fill | knowledge/components/BarChartCard.md | no |

## Deltas & open questions (facts only — DO NOT resolve)
- `.ds-bar-chart__bar` has no CSS; fill is inline (knowledge/components/BarChartCard.md).
- Chart container metrics belong to ChartCard.spec.md.
- PDF page not cited.
