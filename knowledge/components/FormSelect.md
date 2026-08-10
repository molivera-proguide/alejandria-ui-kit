---
id: form-select
name: FormSelect
category: input
status: draft
since: 0.1.0

package: "@alejandria/ui-kit"
export: packages/ui/src/components/FormSelect.tsx

figma: https://www.figma.com/file/PLACEHOLDER
storybook: Alejandria/FormSelect

aliases:
  - select
  - dropdown de formulario
  - desplegable
  - multiselect
keywords:
  - FormSelect
  - select
  - dropdown
  - listbox
  - multiselect
  - overlay
  - FormSelectOption
  - FormSelectProps
tags:
  - forms
  - input
  - overlay
  - molecule

last_reviewed: 2026-08-07
---

# FormSelect

## Purpose

Select/dropdown custom (no `<select>` nativo) con desplegable que se superpone al input sin
empujar layout, single o multiselect, alineado con la sección **FORM - INPUT § Select**
del PDF de referencia (p.18).

Describe:

- **Responsabilidad principal:** elegir una o varias opciones de una lista, mostrando el
  desplegable como overlay sobre el propio campo.
- **Problema que resuelve:** el PDF pide un desplegable que se superponga (no empuje
  layout) y se auto-centre en la opción elegida al abrir — comportamiento no estilizable
  sobre un `<select>` nativo del navegador.
- **Alcance:** listbox custom (`role="listbox"`, opciones `role="option"`) con estado de
  apertura y selección 100% interno (`useState`) — no requiere wiring externo para
  funcionar en Storybook o en una app consumidora básica.

**Referencia visual canónica:** `knowledge/references/design-reference.pdf` v3 p.18 § "Para
select". Verificado en Storybook (toggle, centrado de scroll, checkmark de selección) — ver
`knowledge/fidelity-pass/next-steps.md`, 2026-08-07 y su sweep post-review (1 bug real
encontrado y corregido, ver Changelog).

Exclude:

- API details
- Implementation details
- Usage examples
- Composition

---

# Behavioral Contract

## This component guarantees

- Renderiza un `<button>` disparador (`role="listbox"` via `aria-haspopup`, `aria-expanded`)
  dentro de `.ds-form-field__control`, y un `<ul role="listbox">` de opciones que se muestra
  solo cuando `open` es `true` (estado interno).
- El desplegable se posiciona `absolute` sobre el input (no empuja layout) — PDF: "el
  desplegable se superpone al input cuando está activo".
- Al abrir, hace scroll automático para centrar la opción ya seleccionada
  (`scrollIntoView({ block: "center" })`) — PDF: "al seleccionar una opción, el desplegable
  se centra en esa opción".
- Soporta selección única (`multiple` ausente/`false`, cierra al elegir) o múltiple
  (`multiple: true`, no cierra, acumula selección).
- El texto de las opciones permanece `#ffffff` sin dimming; la opción seleccionada se marca
  con un checkmark SVG (`aria-selected="true"`), no con texto atenuado — corregido
  2026-08-07 tras verificación pixel-precisa contra el PDF.
- Cierra al hacer click afuera (`mousedown` fuera de la raíz) o al presionar `Escape` con el
  trigger enfocado.
- Es controlado u no-controlado: si se pasa `value`, el componente no gestiona su propio
  estado de selección (usa `internalValue` solo cuando `value` es `undefined`).
- `error`/`disabled` — mismo tratamiento visual que `FormTextInput` (comparten
  `.ds-form-field`).

## This component never

- Usa un `<select>` nativo del navegador — es un listbox custom por requerimiento del PDF
  (overlay + auto-centrado no son estilizables sobre el nativo).
- Filtra ni busca opciones por texto (no es un combobox con autocompletado).
- Valida que `value`/`defaultValue` correspondan a una opción existente en `options`.
- Persiste ni sincroniza selección fuera de las props `value`/`onChange`.

---

# Constraints

## Required

- Importar desde `@alejandria/ui-kit` y cargar `@alejandria/ui-kit/style.css`.
- Proveer `label`, `options` (array de `{ label, value, disabled? }`).
- Usar `multiple: true` para el caso "Select único o multiselect" del PDF cuando la
  selección deba acumular más de un valor.
- Cada `option.value` debe ser único dentro de `options` — se usa como `key` interno y como
  identificador de selección.

## Forbidden

- Envolver `FormSelect` en un `<select>` o reemplazar el trigger por un elemento nativo —
  rompe el overlay y el auto-centrado exigidos por el PDF.
- Asumir navegación de opciones con flechas del teclado dentro del listbox abierto — no
  está implementada (solo `Enter`/`Espacio`/`ArrowDown` sobre el trigger abren el
  desplegable); ver Known Limitations.

## Recommendations

- Pasar `defaultValue` (no controlado) para casos simples de Storybook/demo; usar
  `value`+`onChange` cuando el consumidor necesite sincronizar con estado externo.
