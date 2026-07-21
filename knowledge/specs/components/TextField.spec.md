# TextField — Numeric Specification

- Status: partial
- Source-of-truth order: PDF (page N) > component doc > implemented CSS
- CSS block: `.ds-field / .ds-field__input` (styles.css:349–443)
- Export: packages/ui/src/components/TextField.tsx
- PDF reference: none cited

## Dimensions
| Property | Value | Unit | Source | Delta vs PDF/doc |
|----------|------:|------|--------|------------------|
| control min-height | 40 | px | styles.css:383 | none cited |
| input min-height | 38 | px | styles.css:414 | none cited |
| control border | 1 | px | styles.css:379 | none cited |
| control radius | var(--ds-radius-sm) → 4 | px | styles.css:380; styles.css:38 | none cited |
| icon | 17×17 | px | styles.css:398; styles.css:400 | none cited |

## Color
| Role | Value | Matching --ds-* token? | Source | Delta |
|------|-------|------------------------|--------|-------|
| root text | var(--ds-color-ink) | --ds-color-ink | styles.css:350 | — |
| label | var(--ds-color-ink-soft) | --ds-color-ink-soft | styles.css:364 | — |
| control bg | rgb(0 0 0 / 0.34) | UNTOKENIZED — candidate | styles.css:378 | — |
| control border | var(--ds-color-line) | --ds-color-line | styles.css:379 | — |
| focus border | var(--ds-color-teal) | --ds-color-teal | styles.css:391 | — |
| focus ring | var(--ds-focus-ring) | --ds-focus-ring | styles.css:392 | — |
| placeholder | rgb(169 179 176 / 0.5) | --ds-color-ink-soft @50% (dup candidate) | styles.css:421 | — |
| hint | var(--ds-color-ink-muted) | --ds-color-ink-muted | styles.css:433 | — |
| error | var(--ds-color-danger) | --ds-color-danger | styles.css:437 | — |
| invalid border | var(--ds-color-danger) | --ds-color-danger | styles.css:442 | — |

## Typography
| Element | Font family | Size | Weight | Letter-spacing | Line-height | Casing | Source |
|---------|-------------|------|--------|----------------|-------------|--------|--------|
| label | var(--ds-font-mono) | 0.7rem | 700 | UNVERIFIED | 1.2 | uppercase | styles.css:363–styles.css:369 |
| input | var(--ds-font-mono) | 0.84rem | UNVERIFIED | UNVERIFIED | UNVERIFIED | none | styles.css:412–styles.css:413 |
| hint/error | var(--ds-font-mono) | 0.72rem | error 600 / hint UNVERIFIED | UNVERIFIED | 1.35 | none | styles.css:426–styles.css:438 |

## Spacing
| Region | Padding | Gap | Margin | Source |
|--------|---------|-----|--------|--------|
| root | — | 8px | — | styles.css:352 |
| label-row | — | 12px | — | styles.css:359 |
| icon margin-left | — | — | 11px | styles.css:399 |
| input padding | 0 11px | — | — | styles.css:416 |

## Variants / modifiers present in CSS
| Class | Effect | Source | Backed by CSS? (yes/no) |
|-------|--------|--------|-------------------------|
| .ds-field--invalid | danger border on control | styles.css:441 | yes |
| .ds-field--pdf | PDF-context skin (`appearance="pdf"`): control bg `--ds-color-pdf-surface-warm` (#2a2927), border `--ds-color-pdf-line` (#c1c1c1); input `--ds-font-mono` + `--ds-font-weight-light`, `font-size: 20px` | styles.css:582; input styles.css:587–588 | yes |
| :disabled (field) | disabled appearance | knowledge/components/TextField.md | no |

## Deltas & open questions (facts only — DO NOT resolve)
- PDF page not cited.
- Disabled state has no dedicated CSS (knowledge/components/TextField.md).
- `appearance="pdf"` (`.ds-field--pdf`) added by the PDF-variant promotion (Rule 03); shared with SelectField. Its `font-size: 20px` is a flagged literal — no type-scale token exists yet (design-reference p.7: "Input Source Code Light 20pt").
- Pre-existing line citations predate the M2b token migration; the `.ds-field--pdf` citations (582/587–588) are current.
