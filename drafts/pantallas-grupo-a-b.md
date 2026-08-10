# Draft — Pantallas Grupo A/B ("Alejandria - Agosto 2026.pdf")

Notas crudas para `/sdd-refine`. No es un spec formal. Cubre las 14 páginas que
`handoffs/20260807-fase5-checkables-geometry-screens-draft.md` (Parte 2) marcó como
pendientes del triage: p.1, 2, 3, 4, 5, 6, 7, 8, 9, 12, 20, 21, 22, 23 (p.19 "Carga de
Formulario" ya está construida — `knowledge/screens/carga-de-formulario.md`).

**Fuente:** `Alejandria - Agosto 2026.pdf` (Downloads de Luna, no committeado al repo por
tamaño — ver `DECISIONS.md` 2026-08-07). Releído directamente con PyMuPDF
(`get_text('blocks')` + `get_pixmap()` renderizado) para este draft, **no** copiado del
triage existente en `knowledge/component-roadmap.md` § "Screens triage" sin verificar — y
esa reverificación encontró un problema real, ver la sección siguiente antes que nada.

---

## ⚠️ Hallazgo antes de todo: el mapeo de páginas del triage existente tiene un error real (p.3/p.5/p.6)

El triage en `component-roadmap.md` (2026-08-07) cita:

| p. | Triage dice | Contenido real (releído 2026-08-10) |
|---|---|---|
| 3 | "Asistente IA (estado vacío)" | **Home completo**: SideBar expandido + `HOLA SEBASTIÁN, ¿Qué querés hacer hoy?` (input de asistente con mic + "Adjuntar archivos" + botón EJECUTAR + chips de sugerencia) + "PRÓXIMOS EVENTOS" (6 tarjetas tipo `CalendarCard`) + "RESUMEN DE PRODUCTIVIDAD" (`MetricCard` ficha ×2 + un gauge `ProgressRing` "ASISTENCIAS") + columna derecha "TAREAS EN FECHA" (lista scrolleable de `TaskCard`) |
| 5 | "Home (eventos + KPIs)" | Grilla simple de **Tareas Pendientes**: toggle "EN FECHA / VENCIDAS", buscador, `TaskCard` ×12 con triángulo de acento en la esquina (rojo/verde) |
| 6 | (no tiene fila propia — el triage solo listaba una fila "Tareas pendientes (grid)" en p.6) | Otra grilla de **Tareas Pendientes**, pero con tratamiento distinto: tabs con barra de progreso "EN FECHA 45% / RETRASADAS 75%", `TaskCard` ×8 con botón "VER MÁS", sin triángulo de acento |

La descripción que el triage puso en la fila "p.5 Home" (asistente + gauges + tarjeta de
próximo evento) **es exactamente el contenido real de p.3**, no el de p.5. Lo más probable:
una lectura anterior contó mal las páginas — son 5 páginas consecutivas casi idénticas a
primera vista ("5 TAREAS PENDIENTES" aparece como badge fijo en la topbar de p.4 a p.9, no
es un título de página, lo que hace fácil confundirlas sin renderizar cada una).

**No hay una página separada de "Asistente vacío"** — el shell estático de `Asistente.tsx`
(que ya existe, construido 2026-07-22) es simplemente *una región* dentro de Home (p.3), no
una pantalla propia en este PDF. Esto no es una pérdida de alcance: es un hallazgo de que el
alcance original tenía una pantalla de menos de las que parecía (Home y "Asistente vacío"
eran la misma pantalla, contada dos veces con dos nombres).

**Pregunta para el grilling — no asumida acá:** p.5 y p.6 ¿son dos pantallas reales
distintas (ej. una vista simple vs. una vista con métricas de cumplimiento) o dos
alternativas de diseño para la misma pantalla "Tareas Pendientes" mostradas lado a lado para
comparar — mismo patrón que ya se confirmó en p.19 ("Carga de Formulario" resultó ser una
*field gallery*, no una pantalla literal, ver `knowledge/screens/carga-de-formulario.md`)?
Si es lo segundo, construir solo una (probablemente p.6, que tiene más affordance real —
"VER MÁS" navegable — que el triángulo decorativo de p.5) y documentar la otra como
alternativa descartada.

**Acción recomendada antes de generar specs:** corregir la fila de `component-roadmap.md`
citando p.3 como Home (no "Asistente vacío") una vez que el punto anterior esté resuelto —
no lo hice en este draft porque cambiaría el triage sin que el equipo lo haya confirmado
todavía (mismo criterio de "no asumir respuestas" que pide el handoff de Parte 2).

---

## Grupo A — páginas releídas y confirmadas

Todas verificadas con `get_pixmap()` (no solo texto) el 2026-08-10.

### p.1 — Welcome / splash
Ilustración 3D decorativa (poliedro facetado + wireframe de puntos conectados) + wordmark
"ALEJANDRIA FUSION PLATFORM / WELCOME" abajo a la izquierda. Confirmado: asset estático de
una sola vez, no requiere componente ni screen doc — coincide con el triage.

### p.2 — Login
Fondo full-viewport con el mismo patrón de puntos punteados que ya usa `Login.tsx` (PDF
p.7 de `design-reference.pdf`) + wordmark "Alejandría / Fusion Platform" centrado arriba +
la card de login (grid 3×3 de puntos decorativos + campo CONTRASEÑA + botón INGRESAR) —
coincide 1:1 con el patrón ya construido. Lo único nuevo a nivel *screen* (no *componente*):
confirmar si el patrón de puntos del fondo full-screen es el mismo token/asset que el de la
card (tileado) o un fondo de página distinto — pregunta chica, no bloqueante.

### p.3 — Home (eventos + KPIs) — ver hallazgo arriba, esto reemplaza "Asistente vacío"
- **Regiones:** `SideBar` expandido (mismo item set que `SideBar.stories.tsx`) · saludo +
  input de `Asistente` (mic, adjuntar archivos, botón EJECUTAR, 4 chips de sugerencia) ·
  "PRÓXIMOS EVENTOS" (6× tarjeta fecha+descripción, `CalendarCard`) · "RESUMEN DE
  PRODUCTIVIDAD" (2× `MetricCard` ficha con ícono editar/borrar + 1× `ProgressRing`
  "ASISTENCIAS" 75%) · columna derecha fija "TAREAS EN FECHA" (lista scrolleable de
  `TaskCard`, con badge de notificación tipo pill en el ícono de la campana del `SideBar`).
