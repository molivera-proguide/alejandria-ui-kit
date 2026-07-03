---
id: filter-pair
name: Filter Pair
category: pattern
status: draft
storybook: Alejandria/SelectField/CompactFilters
source: packages/ui/src/components/SelectField.stories.tsx
last_reviewed: 2026-07-03
---

# Filter Pair

## Purpose

Side-by-side scope filters (region + status) for narrowing operational lists.

## Responsibilities

- Present two equal-weight `SelectField` controls.
- Encode independent filter dimensions (geographic scope and operational state).
- Provide a compact filter row without page chrome.

## Layout structure

Two-column CSS grid:

```
display: grid
gap: 14
grid-template-columns: repeat(2, minmax(0, 1fr))
```

Fields:

1. **Region** — Todo el pais / Zona centro / Zona sur / Zona norte
2. **Estado** — Todas / En espera / Asignadas / Criticas

## Components involved

| Component | Role |
|-----------|------|
| `SelectField` ×2 | Scope filters |

## Composition rules

- Use exactly two selects in equal columns for this pattern.
- Labels identify the filter dimension; options encode allowed values.
- Do not mix `SegmentedControl` or `TextField` into this story composition (those exist separately and are not wired together).
- Filters are presentational in Storybook; no binding to Task Board or DataTable.

## Responsive behavior

Fixed two columns. No breakpoints; narrow widths compress both fields equally.

## When to use

- Compact dual-dimension filters above lists or boards.
- Region + status (or similar peer dimensions) filtering.

## When not to use

- Single select fields (use `SelectField` alone).
- Segmented time/scope toggles (use `SegmentedControl` — not composed here).
- Full filter panels combining search, selects, and segments (not implemented as one pattern).

## Related patterns

- [Operational Table](./operational-table.md)
- [Task Board](./task-board.md)
- [Command Header](./command-header.md)
- [Operations Console](./operations-console.md)

## Known limitations

- Not wired to Task Board, DataTable, or SegmentedControl in any story.
- No combined Filter Bar pattern (selects + segmented + search).
- No apply/clear actions.
---
