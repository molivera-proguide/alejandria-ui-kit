# Brief — Sprint 1: Home & Dashboard (p.1, 2, 3, 4)

> Generado por `/sdd-refine` el 2026-08-11, a partir de `drafts/pantallas-grupo-a-b.md`
> § Grupo A (p.1-4) y `existing-arch.md`. Alcance: **Sprint 1** de la recomendación de
> agrupamiento del draft (ver `handoffs/20260810-fase1-sprint1-home-dashboard.md`).
> Excluye explícitamente el resto del draft: Sprint 2 (Familia Tareas, p.5-9), Sprint 3
> (Reportes & Usuarios, p.12, 23), Sprint 4 (Toast + Acordeón, p.20), Sprint 5 (Tabs +
> Chat, p.21-22). También excluye `drafts/fondo-animado-nota-diseno.md` y
> `drafts/tipografia-legibilidad.md` — iniciativas separadas, no relacionadas con estas
> 4 páginas (la primera es una corrección ya resuelta sobre `002-bg-texture`, CLOSED).

## 1. PROBLEMA

El PDF "Alejandria - Agosto 2026.pdf" muestra pantallas **compuestas** (la capa arriba
de los componentes individuales: cómo se combinan en superficies de producto reales),
pero el kit hoy solo tiene un precedente de esa capa (`screens/carga-de-formulario/`).
De las 14 páginas pendientes de triage, 4 (p.1, 2, 3, 4) están confirmadas por el draft
como "cero gaps de componente nuevo" — todo lo que necesitan ya existe y está
fidelity-checked — pero **no existen como composición documentada/reproducible**
todavía. Sin esa capa, un agente de IA (el consumidor principal del kit, según
`existing-arch.md`) tiene los átomos pero no el criterio de cómo ensamblarlos en estas
pantallas específicas.

**Hallazgo que esta feature también resuelve:** el triage original en
`knowledge/component-roadmap.md` (2026-08-07) tiene un error real en la fila de p.3 —
dice "Asistente IA (estado vacío)" cuando el contenido real (re-verificado con
`get_pixmap()` el 2026-08-10, ver `drafts/pantallas-grupo-a-b.md`) es el Home completo:
SideBar + input de Asistente + próximos eventos + KPIs + tareas en fecha. No existe una
página separada de "Asistente vacío" en este PDF — Home y "Asistente vacío" eran la
misma pantalla contada dos veces con dos nombres.

## 2. USUARIO

Sin persona/contexto de producto específico (mismo criterio que `001-form-modal` y
`002-bg-texture`) — el consumidor es cualquier developer o agente de IA que use
`@alejandria/ui-kit` y necesite reproducir Welcome/Login/Home/Dashboard tal como las
define el PDF, con el criterio de composición ya resuelto en vez de tener que
redescubrirlo desde los componentes sueltos.

## 3. DONE CRITERIA

**p.1 — Welcome / splash**
- Confirmado sin gap: ilustración 3D decorativa + wordmark, asset estático de una sola
  vez. **No se crea ningún artefacto nuevo** (ni `.tsx`, ni `knowledge/screens/*.md`) —
  la confirmación queda documentada en `spec.md`/`tasks.md` de esta feature, no como
  una task de construcción.

**p.2 — Login**
- Confirmado sin gap a nivel *screen*: coincide 1:1 con `patterns/login/Login.tsx`, que
  ya usa `BackgroundTextureDots` (resuelto en Sprint 0 / `002-bg-texture`, CLOSED). La
  pregunta chica del draft (¿el fondo full-screen es el mismo token que el de la card?)
  queda resuelta por ese mismo cierre. **No se crea ningún artefacto nuevo** — solo
  confirmación documentada.

**p.3 — Home (eventos + KPIs)**
- Se crea `packages/ui/src/screens/home/Home.stories.tsx` + `home.css`, siguiendo
  exactamente el precedente de `screens/carga-de-formulario/` (composición vive en el
  `.stories.tsx`, no hay `.tsx` de componente separado ni export en `index.ts` — los
  screens son Storybook-only).
