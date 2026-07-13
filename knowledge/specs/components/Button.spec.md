# Button — Numeric Specification

- Status: partial
- Source-of-truth order: PDF (page N) > component doc > implemented CSS
- CSS block: `.ds-button` (styles.css:50–180)
- Export: packages/ui/src/components/Button.tsx
- PDF reference: none cited

## Dimensions
| Property | Value | Unit | Source | Delta vs PDF/doc |
|----------|------:|------|--------|------------------|
| border-width | 1 | px | styles.css:52 | none cited in PDF |
| border-radius | var(--ds-radius-xs) → 2 | px | styles.css:53; token styles.css:37 | none cited |
| gap | 8 | px | styles.css:58 | none cited |
| min-height sm | 32 | px | styles.css:93 | none cited |
| min-height md | 40 | px | styles.css:99 | none cited |
| min-height lg | 48 | px | styles.css:105 | none cited |
| padding-x sm | 11 | px | styles.css:94 | none cited |
| padding-x md | 15 | px | styles.css:100 | none cited |
| padding-x lg | 20 | px | styles.css:106 | none cited |
| icon box | 17×17 | px | styles.css:159–styles.css:160 | none cited |
| spinner | 16×16 | px | styles.css:178–styles.css:179 | none cited |
| spinner border | 2 | px | styles.css:175 | none cited |
| hover translateY | -1 | px | styles.css:76 | none cited |

## Color
| Role | Value | Matching --ds-* token? | Source | Delta |
|------|-------|------------------------|--------|-------|
| primary gradient top | #82f3d8 | --ds-color-teal (semantic dup candidate) | styles.css:114 | none cited in PDF |
| primary gradient bottom | var(--ds-color-teal-dark) | --ds-color-teal-dark | styles.css:114 | — |
| primary border | rgb(108 224 199 / 0.74) | --ds-color-teal channels | styles.css:115 | — |
| primary text | #04110f | UNTOKENIZED — candidate | styles.css:117 | — |
| primary hover top/bottom | #9affdf / #24a893 | UNTOKENIZED — candidate | styles.css:121 | — |
| secondary bg | rgb(255 255 255 / 0.05) | UNTOKENIZED — candidate | styles.css:126 | — |
| secondary border | var(--ds-color-line-strong) | --ds-color-line-strong | styles.css:127 | — |
| secondary text | var(--ds-color-ink) | --ds-color-ink | styles.css:128 | — |
| ghost text | var(--ds-color-ink-soft) | --ds-color-ink-soft | styles.css:138 | — |
| danger gradient | #ff696f → #bd1f2a | UNTOKENIZED — candidate | styles.css:147 | — |
| danger text | #ffffff | UNTOKENIZED — candidate | styles.css:149 | — |
| disabled opacity | 0.58 | UNTOKENIZED — candidate | styles.css:87 | — |

## Typography
| Element | Font family | Size | Weight | Letter-spacing | Line-height | Casing | Source |
|---------|-------------|------|--------|----------------|-------------|--------|--------|
| .ds-button | var(--ds-font-body) | sm 0.78rem / md 0.88rem / lg 1rem | 700 | 0 | 1 (unitless) | uppercase | styles.css:56–styles.css:61; sizes styles.css:92–styles.css:104 |

## Spacing
| Region | Padding | Gap | Margin | Source |
|--------|---------|-----|--------|--------|
| root | 0 Npx (by size) | 8px | — | styles.css:58; styles.css:94/styles.css:100/styles.css:106 |

## Variants / modifiers present in CSS
| Class | Effect | Source | Backed by CSS? (yes/no) |
|-------|--------|--------|-------------------------|
| .ds-button--sm | size sm | styles.css:91 | yes |
| .ds-button--md | size md | styles.css:97 | yes |
| .ds-button--lg | size lg | styles.css:103 | yes |
| .ds-button--full | width 100% | styles.css:109 | yes |
| .ds-button--primary | primary palette | styles.css:113 | yes |
| .ds-button--secondary | secondary palette | styles.css:125 | yes |
| .ds-button--ghost | ghost palette | styles.css:136 | yes |
| .ds-button--danger | danger palette | styles.css:146 | yes |
| .ds-button--pdf | PDF-context action: grey fill `#494949` via `--ds-color-pdf-action`, white text; hover `#5a5a5a` | styles.css:285; hover styles.css:290 | yes |
| data-loading (attr) | loading state in TSX | knowledge/components/Button.md | no |

## Color
| Role | Value | Matching --ds-* token? | Source | Delta |
|------|-------|------------------------|--------|-------|
| pdf fill | var(--ds-color-pdf-action) → #494949 | --ds-color-pdf-action | styles.css:286 | — |
| pdf text | var(--ds-color-white) → #ffffff | --ds-color-white | styles.css:287 | — |
| pdf hover | var(--ds-color-pdf-action-hover) → #5a5a5a | --ds-color-pdf-action-hover | styles.css:291 | — |

## Deltas & open questions (facts only — DO NOT resolve)
- `data-loading` applied in component API but has no CSS rules (knowledge/components/Button.md; styles.css has no `[data-loading]` selector).
- PDF page not cited in component doc — PDF cross-check marked unavailable (`none cited`).
- `variant="pdf"` (`.ds-button--pdf`) added by the PDF-variant promotion (Rule 03); consumed by the Login and DetailSheet patterns. `#494949` is the PDF action fill (design-reference p.6 login / p.4 fichas).
- Pre-existing line citations above predate the M2b token migration and may be off by the inserted token lines; the `.ds-button--pdf` citations (285/290/291) are current.
