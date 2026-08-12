# DetailSheet — Numeric Specification

- Status: partially measured against PDF (2026-08-12) + measured from CSS (2026-08-07 backfill)
- Source-of-truth order: PDF (page N) > component doc > implemented CSS
- CSS block: `detail-sheet.css` (own stylesheet, `packages/ui/src/patterns/detail-sheet/`
  — not part of the shared `styles.css`)
- Export: packages/ui/src/patterns/detail-sheet/DetailSheet.tsx
- PDF reference: **dos fuentes, no confundir.** (1)
  `knowledge/references/design-reference.pdf` p.5 "FICHAS" — hoja de spec limpia con
  valores anotados por el diseñador (fondo/borde/tipografía por elemento), sin
  contaminación de otros elementos superpuestos. (2) `Alejandria - Agosto 2026.pdf`
  p.7 (Downloads de Luna, no en el repo) — mockup real de la screen con el panel
  superpuesto sobre la grilla de `TaskCard`; útil para medir el ancho real del panel
  en contexto, pero `get_drawings()` sobre esta página mezcla la geometría del panel
  con la del grid oculto detrás — no confiar en medidas de ahí sin cruzarlas contra
  (1) o contra el render (`get_pixmap()`) para descartar contaminación.
- Scale: display values = PDF annotation ÷ 2, salvo que la propia hoja de spec use
  `px` explícito para una medida (ver Deltas de `FilterField.spec.md` para el mismo
  patrón en otro componente) — en este componente, `px` y `pt` aparecen mezclados en
  la hoja de p.5 sin ser una regla confiable (ver Deltas).

## Dimensions
| Property | Value | Unit | Source | Delta vs PDF/doc |
|----------|------:|------|--------|------------------|
| root max-width | 656 | px | design-reference.pdf p.5 dice "Tamaño variable según pantalla" (sin valor fijo); 656px = única instancia real medida (Alejandria - Agosto 2026.pdf p.7, `get_drawings()`, Rect ancho 1312.7pt @2× ÷2) | **corregido 2026-08-12** — era 590px, invented desde el origen del componente, nunca medido. A 590px el título se envolvía en 2 líneas (bug reportado por Luna). |
| root padding | 20 | px | detail-sheet.css | Spec de p.5 dice "Padding: 40px" (con unidad `px` explícita) pero la medida real del inset (DESCRIPCIÓN box vs. borde del panel, p.7 `get_drawings()`) da ~22.9px — mucho más cerca de 20px que de 40. Se mantiene 20px (geometría medida gana sobre el label de texto de la spec, mismo criterio que el resto del kit); "40px" queda como delta sin resolver, no aplicado. |
| root gap | 14 | px | detail-sheet.css | — |
| body grid columns | 0.95fr / 1.35fr | fr | detail-sheet.css | Verificado 2026-08-12: la proporción real (DESCRIPCIÓN box 240.85px vs. borde del `.ds-chart-card` 357.2px en p.7) da ≈40.25%/59.75%, muy cerca de 0.95:1.35 (41.3%/58.7%) — no se cambia. |
| media-metrics grid | `repeat(3, minmax(0, 1fr))` | — | detail-sheet.css | **corregido 2026-08-12** — pasó brevemente por `repeat(3, auto)` (fix de `005-alert-toast-filter` para el problema inverso en `.detail-sheet__metrics`), pero eso hacía que los 3 `MetricCard` ficha (83px c/u) se salieran de la columna izquierda (~222-249px) y se superpusieran con el gráfico — bug reportado por Luna. Revertido solo para esta grilla; `.detail-sheet__metrics` (columna derecha, con espacio de sobra) se queda en `auto`. |
| icon button | 12×12 (svg 10×10) | px | detail-sheet.css | — |
| media preview frame min-height | 90 | px | detail-sheet.css | — |
| media preview play button | 22×22 | px | detail-sheet.css | — |
| media preview progress bar | 3 | px height | detail-sheet.css | — |
| action button padding | 2.5px 12.5px | px | detail-sheet.css | Spec de p.5 dice "padding top y bottom 5px - padding left y right 25px" (`px` explícito) — pero 5/25 literal no calza con el ancho medido del botón en p.7 (54.9px: un texto de 10 caracteres a 6.5px + 2×25px de padding excede eso ampliamente). 2.5/12.5 (= 5/25 ÷2) sí calza razonablemente — se mantiene, el label `px` de esta hoja no es una regla confiable en todo el documento (ver Deltas de `FilterField.spec.md`, mismo patrón). |
| ficha metric value font-size | 25 | px | design-reference.pdf p.5 "Widgets Métrica: Montserrat Bold - 50pt - #FFFFFF" ÷2 | **corregido 2026-08-12** — era `26px` con comentario `/* TODO token */` en `styles.css` (`.ds-metric--ficha .ds-metric__value`), nunca verificado contra esta hoja hasta ahora. Cierra el TODO. |

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
| action variant `c` background | #494949 | `--ds-color-pdf-action` | detail-sheet.css | **agregado 2026-08-11** (`004-familia-tareas` — el tipo `DetailSheetAction["variant"]` ya admitía `"c"` desde 2026-07-28 pero faltaba su regla CSS). **Confirmado exacto 2026-08-12** contra `design-reference.pdf` p.5: "Botón: ... fondos #c1c1c1 #8a8b87 #494949" — los 3 colores, en ese orden, coinciden con `a`/`b`/`c` sin ninguna corrección necesaria. |
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
- **2026-08-12 — primera medición real contra el PDF, tras 2 rondas de bugs
  reportados por Luna.** Hasta esta fecha, ningún valor de este spec había sido
  re-derivado de geometría vectorial real — solo transcrito de `detail-sheet.css`
  ("backfill", ver nota debajo) o medido contra `Alejandria - Agosto 2026.pdf` p.7
  (contaminado por el grid oculto detrás del panel, ver header). La hoja de spec
  limpia (`design-reference.pdf` p.5) resultó tener las medidas reales, sin
  contaminación — de ahí salieron los 3 fixes de esta fecha (max-width, grid de
  media-metrics, font-size de `ficha .ds-metric__value`) y la confirmación exacta
  del color `--c` (ver Color).
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
