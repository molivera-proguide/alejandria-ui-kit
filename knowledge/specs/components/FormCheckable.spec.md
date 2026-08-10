# FormCheckable — Numeric Specification

- Status: measured
- Source-of-truth order: PDF (page N) > component doc > implemented CSS
- CSS block: `.ds-form-checkable*` (styles.css, PDF-context block)
- Export: packages/ui/src/components/FormCheckable.tsx
- PDF reference: p.19 "FORM - CHECKABLES" — per `knowledge/components/FormCheckable.md`
- Scale: display values = PDF annotation ÷ 2 (see [specs/README.md — Scale calibration](../README.md#scale-calibration))

Measured 2026-08-07, in two passes. First pass (post-review PyMuPDF sweep, colors only)
found 0 deltas and independently confirmed a checkbox check-glyph fix already made earlier
the same session (stroke-only path, not a filled dot; see Deltas). **Second pass, same
day** (triggered by Luna reviewing the `Carga de Formulario` screen — see
`knowledge/screens/carga-de-formulario.md`): re-measured switch geometry specifically
(never checked in the first pass) and found 2 real deltas — wrong control position
(before, not after, the label) and switch track/thumb size reused from an unrelated
component's token — both fixed, see Dimensions and Deltas below.

## Dimensions
| Property | Value | Unit | Source | Delta vs PDF/doc |
|----------|------:|------|--------|------------------|
| checkbox/radio control | 7×7 | px | styles.css | **corrected 2026-08-07** — measured via `get_drawings()` on p.19, cross-checked across 4 independent rows (horizontal radio, vertical radio, 2 checkbox groups): all 4 gave the identical rect `13.58×13.58pt @2×` → ÷2 = 6.79×6.79px, rounded 7×7. Was `var(--ds-size-icon-md)` = 17px, a token shared with `.ds-button__icon`/`.ds-field__icon` (unrelated console/teal families) — not touched; a local literal replaces it here. ~2.4× oversized before. |
| checkbox check-glyph | 5×4 | px | styles.css | **corrected 2026-08-07** — measured checkmark stroke bbox `10.19×8.52pt @2×` → ÷2 = 5.1×4.26px, rounded 5×4. Was `10×8px`. |
| radio inner dot (`::after`) | 3.5×3.5 | px | styles.css | **corrected 2026-08-07** — measured `7.02×7.02pt @2×` → ÷2 = 3.51×3.51px, rounded 3.5×3.5. Was `8×8px`. |
| switch track | 16×8 | px | styles.css | **corrected 2026-08-07** — measured via `get_drawings()` on p.19: track rect 32.58×15.89pt @2× → ÷2 = 16.29×7.95px, rounded 16×8. Was `var(--ds-size-switch-track-w/h)` = 52×28px, reused from the unrelated `Switch` component (console/teal family, different scale) — ~3.3× oversized in width, ~3.5× in height. |
| switch thumb | 6×6 | px | styles.css | **corrected 2026-08-07** — measured thumb ⌀11.33pt @2× → ÷2 = 5.67px, rounded 6px. Was `var(--ds-size-icon-xl)` = 20px, same wrong-token reuse as the track. |
| switch thumb inset (padding) | 1 | px | styles.css | measured ~2.3-2.6pt @2× → ÷2 ≈ 1.1-1.3px, rounded 1px. Was `3px`. |
| switch thumb travel (checked translateX) | 8 | px | styles.css | measured ~16.27pt @2× → ÷2 ≈ 8.14px, rounded 8px (= track 16 − 2×padding 1 − thumb 6). Was `var(--ds-space-6)` = 24px. |
| group horizontal-layout gap | var(--ds-space-6) = 24 | px | styles.css | **added 2026-08-07** — measured glyph-to-glyph pitch between "Admin"/"Editor"/"General" radios on p.19's horizontal "TIPO DE USUARIO" example: ~56.4-57.15pt @2× per item (includes glyph + label + trailing gap), noisy across the 2 gaps measured; `--ds-space-6` (24px) reused as the closest existing token rather than inventing a literal, same rounding-to-nearest-token precedent as `.ds-investigation-card__actions` gap. |

## Color
| Role | Value | Matching --ds-* token? | Source | Delta |
|------|-------|------------------------|--------|-------|
| checkbox/radio selected background | #ffffff | `--ds-color-white` | styles.css | confirmed — "Seleccionado: Fondo #ffffff - Selector #060606" |
| checkbox/radio selector | #060606 | `--ds-color-pdf-surface` | styles.css | confirmed |
| switch track (rest) | #606060 | `--ds-color-pdf-border` | styles.css | confirmed — "Switch: Fondo #606060 - Selector #ffffff" |
| switch thumb (rest) | #ffffff | `--ds-color-white` | styles.css | confirmed |
| switch track (selected) | #ffffff | `--ds-color-white` | styles.css | confirmed — "Switch - Seleccionado: Fondo #ffffff - Selector #060606" |
| switch thumb (selected) | #060606 | `--ds-color-pdf-surface` | styles.css | confirmed |
| group title | #8d8d8d | `--ds-color-pdf-form-muted` | styles.css | confirmed — "Título grupo: ... #8d8d8d" |
| label | #ffffff | `--ds-color-white` | styles.css | confirmed — "Label: Montserrat Regular - 16pt - #ffffff" |
| description | #8d8d8d | `--ds-color-pdf-form-muted` | styles.css | confirmed — "Descripción: Montserrat Regular - 12pt - #8d8d8d" |

## Typography
| Element | Font family | Size | Weight | Source |
|---------|-------------|------|--------|--------|
| group title | var(--ds-font-mono) | 8px | 300 (light) | PDF 16pt @2× ÷2. |
| label | var(--ds-font-body) | 8px | 400 (regular) | PDF 16pt @2× ÷2. |
| description | var(--ds-font-body) | 6px | 400 (regular) | PDF 12pt @2× ÷2. |

## Variants / modifiers present in CSS
| Class | Effect | Source | Backed by CSS? (yes/no) |
|-------|--------|--------|-------------------------|
| `.ds-form-checkable--checkbox` | Square control, check-glyph via `.ds-form-checkable__check` | styles.css | yes |
| `.ds-form-checkable--radio` | Pill control, `::after` solid dot | styles.css | yes |
| `.ds-form-checkable--switch` | Track/thumb, `transform: translateX` on thumb; `display: flex; justify-content: space-between` so the control sits at the row's right edge | styles.css | yes |
| `.ds-form-checkable-group__items--horizontal` | **added 2026-08-07** — `display: flex; flex-wrap: wrap; gap: var(--ds-space-6)`, replaces the default `display: grid` (one option per row) | styles.css | yes |

## Deltas & open questions (facts only — DO NOT resolve)
- **Fixed same-session bug (2026-08-07, before commit):** the switch's `:checked` state
  inherited the checkbox/radio `::after` dot rule (both used an undifferentiated selector),
  painting a dark dot inside the switch thumb the PDF does not show. Fixed by scoping the
  dot rule to `--checkbox`/`--radio` only. Confirmed correct against PDF `get_drawings()` in
  the same-day post-review sweep — checkbox renders a white-filled square with a
  **stroke-only** check-glyph inside (`stroke=#060606, fill=none`), not a filled dot; radio
  renders a white ring + solid dark dot; switch renders a clean track/thumb swap with no
  dot artifact — all three match pixel-for-pixel.
- **Cross-checked and fixed 2026-08-07** (was flagged "not-yet-cross-checked" until now):
  switch track/thumb sizes were independently re-measured against p.19's real vector
  geometry (`get_drawings()`) — see Dimensions above. Also found and fixed a second,
  unrelated delta the same pass: the switch's control renders **after** the label/copy
  (DOM order, not just a CSS visual reorder) — text-span x-coordinates (`Admin` etc. at
  x≈635pt) sit well left of the switch track's own rect (x≈1065pt) on every row measured.
  Checkbox/radio keep control-before-label (confirmed unchanged, matches their own
  measured glyph-then-text order).
- **Missing capability found 2026-08-07, same review:** `FormCheckableGroup` had no way to
  lay its items out horizontally — p.19's "TIPO DE USUARIO" (simple, no description)
  example is a single row, but the shipped component always stacked one option per line
  (`display: grid`, single column). Added `layout` prop + `--horizontal` modifier class,
  see Dimensions (gap) and Variants above. Kept the default vertical for any group with
  `description` — a long description doesn't fit in a horizontal row.
- **Delta found while measuring the above, fixed same day (2026-08-07, third review
  pass):** checkbox/radio control measured ⌀6.79px against p.19's horizontal example, vs.
  the 17px currently shipped (`--ds-size-icon-md`, ~2.4× oversized) — see Dimensions.
  Cross-checked across 3 more independent rows (vertical radio, 2 checkbox groups) before
  fixing, since this token is shared with `.ds-button__icon`/`.ds-field__icon` (unrelated
  families) — all 4 rows measured the identical `13.58×13.58pt @2×` rect, high confidence
  it's a real, consistent value and not PDF noise. Fixed with a local literal (`7px`), the
  shared token itself was left untouched. Also recalibrated the checkbox check-glyph
  (10×8px → 5×4px) and the radio inner dot (8×8px → 3.5×3.5px) in the same pass, since both
  scale off the control's own size.
