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
