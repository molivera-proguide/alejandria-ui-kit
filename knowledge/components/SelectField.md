---
id: select-field
name: SelectField
category: input
status: draft
since: 0.1.0

package: "@alejandria/ui-kit"
export: packages/ui/src/components/SelectField.tsx

figma: https://www.figma.com/file/PLACEHOLDER
storybook: Alejandria/SelectField

aliases:
  - campo de selección
  - select
  - dropdown
keywords:
  - SelectField
  - select
  - dropdown
  - opciones
  - label
  - hint
  - error
  - options
  - SelectOption
  - SelectFieldProps
tags:
  - input
  - forms
  - interactive
  - molecule

last_reviewed: 2026-07-02
---

# SelectField

## Purpose

Ofrece un campo de selección con etiqueta, mensajes de ayuda o error y opciones configurables en consolas del Alejandria UI Kit.

Describe:

- **Responsabilidad principal:** capturar una opción del usuario mediante un `<select>` nativo con presentación coherente del design system (etiqueta, control, hint y error).
- **Problema que resuelve:** unificar la estructura visual y la asociación accesible label–select sin reimplementar CSS de campos en cada vista.
- **Alcance:** componente de formulario basado en `<select>` con `forwardRef`; el consumidor provee `label`, opciones vía prop `options` o `<option>` en `children`, y atributos nativos del select vía `...props`.

Exclude:

- API details
- Implementation details
- Usage examples
- Composition

---

# Behavioral Contract

Documenta los comportamientos públicos en los que el consumidor puede confiar.

## This component guarantees

- Renderizado como contenedor `div.ds-field` con `<select class="ds-field__select">` nativo en el interior.
- `label` siempre renderizado en `<label class="ds-field__label">` asociado al select mediante `htmlFor` e `id` coincidentes.
- `id` del select: valor de la prop `id` si se provee; de lo contrario, identificador estable generado con `useId()`.
- Clase `ds-field--invalid` en el contenedor raíz cuando `error` es truthy.
- `aria-invalid="true"` en el `<select>` solo cuando `error` es truthy; omitido cuando no hay error.
- `aria-describedby` en el `<select>` fusiona, en orden, el valor de la prop `aria-describedby` del consumidor, el id del hint (`{fieldId}-hint`) y el id del error (`{fieldId}-error`); omitido si ninguno aplica.
- `hint` renderizado en `<p class="ds-field__hint">` con `id="{fieldId}-hint"` solo cuando `hint` es truthy.
- `error` renderizado en `<p class="ds-field__error">` con `id="{fieldId}-error"` solo cuando `error` es truthy.
- Control envuelto en `div.ds-field__control.ds-field__control--select` con chevron decorativo en `<span class="ds-field__chevron" aria-hidden="true">`.
- Cuando `options` es truthy: renderiza `<option>` por cada elemento con `key={option.value}`, `value={option.value}`, `disabled={option.disabled}` y texto `{option.label}`.
- Cuando `options` es falsy: renderiza `children` dentro del `<select>` (patrón de `<option>` nativos del consumidor).
- Fusión de `className` externa con clases base en el contenedor raíz (`div.ds-field`) mediante `cn()`.
- Repaso de atributos nativos de `SelectHTMLAttributes<HTMLSelectElement>` al `<select>` vía `...props` (`disabled`, `value`, `defaultValue`, `onChange`, `name`, `required`, `multiple`, etc.).
- Reenvío de `ref` al elemento `<select>` nativo.

## This component never

- Valida, filtra ni transforma la selección por sí mismo.
- Renderiza `<input>`, `textarea` ni controles de texto libre.
- Importa ni compone internamente `Button`, `TextField` ni otros componentes del kit.
- Expone prop `variant`, `size`, `iconLeft`, `action` ni tipos auxiliares de variante.
- Renderiza slot `action` en la fila de etiqueta (a diferencia de `TextField`).
- Aplica estilos CSS dedicados para `:disabled` en `.ds-field__select` o `.ds-field__control--select`.
- Aplica media queries ni comportamiento responsivo propio.
- Oculta el mensaje de `hint` cuando `error` está presente (ambos pueden renderizarse simultáneamente).
- Renderiza opciones vacías cuando `options` es un array vacío (no hay opciones hijas en el DOM).