- **Componentes:** `SideBar`, `Asistente` (o su input, reutilizado suelto — a decidir),
  `CalendarCard`, `MetricCard`, `ProgressRing`, `TaskCard`.
- **Cero gaps de componente** — todo ya existe y está fidelity-checked.
- **Pregunta:** `Asistente.tsx` hoy es un shell completo (in cluye toda la card). Esta
  pantalla usa solo el input+chips, no toda la superficie de `Asistente.tsx` tal cual — ¿se
  reusa el componente completo (probablemente correcto, ya que su prop shape ya es
  "saludo + input + chips") o hace falta revisar si `Asistente.tsx` fuerza algún layout que
  no calza en esta composición de 3 columnas?

### p.4 — Dashboard módulos
`ModuleCard` ×8 en grilla 2×4, `SideBar` colapsado. Cada card ya soporta múltiples filas de
métrica (`ModuleMetric[]`, confirmado en `ModuleCard.tsx`) — varias cards de esta página
muestran 2 métricas (ej. "INVESTIGACIONES ABIERTAS: 30" + "CASOS PENDIENTES: 6"), lo que ya
está cubierto por la API actual. Cero gaps.

### p.5 — Tareas Pendientes (grid, variante A) — ver hallazgo arriba
Toggle "EN FECHA / VENCIDAS" (¿`SegmentedControl`?) + buscador + ícono de filtro + grilla de
`TaskCard` (triángulo de acento rojo/verde en la esquina, ya soportado por `TaskCard`'s
`tone`). Sin paginación visible pese a tener 12+ cards — mismo gap ya trackeado
("Pagination", tabla post-baseline de `component-roadmap.md`).

