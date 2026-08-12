# Plan — 006-sidebar-ancho-toggle

## Stack (existente, sin scaffold — brownfield)
- TypeScript `strict: true`, React 19.2, Storybook 10, Vite 8, pnpm.
- `source_root`: `packages/ui/src/`.

## Estructura (1 componente modificado + 3 screens modificadas + docs)
```
components/SideBar.{tsx,stories.tsx}                         (modificados)
styles.css                                                    (modificado)
screens/tareas-pendientes/{TareasPendientes.stories.tsx,tareas-pendientes.css}   (modificados)
screens/tareas-kanban/{TareasKanban.stories.tsx,tareas-kanban.css}               (modificados)
screens/tareas-finalizadas/{TareasFinalizadas.stories.tsx,tareas-finalizadas.css} (modificados)
knowledge/components/SideBar.md                               (modificado)
knowledge/component-roadmap.md                                (modificado)
specs/004-familia-tareas/constitution.md                      (enmendado, MUST-3)
DECISIONS.md                                                  (modificado)
```

## Artefacto a construir
1. **Medición** (US-1) — sweep PyMuPDF de `design-reference.pdf` p.13
   (`get_drawings()`/`get_pixmap()`) y `Alejandria - Agosto 2026.pdf` p.5/8/9
   (Downloads, `get_drawings()`/`get_text()`). Fijar ancho expandido y colapsado;
   crear `--ds-size-sidebar-expanded-w`/`--ds-size-sidebar-collapsed-w` en
   `styles.css` si difieren de los tokens reutilizados hoy.
2. **`SideBar.tsx`** (US-2) — eliminar `SideBarChevron` + el `button` hermano del
   `<nav>` (y el wrapper `div.ds-sidebar-shell` si ya no hace falta straddlear el
   borde); heading "Menú" gana `role="button"` + `aria-expanded` + `aria-label`
   contextual. Actualizar `SideBar.stories.tsx` (`Expanded`/`Collapsed`/
   `Playground`) para reflejar el único control.
3. **Retrofit de las 3 screens de Tareas** (US-3/4/5) — `useState` local de
   colapso en cada `.stories.tsx`, wireado al `SideBar` (heading) y al ícono
   `OpenCloseSidebarIcon` del topbar, independiente por screen.
4. **Verificación de no-regresión** (US-6) — abrir `Home`, `Dashboard`,
   `CargaDeFormulario` en Storybook con el nuevo ancho, confirmar sin overlap.
5. **Docs** — `knowledge/components/SideBar.md` (contrato/DOM/tokens/Known
   Limitations/Changelog `0.2.0`), `knowledge/component-roadmap.md` (cerrar el
   hallazgo "SideBar ancho expandido"), enmienda de MUST-3 en
   `specs/004-familia-tareas/constitution.md`, entrada nueva en `DECISIONS.md`.

## Fuera de este plan
Sin instalar test framework ni linter. No se toca layout/contenido de Home/
Dashboard/Carga de Formulario. No se construye la variante p.6. No se arregla
el glifo del edge-toggle (se elimina). Sin estado global ni routing. (Docs a
actualizar: ver ítem 5 de "Artefacto a construir" arriba.)
