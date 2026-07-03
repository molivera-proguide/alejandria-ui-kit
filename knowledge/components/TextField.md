---
id: text-field
name: TextField
category: input
status: draft
since: 0.1.0

package: "@alejandria/ui-kit"
export: packages/ui/src/components/TextField.tsx

figma: https://www.figma.com/file/PLACEHOLDER
storybook: Alejandria/TextField

aliases:
  - campo de texto
  - input
  - text input
keywords:
  - TextField
  - input
  - campo
  - búsqueda
  - label
  - hint
  - error
  - iconLeft
  - action
  - TextFieldProps
tags:
  - input
  - forms
  - interactive
  - molecule

last_reviewed: 2026-07-02
---

# TextField

## Purpose

Ofrece un campo de entrada de texto con etiqueta, mensajes de ayuda o error, icono opcional a la izquierda y acción auxiliar en consolas del Alejandria UI Kit.

Describe:

- **Responsabilidad principal:** capturar texto del usuario mediante un `<input>` nativo con presentación coherente del design system (etiqueta, control, hint y error).
- **Problema que resuelve:** unificar la estructura visual y la asociación accesible label–input sin reimplementar CSS de campos en cada vista.
- **Alcance:** componente de formulario basado en `<input>` con `forwardRef`; el consumidor provee `label`, atributos nativos del input vía `...props` y contenido opcional en slots `iconLeft` y `action`.

Exclude:

- API details
- Implementation details
- Usage examples
- Composition

---

# Behavioral Contract

Documenta los comportamientos públicos en los que el consumidor puede confiar.

## This component guarantees

- Renderizado como contenedor `div.ds-field` con `<input class="ds-field__input">` nativo en el interior.
- `label` siempre renderizado en `<label class="ds-field__label">` asociado al input mediante `htmlFor` e `id` coincidentes.
- `id` del input: valor de la prop `id` si se provee; de lo contrario, identificador estable generado con `useId()`.
- Clase `ds-field--invalid` en el contenedor raíz cuando `error` es truthy.
- `aria-invalid="true"` en el `<input>` solo cuando `error` es truthy; omitido cuando no hay error.
- `aria-describedby` en el `<input>` fusiona, en orden, el valor de la prop `aria-describedby` del consumidor, el id del hint (`{fieldId}-hint`) y el id del error (`{fieldId}-error`); omitido si ninguno aplica.
- `hint` renderizado en `<p class="ds-field__hint">` con `id="{fieldId}-hint"` solo cuando `hint` es truthy.
- `error` renderizado en `<p class="ds-field__error">` con `id="{fieldId}-error"` solo cuando `error` es truthy.
- `iconLeft` renderizado en `<span class="ds-field__icon">` dentro de `.ds-field__control` solo cuando `iconLeft` es truthy.
- `action` renderizado en `<div class="ds-field__action">` dentro de `.ds-field__label-row` solo cuando `action` es truthy.
- Fusión de `className` externa con clases base en el contenedor raíz (`div.ds-field`) mediante `cn()`.
- Repaso de atributos nativos de `InputHTMLAttributes<HTMLInputElement>` al `<input>` vía `...props` (`placeholder`, `disabled`, `type`, `value`, `onChange`, `name`, `required`, `readOnly`, etc.).
- Reenvío de `ref` al elemento `<input>` nativo.

## This component never

- Valida, filtra ni transforma el valor introducido por sí mismo.
- Renderiza `textarea`, `<select>` ni otros controles de entrada.
- Importa ni compone internamente `Button`, `SelectField` ni otros componentes del kit (el consumidor los pasa como `ReactNode` en slots).
- Expone prop `variant`, `size`, `iconRight`, `fullWidth` ni tipos auxiliares de variante.
- Aplica `aria-hidden` en `iconLeft` ni en el slot `action`.
- Establece `type` por defecto en el input (aplica el valor por defecto del navegador, `"text"`).
- Define estilos CSS para `:disabled` en `.ds-field` o `.ds-field__input`.
- Aplica media queries ni comportamiento responsivo propio.
- Oculta el mensaje de `hint` cuando `error` está presente (ambos pueden renderizarse simultáneamente).

