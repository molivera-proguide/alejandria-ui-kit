# Métricas — 004-familia-tareas

## Refine — 2026-08-11
- command_origin: sdd-refine
- rondas_de_preguntas: 7
- categorias_faltantes: 4
- categorias_ambiguas: 1
- alertas_seguridad: 0

## Validate — 2026-08-11
- command_origin: sdd-validate
- gaps_encontrados: 3
- cobertura_inicial: 91%
- iteration_number: 1

## Reporte completo — 2026-08-11T20:24:27Z

### 📊 Reporte de Esfuerzo SDD

**Contexto de ejecución**
- **feature_id**: 004-familia-tareas
- **command_origin**: sdd-implement
- **iteration_number**: 1
- **timestamp**: 2026-08-11T20:24:27Z

**Eficiencia de la IA (DX)**
- DX_MET_001 **Ciclos de Autocorrección**: 0 post-verificación — las 4 screens/6 tasks
  renderizaron sin errores de consola en el primer pase de verificación en Storybook
  (índice recogió los 4 stories nuevos vía watcher, sin reinicio manual), incluida la
  interacción real de abrir/cerrar `DetailSheet` en Tareas Pendientes (verificada
  click a click, no solo visualmente). Dos correcciones ocurrieron **durante** la
  redacción, antes de cualquier verificación (no cuentan para esta métrica, que mide
  retrabajo post-verificación): (1) `var(--ds-tracking-wide, 0.08em)` referenciaba un
  token que no existe — corregido a `--ds-tracking-label` (0.08em, sí existente) antes
  de tocar Storybook. (2) el story `ConDetalleAbierto` duplicaba ~60 líneas de JSX de
  la screen — refactorizado a una prop `initialSelectedTask` sobre el mismo componente
  antes de escribir el CSS.
- DX_MET_002 **Consultas de Clarificación**: 0 — toda la ambigüedad de negocio se
  resolvió en `/sdd-refine`/`/sdd-log` (sesiones previas); esta implementación no
  necesitó preguntarle nada nuevo a Luna.
- DX_MET_003 **Interacciones Totales**: 1 (comando `/sdd-implement` único, sin
  correcciones posteriores pedidas por Luna todavía — pendiente de su revisión en
  Storybook).

**Análisis de Retrabajo**
- DX_MET_004 **Causa Raíz**: no aplica — 0 ciclos de autocorrección post-verificación
  en esta iteración.
- DX_MET_005 **Resiliencia**: no se alcanzó ningún rate-limit ni límite de tokens.
- DX_MET_006 **Token Budget**: no disponible en este entorno — `ccusage` no está
  instalado y no se instaló como efecto colateral de este reporte (mismo criterio de
  no agregar dependencias no pedidas). El dev puede correrlo manualmente con
  `/sdd-metrics` si lo necesita.

**Rework Ratio (calculado)**
- **Tareas totales en tasks.md**: 6 (T001–T006)
- **DX_MET_001 acumulado (todas las iteraciones de esta feature)**: 0
- **Entradas en DECISIONS.md para esta feature**: 2 (duplicación de config de `SideBar`
  + adaptación del loop TDD) — ambas decisiones de proceso/arquitectura tomadas *antes*
  de escribir código (durante `/sdd-validate`/`/sdd-log`), no correcciones de algo roto
  encontrado después — distinto del precedente de `003-home-dashboard`, donde las 2
  entradas eran fixes post-entrega.
- **Rework Ratio estimado**: (0 + 2) ÷ 6 = **0.33**

🟢 Rework Ratio bajo, y con una salvedad a favor: a diferencia del precedente, ninguna
de las 2 entradas de `DECISIONS.md` es una corrección de algo entregado mal — son
decisiones de scope/proceso registradas antes de tocar código. El retrabajo real
post-verificación de esta iteración es 0.

**Gaps conocidos, no resueltos en esta iteración (flagueados, no corregidos en
silencio):**
- `knowledge/components/TaskCard.md` y su `.spec.md` no reflejan todavía la prop nueva
  `viewMore`/`TaskCardViewMoreAction` — no estaba en el scope de `tasks.md` T005.
  Documentado en `knowledge/screens/tareas-finalizadas.md` § Known limitations.
  Recomendado para `/sdd-checklist`/`/sdd-review`.
- `pnpm tsc --noEmit` sobre `packages/ui` reporta errores preexistentes en 6 archivos
  no tocados por esta feature (`CalendarCard.stories.tsx`, `ChartCard.stories.tsx`,
  `InvestigationCard.stories.tsx`, `LinearBarChartCard.stories.tsx`,
  `ModuleCard.stories.tsx`, `vite.config.ts` — patrón `render` sin `args` en stories de
  Storybook, más un `outDir` no reconocido en `vite.config.ts`). Ninguno de los
  archivos nuevos/modificados por `004-familia-tareas` aparece en esa salida — no son
  errores introducidos por esta feature, no se tocaron.

## Review — 2026-08-12T00:00:00Z
- command_origin: sdd-review
- resultado: PENDIENTE
- criterios_sin_test: 10 (todos — sin framework de test instalado, decisión ya aceptada)
- criterios_sin_implementar: 0
- gaps_ui: 0
- hallazgos_e2e: 0 (no aplica, ProGuide no instalado)
- structural_issues: 2 (TaskCard.md con claims de accesibilidad desactualizadas por fix-001;
  TaskCard.md sin documentar prop viewMore — gap preexistente)

## Review — 2026-08-12T01:00:00Z
- command_origin: sdd-review
- resultado: APROBADO
- criterios_sin_test: 10 (sin framework de test instalado, decisión ya aceptada)
- criterios_sin_implementar: 0
- gaps_ui: 0
- hallazgos_e2e: 0 (no aplica, ProGuide no instalado)
- structural_issues: 1 (duplicación de topbar en las 3 screens — análoga a D015, no bloqueante)
