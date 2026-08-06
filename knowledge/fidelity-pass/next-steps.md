# Fidelity pass — next steps

## 🔖 Session handoff — pick up here (last updated 2026-08-06)

**Status:** all originally-planned components are fidelity-passed (`Skeleton`, `CalendarCard`,
`Empty` this week; `TaskCard`/`InvestigationCard`/`ChartCard` family/`ModuleCard`/`MetricCard`/
`Asistente`/`SideBar` earlier). On top of that, today's page-by-page PDF sweep turned up a real
**coverage gap** (not a fidelity bug) — GRAFICOS p.9 had 3 chart types nothing in the kit rendered
— and it's now closed: new `LinearBarChartCard` + `ProgressRing` `variant="pdf"` (now the default).
Both went through 2 rounds of user review/fixes in Storybook before commit — see "New components
built" right below for the specifics. **Everything described in this file is already committed
and pushed to `eval-loop`** (`git log --oneline -3` to confirm before starting new work).

**Next up, in order** (see "Backlog — components" further down for full detail on each):
1. **Form** (PDF p.17) — likely *not* a real build target. `component-roadmap.md` flags its PDF
   spec block as looking like an unfinished placeholder (near-identical to Empty's, no field
   list/layout/validation). Confirm with design before building anything; don't invent an API from
   a placeholder page.
2. **AlertBanner** (PDF p.18, "Alert") — check `specs/README.md`'s scale-calibration section first;
   `.ds-alert` may be a "teal/console" (rem-based) component **out of scope** for this pass, same
   as `Button`/`Badge`/`Card`/etc. Confirm the classification before assuming p.18 applies the same
   `@2× ÷2` treatment TaskCard/InvestigationCard/etc. got.
3. Once components are done (or confirmed out of scope): move to **patterns**
   (`packages/ui/src/patterns/*` — `detail-sheet`, `login`, `mission`), per the 2026-08-05 decision
   below.

**Before touching any of the above**, also do a fresh full-PDF page sweep for more "GRAFICOS
p.9-style" coverage gaps — today's discovery came from the user spotting one by eye in a
screenshot, not from a systematic check. `component-roadmap.md`'s gap table should not be trusted
at face value (it was wrong for p.9) — cross-check every remaining "✅" row against an actual
PyMuPDF read of that PDF page before assuming it's real.

**Process reminders that apply to every item above** (see full detail further down):
- Wait for the user to actually look at Storybook and say go-ahead before committing/pushing —
  don't push right after your own build+screenshot check (see the 2026-08-05 process note below).
- A PDF diagram/illustration isn't always at 1:1 scale with the real asset it's showing (ModuleCard
  icon lesson, below) — check declared asset sizes (SVG `viewBox`, etc.) first when available.
- When a page mixes a clean reference diagram with noisy/duplicated/unrelated content in the same
  coordinate space (GRAFICOS p.9's own extraction had this), don't force a clean read from
  `get_drawings()`/`get_text()` alone — cross-check with the user's screenshot or look for a
  systematic scale artifact (see the "0.887 ratio" note in `LinearBarChartCard.spec.md`) before
  trusting either source blindly.

---

**Started:** 2026-08-04
**Goal:** go component by component and check the built code against the real PDF (exact vector
coordinates + text-spans via PyMuPDF — `python -c "import fitz; ..."`, not screenshots/estimates),
fixing whatever doesn't match. Distinct from `knowledge/eval/` (that track scores *generated*
Cursor code against a golden set; this track checks the *kit's own* components against the PDF
directly).

Method that's worked so far: read the component's `.tsx`/CSS, open the matching PDF page with
PyMuPDF (`page.get_drawings()` for shapes/colors/dimensions, `page.get_text("dict")` for exact
font/size/color per span), compare against current CSS, fix, rebuild, verify in Storybook via
`mcp__claude-in-chrome__*` (screenshot + zoom, sometimes `javascript_exec` to read computed
styles), update `knowledge/components/<Name>.md` and `knowledge/specs/components/<Name>.spec.md`
with the exact numbers and *why* (not just "changed X to Y").

**2026-08-05 update:** agreed order — finish all *components* (`packages/ui/src/components/*`)
before starting on *patterns* (`packages/ui/src/patterns/*`: `detail-sheet`, `login`, `mission`).
Backlog below is now split accordingly.

**2026-08-06 update:** this pass isn't only finding *fidelity bugs* in already-built components —
today it found a **coverage gap**: `component-roadmap.md`'s gap table listed "Gráficos | p.9–10 |
✅ | ✅" as if both pages were covered by the same 4 chart components, but p.9 and p.10 are two
distinct pages that both happen to be titled "GRAFICOS" (`doc[8]` and `doc[9]`), each with
different chart types. Only p.10 was ever built. See "New components built" below — same PyMuPDF
methodology, just building instead of fixing.

## New components built (coverage gap, not a fidelity fix)

