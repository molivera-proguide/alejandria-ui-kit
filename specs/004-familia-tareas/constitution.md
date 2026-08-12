# Constitution — 004-familia-tareas

## MUST

1. p.5 (Tareas Pendientes, con el estado "detalle abierto" de p.7), p.8
   (Kanban) y p.9 (Finalizadas) se construyen como screens completas, un
   único `<Slug>.stories.tsx` + `<slug>.css` en `packages/ui/src/screens/`,
   siguiendo el precedente de `screens/home/` y `screens/dashboard/`.
2. Cada screen nueva tiene su `knowledge/screens/<slug>.md`, mismo formato
   que `knowledge/screens/home.md`.
3. La screen de Tareas Pendientes es la **única excepción de interactividad
   real** del kit: mantiene `useState` local (tarea seleccionada) para
   abrir/cerrar `DetailSheet` al hacer click en una `TaskCard` y en el botón
   "Cerrar". Ningún otro screen de esta feature tiene interactividad —
   Kanban y Finalizadas son composiciones estáticas, igual que Home/Dashboard.

   > **Enmienda puntual (2026-08-12, `006-sidebar-ancho-toggle`):** esta regla
   > queda enmendada solo en lo referido al colapso del `SideBar` — Kanban y
   > Finalizadas ganan `useState` local real para togglear el menú (heading
   > "Menú" + ícono de topbar), la misma pieza de interactividad que ya tenía
   > Tareas Pendientes. El resto de la regla (sin `DetailSheet`, sin ninguna
   > otra interactividad) sigue vigente sin cambios. No se reabre el resto de
   > `004-familia-tareas` — ver `DECISIONS.md` y
   > `specs/006-sidebar-ancho-toggle/constitution.md` MUST-7.
4. p.6 (variante con tabs + barra de progreso) **no se construye** — queda
   documentada como alternativa descartada en `knowledge/screens/tareas-pendientes.md`,
   por requerir un componente nuevo fuera de scope.
5. Gaps chicos de componente, acotados exactamente a esto:
   - `TaskCard.tsx`: agregar slot/prop visual para el botón "VER MÁS"
     (decorativo, sin `onClick` funcional) — usado en Finalizadas.
   - `DetailSheet.tsx`: agregar prop `onClose` opcional, cableada al botón
     "Cerrar" del header (hoy sin handler).
   - `detail-sheet.css`: agregar estilo del botón de acción `--c` (falta;
     el tipo ya admite `"a"|"b"|"c"`) y ajustar el ancho para funcionar como
     panel lateral ancho superpuesto (partía de `max-width: 590px` de bloque
     centrado; valor final medido y corregido a `656px`, ver `DECISIONS.md`
     D018/D022, 2026-08-11/12).
6. No se toca la lógica de `width`/`maxWidth` ya endurecida en `TaskCard.tsx`
   (líneas 57-61) — el bug de sizing de la variante kanban ya está cerrado.
7. Corrección de gobernanza incluida en esta feature: `knowledge/component-roadmap.md`
   § "Screens triage" (filas p.5/p.6/p.7 reflejan que son una sola pantalla)
   y § "2026-07-28 sizing pass" (marcar cerrado, referencia a `TaskCard.tsx:57-61`).
8. Antes de fijar cualquier geometría nueva (ancho del panel, estilo `--c`,
   slot "VER MÁS"): gate de `knowledge/visual-analysis-protocol.md` (PASS 9)
   + `knowledge/reasoning/fidelity-validation.md`.
9. Verificación manual en Storybook (sin framework de test instalado),
   incluida la interacción de abrir/cerrar el panel en Tareas Pendientes.
10. Toda geometría nueva sigue `@2× ÷ 2`; tokens nuevos vía `--ds-*` en
    `styles.css` — `knowledge/` sigue siendo la autoridad de estilos.

## PROHIBITED

1. No modificar `SideBar.tsx`, `SegmentedControl.tsx`, `MetricCard.tsx`,
   `LineChartCard.tsx`, `LinearBarChartCard.tsx` ni `SelectField.tsx` — cero
   gaps confirmados, se consumen tal cual. (`SideBar.tsx`: superado
   2026-08-12 por `006-sidebar-ancho-toggle`, feature propia — no una
   reapertura de ésta. Ver `DECISIONS.md`.)
2. No construir p.6 como screen.
3. No agregar estado global, fetch, ni routing real — la interactividad de
   Tareas Pendientes es `useState` local únicamente.
4. No exportar las 3 screens nuevas en `src/index.ts` — Storybook-only.
5. No tocar p.12, 20, 21, 22, 23 del triage — sprints siguientes.
6. No modificar `existing-arch.md`.
7. No instalar framework de test ni linter como efecto colateral.
