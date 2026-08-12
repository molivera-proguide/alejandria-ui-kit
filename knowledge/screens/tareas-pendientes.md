---
id: tareas-pendientes-screen
name: Tareas Pendientes
category: screen
status: draft
storybook: Alejandria/Screens/TareasPendientes
source: packages/ui/src/screens/tareas-pendientes/TareasPendientes.stories.tsx
layout: fullscreen
last_reviewed: 2026-08-12
---

> **Retrofit 2026-08-11 (`005-alert-toast-filter`):** agrega el topbar (`AlertBar` +
> íconos colapsar/atrás/adelante) y reemplaza el `TextField`+`Button` del toolbar
> (hack sin base en el PDF) por `FilterField` real. El ancho del panel lateral y el
> botón "VER MÁS" también se corrigieron ese mismo día contra el PDF real.
>
> **Corrección 2026-08-12 (Luna, post-implementación):** faltaba el heading "Tareas
> Pendientes" en la misma fila del toolbar — agregado. `DetailSheet` tenía 2 bugs más
> (título envuelto, superposición con el gráfico) resueltos ese día contra
> `design-reference.pdf` p.5 — ver `DetailSheet.spec.md` y Known limitations.

# Tareas Pendientes

## Purpose

Fullscreen operational screen — expanded `SideBar` nav rail + a filterable grid of
`TaskCard` (`variant="default"`), with a real open/close interaction: clicking a card
opens `DetailSheet` as a wide overlay panel. First screen in `packages/ui/src/screens/`
with actual component-local state (`useState`) — every other screen in this layer
(`carga-de-formulario`, `home`, `dashboard`) is a static composition.

**Source:** "Alejandria - Agosto 2026.pdf" p.5, with the "detail open" state of p.7 (see
`knowledge/component-roadmap.md` § "Screens triage" and `DECISIONS.md` for why the PDF
itself isn't committed).

**Corrects a mapping error.** The original triage treated p.5, p.6, and p.7 as three
separate screens. A 2026-08-11 `/sdd-refine` grilling (see `drafts/pantallas-grupo-a-b.md`
§ hallazgo p.3/p.5/p.6 and `input.md` of `004-familia-tareas`) confirmed with the team
that they're the same screen: p.5/p.6 are two filter treatments of "Tareas Pendientes"
(toggle vs. progress bar), and p.7 is this same screen with a `TaskCard` selected.

## User goals

- See pending tasks in a filterable grid, matching the real layout instead of an isolated
  `TaskCard` story.
- Open a task's full detail (statuses, description, operational metrics, media, a
  performance chart, and a 3-action footer) without leaving the grid — reference the only
  screen in this kit with real open/close interaction.
- Reference `DetailSheet` used as a wide side panel instead of a centered block.

## Main regions

| Region | Contents |
|--------|----------|
| **Topbar** | `AlertBar` ("5 TAREAS PENDIENTES") + 3 loose icon buttons (collapse sidebar, back, forward — not part of `AlertBar`, composed here) — added 2026-08-11 (`005-alert-toast-filter`) |
| **Nav rail** | `SideBar`, expanded, same item set as `SideBar.stories.tsx`/`screens/home/` |
| **Toolbar** | `h1` heading ("Tareas Pendientes", added 2026-08-12 — missing until Luna caught it comparing against the real PDF) + `SegmentedControl` ("EN FECHA"/"VENCIDAS", decorative — fixed `value`, `onValueChange` no-op) + `FilterField` ("Buscar tarea") — `FilterField` replaces the `TextField`+`Button` hack (2026-08-11) |
| **Grid** | 12× `TaskCard` (`variant="default"`, fixed 170px width, 4-column grid), accent triangle via `tone` (danger/warning/success/neutral) |
| **Detail overlay** | On card click: `DetailSheet` (`className="detail-sheet--wide"`, 656px, measured 2026-08-11 against the real PDF) positioned `left: 218px` (after the 1st grid column + gap) so column 1 stays visible, matching the real PDF's own layout, `onClose` clears the selection |

Canvas: `--ds-color-pdf-surface` (`#060606`) background with `BackgroundTextureDots`
(`002-bg-texture`), `display: flex` (rail + main), same convention as `screens/home/`.

## Patterns used

