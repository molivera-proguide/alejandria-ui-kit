# Spec — 005-alert-toast-filter

## User Stories

### US-1 — `AlertBar`
- Given un developer o agente necesita una franja de alerta full-width
- When usa `AlertBar` con `tone="default"` o `tone="alerta"`
- Then ve un label centrado, fondo `#494949`, borde `#606060`, texto blanco o
  rojo `#ff0404` según el tono.

### US-2 — `Toast`
- Given una acción que necesita confirmación breve, no bloqueante
- When se renderiza `Toast` con un mensaje
- Then aparece centrado (fondo `#060606`, borde `#606060`, texto blanco) y
  desaparece solo a los 4000ms, sin requerir cierre manual.

### US-3 — `FilterField`
- Given un developer o agente necesita el campo compuesto filtro+búsqueda
- When usa `FilterField`
- Then ve ícono de filtro+chevron afuera a la izquierda + input oscuro
  400×50px con lupa adentro a la derecha, sin label flotante. Click en el
  ícono de filtro no abre nada (decorativo).

### US-4 — Topbar + filtro real en Tareas Pendientes
- Given la screen `TareasPendientes` de `004-familia-tareas`
- When se abre en Storybook
- Then muestra el topbar (`AlertBar` "N TAREAS PENDIENTES" + íconos
  colapsar/atrás/adelante) y el toolbar usa `FilterField` en vez del hack
  `Button`+`TextField` anterior.

### US-5 — Topbar + filtro + progreso por columna en Tareas Kanban
- Given la screen `TareasKanban`
- When se abre en Storybook
- Then muestra el topbar, una fila con `FilterField` (no existía), y cada
  columna (EN FECHA/RETRASADAS/FINALIZADAS) tiene una barra de progreso +
  ícono "..." debajo de su título.

### US-6 — Topbar + filtro + contenido completo en Tareas Finalizadas
- Given la screen `TareasFinalizadas`
- When se abre en Storybook
- Then muestra el topbar, `FilterField` en vez del `TextField` anterior, y
  las 8 `TaskCard` muestran `creator`/`startDate`/`endDate` además de
  `status`/`title`/`meta` (contenido completo, igual que Pendientes).

## Fuera de scope (v1)
- **Limpieza de `TextField`/`SelectField`/`AlertBanner`** — identificados como
  inventados durante el grilling; trabajo pendiente aparte, no de esta feature.
- **Tonos adicionales de `Toast`** (error/warning/info) — solo `success`.
- **Desplegable funcional del ícono de filtro** — el PDF no lo especifica
  ("me falta desarrollar el desplegable del funnel").
- **Dashboard (p.4, `003-home-dashboard`, `CLOSED`)** — mismo gap de topbar,
  decisión explícita de Luna de dejarlo afuera por ahora.
- **Resto del draft original** (`pantallas-grupo-a-b.md`): p.12/23 (Sprint 3),
  p.20 resto/Acordeón (Sprint 4), p.21/22 (Sprint 5).
- `drafts/tipografia-legibilidad.md` — iniciativa separada, sin refinar.

## Measurable Process Outcomes (DX)
- **DX-001**: el agente completa la implementación con menos de 2 ciclos de
  autocorrección (Rework).
- **DX-002**: mantener la densidad de ambigüedad en 0 — sin consultas de
  aclaración adicionales a las ya resueltas durante `/sdd-refine`.