- Regiones de la composición: `SideBar` expandido (mismo item set que
  `SideBar.stories.tsx`, con `badge` en el ítem de notificaciones — prop ya soportada,
  confirmado en `SideBar.tsx:27`) · `Asistente` **reusado completo, tal cual** (shell
  entero, no se extrae el input+chips por separado — decisión confirmada) · "PRÓXIMOS
  EVENTOS" con 6× `CalendarCard` · "RESUMEN DE PRODUCTIVIDAD" con 2× `MetricCard` ficha
  + 1× `ProgressRing` "ASISTENCIAS" 75% · columna derecha fija "TAREAS EN FECHA" con
  lista scrolleable de `TaskCard`.
- Se crea `knowledge/screens/home.md` (mismo formato que
  `knowledge/screens/carga-de-formulario.md`).

**p.4 — Dashboard módulos**
- Se crea `packages/ui/src/screens/dashboard/Dashboard.stories.tsx` + `dashboard.css`,
  mismo precedente que Home.
- Grilla 2×4 de `ModuleCard` ×8, `SideBar` colapsado. Varias cards usan 2 filas de
  `ModuleMetric[]` (ej. "INVESTIGACIONES ABIERTAS: 30" + "CASOS PENDIENTES: 6") — ya
  soportado por la API actual de `ModuleCard.tsx`, sin cambios al componente.
- Se crea `knowledge/screens/dashboard.md`.

**Corrección de gobernanza (aplicada como parte de esta feature, no como `/sdd-fix`
aparte — es documentación, no código):**
- `knowledge/component-roadmap.md` § "Screens triage": la fila `p.3` pasa de
  "Asistente IA (estado vacío)" a "Home (eventos + KPIs)", con nota explicando el
  hallazgo. Las filas `p.5`/`p.6` **no se tocan** en esta corrección — la pregunta de si
  son pantallas reales distintas o alternativas de diseño del mismo patrón queda para
  el grilling de Sprint 2 (Familia Tareas), como ya decidió el handoff previo.

## 4. OUT OF SCOPE

- p.5, 6, 7, 8, 9 (Sprint 2 — Familia Tareas), p.12, 23 (Sprint 3), p.20 (Sprint 4),
  p.21, 22 (Sprint 5) — quedan para sus propios `/sdd-refine` según la recomendación de
  agrupamiento del draft.
- Resolver si p.5/p.6 son pantallas reales distintas o una field gallery del mismo
  patrón (precedente: p.19) — pregunta explícita de Sprint 2, no de este sprint.
- Cualquier cambio a `Asistente.tsx` — se reusa completo, tal cual está, sin modificar
  su shell ni extraer piezas.
- Cualquier cambio a `SideBar.tsx`, `CalendarCard.tsx`, `MetricCard.tsx`,
  `ProgressRing.tsx`, `TaskCard.tsx` o `ModuleCard.tsx` — todos se consumen tal cual
  están, cero gaps de componente confirmados por el draft.
- `drafts/fondo-animado-nota-diseno.md` (animación de `002-bg-texture`, feature
  separada ya CLOSED) y `drafts/tipografia-legibilidad.md` (escala tipográfica global,
  feature separada, aún sin refinar) — no forman parte de este sprint.

## 5. RESTRICCIONES TÉCNICAS

- Convención de screens (`existing-arch.md` + precedente real en
  `screens/carga-de-formulario/`): composición completa vive en un único
  `<Slug>.stories.tsx` + `<slug>.css` dentro de `packages/ui/src/screens/<slug>/` — sin
  `.tsx` de componente separado, sin export en `index.ts` (los screens son
  Storybook-only, no parte de la API pública del paquete).
- `knowledge/screens/<slug>.md` como screen doc — mismo formato que
  `knowledge/screens/carga-de-formulario.md`.
- Tokens de color/tipografía vía `--ds-*` en `styles.css`; convención `@2× ÷ 2` para
  toda geometría que no sea hairline/radius/em/rem — `knowledge/` sigue siendo la
  autoridad de estilos (regla de `CLAUDE.md`).
