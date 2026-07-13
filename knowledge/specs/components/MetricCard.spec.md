# MetricCard — Numeric Specification

- Status: partial
- Source-of-truth order: PDF (page 10 MÉTRICAS) > component doc > implemented CSS
- CSS block: `.ds-metric` (styles.css:601–655)
- Export: packages/ui/src/components/MetricCard.tsx
- PDF reference: MÉTRICAS (page 10 — Reporting vs En ficha)

## Dimensions
| Property | Value | Unit | Source | Delta vs PDF/doc |
|----------|------:|------|--------|------------------|
| border-width | 0.75 | px | styles.css:603 | doc matches (knowledge/components/MetricCard.md) |
| border-radius | var(--ds-radius-xs) → 2 | px | styles.css:604 | — |
| min-height | 132 | px | styles.css:608 | doc matches |
| padding | 10 | px | styles.css:609 | doc matches |
| gap | 11 | px | styles.css:607 | doc matches |

## Color
| Role | Value | Matching --ds-* token? | Source | Delta |
|------|-------|------------------------|--------|-------|
| background (reporting) | rgb(6 6 6 / 0.2) via --ds-color-pdf-surface-a20 | --ds-color-pdf-surface-a20 | styles.css:602 | doc matches |
| background (ficha) | transparent | — | styles.css:644–646 | PDF p.10 «Cuando está en ficha: sin fondo» |
| border | #e6e6e6 via --ds-color-pdf-line-light | --ds-color-pdf-line-light | styles.css:603 | doc matches |
| label | #8a8b87 via --ds-color-pdf-ink-muted | --ds-color-pdf-ink-muted | styles.css:614 | doc matches |
| value (neutral) | #ffffff via --ds-color-white | --ds-color-white | styles.css:624 | doc matches |
| value (critical) | #ff0404 via --ds-color-pdf-critical | --ds-color-pdf-critical | styles.css:632–634 | doc: «#ff0404 (PDF MÉTRICAS)»; applies in both appearances |
| change | #ffffff via --ds-color-white | --ds-color-white | styles.css:637 | doc matches |

## Typography
| Element | Font family | Size | Weight | Letter-spacing | Line-height | Casing | Source |
|---------|-------------|------|--------|----------------|-------------|--------|--------|
| label (reporting) | var(--ds-font-mono) | 12px | 700 | 0.41em | 1.25 | uppercase | styles.css:613–621 |
| label (ficha) | var(--ds-font-body) | inherits 12px | 200 (extralight) | inherits | inherits | uppercase | styles.css:648–651 |
| value (reporting) | var(--ds-font-body) | 84px | 700 | 0 | 0.95 | none | styles.css:623–630 |
| value (ficha) | var(--ds-font-body) | 52px | 700 | inherits | inherits | none | styles.css:653–655 |
| change | var(--ds-font-body) | 16px | 200 | UNVERIFIED | 1.2 | none | styles.css:636–642 |

## Spacing
| Region | Padding | Gap | Margin | Source |
|--------|---------|-----|--------|--------|
| root | 10px | 11px | — | styles.css:607; styles.css:609 |

## Variants / modifiers present in CSS
| Class | Effect | Source | Backed by CSS? (yes/no) |
|-------|--------|--------|-------------------------|
| .ds-metric--critical | value color #ff0404 | styles.css:632–634 | yes |
| .ds-metric--ficha | transparent bg; label Montserrat Extra Light; value 52px | styles.css:644–655 | yes |
| .ds-metric--neutral | applied in TSX | knowledge/components/MetricCard.md | no dedicated CSS block |
| .ds-metric--good | applied in TSX | knowledge/components/MetricCard.md | no dedicated CSS block |
| .ds-metric--watch | applied in TSX | knowledge/components/MetricCard.md | no dedicated CSS block |
| .ds-metric__topline | structural wrapper | knowledge/components/MetricCard.md | no |

## Deltas & open questions (facts only — DO NOT resolve)
- Label size implemented `12px` (styles.css:616) vs doc PDF MÉTRICAS «Source Code Pro Bold 16px» (knowledge/components/MetricCard.md).
- Doc cites interlettering PDF 410 → CSS `letter-spacing: 0.41em` via `--ds-tracking-metric` (styles.css:618) — recorded as matching intent; unit conversion not independently PDF-verified here.
- Ficha value `font-size: 52px` (styles.css:654) is an untokenized literal (`/* TODO token */`) — design-reference p.10 «En ficha: Número Montserrat Bold 52pt».
- Ficha label keeps inherited `12px` from base; PDF p.10 cites «Montserrat Extra Light - 16pt» for En-ficha title — size delta unresolved.
- `#ff0404` via `--ds-color-pdf-critical` vs semantic `--ds-color-danger: #ff3d48` — duplication candidate, unresolved.
