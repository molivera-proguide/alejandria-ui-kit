# Brief — Form field primitives + Modal (PDF UI Toolkit v3, p.17–22)

> Generado por `/sdd-refine` el 2026-08-07, a partir de `drafts/formularios-pdf-v3.md`,
> `drafts/README.md` y `existing-arch.md`. Fuente completa y verbatim del PDF:
> `knowledge/references/pdf-text-extract.md` (p.17–22).

## 1. PROBLEMA

El PDF v2 (18 páginas) tenía una sola página "FORM" (p.17), un placeholder casi
idéntico al de "EMPTY" — sin campos, sin layout, sin estados reales.
`knowledge/component-roadmap.md` la marcó como "no lista, diseño la sigue
trabajando" (nota del 2026-08-06). La v3 (24 páginas, actualizada 2026-08-07)
reemplaza eso por **5 páginas dedicadas** de Form, cada una con spec visual real
(colores, tipografía, bordes, estados).

En la misma actualización del PDF, la página ALERT (p.22) — que antes no tenía
spec dedicada — ganó un patrón real de diálogo confirm/cancel
("Confirmación de acción"). Esto resuelve el gap **Modal/Dialog** que
`knowledge/component-roadmap.md` ya marcaba como **High priority** (hallazgo del
eval baseline, previo a esta sesión). Por comodidad de sesión de PDF y porque
ambos hallazgos llegaron juntos, esta feature cubre **ambos**: los field
primitives de Form y el componente Modal de confirmación.

## 2. USUARIO

