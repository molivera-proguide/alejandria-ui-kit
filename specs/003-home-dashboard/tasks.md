# Tasks — 003-home-dashboard

| ID | US | Descripción | Archivos |
|---|---|---|---|
| T001 | — | Validar entorno existente (`pnpm install`) | — |
| T002 | US-3 | Componer Home: `SideBar` expandido + `Asistente` completo + "PRÓXIMOS EVENTOS" (`CalendarCard` ×6) + "RESUMEN DE PRODUCTIVIDAD" (`MetricCard` ×2 + `DonutChartCard`, corregido 2026-08-11 desde `ProgressRing`) + "TAREAS EN FECHA" (`TaskCard`) en layout 3 columnas — gate de fidelidad antes de fijar spacing/grid | `screens/home/Home.stories.tsx` (nuevo), `screens/home/home.css` (nuevo), `knowledge/screens/home.md` (nuevo) |
| T003 | US-4 | Componer Dashboard: `SideBar` colapsado + grilla 2×4 de `ModuleCard` (8), confirmar filas de `ModuleMetric` por card — gate de fidelidad antes de fijar el grid | `screens/dashboard/Dashboard.stories.tsx` (nuevo), `screens/dashboard/dashboard.css` (nuevo), `knowledge/screens/dashboard.md` (nuevo) |
| T004 | US-1, US-2 | Documentar en el checklist/review que p.1 (Welcome) y p.2 (Login) quedan confirmadas sin gap, sin artefacto nuevo | — |
