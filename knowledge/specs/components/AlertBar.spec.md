# AlertBar — Numeric Specification

- Status: measured (color/tipografía) + approximate (padding/altura)
- Source-of-truth order: PDF (page 22) > component doc > implemented CSS
- CSS block: `.ds-alert-bar*` (styles.css)
- Export: packages/ui/src/components/AlertBar.tsx
- PDF reference: `knowledge/references/design-reference.pdf` p.22 "ALERT" § "Alert Sigcat"
- Scale: display values = PDF annotation ÷ 2 (see [specs/README.md — Scale calibration](../README.md#scale-calibration)) — aplica a `font-size`, no a padding (ver Deltas)

Medido 2026-08-11 vía las anotaciones explícitas de la propia página (hoja de spec,
no mockup a medir a ojo): `Fondo: #494949`, `Borde: 0,75pt - #606060`,
`Label: Source Code Bold - 20pt - #ffffff`, `Label - Alerta: #ff0404`.

## Dimensions
| Property | Value | Unit | Source | Delta vs PDF/doc |
|----------|------:|------|--------|------------------|
| border-width | 0.75 | px | design-reference.pdf p.22 (anotación literal) | hairline — no escalado |
| padding | 10 24 | px (vertical horizontal) | styles.css | **aproximado, no medido** — la spec anotada solo da color/tipografía, no la caja completa |

## Color
| Role | Value | Matching --ds-* token? | Source | Delta |
|------|-------|------------------------|--------|-------|
| background | #494949 | `--ds-color-pdf-action` | design-reference.pdf p.22 (anotación literal) | confirmado — coincide exacto con token ya existente |
| border | #606060 | `--ds-color-pdf-border` | design-reference.pdf p.22 (anotación literal) | confirmado |
| label (tone `default`) | #ffffff | `--ds-color-white` | design-reference.pdf p.22 (anotación literal) | confirmado |
| label (tone `alerta`) | #ff0404 | `--ds-color-pdf-critical` | design-reference.pdf p.22 (anotación literal) | confirmado |

## Typography
| Element | Font family | Size | Weight | Source |
|---------|-------------|------|--------|--------|
| label | var(--ds-font-mono) | 10px | 700 (bold) | PDF "Source Code Bold - 20pt" @2× ÷2 |

## Variants / modifiers present in CSS
| Class | Effect | Source | Backed by CSS? (yes/no) |
|-------|--------|--------|-------------------------|
| `.ds-alert-bar--alerta` | `color: var(--ds-color-pdf-critical)` | styles.css | yes |

## Deltas & open questions (facts only — DO NOT resolve)
- **Padding/altura no tienen medida citable del PDF.** La hoja de spec de p.22 solo
  anota fondo/borde/tipografía del label, no las dimensiones de la caja completa —
  `padding: 10px 24px` es un valor razonable elegido en `005-alert-toast-filter`, no
  una medida ÷2. Si aparece una captura más completa de "Alert Sigcat" (ej. con
  regla de medida explícita), recalibrar.
- **Solo 2 tonos confirmados** (`default`/`alerta`) — el PDF solo muestra esos 2
  ejemplos ("3 ALERTAS NUEVAS", "INCENDIO TIPO A - FASE 1"), sin evidencia de más.
