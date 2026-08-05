---
id: asistente
name: Asistente
category: actions
status: draft
since: 0.1.0

package: "@alejandria/ui-kit"
export: packages/ui/src/components/Asistente.tsx

figma: https://www.figma.com/file/PLACEHOLDER
storybook: Alejandria/Asistente

aliases:
  - assistant
  - chat asistente
  - modal asistente
  - AI assistant shell
keywords:
  - Asistente
  - asistente
  - ASISTENTE
  - prompt
  - sugerencias
  - AsistenteProps
  - AsistenteSuggestion
tags:
  - actions
  - presentational
  - molecule
  - pdf-context
  - composite

last_reviewed: 2026-07-22
---

# Asistente

Component structure follows `knowledge/reasoning/component-archetype.md`.

Canonical design reference: `knowledge/references/design-reference.pdf` **page 12 — ASISTENTE** (verbatim extract: `knowledge/references/pdf-text-extract.md` § Page 12).

## Purpose

Presenta el shell estático de entrada del chat tipo asistente IA de Alejandría: saludo, campo de intención, affordances de micrófono/adjuntar, botón ejecutar y chips de tareas rápidas.

Describe:

- **Responsabilidad principal:** renderizar el landing/empty state del asistente (PDF p.12) con props planas y composición de `TextField` + `Button` del kit.
- **Problema que resuelve:** promover el patrón preexistente `patterns/modal/Modal` a un export de primera clase, con API aplanada alineada al resto del kit.
- **Alcance:** componente presentacional compuesto basado en `<div class="ds-asistente">`; el consumidor provee copy, sugerencias y handlers. **No** implementa hilo de chat ni sugerencias dinámicas por perfil/historial.

Exclude:

- API details
- Implementation details
- Usage examples
- Composition

---

# Behavioral Contract

Documenta los comportamientos públicos en los que el consumidor puede confiar.

## This component guarantees

- Renderizado como `<div class="ds-asistente">` (sin wrapper de página `min-height: 100vh`; eso es responsabilidad del layout/story).
- `greeting` en `<h1 class="ds-asistente__greeting">`.
- Shell `.ds-asistente__shell` con `role="dialog"` y `aria-label={greeting}`.
- Prompt vía `TextField appearance="pdf"` con `label`/`placeholder` = `prompt`, `value={promptValue}` y `onChange` → `onPromptChange?.(value)`.
- Botón mic `.ds-asistente__mic` con `aria-label="Entrada por voz"` y `onClick={onMicClick}`.
- Affordance adjuntar `.ds-asistente__attach` con `onClick={onAttach}`.
- Botón ejecutar `Button variant="pdf"` con `onClick={onExecute}`.
- Lista de sugerencias desde `suggestions` como `<ul>` de `<button type="button">` con `onClick={suggestion.onClick}`.
- Color de texto del input pasa a blanco cuando hay valor tipado (`:not(:placeholder-shown)` → `--ds-color-white`), sin estado JS.

## This component never

- Implementa conversación, historial, mensajes ni threading de chat.
- Calcula sugerencias dinámicas por perfil o patrón de uso (eso es concern de app; `suggestions` es un array estático).
- Expone ejes `variant`, `appearance`, `size` o `tone`.
- Usa `forwardRef`.
- Fusiona `className` ni reenvía `...props` / atributos nativos HTML al raíz (divergencia heredada del patrón `Modal` original; no introducida en esta promoción).
- Aplica media queries ni breakpoints propios.
- Incluye el wrapper de pantalla completa (ex-`.modal-screen`).

---

# Constraints

Estas reglas tienen la máxima prioridad.

Si algún ejemplo entra en conflicto con estas reglas,
siempre seguir estas reglas.

## Required

- Importar desde `@alejandria/ui-kit` y cargar `styles.css` del paquete (`@alejandria/ui-kit/style.css`).
- Proveer `greeting`, `prompt`, `executeLabel`, `attachLabel` y `suggestions`.
- Tratar PDF p.12 como referencia canónica de apariencia.

