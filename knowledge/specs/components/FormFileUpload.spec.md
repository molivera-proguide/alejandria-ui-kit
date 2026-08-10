# FormFileUpload — Numeric Specification

- Status: measured
- Source-of-truth order: PDF (page N) > component doc > implemented CSS
- CSS block: `.ds-form-file*` (styles.css, PDF-context block)
- Export: packages/ui/src/components/FormFileUpload.tsx
- PDF reference: p.20 "FORM - ADJUNTOS" — per `knowledge/components/FormFileUpload.md`
- Scale: display values = PDF annotation ÷ 2 (see [specs/README.md — Scale calibration](../README.md#scale-calibration))

Measured 2026-08-07 via PyMuPDF `get_pixmap()` + `get_drawings()` on p.20 — the text-only
extract had undersold this page's structure (see Deltas). Rebuilt end-to-end same session,
then re-verified. **That pass re-verified colors and the major element sizes but never
re-measured the header/row/empty-label's own left/top insets** — a 2026-08-10 geometry-only
re-pass (`get_text("dict")` on the "ADJUNTAR ARCHIVOS"/"Archivo_1.doc"/"ADJUNTAR" spans found
those were the same invented `11px`/`8px`/`6px` insets already found wrong family-wide on
`FormTextInput` (p.17/p.18) — see Dimensions below.

## Dimensions
| Property | Value | Unit | Source | Delta vs PDF/doc |
|----------|------:|------|--------|------------------|
| root width | 253 | px | styles.css | calibrated ÷2 — PDF 505.5pt @2× |
| list header height | 15 | px | styles.css | calibrated ÷2 — PDF header bar 30pt @2× |
| list header/row inset | 5 | px | styles.css | calibrated ÷2 — "ADJUNTAR ARCHIVOS" inset ~8.98pt @2× ≈ 4.49px, "Archivo_1.doc"/"WORD - 2.4 Mb" inset ~5.4-6.5px (p.20). Era `11px`, mismo inset inventado que el resto de la familia (ver `FormTextInput.spec.md`). Medido 2026-08-10. |
| row min-height | 24 | px | styles.css | calibrated ÷2 — PDF row 48.6pt @2× |
| thumbnail card width | 83 | px | styles.css | calibrated ÷2 — PDF thumbnail card 165×153.1pt @2× |
| empty/drop-zone height | 156 | px | styles.css | calibrated ÷2 — PDF drop-zone rect 311.4pt @2× |
| empty-label inset (left/top) | 5/3 | px | styles.css | calibrated ÷2 — "ADJUNTAR" inset ~8.9pt/5.65pt @2× ≈ 4.45px/2.83px. Era `8px`/`6px` sin medir. Medido 2026-08-10. |
| empty-icon badge | 31×33 | px | styles.css | calibrated ÷2 — PDF badge ~61.5×66.5pt @2× |
| upload button padding | 10px 32px | px | styles.css | approximates measured button 224.3×37.9pt @2× ÷2 ≈ 112×19px — not an exact fixed-size match, content-sized button with this padding |

## Color
| Role | Value | Matching --ds-* token? | Source | Delta |
|------|-------|------------------------|--------|-------|
| control/panel background | rgb(6 6 6 / 0.5) or #060606 | `--ds-color-pdf-surface-a50` / `--ds-color-pdf-surface` | styles.css | confirmed — "Fondo: #060606 - 50%"; drop-zone uses the solid surface token since it sits on the field's own surface, not layered over content |
| border | #606060 | `--ds-color-pdf-border` | styles.css | confirmed — "Borde: 0,75pt - #606060" |
| border (error) | #ff0404 | `--ds-color-pdf-critical` | styles.css | confirmed — "Borde con error: #ff0404" |
| list header / meta text | #c1c1c1 | `--ds-color-pdf-line` | styles.css | **corrected 2026-08-07** — legend states `#8d8d8d`; `get_text()` span color on this page measures literally `#c1c1c1`. Same "measured span wins over legend" rule as Modal p.22. |
| file name | #ffffff | `--ds-color-white` | styles.css | confirmed — "Nombre archivo: Montserrat Regular - 16pt - #ffffff" |
| drop-zone instructional/formats text | #e6e6e6 | `--ds-color-pdf-line-light` | styles.css | **corrected 2026-08-07** — legend states `#8d8d8d`; measured span color is `#e6e6e6`. |
| empty-zone label ("ADJUNTAR") | #8d8d8d | `--ds-color-pdf-form-muted` | styles.css | confirmed — this specific small label does match its own measured `#8d8d8d`, unlike the instructional text above |
| icon badge fill | #494949 | `--ds-color-pdf-action` | styles.css | confirmed — measured badge fill |
| icon stroke | #8a8b87 | `--ds-color-pdf-ink-muted` | styles.css | confirmed — measured icon stroke |
| drag-over highlight | #ffffff | `--ds-color-white` | styles.css | not PDF-measured — the PDF leaves drag&drop interaction unspecified; documented as a reasonable interpretation in `DECISIONS.md` (2026-08-07) |

## Typography
| Element | Font family | Size | Weight | Source |
|---------|-------------|------|--------|--------|
| list header label | var(--ds-font-mono) | 8px | 300 (light) | PDF 16pt @2× ÷2. |
| file name | var(--ds-font-body) | 8px | 400 (regular) | PDF 16pt @2× ÷2. |
| file meta (type/size) | var(--ds-font-body) | 5px | 400 (regular) | PDF 10pt @2× ÷2. |
| empty label | var(--ds-font-mono) | 5px | 300 (light) | PDF 10pt @2× ÷2. |
| instructional line | var(--ds-font-body) | 8px | 700 (bold) | PDF 16pt @2× ÷2. |
| formats line | var(--ds-font-body) | 7px | 300 (light) | PDF 14pt @2× ÷2. |

## Variants / modifiers present in CSS
| Class | Effect | Source | Backed by CSS? (yes/no) |
|-------|--------|--------|-------------------------|
| `.ds-form-file__empty--drag` | Border → white | styles.css | yes |
| `.ds-form-file__empty--overlay` | Absolute-positioned, covers the list panel | styles.css | yes |
| `.ds-form-file.ds-form-field--invalid` | Border → critical on both empty card and list header | styles.css | yes |

## Deltas & open questions (facts only — DO NOT resolve)
- **Structural rebuild (2026-08-07):** the shipped-before-this-pass version rendered a
  single placeholder zone with no real file list, no thumbnails, and no remove affordance
  at all — the text-only extract (`pdf-text-extract.md`) had missed real UI elements
  entirely (remove buttons, thumbnails, the icon+button on the empty card) that only
  `get_drawings()`/`get_pixmap()` surfaced. Rebuilt to the structure described in
  `knowledge/components/FormFileUpload.md`.
- Drag&drop highlight treatment (`border-color: white` on drag-over) is a documented
  interpretation, not a PDF-measured value — the PDF explicitly leaves this interaction
  open ("escucho sugerencias... mientras busco referencias").
- Upload button padding is an approximation of the measured PDF button, not an exact
  fixed-width match — the button stays content-sized.
- **2026-08-10 geometry re-pass:** the list-header/row/empty-label insets (11px/8px/6px)
  were never independently measured in the 2026-08-07 build — they reused the same guessed
  value the rest of the `.ds-form-field` family had, which turned out ~1.8-2.4× oversized
  once actually measured against p.20's own text spans. Same class of finding as
  `FormTextInput`/`FormSelect` on p.17/p.18/p.21 (see `knowledge/fidelity-pass/next-steps.md`).
