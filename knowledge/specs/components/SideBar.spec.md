# SideBar — Numeric Specification

- Status: measured
- Source-of-truth order: PDF (page 13) > component doc > implemented CSS
- CSS block: `.ds-sidebar-shell` / `.ds-sidebar` (styles.css:1681–1889)
- Export: packages/ui/src/components/SideBar.tsx
- PDF reference: p.13 SIDE BAR (knowledge/components/SideBar.md; knowledge/references/pdf-text-extract.md § Page 13)

**2026-08-05 fidelity pass.** User-reported: item grouping was wrong (everything but "Catástrofes"
was in one top-anchored list; "Catástrofes" alone was mis-modeled as a bottom "EN VIVO" status
chip). Re-measured PDF page index 12 (`page.get_text("dict")` + `get_drawings()`, artboard
1920×1080 confirmed via `page.mediabox`) to fix grouping and caught three more evidenced deltas
along the way: the notification badge's real position, a stale `.ds-sidebar__secondary` background
that was misattributed from an unrelated diagram on the same page, and the already-tracked
`pt`-instead-of-`px` CSS unit bug (`knowledge/fidelity-pass/next-steps.md`'s carried-forward
finding) landing on all five of this component's `font-size` declarations.

**2026-08-05, same-day follow-up (user-reported):** the "Menú" heading (hamburger icon + label)
was a plain non-interactive `<div>` — the user pointed out it "tiene que ser botón también" (like
every other row) and asked for a hover highlight. Changed `.ds-sidebar__menu-heading` to a real
`<button type="button">` wired to the existing `onToggleCollapsed` prop (hamburger-icon
convention: clicking it toggles collapse, same action as the edge-toggle chevron, no new prop
added). Added `:hover` backgrounds (`--ds-color-white-a06`) to both `.ds-sidebar__item` and
`button.ds-sidebar__menu-heading` — there was no hover state anywhere in this component before.
Making the heading a real button surfaced a pre-existing, unrelated bug while testing collapsed
mode: `.ds-sidebar--collapsed` unconditionally hid `.ds-sidebar__menu-heading-icon`, so the new
button had nothing visible/clickable in it once collapsed — but the PDF's own Colapsada column
shows the hamburger icon present and icon-centered, same as every other collapsed row. Removed it
from the collapsed hide-list and added `justify-content: center; padding-inline: 0` for the
collapsed button, mirroring `.ds-sidebar__item`'s existing collapsed treatment.

