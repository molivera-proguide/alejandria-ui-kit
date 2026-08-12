---
id: tareas-finalizadas-screen
name: Tareas Finalizadas
category: screen
status: draft
storybook: Alejandria/Screens/TareasFinalizadas
source: packages/ui/src/screens/tareas-finalizadas/TareasFinalizadas.stories.tsx
layout: fullscreen
last_reviewed: 2026-08-12
---

> **Retrofit 2026-08-11 (`005-alert-toast-filter`):** agrega el topbar (`AlertBar` +
> íconos colapsar/atrás/adelante), reemplaza `TextField` por `FilterField` real, y
> agrega `creator`/`startDate`/`endDate` al dataset (contenido completo, igual que
> `screens/tareas-pendientes/`) — el PDF real (p.9) muestra ese contenido completo
> por card, no la versión recortada que tenía esta screen antes. También corrige el
> estilo del botón "VER MÁS" (ver `knowledge/components/TaskCard.md`).
>
> **Corrección 2026-08-12 (Luna, post-implementación):** faltaba el heading "Tareas
> Finalizadas" en la misma fila del toolbar — agregado.

# Tareas Finalizadas

## Purpose

Fullscreen static composition — collapsed `SideBar` nav rail + a filterable grid of
closed `TaskCard` (`variant="default"`, `tone="neutral"`) with the new "VER MÁS" slot
instead of the accent triangle. Same component as `screens/tareas-pendientes/`, a
different filter set, no interaction (static, same convention as `screens/tareas-kanban/`).

**Source:** "Alejandria - Agosto 2026.pdf" p.9 (see `knowledge/component-roadmap.md` §
"Screens triage" and `DECISIONS.md` for why the PDF itself isn't committed).

## User goals

- See finalized/closed tasks in a filterable grid, matching the real composition instead
  of an isolated `TaskCard` story.
- Reference `TaskCard`'s new `viewMore` slot (`TaskCardViewMoreAction`) — a decorative
  "VER MÁS" affordance, distinct from the accent-triangle treatment used in
  `screens/tareas-pendientes/`.

## Main regions

| Region | Contents |
|--------|----------|
| **Topbar** | `AlertBar` ("5 TAREAS PENDIENTES") + 3 loose icon buttons (collapse sidebar, back, forward) — added 2026-08-11 |
| **Nav rail** | `SideBar`, collapsed (icon-only), same convention as `screens/dashboard/`/`screens/tareas-kanban/` |
| **Toolbar** | `h1` heading ("Tareas Finalizadas", added 2026-08-12 — missing until Luna caught it comparing against the real PDF) + `SelectField` ×2 ("Comisaría", "Fecha") + `FilterField` ("Buscar tarea") — `FilterField` replaces the `TextField` hack (2026-08-11) |
| **Grid** | 8× `TaskCard` (`variant="default"`, `tone="neutral"` — no accent triangle, fixed 170px width, 4-column grid), each with `creator`/`startDate`/`endDate` (full content, added 2026-08-11) and a `viewMore` "VER MÁS" button |

Canvas: `--ds-color-pdf-surface` (`#060606`) background with `BackgroundTextureDots`
(`002-bg-texture`), `display: flex` (rail + main), same convention as `screens/home/`.

## Patterns used

None — pure composition of `SideBar` + `SelectField` + `TextField` + `TaskCard`, no
shared pattern extracted.

## Components used

`SideBar`, `AlertBar`, `SelectField`, `FilterField`, `TaskCard`.

## Navigation

`SideBar` items and the toolbar selects/search have no real `onClick`/filtering wired
(static demo, same convention as `screens/home/`). "VER MÁS" is decorative — its
`onClick` is a no-op (`() => undefined`), same convention as `MetricCard`'s edit/delete
utilities in `screens/home/`. No card click-to-open (unlike `screens/tareas-pendientes/`)
— the draft doesn't show a detail state for finalized tasks.

## Responsive behavior

None. Fixed 4-column grid (`repeat(4, 170px)`); narrow viewports will overflow (same
known limitation as every other screen in this layer).

## Accessibility considerations

- "VER MÁS" renders as a real `<button type="button">` (keyboard-focusable, native
  semantics) even though it's decorative in this demo — a consumer can wire a real
  `onClick` without any component change.
- Every component relies on its own documented semantics; this composition adds no new
  interactive behavior of its own.

## Known limitations

- **`.ds-task__view-more` corregido 2026-08-11 (`005-alert-toast-filter`)** contra el PDF
  real (Downloads de Luna, p.7/p.9): es un chip sólido `#494949`, texto blanco, 55×12px —
  no el link subrayado sin fondo que se había construido durante `004-familia-tareas` sin
  verificar contra la fuente.
- **`knowledge/components/TaskCard.md` y su `.spec.md` todavía no documentan `viewMore`.**
  Gap de proceso, no de valores — encontrado durante `/sdd-implement` de
  `004-familia-tareas`, sigue sin resolver (no estaba en el scope de `005-alert-toast-filter`
  tampoco). Flagged para `/sdd-checklist`/`/sdd-review`.
- Static demo data (task codes/titles/dates) — no real data source, same convention as
  `Carga de Formulario`/`Home`/`Dashboard`.
- No responsive layout.
