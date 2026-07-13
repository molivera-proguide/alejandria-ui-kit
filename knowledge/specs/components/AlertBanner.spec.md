# AlertBanner — Numeric Specification

- Status: partial
- Source-of-truth order: PDF (page N) > component doc > implemented CSS
- CSS block: `.ds-alert` (styles.css:984–1053)
- Export: packages/ui/src/components/AlertBanner.tsx
- PDF reference: none cited

## Dimensions
| Property | Value | Unit | Source | Delta vs PDF/doc |
|----------|------:|------|--------|------------------|
| border-width | 1 | px | styles.css:990 | none cited |
| border-left | 4 | px | styles.css:991 | none cited |
| border-radius | var(--ds-radius-md) → 6 | px | styles.css:992; styles.css:39 | none cited |
| padding | 14 | px | styles.css:998 | none cited |
| gap | 12 | px | styles.css:996 | none cited |
| icon box | 34×34 | px | styles.css:1020; styles.css:1022 | none cited |
| icon svg | 18×18 | px | styles.css:1026–styles.css:1027 | none cited |
| content gap | 4 | px | styles.css:1032 | none cited |

## Color
| Role | Value | Matching --ds-* token? | Source | Delta |
|------|-------|------------------------|--------|-------|
| default accent | var(--ds-color-blue) | --ds-color-blue | styles.css:985 | — |
| bg wash | rgb(255 255 255 / 0.045) | UNTOKENIZED — candidate | styles.css:988 | — |
| bg base | var(--ds-color-surface-glass) | --ds-color-surface-glass | styles.css:989 | — |
| border | var(--ds-color-line) | --ds-color-line | styles.css:990 | — |
| description | var(--ds-color-ink-soft) | --ds-color-ink-soft | styles.css:1044 | — |
| success/warning/danger accents | green/amber/danger | matching --ds-* | styles.css:1001–styles.css:1010 | — |

## Typography
| Element | Font family | Size | Weight | Letter-spacing | Line-height | Casing | Source |
|---------|-------------|------|--------|----------------|-------------|--------|--------|
| title | var(--ds-font-display) | 1.05rem | UNVERIFIED | UNVERIFIED | 1.05 | uppercase | styles.css:1036–styles.css:1040 |
| description | UNVERIFIED (inherits) | 0.92rem | UNVERIFIED | UNVERIFIED | 1.35 | none | styles.css:1043–styles.css:1047 |

## Spacing
| Region | Padding | Gap | Margin | Source |
|--------|---------|-----|--------|--------|
| root | 14px | 12px | — | styles.css:996; styles.css:998 |
| content | — | 4px | — | styles.css:1032 |
| description | — | — | 0 | styles.css:1047 |

## Variants / modifiers present in CSS
| Class | Effect | Source | Backed by CSS? (yes/no) |
|-------|--------|--------|-------------------------|
| .ds-alert--success | accent green | styles.css:1001 | yes |
| .ds-alert--warning | accent amber | styles.css:1005 | yes |
| .ds-alert--danger | accent danger | styles.css:1009 | yes |
| .ds-alert--info | applied in TSX | knowledge/components/AlertBanner.md | no |

## Deltas & open questions (facts only — DO NOT resolve)
- `ds-alert--info` applied in DOM without dedicated CSS rule (knowledge/components/AlertBanner.md).
- PDF page not cited.
