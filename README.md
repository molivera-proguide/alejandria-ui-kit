# Alejandria UI Kit

Monorepo simple con una libreria de componentes React inspirada en las capturas del PDF de Alejandria y una app Vite que la consume como dependencia workspace.

## Scripts

- `pnpm install`
- `pnpm storybook`
- `pnpm dev:web`
- `pnpm build`
- `pnpm pack:ui`

## Estructura

- `packages/ui`: libreria `@alejandria/ui-kit`, tokens, componentes y Storybook.
- `apps/web`: aplicacion React + TypeScript + Vite que consume `@alejandria/ui-kit`.

## Componentes incluidos

- `Button`, `Badge`, `Card`, `TextField`
- `AlertBanner`, `SelectField`, `Switch`, `SegmentedControl`
- `MetricCard` para KPIs operativos.
- `TaskCard` para tarjetas de tareas con prioridad, estado y progreso.
- `ProgressRing` para indicadores circulares de avance.
- `DataTable` para listados compactos de recursos, tareas o eventos.

La app demo usa un asset liviano extraido del PDF como mapa operativo en `apps/web/src/assets/alejandria-map.jpg`.
