# Toast — Numeric Specification

- Status: measured (color/tipografía) + approximate (padding/posición) + product decision (duración)
- Source-of-truth order: PDF (page 22) > component doc > implemented CSS
- CSS block: `.ds-toast` (styles.css)
- Export: packages/ui/src/components/Toast.tsx
- PDF reference: `knowledge/references/design-reference.pdf` p.22 "ALERT" § "Tarea realizada"
- Scale: display values = PDF annotation ÷ 2 (see [specs/README.md — Scale calibration](../README.md#scale-calibration)) — aplica a `font-size`, no a padding/posición (ver Deltas)

Medido 2026-08-11 vía las anotaciones explícitas de la propia página: `Fondo: #060606`,
`Borde: 0,75pt - #606060`, `Texto: Source Code Bold - 18pt - #ffffff`.

## Dimensions
| Property | Value | Unit | Source | Delta vs PDF/doc |
|----------|------:|------|--------|------------------|
| border-width | 0.75 | px | design-reference.pdf p.22 (anotación literal) | hairline — no escalado |
| padding | 10 20 | px (vertical horizontal) | styles.css | **aproximado, no medido** — la spec anotada solo da color/tipografía |
| top offset | 24 | px | styles.css | **aproximado, no medido** |
| durationMs (auto-dismiss) | 4000 | ms | Toast.tsx (`durationMs` default) | **decisión de producto, no medida del PDF** — confirmada explícitamente con Luna en `/sdd-refine` |

## Color
| Role | Value | Matching --ds-* token? | Source | Delta |
|------|-------|------------------------|--------|-------|
| background | #060606 | `--ds-color-pdf-surface` | design-reference.pdf p.22 (anotación literal) | confirmado |
| border | #606060 | `--ds-color-pdf-border` | design-reference.pdf p.22 (anotación literal) | confirmado |
| text | #ffffff | `--ds-color-white` | design-reference.pdf p.22 (anotación literal) | confirmado |

## Typography
| Element | Font family | Size | Weight | Source |
|---------|-------------|------|--------|--------|
| message | var(--ds-font-mono) | 9px | 700 (bold) | PDF "Source Code Bold - 18pt" @2× ÷2 |

## Variants / modifiers present in CSS
Ninguno — un solo tono (`success`), sin prop `variant`/`tone`.

## Deltas & open questions (facts only — DO NOT resolve)
- **Padding/posición no tienen medida citable del PDF** — mismo caso que `AlertBar`.
- **Ausencia de botón de cierre confirmada por omisión** — el mock no muestra ningún
  ícono de cierre; se interpretó como "solo auto-dismiss", no como un dato faltante
  a inferir.
- **`durationMs=4000` es la única cifra de este spec que no viene del PDF en
  absoluto** — es una decisión de negocio registrada durante `/sdd-refine`
  (`drafts/alert-toast-filter.md`), no una medida que verificar contra la fuente.