## Forbidden

- Inventar props de chat/thread (`messages`, `history`, `onSendMessage`, etc.).
- Hardcodear las tareas rápidas dentro del componente (AP13: set abierto → array declarativo).
- Usar `Asistente` como modal genérico / dialog de confirmación.

## Recommendations

- Cablear `promptValue` / `onPromptChange` en el consumidor (o en la story `Playground`) para el flujo controlado.
- Pasar `onExecute` / `onAttach` / `onMicClick` y `suggestion.onClick` desde la capa de app.
- Computar `suggestions` en la app según perfil/historial; el componente solo las renderiza.
- Envolver en un layout padre con padding de página si se necesita el encuadre fullscreen de la demo (el componente no lo incluye).

---

# Category

| Field | Value |
|--------|-------|
| Type | molecule |
| Group | Actions |
| Package | @alejandria/ui-kit |
| Import | `import { Asistente } from "@alejandria/ui-kit"` |

**Juicio de grupo:** `Actions` es el grupo existente más cercano (execute / attach / suggestion chips). No hay un grupo «Chat» o «Assistants» establecido en el kit; esta asignación es un juicio de promoción, no un match de convención previa.

---

# Public API

Solo documenta la API pública.

```tsx
import {
  Asistente,
  type AsistenteProps,
  type AsistenteSuggestion
} from "@alejandria/ui-kit";
```

Tipos exportados:

- `Asistente` — componente funcional.
- `AsistenteProps` — props del componente.
- `AsistenteSuggestion` — forma de cada sugerencia declarativa.

---

# Props

| Prop | Type | Default | Required | Description |
|------|------|----------|----------|-------------|
| `greeting` | `string` | — | sí | Saludo encima del shell (PDF: «HOLA SEBASTIÁN,»). |
| `prompt` | `string` | — | sí | Label/placeholder del campo de intención. |
| `executeLabel` | `string` | — | sí | Etiqueta del botón EJECUTAR. |
| `attachLabel` | `string` | — | sí | Etiqueta de «Adjuntar archivos». |
| `suggestions` | `AsistenteSuggestion[]` | — | sí | Tareas rápidas (AP13: array declarativo). |
| `promptValue` | `string` | — | no | Valor controlado del `TextField` interno. |
| `onPromptChange` | `(value: string) => void` | — | no | Cambio del prompt. |
| `onExecute` | `() => void` | — | no | Acción fija EJECUTAR (AP13). |
| `onAttach` | `() => void` | — | no | Affordance adjuntar. |
| `onMicClick` | `() => void` | — | no | Entrada por voz. |

### AsistenteSuggestion

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `label` | `string` | sí | Texto visible de la sugerencia. |
| `onClick` | `() => void` | no | Handler por ítem (mismo convenio declarativo que `SideBarItem`). |

**Nota:** no hay `className` ni `...props` en la firma — divergencia heredada del patrón original (ver Known Limitations).

---

# Variants

## Default

Una sola apariencia pública, alineada a PDF p.12 ASISTENTE. No hay modificadores BEM `ds-asistente--*` ni props de eje visual.

| Elemento | Rol visual (PDF p.12; valores CSS calibrados ÷2 desde el vector @2×) |
|----------|------------------------------------------------------------------|
| Shell | Fondo `#060606`, borde `0.75px` `#c1c1c1`, caja `387×104` |
| Saludo | Source Code Regular `12px`, `#c1c1c1`, uppercase en copy |
| Tarea / prompt | Montserrat Light `9px`, `#8a8b87` → `#FFFFFF` al escribir |
| Adjuntar | Montserrat Light `7px`, `#8a8b87` |
| Tareas rápidas | Source Code Regular `7px`, `#8a8b87` |

---

# States