- Mantener `options` estable entre renders (no recrear el array en cada render) para evitar
  reflows innecesarios del listbox.

---

# Category

| Field | Value |
|--------|-------|
| Type | molecule |
| Group | Forms |
| Package | @alejandria/ui-kit |
| Import | `import { FormSelect } from "@alejandria/ui-kit"` |

---

# Public API

```tsx
import {
  FormSelect,
  type FormSelectProps,
  type FormSelectOption
} from "@alejandria/ui-kit";
```

Tipos exportados:

- `FormSelect` — componente funcional.
- `FormSelectProps` — props del componente.
- `FormSelectOption` — forma de cada entrada en `options` (`{ label, value, disabled? }`).

---

# Props

| Prop | Type | Default | Required | Description |
|------|------|----------|----------|-------------|
| `label` | `string` | — | sí | Label flotante del campo. |
| `options` | `FormSelectOption[]` | — | sí | Opciones del desplegable. |
| `multiple` | `boolean` | `false` | no | Habilita selección múltiple (acumula, no cierra al elegir). |
| `value` | `string \| string[]` | — | no | Selección controlada. Si se omite, el componente gestiona su propio estado. |
| `defaultValue` | `string \| string[]` | — | no | Selección inicial (no controlada). |
| `onChange` | `(value: string \| string[]) => void` | — | no | Notifica cambios de selección. |
| `error` | `string` | — | no | Mismo tratamiento visual que `FormTextInput`. |
| `disabled` | `boolean` | — | no | Deshabilita el trigger; `opacity: 0.58`. |
| `...props` | `HTMLAttributes<HTMLDivElement>` (menos `onChange`) | — | no | Atributos nativos del contenedor raíz. |

### FormSelectOption

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `label` | `string` | sí | Texto visible de la opción. |
| `value` | `string` | sí | Identificador único, usado en `value`/`onChange`. |
| `disabled` | `boolean` | no | Deshabilita la opción individualmente. |

---

# Variants

No hay variantes visuales públicas — una sola apariencia canónica (PDF p.18). `multiple`
cambia el comportamiento de selección, no el estilo base.

---

# States

| State | Description |
|--------|-------------|
| Default (cerrado) | Trigger sin selección visible, desplegable oculto. |
| Activo (abierto) | `open: true`. Desplegable overlay visible, scroll centrado en la selección previa. |
| Opción seleccionada | Trigger muestra `label` de la(s) opción(es) elegida(s); en el listbox, la opción tiene checkmark. |
| Multiselect | Trigger muestra labels unidos por `", "`; el listbox no se cierra al elegir. |
| Error | Borde `#ff0404`, mensaje visible. |
| Disabled | Trigger deshabilitado, `opacity: 0.58`. |

---

# Layout (PDF p.18 § Select)

| Nivel | Elemento DOM | Prop / origen |
|-------|--------------|---------------|
| 1 | `button.ds-form-select__trigger` | `label` + selección actual |
| 2 | `label.ds-form-field__label` | `label` |
| 3 | `span.ds-form-field__chevron` | fijo |
| 4 | `ul.ds-form-select__menu` (solo si `open`) | `options` |

---

# Accessibility

## Requirements

- Trigger `<button aria-haspopup="listbox" aria-expanded>`.
- Listbox `<ul role="listbox" aria-multiselectable>`; opciones `<button role="option"
  aria-selected>`.
- `aria-invalid`/`aria-describedby` en el trigger cuando hay `error`.
- Cierra con `Escape` (foco permanece en el trigger, no se mueve).

### ARIA

| Attribute | Usage |
|-----------|-------|
| `aria-haspopup="listbox"` | Trigger. |
| `aria-expanded` | Trigger — refleja `open`. |
| `role="listbox"` / `aria-multiselectable` | `<ul>` del desplegable. |
| `role="option"` / `aria-selected` | Cada opción. |

### Keyboard

| Key | Action |
|-----|--------|
| `Enter` / `Espacio` / `ArrowDown` (trigger enfocado) | Abre el desplegable. |
| `Escape` (trigger enfocado) | Cierra el desplegable. |
| `Tab` | Navega entre trigger y, si está abierto, las opciones (orden DOM nativo — no hay wrap-around de listbox). |

**Nota:** no hay navegación de flechas (`ArrowUp`/`ArrowDown`) *dentro* del listbox ya
abierto — ver Known Limitations.

---

# Responsive Behavior

Sin media queries propias. El desplegable usa `max-height: 160px` con scroll interno
(`.ds-scroll-area--y`) independientemente del viewport.

---

# Composition

## Purpose in Layout

- **Input** — selección de una entre N opciones (o varias, en `multiple`) dentro de un
  formulario.

## Parent

- Cualquier contenedor de formulario del consumidor.

## Children

- No admite `children` libres — el listbox se genera enteramente desde `options`.

## Siblings

- `FormTextInput`, `FormCheckable`, `FormFileUpload`, `FormDatePicker` — misma familia
  visual y feature.

## Alternatives