---

# Constraints

Estas reglas tienen la máxima prioridad.

Si algún ejemplo entra en conflicto con estas reglas,
siempre seguir estas reglas.

## Required

- Importar desde `@alejandria/ui-kit` y cargar `styles.css` del paquete (`@alejandria/ui-kit/style.css`).
- Proveer `label` (prop obligatoria de tipo `string`).
- Proveer opciones mediante prop `options` o `<option>` en `children`; si se usa `options`, cada elemento requiere `label` y `value` de tipo `string`.
- Gestionar estado de la selección (`value`/`onChange` o `defaultValue`) en el consumidor; el componente no es controlado por defecto.

## Forbidden

- Inventar props que no existan en `SelectFieldProps` (`variant`, `size`, `placeholder`, `iconLeft`, `action`, etc.).
- Asumir que `className` se aplica al `<select>` (se aplica al contenedor `div.ds-field`).
- Asumir validación integrada: pasar `error` solo refleja estado visual y ARIA; la lógica de validación es responsabilidad del consumidor.
- Usar `SelectField` para entrada de texto libre o búsqueda con autocompletado (usar `TextField`).
- Pasar `options` y `children` simultáneamente esperando que se fusionen; cuando `options` es truthy, `children` se ignora.

## Recommendations

- Usar prop `options` con objetos `SelectOption` para listas declarativas, según `SelectField.stories.tsx`.
- Usar `defaultValue` para selección inicial en filtros (`Playground`, `CompactFilters`).
- Agrupar varios campos en grid del consumidor para barras de filtros compactas, según `SelectField.stories.tsx` → `CompactFilters`.
- Usar `hint` para describir el alcance del filtro y `error` para mensajes de validación, según stories `Playground` e `Invalid`.
- Usar `disabled` en el select nativo para estados no editables, según `SelectField.stories.tsx` → `Disabled`.

---

# Category

| Field | Value |
|--------|-------|
| Type | molecule |
| Group | Forms |
| Package | @alejandria/ui-kit |
| Export | packages/ui/src/components/SelectField.tsx |

---

# Public API

Solo documenta la API pública.

```tsx
import {
  SelectField,
  type SelectFieldProps,
  type SelectOption
} from "@alejandria/ui-kit";
```

Tipos exportados:

- `SelectField` — componente con `forwardRef`.
- `SelectFieldProps` — props del componente.
- `SelectOption` — forma de cada opción cuando se usa prop `options`.

---

# Props

| Prop | Type | Default | Required | Description |
|------|------|----------|----------|-------------|
| `label` | `string` | — | sí | Texto de la etiqueta. Renderizado en `<label class="ds-field__label">` con `htmlFor` apuntando al `id` del select. |
| `options` | `SelectOption[]` | — | no | Lista de opciones. Cuando es truthy, renderiza `<option>` por cada elemento; cuando es falsy, usa `children`. |
| `hint` | `string` | — | no | Texto de ayuda bajo el control. Renderizado en `<p class="ds-field__hint">` con `id="{fieldId}-hint"`. Incluido en `aria-describedby` del select. |
| `error` | `string` | — | no | Mensaje de error bajo el control. Activa clase `ds-field--invalid`, `aria-invalid="true"` e `<p class="ds-field__error">` con `id="{fieldId}-error"`. Incluido en `aria-describedby`. |
| `children` | `ReactNode` | — | no | Contenido del `<select>` cuando `options` no se pasa. Patrón esperado: elementos `<option>` nativos. Ignorado cuando `options` es truthy. |
| `id` | `string` | generado con `useId()` | no | Identificador del `<select>`. Si se omite, el componente genera uno estable. También base para ids de hint y error. |
| `className` | `string` | — | no | Clases adicionales fusionadas en el contenedor raíz `div.ds-field`, no en el `<select>`. |
| `aria-describedby` | `string` | — | no | Id(s) adicionales referenciados por el select. Fusionados con ids de `hint` y `error` en `aria-describedby`. |
| `disabled` | `boolean` | — | no | Atributo nativo `disabled` del `<select>`. Demostrado en story `Disabled`. Sin estilos dedicados en `.ds-field`. |
| `value` | `string \| number \| readonly string[]` | — | no | Valor controlado del select (atributo nativo). |
| `defaultValue` | `string \| number \| readonly string[]` | — | no | Valor inicial no controlado del select (atributo nativo). Demos: `"country"`, `"south"`, `"all"`. |
| `onChange` | `ChangeEventHandler<HTMLSelectElement>` | — | no | Manejador de cambio del select nativo. |
| `...props` | `SelectHTMLAttributes<HTMLSelectElement>` | — | no | Resto de atributos nativos del `<select>` (`name`, `required`, `multiple`, `autoComplete`, `form`, `data-*`, etc.). |

