# Registro de decisiones — SDD

Este archivo registra cada vez que una decisión humana desvía o amplía
lo establecido en el brief original (input.md).
Sirve como trazabilidad entre lo que se pidió y lo que se implementó.

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
