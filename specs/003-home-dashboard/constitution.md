# Constitution — 003-home-dashboard

## MUST

1. p.3 (Home) y p.4 (Dashboard) se construyen como screens completas, un
   único `<Slug>.stories.tsx` + `<slug>.css` en `packages/ui/src/screens/`,
   siguiendo exactamente el precedente de `screens/carga-de-formulario/`
   (composición dentro del `.stories.tsx`, sin `.tsx` de componente separado,
   sin export en `index.ts`).
2. Cada screen nueva tiene su `knowledge/screens/<slug>.md`, mismo formato
   que `knowledge/screens/carga-de-formulario.md` (Purpose, User goals, Main
   regions, Patterns/Components used, Navigation, Responsive, A11y, Known
   limitations).
3. Home reusa `Asistente` **completo, tal cual** (shell entero) — no se
   extrae el input+chips por separado.
4. `SideBar` en Home va **expandido** (mismo item set que
   `SideBar.stories.tsx`, badge de notificación vía prop `badge` ya
   soportada); en Dashboard va **colapsado**.
5. Todos los componentes consumidos (`SideBar`, `Asistente`, `CalendarCard`,
   `MetricCard`, `DonutChartCard`, `TaskCard`, `ModuleCard`) se importan tal
   cual existen hoy — cero gaps confirmados en `input.md`.
   **Corrección 2026-08-11** (post-implementación, feedback visual de Luna
   contra el PDF real): el gauge "ASISTENCIAS" de Home es `DonutChartCard`,
   no `ProgressRing` — en el PDF ese componente queda cortado como si hubiera
   que scrollear, lo que llevó a asumir `ProgressRing` sin evidencia
   suficiente. Ver `DECISIONS.md`.
6. p.1 (Welcome) y p.2 (Login) quedan **solo como confirmación documentada**
   en esta feature — no generan `.tsx`, `.css` ni screen doc nuevos.
7. Antes de fijar cualquier geometría/spacing nuevo de las dos screens:
   gate de `knowledge/visual-analysis-protocol.md` (PASS 9) +
   `knowledge/reasoning/fidelity-validation.md`.
8. Verificación manual en Storybook (sin framework de test instalado).
9. Toda geometría nueva de layout (grid, gaps, anchos de columna) sigue la
   convención `@2× ÷ 2`; tokens de color/tipografía nuevos, si aplicaran,
   van vía `--ds-*` en `styles.css` — `knowledge/` sigue siendo la
   autoridad de estilos.

## PROHIBITED

1. No modificar `Asistente.tsx`, `SideBar.tsx`, `CalendarCard.tsx`,
   `MetricCard.tsx`, `DonutChartCard.tsx`, `TaskCard.tsx` ni `ModuleCard.tsx`.
2. No exportar `Home`/`Dashboard` en `src/index.ts` — son Storybook-only,
   igual que `CargaDeFormulario`.
3. No construir p.1 ni p.2 como screen — el draft las confirma sin gap ni
   composición nueva.
4. No tocar p.5–9, 12, 20–23 del triage — sprints siguientes.
5. No resolver la pregunta p.5/p.6 (pantallas distintas vs. field gallery) —
   queda para el grilling de Sprint 2.
6. No instalar framework de test ni linter como efecto colateral.
7. No modificar `existing-arch.md`.