### p.6 — Tareas Pendientes (grid, variante B) — ver hallazgo arriba
Mismo layout base, pero: tabs con barra de progreso + porcentaje ("EN FECHA 45%" /
"RETRASADAS 75%") en vez del toggle simple, y cada `TaskCard` tiene un botón "VER MÁS" (no
tiene el triángulo de acento). El ícono de filtro se mantiene. Ver la pregunta del hallazgo
— antes de construir, confirmar si esto es una pantalla real distinta de p.5.

### p.7 — Tareas: master-detail
Lista de `TaskCard` a la izquierda (angosta, colapsa contenido) + panel de detalle a la
derecha, superpuesto (no un segundo panel fijo — tiene su propio `X` de cierre arriba a la
derecha, se comporta como un overlay/drawer, no como dos columnas fijas). Contenido del
panel: 2 pills de estado ("EN ESPERA" / "VENCIDA", el segundo destacado en rojo) + selects de
país/fecha + bloque DESCRIPCIÓN + 3× `MetricCard` ficha (TAREAS/RECURSOS/RECURSOS) +
"ARCHIVOS MULTIMEDIA" (contador Fotos/Videos/Audios + 3 thumbnails) + "MÉTRICAS DE
RENDIMIENTO DE LA TAREA" (`LinearBarChartCard` vertical, con una barra destacada en rojo) +
footer "ACCIONES" con **3** botones (DECISIÓN A/B/C).
- **Casi 1:1 `DetailSheet`**, coincide con el triage — pero **no es un modal centrado**, es
  un panel ancho que ocupa la mayor parte del viewport a la derecha de una lista angosta.
  Confirmar contra `DetailSheet.tsx` actual si soporta ese layout (panel lateral ancho, no
  card centrada) antes de asumir que calza sin cambios.
- **3 botones de acción, no 2** — distinto del patrón confirm/cancel de `Modal` (2 botones).
  Si `DetailSheet` no tiene slot de acciones múltiples hoy, es un gap chico a decidir en
  `/sdd-refine`.

### p.8 — Tareas: kanban
3 columnas (EN FECHA / RETRASADAS / FINALIZADAS) con distinta cantidad de `TaskCard` cada
una (4/2/1), `SideBar` colapsado. **Bug de sizing sin cerrar ya trackeado**
(`component-roadmap.md` § "2026-07-28 sizing pass": un `style` externo pisa el cap del
componente en la variante kanban) — el handoff de Parte 2 pide decidir si se cierra antes de
mostrar esta pantalla o queda dentro del scope de la feature que construya esta pantalla. No
lo resolví acá — es justo la clase de decisión que le corresponde a `/sdd-refine`/al humano,
no a este draft.

### p.9 — Tareas Finalizadas (grid)
Grilla de `TaskCard` (8, sin triángulo de acento, con "VER MÁS") + selects de
comisaría/fecha + buscador, `SideBar` colapsado. Mismo componente que p.5/p.6, otro filtro.
Cero gaps de componente (mismo gap de paginación ya trackeado).

### p.12 — Reportes
4× `MetricCard` reporting (arriba) + `DonutChartCard` ("ASISTENCIAS" 75%) +
`LinearBarChartCard` vertical ("MÓVILES ARREGLADOS", con 2 barras destacadas en rojo) +
`BarChartCard` ("AUSENCIAS", L-D grayscale) + un donut de dos segmentos ("TAREAS" 45%
en fecha / 30% atrasadas — **confirmar si `DonutChartCard` soporta 2 segmentos simultáneos
en un solo anillo o si esto necesita 2 anillos superpuestos**, no medí esto en detalle) +
`LineChartCard` ("HISTÓRICO TAREAS"). Selects de comisaría/fecha + buscador arriba.
Casi 100% componentes existentes, coincide con el triage — la única pregunta real es el
donut de 2 segmentos.

### p.23 — Usuarios Creados
`DataTable`: columna de checkbox + Usuario/Contraseña (dots enmascarados + ícono de ojo,
sin toggle visible de mostrar/ocultar en este mock —¿solo decorativo?) /Permisos/Estado/
Acciones (editar/borrar) + buscador arriba, `SideBar` expandido. Coincide con el triage.
Sort/filter/paginación no visibles en este mock estático pese a estar trackeados como gap
High priority — no hay evidencia nueva del PDF sobre cómo deberían verse, sigue abierto tal
como ya estaba.

---

