# Fidelity pass — next steps

## 🚨 Session handoff — pick up here (2026-08-13, TOP PRIORITY, supersedes everything below)

**Open design question, unresolved — code is back to baseline (÷2), don't assume
otherwise.** Luna reported `CargaDeFormulario`'s text is too small to read.
Measured live: labels 5px, field values 8px, descriptions 6px — real numbers.
Traced to `knowledge/specs/README.md`'s "Scale calibration" rule (`display px =
PDF annotation ÷ 2`), applied via every `/* calibrated ÷2 */` comment across
**the entire kit**. That rule assumed the PDF is a "@2× artboard" (1920×1080 =
2×960×540) — never confirmed with the designer, only assumed at project start.

**Round 1 — confirmed the canvas size, tried removing the ÷2 entirely, got
rejected on sight.** Asked Luna to confirm the real artboard size before
touching anything; she confirmed directly with the designer: **the canvas is
1920×1080 real**, not a 2× export. So `display px = PDF annotation` (no
division) seemed like the fix. Applied it to the `FormTextInput`/`FormSelect`/
`FormCheckable`(+`Group`)/`FormFileUpload`/`FormDatePicker` family (only
consumer: `CargaDeFormulario`) — fonts went from 5-8px to 10-20px, verified live
via `getComputedStyle`, no overflow at 1920px viewport. **Luna looked at it in
her own Storybook and rejected it**: "se ve enorme y solapado todo... se veían
visualmente más fieles antes de multiplicar x2" (screenshot showed real
overlap: "ACCESO A MÓDULOS" text over the switch labels, FormFileUpload
thumbnails spilling into the neighboring column). **Reverted immediately** via
`git checkout --` (nothing had been committed yet) — `packages/ui/src/styles.css`
and `carga-de-formulario.css` are back to the pre-session ÷2 state, no net
code change from before this session.

**Why "confirmed 1920×1080 canvas" didn't settle it:** knowing the canvas's own
pixel dimensions doesn't tell you the *viewing* assumption baked into it. A
1920px-wide frame authored assuming a HiDPI/Retina display (2x OS scaling)
would need roughly the same ÷2 step to land at a sane CSS px size — "the
designer confirmed 1920×1080" resolves the canvas size, not the canvas→CSS-px
ratio, which is a separate, still-unconfirmed variable. Luna's live visual
judgment (rejecting the un-halved result) is the strongest signal available
right now, and it points toward the *opposite* conclusion from round 1's
literal-pixel-math.

**Where this stands — DO NOT re-attempt "no division" on any other component
without a fresh explicit decision from Luna.** She was offered (and didn't take,
preferring to keep thinking about a unified ratio first) a smaller/safer
middle path: a **minimum legibility floor on text only** (e.g. 11–12px),
applied just where the existing ÷2 font-size falls below it, leaving every
other dimension (component sizes, paddings, icon sizes) at the ÷2 values that
already look right. That's still on the table if she comes back to it.

**Next up:** whatever Luna decides about the ratio question — could be the
legibility-floor path above, a different explicit ratio she settles on (with or
without the designer's further input on the *viewing* assumption, not just the
canvas size), or something else entirely. Don't restart the "double everything"
approach on another component on your own judgment — this needs her sign-off
given round 1's result. Full reasoning trail: `DECISIONS.md` 2026-08-13,
2 entries under `fix-009-scale-calibration-correction` (round 1 doubling +
round 2 rejection/revert).

## 💡 Idea a evaluar, no decidida (2026-08-11): pilotear el modelo Fable

Luna sugirió probar el modelo Fable (Claude 5 family, `claude-fable-5`) para el
fidelity-pass, recomendado por terceros como más fuerte en trabajo visual/UI. Sin
datos propios sobre eso todavía — no adoptar a ciegas (mismo criterio que esta sesión
ya aplicó al ancho de panel/color de botón: verificar antes de asumir).

**Contexto real de esta sesión (004-familia-tareas):** los bugs de fidelidad que
importaron hoy (ancho del panel de `DetailSheet`, color/tamaño del botón "VER MÁS",
colores de `DECISIÓN A/B/C`) se resolvieron con `PyMuPDF` (`get_drawings()`/
`get_text()`) comparado contra el CSS — scripting + disciplina de chequear la fuente,
no percepción visual del modelo. Ese cuello de botella es agnóstico de qué modelo lo
corre.

**Recomendación, si se prueba:** pilotear en 2-3 componentes ya cerrados con
correcciones conocidas (ej. `DonutChartCard`/`ProgressRing` de Home, ver
`DECISIONS.md` 2026-08-11) — comparar qué encuentra Fable contra lo que ya se sabe que
estaba mal, antes de comprometer un pase completo del kit a un modelo sin track record
en este proyecto todavía.

## 🔖 Session handoff — pick up here (last updated 2026-08-10)

**Parte 1 of `handoffs/20260807-fase5-checkables-geometry-screens-draft.md` closed:**
geometry-only re-pass (position/size/order, not color — same method that found
`FormCheckable`'s 3 bugs) of the other 5 `001-form-modal` components against
`design-reference.pdf` p.17–22, via fresh `page.get_drawings()`/`get_text("dict")`/
`get_pixmap()` measurements (not reused from the 2026-08-07 pass, which explicitly only
checked color). Found real geometry bugs on **every one of the 5 components** — see "Full
PyMuPDF geometry sweep of p.17–22 (2026-08-10)" below for the full detail per component.
Highest-impact finding: `FormTextInput`'s "activo" label was floating to the top of the
control (`top: 8px`) instead of staying vertically centered and becoming an inline prefix
+ divisor before the value — a real interaction-model bug, not just a wrong number, and it
cascaded into `FormSelect`/`FormDatePicker` since both reuse the same shared
`.ds-form-field__control`/`__label` CSS. Fixed by converting `.ds-form-field__control` to
`display: flex` (label `order: -1`) instead of absolute positioning. All fixes verified live
in Storybook via `getComputedStyle()`/`getBoundingClientRect()` (screenshots are unavailable
in this environment's Browser pane — see the "not compositing frames" note further down);
not yet reviewed by Luna in her own Storybook tab — **wait for her go-ahead before
committing/pushing**, same process rule as every prior pass.

## 🔖 Previous handoff (2026-08-07)

**PDF updated to v3 same day (2026-08-07, 24 pages) — Form and Modal built.** Feature
`001-form-modal` (see `specs/001-form-modal/`) built the 6 components v3 added real specs
for: `FormTextInput`, `FormSelect`, `FormCheckable`, `FormFileUpload`, `FormDatePicker`
(PDF p.17–21, replacing the old p.17 placeholder closed below as "not ready") and `Modal`
(PDF p.22 "ALERT" § "Confirmación de acción", resolving the Modal/Dialog gap from the
2026-07-22 eval baseline). See "New components built (PDF v3, 2026-08-07)" further down for
the fidelity detail on each, and `specs/001-form-modal/plan.md` for the architecture
decision (field primitives, not a compound `Form`).

**Environment note, corrects the earlier "pdftoppm not installed" dead-end below:**
`pdftoppm`/poppler is still not installed, but `page.get_pixmap()` (PyMuPDF, already
available — same library this whole pass already used for `get_drawings()`/`get_text()`)
renders a PDF page to a real image with zero extra dependencies. Use that, not `pdftoppm`,
whenever a page needs to be *seen* rather than just measured — it's what resolved the
FormDatePicker p.21 grid/hour-range ambiguity in this session (see below) after the text
extract alone left it unresolved.

## 🔖 Previous handoff (2026-08-06, evening)

**Status: all *components* are now closed** — either fidelity-passed (`Skeleton`, `CalendarCard`,
`Empty`, `TaskCard`/`InvestigationCard`/`ChartCard` family/`ModuleCard`/`MetricCard`/`Asistente`/
`SideBar`) or confirmed out of scope / not yet buildable (`Form`, `AlertBanner`). **Patterns work
has started: `login` is done** (see "Done — patterns" below) — `detail-sheet`/`mission` remain.
Earlier today's
page-by-page PDF check turned up a real **coverage gap** (not a fidelity bug) — GRAFICOS p.9 had
3 chart types nothing in the kit rendered — and it's now closed: new `LinearBarChartCard` +
`ProgressRing` `variant="pdf"` (now the default). Both went through 2 rounds of user review/fixes
in Storybook before commit — see "New components built" right below for the specifics.
**Everything described in this file is already committed and pushed to `eval-loop`**
(`git log --oneline -3` to confirm before starting new work).

**Full-PDF sweep done this session (all 18 pages, `doc[0]`–`doc[17]`, cross-checked against
`component-roadmap.md`'s gap table):** confirmed titles/mapping for every page already in the
table (re-verified p.3/p.4/p.5/p.10/p.11 with proper reading-order blocks — `TARJETAS`/
`INVESTIGATION CARD`/`FICHAS`/`GRAFICOS`/`METRIC CARD`, all correct, no more p.9-style
mismappings). Found **one real gap the table doesn't list at all**: p.7 (`doc[6]`) — see
"New finding" below. p.8 "ICONOS" confirmed as a reference/legend page, not a component. No other
gaps found — the sweep is done, don't re-run it from scratch next session.

**New finding (2026-08-06): p.7 has a real, uncited spec page — corrected same day.** First read
of `get_text()` (unordered) mis-cited this page as "INGRESAR" — that's actually just the button
label drawn on the mockup, not the page title. Re-read with position-sorted blocks: the real title
is **"MÓDULOS"**, subtitle **"De loguin"** — p.7 is a *second* "MÓDULOS" page, sharing that section
title with p.6 (the already-built `ModuleCard` page) the same way GRAFICOS p.9/p.10 share theirs.
Real measurements from `doc[6]`: Fondo `#060606`, Borde `0,75pt - #c1c1c1`, Padding `20px` (legend
value; real vector geometry measures a symmetric ~23.07pt @2× card-to-content inset, not exactly
20pt — see the fix below), Input Source Code Light 20pt padding 10px fondo `#2a2927`, Círculos
patrón `45pxX45px - #2a2927`, Botón Montserrat Bold 18pt `#FFFFFF` padding top/bottom 10px
left/right 120px fondo `#494949`. This resolves the open question in "Backlog — patterns" below
about `packages/ui/src/patterns/login/` — it **does** have a citable PDF page, unlike `mission`
(still unconfirmed). **Fidelity-checked the same day** — see "Done — patterns" below.

