# Constitution — 005-alert-toast-filter

## MUST

1. 3 componentes nuevos, un `.tsx` + un `.stories.tsx` plano cada uno en
   `packages/ui/src/components/`, exportados desde `index.ts`:
   - `AlertBar` — franja full-width, fondo `#494949`, borde `0,75pt #606060`,
     label Source Code Bold 20pt`@2×`→10px; tonos `default` (`#ffffff`) y
     `alerta` (`#ff0404`). Sin slots de ícono/descripción/acción.
   - `Toast` — fondo `#060606`, borde `0,75pt #606060`, texto Source Code Bold
     18pt`@2×`→9px `#ffffff`. Auto-dismiss a los 4000ms (`useState`+`useEffect`
     local, sin estado global), sin botón de cierre. Un solo tono (`success`).
     Mensaje configurable vía prop, no hardcodeado.
   - `FilterField` — compuesto: ícono filtro (`FiltroIcon` existente) + chevron
     afuera a la izquierda + input oscuro con lupa adentro a la derecha, sin
     label flotante. Medida **400×50px final — única excepción de esta feature
     a la convención `@2×÷2`**, confirmado explícitamente con Luna. Ícono de
     filtro decorativo (sin desplegable funcional — el PDF no lo especifica).
2. 3 íconos nuevos en `Icons/Menu/` (adelante, atrás, colapsar/expandir
   sidebar — assets ya provistos por Luna), exportados como URL strings desde
   `Icons/index.ts`, mismo patrón que el resto del set. `Filtro-50x50.svg` ya
   existe (`FiltroIcon`) — reusado, no reimportado.
3. Retrofit de `004-familia-tareas` (mismo feature, `OPEN`, mismo owner — no es
   colisión de equipo): las 3 screens (`tareas-pendientes`, `tareas-kanban`,
   `tareas-finalizadas`) agregan el topbar (`AlertBar` + los 3 íconos sueltos,
   compuestos en la screen, no parte de `AlertBar`) y reemplazan el hack
   `Button`+`TextField` por `FilterField` real.
4. `tareas-kanban` agrega además la fila de `FilterField` que le faltaba, y una
   barra de progreso + ícono "..." por columna (hallazgo del fidelity-check,
   sin spec exacta del PDF — verificar antes de fijar geometría).
5. `tareas-finalizadas` cambia sus 8 `TaskCard` a contenido completo
   (`creator`/`startDate`/`endDate`), igual que `tareas-pendientes` — hoy
   tienen una versión recortada que no coincide con el PDF real.
6. Antes de fijar cualquier geometría/color nuevo: gate de
   `knowledge/visual-analysis-protocol.md` (PASS 9) — este feature ya viene de
   un ciclo donde no verificar contra el PDF real generó 3 rondas de
   correcciones; no repetir ese patrón.
7. `knowledge/components/{AlertBar,Toast,FilterField}.md` + specs +
   `design-system-manifest.json` + `knowledge/index.md`, mismo formato que los
   24 componentes ya documentados.
8. Verificación manual en Storybook (sin framework de test instalado),
   incluido el timer de auto-dismiss de `Toast`.

## PROHIBITED

1. No modificar `TextField.tsx`, `SelectField.tsx` ni `AlertBanner.tsx` — la
   limpieza de esos 3 (identificados como inventados) queda para otra feature.
2. No construir tonos adicionales de `Toast` (error/warning/info) — solo
   `success`.
3. No construir el desplegable funcional del ícono de filtro — decorativo.
4. No agregar el topbar a Dashboard (p.4, `003-home-dashboard`, `CLOSED`) —
   decisión explícita de Luna, queda afuera de esta feature.
5. No tocar p.12, 20 (resto), 21, 22 del triage original — sprints separados.
6. No instalar framework de test ni linter como efecto colateral.
7. No modificar `existing-arch.md`.
