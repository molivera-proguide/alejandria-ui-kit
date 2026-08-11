---
id: home-screen
name: Home
category: screen
status: draft
storybook: Alejandria/Screens/Home
source: packages/ui/src/screens/home/Home.stories.tsx
layout: fullscreen
last_reviewed: 2026-08-11
---

# Home

## Purpose

Fullscreen operational landing screen — expanded `SideBar` nav rail + a 3-column
composition combining the `Asistente` shell, an events overview, a productivity summary,
and a fixed scrollable task list. Second screen in the `knowledge/screens/` +
`packages/ui/src/screens/` layer, first to reuse a full existing component (`Asistente`)
as-is inside a larger composition rather than only atomic fields.

**Source:** "Alejandria - Agosto 2026.pdf" p.3 (see `knowledge/component-roadmap.md` §
"Screens triage" and `DECISIONS.md` for why the PDF itself isn't committed).

**Corrects a mapping error.** The original triage (2026-08-07) labeled p.3 as "Asistente
IA (estado vacío)"; a 2026-08-10 re-read with `get_pixmap()` (see
`drafts/pantallas-grupo-a-b.md`) found the real p.3 content is this full Home screen —
there is no separate "Asistente vacío" page in this PDF. `component-roadmap.md` was
corrected during `/sdd-refine` (2026-08-11, commit `db2648f`) before this screen was built.

## User goals

- See the AI assistant entry point (`Asistente`), upcoming events, and productivity KPIs
  together in the same real layout a user lands on, not just in isolated component
  stories.
- Reference how `TaskCard`'s `resumen` variant reads as a dense, scrollable list distinct
  from the `default`/`kanban` variants used elsewhere.
- Reference `SideBar` expanded with a notification badge on a live item set.

## Main regions

| Region | Contents |
|--------|----------|
| **Nav rail** | `SideBar`, expanded, same item set as `SideBar.stories.tsx` (Mis tareas/Historial/Reportes/Catástrofes + Notificaciones badge=2/Mi cuenta/Configuración/Ayuda/Cerrar sesión) |
| **Assistant** | `Asistente` reused whole (shell, prompt, mic, adjuntar, EJECUTAR, 4 chips) — not decomposed into a smaller sub-piece, spans the full content column above the two sections below |
| **Próximos eventos** | 6× `CalendarCard` (fixed 72×~79px each) in a 3-column grid, `justify-content: start` so the fixed-width cards sit close together instead of spreading across the section — corrected 2026-08-11, see Known limitations |
| **Resumen de productividad** | 2× `MetricCard` (`appearance="reporting"`, edit/delete utilities) in a row, then 1× `DonutChartCard` ("Asistencias", single-segment 75%, corregido 2026-08-11 desde `ProgressRing`) below them — same section, stacked vertically |
| **Tareas en fecha** | Fixed right column, `h2` title + scrollable stack of `TaskCard` (`variant="resumen"`) |

Canvas: `--ds-color-pdf-surface` (`#060606`) background with `BackgroundTextureDots`
(`002-bg-texture`), `display: flex` (rail + main). Main splits into a 2-column CSS grid
(`minmax(0,1fr) 260px`, `gap: 32px`): content column + fixed aside. The content column
itself splits into `Asistente` (full width, top) + a 2-column row below it
(`.screen-home__sections`, `1fr 1fr`) holding "Próximos eventos" and "Resumen de
productividad" **side by side** — corrected 2026-08-11, see Known limitations (the
first pass stacked them vertically instead).

## Patterns used

None yet registered under `knowledge/patterns/` — same as `carga-de-formulario`, this
composition doesn't reuse an existing pattern doc.

## Components used

`SideBar`, `Asistente`, `CalendarCard`, `MetricCard`, `DonutChartCard`, `TaskCard`.

## Navigation

`SideBar` items have no `onClick` wired (static demo, same convention as
`SideBar.stories.tsx`) — Storybook-only composition, no routing.

## Responsive behavior

None. Fixed 2-column grid (content + 260px aside); narrow viewports will compress or
overflow (same known limitation as `Carga de Formulario` / `Operations Console`).

## Accessibility considerations

- Section headings (`Próximos eventos`, `Resumen de productividad`, `Tareas en fecha`)
  are native `h2`; `Asistente` owns its own `h1` (the greeting).
- Every component relies on its own documented semantics
  (`knowledge/components/{SideBar,Asistente,CalendarCard,MetricCard,DonutChartCard,TaskCard}.md`)
  — this composition adds no new interactive behavior of its own.
- `.screen-home__tasks` scrolls independently (`overflow-y: auto`) — keyboard/scroll
  behavior is native, no custom scroll handling added.

## Known limitations

- **`DonutChartCard`, single segment (corrected 2026-08-11).** The first implementation
  used `ProgressRing` for "Asistencias" — the real PDF page has this element cut off
  (as if the page needed to scroll further), so the actual component wasn't visible when
  the screen was built. Luna confirmed against the PDF that it's a `DonutChartCard`
  (same component as the `"Tareas"` 45%/30% two-segment donut on p.12 Reportes), not
  `ProgressRing`. Home's "Asistencias" only has one measured value (75%) — implemented as
  a single-segment donut (`data={[{ label: "Presentes", value: 75 }]}`), leaving the
  remaining 25% as the component's own unfilled track, rather than inventing a second
  segment the PDF doesn't show for this specific card. The footer copy ("Registro de
  asistencia") is invented placeholder text, same convention as the other demo copy in
  this screen — not measured from the (cut-off) PDF.
- **Layout fix (corrected 2026-08-11).** The first implementation stacked "Próximos
  eventos" and "Resumen de productividad" vertically in one content column, and let
  `CalendarCard`'s fixed-width (72px) tiles sit inside `1fr` grid tracks — which
  stretched each column far wider than the card, reading as "too much space between
  dates". Luna compared the render against the real PDF: the two sections sit side by
  side (`.screen-home__sections`, 2 equal columns), and the events grid needed
  `grid-template-columns: repeat(3, auto)` + `justify-content: start` so the tracks hug
  the fixed-width cards instead of spreading them.
- Static demo data (event dates/descriptions, metric values, task list) — no real data
  source, same convention as `Carga de Formulario`.
- No responsive layout.
- First screen in this layer to reuse a full component (`Asistente`) unmodified; no
  shared "assistant + KPIs" pattern extracted yet (same "premature with one example"
  reasoning as `carga-de-formulario.md`).
