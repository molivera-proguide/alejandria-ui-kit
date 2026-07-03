---
id: switch
name: Switch
category: input
status: draft
since: 0.1.0

package: "@alejandria/ui-kit"
export: packages/ui/src/components/Switch.tsx

figma: https://www.figma.com/file/PLACEHOLDER
storybook: Alejandria/Switch

aliases:
  - interruptor
  - toggle
  - conmutador
keywords:
  - Switch
  - toggle
  - checkbox
  - boolean
  - label
  - description
  - defaultChecked
  - SwitchProps
tags:
  - input
  - forms
  - interactive
  - molecule

last_reviewed: 2026-07-02
---

# Switch

## Purpose

Ofrece un control booleano on/off con etiqueta y descripción opcional en consolas del Alejandria UI Kit.

Describe:

- **Responsabilidad principal:** capturar un valor booleano del usuario mediante un `<input type="checkbox">` nativo con apariencia de interruptor (track + thumb).
- **Problema que resuelve:** unificar la presentación de toggles de configuración sin reimplementar CSS de switch en cada vista.
- **Alcance:** componente interactivo basado en checkbox con `forwardRef`; el consumidor provee `label`, `description` opcional y atributos nativos del input vía `...props`.

Exclude:

- API details
- Implementation details
- Usage examples
- Composition

---

# Behavioral Contract

Documenta los comportamientos públicos en los que el consumidor puede confiar.

## This component guarantees

- Renderizado como `<label class="ds-switch">` envolvente con `htmlFor` apuntando al `id` del input.
- `<input class="ds-switch__input" type="checkbox">` siempre con `type="checkbox"` fijo; no configurable por el consumidor.
- `label` siempre renderizado en `<span class="ds-switch__label">` dentro de `.ds-switch__copy`.
- `description` renderizado en `<span class="ds-switch__description">` solo cuando `description` es truthy.
- `id` del input: valor de la prop `id` si se provee; de lo contrario, identificador estable generado con `useId()`.
- Track visual en `<span class="ds-switch__track" aria-hidden="true">` con thumb en `<span class="ds-switch__thumb">` inmediatamente después del input en el DOM.
- Estado checked reflejado por el atributo nativo `checked` del checkbox; estilos visuales aplicados vía `.ds-switch__input:checked + .ds-switch__track`.
- Fusión de `className` externa con clase base en el `<label>` raíz mediante `cn()`.
- Repaso de atributos nativos de `InputHTMLAttributes<HTMLInputElement>` (excepto `type`) al `<input>` vía `...props` (`checked`, `defaultChecked`, `disabled`, `onChange`, `name`, `value`, `required`, etc.).
- Reenvío de `ref` al elemento `<input>` nativo.

## This component never

- Renderiza `role="switch"` ni cambia la semántica del checkbox nativo.
- Expone prop `variant`, `size`, `hint`, `error`, `iconLeft` ni slots de icono.
- Permite sobrescribir `type` (omitido de `SwitchProps` y fijado a `"checkbox"`).
- Asocia `description` mediante `aria-describedby` (solo texto visible dentro del label).
- Aplica `aria-hidden` en el input (solo en `.ds-switch__track`).
- Valida, persiste ni sincroniza estado por sí mismo.
- Importa ni compone internamente otros componentes del kit.
- Define estilos CSS para `:disabled` en `.ds-switch` o subelementos.
- Aplica media queries ni comportamiento responsivo propio.

---

# Constraints

Estas reglas tienen la máxima prioridad.

Si algún ejemplo entra en conflicto con estas reglas,
siempre seguir estas reglas.

## Required

- Importar desde `@alejandria/ui-kit` y cargar `styles.css` del paquete (`@alejandria/ui-kit/style.css`).
- Proveer `label` (prop obligatoria de tipo `string`).
- Gestionar estado booleano (`checked`/`onChange` o `defaultChecked`) en el consumidor; el componente no es controlado por defecto.

## Forbidden