| State | Description |
|--------|-------------|
| Default | Apariencia base con saludo, shell y sugerencias. |
| Prompt empty | Input muestra placeholder; color muted (`--ds-color-pdf-ink-muted`). |
| Prompt typed | Input `:not(:placeholder-shown)` → color `--ds-color-white`. |
| With handlers | `onExecute` / `onAttach` / `onMicClick` / `suggestion.onClick` cableados por el consumidor. |

No hay variantes de tono ni de tamaño.

---

# Accessibility

Describe only accessibility behavior implemented by the component.

## Requirements

- Shell con `role="dialog"` y `aria-label` derivado de `greeting`.
- Mic con `aria-label="Entrada por voz"`; ícono `Mic` con `aria-hidden="true"`.
- Lista de sugerencias con `aria-label="Sugerencias"`.
- Controles son `<button type="button">` o `Button` / `TextField` del kit (foco nativo).

### ARIA

| Attribute | Usage |
|-----------|-------|
| `role="dialog"` | En `.ds-asistente__shell`. |
| `aria-label` | Shell = `greeting`; mic = «Entrada por voz»; lista = «Sugerencias». |
| `aria-hidden="true"` | En el SVG del mic y el plus de adjuntar. |

### Keyboard

| Key | Action |
|-----|--------|
| Tab / Shift+Tab | Recorre TextField, mic, attach, execute y suggestion buttons. |
| Enter / Space | Activa el botón enfocado (comportamiento nativo). |

---

# Responsive Behavior

Document only responsive behavior implemented by the component itself.

`Asistente` no define media queries. El ancho del shell es fijo (`387px`, calibrado ÷2 desde el PDF).

| Contexto | Behavior |
|----------|----------|
| Componente | Sin breakpoints. Columna flex de ancho fijo. |
| Storybook | `layout: "fullscreen"` + decorator con `min-height: 100vh` y padding de página (ex-`.modal-screen`). El shell dibuja fondo opaco `#060606`; `parameters.backgrounds` es inerte (`addons: []` en `.storybook/main.ts`). |

---

# Composition

## Purpose in Layout

- **Actions** — entrada de intención + execute / attach / suggestion chips.
- **Detail** — landing del asistente antes de una conversación (no es el thread).
- **Container** — anatomía fija; no admite `children` libres.

## Parent

- Pantalla o región de app-shell que centre/paddee el bloque.
- Decorator fullscreen en `Asistente.stories.tsx`.

## Children

- No admite `children`. Compone internamente `TextField` y `Button`.

## Siblings

- `TextField` / `Button` — compuestos internamente (`appearance="pdf"` / `variant="pdf"`).
- `SideBar` — chrome de navegación; el PDF menciona que el asistente puede ocupar pantalla completa junto al menú, pero esa composición de screen no está implementada aquí.
- `Empty` — empty state de listas; no es el landing del asistente.

## Alternatives

- `TextField` + `Button` sueltos — sin anatomía/saludo/sugerencias del PDF p.12.
- Dialog/modal genérico — no existe como export del kit; `Asistente` no es un modal de confirmación.

---

# Related Components

| Component | Relationship |
|-----------|--------------|
| `TextField` | Compuesto internamente con `appearance="pdf"` para el prompt. |
| `Button` | Compuesto internamente con `variant="pdf"` para EJECUTAR. |
| `SideBar` | Posible sibling en un futuro screen de app-shell; no compuesto aquí. |
| `Empty` | Feedback de ausencia de datos; rol distinto. |

---

# Content Guidelines

## Labels

- `greeting`: saludo en mayúsculas (PDF: `"HOLA SEBASTIÁN,"`).
- `prompt`: pregunta de intención (PDF: `"¿Qué querés hacer hoy?"`).
- `executeLabel`: acción primaria en mayúsculas (PDF: `"EJECUTAR"`).
- `attachLabel`: affordance de archivos (PDF: `"Adjuntar archivos"`).
- Sugerencias: frases cortas de acción (PDF: «Ayudame a escribir», «Saber más», «Resumir sumario», «Generar investigación»).

