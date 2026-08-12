# Draft — SideBar: ancho expandido medido, sacar edge-toggle propio, colapso real en Tareas

Notas crudas para `/sdd-refine`. No es un spec formal. Alcance ampliado por Luna el
2026-08-12 (ver `knowledge/component-roadmap.md` § "Gaps nuevos encontrados", entrada
"SideBar ancho expandido, probablemente invented" — hallazgo original durante el
`/sdd-checklist` de `004-familia-tareas`/`005-alert-toast-filter`, deliberadamente
diferido para tratarse acá, como su propio fix/feature).

**Por qué esto no es un `/sdd-fix` sobre `004`/`005`:** ambas constituciones (ya
`CLOSED`) prohíben explícitamente tocar `SideBar.tsx` ("cero gaps confirmados, se
consume tal cual"). `SideBar` además lo consumen `003-home-dashboard` (Home,
Dashboard) y `002-bg-texture` (Carga de Formulario) — 5 features `CLOSED` en total.
Cambiar el ancho, sacar el edge-toggle, y cablear colapso real en 3 screens de Tareas
afecta a las 5 y contradice `004-familia-tareas/constitution.md` MUST-3 ("Kanban y
Finalizadas son composiciones estáticas"). Scope nuevo, no un hotfix acotado a una
feature — de ahí `/sdd-refine` en vez de `/sdd-fix`.

---

## Hallazgo 1 — ancho expandido del SideBar, invented

**Fuente:** `knowledge/references/design-reference.pdf` p.13 ("SIDE BAR"). La página
mezcla capturas rasterizadas con vectores (no es una hoja de spec limpia como p.22/23
de `alert-toast-filter.md`).

**Estado actual:** `.ds-sidebar` expandido usa `--ds-size-card-min-w` (220px) — token
tomado prestado de otro componente (`Card`/`ModuleCard`), nunca medido contra esta
página. Ya documentado como limitación conocida en `knowledge/components/SideBar.md`
§ Known Limitations ("Anchos expandido/colapsado no medidos en PDF; se reutilizan
tokens existentes").

**Medición preliminar (Luna, 2026-08-12):** `get_drawings()` sobre el rect de fondo
`#282828` ("Desplegada") da ~205pt @2× → **~102px** de ancho expandido, bien por
debajo de los 220px actuales. Indicativo, no cerrado — falta correr un PyMuPDF sweep
completo (`get_drawings()` + `get_pixmap()` para las zonas rasterizadas) para
confirmar antes de fijar el valor en `plan.md`.

**Impacto reportado:** en viewports angostos, las 3 screens de Tareas
(`tareas-pendientes`, `tareas-kanban`, `tareas-finalizadas`) solapan componentes con
el sidebar expandido en 220px.

**Preguntas para el grilling:**
- ¿El ancho colapsado (`--ds-size-control-lg`, 48px, también "provisional/reutilizado"
  según `SideBar.md`) se mide en el mismo sweep, o queda fuera de este draft?
- Si la medición final da un token nuevo (no 220px ni ninguno existente), ¿se crea un
  token dedicado (`--ds-size-sidebar-expanded-w`) en vez de seguir reutilizando uno de
  otro componente?

---

## Hallazgo 2 — edge-toggle propio (`.ds-sidebar__edge-toggle`) es una tercera forma redundante de colapsar

**Estado actual:** `SideBar.tsx` renderiza un botón hermano del `<nav>` con un chevron
hand-drawn (función interna `SideBarChevron`), `aria-label` "Contraer menú"/"Expandir
menú", cableado al mismo `onToggleCollapsed` controlado. Es la **tercera** forma de
togglear el menú:
1. El heading "Menú" (ya wireado a `onToggleCollapsed` — a confirmar si sigue igual
   una vez sacado el edge-toggle, o si el heading pasa a ser el único control).
2. El ícono nuevo del topbar de las screens de Tareas (`OpenCloseSidebarIcon`).
3. El edge-toggle propio del componente — candidato a sacarse.

**Por qué se agregó originalmente:** según el changelog de `SideBar.md` (0.1.1), el
edge-toggle se separó del header porque "el toggle no vive dentro del header y debe
straddlear el borde derecho" — una lectura del artwork del PDF, no una necesidad
funcional. `SideBar.md` § Known Limitations ya marca el glifo como "simplificado" y su
tamaño/posición como "provisionales, no medidos" — nunca fue una pieza firme.

**Impacto de sacarlo — cambio de comportamiento de un componente compartido:**
- Afecta el contrato público documentado en `knowledge/components/SideBar.md`
  (Behavioral Contract, DOM Structure, Props, Accessibility, Design Tokens — todas
  las menciones de `edge-toggle`/`SideBarChevron` quedan obsoletas).
- Afecta las stories `Expanded`/`Collapsed`/`Playground` de `SideBar.stories.tsx`.
- Afecta a los 5 consumidores (`Home`, `Dashboard`, `Carga de Formulario`,
  `TareasPendientes`, `TareasKanban`, `TareasFinalizadas` — 6 screens en 5 features).

**Preguntas para el grilling:**
- Al sacar el edge-toggle, ¿el heading "Menú" queda como único control de colapso
  *dentro* del componente (ya wireado a `onToggleCollapsed`), o `SideBar` deja de
  tener control interno propio y el colapso se dispara **solo** desde afuera (topbar)?
  Cambia qué tan "controlado" queda el componente.
- ¿Se documenta esto como versión con breaking change de DOM/comportamiento
  (`0.2.0`) dado que es un componente ya `shipped` y consumido por 5 features
  `CLOSED`?
- ¿Hace falta un ajuste de `aria-label`/`aria-expanded` en el heading "Menú" para
  no perder la semántica accesible que tenía el edge-toggle (`aria-expanded`,
  `aria-label` contextual "Contraer"/"Expandir")?

---

## Hallazgo 3 — colapso/expansión estático en las 3 screens de Tareas

**Estado actual:** en `packages/ui/src/screens/tareas-pendientes/`,
`tareas-kanban/`, `tareas-finalizadas/` (los 3 `.stories.tsx`), `SideBar` recibe
`collapsed={false}` (o similar) y `onToggleCollapsed={() => undefined}` — estático.
El ícono `OpenCloseSidebarIcon` del topbar también tiene `onClick={() => undefined}`
en las 3 stories.

**Contradice explícitamente `specs/004-familia-tareas/constitution.md` MUST-3:**
> "La screen de Tareas Pendientes es la única excepción de interactividad real del
> kit: mantiene `useState` local... Ningún otro screen de esta feature tiene
> interactividad — Kanban y Finalizadas son composiciones estáticas, igual que
> Home/Dashboard."

Como `004-familia-tareas` ya cerró (`APROBADO`, commit `66dadd6`), esto es una
**reapertura/enmienda** de esa constitution, no un fix silencioso sobre una feature
cerrada.

**Comportamiento esperado (a confirmar en el grilling, no asumido):** clickear
"Menú" (si sigue siendo control interno tras el Hallazgo 2) o el ícono
`OpenCloseSidebarIcon` del topbar debe togglear un `useState` real por screen — mismo
patrón que ya existe en `TareasPendientes` para `DetailSheet` (estado local, sin
routing ni estado global, per `constitution.md` PROHIBITED-3).

**Preguntas para el grilling:**
- ¿Las 3 screens pasan a tener `useState` de colapso (extiende MUST-3 a las 3 en vez
  de ser excepción exclusiva de Tareas Pendientes), o solo Tareas Pendientes gana esta
  segunda pieza de interactividad y Kanban/Finalizadas siguen estáticas pese al ícono
  del topbar?
- Si Kanban/Finalizadas ganan interactividad real, ¿se reescribe MUST-3 explícitamente
  en la constitution de `004`, o esto vive en la constitution nueva de este draft sin
  tocar el archivo ya `CLOSED` de `004`?
- ¿El estado de colapso se comparte entre las 3 screens (ej. mismo layout de topbar) o
  cada `.stories.tsx` mantiene su propio `useState` independiente, sin persistencia
  entre navegaciones (dado que no hay routing real)?

---

## Restricciones ya conocidas

- `knowledge/design-system-rules.md` es la autoridad de estilos.
- Sin framework de test instalado — verificación manual en Storybook (`Expanded`,
  `Collapsed`, `Playground` de `SideBar`, más las 3 stories de Tareas).
- `SideBar` es controlado-only (sin estado interno de colapso) — cualquier cambio
  debe preservar esa garantía documentada (`Behavioral Contract` de `SideBar.md`).
- `src/index.ts` es la única fuente de verdad de exports públicos; las 3 screens de
  Tareas NO se exportan ahí (`004-familia-tareas` PROHIBITED-4) — este draft no
  cambia eso.
- Medir con PyMuPDF (`get_drawings()`/`get_pixmap()`), no a ojo — mismo protocolo que
  el resto del kit (`knowledge/visual-analysis-protocol.md`).
- Antes de fijar geometría nueva: gate de `knowledge/visual-analysis-protocol.md`
  (PASS 9) + `knowledge/reasoning/fidelity-validation.md`.

## Fuentes de medición — DOS PDFs, no uno

**Componente aislado (hoja de spec):** `knowledge/references/design-reference.pdf`
p.13 ("SIDE BAR") — ya en el repo, es exactamente `Alejandria - UI Toolkit (3).pdf`
(mismo tamaño en bytes, v3, commiteado 2026-08-07). Fuente del ancho expandido/
colapsado (Hallazgo 1) y del artwork del edge-toggle (Hallazgo 2).

**Screens en contexto (mockups reales):**
`C:\Users\LunaVioletaGonzalez\Downloads\Alejandria - Agosto 2026.pdf` (112.9MB) —
**no commiteado al repo** (`DECISIONS.md` D008: PDFs de referencia grandes no se
versionan por defecto), pero sí accesible en disco y de consulta obligatoria vía
PyMuPDF, igual que `design-reference.pdf`. Páginas relevantes (mismas que
`knowledge/screens/*.md` § Source): **p.5** (Tareas Pendientes), **p.8** (Kanban),
**p.9** (Finalizadas) — para ver el SideBar *en contexto* dentro de cada screen
(confirmar si el mock muestra un estado expandido/colapsado, validar el hallazgo de
solapamiento en viewports angostos, y no solo medir el componente aislado de p.13 del
otro PDF).

**No repetir el error ya documentado en `DECISIONS.md`** (entrada retroactiva
~2026-08-11/12, sizing de `DetailSheet`): asumir que "no está en el repo" significa
"no se puede consultar" sin buscarlo primero en Descargas. Ambos PDFs se miden con
`get_drawings()`/`get_pixmap()`/`get_text()` según corresponda antes de fijar
cualquier valor en `plan.md`.

## Referencias

- `knowledge/component-roadmap.md` § "Gaps nuevos encontrados" — hallazgo original y
  decisión de Luna de tratar esto aparte de `004`/`005`.
- `knowledge/components/SideBar.md` — contrato actual, Known Limitations (ancho no
  medido, edge-toggle "simplificado"/"provisional").
- `specs/004-familia-tareas/constitution.md` — MUST-3 (screens estáticas) y
  PROHIBITED-1 (no tocar `SideBar.tsx`), ambas contradichas por este draft.
- `specs/005-alert-toast-filter/constitution.md` — mismo PROHIBITED sobre `SideBar`
  (a confirmar contenido exacto en el grilling).
- `specs/003-home-dashboard/`, `specs/002-bg-texture/` — features `CLOSED` que
  también consumen `SideBar` sin tocarlo.
- `packages/ui/src/components/SideBar.tsx` — componente a modificar (ancho +
  edge-toggle).
- `packages/ui/src/screens/tareas-pendientes|tareas-kanban|tareas-finalizadas/` —
  screens a cablear.
- `knowledge/references/design-reference.pdf` p.13 ("SIDE BAR") — fuente de medición.
- `DECISIONS.md` — pendiente registrar, una vez resuelto el grilling, por qué esto
  se separó de `004`/`005` y qué constitutions quedan enmendadas.