`DetailSheet` (`patterns/detail-sheet/`) — reused with two additions from this feature:
`onClose` (wires the existing header "Cerrar" icon button, previously without a handler)
and `className` (lets this screen apply `.detail-sheet--wide` without touching the
component's default 590px block-centered look).

## Components used

`SideBar`, `AlertBar`, `FilterField`, `SegmentedControl`, `TaskCard`, `DetailSheet`.

## Navigation

`SideBar` items and the toolbar controls (search/segmented-control/filter) have no real
`onClick`/`onValueChange` (static demo, same convention as `screens/home/`) — the only
real interaction on this screen is the `TaskCard` click → `DetailSheet` open/close, kept
entirely in local `useState` (no routing, no fetch, no shared state).

## Responsive behavior

None. Fixed 4-column grid (`repeat(4, 170px)`); narrow viewports will overflow (same
known limitation as every other screen in this layer).

## Accessibility considerations

- `DetailSheet`'s "Cerrar" button now has a working `onClick` (previously decorative) —
  keyboard/focus behavior is the button's own native semantics, no focus trap added.
- The grid's clickable cursor (`cursor: pointer` on `.ds-task`) is scoped to this screen's
  own CSS (`.screen-tareas-pendientes__grid .ds-task`), not added to `TaskCard`/`styles.css`
  globally — Kanban/Finalizadas don't get an interactive cursor they don't need.
- Every component relies on its own documented semantics; this composition adds one new
  interactive behavior (card click → panel), implemented as a plain `onClick` prop already
  supported by `TaskCard` (it extends `HTMLAttributes<HTMLElement>` and spreads `...props`)
  — no component change was needed to make the card itself clickable.

## Known limitations

- **p.6 (barra de progreso) — alternativa descartada, no construida.** El PDF muestra un
  segundo tratamiento de esta misma pantalla: tabs con barra de progreso y porcentaje
  ("EN FECHA 45%"/"RETRASADAS 75%") en vez del `SegmentedControl`, y cada `TaskCard` con
  botón "VER MÁS" en vez del triángulo de acento. No es un `SegmentedControl` (toggle
  simple, sin barra) ni un `Tabs`/`TabNav` genérico (ninguno existe en el kit hoy) — es un
  composite nuevo. Decisión de `004-familia-tareas` (`/sdd-refine`, confirmada por el
  equipo): queda fuera de esta feature, se revisita cuando se priorice el componente nuevo.
- **Contenido del panel de detalle es demo estático, no varía por tarea.** Al clickear
  cualquier `TaskCard`, `DetailSheet` muestra siempre el mismo contenido de ficha (mismos
  datos que `patterns/detail-sheet/DetailSheet.stories.tsx` § `Fichas`) — solo el
  `identifier` del header cambia dinámicamente para reflejar la tarea clickeada. No hay un
  dataset de detalle por tarea en el PDF/mock; mismo criterio de datos estáticos de demo
  que el resto de las screens de este kit.
- **Ancho del panel lateral — corregido 2026-08-11 y 2026-08-12.** El valor original
  (960px, luego 720px) era una aproximación sin chequear el PDF real — Luna lo señaló
  directamente. Medido con `get_drawings()` sobre `Alejandria - Agosto 2026.pdf`
  (Downloads de Luna) p.7: el panel real es `656px` (1312.7pt @2× ÷2), y NO cubre toda la
  grilla — la 1ra columna de `TaskCard` queda visible al costado (fuera del rect del panel).
  El overlay usa `left: 218px` (no `right: 0`) para reproducir ese mismo corte.
  **2026-08-12:** 656px pasó a ser el `max-width` **default** del componente (no solo
  `--wide`) — la hoja de spec limpia (`design-reference.pdf` p.5) dice "Tamaño variable
  según pantalla", confirmando que el 590px original nunca fue una medida real. Ver
  `DetailSheet.spec.md` para el detalle completo (incluye 2 bugs más encontrados por
  Luna ese día: título envuelto en 2 líneas, superposición con el gráfico).
- **Botón "VER MÁS" (usado en `screens/tareas-finalizadas/`) — corregido 2026-08-11.** Era un
  link subrayado sin fondo, inventado; medido contra el PDF real es un chip sólido
  `#494949` con texto blanco, 55×12px. Ver `TaskCard.md`.
- **Colores de `DECISIÓN A/B/C` en `DetailSheet` — verificados 2026-08-11, coincidían.** La
  elección de `--ds-color-pdf-action` (#494949) para el 3er botón, hecha por razonamiento
  (progresión clara→media→oscura) durante `004-familia-tareas`, resultó exacta al medirla
  contra el PDF real — no se cambió nada, solo se confirmó.
- **Topbar y `FilterField` — retrofit 2026-08-11, ver header de este documento.**
- Static demo data (task codes/titles/dates) — no real data source, same convention as
  `Carga de Formulario`/`Home`/`Dashboard`.
- No responsive layout.
