---
id: operations-console
name: Operations Console
category: pattern
status: draft
storybook: Alejandria/Overview/OperationsConsole
source: packages/ui/src/components/Components.stories.tsx
last_reviewed: 2026-07-03
---

# Operations Console

## Purpose

Single-screen operational dashboard that combines KPIs, active task workload, and a side mission panel for situational awareness and primary operator actions (filter, assign, search).

## Responsibilities

- Present page-level alert state and mission title.
- Surface four equal-weight operational KPIs.
- Display an active task grid for scanning status and progress.
- Provide a secondary mission panel with progress and task search.
- Host primary actions (Filtrar, Asignar) in the command header.

## Layout structure

Fullscreen CSS grid (`gap: 18`, `padding: 24`, `minHeight: 100vh`) with three vertical regions:

1. **Command header** — horizontal flex, space-between: title block left, button group right.
2. **Metrics row** — four equal columns (`repeat(4, minmax(0, 1fr))`, `gap: 14`).
3. **Main split** — `1.3fr / 0.7fr`:
   - Left: 2×2 `TaskCard` grid (`gap: 12`).
   - Right: single mission `Card` with centered body stack.

Visual hierarchy: danger `Badge` and display `h1` → primary actions → KPI strip → task grid (dominant width) → side mission panel.

## Components involved

| Component | Role |
|-----------|------|
| `Badge` | Alert chip in header; status chip in mission panel footer |
| `Button` | Filtrar (secondary), Asignar (primary), Ver log (footer) |
| `MetricCard` ×4 | KPI strip |
| `TaskCard` ×4 | Task board |
| `Card` | Mission panel shell |
| `ProgressRing` | Mission progress in panel body |
| `TextField` | Task search inside mission panel |

External: `lucide-react` icons (`Filter`, `ArrowRight`, `Crosshair`, `Search`, `AlertTriangle`, `Shield`, `RadioTower`, `Activity`).

## Composition rules

- Compose from package components only; layout is inline styles in the story (no exported layout component).
- Header always pairs alert `Badge` + display title with action buttons.
- Metrics row uses exactly four `MetricCard` instances in equal columns.
- Task board occupies the wider column; mission panel the narrower.
- Mission panel uses `Card` slots: `eyebrow`, `title`, `description`, `actions`, `footer`, and body children.
- Do not introduce navigation rail, map hero, or event feed here — those exist only in `apps/web`, not in this Storybook composition.

## Responsive behavior

No responsive breakpoints are defined in the story. The four-column metrics row and `1.3fr / 0.7fr` split remain fixed at all widths. Narrow viewports will overflow or compress columns.

## When to use

- Storybook reference for the flagship operational dashboard composition.
- Situational awareness views that need KPIs + tasks + a focused mission panel in one canvas.
- As the documented Storybook counterpart to the fuller demo in `apps/web`.

## When not to use

- Full application shells with navigation rail, map hero, or side event feeds (not present in this story).
- Module launcher hubs (use Module Grid).
- Reporting walls of charts (use Chart Gallery).
- Tabular resource listings (use Operational Table).

## Related patterns

- [Command Header](./command-header.md)
- [Metrics Row](./metrics-row.md)
- [Task Board](./task-board.md)
- [Mission Panel](./mission-panel.md)
- Screen: [Operations Console](../screens/operations-console.md)

## Known limitations

- Layout is story-only inline styles; not exported from `@alejandria/ui-kit`.
- No shared layout primitive with `apps/web` (demo is a superset with different regions).
- `MetricCard` `icon` prop is passed in the story but not rendered by the component.
- No responsive collapse rules.
- No live data, routing, or interaction beyond static markup.
---