## Grupo B — falta decidir gaps chicos antes de construir (no asumido acá, per el handoff)

### p.20 — Modal + Toast + Acordeón
- **Modal**: coincide **exactamente** con `Modal.tsx` ya construido y recién revisado en la
  Parte 1 de esta misma sesión — mismo título "¿ESTÁS SEGURO DE ESTA ACCIÓN?", mismo texto,
  mismo par "ACCIÓN A" (relleno)/"ACCIÓN B" (plano). Cero gap, cero cambio.
- **Toast/snackbar**: "Se creó una tarea con éxito", pill centrada arriba de la pantalla,
  sin ícono visible, sin botón de cerrar visible en este mock. Gap real, ya trackeado.
  **Preguntas para el grilling:** ¿auto-dismiss (cuánto tiempo) o requiere cierre manual? ¿un
  solo tono (éxito) o también error/warning/info como la mayoría de sistemas de toast? El
  PDF no lo especifica — no inventar acá.
- **Acordeón**: 4 filas "DESPLEGABLE", la primera expandida (chevron arriba, texto Lorem
  ipsum visible) + un tooltip anotado "Colapsar el desplegable" apuntando al chevron de la
  fila abierta. Gap real, ya trackeado. **Pregunta:** ¿expansión exclusiva (una sola fila
  abierta a la vez, como este mock sugiere al mostrar solo 1 de 4 abierta) o múltiples filas
  pueden estar abiertas simultáneamente? El mock muestra un solo estado, no alcanza para
  inferir la regla — pedirle a diseño o decidir explícitamente en `/sdd-refine`.

### p.21 — Asistente IA: thread de chat
Burbuja de usuario (alineada a la derecha, con "cola" de globo) + respuesta del asistente
(alineada a la izquierda, texto plano sin burbuja) — el mismo par de mensaje se repite dos
veces en la página (posible artefacto de mockup duplicado, mismo patrón ya visto en otras
páginas de este PDF, o intencional para mostrar que hay scroll). Input persistente abajo
(mic + adjuntar + EJECUTAR + chips), mismo look que el input de Home (p.3).
- **Gap real**: el thread scrolleable + el tratamiento de burbuja de usuario no existen en
  `Asistente.tsx` hoy (shell estático solamente, confirmado en `component-roadmap.md`).
- **Pregunta:** ¿nuevo componente `ChatThread`/`ChatMessage` reusable, o parte interna de un
  futuro `Asistente` con estado (no solo landing)? Afecta directamente el scope de p.22
  también (ver abajo), que reusa el mismo patrón de burbujas — decidir una sola vez para
  ambas páginas, no dos implementaciones distintas del mismo patrón visual.