---

# Constraints

Estas reglas tienen la máxima prioridad.

Si algún ejemplo entra en conflicto con estas reglas,
siempre seguir estas reglas.

## Required

- Importar desde `@alejandria/ui-kit` y cargar `styles.css` del paquete (`@alejandria/ui-kit/style.css`).
- Proveer `label` (prop obligatoria de tipo `string`).
- Gestionar estado del valor (`value`/`onChange` o `defaultValue`) en el consumidor; el componente no es controlado por defecto.

## Forbidden

- Inventar props que no existan en `TextFieldProps` (`variant`, `size`, `iconRight`, `helperText`, `state`, etc.).
- Asumir que `className` se aplica al `<input>` (se aplica al contenedor `div.ds-field`).
- Asumir validación integrada: pasar `error` solo refleja estado visual y ARIA; la lógica de validación es responsabilidad del consumidor.
- Usar `TextField` como sustituto de `SelectField` para selección entre opciones predefinidas.
- Anidar otro campo de formulario completo dentro de `iconLeft` o `action`.

## Recommendations

- Usar `iconLeft` con iconos de `lucide-react` (demos usan `<Search />`) para campos de búsqueda, según `TextField.stories.tsx`, `Components.stories.tsx` y `apps/web/src/App.tsx`.
- Pasar `Button size="sm" variant="ghost"` en `action` para acciones auxiliares de la etiqueta (p. ej. "Limpiar"), según `TextField.stories.tsx` → `WithAction`.
- Colocar junto a `Button` en barras de herramientas (`.ops-command__tools` en `apps/web/src/App.tsx`).
- Usar `hint` para texto de ayuda persistente y `error` para mensajes de validación, según stories `Playground` e `Invalid`.
- Combinar con `Card` en `children` para búsqueda contextual dentro de un panel (`Components.stories.tsx`).

---

# Category

| Field | Value |
|--------|-------|
| Type | molecule |
| Group | Forms |
| Package | @alejandria/ui-kit |
| Export | packages/ui/src/components/TextField.tsx |

---

# Public API

Solo documenta la API pública.

```tsx
import {
  TextField,
  type TextFieldProps
} from "@alejandria/ui-kit";
```

Tipos exportados:

- `TextField` — componente con `forwardRef`.
- `TextFieldProps` — props del componente.

---

# Props

| Prop | Type | Default | Required | Description |
|------|------|----------|----------|-------------|
| `label` | `string` | — | sí | Texto de la etiqueta. Renderizado en `<label class="ds-field__label">` con `htmlFor` apuntando al `id` del input. |
| `hint` | `string` | — | no | Texto de ayuda bajo el control. Renderizado en `<p class="ds-field__hint">` con `id="{fieldId}-hint"`. Incluido en `aria-describedby` del input. |
| `error` | `string` | — | no | Mensaje de error bajo el control. Activa clase `ds-field--invalid`, `aria-invalid="true"` e `<p class="ds-field__error">` con `id="{fieldId}-error"`. Incluido en `aria-describedby`. |
| `iconLeft` | `ReactNode` | — | no | Contenido a la izquierda del input dentro de `.ds-field__control`. Renderizado en `<span class="ds-field__icon">` si es truthy. |
| `action` | `ReactNode` | — | no | Contenido alineado a la derecha de la fila de etiqueta. Renderizado en `<div class="ds-field__action">` si es truthy. |
| `id` | `string` | generado con `useId()` | no | Identificador del `<input>`. Si se omite, el componente genera uno estable. También base para ids de hint y error. |
| `className` | `string` | — | no | Clases adicionales fusionadas en el contenedor raíz `div.ds-field`, no en el `<input>`. |
| `aria-describedby` | `string` | — | no | Id(s) adicionales referenciados por el input. Fusionados con ids de `hint` y `error` en `aria-describedby`. |
| `placeholder` | `string` | — | no | Placeholder nativo del `<input>`. Demos: `"ID, zona o dependencia"`. |
| `disabled` | `boolean` | — | no | Atributo nativo `disabled` del `<input>`. Sin estilos dedicados en `.ds-field`. |
| `type` | `string` | — | no | Atributo nativo `type` del `<input>`. No se establece por defecto en el componente. |
| `value` | `string \| number \| readonly string[]` | — | no | Valor controlado del input (atributo nativo). |
| `defaultValue` | `string \| number \| readonly string[]` | — | no | Valor inicial no controlado del input (atributo nativo). |
| `onChange` | `ChangeEventHandler<HTMLInputElement>` | — | no | Manejador de cambio del input nativo. |
| `...props` | `InputHTMLAttributes<HTMLInputElement>` | — | no | Resto de atributos nativos del `<input>` (`name`, `required`, `readOnly`, `autoComplete`, `min`, `max`, `pattern`, `data-*`, etc.). |