**Also noted for later, not acted on:** p.18 "ALERT" text is sparse (`get_text()` alone looks like
just two example strings + boilerplate description text duplicated from p.8) but `get_drawings()`
shows a real visual spec: two stacked bars, `#494949` fill / `#060606` border, ~42.6pt @2× (~21px)
tall each, ~36pt @2× gap between them; category line white 20pt @2× (~10px), message line red
`#ff0000` 20pt @2× (~10px). Useful once the `.ds-alert` scope question (item 2 below) is resolved
either way — if it turns out to be in scope for the `@2× ÷2` treatment, these are the real numbers
to check against, not just the sparse text.

**Next up, in order** (see "Backlog — components" further down for full detail on each):
1. ~~**Form** (PDF p.17)~~ — **closed 2026-08-06, confirmed not a build target yet, no code
   change.** User confirmed directly: the designer is still actively working on this spec — the
   placeholder-looking p.17 block (near-identical to Empty's) isn't a documentation gap on our
   side, it's genuinely unfinished upstream. Nothing to build against yet; re-check with design
   once a real Form spec lands, don't infer an API from the current placeholder page.
2. ~~**AlertBanner** (PDF p.18, "Alert")~~ — **closed 2026-08-06, confirmed out of scope, no code
   change.** `.ds-alert` is named explicitly in `specs/README.md`'s scale-calibration section as a
   teal/console component, out of scope for the `@2× ÷2` rule, same bucket as `Button`/`Badge`/
   `Card`. User confirmed: not pursuing the PDF's p.18 bar as a fidelity target for this component.
   Real mismatch noted for the record (not actioned): the PDF's p.18 "ALERT" is a full-width flat
   dark bar with centered uppercase text (no card/icon/rounded-corner treatment) — visually
   unlike `.ds-alert`'s rounded icon-card-with-accent-border shape. See `AlertBanner.spec.md`'s
   Deltas section for the exact measurements if this ever gets revisited as a *new* component
   instead of a fix to the existing one.
**All components are now done or confirmed out of scope. Patterns are next** (per the 2026-08-05
decision below): `login` is done (2026-08-06, see "Done — patterns"); `detail-sheet` (PDF "Ficha",
p.5) and `mission` remain — `mission` still has no confirmed PDF citation, check that fresh.

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

## New components built (PDF v3, 2026-08-07)

Feature `001-form-modal` — 6 components, all built against `knowledge/references/design-reference.pdf` **v3** (24 pages, replacing v2's 18). Full brief/spec/plan/tasks in `specs/001-form-modal/`; brief-level decisions (architecture, scope, out-of-scope items) live there, not repeated here — this section is the fidelity detail per component.

- **FormTextInput** (PDF p.17 "FORM - LOGIN" + p.18 "FORM - INPUT") — one component, two variants
  (`login`/`default`), not two components — p.17 and p.18 are the same input shape (label +
  floating-active state) with different color specs for the login context vs. the generic one.
  Floating label implemented CSS-only via `:not(:placeholder-shown)` (same technique already
  used by `.ds-asistente__prompt`, see the 2026-08-06 Asistente entry above) — no JS state.
  Colors reused existing tokens where the hex matched exactly (`--ds-color-pdf-surface-warm`
  `#2a2927`, `--ds-color-pdf-border` `#606060`, `--ds-color-pdf-critical` `#ff0404`,
  `--ds-color-white`); added 2 new tokens for values that were close-but-different from an
  existing one (`--ds-color-pdf-form-muted` `#8d8d8d`, distinct from `--ds-color-pdf-ink-muted`
  `#8a8b87`) or needed unconditionally (`--ds-color-pdf-ink-bright` `#f6f6f6`,
  `--ds-color-pdf-surface-a50` for "fondo #060606 al 50%"). Verified in a live Storybook tab via
  `javascript_exec`: computed `background`/`border-color`/`color`/`font-size` on both variants
  match the PDF's hex/pt values exactly (see verification notes below on how transitions read in
  a backgrounded tab — false negative, not a real bug).
- **FormSelect** (PDF p.18 § "Para select") — custom listbox, not a native `<select>`: the PDF
  spec ("el desplegable se superpone al input cuando está activo", "al seleccionar una opción el
  desplegable se centra en esa opción") isn't stylable on a native select. Verified open/close
  toggle, option list rendering, and selected-option centering (`scrollIntoView({block:
  "center"})` on open) live in Storybook.
- **FormCheckable** (+ `FormCheckableGroup`, PDF p.19) — one control covers checkbox/radio/switch
  via a `type` prop (shared label/description slots), plus a small `FormCheckableGroup` wrapper
  for the PDF's "Título grupo" (e.g. "ACCESO A MÓDULOS") — not a 7th top-level component, exported
  from the same module as `FormCheckable`. Verified checkbox/radio "seleccionado" (fondo `#ffffff`,
  selector `#060606`) and switch "seleccionado" (fondo `#ffffff`, selector `#060606`) — a real CSS
  bug was caught and fixed before commit: the switch's `:checked` state was inheriting the
  checkbox/radio `::after` dot rule (both used the same undifferentiated selector), painting a dark
  dot inside the switch thumb track that the PDF doesn't show — fixed by scoping the dot rule to
  `--checkbox`/`--radio` only.
- **FormFileUpload** (PDF p.20) — click-to-upload plus basic drag&drop (highlight on drag-over);
  the PDF explicitly leaves the drag&drop interaction unspecified ("escucho sugerencias... mientras
  busco referencias"), so the highlight treatment is a reasonable placeholder, not a measured spec —
  flagged in code comments and `DECISIONS.md`. The "empty superpone al input" behavior (PDF's own
  words) is implemented as an absolutely-positioned overlay that shows whenever there are no files
  OR the zone is being dragged over (so it still surfaces during drag even with files already
  attached) — verified in Storybook.
- **FormDatePicker** (PDF p.21) — **the one component this session's text-only extract couldn't
  resolve** (`pdf-text-extract.md` flagged the day-grid layout and hour range as unreadable from
  `get_text()` alone — two jumbled number blocks with no position data). Resolved by rendering the
  actual page with PyMuPDF's `get_pixmap()` (see handoff note above) plus `get_drawings()` for exact
  geometry. **This changed the implementation meaningfully from a first pass built on the text
  extract alone**, which had (wrongly) assumed one combined trigger and a flat 30-min-step time
  list:
  - Real structure is **2 independent trigger+panel pairs**, "FECHA" and "HORA" — not one combined
    popover. Measured: FECHA trigger 300×30pt @2× → 150×15px, panel 300×202.68pt → 150×101px; HORA
    trigger 200×30pt → 100×15px, panel 200×202.68pt → 100×101px (`get_drawings()` rects, both panels
    bordered `0.75pt` white when active, matching "Borde activo: #ffffff").
  - HORA is a **2-column spinner** (hour / minutes-by-5, e.g. `11 12 13 14 15 16 17` next to
    `55 00 05 10 15 20 25`, separated by `:`), each with up/down chevrons — not a flat `HH:MM` list.
    This is exactly what the text extract's jumbled "14 10 13 05 16 20 17 25 15 15 11 12 55 00"
    block was: two side-by-side text columns with no positional order in the extraction.
  - Selected day gets a literal **border box** (measured 20.28×16.38pt @2× → ~10×8px), not just a
    color change — confirmed via `get_drawings()` (a small white-stroked rect sitting exactly on the
    "20" glyph in the reference render) and matched in code with
    `.ds-form-date__day--selected { border-color: white }`.
  - Month/year each have their own dropdown affordance in the PDF (chevron next to "Julio" and
    "2026" individually) — implemented as native `<select>` elements for month and a ±4-year window
    for year, styled to match rather than built as two more custom listboxes (reasonable
    simplification, not a measured spec point).
  Verified live in Storybook via `javascript_exec`: both triggers render "20/07/2026"/"14:10" for
  the `DiaHoraSeleccionada` story (matches the PDF's own "Julio 2026" / "14:10" example), FECHA
  panel opens at 150px with the "20" cell showing a white border, HORA panel opens at 100px with
  "14" highlighted selected among 36 total spinner values (24 hours + 12 five-minute steps).
- **Modal** (PDF p.22 "ALERT" § "Confirmación de acción") — confirm/cancel dialog only; the same
  page's other two boxes ("Alert Sigcat", "Tarea realizada") are notifications, not dialogs, and
  don't resolve the Modal/Dialog gap this was built for (see `component-roadmap.md`'s post-baseline
  table). Distinct from `AlertBanner` (inline, non-blocking) by design — different component, not a
  variant. Verified in Storybook: fondo `#060606`, borde `#606060`, título `#ffffff` 18pt→9px, texto
  `#c1c1c1` 18pt→9px, línea `#8a8b87`, primary action `#494949` — all exact matches via
  `getComputedStyle`.

**Verification technique note — CSS transitions read as frozen in a backgrounded/non-visible
browser pane.** While spot-checking `FormTextInput`'s floating-label transition via
`javascript_exec`, `getComputedStyle` kept returning the *pre-transition* `font-size`/`top` even
after the triggering `:not(:placeholder-shown)` condition became true (confirmed via `.matches()`)
and after a real `setTimeout` delay. Root cause: the pane wasn't visibly composited
("not compositing frames" — same condition that also breaks `computer` screenshots in this
environment), and a CSS *transition*'s interpolation clock is driven by the compositor, which
never advanced. Non-transitioned properties (`color`, no `transition` declared) updated instantly
and correctly in the same test — confirmed the cascade itself was right by temporarily setting
`element.style.transition = 'none'` and re-reading: target values were exactly as specced. Lesson
for next session: if a state-driven style looks stuck mid-value in this harness, check whether the
property has a `transition` before assuming the CSS selector/cascade is wrong. Separately, a
same-session `FormSelect` open/close check that looked broken was actually two real toggle clicks
cancelling out (`onClick` is a plain toggle) — not a bug either.

## Full PyMuPDF visual sweep of p.17–20 (2026-08-07, post-review)

Luna asked directly: "¿hiciste el chequeo de todas las páginas con PyMuPDF?" — honest
answer at that point was no. Only p.21 (mid-build, to resolve the datepicker gate) and
p.22 (reactively, after she flagged the color) had been rendered as images; p.17–20 had
only gone through the text-only extract. Rendered all 4 with `get_pixmap()` +
`get_drawings()`/`get_text()` proactively rather than wait for her to spot each one:

- **p.17 (FormTextInput `login` variant)** — no bugs found. Fondo `#2a2927`, active-state
  white border, label sizes/colors all matched the already-shipped implementation exactly
  (confirmed via `get_drawings()` rect fills/strokes, not just the legend text).
- **p.18 (FormSelect)** — **1 real bug**: `get_text()` span colors for "Admin"/"Editor"/
  "General" inside the open dropdown are all `#ffffff` — no dimming on the selected one.
  The shipped code dimmed the selected option's text to `--ds-color-pdf-form-muted`
  instead. `get_drawings()` shows the actual differentiator is a small check-glyph
  (stroke-only path, `#8a8b87`) next to the selected row. Fixed: text stays white always,
  added an SVG checkmark next to `aria-selected="true"` options.
- **p.19 (FormCheckable)** — no bugs found, and it independently *confirmed* the checkbox
  checkmark fix from earlier this session (made from Luna's Storybook screenshot, before
  this sweep): `get_drawings()` shows the checked checkbox as a white-filled square with a
  separate **stroke-only** path inside (`stroke=#060606, fill=none`) — a check glyph, not
  a filled dot — exactly what got shipped. Radio (white ring + solid dark dot) and switch
  (track/thumb swap) both matched pixel-for-pixel too. **Correction, same day, later
  session:** "matched pixel-for-pixel" above only checked *colors* (checked/unchecked
  fills) — geometry (control position relative to the label, track/thumb absolute size)
  was never actually measured for the switch sub-type. Luna caught it visually reviewing
  the `Carga de Formulario` screen (`knowledge/screens/carga-de-formulario.md`): the
  switch rendered with the control *before* the label (should be *after*, right-aligned)
  and at the unrelated `Switch` component's scale (52×28px track — real is 16×8px, ~3.3×
  oversized). Re-measured via `get_drawings()` and fixed both — see
  `FormCheckable.spec.md` Dimensions/Deltas for the numbers. Lesson: "colors match" is not
  the same claim as "geometry matches" — a pixel-color sweep doesn't substitute for
  measuring position/size, even on a sub-type that already shipped.
  **Same review, one more gap:** `FormCheckableGroup` had no horizontal layout option —
  p.19's "TIPO DE USUARIO" simple example is a single row, shipped code always stacked
  vertical. Added `layout="vertical"|"horizontal"` (default vertical, non-breaking) +
  `--horizontal` modifier (`display:flex; flex-wrap:wrap; gap: var(--ds-space-6)`, gap
  measured from glyph-to-glyph pitch on the same row). Also surfaced and **fixed the same
  day, third pass** (Luna asked to check it too): the checkbox/radio control measured
  ⌀6.79px on this row vs. the shipped ⌀17px (`--ds-size-icon-md`, a shared token, ~2.4×
  oversized) — cross-checked against 3 more rows (vertical radio, 2 checkbox groups)
  before fixing since the token is shared with `.ds-button__icon`/`.ds-field__icon`
  (unrelated families); all 4 rows measured the identical 13.58×13.58pt @2× rect, high
  confidence. Fixed with a local literal (`7px`), shared token left untouched. Recalibrated
  in the same pass, since both scale off the control: checkbox check-glyph (10×8px→5×4px),
  radio inner dot (8×8px→3.5×3.5px). See `FormCheckable.spec.md` Dimensions/Deltas.
- **p.20 (FormFileUpload)** — **structural rebuild**, not a color tweak. The text extract
  undersold this page badly. Real structure, confirmed via `get_pixmap()` + `get_drawings()`:
  - A **list panel** (header "ADJUNTAR ARCHIVOS" + rows) is a *separate* element from the
    empty/drop-zone card — not one zone that just swaps its inner text. Non-image files
    render as plain rows (name + type/size + a remove ✕ button — the shipped version had
    **no remove affordance at all**); image files render as thumbnail cards (image preview
    + remove ✕ overlaid top-right + name/size below) — the shipped version rendered
    *every* file the same way, no thumbnails.
  - The empty/drop-zone card has an icon badge (circular, `#494949` fill, `#8a8b87`
    document-icon stroke), bold instructional text, and a literal **"SUBIR ARCHIVO"
    button** — the shipped version was plain centered text with no icon and no button.
  - 2 colors disagreed with their own page's legend, same class of bug as Modal p.22: file
    meta text (`WORD - 2.4 Mb` etc.) measures `#c1c1c1` in `get_text()`, not the legend's
    stated `#8d8d8d`; the drop-zone's instructional/formats text measures `#e6e6e6`, not
    `#8d8d8d`. Both fixed to the measured values.
  - Rebuilt `FormFileUpload.tsx` end to end: list panel with a "+" add trigger, mixed row/
    thumbnail list (`display: flex; flex-wrap: wrap` — rows force `width: 100%`, thumbnails
    stay fixed-width so multiple sit side by side, matching the PDF's 2 stacked rows + 3
    thumbnails-in-a-row layout), remove buttons wired to actual state removal (didn't exist
    before), and the empty card only absolutely overlays the list when both exist at once
    (drag-over with files already attached) — otherwise it's the plain in-flow content when
    there are zero files yet.

**Process lesson, worth repeating for any future PDF page in this kit:** the text-only
extract (`pdf-text-extract.md`) is a *starting point*, not a substitute for rendering the
page. It missed real UI elements entirely (remove buttons, thumbnails, an icon+button on
p.20) that no amount of re-reading the text would have surfaced — those only show up in
`get_drawings()` (shape geometry) or the rendered pixmap itself. Default to rendering
every page a component is built from before calling it done, not just the ones that turn
out ambiguous in text form.

## Full PyMuPDF geometry sweep of p.17–22 (2026-08-10)

Handoff (`handoffs/20260807-fase5-checkables-geometry-screens-draft.md`) Parte 1: the
2026-08-07 sweep above (and the 001-form-modal build itself) verified colors/fonts against
the PDF thoroughly but, per that handoff's own framing, **never independently measured
position, size, or visual order** for `FormTextInput`/`FormSelect`/`FormFileUpload`/
`FormDatePicker`/`Modal` — the same gap that let `FormCheckable`'s switch/checkbox sizing and
ordering bugs ship unnoticed through a "colors match" sweep. Re-measured all 6 pages
(`doc[16]`–`doc[21]`) with fresh `get_drawings()`/`get_text("dict")` calls, cross-checked with
`get_pixmap()` renders zoomed on the ambiguous regions. Found real bugs on every component.

- **FormTextInput (p.17/p.18) — the headline finding.** The "activo" (focused/filled) label
  was implemented as floating from `top: 50%` (centered, static) to `top: 8px` (near the top),
  i.e. a conventional Material-style floating label. Zoomed `get_pixmap()` renders of both
  pages show this is wrong: the PDF's real "Input Activo - Label Activo" behavior keeps the
  label **vertically centered** in both states — it only shrinks font-size (16/20pt→10pt) and
  turns into an **inline prefix followed by a vertical divider**, with the value text
  continuing on the same row after the divider (visible as "NOMBRE | Juan Cruz" on p.18 and
  "CONTRASEÑA |" + cursor on p.17). There is no top-anchored floating behavior for the
  single-line case at all — that behavior is real, but only for the **textarea** variant
  (p.18 "DESCRIPCIÓN"), which the shared `.ds-form-field__label` rule had gotten backwards:
  textarea's label was letting the default `top:50%` apply in the *static/empty* state
  (wrongly centered — the PDF shows it top-anchored even when empty) while gaining the
  single-line's inline-divisor treatment in the active state (wrongly — textarea's label stays
  top-anchored in both states, with no divisor, since the paragraph needs the full width to
  wrap). Fixed by rewriting `.ds-form-field__control` from `position: relative` (children
  absolutely positioned) to `display: flex` (label `order: -1` so it renders visually before
  the input despite following it in the DOM — required for the existing
  `input:not(:placeholder-shown) ~ label` selector to keep working), with a
  `:has(textarea)` override that pins the label top-left unconditionally for the multiline
  case. This also fixes the *dynamic* input-value-position problem for free — flex reflow,
  not a magic-number padding, is what makes the value text start exactly where a
  variable-length label+divisor ends.
  Also recalibrated, all invented/unmeasured before this pass: control `min-height` (was a
  single shared `44px` for both variants — real is `15px` default / `22px` login, ~2.9×/2×
  oversized, measured from 30pt/43.48pt @2× rects on p.18/p.17 respectively); label/text inset
  (was `11px` — real is ~4.5px, measured across 7+ label instances); textarea `min-height`
  (`68px`→`72px`, closer to the measured 71.86px).
- **FormSelect (p.18/p.21) — inherits the FormTextInput fix wholesale** (shares
  `.ds-form-field__control`/`__label`) plus 3 of its own: chevron was an unmeasured ~10×6px
  border-triangle at `right: 11px` (real: 7.5×4.8px at `right: 6px`, measured identically on 3
  separate chevron instances across p.18/p.21); the selected-option checkmark SVG was 10×8px
  (real: 7×5px, measured from 2 overlapping paths next to "Admin" on p.18 — the 2026-08-07 pass
  added this glyph but sized it without re-measuring this specific page); the open menu's
  `top: calc(100% + 2px)` / `left: -1px` / `right: -1px` offset was unmeasured — recalibrated
  to `top: 100%` / `left: 0` / `right: 0` using FormDatePicker's p.21 as the cleaner reference
  (see below; p.18's own open-menu illustration is a separate mockup box with a non-
  representative ~9.5px gap, same "don't trust a separate static example's spacing" caveat as
  elsewhere in this file).
- **FormDatePicker (p.21) — cleanest evidence in the whole sweep for the flyout-panel offset.**
  FECHA and HORA's own triggers+panels render as one seamless, contiguous box in the PDF — the
  panel starts at a measured ~0.14pt @2× gap (effectively 0) directly below the trigger, and
  shares the trigger's exact x0/x1 (0 horizontal offset). The shipped `calc(100% + 2px)`/
  `-1px` was invented. Fixed to `top: 100%` / `left: 0`, and reused the same fix on
  `FormSelect`'s menu (same "flyout panel" convention, shared `.ds-form-field` family). Panel
  padding (`var(--ds-space-2)`=8px) also recalibrated to `5px`, matching the family-wide ~4.5px
  inset found on `FormTextInput`.
- **FormFileUpload (p.20) — same family-wide inset bug, independently confirmed.** List-header/
  row padding (`11px`) and the empty-card label's position (`left:8px; top:6px`) were the same
  invented values already found wrong on `FormTextInput`/`FormSelect`/`FormDatePicker` —
  `get_text("dict")` on "ADJUNTAR ARCHIVOS"/"Archivo_1.doc"/"ADJUNTAR" spans measures the same
  ~4.5-6.5px inset. Recalibrated to `5px`/`3px`. This component's major element sizes (root
  width, header/row/thumbnail/drop-zone/icon-badge dimensions) were already correctly measured
  in the 2026-08-07 structural rebuild — only this specific inset value was never
  independently re-checked.