### SelectOption

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `label` | `string` | sí | Texto visible de la opción. Renderizado como contenido del `<option>`. |
| `value` | `string` | sí | Valor del `<option>`. Usado también como `key` en el mapeo de React. |
| `disabled` | `boolean` | no | Atributo `disabled` del `<option>` individual. |

---

# Variants

Describe every public visual variant.

## Default

`SelectField` no expone prop `variant`. Una sola apariencia base implementada con clases BEM `ds-field` y subelementos específicos de select.

| Aspecto | Implementación |
|---------|----------------|
| Contenedor | `div.ds-field` — grid con `gap: 8px`, `color: var(--ds-color-ink)`, `min-width: 0`. |
| Etiqueta | `.ds-field__label` — mono, uppercase, `0.7rem`, color `--ds-color-ink-soft`. |
| Control | `.ds-field__control.ds-field__control--select` — fondo `rgb(0 0 0 / 0.34)`, borde `--ds-color-line`, `border-radius: var(--ds-radius-sm)`, `min-height: 40px`, grid `1fr auto`. |
| Select | `.ds-field__select` — `appearance: none`, fondo transparente, sin borde, mono `0.84rem`, padding horizontal `11px`. |
| Chevron | `.ds-field__chevron` — triángulo CSS con bordes, color `--ds-color-ink-soft`, `margin-right: 12px`, `pointer-events: none`. |
| Hint | `.ds-field__hint` — mono `0.72rem`, color `--ds-color-ink-muted`. |
| Error | `.ds-field__error` — mono `0.72rem`, color `--ds-color-danger`, `font-weight: 600`. |
| Invalid | Clase modificadora `ds-field--invalid` cuando `error` es truthy; borde del control en `--ds-color-danger`. |

Modificadores opcionales vía props (no variantes nombradas): presencia de `hint`, `error` y estado `disabled` nativo.

---

# States

| State | Description |
|--------|-------------|
| Default | Apariencia base de `.ds-field` con control en reposo y chevron visible. |
| Focus-within | `.ds-field__control:focus-within` aplica `border-color: var(--ds-color-teal)` y `box-shadow: var(--ds-focus-ring)`. |
| Focus-visible | `.ds-field__select:focus-visible` aplica `outline: none` (el anillo de foco lo aporta `:focus-within` del control padre). |
| Invalid | Cuando `error` es truthy: clase `ds-field--invalid`, borde rojo en el control, `aria-invalid="true"`, párrafo `.ds-field__error` visible. |
| Disabled | Atributo nativo `disabled` en el `<select>`; sin reglas CSS adicionales en `styles.css` para `.ds-field__select`. Demostrado en story `Disabled`. |
| Option disabled | Cuando `SelectOption.disabled` es `true`: atributo `disabled` en el `<option>` individual (comportamiento nativo del navegador). |

---

# Accessibility

Describe only accessibility behavior implemented by the component.

## Requirements

- Asocia etiqueta visible al select mediante `<label htmlFor={fieldId}>` e `<select id={fieldId}>`.
- Expone `aria-invalid="true"` cuando `error` es truthy.
- Construye `aria-describedby` combinando ids del consumidor, hint y error cuando corresponda.
- Usa semántica nativa de `<select>`; el nombre accesible proviene de la etiqueta asociada y las opciones nativas.
- El chevron decorativo lleva `aria-hidden="true"`; no se anuncia a tecnologías asistivas.
- El consumidor es responsable de gestionar `required`, mensajes de validación y opciones accesibles en la lógica de la aplicación.

### ARIA

