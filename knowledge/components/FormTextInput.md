---
id: form-text-input
name: FormTextInput
category: input
status: draft
since: 0.1.0

package: "@alejandria/ui-kit"
export: packages/ui/src/components/FormTextInput.tsx

figma: https://www.figma.com/file/PLACEHOLDER
storybook: Alejandria/FormTextInput

aliases:
  - input de texto
  - campo de texto
  - input de login
  - textarea de formulario
keywords:
  - FormTextInput
  - input
  - textarea
  - label flotante
  - floating label
  - login
  - variant
  - error
  - disabled
  - FormTextInputVariant
  - FormTextInputProps
tags:
  - forms
  - input
  - presentational
  - atom

last_reviewed: 2026-08-07
---

# FormTextInput

## Purpose

Campo de texto de una línea o multilínea con label flotante, en dos variantes de color
(`login`/`default`), alineado con las secciones **FORM - LOGIN** (PDF p.17) y **FORM -
INPUT** (PDF p.18) del PDF de referencia.

Describe:

- **Responsabilidad principal:** capturar texto libre con feedback visual de foco/valor
  (label flotante) y de error, sin lógica de validación propia.
- **Problema que resuelve:** unifica en un solo componente los dos contextos de input de
  texto del PDF (login vs. formulario genérico) que comparten mecánica de label flotante
  pero difieren en paleta — evita duplicar esa mecánica en dos componentes.
- **Alcance:** primitive de formulario basado en `<input>` o `<textarea>` (según
  `multiline`), con label absolutamente posicionado que transiciona entre estático y
  activo puramente vía CSS (`:not(:placeholder-shown)` / `:focus`), sin estado de React.

**Referencia visual canónica:** `knowledge/references/design-reference.pdf` v3 — p.17
("FORM - LOGIN", variante `login`) y p.18 ("FORM - INPUT", variante `default`). Verificado
en Storybook vía `getComputedStyle` contra los valores exactos del PDF (ver
`knowledge/fidelity-pass/next-steps.md`, entrada 2026-08-07).

Exclude:

- API details
- Implementation details
- Usage examples
- Composition

---

# Behavioral Contract

## This component guarantees

- Renderiza `<input>` o `<textarea>` (si `multiline` es `true`) dentro de
  `div.ds-form-field > div.ds-form-field__control`, con `<label>` asociado vía `htmlFor`.
- El label transiciona de estático (tamaño completo, centrado verticalmente) a activo
  (achicado, arriba) cuando el control tiene foco o valor — vía CSS, sin `useState`.
- `placeholder` por defecto es `" "` (no vacío) para que el selector CSS
  `:not(:placeholder-shown)` detecte "tiene valor" sin JS.
- `variant="login"` aplica fondo `#2a2927` y label `#f6f6f6` (PDF p.17); `variant="default"`
  (por defecto) aplica fondo `#060606` al 50% y label `#8d8d8d` (PDF p.18).
- `error` (string) tiñe el borde de `#ff0404` y renderiza `<p class="ds-form-field__error">`
  asociado vía `aria-describedby`.
- `disabled` aplica `opacity: 0.58` y `cursor: not-allowed` (no especificado por el PDF,
  ver `DECISIONS.md` 2026-08-07 — mismo tratamiento que `.ds-button:disabled`).
- Reenvía `ref` al `<input>` o `<textarea>` interno vía `forwardRef`.
- Repasa atributos nativos de `InputHTMLAttributes`/`TextareaHTMLAttributes` al control
  interno vía `...props` (`id`, `name`, `type`, `data-*`, `aria-*`, etc.).

## This component never

- Valida el valor ingresado ni decide cuándo mostrar `error` (submit/blur/typing es
  decisión del consumidor).
- Formatea, transforma ni persiste el valor.
- Gestiona estado controlado por su cuenta — es un `<input>`/`<textarea>` nativo; el
  consumidor controla `value`/`onChange` si lo necesita.
