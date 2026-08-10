# FormTextInput — Numeric Specification

- Status: measured
- Source-of-truth order: PDF (page N) > component doc > implemented CSS
- CSS block: `.ds-form-field` shared base (styles.css, PDF-context block) + `--login` modifier
- Export: packages/ui/src/components/FormTextInput.tsx
- PDF reference: p.17 "FORM - LOGIN" (variant `login`), p.18 "FORM - INPUT" (variant `default`) — per `knowledge/components/FormTextInput.md`
- Scale: display values = PDF annotation ÷ 2 (see [specs/README.md — Scale calibration](../README.md#scale-calibration))

Measured 2026-08-07 during feature `001-form-modal` build + post-review PyMuPDF sweep
(`get_pixmap()`/`get_drawings()`/`get_text("dict")` on p.17, confirmed via `get_text()` on
p.18) — that pass only checked **color**, not geometry (see 2026-08-10 entry below).

**2026-08-10 — geometry-only re-pass (`get_drawings()`/`get_text("dict")` on p.17/p.18, 7+
label instances measured), found real deltas the 2026-08-07 pass missed:**

## Dimensions
| Property | Value | Unit | Source | Delta vs PDF/doc |
|----------|------:|------|--------|------------------|
| border-width | 0.75 | px | styles.css | hairline — not scaled |
| control min-height (`default`) | 15 | px | styles.css | calibrated ÷2 — PDF control 30pt @2× (p.18, 4 instances). Was `44px`, invented/unmeasured — ~2.9× oversized. |
| control min-height (`login`) | 22 | px | styles.css | calibrated ÷2 — PDF control 43.48pt @2× (p.17, 3 instances) ≈ 21.74px. Was the same shared `44px` as `default` — the two variants have different real heights, not one shared value. |
| control/label inset (left+right) | 5 | px | styles.css (`.ds-form-field__control` padding) | calibrated ÷2 — measured ~4.475–5.19px across 7 instances (USUARIO/CONTRASEÑA/DNI/NOMBRE/TIPO DE USUARIO/DESCRIPCIÓN static+active labels, p.17/p.18). Was `11px`, invented/unmeasured. |
| textarea min-height | 72 | px | styles.css | calibrated ÷2 — PDF textarea 143.72pt @2× ≈ 71.86px (p.18 "DESCRIPCIÓN", both instances). Was `68px`, close but unmeasured. |
| textarea label inset (top+left) | 5 | px | styles.css | calibrated ÷2 — measured ~4.475–4.655px (p.18 "DESCRIPCIÓN" label, both static/active instances). Was absolute `top:50%→8px` (see Deltas — wrong mechanism, not just wrong number). |

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
| label active divisor (single-line only) | #606060 | `--ds-color-pdf-border` | styles.css | added 2026-08-10 — see Deltas, the PDF draws a vertical line between the shrunk label and the value once active; `border-right` on the label reuses the field's own border color/width |

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
| control (single-line) | `0 5px` | `--ds-space-2` (8px, entre label+divisor y valor) | styles.css — reemplaza el `padding: 15px 11px 0` fijo del input; el layout es `display:flex` ahora, no padding por hijo |
| control (textarea) | `5px` | — | styles.css |
| textarea | `padding-top: 18px` (despeja la fila del label, siempre arriba) | — | styles.css |

## Variants / modifiers present in CSS
| Class | Effect | Source | Backed by CSS? (yes/no) |
|-------|--------|--------|-------------------------|
| `.ds-form-field--login` | Swaps background/label color to the `login` palette + own `min-height` (22px) | styles.css | yes |
| `.ds-form-field--invalid` | Border → `--ds-color-pdf-critical` | styles.css | yes |
| `.ds-form-field--disabled` | `opacity: 0.58` (not PDF-specified) | styles.css | yes |

## Deltas & open questions (facts only — DO NOT resolve)

**2026-08-10 — real geometry bugs found (the 2026-08-07 pass only verified color/font-size,
never position — same class of gap as `FormCheckable`'s switch, per
`knowledge/fidelity-pass/next-steps.md`):**

- **Active label moved to the top instead of staying centered — wrong mechanism, not just a
  wrong number.** The shipped CSS had the label `position: absolute; top: 50%` (static) →
  `top: 8px` (active), i.e. it floated to the top of the control once focused/filled. Zoomed
  `get_pixmap()` renders of p.17 ("CONTRASEÑA" activo, empty+cursor) and p.18 ("NOMBRE" con
  valor "Juan Cruz") both show the label staying **vertically centered** in both states —
  it only shrinks font-size (16/20pt→10pt) and becomes an **inline prefix** followed by a
  thin vertical divider, with the value text continuing on the same row after the divider.
  There is no floating-to-top behavior for the single-line case at all. Fixed by switching
  `.ds-form-field__control` to `display: flex` (label `order: -1` to render visually first
  despite following the input in the DOM, which the `input:not(:placeholder-shown) ~ label`
  selector still needs) instead of absolute positioning — this also makes the value's
  start position track the label's real (variable) width instead of a fixed guessed
  padding.
- **Textarea's label was wrongly centered in the static/empty state too.** Unlike the
  single-line case, textarea's label really is always top-anchored per the PDF (p.18
  "DESCRIPCIÓN", both the empty static example and the filled active one sit label-top-left)
  — but the *shared* `.ds-form-field__label` rule defaulted to `top: 50%` for every member of
  the family, textarea included, so the empty/static textarea was rendering its placeholder
  label vertically centered in a ~72px box instead of pinned to the top. Fixed with a
  `.ds-form-field__control:has(textarea) .ds-form-field__label` override that's unconditional
  (applies in both static and active state, no `:not(:placeholder-shown)` needed) — textarea
  never gets the divisor either, since the paragraph needs the full width to wrap.
- **Control height and label/text inset were invented, not measured, in the 2026-08-07
  pass** (`min-height: 44px` was already flagged in the doc as "not PDF-measured"; the 11px
  inset was never flagged at all). Both turned out wrong once actually measured: height was
  ~2.9× oversized for `default` and shared a single value across two variants that PDF draws
  at different heights (p.17 login fields measure 43.48pt @2×, p.18 default fields measure
  30pt @2× — not the same number); inset was ~2.4× oversized (11px vs measured ~4.5px),
  the same order of magnitude as `FormCheckable`'s shared-token bugs.
- Transition timing (`180ms`/`ease` on `border-color`/`font-size`) is not specified by the
  PDF ("sumarle animación al pase entre estático y activo", no timing given) — same
  `DECISIONS.md` entry as before.
- `disabled` styling (`opacity: 0.58`) reuses `.ds-button:disabled`'s convention by decision,
  not a PDF-measured value (the PDF only covers "activo" and "con error").
- The divisor's exact clearance (gap between the divisor and the value text) is a CSS `gap`
  (`--ds-space-2`, 8px) approximation, not a value traced to a specific PDF measurement — the
  PDF only gives one combined offset per example (e.g. "NOMBRE" example: value starts
  ~37.82px from the field's left edge), which can't be decomposed into "label width" +
  "divisor width" + "gap" independently from a single data point. Flagged as a reasonable
  approximation, same class of call as `FormFileUpload`'s upload-button padding.
