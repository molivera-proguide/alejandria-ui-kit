# DonutChartCard — Numeric Specification

- Status: partial
- Source-of-truth order: PDF (page N) > component doc > implemented CSS
- CSS block: `.ds-donut-chart` (styles.css — PDF-context block)
- Export: packages/ui/src/components/DonutChartCard.tsx
- PDF reference: p.9 "GRAFICOS" (page index 8), "Torta" legend block — found 2026-08-05, was "none
  cited". Legend: "Número grande: Montserrat Bold - 32pt - #FFFFFF - #8a8b87. Referencia:
  Montserrat Extra Light - 14pt - #FFFFFF - #8a8b87. Porcion completada: 25pt de grosor - #FFFFFF -
  #8a8b87. Eje: 25pt de grosor - #494949."
- Scale: display values = PDF annotation ÷ 2 (see [specs/README.md — Scale calibration](../README.md#scale-calibration))

## Dimensions
| Property | Value | Unit | Source | Delta vs PDF/doc |
|----------|------:|------|--------|------------------|
| layout min-height | 66 | px | styles.css | display = 132÷2 |
| chart width | 60 | px | styles.css | display = 120÷2 |
| chart max-width | 60 | px | styles.css | display = 120÷2 |
| chart left offset | 45 | px | styles.css | display = 90÷2 |
| stat gap | 1 | px | styles.css | display = 2÷2 (hairline-sized) |
| segment rotation | -90 | deg | styles.css | — |

## Color
| Role | Value | Matching --ds-* token? | Source | Delta |
|------|-------|------------------------|--------|-------|
| track stroke | #494949 | --ds-color-pdf-action | styles.css (changed 2026-08-05) | was `--ds-color-pdf-ink-muted` (#8a8b87) at 25% opacity — PDF legend says "Eje: 25pt de grosor - #494949", a solid dark gray, not a dimmed ink-muted. |
| default segment colors | #ffffff / #8a8b87 | --ds-color-white / --ds-color-pdf-ink-muted | DonutChartCard.tsx (changed 2026-08-05) | was the same 5-color rainbow as BarChartCard's default `CHART_COLORS` — PDF legend: "Porcion completada: 25pt de grosor - #FFFFFF - #8a8b87". The shipped `DonutChart`/`Gallery` stories already passed explicit per-datum colors matching this, so this was a latent fallback-only bug, not visible in the existing stories. |
| stat strong | #fff | --ds-color-white | styles.css | — |
| stat span | #8a8b87 | --ds-color-pdf-ink-muted | styles.css | — |

## Typography
| Element | Font family | Size | Weight | Letter-spacing | Line-height | Casing | Source |
|---------|-------------|------|--------|----------------|-------------|--------|--------|
| primary strong | var(--ds-font-body) | 1.75rem | 700 | UNVERIFIED | 1.05 | none | rem — not scaled |
| secondary strong | var(--ds-font-body) | 1.35rem | 700 | UNVERIFIED | — | none | rem — not scaled |
| stat label | var(--ds-font-body) | 0.75rem | 300 | UNVERIFIED | 1.25 | none | rem — not scaled |

## Spacing
| Region | Padding | Gap | Margin | Source |
|--------|---------|-----|--------|--------|
| stat | — | 1px | — | styles.css (display scale) |
| secondary position | bottom 0 / left 0 | — | — | styles.css |
| primary position | right 0 / top 50% | — | — | styles.css |

## Variants / modifiers present in CSS
| Class | Effect | Source | Backed by CSS? (yes/no) |
|-------|--------|--------|-------------------------|
| .ds-donut-chart__stat--primary | position | styles.css | yes |
| .ds-donut-chart__stat--secondary | position + smaller strong | styles.css | yes |
| .ds-donut-chart__track | track stroke | styles.css | yes |
| .ds-donut-chart__segment | rotation origin | styles.css | yes |

## Deltas & open questions (facts only — DO NOT resolve)
- Stroke width constant `STROKE = 14` in TSX is viewBox-relative (scales with CSS chart width); not a styles.css literal.
- Same page-extraction caveat as `BarChartCard.spec.md`: page index 8 mixes this reference diagram
  with an unrelated dashboard mockup in overlapping coordinates; colors/text above are trusted from
  the user's screenshot and from drawings that were unambiguous, not from a fully clean isolated
  vector read of just the "Torta" example.
