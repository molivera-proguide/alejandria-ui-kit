# SideBar — Numeric Specification

- Status: measured
- Source-of-truth order: PDF (page 13) > component doc > implemented CSS
- CSS block: `.ds-sidebar-shell` / `.ds-sidebar` (styles.css:1314–1524)
- Export: packages/ui/src/components/SideBar.tsx
- PDF reference: p.13 SIDE BAR (knowledge/components/SideBar.md; knowledge/references/pdf-text-extract.md § Page 13)

## Dimensions
| Property | Value | Unit | Source | Delta vs PDF/doc |
|----------|------:|------|--------|------------------|
| root padding | 10 | px | styles.css:1328; PDF Padding 20px | exact display match (20 @2× ÷2) |
| expanded width | var(--ds-size-card-min-w) → 220 | px | styles.css:1330; styles.css:125 | **PDF p.13 does not annotate expanded width** — provisional, reused existing token |
| collapsed width | var(--ds-size-control-lg) → 48 | px | styles.css:1334; styles.css:114 | **PDF p.13 does not annotate collapsed width** — provisional, reused existing token |
| icon well (item + menu-heading) | 25×25 | px | styles.css:1395–1397 / 1457–1459; PDF «25 px»; asset Menu `*-50x50.svg` | exact display match (50 @2× ÷2); provenance comment cites `--ds-size-icon-50` (token keeps raw @2× 50px; not redefined) |
| selected accent line | 2 | px | styles.css:1429 / 1444–1445; PDF «Icono seleccionado línea: 2pt - #FFFFFF» | 2pt treated as 2px hairline accent (not ÷2); same treatment class as other PDF border accents where pt≈px chrome |
| edge-toggle hit | 20×20 | px | styles.css:1361–1368 | **provisional** — PDF shows small square glyph, no measurement |
| edge-toggle top | 12 | px | styles.css:1366 | **provisional** — roughly header/logo row; not PDF-measured |
| edge-toggle straddle | translateX(50%) | — | styles.css:1367 | half outside sidebar right border, per PDF artwork |

## Color
| Role | Value | Matching --ds-* token? | Source | Delta |
|------|-------|------------------------|--------|-------|
| shell background | var(--ds-color-pdf-shell) → #282828 | --ds-color-pdf-shell | styles.css:1320; styles.css:52; PDF Fondo #282828 | exact match |
| secondary nav background | var(--ds-color-pdf-surface-warm) → #2a2927 | --ds-color-pdf-surface-warm | styles.css:1380; styles.css:44; PDF «Navegación secundaria: fondo #2a2927» | exact match; existing token reused |
| selected item background | var(--ds-color-pdf-surface-warm) → #2a2927 | --ds-color-pdf-surface-warm | styles.css:1444 | subtle lift on shell; not a separate PDF hex |
| selected accent line | var(--ds-color-white) → #ffffff | --ds-color-white | styles.css:1445; PDF #FFFFFF | exact match |
| icon / muted ink / edge-toggle | var(--ds-color-pdf-ink-muted) → #8a8b87 | --ds-color-pdf-ink-muted | styles.css:1323 / 1358; styles.css:45; PDF Iconos / Flechas / Bajada #8a8b87 | exact match for text/chrome; **does not tint `<img>` icons** |
| edge-toggle border | var(--ds-color-pdf-line) → #c1c1c1 | --ds-color-pdf-line | styles.css:1356 | hairline chrome; not PDF-annotated for toggle |
| caption (bajada) | var(--ds-color-pdf-ink-muted) → #8a8b87 | --ds-color-pdf-ink-muted | styles.css:1487 | exact match |
| badge background | var(--ds-color-pdf-notification) → #e30000 | --ds-color-pdf-notification | styles.css:1495; styles.css:53; PDF #e30000 | exact match (distinct from `--ds-color-pdf-critical` #ff0404) |
| badge text | var(--ds-color-white) → #ffffff | --ds-color-white | styles.css:1498; PDF #FFFFFF | exact match |
| status text | var(--ds-color-pdf-line) → #c1c1c1 | --ds-color-pdf-line | styles.css:1508; PDF #c1c1c1 | exact match |
| status background | var(--ds-color-pdf-shell) → #282828 | --ds-color-pdf-shell | styles.css:1507; PDF #282828 | exact match; near-identical to secondary `#2a2927` — low-contrast risk |
| right shadow | 4px 0 16px var(--ds-color-black-a24) | --ds-color-black-a24 | styles.css:1322 | **PDF «Sombra derecha» has no blur/spread measurement** — provisional |
| selected icon recolor #FFFFFF | — | — | PDF «Icono seleccionado: #FFFFFF» | **NOT IMPLEMENTED** — shared icons are flat multi-color `<img>`; see deltas |

