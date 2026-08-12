# Brief — Alert Bar, Toast y Filter Field (+ retrofit de Familia Tareas)

> Generado por `/sdd-refine` el 2026-08-11, a partir de `drafts/alert-toast-filter.md`.
> Surge en medio de `004-familia-tareas` (Familia Tareas, `OPEN`): al fidelity-check
> las 3 screens nuevas contra `Alejandria - Agosto 2026.pdf`, se encontró que el
> ícono de filtro usado en sus toolbars era un hack inventado (`Button` + `TextField`
> con label), no el componente real de `knowledge/references/design-reference.pdf`
> p.23 ("FILTER") — y que faltan 2 piezas más de esa misma hoja de spec (p.22,
> "ALERT"): la barra "Alert Sigcat" y el Toast "Tarea realizada". Excluye
> explícitamente el resto del draft original (`pantallas-grupo-a-b.md`): Sprint 3
> (Reportes & Usuarios, p.12, 23), Sprint 4 resto (Acordeón, p.20), Sprint 5 (Tabs +
> Chat, p.21-22). También excluye `drafts/tipografia-legibilidad.md`.
>
> **Nota de proceso:** durante el grilling, Luna señaló que `TextField`, `SelectField`
> y `AlertBanner` (ya existentes en el kit) son en sí mismos componentes inventados,
> no basados en el PDF real — tiene pendiente una limpieza de esos tres. **No forma
> parte de esta feature** — se registra acá solo como contexto para cuando esa
> limpieza se priorice.

## 1. PROBLEMA

`004-familia-tareas` necesita 3 piezas de UI que hoy no existen en el kit (o existen
mal): una barra de alerta full-width ("Alert Sigcat", usada como topbar con la
leyenda "N TAREAS PENDIENTES" en p.4-9 del PDF de screens), un Toast de confirmación
("Tarea realizada"), y un campo de filtro compuesto (ícono+chevron+input con lupa,
PDF "FILTER" p.23). Sin estas 3 piezas, las screens de Familia Tareas no pueden
alcanzar fidelidad real contra el PDF — hoy tienen un topbar ausente, un buscador+
filtro inventado sin base en el PDF, y (en Kanban) les falta directamente la fila de
buscador/filtro y la barra de progreso por columna.

## 2. USUARIO

Sin persona/contexto de producto específico (mismo criterio que el resto del kit) —
el consumidor es cualquier developer o agente de IA que use `@alejandria/ui-kit` y
necesite reproducir estos 3 componentes y las screens que los usan, tal como los
define `knowledge/references/design-reference.pdf`.

## 3. DONE CRITERIA

**Componentes nuevos** (`packages/ui/src/components/`, un `.tsx` + un `.stories.tsx`
plano cada uno, exportados desde `index.ts`):

- **`AlertBar`** (PDF p.22 "ALERT" § "Alert Sigcat") — franja full-width, label
  centrado. Fondo `#494949`, borde `0,75pt - #606060`, label Source Code Bold 20pt
  `#ffffff`; tono `alerta` con label en `#ff0404`. 2 tonos (`default`/`alerta`), sin
  slots de ícono/descripción/acción (a diferencia de `AlertBanner`, que es un
  componente distinto, no se toca).
- **`Toast`** (PDF p.22 § "Tarea realizada") — notificación centrada, un solo texto.
  Fondo `#060606`, borde `0,75pt - #606060`, texto Source Code Bold 18pt `#ffffff`.
  Auto-dismiss a los 4000ms, sin botón de cierre. Un solo tono (`success`) por ahora
  — sin slots para error/warning/info todavía. Mensaje configurable vía prop (el
  texto del mock, "Se creó una tarea con éxito", es un ejemplo, no un valor fijo del
  componente).
