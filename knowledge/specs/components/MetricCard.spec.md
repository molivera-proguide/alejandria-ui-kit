# MetricCard — Numeric Specification

- Status: partial
- Source-of-truth order: PDF (page N) > component doc > implemented CSS
- CSS block: `.ds-metric` (styles.css:445–486)
- Export: packages/ui/src/components/MetricCard.tsx
- PDF reference: MÉTRICAS (page not numbered in knowledge/components/MetricCard.md)

## Dimensions
| Property | Value | Unit | Source | Delta vs PDF/doc |
|----------|------:|------|--------|------------------|
| border-width | 0.75 | px | styles.css:447 | doc matches (knowledge/components/MetricCard.md) |
| border-radius | var(--ds-radius-xs) → 2 | px | styles.css:448 | — |
| min-height | 132 | px | styles.css:452 | doc matches |
| padding | 10 | px | styles.css:453 | doc matches |
| gap | 11 | px | styles.css:451 | doc matches |

## Color
| Role | Value | Matching --ds-* token? | Source | Delta |
|------|-------|------------------------|--------|-------|
| background | rgb(6 6 6 / 0.2) | --ds-color-surface semantic dup (#060606) | styles.css:446 | doc matches |
| border | #e6e6e6 | UNTOKENIZED — candidate | styles.css:447 | doc matches |
| label | #8a8b87 | --ds-color-ink-soft (semantic dup) | styles.css:458 | doc matches |
| value (neutral) | #ffffff | UNTOKENIZED — candidate | styles.css:468 | doc matches |
| value (critical) | #ff0404 | --ds-color-danger (semantic dup; token is #ff3d48) | styles.css:477 | doc: «#ff0404 (PDF MÉTRICAS)» |
| change | #ffffff | UNTOKENIZED — candidate | styles.css:481 | doc matches |

## Typography
| Element | Font family | Size | Weight | Letter-spacing | Line-height | Casing | Source |
|---------|-------------|------|--------|----------------|-------------|--------|--------|
| label | var(--ds-font-mono) | 12px | 700 | 0.41em | 1.25 | uppercase | styles.css:457–styles.css:464 |
| value | var(--ds-font-body) | 84px | 700 | 0 | 0.95 | none | styles.css:467–styles.css:473 |
| change | var(--ds-font-body) | 16px | 200 | UNVERIFIED | 1.2 | none | styles.css:480–styles.css:485 |

## Spacing
| Region | Padding | Gap | Margin | Source |
|--------|---------|-----|--------|--------|
| root | 10px | 11px | — | styles.css:451; styles.css:453 |

## Variants / modifiers present in CSS
| Class | Effect | Source | Backed by CSS? (yes/no) |
|-------|--------|--------|-------------------------|
| .ds-metric--critical | value color #ff0404 | styles.css:476 | yes |
| .ds-metric--neutral | applied in TSX | knowledge/components/MetricCard.md | no dedicated CSS block |
| .ds-metric--good | applied in TSX | knowledge/components/MetricCard.md | no dedicated CSS block |
| .ds-metric--watch | applied in TSX | knowledge/components/MetricCard.md | no dedicated CSS block |
| .ds-metric__topline | structural wrapper | knowledge/components/MetricCard.md | no |

## Deltas & open questions (facts only — DO NOT resolve)
- Label size implemented `12px` (styles.css:460) vs doc PDF MÉTRICAS «Source Code Pro Bold 16px» (knowledge/components/MetricCard.md).
- Doc cites interlettering PDF 410 → CSS `letter-spacing: 0.41em` (styles.css:462) — recorded as matching intent; unit conversion not independently PDF-verified here.
- Ficha variant (label Extralight 16pt / value Bold 52pt) not implemented (knowledge/components/MetricCard.md Known Limitations).
- `#ff0404` vs token `--ds-color-danger: #ff3d48` (styles.css:32) — duplication candidate, unresolved.