- Inventar props que no existan en `SwitchProps` (`variant`, `size`, `hint`, `error`, `onToggle`, etc.).
- Pasar `type` al componente (no forma parte de la API pública).
- Asumir semántica `role="switch"` o comportamiento distinto al checkbox nativo.
- Usar `Switch` para selección entre más de dos opciones mutuamente excluyentes (usar `SegmentedControl` o `SelectField`).
- Asumir que `description` se anuncia como descripción accesible separada del nombre (no hay `aria-describedby` implementado).

## Recommendations

- Usar `defaultChecked` para valor inicial en configuraciones, según `Switch.stories.tsx` → `Playground` y `Stack`.
- Agrupar switches relacionados en grid vertical del consumidor, según `Switch.stories.tsx` → `Stack`.
- Complementar `label` con `description` para aclarar el efecto del toggle (p. ej. "Sincroniza eventos entrantes.").
- Usar `disabled` en el input nativo para estados no editables, según `Switch.stories.tsx` → `Disabled`.

---

# Category

| Field | Value |
|--------|-------|
| Type | molecule |
| Group | Forms |
| Package | @alejandria/ui-kit |
| Export | packages/ui/src/components/Switch.tsx |

---

# Public API

Solo documenta la API pública.

```tsx
import {
  Switch,
  type SwitchProps
} from "@alejandria/ui-kit";
```

Tipos exportados:

- `Switch` — componente con `forwardRef`.
- `SwitchProps` — props del componente.

---

# Props

| Prop | Type | Default | Required | Description |
|------|------|----------|----------|-------------|
| `label` | `string` | — | sí | Texto principal del control. Renderizado en `<span class="ds-switch__label">`. Forma parte del contenido del `<label>` envolvente. |
| `description` | `string` | — | no | Texto secundario bajo el label. Renderizado en `<span class="ds-switch__description">` solo si es truthy. |
| `id` | `string` | generado con `useId()` | no | Identificador del `<input>`. Si se omite, el componente genera uno estable. Referenciado por `htmlFor` del label raíz. |
| `className` | `string` | — | no | Clases adicionales fusionadas en el `<label>` raíz (`ds-switch`), no en el `<input>`. |
| `defaultChecked` | `boolean` | — | no | Estado inicial no controlado del checkbox. Demos: `true` en `Playground` y `Stack`; `false` en `Off`. |
| `checked` | `boolean` | — | no | Estado controlado del checkbox (atributo nativo). |
| `disabled` | `boolean` | — | no | Atributo nativo `disabled` del `<input>`. Demostrado en story `Disabled`. Sin estilos dedicados en `.ds-switch`. |
| `onChange` | `ChangeEventHandler<HTMLInputElement>` | — | no | Manejador de cambio del checkbox nativo. |
| `name` | `string` | — | no | Atributo nativo `name` del `<input>` para envío en formularios. |
| `value` | `string \| number \| readonly string[]` | — | no | Atributo nativo `value` del checkbox. |
| `required` | `boolean` | — | no | Atributo nativo `required` del checkbox. |
| `...props` | `Omit<InputHTMLAttributes<HTMLInputElement>, "type">` | — | no | Resto de atributos nativos del `<input>` excepto `type` (`aria-label`, `aria-describedby`, `onBlur`, `onFocus`, `data-*`, etc.). |

---

# Variants

Describe every public visual variant.

## Default

`Switch` no expone prop `variant`. Una sola apariencia base implementada con clases BEM `ds-switch` y subelementos.

| Aspecto | Implementación |
|---------|----------------|
| Raíz | `label.ds-switch` — grid inline de dos columnas (`minmax(0, 1fr) auto`), `gap: 14px`, `min-width: 260px`, `cursor: pointer`. |
| Copy | `.ds-switch__copy` — grid vertical con `gap: 3px`. |
| Label | `.ds-switch__label` — mono, uppercase, `0.78rem`, `font-weight: 700`. |
| Description | `.ds-switch__description` — `0.86rem`, color `--ds-color-ink-soft`, `line-height: 1.3`. |
| Input | `.ds-switch__input` — oculto visualmente (`opacity: 0`, `1×1px`, `position: absolute`, `pointer-events: none`). |
| Track (off) | `.ds-switch__track` — `52×28px`, fondo `rgb(255 255 255 / 0.08)`, borde `--ds-color-line-strong`, pill (`border-radius: 999px`). |
| Thumb | `.ds-switch__thumb` — `20×20px`, fondo `--ds-color-ink`, borde `--ds-color-line-strong`, sombra hardcodeada. |
| Track (on) | `.ds-switch__input:checked + .ds-switch__track` — fondo y borde `--ds-color-teal`, sombra teal semitransparente; thumb con `transform: translateX(24px)`. |

