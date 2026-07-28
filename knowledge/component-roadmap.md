---
id: component-roadmap
name: Component Build Roadmap (from design timeline v2)
status: active
last_reviewed: 2026-07-22
source: knowledge/references/design-reference.pdf (v2, p.2 LÍNEA DE TIEMPO)
supersedes_note: >
  This tracks WHICH PDF-defined components still need to be built in code. It is
  distinct from knowledge/roadmap.md (the knowledge-architecture roadmap, M1-M6)
  and from knowledge/audit/design-system-roadmap.md (a stale 2026-07-03 audit
  snapshot whose M5 "missing components" list predates this one and is out of date).
---

# Component Build Roadmap

## Where this comes from

The design-reference PDF was updated to v2 on 2026-07-17. Its new p.2 (LÍNEA DE
TIEMPO) is the design team's own tracker: two rows, **Diseño** and **Desarrollo**,
each with a dot per component — filled if done, hollow if pending. All 11
components are marked done in Diseño; **all 5 original timeline gaps in Desarrollo
are now closed** (Empty, Skeleton, CalendarCard, SideBar, Asistente).

Cross-checked against the actual code (`packages/ui/src/components/*`,
`packages/ui/src/patterns/*`) on 2026-07-22: **0** pending timeline items remain
without a code export. Empty (`Empty.tsx`), Skeleton (`Skeleton.tsx`),
CalendarCard (`CalendarCard.tsx`), SideBar (`SideBar.tsx`), and Asistente
(`Asistente.tsx`, promoted from `patterns/modal/`) ship. The 6 items marked done
in both rows (Tarjetas → `Card`/`TaskCard`, Investigation card →
`InvestigationCard`, Ficha → `DetailSheet`, Módulos → `ModuleCard`, Gráficos →
`ChartCard` family, Metric card → `MetricCard`) all have a working implementation
already.

**This finishes the component-build-track** for the original p.2 timeline gaps.

## Gap table

| Component (PDF name) | PDF page | Diseño | Desarrollo | Code today |
|---|---|:---:|:---:|---|
| Tarjetas | p.3 | ✅ | ✅ | `Card.tsx`, `TaskCard.tsx` |
| Investigation card | p.4 | ✅ | ✅ | `InvestigationCard.tsx` |
| Ficha | p.5 | ✅ | ✅ | `patterns/detail-sheet/DetailSheet.tsx` — **built but not exported from the main `index.ts` barrel** |
| Módulos | p.6 | ✅ | ✅ | `ModuleCard.tsx` |
| Gráficos | p.9–10 | ✅ | ✅ | `ChartCard.tsx`, `BarChartCard.tsx`, `DonutChartCard.tsx`, `LineChartCard.tsx` |
| Metric card | p.11 | ✅ | ✅ | `MetricCard.tsx` |
| **Asistente** | p.12 | ✅ | ✅ | `Asistente.tsx` — promoted 2026-07-22 from `patterns/modal/Modal.tsx` (static landing shell only; chat/thread + dynamic suggestions out of scope) |
| **Side bar** | p.13 | ✅ | ✅ | `SideBar.tsx` — built 2026-07-22 |
| **Skeleton** | p.14 | ✅ | ✅ | `Skeleton.tsx` — built 2026-07-21 |
| **Calendar card** | p.15 | ✅ | ✅ | `CalendarCard.tsx` — built 2026-07-21 |
| **Empty** | p.16 | ✅ | ✅ | `Empty.tsx` — built 2026-07-21 |
| Form | p.17 | not on timeline | not on timeline | no dedicated `Form`; scattered field primitives exist (`TextField`, `SelectField`, `SegmentedControl`, `Switch`, `DataTable`) |
| Alert | p.18 | not on timeline | not on timeline | `AlertBanner.tsx` — already built, naming differs from PDF ("Alert") |