- Cambia de variante según contenido — `variant` es una prop explícita, no inferida.
- Anima nada más allá de `border-color`/`top`/`font-size` en la transición estático↔activo.

---

# Constraints

## Required

- Importar desde `@alejandria/ui-kit` y cargar `@alejandria/ui-kit/style.css`.
- Proveer `label` (string) y no pisar `placeholder` con una cadena vacía (`""`) — rompe la
  detección CSS del label flotante. Si se necesita un placeholder visible, no hay: el PDF
  no define uno; el label ocupa ese rol.
- Usar `variant="login"` solo sobre fondos oscuros cálidos tipo `#2a2927` (PDF p.17); en
  cualquier otro contexto usar `variant="default"` (fondo propio `#060606` al 50%).
- Usar `multiline` para el caso "DESCRIPCIÓN" del PDF p.18 en vez de forzar un `<input>`
  con `white-space` custom.

## Forbidden

- Inventar props no declaradas en `FormTextInputProps` (`variant` solo acepta
  `"login" | "default"`; no hay `size` ni `tone`).
- Usar `TextField` (familia console/teal) y `FormTextInput` (familia PDF form) de forma
  intercambiable en la misma superficie — ver Related Components.
- Asumir que `error` dispara algún efecto además de estilo — es puramente visual.

## Recommendations

- Pasar `type="password"` nativo para campos de contraseña (ver story `LoginPassword`) —
  no hay prop dedicada, se resuelve con el atributo nativo.
- Usar `rows` explícito en `multiline` cuando el contenido esperado exceda las 3 filas por
  defecto.
- Agrupar varios `FormTextInput` en un `<form>` o layout propio del consumidor — el
  componente no ofrece grid ni spacing entre campos.

---

# Category

| Field | Value |
|--------|-------|
| Type | atom |
| Group | Forms |
| Package | @alejandria/ui-kit |
| Import | `import { FormTextInput } from "@alejandria/ui-kit"` |

---

# Public API

```tsx
import {
  FormTextInput,
  type FormTextInputProps,
  type FormTextInputVariant
} from "@alejandria/ui-kit";
```

Tipos exportados:

- `FormTextInput` — componente funcional (`forwardRef`).
- `FormTextInputProps` — props del componente.
- `FormTextInputVariant` — unión `"login" | "default"`.

---

# Props

| Prop | Type | Default | Required | Description |
|------|------|----------|----------|-------------|
| `label` | `string` | — | sí | Texto del label flotante. Uppercase vía CSS. |
| `variant` | `FormTextInputVariant` | `"default"` | no | `"login"` (PDF p.17, fondo `#2a2927`) o `"default"` (PDF p.18, fondo `#060606` 50%). |
| `error` | `string` | — | no | Mensaje de error. Presente → borde `#ff0404` + `<p>` asociado. Puramente visual. |
| `multiline` | `boolean` | `false` | no | Renderiza `<textarea>` en vez de `<input>`. |
| `rows` | `number` | `3` | no | Solo aplica si `multiline`. |
| `disabled` | `boolean` | — | no | `opacity: 0.58`, `cursor: not-allowed`. No especificado por el PDF. |
| `placeholder` | `string` | `" "` | no | No usar `""` — rompe la detección CSS del label activo. |
| `...props` | `InputHTMLAttributes \| TextareaHTMLAttributes` | — | no | Atributos nativos del control interno (`id`, `name`, `type`, `value`, `onChange`, `aria-*`, etc.). |

---

# Variants

## `login` (PDF p.17)

Fondo del contenedor `#2a2927`; label estático `#f6f6f6` 20pt→10px; label activo `#8d8d8d`
10pt→5px (mismo color "activo" que `default`). Pensado para el contexto de login
(campos USUARIO/CONTRASEÑA).

## `default` (PDF p.18)

Fondo `#060606` al 50%; label estático `#8d8d8d` 16pt→8px; label activo `#8d8d8d` 10pt→5px;
texto del valor Montserrat Regular 16pt→8px `#ffffff`. Variante por defecto, usada en
formularios genéricos (DNI, NOMBRE, DESCRIPCIÓN).

