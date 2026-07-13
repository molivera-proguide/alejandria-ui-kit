# ChartCard — Numeric Specification

- Status: partial
- Source-of-truth order: PDF (page N) > component doc > implemented CSS
- CSS block: `.ds-chart-card` (styles.css:1240–1276)
- Export: packages/ui/src/components/ChartCard.tsx
- PDF reference: none cited

## Dimensions
| Property | Value | Unit | Source | Delta vs PDF/doc |
|----------|------:|------|--------|------------------|
| border-width | 1 | px | styles.css:1242 | none cited |
| border-radius | var(--ds-radius-xs) → 2 | px | styles.css:1243 | none cited |
| min-width | 220 | px | styles.css:1247 | none cited |
| padding | 10 | px | styles.css:1248 | none cited |
| gap | 10 | px | styles.css:1246 | none cited |
| body min-height | 120 | px | styles.css:1269 | none cited |
| body gap | 12 | px | styles.css:1266 | none cited |

## Color
| Role | Value | Matching --ds-* token? | Source | Delta |
|------|-------|------------------------|--------|-------|
| background | rgb(6 6 6 / 0.2) | --ds-color-surface semantic dup | styles.css:1241 | — |
| border | rgb(193 193 193 / 0.6) | --ds-color-line semantic (#c1c1c1) | styles.css:1242 | — |
| title | #8a8b87 | --ds-color-ink-soft (semantic dup) | styles.css:1252 | — |
| footer | #ffffff | UNTOKENIZED — candidate | styles.css:1272 | — |

## Typography
| Element | Font family | Size | Weight | Letter-spacing | Line-height | Casing | Source |
|---------|-------------|------|--------|----------------|-------------|--------|--------|
| title | var(--ds-font-display) | 0.9rem | 700 | 0.25em | 1.25 | uppercase | styles.css:1251–styles.css:1259 |
| footer | var(--ds-font-body) | 0.9rem | 300 | UNVERIFIED | UNVERIFIED | none | styles.css:1271–styles.css:1275 |

## Spacing
| Region | Padding | Gap | Margin | Source |
|--------|---------|-----|--------|--------|
| root | 10px | 10px | — | styles.css:1246; styles.css:1248 |
| body | — | 12px | — | styles.css:1266 |
| title | — | — | 0 | styles.css:1258 |

## Variants / modifiers present in CSS
| Class | Effect | Source | Backed by CSS? (yes/no) |
|-------|--------|--------|-------------------------|
| (none) | single appearance | styles.css:1240 | yes |

## Deltas & open questions (facts only — DO NOT resolve)
- PDF page not cited in ChartCard.md (coverage marks ChartCard PDF = Yes without page in doc).
- Hardcoded PDF greys vs dual `--ds-*` palette — duplication candidates only.
