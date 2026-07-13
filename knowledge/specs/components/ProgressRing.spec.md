# ProgressRing — Numeric Specification

- Status: partial
- Source-of-truth order: PDF (page N) > component doc > implemented CSS
- CSS block: `.ds-progress` (styles.css:879–953)
- Export: packages/ui/src/components/ProgressRing.tsx
- PDF reference: none cited

## Dimensions
| Property | Value | Unit | Source | Delta vs PDF/doc |
|----------|------:|------|--------|------------------|
| border-width | 1 | px | styles.css:887 | none cited |
| border-radius | 999 | px | styles.css:888 | none cited |
| inner inset | 8 | px | styles.css:900 | none cited |
| width sm | 78 | px | styles.css:905 | none cited |
| width md | 112 | px | styles.css:909 | none cited |
| width lg | 148 | px | styles.css:913 | none cited |
| radial stop | 54% / 55% | % | styles.css:885 | none cited |

## Color
| Role | Value | Matching --ds-* token? | Source | Delta |
|------|-------|------------------------|--------|-------|
| default accent | var(--ds-color-blue) | --ds-color-blue | styles.css:880 | — |
| track remainder | rgb(255 255 255 / 0.09) | UNTOKENIZED — candidate | styles.css:886 | — |
| surface hole | var(--ds-color-surface) | --ds-color-surface | styles.css:885 | — |
| border | var(--ds-color-line) | --ds-color-line | styles.css:887 | — |
| ::before border | rgb(255 255 255 / 0.08) | UNTOKENIZED — candidate | styles.css:897 | — |
| label | var(--ds-color-ink-soft) | --ds-color-ink-soft | styles.css:946 | — |
| success/warning/danger accents | green/amber/danger tokens | matching --ds-* | styles.css:916–styles.css:925 | — |

## Typography
| Element | Font family | Size | Weight | Letter-spacing | Line-height | Casing | Source |
|---------|-------------|------|--------|----------------|-------------|--------|--------|
| value md | var(--ds-font-display) | 1.72rem | 700 | UNVERIFIED | 0.9 | none | styles.css:928–styles.css:933 |
| value sm | var(--ds-font-display) | 1.18rem | 700 | — | — | none | styles.css:937–styles.css:938 |
| value lg | var(--ds-font-display) | 2.15rem | 700 | — | — | none | styles.css:941–styles.css:942 |
| label | var(--ds-font-mono) | 0.62rem | 700 | UNVERIFIED | UNVERIFIED | uppercase | styles.css:945–styles.css:951 |

## Spacing
| Region | Padding | Gap | Margin | Source |
|--------|---------|-----|--------|--------|
| label | — | — | margin-top 4px | styles.css:950 |

## Variants / modifiers present in CSS
| Class | Effect | Source | Backed by CSS? (yes/no) |
|-------|--------|--------|-------------------------|
| .ds-progress--sm | width 78px | styles.css:904 | yes |
| .ds-progress--md | width 112px | styles.css:908 | yes |
| .ds-progress--lg | width 148px | styles.css:912 | yes |
| .ds-progress--success | accent green | styles.css:916 | yes |
| .ds-progress--warning | accent amber | styles.css:920 | yes |
| .ds-progress--danger | accent danger | styles.css:924 | yes |
| .ds-progress--neutral | applied in TSX | knowledge/components/ProgressRing.md | no |

## Deltas & open questions (facts only — DO NOT resolve)
- `ds-progress--neutral` has no dedicated CSS (knowledge/components/ProgressRing.md).
- PDF page not cited.