- **Modal (p.22) — a real interpretation correction, not just a number.** The 2026-08-07 pass
  read the two action buttons ("ACCIÓN A"/"ACCIÓN B") as one hover-capture + one permanent rest
  color, modeled on `InvestigationCard`'s action-pair precedent. Direct `get_drawings()`
  measurement contradicts that: both button rects have their own **simultaneous, opaque**
  fills in the same static page (`#8a8b87` left, `#494949` right) — a flat PDF page cannot
  render a live `:hover` state next to its own rest state in one image, so two co-existing
  opaque fills can only be two permanent colors. This lines up with a detail the 2026-08-07
  pass had flagged but left unresolved: `.ds-modal__action--primary` already existed in
  `Modal.tsx`, applied to the primary/right button, with **no matching CSS rule at all** —
  exactly the gap this fill was missing. Fixed: base `.ds-modal__action` (left/secondary) gets
  the permanent `#8a8b87` fill; `--primary` (right) gets `#494949` (blends into the modal's own
  background). Separately, the action buttons had **no `font-size` declared at all** (inherited
  the browser default, ~2× oversized against the measured 14.64pt @2× ≈ 7.32px) — added
  `font-size: 7px` and recalibrated vertical padding (`var(--ds-space-2)`=8px → `3px`) since the
  old padding alone already exceeded the button's real ~14.2px measured height before any
  font-size was even applied. Also fixed `Modal.stories.tsx`'s demo args, which had
  `secondaryAction`/`primaryAction` labels swapped relative to the PDF's own left-to-right
  "ACCIÓN A" (left) / "ACCIÓN B" (right) order.