| Attribute | Usage |
|-----------|-------|
| `aria-invalid="true"` | Aplicado por el componente en el `<select>` cuando `error` es truthy. Omitido cuando no hay error. |
| `aria-describedby` | Fusiona `aria-describedby` del consumidor, `{fieldId}-hint` (si `hint`) y `{fieldId}-error` (si `error`). |
| `aria-hidden="true"` | Aplicado por el componente en `.ds-field__chevron`. |
| Atributos vía `...props` | El consumidor puede pasar `aria-label`, `aria-required`, etc. en el `<select>`. |

### Keyboard

| Key | Action |
|-----|--------|
| `Space` / `Enter` | Abre el desplegable nativo del select (comportamiento nativo del navegador). |
| Flechas `↑` / `↓` | Navegan entre opciones cuando el select tiene foco (comportamiento nativo). |
| `Tab` | Mueve el foco al/desde el select (comportamiento nativo). |
| Caracteres alfanuméricos | Selección por prefijo en algunos navegadores (comportamiento nativo). |

---

# Responsive Behavior

Document only responsive behavior implemented by the component itself.

`SelectField` no define media queries. El ancho lo define el contenedor padre (`min-width: 0` en `.ds-field` permite encogimiento en grid/flex).

| Contexto | Behavior |
|----------|----------|
| Componente | Sin breakpoints. Altura mínima fija del control (`40px` en `.ds-field__control`). |
| Storybook | Decorator con `minWidth: 420` en `SelectField.stories.tsx`; el ancho visible depende del contenedor externo, no del componente. |
| `CompactFilters` | Grid `repeat(2, minmax(0, 1fr))` definido en el render de la story; el colapso depende del contenedor padre, no de `.ds-field`. |

---

# Composition

## Purpose in Layout

- **Detail** — filtros de alcance operativo (región, estado) en paneles de consola.
- **Action** — no es acción; selección de valor entre opciones predefinidas.
- **Summary** — no aplica; no muestra métricas ni KPIs.
- **Navigation** — no es navegación; la selección dispara lógica del consumidor vía `onChange`.
- **Container** — no envuelve otros componentes; es un campo atómico de formulario.

## Parent

- `div` con estilo inline en `SelectField.stories.tsx` (decorator, `minWidth: 420`).
- `div` con grid en `SelectField.stories.tsx` → `CompactFilters` (`display: grid`, `gridTemplateColumns: repeat(2, minmax(0, 1fr))`).
- Contenedores flex/grid del consumidor en layouts de filtros.

## Children

- Cuando `options` no se pasa: acepta `children` como `<option>` nativos dentro del `<select>`.
- Cuando `options` se pasa: `children` se ignora; las opciones provienen del mapeo de `SelectOption[]`.
- Demos usan exclusivamente prop `options`; no hay story que demuestre el patrón `children`.

## Siblings

- Otro `SelectField` — filtros adyacentes en grid (`CompactFilters`: Region + Estado).
- `TextField`, `Button` — controles complementarios en barras de consola; no integrados internamente en `SelectField`.

## Alternatives

- `TextField` — entrada de texto libre o búsqueda; no ofrece selección entre opciones fijas.
- `SegmentedControl` — selección visible entre segmentos mutuamente excluyentes con botones; no usa `<select>` nativo.
- `Switch` — valor booleano on/off; no lista de opciones múltiples.
- `<select>` nativo estilizado externamente — cuando no se requiere etiqueta, hint ni error del design system (no provisto por el kit).

---

# Related Components

| Component | Relationship |
|-----------|--------------|
| `TextField` | Alternativa para entrada de texto libre; comparte clases `ds-field`, label, hint y error; no soporta `options` ni `<select>`. |
| `SegmentedControl` | Alternativa para selección entre pocos segmentos visibles; no comparte estructura `ds-field`. |
| `Switch` | Control booleano distinto; no lista de opciones. |
| `Button` | Acción adyacente en layouts de consola; no compuesto internamente por `SelectField`. |
| `Card` | Contenedor potencial para filtros; no hay demo en el repositorio que coloque `SelectField` dentro de `Card`. |

---

# Content Guidelines

## Labels

