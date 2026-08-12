# Draft — Alert Sigcat, Toast ("Tarea realizada") y campo Filter

Notas crudas para `/sdd-refine`. No es un spec formal. Surge en medio de
`004-familia-tareas` (Familia Tareas): al fidelity-check las 3 screens nuevas contra
`Alejandria - Agosto 2026.pdf`, Luna señaló que el ícono de filtro que usé en los
toolbars de `tareas-pendientes`/`tareas-kanban`/`tareas-finalizadas`
(`Button` secundario + ícono `Filter` de lucide-react) es un hack inventado, no el
componente real — y que hay 2 piezas más sin construir en el mismo relevamiento.

**Fuente, esta vez sí verificada, no a ojo:** `knowledge/references/design-reference.pdf`
(24 páginas, sí está en el repo — a diferencia de `Alejandria - Agosto 2026.pdf`),
páginas 22 ("ALERT") y 23 ("FILTER"). Medido con PyMuPDF (`get_pixmap()` +
`get_drawings()`/`get_text()` donde hizo falta), pero en este caso las dos páginas
son **hojas de spec con valores exactos anotados por el diseñador** (hex, pt, px), no
mockups para medir a ojo — mucho menos margen de error que el resto de esta feature.

---

## Hallazgo 0 — por qué esto bloquea `004-familia-tareas`

Las 3 screens nuevas de Familia Tareas (p.5/8/9) muestran, en el PDF real, un ícono de
filtro (embudo+chevron) pegado a un buscador oscuro sin label visible — no lo que
implementé (un `Button` con ícono + un `TextField` con label "BUSCAR TAREA" arriba).
Corregir esas 3 toolbars bien requiere el componente real del "FILTER" de abajo. Este
draft cierra esa dependencia antes de seguir ajustando `004-familia-tareas`.

---

## Componente 1 — "Alert Sigcat" (p.22, no existe hoy)

Barra de alerta ancha, full-width, un solo label centrado — **no es lo mismo que
`AlertBanner.tsx`** (que ya existe, pero es una tarjeta con ícono+título+descripción+
acción — un componente distinto, para otro caso de uso, no confirmado si tiene su
propia página en el PDF o si fue una composición ad-hoc previa).

**Dos ejemplos en la página:**
- "3 ALERTAS NUEVAS" — texto plano.
- "INCENDIO TIPO A - FASE 1" — mismo tratamiento, texto en rojo (variante alerta).

**Spec anotada (verbatim del PDF):**
- Fondo: `#494949`
- Borde: `0,75pt - #606060`
- Label: Source Code Bold - 20pt - `#ffffff`
- Label - Alerta: `#ff0404`

**Preguntas para el grilling:**
- ¿Es un componente nuevo (`AlertSigcat`/`StatusBar`/nombre a decidir) o una variante
  nueva de `AlertBanner` existente? Las props no calzan 1:1 (`AlertBanner` tiene
  icon/description/action; esto es solo label centrado) — probablemente nuevo, pero
  no asumido acá.
- ¿Se usa en algún lugar de `004-familia-tareas` (Familia Tareas) o es transversal a
  otras pantallas (ej. Misión, p.22 del PDF de screens — "INCENDIO TIPO A" aparece
  también ahí)? Si es lo segundo, esto podría no bloquear Familia Tareas en absoluto —
  a confirmar antes de priorizar.
- ¿Ambas variantes (`default` y `alerta`) alcanzan, o hay más tonos (igual que
  `AlertBanner` tiene 4: info/success/warning/danger)? El PDF solo muestra 2 ejemplos.

## Componente 2 — Toast "Tarea realizada" (p.22, no existe hoy)

Notificación centrada, un solo texto — "Se creó una tarea con éxito". Ya trackeado
como gap en `drafts/pantallas-grupo-a-b.md` § p.20 (mismo hallazgo, otra pantalla del
PDF de screens) — este draft lo confirma con spec exacta en vez de solo mockup.

**Spec anotada (verbatim del PDF):**
- Fondo: `#060606`
- Borde: `0,75pt - #606060`
- Texto: Source Code Bold - 18pt - `#ffffff`

**Preguntas para el grilling (heredadas de `pantallas-grupo-a-b.md`, todavía sin
responder):**
- ¿Auto-dismiss (cuánto tiempo) o requiere cierre manual? El PDF no muestra ícono de
  cierre en este mock.
- ¿Un solo tono (éxito, el único mostrado) o también error/warning/info como la
  mayoría de sistemas de toast? Si es solo éxito, ¿alcanza con un texto fijo o hace
  falta que el consumidor pase el mensaje?
