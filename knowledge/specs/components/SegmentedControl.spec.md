# SegmentedControl — Numeric Specification

- Status: partial
- Source-of-truth order: PDF (page N) > component doc > implemented CSS
- CSS block: `.ds-segmented` (styles.css:1130–1178)
- Export: packages/ui/src/components/SegmentedControl.tsx
- PDF reference: none cited

## Dimensions
| Property | Value | Unit | Source | Delta vs PDF/doc |
|----------|------:|------|--------|------------------|
| root border | 1 | px | styles.css:1132 | none cited |
| root radius | var(--ds-radius-md) → 6 | px | styles.css:1133 | none cited |
| root padding | 4 | px | styles.css:1137 | none cited |
| root gap | 4 | px | styles.css:1136 | none cited |
| item min-height | 34 | px | styles.css:1152 | none cited |
| item padding-x | 12 | px | styles.css:1153 | none cited |
| item gap | 7 | px | styles.css:1151 | none cited |
| item radius | var(--ds-radius-sm) → 4 | px | styles.css:1144 | none cited |
| icon | 15×15 | px | styles.css:1171–styles.css:1172 | none cited |
| disabled opacity | 0.48 | — | styles.css:1166 | none cited |

## Color
| Role | Value | Matching --ds-* token? | Source | Delta |
|------|-------|------------------------|--------|-------|
| root bg | rgb(0 0 0 / 0.24) | UNTOKENIZED — candidate | styles.css:1131 | — |
| root border | var(--ds-color-line) | --ds-color-line | styles.css:1132 | — |
| item text | var(--ds-color-ink-soft) | --ds-color-ink-soft | styles.css:1145 | — |
| pressed bg | var(--ds-color-surface) | --ds-color-surface | styles.css:1158 | — |
| pressed border | var(--ds-color-line-strong) | --ds-color-line-strong | styles.css:1159 | — |
| pressed text | var(--ds-color-teal) | --ds-color-teal | styles.css:1161 | — |

## Typography
| Element | Font family | Size | Weight | Letter-spacing | Line-height | Casing | Source |
|---------|-------------|------|--------|----------------|-------------|--------|--------|
| item | var(--ds-font-mono) | 0.74rem | 700 | UNVERIFIED | UNVERIFIED | uppercase | styles.css:1148–styles.css:1154 |

## Spacing
| Region | Padding | Gap | Margin | Source |
|--------|---------|-----|--------|--------|
| root | 4px | 4px | — | styles.css:1136–styles.css:1137 |
| item | 0 12px | 7px | — | styles.css:1151; styles.css:1153 |

## Variants / modifiers present in CSS
| Class | Effect | Source | Backed by CSS? (yes/no) |
|-------|--------|--------|-------------------------|
| [aria-pressed="true"] | selected item | styles.css:1157 | yes |
| :disabled | opacity 0.48 | styles.css:1164 | yes |
| :hover / :focus-visible on item | interaction styles | knowledge/components/SegmentedControl.md | no |

## Deltas & open questions (facts only — DO NOT resolve)
- No `:hover` / `:focus-visible` rules on `.ds-segmented__item` (knowledge/components/SegmentedControl.md).
- PDF page not cited.
