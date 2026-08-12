# Checklist — 004-familia-tareas + 005-alert-toast-filter

> Checklist conjunto: ambas features se cierran juntas por decisión explícita
> de Luna (2026-08-12) — overlap real de archivos, mismo owner. Este mismo
> archivo se guarda en `specs/004-familia-tareas/checklist.md` y en
> `specs/005-alert-toast-filter/checklist.md`.

Verificación manual de criterios que ningún test automatizado cubre (no hay
framework de test instalado en el proyecto — ver `existing-arch.md`).

## Accesibilidad
- [x] CHK001 Confirmo que puedo abrir el `DetailSheet` en Tareas Pendientes navegando por teclado (Tab hasta la `TaskCard` + Enter/Espacio), no solo con click de mouse. ✅ Luna, 2026-08-12 (confirmado visualmente en Storybook)
  **🔧 CORREGIDO vía `fix-001-taskcard-keyboard-hover` (2026-08-12)** — ver `DECISIONS.md`
  D023. `TaskCard` ahora agrega `tabIndex`/`role="button"`/`onKeyDown` (solo cuando recibe
  `onClick`) + `:hover`/`:focus-visible` en `.ds-task--interactive`.
- [x] CHK002 Confirmo que el botón "Cerrar" (ícono X) del `DetailSheet` es alcanzable por teclado y muestra foco visible. ✅ Luna, 2026-08-12
- [ ] CHK003 Confirmo que los 3 íconos sueltos del topbar (colapsar/atrás/adelante) tienen texto accesible (`alt`/`aria-label`), no solo una imagen decorativa muda.
  **Código ya correcto** (verificado 2026-08-12): cada ícono está envuelto en un
  `<button aria-label="...">` (`"Colapsar menú"`/`"Atrás"`/`"Adelante"`) con `<img alt="">`
  adentro, en las 3 screens. Pendiente solo confirmación visual con DevTools → pestaña
  Accessibility → campo "Name".
- [x] CHK004 Confirmo que el texto rojo `#ff0404` de `AlertBar` tone="alerta" sobre fondo `#494949` es legible (contraste suficiente) a simple vista. ✅ Luna, 2026-08-12
- [x] CHK005 Confirmo que el mensaje de `Toast`, al desaparecer solo a los 4000ms, no deja sin alternativa a alguien que dependa de un lector de pantalla para leerlo a tiempo. ✅ Luna, 2026-08-12
- [ ] CHK006 Confirmo que el input de `FilterField` (sin label flotante visible) tiene una forma de identificarse por lector de pantalla.
  **Código ya correcto** (verificado 2026-08-12): las 3 screens pasan `aria-label="Buscar tarea"`
  y `FilterField` lo spreadea directo sobre el `<input>` real (no se pierde en el wrapper).
  Pendiente solo confirmación visual con DevTools → pestaña Accessibility → campo "Name".

## UX
- [x] CHK007 Confirmo visualmente que al abrir el `DetailSheet` en Tareas Pendientes queda visible la 1ª columna de `TaskCard` detrás (no tapa toda la grilla). ✅ Luna, 2026-08-12
  **Hallazgo relacionado, fuera de scope de este checklist:** en viewport angosto los
  componentes se solapan, causa probable el ancho de `SideBar` expandido (invented, nunca
  medido contra el PDF — ver `knowledge/component-roadmap.md` § "Gaps nuevos encontrados").
  Decisión: no se resuelve en `004`/`005` (SideBar es de otras 3 features CLOSED también),
  queda trackeado para un fix/feature separado.
- [x] CHK008 Confirmo que el chamfer de `TaskCard` variant="default" se ve con su borde completo (sin corte) al combinarse con `BackgroundTextureDots` — este fix nunca se verificó con una imagen real, solo con `getComputedStyle`. ✅ Luna, 2026-08-12
- [x] CHK009 Confirmo que el fondo de `TaskCard` variant="default" ya no se funde con la textura de fondo en ningún punto de las 2 screens que la usan — mismo motivo que CHK008. ✅ Luna, 2026-08-12
- [x] CHK010 Confirmo que el timing del auto-dismiss de `Toast` (4000ms) se percibe como "breve, no intrusivo" en uso real, no como abrupto. ✅ Luna, 2026-08-12
- [x] CHK011 Confirmo que el botón "VER MÁS" de las `TaskCard` en Finalizadas no genera expectativa de que hace algo al hacer click (es decorativo, sin `onClick`). ✅ Luna, 2026-08-12

## Compatibilidad
- [x] CHK012 Confirmo que las 3 screens de Tareas (Pendientes/Kanban/Finalizadas) no rompen su layout en al menos un viewport angosto de Storybook. ✅ Luna, 2026-08-12
- [x] CHK013 Confirmo el render en un segundo navegador además del principal — hay SVG inline nuevo (borde del chamfer) y `mix-blend-mode` en la textura de fondo, ambos con soporte variable entre motores. ✅ Luna, 2026-08-12

## Performance
- [x] CHK014 Confirmo que abrir/cerrar el `DetailSheet` varias veces seguidas en Tareas Pendientes no genera lag visible perceptible (la screen combina `BackgroundTextureDots` denso + `isolation: isolate` nuevo por card). ✅ Luna, 2026-08-12

## Negocio
- [x] CHK015 Confirmo, mirando el PDF y el Storybook lado a lado, que el topbar (`AlertBar` + 3 íconos) transmite la misma intención visual que el diseño original, más allá de los valores medidos en píxeles. ✅ Luna, 2026-08-12 (confirmado visualmente en Storybook)
  **🔧 CORREGIDO vía `fix-002-topbar-alertbar-fullwidth` (2026-08-12)** — ver `DECISIONS.md`
  D024. `.ds-alert-bar` pasa a `position:absolute` (full-width, 16px/12px de margen medidos),
  los 3 íconos a `position:relative;z-index:1` para pintarse encima — mismo fix en las 3
  screens, sin cambiar `AlertBar.tsx` ni la altura del topbar (58px, preservada).
- [x] CHK016 Confirmo que dejar a Dashboard (p.4, ya `CLOSED`) sin el mismo topbar no genera una inconsistencia visual molesta al navegar entre Dashboard y las 3 screens de Tareas. ✅ Luna, 2026-08-12
- [x] CHK017 Confirmo que la duplicación de config de `SideBar` en las 6 screens (decisión ya tomada de no extraer helper) sigue siendo aceptable antes de cerrar ambas features. ✅ Luna, 2026-08-12
