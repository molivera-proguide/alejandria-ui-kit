---
id: pdf-text-extract
name: Design Reference — Verbatim Text Layer
status: reference
source: knowledge/references/design-reference.pdf
last_reviewed: 2026-07-17
note: >
  Lossless extraction of the PDF embedded text layer (PyMuPDF get_text).
  These are the canonical NUMERIC values for each section — cite by page.
  Typos (e.g. 'loguin', 'paading') are present in the source PDF and preserved.
  v2 of the source PDF (2026-07-17) inserted a new p2 (LÍNEA DE TIEMPO) and 4 new
  trailing pages (SKELETON, CALENDAR CARD, EMPTY, FORM), shifting every page after
  the old p1 by +1, and everything after the old SIDE BAR page by +5. See
  knowledge/component-roadmap.md for what the timeline page means for component work.
---

# Design Reference — Verbatim Text Layer

Page → section map:

- **p1** — Cover
- **p2** — LÍNEA DE TIEMPO — component roadmap (Diseño / Desarrollo status per component)
- **p3** — TARJETAS — task/status cards
- **p4** — INVESTIGATION CARD — flight-style investigation card (formerly untitled, under TARJETAS)
- **p5** — FICHAS — detail sheet
- **p6** — MÓDULOS — module card
- **p7** — MÓDULOS — Login
- **p8** — ICONOS
- **p9** — GRÁFICOS
- **p10** — GRÁFICOS
- **p11** — METRIC CARD — (formerly titled MÉTRICAS)
- **p12** — ASISTENTE — (formerly titled MODALES)
- **p13** — SIDE BAR — (formerly titled MENÚES; page was blank/placeholder in v1, now fully specified)
- **p14** — SKELETON — new in v2, no v1 equivalent
- **p15** — CALENDAR CARD — new in v2, no v1 equivalent
- **p16** — EMPTY — new in v2, no v1 equivalent
- **p17** — FORM — new in v2, no v1 equivalent; spec text duplicates p16 EMPTY almost verbatim — treat as an unfinished placeholder, not a finished spec
- **p18** — ALERT — (formerly titled MISCELÁNEAS)


## Page 1 — Cover

```text
ALEJANDRIA FUSION PLATFORM 
UI TOOLKIT
UI
TOOLKIT
```

## Page 2 — LÍNEA DE TIEMPO — component roadmap

```text
L Í N E A D E T I E M P O
Trabajamos en sincro para ir avanzando 
con los componentes necesarios para los 
proyectos actuales y futuros.
D I S E Ñ O
D E S A R R O L L O
Investigation
card
Ficha
Módulos
Gráficos
Metric
card
Asistente
Side bar
Investigation
card
Ficha
Módulos
Gráficos
Metric
card
Asistente
Side bar
Skeleton
Skeleton
Calendar
card
Tarjetas
Tarjetas
Empty
Calendar
card
Empty
```

Read visually (text layer loses position): two horizontal tracks, **Diseño** and
**Desarrollo**, each with a row of dots per component. In **Diseño** all 11 items
(Tarjetas, Investigation card, Ficha, Módulos, Gráficos, Metric card, Asistente,
Side bar, Skeleton, Calendar card, Empty) are marked done (filled dot). In
**Desarrollo**, only Tarjetas, Investigation card, Ficha, Módulos, Gráficos and
Metric card are marked done; **Asistente, Side bar, Skeleton, Calendar card and
Empty are marked pending** (hollow dot) — i.e. designed but not yet built. This
matches the code inventory 1:1 as of 2026-07-17. See `knowledge/component-roadmap.md`.

## Page 3 — TARJETAS — task/status cards

```text
Tareas investigativas
Subactividad
Causa Corion
Dependencia
Inicio 21/04/2022
Vencimiento 23/07/2022
#1232142342 - 3408473
EN ESPERA
Tareas investigativas
Subactividad
Causa Corion
Dependencia
Inicio 21/04/2022
Vencimiento 23/07/2022
#1232142342 - 3408473
EN ESPERA
Tareas investigativas
Subactividad
Causa Corion
Dependencia
Inicio 21/04/2022
Vencimiento 23/07/2022
#1232142342 - 3408473
EN ESPERA
VER MÁS
VER MÁS
Tareas investigativas
Subactividad
Causa Corion
#1232142342 - 3408473
EN ESPERA
T A R J E T A S
Indicador de estado
Cambio de color :onactive
Tipo
Código o título
info prioritaria
Creador
Fecha
Botón redundante 
Resumen mínimo e indispensable 
de la tarea a realizar. 
¿Qué es necesario que esté acá?
Visualización Kanban
Tipo
Código o título
info prioritaria
Info aún más simple y 
jerarquizada.
Funcionamiento más intuitivo ya 
comprobado.
Info simple y jerarquizada.
Diseño más atractivo.
Fondo estado normal: #2a2927 
Fondo estado seleccionado: #060606
Borde: 0,75pt - #c1c1c1
Padding: 15px top y bottom - 10px left y right
Título: Source Code Bold - 20pt - #FFFFFF
Estado: Source Code Bold - 20pt - #FFFFFF - Uppercase
Párrafo: Montserrat Light - 18pt - #8a8b87
Botón: Montserrat Bold - 13pt - #494949 - #FFFFFF - 
paading top y bottom 5px - padding left y right 25px
Tareas investigativas
#1232142342 - 3408473
EN ESPERA
Visualización Resumen
```

