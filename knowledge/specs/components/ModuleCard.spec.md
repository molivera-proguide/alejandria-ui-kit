# ModuleCard — Numeric Specification

- Status: partial
- Source-of-truth order: PDF (page N) > component doc > implemented CSS
- CSS block: `.ds-module-card` (styles.css:488–583)
- Export: packages/ui/src/components/ModuleCard.tsx
- PDF reference: MÓDULOS (page not numbered in ModuleCard.md; InvestigationCard.md cites ModuleCard as PDF p. 4)

## Dimensions
| Property | Value | Unit | Source | Delta vs PDF/doc |
|----------|------:|------|--------|------------------|
| border-width | 0.75 | px | styles.css:490 | doc matches |
| min-height | 260 | px | styles.css:496 | doc matches |
| min-width | 260 | px | styles.css:497 | doc matches |
| padding | 50px 20px 25px 20px | px | styles.css:498 | doc matches |
| gap | 20 | px | styles.css:495 | — |
| icon | 180×180 | px | styles.css:524–styles.css:526 | doc matches |
| icon region min-height | 180 | px | styles.css:518 | — |
| metric value min-width | 32 | px | styles.css:581 | — |
| hover translateY | -2 | px | styles.css:506 | doc matches |

## Color
| Role | Value | Matching --ds-* token? | Source | Delta |
|------|-------|------------------------|--------|-------|
| background | #060606 | --ds-color-surface (semantic dup) | styles.css:489 | doc matches |
| border | #c1c1c1 | --ds-color-line (semantic dup) | styles.css:490 | doc matches |
| title | #c1c1c1 | --ds-color-line (semantic dup) | styles.css:535 | — |
| divider | #8a8b87 | --ds-color-ink-soft (semantic dup) | styles.css:547 | doc matches |
| metric label | #8a8b87 | --ds-color-ink-soft (semantic dup) | styles.css:565 | — |
| metric value | #ffffff | UNTOKENIZED — candidate | styles.css:575 | doc matches |
| hover border | #ffffff | UNTOKENIZED — candidate | styles.css:504 | doc matches |
| hover shadow | 0 16px 42px rgb(0 0 0 / 0.22) | UNTOKENIZED — candidate | styles.css:505 | doc matches |
| focus ring | 0 0 0 3px rgb(193 193 193 / 0.35) | UNTOKENIZED — candidate | styles.css:511 | doc matches |

## Typography
| Element | Font family | Size | Weight | Letter-spacing | Line-height | Casing | Source |
|---------|-------------|------|--------|----------------|-------------|--------|--------|
| title | var(--ds-font-mono) | 24px | 400 | 0.1em | 1.2 | uppercase | styles.css:534–styles.css:542 |
| metric label | var(--ds-font-body) | 16px | 300 | UNVERIFIED | 1.2 | none | styles.css:564–styles.css:571 |
| metric value | var(--ds-font-body) | 16px | 700 | UNVERIFIED | 1.2 | none | styles.css:574–styles.css:580 |

## Spacing
| Region | Padding | Gap | Margin | Source |
|--------|---------|-----|--------|--------|
| root | 50px 20px 25px 20px | 20px | — | styles.css:495; styles.css:498 |
| headline | — | 8px | — | styles.css:531 |
| metrics | — | 10px | — | styles.css:554 |
| divider margin | — | — | 0 auto | styles.css:548 |

## Variants / modifiers present in CSS
| Class | Effect | Source | Backed by CSS? (yes/no) |
|-------|--------|--------|-------------------------|
| :hover | border/shadow/translate | styles.css:503 | yes |
| :focus-visible | focus ring | styles.css:509 | yes |
| :disabled | disabled appearance | knowledge/components/ModuleCard.md | no |

## Deltas & open questions (facts only — DO NOT resolve)
- ModuleCard.md does not number the PDF page; InvestigationCard.md refers to ModuleCard as «PDF p. 4» — page attribution partial.
- Disabled modifier lacks CSS (knowledge/components/ModuleCard.md).