---

# States

| State | Description |
|--------|-------------|
| Default (estático) | Sin foco, sin valor. Label a tamaño completo, centrado verticalmente. |
| Activo | Con foco o con valor (`:not(:placeholder-shown)`). Label achicado, arriba (`top: 8px`, `font-size: 5px`). Borde `#ffffff`. |
| Error | `error` con contenido. Borde `#ff0404`, mensaje visible bajo el control. |
| Disabled | `opacity: 0.58`, `cursor: not-allowed` en control e input/textarea. |
| Multiline | `multiline: true`. `<textarea>` con `min-height: 68px`, `resize: vertical`. |

---

# Accessibility

## Requirements

- `<label>` asociado al control vía `htmlFor`/`id` (auto-generado con `useId` si no se
  pasa `id`).
- `aria-invalid="true"` en el control cuando `error` tiene contenido.
- `aria-describedby` conecta el control con el `<p>` de error (fusionado con cualquier
  `aria-describedby` externo que el consumidor pase).
- Comportamiento de foco/teclado 100% nativo (`<input>`/`<textarea>` reales, sin overlay).

### ARIA

| Attribute | Usage |
|-----------|-------|
| `aria-invalid` | `"true"` cuando `error` está presente. |
| `aria-describedby` | Referencia al `id` del mensaje de error (más cualquier id externo). |

### Keyboard

| Key | Action |
|-----|--------|
| `Tab` | Foco nativo del `<input>`/`<textarea>`. |
| Cualquier tecla de texto | Escritura nativa. |

---

# Responsive Behavior

Sin media queries propias. `width: 100%` del contenedor `.ds-form-field__control`; el
ancho final lo define el consumidor.

---

# Composition

## Purpose in Layout

- **Input** — campo de texto dentro de un formulario o layout de login.

## Parent

- Cualquier contenedor de formulario del consumidor (el kit no compone un `Form` completo,
  ver `specs/001-form-modal/plan.md`).

## Children

- No admite `children`. Solo label + `<input>`/`<textarea>` + mensaje de error opcional.

## Siblings

- `FormSelect`, `FormCheckable`, `FormFileUpload`, `FormDatePicker` — misma familia visual
  (`.ds-form-field` compartido), misma feature (`001-form-modal`).

## Alternatives

- `TextField` — input de la familia console/teal existente; usar en superficies de consola
  operativa, no mezclar con `FormTextInput` en la misma vista.

---

# Related Components

| Component | Relationship |
|-----------|--------------|
| `FormSelect` | Comparte `.ds-form-field` (fondo/borde/label) y el mecanismo de label flotante. |
| `FormCheckable` | Misma feature/familia PDF (p.19), API y layout distintos. |
| `FormFileUpload` | Misma feature/familia PDF (p.20), sin label flotante (usa `--static`). |
| `FormDatePicker` | Misma feature/familia PDF (p.21), reutiliza `.ds-form-field__control`. |
| `TextField` | Equivalente funcional en la familia console/teal — no intercambiable visualmente. |

---

# Content Guidelines

## Labels

- Identificador corto del campo (`"DNI"`, `"NOMBRE"`, `"USUARIO"`, `"CONTRASEÑA"`,
  `"DESCRIPCIÓN"`). Mayúsculas vía CSS (`text-transform: uppercase`), no es necesario
  escribirlas en mayúsculas en la prop.

## Values

- Texto libre sin formato ni máscara aplicada por el componente.

## Icons

- No aplica — `FormTextInput` no renderiza iconos.

## Localization

- Las stories usan español; el componente no impone idioma.

---

# Examples

## Basic (variante `default`, PDF p.18)

```tsx
<FormTextInput label="DNI" defaultValue="12.345.678" />
```

## Variante `login` (PDF p.17)

```tsx
<FormTextInput label="USUARIO" variant="login" />
<FormTextInput label="CONTRASEÑA" type="password" variant="login" />
```

