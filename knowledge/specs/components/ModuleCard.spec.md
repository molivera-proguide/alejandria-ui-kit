# ModuleCard — Numeric Specification

- Status: partial
- Source-of-truth order: PDF (page N) > component doc > implemented CSS
- CSS block: `.ds-module-card` (styles.css — PDF-context block)
- Export: packages/ui/src/components/ModuleCard.tsx
- PDF reference: MÓDULOS (page not numbered in ModuleCard.md; InvestigationCard.md cites ModuleCard as PDF p. 6)
- Scale: display values = PDF annotation ÷ 2 (see [specs/README.md — Scale calibration](../README.md#scale-calibration))

## Dimensions
| Property | Value | Unit | Source | Delta vs PDF/doc |
|----------|------:|------|--------|------------------|
| border-width | 0.75 | px | styles.css | hairline — not scaled |
| min-height | 130 | px | styles.css | display = 260÷2 |
| min-width | 130 | px | styles.css | display = 260÷2 |
| padding | 25px 10px 12.5px 10px | px | styles.css | display = 50/20/25/20 ÷2 |
| gap | 10 | px | styles.css | was `--ds-space-5` → 10px calibrated |
| icon | 90×90 | px | styles.css | display = 180÷2 |
| icon region min-height | 90 | px | styles.css | display = 180÷2 |
| metric value min-width | 16 | px | styles.css | was `--ds-size-control-sm` → 16px calibrated |
| hover translateY | -2 | px | styles.css | transform — not scaled |

## Color
| Role | Value | Matching --ds-* token? | Source | Delta |
|------|-------|------------------------|--------|-------|
| background | #060606 | --ds-color-pdf-surface | styles.css | doc matches |
| border | #c1c1c1 | --ds-color-pdf-line | styles.css | doc matches |
| title | #c1c1c1 | --ds-color-pdf-line | styles.css | — |
| divider | #8a8b87 | --ds-color-pdf-ink-muted | styles.css | doc matches |
| metric label | #8a8b87 | --ds-color-pdf-ink-muted | styles.css | — |
| metric value | #ffffff | --ds-color-white | styles.css | doc matches |
| hover border | #ffffff | --ds-color-white | styles.css | doc matches |
| hover shadow | 0 16px 42px rgb(0 0 0 / 0.22) | UNTOKENIZED — candidate | styles.css | box-shadow — not scaled |
| focus ring | 0 0 0 3px rgb(193 193 193 / 0.35) | UNTOKENIZED — candidate | styles.css | box-shadow — not scaled |

## Typography
| Element | Font family | Size | Weight | Letter-spacing | Line-height | Casing | Source |
|---------|-------------|------|--------|----------------|-------------|--------|--------|
| title | var(--ds-font-mono) | 12px | 400 | 0.1em | 1.2 | uppercase | styles.css — display = 24÷2 |
| metric label | var(--ds-font-body) | 8px | 300 | UNVERIFIED | 1.2 | none | styles.css — display = 16÷2 |
| metric value | var(--ds-font-body) | 8px | 700 | UNVERIFIED | 1.2 | none | styles.css — display = 16÷2 |

## Spacing
| Region | Padding | Gap | Margin | Source |
|--------|---------|-----|--------|--------|
| root | 25px 10px 12.5px 10px | 10px | — | styles.css (display scale) |
| headline | — | 4px | — | was `--ds-space-2` → calibrated |
| metrics | — | 5px | — | styles.css |
| divider margin | — | — | 0 auto | styles.css |

## Variants / modifiers present in CSS
| Class | Effect | Source | Backed by CSS? (yes/no) |
|-------|--------|--------|-------------------------|
| :hover | border/shadow/translate | styles.css | yes |
| :focus-visible | focus ring | styles.css | yes |
| :disabled | disabled appearance | knowledge/components/ModuleCard.md | no |

## Deltas & open questions (facts only — DO NOT resolve)
- ModuleCard.md does not number the PDF page; InvestigationCard.md refers to ModuleCard as «PDF p. 6» — page attribution partial.
- Disabled modifier lacks CSS (knowledge/components/ModuleCard.md).