- **`FilterField`** (PDF p.23 "FILTER") — compuesto: ícono de filtro (reusa
  `FiltroIcon`, ya existe en `Icons/Menu/`) + chevron, afuera del campo a la
  izquierda, seguido de un input oscuro con lupa adentro a la derecha, sin label
  flotante visible. Fondo `#060606`, borde `0,75pt - #606060`, medida **400×50px
  final** (única excepción de esta feature a la convención `@2×÷2` — confirmado
  explícitamente con Luna, no una medida a dividir), texto Montserrat Regular 20pt
  `@2×` → 10px `#ffffff`. El ícono de filtro es decorativo por ahora (sin
  desplegable funcional — el propio PDF deja esto sin definir: "me falta desarrollar
  el desplegable del funnel").

**Assets nuevos** (`packages/ui/src/Icons/Menu/`, exportados como URL strings desde
`Icons/index.ts`, mismo patrón que el resto del set):

- Flecha "adelante" (archivo fuente: `Adelante-50x50.svg`, ya provisto por Luna).
- Flecha "atrás" (archivo fuente: `Atras-50x50.svg`, ya provisto por Luna).
- Ícono de colapsar/expandir sidebar (archivo fuente: `OpenClose sidebar-50x50.svg`,
  ya provisto por Luna — normalizar el nombre de archivo sin espacios al copiarlo,
  siguiendo la convención del resto del set, ej. `OpenCloseSidebar-50x50.svg`).

**Retrofit de `004-familia-tareas`** (mismo feature — toca los 3 screens ya
implementados, `OPEN`, mismo owner, sin colisión de equipo):

- **Las 3 screens** (`tareas-pendientes`, `tareas-kanban`, `tareas-finalizadas`)
  agregan el topbar completo: `AlertBar` con la leyenda "N TAREAS PENDIENTES" +
  ícono de colapsar sidebar + flechas atrás/adelante (estos 3 íconos se componen
  aparte en la screen, no son parte de `AlertBar` como componente).
- **Las 3 screens** reemplazan el hack `Button`+`TextField` por `FilterField` real
  donde corresponde.
- **`tareas-kanban`** agrega la fila de buscador (`FilterField`) que le faltaba, más
  una barra de progreso + ícono "..." por columna (hallazgo nuevo del fidelity-check,
  no estaba en `input.md` original de `004-familia-tareas`).
- **`tareas-finalizadas`** cambia el dataset de sus 8 `TaskCard` a contenido
  completo (status + creador + fechas), igual que `tareas-pendientes` — hoy tienen
  una versión recortada sin esos datos, que no coincide con el PDF real (p.9).
- `knowledge/screens/{tareas-pendientes,tareas-kanban,tareas-finalizadas}.md` se
  actualizan para reflejar el retrofit.

**Documentación** (convención ya establecida en el kit):

- `knowledge/components/{AlertBar,Toast,FilterField}.md` +
  `knowledge/specs/components/{AlertBar,Toast,FilterField}.spec.md`.
- Registro en `knowledge/design-system-manifest.json` y fila en `knowledge/index.md`.

## 4. OUT OF SCOPE

- **Limpieza de `TextField`/`SelectField`/`AlertBanner`** — Luna los identificó como
  inventados durante el grilling, pero es trabajo pendiente aparte, no de esta
  feature.
- **Tonos adicionales de `Toast`** (error/warning/info) — solo `success` por ahora.
- **Desplegable funcional del ícono de filtro en `FilterField`** — decorativo, el
  PDF no lo especifica.
- **Dashboard (p.4, `003-home-dashboard`, ya `CLOSED`)** — tiene el mismo gap de
  topbar (el draft original ya señalaba que "Alert Sigcat" aparece de p.4 a p.9),
  pero queda **fuera de esta feature** — decisión explícita de Luna, se revisita
  aparte si se prioriza.
- **Resto del draft original** (`pantallas-grupo-a-b.md`): p.12/23 (Sprint 3), p.20
  resto/Acordeón (Sprint 4), p.21/22 (Sprint 5).
- `drafts/tipografia-legibilidad.md` — iniciativa separada, sin refinar.

## 5. RESTRICCIONES TÉCNICAS

- Convención de componentes: un `.tsx` + un `.stories.tsx` plano en
  `packages/ui/src/components/`, exportados desde `index.ts` (única fuente de
  verdad de exports públicos).
- Íconos nuevos van a `Icons/Menu/` como assets estáticos, exportados como URL
  strings desde `Icons/index.ts` — mismo patrón que `FiltroIcon`/`BuscarIcon`/etc.
- **`FilterField` es la única excepción de esta feature a la convención `@2×÷2`**
  — su medida (400×50px) ya es final, confirmado explícitamente. `AlertBar` y
  `Toast` sí siguen `@2×÷2` normalmente (20pt→10px, 18pt→9px).
- Sin framework de test instalado — verificación manual en Storybook, mismo
  criterio que el resto del kit.
- `Toast` necesita un `useState`/`useEffect` local (timer de 4s) dentro de su propio
  componente — no es estado global, no viola la restricción de `existing-arch.md`
  (mismo criterio ya aplicado a la interactividad de `screens/tareas-pendientes/`
  en `004-familia-tareas`).
- El retrofit de `004-familia-tareas` toca archivos ya existentes de esa feature
  (`OPEN`, mismo owner) — actualizar `specs/_registry/features.yaml` y
  `graph/domain.yaml` para reflejar los archivos tocados por esta nueva feature
  también, sin que cuente como colisión de equipo (mismo owner).
- No modificar `TextField.tsx`, `SelectField.tsx` ni `AlertBanner.tsx` — quedan
  igual, la limpieza es aparte.

## 6. UI / FLUJO

**`AlertBar`** — franja full-width, fondo `#494949`, borde `0,75pt #606060`, label
centrado Source Code Bold 20pt`@2×`→10px, blanco (`default`) o rojo `#ff0404`
(`alerta`). Ejemplos del PDF: "3 ALERTAS NUEVAS" (default), "INCENDIO TIPO A - FASE
1" (alerta). En las screens de Tareas se usa como topbar con "N TAREAS PENDIENTES".

**Topbar de las 3 screens de Familia Tareas** — fila completa arriba de todo:
ícono colapsar/expandir sidebar + flecha atrás + flecha adelante (los 3 a la
izquierda, elementos sueltos, no parte de `AlertBar`) + `AlertBar` ocupando el
resto del ancho con el label centrado.

**`Toast`** — pill/box centrado (posición exacta arriba de la pantalla, mismo
criterio que el mock), fondo `#060606`, borde `0,75pt #606060`, texto Source Code
Bold 18pt`@2×`→9px blanco. Aparece, espera 4000ms, desaparece — sin botón de cierre.

**`FilterField`** — ícono de filtro (`FiltroIcon`) + chevron, afuera del campo a la
izquierda; input oscuro 400×50px (fondo `#060606`, borde `0,75pt #606060`) con lupa
adentro a la derecha, texto Montserrat Regular 20pt`@2×`→10px blanco, sin label
flotante. Ejemplo del mock: "Investigación" (valor o placeholder, indistinguible en
el PDF estático).

**Retrofit — `tareas-pendientes`**: agrega el topbar arriba de todo; el
`TextField`+`Button` actual del toolbar se reemplaza por `FilterField`.

**Retrofit — `tareas-kanban`**: agrega el topbar arriba de todo; agrega una fila con
`FilterField` (no existía ninguna fila de búsqueda/filtro ahí); cada columna
(EN FECHA/RETRASADAS/FINALIZADAS) agrega una barra de progreso fina debajo del
título + un ícono "..." a la derecha del título (hallazgo nuevo, sin spec exacta
del PDF más allá de "está ahí" — color/relleno a definir en `plan.md` con la misma
prioridad de verificación contra el PDF que el resto de esta feature).

**Retrofit — `tareas-finalizadas`**: agrega el topbar arriba de todo; el
`TextField` actual del toolbar se reemplaza por `FilterField`; las 8 `TaskCard`
pasan a mostrar `creator`/`startDate`/`endDate` además de `status`/`title`/`meta`
(contenido completo, igual que `tareas-pendientes`), manteniendo `tone="neutral"` +
`viewMore` (sin triángulo, con "VER MÁS").

## Referencias

- `drafts/alert-toast-filter.md` — fuente principal de este brief.
- `knowledge/references/design-reference.pdf` p.22 ("ALERT") y p.23 ("FILTER") —
  hojas de spec exactas, ya en el repo.
- `specs/004-familia-tareas/` — feature `OPEN` que este retrofit modifica.
- `packages/ui/src/components/AlertBanner.tsx` — componente existente, distinto de
  `AlertBar`, no se toca.
- `packages/ui/src/Icons/Menu/Filtro-50x50.svg` — ícono ya existente, reusado por
  `FilterField` (confirmado idéntico al archivo que Luna adjuntó).
- `DECISIONS.md` — pendiente registrar por qué este trabajo se separó de
  `004-familia-tareas` como feature propia en vez de sumarse ahí directamente, y la
  nota de `TextField`/`SelectField`/`AlertBanner` como limpieza pendiente aparte.
