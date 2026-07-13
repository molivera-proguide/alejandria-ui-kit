# MetricCard — Numeric Specification

- Status: partial
- Source-of-truth order: PDF (page 10 MÉTRICAS) > component doc > implemented CSS
- CSS block: `.ds-metric` (styles.css — PDF-context block)
- Export: packages/ui/src/components/MetricCard.tsx
- PDF reference: MÉTRICAS (page 10 — Reporting vs En ficha)
- Scale: display values = PDF annotation ÷ 2 (see [specs/README.md — Scale calibration](../README.md#scale-calibration))

## Dimensions
| Property | Value | Unit | Source | Delta vs PDF/doc |
|----------|------:|------|--------|------------------|
| border-width | 0.75 | px | styles.css | hairline — not scaled |
| border-radius | var(--ds-radius-xs) → 2 | px | styles.css | — |
| min-height | 66 | px | styles.css (was token 132 @2×) | display = 132÷2 |
| padding | 5 | px | styles.css | display = 10÷2 |
| gap | 5.5 | px | styles.css | display = 11÷2 |

## Color
| Role | Value | Matching --ds-* token? | Source | Delta |
|------|-------|------------------------|--------|-------|
| background (reporting) | rgb(6 6 6 / 0.2) via --ds-color-pdf-surface-a20 | --ds-color-pdf-surface-a20 | styles.css | doc matches |
| background (ficha) | transparent | — | styles.css | PDF p.10 «Cuando está en ficha: sin fondo» |
| border | #e6e6e6 via --ds-color-pdf-line-light | --ds-color-pdf-line-light | styles.css | doc matches |
| label | #8a8b87 via --ds-color-pdf-ink-muted | --ds-color-pdf-ink-muted | styles.css | doc matches |
| value (neutral) | #ffffff via --ds-color-white | --ds-color-white | styles.css | doc matches |
| value (critical) | #ff0404 via --ds-color-pdf-critical | --ds-color-pdf-critical | styles.css | doc: «#ff0404 (PDF MÉTRICAS)»; applies in both appearances |
| change | #ffffff via --ds-color-white | --ds-color-white | styles.css | doc matches |

## Typography
| Element | Font family | Size | Weight | Letter-spacing | Line-height | Casing | Source |
|---------|-------------|------|--------|----------------|-------------|--------|--------|
| label (reporting) | var(--ds-font-mono) | 6px (display; PDF/doc often cite 16pt @2×) | 700 | 0.41em | 1.25 | uppercase | styles.css |
| label (ficha) | var(--ds-font-body) | inherits 6px | 200 (extralight) | inherits | inherits | uppercase | styles.css |
| value (reporting) | var(--ds-font-body) | 42px | 700 | 0 | 0.95 | none | styles.css — display = 84÷2 |
| value (ficha) | var(--ds-font-body) | 26px | 700 | inherits | inherits | none | styles.css — display = 52÷2 |
| change | var(--ds-font-body) | 8px | 200 | UNVERIFIED | 1.2 | none | styles.css — display = 16÷2 |

## Spacing
| Region | Padding | Gap | Margin | Source |
|--------|---------|-----|--------|--------|
| root | 5px | 5.5px | — | styles.css (display scale) |

## Variants / modifiers present in CSS
| Class | Effect | Source | Backed by CSS? (yes/no) |
|-------|--------|--------|-------------------------|
| .ds-metric--critical | value color #ff0404 | styles.css | yes |
| .ds-metric--ficha | transparent bg; label Montserrat Extra Light; value 26px | styles.css | yes |
| .ds-metric--neutral | applied in TSX | knowledge/components/MetricCard.md | no dedicated CSS block |
| .ds-metric--good | applied in TSX | knowledge/components/MetricCard.md | no dedicated CSS block |
| .ds-metric--watch | applied in TSX | knowledge/components/MetricCard.md | no dedicated CSS block |
| .ds-metric__topline | structural wrapper | knowledge/components/MetricCard.md | no |

## Deltas & open questions (facts only — DO NOT resolve)
- Label size implemented display `6px` (from prior 12px ÷2) vs doc PDF MÉTRICAS «Source Code Pro Bold 16px» @2× → intended display 8px — residual delta.
- Doc cites interlettering PDF 410 → CSS `letter-spacing: 0.41em` via `--ds-tracking-metric` — recorded as matching intent; unit conversion not independently PDF-verified here.
- Ficha value `font-size: 26px` is an untokenized literal (`/* TODO token */`) — design-reference p.10 «En ficha: Número Montserrat Bold 52pt» @2× → display 26px.
- Ficha label keeps inherited size from base; PDF p.10 cites «Montserrat Extra Light - 16pt» for En-ficha title — size delta unresolved.
- `#ff0404` via `--ds-color-pdf-critical` vs semantic `--ds-color-danger: #ff3d48` — duplication candidate, unresolved.