- `SelectField` — select de la familia console/teal existente; no mezclar visualmente con
  `FormSelect`.

---

# Related Components

| Component | Relationship |
|-----------|--------------|
| `FormTextInput` | Comparte `.ds-form-field` (fondo/borde/label). |
| `FormFileUpload` | Mismo patrón de overlay ("empty se superpone al input"). |
| `SelectField` | Equivalente funcional en la familia console/teal — `<select>` nativo estilizado, sin overlay custom. |

---

# Content Guidelines

## Labels

- Label del campo en mayúsculas vía CSS (ej. `"TIPO DE USUARIO"`).
- `option.label`: texto legible tal cual se muestra (ej. `"Admin"`, `"Editor"`, `"General"`).

## Values

- `option.value`: identificador estable (slug), no necesariamente igual al label visible.

## Icons

- Checkmark SVG interno (10×8px display) marca la opción seleccionada — no configurable
  vía props.

## Localization

- Las stories usan español; el componente no impone idioma.

---

# Examples

## Basic (single-select)

```tsx
<FormSelect
  label="TIPO DE USUARIO"
  options={[
    { label: "Admin", value: "admin" },
    { label: "Editor", value: "editor" },
    { label: "General", value: "general" }
  ]}
/>
```

## Multiselect

```tsx
<FormSelect
  label="TIPO DE USUARIO"
  multiple
  defaultValue={["admin", "editor"]}
  options={TIPO_USUARIO_OPTIONS}
/>
```

## Controlado

```tsx
const [value, setValue] = useState("admin");
<FormSelect label="TIPO DE USUARIO" options={options} value={value} onChange={setValue} />
```

---

# Reasoning Examples

## User Request

Elegir un tipo de usuario entre 3 opciones fijas, con el desplegable superpuesto al campo.

### Recommended Components

- `FormSelect`

### Why

El requerimiento de overlay + auto-centrado (PDF p.18) no es alcanzable con `SelectField`
(nativo estilizado) — `FormSelect` es el listbox custom construido para ese caso.

---

# Design Tokens

| Token / value | Category | Usage |
|---------------|----------|-------|
| `--ds-color-pdf-surface` (`#060606`) | color | Fondo del desplegable |
| `--ds-color-white` (`#ffffff`) | color | Borde del desplegable activo, texto de opciones |
| `--ds-color-pdf-ink-muted` (`#8a8b87`) | color | Trazo del checkmark de opción seleccionada |
| `--ds-font-body` | typography | Texto de las opciones |

---

# Implementation Notes

> **Interno (mantenedores).** Las rutas de esta sección son fuente del monorepo; no forman
> parte de la API publicada de `@alejandria/ui-kit`.

Read after:

1. Constraints
2. Public API
3. Composition

## Source File

```text
packages/ui/src/components/FormSelect.tsx
```

## Dependencies

- `cn()` de `packages/ui/src/utils/cn.ts`
- `styles.css` (`.ds-form-field` compartido + `.ds-form-select__*`)
- Utility CSS `.ds-scroll-area--y` (scrollbar temática) para el listbox

## DOM Structure

```text
div.ds-form-field.ds-form-select[.ds-form-field--invalid][.ds-form-field--disabled]
├── div.ds-form-field__control
│   ├── button.ds-form-field__input.ds-form-select__trigger
│   ├── label.ds-form-field__label
│   ├── span.ds-form-field__chevron
│   └── ul.ds-form-select__menu (solo si open)
│       └── li > button.ds-form-select__option[--selected] (× options.length)
│           ├── span.ds-form-select__option-label
│           └── svg.ds-form-select__option-check (solo si seleccionada)
└── p.ds-form-field__error (solo si error)
```

---

# Known Limitations

- Sin navegación de flechas dentro del listbox abierto (solo `Enter`/`Espacio`/`ArrowDown`
  para abrir desde el trigger) — no exigido por `input.md`, pero es una brecha frente al
  patrón ARIA listbox convencional. Anotado en `specs/001-form-modal/checklist.md`.
- Sin búsqueda/filtrado de opciones por texto.
- Sin tests unitarios ni de integración (sin framework de test instalado).

---

# Future Improvements

- [ ] Navegación de flechas (`ArrowUp`/`ArrowDown`) dentro del listbox abierto, con foco
  roving entre opciones.
- [ ] Cierre con foco-trap completo si un futuro consumidor lo requiere.

---

# Changelog

| Version | Change |
|----------|--------|
| 0.1.0 | Implementación inicial (listbox custom, overlay, single/multiselect, auto-centrado), feature `001-form-modal`. |
| 0.1.0 | Fidelity pass 2026-08-07 (sweep post-review): corregido 1 bug real — el texto de la opción seleccionada se atenuaba a `--ds-color-pdf-form-muted`; el PDF (`get_text()`) muestra el texto siempre `#ffffff`, sin dimming, y la selección se marca solo con un checkmark SVG junto a la opción (`get_drawings()`). |
