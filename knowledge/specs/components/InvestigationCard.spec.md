# InvestigationCard — Numeric Specification

- Status: measured
- Source-of-truth order: PDF (page N) > component doc > implemented CSS
- CSS block: `.ds-investigation-card` (styles.css — PDF-context block)
- Export: packages/ui/src/components/InvestigationCard.tsx
- PDF reference: p. 2 (per knowledge/components/InvestigationCard.md — TARJETAS)
- Scale: display values = PDF annotation ÷ 2 (see [specs/README.md — Scale calibration](../README.md#scale-calibration))

## Dimensions
| Property | Value | Unit | Source | Delta vs PDF/doc |
|----------|------:|------|--------|------------------|
| border-width | 0.75 | px | styles.css | hairline — not scaled |
| max-width | 140 | px | styles.css | display = 280÷2 |
| padding | 7.5px 5px | px | styles.css | display = 15/10 ÷2 |
| gap | 6 | px | styles.css | was `--ds-space-3` → 6px calibrated |
| with-utilities padding-right | 36 | px | styles.css | display = 72÷2 |
| utility button | 10×10 | px | styles.css | was `--ds-size-icon-xl` 20 → 10 |
| icon | 25×25 | px | styles.css | display = 50÷2 |
| action padding | 2.5px 10px | px | styles.css | display = 5/20 ÷2 |

## Color
| Role | Value | Matching --ds-* token? | Source | Delta |
|------|-------|------------------------|--------|-------|
| background | rgb(0 0 0 / 0.7) | --ds-color-black-a70 | styles.css | doc: «PDF: #000000 70% transparencia» |
| border | #606060 | --ds-color-pdf-border | styles.css | doc matches |
| title/value/action text | #ffffff | --ds-color-white | styles.css | doc matches |
| metric label | #c1c1c1 | --ds-color-pdf-line | styles.css | doc matches |
| action primary bg | #494949 | --ds-color-pdf-action | styles.css | doc matches |
| action primary hover | #5a5a5a | --ds-color-pdf-action-hover | styles.css | — |
| focus ring | 0 0 0 2px rgb(193 193 193 / 0.45) | UNTOKENIZED — candidate | styles.css | box-shadow — not scaled |
| disabled opacity | 0.58 | UNTOKENIZED — candidate | styles.css | — |

## Typography
| Element | Font family | Size | Weight | Letter-spacing | Line-height | Casing | Source |
|---------|-------------|------|--------|----------------|-------------|--------|--------|
| title | var(--ds-font-mono) | 6.5pt | 300 | 0.04em | 1.2 | uppercase | display = 13pt÷2 |
| metric value | var(--ds-font-body) | 7pt | 700 | UNVERIFIED | 1.15 | uppercase | display = 14pt÷2 |
| metric label | var(--ds-font-body) | 5pt | 200 | UNVERIFIED | 1.2 | none | display = 10pt÷2 |
| action | var(--ds-font-body) | 5.5pt | 700 | UNVERIFIED | 1 | uppercase | display = 11pt÷2 |

## Spacing
| Region | Padding | Gap | Margin | Source |
|--------|---------|-----|--------|--------|
| root | 7.5px 5px | 6px | — | styles.css (display scale) |
| utilities | — | 4px | top 7.5px / right 5px absolute | calibrated |
| metrics | — | 6px 8px | — | was space-3 / space-4 |
| metric cell | — | 2px | — | was `--ds-space-1` |
| actions | — | 5px | margin-top 2px | styles.css |

## Variants / modifiers present in CSS
| Class | Effect | Source | Backed by CSS? (yes/no) |
|-------|--------|--------|-------------------------|
| .ds-investigation-card--with-utilities | extra padding-right | styles.css | yes |
| .ds-investigation-card__action--primary | #494949 fill | styles.css | yes |
| .ds-investigation-card__action--ghost | transparent | styles.css | yes |

## Deltas & open questions (facts only — DO NOT resolve)
- Local action styles intentionally diverge from global `Button` tokens (knowledge/components/InvestigationCard.md: «estilos PDF #494949 son locales»).