## Typography
| Element | Font family | Size | Weight | Letter-spacing | Line-height | Casing | Source |
|---------|-------------|------|--------|----------------|-------------|--------|--------|
| item label | var(--ds-font-body) (Montserrat) | 7pt | 400 (`--ds-font-weight-regular`) | UNVERIFIED | var(--ds-leading-normal) | none | styles.css:1478–1483; **PDF does not annotate item label type** — provisional |
| menu-label | var(--ds-font-body) (Montserrat) | 6pt | 400 | UNVERIFIED | var(--ds-leading-normal) | none | styles.css:1408–1413; **PDF shows «Menú» but no type annotation** — provisional |
| caption (bajada) | var(--ds-font-mono) (Source Code Pro) | 7pt (PDF 14pt ÷2) | 400 (`--ds-font-weight-regular`) | UNVERIFIED | var(--ds-leading-normal) | none | styles.css:1486–1491; PDF Bajada Source Code Regular 14pt #8a8b87 |
| badge | var(--ds-font-body) (Montserrat) | 8.5pt (PDF 17pt ÷2) | 700 (`--ds-font-weight-bold`) | UNVERIFIED | 1.2 | none | styles.css:1494–1503; PDF Notificación Montserrat Bold 17pt |
| status | var(--ds-font-mono) (Source Code Pro) | 5pt (PDF 10pt ÷2) | 500 (`--ds-font-weight-medium`) | UNVERIFIED | 1.2 | uppercase | styles.css:1506–1515; PDF Estado Montserrat Medium 10pt Uppercase — **CSS uses mono family** (see deltas) |

## Spacing
| Region | Padding | Gap | Margin | Source |
|--------|---------|-----|--------|--------|
| root (nav) | 10px | — | — | styles.css:1328 |
| header | — | — | margin-bottom 12px | styles.css:1337–1341; provisional |
| menu-heading | — | 6px | — | styles.css:1385–1388 |
| menu / secondary stack | — | 8px | secondary margin-top 12px | styles.css:1371–1382; provisional |
| secondary | 8px | — | — | styles.css:1381; provisional |
| list | — | 2px | 0 | styles.css:1416–1422 |
| item | 4px 6px | 8px | 0 | styles.css:1425–1440; provisional |
| badge | 0 5px | — | — | styles.css:1503; **no PDF box measurement** — provisional |
| status | 2px 4px | — | — | styles.css:1514; **no PDF box measurement** — provisional |

## Variants / modifiers present in CSS
| Class | Effect | Source | Backed by CSS? (yes/no) |
|-------|--------|--------|-------------------------|
| .ds-sidebar-shell | positioning host for edge-toggle straddle | styles.css:1314 | yes |
| .ds-sidebar | nav chrome + column flex + width transition + overflow hidden | styles.css:1319 | yes |
| .ds-sidebar--collapsed | collapsed width; hides copy/labels/heading-icon/badge/status | styles.css:1333; 1518–1523 | yes |
| .ds-sidebar__edge-toggle | absolute edge control (sibling of nav) | styles.css:1353 | yes |
| .ds-sidebar__item--selected | warm background + white left accent | styles.css:1443 | yes |
| .ds-sidebar__menu-heading / __menu-heading-icon | section heading row | styles.css:1385–1405 | yes |
| (other `__` elements) | header, logo, menu, list, item anatomy, badge, status, secondary | styles.css:1337–1515 | yes |

## Motion
| Property | Value | Source | Delta vs PDF/doc |
|----------|-------|--------|------------------|
| width transition | var(--ds-duration-md) → 180ms / var(--ds-ease-standard) → ease | styles.css:1329; styles.css:168–171 | PDF «Sumarle una pequeña animación» — duration/easing not annotated; kit motion tokens |

## Deltas & open questions (facts only — DO NOT resolve)

- **Root DOM correction (0.1.1):** host is now `div.ds-sidebar-shell` wrapping `<nav.ds-sidebar>` + `button.ds-sidebar__edge-toggle`. Props/`className` still target the `<nav>`. Driven by PDF artwork: toggle must straddle the right border and would be clipped by the nav’s `overflow: hidden`.
- **Expanded/collapsed widths are not PDF-measured** — reused existing tokens (`--ds-size-card-min-w` 220px, `--ds-size-control-lg` 48px), not new values.
- **«Mis tareas» → `MenuBandejaIcon` is an inferred mapping**, not a PDF-confirmed one (bandeja/inbox metaphor; no exact-name Menu icon).
- **`HamburguesaIcon` placement resolved** (artwork): belongs beside `menuLabel` via `menuIcon`, not as collapse control.
- **Edge-toggle glyph:** PDF panel pictogram simplified to a directional chevron (hand-drawn SVG, not `Icons/*`); size `20×20` and `top: 12px` / `translateX(50%)` are provisional.
- **«Flechas de navegación»:** interpreted as the edge-toggle’s own chevron flipping direction by `collapsed` state, not a separate always-visible control — interpretation, not confirmed reading.
- **Icon recoloring on selection («Icono seleccionado: #FFFFFF») is NOT implemented** — shared icon assets are flat multi-color `<img>` sources, not tintable via CSS `currentColor`/`fill`. Only the 2pt selected-line accent (+ warm background lift) is implemented. No CSS-filter workaround.
- **Status chip background (`#282828`) vs secondary-nav background (`#2a2927`) are near-identical** — a PDF-inherited low-contrast risk when `status` appears inside `.ds-sidebar__secondary`; not silently “fixed.”
- **Shadow blur/spread for «Sombra derecha» is not PDF-measured** — provisional `4px 0 16px` with `--ds-color-black-a24`.
- **Badge/status box padding is not PDF-measured** — sized to content (`0 5px` / `2px 4px`).
- **Item label / menu-label type sizes** are not annotated in PDF p.13 — provisional values in CSS.
- **Status font-family:** PDF says «Montserrat Medium»; CSS uses `var(--ds-font-mono)` for `.ds-sidebar__status` (weight medium). Family mismatch vs PDF copy — flag for design; weight token `--ds-font-weight-medium: 500` exists on the scale.
- **Selected line 2pt:** implemented as `2px` border-left (chrome accent; not scaled ÷2 like layout lengths).
