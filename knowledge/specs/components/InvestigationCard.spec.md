# InvestigationCard — Numeric Specification

- Status: measured
- Source-of-truth order: PDF (page N) > component doc > implemented CSS
- CSS block: `.ds-investigation-card` (styles.css:724–877)
- Export: packages/ui/src/components/InvestigationCard.tsx
- PDF reference: p. 2 (per knowledge/components/InvestigationCard.md — TARJETAS)

## Dimensions
| Property | Value | Unit | Source | Delta vs PDF/doc |
|----------|------:|------|--------|------------------|
| border-width | 0.75 | px | styles.css:726 | doc matches |
| max-width | 280 | px | styles.css:732 | doc matches |
| padding | 15px 10px | px | styles.css:733 | doc matches |
| gap | 12 | px | styles.css:731 | — |
| with-utilities padding-right | 72 | px | styles.css:739 | — |
| utility button | 20×20 | px | styles.css:757; styles.css:760 | doc matches |
| icon | 50×50 | px | styles.css:778; styles.css:787 | doc matches |
| action padding | 5px 20px | px | styles.css:846 | doc matches |

## Color
| Role | Value | Matching --ds-* token? | Source | Delta |
|------|-------|------------------------|--------|-------|
| background | rgb(0 0 0 / 0.7) | UNTOKENIZED — candidate | styles.css:725 | doc: «PDF: #000000 70% transparencia» |
| border | #606060 | UNTOKENIZED — candidate | styles.css:726 | doc matches |
| title/value/action text | #ffffff | UNTOKENIZED — candidate | styles.css:791; styles.css:814; styles.css:863 | doc matches |
| metric label | #c1c1c1 | --ds-color-line (semantic dup) | styles.css:824 | doc matches |
| action primary bg | #494949 | UNTOKENIZED — candidate | styles.css:862 | doc matches |
| action primary hover | #5a5a5a | UNTOKENIZED — candidate | styles.css:867 | — |
| focus ring | 0 0 0 2px rgb(193 193 193 / 0.45) | UNTOKENIZED — candidate | styles.css:764; styles.css:852 | — |
| disabled opacity | 0.58 | UNTOKENIZED — candidate | styles.css:858 | — |

## Typography
| Element | Font family | Size | Weight | Letter-spacing | Line-height | Casing | Source |
|---------|-------------|------|--------|----------------|-------------|--------|--------|
| title | var(--ds-font-mono) | 13pt | 300 | 0.04em | 1.2 | uppercase | styles.css:790–styles.css:798 |
| metric value | var(--ds-font-body) | 14pt | 700 | UNVERIFIED | 1.15 | uppercase | styles.css:813–styles.css:820 |
| metric label | var(--ds-font-body) | 10pt | 200 | UNVERIFIED | 1.2 | none | styles.css:823–styles.css:829 |
| action | var(--ds-font-body) | 11pt | 700 | UNVERIFIED | 1 | uppercase | styles.css:839–styles.css:847 |

## Spacing
| Region | Padding | Gap | Margin | Source |
|--------|---------|-----|--------|--------|
| root | 15px 10px | 12px | — | styles.css:731; styles.css:733 |
| utilities | — | 8px | top 15px / right 10px absolute | styles.css:744; styles.css:747–styles.css:748 |
| metrics | — | 12px 16px | — | styles.css:803 |
| metric cell | — | 4px | — | styles.css:810 |
| actions | — | 10px | margin-top 4px | styles.css:835; styles.css:836 |

## Variants / modifiers present in CSS
| Class | Effect | Source | Backed by CSS? (yes/no) |
|-------|--------|--------|-------------------------|
| .ds-investigation-card--with-utilities | extra padding-right | styles.css:738 | yes |
| .ds-investigation-card__action--primary | #494949 fill | styles.css:861 | yes |
| .ds-investigation-card__action--ghost | transparent | styles.css:870 | yes |

## Deltas & open questions (facts only — DO NOT resolve)
- Local action styles intentionally diverge from global `Button` tokens (knowledge/components/InvestigationCard.md: «estilos PDF #494949 son locales»).
- No numeric mismatch flagged between CSS and InvestigationCard.md stated PDF values for the measured properties above.