---

# Variants

Describe every public visual variant.

## Default

`TextField` no expone prop `variant`. Una sola apariencia base implementada con clases BEM `ds-field` y subelementos.

| Aspecto | Implementación |
|---------|----------------|
| Contenedor | `div.ds-field` — grid con `gap: 8px`, `color: var(--ds-color-ink)`, `min-width: 0`. |
| Etiqueta | `.ds-field__label` — mono, uppercase, `0.7rem`, color `--ds-color-ink-soft`. |
| Control | `.ds-field__control` — fondo `rgb(0 0 0 / 0.34)`, borde `--ds-color-line`, `border-radius: var(--ds-radius-sm)`, `min-height: 40px`, grid de dos columnas (`auto 1fr`). |
| Input | `.ds-field__input` — fondo transparente, sin borde, mono `0.84rem`, padding horizontal `11px`. |
| Icono | `.ds-field__icon` — contenedor 17×17 px, margen izquierdo `11px`, color `--ds-color-ink-soft`. |
| Hint | `.ds-field__hint` — mono `0.72rem`, color `--ds-color-ink-muted`. |
| Error | `.ds-field__error` — mono `0.72rem`, color `--ds-color-danger`, `font-weight: 600`. |
| Invalid | Clase modificadora `ds-field--invalid` cuando `error` es truthy; borde del control en `--ds-color-danger`. |

Modificadores opcionales vía props (no variantes nombradas): presencia de `iconLeft`, `action`, `hint` y `error`.

---

# States

| State | Description |
|--------|-------------|
| Default | Apariencia base de `.ds-field` con control en reposo. |
| Focus-within | `.ds-field__control:focus-within` aplica `border-color: var(--ds-color-teal)` y `box-shadow: var(--ds-focus-ring)`. |
| Focus-visible | `.ds-field__input:focus-visible` aplica `box-shadow: var(--ds-focus-ring)` y `outline: none`. |
| Invalid | Cuando `error` es truthy: clase `ds-field--invalid`, borde rojo en el control, `aria-invalid="true"`, párrafo `.ds-field__error` visible. |
| Disabled | Atributo nativo `disabled` en el `<input>`; sin reglas CSS adicionales en `styles.css` para `.ds-field`. |
| With icon | Cuando `iconLeft` es truthy: columna adicional en el grid del control con `.ds-field__icon`. |
| With action | Cuando `action` es truthy: slot `.ds-field__action` visible en la fila de etiqueta. |

---

# Accessibility

Describe only accessibility behavior implemented by the component.

## Requirements

- Asocia etiqueta visible al input mediante `<label htmlFor={fieldId}>` e `<input id={fieldId}>`.
- Expone `aria-invalid="true"` cuando `error` es truthy.
- Construye `aria-describedby` combinando ids del consumidor, hint y error cuando corresponda.
- Usa semántica nativa de `<input>`; el nombre accesible proviene de la etiqueta asociada.
- Los iconos en `.ds-field__icon` y el contenido de `action` no reciben `aria-hidden` del componente.
- El consumidor es responsable de marcar iconos decorativos, proveer nombres accesibles en controles del slot `action` y gestionar `required` / mensajes de validación en la lógica de la aplicación.

### ARIA