**Note on Form and Alert:** neither appears on the p.2 timeline at all, so they sit
outside the design team's own tracked scope. Alert is a non-issue — `AlertBanner`
already ships. Form is the one open question: its p.17 spec block is nearly
word-for-word identical to p.16 Empty (same icon/title/text/button spec, no field
list, no layout, no validation states) — it reads as an unfinished placeholder
page, not a real spec. **Recommendation: confirm the actual Form spec with design
before scoping a build.**

## Build order (timeline gaps closed)

All 5 original timeline gaps are shipped:

1. ~~**Empty**~~ — `Empty.tsx` (p.16)
2. ~~**Skeleton**~~ — `Skeleton.tsx` (p.14)
3. ~~**CalendarCard**~~ — `CalendarCard.tsx` (p.15)
4. ~~**SideBar**~~ — `SideBar.tsx` (p.13)
5. ~~**Asistente**~~ — `Asistente.tsx` (p.12) — promoted from `patterns/modal/`; static landing shell only. Chat/thread UI and what drives «tareas rápidas» remain separate design/app questions, not open kit-build gaps on the timeline.

## Lesson from Empty (apply to PDF-context stories)

`Empty` shipped with title/description text unreadable in Storybook (light-on-light):
its PDF spec is "sin fondo" (no self-drawn background), assuming a dark parent, and its
story's `parameters.backgrounds` had no effect because the `backgrounds` addon isn't
registered in `packages/ui/.storybook/main.ts` (`addons: []`). Fixed by giving the
story's own decorator an explicit `background: var(--ds-color-pdf-surface)` instead of
relying on the (currently inert) backgrounds parameter. Every PDF-context component with
an opaque background of its own (`ModuleCard`, `MetricCard`, `CalendarCard`, `SideBar`,
`Asistente`, etc.) was masking this same gap. **Side bar** (`#282828`) and **Asistente**
(shell `#060606`) draw their own opaque backgrounds so this shouldn't recur, but
**Skeleton** (`#2a2927` at 70% opacity — not fully opaque) should keep an explicit dark
decorator background rather than depending on `parameters.backgrounds`.
**Skeleton** shipped with an opaque outer decorator (`var(--ds-color-pdf-surface)`)
plus a `ComposedOnFondo` story that demos `--ds-color-pdf-surface-warm-a70` inside it.
**CalendarCard** ships opaque `#2a2927` and mirrors `TaskCard.stories.tsx` (harmless
`parameters.backgrounds` + `padding: 32` decorator; no canvas override needed).
**SideBar** ships opaque `#282828` and mirrors `ModuleCard.stories.tsx` (harmless
`parameters.backgrounds` + `padding: 32` decorator; no canvas override needed).
**Asistente** ships opaque shell `#060606` and mirrors the former Modal story
(`layout: "fullscreen"` + page-padding decorator; harmless `parameters.backgrounds`).

## Quick win (not a new build)

`DetailSheet` (Ficha) exists in `packages/ui/src/patterns/detail-sheet/` but is
not exported from `packages/ui/src/index.ts`. Exporting it is a docs/barrel fix,
not a component build — do it independently of the (now closed) timeline gaps above.

## Post-baseline: coverage & hardening (from eval 2026-07-22)

The p.2 timeline gaps are closed, but the first generation eval baseline
([eval/results/2026-07-22-baseline.md](./eval/results/2026-07-22-baseline.md)) surfaced
gaps a *real consumer* hits immediately. These are NOT on the PDF timeline; prioritise by
observed consumer need, not by the PDF.