- **LinearBarChartCard** + **ProgressRing `variant="pdf"`** (PDF p.9 "GRAFICOS" › "Barras lineal
  horizontal"/"Barras lineal vertical"/"Torta", `doc[8]`) — 2026-08-06, user-initiated: she pointed
  at a PDF screenshot and asked to verify whether this page's charts were built. Confirmed via
  `page.get_text()` that `doc[8]` (p.9) and `doc[9]` (p.10) are two separate pages both titled
  "GRAFICOS" — `doc[9]` is the grayscale "Barra tradicional"/comparison-Torta/"Líneas" page
  already covered by `BarChartCard`/`DonutChartCard`/`LineChartCard`; `doc[8]` is a genuinely
  different page with 3 chart types none of the existing components render.
  - **LinearBarChartCard** (new component): thin-stroke "linear" bars (not filled rectangles) in
    `orientation="horizontal"` (ranking list, PDF "HISTÓRICO INCENDIOS") or `"vertical"` (grouped
    bars, PDF "PRECIPITACIONES ESTACIONALES"). Measured stroke width 5pt→2.5px, título/número
    grande/número chico/referencia font-sizes (16/20/10/16pt→8/10/5/8px), destacada color `#ff0404`.
    Discovered and documented a page-specific artifact: every font-size and the stroke-width on
    this diagram measures ~0.887× the legend's own round pt values (14.19 vs 16, 17.74 vs 20, 4.436
    vs 5 — a consistent ratio across 3 unrelated properties, not per-element noise) — used the
    legend's round numbers, not the diagram's raw measured ones (see LinearBarChartCard.spec.md).
    Storybook review caught a real bug before commit: the vertical orientation's inter-bar gap
    (invented at 4px) made adjacent value labels overlap — fixed to the actually-measured ~15px
    center-to-center spacing.
  - **ProgressRing `variant="pdf"`**: user corrected the initial plan (proposed as a new
    `GaugeRingCard` or a `DonutChartCard` extension) — the PDF's "Torta" gauge on this page is a
    single-value status ring (color driven by tone: red/amber/green) matching `ProgressRing`'s
    existing `value`/`tone`/`label`/`size` shape exactly, just needing a PDF-faithful render path.
    Added because the existing `variant="console"` render (CSS `conic-gradient`, uniform ring
    thickness) structurally cannot express the PDF's asymmetric stroke widths (15pt/7pt progress
    vs track) — built a parallel SVG-based render for `variant="pdf"` only, `variant="console"`
    left untouched and re-verified with no regression. All Torta measurements on this page (colors,
    both stroke widths, both font sizes) matched their own legend exactly — no 0.887-ratio artifact
    here, confirming that quirk is specific to the "Barras lineal" diagram instance, not the whole
    page's extraction.
  - Added 2 new color tokens (`--ds-color-pdf-warning: #e3a500`, `--ds-color-pdf-success:
    #28a500`) and 3 new size tokens (`--ds-size-progress-pdf-sm/md/lg`).
  - Corrected `component-roadmap.md`'s gap table (see 2026-08-06 note above).

## Done

- **TaskCard** (PDF p.3, "Tarjetas") — commit `e2ceaa6`. Chamfer/accent floating-triangle fix (and
  a real `clip-path`-clips-`::before` bug found along the way), typography corrected against real
  text-spans (code/status were undersized, title/meta were force-uppercased with the wrong font
  family), `tone="neutral"` no longer renders a fake accent triangle, added `creator`/`startDate`/
  `endDate` props mapped from the PDF's own "Creador"/"Fecha" callouts, fixed default/kanban/resumen
  width (`fit-content` was letting it shrink below its own cap).
- **InvestigationCard** (PDF p.4, "Investigation card") — commit `8ebc82f`. Same `fit-content`
  width bug (buttons wrapped to two lines), a CSS unit bug (`pt` literal instead of `px` on four
  `font-size` declarations — renders ~33% too large), and the action button colors: went through
  two rounds of user correction — first read the PDF's two button fills as two permanent variant
  colors (and had them swapped), then the user pointed out one of those two is a `:hover` capture,
  not a second resting color, then asked for `ghost`'s hover to match `primary`'s. Final state:
  `primary`/`ghost` are visually identical in every state (`#494949` rest, `#8a8b87` hover) —
  `InvestigationActionVariant` is purely semantic today, no visual effect.
