# Skeleton — Numeric Specification

- Status: measured
- Source-of-truth order: PDF (page 14) > component doc > implemented CSS
- CSS block: `.ds-skeleton` (styles.css:1277–1286); keyframes `ds-skeleton-shimmer` (styles.css:1678–1687)
- Export: packages/ui/src/components/Skeleton.tsx
- PDF reference: p.14 SKELETON (knowledge/components/Skeleton.md; knowledge/references/pdf-text-extract.md § Page 14)

## Dimensions
| Property | Value | Unit | Source | Delta vs PDF/doc |
|----------|------:|------|--------|------------------|
| default width/height | none (consumer `width`/`height` or CSS) | — | Skeleton.tsx; styles.css:1277–1282 | **PDF p.14 does not annotate recuadro sizes** |
| border-radius rect | var(--ds-radius-sm) → 4px | px | styles.css:1280; styles.css:38 | PDF does not annotate radius; kit convention |
| border-radius circle | var(--ds-radius-pill) → 999px | px | styles.css:1285; styles.css:127 | PDF does not annotate circle; kit convention for circular chrome |

## Color
| Role | Value | Matching --ds-* token? | Source | Delta |
|------|-------|------------------------|--------|-------|
| recuadro (skeleton fill) | var(--ds-color-pdf-surface-warm) → #2a2927 | --ds-color-pdf-surface-warm | styles.css:1279; styles.css:44; PDF «Recuadros: #2a2927» | exact match |
| fondo (parent wash) | var(--ds-color-pdf-surface-warm-a70) → rgb(42 41 39 / 0.7) | --ds-color-pdf-surface-warm-a70 | styles.css:67; PDF «Fondo: #2a2927 - 70% de opacidad» | token exists for consumers; **not applied by `.ds-skeleton`** |

## Typography
| Element | Font family | Size | Weight | Letter-spacing | Line-height | Casing | Source |
|---------|-------------|------|--------|----------------|-------------|--------|--------|
| (none) | — | — | — | — | — | — | Skeleton has no text nodes |

## Spacing
| Region | Padding | Gap | Margin | Source |
|--------|---------|-----|--------|--------|
| root | — | — | — | styles.css:1277–1282; no padding/gap/margin set |

## Variants / modifiers present in CSS
| Class | Effect | Source | Backed by CSS? (yes/no) |
|-------|--------|--------|-------------------------|
| .ds-skeleton | root recuadro + shimmer animation | styles.css:1277 | yes |
| .ds-skeleton--circle | pill radius | styles.css:1284 | yes |
| @keyframes ds-skeleton-shimmer | opacity 1 → 0.55 → 1 | styles.css:1678–1687 | yes |

## Motion
| Property | Value | Source | Delta vs PDF/doc |
|----------|-------|--------|------------------|
| duration | var(--ds-duration-shimmer) → 1600ms | styles.css:1278; styles.css:167 | PDF does not annotate duration — provisional |
| easing | var(--ds-ease-standard) → ease | styles.css:1278; styles.css:168 | PDF does not annotate easing |
| keyframe opacities | 1 / 0.55 / 1 | styles.css:1679–1686 | PDF: «animación de degradé o transparencia lineal» — **opacity pulse chosen**; see open questions |

## Deltas & open questions (facts only — DO NOT resolve)

- **Animation reading:** PDF p.14 says «Sumarle animación de degradé o transparencia lineal». Implementation uses a **linear opacity pulse** (`1 → 0.55 → 1`) via `@keyframes ds-skeleton-shimmer`, not a gradient sweep / shimmer band. Alternate reading (CSS gradient animation across the recuadro) remains an open question for design.
- **Fondo vs Recuadros:** PDF lists both «Fondo: #2a2927 - 70% de opacidad» and «Recuadros: #2a2927». Only Recuadros is painted by `.ds-skeleton`. Fondo is parent responsibility; token `--ds-color-pdf-surface-warm-a70` is provided for consumers (same parent-responsibility pattern as Empty viewport centering).
- **Recuadro sizes:** PDF p.14 does not annotate width/height of placeholder boxes; component has no default dimensions in CSS.
- **Border radius:** PDF does not annotate radius for rect or circle; CSS uses `--ds-radius-sm` / `--ds-radius-pill` by kit convention (`variant` axis).
- **Duration / easing / mid opacity 0.55:** not annotated in PDF; values are provisional kit choices (`1600ms`, `ease`, `0.55`).
