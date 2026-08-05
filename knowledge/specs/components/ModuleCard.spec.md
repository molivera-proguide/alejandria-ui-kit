# ModuleCard — Numeric Specification

- Status: partial
- Source-of-truth order: PDF (page N) > component doc > implemented CSS
- CSS block: `.ds-module-card` (styles.css — PDF-context block)
- Export: packages/ui/src/components/ModuleCard.tsx
- PDF reference: MÓDULOS, p.6 (page index 5) — confirmed 2026-08-05 via `page.get_text()` ("M Ó D U L O S")
- Scale: display values = PDF annotation ÷ 2 (see [specs/README.md — Scale calibration](../README.md#scale-calibration))

Corrected 2026-08-05 using exact PDF vector path (`page.get_drawings()`) and text-span
(`page.get_text("dict")`) extraction via PyMuPDF, not a screenshot estimate. User-reported symptoms
("distintos tamaños en el storybook" + "el número que está alineado a la izquierda") both traced to
real, evidenced mismatches — see Dimensions/Color/Deltas below.

## Dimensions
| Property | Value | Unit | Source | Delta vs PDF/doc |
|----------|------:|------|--------|------------------|
| border-width | 0.75 | px | styles.css | hairline — not scaled |
| width | 194 | px | styles.css | **changed 2026-08-05** — PDF vector path: card outline bbox is 388.6×388.6pt @2× (a square) → ÷2 = 194.3px. Was `min-width: 130px` (invented, display = 260÷2 with no vector measurement) — a `min-width`-only floor with no matching fixed `width` let cards vary in size with title length, which is exactly what "distintos tamaños en el storybook" was: `INVESTIGACIONES` and `EVIDENCIAS` naturally need different widths when nothing caps/fixes it. Same pattern as `.ds-task`/`.ds-investigation-card`. |
| height | 194 | px | styles.css | **changed 2026-08-05** — same vector measurement; the card is square. Was `min-height: 130px`. |
| padding | 25px 10px 12.5px 10px | px | styles.css | display = 50/20/25/20 ÷2 — matches the PDF legend directly, unaffected by today's correction |
| gap | 10 | px | styles.css | was `--ds-space-5` → 10px calibrated |
| icon | 36×36 | px | styles.css | **changed 2026-08-05** — PDF vector path: the shield icon in the "PROCESOS POLICIALES" example is two paths spanning a combined bbox of ~71.6×70.9pt @2× → ÷2 ≈ 36×35px. Was `90×90px` (display = 180÷2) — that 180pt @2× figure doesn't match this card's own icon; it was seemingly measured against a different reference (maybe the standalone "Iconos" legend swatches on the same page, which are shown at a different, larger canonical size than how they render inside an actual module card) without cross-checking against the card mockup itself. The icon was rendering at roughly 2.5× its real size. |
| icon region min-height | 36 | px | styles.css | changed 2026-08-05 to match icon size above |
| metric value min-width | dropped | — | styles.css | removed 2026-08-05 — was a prop of the old `space-between` layout (see Color/Deltas); no longer needed once the metric row is a tight inline pair instead of a spread row |
| hover translateY | -2 | px | styles.css | transform — not scaled |

## Color
| Role | Value | Matching --ds-* token? | Source | Delta |
|------|-------|------------------------|--------|-------|
| background | #060606 | --ds-color-pdf-surface | styles.css | doc matches |
| border | #c1c1c1 | --ds-color-pdf-line | styles.css | doc matches |
| title | #c1c1c1 | --ds-color-pdf-line | styles.css | — |
| divider | #8a8b87 | --ds-color-pdf-ink-muted | styles.css | doc matches |
| metric label | #8a8b87 | --ds-color-pdf-ink-muted | styles.css | — |
| metric value | #ffffff | --ds-color-white | styles.css | doc matches |
| metric label casing | uppercase | — | styles.css (added 2026-08-05) | PDF text-span is literally `"CASOS ABIERTOS:"` (all caps) and legend says "Info destacada: ... Uppercase" — CSS had no `text-transform`, so consumer-supplied sentence-case labels (`"Casos abiertos"`, per the stories) rendered un-uppercased. |
| metric label separator | `":"` via `::after` | — | styles.css (added 2026-08-05) | PDF text-span is `"CASOS ABIERTOS:"` — the colon is baked into the design, not something a consumer is expected to type into `label`. |
| hover border | #ffffff | --ds-color-white | styles.css | doc matches |
| hover shadow | 0 16px 42px rgb(0 0 0 / 0.22) | UNTOKENIZED — candidate | styles.css | box-shadow — not scaled |
| focus ring | 0 0 0 3px rgb(193 193 193 / 0.35) | UNTOKENIZED — candidate | styles.css | box-shadow — not scaled |

## Typography
| Element | Font family | Size | Weight | Letter-spacing | Line-height | Casing | Source |
|---------|-------------|------|--------|----------------|-------------|--------|--------|
| title | var(--ds-font-mono) | 12px | 400 | 0.1em | 1.2 | uppercase | styles.css — display = 24÷2 |
| metric label | var(--ds-font-body) | 8px | 300 | UNVERIFIED | 1.2 | none | styles.css — display = 16÷2 |
| metric value | var(--ds-font-body) | 8px | 700 | UNVERIFIED | 1.2 | none | styles.css — display = 16÷2 |

## Spacing
| Region | Padding | Gap | Margin | Source |
|--------|---------|-----|--------|--------|
| root | 25px 10px 12.5px 10px | 10px | — | styles.css (display scale) |
| headline | — | 4px | — | was `--ds-space-2` → calibrated |
| metrics | — | 5px | — | styles.css |
| metric (label↔value) | — | 4px | — | styles.css (added 2026-08-05) — inline gap within one label:value pair, see Deltas |
| divider margin | — | — | 0 auto | styles.css |

## Variants / modifiers present in CSS
| Class | Effect | Source | Backed by CSS? (yes/no) |
|-------|--------|--------|-------------------------|
| :hover | border/shadow/translate | styles.css | yes |
| :focus-visible | focus ring | styles.css | yes |
| :disabled | disabled appearance | knowledge/components/ModuleCard.md | no |

## Deltas & open questions (facts only — DO NOT resolve)
- **RESOLVED 2026-08-05: `.ds-module-card__metric` layout.** PDF text-span extraction shows
  `"CASOS ABIERTOS:"` immediately followed by `"15"` at x=300.9→464.3pt @2×, well inside the card's
  left half (card spans x=276→664.6pt @2×) — a tight inline pair, not a row spanning the full card
  width. `.ds-module-card__metric` was `justify-content: space-between` with the value
  `text-align: right`, which pushed the value hard against the card's right edge instead of sitting
  right after the label. Changed to `display: flex; justify-content: flex-start; gap: 4px` with the
  value in normal (left) flow. This was the concrete evidence behind the user's "el número que está
  alineado a la izquierda" report — in the PDF the number belongs on the left, close to its label.
- ModuleCard.md now numbers the PDF page (p.6, page index 5) — confirmed 2026-08-05.
- Disabled modifier lacks CSS (knowledge/components/ModuleCard.md).
- The two "CASOS ABIERTOS: 15" lines in the PDF example are stacked as an exact duplicate (same
  text, ~30pt @2× apart) — read as a design-file placeholder artifact (e.g. a copy-paste row before
  the second real metric was filled in), not two intentionally distinct metrics. The shipped
  stories all use two *different* metrics per card (e.g. "Casos abiertos" + "Alertas"), which this
  reading is consistent with.