### p.22 — Misión con tabs + Asistente IA embebido
Header "INCENDIO TIPO A - FASE 1 · EN VIVO" (rojo) + **TabNav** (Misión / Asistente IA /
Métricas / Resumen ejecutivo / Resumen completo) + panel "Misión" activo: 4× `ProgressRing`
(Evacuados/Habitantes/Hectáreas/Animales) + carrusel "IMÁGENES EN VIVO" (3 thumbnails
drone/bodycam, scroll horizontal) + "LOG IA" (lista con 2 botones de decisión A/B por fila,
igual patrón que `Modal`'s acciones pero inline, no en diálogo) + panel lateral fijo
"ASISTENTE IA" con el mismo tratamiento de burbujas de chat que p.21, su propio input y
footer con "LOG IA: EVACUACION BARRIO SUR · PROGRESO 73% · 847 DE 1.160 PERSONAS FUERA".
- **Gaps reales**: `Tabs`/`TabNav` (no existe) + el mismo thread de chat que p.21.
- **Pregunta adicional a la de p.21**: el "LOG IA" de esta página tiene decisiones A/B
  **inline en cada fila de una lista**, distinto del patrón de `Modal` (diálogo bloqueante) —
  ¿esto es un componente nuevo (`DecisionRow`/similar) o una composición ad-hoc de
  `Button`×2 dentro de una lista? El resto del contenido (gauges, carrusel, chat) es
  reusable tal cual está.

---

## Hallazgo adicional: textura de puntos de fondo — candidata a asset propio del sistema

Luna señaló que el fondo punteado que aparece en varias pantallas (al menos p.1, 2, 3, 4, 5,
6, 8, 9, 20 — cualquier pantalla con fondo oscuro pleno) no es decoración de una sola
pantalla, es un fondo compartido, y debería vivir en el design system en vez de quedar
implícito en cada mockup. Comparte el archivo fuente: `Textura fondo.svg` (Downloads de
Luna, 2.51MB, no committeado — mismo criterio de tamaño que la PDF de pantallas, ver
`DECISIONS.md`).

**Medido con regex/PyMuPDF sobre el SVG (no cargado entero — 2.51MB, ~17.4k elementos):**
- `viewBox="0 0 1920 1424.71"` — mismo ancho @2× que el resto de los PDFs de este proyecto,
  pero más alto (1424.71 vs 1080) — parece pensado para recortarse/tilearse a distintas
  alturas de pantalla, no atado a un viewport fijo.
- **17.920 elementos** (17.384 `<path>` + 536 `<ellipse>`), cada uno un punto individual —
  export crudo de Illustrator, no un `<pattern>` tileable. Impracticable de committear tal
  cual (mismo problema de tamaño que ya se resolvió para la PDF grande, ver `DECISIONS.md`
  2026-08-07) y va contra la convención de tokens de este repo (`--ds-*` en `styles.css`, no
  assets binarios pesados por componente).
- **Grid regular**, no aleatorio en posición: pitch horizontal ≈17.13 unidades, pitch
  vertical ≈9.10 unidades (medido sobre los puntos de inicio `M x,y` de cada path, que sí son
  coordenadas absolutas — confiable). ~112 columnas × ~156 filas dentro del viewBox.
- Color base: `#ebf2fe` (blanco azulado muy claro) — no hay ningún token `--ds-*` con ese hex
  hoy, sería nuevo.
- Opacidad de grupo: `.63` sobre el `<g>` contenedor completo.
- **Cada punto tiene su propia opacidad individual random** (rango medido 0.5–0.99, promedio
  ≈0.87, sobre una muestra de las clases con regla explícita) — no es una grilla plana, tiene
  ruido/variación punto a punto, dándole el aspecto de textura orgánica que se ve en los
  renders. Verifiqué que esta variación **no tiene un patrón radial** (no hay fade hacia el
  centro ni hacia los bordes — opacidad promedio pareja en todos los anillos de distancia
  medidos desde el centro del canvas).
- Tamaño de punto también varía individualmente — confirmado con las 536 instancias
  `<ellipse>` (que tienen `rx`/`ry` explícitos, a diferencia de los `<path>`, cuyas curvas
  relativas no dejan medir el diámetro de forma confiable sin un parser de paths real):
  radio 0.88–6.37 unidades.

**Por qué esto importa para el draft:** ninguna de las pantallas de arriba (ni las ya
construidas, como Login o Carga de Formulario) documenta este fondo como parte de su propia
composición hoy — está "regalado" en el mockup, no en el kit. Si el fondo es realmente
compartido entre todas estas pantallas (parece que sí, visualmente idéntico en cada una que
lo tiene), construirlo una sola vez como asset/token del sistema es más barato que seguir
tratándolo como decoración implícita de cada screen nueva.

**Preguntas para el grilling de `/sdd-refine` — no resueltas acá:**
- ¿Se reproduce fiel (grid regular + ruido de opacidad/tamaño por punto, como mide el SVG
  real) o se aproxima con algo más liviano (ej. un solo tile SVG pequeño con `<pattern>`,
  repetido vía CSS `background-repeat`, aceptando que el "ruido" se repita cada tile en vez
  de ser único en toda la pantalla)? La reproducción fiel requeriría igual miles de nodos
  DOM si se hace con elementos reales — probablemente solo tiene sentido como imagen rasterizada
  o un filtro SVG de ruido (`feTurbulence`), no como HTML/SVG literal por punto.
  **17.4k elementos DOM reales no es una opción seria para producción.**
- ¿Nuevo token de color (`--ds-color-pattern-dot` o similar para `#ebf2fe`) o se relaciona
  con algún `--ds-color-*` ya existente? A simple vista no hay ningún token con ese hex hoy.
- ¿Esto es un **componente** (`<BackgroundTexture />`), una **clase utilitaria** en
  `styles.css` (`.ds-bg-texture-dots`), o un **asset estático** (`.svg`/`.png` de fondo,
  referenciado vía `background-image`)? Cualquiera de las tres es razonable — no hay
  precedente todavía en este kit para un "fondo de pantalla" reusable (todo lo existente es
  componente/patrón de contenido, no decoración de superficie completa).
- ¿Se aplica siempre al mismo fondo (`--ds-color-pdf-surface` `#060606`) o puede aparecer
  sobre otros fondos oscuros de la familia (`-surface-warm`, etc.)? Todas las pantallas donde
  lo vi son sobre `#060606` — no hay evidencia todavía de que aparezca en otro contexto.

## Recomendación de agrupamiento (sugerencia, no decisión)

14 páginas es mucho para una sola feature/sprint. Sugerido, a confirmar en `/sdd-refine`:

| Posible sprint | Páginas | Por qué juntas |
|---|---|---|
| 0 — Textura de fondo | (transversal, no es una página) | Bloquea/afecta visualmente casi todas las demás — mejor cerrarla primero que repetir la pregunta en cada sprint que la necesita |
| 1 — Home & Dashboard | p.1, 2, 3, 4 | Cero gaps de componente, resuelve el hallazgo de arriba (p.3), bajo riesgo |
| 2 — Familia Tareas | p.5, 6, 7, 8, 9 | Comparten `TaskCard`/`SideBar`; p.8 necesita el fix de sizing ya trackeado; p.7 tiene la pregunta de `DetailSheet` como panel lateral + 3 acciones |
| 3 — Reportes & Usuarios | p.12, 23 | Composición pura, sin gaps nuevos, bajo riesgo |
| 4 — Toast + Acordeón | p.20 | Modal ya no tiene trabajo — los 2 componentes nuevos son chicos e independientes entre sí |
| 5 — Tabs + Chat thread | p.21, 22 | El gap más grande de las 14 páginas (2 componentes nuevos con estado real, no solo presentacionales) — separarlo para no bloquear las demás |

---

## Restricciones ya conocidas (de `existing-arch.md` / sesiones previas, no negociables salvo `/sdd-log`)

- Un componente = un `.tsx` + un `.stories.tsx` plano en `packages/ui/src/components/`,
  salvo que sea una composición de pantalla completa (`packages/ui/src/screens/<slug>/`,
  precedente: `carga-de-formulario/`) o un patrón reusable (`packages/ui/src/patterns/`).
- Tokens de color/tipografía vía `--ds-*` en `styles.css`; convención `@2× ÷ 2` para todo lo
  que no sea hairline/radius/em/rem (ver `knowledge/specs/README.md` § Scale calibration).
- Antes de fijar cualquier geometría nueva: aplicar el método de
  `knowledge/visual-analysis-protocol.md` (PASS 9) y el gate de
  `knowledge/reasoning/fidelity-validation.md` — no repetir el patrón "verifiqué colores y
  lo llamé fidelity-passed" que ya generó bugs reales dos veces este mes.
- Sin framework de test instalado — cualquier task de test en `/sdd-implement` requiere
  elegir framework explícitamente.
- `src/index.ts` es la única fuente de verdad de exports públicos.

## Referencias
- `knowledge/component-roadmap.md` § "Screens triage" — triage original (2026-08-07), con
  el error de mapeo de p.3/p.5/p.6 sin corregir todavía (ver hallazgo arriba).
- `knowledge/screens/carga-de-formulario.md` — precedente de screen doc + el caso ya
  confirmado de "página PDF = field gallery, no pantalla literal" (misma pregunta abierta
  para p.5/p.6 acá).
- `handoffs/20260807-fase5-checkables-geometry-screens-draft.md` — handoff que originó este
  draft (Parte 2).
- `DECISIONS.md` (2026-08-07) — por qué el PDF fuente no se committea al repo.
- `Textura fondo.svg` (Downloads de Luna, 2.51MB) — fuente del fondo punteado, ver hallazgo
  arriba. No committeada por tamaño, mismo criterio que la PDF de pantallas.
