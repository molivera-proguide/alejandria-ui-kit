---
id: tareas-kanban-screen
name: Tareas Kanban
category: screen
status: draft
storybook: Alejandria/Screens/TareasKanban
source: packages/ui/src/screens/tareas-kanban/TareasKanban.stories.tsx
layout: fullscreen
last_reviewed: 2026-08-11
---

> **Retrofit 2026-08-11 (`005-alert-toast-filter`):** agrega el topbar (`AlertBar` +
> íconos colapsar/atrás/adelante), la fila de `FilterField` que le faltaba, y una
> barra de progreso + ícono "..." por columna (hallazgo del fidelity-check de
> `004-familia-tareas`, no estaba en el scope original de esa feature).

# Tareas Kanban

## Purpose

Fullscreen static composition — collapsed `SideBar` nav rail + a 3-column kanban board
of `TaskCard` (`variant="kanban"`). Static, no interaction, same convention as
`screens/dashboard/` — distinct from `screens/tareas-pendientes/`, the one screen in this
feature with real open/close state.

**Source:** "Alejandria - Agosto 2026.pdf" p.8 (see `knowledge/component-roadmap.md` §
"Screens triage" and `DECISIONS.md` for why the PDF itself isn't committed).

## User goals

- See pending tasks grouped by status (En fecha / Retrasadas / Finalizadas) in a kanban
  layout, matching the real composition instead of an isolated `TaskCard` story.
- Reference `TaskCard`'s `kanban` variant at its calibrated fixed width (225px) inside a
  real 3-column grid, confirming the sizing regression documented in
  `knowledge/component-roadmap.md` § "2026-07-28 sizing pass" stays closed — no external
  `style` override reopens it (see `TaskCard.tsx:57-61`).

## Main regions

| Region | Contents |
|--------|----------|
| **Topbar** | `AlertBar` ("5 TAREAS PENDIENTES") + 3 loose icon buttons (collapse sidebar, back, forward) — added 2026-08-11 |
| **Nav rail** | `SideBar`, collapsed (icon-only), same convention as `screens/dashboard/` |
| **Toolbar** | `FilterField` — added 2026-08-11, this screen had no search/filter row before |
| **Board** | 3 fixed-width columns (`EN FECHA` 4 cards / `RETRASADAS` 2 cards / `FINALIZADAS` 1 card), each a `h2` title + a "..." menu icon (`MoreHorizontal`, decorative) + a thin progress bar (decorative, % values invented — see Known limitations) + stack of `TaskCard` (`variant="kanban"`) |

Canvas: `--ds-color-pdf-surface` (`#060606`) background with `BackgroundTextureDots`
(`002-bg-texture`), `display: flex` (rail + main), same convention as `screens/dashboard/`.

## Patterns used

None — pure composition of `SideBar` + `TaskCard`, no shared pattern extracted.

## Components used

`SideBar`, `AlertBar`, `FilterField`, `TaskCard`.

## Navigation

`SideBar` items have no `onClick` wired (static demo, same convention as
`SideBar.stories.tsx`) — Storybook-only composition, no routing, no card interaction
(unlike `screens/tareas-pendientes/`).

## Responsive behavior

None. Fixed 3-column grid (`repeat(3, 260px)`); narrow viewports will overflow (same
known limitation as every other screen in this layer).

## Accessibility considerations

- Column headings (`EN FECHA`, `RETRASADAS`, `FINALIZADAS`) are native `h2`.
- Every component relies on its own documented semantics; this composition adds no new
  interactive behavior of its own.

## Known limitations

- **Los % de la barra de progreso por columna son decorativos, no medidos del PDF.**
  El PDF muestra una barra bajo cada título de columna pero no anota un valor exacto —
  90/70/30% (EN FECHA/RETRASADAS/FINALIZADAS) son una aproximación razonable de
  `005-alert-toast-filter`, no una medida ÷2 citable.
- Static demo data (task codes/titles/dates) — no real data source, same convention as
  `Carga de Formulario`/`Home`/`Dashboard`.
- No responsive layout.
- No drag & drop between columns — out of scope for `004-familia-tareas` (see
  `specs/004-familia-tareas/spec.md` § "Fuera de scope (v1)").
- El ícono "..." por columna es decorativo, sin menú funcional — mismo criterio que
  el ícono de filtro de `FilterField`.
