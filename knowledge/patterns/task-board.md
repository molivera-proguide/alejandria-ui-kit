---
id: task-board
name: Task Board
category: pattern
status: draft
storybook: Alejandria/TaskCard/Tones
also_in: Alejandria/Overview/OperationsConsole
source: packages/ui/src/components/TaskCard.stories.tsx
last_reviewed: 2026-07-03
---

# Task Board

## Purpose

Grid of operational task cards for scanning status, progress, and metadata across active work items.

## Responsibilities

- Display multiple `TaskCard` instances in a scannable grid.
- Surface code, status, title, description, meta tags, progress, and tone per task.
- Support equal-weight comparison across concurrent tasks.

## Layout structure

CSS grid of task cards:

- **TaskCard/Tones:** `repeat(2, minmax(260px, 1fr))`, `gap: 14` — 2×2.
- **Operations Console:** `repeat(2, minmax(0, 1fr))`, `gap: 12` — 2×2 in the main column.

Storybook variants show cards only; no section header chrome.

## Components involved

| Component | Role |
|-----------|------|
| `TaskCard` ×3–4 | Task cells with status, progress, and meta |

## Composition rules

- Use a 2-column grid in Storybook compositions.
- Each card is self-contained; do not nest cards inside other cards.
- Vary `tone` to reflect priority/severity (danger, success, warning, neutral).
- This is a flat grid, not a Kanban board: no columns by status, no drag-and-drop.

## Responsive behavior

No breakpoints in Storybook. Two fixed columns compress on narrow widths. The demo app uses a 3-column `ops-task-grid`; that variant is outside Storybook.

## When to use

- Active workload overviews on operational dashboards.
- Tone/status comparison across concurrent tasks.

## When not to use

- Kanban workflows with status columns and drag (not implemented).
- Dense tabular listings of many resources (use Operational Table).
- Single task detail (use one `TaskCard` or Mission Panel).

## Related patterns

- [Operations Console](./operations-console.md)
- [Mission Panel](./mission-panel.md)
- [Operational Table](./operational-table.md)
- [Metrics Row](./metrics-row.md)

## Known limitations

- No section header component in Storybook (demo app adds `Badge` + `h2` + “Ver todas”).
- Column count differs between Storybook (2) and demo app (3) without shared guidance.
- Not a Kanban implementation despite PDF references to Kanban.
- No filtering wired to Filter Pair or SegmentedControl in any story.
---