| Item | Type | Priority | Evidence | Notes |
|---|---|:---:|---|---|
| **@2× → fluid sizing** | Component hardening | **Done (partial) + 1 new gap found** | G1, G4, G5 (3/5 prompts) | See "2026-07-28 sizing pass" below — `ChartCard`/`MetricCard` ficha fixed and confirmed in a real re-run; kanban `TaskCard`'s empty-space finding wasn't actually fixed (the re-run agent overrode the card's own cap via a local `style` prop instead — a new, worse gap, see below); `Asistente` 774px deferred. |
| **Pagination** | New component | **High** | G3 | No export; consumer had to hand-build a page bar with `Button`. Needed by any list/table. |
| **DataTable: sort / filter / paginate** | Component feature | **High** | G3 | Display-only today; realistic tables need at least sort + paginate. |
| **Modal / Dialog** | New component | **High** | G6 | No real overlay primitive; `Asistente` is a `role="dialog"` shell, not a confirm/cancel dialog. Needs focus trap + Esc + `aria-modal`. |
| **Ficha label contrast** | a11y / fidelity | Medium | G4 | Ficha `MetricCard` label (extralight + `--ds-color-pdf-ink-muted`) is spec-faithful but low-contrast on dark. Fidelity-vs-a11y tension to resolve with design. |
| **Export `DetailSheet`** | Barrel fix | ✅ Done (2026-07-28) | G4 | See "Quick win" above — a detail/login composer would reuse it. |

**Not a gap (validated by the eval):** subsystem selection (console teal vs PDF grey) is
already well-specified — the agent chose correctly in all 5 builds. See anti-examples §2/§5.

### 2026-07-28 sizing pass (Focus A from `eval/next-steps.md`)

Resolved the component-vs-composition boundary flagged in §7 for the two @2× sizing
findings, differently per component depending on whether an intrinsic size exists to
derive a cap from:

- **`ChartCard` (`.ds-chart-card`)** — added `max-width: 280px`, the native SVG `viewBox`
  width shared by `LineChartCard`/`BarChartCard`. This is an *intrinsic* cap (derived from
  the chart's own coordinate space, not invented) — fixes G4's "`LineChartCard` fills the
  viewport" for any standalone usage, not just inside `DetailSheet` (which already had its
  own local height override in `detail-sheet.css` — that finding mostly hit the hand-composed
  ficha screen consumers had to build *before* `DetailSheet` was exported).
- **`MetricCard` ficha (`.ds-metric--ficha`)** — added `width: fit-content`, the same
  technique already used by `.ds-task`. No PDF width measurement exists for this tile (see
  `MetricCard.spec.md`), so a pixel cap would be invented; sizing to content isn't. Fixes
  G4's "ficha `MetricCard` stretch full-width" regardless of the consumer's grid/flex choice.
  Reporting `MetricCard` (dashboards) is untouched — it's *meant* to fill its grid cell.
- **`TaskCard` kanban** — **no code change**, reasoned as a consumer/composition
  responsibility (it already self-caps via `width: fit-content` + `max-width: 140px` on
  `.ds-task--kanban`). **The 2026-07-28 G1 re-run shows this reasoning wasn't enough on its
  own:** the agent didn't size the grid column to the card — it passed
  `style={{ maxWidth: "100%", width: "100%" }}` straight to `TaskCard`
  (`alejandria-harness/src/App.tsx:290`), which overrides the component's own cap (inline
  style beats any class rule) so the card stretches to fill the still-wide `1fr` column. Visually
  this reads as "fixed" (no empty space) but it's a fidelity regression, not a fix — see
  [eval/results/2026-07-28-sizing.md](./eval/results/2026-07-28-sizing.md) correction. **New gap,
  not yet fixed:** need either a new anti-example pair (local `style`/`className` override
  defeating a shipped component's calibrated cap — distinct from §7, which assumes no cap exists)
  or a harder guard in `TaskCard` itself (e.g. not merging `width`/`maxWidth` from an incoming
  `style` prop).
- **`Asistente` 774px** — deferred, per `next-steps.md`, to a second pass (biggest, most
  design-risky of the four).

Verified in Storybook (`ChartCard` Gallery/Line Chart stories, `MetricCard` Reporting-vs-Ficha
story) at a 1600px viewport: charts cap at native resolution instead of growing with the
viewport; the ficha tile is visibly narrower than the reporting tile now. Real-browser
re-check still recommended before re-scoring the golden set (see eval loop discipline).
