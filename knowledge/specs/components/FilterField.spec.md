# FilterField — Numeric Specification

- Status: measured
- Source-of-truth order: PDF (page 23) > component doc > implemented CSS
- CSS block: `.ds-filter-field*` (styles.css)
- Export: packages/ui/src/components/FilterField.tsx
- PDF reference: `knowledge/references/design-reference.pdf` p.23 "FILTER"
- Scale: **excepción** — la medida del input (`400×50px`) es final, NO se divide
  por 2. Es el único componente de `005-alert-toast-filter` (y, hasta donde se
  relevó, del kit) con esta excepción — confirmado explícitamente con Luna, ver
  `DECISIONS.md`. El resto de los valores (tipografía) sí sigue `@2×÷2`.

Medido 2026-08-11 vía las anotaciones explícitas de la propia página: `Fondo: #060606`,
`Borde: 0,75pt - #606060`, `Medida: 400px - 50px`, `Texto: Montserrat Regular - 20pt - #ffffff`.
Nota del diseñador en la propia página: "Me falta desarrollar el desplegable del funnel".

## Dimensions
| Property | Value | Unit | Source | Delta vs PDF/doc |
|----------|------:|------|--------|------------------|
| input width | 400 | px | design-reference.pdf p.23 (anotación literal, "Medida: 400px") | **final, sin ÷2** — única excepción de esta feature, confirmada explícitamente |
| input height | 50 | px | design-reference.pdf p.23 (anotación literal, "50px") | **final, sin ÷2** |
| border-width | 0.75 | px | design-reference.pdf p.23 (anotación literal) | hairline — no escalado |

## Color
| Role | Value | Matching --ds-* token? | Source | Delta |
|------|-------|------------------------|--------|-------|
| input background | #060606 | `--ds-color-pdf-surface` | design-reference.pdf p.23 (anotación literal) | confirmado |
| border | #606060 | `--ds-color-pdf-border` | design-reference.pdf p.23 (anotación literal) | confirmado |
| input text | #ffffff | `--ds-color-white` | design-reference.pdf p.23 (anotación literal) | confirmado |
| ícono filtro / lupa / placeholder | #8a8b87 | `--ds-color-pdf-ink-muted` | mismo color que `FiltroIcon` ya existente | reusado, no medido de nuevo en esta página |

## Typography
| Element | Font family | Size | Weight | Source |
|---------|-------------|------|--------|--------|
| input text | var(--ds-font-body) | 10px | 400 (regular) | PDF "Montserrat Regular - 20pt" @2× ÷2 |

## Variants / modifiers present in CSS
Ninguno — una sola variante, sin prop `variant`.

## Deltas & open questions (facts only — DO NOT resolve)
- **Unidad de "Medida: 400px - 50px" confirmada como final, no @2×.** Es el único
  valor de tamaño en todo el PDF de referencia anotado directamente en `px` (el
  resto usa `pt` + la convención `@2×÷2`) — se le preguntó explícitamente a Luna
  durante `/sdd-refine` en vez de asumir, y confirmó que es la medida final.
- **El desplegable del ícono de filtro queda sin definir en el PDF fuente** — la
  propia página lo dice ("me falta desarrollar el desplegable del funnel"). No es
  un dato que falte medir, es una interacción que el diseño todavía no especificó.
  Implementado como decorativo por decisión explícita (no del PDF).
- **Chevron y lupa no tienen medida propia anotada** — se usaron los tamaños por
  defecto de los íconos de `lucide-react` (`ChevronDown`/`Search`), sin una medida
  ÷2 citable del PDF para esos dos elementos específicos.