## Page 4 — INVESTIGATION CARD

```text
V U E L O X R 2 1 0 0
04/05
Fecha de ingreso
EZE
Aeropuerto
04:13
Horario
2
Acompañantes
ACCIÓN A
ACCIÓN A
ACC I ÓN B
ACC I ÓN B
I N V E S T I G A T I O N C A R D
Resumen mínimo e indispensable 
de la tarea a realizar. 
¿Qué es necesario que esté acá?
Fondo: #000000 - 70% ed transparencia
Borde: 0,75pt - #606060
Padding: 15px top y bottom - 10px left y right
Título: Source Code Light - 13pt - #FFFFFF - Interletrado 
410
Metricas número: Montserrat Bold - 14pt - #FFFFFF - 
Uppercase
Métricas referencia: Montserrat Extralight - 10pt - 
#c1c1c1
Botón: Montserrat Bold - 11pt - #494949 - #FFFFFF - 
paading top y bottom 5px - padding left y right 20px
Tarjeta investigaciones
Métricas
Título
Botón
Icono
```

## Page 5 — FICHAS — detail sheet

```text
E N E S P E R A
E N E S P E R A
#1232142342 - 3408473
DESCRIPCIÓN
MÉTRICAS DE RENDIMIENTO DE LA TAREA
60mm
55mm
54mm
45mm
42mm
NOV
60mm
60mm
55mm
54mm
45mm
42mm
DIC
55mm
54mm
45mm
42mm 42mm
ENE
FEB
42mm
MAR
Allanamientos
13
TAREAS
NOV - FEB
Policias
10
RECURSOS
Patrulleros
5
RECURSOS
TODO EL PAÍS
Tarea investigativa con una subactividad genera-
da el dia 04 de marzo.
La tarea fue creada por la Dependencia 4, por el 
teniente Perez.
V E N C I D A
V E N C I D A
D EC I S I Ó N A
D EC I S I Ó N A
D EC I S IÓ N B
D EC I SIÓ N B
Fotos
13
ARCHIVOS MULTIMEDIA
Videos
5
Audios
10
A C C I O N E S
DECIS IÓ N C
DECIS IÓ N C
F I C H A S
Info maximizada, métricas, media 
y principalmente acciones que se 
pueden realizar
Totalmente editable.
Es el centro de la información, 
el resto queda en segundo plano.
Estado
Tipo
Código o título
info prioritaria
Estado
Archivos
relacionados
(vienen del gestor
de evidencias
fílmicas)
Todas las
acciones posibles
centralizadas y
jerarquizadas
Filtros
Métricas disponibles
Gráficos para organizar
la información visualmente
Fondo: #2a2927
- Cuando está sobre mapa: opacidad 70%
Borde: 0,75pt - #c1c1c1
Padding: 40px
Tamaño variable según pantalla
Estado: Source Code Light - 16pt - #FFFFFF - Uppercase
Estado semáforo: Source Code Light - 16pt - #ff0404 - 
#7f0000
Título: Source Code Bold - 40pt - #FFFFFF
Párrafo: Montserrat Light - 18pt - #FFFFFF
Descripción Fondo: #060606
Widgets borde: 0,75pt - #e6e6e6
Widgets Título: Montserrat Extralight - 16pt - #8a8b87
Widgets Métrica: Montserrat Bold - 50pt - #FFFFFF
Widgets Bajada: Montserrat Extralight - 16pt - #FFFFFF
Filtros Borde: 0,75pt - #e6e6e6
Filtros Bajada: Montserrat Extralight - 24pt - Uppercase 
- #8a8b87
Botón: Montserrat Bold - 13pt - #FFFFFF - paading top y 
bottom 5px - padding left y right 25px - fondos #c1c1c1 
#8a8b87 #494949
```