- Antes de fijar cualquier geometría nueva en las screens: aplicar el método de
  `knowledge/visual-analysis-protocol.md` (PASS 9) y el gate de
  `knowledge/reasoning/fidelity-validation.md` — no repetir el patrón "verifiqué
  colores y lo llamé fidelity-passed".
- Sin framework de test instalado — verificación manual en Storybook (mismo criterio
  que `carga-de-formulario` y `002-bg-texture`).
- `src/index.ts` es la única fuente de verdad de exports públicos — esta feature no le
  agrega nada (los screens no se exportan).
- No se toca `Asistente.tsx`, `SideBar.tsx`, `CalendarCard.tsx`, `MetricCard.tsx`,
  `ProgressRing.tsx`, `TaskCard.tsx` ni `ModuleCard.tsx` — se consumen vía import
  directo desde `components/`, sin modificar su código fuente.

## 6. UI / FLUJO

**p.3 — Home**
- Layout de 3 columnas: `SideBar` expandido (fija, izquierda) · columna central con
  saludo "HOLA SEBASTIÁN, ¿QUÉ QUERÉS HACER HOY?" + `Asistente` completo (input con
  mic, "Adjuntar archivos", botón EJECUTAR, 4 chips de sugerencia) arriba, seguido de
  "PRÓXIMOS EVENTOS" (grid de 6× `CalendarCard`, fecha+descripción) y "RESUMEN DE
  PRODUCTIVIDAD" (2× `MetricCard` ficha con ícono editar/borrar, en fila, + 1×
  `ProgressRing` "ASISTENCIAS" al 75%) · columna derecha fija y angosta "TAREAS EN
  FECHA" con lista scrolleable de `TaskCard`.
- El ícono de campana en `SideBar` lleva badge de notificación tipo pill (prop `badge`
  del `SideBarItem`, ya soportada).

**p.4 — Dashboard**
- `SideBar` colapsado (icon-only, izquierda) + grilla 2×4 de `ModuleCard` (8 cards
  totales) ocupando el resto del viewport. Cada card muestra ícono + título + 1 o 2
  filas de métrica (`ModuleMetric[]`) según el módulo (ej. "INVESTIGACIONES ABIERTAS:
  30" + "CASOS PENDIENTES: 6" en la misma card).

**p.1 — Welcome**
- Sin composición nueva: ilustración 3D decorativa (poliedro facetado + wireframe de
  puntos) + wordmark "ALEJANDRIA FUSION PLATFORM / WELCOME" abajo a la izquierda. Se
  documenta como confirmado, no se reproduce como screen.

**p.2 — Login**
- Sin composición nueva: coincide 1:1 con `Login.tsx` ya construido (fondo full-viewport
  con `BackgroundTextureDots`, wordmark centrado arriba, card de login con grid 3×3 de
  puntos decorativos + campo CONTRASEÑA + botón INGRESAR).

## Referencias

- `drafts/pantallas-grupo-a-b.md` § "Grupo A — páginas releídas y confirmadas" (p.1-4) —
  fuente principal de este brief, incluida la sección de hallazgo p.3/p.5/p.6.
- `handoffs/20260810-fase1-sprint1-home-dashboard.md` — handoff que definió el alcance
  de este sprint y los puntos a confirmar en el grilling.
- `knowledge/screens/carga-de-formulario.md` y
  `packages/ui/src/screens/carga-de-formulario/` — precedente estructural para Home y
  Dashboard (convención `.stories.tsx` + `.css`, sin `.tsx` separado).
- `packages/ui/src/components/SideBar.tsx`, `Asistente.tsx`, `CalendarCard.tsx`,
  `MetricCard.tsx`, `ProgressRing.tsx`, `TaskCard.tsx`, `ModuleCard.tsx` — componentes
  reusados tal cual, cero gaps.
- `knowledge/component-roadmap.md` § "Screens triage" — tabla a corregir (fila p.3).
- `existing-arch.md` — restricciones de codebase y convención de screens.
- `specs/002-bg-texture/` — feature previa (CLOSED), de donde viene
  `BackgroundTextureDots` ya aplicado a Login.
