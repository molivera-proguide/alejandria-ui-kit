# Draft — Componentes de Formulario (PDF UI Toolkit v3, p.17–21)

Notas crudas para `/sdd-refine`. No es un spec formal — es el resumen de lo que
el PDF v3 (actualizado 2026-08-07) trae de nuevo, con cita de página y valores
exactos. Fuente completa y verbatim: `knowledge/references/pdf-text-extract.md`.

## Por qué ahora

El PDF v2 (18 páginas) tenía una sola página "FORM" (p.17) que era un placeholder
casi idéntico al de "EMPTY" — sin campos, sin layout, sin estados. `knowledge/component-roadmap.md`
la marcó como "no lista, diseño la sigue trabajando" (nota del 2026-08-06). La v3
(24 páginas) reemplaza eso por **5 páginas dedicadas**, cada una con spec real.

## Las 5 sub-specs (p.17–21)

### 1. Form - Login (p.17)
Estados del campo de input en contexto de login (no confundir con la card de login
completa, que ya existe como `Login.tsx` / PDF p.7 — esto es solo el input, más genérico).
- Fondo del contenedor: `#2a2927`
- Label: Source Code Light, 20pt, `#f6f6f6`, uppercase
- Input activo + label activo: Source Code Light, 10pt, `#8d8d8d`, padding 10px
- Línea bajo input activo: 0,75pt, `#606060`
- Borde del input cuando está activo: `#ffffff`
- Campos del ejemplo: USUARIO, CONTRASEÑA

### 2. Form - Input (p.18)
Texto libre + select/dropdown.
- Fondo: `#060606` al 50% de opacidad
- Borde: 0,75pt `#606060`; borde con error: `#ff0404` (+ animación, sin especificar cuál)
- Label: Source Code Light, 16pt, `#8d8d8d`, uppercase
- Input activo + label activo: Source Code Light, 10pt, `#8d8d8d`, padding 10px
- Línea bajo input activo: 0,75pt `#606060`; borde activo: `#ffffff`
- Texto del valor: Montserrat Regular, 16pt, `#ffffff`
- Animación en la transición estático↔activo (sin valores de timing)
- **Select**, notas del diseñador tal cual:
  - el desplegable se superpone al input cuando está activo (no empuja layout)
  - puede ser único o multiselect
  - al seleccionar una opción, el desplegable se centra en esa opción
- Ejemplo de campos: DNI, NOMBRE, TIPO DE USUARIO (select: Admin/Editor/General),
  DESCRIPCIÓN (textarea)

### 3. Form - Checkables (p.19)
Checkbox/radio/switch. La página también arrastra en el texto un ejemplo de "ACCESO A
MÓDULOS" (radio-style list con descripción por opción: Admin/Editor/General) que es
cola del select de la página anterior, no parte de este spec — no confundir.
- "Tenemos versión simple y con bajada para todos los casos" (con/sin texto descriptivo)
- Título de grupo: Source Code Light, 16pt, `#8d8d8d`, uppercase
- Label: Montserrat Regular, 16pt, `#ffffff`
- Descripción (bajada): Montserrat Regular, 12pt, `#8d8d8d`
- Checkbox seleccionado: fondo `#ffffff`, selector `#060606`
- Switch: fondo `#606060`, selector `#ffffff`
- Switch seleccionado: fondo `#ffffff`, selector `#060606`

### 4. Form - Adjuntos (p.20)
Upload de archivos.
- Fondo: `#060606` al 50%; borde 0,75pt `#606060`; borde con error `#ff0404` (+ animación)
- Label: Source Code Light, 16pt, `#8d8d8d`, uppercase
- Nombre de archivo: Montserrat Regular, 16pt, `#ffffff`
- Descripción de archivo (tipo/tamaño): Montserrat Regular, 10pt, `#8d8d8d`
- Formatos admitidos: PDF, JPG, PNG, DOC
- Drag & drop — nota del diseñador: "escucho sugerencias de cómo hacerlo, mientras
  busco referencias" → **sin spec de interacción**, solo la intención
- Permite más de un archivo adjunto a la vez
- Nota de layout: cuando el input está activo, el estado "empty" se superpone al input
  (mismo patrón de overlay que el select de Form-Input)

