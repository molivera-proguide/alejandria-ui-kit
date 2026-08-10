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

## Color
| Role | Value | Matching --ds-* token? | Source | Delta |
|------|-------|------------------------|--------|-------|
| dialog background | #494949 | `--ds-color-pdf-action` | styles.css | **corrected 2026-08-07.** Legend text says `#060606`; the box's own raw vector fill (`get_drawings()`) also reports `#060606`. But a 128-point `get_pixmap()` sample across the actual "Confirmación de acción" box measured 127/128 points at rgb(73,73,73) = `#494949`, matching the page's other two boxes ("Alert Sigcat"/"Tarea realizada") pixel-for-pixel — some page-level dimming/overlay lightens the final composited render. Final composited pixel (what a viewer sees) was trusted over the shape's own raw paint metadata. |
| border | #606060 | `--ds-color-pdf-border` | styles.css | confirmed — "Borde: 0,75pt - #606060", `get_drawings()` stroke matches, no discrepancy |
| title | #ffffff | `--ds-color-white` | styles.css | confirmed — "Título: Source Code Bold - 18pt - #ffffff", span's own color matches |
| description text | #f6f6f6 | `--ds-color-pdf-ink-bright` | styles.css | **corrected 2026-08-07.** Legend says `#c1c1c1`; the span's own fill color (`get_text("dict")` → span.color) measures `#f6f6f6` — same discrepancy class as the background above, trusting the measured/rendered value. |
| divider line | #8a8b87 | `--ds-color-pdf-ink-muted` | styles.css | confirmed — "Línea: 0,75pt - #8a8b87" |
| action text | #ffffff | `--ds-color-white` | styles.css | `get_text()` shows both `#8d8d8d` and `#ffffff` duplicated at each button's position (overlapping-text-runs artifact seen elsewhere on this PDF) — `#ffffff` kept as the resting value, matching every other white label on this box |
| action hover background | #8a8b87 | `--ds-color-pdf-ink-muted` | styles.css | reading: the PDF's own 2-button example shows one fill matching the modal's own background exactly (`#494949` — effectively no visible box at rest) and the other filled `#8a8b87` — modeled as "one button is a hover capture, not two permanent colors," same reading already confirmed for `InvestigationCard`'s action pair on a different page |

## Typography
| Element | Font family | Size | Weight | Source |
|---------|-------------|------|--------|--------|
| title | var(--ds-font-display) | 9px | 700 (bold) | PDF 18pt @2× ÷2. Source Code Bold. |
| description | var(--ds-font-body) | 9px | 300 (light) | PDF 18pt @2× ÷2. Montserrat Light. |
| actions | var(--ds-font-body) | inherited (root) | 700 (bold) | No dedicated PDF font-size citation for the action labels beyond "uppercase, bold" — no explicit pt value recorded in the legend for this specific text. |

## Variants / modifiers present in CSS
| Class | Effect | Source | Backed by CSS? (yes/no) |
|-------|--------|--------|-------------------------|
| `.ds-modal__action--primary` | No distinct color from `.ds-modal__action` today — both share the same rest/hover treatment | styles.css | yes (class present, shared rule) |

## Deltas & open questions (facts only — DO NOT resolve)
- **Background and description-text color both diverge from the PDF page's own legend
  text** (see Color table) — resolved in favor of the measured/composited pixel value, same
  "geometry/render wins over legend" rule already applied elsewhere in this fidelity pass
  (e.g. `InvestigationCard`'s action-button colors, `FormFileUpload`'s meta-text colors).
- Action label font-size has no independently confirmed PDF pt citation — inherits the
  dialog's ambient sizing rather than a value traced to a specific text-span measurement.
- No distinct primary/secondary color treatment exists today (`--primary` modifier class is
  present but currently styled identically to the base) — same open pattern already noted
  on `InvestigationCard`'s `primary`/`ghost` action variants.