## Page 6 — MÓDULOS — module card

```text
M Ó D U L O S
Icono, título y preview de 
información 
PROCESOS
POLICIALES
CASOS ABIERTOS: 15
CASOS ABIERTOS: 15
Icono
Título
Info
desatacada
Fondo: #060606
Borde: 0,75pt - #c1c1c1
Padding: 50px 20px 25px 20px
Título: Source Code Regular- 24pt - #c1c1c1 - Uppercase
Info destacada: Montserrat Light y Bold - 16pt - #8a8b87 
- #FFFFFF - Uppercase
Separador: 0,75pt - #8a8b87
Iconos
La información destacada va a 
depender del módulo y el dato 
que sea de valor para ese 
módulo.
```

## Page 7 — MÓDULOS — Login

```text
I NG RE SA R
I NG RE SA R
I N G R E S AR
I N G R E S AR
USUARIO
CONTRASEÑA
M Ó D U L O S
De loguin 
Fondo: #060606
Borde: 0,75pt - #c1c1c1
Padding: 20px
Input: Source Code Light 20pt - padding 10px - fondo 
#2a2927
Círculos patrón: 45pxX45px - #2a2927
Botón: Montserrat Bold - 18pt - #FFFFFF - paading top y 
bottom 10px - padding left y right 120px - fondo #494949
```

## Page 8 — ICONOS

```text
I C O N O S
Info maximizada, métricas, media 
y principalmente acciones que se 
pueden realizar
Iconos módulos 180x180
?
2
Iconos módulos: #c1c1c1
Iconos menú: #8a8b87
Iconos menúes 50x50
Iconos investigaciones 50x50
Iconos tarjetas 20x20
Iconos módulos 180x180
?
2
Iconos menúes 50x50
Iconos investigaciones 50x50
Iconos tarjetas 20x20
```

## Page 9 — GRÁFICOS

```text
G R A F I C O S
Para visualizar la información 
de distintas formas, según 
corresponda.
PRECIPITACIONES ESTACIONALES
60mm
55mm
54mm
45mm
42mm
NOV
60mm
60mm
55mm
54mm
45mm
42mm
DIC
55mm
54mm
45mm
42mm 42mm
ENE
FEB
42mm
MAR
HISTÓRICO INCENDIOS
NOVIEMBRE - FEBRERO
Córdoba
30%
Neuquén
28%
Santa Cruz
25%
Chaco
20%
Chaco
20%
Chaco
20%
Chaco
20%
Chaco
20%
Chaco
20%
Córdoba
30%
Neuquén
28%
Santa Cruz
25%
Chaco
20%
Chaco
20%
Chaco
20%
Chaco
20%
Fondo: 
- Cuando está en pantalla de reporting: #060606 - 20% de 
opacidad
- Cuando está en ficha: sin fondo, respeta el fondo de la 
ficha que lo contiene.
Borde: 0,75pt - #e6e6e6
Padding: 10px
Barras lineal horizontal
Título: Montserrat Extra Light - 16pt - #8a8b87 - 
Uppercase
Número grande: Montserrat Bold - 20pt - #FFFFFF
Número chico: Montserrat Extra Light - 10pt - #FFFFFF
Referencia: Montserrat Extra Light - 16pt - #FFFFFF
Número o referencia destacada: #ff0404
Barra lineal: 5pt - #FFFFFF - #ff0404
Torta
Título: Montserrat Extra Light - 20pt - #e6e6e6
Número: Montserrat Bold - 18pt - #e3a500 - #ff0404 - 
#28a500
Porcion completada: 15pt de grosor - #e3a500 - #ff0404 - 
#28a500
Eje: 7pt de grosor - #e6e6e6
74
Evacuados
75%
Título
Referencia
Número
Referencia
Número chico
Título
Referencia
Barras lineal horizontal
Barras lineal vertical
Torta
Título
PRECIPITACIONES ESTACIONALES
60mm
55mm
54mm
45mm
42mm
NOV
60mm
60mm
55mm
54mm
45mm
42mm
DIC
55mm
54mm
45mm
42mm 42mm
ENE
FEB
42mm
MAR
HISTÓRICO INCENDIOS
NOVIEMBRE - FEBRERO
Córdoba
30%
Neuquén
28%
Santa Cruz
25%
Chaco
20%
Chaco
20%
Chaco
20%
Chaco
20%
Chaco
20%
Chaco
20%
Córdoba
30%
Neuquén
28%
Santa Cruz
25%
Chaco
20%
Chaco
20%
Chaco
20%
Chaco
20%
74
Evacuados
75%
Título
Referencia
Número
Referencia
Número chico
Título
Referencia
Barras lineal horizontal
Barras lineal vertical
Torta
Título
```

