---
id: metrics-row
name: Metrics Row
category: pattern
status: draft
storybook: Alejandria/MetricCard/Tones
also_in: Alejandria/Overview/OperationsConsole
source: packages/ui/src/components/MetricCard.stories.tsx
last_reviewed: 2026-07-03
---

# Metrics Row

## Purpose

Horizontal KPI strip for at-a-glance operational health (risk, units, alerts, nodes).

## Responsibilities

- Present multiple equal-weight metrics in one scan line.
- Encode each KPI as label, large value, and change text via `MetricCard`.
- Support optional tone props for semantic emphasis (`critical` uses PDF red `#ff0404` on the value).

## Layout structure

CSS grid of four columns:

- **Operations Console:** `repeat(4, minmax(0, 1fr))`, `gap: 14`.
- **MetricCard/Tones:** `repeat(4, minmax(180px, 1fr))`, `gap: 14`.

Each cell is one `MetricCard`. No section heading or wrapper component.

## Components involved

| Component | Role |
|-----------|------|
| `MetricCard` ×4 | KPI cells (label, value, change, optional tone) |

## Composition rules

- Use four cards for the established operational strip (risk, units, alerts, nodes).
- Keep columns equal weight; do not feature a single dominant metric.
- Place the row below the command header and above task/mission content when used in Operations Console.
- Prefer `MetricCard` over ad-hoc stat markup for KPI strips.

## Responsive behavior

No breakpoints in Storybook. Fixed four-column grids will compress or overflow on narrow viewports. The demo app defines media-query collapse for `ops-metrics`; that behavior is not part of these stories.

## When to use

- Operational dashboards needing a quick health strip.
- Reporting views that lead with summary KPIs before detail.

## When not to use

- Single metric callouts inside a mission panel (use inline stats or `ProgressRing`).
- Module-level metrics (use `ModuleCard` metric pairs).
- Tabular multi-column resource data (use Operational Table).

## Related patterns

- [Operations Console](./operations-console.md)
- [Mission Panel](./mission-panel.md)
- [Chart Gallery](./chart-gallery.md)

## Known limitations

- No `MetricsRow` wrapper component; layout is inline in stories.
- Only `tone="critical"` changes value color; `good` / `watch` share neutral white.
- Wide label tracking (`0.41em`) can overflow narrow columns.
- Responsive collapse exists only in `apps/web`, not Storybook.
---
