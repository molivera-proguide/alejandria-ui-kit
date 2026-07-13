# Card — Numeric Specification

- Status: partial
- Source-of-truth order: PDF (page N) > component doc > implemented CSS
- CSS block: `.ds-card` (styles.css:256–347)
- Export: packages/ui/src/components/Card.tsx
- PDF reference: none cited

## Dimensions
| Property | Value | Unit | Source | Delta vs PDF/doc |
|----------|------:|------|--------|------------------|
| border-width | 1 | px | styles.css:260 | none cited |
| border-radius | var(--ds-radius-xs) → 2 | px | styles.css:261 | none cited |
| accent bar height | 1 | px | styles.css:271 | none cited |
| accent bar inset-x | 14 | px | styles.css:272; styles.css:275 | none cited |
| actions icon | 18×18 | px | styles.css:331–styles.css:332 | none cited |
| description max-width | 58 | ch | styles.css:319 | none cited |

## Color
| Role | Value | Matching --ds-* token? | Source | Delta |
|------|-------|------------------------|--------|-------|
| background | linear-gradient + var(--ds-color-surface-glass) | --ds-color-surface-glass | styles.css:257–styles.css:259 | — |
| gradient wash | rgb(255 255 255 / 0.035) | UNTOKENIZED — candidate | styles.css:258 | — |
| border | var(--ds-color-line) | --ds-color-line | styles.css:260 | — |
| text | var(--ds-color-ink) | --ds-color-ink | styles.css:263 | — |
| ::before accent | rgb(108 224 199 / 0.75) | --ds-color-teal channels | styles.css:269 | — |
| eyebrow | var(--ds-color-teal) | --ds-color-teal | styles.css:293 | — |
| description / actions | var(--ds-color-ink-soft) | --ds-color-ink-soft | styles.css:314; styles.css:324 | — |
| footer bg | rgb(0 0 0 / 0.2) | UNTOKENIZED — candidate | styles.css:341 | — |

## Typography
| Element | Font family | Size | Weight | Letter-spacing | Line-height | Casing | Source |
|---------|-------------|------|--------|----------------|-------------|--------|--------|
| eyebrow | var(--ds-font-mono) | 0.66rem | 700 | 0 | 1.2 | uppercase | styles.css:292–styles.css:300 |
| title | var(--ds-font-display) | 1.35rem | 700 | 0 | 1.05 | uppercase | styles.css:303–styles.css:310 |
| description | var(--ds-font-body) | 0.95rem | UNVERIFIED | UNVERIFIED | 1.45 | none | styles.css:313–styles.css:318 |

## Spacing
| Region | Padding | Gap | Margin | Source |
|--------|---------|-----|--------|--------|
| header | 16px | 16px | — | styles.css:283; styles.css:285 |
| body | 16px | — | — | styles.css:336 |
| footer | 12px 16px | 12px | — | styles.css:344; styles.css:346 |
| eyebrow margin | — | — | 0 0 7px | styles.css:299 |
| description margin | — | — | 8px 0 0 | styles.css:318 |

## Variants / modifiers present in CSS
| Class | Effect | Source | Backed by CSS? (yes/no) |
|-------|--------|--------|-------------------------|
| (none public tone/size modifiers) | single appearance | styles.css:256 | yes (base only) |

## Deltas & open questions (facts only — DO NOT resolve)
- PDF page not cited in component doc.
- Description `font-weight` not set in CSS — UNVERIFIED vs any PDF weight.