| Attribute | Usage |
|-----------|-------|
| `aria-invalid="true"` | Aplicado por el componente en el `<input>` cuando `error` es truthy. Omitido cuando no hay error. |
| `aria-describedby` | Fusiona `aria-describedby` del consumidor, `{fieldId}-hint` (si `hint`) y `{fieldId}-error` (si `error`). |
| Atributos vía `...props` | El consumidor puede pasar `aria-label`, `aria-required`, `aria-autocomplete`, etc. en el `<input>`. |

### Keyboard

| Key | Action |
|-----|--------|
| Caracteres imprimibles | Introducen texto en el input (comportamiento nativo). |
| `Backspace` / `Delete` | Editan el valor (comportamiento nativo). |
| `Tab` | Mueve el foco al/desde el input; el foco puede pasar también a controles en el slot `action` (comportamiento nativo del DOM). |
| `Enter` | Comportamiento nativo del input según contexto de formulario. |

---

# Responsive Behavior

Document only responsive behavior implemented by the component itself.

`TextField` no define media queries. El ancho lo define el contenedor padre (`min-width: 0` en `.ds-field` permite encogimiento en grid/flex).

| Contexto | Behavior |
|----------|----------|
| Componente | Sin breakpoints. Altura mínima fija del control (`40px` en `.ds-field__control`). |
| Storybook | Decorator con `minWidth: 420` en `TextField.stories.tsx`; el ancho visible depende del contenedor externo, no del componente. |
| `apps/web` | Campo en `.ops-command__tools`; el colapso en viewport estrecho lo define CSS del consumidor en `apps/web/src/app.css`, no `.ds-field`. |

---

# Composition

## Purpose in Layout

- **Detail** — captura de búsqueda o filtro contextual dentro de un panel (`Card` → `children`).
- **Action** — barra de herramientas de consola junto a botones de acción (`apps/web` → `.ops-command__tools`).
- **Summary** — no aplica; no muestra métricas ni KPIs.
- **Navigation** — no es navegación; entrada de texto con acciones delegadas al consumidor.
- **Container** — no envuelve otros componentes; es un campo atómico de formulario con slots opcionales.

## Parent

- `div` con estilo inline en `TextField.stories.tsx` (decorator, `minWidth: 420`).
- `Card` → `children` en `Components.stories.tsx` → `OperationsConsole`.
- `.ops-command__tools` en `apps/web/src/App.tsx`.
- Contenedores flex/grid del consumidor en layouts de consola.

## Children

- No acepta `children`; contenido opcional solo vía `iconLeft` y `action` como `ReactNode`.
- Demos pasan `<Search />` de `lucide-react` en `iconLeft`.
- Demos pasan `<Button size="sm" variant="ghost">` en `action` (`TextField.stories.tsx` → `WithAction`).

## Siblings

- `Button` — acciones adyacentes en la misma barra de herramientas (`Filtros`, `Asignar` junto al campo de búsqueda en `apps/web`).
- `Badge` — contexto de estado en la misma vista de consola, no integrado en `TextField`.
- `Card`, `ProgressRing` — panel y visualización de avance en el mismo bloque de `Components.stories.tsx`.

## Alternatives

- `SelectField` — selección entre opciones predefinidas con la misma estructura `ds-field` (label, hint, error) pero `<select>` nativo; no soporta `iconLeft` ni `action`.
- Input nativo estilizado externamente — cuando no se requiere etiqueta, hint ni error del design system (no provisto por el kit).

---

# Related Components

| Component | Relationship |
|-----------|--------------|
| `Button` | Usado en slot `action` en `TextField.stories.tsx` → `WithAction`; no importado ni compuesto internamente por `TextField`. |
| `SelectField` | Alternativa para selección; comparte clases `ds-field`, label, hint y error; implementación separada con `<select>`. |
| `Card` | Contenedor padre en `Components.stories.tsx`; `TextField` va en `children` para búsqueda dentro del panel. |
| `Switch` | Control de entrada distinto (booleano); no comparte estructura `ds-field` con `TextField`. |
| `SegmentedControl` | Selección entre segmentos mutuamente excluyentes; no sustituye entrada de texto libre. |
| `AlertBanner` | Componente de feedback de consola; no relacionado funcionalmente con campos de texto. |

---

