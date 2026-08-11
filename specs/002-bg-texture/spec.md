# Spec — 002-bg-texture

## User Stories

### US-1 — Textura animada de fondo
- Given un developer del kit necesita un fondo oscuro pleno consistente con
  el PDF de referencia, con la vida sutil que pide el diseñador
- When aplica el helper de textura sobre un contenedor con
  `--ds-color-pdf-surface`
- Then ve los 32 puntos reales del tile (grid ≈17.13×9.10, `#ebf2fe`, grupo
  con `mix-blend-mode: screen; opacity: .05` fijo) cada uno animando su
  propia opacidad entre su valor medido y ~25% de ese valor, `ease-in-out`,
  ciclo base ~6s con jitter y delay propios por punto, sin sincronía visible
  entre puntos.

### US-2 — Retrofit de Login (actualización in situ)
- Given `.login-screen` ya tiene la versión estática de la textura
- When se actualiza al helper animado
- Then el fondo de Login respira sutilmente sin afectar
  `.login-card__pattern-dot` (elemento decorativo distinto, sin cambios).

### US-3 — Retrofit de Carga de Formulario (actualización in situ)
- Given `.screen-carga-formulario` ya tiene la versión estática
- When se actualiza al helper animado
- Then el fondo de esa screen respira igual que Login, mismo timing.

### US-4 — Accesibilidad: reducir movimiento
- Given un usuario tiene `prefers-reduced-motion: reduce` activo a nivel
  sistema
- When visita Login o Carga de Formulario
- Then la textura se ve estática (sin oscilar), sin excepción.

## Fuera de scope (v1)
- **Pantallas p.3, 4, 5, 6, 8, 9, 20 del triage** — quedan para features de
  esas pantallas en sprints siguientes.
- **Generalización a `--ds-color-pdf-surface-warm` u otras superficies.**
- **Corrección del mapeo p.3/p.5/p.6 en `component-roadmap.md`** — hallazgo
  aparte, no bloqueante.
- **Fix de sizing de `TaskCard` en kanban (p.8)** — no relacionado.
- **Replicar 1:1 un elemento visual puntual de Claude/claude.ai** — "como
  tiene Claude" es sensación general, confirmado con el diseñador vía Luna.
- **Sincronizar los puntos entre sí** (ola, patrón visible) — se eligió
  timing independiente por punto.

## Measurable Process Outcomes (DX)
- **DX-001**: el agente completa la implementación de esta corrección con
  menos de 2 ciclos de autocorrección (Rework).
- **DX-002**: mantener la densidad de ambigüedad en 0 — sin consultas de
  aclaración adicionales a las ya resueltas durante `/sdd-refine`.