Modificadores opcionales vía props (no variantes nombradas): presencia de `description` y estado `checked`/`disabled` nativos.

---

# States

| State | Description |
|--------|-------------|
| Off | Checkbox sin `checked`; track en apariencia base, thumb en posición inicial. Demostrado en `Switch.stories.tsx` → `Off`. |
| On | Checkbox con `checked`; track teal, thumb desplazado `24px` a la derecha. Demostrado en `Playground` y `Stack`. |
| Focus-visible | `.ds-switch__input:focus-visible + .ds-switch__track` aplica `box-shadow: var(--ds-focus-ring)`. |
| Disabled | Atributo nativo `disabled` en el `<input>`; sin reglas CSS adicionales en `styles.css` para `.ds-switch`. Demostrado en story `Disabled`. |
| With description | Cuando `description` es truthy: texto secundario visible en `.ds-switch__description`. |

---

# Accessibility

Describe only accessibility behavior implemented by the component.

## Requirements

- Usa semántica nativa de `<input type="checkbox">` envuelto en `<label htmlFor={switchId}>`.
- El nombre accesible proviene del texto de `label` dentro del label envolvente.
- `description` es texto visible dentro del label pero no se asocia mediante `aria-describedby`.
- `.ds-switch__track` y `.ds-switch__thumb` llevan `aria-hidden="true"` en el contenedor del track; el input no está oculto a tecnologías asistivas.
- El consumidor puede pasar atributos ARIA adicionales vía `...props` en el `<input>` (p. ej. `aria-describedby` manual para enlazar `description`).

### ARIA

| Attribute | Usage |
|-----------|-------|
| `aria-hidden="true"` | Aplicado por el componente en `.ds-switch__track` (incluye el thumb visual). |
| Atributos vía `...props` | El consumidor puede pasar `aria-label`, `aria-describedby`, `aria-required`, etc. en el `<input>`. |
| Semántica | Checkbox nativo; no se aplica `role="switch"`. |

### Keyboard

| Key | Action |
|-----|--------|
| `Space` | Alterna el checkbox cuando el input tiene foco (comportamiento nativo). |
| `Tab` | Mueve el foco al/desde el input (comportamiento nativo). |
| Clic en label | Activa el checkbox mediante asociación `htmlFor`/`id` (comportamiento nativo del label envolvente). |

---

# Responsive Behavior

Document only responsive behavior implemented by the component itself.

`Switch` no define media queries. El ancho mínimo fijo (`min-width: 260px` en `.ds-switch`) puede forzar overflow en contenedores estrechos; el colapso depende del padre.

| Contexto | Behavior |
|----------|----------|
| Componente | Sin breakpoints. Dimensiones fijas del track (`52×28px`) y `min-width: 260px` en la raíz. |
| Storybook | Decorator con `minWidth: 360` en `Switch.stories.tsx`; el ancho visible depende del contenedor externo. |
| `Stack` | Grid vertical con `gap: 16` definido en el render de la story; el apilado depende del contenedor padre, no de `.ds-switch`. |

---

# Composition

## Purpose in Layout

- **Detail** — toggles de configuración operativa (alertas, modo silencioso, bloqueo de edición) en paneles de consola.
- **Action** — no es acción puntual; representa preferencia persistente on/off.
- **Summary** — no aplica; no muestra métricas ni KPIs.
- **Navigation** — no es navegación.
- **Container** — no envuelve otros componentes; es un control atómico con copy + toggle.

## Parent

- `div` con estilo inline en `Switch.stories.tsx` (decorator, `minWidth: 360`).
- `div` con grid en `Switch.stories.tsx` → `Stack` (`display: grid`, `gap: 16`).
- Contenedores de configuración o ajustes del consumidor.

## Children

- No acepta `children`; contenido fijo vía props `label` y `description`.

## Siblings