- `label`: texto corto en mayúsculas visuales vía CSS (`text-transform: uppercase` en `.ds-field__label`); no es obligatorio escribir en mayúsculas en la prop.
- Demos usan español: `"Region"`, `"Estado"`.
- Debe describir la dimensión que filtra o selecciona (p. ej. región geográfica, estado operativo).

## Values

- Cada opción requiere `label` (texto visible) y `value` (valor enviado en formularios y estado).
- Demos usan valores en minúsculas o camelCase: `"country"`, `"center"`, `"all"`, `"waiting"`, `"critical"`.
- `defaultValue` establece la opción inicial: `"country"` en `Playground`, `"south"` y `"all"` en `CompactFilters`.
- `hint` complementa con contexto del filtro: `"Filtro de alcance operativo."` (`Playground`).
- `error` comunica fallo de validación: `"Selecciona una region disponible."` (`Invalid`).

## Icons

- No hay slot de icono (`iconLeft`, `iconRight` ni similar).
- El indicador visual de desplegable es `.ds-field__chevron`, un triángulo CSS con `aria-hidden="true"`; no acepta iconos personalizados del consumidor.

## Localization

- Las stories usan español. El componente no impone idioma; cualquier string es válido en `label`, `hint`, `error` y en `SelectOption.label`.

---

# Examples

## Basic

```tsx
import { SelectField } from "@alejandria/ui-kit";

<SelectField
  label="Region"
  options={[
    { label: "Todo el pais", value: "country" },
    { label: "Zona centro", value: "center" },
    { label: "Zona sur", value: "south" },
    { label: "Zona norte", value: "north" }
  ]}
  defaultValue="country"
  hint="Filtro de alcance operativo."
/>
```

## Variant

`SelectField` no expone prop `variant`. El estado inválido se controla con `error`:

```tsx
import { SelectField } from "@alejandria/ui-kit";

<SelectField
  label="Region"
  options={[
    { label: "Todo el pais", value: "country" },
    { label: "Zona centro", value: "center" },
    { label: "Zona sur", value: "south" },
    { label: "Zona norte", value: "north" }
  ]}
  defaultValue="country"
  error="Selecciona una region disponible."
/>
```

## Composition

```tsx
import { SelectField } from "@alejandria/ui-kit";

<div style={{ display: "grid", gap: 14, gridTemplateColumns: "repeat(2, minmax(0, 1fr))" }}>
  <SelectField
    label="Region"
    options={[
      { label: "Todo el pais", value: "country" },
      { label: "Zona centro", value: "center" },
      { label: "Zona sur", value: "south" },
      { label: "Zona norte", value: "north" }
    ]}
    defaultValue="south"
  />
  <SelectField
    label="Estado"
    options={[
      { label: "Todas", value: "all" },
      { label: "En espera", value: "waiting" },
      { label: "Asignadas", value: "assigned" },
      { label: "Criticas", value: "critical" }
    ]}
    defaultValue="all"
  />
</div>
```

---

# Reasoning Examples

## User Request

Filtro de región geográfica con opciones predefinidas.

### Recommended Components

- `SelectField` con prop `options`

### Why

Patrón de `SelectField.stories.tsx` → `Playground` con `countryOptions` y `defaultValue="country"`.

---

## User Request

Barra compacta con filtros de región y estado lado a lado.

### Recommended Components

- Dos `SelectField` en grid del consumidor

### Why

`SelectField.stories.tsx` → `CompactFilters` renderiza Region y Estado en `gridTemplateColumns: repeat(2, minmax(0, 1fr))`.

---

## User Request

Campo deshabilitado mientras se cargan opciones.

### Recommended Components

- `SelectField` con `disabled`

### Why

`SelectField.stories.tsx` → `Disabled` pasa `disabled={true}` al select nativo.

---

## User Request

Búsqueda por texto libre (ID, zona o dependencia).

### Recommended Components

- `TextField`

### Why

`TextField` captura texto arbitrario con `iconLeft` opcional; `SelectField` solo permite elegir entre opciones declaradas.

---

# Design Tokens

Only include tokens directly consumed by the component.

