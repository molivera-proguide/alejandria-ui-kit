---
id: chart-gallery
name: Chart Gallery
category: pattern
status: draft
storybook: Alejandria/ChartCard/Gallery
source: packages/ui/src/components/ChartCard.stories.tsx
last_reviewed: 2026-07-03
---

# Chart Gallery

## Purpose

Reporting wall showing multiple chart types side by side for comparative analytics (zones, tasks, alerts, resources).

## Responsibilities

- Arrange chart cards in a balanced multi-cell grid.
- Mix bar, donut, and line chart variants under the shared `ChartCard` shell.
- Give each chart equal visual weight with title and footer.

## Layout structure

2×2 CSS grid:

```
display: grid
gap: 14
grid-template-columns: repeat(2, minmax(280px, 1fr))
```

Cells in `Gallery`:

1. `BarChartCard` — Incidentes por zona
2. `DonutChartCard` — Tareas
3. `LineChartCard` — Alertas por hora
4. `BarChartCard` — Recursos desplegados

No dashboard section title or page chrome.

## Components involved

| Component | Role |
|-----------|------|
| `BarChartCard` ×2 | Categorical bar charts |
| `DonutChartCard` | Proportional split with primary/secondary stats |
| `LineChartCard` | Time-series trend |

All use the `ChartCard` shell (title, footer, body).

## Composition rules

- Prefer the specialized chart components over bare `ChartCard` for real data.
- Keep a 2-column gallery for comparative reading.
- Each card owns its own title and footer; do not share a single legend across cards.
- Single-chart stories (`BarChart`, `DonutChart`, `LineChart`) are not this pattern.

## Responsive behavior

Fixed two columns with `minmax(280px, 1fr)`. No breakpoints; narrow viewports may overflow or compress.

## When to use

- Reporting views that compare multiple metrics/chart types.
- Analytics walls where charts are peers, not a single hero chart.

## When not to use

- Single chart embeds (use one chart component).
- KPI-only strips without charts (use Metrics Row).
- Full operational consoles with tasks and mission panels (use Operations Console).

## Related patterns

- [Metrics Row](./metrics-row.md)
- [Operations Console](./operations-console.md)
- [Module Grid](./module-grid.md)

## Known limitations

- No reporting dashboard wrapper or page heading.
- Not used in Operations Console or `apps/web`.
- Chart gallery and metrics row exist separately; no combined reporting screen story.
- No interactive legends, drill-down, or live data.
---
