# FormCheckable — Numeric Specification

- Status: measured
- Source-of-truth order: PDF (page N) > component doc > implemented CSS
- CSS block: `.ds-form-checkable*` (styles.css, PDF-context block)
- Export: packages/ui/src/components/FormCheckable.tsx
- PDF reference: p.19 "FORM - CHECKABLES" — per `knowledge/components/FormCheckable.md`
- Scale: display values = PDF annotation ÷ 2 (see [specs/README.md — Scale calibration](../README.md#scale-calibration))

Measured 2026-08-07. Post-review PyMuPDF sweep on p.19 (`get_drawings()`) found 0 deltas —
independently confirmed a checkbox check-glyph fix already made earlier the same session
(stroke-only path, not a filled dot; see Deltas).

## Dimensions
| Property | Value | Unit | Source | Delta vs PDF/doc |
|----------|------:|------|--------|------------------|
| checkbox/radio control | var(--ds-size-icon-md) = 17×17 | px | styles.css | reused existing token, not independently re-measured against PDF |
| check/dot glyph | 8–10 | px | styles.css | `.ds-form-checkable__check` 10×8; radio `::after` dot 8×8 |
| switch track | var(--ds-size-switch-track-w/h) = 52×28 | px | styles.css | reused existing `Switch` tokens |
| switch thumb | var(--ds-size-icon-xl) = 20×20 | px | styles.css | reused existing token |

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
| `.ds-form-checkable--switch` | Track/thumb, `transform: translateX` on thumb | styles.css | yes |

## Deltas & open questions (facts only — DO NOT resolve)
- **Fixed same-session bug (2026-08-07, before commit):** the switch's `:checked` state
  inherited the checkbox/radio `::after` dot rule (both used an undifferentiated selector),
  painting a dark dot inside the switch thumb the PDF does not show. Fixed by scoping the
  dot rule to `--checkbox`/`--radio` only. Confirmed correct against PDF `get_drawings()` in
  the same-day post-review sweep — checkbox renders a white-filled square with a
  **stroke-only** check-glyph inside (`stroke=#060606, fill=none`), not a filled dot; radio
  renders a white ring + solid dark dot; switch renders a clean track/thumb swap with no
  dot artifact — all three match pixel-for-pixel.
- Control sizes (`--ds-size-icon-md`, `--ds-size-switch-track-*`) reuse existing shared
  tokens rather than being independently re-measured against p.19's own vector geometry —
  flagged as not-yet-cross-checked, not as a known bug.