## Values

- `promptValue` es texto libre de intención; no hay formato numérico.

## Icons

- Mic vía `lucide-react` `Mic` (fijo en el componente).
- Plus de adjuntar es CSS (pseudo-elementos), no un ícono del kit.

## Localization

- Las stories usan español (rioplatense) como en el PDF. El componente no impone idioma.

---

# Examples

## Basic

```tsx
import { Asistente } from "@alejandria/ui-kit";

<Asistente
  greeting="HOLA SEBASTIÁN,"
  prompt="¿Qué querés hacer hoy?"
  executeLabel="EJECUTAR"
  attachLabel="Adjuntar archivos"
  suggestions={[
    { label: "Ayudame a escribir" },
    { label: "Saber más" },
    { label: "Resumir sumario" },
    { label: "Generar investigación" }
  ]}
/>
```

## Variant

No hay variantes públicas. La story `Playground` demuestra el cableado controlado:

```tsx
import { useState } from "react";
import { Asistente } from "@alejandria/ui-kit";

function Example() {
  const [promptValue, setPromptValue] = useState("");

  return (
    <Asistente
      greeting="HOLA SEBASTIÁN,"
      prompt="¿Qué querés hacer hoy?"
      executeLabel="EJECUTAR"
      attachLabel="Adjuntar archivos"
      promptValue={promptValue}
      onPromptChange={setPromptValue}
      onExecute={() => console.log(promptValue)}
      onAttach={() => console.log("attach")}
      onMicClick={() => console.log("mic")}
      suggestions={[
        { label: "Ayudame a escribir", onClick: () => console.log("escribir") },
        { label: "Saber más", onClick: () => console.log("saber") }
      ]}
    />
  );
}
```

## Composition

Ver stories `Default` y `Playground` en `Asistente.stories.tsx`.

---

# Reasoning Examples

## User Request

Landing del asistente con saludo, prompt y chips de acciones rápidas.

### Recommended Components

- `Asistente`

### Why

Rol PDF p.12 ASISTENTE; shell estático con props planas.

---

## User Request

Hilo de chat con mensajes del usuario y del asistente.

### Recommended Components

- Ninguno en el kit hoy — `Asistente` es solo el landing shell.

### Why

Chat/thread está explícitamente fuera de alcance (Known Limitations).

---

## User Request

Empty state «no hay tareas».

### Recommended Components

- `Empty`

### Why

`Asistente` es entrada de intención IA, no feedback de lista vacía.

---

# Design Tokens

Only include tokens directly consumed by the component.

| Token | Category | Usage |
|--------|----------|-------|
| `--ds-color-pdf-surface` | color | Fondo de `.ds-asistente__shell` (`#060606`) |
| `--ds-color-pdf-line` | color | Borde del shell + color del saludo (`#c1c1c1`) |
| `--ds-color-pdf-ink-muted` | color | Prompt vacío, attach, mic, sugerencias (`#8a8b87`) |
| `--ds-color-white` | color | Prompt con valor tipado (`:not(:placeholder-shown)`) |
| `--ds-border-width-hair` | border | Borde del shell (`0.75px`) |
| `--ds-font-display` | typography | Saludo y sugerencias (Source Code Pro) |
| `--ds-font-body` | typography | Prompt, attach, execute (Montserrat) |
| `--ds-font-weight-regular` | typography | Saludo / sugerencias |
| `--ds-font-weight-light` | typography | Prompt / attach |
| `--ds-font-weight-bold` | typography | Execute |
| `--ds-tracking-none` | typography | Tracking |
| `--ds-leading-snug` | typography | Saludo |
| `--ds-leading-normal` | typography | Prompt / attach |
| `--ds-leading-label` | typography | Sugerencias |
| `--ds-space-3` | space | Gap del row prompt + mic |

