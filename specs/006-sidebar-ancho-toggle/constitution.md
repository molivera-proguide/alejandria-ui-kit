# Constitution — 006-sidebar-ancho-toggle

## MUST

1. Medir con PyMuPDF el ancho expandido y colapsado de `.ds-sidebar` contra DOS
   fuentes: `design-reference.pdf` p.13 (componente aislado) y
   `Alejandria - Agosto 2026.pdf` (Downloads de Luna, no commiteado — D008) p.5/8/9
   (screens en contexto). Fijar valores finales en `plan.md` solo con evidencia
   medida, nunca a ojo.
2. Si el valor medido difiere de `--ds-size-card-min-w`/`--ds-size-control-lg`
   (tokens reutilizados de otro componente, nunca medidos para SideBar), crear
   tokens dedicados `--ds-size-sidebar-expanded-w` / `--ds-size-sidebar-collapsed-w`
   en `styles.css`.
3. Eliminar `SideBarChevron` y `button.ds-sidebar__edge-toggle` de `SideBar.tsx`
   (componente, DOM, CSS asociado) — 3ª forma redundante de colapsar, nunca
   confirmada por el PDF (glifo "simplificado", tamaño/posición "provisionales").
4. El heading `.ds-sidebar__menu-heading` (con `menuLabel="Menú"`) pasa a ser el
   único control interno de colapso: agrega `role="button"`,
   `aria-expanded={!collapsed}`, `aria-label` contextual ("Contraer menú"/
   "Expandir menú") — migra la semántica ARIA que tenía el edge-toggle.
5. `SideBar` sigue siendo controlado-only (`collapsed`+`onToggleCollapsed`
   requeridos, sin estado interno) — este feature no cambia esa garantía.
6. Las 3 screens de Tareas (`tareas-pendientes`, `tareas-kanban`,
   `tareas-finalizadas`) agregan `useState` local real de colapso, independiente
   por screen (sin estado compartido, sin routing), wireado tanto al heading
   "Menú" (vía `SideBar`) como al ícono `OpenCloseSidebarIcon` del topbar.
7. Enmienda explícita a `specs/004-familia-tareas/constitution.md` MUST-3: Kanban
   y Finalizadas dejan de ser "composiciones estáticas" en el punto específico del
   colapso de SideBar — registrar la enmienda en `DECISIONS.md`, sin reabrir el
   resto de esa feature ya `CLOSED`.
8. `knowledge/components/SideBar.md` actualizado: Behavioral Contract, DOM
   Structure, Props, Accessibility, Design Tokens, Known Limitations, Changelog →
   `0.2.0` (breaking change de DOM: desaparece el edge-toggle del árbol).
9. Verificación manual en Storybook (sin framework de test instalado): `SideBar`
   (`Expanded`/`Collapsed`/`Playground`) + las 6 screens consumidoras (`Home`,
   `Dashboard`, `CargaDeFormulario`, 3 de Tareas).
10. Gate de `knowledge/visual-analysis-protocol.md` (PASS 9) +
    `knowledge/reasoning/fidelity-validation.md` antes de fijar cualquier
    geometría nueva.

## PROHIBITED

1. No modificar layout/contenido de `Home`, `Dashboard`, `CargaDeFormulario` —
   solo deben seguir funcionando con el nuevo ancho; cualquier regresión visual
   ahí es un bug de este feature, no una excusa para tocarlos más.
2. No construir la variante p.6 (tabs + barra de progreso) — descartada en
   `004-familia-tareas`, no se reabre acá.
3. No "arreglar" el glifo del edge-toggle — se elimina, no se corrige.
4. No agregar estado global, fetch, ni routing real.
5. No exportar las 3 screens de Tareas en `index.ts` (`004-familia-tareas`
   PROHIBITED-4 sigue vigente).
6. No editar el PROHIBITED-1 de `specs/004-familia-tareas/constitution.md` ni de
   `specs/005-alert-toast-filter/constitution.md` directamente — la relación
   queda razonada en `DECISIONS.md`; esas constitutions ya `CLOSED` no se tocan
   salvo el MUST-3 puntual de `004` (ítem 7 de MUST arriba).
7. No instalar framework de test ni linter como efecto colateral.
8. No modificar `existing-arch.md`.
