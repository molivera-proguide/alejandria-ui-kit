---
id: operations-console-screen
name: Operations Console
category: screen
status: draft
storybook: Alejandria/Overview/OperationsConsole
source: packages/ui/src/components/Components.stories.tsx
layout: fullscreen
last_reviewed: 2026-07-03
---

# Operations Console

## Purpose

Fullscreen operational control screen for situational awareness: alert context, KPI health, active tasks, and a focused mission panel with search.

This is the only fullscreen screen composition currently present in Storybook (`Alejandria/Overview` → `OperationsConsole`).

## User goals

- See whether a new alert requires attention.
- Read four operational KPIs at a glance (risk, units, alerts, nodes).
- Scan active tasks by status, priority tone, and progress.
- Inspect mission progress and search for a task by ID, zone, or dependencia.
- Reach primary actions: Filtrar and Asignar.

## Main regions

| Region | Contents |
|--------|----------|
| **Command header** | Danger `Badge` (“Alerta nueva”), display title “Alejandria UI”, Filtrar / Asignar buttons |
| **Metrics row** | Four `MetricCard` KPIs in equal columns |
| **Task board** | 2×2 `TaskCard` grid (wider column) |
| **Mission panel** | `Card` “Pronostico” with `ProgressRing`, `TextField` search, footer badge and action |

Canvas: paper background with subtle grid overlay, `minHeight: 100vh`, `padding: 24`, vertical `gap: 18`.

## Patterns used

- [Operations Console](../patterns/operations-console.md) (screen-level composition)
- [Command Header](../patterns/command-header.md)
- [Metrics Row](../patterns/metrics-row.md)
- [Task Board](../patterns/task-board.md)
- [Mission Panel](../patterns/mission-panel.md)

## Components used

`Badge`, `Button`, `MetricCard`, `TaskCard`, `Card`, `ProgressRing`, `TextField`

External icons from `lucide-react`.

## Navigation

No navigation rail, routes, or menu items in this Storybook screen. Actions are static buttons without handlers. Entry point is Storybook only (`Alejandria/Overview/OperationsConsole`).

A richer application shell with navigation rail, map hero, and side panels exists in `apps/web` but is **not** a Storybook screen and is not documented here.

## Responsive behavior

No media queries or responsive grid collapse. Fixed four-column metrics and `1.3fr / 0.7fr` main split. Narrow viewports will compress or overflow.

## Accessibility considerations

- Title is a native `h1`.
- Buttons and form field rely on component-level semantics (`Button`, `TextField`).
- Alert state is visual (`Badge` with dot); no `aria-live` region for alerts.
- Decorative/background grid is CSS-only.
- Icons in buttons should be accompanied by visible labels (present: “Filtrar”, “Asignar”).
- Mission panel search has a visible label (“Buscar tarea”).
- No keyboard focus order or skip-link strategy is defined at screen level.
- `MetricCard` icons passed in the story are not rendered, so icon-only meaning is not available.

## Known limitations

- Only Storybook screen today; no `Alejandria/Screens/*` story group.
- Static markup — no data fetching, routing, or interactions.
- Missing regions present in the demo app: navigation rail, map hero, event feed, resource summary.
- No responsive layout.
- Not a Login, Ficha, Modal, Módulos hub, or Kanban screen (those do not exist in Storybook).
---
