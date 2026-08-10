# Draft — Escala tipográfica más legible (todo el kit)

Notas crudas para `/sdd-refine`. No es un spec formal. Surgió en la sesión de
`/sdd-checklist` de `001-form-modal` (2026-08-07): Luna encontró el tamaño de
fuente difícil de leer y aclaró que **no es solo de Form/Modal — es general,
en todo el kit**. Se decidió explícitamente no mezclarlo con el fix de esa
feature ni bloquear su `/sdd-review` — queda para su propia iteración.

## Por qué esto no es un `/sdd-fix`

`CLAUDE.md` promueve un fix a feature cuando crece (>3 archivos o contratos
nuevos). Este caso lo amerita por volumen, no solo por criterio formal:
`packages/ui/src/styles.css` tiene **~150+ declaraciones `font-size`**
hardcodeadas por componente, cada una con su propio comentario de calibración
del tipo `/* calibrated ÷2 — PDF 16pt */` — es el rastro literal de meses de
fidelity-pass contra `knowledge/references/design-reference.pdf`. No hay una
escala tipográfica centralizada: solo un puñado de casos usan tokens
compartidos (`--ds-text-button-sm`, `--ds-text-badge`, `--ds-text-label`,
`--ds-text-control`, `--ds-text-body-sm`, `--ds-text-chart`,
`--ds-text-display-sm`); el resto son valores sueltos por selector.

Agrandar "en general" implica, como mínimo, decidir una estrategia — no hay
un solo punto de cambio hoy.

## Tensión con el principio rector del proyecto

Todo el fidelity-pass (ver `knowledge/fidelity-pass/next-steps.md` y la nota
de memoria `project-fidelity-pass-track`) se basó en que el PDF es la fuente
de verdad visual exacta, calibrada valor por valor. Agrandar tamaños por
legibilidad es una **desviación deliberada** de esa fuente, no una corrección
hacia ella — necesita quedar registrada en `DECISIONS.md` antes de tocar
`styles.css`, y probablemente redefine qué significa "calibrado" para
componentes futuros.

## Preguntas abiertas para el grilling de `/sdd-refine`

- **Alcance real**: ¿todo el kit por igual, o hay jerarquía (ej. texto de
  cuerpo/label sí, texto mono/técnico de badges/status se mantiene chico a
  propósito)? Los 150+ valores no son homogéneos — van de `4px` a `42px`
  según el rol (labels de datepicker vs. números grandes de StatTile).
- **Mecanismo**: ¿se introduce un token de escala global (ej. multiplicador
  `--ds-scale` o un `calc()` sobre cada valor), o se re-calibra cada valor a
  mano igual que se hizo la primera vez contra el PDF? La primera opción es
  más rápida pero puede romper proporciones relativas que el PDF sí define
  (ej. jerarquía label-activo vs. label-estático en los Form* nuevos).
- **¿Reabre componentes ya cerrados?**: el fidelity-pass dio por cerrados
  bloques enteros (Login, GRAFICOS, Ficha, etc.) contra tamaños exactos del
  PDF — este cambio los reabre a todos en simultáneo. ¿Se hace de una, o por
  tandas con revisión visual entre medio (mismo patrón que
  `feedback_review-before-push`)?
- **¿Toca la fuente de verdad?**: si el PDF se actualiza en el futuro (como
  pasó con v2→v3), ¿la nueva escala "más legible" se vuelve la referencia
  para comparar contra nuevas páginas, o el PDF sigue siendo literal y esto
  queda como una excepción documentada?

## Restricciones ya conocidas

- `knowledge/design-system-rules.md` es la autoridad de estilos — cualquier
  desviación del PDF debe resolverse a favor de `knowledge/` y quedar en
  `DECISIONS.md` (regla de `CLAUDE.md`).
- Sin framework de test instalado — no hay regresión visual automatizada;
  la verificación de que nada se rompió va a ser manual en Storybook,
  componente por componente (alto volumen de superficie a revisar).

## Referencias
- `packages/ui/src/styles.css` — ~150+ `font-size` hardcodeados, grep
  `font-size|--ds-font` para el inventario completo
- `knowledge/design-system-rules.md` — autoridad de estilos
- `knowledge/fidelity-pass/next-steps.md` — tracker del fidelity-pass que
  calibró los valores actuales
- `specs/001-form-modal/` — feature durante cuya sesión de checklist surgió
  este hallazgo
