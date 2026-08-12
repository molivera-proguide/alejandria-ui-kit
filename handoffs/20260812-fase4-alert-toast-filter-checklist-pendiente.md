# Handoff — Continuar después de la implementación de 005-alert-toast-filter (checklist/review pendiente)
Fecha: 2026-08-12
Tipo: GATE
Sesión de origen: Fase 4 (implementación) en curso — `004-familia-tareas` y
`005-alert-toast-filter`, ambas `OPEN`, con varias rondas de fidelity-check
post-entrega ya resueltas. Ninguna de las dos pasó todavía por `/sdd-checklist`
ni `/sdd-review`.
Próximo comando sugerido: `/sdd-checklist`

---

## Contexto del proyecto
Alejandría UI Kit — librería de componentes React con `knowledge/` como fuente de
verdad visual AI-first. Esta sesión encadenó 2 features hermanas: `004-familia-tareas`
(3 screens de Tareas — Pendientes/Kanban/Finalizadas) y `005-alert-toast-filter`
(3 componentes nuevos — `AlertBar`/`Toast`/`FilterField` — más el retrofit de esas
mismas 3 screens con el topbar y el campo de filtro real).
→ Ver: `specs/004-familia-tareas/`, `specs/005-alert-toast-filter/`, `input.md`
(brief actual = 005), `DECISIONS.md`.

## Estado al momento del handoff

✅ Completado:
- `004-familia-tareas`: T001–T006 implementados (3 screens nuevas + gaps de
  `TaskCard`/`DetailSheet`).
- `005-alert-toast-filter`: T001–T009 implementados (`AlertBar`, `Toast`,
  `FilterField` + 3 íconos nuevos + retrofit completo de las 3 screens + docs de
  `knowledge/`).
- **3 rondas de correcciones post-entrega**, todas verificadas y confirmadas
  visualmente por Luna en su propio Storybook (yo no puedo tomar screenshots en
  este entorno — toda verificación mía fue por `getComputedStyle`/
  `getBoundingClientRect`, la confirmación visual final siempre fue de Luna):
  1. Ancho del panel de `DetailSheet` (960→720→656px, este último medido de
     verdad contra el PDF) + botón "VER MÁS" (link→chip) + reposicionamiento del
     overlay.
  2. Ancho por default de `DetailSheet` (590→656px, la hoja de spec limpia decía
     "tamaño variable", nunca hubo un valor real) + grilla de
     `ARCHIVOS MULTIMEDIA` (se salía de su columna) + `font-size` de
     `ficha .ds-metric__value` (26→25px, cerraba un TODO viejo) + heading
     "Tareas Pendientes"/"Tareas Finalizadas" faltante en 2 screens.
  3. Bug de stacking context en `TaskCard` `variant="default"` (fondo invisible
     al combinarse con `BackgroundTextureDots`, `isolation: isolate`) + borde
     faltante en el chamfer (SVG inline de 31×31px).
- `DECISIONS.md` al día — incluye 3 entradas registradas **retroactivamente** en
  esta misma sesión (correcciones 1 y el z-index del overlay habían pasado sin
  loggear en su momento; se encontró y corrigió recién al hacer el chequeo de
  trazabilidad de este handoff).

🔄 En curso:
- Ninguno puntual — el ciclo de implementación + fidelity-check de ambas features
  llegó a un punto estable (Luna confirmó "se ve bien" en la última corrección).

🚧 Bloqueado / pendiente de decisión:
- **¿`004-familia-tareas` y `005-alert-toast-filter` se cierran (`/sdd-checklist`
  + `/sdd-review`) como 2 features separadas, o como una sola unidad de trabajo?**
  Tienen overlap real de archivos (mismo owner, ya documentado sin colisión en
  `features.yaml`) — no decidido todavía, preguntar antes de asumir.
- `knowledge/components/TaskCard.md` y su `.spec.md` siguen sin documentar la prop
  `viewMore` — señalado 2 veces durante esta sesión, nunca resuelto (no estaba en
  el scope de ninguna de las 2 features).
- Dashboard (p.4, `003-home-dashboard`, ya `CLOSED`) tiene el mismo gap de topbar
  que se cerró en las 3 screens de Tareas — decisión explícita de Luna de dejarlo
  afuera por ahora, sin fecha de retomarlo.
- Limpieza de `TextField`/`SelectField`/`AlertBanner` — Luna los identificó como
  componentes inventados (no basados en el PDF real) durante el grilling de
  `005-alert-toast-filter`. Sin feature asignada todavía.
- Idea sin decidir: pilotear el modelo Fable para el fidelity-pass — ver
  `knowledge/fidelity-pass/next-steps.md`, nota del 2026-08-11 (no una decisión,
  una idea a evaluar más adelante).

