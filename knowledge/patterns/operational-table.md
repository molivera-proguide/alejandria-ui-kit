---
id: operational-table
name: Operational Table
category: pattern
status: draft
storybook: Alejandria/DataTable/DenseOperationalRows
also_in: Alejandria/DataTable/Playground
source: packages/ui/src/components/DataTable.stories.tsx
last_reviewed: 2026-07-03
---

# Operational Table

## Purpose

Tabular listing of tasks or resources with badge-encoded status in cells.

## Responsibilities

- Present structured rows of operational entities (tasks, resources).
- Encode status with `Badge` chips inside cells.
- Support optional caption and column alignment.

## Layout structure

Single full-width `DataTable` in a padded decorator (`minWidth: 720`).

### Playground (tasks)

- Caption: “Tareas recientes”
- Columns: ID, Zona, Estado, Unidades (right-aligned)
- Rows: four tasks with status `Badge` tones (danger, success, warning, info)

### DenseOperationalRows (resources)

- Caption: “Recursos”
- Columns: Recurso, Responsable, ETA (center), Estado (right)
- Rows: three resources with status `Badge` tones (success, info, warning)

Hierarchy: caption → header row → data rows. Status column uses right-aligned `Badge` chips.

## Components involved

| Component | Role |
|-----------|------|
| `DataTable` | Table shell (columns, rows, caption) |
| `Badge` | Status chips embedded in row cells |

## Composition rules

- Pass `Badge` elements as cell values for status columns; do not use plain status strings when semantic tone matters.
- Use `align` on numeric or status columns (`right` / `center`) as shown in stories.
- Caption is optional (`WithoutCaption` story); prefer captions for operational context.
- Do not embed filters, pagination, or section headers in the table pattern — those are not composed in Storybook.

## Responsive behavior

Decorator enforces `minWidth: 720`. No horizontal scroll strategy or column collapse is defined in stories.

## When to use

- Dense listings of tasks or resources with status chips.
- Operational inventories where columns matter more than card layouts.

## When not to use

- Scannable task cards with progress (use Task Board).
- KPI summaries (use Metrics Row).
- Chronological event feeds (demo-app only; not in Storybook).

## Related patterns

- [Task Board](./task-board.md)
- [Filter Pair](./filter-pair.md)
- [Metrics Row](./metrics-row.md)
- [Alert Stack](./alert-stack.md)

## Known limitations

- Not combined with Filter Pair, section heads, or pagination.
- No sorting, selection, or row actions in stories.
- Differs from the demo-app event feed (list pattern, not a table).
---
