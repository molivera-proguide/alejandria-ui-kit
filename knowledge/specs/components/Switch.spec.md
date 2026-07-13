# Switch — Numeric Specification

- Status: partial
- Source-of-truth order: PDF (page N) > component doc > implemented CSS
- CSS block: `.ds-switch` (styles.css:1055–1128)
- Export: packages/ui/src/components/Switch.tsx
- PDF reference: none cited

## Dimensions
| Property | Value | Unit | Source | Delta vs PDF/doc |
|----------|------:|------|--------|------------------|
| min-width | 260 | px | styles.css:1062 | none cited |
| track | 52×28 | px | styles.css:1103; styles.css:1097 | none cited |
| track padding | 3 | px | styles.css:1098 | none cited |
| thumb | 20×20 | px | styles.css:1111; styles.css:1113 | none cited |
| checked translateX | 24 | px | styles.css:1123 | none cited |
| visually-hidden input | 1×1 | px | styles.css:1085; styles.css:1089 | none cited |

## Color
| Role | Value | Matching --ds-* token? | Source | Delta |
|------|-------|------------------------|--------|-------|
| track off bg | rgb(255 255 255 / 0.08) | UNTOKENIZED — candidate | styles.css:1093 | — |
| track border | var(--ds-color-line-strong) | --ds-color-line-strong | styles.css:1094 | — |
| thumb bg | var(--ds-color-ink) | --ds-color-ink | styles.css:1107 | — |
| checked track | var(--ds-color-teal) | --ds-color-teal | styles.css:1117 | — |
| checked glow | 0 0 0 3px rgb(8 127 115 / 0.12) | UNTOKENIZED — candidate | styles.css:1119 | — |
| thumb shadow | 0 3px 8px rgb(17 25 28 / 0.16) | UNTOKENIZED — candidate | styles.css:1110 | — |
| description | var(--ds-color-ink-soft) | --ds-color-ink-soft | styles.css:1079 | — |
| hidden opacity | 0 | — | styles.css:1086 | — |

## Typography
| Element | Font family | Size | Weight | Letter-spacing | Line-height | Casing | Source |
|---------|-------------|------|--------|----------------|-------------|--------|--------|
| label | var(--ds-font-mono) | 0.78rem | 700 | UNVERIFIED | UNVERIFIED | uppercase | styles.css:1071–styles.css:1075 |
| description | UNVERIFIED | 0.86rem | UNVERIFIED | UNVERIFIED | 1.3 | none | styles.css:1078–styles.css:1081 |

## Spacing
| Region | Padding | Gap | Margin | Source |
|--------|---------|-----|--------|--------|
| root | — | 14px | — | styles.css:1060 |
| copy | — | 3px | — | styles.css:1067 |
| track | 3px | — | — | styles.css:1098 |

## Variants / modifiers present in CSS
| Class | Effect | Source | Backed by CSS? (yes/no) |
|-------|--------|--------|-------------------------|
| :checked + track | on state | styles.css:1116 | yes |
| :focus-visible + track | focus ring | styles.css:1126 | yes |
| :disabled | disabled appearance | knowledge/components/Switch.md | no |

## Deltas & open questions (facts only — DO NOT resolve)
- Disabled lacks dedicated CSS (knowledge/components/Switch.md).
- PDF page not cited.