### 5. Form - Datepicker (p.21)
Calendario + selector de hora.
- Fondo: `#060606` al 50%; borde 0,75pt `#606060`; borde activo `#ffffff`
- Label: Source Code Light, 16pt, `#8d8d8d`, uppercase
- Input activo + label: Source Code Light, 12pt, `#8d8d8d`
- Mes/año: Montserrat Bold, 12pt, `#ffffff`
- Números y días: Montserrat Regular, 12pt, `#8d8d8d`
- Horas: Montserrat Regular, 14pt, `#8d8d8d`
- Día/hora seleccionada: `#ffffff`
- Grid de calendario (L M M J V S D + 1-31) + selector de hora separado (HORA)
- El extract no resuelve el layout exacto del grid ni el rango de horas visible —
  para eso hay que mirar la página del PDF directamente, el texto no alcanza

## Preguntas que el PDF no responde (para el grilling de /sdd-refine)

- **Arquitectura**: ¿un solo componente `Form` que orquesta todo, o field primitives
  sueltos (`FormLabel`, `FormTextInput`, `FormSelect`, `FormCheckable`, `FormFileUpload`,
  `FormDatePicker`) que se combinan igual que hoy `TextField`/`SelectField`/`Switch`
  están sueltos? El PDF especifica visual por tipo de campo, no un layout de formulario
  completo — no hay una página que muestre varios campos juntos en un form real.
- **Validación**: hay "borde con error" en Input y Adjuntos, pero ningún campo de
  mensaje de error, ni especificación de cuándo se dispara (submit / blur / typing).
- **Estados de campo**: se mencionan "activo" y "con error" — no hay spec de disabled,
  readonly, ni loading (relevante si el submit pega a algo async).
- **Validación client vs server**: no mencionado en el PDF, hay que preguntarlo (ver
  categoría "Formularios" del template de grilling en `/sdd-refine`).
- **Autoguardado / abandono**: no mencionado, mismo comentario.

## Hallazgos adyacentes (fuera de las 5 páginas de Form, pero en el mismo PDF v3) — decidir si entran en esta feature

1. **p.22 ALERT — patrón "Confirmación de acción"**: diálogo confirm/cancel real
   (Título + texto + 2 botones de acción, ejemplo "¿ESTÁS SEGURO DE ESTA ACCIÓN?").
   Esto resuelve el gap **Modal/Dialog** que `knowledge/component-roadmap.md` ya
   marcaba como High priority (hallazgo del eval baseline, no de esta sesión). No es
   parte de "Form" pero comparte la misma sesión de PDF nuevo — vale la pregunta.
2. **p.23 FILTER**: sección nueva, pero el propio diseñador anota que está incompleta
   ("Me falta desarrollar el desplegable del funnel"). Probablemente NO debería entrar
   en el scope de esta feature sin confirmar con diseño primero.
3. **p.24 SCROLLBAR**: no es un gap — ya hay `Scrollbar.tsx` y los valores nuevos del
   PDF (`#494949` track, `#2a2927` handle, medidas ÷2) ya coinciden con la implementación
   actual (verificado). Lo único a ajustar es un comentario desactualizado en el código
   que cita "PDF p.13 MISCELÁNEAS" (título que ya no existe) — cosmético, no bloqueante,
   candidato a `/sdd-fix` aparte.

## Restricciones ya conocidas (de `existing-arch.md`, no negociables salvo /sdd-log)

- Un componente = un `.tsx` + un `.stories.tsx` plano en `packages/ui/src/components/`
  (sin carpeta propia), salvo que se decida que Form es una composición
  (`patterns/`, como Login/Mission/DetailSheet) en vez de un export del catálogo.
- Tokens de color/tipografía vía `--ds-*` en `packages/ui/src/styles.css` — los valores
  hex de este draft son del PDF (@2×, por convención del repo se dividen entre 2 al
  implementar, ver comentarios existentes tipo `/* PDF 15.09 → ÷2 */` en `styles.css`).
- Sin framework de test instalado (decisión consciente) — cualquier task de test en
  `/sdd-implement` requiere elegir framework explícitamente (candidato: Vitest).
- `src/index.ts` es la única fuente de verdad de exports públicos.

## Referencias
- `knowledge/references/pdf-text-extract.md` — texto verbatim completo, p.17–24
- `knowledge/component-roadmap.md` — nota desactualizada sobre Form "no listo" (p. 2026-08-06)
- `existing-arch.md` — restricciones de codebase
- `handoffs/20260807-fase1-drafts-formularios.md` — handoff que originó este draft