- ¿Se usa en `004-familia-tareas` (ej. al "guardar"/"cerrar" una tarea en Tareas
  Pendientes) o queda para cuando se construya la pantalla que realmente dispara la
  acción de crear tarea? Estas 3 screens son composiciones estáticas sin lógica real
  (ver `constitution.md` de `004-familia-tareas`) — un Toast "decorativo" (mostrado
  siempre, sin trigger real) podría no tener sentido ahí.

## Componente 3 — campo "Filter" (p.23, existe hoy como hack)

Campo compuesto: ícono de filtro (embudo) + chevron, **afuera** del campo a la
izquierda, seguido de un input oscuro con lupa **adentro**, a la derecha. Sin label
flotante visible (a diferencia de `TextField`, que siempre muestra su `label`).

**Spec anotada (verbatim del PDF):**
- Fondo: `#060606`
- Borde: `0,75pt - #606060`
- Medida: `400px - 50px` (así, en `px` — a diferencia del resto de specs de este PDF
  que vienen en `pt`+`@2×`, esta parece ser ya la medida final, no una a dividir por 2;
  confirmar en el grilling antes de fijarlo en `plan.md`, no asumido acá).
- Texto: Montserrat Regular - 20pt - `#ffffff`
- Texto de ejemplo en el mock: "Investigación" (placeholder o valor — no se puede
  distinguir del mock estático).

**Nota del propio diseñador, en el archivo:** *"Me falta desarrollar el desplegable
del funnel"* — el comportamiento del ícono de filtro (abre un desplegable de opciones,
presumiblemente, dado el chevron) queda explícitamente sin definir en la fuente.

**Preguntas para el grilling:**
- ¿`400px - 50px` es la medida final (CSS px) o necesita `÷2` como el resto del PDF?
  Es el único componente de esta feature con unidades mixtas (`pt` para fuente/borde,
  `px` para el tamaño) — no asumir cuál convención aplica sin confirmar.
- El desplegable del funnel queda sin definir en el PDF — ¿se construye igual con un
  comportamiento razonable (ej. dropdown de opciones fijas) o el ícono queda
  puramente decorativo por ahora, mismo criterio que el resto de `004-familia-tareas`
  (sin lógica real, ver `constitution.md`)? Dado que ni el propio diseñador lo definió,
  probablemente decorativo — pero es una decisión de producto, no mía.
- ¿Nombre del componente? (`FilterField`, `SearchFilter`, algo que deje claro que es
  ícono+input combinados, no un input suelto).
- ¿Reemplaza el hack actual en las 3 screens de `004-familia-tareas`
  (`Button` + `TextField` con label) una vez que exista, como parte de este mismo
  draft/feature, o queda para una iteración de fix aparte sobre esa feature ya
  implementada? Afecta el plan de esta feature nueva (¿toca archivos de
  `004-familia-tareas` o no?).

---

## Restricciones ya conocidas

- `knowledge/design-system-rules.md` es la autoridad de estilos — valores hex/pt de
  este draft ya vienen del PDF, no inventados, pero cualquier ambigüedad (ej. la
  unidad de "Filter") se resuelve en `/sdd-refine`, no acá.
- Sin framework de test instalado — verificación manual en Storybook, mismo criterio
  que el resto del kit.
- Convención de componentes: un `.tsx` + un `.stories.tsx` plano en
  `packages/ui/src/components/`, salvo que sea patrón compuesto.
- `src/index.ts` es la única fuente de verdad de exports públicos.
- Si `AlertBanner.tsx` no es el mismo componente que "Alert Sigcat" (a confirmar en el
  grilling), no se modifica — se crea aparte.

## Referencias

- `knowledge/references/design-reference.pdf` p.22 ("ALERT") y p.23 ("FILTER") —
  fuente de este draft, ya está en el repo.
- `drafts/pantallas-grupo-a-b.md` § p.20 — hallazgo previo del Toast, mismo gap visto
  desde el PDF de screens (`Alejandria - Agosto 2026.pdf`, no en el repo).
- `packages/ui/src/components/AlertBanner.tsx` — componente existente, a confirmar si
  es distinto de "Alert Sigcat" o el mismo mal aplicado.
- `specs/004-familia-tareas/` — feature en curso que depende de esto para el campo
  Filter real en sus 3 toolbars.
- `DECISIONS.md` — pendiente registrar, una vez resuelto el grilling, por qué este
  trabajo se separó de `004-familia-tareas` en vez de meterse ahí.
