# Métricas — 003-home-dashboard

## Refine — 2026-08-11
- command_origin: sdd-refine
- rondas_de_preguntas: 4
- categorias_faltantes: 1
- categorias_ambiguas: 2
- alertas_seguridad: 0

## Validate — 2026-08-11
- command_origin: sdd-validate
- gaps_encontrados: 1
- cobertura_inicial: 96%
- iteration_number: 1

## Reporte completo — 2026-08-11T13:17:40Z

### 📊 Reporte de Esfuerzo SDD

**Contexto de ejecución**
- **feature_id**: 003-home-dashboard
- **command_origin**: sdd-implement
- **iteration_number**: 1
- **timestamp**: 2026-08-11T13:17:40Z

**Eficiencia de la IA (DX)**
- DX_MET_001 **Ciclos de Autocorrección**: 2 — ambos post-entrega, encontrados por Luna comparando Storybook contra el PDF real, no por mí: (1) "ASISTENCIAS" debía ser `DonutChartCard`, no `ProgressRing` (el componente queda cortado en el PDF, sin evidencia suficiente durante el refine) — ver `DECISIONS.md` 2026-08-11. (2) "Próximos eventos" y "Resumen de productividad" quedaron apiladas verticalmente en vez de lado a lado, y la grilla de `CalendarCard` estiraba columnas `1fr` mucho más anchas que la card fija (72px), leyéndose como "fechas muy separadas" — corregido con `.screen-home__sections` (2 columnas) y `grid-template-columns: repeat(3, auto)` + `justify-content: start`. Dashboard, por lo demás, renderizó sin errores de consola ni requests fallidos en el primer intento (8 `ModuleCard` en grilla `repeat(4, 194px)`).
- DX_MET_002 **Consultas de Clarificación**: 0 — ambas correcciones vinieron de Luna revisando el resultado y pidiendo el ajuste directamente, no de una pregunta mía. Un gap de fidelidad menor (8vo ícono de módulo, ver DX_MET_004) se resolvió vía `knowledge/reasoning/decision-order.md` sin preguntar, documentado como Known limitation.
- DX_MET_003 **Interacciones Totales**: 3 (comando `/sdd-implement` + corrección de componente + corrección de layout, ambas reportadas por Luna con capturas).

**Análisis de Retrabajo**
- DX_MET_004 **Causa Raíz**: mixta. (1) ambigüedad de spec heredada del refine — el PDF real tiene "ASISTENCIAS" cortado (parece requerir scroll), así que `ProgressRing` se asumió sin ver el componente completo. (2) error de implementación propio — el layout apilado y la grilla de `CalendarCard` sin `justify-content: start` no tienen excusa de "PDF cortado"; el PDF sí mostraba las dos secciones lado a lado, y esto no se verificó con suficiente cuidado contra la captura completa antes de entregar. (3) gap de asset, no de componente: `Icons/Modules/` solo tiene 7 íconos dedicados para 8 `ModuleCard`; el 8vo ("Usuarios") reusa `UsuarioIcon` (Menu, 50×50), documentado en `knowledge/screens/dashboard.md`. Ninguno de los tres requirió tocar un componente prohibido por constitution.md.
- DX_MET_005 **Resiliencia**: no se alcanzó ningún rate-limit ni límite de tokens.

- DX_MET_006 **Token Budget** — Variante A (Claude Code, ccusage, tokens reales)

**Consumo real de la sesión** (`ccusage claude session --no-cost --json`, filtrado por `sessionId=fa3bfe4a-9afe-40f5-9b79-806915ca92d1` + `projectPath=C--Users-LunaVioletaGonzalez-Projects-alejandria-ui-kit-alejandria-ui-kit`):

| Fila del reporte | Tokens |
|---|---|
| input_tokens | 268 |
| output_tokens | 114.518 |
| cache_creation_input_tokens | 279.428 |
| cache_read_input_tokens | 26.564.692 |
| **TOTAL** | **26.958.906** |

- `session_ids`: [fa3bfe4a-9afe-40f5-9b79-806915ca92d1]
- `source`: ccusage
- Nota: esta sesión cubre el ciclo completo `/sdd-refine` → `/sdd-generate` →
  `/sdd-validate` → `/sdd-implement` de esta feature, más el commit del cierre
  pendiente de `002-bg-texture` al inicio de la sesión — `ccusage` reporta a nivel de
  sesión, no de sub-comando.

**Rework Ratio (calculado)**
- **Tareas totales en tasks.md**: 4 (T001–T004)
- **DX_MET_001 acumulado (todas las iteraciones de esta feature)**: 2
- **Entradas en DECISIONS.md para esta feature**: 2 (adaptación del loop TDD +
  corrección de componente Asistencias — el fix de layout lado a lado no generó
  entrada propia, ver nota abajo)
- **Rework Ratio estimado**: (2 + 2) ÷ 4 = **1.0**

🔴 Rework Ratio alto — de los 2 ciclos de autocorrección, 1 es un gap de spec
heredado del refine (componente cortado en el PDF, no detectable sin la evidencia
visual de Luna); el otro (layout apilado en vez de lado a lado, grilla de fechas sin
`justify-content`) es un error de implementación propio — el PDF sí mostraba las dos
secciones lado a lado y no se verificó con suficiente cuidado antes de entregar, a
diferencia del caso anterior. No se agregó una entrada nueva a `DECISIONS.md` para
este segundo fix porque no es una decisión de negocio ni un desvío del brief —
`spec.md`/`plan.md` nunca especificaron "apilado", así que no hay una decisión previa
que revertir, solo una corrección de CSS.

## Review — 2026-08-11
- command_origin: sdd-review
- resultado: APROBADO
- criterios_sin_test: 4
- criterios_sin_implementar: 0
- gaps_ui: 1
- hallazgos_e2e: 0
- structural_issues: 1