# Content Guidelines

## Labels

- `label`: texto corto en mayúsculas visuales vía CSS (`text-transform: uppercase` en `.ds-field__label`); no es obligatorio escribir en mayúsculas en la prop.
- Demos usan español: `"Busqueda"`, `"Buscar tarea"`.
- Debe describir el propósito del campo (p. ej. búsqueda por ID, zona o dependencia).

## Values

- El valor lo gestiona el consumidor mediante `value`/`onChange` o `defaultValue`.
- Demos usan `placeholder="ID, zona o dependencia"` sin valor inicial fijo.
- `hint` complementa con reglas de entrada: `"Acepta IDs de tarea, nombres de zona o dependencia."` (`TextField.stories.tsx` → `Playground`).
- `error` comunica fallo de validación: `"No se encontro una tarea con ese identificador."` (`TextField.stories.tsx` → `Invalid`).

## Icons

- Pasar iconos como `ReactNode` en `iconLeft`.
- Demos usan `Search` de `lucide-react`.
- `.ds-field__icon` fija contenedor a 17×17 px; `.ds-field__icon svg` ocupa el 100%.
- No hay slot `iconRight` implementado.

## Localization

- Las stories y `apps/web` usan español. El componente no impone idioma; cualquier string es válido en `label`, `hint`, `error` y `placeholder`.

---

# Examples

## Basic

```tsx
import { TextField } from "@alejandria/ui-kit";

<TextField
  label="Busqueda"
  placeholder="ID, zona o dependencia"
  hint="Acepta IDs de tarea, nombres de zona o dependencia."
/>
```

## Variant

`TextField` no expone prop `variant`. El estado inválido se controla con `error`:

```tsx
import { Search } from "lucide-react";
import { TextField } from "@alejandria/ui-kit";

<TextField
  label="Busqueda"
  placeholder="ID, zona o dependencia"
  iconLeft={<Search />}
  error="No se encontro una tarea con ese identificador."
/>
```

## Composition

```tsx
import { Search } from "lucide-react";
import { Button, TextField } from "@alejandria/ui-kit";

<div className="ops-command__tools">
  <TextField
    label="Busqueda"
    placeholder="ID, zona o dependencia"
    iconLeft={<Search />}
  />
  <Button variant="secondary">Filtros</Button>
  <Button>Asignar</Button>
</div>
```

```tsx
import { Search } from "lucide-react";
import { Button, TextField } from "@alejandria/ui-kit";

<TextField
  label="Busqueda"
  placeholder="ID, zona o dependencia"
  iconLeft={<Search />}
  action={
    <Button size="sm" variant="ghost">
      Limpiar
    </Button>
  }
/>
```

---

# Reasoning Examples

## User Request

Campo de búsqueda en la barra superior de la consola operativa.

### Recommended Components

- `TextField` con `iconLeft={<Search />}` + `Button` adyacentes

### Why

Patrón de `apps/web/src/App.tsx` → `.ops-command__tools` y `TextField.stories.tsx` → `WithIcon`.

---

## User Request

Búsqueda contextual dentro del cuerpo de un panel de misión.

### Recommended Components

- `Card` con `TextField` en `children`

### Why

`Components.stories.tsx` → `OperationsConsole` coloca `TextField` junto a `ProgressRing` dentro de `Card`.

---

## User Request

Acción "Limpiar" junto a la etiqueta del campo.

### Recommended Components

- `TextField` con `action={<Button size="sm" variant="ghost">...</Button>}`

### Why

`TextField.stories.tsx` → `WithAction` demuestra el slot `action` con `Button`.

---

## User Request

Seleccionar una opción de una lista fija (zona, estado, categoría).

### Recommended Components

- `SelectField`

### Why

`SelectField` comparte estructura `ds-field` para label, hint y error pero renderiza `<select>` nativo con opciones; `TextField` solo acepta entrada de texto libre.

---

# Design Tokens

Only include tokens directly consumed by the component.