## Textarea

```tsx
<FormTextInput
  label="DESCRIPCIÓN"
  multiline
  defaultValue="El usuario generado se encargará de gestionar la plataforma y sus accesos"
/>
```

## Con error

```tsx
<FormTextInput label="DNI" defaultValue="12.345.678" error="Ingresá un DNI válido." />
```

---

# Reasoning Examples

## User Request

Mostrar un formulario de login con usuario y contraseña sobre un fondo cálido oscuro.

### Recommended Components

- `FormTextInput` con `variant="login"` (×2)

### Why

PDF p.17 "FORM - LOGIN" — fondo `#2a2927` distintivo de este contexto, no reutilizable con
`variant="default"`.

---

## User Request

Campo de texto libre para un formulario genérico de consola operativa (no PDF form-family).

### Recommended Components

- `TextField`

### Why

`FormTextInput` está atado a la paleta/tipografía del PDF v3 p.17–18; `TextField` es la
opción de la familia console/teal para el resto del kit.

---

# Design Tokens

| Token / value | Category | Usage |
|---------------|----------|-------|
| `--ds-color-pdf-surface-a50` (`rgb(6 6 6 / 0.5)`) | color | Fondo de `.ds-form-field__control`, variante `default` |
| `--ds-color-pdf-surface-warm` (`#2a2927`) | color | Fondo de `.ds-form-field__control`, variante `login` |
| `--ds-color-pdf-border` (`#606060`) | color | Borde en reposo |
| `--ds-color-white` (`#ffffff`) | color | Borde activo (foco), texto del valor |
| `--ds-color-pdf-form-muted` (`#8d8d8d`) | color | Label (ambas variantes en estado activo; estático en `default`) |
| `--ds-color-pdf-ink-bright` (`#f6f6f6`) | color | Label estático, variante `login` |
| `--ds-color-pdf-critical` (`#ff0404`) | color | Borde y texto de error |
| `--ds-font-mono` | typography | Label (Source Code Light) |
| `--ds-font-body` | typography | Texto del valor (Montserrat) |
| `--ds-duration-md` / `--ds-ease-standard` | motion | Transición `border-color`/`top`/`font-size` (180ms, sin timing PDF-especificado, ver `DECISIONS.md`) |

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
packages/ui/src/components/FormTextInput.tsx
```

## Dependencies

- `cn()` de `packages/ui/src/utils/cn.ts`
- `styles.css` (bloque compartido `.ds-form-field` + modificador `--login`)

## DOM Structure

```text
div.ds-form-field[.ds-form-field--login][.ds-form-field--invalid][.ds-form-field--disabled]
├── div.ds-form-field__control
│   ├── input.ds-form-field__input | textarea.ds-form-field__textarea
│   └── label.ds-form-field__label
└── p.ds-form-field__error (solo si error)
```

---

# Known Limitations

- Sin lógica de validación — `error` es 100% visual, controlado por el consumidor.
- El label flotante depende de `placeholder=" "` no vacío; un consumidor que pase
  `placeholder=""` rompe la detección CSS.
- `min-height: 44px` del control y `opacity: 0.58` de `disabled` no están medidos contra el
  PDF (que no cubre esos casos) — ver `DECISIONS.md` 2026-08-07.
- Sin tests unitarios ni de integración (sin framework de test instalado en el repo).

---

# Future Improvements

- [ ] Estados `readonly`/`loading` si un consumidor los necesita (fuera de scope v1, ver
  `specs/001-form-modal/spec.md`).
- [ ] Auto-resize del `<textarea>` en `multiline`.

---

# Changelog

| Version | Change |
|----------|--------|
| 0.1.0 | Implementación inicial (`variant="login"|"default"`, label flotante CSS-only, `error`/`disabled`), feature `001-form-modal`. Fidelity pass verificado contra PDF v3 p.17–18 vía PyMuPDF (`knowledge/fidelity-pass/next-steps.md`, 2026-08-07) — sin bugs encontrados. |
