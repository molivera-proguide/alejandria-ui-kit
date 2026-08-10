# FormTextInput — Numeric Specification

- Status: measured
- Source-of-truth order: PDF (page N) > component doc > implemented CSS
- CSS block: `.ds-form-field` shared base (styles.css, PDF-context block) + `--login` modifier
- Export: packages/ui/src/components/FormTextInput.tsx
- PDF reference: p.17 "FORM - LOGIN" (variant `login`), p.18 "FORM - INPUT" (variant `default`) — per `knowledge/components/FormTextInput.md`
- Scale: display values = PDF annotation ÷ 2 (see [specs/README.md — Scale calibration](../README.md#scale-calibration))

Measured 2026-08-07 during feature `001-form-modal` build + post-review PyMuPDF sweep
(`get_pixmap()`/`get_drawings()`/`get_text("dict")` on p.17, confirmed via `get_text()` on
p.18). No deltas found against the shipped implementation on either page.

## Dimensions
| Property | Value | Unit | Source | Delta vs PDF/doc |
|----------|------:|------|--------|------------------|
| border-width | 0.75 | px | styles.css | hairline — not scaled |
| control min-height | 44 | px | styles.css | not PDF-measured — room for floating label + input row, see `DECISIONS.md` 2026-08-07 |
| input padding | 15px 11px 0 | px | styles.css | display, not independently PDF-measured (vertical rhythm) |
| textarea min-height | 68 | px | styles.css | not PDF-measured |

## Color
| Role | Value | Matching --ds-* token? | Source | Delta |
|------|-------|------------------------|--------|-------|
| control background (`default`) | rgb(6 6 6 / 0.5) | `--ds-color-pdf-surface-a50` | styles.css | confirmed — PDF p.18 "Fondo: #060606 - 50%" |
| control background (`login`) | #2a2927 | `--ds-color-pdf-surface-warm` | styles.css | confirmed — PDF p.17 "Fondo: #2a2927" |
| border (rest) | #606060 | `--ds-color-pdf-border` | styles.css | confirmed — PDF "Borde: 0,75pt - #606060" |
| border (focus) | #ffffff | `--ds-color-white` | styles.css | confirmed — "Input activo: borde #ffffff" |
| border (error) | #ff0404 | `--ds-color-pdf-critical` | styles.css | confirmed — "Borde con error: #ff0404" |
| value text | #ffffff | `--ds-color-white` | styles.css | confirmed — "Texto: Montserrat Regular - 16pt - #ffffff" |
| label static (`default`) | #8d8d8d | `--ds-color-pdf-form-muted` | styles.css | confirmed — "Label: ... #8d8d8d" |
| label static (`login`) | #f6f6f6 | `--ds-color-pdf-ink-bright` | styles.css | confirmed — PDF p.17 "Label: ... #f6f6f6" |
| label active (both variants) | #8d8d8d | `--ds-color-pdf-form-muted` | styles.css | confirmed — "Input Activo - Label Activo: ... #8d8d8d" |

## Typography
| Element | Font family | Size | Weight | Source |
|---------|-------------|------|--------|--------|
| label static (`default`) | var(--ds-font-mono) | 8px | 300 (light) | PDF 16pt @2× ÷2. Source Code Light. |
| label static (`login`) | var(--ds-font-mono) | 10px | 300 (light) | PDF 20pt @2× ÷2. |
| label active (both) | var(--ds-font-mono) | 5px | 300 (light) | PDF 10pt @2× ÷2 — "Input Activo - Label Activo". |
| value text | var(--ds-font-body) | 8px | 400 (regular) | PDF 16pt @2× ÷2. Montserrat Regular. |
| error message | var(--ds-font-body) | 0.72rem | 400 | Not PDF-measured — error state has no dedicated PDF spec (visual-only, per `input.md`). |

## Spacing
| Region | Padding | Gap | Source |
|--------|---------|-----|--------|
| root (`.ds-form-field`) | — | `--ds-space-2` (8px) | styles.css |
| control input | 15px 11px 0 | — | styles.css |
| control textarea | 18px 11px 0 (top adjusted) | — | styles.css |

## Variants / modifiers present in CSS
| Class | Effect | Source | Backed by CSS? (yes/no) |
|-------|--------|--------|-------------------------|
| `.ds-form-field--login` | Swaps background/label color to the `login` palette | styles.css | yes |
| `.ds-form-field--invalid` | Border → `--ds-color-pdf-critical` | styles.css | yes |
| `.ds-form-field--disabled` | `opacity: 0.58` (not PDF-specified) | styles.css | yes |

## Deltas & open questions (facts only — DO NOT resolve)
- `min-height: 44px` (control) has no PDF measurement — the PDF specifies typography/color
  for this field but not the box height itself. Logged as an implementation decision in
  `DECISIONS.md` (2026-08-07).
- Transition timing (`180ms`/`ease` on `border-color`/`top`/`font-size`) is not specified by
  the PDF ("sumarle animación al pase entre estático y activo", no timing given) — same
  `DECISIONS.md` entry.
- `disabled` styling (`opacity: 0.58`) reuses `.ds-button:disabled`'s convention by decision,
  not a PDF-measured value (the PDF only covers "activo" and "con error").
