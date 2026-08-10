# Modal — Numeric Specification

- Status: measured
- Source-of-truth order: PDF (page N) > component doc > implemented CSS
- CSS block: `.ds-modal*` (styles.css, PDF-context block)
- Export: packages/ui/src/components/Modal.tsx
- PDF reference: p.22 "ALERT" § "Confirmación de acción" — per `knowledge/components/Modal.md`
- Scale: display values = PDF annotation ÷ 2 (see [specs/README.md — Scale calibration](../README.md#scale-calibration))

Measured 2026-08-07 via PyMuPDF `get_pixmap()` (128-point pixel sample) + `get_drawings()`
on p.22. Two real deltas found against the page's own legend text — see Color below.

## Dimensions
| Property | Value | Unit | Source | Delta vs PDF/doc |
|----------|------:|------|--------|------------------|
| border-width | 0.75 | px | styles.css | hairline — not scaled |
| dialog width | 325 | px | styles.css | calibrated ÷2 — PDF vector rect 650×310pt @2×, was `max-width: 420px` (invented, no fixed proportion) before this pass |
| dialog padding | var(--ds-space-4) = 16 | px | styles.css | calibrated ÷2 — PDF box-edge→content inset ~28-31pt @2×, was `--ds-space-6` (24px, too generous) |
| title→text gap | 20 | px (margin-bottom) | styles.css | calibrated ÷2 — PDF gap ~38.5pt @2× |
| text→line gap | 44 | px (margin-bottom) | styles.css | calibrated ÷2 — PDF gap ~89.5pt @2×, real measured gap, not a shared/invented value |
| line→actions gap | 12 | px (margin-bottom) | styles.css | calibrated ÷2 — PDF gap ~25.3pt @2× |
| action button size | ~74.3×14.2 (content-sized) | px | styles.css (padding-driven) | calibrated ÷2 — PDF "ACCIÓN A"/"ACCIÓN B" rects 148.56×28.34pt / 148.4×28.34pt @2×. Recalibrated 2026-08-10: vertical padding was `var(--ds-space-2)`=8px top+bottom with no `font-size` set at all (inherited the browser default, ~16px) — combined that alone already exceeded the real ~14.2px total height. Now `font-size: 7px` + `padding: 3px var(--ds-space-4)`. |

## Color
| Role | Value | Matching --ds-* token? | Source | Delta |
|------|-------|------------------------|--------|-------|
| dialog background | #494949 | `--ds-color-pdf-action` | styles.css | **corrected 2026-08-07.** Legend text says `#060606`; the box's own raw vector fill (`get_drawings()`) also reports `#060606`. But a 128-point `get_pixmap()` sample across the actual "Confirmación de acción" box measured 127/128 points at rgb(73,73,73) = `#494949`, matching the page's other two boxes ("Alert Sigcat"/"Tarea realizada") pixel-for-pixel — some page-level dimming/overlay lightens the final composited render. Final composited pixel (what a viewer sees) was trusted over the shape's own raw paint metadata. |
| border | #606060 | `--ds-color-pdf-border` | styles.css | confirmed — "Borde: 0,75pt - #606060", `get_drawings()` stroke matches, no discrepancy |
| title | #ffffff | `--ds-color-white` | styles.css | confirmed — "Título: Source Code Bold - 18pt - #ffffff", span's own color matches |
| description text | #f6f6f6 | `--ds-color-pdf-ink-bright` | styles.css | **corrected 2026-08-07.** Legend says `#c1c1c1`; the span's own fill color (`get_text("dict")` → span.color) measures `#f6f6f6` — same discrepancy class as the background above, trusting the measured/rendered value. |
| divider line | #8a8b87 | `--ds-color-pdf-ink-muted` | styles.css | confirmed — "Línea: 0,75pt - #8a8b87" |
| action text | #ffffff | `--ds-color-white` | styles.css | `get_text()` shows both `#8d8d8d` and `#ffffff` duplicated at each button's position (overlapping-text-runs artifact seen elsewhere on this PDF) — `#ffffff` kept as the resting value, matching every other white label on this box |
| action background (left/secondary, base `.ds-modal__action`) | #8a8b87 | `--ds-color-pdf-ink-muted` | styles.css | **corrected 2026-08-10** — see Deltas. Permanent rest fill, not a hover state. |
| action background (right/primary, `--primary`) | #494949 | `--ds-color-pdf-action` | styles.css | **corrected 2026-08-10** — same as the modal's own background, so it visually blends in/disappears at rest. |
| action hover background | #8a8b87 | `--ds-color-pdf-ink-muted` | styles.css | kept unchanged — now only visibly changes the primary/right button (secondary/left is already this color at rest, so hovering it is a no-op) |

## Typography
| Element | Font family | Size | Weight | Source |
|---------|-------------|------|--------|--------|
| title | var(--ds-font-display) | 9px | 700 (bold) | PDF 18pt @2× ÷2. Source Code Bold. |
| description | var(--ds-font-body) | 9px | 300 (light) | PDF 18pt @2× ÷2. Montserrat Light. |
| actions | var(--ds-font-body) | 7px | 700 (bold) | **corrected 2026-08-10** — was unset entirely (inherited the browser default, ~2× oversized). `get_text()` on p.22 measures "ACCIÓN A"/"ACCIÓN B" spans at 14.64pt @2× ≈ 7.32px, rounded to 7px. |

## Variants / modifiers present in CSS
| Class | Effect | Source | Backed by CSS? (yes/no) |
|-------|--------|--------|-------------------------|
| `.ds-modal__action--primary` | Background → `--ds-color-pdf-action` (#494949, blends into the modal's own background) | styles.css | yes — **corrected 2026-08-10, see Deltas** |

## Deltas & open questions (facts only — DO NOT resolve)
- **Background and description-text color both diverge from the PDF page's own legend
  text** (see Color table) — resolved in favor of the measured/composited pixel value, same
  "geometry/render wins over legend" rule already applied elsewhere in this fidelity pass
  (e.g. `InvestigationCard`'s action-button colors, `FormFileUpload`'s meta-text colors).
- **Corrected 2026-08-10 — the "one button is a hover capture, not two permanent colors"
  reading (2026-08-07) doesn't hold up under direct measurement.** `get_drawings()` on
  `doc[21]` shows BOTH action rects with their own opaque, non-transparent fill
  simultaneously in the same static page — `(0.541,0.545,0.529)`=`#8a8b87` on the
  left/secondary button, `(0.286,0.286,0.286)`=`#494949` on the right/primary one. A flat PDF
  page cannot render a live `:hover` state next to its own rest state in one static image, so
  two simultaneous opaque fills can only mean two permanent colors, not a rest/hover pair.
  This also explains why `.ds-modal__action--primary` existed in `Modal.tsx` (assigned to the
  primary/right button) with no matching CSS rule at all before this fix — a real, if
  previously undetected, gap between the class and its styling, not dead code. Font-size was
  also completely missing (browser default, ~2× oversized) and vertical padding
  (`var(--ds-space-2)`=8px top+bottom) alone already exceeded the button's real measured
  height once combined with any font-size at all — recalibrated to `font-size: 7px` +
  `padding: 3px var(--ds-space-4)`.
- Fixed the same day: `Modal.stories.tsx`'s default demo args had `secondaryAction.label`/
  `primaryAction.label` swapped relative to the PDF's own left-to-right arrangement
  ("ACCIÓN B" was rendered on the left, "ACCIÓN A" on the right — backwards from the PDF's own
  "ACCIÓN A" at x0=611.79 / "ACCIÓN B" at x0=772.58). Demo-data fix only — the component's
  actual prop semantics (`secondaryAction`/`primaryAction`, generic) are unaffected; the PDF's
  "A"/"B" names are just its own placeholder labels for two generic actions, not the
  component's real prop names.
