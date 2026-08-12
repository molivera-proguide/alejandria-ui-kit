# Spec — 004-familia-tareas

## User Stories

### US-1 — Tareas Pendientes en grilla (p.5)
- Given un developer o agente necesita reproducir la vista de Tareas
  Pendientes del PDF
- When se abre `Screens/TareasPendientes` en Storybook
- Then ve `SideBar` expandido + buscador + ícono de filtro +
  `SegmentedControl` ("EN FECHA"/"VENCIDAS") + grilla de 12 `TaskCard`
  (variant `default`, triángulo de acento por `tone`).

### US-2 — Abrir y cerrar el detalle de una tarea (p.7)
- Given la screen de Tareas Pendientes con una `TaskCard` visible
- When el usuario hace click en la card
- Then se abre `DetailSheet` como panel lateral ancho superpuesto (2 pills
  de estado, selects país/fecha, descripción, 3× `MetricCard` ficha,
  "ARCHIVOS MULTIMEDIA", gráfico de rendimiento, footer con 3 acciones
  a/b/c)
- When el usuario hace click en "Cerrar" (ícono `X` del header)
- Then el panel se cierra y vuelve a la grilla sin selección — todo vía
  `useState` local de la screen, sin fetch ni routing.

### US-3 — Tareas en vista Kanban (p.8)
- Given un developer o agente necesita reproducir la vista Kanban
- When se abre `Screens/TareasKanban` en Storybook
- Then ve `SideBar` colapsado + 3 columnas (EN FECHA/RETRASADAS/FINALIZADAS)
  con `TaskCard` variant `kanban` (4/2/1 cards) — sin interacción.

### US-4 — Tareas Finalizadas con "VER MÁS" (p.9)
- Given un developer o agente necesita reproducir la vista de Finalizadas
- When se abre `Screens/TareasFinalizadas` en Storybook
- Then ve `SideBar` colapsado + selects comisaría/fecha + buscador + grilla
  de 8 `TaskCard` (sin triángulo de acento) con botón "VER MÁS" visible en
  cada card, decorativo (sin acción real).

## Fuera de scope (v1)
- **p.6** (tabs + barra de progreso de cumplimiento) — necesita un
  componente nuevo (no es `SegmentedControl` ni `Tabs`/`TabNav`, ninguno
  existe hoy); queda documentada como alternativa descartada.
- **Interactividad más allá de abrir/cerrar el detalle en p.5** — sin
  búsqueda/filtro/orden funcional, sin paginación real, sin drag&drop en
  Kanban; selects/buscador/filtro son decorativos.
- **Gaps genéricos ya trackeados** (`Pagination`, `DataTable sort/filter/paginate`)
  — siguen abiertos en `component-roadmap.md`, no se resuelven acá.
- **Toast/snackbar y Acordeón** (p.20) — Sprint 4, no esta feature.
- **Cambios a `SideBar`, `SegmentedControl`, `MetricCard`, `LineChartCard`,
  `LinearBarChartCard`, `SelectField`** — cero gaps, se consumen tal cual.
- **p.12, 20, 21, 22, 23** del triage — sprints separados (3, 4, 5).
- **`drafts/tipografia-legibilidad.md`** — iniciativa separada, sin refinar.

## Measurable Process Outcomes (DX)
- **DX-001**: el agente completa la implementación con menos de 2 ciclos de
  autocorrección (Rework).
- **DX-002**: mantener la densidad de ambigüedad en 0 — sin consultas de
  aclaración adicionales a las ya resueltas durante `/sdd-refine`.
