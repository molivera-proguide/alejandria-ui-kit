# DetailSheet — Numeric Specification

- Status: measured (from implemented CSS only — not independently re-verified against the
  PDF page in this pass, see Deltas)
- Source-of-truth order: PDF (page N) > component doc > implemented CSS
- CSS block: `detail-sheet.css` (own stylesheet, `packages/ui/src/patterns/detail-sheet/`
  — not part of the shared `styles.css`)
- Export: packages/ui/src/patterns/detail-sheet/DetailSheet.tsx
- PDF reference: p.5 "FICHAS" — confirmed 2026-08-07 via `get_text()`: p.5 contains this
  component's own mock content verbatim (`"#1232142342 - 3408473"`, `"DESCRIPCIÓN"`,
  `"MÉTRICAS DE RENDIMIENTO DE LA TAREA"`); p.4 is "INVESTIGATION CARD" (a different,
  already-built component). The stories/JSDoc's earlier "página 4" citation was wrong and
  has been corrected in `DetailSheet.stories.tsx`. Per `knowledge/components/DetailSheet.md`.
- Scale: values below are recorded as implemented (px literals in `detail-sheet.css`); no
  independent ÷2 recalibration was performed in this pass — this spec transcribes what
  ships today, it does not re-derive it from PDF vector geometry.

Recorded 2026-08-07 by reading `detail-sheet.css` directly — this is a **documentation
backfill**, not a fidelity pass. No PyMuPDF re-measurement against p.5 was done; values here
are "measured from CSS", not "confirmed against PDF" like the other spec files in this
folder use those words.

## Dimensions
| Property | Value | Unit | Source | Delta vs PDF/doc |
|----------|------:|------|--------|------------------|
| root max-width | 590 | px | detail-sheet.css | not independently PDF-measured in this pass |
| root padding | 20 | px | detail-sheet.css | — |
| root gap | 14 | px | detail-sheet.css | — |
| body grid columns | 0.95fr / 1.35fr | fr | detail-sheet.css | — |
| icon button | 12×12 (svg 10×10) | px | detail-sheet.css | — |
| media preview frame min-height | 90 | px | detail-sheet.css | — |
| media preview play button | 22×22 | px | detail-sheet.css | — |
| media preview progress bar | 3 | px height | detail-sheet.css | — |
| action button padding | 2.5px 12.5px | px | detail-sheet.css | — |

## Color
| Role | Value | Matching --ds-* token? | Source | Delta |
|------|-------|------------------------|--------|-------|
| root background | #2a2927 | `--ds-color-pdf-surface-warm` | detail-sheet.css | **tokenized 2026-08-07** — was literal, exact match, no visual change (verified via `getComputedStyle`) |
| root border | #c1c1c1 | `--ds-color-pdf-line` | detail-sheet.css | tokenized 2026-08-07 |
| root text | #ffffff | `--ds-color-white` | detail-sheet.css | tokenized 2026-08-07 |
| narrative/media-preview background | #060606 | `--ds-color-pdf-surface` | detail-sheet.css | tokenized 2026-08-07 |
| narrative/media/filters/chart border | #e6e6e6 | `--ds-color-pdf-line-light` | detail-sheet.css | tokenized 2026-08-07 |
| status critical background | #7f0000 | none — literal hex | detail-sheet.css | **left literal** — no matching token exists elsewhere in the kit; confirmed, not an oversight |
| status critical text | #ff0404 | `--ds-color-pdf-critical` | detail-sheet.css | tokenized 2026-08-07 |
| secondary titles (narrative/media/actions label) | #8a8b87 | `--ds-color-pdf-ink-muted` | detail-sheet.css | tokenized 2026-08-07 |
| action variant `a` background | #c1c1c1 | `--ds-color-pdf-line` | detail-sheet.css | tokenized 2026-08-07 |
| action variant `b` background | #8a8b87 | `--ds-color-pdf-ink-muted` | detail-sheet.css | tokenized 2026-08-07 |
| media preview progress fill | #ff0404 | `--ds-color-pdf-critical` | detail-sheet.css | tokenized 2026-08-07 |
| media preview progress track | #494949 | `--ds-color-pdf-action` | detail-sheet.css | tokenized 2026-08-07 |
| border-width (all hairlines) | 0.75px | `--ds-border-width-hair` | detail-sheet.css | tokenized 2026-08-07 |
| media-preview-play background | rgb(0 0 0 / 0.35) | none — literal | detail-sheet.css | left literal — no `--ds-color-black-a*` token at this exact alpha |
| chart-card override background | rgb(6 6 6 / 0.2) | none — literal | detail-sheet.css | left literal — no matching alpha token |
| media-preview-frame gradient stops | #3a3937 / #1a1918, rgb(0 0 0 / 0.1 / 0.45) | none — literal | detail-sheet.css | left literal — gradient specific to this component, no equivalent elsewhere in the kit |

## Typography
| Element | Font family | Size | Weight | Source |
|---------|-------------|------|--------|--------|
| status | var(--ds-font-mono) | 8px | 300 | detail-sheet.css |
| title (`<h1>`) | var(--ds-font-display) | 20px | 700 | detail-sheet.css |
| filter select | var(--ds-font-body) | 12px | 200 | detail-sheet.css |
| narrative/media title | var(--ds-font-body) | 8px | 200 | detail-sheet.css |
| narrative text | var(--ds-font-body) | 9px | 300 | detail-sheet.css |
| chart title (nested `.ds-chart-card__title` override) | var(--ds-font-body) | 8px | 200 | detail-sheet.css |
| actions label | var(--ds-font-body) | 8px | 200 | detail-sheet.css |
| action button (nested `.ds-button` override) | inherited | 6.5px | 700 | detail-sheet.css |

## Deltas & open questions (facts only — DO NOT resolve)
- **This spec is a documentation backfill, not a full fidelity pass.** Values were
  transcribed from `detail-sheet.css`, not independently re-measured against the PDF's
  vector geometry (no `get_drawings()` bbox citations exist for this component, unlike the
  rest of this spec folder) — dimensions are recorded as-implemented only. The page
  citation itself *was* verified (`get_text()`, see header), just not the pixel-level
  geometry.
- **Page citation resolved 2026-08-07** (was an open delta): confirmed p.5 via `get_text()`
  content match; `DetailSheet.stories.tsx`'s "página 4" JSDoc was wrong and has been fixed.
- **Colors tokenized 2026-08-07** (was an open delta): all colors/hairline borders with an
  exact matching `--ds-*` token were migrated to `var(--ds-*)` — see Color table. Verified
  no visual regression via `getComputedStyle` in a live Storybook tab (same RGB values
  before/after). Remaining literals (`#7f0000`, a few `rgb(0 0 0 / α)` values, the media-
  preview gradient) have no matching token in the kit today — confirmed absence, not an
  unresolved question.
