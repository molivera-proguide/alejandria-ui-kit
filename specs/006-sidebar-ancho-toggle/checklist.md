# Checklist — 006-sidebar-ancho-toggle

## Accesibilidad

- [x] CHK001 Navego el heading "Menú" con Tab y lo activo con Enter/Space (no solo
  con mouse) en las 3 stories de `SideBar` y en las 3 screens de Tareas — confirmo
  que togglea el colapso en las 6.
- [x] CHK002 Inspecciono `aria-label`/`aria-expanded` del heading "Menú" en las 3
  screens de Tareas (no solo en `SideBar` aislado) — confirmo que cambian
  correctamente ("Contraer menú"/"Expandir menú") al togglear desde ahí.
- [x] CHK003 Confirmo que el ícono `OpenCloseSidebarIcon` del topbar es alcanzable
  por Tab y activable con Enter/Space en las 3 screens de Tareas.

## UX

- [x] CHK004 Reviso las 6 screens consumidoras (no solo las stories de `SideBar`)
  buscando cualquier label de ítem primario/secundario cortado o wrappeado — con
  nombres reales de cada consumidor, no solo los de las stories actuales.
- [x] CHK005 Clickeo el heading "Menú" y el ícono del topbar en un browser real (no
  en el entorno de verificación automatizada) y confirmo que la transición de ancho
  (180ms) se ve fluida, sin salto brusco.
- [x] CHK006 Reviso cualquier ítem con `badge` en las 6 screens y confirmo que el
  acento de notificación no se corta en ningún estado (expandido/colapsado).

## Negocio (validación subjetiva)

- [x] CHK007 Confirmo con criterio de producto que 103px expandido / 36px colapsado
  se sienten bien en el contexto real de las screens (no demasiado angosto junto a
  `TaskCard`/`DetailSheet`/`ModuleCard`).
- [x] CHK008 Confirmo que sacar el edge-toggle no genera confusión real de usuario —
  el heading "Menú" sin el chevron visual sigue siendo descubrible como control de
  colapso.

## Compatibilidad

- [ ] CHK009 Abro las 3 screens de Tareas en un viewport angosto (el problema
  original reportado por Luna) y confirmo que ya no hay overlap de componentes.

  **❌ No pasa — pero la causa raíz no es `SideBar`.** Reproducido en vivo (480×700px,
  `TareasPendientes`, con y sin `DetailSheet` abierto): el `SideBar` mide 103px
  correctamente (medido), sin overlap con el toolbar/grid. El desborde horizontal
  (`scrollWidth: 863px` vs `clientWidth: 480px`) lo causa
  `.screen-tareas-pendientes__grid { grid-template-columns: 170px 170px 170px 170px }`
  — 4 columnas fijas, no responsivas, **preexistentes a `006`** (se reproduce igual
  con la sidebar en cualquier ancho). Además, `.screen-tareas-pendientes` (fondo
  `#060606`) es un flex container sin `width` propio: su caja de fondo mide solo
  480px (el viewport) mientras el contenido desbordado llega a 863px, dejando ~383px
  sin el fondo oscuro — bug genérico de cualquier screen con overflow horizontal, no
  específico de esta feature. Ambos hallazgos quedan registrados como gaps nuevos en
  `knowledge/component-roadmap.md` § "Gaps nuevos encontrados", para `fix-XXX`
  aparte — decisión de Luna de no bloquear el cierre de `006` con esto (ver
  `DECISIONS.md`).

## Resultado

8/9 ✅. CHK009 queda ❌ documentado con causa raíz diagnosticada y diferido a 2
`fix-XXX` nuevos, fuera del alcance declarado de `006-sidebar-ancho-toggle`
(`plan.md` solo toca los `.stories.tsx` de las 3 screens de Tareas, no sus `.css`).
