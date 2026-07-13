# Badge — Numeric Specification

- Status: partial
- Source-of-truth order: PDF (page N) > component doc > implemented CSS
- CSS block: `.ds-badge` (styles.css:182–254)
- Export: packages/ui/src/components/Badge.tsx
- PDF reference: none cited

## Dimensions
| Property | Value | Unit | Source | Delta vs PDF/doc |
|----------|------:|------|--------|------------------|
| min-height | 24 | px | styles.css:193 | none cited |
| padding-x | 8 | px | styles.css:194 | none cited |
| gap | 7 | px | styles.css:190 | none cited |
| border-width | 1 | px | styles.css:184 | none cited |
| border-radius | var(--ds-radius-xs) → 2 | px | styles.css:185; styles.css:37 | none cited |
| dot size | 7×7 | px | styles.css:202–styles.css:203 | none cited |
| dot radius | 999 | px | styles.css:200 | none cited |

## Color
| Role | Value | Matching --ds-* token? | Source | Delta |
|------|-------|------------------------|--------|-------|
| neutral bg | rgb(255 255 255 / 0.05) | UNTOKENIZED — candidate | styles.css:207 | — |
| neutral border | var(--ds-color-line) | --ds-color-line | styles.css:208 | — |
| neutral text | var(--ds-color-ink-soft) | --ds-color-ink-soft | styles.css:209 | — |
| info bg | var(--ds-color-blue-soft) | --ds-color-blue-soft | styles.css:217 | — |
| info border | rgb(98 184 215 / 0.42) | --ds-color-blue channels | styles.css:218 | — |
| success border | rgb(133 214 111 / 0.42) | --ds-color-green channels | styles.css:228 | — |
| warning border | rgb(215 178 74 / 0.46) | --ds-color-amber channels | styles.css:238 | — |
| danger border | rgb(255 61 72 / 0.5) | --ds-color-danger channels | styles.css:248 | — |
| dot glow | 0 0 12px currentColor | UNTOKENIZED — candidate | styles.css:201 | — |

## Typography
| Element | Font family | Size | Weight | Letter-spacing | Line-height | Casing | Source |
|---------|-------------|------|--------|----------------|-------------|--------|--------|
| .ds-badge | var(--ds-font-mono) | 0.68rem | 700 | 0 | 1 (unitless) | uppercase | styles.css:187–styles.css:195 |

## Spacing
| Region | Padding | Gap | Margin | Source |
|--------|---------|-----|--------|--------|
| root | 0 8px | 7px | — | styles.css:190; styles.css:194 |

## Variants / modifiers present in CSS
| Class | Effect | Source | Backed by CSS? (yes/no) |
|-------|--------|--------|-------------------------|
| .ds-badge--neutral | tone | styles.css:206 | yes |
| .ds-badge--info | tone | styles.css:216 | yes |
| .ds-badge--success | tone | styles.css:226 | yes |
| .ds-badge--warning | tone | styles.css:236 | yes |
| .ds-badge--danger | tone | styles.css:246 | yes |
| .ds-badge__dot | optional indicator | styles.css:199 | yes |

## Deltas & open questions (facts only — DO NOT resolve)
- PDF page not cited in component doc.
- Tone borders use raw `rgb(...)` while soft backgrounds use tokens (fact recorded in knowledge/components/Badge.md).