## Caminos descartados (intentados sin éxito)
- **Asumir que "el PDF fuente no está en el repo" significa "no lo puedo
  consultar"** — descartado con evidencia: el PDF SÍ está accesible en Downloads
  de Luna (`C:\Users\LunaVioletaGonzalez\Downloads\Alejandria - Agosto 2026.pdf` y
  `Alejandria - UI Toolkit*.pdf`), solo no está comiteado por tamaño (ver
  `DECISIONS.md` 2026-08-07). Lección para toda sesión futura: preguntar/buscar
  antes de asumir que una fuente es inaccesible.
- **Corregir valores visuales por razonamiento/aproximación en vez de medirlos**
  — descartado 3 veces esta sesión (ancho del panel, 3 iteraciones; estilo de
  "VER MÁS"; aunque en un caso — los colores de `DECISIÓN A/B/C` — el
  razonamiento resultó exacto al medirlo, no siempre es tan afortunado). Medir
  siempre que la fuente esté disponible, no asumir que "razonable" alcanza.
- **`box-shadow: inset` para el borde del chamfer de `TaskCard`** — descartado:
  no es consciente de la forma de `clip-path`, tiene el mismo problema que
  `border` nativo (se calcula sobre la caja rectangular original).
- **Reproducir toda la card con chamfer como una sola imagen SVG** — descartado
  por rigidez: perdería la flexibilidad de contenido dinámico (título/meta/fechas
  variables por tarea).
- **Tomar screenshots con la herramienta `Browser` (panel embebido) de este
  entorno** — descartado toda la sesión: el panel no compone frames reales acá
  (`screenshot failed: ... the Browser pane is not displayed`), timeout siempre.
  No es una limitación de Claude en general — es específica de esta herramienta
  en este entorno, y ya estaba documentada como recurrente en sesiones anteriores
  (`knowledge/fidelity-pass/next-steps.md`). Toda verificación visual de esta
  sesión se hizo por `getComputedStyle`/`getBoundingClientRect`/`elementFromPoint`
  vía `javascript_tool`, nunca por imagen — la confirmación visual final siempre
  fue de Luna mirando su propio Storybook.

**Pendiente de probar, no descartado:** esta misma sesión tiene disponibles
"Claude en Chrome" (controla el Chrome real de Luna, instalado — al ser una
ventana real debería componer frames y permitir screenshots) y "Playwright"
(lanza su propio navegador automatizado, diseñado para esto). Ninguna de las dos
se probó todavía. Si la próxima sesión logra usarlas, se podría verificar
fidelidad visual con imágenes reales en vez de depender de que un humano mire
Storybook cada vez — vale la pena intentarlo temprano en la próxima sesión.

## Foco de la próxima sesión
Correr `/sdd-checklist` — primero aclarar explícitamente con el humano si
`004-familia-tareas` y `005-alert-toast-filter` se checklistean/revisan por
separado o juntas (ver bloqueo arriba, no asumir). Después `/sdd-review` de lo
que corresponda antes de cerrar cualquiera de las 2 features en
`specs/_registry/features.yaml`.

Antes de arrancar el checklist, vale la pena correr `/sdd-health` dado el volumen
de correcciones post-implementación de esta sesión (11 entradas nuevas en
`DECISIONS.md`) — confirmar que no quedó drift entre los artefactos SDD
(`spec.md`/`tasks.md` de ambas features) y el código real, ya que varias
correcciones tocaron archivos por fuera de lo que sus `tasks.md` originales
detallaban explícitamente (ej. `styles.css` de `TaskCard`, tocado por
`005-alert-toast-filter` sin estar en su `tasks.md` original — es una extensión
razonable dado que el bug era real, pero vale la pena que `/sdd-health` lo
confirme).

## Decisiones relevantes
→ Ver `DECISIONS.md` — 11 entradas del 2026-08-11/12 (buscar "004-familia-tareas"
y "005-alert-toast-filter"). Las más importantes para la próxima sesión:
- El ancho de `DetailSheet` (656px, default y `--wide` ahora son el mismo valor)
  y el CSS de `.ds-task--default` (`isolation: isolate` + SVG del chamfer) son
  ahora los valores correctos, confirmados visualmente por Luna — no reabrir sin
  evidencia nueva del PDF.
- La duplicación de config de `SideBar` en 6 screens sigue sin resolver a
  propósito (decisión de `004-familia-tareas`, 2026-08-11) — no es un olvido.

## Skills / comandos sugeridos para la próxima sesión
- `/sdd-checklist` — comando sugerido, una vez aclarado el punto de scope de
  arriba.
- `/sdd-health` — recomendado correr antes, dado el volumen de correcciones de
  esta sesión (ver Foco de la próxima sesión).
- **Probar `mcp__claude-in-chrome__*` o `mcp__playwright__*` para screenshots
  reales** — ver "Pendiente de probar, no descartado" arriba. No es un comando
  SDD, es una mejora de proceso: si funciona, el fidelity-check de futuras
  sesiones puede verificar con imágenes en vez de depender de que Luna mire
  Storybook cada vez.

## Información redactada
Ninguna.
