# Checklist — 003-home-dashboard

Criterios de verificación manual (UX, accesibilidad, negocio, compatibilidad) que no
cubre un test automatizado — este proyecto no tiene framework de test instalado
(decisión consciente, ver `existing-arch.md`). Lo completa el humano.

## Accesibilidad

- [x] CHK001 Navego el `SideBar` de Home (expandido) solo con teclado (Tab/Enter) y
  confirmo foco visible en cada ítem, incluyendo el de Notificaciones con badge.
- [x] CHK002 Con un lector de pantalla activo, confirmo que el badge "2" en el ícono
  de campana se anuncia junto al label "Notificaciones", no como elemento suelto sin
  contexto.
- [x] CHK003 Navego los 8 `ModuleCard` del Dashboard con teclado (Tab) y confirmo que
  cada uno recibe foco visible y se activa con Enter/Espacio.
- [x] CHK004 Verifico que el scroll de la columna "Tareas en fecha" en Home es
  operable con teclado sin que el foco quede atrapado dentro del contenedor.
- [x] CHK005 Con lector de pantalla, confirmo que el `DonutChartCard` "Asistencias"
  se anuncia con su `aria-label` ("Gráfico de dona: Asistencias") y que el 75% no
  queda ambiguo sin ese contexto — primer uso de este componente dentro de una
  screen compuesta, no solo en story aislada.

## UX

- [x] CHK006 Reviso si el espaciado entre las 2 `MetricCard` y el `DonutChartCard` en
  "Resumen de productividad" se lee como un grupo relacionado, no como elementos
  sueltos.
- [x] CHK007 Confirmo que el texto de las 6 `CalendarCard` no se corta ni desborda la
  tarjeta con la fuente/zoom por defecto del navegador.
- [x] CHK008 Redimensiono el viewport de Storybook a un ancho angosto (ej. 1024px) y
  confirmo que, aunque no hay layout responsive (limitación conocida documentada), el
  resultado no rompe de forma inaceptable antes de aceptar esa limitación tal cual.

## Negocio

- [x] CHK009 Confirmo que reusar `Asistente` completo (sin recortar) dentro de Home
  se siente correcto en el contexto de la pantalla completa, no como un componente
  "de más".
- [x] CHK010 Confirmo que el 8vo ícono de módulo reusado (`UsuarioIcon` para
  "USUARIOS", documentado en `dashboard.md`) es aceptable para esta iteración, sin
  bloquear el cierre a la espera de un ícono dedicado.
- [x] CHK011 Confirmo que el copy inventado (fechas/descripciones de eventos, valores
  de métricas, footer "Registro de asistencia", títulos de tareas) es aceptable como
  datos de demo, no contenido final de producto.

## Compatibilidad

- [x] CHK012 Abro ambas screens en un navegador distinto al usado durante la
  implementación y confirmo que la textura de fondo animada y los componentes se ven
  sin artefactos visuales.