- **ChartCard / BarChartCard / DonutChartCard / LineChartCard** (PDF p.9, "GRAFICOS") — none of
  the four had a PDF page cited before this pass (`specs/README.md` said "none cited" on all four).
  Two headline fixes: (1) default color palettes were a 5-color rainbow (`teal`/`blue`/`green`/
  `amber`/`coral`) on Bar/Donut, and `teal` on Line's default `color` prop — PDF legend is
  explicit grayscale (`#c1c1c1`/`#8a8b87`/`#060606` cycle for bars, `#c1c1c1` line, white/`#8a8b87`
  donut segments, `#494949` donut track) — all corrected to the matching `--ds-color-pdf-*`
  tokens. (2) `ChartCard.stories.tsx`'s `Gallery` story had no dark decorator — third confirmed
  case of the "Storybook backgrounds addon isn't registered" bug (see recurring-bug notes below).
  Side effect of the grayscale fix: the darkest bar color (`#060606`) is nearly identical to
  `.ds-chart-card`'s own background and was disappearing — added a subtle stroke to
  `.ds-bar-chart__bar` so it stays visible. Also fixed `.ds-chart-card`'s border-width
  (`--ds-border-width-1` → `--ds-border-width-hair`, PDF says 0.75pt) and the donut track's opacity
  hack (`ink-muted` at 25% → solid `#494949`, matching the legend's own literal color instead of a
  dimmed substitute). Not attempted: a per-datapoint red highlight the PDF's line-chart example
  shows (`#ff0404` on one point) — would need a real API addition (`LineChartDatum` per-point
  color override), not a CSS fix. Page index 8's vector/text extraction was noisy (see the four
  spec files' Deltas sections) — this page mixes the small reference diagram with an unrelated,
  much larger dashboard mockup in overlapping coordinates; colors were confirmed from the user's
  clean screenshot's legend text instead of fighting the messy extraction.

