# Registro de decisiones — SDD

Este archivo registra cada vez que una decisión humana desvía o amplía
lo establecido en el brief original (input.md).
Sirve como trazabilidad entre lo que se pidió y lo que se implementó.

## Índice

| ID | Título | Status | Fecha | Feature |
|---|---|---|---|---|
| D001 | Enumerar estados por story y marcar nuevo/editar en tasks.md | accepted | 2026-08-07 | 001-form-modal |
| D002 | Saltar el loop TDD formal — sin framework de test instalado | accepted | 2026-08-07 | 001-form-modal |
| D003 | Valores de implementación no especificados por el PDF | accepted | 2026-08-07 | 001-form-modal |
| D004 | Gap de proceso: input.md/spec.md/tasks.md no pidieron documentación de knowledge/ | accepted | 2026-08-07 | 001-form-modal |
| D005 | LinearBarChartCard y DetailSheet — mismo gap de indexación, causas distintas | accepted | 2026-08-07 | — |
| D006 | Cierre de los 2 pendientes de DetailSheet (cita de página + tokenización) | accepted | 2026-08-07 | — |
| D007 | Limpieza de 2 notas obsoletas en component-roadmap.md | accepted | 2026-08-07 | — |
| D008 | PDFs de referencia grandes: no se commitean al repo por defecto | accepted | 2026-08-07 | — |
| D009 | Primera screen (Carga de Formulario, p.19): reencuadrada como field gallery | accepted | 2026-08-07 | — |
| D010 | Corrección de la opacidad de grupo de la textura de fondo (.63 → screen .05) | accepted | 2026-08-10 | 002-bg-texture |
| D011 | Adaptar el loop TDD a verificación visual (sin framework de test) | accepted | 2026-08-10 | 002-bg-texture |
| D012 | Destino real de la documentación de tokens — no knowledge/tokens/ | accepted | 2026-08-10 | 002-bg-texture |
| D013 | Adaptar el loop TDD a verificación visual (sin framework de test) | accepted | 2026-08-11 | 003-home-dashboard |
| D014 | Corrección de componente: "Asistencias" en Home es DonutChartCard, no ProgressRing | accepted | 2026-08-11 | 003-home-dashboard |
| D015 | Duplicación de config de SideBar — se mantiene por ahora | accepted | 2026-08-11 | 004-familia-tareas |
| D016 | Adaptar el loop TDD a verificación visual (sin framework de test) | accepted | 2026-08-11 | 004-familia-tareas |
| D017 | Adaptar el loop TDD a verificación visual (sin framework de test) | accepted | 2026-08-11 | 005-alert-toast-filter |
| D018 | Corrección post-implementación: DetailSheet (ancho/overlap/tipografía) y headings faltantes | accepted | 2026-08-12 | 005-alert-toast-filter |
| D019 | Bug real en TaskCard variant="default": fondo invisible con BackgroundTextureDots | accepted | 2026-08-12 | 005-alert-toast-filter |
| D020 | Corrección: borde faltante en el chamfer de TaskCard variant="default" | accepted | 2026-08-12 | 005-alert-toast-filter |
| D021 | Correcciones tempranas sin loggear: z-index del overlay y primer ajuste de ancho del panel (retroactivo) | accepted | 2026-08-11 | 004-familia-tareas |
| D022 | Primera medición real contra el PDF de screens (panel a 656px, "VER MÁS" como chip, overlay) | accepted | 2026-08-11 | 004-familia-tareas |
| D023 | TaskCard sin navegación por teclado ni hover cuando es interactiva | accepted | 2026-08-12 | fix-001-taskcard-keyboard-hover |
| D024 | Topbar: AlertBar no ocupaba el ancho completo, íconos van superpuestos | accepted | 2026-08-12 | fix-002-topbar-alertbar-fullwidth |

---

## 2026-08-07 Enumerar estados por story y marcar nuevo/editar en tasks.md

