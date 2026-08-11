# Constitution — 002-bg-texture

## MUST

1. Tile de 32 elementos reales (30 `<path>` + 2 `<ellipse>`) extraído de
   `Textura fondo.svg` — sin sintetizar desde cero, sin cambios respecto a
   la versión estática.
2. Token `--ds-color-pattern-dot: #ebf2fe` en `styles.css` — ya existe.
3. **[Corrección]** Los 32 elementos pasan a **SVG inline real** en el DOM
   (no `background-image` con data URI) para poder animar opacidad por
   punto. Viven en `packages/ui/src/utils/backgroundTexture.tsx`, **no
   exportado** en `index.ts` (el rechazo a componente público sigue
   vigente). `Login.tsx` y `CargaDeFormulario.stories.tsx` lo importan.
4. **[Nuevo]** Cada punto anima su `opacity` (CSS `@keyframes`,
   `ease-in-out`, infinito) entre su valor base medido (0.54–0.96) y ~25% de
   ese valor. Ciclo base ~6s con jitter por índice (6.00–7.92s) y delay
   propio — **sin sincronía visible entre puntos** (decisión del humano
   tras comparar 3 velocidades).
5. El `<g>` contenedor mantiene `mix-blend-mode: screen; opacity: .05` fijo,
   sin animar (medido sobre `st2236` del SVG real; corrige el `.63` que
   había quedado documentado en `input.md`, ver `DECISIONS.md` 2026-08-10).
6. **[Nuevo]** Con `prefers-reduced-motion: reduce`, la animación se
   detiene — la textura cae a la apariencia estática ya implementada.
7. Se aplica únicamente sobre `--ds-color-pdf-surface` (`#060606`).
8. Retrofit ya aplicado a `Login`/`Carga de Formulario` — se actualiza in
   situ, no se agrega una tercera variante.
9. El SVG fuente (2.51MB) no se commitea; solo el tile entra al repo.
10. Se documenta el cierre en `knowledge/component-roadmap.md` (actualizar
    la entrada existente).
11. Reescalado del tile, si aplica, sigue `@2× ÷ 2` (`specs/README.md` §
    Scale calibration).
12. Antes de fijar geometría o parámetros de animación: gate de
    `visual-analysis-protocol.md` (PASS 9) + `fidelity-validation.md` — ya
    atrapó el error de opacidad de grupo en la primera ronda.

## PROHIBITED

1. No reproducir los 17.920 elementos originales como nodos DOM — los 32
   del tile sí son DOM real.
2. No exportar el helper de textura en `src/index.ts`.
3. No sincronizar los puntos entre sí (ola, patrón visible).
4. No aplicar la textura a pantallas fuera de Login/Carga de Formulario en
   esta feature.
5. No generalizar a `--ds-color-pdf-surface-warm` ni otras superficies.
6. No replicar 1:1 ningún elemento puntual de Claude/claude.ai — es una
   sensación general, no una referencia a copiar.
7. No modificar `existing-arch.md`; no instalar test framework ni linter
   como efecto colateral.
8. No tocar `.login-card__pattern-dot` — elemento decorativo distinto.
