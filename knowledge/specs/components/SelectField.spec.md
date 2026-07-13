# SelectField — Numeric Specification

- Status: partial
- Source-of-truth order: PDF (page N) > component doc > implemented CSS
- CSS block: `.ds-field / .ds-field__control--select / .ds-field__select` (styles.css:349–443; 955–982)
- Export: packages/ui/src/components/SelectField.tsx
- PDF reference: none cited

## Dimensions
| Property | Value | Unit | Source | Delta vs PDF/doc |
|----------|------:|------|--------|------------------|
| control min-height | 40 | px | styles.css:383 | none cited |
| select min-height | 38 | px | styles.css:966 | none cited |
| chevron borders | 5 / 5 / 6 | px | styles.css:977–styles.css:979 | none cited |

## Color
| Role | Value | Matching --ds-* token? | Source | Delta |
|------|-------|------------------------|--------|-------|
| shared field colors | (see TextField.spec.md) | tokens as TextField | styles.css:349–443 | — |
| select text | var(--ds-color-ink) | --ds-color-ink | styles.css:963 | — |
| chevron | var(--ds-color-ink-soft) | --ds-color-ink-soft | styles.css:979 | — |

## Typography
| Element | Font family | Size | Weight | Letter-spacing | Line-height | Casing | Source |
|---------|-------------|------|--------|----------------|-------------|--------|--------|
| select | var(--ds-font-mono) | 0.84rem | UNVERIFIED | UNVERIFIED | UNVERIFIED | none | styles.css:964–styles.css:965 |
| label/hint/error | (shared .ds-field) | see TextField | — | — | — | — | styles.css:363–438 |

## Spacing
| Region | Padding | Gap | Margin | Source |
|--------|---------|-----|--------|--------|
| select padding | 0 11px | — | — | styles.css:968 |
| chevron margin-right | — | — | 12px | styles.css:980 |
| control grid | 1fr auto | — | — | styles.css:955–styles.css:956 |

## Variants / modifiers present in CSS
| Class | Effect | Source | Backed by CSS? (yes/no) |
|-------|--------|--------|-------------------------|
| .ds-field__control--select | grid columns for chevron | styles.css:955 | yes |
| .ds-field--invalid | danger border | styles.css:441 | yes |
| .ds-field--pdf | PDF-context skin (`appearance="pdf"`), shared with TextField: control bg `--ds-color-pdf-surface-warm` (#2a2927), border `--ds-color-pdf-line` (#c1c1c1); select `--ds-font-mono` + `--ds-font-weight-light` | styles.css:582; select styles.css:587–588 | yes |
| :disabled on select | disabled appearance | knowledge/components/SelectField.md | no |

## Deltas & open questions (facts only — DO NOT resolve)
- PDF page not cited.
- No CSS for `.ds-field__select:disabled` / control disabled (knowledge/components/SelectField.md).
- `appearance="pdf"` (`.ds-field--pdf`) added by the PDF-variant promotion (Rule 03); the modifier is shared with TextField via `.ds-field`.