- Otro `Switch` — preferencias adyacentes en lista vertical (`Stack`).
- `AlertBanner`, `Card`, `Button` — componentes de consola en la misma vista; no integrados internamente en `Switch`.

## Alternatives

- `SegmentedControl` — selección entre varios segmentos mutuamente excluyentes con botones; no booleano on/off.
- `SelectField` — selección entre opciones en lista desplegable; no toggle binario.
- Checkbox nativo estilizado externamente — cuando no se requiere apariencia de switch del design system (no provisto por el kit).

---

# Related Components

| Component | Relationship |
|-----------|--------------|
| `SegmentedControl` | Alternativa para selección entre múltiples valores; usa botones con `aria-pressed`, no checkbox. |
| `SelectField` | Alternativa para selección entre opciones en lista; no toggle booleano. |
| `TextField` | Control de entrada distinto (texto libre); mencionado en docs de campos como alternativa no booleana. |
| `AlertBanner` | Componente de feedback de consola; no relacionado funcionalmente con toggles de configuración. |
| `Button` | Acción puntual; no sustituye preferencia persistente on/off de `Switch`. |

---

# Content Guidelines

## Labels

- `label`: texto corto en mayúsculas visuales vía CSS (`text-transform: uppercase` en `.ds-switch__label`); no es obligatorio escribir en mayúsculas en la prop.
- Demos usan español: `"Alertas en vivo"`, `"Modo silencioso"`, `"Bloqueo de edicion"`.
- Debe describir la preferencia que activa o desactiva el toggle.

## Values

- El valor booleano lo gestiona el consumidor mediante `checked`/`onChange` o `defaultChecked`.
- Demos usan `defaultChecked={true}` para preferencias activas por defecto y omiten la prop para estado off inicial.
- `description` complementa con el efecto de la preferencia: `"Mantiene sincronizado el panel con eventos entrantes."`, `"Oculta avisos no criticos."`.

## Icons

- No hay slots de icono ni indicadores gráficos personalizables.
- El único elemento gráfico es el track/thumb CSS en `.ds-switch__track` con `aria-hidden="true"`.

## Localization

- Las stories usan español. El componente no impone idioma; cualquier string es válido en `label` y `description`.

---

# Examples

## Basic

```tsx
import { Switch } from "@alejandria/ui-kit";

<Switch
  label="Alertas en vivo"
  description="Mantiene sincronizado el panel con eventos entrantes."
  defaultChecked
/>
```

## Variant

`Switch` no expone prop `variant`. El estado off se controla omitiendo `defaultChecked` o pasando `defaultChecked={false}`:

```tsx
import { Switch } from "@alejandria/ui-kit";

<Switch
  label="Alertas en vivo"
  description="Mantiene sincronizado el panel con eventos entrantes."
  defaultChecked={false}
/>
```

## Composition

```tsx
import { Switch } from "@alejandria/ui-kit";

<div style={{ display: "grid", gap: 16 }}>
  <Switch
    label="Alertas en vivo"
    description="Sincroniza eventos entrantes."
    defaultChecked
  />
  <Switch
    label="Modo silencioso"
    description="Oculta avisos no criticos."
  />
  <Switch
    label="Bloqueo de edicion"
    description="Solo permite acciones autorizadas."
    defaultChecked
  />
</div>
```

---

# Reasoning Examples

## User Request

Toggle de configuración "Alertas en vivo" con texto explicativo.

### Recommended Components

- `Switch` con `label` y `description`

### Why

Patrón de `Switch.stories.tsx` → `Playground` con `defaultChecked` y descripción del efecto.

---

## User Request

Lista de preferencias operativas apiladas verticalmente.

### Recommended Components

- Varios `Switch` en grid vertical del consumidor

### Why

`Switch.stories.tsx` → `Stack` agrupa tres toggles con `display: grid` y `gap: 16`.

---

## User Request

Preferencia no editable mientras se aplican cambios.

### Recommended Components

- `Switch` con `disabled`

### Why

`Switch.stories.tsx` → `Disabled` pasa `disabled={true}` al checkbox nativo.

---

## User Request

Elegir entre tres modos de vista (mapa, lista, timeline).

### Recommended Components

- `SegmentedControl`

### Why

