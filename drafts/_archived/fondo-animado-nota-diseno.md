# Draft — Fondo animado (nota de diseño, corrección sobre 002-bg-texture)

Notas crudas para `/sdd-refine`. No es un spec formal.

## Contexto

Durante `/sdd-implement` de `002-bg-texture` se implementó la textura de fondo como
**estática** (tile SVG `<pattern>` extraído de `Textura fondo.svg`, `mix-blend-mode:
screen; opacity: .05` sobre el grupo, sin animación). En el grilling de `/sdd-refine`
se había preguntado el mecanismo de reproducción (imagen rasterizada / SVG `<pattern>`
/ filtro `feTurbulence`) — ninguna de las 3 opciones proponía animación explícita, y la
respuesta elegida (`<pattern>` real) fue estática por diseño.

Después de implementado, Luna trajo una nota del diseñador que no estaba disponible
durante el `/sdd-refine` original.

## Nota del diseñador (verbatim, vía Luna, post-implementación)

> "La idea es que pase y se vayan prendiendo y apagando los cuadraditos
> Como tiene claude creo
> Pero muy sutil para que no llame mucho la atención"

## Por qué esto no es un ajuste chico

Cambia el DONE CRITERIA y el UI/FLUJO de `002-bg-texture` — la textura pasa de estática
a animada (variación de opacidad en el tiempo por punto). Varios MUST de
`constitution.md` (los que fijan el mecanismo estático, MUST-1 a MUST-4) quedarían
superados, no solo ampliados. La feature sigue `OPEN` (no pasó `/sdd-checklist` ni
`/sdd-review` todavía), así que corresponde seguir bajo el mismo `feature_id`.

## Preguntas abiertas para el grilling de `/sdd-refine` (no asumidas acá)

- **"Cuadraditos"** — ¿es literal (el diseñador quiere una forma cuadrada nueva,
  distinta del punto/círculo medido en `Textura fondo.svg`) o es solo la forma
  coloquial de referirse a los puntos que ya se implementaron? El SVG real no tiene
  ningún elemento cuadrado — solo `<path>` (curvas tipo círculo/blob) y `<ellipse>`.
- **"Como tiene Claude"** — ¿a qué referencia visual exacta se refiere? (¿el shimmer
  del indicador de "pensando", algún fondo de claude.ai, otra cosa?) No inferir sin
  confirmar — puede cambiar completamente el mecanismo esperado.
- **Timing** — ¿cada cuánto prende/apaga cada punto? ¿ciclo fijo o aleatorio por punto
  (ruido temporal, no solo espacial como el que ya mide el SVG)?
- **Alcance simultáneo** — ¿todos los puntos animan a la vez, o solo un subconjunto en
  cualquier momento dado (para que se lea "sutil", como pide la nota)?
- **Mecanismo** — ¿CSS `@keyframes` con delays aleatorios por instancia, SVG SMIL
  (`<animate>`), JS con `requestAnimationFrame`, u otra cosa? Afecta performance y el
  tipo de asset (el tile actual es una única imagen de fondo vía `background-image`,
  no elementos DOM individuales — animar por-punto puede requerir cambiar esa
  arquitectura).
- **Accesibilidad** — ¿se respeta `prefers-reduced-motion` (pausar o reducir)? No
  estaba en el `input.md` original de `002-bg-texture`; es una restricción típica de
  este tipo de efecto que no se puede omitir sin decisión explícita.
- **¿Reemplaza o compone?** — ¿la versión animada reemplaza el mecanismo estático ya
  implementado (mismo tile, pero con opacidad individual animada en vez de fija), o es
  una capa nueva encima?

## Restricciones ya conocidas (heredadas de 002-bg-texture, no negociables salvo /sdd-log)

- Fuente real: `Textura fondo.svg` (Downloads de Luna, 2.51MB, no committeada por
  tamaño — mismo criterio que `DECISIONS.md` 2026-08-07).
- Solo aplica sobre `--ds-color-pdf-surface` (`#060606`) — no se ha verificado sobre
  otras superficies oscuras.
- Ya aplicada (versión estática) a `patterns/login/Login.tsx` y
  `screens/carga-de-formulario/CargaDeFormulario.stories.tsx` — la versión animada
  probablemente reemplaza esto in situ, no agrega una tercera variante de pantalla.
- Sin framework de test instalado — cualquier verificación queda manual en Storybook.
- Token `--ds-color-pattern-dot: #ebf2fe` y la medición del grid (pitch ≈17.13×9.10,
  radio 0.88–6.37) siguen siendo válidos — no hay evidencia de que el diseñador pida
  cambiar el color o la geometría base, solo agregar movimiento.

## Referencias

- `specs/002-bg-texture/` — spec/constitution/plan/tasks de la versión estática ya
  implementada (a revisar y actualizar, no a descartar del todo).
- `DECISIONS.md` (2026-08-10) — 3 decisiones ya tomadas sobre la versión estática
  (opacidad real vs. `.63` documentada, destino de docs, bug de CSS shorthand).
- `packages/ui/src/styles.css` — clase `.ds-bg-texture-dots` actual (estática).