**2026-08-05, second same-day follow-up (user-reported):** the selected item's left accent line
sat visibly inset from the sidebar's own edge — `.ds-sidebar`'s own `padding: 10px` was pushing
every row's box inward, so `border-left`/hover backgrounds never reached the true edge. Moved the
horizontal inset from the container onto each row: `.ds-sidebar{padding: 10px 0}` (top/bottom
only), `.ds-sidebar__item`/`button.ds-sidebar__menu-heading{padding: 4px 16px}` (up from `4px 6px`
— absorbs the removed 10px so icon/label position on screen is unchanged), `.ds-sidebar__header
{padding-inline: 10px}` (new — the logo isn't a row, needed its own compensating inset). Collapsed
mode already overrides row padding to `0` with `justify-content: center`, so centered icons land
at the same screen position either way — no collapsed-specific change was needed. Content-box math
checks out exactly: `nav_width − 20 (old nav padding) − 12 (old item padding) = nav_width − 32`,
`nav_width − 0 (new nav padding) − 32 (new item padding) = nav_width − 32` — identical available
width for icon+label+badge, so nothing wraps or overlaps differently.

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
| notification badge | 10×10 (circle) | px | styles.css `.ds-sidebar__badge`; PDF badge circle (319.5,774.7)-(339.8,795.0) = 20.3×20.3pt @2× | calibrated ÷2 (2026-08-05); was a content-sized inline pill floated after the label — see deltas |
| selected icon filter | brightness(0) invert(1) | — | styles.css `.ds-sidebar__item--selected .ds-sidebar__item-icon img/svg`; PDF "Icono seleccionado: #FFFFFF" | added 2026-08-05 — see deltas |
| badge position | top:0; right:0; translate(50%,-50%) on `.ds-sidebar__item-icon` | — | PDF: badge center sits ~exactly on the icon's top-right corner in both Desplegada (icon (305.4,784.8)-(333.6,809.0)) and Colapsada (icon (703.1,784.8)-(731.3,809.0)) | calibrated 2026-08-05 — same corner-accent position in both expanded and collapsed, not a same-row trailing pill and not hidden when collapsed |

## Color
| Role | Value | Matching --ds-* token? | Source | Delta |
|------|-------|------------------------|--------|-------|
| shell background | var(--ds-color-pdf-shell) → #282828 | --ds-color-pdf-shell | styles.css:1320; styles.css:52; PDF Fondo #282828 | exact match |
| selected item background | var(--ds-color-pdf-surface-warm) → #2a2927 | --ds-color-pdf-surface-warm | styles.css:1444 | subtle lift on shell; not a separate PDF hex |
| selected accent line | var(--ds-color-white) → #ffffff | --ds-color-white | styles.css:1445; PDF #FFFFFF | exact match |
| icon / muted ink / edge-toggle | var(--ds-color-pdf-ink-muted) → #8a8b87 | --ds-color-pdf-ink-muted | styles.css:1323 / 1358; styles.css:45; PDF Iconos / Flechas / Bajada #8a8b87 | exact match; icon `<img>` assets are drawn `#8a8b87` at the source (confirmed monochrome, not multi-color — see deltas), so this is their natural rendered color, not a CSS tint |
| item label (unselected) | var(--ds-color-pdf-ink-muted) → #8a8b87 | --ds-color-pdf-ink-muted | styles.css `.ds-sidebar__item-label` | changed 2026-08-05 from `--ds-color-white` — see deltas |
| item label (selected) | var(--ds-color-white) → #ffffff | --ds-color-white | styles.css `.ds-sidebar__item--selected .ds-sidebar__item-label` | added 2026-08-05 |
| edge-toggle border | var(--ds-color-pdf-line) → #c1c1c1 | --ds-color-pdf-line | styles.css:1356 | hairline chrome; not PDF-annotated for toggle |
| caption (bajada) | var(--ds-color-pdf-ink-muted) → #8a8b87 | --ds-color-pdf-ink-muted | styles.css:1487 | exact match |
| badge background | var(--ds-color-pdf-notification) → #e30000 | --ds-color-pdf-notification | styles.css:1495; styles.css:53; PDF #e30000 | exact match (distinct from `--ds-color-pdf-critical` #ff0404) |
| badge text | var(--ds-color-white) → #ffffff | --ds-color-white | styles.css:1498; PDF #FFFFFF | exact match |
| status text | var(--ds-color-pdf-line) → #c1c1c1 | --ds-color-pdf-line | styles.css:1508; PDF #c1c1c1 | exact match |
| status background | var(--ds-color-pdf-shell) → #282828 | --ds-color-pdf-shell | styles.css:1507; PDF #282828 | exact match; near-identical to secondary `#2a2927` — low-contrast risk |
| right shadow | 4px 0 16px var(--ds-color-black-a24) | --ds-color-black-a24 | styles.css:1322 | **PDF «Sombra derecha» has no blur/spread measurement** — provisional |
| selected icon recolor #FFFFFF | `filter: brightness(0) invert(1)` | — | styles.css `.ds-sidebar__item--selected .ds-sidebar__item-icon img/svg`; PDF «Icono seleccionado: #FFFFFF» | **implemented 2026-08-05** — see deltas (previous "shared icons are flat multi-color" claim was wrong, see below) |

## Typography
| Element | Font family | Size | Weight | Letter-spacing | Line-height | Casing | Source |
|---------|-------------|------|--------|----------------|-------------|--------|--------|
| item label | var(--ds-font-body) (Montserrat) | 7px | 400 (`--ds-font-weight-regular`) | UNVERIFIED | var(--ds-leading-normal) | none | styles.css `.ds-sidebar__item-label`; PDF text span "Mis tareas" size 14.0pt÷2 |
| menu-label | var(--ds-font-body) (Montserrat) | 7px | 400 | UNVERIFIED | var(--ds-leading-normal) | none | styles.css `.ds-sidebar__menu-label`; PDF text span "Menú" size 14.0pt÷2, same as item labels |
| caption (bajada) | var(--ds-font-mono) (Source Code Pro) | 7px (PDF 14pt ÷2) | 400 (`--ds-font-weight-regular`) | UNVERIFIED | var(--ds-leading-normal) | none | styles.css `.ds-sidebar__item-caption`; PDF Bajada Source Code Regular 14pt #8a8b87 |
| badge | var(--ds-font-body) (Montserrat) | 8.5px (PDF 17pt ÷2) | 700 (`--ds-font-weight-bold`) | UNVERIFIED | 1 | none | styles.css `.ds-sidebar__badge`; PDF Notificación Montserrat Bold 17pt |
| status | var(--ds-font-mono) (Source Code Pro) | 5px (PDF 10pt ÷2) | 500 (`--ds-font-weight-medium`) | UNVERIFIED | 1.2 | uppercase | styles.css `.ds-sidebar__status`; PDF Estado Montserrat Medium 10pt Uppercase — **CSS uses mono family** (see deltas) |

**2026-08-05 unit fix:** all five `font-size` declarations above previously used the literal CSS
unit `pt` instead of `px` (e.g. `font-size: 7pt`, which renders as `9.33px`, ~33% too large) — the
same carried-forward bug already flagged for `CalendarCard`/`Empty` in
`knowledge/fidelity-pass/next-steps.md`. The numeric values themselves were already correctly
calibrated ÷2 (confirmed against PDF text-span sizes above); only the unit was wrong. `menu-label`
was additionally re-measured from PDF text span data (previously marked "provisional, no type
annotation" — the PDF's "Menú" span is actually the same 14pt as every item label, size 6pt→7px).

## Spacing
| Region | Padding | Gap | Margin | Source |
|--------|---------|-----|--------|--------|
| root (nav) | 10px 0 | — | — | styles.css `.ds-sidebar`; 2026-08-05: horizontal inset moved onto each row, see deltas |
| header | 0 10px | — | margin-bottom 12px | styles.css `.ds-sidebar__header`; horizontal padding added 2026-08-05 to preserve logo inset |
| menu-heading (button) | 4px 16px | 6px (icon↔label) | — | styles.css `button.ds-sidebar__menu-heading`; padding was `4px 6px`, raised 2026-08-05 |
| menu / secondary stack | — | 8px | — | styles.css `.ds-sidebar__menu, .ds-sidebar__secondary` |
| secondary | — | — | margin-top: auto | styles.css `.ds-sidebar__secondary`; PDF shows the account/utility group flush against the panel's bottom edge (2026-08-05: changed from `margin-top: 12px` + a `#2a2927` panel background — see deltas) |
| list | — | 2px | 0 | styles.css:1416–1422 |
| item | 4px 16px | 8px | 0 | styles.css `.ds-sidebar__item`; padding was `4px 6px`, raised 2026-08-05 so the selected accent/hover background reach the sidebar's true edge (see deltas) |
| badge | 0 2px | — | — | styles.css `.ds-sidebar__badge`; fixed 10×10 circle, absolutely positioned — see Dimensions |
| status | 2px 4px | — | — | styles.css:1514; **no PDF box measurement** — provisional |

## Variants / modifiers present in CSS
| Class | Effect | Source | Backed by CSS? (yes/no) |
|-------|--------|--------|-------------------------|
| .ds-sidebar-shell | positioning host for edge-toggle straddle | styles.css:1314 | yes |
| .ds-sidebar | nav chrome + column flex + width transition + overflow hidden | styles.css:1319 | yes |
| .ds-sidebar--collapsed | collapsed width; hides copy/labels/status (icon and menu-heading-icon stay visible, 2026-08-05) | styles.css `.ds-sidebar--collapsed` + hide-list | yes |
| .ds-sidebar__edge-toggle | absolute edge control (sibling of nav) | styles.css:1353 | yes |
| .ds-sidebar__item--selected | warm background + white left accent; `:hover` keeps the same warm background (no separate hover tint) | styles.css `.ds-sidebar__item--selected`, `.ds-sidebar__item--selected:hover` | yes |
| .ds-sidebar__item:hover / button.ds-sidebar__menu-heading:hover | subtle `--ds-color-white-a06` highlight (2026-08-05 — no hover state existed before) | styles.css | yes |
| .ds-sidebar__menu-heading / __menu-heading-icon | section heading row; primary heading is now a real `<button>` wired to `onToggleCollapsed` (2026-08-05, was a non-interactive `<div>`) | styles.css | yes |
| (other `__` elements) | header, logo, menu, list, item anatomy, badge, status, secondary | styles.css:1337–1515 | yes |

## Motion
| Property | Value | Source | Delta vs PDF/doc |
|----------|-------|--------|------------------|
| width transition | var(--ds-duration-md) → 180ms / var(--ds-ease-standard) → ease | styles.css:1329; styles.css:168–171 | PDF «Sumarle una pequeña animación» — duration/easing not annotated; kit motion tokens |

## Deltas & open questions (facts only — DO NOT resolve)

- **Selected-state color implemented 2026-08-05 (user-reported):** PDF legend explicitly gives two
  distinct icon colors — «Iconos: #8a8b87» (default) and «Icono seleccionado: #FFFFFF» (selected)
  — implying the same default/selected split for the item's own label. The previous CSS instead
  hardcoded `.ds-sidebar__item-label{color: var(--ds-color-white)}` unconditionally for every row
  (selected or not), and never recolored the icon at all — confirmed via `getComputedStyle()` in a
  live Storybook tab (both selected and unselected rows returned `rgb(255,255,255)` for the label,
  `filter: none` for the icon, before this fix). Changed `.ds-sidebar__item-label`'s base color to
  `--ds-color-pdf-ink-muted` (matching the icon's own already-correct default) and added a
  `--ds-color-white` override under `.ds-sidebar__item--selected`. **The earlier "shared icons are
  flat multi-color `<img>`, not tintable" claim (Known Limitations, pre-2026-08-05) was checked
  against the actual SVG source and found incorrect** — every Menu icon asset
  (`Icons/Menu/*-50x50.svg`) and the Modules `Catastrofes-180x180.svg` used by this component are
  genuinely monochrome (single `fill`/`stroke` color per file, e.g. `#8a8b87` or `#c1c1c1`, plus a
  cosmetic near-zero-width `#000` outline in a few). That makes `filter: brightness(0) invert(1)`
  a reliable recolor for ANY of them regardless of source hue — added on
  `.ds-sidebar__item--selected .ds-sidebar__item-icon img, svg`. Confirmed working via
  `getComputedStyle()` after the fix (selected: label `rgb(255,255,255)`, icon filter
  `brightness(0) invert(1)`; unselected: label `rgb(138,139,135)`, icon filter `none`).
- **`Mis tareas` demo caption removed 2026-08-05 (user-reported: "se sale de tono con los demás"):**
  the `Expanded`/`Collapsed`/`Playground` stories' first item had `caption: "Bandeja operativa"`,
  the only item among the 9 demoed with one — visually inconsistent since no sibling row has a
  caption. Removed from the story's demo data only. The `caption` prop itself stays supported on
  `SideBarItem` (PDF-confirmed real feature — «Bajada» in the legend, «Items con bajada» annotation
  on the artwork) for any consumer that wants to use it.
- **"Menú" heading made interactive 2026-08-05 (user-reported):** was a non-interactive `<div>`
  with no click handler, no hover, no focus ring. Now a real `<button>` calling
  `onToggleCollapsed` — same action the edge-toggle chevron already performs, chosen because a
  hamburger glyph is the universal "toggle nav" affordance and the component has no other
  controlled action to attach to it. No new prop was added. The secondary heading (`secondaryIcon`/
  `secondaryLabel`, unused in current stories) stays a plain `<div>` — there's no equivalent
  secondary toggle to wire it to.
- **Grouping fixed 2026-08-05 (user-reported):** the demo data (`SideBar.stories.tsx`) put every
  item except «Catástrofes» into the `items` (primary/top) list, and modeled «Catástrofes» alone
  as a `secondaryItems` entry with a `status: "EN VIVO"` chip instead of a plain nav item. PDF text
  spans (`page.get_text("dict")` on `doc[12]`) give the real, unambiguous stacking order in the
  Desplegada column: `Menú` (y=113) → `Mis tareas` (161) → `Historial` (210) → `Reportes` (264) →
  `Catástrofes` (316) → [gap] → `Notificaciones` (791) → `Mi cuenta` (861) → `Configuración` (918)
  → `Ayuda` (979) → `Cerrar sesión` (1038). Fixed: `Catástrofes` moved into `items` (top group, no
  status chip); `Notificaciones`/`Mi cuenta`/`Configuración`/`Ayuda`/`Cerrar sesión` moved into
  `secondaryItems` (bottom group). The component itself (`SideBar.tsx`) already supported this
  split correctly via `items`/`secondaryItems` — only the story's demo data was wrong.
- **`.ds-sidebar__secondary`'s background/padding was a misattributed color, removed 2026-08-05:**
  the CSS had `background: var(--ds-color-pdf-surface-warm)` + `padding: 8px` on the bottom group,
  and this spec's Color table (until today) cited the legend line «Navegación secundaria: fondo
  #2a2927» as its source. Re-measured via `get_drawings()`: that legend's leader line (y=179.3,
  x≈825–888) and the actual `#2a2927` background rect (681.5,0)-(813.1,1080) sit well to the right
  of the Desplegada/Colapsada diagrams entirely, around a *separate* cluster of 6 icons (magnifying
  glass, crop/select, share, exchange, pencil, sliders — matching the adjacent «Iconos centrados en
  altura» annotation) that isn't SideBar's account/utility list at all — it's a distinct, unbuilt
  "secondary navigation rail" component/pattern drawn on the same PDF page. Confirmed no such panel
  exists behind the bottom group in either the Desplegada or Colapsada mockup (both are plain
  `#282828`, no visible sub-panel). `.ds-sidebar__secondary` now only carries `margin-top: auto` to
  anchor the bottom group to the panel's bottom edge.
- **Notification badge repositioned 2026-08-05:** was rendered as a `.ds-sidebar__item`-level flex
  sibling after `.ds-sidebar__item-copy` (a same-row trailing pill, far from the icon) and hidden
  entirely in `.ds-sidebar--collapsed`. PDF vector measurement shows the badge circle
  ((319.5,774.7)-(339.8,795.0) @2×) centered almost exactly on the bell icon's top-right corner
  ((305.4,784.8)-(333.6,809.0) @2×) in **both** the Desplegada and Colapsada columns (badge glyphs
  confirmed present in both via duplicate "2" text spans at x≈325 and x≈722). Moved the badge inside
  `.ds-sidebar__item-icon` in the JSX and made it an absolutely-positioned corner accent
  (`top:0; right:0; transform: translate(50%,-50%)`) so it now shows correctly in both states.
- **`pt`-instead-of-`px` unit bug fixed 2026-08-05** on all 5 `font-size` declarations in this
  component (see Typography section) — the carried-forward finding from
  `knowledge/fidelity-pass/next-steps.md` (originally caught on `InvestigationCard`).
- **New backlog discovery:** the «Navegación secundaria» rail (6 icons: buscar, seleccionar/crop,
  compartir, intercambiar, editar, ajustes; `fondo #2a2927`, «Iconos centrados en altura») visible
  on PDF p.13 to the right of the SideBar mockups is **not implemented anywhere in the kit** — no
  matching component/pattern exists yet. Out of scope for this pass; flagged in
  `knowledge/fidelity-pass/next-steps.md` for a future dedicated build.
- **Not investigated this pass (inconclusive evidence, left alone):** the PDF's «25 px» annotation
  near the primary list (pointing at the gap between two items) doesn't cleanly resolve against
  either the current `.ds-sidebar__list{gap: 2px}` or a naive ÷2 reading — measured item-to-item
  label top-to-top pitch in the Desplegada column ranges 49–54pt @2× across the four primary items,
  inconsistent with both a flat `gap` value and with the current `min-height: 32px` per item once
  combined with any single gap value. Not fixed without cleaner evidence; re-measure with a
  dedicated pass if this list's vertical rhythm is ever reported as visibly wrong.
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
