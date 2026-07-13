# DataTable — Numeric Specification

- Status: partial
- Source-of-truth order: PDF (page N) > component doc > implemented CSS
- CSS block: `.ds-table-wrap / .ds-table` (styles.css:1180–1238)
- Export: packages/ui/src/components/DataTable.tsx
- PDF reference: none cited

## Dimensions
| Property | Value | Unit | Source | Delta vs PDF/doc |
|----------|------:|------|--------|------------------|
| wrap border | 1 | px | styles.css:1182 | none cited |
| wrap radius | var(--ds-radius-md) → 6 | px | styles.css:1183 | none cited |
| cell padding | 12px 14px | px | styles.css:1209 | none cited |
| caption padding | 12px 14px 0 | px | styles.css:1201 | none cited |

## Color
| Role | Value | Matching --ds-* token? | Source | Delta |
|------|-------|------------------------|--------|-------|
| wrap bg | var(--ds-color-surface-glass) | --ds-color-surface-glass | styles.css:1181 | — |
| wrap border | var(--ds-color-line) | --ds-color-line | styles.css:1182 | — |
| table text | var(--ds-color-ink) | --ds-color-ink | styles.css:1190 | — |
| caption | var(--ds-color-ink-soft) | --ds-color-ink-soft | styles.css:1197 | — |
| th bg | rgb(0 0 0 / 0.22) | UNTOKENIZED — candidate | styles.css:1216 | — |
| th text | var(--ds-color-ink-soft) | --ds-color-ink-soft | styles.css:1217 | — |
| row border | var(--ds-color-line) | --ds-color-line | styles.css:1208 | — |

## Typography
| Element | Font family | Size | Weight | Letter-spacing | Line-height | Casing | Source |
|---------|-------------|------|--------|----------------|-------------|--------|--------|
| table | var(--ds-font-body) | UNVERIFIED | UNVERIFIED | UNVERIFIED | UNVERIFIED | none | styles.css:1191 |
| caption | var(--ds-font-mono) | 0.7rem | 700 | UNVERIFIED | UNVERIFIED | uppercase | styles.css:1196–styles.css:1203 |
| th | var(--ds-font-mono) | 0.68rem | 700 | UNVERIFIED | UNVERIFIED | uppercase | styles.css:1215–styles.css:1221 |
| td | UNVERIFIED | 0.92rem | UNVERIFIED | UNVERIFIED | UNVERIFIED | none | styles.css:1224–styles.css:1225 |

## Spacing
| Region | Padding | Gap | Margin | Source |
|--------|---------|-----|--------|--------|
| caption | 12px 14px 0 | — | — | styles.css:1201 |
| th/td | 12px 14px | — | — | styles.css:1209 |

## Variants / modifiers present in CSS
| Class | Effect | Source | Backed by CSS? (yes/no) |
|-------|--------|--------|-------------------------|
| [data-align="center"] | text-align center | styles.css:1232 | yes |
| [data-align="right"] | text-align right | styles.css:1236 | yes |

## Deltas & open questions (facts only — DO NOT resolve)
- PDF page not cited (coverage audit marks DataTable PDF = No).
