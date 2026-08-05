# Fidelity pass — next steps

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

## Carried-forward finding (not yet fixed anywhere)

**CSS `pt`-instead-of-`px` unit bug**, found while fixing InvestigationCard, confirmed present via
`grep -n "[0-9]pt;" packages/ui/src/styles.css` in three more components that haven't had their
fidelity pass yet:

- `CalendarCard` — `.ds-calendar-card__month`, `.ds-calendar-card__description`
- `Empty` — `.ds-empty__title`, `.ds-empty__description`
- `SideBar` — `.ds-sidebar__menu-label`, `.ds-sidebar__item-label`, `.ds-sidebar__item-caption`,
  `.ds-sidebar__badge`, `.ds-sidebar__status`

Check these specifically when their turn comes — the number is usually already right (someone did
the ÷2 math correctly), only the CSS unit is wrong (1pt = 1.333px, not 1px).

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

- **ModuleCard** — PDF "Módulos", p.6
- **MetricCard** — PDF "Metric card" (has both a dashboard variant and a `.ds-metric--ficha`
  variant — check both against whichever PDF page(s) show them)
- **Asistente** — PDF p.12 (static landing shell only per component-roadmap.md; chat/thread UI is
  explicitly out of scope, don't try to "fix" that)
- **SideBar** — PDF p.13 (has the `pt` bug above, plus whatever else a real pass finds)
- **Skeleton** — PDF p.14
- **CalendarCard** — PDF p.15 (has the `pt` bug above)
- **Empty** — PDF p.16 (has the `pt` bug above)
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
`Button`, `Badge`, `Card`, `Switch`, `SegmentedControl`, `DataTable`, `ProgressRing`, base `TextField`/
`SelectField` — these are "teal/console" components on the display-scale `rem` convention, not the
PDF's literal `@2×` artboard convention. A fidelity pass against the PDF doesn't apply to them the
same way (there may still be bugs, just not "measured wrong against a PDF page").

## Backlog — patterns (after all components above are done)

- **DetailSheet** (`packages/ui/src/patterns/detail-sheet/`) — PDF "Ficha", p.5
- `packages/ui/src/patterns/login/`, `packages/ui/src/patterns/mission/` — not yet checked against
  the PDF for an existing spec page; confirm whether either has one before assuming this pass
  covers them the same way.

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