## Page 10 — GRÁFICOS

```text
A U S E N C I A S
T A R E A S
30%
H I S T Ó R I C O T A R E A S
NOV
DIC
ENE
70
50
32
43
58
63
45%
En fecha
Atrasadas
M J
V
S D
L M M J
V
J
V
S D
L M M J
V
Barras
Torta
Líneas
G R A F I C O S
Para visualizar la información 
de distintas formas, según 
corresponda.
Fondo: 
- Cuando está en pantalla de reporting: #060606 - 20% de 
opacidad
Borde: 0,75pt - #c1c1c1
Barras
Título: Source Code Bold - 16pt - #8a8b87 - Uppercase - 
Inteletrado 410
Referencia: Montserrat Extra Light - 16pt - #FFFFFF
Barra tradicional: 15px de ancho - #c1c1c1 - #8a8b87 - 
#060606 
Fondo cuadrícula: 0,25pt - #8a8b87
Torta
Título: Source Code Bold - 16pt - #8a8b87 - Uppercase - 
Inteletrado 410
Número grande: Montserrat Bold - 32pt - #FFFFFF - #8a8b87
Referencia: Montserrat Extra Light - 14pt - #FFFFFF - 
#8a8b87
Porcion completada: 25pt de grosor - #FFFFFF - #8a8b87
Eje: 25pt de grosor - #494949
Líneas
Título: Source Code Bold - 16pt - #8a8b87 - Uppercase - 
Inteletrado 410
Número: Montserrat Extra Light - 10pt - #FFFFFF - #ff0404
Referencia: Montserrat Extra Light - 16pt - #8a8b87
Línea: 0,75pt - #c1c1c1
Fondo cuadrícula: 0,25pt - #8a8b87
Título
Referencia
Número grande
Referencia
Referencia
A U S E N C I A S
T A R E A S
30%
H I S T Ó R I C O T A R E A S
NOV
DIC
ENE
70
50
32
43
58
63
45%
En fecha
Atrasadas
M J
V
S D
L M M J
V
J
V
S D
L M M J
V
Barras
Torta
Líneas
Título
Referencia
Número grande
Referencia
Referencia
```

## Page 11 — METRIC CARD

```text
Hectopascales
87%
HUMEDAD
Kilómetros
37
VISIBILIDAD
Milímetros
0
PRECIPITACIONES
Fondo: 
- Cuando está en pantalla de reporting: #060606 - 20% de 
opacidad
- Cuando está en ficha: sin fondo, respeta el fondo de la 
ficha que lo contiene.
Borde: 0,75pt - #e6e6e6 
Padding: 10px
Reporting
Título: Source Code Bold - 16pt - #8a8b87 - Uppercase - 
Inteletrado 410
Número grande: Montserrat Bold - 84pt - #FFFFFF - #ff0404
Referencia: Montserrat Extra Light - 16pt - #FFFFFF
En ficha
Título: Montserrat Extra Light - 16pt - #8a8b87 - 
Uppercase
Número grande: Montserrat Bold - 52pt - #FFFFFF - #ff0404
Referencia: Montserrat Extra Light - 16pt - #FFFFFF
Número grande
Título
P O L I C I A S
Tenientes
R E C U R S O S
Moviles50
87%
P O L I C I A S
Tenientes
R E C U R S O S
Moviles en arreglo
15
23
Referencia
Número grande
Título
Referencia
Reporting
En ficha
M E T R I C C A R D
Info minimizada y facil de leer.
Hectopascales
87%
HUMEDAD
Kilómetros
37
VISIBILIDAD
Milímetros
0
PRECIPITACIONES
Número grande
Título
P O L I C I A S
Tenientes
R E C U R S O S
Moviles50
87%
P O L I C I A S
Tenientes
R E C U R S O S
Moviles en arreglo
15
23
Referencia
Número grande
Título
Referencia
Reporting
En ficha
```

## Page 12 — ASISTENTE

