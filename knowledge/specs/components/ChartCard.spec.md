# ChartCard — Numeric Specification

- Status: partial
- Source-of-truth order: PDF (page N) > component doc > implemented CSS
- CSS block: `.ds-chart-card` (styles.css — PDF-context block)
- Export: packages/ui/src/components/ChartCard.tsx
- PDF reference: none cited
- Scale: display values = PDF annotation ÷ 2 (see [specs/README.md — Scale calibration](../README.md#scale-calibration))

## Dimensions
| Property | Value | Unit | Source | Delta vs PDF/doc |
|----------|------:|------|--------|------------------|
| border-width | 1 | px | styles.css | hairline — not scaled |
| border-radius | var(--ds-radius-xs) → 2 | px | styles.css | — |
| min-width | 110 | px | styles.css | display = 220÷2 |
| max-width | 280 | px | styles.css (added 2026-07-28) | native SVG `viewBox` width shared by Line/BarChartCard — not a PDF measurement, an intrinsic one; caps growth in a wide grid cell instead of upscaling. See anti-examples §7. |
| padding | 5 | px | styles.css | display = 10÷2 |
| gap | 5 | px | styles.css | display = 10÷2 |
| body min-height | 60 | px | styles.css | display = 120÷2 |
| body gap | 6 | px | styles.css | was `--ds-space-3` → 6px calibrated |

## Color
| Role | Value | Matching --ds-* token? | Source | Delta |
|------|-------|------------------------|--------|-------|
| background | rgb(6 6 6 / 0.2) | --ds-color-pdf-surface-a20 | styles.css | — |
| border | rgb(193 193 193 / 0.6) | --ds-color-pdf-line-a60 | styles.css | — |
| title | #8a8b87 | --ds-color-pdf-ink-muted | styles.css | — |
| footer | #ffffff | --ds-color-white | styles.css | — |

## Typography
| Element | Font family | Size | Weight | Letter-spacing | Line-height | Casing | Source |
|---------|-------------|------|--------|----------------|-------------|--------|--------|
| title | var(--ds-font-display) | 0.9rem (`--ds-text-chart`) | 700 | 0.25em | 1.25 | uppercase | rem — not scaled |
| footer | var(--ds-font-body) | 0.9rem | 300 | UNVERIFIED | UNVERIFIED | none | rem — not scaled |

## Spacing
| Region | Padding | Gap | Margin | Source |
|--------|---------|-----|--------|--------|
| root | 5px | 5px | — | styles.css (display scale) |
| body | — | 6px | — | styles.css |
| title | — | — | 0 | styles.css |

## Variants / modifiers present in CSS
| Class | Effect | Source | Backed by CSS? (yes/no) |
|-------|--------|--------|-------------------------|
| (none) | single appearance | styles.css | yes |

## Deltas & open questions (facts only — DO NOT resolve)
- PDF page not cited in ChartCard.md.
- Hardcoded PDF greys vs dual `--ds-*` palette — duplication candidates only.