**Verification note:** this session's Browser pane could not take screenshots ("not
compositing frames" — the same known limitation documented in the 2026-08-07 entries above).
Verified every fix instead via `javascript_tool` → `getComputedStyle()` +
`getBoundingClientRect()` against live Storybook stories (including `play`-function stories
for open-panel states, e.g. `FormDatePicker`'s `Activo` and `FormSelect`'s `Activo`) — e.g.
confirmed `labelCenterY === controlCenterY === inputCenterY` exactly on `FormTextInput`'s
`Activo` story (proving the label no longer floats to the top), and `gap ≈ 0` between trigger
and panel on `FormDatePicker`'s `Activo` story (proving the flyout offset fix). Not yet looked
at by Luna in her own tab — per the standing process note, wait for her go-ahead before
committing.

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

## Backlog — components (empty — all closed, see below)

- ~~**Form**~~ — PDF p.17 (v2 placeholder). **Closed 2026-08-06 as "not ready" (v2), then
  superseded 2026-08-07**: the PDF was updated to v3 with 5 real Form pages (p.17–21) the same
  day, and built as field primitives — see "New components built (PDF v3, 2026-08-07)" above.
  The 2026-08-06 reasoning was correct for what existed *then* (a genuine unfinished placeholder,
  not a doc gap) — it just got overtaken by a same-week design update, not disproven.
