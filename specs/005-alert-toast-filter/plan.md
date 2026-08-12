# Plan — 005-alert-toast-filter

## Stack (existente, sin scaffold — brownfield)
- TypeScript `strict: true`, React 19.2, Storybook 10, Vite 8, pnpm.
- `source_root`: `packages/ui/src/`.

## Estructura (6 nuevos + 3 modificados de 004 + 3 docs, 3 exports nuevos)
```
components/{AlertBar,Toast,FilterField}.{tsx,stories.tsx}  (nuevos, exportados en index.ts)
styles.css                                                  (modificado — 3 bloques nuevos)
Icons/Menu/{Adelante,Atras,OpenCloseSidebar}-50x50.svg      (nuevos)
Icons/index.ts                                              (modificado — 3 exports nuevos)
screens/tareas-pendientes/{TareasPendientes.stories.tsx,tareas-pendientes.css}   (modificados)
screens/tareas-kanban/{TareasKanban.stories.tsx,tareas-kanban.css}               (modificados)
screens/tareas-finalizadas/{TareasFinalizadas.stories.tsx,tareas-finalizadas.css} (modificados)
knowledge/screens/{tareas-pendientes,tareas-kanban,tareas-finalizadas}.md        (modificados)
knowledge/components/{AlertBar,Toast,FilterField}.md                            (nuevos)
```

## Artefacto a construir
1. **`AlertBar`** — franja full-width, 2 tonos (`default`/`alerta`).
2. **`Toast`** — centrado, `useEffect` con `setTimeout(4000)` que dispara
   `onDismiss`/desmonta, sin botón de cierre, un tono (`success`).
3. **`FilterField`** — ícono filtro (`FiltroIcon`) + chevron + input 400×50px
   con lupa, sin label. Decorativo.
4. 3 íconos nuevos copiados a `Icons/Menu/` (assets ya provistos por Luna) +
   exports en `Icons/index.ts`.
5. Retrofit de las 3 screens de `004-familia-tareas`: topbar (`AlertBar` +
   íconos colapsar/atrás/adelante compuestos en la screen) + `FilterField`
   reemplazando el hack anterior. Kanban suma fila de filtro + barra de
   progreso/"..." por columna. Finalizadas suma `creator`/`startDate`/
   `endDate` a su dataset.
6. Screen docs y component docs actualizados/creados.

## Fuera de este plan
Sin instalar test framework ni linter. No se toca `TextField`/`SelectField`/
`AlertBanner`. No se agrega el topbar a Dashboard. Sin tonos extra de `Toast`
ni desplegable funcional del filtro.

## Docs a actualizar
- `knowledge/components/{AlertBar,Toast,FilterField}.md` +
  `knowledge/specs/components/{AlertBar,Toast,FilterField}.spec.md` — nuevos.
- `knowledge/design-system-manifest.json`, `knowledge/index.md` — registrar
  los 3 componentes nuevos.
- `knowledge/screens/{tareas-pendientes,tareas-kanban,tareas-finalizadas}.md`
  — reflejar el retrofit.