| Token | Category | Usage |
|--------|----------|-------|
| `--ds-color-ink` | color | `color` de `.ds-field`; `color` de `.ds-field__input` |
| `--ds-color-ink-soft` | color | `color` de `.ds-field__label` y `.ds-field__icon` |
| `--ds-color-ink-muted` | color | `color` de `.ds-field__hint` |
| `--ds-color-line` | color | `border-color` de `.ds-field__control` |
| `--ds-color-teal` | color | `border-color` de `.ds-field__control:focus-within` |
| `--ds-color-danger` | color | `color` de `.ds-field__error`; `border-color` de `.ds-field--invalid .ds-field__control` |
| `--ds-font-mono` | typography | `font-family` de label, input, hint y error |
| `--ds-radius-sm` | radius | `border-radius` de `.ds-field__control` |
| `--ds-focus-ring` | shadow | `box-shadow` en `.ds-field__control:focus-within` y `.ds-field__input:focus-visible` |

Nota: el fondo de `.ds-field__control` (`rgb(0 0 0 / 0.34)`) y el color de placeholder (`rgb(169 179 176 / 0.5)`) están hardcodeados; no usan tokens con nombre.

---

# Implementation Notes

This section is intended for maintainers extending the component.

Read after:

1. Constraints
2. Public API
3. Composition

## Source File

```text
packages/ui/src/components/TextField.tsx
```

## Dependencies

- `forwardRef`, `useId` from `react`
- `cn()` from `packages/ui/src/utils/cn.ts`
- `styles.css` (clases `ds-field`, `ds-field--invalid`, `ds-field__label-row`, `ds-field__label`, `ds-field__action`, `ds-field__control`, `ds-field__icon`, `ds-field__input`, `ds-field__hint`, `ds-field__error`)

## DOM Structure

```text
div.ds-field[.ds-field--invalid]
├── div.ds-field__label-row
│   ├── label.ds-field__label[htmlFor={fieldId}]
│   │   └── {label}
│   └── div.ds-field__action (solo si action)
│       └── {action}
├── div.ds-field__control
│   ├── span.ds-field__icon (solo si iconLeft)
│   │   └── {iconLeft}
│   └── input.ds-field__input[id={fieldId}][aria-invalid][aria-describedby]
├── p.ds-field__hint[id={fieldId}-hint] (solo si hint)
│   └── {hint}
└── p.ds-field__error[id={fieldId}-error] (solo si error)
    └── {error}
```

---

# Known Limitations

- No expone prop `variant`, `size` ni `iconRight`.
- `className` se aplica al contenedor raíz, no al `<input>`.
- Sin estilos CSS para estado `disabled` en `.ds-field` o `.ds-field__input`.
- `iconLeft` y contenido de `action` no reciben `aria-hidden` automáticamente.
- `hint` y `error` pueden mostrarse simultáneamente; no hay lógica de exclusión mutua.
- No valida ni impide envío de formularios; `error` es solo presentacional y ARIA.
- Fondo del control y color de placeholder hardcodeados; migración incompleta a tokens.
- Sin tests unitarios ni de integración en el repositorio.
- Sin documentación JSDoc en `TextField.tsx` según convenciones del repositorio.
- `TextField.displayName` es `"TextField"` para depuración en React DevTools; no afecta la API pública.

---

# Future Improvements

- [ ] Estilos visuales para `:disabled` en `.ds-field__input` y `.ds-field__control`
- [ ] `aria-hidden="true"` en `.ds-field__icon` cuando la etiqueta describe el campo
- [ ] Prop o convención para aplicar `className` también al `<input>`
- [ ] Documentación JSDoc en `TextField.tsx` según convenciones del repositorio
- [ ] Story de campo deshabilitado y de uso controlado con `value`/`onChange`
- [ ] Migrar colores hardcodeados del control y placeholder a tokens
- [ ] Vincular diseño Figma cuando esté disponible

---

# Changelog

| Version | Change |
|----------|--------|
| 0.1.0 | Implementación inicial de `TextField`, `TextFieldProps` con estilos `ds-field`, `forwardRef`, `useId` para ids de hint/error y stories en Storybook (`Playground`, `WithIcon`, `WithAction`, `Invalid`). Uso en `Components.stories.tsx` y `apps/web/src/App.tsx`. |