```text
A S I S T E N T E
Chat tipo asistente IA que nos 
sugiera acciones más comunes y 
luego acciones basadas en 
nuestro historial 
¿Qué querés hacer hoy?
EJECUTA R
EJECUTA R
Adjuntar archivos 
HOLA SEBASTIÁN,
Ayudame a escribir
Saber más
Resumir sumario
Generar investigación
¿Qué querés hacer hoy?
EJECUTA R
EJECUTA R
Adjuntar archivos 
HOLA SEBASTIÁN,
Ayudame a escribir
Saber más
Resumir sumario
Generar investigación
Saludo
Fondo: #060606
Borde: 0,75pt - #c1c1c1
Padding: 20px 30px
Saludo: Source Code Regular - 24pt - #c1c1c1 - Uppercase
Tarea: Montserrat Light - 18pt - #8a8b87 - cuando se 
escribe pasa a #FFFFFF
Adjuntar: Montserrat Light - 14pt - #8a8b87
Tareas rápidas: Source Code Regular - 14pt - #8a8b87
Las tareas rápidas van a ser dinámicas, según el perfil o 
el patrón de uso del usuario.
Tarea
Adjuntar
Tareas
rápidas
```

## Page 13 — SIDE BAR

```text
S I D E B A R
Menú central de la plataforma, 
desde donde se podrán navegar 
todos los módulos que tenga el 
usuario y configurar opciones.
?
2
Menú
Mis tareas
Historial
Reportes
Notificaciones
Mi cuenta
Configuración
Ayuda
Cerrar sesión
Catástrofes
?
2
Aparecerá completa en la pantalla del asistente, después 
se colapsará y se podrá abrir desde el ícono superior 
derecho. Sumarle una pequeña animación a esta acción.
Se usarán los iconos compartidos.
Fondo: #282828
Padding: 20px
Sombra derecha
Navegación secundaria: fondo #2a2927
Iconos: #8a8b87
Icono seleccionado: #FFFFFF
Icono seleccionado línea: 2pt - #FFFFFF
Flechas navegación: #8a8b87
Bajada: Source Code Regular - 14pt - #8a8b87
Notificación: Montserrat Bold - 17pt - #FFFFFF - fondo 
#e30000
Estado: Montserrat Medium - 10pt - Uppercase - #c1c1c1 - 
fondo #282828
Desplegada
Colapsada
Items
con bajada
Logo
Items
solos
25 px
Notificacion
Navegación
secundaria
Iconos centrados
en altura
EN VIVO
Reducida
Estado
Flechas
de navegación
```

## Page 14 — SKELETON

```text
S K E L E T O N
Objeto animado que está en lugar 
de los objetos reales, mientras 
se realiza la carga.
Fondo: #2a2927 - 70% de opacidad
Recuadros: #2a2927
Sumarle animación de degradé o transparencia lineal
```

## Page 15 — CALENDAR CARD

```text
13
AGO
Reunión con el 
teniente por el 
proyecto
C A L E N D A R C A R D
Widget de fechas y calendario.
Descripción
Fecha
Fondo: #2a2927
Borde: 0,75pt - #c1c1c1
Padding: 15px 10px
Fecha: Montserrat Bold - 30pt - #ffffff - Uppercase
Descripción: Montserrat Light - 12pt - #8a8b87
```

## Page 16 — EMPTY

```text
E M P T Y
Componente cuando aún no hay 
elementos subidos.
Fondo: sin fondo
Centrado en la pantalla
Ícono: #8a8b87 - 40x40px - fondo #494949
Título: Montserrat Bold - 16pt - #e6e6e6
Texto: Montserrat Light - 14pt - #e6e6e6
Botón: Montserrat Bold - 16pt - #FFFFFF - paading top y 
bottom 10px - padding left y right 30px - fondo #494949
No hay tareas pendientes
Empezá creando una tarjeta para tu tarea.
CREÁ UNA TARE A
CREÁ UNA TARE A
No hay investigaciones
Empezá sumando una entidad a
tu investigación.
N UEVA ENTI DAD
N UEVA ENTI DAD
Ícono
Título
Botón
Texto
```

## Page 17 — FORM

```text
F O R M
Formulario para carga de 
información, generación de 
usuarios, etc.
Fondo: sin fondo
Centrado en la pantalla
Ícono: #8a8b87 - 40x40px - fondo #494949
Título: Montserrat Bold - 16pt - #e6e6e6
Texto: Montserrat Light - 14pt - #e6e6e6
Botón: Montserrat Bold - 16pt - #FFFFFF - paading top y 
bottom 10px - padding left y right 30px - fondo #494949
```

Note: this page's spec block is nearly word-for-word identical to p16 EMPTY
(same icon/title/text/button spec). No form-specific layout, field list, or
validation state is described. Treat as an unfinished placeholder — confirm the
real spec with design before building a `Form` component off this page.

## Page 18 — ALERT

```text
A L E R T
Info maximizada, métricas, media 
y principalmente acciones que se 
pueden realizar
3 A L E R T A S N U E V A S
I N C E N D I O T I P O A - F A S E 1
```