- **ModuleCard** (PDF p.6, "Módulos") — user-reported "distintos tamaños en el storybook" +
  "el número que está alineado a la izquierda", both confirmed as real, evidenced bugs, not
  misreadings. Card was `min-width`/`min-height: 130px` only (4th confirmed case of the
  fixed-width-vs-fit-content pattern) → fixed `width`/`height: 194px` (PDF vector bbox is a
  388.6×388.6pt @2× square). Icon size was touched and then reverted same day — see the dedicated
  lesson below, don't repeat it. The metric row was
  `justify-content: space-between` (value pushed to the card's far right edge); PDF text-spans
  show `"CASOS ABIERTOS: 15"` as one tight inline pair on the card's *left* side — changed to
  `justify-content: flex-start` with a small gap. Also added `text-transform: uppercase` and a
  `::after { content: ":" }` separator to the metric label, matching the PDF's literal
  `"CASOS ABIERTOS:"` text (was rendering sentence-case with no colon).

- **MetricCard** (PDF p.11, "Metric card") — user reported 3 issues, all confirmed real: (1) card
  widths varying in Storybook (no explicit width at all, only `min-height: 66px` — 5th confirmed
  case of the fixed-size pattern, this time surfacing via CSS-grid track auto-sizing rather than
  `fit-content` directly); fixed to `width/height: 113×91px` reporting, `83×55px` ficha (PDF vector
  bboxes, all 4 reporting examples and all 3 ficha examples are each internally identical in size).
  (2) `appearance="ficha"` nearly invisible next to `"reporting"` — it has no background of its
  own by design ("sin fondo, respeta el fondo de la ficha que lo contiene"), and the `Scales` story
  demoed it with nothing behind it; added a dark panel wrapper around just that example, matching
  the PDF's own illustration. Also fixed the label font-size (6px→8px, a delta this spec had
  already flagged as unresolved before today) and the story's missing dark decorator (same
  Storybook bug as `Empty`/`ChartCard`, this time also making the utility icons' `#c1c1c1` stroke
  blend into the card). (3) missing edit/delete utility buttons — the PDF vector path shows pencil/
  trash icon paths inside all 4 reporting example cards, none inside the 3 ficha tiles. Added a
  `utilities` prop structurally identical to `InvestigationCard.utilities` (same SVG assets, same
  order/metadata pattern), gated to `appearance === "reporting"` per that evidence.
  **Second-round review same day** caught two things the first pass got wrong: the `Scales`
  ("Reporting vs Ficha") story's own "Reporting" example never got `utilities` added (only `Tones`
  did — inconsistent, fixed). And the ficha fix actually *broke* the tile ("se ve roto", not just
  "hard to see") — a fixed `height: 55px` (from the same PDF bbox) overflowed once combined with
  the already-correct padding/gap/font-sizes, and the ficha label was still inheriting reporting's
  extreme `letter-spacing: 0.41em` ("Inteletrado 410" — the PDF legend states that only for
  reporting's title, not ficha's), which alone made "HECTOPASCALES" too wide for the 83px tile and
  clipped. Fixed by reverting ficha's height to `auto` (kept only the width fix, which is what the
  user actually reported as inconsistent) and setting the ficha label's letter-spacing to none.
  **Third-round review same day**, three more: (1) reporting's own fixed height (91px) had the
  same overflow problem ficha's did — reverted to `auto` too, same reasoning. (2) The 20%-opacity
  fill was invisible because the Storybook decorator's backdrop (`--ds-color-pdf-surface`,
  #060606) was literally the same color the fill is built from — `rgb(6 6 6 / 0.2)` over a #060606
  backdrop composites back to exactly #060606, mathematically indistinguishable from no background
  at all. Changed the decorator to `--ds-color-pdf-surface-warm` (#2a2927) so the darkening is
  visible. (3) A genuine CSS grid bug: `.ds-metric--with-utilities`'s `padding-right: 32px` had
  zero effect on the implicit grid column's computed width (confirmed via `getComputedStyle` —
  the property read back as `32px`, but `gridTemplateColumns` didn't shrink), so a long
  single-word label ("HECTOPASCALES", nothing to wrap at) still ran under the utility icons.
  Fixed by making the single column explicit (`grid-template-columns: minmax(0, 1fr)`), which is
  what actually made the padding take effect, plus `overflow-wrap: break-word` on the label as a
  second line of defense for any label long enough to still need it.
  **Fourth-round request same day** was data, not CSS: the `Scales` story's demo data mixed three
  different metrics from the same PDF section ("Hectopascales" as the label — that's actually the
  *reference* field for "Humedad" — plus a value and reference belonging to yet other metrics on
  that page). Swapped in the PDF's real, single "Humedad 87% Hectopascales" example on both sides
  of the comparison — also sidesteps the overlap risk structurally, since "Humedad" is short
  enough to never need any of the CSS fixes above to stay clear of the utility icons.

- **Asistente** (PDF p.12 / `doc[11]`, "ASISTENTE") — this was the `component-roadmap.md`-flagged
  "Asistente 774px — second sizing pass, deferred twice" issue, now closed. Every single dimension
  in `.ds-asistente*` (shell 774×208, mic 36×20/svg 28×20, attach-plus 11×11, execute button
  135×25 + its `right`/`bottom` offsets, all five font-sizes, all absolute-position offsets,
  suggestions `gap`/`margin`/`padding`) was the *raw* @2× PDF pt value used directly as px, with
  zero ÷2 applied — unlike every other component in this pass. Proven conclusively by cross-
  checking `page.get_drawings()`/`page.get_text("dict")` on `doc[11]` (confirmed @2× via
  `page.mediabox` = 1920×1080) against the current CSS: e.g. shell vector rect measured
  774.4×207.7pt, current CSS was `774×208px` — a near-exact 1:1 match to the *unhalved* number,
  repeated across every single measured value (execute button 134.7×24.5pt vs CSS `135×25px`,
  attach-plus lines 11.2×11.2pt vs CSS `11×11px`, suggestions margin-top 22.2pt vs CSS `22px`,
  etc.) This spec's own previous "Deltas" section had already flagged this as a known, deliberately
  unfixed bug ("carried forward on purpose... pending a future dedicated calibration pass") — this
  was that pass. Halved everything; verified in Storybook (`Default`, `Playground`, typed-text
  `:not(:placeholder-shown)` state) before commit. See the new reusable-technique note below on
  telling real vector/glyph geometry apart from a prose legend when both are on the same page.

- **SideBar** (PDF p.13 / `doc[12]`, "SIDE BAR") — user-reported: item grouping was wrong. The
  story's demo data put everything except "Catástrofes" into `items` (one undifferentiated top
  list), and modeled "Catástrofes" alone as a `secondaryItems` entry with `status: "EN VIVO"`
  instead of a plain nav item. `SideBar.tsx` itself already supported the real primary/secondary
  split correctly (`items` top-anchored, `secondaryItems` — only the demo data was wrong). Fixed via
  `page.get_text("dict")` on `doc[12]`, which gives the unambiguous real stacking order: `items` =
  Mis tareas/Historial/Reportes/Catástrofes; `secondaryItems` = Notificaciones/Mi cuenta/
  Configuración/Ayuda/Cerrar sesión. Anchoring the bottom group required two more fixes: (1)
  `.ds-sidebar__secondary` was `margin-top: 12px` (not `auto`), so it never actually reached the
  panel's bottom edge — changed to `margin-top: auto`; (2) the Storybook decorator wrapping div
  had no `display: flex`, so `.ds-sidebar-shell`'s `height: 100%` (needed for the nav to fill the
  decorator's fixed height, which `margin-top: auto` needs somewhere to push against) resolved to
  auto/content-size instead — added `display: "flex"` to the decorator. Also fixed the same `pt`-
  instead-of-`px` unit bug (see the carried-forward finding below) on all 5 of this component's
  `font-size` declarations, and repositioned the notification badge: it was a same-row trailing
  pill (rendered after the label, hidden entirely when collapsed) but PDF vector measurement shows
  it's actually a corner accent centered on the icon's own top-right corner, present in **both**
  the expanded and collapsed columns — moved it inside `.ds-sidebar__item-icon` in the JSX and made
  it `position: absolute; top: 0; right: 0; transform: translate(50%, -50%)`.
  **New discovery, left unbuilt:** the PDF page also has a completely separate "Navegación
  secundaria" rail (6 icons — buscar/crop/compartir/intercambiar/editar/ajustes — on a `#2a2927`
  background) drawn to the right of the SideBar mockups. A previous pass had misattributed that
  `#2a2927` legend line to `.ds-sidebar__secondary` (removed a background+padding that didn't
  belong there — see the lesson below). No component/pattern in the kit implements this rail yet;
  flagged as backlog, not built.
  **Same-day follow-up (user-reported):** "Menú" was a non-interactive `<div>` — user wanted it to
  be a real button too, plus a hover highlight generally (there was none anywhere in this
  component before). Made the primary `.ds-sidebar__menu-heading` a `<button>` wired to the
  existing `onToggleCollapsed` (hamburger = toggle-nav convention; no new prop). Added `:hover`
  backgrounds to items and the new button. Doing this surfaced a real, unrelated bug: collapsed
  mode was hiding `.ds-sidebar__menu-heading-icon` entirely, so the new button had nothing visible
  once collapsed — but PDF's own Colapsada column shows the hamburger icon present, centered like
  every other row. Fixed the hide-list and centering to match.
  **Second same-day follow-up (user-reported):** the selected item's white accent line sat visibly
  inset from the sidebar's own edge — `.ds-sidebar{padding: 10px}` was pushing every row inward.
  Moved the horizontal inset off the container and onto each row instead (`padding: 10px 0` on the
  nav; `padding: 4px 16px` on items and the menu-heading button, up from `4px 6px`; new
  `padding-inline: 10px` on the header for the logo). Inset-preserving by construction — icon/label
  screen position doesn't move, only the row's own background/accent now reaches the true edge.
  Collapsed mode needed no change (centered icons land in the same spot regardless of padding).
  **Third same-day follow-up (user-reported):** wanted the selected item's label + icon painted
  white too. `getComputedStyle()` in a live tab showed the label was ALREADY `rgb(255,255,255)` for
  every row, selected or not (a hardcoded, unconditional white), and the icon had `filter: none`
  regardless of selection. PDF legend's «Iconos: #8a8b87 / Icono seleccionado: #FFFFFF» implies a
  real default/selected split was intended. Changed the label's base color to
  `--ds-color-pdf-ink-muted` (white only when selected) and added `filter: brightness(0) invert(1)`
  on the selected item's icon — **this required correcting a prior wrong Known Limitation**: a
  previous pass assumed the shared icon assets were "flat multi-color `<img>`, not tintable," but
  checking the actual SVG source (`Icons/Menu/*-50x50.svg`, `Modules/Catastrofes-180x180.svg`) shows
  every one is genuinely monochrome (single fill/stroke color per file) — the invert-filter trick
  works reliably on all of them. Also removed the `caption: "Bandeja operativa"` demo prop from
  "Mis tareas" (user: "se sale de tono con los demás" — it was the only item with a subtitle).
  **Lesson:** a documented "Known Limitation" is a claim made at some point in time, not a
  permanent fact — when a fix seems blocked by one, check the actual asset/source before assuming
  it still holds, the same way memory/spec claims get re-verified before being relied on.

