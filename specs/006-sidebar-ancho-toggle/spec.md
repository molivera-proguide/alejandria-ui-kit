# Spec — 006-sidebar-ancho-toggle

## User Stories

### US-1 — Ancho de `SideBar` medido, no invented
- Given el equipo de diseño/QA necesita que `SideBar` calce con el artwork real
- When se corre el sweep PyMuPDF contra `design-reference.pdf` p.13 y
  `Alejandria - Agosto 2026.pdf` p.5/8/9
- Then `.ds-sidebar` expandido y `.ds-sidebar--collapsed` usan valores medidos
  (tokens dedicados si difieren de los reutilizados), documentados con la
  evidencia de medición en `plan.md`.

### US-2 — Edge-toggle eliminado, heading como único control interno
- Given `SideBar` tenía 3 formas de togglear el colapso (heading, edge-toggle,
  ícono de topbar)
- When se elimina `button.ds-sidebar__edge-toggle`/`SideBarChevron`
- Then el heading "Menú" queda como único control interno, con
  `aria-expanded`/`aria-label` migrados, y el árbol DOM ya no tiene el botón
  hermano del `<nav>`.

### US-3 — Colapso real en Tareas Pendientes
- Given `TareasPendientes` con `SideBar` estático (`onToggleCollapsed={() =>
  undefined}`)
- When se clickea el heading "Menú" o el ícono `OpenCloseSidebarIcon` del topbar
- Then el `SideBar` colapsa/expande de verdad vía `useState` local de la screen.

### US-4 — Colapso real en Tareas Kanban
- Given `TareasKanban` con el mismo estado estático
- When se clickea cualquiera de los dos controles
- Then colapsa/expande vía `useState` local, independiente de las otras 2
  screens.

### US-5 — Colapso real en Tareas Finalizadas
- Given `TareasFinalizadas` con el mismo estado estático
- When se clickea cualquiera de los dos controles
- Then colapsa/expande vía `useState` local, independiente de las otras 2
  screens.

### US-6 — Consumidores existentes sin regresión
- Given `Home`, `Dashboard` y `CargaDeFormulario` ya usan `SideBar` (features
  `CLOSED`)
- When se aplican los nuevos anchos y se elimina el edge-toggle
- Then las 3 screens siguen funcionando visualmente sin overlap ni layout roto,
  sin que se les agregue ni cambie ninguna otra pieza.

## Fuera de scope (v1)

- **Variante p.6** (tabs + barra de progreso) de Tareas Pendientes — descartada
  en `004-familia-tareas`, no se reabre.
- **Glifo exacto del edge-toggle** — queda moot: se elimina el control, no se
  corrige su pictograma.
- **Estado global, fetch o routing real** — el colapso sigue siendo `useState`
  local por screen, sin persistencia entre navegaciones.
- **Export de las 3 screens de Tareas en `index.ts`** — siguen Storybook-only.
- **Cambios de layout/contenido en Home, Dashboard, Carga de Formulario** — solo
  deben seguir funcionando con el nuevo ancho.
- **Edición directa de PROHIBITED-1 de `004`/`005`** — la relación con esas
  constitutions ya `CLOSED` se razona en `DECISIONS.md`, no se editan esos
  archivos salvo el MUST-3 puntual de `004`.

## Measurable Process Outcomes (DX)

- **DX-001**: el agente completa la implementación con menos de 3 ciclos de
  autocorrección (Rework) — feature cruza 1 componente compartido + 3 screens,
  algo más de superficie que features previas de 1-2 ciclos.
- **DX-002**: mantener la densidad de ambigüedad en 0 — sin consultas de
  aclaración adicionales a las ya resueltas durante `/sdd-refine`.