- ~~**AlertBanner**~~ — PDF p.18 ("Alert"). **Closed 2026-08-06**, confirmed out of scope, no code
  change — see the handoff block above for the full reasoning and the real p.18 bar measurements
  kept on file in case this resurfaces as a *new*-component question later.

**Explicitly out of scope for this pass** (per `specs/README.md`'s own scale-calibration section):
`Button`, `Badge`, `Card`, `Switch`, `SegmentedControl`, `DataTable`, base `TextField`/`SelectField`
— these are "teal/console" components on the display-scale `rem` convention, not the PDF's literal
`@2×` artboard convention. A fidelity pass against the PDF doesn't apply to them the same way
(there may still be bugs, just not "measured wrong against a PDF page"). **`ProgressRing` is now a
partial exception** (2026-08-06): its default `variant="console"` render is still out of scope for
the same reason as the components above, but `variant="pdf"` (now the *default* value of that prop)
is in scope and has its own PDF citation (p.9 "Torta") — see the "New components built" entry above
and `ProgressRing.spec.md`.

## Done — patterns

- **Login** (`packages/ui/src/patterns/login/`) — PDF p.7 (`doc[6]`), title **"MÓDULOS"**, subtitle
  **"De loguin"** — 2026-08-06. Not "INGRESAR" (that's the button label on the mockup, not the page
  title — an earlier same-day pass mis-cited it from an unordered `get_text()` read; corrected after
  rendering the page as an image and visually confirming the title). p.7 is a sibling page to p.6
  (the already-built `ModuleCard` page) sharing the "MÓDULOS" section title, the same relationship
  as GRAFICOS p.9/p.10 — not its own standalone "Ingresar" component. Two real fixes: (1) both
  `Login.tsx`'s and `Login.stories.tsx`'s PDF-citation comments said "página 6" — wrong page number,
  now "página 7". (2) `.login-card`'s `padding` was `10px`, naively halved from the legend's
  "Padding: 20px" — real vector geometry (`get_drawings()` on `doc[6]`) measures a symmetric
  23.07pt @2× card-edge-to-content inset on both variants (pattern-grid and credentials-fields),
  ÷2 = 11.5px, not 10px. Fixed to `11.5px`, and trimmed `.login-card__body--credentials`'s
  `padding-top` from `12.5px` to `11px` to keep the *total* card-top → first-field-top offset
  matching the measured ~22.5px (previously 10+12.5=22.5 by coincidence of two wrong numbers
  cancelling out; now 11.5+11=22.5 from two corrected ones). Everything else already matched
  exactly: card size (206.5px vs measured 206.3px, noise), pattern-dot size/gap (legend's round
  "45×45px"/2=22.5px trusted over the slightly noisier raw diagram measurement, same call as the
  LinearBarChartCard 0.887-ratio precedent), button dimensions (content-sized via padding, cross-
  checked against the measured 178.5×20.05px rect — matches), button font/padding/colors (Montserrat
  Bold 18pt→9px, padding 10/120pt→5/60px, fondo `#494949`, white text), field font/padding (Source
  Code Light-weight 20pt→10px, padding 10pt→5px), and all 3 colors (`#060606`/`#c1c1c1`/`#2a2927`,
  exact token matches). Verified in Storybook (`DeLoguin` story, both variants) before commit.

## Backlog — patterns (after all components above are done)

- **DetailSheet** (`packages/ui/src/patterns/detail-sheet/`) — PDF "Ficha", p.5
- `packages/ui/src/patterns/mission/` — still not checked against the PDF for an existing spec
  page; confirm whether it has one before assuming this pass covers it the same way.

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

- **To infer how something should animate/transition, diff the PDF's own static state
  examples against each other — don't reach for a familiar web pattern just because the
  visual reminds you of one.** A flat PDF can't show motion directly, but most pages in this
  kit *do* show the same field twice — once "estático" (empty/default) and once "activo"
  (focused/filled/selected) — as two separate static illustrations. Treat that pair as the
  animation spec: measure both illustrations' element positions with `get_drawings()`/
  `get_text("dict")`, then diff the two measured layouts directly. What differs between the
  two measurements is what should animate; what's identical between them should **not**
  move, no matter how natural a different behavior would look. Concretely, this is what
  caught `FormTextInput`'s worst 2026-08-10 bug: a "label + small helper text above a value"
  visual reads, at a glance, exactly like a conventional Material-style floating label
  (label shrinks *and* rises to the top edge) — a strong, familiar prior. But diffing p.17's
  "CONTRASEÑA" (estático) against its own "CONTRASEÑA" (activo, empty+cursor) example showed
  the label's vertical center coordinate was *identical* in both — only `font-size` differed,
  plus a divisor line appeared that wasn't there before. The shipped code had implemented the
  familiar pattern (label rises on activate) instead of the one the PDF's own two examples
  actually prove (label stays put, gains a divisor, value continues inline after it). Same
  root cause, inverted: the textarea case looked like it should get the *same* mechanism as
  the single-line input (both are `.ds-form-field` siblings, same "Input Activo - Label
  Activo" legend line) — but diffing textarea's own estático/activo pair showed its label sits
  at the exact same top-left point in *both* states (only font-size changes, never position),
  which the single-line input's pair does not do. **The general rule:** whenever a page shows
  more than one state of the same element, that's not redundant documentation to skim past —
  it's the actual before/after spec for what moves. Measure both, diff them, and let the
  numbers say what animates; a component that merely "looks like" a known pattern from one
  screenshot is not evidence that pattern is what's specified.
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
- **`page.get_text()`'s default (unordered) string is not reading order — don't identify a page's
  title from it.** Misread p.7's title as "INGRESAR" from the raw unordered dump because that
  string happened to appear first; the real title ("MÓDULOS") and subtitle ("De loguin") were
  further down in the same dump, and "INGRESAR" was actually the button label baked into the
  mockup, repeated across both login-card examples (hence 4 near-duplicate occurrences — another
  instance of the "duplicated text" noise already seen on the GRAFICOS page). Caught by rendering
  the page as an image (`page.get_pixmap()`) and looking at it directly — the title sits top-right
  in a large letter-spaced font, same position as every other page's title, immediately obvious
  once actually seen. **When citing what a page is *about* (not just measuring a value on it),
  either sort `get_text('blocks')` by y-position first (as already practiced for p.3/p.4/p.10/p.11
  earlier this same session) or render the page as an image and look — don't trust which string
  `get_text()`'s plain-string mode happens to emit first.**