**feature_id:** 001-form-modal
**command_origin:** sdd-validate
**status:** accepted
**Gap o motivo:** `/sdd-validate` encontró 2 gaps en `tasks.md`: (1) T003–T007 no
enumeraban qué estados debía mostrar cada story (solo T002, `FormTextInput`,
lo especificaba explícitamente); (2) la columna "Archivos" no distinguía
`(nuevo)` de `(editar)` por archivo, a diferencia de `plan.md`, que sí lo hace
en su árbol de carpetas (chequeo brownfield #6 del comando).
**Alternativas consideradas:** ninguna evaluada.
**Por qué se descartaron:** no aplica — no hubo alternativas reales, era una
corrección mecánica directa sobre un artefacto ya generado.
**Decisión tomada:** se editó `tasks.md` para que T003–T007 detallen los
estados esperados en cada story (ej. T005 `FormFileUpload`: empty/drag-hover/
archivo(s) cargado(s)/error/disabled; T007 `Modal`: un solo estado, sin
variantes activo/error/disabled) y para que cada archivo en la columna
"Archivos" quede marcado `(nuevo)` o `(editar)`.
**Motivo:** corrección sugerida directamente por el reporte de `/sdd-validate`
del paso anterior.
**Artefactos modificados:** tasks.md (specs/001-form-modal/)
**Decidido por:** Luna

---

## 2026-08-07 Saltar el loop TDD formal — sin framework de test instalado

**feature_id:** 001-form-modal
**command_origin:** sdd-implement
**status:** accepted
**Gap o motivo:** `/sdd-implement` exige el loop TDD (Red-Green-Refactor) por
tarea, pero `existing-arch.md` registra que no hay framework de test
instalado (decisión consciente) y que instalar uno requiere decisión
explícita, no asumirla. `tasks.md` de esta feature tampoco incluye tareas de
test (decisión ya tomada en `/sdd-generate`).
**Alternativas consideradas:** instalar Vitest ahora para cumplir el loop TDD
formal con tests de render/props/estados por componente.
**Por qué se descartaron:** habría instalado una dependencia nueva como
efecto colateral de una feature de UI pura, sin una necesidad concreta más
allá de cumplir el formato del comando — decisión que `constitution.md`
(PROHIBITED-2) y `existing-arch.md` piden tomar explícitamente, no de forma
automática.
**Decisión tomada:** se adapta el loop TDD a verificación visual: cada
componente se implementa junto con su story en Storybook cubriendo los
estados definidos en `tasks.md` (T002–T007), y la verificación final es el
fidelity pass contra el PDF (T009) en lugar de asserts de test automatizado.
**Motivo:** coherente con la decisión ya vigente del proyecto de no tener
framework de test, y con que esta feature es de componentes visuales puros
sin lógica de negocio que testear.
**Artefactos modificados:** ninguno (decisión de proceso, no de contenido de
`specs/001-form-modal/`)
**Decidido por:** Luna

---

## 2026-08-07 Valores de implementación no especificados por el PDF (feature 001-form-modal)

**feature_id:** 001-form-modal
**command_origin:** sdd-implement
**status:** accepted
**Gap o motivo:** `constitution.md` MUST-8 exige registrar en `DECISIONS.md`
cualquier valor visual/de comportamiento que el PDF v3 (p.17–22) no
especifica pero que la implementación necesitaba resolver igual. Puntos
concretos: (1) timing/easing de la animación estático↔activo ("sumarle
animación", sin valores); (2) estilo visual de `disabled` (el PDF solo cubre
"activo" y "con error"); (3) altura mínima del control de los 5 field
primitives (el PDF da tipografía/color pero no la caja del campo); (4) el
highlight de drag-over en `FormFileUpload` (el diseñador deja la interacción
explícitamente abierta: "escucho sugerencias... mientras busco referencias");
(5) mes/año del `FormDatePicker` como `<select>` nativo en vez de 2
desplegables custom adicionales (el PDF muestra un chevron junto a cada uno,
sugiriendo que son seleccionables, pero no da spec de esa interacción).
**Alternativas consideradas:** para (4), un drag&drop más elaborado (preview
de archivo, indicador de progreso); para (5), construir 2 listboxes custom
más (mismo patrón que `FormSelect`) en vez de `<select>` nativo.
**Por qué se descartaron:** (4) el propio draft de `/sdd-refine` ya acotó
"drag&drop básico" como decisión de scope (ver `input.md` § UI/FLUJO) — un
tratamiento más elaborado excede lo pedido. (5) 2 listboxes custom más
habrían agregado bastante código para un sub-control secundario (navegación
de mes/año, no el campo principal) sin spec visual propia que justifique no
usar el elemento nativo del navegador.
**Decisión tomada:** (1) `transition` CSS simple de 180ms (`--ds-duration-md`,
token ya existente) sobre `top`/`font-size`/`border-color` en los 5 field
primitives. (2) `disabled` usa `opacity: 0.58`, el mismo tratamiento que
`.ds-button:disabled` ya usa en el kit — reuso de convención existente, no un
valor nuevo inventado. (3) `min-height: 44px` en `.ds-form-field__control`
(default) — suficiente para el label flotante + fila de input, sin base
PDF-medida. (4) `.ds-form-file__zone--drag` cambia solo `border-color` a
blanco al arrastrar por encima — sin preview/progreso/reorder. (5) mes y año
del `FormDatePicker` son `<select>` nativos estilizados, no listboxes custom.
**Motivo:** ninguno de estos puntos tiene un valor citable en
`knowledge/references/pdf-text-extract.md` p.17–22 ni en el render de
`get_pixmap()` de p.21 (ver `knowledge/fidelity-pass/next-steps.md`) — son
huecos genuinos de la spec, no ambigüedades que debieran haberse preguntado
antes de implementar (la Fase de `/sdd-refine` ya cubrió las ambigüedades
que sí eran decisiones de producto).
**Artefactos modificados:** `packages/ui/src/components/FormTextInput.tsx`,
`FormSelect.tsx`, `FormCheckable.tsx`, `FormFileUpload.tsx`,
`FormDatePicker.tsx`, `packages/ui/src/styles.css`
**Decidido por:** Luna (revisión pendiente en Storybook antes de commit/push)

---

## 2026-08-07 Gap de proceso: `input.md`/`spec.md`/`tasks.md` de 001-form-modal no
pidieron la documentación de `knowledge/` (post-review)

**feature_id:** 001-form-modal
**command_origin:** sdd-review (hallazgo post-cierre, reportado por Luna)
**status:** accepted
**Gap o motivo:** cada uno de los 24 componentes exportados previos a esta feature tiene
`knowledge/components/<Nombre>.md` + `knowledge/specs/components/<Nombre>.spec.md` +
registro en `design-system-manifest.json` + fila en `knowledge/index.md` — convención
establecida y confirmada por `existing-arch.md` ("el `knowledge/` es tan 'producto' como
el código en sí"). Ni `input.md`, ni `spec.md`, ni `tasks.md` de `001-form-modal`
incluyeron esos artefactos como entregable (T008/T009 solo cubrían
`component-roadmap.md`/`fidelity-pass/next-steps.md`), y el `/sdd-review` de esta feature
no lo cruzó tampoco — leyó `knowledge/index.md`/`decision-order.md` solo para tokens/
colores, no para completitud de indexación. Luna lo señaló directamente después del cierre
del review.
**Alternativas consideradas:** dejar el gap para una `/sdd-refine` separada en vez de
resolverlo ahora.
**Por qué se descartaron:** el trabajo es mecánico (transcribir datos ya verificados en el
fidelity pass a la plantilla de `knowledge/templates/component.md` + `SCHEMA.md`), de bajo
riesgo, y bloquea que cualquier agente futuro descubra estos 6 componentes vía
`knowledge/index.md` — no amerita una feature nueva.
**Decisión tomada:** se crearon los 6 pares de documentos (`knowledge/components/
{FormTextInput,FormSelect,FormCheckable,FormFileUpload,FormDatePicker,Modal}.md` +
`knowledge/specs/components/<mismo>.spec.md`), se registraron los 12 artefactos en
`design-system-manifest.json` (`components[]`/`specs[]`), se agregaron las 6 filas a la
tabla de `knowledge/index.md`, y se actualizó el conteo/lista de
`knowledge/specs/README.md`. No se reabrió `feature.status.md` (ya `CLOSED`) porque el gap
no invalida los criterios de aceptación de `spec.md` — es un entregable de proceso que
`spec.md`/`tasks.md` nunca pidieron, no un bug del review.
**Motivo:** trazabilidad — que quede registrado por qué 001-form-modal no tuvo estos
artefactos desde el `/sdd-implement` original, y como recordatorio para `/sdd-generate`:
una feature que agrega componentes nuevos exportados debería incluir por defecto una task
de documentación `knowledge/` (mismo patrón que T008/T009), no asumir que se cubre solo.
**Artefactos modificados:** `knowledge/components/FormTextInput.md`, `FormSelect.md`,
`FormCheckable.md`, `FormFileUpload.md`, `FormDatePicker.md`, `Modal.md`;
`knowledge/specs/components/` (mismos 6 nombres, `.spec.md`);
`knowledge/design-system-manifest.json`; `knowledge/index.md`; `knowledge/specs/README.md`
**Decidido por:** Luna

---

## 2026-08-07 `LinearBarChartCard` y `DetailSheet` — mismo gap de indexación, causas
distintas

**feature_id:** — (no ligado a una feature puntual; hallazgo transversal reportado por Luna
tras la entrada anterior)
**command_origin:** sdd-review (continuación del hallazgo de `knowledge/` sin indexar)
**status:** accepted
**Gap o motivo:** dos exports de `packages/ui/src/index.ts` no estaban registrados en
`design-system-manifest.json` ni en la tabla de `knowledge/index.md`, por razones distintas:
(1) **`LinearBarChartCard`** ya tenía `knowledge/components/LinearBarChartCard.md` +
`knowledge/specs/components/LinearBarChartCard.spec.md` completos en disco — solo faltaba
el registro en el manifest/index (gap mecánico, ya señalado como pendiente por el propio
`knowledge/specs/README.md`, nota "Note: InvestigationCard..." de un caso análogo anterior).
(2) **`DetailSheet`** no tenía ningún doc de componente. Es un caso más profundo: el brief
`knowledge/patterns/detail-sheet.md` (anterior a esta sesión) especificaba explícitamente
que `DetailSheet` **no era un componente** y que **nunca debía exportarse** del kit
("Avoid introducing any new Design System exports", implementación target en
`apps/web/src/patterns/detail-sheet/`). El 2026-07-28 (sesión previa, ver
`knowledge/component-roadmap.md` fila "Export `DetailSheet`") se decidió moverlo a
`packages/ui/src/patterns/detail-sheet/` y exportarlo desde `index.ts` — una decisión que
contradice ese brief directamente, y que nunca generó su propio `knowledge/components/
DetailSheet.md` ni entrada en el manifest.
**Alternativas consideradas:** para `DetailSheet`, revertir la exportación en vez de
documentarla (volver a la intención original del brief).
**Por qué se descartaron:** revertir sería un cambio de API pública no pedido por Luna —
la exportación ya está en producción hace más de una semana (2026-07-28), y el pedido
explícito de esta sesión fue "resolvé" (documentar/indexar), no "deshacé". Mantener el
comportamiento actual y documentarlo fielmente es lo consistente con el resto de la sesión.
**Decisión tomada:** (1) `LinearBarChartCard` registrado en `design-system-manifest.json`
(`components[]`/`specs[]`) y en `knowledge/index.md`. (2) Se creó
`knowledge/components/DetailSheet.md` + `knowledge/specs/components/DetailSheet.spec.md`
(spec marcada explícitamente como *documentation backfill*, no fidelity pass — los valores
se transcribieron de `detail-sheet.css` tal cual, sin re-medir contra el PDF), se registró
en el manifest y en `knowledge/index.md`, y se agregó un banner "Superseded" al tope de
`knowledge/patterns/detail-sheet.md` explicando la contradicción en vez de borrar el brief
original (valor histórico).
**Motivo:** mismo principio que la entrada anterior — `knowledge/` es "tan producto como el
código" (`existing-arch.md`); un export sin doc ni registro es invisible para cualquier
agente que consulte `knowledge/index.md` antes de generar UI.
**Nota abierta, no resuelta:** `DetailSheet.md` documenta pero no resuelve una discrepancia
de cita de página PDF heredada (roadmap dice p.5, el JSDoc del componente dice p.4) ni
tokeniza los colores hex literales de `detail-sheet.css` — quedan como Known Limitations /
Future Improvements en el doc nuevo, no como deuda de esta decisión.
**Artefactos modificados:** `knowledge/components/DetailSheet.md` (nuevo);
`knowledge/specs/components/DetailSheet.spec.md` (nuevo);
`knowledge/patterns/detail-sheet.md` (banner agregado, contenido original intacto);
`knowledge/design-system-manifest.json`; `knowledge/index.md`; `knowledge/specs/README.md`
**Decidido por:** Luna

---

## 2026-08-07 Cierre de los 2 pendientes de `DetailSheet` (cita de página + tokenización)

**feature_id:** — (continuación de la entrada anterior)
**command_origin:** sdd-review (hallazgo post-cierre)
**status:** accepted
**Gap o motivo:** `DetailSheet.md`/`.spec.md` quedaron con 2 pendientes explícitos al
cerrarse la entrada anterior: (1) discrepancia de cita de página PDF (`component-roadmap.md`
decía p.5, el JSDoc de `DetailSheet.stories.tsx` decía "página 4"); (2) colores/bordes
hardcodeados en `detail-sheet.css` en vez de tokens `--ds-*`, pese a que varios coincidían
exactamente con tokens ya existentes.
**Alternativas consideradas:** ninguna real — ambos eran verificaciones/transcripciones
mecánicas, no decisiones de diseño.
**Por qué se descartaron:** no aplica.
**Decisión tomada:** (1) Verificado con `get_text()` sobre `design-reference.pdf`: p.4 es
"INVESTIGATION CARD" (componente distinto, ya construido); p.5 contiene verbatim el
contenido mock de `DetailSheet.stories.tsx` (`"#1232142342 - 3408473"`, `"DESCRIPCIÓN"`,
`"MÉTRICAS DE RENDIMIENTO DE LA TAREA"`). Corregido el JSDoc de
`DetailSheet.stories.tsx` de "página 4" a "página 5". (2) Migrados en `detail-sheet.css`
todos los colores/bordes hairline con match exacto a un token `--ds-*` existente
(`--ds-color-pdf-surface-warm`, `--ds-color-pdf-surface`, `--ds-color-pdf-line`,
`--ds-color-pdf-line-light`, `--ds-color-pdf-ink-muted`, `--ds-color-pdf-critical`,
`--ds-color-pdf-action`, `--ds-color-white`, `--ds-border-width-hair`). Verificado sin
regresión visual: mismos valores `getComputedStyle` (RGB) antes/después en Storybook
(`Alejandria/Patterns/DetailSheet` → `Fichas`). `#7f0000` (fondo de status `critical`) y
un puñado de `rgb(0 0 0 / α)`/el gradiente del preview multimedia quedaron literales por no
tener token equivalente en el kit — confirmado, no es una omisión.
**Motivo:** cerrar los 2 "Known Limitations"/"Future Improvements" que quedaron abiertos en
la sesión anterior, a pedido explícito de Luna.
**Artefactos modificados:** `packages/ui/src/patterns/detail-sheet/DetailSheet.stories.tsx`
(cita de página); `packages/ui/src/patterns/detail-sheet/detail-sheet.css` (tokenización);
`knowledge/components/DetailSheet.md`; `knowledge/specs/components/DetailSheet.spec.md`
**Decidido por:** Luna

---

## 2026-08-07 Limpieza de 2 notas obsoletas en `component-roadmap.md`

**feature_id:** — (mantenimiento de doc, sin feature asociada)
**command_origin:** conversación directa (Luna pidió "arrancá con las 2 inconsistencias de
doc" tras el resumen de próximos pasos)
**status:** accepted
**Gap o motivo:** revisando el roadmap para proponer próximos pasos, encontré 2 afirmaciones
desactualizadas que se contradecían con otras filas del mismo archivo: (1) la fila "Ficha"
del Gap Table decía "built but not exported from the main `index.ts` barrel" — falso desde
el 2026-07-28, contradicho por la fila "Export `DetailSheet` — ✅ Done" más abajo en el mismo
archivo. La sección "Quick win" también describía esto como pendiente. (2) La tabla
post-baseline y el detalle de la "2026-07-28 sizing pass" decían "`Asistente` 774px —
deferred" — falso desde el 2026-08-06, contradicho por la entrada de
`fidelity-pass/next-steps.md` que cerró ese hallazgo ese mismo día.
**Alternativas consideradas:** borrar las notas viejas en vez de corregirlas in situ.
**Por qué se descartaron:** el propio archivo usa la convención de marcar notas superadas
como "stale, superseded" en vez de borrarlas (ver por ejemplo la nota de "Form" 2026-08-06
más arriba en el mismo doc) — se mantuvo esa convención.
**Decisión tomada:** corregidas las 4 apariciones (Gap table, sección "Quick win", tabla
post-baseline, detalle de la sizing pass) marcando explícitamente qué decía antes y por qué
ya no es cierto, sin borrar el texto histórico.
**Motivo:** las notas desactualizadas hacen que cualquier agente que lea el roadmap antes de
proponer trabajo (regla de `CLAUDE.md`: "consultá PRIMERO `graph/domain.yaml`"/roadmap)
reciba información incorrecta sobre qué está realmente pendiente.
**Artefactos modificados:** `knowledge/component-roadmap.md`
**Decidido por:** Luna

---

## 2026-08-07 PDFs de referencia grandes: no se commitean al repo por defecto

**feature_id:** — (decisión de infraestructura/proceso, sin feature asociada)
**command_origin:** conversación directa — Luna preguntó si estamos empaquetando el PDF
para consumidores, y de ahí surgió qué hacer con el PDF nuevo de pantallas
("Alejandria - Agosto 2026.pdf", 107.7MB) antes de seguir con la triage.
**status:** accepted
**Gap o motivo:** verificando la pregunta de Luna, confirmé que el mecanismo de
empaquetado ya excluye correctamente `knowledge/references/design-reference.pdf` del
tarball publicado (`scripts/copy-knowledge.mjs`, `EXCLUDE = ["references/design-reference.pdf"]`)
y que `knowledge/consumer/AGENTS.template.md` (el doc que sí viaja al consumidor) ya
declara ese PDF como "internal/maintainer... not available or needed" del lado del
consumidor — la arquitectura que Luna esperaba ya estaba implementada. Pero el PDF nuevo
de pantallas (107.7MB) trajo un problema distinto: excede el límite duro de GitHub de
100MB por archivo en pushes normales de git, y este repo no tiene Git LFS configurado
(`.gitattributes` no tiene reglas para `*.pdf`).
**Alternativas consideradas:** (1) configurar Git LFS para `*.pdf` (y migrar también
`design-reference.pdf`, 65MB, a LFS por consistencia); (2) comprimir/rasterizar el PDF
nuevo por debajo de 100MB, sacando las ilustraciones 3D decorativas pesadas (ej. el
splash de p.1) que no aportan nada a las specs de componentes.
**Por qué se descartaron:** Luna eligió explícitamente no commitear el PDF crudo en
absoluto — (1) y (2) suman trabajo/infraestructura (LFS es una dependencia nueva que
cualquiera que clone el repo necesita tener configurada; comprimir pierde fidelidad
vectorial para passes futuros) para un archivo que, por su propia definición, es de uso
interno único (extraer specs una vez, no consultarlo en vivo después).
**Decisión tomada:** el PDF de pantallas queda fuera del repo, tratado como una
referencia externa (como un archivo de Figma) que Luna mantiene en su Downloads/Drive,
citado por nombre y página en `knowledge/component-roadmap.md`. Lo que se commitea es lo
que efectivamente importa: la tabla de triage, los gaps que encontró, y — cuando se
construya una pantalla puntual — su propio `knowledge/screens/*.md` + el componente ya
fidelity-checked. **Regla general hacia adelante:** cualquier PDF de referencia grande
futuro sigue el mismo criterio por defecto — no se commitea al repo salvo decisión
explícita en contrario (ej. si se necesita reverificación pixel-a-pixel recurrente, ahí
sí evaluar Git LFS).
**Motivo:** consistencia con la arquitectura de empaquetado ya existente (el PDF nunca es
parte de lo que un consumidor necesita) y con el límite técnico real de GitHub (100MB),
sin sumar infraestructura (LFS) para un caso de uso de una sola vez.
**Artefactos modificados:** `knowledge/component-roadmap.md` (nota de la sección "Screens
triage" actualizada de "not yet copied" a la decisión final)
**Decidido por:** Luna

---

## 2026-08-07 Primera screen (`Carga de Formulario`, p.19): reencuadrada como field
gallery, no como port 1:1 del PDF

**feature_id:** — (prueba de concepto de la capa `knowledge/screens/*`, sin feature SDD
asociada — construida directo, sin `/sdd-refine`, porque no había ninguna ambigüedad que
resolver: los 6 componentes que usa ya estaban spec'ados y fidelity-checked)
**command_origin:** conversación directa
**status:** accepted
**Gap o motivo:** la página 19 del PDF de pantallas muestra el mismo campo semántico con
más de una representación de UI a la vez (ej. "tipo de usuario" como `FormSelect` Y como
grupo de radios, dos veces, con y sin bajada; "acceso a módulos" como checkbox Y como
switch) más varios desplegables (`FormSelect` ×2, `FormDatePicker`) abiertos
simultáneamente. Portarlo literal pixel-a-pixel habría significado forzar múltiples
overlays `position: absolute` abiertos a la vez en una grilla de 3 columnas angostas —
algo que ninguno de estos componentes hace en un estado de reposo real (todos abren por
click, uno a la vez).
**Alternativas consideradas:** (1) reproducir literalmente todos los desplegables abiertos
a la vez, aceptando que se superpongan/rompan visualmente; (2) simplificar a un único
formulario de producto hipotético ("crear usuario"), usando cada componente una sola vez y
descartando la duplicación de campos.
**Por qué se descartaron:** (1) no es un estado real de ningún componente — mostrarlo así
no documentaría cómo se ve la pantalla en reposo, documentaría un bug de layout inventado.
(2) habría perdido valor de referencia real: la duplicación intencional (select vs. radio,
checkbox vs. switch, con/sin bajada) es exactamente lo que hace útil a esta pantalla como
"catálogo en contexto" de las variantes de `FormCheckable`/`FormSelect` — inventar un
formulario "más limpio" habría sido más una interpretación mía que una reproducción fiel
del material fuente.
**Decisión tomada:** se reprodujo la misma variedad de campos que muestra la página 19,
pero cada uno en su estado de reposo (cerrado, con valor visible) en vez de forzar
aperturas simultáneas — documentado explícitamente en
`knowledge/screens/carga-de-formulario.md` § "Not a literal 1:1 port" para que quede claro
que es una decisión de composición, no un error de fidelidad. De paso quedó establecida la
convención de carpeta para esta capa nueva: `packages/ui/src/screens/<nombre>/` +
`knowledge/screens/<nombre>.md`, ya que hasta hoy la única screen (`Operations Console`)
vivía ad-hoc dentro de `components/Components.stories.tsx`.
**Motivo:** coherencia con el principio general del proyecto ("prefer omission over
invention", `design-principles.md`) aplicado a este caso puntual: no inventar un estado
visual que el componente no tiene, y no inventar un formulario de producto que el material
fuente no pedía.
**Artefactos modificados:** `packages/ui/src/screens/carga-de-formulario/{CargaDeFormulario.stories.tsx,carga-de-formulario.css}` (nuevos);
`knowledge/screens/carga-de-formulario.md` (nuevo); `knowledge/design-system-manifest.json`;
`knowledge/index.md`; `knowledge/component-roadmap.md`
**Decidido por:** Luna

---

## 2026-08-10 Corrección de la opacidad de grupo de la textura de fondo (.63 → screen .05)

**feature_id:** 002-bg-texture
**command_origin:** sdd-implement
**status:** accepted
**Gap o motivo:** `input.md` (y por herencia `constitution.md` MUST-3,
`spec.md` US-1) documentaba "opacidad de grupo `.63`" para la textura de
puntos, medida durante `/sdd-refine`. Al ejecutar el gate de fidelidad
obligatorio de T002 (constitution.md MUST-10: `visual-analysis-protocol.md`
PASS 9 + `fidelity-validation.md`) antes de fijar la geometría del tile,
parseé `Textura fondo.svg` completo y encontré que el `<g>` real que envuelve
los ~17.920 puntos (`class="st2236"`) tiene `mix-blend-mode: screen;
opacity: .05` — no `opacity: .63`. `.63` es solo uno de los 2.239 valores de
opacidad *individual* por punto que sí varían (rango 0.5–0.99, eso sí
coincide con lo medido), pero no es el valor del grupo contenedor.
**Alternativas consideradas:** (1) implementar fiel al archivo real (`screen`
+ `.05`); (2) mantener `.63` flat tal como quedó documentado; (3) un valor
intermedio a mano sin blend mode.
**Por qué se descartaron:** (2) prioriza lo ya escrito sobre lo verificado en
la fuente real que esta misma feature eligió como fuente de verdad — exactamente
el error que el gate de fidelidad (MUST-10) existe para atrapar. (3) inventa
un número no medido, contra el principio de "nunca inventar valores no
medidos" de `reasoning/decision-order.md` §2.
**Decisión tomada:** se implementa fiel al archivo real: `mix-blend-mode:
screen; opacity: .05` sobre el grupo de puntos en `.ds-bg-texture-dots`. Antes
de decidir, se generó un comparativo visual lado a lado (mismos 32 elementos
reales extraídos del SVG, mismo fill/opacidad por punto) para que el humano
viera la diferencia real antes de elegir.
**Motivo:** fidelidad al archivo fuente real por sobre una medición previa
incorrecta; decisión tomada con evidencia visual, no a ciegas.
**Artefactos modificados:** `specs/002-bg-texture/constitution.md` (MUST-3),
`specs/002-bg-texture/spec.md` (US-1)
**Decidido por:** Luna

---

## 2026-08-10 Adaptar el loop TDD a verificación visual (sin framework de test) — 002-bg-texture

**feature_id:** 002-bg-texture
**command_origin:** sdd-implement
**status:** accepted
**Gap o motivo:** mismo conflicto ya resuelto para `001-form-modal`
(ver entrada 2026-08-07 "Saltar el loop TDD formal"): `/sdd-implement` exige
loop Red-Green-Refactor por tarea, pero `existing-arch.md` registra que no
hay framework de test instalado (decisión consciente) y `constitution.md`
de esta feature (PROHIBITED-6) prohíbe instalarlo como efecto colateral.
`tasks.md` tampoco incluye tareas de test.
**Alternativas consideradas:** instalar Vitest para esta feature de 3 archivos
CSS.
**Por qué se descartaron:** instalaría una dependencia nueva solo para
cumplir el formato del comando, sobre una feature de CSS puro sin lógica de
negocio que testear — mismo criterio que la decisión precedente de
`001-form-modal`.
**Decisión tomada:** se adapta el loop a verificación visual en Storybook por
tarea (T002 fideliza contra el SVG real antes de fijar geometría — ver
decisión anterior —, T003/T004 confirman en Storybook que el fondo cambia y
que `.login-card__pattern-dot` no se ve afectado), sin asserts automatizados.
**Motivo:** coherente con la decisión ya vigente del proyecto y con el
precedente de `001-form-modal`.
**Artefactos modificados:** ninguno (decisión de proceso)
**Decidido por:** Luna

---

## 2026-08-10 Destino real de la documentación de tokens — no `knowledge/tokens/`

**feature_id:** 002-bg-texture
**command_origin:** sdd-implement
**status:** accepted
**Gap o motivo:** `constitution.md` (MUST-7), `plan.md` y `tasks.md` (T005)
indicaban documentar el token/clase nuevo en `knowledge/tokens/`. Al llegar a
T005 y leer `knowledge/tokens/README.md`/`token-plan.md`, resultó ser una
propuesta congelada de milestone M2 ("Documentation only — nothing applied
to CSS here"), escrita cuando `styles.css` tenía 41 líneas — ni siquiera los
tokens `--ds-text-*`/Form* ya aplicados (incluyendo los de `001-form-modal`)
están ahí. No es el changelog vivo que los artefactos de esta feature
asumían.
**Alternativas consideradas:** (1) agregar la fila igual en `token-plan.md`
para "no dejarlo sin documentar"; (2) redirigir a `knowledge/component-roadmap.md`,
que sí es el doc vivo que otras features (`001-form-modal`) usan para cerrar
gaps.
**Por qué se descartaron:** (1) mezclaría un token ya aplicado con una lista
de propuestas *sin aplicar todavía*, dando una lectura falsa del estado real
de `styles.css` a quien lea ese doc después.
**Decisión tomada:** T005 documenta el cierre del gap "Textura de fondo
compartida" en `knowledge/component-roadmap.md` § "Gaps nuevos encontrados"
(mismo patrón que otros gaps cerrados en ese archivo), no en `knowledge/tokens/`.
**Motivo:** consistencia con el destino de documentación que el repo usa
realmente para cerrar gaps por feature.
**Artefactos modificados:** `specs/002-bg-texture/{constitution.md,plan.md,tasks.md}`,
`specs/_registry/features.yaml`
**Decidido por:** Luna

---

## 2026-08-11 Adaptar el loop TDD a verificación visual (sin framework de test) — 003-home-dashboard

**feature_id:** 003-home-dashboard
**command_origin:** sdd-implement
**status:** accepted
**Gap o motivo:** mismo conflicto ya resuelto para `001-form-modal` (2026-08-07) y
`002-bg-texture` (2026-08-10): `/sdd-implement` exige loop Red-Green-Refactor por
tarea, pero `existing-arch.md` registra que no hay framework de test instalado
(decisión consciente) y `constitution.md` de esta feature (MUST-8) ya fija
verificación manual en Storybook. `tasks.md` tampoco incluye tareas de test.
**Alternativas consideradas:** instalar Vitest para 2 screens de composición pura
(sin lógica de negocio propia).
**Por qué se descartaron:** instalaría una dependencia nueva solo para cumplir el
formato del comando, sobre una feature que solo compone componentes ya
fidelity-checked — mismo criterio que las dos decisiones precedentes.
**Decisión tomada:** se adapta el loop a verificación visual en Storybook por
tarea (T002 Home, T003 Dashboard), sin asserts automatizados.
**Motivo:** coherente con la decisión ya vigente del proyecto y el precedente de
`001-form-modal`/`002-bg-texture`.
**Artefactos modificados:** ninguno (decisión de proceso)
**Decidido por:** Luna

---

## 2026-08-11 Corrección de componente: "Asistencias" en Home es DonutChartCard, no ProgressRing

**feature_id:** 003-home-dashboard
**command_origin:** sdd-implement (feedback post-entrega, antes de /sdd-checklist)
**status:** accepted
**Gap o motivo:** `input.md`/`constitution.md`/`spec.md`/`plan.md`/`tasks.md` fijaban
`ProgressRing` para el gauge "ASISTENCIAS" de Home (p.3), heredado del `/sdd-refine`
original. Luna revisó el resultado en Storybook contra el PDF real y señaló que el
componente correcto es `DonutChartCard` — en el PDF, "ASISTENCIAS" queda cortado
(como si la página necesitara scroll para mostrarlo completo), lo que hizo pasar
desapercibido durante el refine que no era el gauge de anillo simple de
`ProgressRing` sino el mismo `DonutChartCard` que ya se usa para el donut "Tareas"
45%/30% de p.12 Reportes. Luna adjuntó captura del Storybook de `DonutChartCard`
(`ChartCard.stories.tsx` § `DonutChart`) y captura del PDF como evidencia.
**Alternativas consideradas:** mantener `ProgressRing` (ya implementado y
verificado sin errores) vs. corregir a `DonutChartCard` antes de `/sdd-checklist`.
**Por qué se descartaron:** mantener `ProgressRing` prioriza lo ya implementado
por sobre la fuente real (el PDF), exactamente el error que el protocolo de
fidelidad de este proyecto existe para atrapar — la sesión de implementación no
tuvo acceso a la vista completa del PDF (componente cortado), así que no era un
gap detectable sin la evidencia visual que aportó Luna.
**Decisión tomada:** se reemplaza `ProgressRing` por `DonutChartCard` en
`Home.stories.tsx` — single-segment (75%, sin inventar un segundo dato que el PDF
no muestra para esta card puntual), con footer placeholder ("Registro de
asistencia") documentado como copy invented en `knowledge/screens/home.md`.
Actualizados `constitution.md`, `spec.md`, `plan.md`, `tasks.md` y la fila p.3 de
`knowledge/component-roadmap.md` para reflejar el componente correcto.
**Motivo:** fidelidad al PDF real por sobre una asunción de refine sin evidencia
suficiente — mismo criterio que la corrección de opacidad de `002-bg-texture`.
**Artefactos modificados:** `packages/ui/src/screens/home/Home.stories.tsx`,
`specs/003-home-dashboard/{constitution.md,spec.md,plan.md,tasks.md}`,
`knowledge/screens/home.md`, `knowledge/component-roadmap.md`, `input.md`
**Decidido por:** Luna

---

## 2026-08-11 Duplicación de config de SideBar — se mantiene por ahora

**feature_id:** 004-familia-tareas
**command_origin:** sdd-validate
**status:** accepted
**Gap o motivo:** `/sdd-validate` sobre `004-familia-tareas` encontró que
`input.md` delegaba explícitamente a `plan.md` la decisión de si extraer a un
helper compartido la config default de `SideBar`
(`primaryItems`/`secondaryItems`/`sidebarLogo`/`menuIcon`), ya duplicada idéntica
en 3 screens (`carga-de-formulario`, `home`, `dashboard`) y a punto de copiarse
una 4ta, 5ta y 6ta vez con esta feature. `plan.md` no abordaba la decisión.
**Alternativas consideradas:** (A) extraer ahora un helper compartido (ej.
`getDefaultSideBarConfig()` o constante exportada) y refactorizar las 3 screens
existentes + las 3 nuevas para usarlo. (B) mantener la duplicación en esta
feature y revisar la extracción en una iteración de refactor aparte más
adelante.
**Por qué se descartaron:** (A) tocaría las 3 screens ya cerradas de
`003-home-dashboard` (CLOSED) además de las 3 nuevas de esta feature, ampliando
el alcance de `004-familia-tareas` más allá de lo que pide `input.md`, y es un
refactor transversal que merece su propia revisión en vez de colarse dentro de
otra feature.
**Decisión tomada:** se mantiene la duplicación de config de `SideBar` en las 3
screens nuevas de esta feature (`tareas-pendientes`, `tareas-kanban`,
`tareas-finalizadas`). Documentado en `plan.md` § "Decisión — duplicación de
config de `SideBar`". No se extrae helper compartido en esta feature.
**Motivo:** decisión pragmática de priorización — no era el momento de
atenderlo. Se prefirió avanzar con `004-familia-tareas` sin sumarle este
refactor transversal, y dejarlo para cuando el equipo tenga ganas/prioridad de
ocuparse.
**Artefactos modificados:** `specs/004-familia-tareas/plan.md`
**Decidido por:** Luna

---

## 2026-08-11 Adaptar el loop TDD a verificación visual (sin framework de test) — 004-familia-tareas

**feature_id:** 004-familia-tareas
**command_origin:** sdd-implement
**status:** accepted
**Gap o motivo:** mismo conflicto ya resuelto para `001-form-modal` (2026-08-07),
`002-bg-texture` y `003-home-dashboard` (2026-08-10/11): `/sdd-implement` exige
loop Red-Green-Refactor por tarea, pero `existing-arch.md` registra que no hay
framework de test instalado (decisión consciente) y `constitution.md` de esta
feature (MUST-9) ya fija verificación manual en Storybook, incluida la
interactividad de abrir/cerrar `DetailSheet` en Tareas Pendientes. `tasks.md`
tampoco incluye tareas de test.
**Alternativas consideradas:** instalar Vitest + React Testing Library para
testear el `useState` de apertura/cierre del panel (única lógica real de esta
feature, el resto es composición pura ya fidelity-checked).
**Por qué se descartaron:** instalaría una dependencia nueva como efecto
colateral de una sola interacción chica, contradiciendo `constitution.md`
PROHIBITED-7 de esta misma feature y el criterio ya vigente en las 3 decisiones
precedentes.
**Decisión tomada:** se adapta el loop a verificación visual/funcional manual en
Storybook por tarea (T002 grid Pendientes, T003 apertura/cierre real del panel,
T004 Kanban, T005 Finalizadas + slot "VER MÁS"), sin asserts automatizados.
**Motivo:** coherente con la decisión ya vigente del proyecto y el precedente de
`001-form-modal`/`002-bg-texture`/`003-home-dashboard`.
**Artefactos modificados:** ninguno (decisión de proceso)
**Decidido por:** Luna

---

## 2026-08-11 Adaptar el loop TDD a verificación visual (sin framework de test) — 005-alert-toast-filter

**feature_id:** 005-alert-toast-filter
**command_origin:** sdd-implement
**status:** accepted
**Gap o motivo:** mismo conflicto ya resuelto para `001-form-modal` (2026-08-07),
`002-bg-texture`, `003-home-dashboard` y `004-familia-tareas` (2026-08-11):
`/sdd-implement` exige loop Red-Green-Refactor por tarea, pero `existing-arch.md`
registra que no hay framework de test instalado (decisión consciente) y
`constitution.md` de esta feature (MUST-8) ya fija verificación manual en Storybook.
`Toast` introduce un timer real (`setTimeout` 4000ms) — más lógica que las features
anteriores de puro CSS/composición, pero sigue sin justificar instalar un framework
nuevo para una sola pieza de estado local.
**Alternativas consideradas:** instalar Vitest + React Testing Library con
`vi.useFakeTimers()` para testear el auto-dismiss de `Toast` (la única lógica real
de esta feature).
**Por qué se descartaron:** instalaría una dependencia nueva como efecto colateral
de un solo timer, contradiciendo `constitution.md` PROHIBITED-6 de esta misma
feature y el criterio ya vigente en las 4 decisiones precedentes.
**Decisión tomada:** se adapta el loop a verificación visual/funcional manual en
Storybook por tarea (T003-T005 los 3 componentes, T006-T008 el retrofit), incluido
confirmar el timing real del auto-dismiss de `Toast` observando el render, sin
asserts automatizados.
**Motivo:** coherente con la decisión ya vigente del proyecto y el precedente de
las 4 features anteriores.
**Artefactos modificados:** ninguno (decisión de proceso)
**Decidido por:** Luna

---

## 2026-08-12 Corrección post-implementación: DetailSheet (ancho/overlap/tipografía) y headings faltantes en Tareas

**feature_id:** 005-alert-toast-filter
**command_origin:** sdd-implement (feedback post-entrega, Luna comparando Storybook contra el PDF real)
**status:** accepted
**Gap o motivo:** Luna mostró una captura de `DetailSheet` § `Fichas` con 2 bugs
visibles: el título se envolvía en 2 líneas, y la caja "ARCHIVOS MULTIMEDIA" se
superponía con el gráfico de la derecha. Investigando la causa raíz con
`design-reference.pdf` p.5 "FICHAS" (hoja de spec limpia, hasta ahora sin usar —
todo el trabajo previo de esta feature midió contra `Alejandria - Agosto 2026.pdf`
p.7, un mockup con el grid de tareas oculto detrás del panel, contaminando algunas
mediciones de `get_drawings()`) se encontraron 4 causas reales: (1) `max-width:
590px` del componente era invented desde su creación original — la hoja de spec
limpia dice explícitamente "Tamaño variable según pantalla", nunca hubo un valor
fijo correcto citable; (2) `.detail-sheet__media-metrics` con `grid-template-columns:
repeat(3, auto)` (fix de esta misma feature, para el problema de "espacio de sobra"
en la columna derecha) hacía que la fila de 3 `MetricCard` ficha (83px cada una,
261px total) se saliera de su columna izquierda (~222-249px disponibles),
superponiéndose con el gráfico; (3) `.ds-metric--ficha .ds-metric__value` tenía
`font-size: 26px` con un comentario `/* TODO token */` sin resolver desde antes de
esta feature — la spec limpia mide 50pt Montserrat Bold → ÷2 = 25px; (4) faltaba el
heading "Tareas Pendientes"/"Tareas Finalizadas" que el PDF real muestra en la
misma fila del toolbar — no estaba en ningún artefacto SDD de `004-familia-tareas`
ni de esta feature, encontrado recién ahora al mirar con más cuidado.
**Alternativas consideradas:** para (1), mantener `.detail-sheet--wide` como
modificador separado en vez de subir el default — descartado porque la única
instancia real medida del componente (p.7) necesita ese ancho, y no hay evidencia
de un caso real que necesite 590px; para (2), aumentar el ancho del panel en vez de
tocar el grid de métricas — descartado porque el ancho ya está en su valor máximo
medido (656px) y seguiría sin alcanzar para 261px de contenido.
**Por qué se descartaron:** ver arriba, en cada punto.
**Decisión tomada:** (1) `.detail-sheet{max-width}` sube de 590px a 656px (la única
medida real disponible); `.detail-sheet--wide` queda como alias del mismo valor,
por claridad semántica en los call sites. (2)
`.detail-sheet__media-metrics` vuelve a `repeat(3, minmax(0, 1fr))` (revierte el fix
de esta feature solo para esta grilla específica — `.detail-sheet__metrics`, en la
columna derecha con espacio de sobra, se queda en `auto`). (3)
`.ds-metric--ficha .ds-metric__value` pasa a `font-size: 25px`, cierra el TODO. (4)
se agrega `<h1>` heading a `screens/tareas-pendientes/` y
`screens/tareas-finalizadas/`, mismo tratamiento tipográfico que
`screen-home__section-title` (mono, muted, tracked, uppercase).
**Motivo:** fidelidad al PDF real por sobre valores invented o parcialmente
corregidos — mismo criterio que las correcciones anteriores de esta sesión
(ancho del panel 960→720→656px, color/tamaño de "VER MÁS").
**Artefactos modificados:** `packages/ui/src/patterns/detail-sheet/detail-sheet.css`,
`packages/ui/src/styles.css`,
`packages/ui/src/screens/tareas-pendientes/{TareasPendientes.stories.tsx,tareas-pendientes.css}`,
`packages/ui/src/screens/tareas-finalizadas/{TareasFinalizadas.stories.tsx,tareas-finalizadas.css}`
**Decidido por:** Luna

---

## 2026-08-12 Bug real en TaskCard variant="default": fondo invisible al combinarse con BackgroundTextureDots

**feature_id:** 005-alert-toast-filter
**command_origin:** sdd-implement (feedback post-entrega, Luna: "las taskcard no tienen fondo, se ven fusionadas con el fondo")
**status:** accepted
**Gap o motivo:** en `screens/tareas-pendientes/` y `screens/tareas-finalizadas/`
(las 2 screens que combinan `TaskCard` `variant="default"` con `BackgroundTextureDots`
por primera vez en el kit) las cards se veían sin fondo visible — solo texto y
triángulo de acento flotando sobre la textura de fondo. Causa raíz: el fondo real de
la variante `default` vive en `.ds-task--default::after` con `z-index: -1` (separado
de `.ds-task` para no recortar el triángulo `::before` con el chamfer). `.ds-task`
tiene `position: relative` pero nunca fijó su propio `z-index` — sin eso, no forma
un stacking context propio, así que ese `::after` se escapaba hasta el stacking
context raíz de toda la página y terminaba pintándose detrás de
`BackgroundTextureDots` (`position: absolute` en el nivel de la screen), no solo
detrás de su propia card. Bug latente desde el commit original de `TaskCard`
(`e2ceaa6`) — nunca se notó porque ni las stories aisladas de `TaskCard.stories.tsx`
ni `screens/home/` (usa solo `variant="resumen"`, que no tiene este `::after`)
combinaban `variant="default"` con la textura de fondo antes de esta feature.
**Alternativas consideradas:** mover el fondo de vuelta a `.ds-task` directamente
(como ya hacen `kanban`/`resumen`) en vez de aislar el stacking context.
**Por qué se descartaron:** el fondo de `default` necesita seguir en un elemento
separado del que lleva el chamfer (`::after`) para no recortar el triángulo de
acento (`::before`) — moverlo de vuelta reabriría el bug original que motivó esa
separación (ver comentario histórico en `styles.css` sobre `::after`/chamfer).
**Decisión tomada:** se agrega `isolation: isolate` a `.ds-task` (clase base, aplica
a las 3 variantes) — crea un stacking context propio sin efecto de layout, confina
cualquier `z-index` interno (presente o futuro) a la card. No pude verificar
visualmente con captura de pantalla (no disponible en este entorno) — verificado
que `isolation: isolate` computa correctamente vía `getComputedStyle` en ambas
screens; el comportamiento de aislamiento de stacking context está garantizado por
spec CSS, no es algo que dependa de heurística. Pendiente de confirmación visual de
Luna en su propio Storybook.
**Motivo:** fidelidad visual real — el bug hacía que las cards se leyeran literalmente
sin fondo, no solo una diferencia de matiz.
**Artefactos modificados:** `packages/ui/src/styles.css` (`.ds-task`)
**Decidido por:** Luna

---

## 2026-08-12 Corrección: borde faltante en el chamfer de TaskCard variant="default"

**feature_id:** 005-alert-toast-filter
**command_origin:** sdd-implement (feedback post-entrega, Luna: "falta el borde blanco donde está el chanfle")
**status:** accepted
**Gap o motivo:** tras el fix de `isolation: isolate` (ver entrada anterior), las
cards `variant="default"` ya mostraban su fondo correctamente, pero Luna notó que
el borde no se veía en el corte diagonal del chamfer — solo en los otros 3 lados.
Causa raíz: `border` (propiedad nativa CSS, siempre rectangular) se pinta sobre los
4 bordes de la caja original ANTES de que `clip-path` la recorte a la forma con
chamfer; el recorte solo borra píxeles, nunca dibuja un trazo nuevo sobre el borde
diagonal que el propio `clip-path` crea — ese tramo queda sin línea por diseño de
cómo funciona `clip-path` en CSS, no por un valor mal configurado.
**Alternativas consideradas:** (a) `box-shadow: inset` en vez de `border` — descartada
tras análisis: un box-shadow inset tampoco es consciente de la forma de
`clip-path`, se calcula sobre la caja rectangular original y tendría el mismo
problema. (b) Reproducir toda la card como una sola imagen SVG — descartada,
demasiado invasivo para un detalle de borde, perdería la flexibilidad de contenido
dinámico (título/meta/fechas variables).
**Por qué se descartaron:** ver arriba, en cada punto.
**Decisión tomada:** se agrega una capa de fondo adicional a
`.ds-task--default::after` — un SVG inline de 31×31px (mismo tamaño exacto que el
chamfer del `clip-path`, sin distorsión posible por usar el mismo valor absoluto)
con una línea diagonal hairline (`#c1c1c1`, 0.75px), posicionado en la esquina
superior derecha. `border` se mantiene sin cambios para los otros 3 lados.
**Motivo:** fidelidad visual — el PDF muestra el borde completo alrededor de toda
la card, incluido el chamfer.
**Artefactos modificados:** `packages/ui/src/styles.css` (`.ds-task--default::after`)
**Decidido por:** Luna

---

## 2026-08-11 Correcciones tempranas sin loggear en su momento: z-index del overlay y primer ajuste de ancho del panel (registradas retroactivamente)

**feature_id:** 004-familia-tareas
**command_origin:** sdd-implement (feedback post-entrega, Luna revisando Storybook)
**status:** accepted
**Gap o motivo:** durante la implementación de `004-familia-tareas`, Luna reportó 2
bugs visuales seguidos, corregidos en el momento pero sin entrada en
`DECISIONS.md` — encontrado recién ahora, al hacer el chequeo de trazabilidad
previo a un `/sdd-handoff`. (1) El triángulo de acento de `TaskCard`
(`.ds-task::before`, `z-index: 1`) se veía flotando por encima del panel
`DetailSheet` al abrirse — `.screen-tareas-pendientes__detail-overlay` tenía
`position: absolute` pero sin `z-index` propio. (2) El panel de `DetailSheet`
(recién agregado como `className="detail-sheet--wide"`) medía 960px — invented,
sin chequear el PDF — y a ese ancho las 3 cajas de métricas
(TAREAS/RECURSOS/RECURSOS) quedaban muy separadas entre sí (`grid-template-columns:
repeat(3, minmax(0, 1fr))` estiraba cada columna mucho más que el ancho fijo de
`MetricCard`).
**Alternativas consideradas:** ninguna evaluada — eran bugs visuales concretos con
una causa raíz clara en el momento, no decisiones de producto con opciones a
sopesar.
**Por qué se descartaron:** no aplica.
**Decisión tomada:** (1) se agregó `z-index: 10` al overlay. (2) se bajó el ancho a
720px y se cambió `.detail-sheet__metrics`/`.detail-sheet__media-metrics` a
`repeat(3, auto)` + `justify-content: start`. **Nota:** ambos valores (960px y
720px) resultaron ser aproximaciones sin verificar contra el PDF real — corregidos
después a 656px (medido) el 2026-08-11/12, ver las entradas de esa fecha sobre
`DetailSheet`. Esta entrada documenta el paso intermedio que faltaba en el registro.
**Motivo:** fidelidad visual — bugs concretos reportados por Luna comparando
Storybook contra el resultado esperado.
**Artefactos modificados:** `packages/ui/src/screens/tareas-pendientes/tareas-pendientes.css`,
`packages/ui/src/patterns/detail-sheet/detail-sheet.css`
**Decidido por:** Luna

---

## 2026-08-11 Primera medición real contra el PDF de screens (panel a 656px, "VER MÁS" como chip, reposicionamiento del overlay)

**feature_id:** 004-familia-tareas
**command_origin:** sdd-implement (Luna: "¿qué más hiciste sin chequear el PDF?" — encontró que el ancho de 720px y el estilo de "VER MÁS" eran inventados)
**status:** accepted
**Gap o motivo:** tras el ajuste rápido de 960px→720px (ver entrada retroactiva de
arriba), Luna cuestionó directamente si había verificado esos valores contra el
PDF real — no lo había hecho, asumí que "no estaba en el repo" significaba "no lo
puedo consultar" sin intentar buscarlo en Descargas. Al abrir
`Alejandria - Agosto 2026.pdf` (Downloads de Luna) con PyMuPDF y medir p.7
directamente (`get_drawings()`/`get_text()`), se encontraron 3 valores invented
reales: (1) el ancho del panel (720px no medía nada real); (2) el botón "VER MÁS"
era un link subrayado sin fondo, inventado — el real es un chip sólido; (3) el
overlay estaba anclado con `right: 0` (flotando contra el borde del contenedor),
cuando el panel real NO cubre toda la grilla — deja visible la 1ra columna de
`TaskCard`.
**Alternativas consideradas:** ninguna — una vez medido, los 3 valores reales no
dejan alternativa razonable (son mediciones, no decisiones de diseño).
**Por qué se descartaron:** no aplica.
**Decisión tomada:** (1) panel a `656px` (`Rect(509.65, 170.14, 1822.38, 1057.91)`
@2× ÷2, medido con `get_drawings()`); (2) `.ds-task__view-more` pasa a chip sólido
`#494949`, texto blanco, 55×12px (medido con `get_drawings()`+`get_text()` sobre el
botón visible en la columna 1 de p.7); (3) el overlay pasa de `right: 0` a
`left: 218px` (padding del `__main` + 1 columna + gap), reproduciendo que la 1ra
columna de la grilla queda visible. De paso se confirmó que los 3 colores de
`DECISIÓN A/B/C` (elegidos por razonamiento en `004`, no medición) coinciden
exactos con la spec real.
**Motivo:** fidelidad al PDF real por sobre aproximaciones razonadas — Luna señaló
correctamente que "razonable" no es lo mismo que "verificado".
**Artefactos modificados:** `packages/ui/src/patterns/detail-sheet/detail-sheet.css`,
`packages/ui/src/styles.css` (`.ds-task__view-more`),
`packages/ui/src/screens/tareas-pendientes/tareas-pendientes.css`
**Decidido por:** Luna

---

## 2026-08-12 TaskCard sin navegación por teclado ni hover cuando es interactiva

**feature_id:** fix-001-taskcard-keyboard-hover (encontrado en `/sdd-checklist` CHK001 de
`004-familia-tareas`/`005-alert-toast-filter`)
**command_origin:** sdd-fix
**status:** accepted
**Gap o motivo:** Luna reportó, chequeando CHK001 en su Storybook: "Las tarjetas no son
navegables con tab. Tampoco tienen animación on hover." Causa raíz confirmada leyendo
`TaskCard.tsx`: el componente renderiza un `<article>` plano que solo spreadea
`{...props}` — cuando la screen de Tareas Pendientes le pasa `onClick={() =>
setSelectedTask(task)}` (único caso real de interactividad del componente hoy), el click
de mouse funciona pero no hay `tabIndex`/`role`/`onKeyDown` para teclado, y `.ds-task` no
tenía ninguna regla `:hover`/`:focus-visible` en `styles.css`.
**Alternativas consideradas:** ninguna real — es una corrección de accesibilidad
concreta, no una decisión de producto con opciones a sopesar.
**Por qué se descartaron:** no aplica.
**Decisión tomada:** `TaskCard` ahora agrega `tabIndex={0}`, `role="button"` y un
`onKeyDown` (Enter/Espacio → dispara un click real vía `element.click()`, no castea el
evento) **solo cuando recibe `onClick`** — así las variantes/screens sin interactividad
(`kanban`/`resumen`, Tareas Kanban/Finalizadas) no se ven afectadas. Se agregó la clase
`ds-task--interactive` (condicional al mismo criterio) con `cursor:pointer` +
`:hover`/`:focus-visible` (box-shadow, no border-color, porque `.ds-task--default` no
tiene border propio — vive en su `::after`), mismo patrón que `.ds-module-card`.
Verificado en Storybook vía `getBoundingClientRect`/dispatch de `KeyboardEvent`
real (Enter y Espacio, ambos abren `DetailSheet`) y confirmando que Kanban/Finalizadas
quedan con `tabIndex:-1`/sin clase — no puedo confirmar el hover visualmente en este
entorno (capturas no disponibles), pendiente de que Luna lo mire en su Storybook.
**Motivo:** accesibilidad real — un elemento clickeable sin equivalente de teclado ni
feedback de hover es una barrera de uso, no solo un detalle visual.
**Artefactos modificados:** `packages/ui/src/components/TaskCard.tsx`,
`packages/ui/src/styles.css` (`.ds-task--interactive`)
**Decidido por:** Luna

---

## 2026-08-12 Topbar: AlertBar no ocupaba el ancho completo, íconos van superpuestos

**feature_id:** fix-002-topbar-alertbar-fullwidth (encontrado en `/sdd-checklist` CHK015
de `005-alert-toast-filter`)
**command_origin:** sdd-fix
**status:** accepted
**Gap o motivo:** Luna reportó, con captura de Storybook: "la alertbar no ocupa el total
del ancho del viewport. En el diseño del PDF se muestra expandiéndose y quedando detrás
de los 3 botones." Confirmado midiendo `Alejandria - Agosto 2026.pdf` p.5 con
`get_drawings()`: la barra real mide 1862.19pt @2× (~931px, borde a borde de la página,
~5px de margen a cada lado) y el ícono "colapsar" (`x:117-163`) cae completamente DENTRO
del rango de la barra (`x:53-1915`) — los íconos van dibujados encima de la barra, no al
costado. Implementación (`005-alert-toast-filter` T006-T008): fila `flex` normal, 3
botones ocupan su propio espacio y `AlertBar{flex:1}` arranca después — composición
distinta a la real, repetida igual en las 3 screens de Tareas.
**Alternativas consideradas:** envolver los 3 íconos en un `<div>` nuevo + CSS Grid con
ambos elementos superpuestos en la misma celda — descartada por agregar una capa de JSX
nueva en las 3 screens sin necesidad; la superposición solo requiere sacar la barra
(un solo elemento) del flujo, no a los íconos.
**Por qué se descartaron:** la alternativa de grid+wrapper hubiera tocado 6 archivos
(3 `.stories.tsx` + 3 `.css`) para un problema que se resuelve con CSS puro en 3 archivos.
**Decisión tomada:** `.ds-alert-bar` dentro del topbar pasa a `position: absolute` con
`top/left/right/bottom` explícitos (12px/16px, medidos del propio topbar antes del fix —
no `inset` shorthand, porque `.ds-alert-bar` ya trae `width: 100%` de su propio componente
y sobre-restringe junto con `left`+`right`; se agrega `width: auto`/`height: auto`
explícitos para resolverlo), y los 3 botones de ícono pasan a `position: relative;
z-index: 1` para pintarse encima. `min-height: 34px` en el topbar (alto de contenido real
de la barra, antes de que su padding se sume aparte — `box-sizing` es `content-box`)
preserva la altura total exacta que tenía antes del fix (58px), sin regresión. Mismo
fix en las 3 screens (`tareas-pendientes.css`, `tareas-kanban.css`,
`tareas-finalizadas.css`). Verificado en vivo con `getBoundingClientRect` en las 3:
barra full-width (ancho topbar − 32px), los 3 íconos caen dentro del rango de la barra
y siguen siendo el elemento clickeado en su posición (`elementFromPoint`), altura del
topbar sin cambios.
**Motivo:** fidelidad al PDF real — mismo criterio que el resto de correcciones de esta
sesión.
**Artefactos modificados:** `packages/ui/src/screens/tareas-pendientes/tareas-pendientes.css`,
`packages/ui/src/screens/tareas-kanban/tareas-kanban.css`,
`packages/ui/src/screens/tareas-finalizadas/tareas-finalizadas.css`
**Decidido por:** Luna

---

## 2026-08-12 T007 ampliada para cubrir MUST-9 completo (006-sidebar-ancho-toggle)

**feature_id:** 006-sidebar-ancho-toggle
**command_origin:** sdd-validate
**status:** accepted
**Gap o motivo:** `/sdd-validate` sobre `006-sidebar-ancho-toggle` encontró
cobertura parcial (97%): `T007` en `tasks.md` solo verificaba Home/Dashboard/
CargaDeFormulario, sin tarea explícita para las 3 stories propias de `SideBar`
(Expanded/Collapsed/Playground) ni para confirmar con click real que el toggle
funciona en las 3 screens de Tareas — pese a que `constitution.md` MUST-9 ya lo
exigía.
**Alternativas consideradas:** dejar `T007` como estaba, asumiendo que la
verificación de `SideBar` y del toggle en Tareas queda implícita dentro de
`T003`-`T006` ("cablear"/"ajustar") sin un paso explícito de confirmación.
**Por qué se descartaron:** dejarlo implícito no es trazable 1:1 contra MUST-9 ni
verificable objetivamente — el gate de `/sdd-implement` exige cobertura
explícita, no inferida.
**Decisión tomada:** se amplió `T007` para cubrir (a) las 3 stories de `SideBar`,
(b) click-verificación del toggle en las 3 screens de Tareas, y (c) no-regresión
en Home/Dashboard/CargaDeFormulario — sin agregar una tarea nueva ni tocar el
resto del plan. Cobertura pasa de 97% a 100%.
**Motivo:** ampliar `T007` cierra el gap sin agregar una tarea nueva ni tocar el
resto del plan, y deja el mapeo 1:1 contra MUST-9 explícito y verificable.
**Artefactos modificados:** `specs/006-sidebar-ancho-toggle/tasks.md` (T007)
**Decidido por:** Luna

---

## 2026-08-12 006-sidebar-ancho-toggle: enmienda a 004-familia-tareas MUST-3 / PROHIBITED-1

**feature_id:** 006-sidebar-ancho-toggle
**command_origin:** sdd-implement (T009)
**status:** accepted
**Gap o motivo:** `006-sidebar-ancho-toggle` (ancho de `SideBar` medido con PyMuPDF,
edge-toggle eliminado, colapso real cableado en las 3 screens de Tareas) requiere
modificar `SideBar.tsx` y agregar interactividad real a Kanban/Finalizadas — ambas
cosas explícitamente prohibidas/excluidas por `specs/004-familia-tareas/constitution.md`
(PROHIBITED-1 y MUST-3 respectivamente), feature ya `CLOSED`.
**Alternativas consideradas:** (1) reabrir `004-familia-tareas` completa y editar su
constitution directamente; (2) tratar esto como un `fix-XXX` acotado en vez de una
feature nueva con `/sdd-refine`.
**Por qué se descartaron:** (1) reabrir `004` completa mezclaría el scope ya
`APROBADO`/cerrado de esa feature con trabajo nuevo, y perdería la trazabilidad de qué
se aprobó cuándo; (2) un `fix-XXX` no encaja — este cambio toca un componente
compartido consumido por 5 features `CLOSED` (`Home`, `Dashboard`, `Carga de
Formulario`, `004`, `005`) y contradice cláusulas `MUST`/`PROHIBITED` explícitas, no es
un gap chico encontrado en checklist (ver decisión de Luna en
`knowledge/component-roadmap.md` § "Gaps nuevos encontrados").
**Decisión tomada:** `006-sidebar-ancho-toggle` se creó como feature propia vía
`/sdd-refine`→`/sdd-generate`. En vez de reescribir `004-familia-tareas/constitution.md`
sin dejar rastro, se le agregaron dos anotaciones puntuales (no se borra ni reescribe
el texto original): una nota de "Enmienda puntual" bajo MUST-3 (Kanban/Finalizadas
ganan `useState` real solo para el colapso del `SideBar`; el resto de la regla — sin
`DetailSheet`, sin otra interactividad — sigue vigente) y una nota corta en
PROHIBITED-1 señalando que `SideBar.tsx` fue "superado" por `006`, con puntero a esta
entrada. El resto de `004-familia-tareas` no se reabre.
**Motivo:** mantener `004-familia-tareas` legible como registro histórico de lo que se
aprobó en su momento, mientras se documenta explícitamente el único punto en que una
feature posterior la modifica — sin ambigüedad sobre qué sigue vigente y qué no.
**Artefactos modificados:** `specs/004-familia-tareas/constitution.md` (MUST-3,
PROHIBITED-1)
**Decidido por:** Luna

---

## 2026-08-12 006-sidebar-ancho-toggle: 3 regresiones reales encontradas en revisión visual (Luna)

**feature_id:** 006-sidebar-ancho-toggle
**command_origin:** manual (revisión visual de Luna en Storybook, con capturas, antes de commitear)
**status:** accepted
**Gap o motivo:** Luna revisó Storybook antes del commit (siguiendo el criterio de
"mirarlo ella misma antes de pushear") y encontró 3 problemas reales que la
verificación automatizada (click real + `getComputedStyle` de ancho/clase/ARIA) no
había cubierto, porque no eran sobre el toggle en sí sino sobre el layout resultante:
(1) labels wrappeando a 2 líneas en expandido; (2) la sidebar no ocupaba el alto
completo en las 6 screens consumidoras; (3) la animación de `BackgroundTextureDots` se
veía por encima de la sidebar en vez de detrás.
**Alternativas consideradas:** para (2)/(3), reintroducir `div.ds-sidebar-shell` (el
wrapper eliminado en este mismo `006`) en vez de arreglar `.ds-sidebar` directamente.
**Por qué se descartaron:** reintroducir el shell deshace parte del trabajo de este
feature sin necesidad — la causa raíz no era "hace falta un wrapper", era que
`.ds-sidebar` heredaba dos comportamientos del shell (`position: relative` para el
orden de pintado, y ser un flex item con `height: auto` para el stretch) que se podían
dar directamente al `<nav>` sin volver a anidar un `div` extra.
**Decisión tomada:** (a) `padding: 4px 16px` → `4px 6px` en `.ds-sidebar__item` y
`button.ds-sidebar__menu-heading` — medido en vivo (`scrollWidth`/`clientWidth` de
cada label) contra las 10 labels reales de las stories, no a ojo. (b) `.ds-sidebar`
pasa de `height: 100%` a `height: auto; min-height: 100%` — verificado en las 6
screens que el alto ahora iguala al contenedor (antes ~408px de 615px reales en
Finalizadas, por ejemplo). (c) `.ds-sidebar` gana `position: relative` — verificado
que soluciona el orden de pintado frente a `BackgroundTextureDots` (`position:
absolute`). Los 3 fixes viven en `packages/ui/src/styles.css`, con comentarios inline
explicando la causa raíz para que no se reviertan por error en un futuro cleanup.
**Motivo:** arreglar la causa raíz exacta que introdujo sacar el shell, sin deshacer
el objetivo de esa parte del feature (un único `<nav>` sin wrapper).
**Artefactos modificados:** `packages/ui/src/styles.css`,
`knowledge/components/SideBar.md` (Changelog `0.2.0`)
**Decidido por:** Luna

---

## 2026-08-12 006-sidebar-ancho-toggle: badge de notificación cortado en colapsado

**feature_id:** 006-sidebar-ancho-toggle
**command_origin:** manual (segunda ronda de revisión visual de Luna en Storybook, con captura)
**status:** accepted
**Gap o motivo:** el badge de notificación ("2") aparecía cortado a la mitad en el
estado colapsado del `SideBar`. Medido en vivo: a los 36px de ancho medido, el ícono
(25px) centrado deja solo ~4.5px de margen a su derecha; el badge, posicionado como
acento de esquina (`right: 0` + `transform: translate(50%, -50%)` sobre el ícono),
sobresalía 2.5px del borde de `.ds-sidebar`, y `overflow: hidden` lo cortaba.
Expandido no tenía el problema (el ícono no queda pegado al borde ahí).
**Alternativas consideradas:** agrandar el ancho colapsado medido (36px) unos px para
darle aire al badge.
**Por qué se descartaron:** el ancho colapsado es un valor medido (no invented) contra
dos PDFs — agrandarlo para acomodar un detalle decorativo del badge violaría el
objetivo central de esta feature (dejar de inventar anchos).
**Decisión tomada:** `.ds-sidebar--collapsed .ds-sidebar__badge { right: 3px }` —
corre el badge 3px hacia adentro solo en colapsado (medido hasta que quedó completo:
termina a 35.5px de 36px). Expandido no se toca.
**Motivo:** ajuste quirúrgico al elemento que realmente se corta, sin tocar la
medición ya validada del ancho.
**Artefactos modificados:** `packages/ui/src/styles.css`,
`knowledge/components/SideBar.md` (Changelog `0.2.0`)
**Decidido por:** Luna

---

## 2026-08-12 006-sidebar-ancho-toggle: CHK009 no bloquea el cierre — causa raíz fuera de alcance

**feature_id:** 006-sidebar-ancho-toggle
**command_origin:** sdd-checklist (CHK009)
**status:** accepted
**Gap o motivo:** al verificar CHK009 ("confirmo que ya no hay overlap en viewport
angosto") con una captura real (480px de ancho), Luna encontró que sigue habiendo
solapamiento y que el fondo del screen se corta dejando contenido sobre blanco
durante el scroll horizontal. Diagnosticado en vivo: el `SideBar` mide 103px
correctamente, sin overlap propio — el desborde lo causa
`.screen-tareas-pendientes__grid` (4 columnas fijas de 170px, no responsivas,
preexistentes a `006`) y el fondo cortado es un bug genérico de `display:flex` sin
`width` propio en el root del screen, no relacionado al ancho del `SideBar`.
**Alternativas consideradas:** (1) ampliar `006` ahora para tocar
`tareas-pendientes.css`/`tareas-kanban.css`/`tareas-finalizadas.css` (grilla
responsiva + fondo del root); (2) arreglar solo el fondo cortado ahora (fix chico y
genérico) y dejar la grilla aparte; (3) cerrar `006` tal cual, registrar ambos como
gaps nuevos para `fix-XXX` aparte.
**Por qué se descartaron:** (1)/(2) — ninguno de los dos está en el `plan.md` de
`006` (que solo toca los `.stories.tsx` de las 3 screens, no sus `.css`); la grilla
responsiva en particular es una decisión de diseño más grande (cómo se ve la grilla
de tareas en angosto, no solo "que no desborde") que no corresponde decidir sobre la
marcha dentro de una feature de `SideBar`.
**Decisión tomada:** se cierra `006-sidebar-ancho-toggle` con CHK009 marcado ❌,
causa raíz documentada en `checklist.md`, y ambos hallazgos registrados en
`knowledge/component-roadmap.md` § "Gaps nuevos encontrados" para tratarse como
`fix-XXX` aparte (mismo patrón que `fix-001`/`fix-002` en `004`/`005`), sin bloquear
el cierre de esta feature.
**Motivo:** la causa raíz de ambos hallazgos no tiene relación con el ancho del
`SideBar` (que es lo que `006` se propuso medir y corregir) — forzarlos dentro de esta
feature mezclaría un scope de "grilla responsiva" no definido con uno ya cerrado y
verificado.
**Artefactos modificados:** `specs/006-sidebar-ancho-toggle/checklist.md`,
`knowledge/component-roadmap.md`
**Decidido por:** Luna

---

## 2026-08-13 fix-003-bg-texture-visibility: Fondo con textura animada casi imperceptible

**feature_id:** fix-003-bg-texture-visibility
**command_origin:** sdd-fix
**status:** accepted
**Gap o motivo:** Luna, viendo Tareas Pendientes en Storybook, reportó que la
textura animada de fondo (`BackgroundTextureDots`, 002-bg-texture, ya CLOSED) es
dificil de ver sobre `--ds-color-pdf-surface` plano, y que en el PDF de referencia
el fondo tiene un gradiente negro-a-gris. Se probó primero el gradiente solo (sin
tocar la animacion) para aislar la variable — confirmado como mejora, pero
insuficiente: los puntos siguen "muy chicos y muy lentos" para percibir
movimiento.
**Alternativas consideradas:** (1) tocar solo el color/opacidad del grupo
(`.ds-bg-texture-dots__group`, hoy `.05`); (2) reescribir la geometria de los 32
puntos con radios mas grandes; (3) escalar cada punto 1.8x alrededor de su propio
centro via `transform: scale()` + `transform-box: fill-box` y recalcular
duracion/delay con la formula ya documentada (BASE_DUR 6.0 -> 2.2).
**Por que se descartaron:** (1) no resuelve el problema de tamano reportado, solo
intensidad; (2) reescribir cada `d`/`cx`/`cy`/`rx`/`ry` a mano pierde la trazabilidad
contra `Textura fondo.svg` (32 puntos medidos) sin necesidad, cuando un transform
CSS logra el mismo resultado visual sin tocar la fuente de verdad geometrica.
**Decision tomada:** (3) — grafico igual a las 2 alternativas pero puramente
aditivo/reversible: transform de escala en CSS (no en el SVG fuente) + BASE_DUR
nuevo aplicado con la formula ya documentada en `backgroundTexture.tsx` para los
32 elementos. Ademas, gradiente lineal vertical (negro arriba -> gris abajo, con
los 2 tokens `--ds-color-pdf-surface`/`--ds-color-pdf-surface-warm` ya existentes)
solo en `screen-tareas-pendientes` por ahora — expansion a las demas screens
queda pendiente de aprobacion visual de Luna en Storybook.
**Motivo:** mantener el helper compartido regenerable segun su propia
documentacion (formula BASE_DUR), sin introducir un color/token nuevo para el
gradiente, y sin expandir el cambio a mas screens hasta confirmar en vivo.
**Artefactos modificados:** `packages/ui/src/utils/backgroundTexture.tsx`,
`packages/ui/src/utils/backgroundTexture.css`,
`packages/ui/src/screens/tareas-pendientes/tareas-pendientes.css`,
`specs/_registry/features.yaml`
**Decidido por:** Luna

---

## 2026-08-13 fix-004-bg-gradient-rollout: Rollout del gradiente a 5 screens, excede el limite de archivos de /sdd-fix

**feature_id:** fix-004-bg-gradient-rollout
**command_origin:** sdd-fix
**status:** accepted
**Gap o motivo:** Luna aprobo el gradiente negro-a-gris probado en
fix-003 sobre `screen-tareas-pendientes` y pidio aplicarlo "a las otras screens
tambien". Eso implica tocar `home.css`, `dashboard.css`, `tareas-kanban.css`,
`tareas-finalizadas.css` y `carga-de-formulario.css` — 5 archivos, por encima del
limite de "<=3 archivos de produccion" que define la elegibilidad de /sdd-fix.
**Alternativas consideradas:** (1) parar y escalar a /sdd-refine por exceder el
limite; (2) partir el rollout en 2 fixes separados de <=3 archivos cada uno para
cumplir la letra de la regla; (3) proceder como un solo fix, documentando el
override explicito.
**Por que se descartaron:** (1) — es un ciclo completo (refine -> generate ->
validate -> implement -> review) para replicar una sola declaracion CSS ya
decidida y aprobada, sin ninguna decision de diseno nueva; puro overhead. (2) —
dividir artificialmente el mismo cambio mecanico en 2 registros no agrega
trazabilidad real, solo ruido en el registro.
**Decision tomada:** (3) — un solo fix, con el override anotado explicitamente en
`decisions` y en esta entrada. Ademas, `patterns/login/login.css` quedo
excluido del rollout: su `.login-screen` no tiene background propio (a
diferencia de las otras 6 screens, que sí lo tienen en su root) — el token
`--ds-color-pdf-surface` ahi vive en `.login-card` (superficie de componente,
206.5px de alto), no en el canvas de pantalla completa. Aplicar el mismo
gradiente lineal vertical ahi cambiaria la escala/lectura visual del efecto sin
que Luna lo haya visto — queda pendiente de decision aparte.
**Motivo:** el pedido explicito de Luna ("aplica el gradiente a las otras
screens tambien") es la confirmacion humana que exige el gate cuando se excede
un limite de proceso — no hace falta un ciclo completo para un cambio sin
riesgo arquitectonico ni ambiguedad de diseno.
**Artefactos modificados:** `packages/ui/src/screens/home/home.css`,
`packages/ui/src/screens/dashboard/dashboard.css`,
`packages/ui/src/screens/tareas-kanban/tareas-kanban.css`,
`packages/ui/src/screens/tareas-finalizadas/tareas-finalizadas.css`,
`packages/ui/src/screens/carga-de-formulario/carga-de-formulario.css`,
`specs/_registry/features.yaml`
**Decidido por:** Luna

---

## 2026-08-13 fix-005-modulecard-stacking: Textura animada pintaba por encima de ModuleCard en Dashboard

**feature_id:** fix-005-modulecard-stacking
**command_origin:** sdd-fix
**status:** accepted
**Gap o motivo:** Luna, verificando el rollout del gradiente (fix-004) sobre
Dashboard, reporto que la textura animada de fondo se ve por encima de las
ModuleCard en vez de detras.
**Causa raiz:** `.ds-module-card` no fijaba `position` (quedaba en `static` por
defecto). `BackgroundTextureDots` es `position: absolute` con z-index `auto` —
segun el algoritmo de stacking de CSS, un elemento posicionado con z-index auto
se pinta SIEMPRE por encima de contenido static, sin importar el orden real en
el arbol del DOM (la textura es el primer hijo del screen, las cards vienen
despues, pero eso no importa si las cards son static). Es el mismo bug de fondo
ya encontrado y documentado para `.ds-task` (ver su comentario en styles.css,
fix originado durante 004-familia-tareas/005-alert-toast-filter) — nunca se
habia notado en ModuleCard porque, hasta el rollout del gradiente de esta
sesion, ningun screen combinaba ModuleCard con BackgroundTextureDots a la vez.
**Alternativas consideradas:** (1) z-index negativo directo en
`BackgroundTextureDots` (fix sistemico, unico lugar, pero requeriria ademas
`isolation`/`z-index:0` en cada screen root para contener el efecto, tocando 7-8
archivos); (2) `position: relative` solo en `.ds-module-card` (fix local,
mismo patron que `.ds-task`, 1 archivo).
**Por que se descartaron:** (1) — mas archivos tocados para un problema que hoy
solo se reprodujo en un componente; ademas se aparta del patron ya establecido
en el codebase (fix reactivo por componente cuando aparece, no un mecanismo
global nuevo sin decision de diseno explicita).
**Decision tomada:** (2) — `position: relative` en `.ds-module-card`, sin
`isolation: isolate` (a diferencia de `.ds-task`, esta card no tiene ningun
hijo/pseudo-elemento con z-index propio que necesite contenerse).
**Motivo:** consistencia con el fix ya documentado de `.ds-task` — mismo
diagnostico, misma solucion minima, mismo componente-por-componente en vez de
un mecanismo nuevo no decidido.
**Artefactos modificados:** `packages/ui/src/styles.css`,
`specs/_registry/features.yaml`
**Decidido por:** Luna

---

## 2026-08-13 fix-006-sidebar-viewport-height: SideBar se estira con el contenido en vez de quedar capada al viewport

**feature_id:** fix-006-sidebar-viewport-height
**command_origin:** sdd-fix
**status:** accepted
**Gap o motivo:** Luna reporto que la SideBar se extiende al tamano del
contenido (grillas largas de TaskCard en Tareas Pendientes), obligando a
scrollear la pagina entera para ver los items del final (Notificaciones/Mi
cuenta/Configuracion). Pidio que la SideBar se muestre siempre entera en el
viewport y que el scroll aplique al contenido de la pantalla, no a la sidebar.
**Causa raiz:** `.ds-sidebar` usaba `height: auto` + `min-height: 100%`,
mecanismo que depende de `align-items: stretch` (default del row flex en
screens/*) para llenar la altura real del row — ese mismo mecanismo hace que
la sidebar se estire junto con su hermano de contenido cuando ese contenido es
mas alto que el viewport, en vez de quedar fija a 100vh. Este mecanismo venia
de 006-sidebar-ancho-toggle (Changelog 0.2.0, knowledge/components/SideBar.md)
y resolvia un problema distinto (la sidebar se achicaba a ~408px sin el, tras
sacar `.ds-sidebar-shell`) — no es que 006 estuviera mal, es que el mismo
mecanismo tiene este efecto colateral que nadie habia notado hasta una grilla
lo bastante alta.
**Alternativas consideradas:** (1) cambiar la arquitectura de layout completa
(cada screens/*.css a `height: 100vh; overflow: hidden` en el root +
`overflow-y: auto` en su wrapper de contenido) — patron "app shell" clasico;
(2) `align-self: flex-start` + `height: 100vh` + `position: sticky` solo en
`.ds-sidebar`, sin tocar ningun screen.
**Por que se descartaron:** (1) — toca 7-8 archivos (styles.css de cada
screen) para un cambio estructural de layout en cada consumidor, cuando el
bug real es un solo componente estirandose mas de lo que deberia; ademas esta
exacta zona de .ds-sidebar ya acumula 3 regresiones documentadas en
006-sidebar-ancho-toggle — un cambio de superficie minima es mas seguro que
reabrir el layout de 7 screens a la vez.
**Decision tomada:** (2) — 1 solo archivo (styles.css), 3 propiedades
cambiadas en `.ds-sidebar` (align-self, height, position), sin tocar
padding/overflow/width (no relacionados a este bug, y overflow: hidden en
particular resuelve el fix de badge cortado de 006 — tocarlo reabriria ese
bug). `position: sticky` conserva el rol de "positioned" que `position:
relative` ya cumplia para el fix de stacking con BackgroundTextureDots de la
misma feature (2026-08-12) — no se pierde esa correccion.
**Motivo:** minimizar superficie de cambio en una zona con historial de
regresiones, resolviendo el bug reportado sin reabrir el layout de cada
screen ni las 2 correcciones previas ya documentadas en este mismo selector.
**Artefactos modificados:** `packages/ui/src/styles.css`,
`specs/_registry/features.yaml`
**Decidido por:** Luna

---

## 2026-08-13 fix-007-detail-overlay-dimming: DetailSheet abre sin oscurecer la grilla, corrige hallazgo de medicion previo

**feature_id:** fix-007-detail-overlay-dimming
**command_origin:** sdd-fix
**status:** accepted
**Gap o motivo:** Luna, comparando contra "Alejandria - Agosto 2026.pdf" p.7
("detalle abierto"), pidio que al seleccionar una TaskCard el resto de la
grilla se oscurezca como el backdrop de Modal, salvo la card seleccionada
(que queda visible sin oscurecerse). El comentario existente en
tareas-pendientes.css (2026-08-11, medicion original con get_drawings() sobre
la misma p.7) documentaba lo contrario: "el PDF no muestra dimming, solo el
borde propio de .detail-sheet".
**Verificacion antes de implementar:** dado que esto contradice un hallazgo
ya documentado, se le pregunto explicitamente a Luna si es una relectura del
mismo PDF o una decision de diseno nueva sin base en la pagina real.
Confirmo que volvio a mirar el PDF y que si hay dimming — es correccion de
medicion, no una decision nueva.
**Alternativas consideradas para el mecanismo de "spotlight":** (1) clonar la
TaskCard seleccionada como un elemento nuevo por encima del backdrop; (2)
dejar la card original en su lugar y subirle el z-index por encima del
backdrop via una clase modificadora.
**Por que se descartaron:** (1) — duplicar el nodo agrega complejidad de
sincronizacion (2 copias del mismo contenido, riesgo de que se desincronicen)
para lograr exactamente el mismo resultado visual que (2) sin ese costo.
**Decision tomada:** (2) — `.screen-tareas-pendientes__grid-backdrop`
(background: var(--ds-color-black-a70), mismo token que .ds-modal-backdrop,
sin token nuevo) posicionado dentro de la grilla ya position:relative;
`pointer-events: none` para que las cards detras sigan siendo clickeables
(cambiar de seleccion con el panel abierto no es un flujo modal estricto);
clase `.ds-task--spotlight` (z-index: 6) en la card seleccionada, entre el
backdrop (5) y el panel (10) — mismo mecanismo de stacking ya usado para
.ds-task::before vs. el panel.
**Motivo:** minimo cambio necesario, reusa tokens y el mecanismo de stacking
ya establecido en este mismo archivo, sin arquitectura nueva.
**Artefactos modificados:**
`packages/ui/src/screens/tareas-pendientes/tareas-pendientes.css`,
`packages/ui/src/screens/tareas-pendientes/TareasPendientes.stories.tsx`,
`specs/_registry/features.yaml`
**Decidido por:** Luna

---

## 2026-08-13 fix-008-carga-formulario-grid-stretch: align-content:normal inflaba filas segun cuanto contenido tuviera la columna de adjuntos

**feature_id:** fix-008-carga-formulario-grid-stretch
**command_origin:** sdd-fix
**status:** accepted
**Gap o motivo:** Luna reporto 2 sintomas en CargaDeFormulario que a primera
vista parecian distintos: (1) con los archivos mock adjuntos, la columna
"ADJUNTAR ARCHIVOS" crece mucho y eso afecta como se ven los campos de las
otras 2 columnas; (2) sin adjuntos, la pantalla se ve bien salvo que queda un
gap mas grande entre el titulo y el contenido.
**Diagnostico (antes de tocar CSS):** se midio en vivo con
getBoundingClientRect en el Browser pane, con y sin archivos adjuntos, antes
de escribir ningun CSS. Una sola causa raiz para ambos sintomas:
`.screen-carga-formulario__main` y `.screen-carga-formulario__column` son
`display: grid` con filas implicitas `auto` y `align-content: normal` (que
Grid trata como `stretch` cuando sobra alto). `.screen-carga-formulario` usa
`min-height: 100vh` — cuando el contenido real es mas corto que el viewport
(sin archivos), sobra alto dentro de `.main`, y ese sobrante se reparte
inflando sus 2 filas implicitas (titulo + grilla de 3 columnas) en vez de
quedar compacto: medido, el titulo paso de 59.9px de alto (con archivos) a
119.4px (sin archivos) con el mismo texto, empujando la grilla hacia abajo.
Simetricamente, cuando la columna de archivos SI es alta,
`.screen-carga-formulario__grid` (align-items: stretch, default, correcto —
asi las 3 columnas quedan parejas) estira las columnas 1/2 a esa misma
altura, y sin `align-content: start` en `.screen-carga-formulario__column` ese
sobrante se repartia entre los propios campos de cada columna en vez de
quedar invisible al final de la columna.
**Alternativas consideradas:** (1) fijar una altura explicita al titulo o a
la grilla; (2) `align-content: start` en los 2 grids implicados.
**Por que se descarto (1):** una altura fija no escala si el contenido del
titulo o de las columnas cambia (i18n, mas campos a futuro) — es tratar el
sintoma, no la causa (el stretch por default de Grid).
**Decision tomada:** (2) — `align-content: start` en
`.screen-carga-formulario__main` y `.screen-carga-formulario__column`.
Verificado en vivo primero con un `<style>` de debug temporal (no committeado)
y despues con el fix real: `titleHeight`/`gridTop` quedan identicos con y sin
archivos adjuntos, y los gaps entre campos de cada columna respetan el `gap`
declarado sin importar la altura de la columna vecina.
**Motivo:** corrige la causa raiz (el comportamiento de stretch por default de
CSS Grid en filas auto) en vez de compensar sintomas puntuales, con el menor
cambio de superficie posible (2 propiedades, mismo archivo).
**Artefactos modificados:**
`packages/ui/src/screens/carga-de-formulario/carga-de-formulario.css`,
`specs/_registry/features.yaml`
**Decidido por:** Luna

---

## 2026-08-13 fix-009-scale-calibration-correction: El artboard del PDF es 1920x1080 real, no @2x de 960x540 — TODO el "/* calibrated ÷2 */" del kit esta a la mitad

**feature_id:** fix-009-scale-calibration-correction
**command_origin:** conversacion directa con Luna (pedido: pasada de fidelidad de tamanos + legibilidad de fuente en CargaDeFormulario)
**status:** accepted — CORRECCION MAYOR DE DOCTRINA, afecta todo el kit
**Gap o motivo:** Luna reporto que Carga de Formulario tiene letra muy chica y
cuesta leerla. Medido en vivo antes de tocar nada: labels 5px, valores de campo
8px, descripciones 6px — numeros reales, no percepcion. Investigando la causa:
no es un bug puntual de esta pantalla, es el resultado esperado de la regla
`display px = PDF annotation ÷ 2` documentada en knowledge/specs/README.md
desde el inicio del proyecto y aplicada (documentada como "/* calibrated ÷2 */")
en decenas de declaraciones en todo packages/ui/src/styles.css.
**Verificacion antes de actuar:** esa regla parte de la premisa "el PDF es un
artboard @2× (1920×1080 = 2×960×540)" — nunca confirmada con el diseñador,
solo asumida al inicio del proyecto. Se le pregunto a Luna directamente si
podia confirmar el ancho real del artboard antes de tocar nada. **Confirmo con
el diseñador: el diseño esta hecho en 1920x1080 real**, no es un export @2x de
un canvas mas chico. Esto invalida la premisa de origen — la regla correcta es
`display px = PDF annotation` (sin dividir).
**Alcance del impacto:** esto no es "el formulario tiene la letra chica" — es
cada valor `/* calibrated ÷2 */` en TODO el kit (TaskCard, InvestigationCard,
ModuleCard, MetricCard, Asistente, SideBar, CalendarCard, y toda la familia
Form*) esta a la mitad de lo que deberia. Dado el tamaño (decenas de
componentes, cientos de declaraciones), se descarto encarar todo el kit de una
sola vez — Luna eligio arrancar por Carga de Formulario (la screen que
disparo el reclamo) y seguir componente por componente en proximas sesiones,
mismo metodo ya usado en todo el fidelity-pass track.
**Ejecutado en esta sesion (fix-009):** re-calibrada (duplicado cada valor
`/* calibrated ÷2 */`, con su comentario actualizado) la familia completa
FormTextInput/FormSelect/FormCheckable(+Group)/FormFileUpload/FormDatePicker
(unico consumidor real: screens/carga-de-formulario/) mas el titulo/section-
title/section-copy propios de esa screen. Verificado en vivo (Browser pane,
getComputedStyle/getBoundingClientRect): fuentes ahora 10-20px (antes 5-10px),
sin overflow a 1920px de viewport (el ancho real del diseño) — a 1280px si
hay overflow horizontal, pero es la misma limitacion "sin layout responsivo"
ya documentada en cada knowledge/screens/*.md de este kit, no un bug nuevo.
**Pendiente, NO tocado en esta sesion:** el resto del kit (TaskCard,
InvestigationCard, ModuleCard, MetricCard, Asistente, SideBar, CalendarCard,
Modal, Login) sigue con sus valores `/* calibrated ÷2 */` sin corregir —
queda comprometido a la mitad de su tamaño real hasta que se procese cada uno,
mismo metodo, en sesiones futuras. Tambien quedaron sin verificar 3 valores
puntuales de FormFileUpload/FormDatePicker que no tenian cita de PDF propia
(`.ds-form-file__upload-button` no tiene font-size declarado en absoluto — bug
preexistente separado — `.ds-form-date__month-nav button`/`.ds-form-date__
spinner-column button` no se pudieron medir en esta sesion porque sus paneles
no estaban abiertos en el story usado).
**Decision tomada:** aceptar la correccion de escala como valida (confirmada
por el diseñador, no una suposicion), ejecutarla componente por componente
empezando por Carga de Formulario, actualizar la doctrina en
knowledge/specs/README.md (marcada la seccion "Scale calibration" anterior
como superseded, con el hallazgo y el nuevo estado documentados arriba) para
que ningun trabajo futuro repita el ÷2 sobre un componente nuevo.
**Motivo:** un hallazgo de esta magnitud (toda la doctrina de escala del design
system) exige confirmacion explicita de la fuente autoritativa (el diseñador)
antes de tocar codigo — exactamente el tipo de ambiguedad que CLAUDE.md pide
resolver preguntando, no asumiendo.
**Artefactos modificados:**
`knowledge/specs/README.md`,
`packages/ui/src/styles.css` (familia .ds-form-field/.ds-form-checkable/.ds-form-file/.ds-form-date),
`packages/ui/src/screens/carga-de-formulario/carga-de-formulario.css`,
`knowledge/fidelity-pass/next-steps.md`
**Decidido por:** Luna

---

## 2026-08-13 fix-009 (ronda 2): "1920x1080 real" rechazado en la practica — revertido, ratio sigue abierto

**feature_id:** fix-009-scale-calibration-correction
**command_origin:** revision visual directa de Luna en Storybook
**status:** accepted (revertir), pregunta de fondo sigue OPEN
**Gap o motivo:** tras aplicar `display px = PDF annotation` (sin dividir) a la
familia Form* (ronda 1, mas arriba), Luna miro el resultado en vivo: "se ve
enorme y solapado todo" — capturas mostraron ACCESO A MODULOS superpuesto con
Admin, texto de FormSelect cortado, thumbnails de FormFileUpload invadiendo la
columna vecina. Su comparacion directa: "se veian visualmente mas fieles antes
de multiplicar x2".
**Por que la premisa "1920x1080 confirmado" no alcanzaba:** que el diseñador
confirme el tamaño del lienzo no resuelve a que densidad/zoom estaba pensado
para verse. Un canvas de 1920px puede estar autorado asumiendo una pantalla
HiDPI (escalado 2x del SO), en cuyo caso 1 unidad del archivo de diseño
equivale a MEDIO px CSS real — que es, en la practica, lo que la regla ÷2
ya hacia. La confirmacion del diseñador resuelve el tamaño del canvas, no
la relacion canvas-a-CSS-px, que es una variable distinta y todavia sin dato
duro.
**Decision tomada:** revertir el codigo de la ronda 1
(`packages/ui/src/styles.css` § familia Form*,
`packages/ui/src/screens/carga-de-formulario/carga-de-formulario.css`) al
estado ÷2 anterior via `git checkout --` (nada se habia commiteado todavia).
Luna eligio seguir pensando el ratio general antes de tocar codigo de nuevo —
se le ofrecio como alternativa mas chica/reversible un piso minimo de
legibilidad (11-12px) solo en texto, dejando tamaños de componente en ÷2;
prefirio no decidir todavia y seguir evaluando un ratio unificado.
**Estado real del kit ahora mismo:** TODO el kit (incluida la familia Form*)
sigue en ÷2, sin cambios netos respecto a antes de esta sesion. `fix-009` sigue
`OPEN` en el registro pero SIN ejecucion pendiente hasta que se resuelva la
pregunta del ratio — no continuar re-calibrando otros componentes con la
regla "sin dividir" hasta nueva decision explicita de Luna.
**Motivo:** la evidencia visual en vivo pesa mas que una premisa dimensional
confirmada mas no validada contra el resultado real — mismo criterio que
"review-before-push": el juicio visual de Luna sobre fidelidad tiene prioridad
sobre un calculo que no lo contempla.
**Artefactos modificados:** `DECISIONS.md`,
`specs/_registry/features.yaml` (nota actualizada),
`knowledge/fidelity-pass/next-steps.md` (handoff corregido) —
`packages/ui/src/styles.css` y `carga-de-formulario.css` REVERTIDOS, no
modificados netamente.
**Decidido por:** Luna

---

## 2026-08-13 fix-009 (ronda 4): piso de 12px SOLO en font-size, todo lo demas vuelve a ÷2

**feature_id:** fix-009-scale-calibration-correction
**command_origin:** pedido directo de Luna tras rechazar tambien el ratio 0.75 (ronda 3)
**status:** accepted, a confirmar visualmente por Luna
**Gap o motivo:** ronda 3 (ratio 0.75 + piso) tambien se vio "grande y solapado
aun" en captura real. Luna pidio explicitamente: volver todo a ÷2 y aplicar
SOLO el piso de legibilidad a font-size, sin tocar ningun otro tamaño
(paddings, anchos, iconos, alto de controles).
**Ejecutado:** revertido via git checkout a ÷2 (limpio, nada commiteado de
ronda 3), despues aplicado piso de 12px UNICAMENTE a declaraciones
font-size de la familia Form*/CargaDeFormulario que dieran menos de 12px con
÷2 (labels 8→12, active-label 5→12, descripciones 6→12, meta/formats 5-7→12,
botones de navegacion del datepicker 6-8→12, etc.). 2 casos necesitaron un
ajuste dependiente para no clippear verticalmente al agrandar solo la fuente:
`.ds-form-date__day` (line-height 10→14px) y `.ds-form-date__spinner-value`
(height 10→14px, con su `max-height` de lista recalculada a 7×14=98px) — son
filas de grilla auto-height, no rompen ningun tamaño fijo de componente.
El titulo de la screen (`.screen-carga-formulario__title`, 10px) se dejo sin
tocar a proposito: es un heading, no texto de cuerpo/label, y no fue señalado
como ilegible.
**Verificado en vivo:** todas las fuentes de cuerpo/label ahora en 12px
(antes 5-8px); sin overflow a 1280px (bodyScrollWidth=innerWidth=1280); las 3
columnas de la grilla miden 372px cada una y `FormFileUpload` (253px, sin
tocar) entra con margen.
**Motivo:** es exactamente el "piso minimo de legibilidad" ofrecido desde el
principio de esta conversacion (antes de probar el ratio 0.75 y el 1:1 sin
dividir) — con evidencia de 2 rondas previas rechazadas, es el camino mas
chico y menos riesgoso: no toca ningun tamaño de componente que ya se había
confirmado como visualmente fiel.
**Artefactos modificados:**
`packages/ui/src/styles.css` (familia Form*, solo font-size + 2 ajustes
dependientes),
`packages/ui/src/screens/carga-de-formulario/carga-de-formulario.css` (solo
font-size),
`specs/_registry/features.yaml`
**Decidido por:** Luna

---

## 2026-08-13 fix-009 (ronda 5): piso bajado de 12px a 10px, mismo criterio

**feature_id:** fix-009-scale-calibration-correction
**command_origin:** pedido directo de Luna
**status:** accepted, a confirmar visualmente
**Gap o motivo:** Luna pidio probar el mismo piso de legibilidad de ronda 4
pero con 10px en vez de 12px.
**Ejecutado:** mismo mecanismo que ronda 4 (piso SOLO en font-size, todo lo
demas en ÷2), bajando el numero de piso a 10px. Un caso ya no necesito ningun
cambio (`.ds-form-field--login .ds-form-field__label`, cuyo ÷2 ya da
exactamente 10px). Los 2 ajustes dependientes de ronda 4 (line-height/height
para evitar clipping en `.ds-form-date__day`/`.ds-form-date__spinner-value`,
mas el `max-height` del spinner) se recalcularon para el font-size mas chico:
14px→12px de alto de fila, max-height del spinner 98px→84px (7×12).
**Verificado en vivo:** labels/valores/descripciones en 10px, sin overflow a
1280px.
**Artefactos modificados:** `packages/ui/src/styles.css`,
`packages/ui/src/screens/carga-de-formulario/carga-de-formulario.css`
**Decidido por:** Luna

---

## 2026-08-13 fix-009 (ronda 6): piso bajado a 8px

**feature_id:** fix-009-scale-calibration-correction
**command_origin:** pedido directo de Luna, para comparar visualmente
**status:** accepted, a confirmar visualmente
**Ejecutado:** mismo mecanismo de rondas 4-5, piso bajado a 8px (coincide con
la mayoria de los valores ÷2 ya existentes — solo sube los que estaban por
debajo: 5-7px). A este piso, `.ds-form-date__day`/`.ds-form-date__spinner-value`
ya no necesitan el ajuste de line-height/height de rondas 4-5 (el ÷2 original
ya tenia margen de sobra para un font-size de 8px).
**Verificado en vivo:** labels/valores/descripciones en 8px, sin overflow a
1280px.
**Decidido por:** Luna

---

## 2026-08-13 fix-010-carga-formulario-horizontal-overflow: solape en navegador angosto + fondo sin cubrir el area de scroll

**feature_id:** fix-010-carga-formulario-horizontal-overflow
**command_origin:** reporte directo de Luna
**status:** accepted
**Gap o motivo:** en navegador angosto, la 2da/3ra columna de CargaDeFormulario
se superponen en vez de generar scroll horizontal. Ademas, Luna anticipo que
si se agrega scroll, el fondo no cubriria el area nueva revelada — mismo bug
que ya notó en otras screens con background.
**Causa raiz (2 partes):** (1) `min-width: 0` en
`.screen-carga-formulario__main`/`__column` + `grid-template-columns:
repeat(3, minmax(0, 1fr))` permitian que las 3 columnas se comprimieran sin
limite — el contenido de ancho fijo (FormFileUpload 253px, los 2 campos de
FormDatePicker lado a lado ~277px) no podia entrar en la columna comprimida
y se dibujaba superpuesto sobre la columna vecina en vez de forzar mas
espacio. (2) el gradiente de fondo vive en `.screen-carga-formulario`, un
elemento de ancho fijo al viewport (no a su contenido) — cuando el contenido
se desbordaba, el area extra quedaba detras de ese elemento, mostrando lo que
hubiera atras (el canvas de Storybook) en vez del gradiente.
**Alternativas consideradas:** (1) agregar `overflow-x: auto` a un
contenedor interno nuevo, con su propio fondo replicado ahi; (2) dejar que el
elemento que ya pinta el fondo (`.screen-carga-formulario`) crezca con su
propio contenido (`width: fit-content; min-width: 100
---

## 2026-08-13 fix-010-carga-formulario-horizontal-overflow: solape en navegador angosto + fondo sin cubrir el area de scroll

**feature_id:** fix-010-carga-formulario-horizontal-overflow
**command_origin:** reporte directo de Luna
**status:** accepted
**Gap o motivo:** en navegador angosto, la 2da/3ra columna de CargaDeFormulario se superponen en vez de generar scroll horizontal. Ademas, Luna anticipo que si se agrega scroll, el fondo no cubriria el area nueva revelada — mismo bug que ya noto en otras screens con background.
**Causa raiz (2 partes):** (1) `min-width: 0` en `.screen-carga-formulario__main`/`__column` + `grid-template-columns: repeat(3, minmax(0, 1fr))` permitian que las 3 columnas se comprimieran sin limite — el contenido de ancho fijo (FormFileUpload 253px, los 2 campos de FormDatePicker lado a lado ~277px) no podia entrar en la columna comprimida y se dibujaba superpuesto sobre la columna vecina en vez de forzar mas espacio. (2) el gradiente de fondo vive en `.screen-carga-formulario`, un elemento de ancho fijo al viewport (no a su contenido) — cuando el contenido se desbordaba, el area extra quedaba detras de ese elemento, mostrando lo que hubiera atras (el canvas de Storybook) en vez del gradiente.
**Alternativas consideradas:** (1) agregar `overflow-x: auto` a un contenedor interno nuevo, con su propio fondo replicado ahi; (2) dejar que el elemento que ya pinta el fondo (`.screen-carga-formulario`) crezca con su propio contenido (`width: fit-content; min-width: 100%`), sin agregar ningun contenedor de scroll nuevo.
**Por que se descarto (1):** duplicar el fondo en un contenedor nuevo agrega una segunda fuente de verdad para el mismo gradiente (riesgo de que se desincronicen si alguien cambia uno y no el otro) para lograr exactamente lo mismo que (2) consigue con el elemento que ya existe.
**Decision tomada:** (2) — `min-width: 0` sacado de `.screen-carga-formulario__main`/`__column`; `minmax(0, 1fr)` -> `minmax(min-content, 1fr)` en la grilla (cada columna respeta su propio minimo real, no un piso arbitrario inventado); `.screen-carga-formulario` pasa a `width: fit-content; min-width: 100%` — crece con su contenido cuando no entra en el viewport (activando el scroll horizontal nativo de la pagina), sin encogerse por debajo del viewport cuando si entra. El gradiente, pintado sobre ese mismo elemento, siempre cubre exactamente lo scrolleable. `.ds-sidebar` (styles.css, compartido por todas las screens) gano `left: 0` ademas de su `top: 0` ya existente (fix-006) para seguir fijo tambien en scroll horizontal.
**Verificado en vivo:** a 768px de viewport (el punto donde el contenido empieza a desbordar, ~9px) aparece scroll horizontal nativo, la sidebar queda fija en ambos ejes al scrollear, y el fondo (incluyendo BackgroundTextureDots, que hereda el mismo position:relative como contenedor) se mueve junto con el contenido sin dejar hueco.
**Motivo:** resuelve la causa raiz (compresion sin limite + fondo de ancho fijo) en lugar de parchear cada sintoma por separado, reusando el mismo elemento que ya pintaba el fondo en vez de agregar una capa nueva.
**Alcance:** solo CargaDeFormulario (la screen reportada) + el ajuste compartido de SideBar. El mismo patron de bug probablemente existe en las otras screens con `background` (Tareas*, Home, Dashboard) — queda pendiente extenderlo si Luna lo confirma, no asumido de antemano.
**Artefactos modificados:** `packages/ui/src/screens/carga-de-formulario/carga-de-formulario.css`, `packages/ui/src/styles.css` (.ds-sidebar), `specs/_registry/features.yaml`
**Decidido por:** Luna

---

## 2026-08-13 fix-009 (ronda 7): piso vuelto a 10px

**feature_id:** fix-009-scale-calibration-correction
**command_origin:** pedido directo de Luna
**status:** accepted
**Ejecutado:** mismo mecanismo de rondas 4-6, piso subido de 8px (ronda 6) a 10px. `.ds-form-date__day`/`.ds-form-date__spinner-value` recuperan el ajuste dependiente de line-height/height (12px, mismo valor que ronda 5) para que el font-size de 10px no quede pegado al borde de su celda.
**Verificado en vivo:** labels/valores/descripciones en 10px, sin overflow a 1280px.
**Decidido por:** Luna

---

## 2026-08-13 fix-011-form-field-control-min-width: la 1ra columna se solapaba con la 2da (causa más profunda que fix-010)

**feature_id:** fix-011-form-field-control-min-width
**command_origin:** reporte directo de Luna
**status:** accepted
**Gap o motivo:** después de fix-010 (grilla + fondo), Luna reportó que la 1ra columna todavía se solapa con la 2da si el viewport es muy angosto — un bug distinto, más profundo.
**Causa raiz:** `.ds-form-field__control` (el flex row con label + input dentro de cada campo) no tenía `min-width: 0`. Su hijo `.ds-form-field__label` usa `white-space: nowrap` (no puede wrappear) y ya tiene `overflow: hidden; text-overflow: ellipsis` preparado para truncar — pero sin `min-width: 0` en el control, el flex row nunca respeta el ancho que `.screen-carga-formulario__grid` (fix-010, `minmax(min-content, 1fr)`) ya le asigna correctamente a la columna: el control se desborda por fuera de su propia columna en vez de dejar que el label trunque con "…".
**Verificado en vivo:** a 820px, 9 elementos de la columna 1 (controles + inputs) se desbordaban hasta 99px más allá del borde de su columna, invadiendo visualmente la columna 2. Con el fix: 0 desbordes a 820px y a 700px (labels como "TIPO DE USUARIO" truncan correctamente a "TIPO DE USUAR…", sin overlap ni scroll de página innecesario en anchos donde el truncado alcanza).
**Decisión tomada:** `min-width: 0` agregado a `.ds-form-field__control` (styles.css, compartido por FormTextInput/FormSelect/FormDatePicker vía la misma clase) — deja que el control respete el ancho real de su columna, activando el `ellipsis` que el label ya tenía listo.
**Motivo:** es el mismo patrón "min-width:0 en cada eslabón de la cadena flex/grid" ya aplicado en fix-010 a nivel de screen — esta vez un nivel más adentro, en el componente compartido, no en la composición de la screen.
**Alcance:** este fix vive en `.ds-form-field__control` (styles.css), compartido por toda la familia Form* — beneficia a cualquier consumidor futuro de estos componentes, no solo CargaDeFormulario.
**Artefactos modificados:** `packages/ui/src/styles.css`, `specs/_registry/features.yaml`
**Decidido por:** Luna
