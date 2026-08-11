# Handoff — Arrancar Sprint 2 (Familia Tareas, p.5-9) en sesión fresca
Fecha: 2026-08-11
Tipo: GATE
Sesión de origen: Fase 4 completada (Sprint 1 / `003-home-dashboard` CLOSED vía `/sdd-review`, APROBADO)
Próximo comando sugerido: `/sdd-refine`

---

## Contexto del proyecto
Alejandría UI Kit — librería de componentes React con `knowledge/` como fuente de
verdad visual AI-first. Sigue el triage de 14 pantallas del PDF "Alejandria - Agosto
2026.pdf", trabajadas sprint por sprint vía SDD. Sprint 0 (fondo compartido) y
Sprint 1 (Home & Dashboard) ya cerrados.
→ Ver: `existing-arch.md`, `drafts/pantallas-grupo-a-b.md` § "Recomendación de
agrupamiento" y § "Grupo B"

## Estado al momento del handoff

✅ Completado:
- Sprint 1 (`003-home-dashboard`) CLOSED — Home (p.3) y Dashboard (p.4) construidas
  como screens completas (`packages/ui/src/screens/{home,dashboard}/`), reusando
  componentes existentes sin gaps de componente. Review APROBADO, checklist de 12
  ítems marcado.
- 2 correcciones de fidelidad post-implementación, encontradas por Luna comparando
  Storybook contra el PDF real (no detectables solo con el draft/refine): componente
  "Asistencias" (es `DonutChartCard`, no `ProgressRing`) y layout de Home (secciones
  lado a lado, no apiladas).
- `knowledge/component-roadmap.md` corregido: fila p.3 (Home real, no "Asistente
  vacío"); fila p.5 anotada (su descripción original pertenecía a p.3) — el
  contenido real de p.5/p.6 sigue sin resolver más allá de esa nota.

🔄 En curso:
- Ninguno — Sprint 1 cerró limpio, nada a medio camino.

🚧 Bloqueado / pendiente de decisión:
- **p.5 vs p.6** (¿pantallas reales distintas o field gallery del mismo patrón, igual
  que p.19?) — pregunta abierta explícita de Sprint 2, no resuelta todavía. El draft
  sugiere construir solo una (probablemente p.6, con más affordance real — "VER MÁS"
  navegable) si resulta ser field gallery.
- **p.7 — `DetailSheet` como panel lateral ancho (no modal centrado), con 3 botones
  de acción (no 2)** — confirmar contra `DetailSheet.tsx` actual si soporta ese
  layout antes de asumir que calza sin cambios.
- **p.8 — bug de sizing sin cerrar** (`component-roadmap.md` § "2026-07-28 sizing
  pass": un `style` externo pisa el cap del componente en la variante kanban) —
  decidir si se cierra antes de mostrar esta pantalla o queda dentro del scope de la
  feature que la construya.

## Caminos descartados (intentados sin éxito)
- **Asumir el componente de un gráfico sin ver la página completa del PDF** —
  descartada: en Sprint 1, "Asistencias" se asumió `ProgressRing` porque el PDF tenía
  ese elemento cortado (como si hubiera que scrollear); era en realidad
  `DonutChartCard`. Lección para Sprint 2: si algo del PDF se ve parcial/cortado en
  la captura, no asumir el componente por la forma general — pedir la captura
  completa o confirmar antes de fijarlo en el brief.
- **Fijar un layout (filas/columnas) sin verificarlo contra el PDF completo** —
  descartada: Home apiló "Próximos eventos"/"Resumen de productividad" en una
  columna en vez de ponerlas lado a lado como el PDF real muestra; el brief nunca
  especificó el arreglo exacto y se asumió mal. Lección: cuando el brief no fija
  explícitamente filas/columnas, no asumir.

## Foco de la próxima sesión
Correr `/sdd-refine` sobre `drafts/pantallas-grupo-a-b.md`, con foco acotado a
**Sprint 2 — Familia Tareas (p.5, 6, 7, 8, 9)**, la siguiente fila de la tabla de
agrupamiento del draft. Comparten `TaskCard`/`SideBar`. Puntos a confirmar en el
grilling (ya señalados por el draft y este handoff, no asumir):
- p.5/p.6: ¿dos pantallas reales o field gallery? Si es field gallery, ¿cuál se
  construye?
- p.7: `DetailSheet` como panel lateral ancho + 3 acciones — ¿extender el componente
  o es un gap chico a resolver en `/sdd-refine`?
- p.8: ¿se cierra el bug de sizing de `TaskCard` kanban antes, o como parte de esta
  feature?
- p.9: mismo componente que p.5/6, otro filtro — bajo riesgo, cero gaps nuevos
  esperados.

Al arrancar, aclarar explícitamente (igual que con Sprint 0 y 1) que se excluye el
resto del draft (Sprint 3-5: Reportes/Usuarios, Toast+Acordeón, Tabs+Chat) de esta
ronda.

**Nota técnica para llevar a `/sdd-refine`/`/sdd-generate`:** Sprint 1 dejó una
duplicación real (no prematura) de la configuración default de `SideBar`
(`primaryItems`/`secondaryItems`/`sidebarLogo`/`menuIcon`) copiada idéntica en 3
screens (`carga-de-formulario`, `home`, `dashboard`) — ver hallazgo estructural de
`/sdd-review` en `metrics/003-home-dashboard-metrics.md`. Sprint 2 construye hasta 5
screens más que también la van a necesitar; vale la pena decidir en el plan de esta
feature si se extrae a un helper compartido en vez de copiarla una 4ta, 5ta, 6ta y
7ma vez.

## Decisiones relevantes
→ Ver: `DECISIONS.md` — 2 entradas del 2026-08-11 (adaptación del loop TDD sin
framework de test, corrección de componente Asistencias). Relevantes para Sprint 2
por el mismo patrón: no asumir componentes ni layout sin verificar contra la fuente
real (PDF) antes de fijarlo en `constitution.md`/`spec.md`.

## Skills / comandos sugeridos para la próxima sesión
- `/sdd-refine` — primer comando, foco Sprint 2 (p.5-9) de `pantallas-grupo-a-b.md`.
- Si se decide cerrar el bug de sizing de `TaskCard` kanban (p.8) antes del grilling
  formal, puede ir como `/sdd-fix` aparte (es código, ≤3 archivos) o absorberse
  dentro de esta misma feature — decisión humana, no asumida acá.

## Información redactada
Ninguna.
