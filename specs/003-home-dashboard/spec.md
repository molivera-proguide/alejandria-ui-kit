# Spec — 003-home-dashboard

## User Stories

### US-1 — Welcome confirmado sin gap (p.1)
- Given el triage confirma p.1 como asset estático de una sola vez
- When se revisa esta feature
- Then no se genera ningún `.tsx`/`.css`/screen doc para Welcome — queda
  documentado como confirmado en `tasks.md`, sin artefacto nuevo.

### US-2 — Login confirmado sin gap (p.2)
- Given `Login.tsx` ya coincide 1:1 con p.2 y ya usa `BackgroundTextureDots`
  (Sprint 0 / `002-bg-texture`, CLOSED)
- When se revisa esta feature
- Then no se genera ningún artefacto nuevo para Login — la pregunta sobre el
  fondo full-screen queda resuelta por ese cierre previo.

### US-3 — Home compuesta (p.3)
- Given un developer o agente necesita reproducir la pantalla Home del PDF
- When se abre `Screens/Home` en Storybook
- Then ve `SideBar` expandido + saludo "HOLA SEBASTIÁN, ¿QUÉ QUERÉS HACER
  HOY?" + `Asistente` completo (mic, adjuntar, EJECUTAR, 4 chips) +
  "PRÓXIMOS EVENTOS" (6× `CalendarCard`) + "RESUMEN DE PRODUCTIVIDAD" (2×
  `MetricCard` ficha + 1× `DonutChartCard` "ASISTENCIAS" 75%, corregido
  2026-08-11 desde `ProgressRing` — ver `DECISIONS.md`) + columna derecha
  fija "TAREAS EN FECHA" (`TaskCard` scrolleable), con badge de
  notificación en la campana del `SideBar`.

### US-4 — Dashboard compuesto (p.4)
- Given un developer o agente necesita reproducir el Dashboard de módulos
- When se abre `Screens/Dashboard` en Storybook
- Then ve `SideBar` colapsado + grilla 2×4 de `ModuleCard` (8 cards), cada
  una con 1 o 2 filas de `ModuleMetric` según corresponda (ej.
  "INVESTIGACIONES ABIERTAS: 30" + "CASOS PENDIENTES: 6").

## Fuera de scope (v1)
- **p.5, 6, 7, 8, 9** (Sprint 2 — Familia Tareas) — sprint separado.
- **p.12, 23** (Sprint 3), **p.20** (Sprint 4), **p.21, 22** (Sprint 5).
- **Resolver si p.5/p.6 son pantallas distintas o field gallery** —
  pregunta explícita de Sprint 2.
- **Cualquier cambio a `Asistente.tsx`** — se reusa completo, sin modificar.
- **Cualquier cambio a `SideBar`, `CalendarCard`, `MetricCard`,
  `DonutChartCard`, `TaskCard`, `ModuleCard`** — cero gaps, se consumen tal
  cual.
- **`drafts/fondo-animado-nota-diseno.md`** (ya consumido por
  `002-bg-texture`, CLOSED) y **`drafts/tipografia-legibilidad.md`** — no
  forman parte de este sprint.

## Measurable Process Outcomes (DX)
- **DX-001**: el agente completa la implementación con menos de 2 ciclos de
  autocorrección (Rework).
- **DX-002**: mantener la densidad de ambigüedad en 0 — sin consultas de
  aclaración adicionales a las ya resueltas durante `/sdd-refine`.
