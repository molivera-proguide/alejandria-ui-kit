# Handoff — Arrancar Sprint 1 (Home & Dashboard, p.1-4) en sesión fresca
Fecha: 2026-08-10
Tipo: GATE
Sesión de origen: Fase 4 completada (Sprint 0 / `002-bg-texture` CLOSED vía `/sdd-review`)
Próximo comando sugerido: `/sdd-refine`

---

## Contexto del proyecto
Alejandría UI Kit — librería de componentes React con `knowledge/` como fuente de
verdad visual AI-first. Está en curso el triage de 14 pantallas del PDF "Alejandria -
Agosto 2026.pdf", trabajadas sprint por sprint vía SDD (recomendación de agrupamiento
del propio draft). Sprint 0 (textura de fondo compartida) recién cerrado.
→ Ver: `existing-arch.md`, `drafts/pantallas-grupo-a-b.md` § "Recomendación de
agrupamiento"

## Estado al momento del handoff

✅ Completado:
- Sprint 0 (`002-bg-texture`) CLOSED — textura de fondo animada (`BackgroundTextureDots`
  en `packages/ui/src/utils/`, no exportada), aplicada a Login y Carga de Formulario.
  Review APROBADO, checklist con los 14 ítems verificados.
- `graph/domain.yaml` corregido — `composed-patterns` y `knowledge-base` reflejan
  `002-bg-texture` completo (incluida la carpeta `screens/`, que no tenía dominio).
- `drafts/formularios-pdf-v3.md` archivado en `drafts/_archived/` (ya consumido por
  `001-form-modal`).

🔄 En curso:
- Ninguno — Sprint 0 cerró limpio, nada a medio camino.

🚧 Bloqueado / pendiente de decisión:
- El error de mapeo p.3/p.5/p.6 en `knowledge/component-roadmap.md` (triage original
  del 2026-08-07) sigue sin corregir en el roadmap — p.3 es Home, no "Asistente vacío"
  (ver hallazgo en `pantallas-grupo-a-b.md`). No bloquea Sprint 1 en sí, pero Sprint 1
  incluye p.3 — vale la pena corregirlo como parte del refine de este sprint, no dejarlo
  para después.
- p.5 vs p.6 (¿dos pantallas reales distintas o field gallery, mismo patrón que p.19?) —
  pregunta abierta del draft, pero es de **Sprint 2** (familia Tareas), no de Sprint 1.
  No hace falta resolverla todavía.

## Caminos descartados (intentados sin éxito)
- **Opacidad de grupo `.63` flat en la textura de fondo** — descartada: no coincidía
  con el archivo SVG real medido (era `mix-blend-mode: screen; opacity: .05`, no una
  opacidad plana). Se corrigió tras mostrarle al humano un comparativo visual de ambas
  antes de decidir.
- **Documentar el token/clase de la textura en `knowledge/tokens/`** — descartado: esa
  carpeta es una propuesta M2 congelada ("nada aplicado a styles.css todavía"), no un
  changelog vivo — ni los tokens de `001-form-modal` están ahí. Se redirigió a
  `knowledge/component-roadmap.md`.

Ninguno de los dos aplica directo a Sprint 1, pero dejan un precedente que probablemente
se repita: **verificar contra la fuente real (PDF/SVG) antes de fijar un valor
documentado, y no asumir que `knowledge/tokens/` es destino de docs.**

## Foco de la próxima sesión
Correr `/sdd-refine` sobre `drafts/pantallas-grupo-a-b.md`, con foco acotado a
**Sprint 1 — Home & Dashboard (p.1, 2, 3, 4)**, la siguiente fila de la tabla de
agrupamiento del draft. Las 4 páginas están marcadas "cero gaps de componente nuevo".
Puntos a confirmar en el grilling:
- p.3 = Home (no "Asistente vacío") — corregir la fila de `component-roadmap.md` como
  parte de este refine, ya que Sprint 1 la toca directamente.
- p.2 (Login) — coincide 1:1 con `patterns/login/Login.tsx` ya construido; confirmar que
  no hace falta nada nuevo a nivel *screen* (la pregunta chica sobre el patrón de puntos
  del fondo full-screen vs. la card ya quedó resuelta por Sprint 0 — Login ya usa
  `BackgroundTextureDots`).
- p.1 (Welcome/splash) — asset estático de una sola vez, sin componente ni screen doc,
  según el draft.
- p.4 (Dashboard módulos) — grilla de `ModuleCard`, cero gaps confirmados.

Al arrancar, aclarar explícitamente (igual que se hizo con Sprint 0) que se excluye el
resto del draft (Sprint 2-5: Tareas, Reportes/Usuarios, Toast+Acordeón, Tabs+Chat) de
esta ronda.

## Decisiones relevantes
→ Ver: `DECISIONS.md` — 3 entradas del 2026-08-10 (corrección de opacidad de grupo,
adaptación del loop TDD sin framework de test, destino real de docs de tokens).
Relevantes para Sprint 1 por el mismo patrón: no asumir, verificar contra la fuente
real antes de fijar algo en `constitution.md`/`spec.md`.

## Skills / comandos sugeridos para la próxima sesión
- `/sdd-refine` — primer comando, foco Sprint 1 (p.1-4) de `pantallas-grupo-a-b.md`.
- Si se decide cerrar el error de mapeo de `component-roadmap.md` antes del grilling
  formal, puede ir como un ajuste rápido al principio del mismo `/sdd-refine`, no
  necesita ser un `/sdd-fix` aparte (es documentación, no código).

## Información redactada
Ninguna.