- **Skeleton** (PDF p.14 / `doc[13]`, "SKELETON") — first component in this pass with **zero code
  changes**: confirmed via `page.get_drawings()`/`page.get_text("dict")` that every already-
  documented value is exact. Fill color: legend text says «Recuadros: #2a2927», and independently
  every recuadro shape's own `get_drawings()` fill is `(0.165, 0.161, 0.153)` → `#2a2927` to the
  pixel — matches `--ds-color-pdf-surface-warm` with no delta. «Fondo: #2a2927 - 70% de opacidad» is
  (correctly) not painted by `.ds-skeleton` itself — it's parent responsibility, already documented,
  and already exercised in `ComposedOnFondo`'s wrapper. None of the three recurring bugs from this
  session applied: no `font-size` declarations exist at all (component has no text nodes, so the
  `pt`-vs-`px` bug is structurally impossible here); no default `width`/`max-width` exists to trigger
  the `fit-content` bug (dimensions are 100% consumer-supplied, by design); and the Storybook
  decorator already used an opaque dark background distinct from the component's own translucent
  parent-wash token (`--ds-color-pdf-surface` outer vs `--ds-color-pdf-surface-warm-a70` inner in
  `ComposedOnFondo`) — the same fix other components needed was already in place here, likely
  because `.ds-skeleton`'s own fill is solid/opaque (only the *parent* wash token is translucent, and
  that's explicitly not drawn by the component). The PDF's illustrative two-card composition mockup
  (measured: see `Skeleton.spec.md` § Deltas for exact px) was **not** adopted as literal default
  sizes — same "diagram ≠ asset spec" caveat as the ModuleCard icon lesson, and the component doc
  already flagged recuadro sizes as intentionally unspecified. Verified visually in Storybook
  (`Playground`, `Rect`, `Circle`, `ComposedOnFondo`) — solid fill, pill-radius circle, opacity-pulse
  animation all render as documented against the opaque decorator.

