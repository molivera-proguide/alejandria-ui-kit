---
id: module-grid
name: Module Grid
category: pattern
status: draft
storybook: Alejandria/ModuleCard/GridExample
source: packages/ui/src/components/ModuleCard.stories.tsx
last_reviewed: 2026-07-03
---

# Module Grid

## Purpose

Module launcher hub: browse platform modules with icon, title, and key metrics per module.

## Responsibilities

- Present multiple `ModuleCard` instances in a responsive auto-fit grid.
- Show module identity (icon + title) and two metric pairs per card.
- Provide equal visual weight across modules (no featured module).

## Layout structure

Full-width CSS grid:

```
display: grid
gap: 20
grid-template-columns: repeat(auto-fit, minmax(260px, 1fr))
width: 100%
```

Seven modules in `GridExample`: Investigaciones, Ciberseguridad, Evidencias, Género, Catástrofes, Despliegue, Bandeja.

Per-card hierarchy: icon (top) → title → divider → metric pairs.

## Components involved

| Component | Role |
|-----------|------|
| `ModuleCard` ×7 | Module tiles |

Icons: Alejandria SVG assets via `<img src={Icons.*} />` from `packages/ui/src/Icons`.

## Composition rules

- Use `auto-fit` + `minmax(260px, 1fr)` for responsive wrapping.
- Keep cards uniform; do not group or feature a single module.
- Supply module icons from the Alejandria icon set, not lucide-react.
- Individual module stories (`Investigaciones`, `Ciberseguridad`, etc.) are single-card demos, not this pattern.

## Responsive behavior

`auto-fit` collapses columns as width shrinks, maintaining a minimum card width of 240px. No additional media queries.

## When to use

- Platform module selection / launcher views.
- Any equal-weight gallery of `ModuleCard` instances.

## When not to use

- Operational task workload (use Task Board).
- KPI health strips (use Metrics Row).
- Full page shells with navigation (no page chrome in this story).

## Related patterns

- [Operations Console](./operations-console.md)
- [Metrics Row](./metrics-row.md)
- [Chart Gallery](./chart-gallery.md)

## Known limitations

- Not used in Operations Console or `apps/web`.
- No page-level heading, navigation, or footer in the story.
- Not a full Módulos hub screen — grid composition only.
- No click/navigation handlers in the story.
---