`SegmentedControl` selecciona entre múltiples valores con botones; `Switch` solo modela booleano on/off.

---

# Design Tokens

Only include tokens directly consumed by the component.

| Token | Category | Usage |
|--------|----------|-------|
| `--ds-color-ink` | color | `color` de `.ds-switch`; fondo de `.ds-switch__thumb` |
| `--ds-color-ink-soft` | color | `color` de `.ds-switch__description` |
| `--ds-color-line-strong` | color | `border-color` de `.ds-switch__track` y `.ds-switch__thumb` |
| `--ds-color-teal` | color | `background` y `border-color` de `.ds-switch__input:checked + .ds-switch__track` |
| `--ds-font-mono` | typography | `font-family` de `.ds-switch__label` |
| `--ds-focus-ring` | shadow | `box-shadow` en `.ds-switch__input:focus-visible + .ds-switch__track` |

Nota: fondo del track en reposo (`rgb(255 255 255 / 0.08)`), sombra del thumb (`0 3px 8px rgb(17 25 28 / 0.16)`) y sombra del track activo (`0 0 0 3px rgb(8 127 115 / 0.12)`) están hardcodeados; no usan tokens con nombre.

---

# Implementation Notes

This section is intended for maintainers extending the component.

Read after:

1. Constraints
2. Public API
3. Composition

## Source File

```text
packages/ui/src/components/Switch.tsx
```

## Dependencies

- `forwardRef`, `useId` from `react`
- `cn()` from `packages/ui/src/utils/cn.ts`
- `styles.css` (clases `ds-switch`, `ds-switch__copy`, `ds-switch__label`, `ds-switch__description`, `ds-switch__input`, `ds-switch__track`, `ds-switch__thumb`)

## DOM Structure

```text
label.ds-switch[htmlFor={switchId}]
├── span.ds-switch__copy
│   ├── span.ds-switch__label
│   │   └── {label}
│   └── span.ds-switch__description (solo si description)
│       └── {description}
├── input.ds-switch__input[type="checkbox"][id={switchId}]
└── span.ds-switch__track[aria-hidden="true"]
    └── span.ds-switch__thumb
```

---

# Known Limitations

- No expone prop `variant`, `size`, `hint` ni `error`.
- `type` fijado a `"checkbox"`; no configurable ni documentado como prop.
- Usa semántica de checkbox, no `role="switch"`.
- `description` no se asocia mediante `aria-describedby`; solo texto visible en el label.
- `className` se aplica al `<label>` raíz, no al `<input>`.
- Input con `pointer-events: none`; la interacción depende del label envolvente y del foco nativo del input.
- Sin estilos CSS para estado `disabled` en `.ds-switch` o subelementos.
- `min-width: 260px` fijo puede causar overflow en contenedores estrechos.
- Colores y sombras del track/thumb mayoritariamente hardcodeados; migración incompleta a tokens.
- Sin uso en `apps/web/src/App.tsx` ni `Components.stories.tsx` en el repositorio actual.
- Sin tests unitarios ni de integración en el repositorio.
- Sin documentación JSDoc en `Switch.tsx` según convenciones del repositorio.
- `Switch.displayName` es `"Switch"` para depuración en React DevTools; no afecta la API pública.

---

# Future Improvements

- [ ] `aria-describedby` automático cuando `description` está presente
- [ ] Estilos visuales para `:disabled` en `.ds-switch` y `.ds-switch__track`
- [ ] Evaluar `role="switch"` y patrones ARIA de toggle si se requiere semántica explícita
- [ ] Documentación JSDoc en `Switch.tsx` según convenciones del repositorio
- [ ] Story de uso controlado con `checked`/`onChange`
- [ ] Migrar colores y sombras hardcodeados a tokens
- [ ] Demo en `apps/web` o `Components.stories.tsx`
- [ ] Vincular diseño Figma cuando esté disponible

---

# Changelog

| Version | Change |
|----------|--------|
| 0.1.0 | Implementación inicial de `Switch`, `SwitchProps` con estilos `ds-switch`, checkbox nativo oculto visualmente, track/thumb decorativos, `forwardRef`, `useId` y stories en Storybook (`Playground`, `Off`, `Disabled`, `Stack`). |