- **CalendarCard** (PDF p.15 / `doc[14]`, "CALENDAR CARD") — 4 real, measured deltas fixed via
  `page.get_drawings()`/`page.get_text("dict")` on `doc[14]`: (1) the carried-forward `pt`-vs-`px`
  bug, confirmed here too (`font-size: 15pt`/`6pt` on day/month/description, rendering ~33%
  oversized — `getComputedStyle` showed `15pt` computing to `20px`); (2) `max-width: 140px`
  (unmeasured, reused from `.ds-task--kanban`) replaced with `width: 72px` — the PDF's own vector
  draws this card as a literal square, bbox 144.02×144.02pt @2× ÷2 = 72.01px; the old `max-width`
  combined with the story decorator's `width: fit-content` let the card shrink to ~59px in
  `WithoutDescription` (confirmed via `getComputedStyle` before the fix), the same recurring
  fit-content bug as TaskCard/InvestigationCard/ModuleCard/MetricCard. (3) `border-radius` from
  `var(--ds-radius-xs)` (2px, an assumed "same as `.ds-task`" convention) to `0` — this page's own
  vector item is a plain `re` rectangle with zero curve segments, i.e. the PDF draws square corners
  here, unlike `.ds-task`'s own page which does draw rounded ones. (4) root gap from
  `--ds-space-2` (8px, provisional) to `--ds-space-1` (4px), derived indirectly from glyph-bbox
  deltas between the date block and description (7.30pt @2× ÷2 ≈ 3.65px) — cross-checked for
  plausibility against the day→month baseline gap (30.18pt vs 30pt font-size, ratio 1.006,
  confirming bboxes track this font's real typography tightly) before trusting the smaller,
  indirectly-derived number. **Left unresolved on purpose:** the description's measured line-height
  ratio (~1.167 from bbox baselines) vs the shared `--ds-leading-body` token (1.45) — a real ~24%
  gap, but that token is consumed by several already-reviewed components, so a single page's
  evidence isn't enough to justify overriding it here alone; flagged for a dedicated calibration
  pass instead (see `Empty` pt-bug precedent — some findings are correctly deferred, not force-fit
  into the current component's fix).

- **Empty** (PDF p.16 / `doc[15]`, "EMPTY") — triggered by two user-reported visual issues, both
  confirmed real via `page.get_drawings()`/`page.get_text("dict")` on `doc[15]`: (1) "el ícono está
  con un fondo redondo gris" — `.ds-empty__icon` had no `border-radius` (square well), but this
  page's own vector for the icon well is a closed path of **4 `c` (curve) segments with zero
  straight edges** on both demo instances, i.e. a literal circle. Fixed to
  `border-radius: var(--ds-radius-pill)`. (2) "Título y texto están más juntos en el PDF" —
  confirmed by glyph-bbox deltas: title-bottom→description-top measures **≈ −1.9pt @2×** on both
  demos (bboxes essentially touching, no visible gap beyond normal line leading), while the
  component had a uniform `gap: 8px` applying equally between every element. Replaced that single
  `gap` with per-element margins reflecting the PDF's three very different measured gaps:
  icon→title ≈21.7px avg (`--ds-space-5`, 20px), title→description ≈0px (no margin at all), and
  description→action ≈25.85px avg (`--ds-space-6`, 24px) — the last one added a
  `.ds-empty__title + .ds-empty__action` fallback rule for the title-then-action-with-no-description
  case. Also closed the last remaining carried-forward `pt`-vs-`px` bug on `.ds-empty__title`/
  `.ds-empty__description` (`8pt`/`7pt` → `8px`/`7px`). **Not fully resolved:** the
  description→action gap disagrees by ~40% between the PDF's own two demo instances (30.05px vs
  21.65px) — used the average, flagged as a real source-file inconsistency in the spec rather than
  a measurement artifact worth chasing further.

## Carried-forward finding (not yet fixed anywhere)

**CSS `pt`-instead-of-`px` unit bug**, found while fixing InvestigationCard — all components this
pass has touched so far had it (`InvestigationCard`, `SideBar`, `CalendarCard`, `Empty`); none
remain flagged in the current backlog below. If a new one turns up on a later component,
`grep -n "[0-9]pt;" packages/ui/src/styles.css` finds it fast — the number is usually already right
(someone did the ÷2 math correctly), only the CSS unit is wrong (1pt = 1.333px, not 1px).

**Storybook missing-dark-decorator bug** (2nd+3rd confirmed occurrence after `Empty`, which was
already fixed before this pass started): any component whose own background is *translucent*
(not fully opaque) needs its story to set an explicit dark `background` on its decorator, because
the Storybook `backgrounds` addon isn't registered (`packages/ui/.storybook/main.ts` has
`addons: []`) — `parameters.backgrounds` in a story has zero effect. `ChartCard` family had this.
Check any remaining backlog item whose CSS background uses an alpha value (`rgb(... / 0.NN)` or a
named token ending in `-aNN`) for the same gap before assuming its Storybook rendering reflects
the real component.