| Token | Category | Usage |
|--------|----------|-------|
| `--ds-color-ink` | color | `color` de `.ds-field`; `color` de `.ds-field__select` |
| `--ds-color-ink-soft` | color | `color` de `.ds-field__label`; `border-top` de `.ds-field__chevron` |
| `--ds-color-ink-muted` | color | `color` de `.ds-field__hint` |
| `--ds-color-line` | color | `border-color` de `.ds-field__control` |
| `--ds-color-teal` | color | `border-color` de `.ds-field__control:focus-within` |
| `--ds-color-danger` | color | `color` de `.ds-field__error`; `border-color` de `.ds-field--invalid .ds-field__control` |
| `--ds-font-mono` | typography | `font-family` de label, select, hint y error |
| `--ds-radius-sm` | radius | `border-radius` de `.ds-field__control` |
| `--ds-focus-ring` | shadow | `box-shadow` en `.ds-field__control:focus-within` |

Nota: el fondo de `.ds-field__control` (`rgb(0 0 0 / 0.34)`) está hardcodeado; no usa token con nombre. Las clases compartidas `.ds-field`, `.ds-field__label`, `.ds-field__hint` y `.ds-field__error` también las consume `TextField`.

---

# Implementation Notes

This section is intended for maintainers extending the component.

Read after:

1. Constraints
2. Public API
3. Composition

## Source File

```text
packages/ui/src/components/SelectField.tsx
```

## Dependencies

- `forwardRef`, `useId` from `react`
- `cn()` from `packages/ui/src/utils/cn.ts`
- `styles.css` (clases `ds-field`, `ds-field--invalid`, `ds-field__label-row`, `ds-field__label`, `ds-field__control`, `ds-field__control--select`, `ds-field__select`, `ds-field__chevron`, `ds-field__hint`, `ds-field__error`)

## DOM Structure

```text
div.ds-field[.ds-field--invalid]
├── div.ds-field__label-row
│   └── label.ds-field__label[htmlFor={fieldId}]
│       └── {label}
├── div.ds-field__control.ds-field__control--select
│   ├── select.ds-field__select[id={fieldId}][aria-invalid][aria-describedby]
│   │   ├── option (desde options[] o children)
│   │   └── ...
│   └── span.ds-field__chevron[aria-hidden="true"]
├── p.ds-field__hint[id={fieldId}-hint] (solo si hint)
│   └── {hint}
└── p.ds-field__error[id={fieldId}-error] (solo si error)
    └── {error}
```

---

# Known Limitations

- No expone prop `variant`, `size`, `iconLeft` ni `action`.
- `className` se aplica al contenedor raíz, no al `<select>`.
- Sin estilos CSS para estado `disabled` en `.ds-field__select` o `.ds-field__control--select`.
- Cuando `options` es truthy, `children` se ignora por completo.
- No hay story ni demo que use el patrón `children` con `<option>` nativos.
- `hint` y `error` pueden mostrarse simultáneamente; no hay lógica de exclusión mutua.
- No valida ni impide envío de formularios; `error` es solo presentacional y ARIA.
- Fondo del control hardcodeado; migración incompleta a tokens.
- Sin uso en `apps/web/src/App.tsx` ni `Components.stories.tsx` en el repositorio actual.
- Sin tests unitarios ni de integración en el repositorio.
- Sin documentación JSDoc en `SelectField.tsx` según convenciones del repositorio.
- `SelectField.displayName` es `"SelectField"` para depuración en React DevTools; no afecta la API pública.

---

# Future Improvements

- [ ] Estilos visuales para `:disabled` en `.ds-field__select` y `.ds-field__control--select`
- [ ] Story que demuestre el patrón `children` con `<option>` nativos
- [ ] Documentación JSDoc en `SelectField.tsx` según convenciones del repositorio
- [ ] Story de uso controlado con `value`/`onChange`
- [ ] Migrar fondo hardcodeado del control a tokens
- [ ] Demo en `apps/web` o `Components.stories.tsx` junto a `TextField` en barra de filtros
- [ ] Vincular diseño Figma cuando esté disponible

---

# Changelog

| Version | Change |
|----------|--------|
| 0.1.0 | Implementación inicial de `SelectField`, `SelectFieldProps`, `SelectOption` con estilos `ds-field`, `ds-field__control--select`, `ds-field__select`, `ds-field__chevron`, `forwardRef`, `useId` para ids de hint/error y stories en Storybook (`Playground`, `Disabled`, `Invalid`, `CompactFilters`). |