Nota: tamaños en px del bloque `.ds-asistente*` están calibrados ÷2 desde el vector/glyph @2× del PDF (2026-08-05).

---

# Implementation Notes

This section is intended for maintainers extending the component.

> **Interno (mantenedores).** Las rutas de esta sección (Source File, Dependencies, DOM Structure)
> son fuente del monorepo (`packages/ui/**`); no forman parte de la API publicada de
> `@alejandria/ui-kit`. Un consumidor externo usa el import de arriba y `@alejandria/ui-kit/style.css`.

Read after:

1. Constraints
2. Public API
3. Composition

## Source File

```text
packages/ui/src/components/Asistente.tsx
```

## Dependencies

- `Button` (`variant="pdf"`)
- `TextField` (`appearance="pdf"`)
- `lucide-react` `Mic`
- `styles.css` (bloque `.ds-asistente*`)

## DOM Structure

```text
div.ds-asistente
├── h1.ds-asistente__greeting
├── div.ds-asistente__shell[role=dialog]
│   ├── div.ds-asistente__top
│   │   ├── TextField.ds-asistente__prompt.ds-field
│   │   └── button.ds-asistente__mic
│   │       └── Mic svg
│   ├── button.ds-asistente__attach
│   │   ├── span.ds-asistente__attach-plus
│   │   └── span.ds-asistente__attach-label
│   └── Button.ds-asistente__execute.ds-button
└── ul.ds-asistente__suggestions
    └── li → button.ds-asistente__suggestion
```

---

# Known Limitations

- **Chat/thread behavior is NOT implemented** — solo el landing shell estático (saludo + un prompt + sugerencias estáticas). El PDF especifica «Chat tipo asistente IA» con comportamiento basado en historial.
- **Dynamic per-user suggestions are NOT implemented** — `suggestions` es un prop estático; el PDF dice que «van a ser dinámicas, según el perfil o el patrón de uso del usuario.» Eso es concern de app-layer.
- **No `className` / `...props` / native-HTML-attrs passthrough** — heredado del patrón `Modal` original; divergencia respecto a la convención «props extend native HTML» del resto del kit. No introducida por esta promoción.
- Sin tests unitarios ni de integración en el repositorio.
- Sin uso documentado en `apps/web`; evidencia en Storybook (`Default`, `Playground`).

---

# Future Improvements

- [ ] Evaluar `className` / `...props` en el raíz para alinear con la convención del kit
- [ ] Chat/thread UI cuando design cierre el comportamiento de historial
- [ ] Documentar screen/patrón de composición con `SideBar` si el PDF lo exige en producto

---

# Changelog

| Version | Change |
|----------|--------|
| 0.1.1 | **Fidelity pass (2026-08-05):** corregida la escala ÷2 que llevaba dos pases diferidos ("Asistente 774px"). Todo el bloque `.ds-asistente*` estaba a escala cruda @2× (idéntico al valor pt medido en el vector del PDF, sin dividir por 2) — shell 774×208→387×104, mic 36×20→18×10, attach-plus 11→6, execute 135×25→67×12, offsets y font-sizes (24/18/14/14/13px→12/9/7/7/6.5px) halved. Confirmado con `page.get_drawings()`/`page.get_text("dict")` sobre la página 11 del PDF (artboard 1920×1080 = @2×) y verificado en Storybook (`Default`, `Playground`, estado de texto tipeado). |
| 0.1.0 | **Promoción:** historia previa como `patterns/modal/Modal.tsx` (2026-07-13; página entonces «MODALES», numeración pre-v2). Promovido a `components/Asistente.tsx` el 2026-07-22 con props aplanadas, handlers de acción, regla CSS de color al tipear, export en barrel, docs/spec/manifest. Cierra el último gap del component-build-track (Empty / Skeleton / CalendarCard / SideBar / Asistente). |