## Backlog — components (finish these before moving to patterns)

In roughly PDF page order (per `knowledge/component-roadmap.md`'s gap table — confirm exact page
index with PyMuPDF before trusting it, page numbers there are 1-indexed "p.N" labels, not raw
`doc[i]` indices):

- **Form** — PDF p.17. `component-roadmap.md` flags this page's spec as looking like an unfinished
  placeholder (near-identical to Empty's spec block, no field list/layout/validation) — no
  dedicated `Form` component exists. Probably not a fidelity-pass target; confirm the real spec
  with design before building anything here, don't invent a Form component from a placeholder page.
- **AlertBanner** — PDF p.18 ("Alert"). Uncertain whether this is meant to follow the PDF's `@2×
  ÷2` pixel calibration at all — `specs/README.md`'s scale-calibration section lists `.ds-alert` as
  a "teal/console" component explicitly **out of scope** for that rule (rem-based instead). Check
  this classification first before assuming a fidelity pass here even applies the same way it did
  for TaskCard/InvestigationCard.

**Explicitly out of scope for this pass** (per `specs/README.md`'s own scale-calibration section):
`Button`, `Badge`, `Card`, `Switch`, `SegmentedControl`, `DataTable`, base `TextField`/`SelectField`
— these are "teal/console" components on the display-scale `rem` convention, not the PDF's literal
`@2×` artboard convention. A fidelity pass against the PDF doesn't apply to them the same way
(there may still be bugs, just not "measured wrong against a PDF page"). **`ProgressRing` is now a
partial exception** (2026-08-06): its default `variant="console"` render is still out of scope for
the same reason as the components above, but `variant="pdf"` (now the *default* value of that prop)
is in scope and has its own PDF citation (p.9 "Torta") — see the "New components built" entry above
and `ProgressRing.spec.md`.

## Backlog — patterns (after all components above are done)

- **DetailSheet** (`packages/ui/src/patterns/detail-sheet/`) — PDF "Ficha", p.5
- `packages/ui/src/patterns/login/`, `packages/ui/src/patterns/mission/` — not yet checked against
  the PDF for an existing spec page; confirm whether either has one before assuming this pass
  covers them the same way.

**Process note (2026-08-05):** wait for the user to actually look at Storybook and say go-ahead
before committing/pushing a fix — don't push right after a build+screenshot check on my own.
ModuleCard's icon-size mistake (below) shipped in the same commit as the good fixes because I
pushed before she'd reviewed it; she caught it visually afterward. Verifying in Storybook myself is
necessary but not sufficient — it doesn't replace her actually looking at it before it goes to
`eval-loop`.

**Lesson: a PDF reference/annotation diagram is not always drawn at the same scale as the real
asset it's illustrating.** ModuleCard's icon was "fixed" from 90×90px to 36×36px based on measuring
the small shield icon in the PDF's own "PROCESOS POLICIALES" callout diagram (~71.6×70.9pt @2×) —
wrong: that diagram is a shrunk illustration, not 1:1 with the real icon assets. The real SVGs
(`packages/ui/src/Icons/Modules/*-180x180.svg`) declare `viewBox="0 0 180 180"`, an unambiguous,
asset-declared @2× size that confirms the original 90px was already correct. **When a component
has real, named/declared assets (SVG viewBox, filename with dimensions, etc.), check those FIRST
and treat them as higher-confidence than a small illustrative diagram inside the PDF** — the PDF's
vector/text data is the right source of truth for layout, color, and spacing that has no other
declared source, but for an icon/asset's own size, the asset itself outranks a miniature drawing of
it.

## Reusable technique notes for next session

- `pdftoppm`/poppler isn't installed on this machine — use PyMuPDF (`import fitz`) instead, it's
  already available and gives *exact* vector coordinates and text-spans, no screenshot estimation
  needed. `python -m pip --version` confirms Python 3.14 + pip are set up.
- The PDF is `knowledge/references/design-reference.pdf`, an `@2×` artboard (1920×1080 = 2×
  960×540) — `page.get_drawings()` and `page.get_text("dict")` return coordinates/sizes directly in
  that `@2×` space; the repo's own ÷2 rule (`specs/README.md`) converts to display px.
- `width: fit-content` + `max-width: Npx` was the recurring root cause of "it got narrow/short
  again" across both components done so far — it lets a component shrink below its own calibrated
  size whenever the content doesn't need the full width. The fix each time: a definite `width: Npx`
  per variant instead, not `max-width` + `fit-content`. Check for this pattern first in any
  component that looks smaller/more cramped than the PDF.
- `clip-path` on an element clips its entire rendering subtree, pseudo-elements included — don't
  put a shape-cutting `clip-path` on the same element that also needs an un-clipped `::before`/
  `::after` for something like a floating accent; split them into separate layered elements.
- Some PDF pages don't extract cleanly — page index 8 ("GRAFICOS") returned duplicated text spans
  at identical coordinates with different colors, plus content from what looks like an unrelated
  dashboard mockup mixed into the same coordinate range as the small reference diagram. If
  `get_drawings()`/`get_text()` output looks unexpectedly large or duplicated for a page, don't
  force a clean read — cross-check against the user's own screenshot (legend text is usually
  readable directly) rather than trusting noisy extracted data.
- **Fixing `width` from a PDF bbox is low-risk; fixing `height` from one is not.** A too-narrow
  fixed width just wraps text — cosmetic. A too-short fixed height, once combined with already-
  correct padding/gap/font-sizes, can genuinely overflow/clip content (MetricCard ficha, 2026-08-
  05: measured 55px directly from the bbox, but label+value+change needed ~55px on their own,
  before padding). Before fixing a height from a raw PDF measurement, add up the actual
  padding+gaps+line-heights that will sit inside it and check they fit — or default to `height:
  auto` and only fix `width`, especially for anything with more than one text row.
- **Letter-spacing/tracking figures in this PDF's legends are per-role, not global.** The
  "Interletrado 410" tracking value shows up next to specific title specs (e.g. reporting's Source
  Code title) but is silently absent from others (e.g. the same page's ficha title, a different
  font). Don't let a CSS rule for one role's tracking leak into a sibling role via inheritance —
  check whether the legend actually repeats the tracking figure for each role or only states it
  once.
- **A translucent-fill token is only visible if the demo backdrop differs from the color the fill
  itself is built from.** `rgb(6 6 6 / 0.2)` (20%-opacity `--ds-color-pdf-surface`) composited over
  a `--ds-color-pdf-surface` backdrop resolves back to `--ds-color-pdf-surface` exactly — a
  perfectly faithful implementation of "X at 20% opacity" can still look like "no background at
  all" if the demo happens to put it on top of X itself. When adding a dark decorator for a
  translucent-background component, don't reflexively reach for the same dark token the component
  fill uses (`--ds-color-pdf-surface`) — pick a *different* dark tone (e.g.
  `--ds-color-pdf-surface-warm`) so the translucency has something to visibly darken.
- **When a page has both a prose "legend" (design notes in plain text) and real vector/glyph
  geometry, trust the vector/glyph geometry — the legend can use unit labels loosely.** Asistente's
  page had a legend note reading "Padding: 20px 30px" alongside "Borde 0,75pt" and "Saludo ...
  24pt" — different unit words for values on the same page. Cross-checking the padding number
  against the actual measured vector offset (prompt text sits 33.5pt @2× from the shell's left
  edge, i.e. ~16.75px once halved — nowhere near the legend's "30px") showed the legend's "px"
  label didn't mean "already display-scale"; it was just as much a raw @2× number as everything
  else on the page. Don't let a legend's stated unit override what `get_drawings()`/`get_text()`
  actually measures — when they disagree, the geometry wins, same as the ModuleCard icon lesson
  below (declared/measured source of truth beats an annotation drawn or labeled loosely).
- **A PDF page can contain more than one diagram, and a legend line near the one you're fixing may
  belong to a totally different one.** SideBar's page (p.13) has the Desplegada/Colapsada mockups
  AND a separate, unrelated 6-icon "secondary nav rail" drawn further right, both sharing the same
  page. A previous pass read the legend line "Navegación secundaria: fondo #2a2927" as describing
  SideBar's own bottom item group and gave `.ds-sidebar__secondary` that background — wrong: the
  actual `#2a2927` background rect (`get_drawings()`, rect x=681.5–813.1) and that legend's own
  leader line (`get_drawings()`, segment at x=825.6–888.1) both sit well outside the SideBar mockup
  entirely, wrapped around a distinct icon cluster (search/crop/share/exchange/edit/sliders) that
  isn't part of SideBar at all. Proximity on the page is not evidence of association — check the
  leader-line vector (or the colored background rect's actual bounds) before attributing a legend
  line to the component you're currently fixing, especially on a page with multiple diagrams.
- **`display: grid` with no explicit `grid-template-columns` can silently ignore asymmetric
  padding overrides.** Overriding just `padding-right` on a variant class had zero effect on an
  implicit single auto-column's computed width (confirmed via `getComputedStyle().
  gridTemplateColumns` staying the same regardless) — the padding property itself read back
  correctly, it just didn't feed into the column-sizing algorithm as expected. Making the column
  explicit (`grid-template-columns: minmax(0, 1fr)`) fixed it immediately. If a padding/width
  override on a `display: grid` element with implicit columns doesn't seem to take effect
  visually, check `getComputedStyle().gridTemplateColumns` before assuming the padding itself is
  wrong — it may be applied correctly and just not doing anything.