No hay una persona/contexto de producto específico para esta feature. Los field
primitives (y el Modal) son de propósito general: cualquier app que consuma
`@alejandria/ui-kit` los usa para el formulario o diálogo de confirmación que
necesite. Los ejemplos concretos del PDF (USUARIO/CONTRASEÑA, DNI, TIPO DE
USUARIO: Admin/Editor/General, ACCESO A MÓDULOS, "¿ESTÁS SEGURO DE ESTA
ACCIÓN?") son **ilustrativos** — sirven para ver los componentes en contexto en
Storybook, no definen un caso de uso real que la feature deba resolver.

## 3. DONE CRITERIA

- [ ] 6 componentes nuevos implementados, cada uno con `.tsx` + `.stories.tsx`
      plano en `packages/ui/src/components/` y exportado en `src/index.ts`:
  - `FormTextInput` (cubre Login-input p.17 e Input p.18, ver nota de
    unificación en sección 6)
  - `FormSelect` (dropdown/select de p.18)
  - `FormCheckable` (checkbox/radio/switch, p.19)
  - `FormFileUpload` (adjuntos, p.20)
  - `FormDatePicker` (calendario + hora, p.21)
  - `Modal` (confirm/cancel, p.22 — variante "Confirmación de acción" únicamente)
- [ ] Cada componente tiene story(s) en Storybook mostrando sus estados
      relevantes (default, activo, error, disabled, según aplique).
- [ ] `knowledge/component-roadmap.md` actualizado: se retira la nota de Form
      "no listo, diseño lo sigue trabajando" (2026-08-06) y se marca el gap
      Modal/Dialog como resuelto.
- [ ] Fidelity pass de cada componente contra el PDF v3 (p.17–22) — mismo
      proceso que el tracker existente en `knowledge/fidelity-pass/next-steps.md`,
      citando página y valores exactos igual que hacen los componentes ya
      cerrados (ej. `Login.tsx`).
- [ ] Antes de implementar `FormDatePicker`, se revisó la página 21 del PDF
      directamente (no solo el extract de texto) para resolver el layout del
      grid de calendario y el rango de horas visible — ver sección 6.

## 4. OUT OF SCOPE (explícito, esta versión)

- **FILTER (p.23)**: el propio diseñador anota que la spec está incompleta
  ("Me falta desarrollar el desplegable del funnel"). No entra sin confirmar
  con diseño primero.
- **Fix de comentario en `Scrollbar.tsx`**: el comentario cita "PDF p.13
  MISCELÁNEAS", título que ya no existe desde v2. Es cosmético, no bloqueante,
  y no es un gap de implementación (los valores del PDF v3 p.24 ya coinciden
  con el código). Candidato a `/sdd-fix` aparte, fuera de esta feature.
- **Validación con lógica de negocio**: esta feature NO implementa reglas de
  validación (client-side ni server-side), ni dispara nada por su cuenta al
  submit/blur/typing. Los componentes son visuales/controlados — ver sección 6.
- **Autoguardado / manejo de abandono del formulario**: fuera de scope. El kit
  no tiene persistencia ni estado global propio (`existing-arch.md`); el ciclo
  de vida del formulario es responsabilidad de quien consuma los primitives.
- **Estados `readonly` y `loading`**: no entran en esta versión (solo
  `disabled`, ver sección 6). Si un consumidor los necesita, se pide como
  feature aparte.
- **Alert Sigcat y Tarea realizada** (otras dos variantes de p.22 ALERT): no
  entran en esta feature — solo la variante "Confirmación de acción" (patrón
  confirm/cancel). Las otras dos son alertas/notificaciones, no diálogos
  modales, y no resuelven el gap Modal/Dialog que motiva incluir esta página.
- **Drag&drop avanzado**: se incluye soporte básico (ver sección 6), no
  comportamiento avanzado (previsualización de archivo, progreso de carga,
  reordenamiento). El propio PDF deja la interacción sin spec ("escucho
  sugerencias, mientras busco referencias").

## 5. RESTRICCIONES TÉCNICAS (no negociables, de `existing-arch.md`)

- Stack: TypeScript `strict: true`, React 19.2, Storybook 10, Vite 8, pnpm.
- Cada uno de los 6 componentes va como field primitive / componente suelto en
  `packages/ui/src/components/`: un `.tsx` + un `.stories.tsx` plano, **sin**
  carpeta propia (a diferencia de `patterns/`, que sí usa subcarpeta). Esto
  aplica también a `Modal` — no es una composición de página, es un componente
  reutilizable de propósito general.
- `src/index.ts` es la única fuente de verdad de exports públicos — el build
  deriva el `.d.ts` del barrel a partir de esas líneas `export`, nunca a mano.
- Tokens de color/tipografía vía `--ds-*` en `packages/ui/src/styles.css`. Los
  valores hex de este brief son del PDF (@2×); por convención del repo se
  dividen entre 2 al implementar (ver comentarios existentes tipo
  `/* PDF 15.09 → ÷2 */` en `styles.css`).
- Sin framework de test instalado (decisión consciente, confirmada por el
  equipo). Cualquier task de test en `/sdd-implement` requiere elegir
  framework explícitamente (candidato: Vitest, ya usan Vite) — no asumirlo.
- Sin linter instalado (decisión consciente) — no agregar como parte de esta
  feature.
- `knowledge/` es la autoridad de diseño para tokens, radios, tipografía y
  decisiones visuales — si algo de este brief contradice
  `knowledge/design-system-rules.md`, se resuelve a favor de `knowledge/` y se
  registra en `DECISIONS.md`.

## 6. UI / FLUJO

### Arquitectura general
Field primitives sueltos (no un `Form` compuesto único). Cada sub-tipo del PDF
es su propio componente exportado, mismo patrón que hoy `TextField`/
`SelectField`/`Switch` en el kit. Nadie orquesta un "formulario completo" —
el PDF tampoco muestra esa composición (no hay página con varios campos juntos
en un form real), así que no se inventa ese layout en esta feature.

**Nota de unificación**: p.17 (Login-input) y p.18 (Input general) son ambos
inputs de texto con specs de color distintas (contexto login vs. contexto
genérico). Se implementan como un solo `FormTextInput` con variante/prop que
selecciona el set de estilos (ej. `variant="login" | "default"`), no como dos
componentes separados — evita duplicar lógica de label-flotante/estado
activo que es idéntica en ambos.

### 1. FormTextInput — variante `login` (p.17)
- Fondo del contenedor: `#2a2927`
- Label: Source Code Light, 20pt, `#f6f6f6`, uppercase
- Input activo + label activo: Source Code Light, 10pt, `#8d8d8d`, padding 10px
- Línea bajo input activo: 0,75pt, `#606060`
- Borde del input cuando está activo: `#ffffff`
- Ejemplo en story: USUARIO, CONTRASEÑA

### 1. FormTextInput — variante `default` (p.18)
- Fondo: `#060606` al 50% de opacidad
- Borde: 0,75pt `#606060`; borde con error: `#ff0404` (+ transición CSS simple,
  ver "Animación" abajo)
- Label: Source Code Light, 16pt, `#8d8d8d`, uppercase
- Input activo + label activo: Source Code Light, 10pt, `#8d8d8d`, padding 10px
- Línea bajo input activo: 0,75pt `#606060`; borde activo: `#ffffff`
- Texto del valor: Montserrat Regular, 16pt, `#ffffff`
- Ejemplo en story: DNI, NOMBRE, DESCRIPCIÓN (textarea)
- Prop `error?: string | boolean` — puramente visual (ver "Validación" abajo)
- Prop `disabled?: boolean` — estilo a definir en `/sdd-implement` dentro de
  las convenciones de `knowledge/` (el PDF no lo especifica)

### 2. FormSelect (p.18)
- Mismos estilos base que `FormTextInput` variante `default` (fondo, borde,
  label, línea activa)
- El desplegable se **superpone** al input cuando está activo (no empuja
  layout — mismo patrón de overlay que usa `FormFileUpload`)
- Soporta selección única o multiselect (prop, ej. `multiple?: boolean`)
- Al seleccionar una opción, el desplegable se centra en esa opción
- Ejemplo en story: TIPO DE USUARIO (Admin/Editor/General)
- Prop `error` y `disabled` — mismo criterio que `FormTextInput`

### 3. FormCheckable (p.19)
- Cubre checkbox, radio y switch con una API común
- Versión simple y versión con bajada (descripción) para todos los casos —
  prop `description?: string`
- Título de grupo: Source Code Light, 16pt, `#8d8d8d`, uppercase
- Label: Montserrat Regular, 16pt, `#ffffff`
- Descripción (bajada): Montserrat Regular, 12pt, `#8d8d8d`
- Checkbox seleccionado: fondo `#ffffff`, selector `#060606`
- Switch: fondo `#606060`, selector `#ffffff`
- Switch seleccionado: fondo `#ffffff`, selector `#060606`
- Prop `disabled` — mismo criterio que arriba

### 4. FormFileUpload (p.20)
- Fondo: `#060606` al 50%; borde 0,75pt `#606060`; borde con error `#ff0404`
  (+ transición CSS simple)
- Label: Source Code Light, 16pt, `#8d8d8d`, uppercase
- Nombre de archivo: Montserrat Regular, 16pt, `#ffffff`
- Descripción de archivo (tipo/tamaño): Montserrat Regular, 10pt, `#8d8d8d`
- Formatos admitidos: PDF, JPG, PNG, DOC
- Permite más de un archivo adjunto a la vez (multi-file)
- Cuando el input está activo, el estado "empty" se superpone al input (mismo
  patrón de overlay que el select)
- **Drag & drop básico incluido**: highlight visual de la zona al arrastrar un
  archivo encima, además del click-to-upload estándar (`input type="file"`).
  Sin previsualización ni progreso de carga (fuera de scope, ver sección 4) —
  el PDF no especifica esta interacción más allá de la intención del
  diseñador, así que el comportamiento exacto de highlight/estilos se
  documenta como interpretación razonable en `DECISIONS.md` durante
  `/sdd-implement`.
- Prop `disabled` — mismo criterio que arriba

### 5. FormDatePicker (p.21)
- Fondo: `#060606` al 50%; borde 0,75pt `#606060`; borde activo `#ffffff`
- Label: Source Code Light, 16pt, `#8d8d8d`, uppercase
- Input activo + label: Source Code Light, 12pt, `#8d8d8d`
- Mes/año: Montserrat Bold, 12pt, `#ffffff`
- Números y días: Montserrat Regular, 12pt, `#8d8d8d`
- Horas: Montserrat Regular, 14pt, `#8d8d8d`
- Día/hora seleccionada: `#ffffff`
- Grid de calendario (L M M J V S D + 1-31) + selector de hora separado (HORA)
- **Gate explícito**: el extract de texto (`pdf-text-extract.md`) NO resuelve
  el layout exacto del grid (cuántas filas, alineación) ni el rango de horas
  visible en el selector. `/sdd-implement` debe abrir la página 21 del PDF
  directamente (no solo el extract) antes de definir el layout — no se
  inventa un grid genérico sin esa referencia visual.
- Prop `disabled` — mismo criterio que arriba

### 6. Modal — variante "Confirmación de acción" (p.22)
- Fondo: `#060606`
- Borde: 0,75pt `#606060`
- Título: Source Code Bold, 18pt, `#ffffff`
- Texto: Montserrat Light, 18pt, `#c1c1c1`
- Línea separadora: 0,75pt `#8a8b87`
- Copy de ejemplo en story: "¿ESTÁS SEGURO DE ESTA ACCIÓN?" + "Esta acción es
  irreversible; la elección realizada afectará el resultado definitivo y no
  podrá deshacerse."
- 2 botones de acción (ej. props `primaryAction`/`secondaryAction` o
  `onConfirm`/`onCancel` + labels configurables — el PDF muestra "ACCIÓN A" /
  "ACCIÓN B" como placeholders genéricos, no literal)
- Distinto de `AlertBanner.tsx` (ya existente, patrón de notificación/banner)
  — nombre `Modal` elegido deliberadamente para no confundir con Alert
- Fuera de esta variante: "Alert Sigcat" y "Tarea realizada" (otras dos cajas
  de la misma página p.22) — son notificaciones, no diálogos, y no forman
  parte de esta feature (ver sección 4)

### Validación (visual únicamente, sin lógica)
Todos los componentes con estado de error (`FormTextInput`, `FormSelect`,
`FormFileUpload`) exponen una prop `error?: string | boolean` que el
**consumidor controla externamente**. El kit no implementa reglas de
validación, no decide cuándo mostrar el error (submit/blur/typing es decisión
de quien lo consume), y no dispara nada por su cuenta. Esto es coherente con
"librería de componentes puros, sin persistencia" (`existing-arch.md`).

### Animación
Transición CSS simple (ej. 150–200ms `ease`) sobre las propiedades que
cambian en la transición estático↔activo (`border-color`, `font-size` del
label). El PDF pide animación pero no da valores de timing/easing — se
documenta en `DECISIONS.md` como interpretación razonable durante
`/sdd-implement`.

## Referencias
- `knowledge/references/pdf-text-extract.md` — texto verbatim completo, p.17–24
- `knowledge/component-roadmap.md` — nota desactualizada sobre Form "no listo"
  (2026-08-06) y gap Modal/Dialog (High priority, eval baseline)
- `existing-arch.md` — restricciones de codebase (commit base `11c9a51`)
- `drafts/formularios-pdf-v3.md` — draft original de esta feature
- `handoffs/20260807-fase1-drafts-formularios.md` — handoff que originó el draft
