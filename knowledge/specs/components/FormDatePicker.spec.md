# FormDatePicker — Numeric Specification

- Status: measured
- Source-of-truth order: PDF (page N) > component doc > implemented CSS
- CSS block: `.ds-form-date*` (styles.css, PDF-context block)
- Export: packages/ui/src/components/FormDatePicker.tsx
- PDF reference: p.21 "FORM - DATEPICKER" — per `knowledge/components/FormDatePicker.md`
- Scale: display values = PDF annotation ÷ 2 (see [specs/README.md — Scale calibration](../README.md#scale-calibration))

Measured 2026-08-07 via PyMuPDF `get_pixmap()`/`get_drawings()`/`get_text()` on p.21 — the
text-only extract could not resolve this page's layout (jumbled day-grid/hour-range
numbers with no position data); rendering the page directly was required per `tasks.md`
T006's explicit gate.

## Dimensions
| Property | Value | Unit | Source | Delta vs PDF/doc |
|----------|------:|------|--------|------------------|
| FECHA trigger | 150×15 | px | styles.css | calibrated ÷2 — PDF 300×30pt @2× |
| FECHA panel | 150×101 | px | styles.css | calibrated ÷2 — PDF 300×202.68pt @2× |
| HORA trigger | 100×15 | px | styles.css | calibrated ÷2 — PDF 200×30pt @2× |
| HORA panel | 100×101 | px | styles.css | calibrated ÷2 — PDF 200×202.68pt @2× |
| selected-day box | ~10×8 | px | styles.css (border only, no fixed box size — implemented as border on the existing day cell) | calibrated ÷2 — PDF 20.28×16.38pt @2× |
| day/spinner row pitch | 10 | px | styles.css (`line-height`/`height`) | calibrated ÷2 — PDF row pitch ~19.8pt @2× |
| spinner visible rows | 7 | rows (`max-height: 70px`) | styles.css | derived from row pitch × 7, not independently PDF-measured as a fixed visible count |

## Color
| Role | Value | Matching --ds-* token? | Source | Delta |
|------|-------|------------------------|--------|-------|
| panel background | #060606 | `--ds-color-pdf-surface` | styles.css | confirmed — "Fondo: #060606 - 50%" resolves to the solid surface token for the popover panel |
| panel border (active) | #ffffff | `--ds-color-white` | styles.css | confirmed — "Borde activo: #ffffff" |
| panel label | #8d8d8d | `--ds-color-pdf-form-muted` | styles.css | confirmed — "Input activo - Label: ... 12pt - #8d8d8d" |
| month/year | #ffffff | `--ds-color-white` | styles.css | confirmed — "Mes - año: Montserrat Bold - 12pt - #ffffff" |
| day numbers (rest) | #8d8d8d | `--ds-color-pdf-form-muted` | styles.css | confirmed — "Números y días: Montserrat Regular - 12pt - #8d8d8d" |
| day/hour selected | #ffffff | `--ds-color-white` | styles.css | confirmed — "Día - Hora - Seleccionada: #ffffff" |
| hour/minute values (rest) | #8d8d8d | `--ds-color-pdf-form-muted` | styles.css | confirmed — "Horas: Montserrat Regular - 14pt - #8d8d8d" |
| selected-day border | #ffffff | `--ds-color-white` | styles.css | confirmed via `get_drawings()` — PDF draws a literal stroked rect over the selected day, not just a color change |

## Typography
| Element | Font family | Size | Weight | Source |
|---------|-------------|------|--------|--------|
| panel label | var(--ds-font-mono) | 6px | 300 (light) | PDF 12pt @2× ÷2. |
| month/year select | var(--ds-font-body) | 6px | 700 (bold) | PDF 12pt @2× ÷2. |
| weekday/day numbers | var(--ds-font-body) | 6px | 400 (regular) | PDF 12pt @2× ÷2. |
| spinner values | var(--ds-font-body) | 7px | 400 (regular) | PDF 14pt @2× ÷2 — "Horas: ... 14pt". |

## Variants / modifiers present in CSS
| Class | Effect | Source | Backed by CSS? (yes/no) |
|-------|--------|--------|-------------------------|
| `.ds-form-date__day--selected` | `border-color: white`, bold text | styles.css | yes |
| `.ds-form-date__spinner-value--selected` | White text, bold | styles.css | yes |
| `.ds-form-date__field--fecha` / `--hora` | Fixed trigger width (150px / 100px) | styles.css | yes |

## Deltas & open questions (facts only — DO NOT resolve)
- **Structure changed after page render (2026-08-07):** the first implementation pass,
  built from the text-only extract alone, wrongly assumed one combined FECHA+HORA trigger
  and a flat 30-minute-step hour list. Rendering p.21 directly showed 2 independent
  trigger+panel pairs and a 2-column (hour / 5-minute-step) spinner — the extract's jumbled
  "14 10 13 05 16 20 17 25 15 15 11 12 55 00" block was exactly these two side-by-side
  columns with no positional order preserved by `get_text()`.
- Month/year rendered as native `<select>` elements rather than 2 more custom listboxes
  matching `FormSelect`'s pattern — the PDF shows a chevron next to each (suggesting they
  are selectable) but gives no interaction spec beyond that; decision registered in
  `DECISIONS.md` (2026-08-07).
- No arrow-key navigation inside the day grid or spinner beyond the ‹/›/⌃/⌄ buttons — same
  class of gap as `FormSelect`'s missing listbox arrow-key nav.
