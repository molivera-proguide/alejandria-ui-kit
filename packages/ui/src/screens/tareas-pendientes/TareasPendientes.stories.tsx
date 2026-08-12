import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import * as Icons from "../../Icons";
import { SideBar, type SideBarItem } from "../../components/SideBar";
import { AlertBar } from "../../components/AlertBar";
import { FilterField } from "../../components/FilterField";
import { SegmentedControl } from "../../components/SegmentedControl";
import { TaskCard, type TaskTone } from "../../components/TaskCard";
import { DetailSheet, type DetailSheetContent } from "../../patterns/detail-sheet/DetailSheet";
import { BackgroundTextureDots } from "../../utils/backgroundTexture";
import "./tareas-pendientes.css";

/**
 * @description "TAREAS PENDIENTES" — PDF de pantallas compuestas "Alejandria - Agosto
 * 2026" (no en el repo, ver knowledge/component-roadmap.md § "Screens triage"), p.5, con
 * el estado "detalle abierto" de p.7. Corrección de grilling 2026-08-11 (ver input.md):
 * p.5/p.6/p.7 son la misma pantalla — p.5/p.6 son dos tratamientos de filtro (toggle vs.
 * barra de progreso) y p.7 es esta misma pantalla con una `TaskCard` seleccionada. Esta
 * screen construye el tratamiento de p.5 (toggle EN FECHA/VENCIDAS); p.6 (barra de
 * progreso) queda documentada como alternativa descartada — ver knowledge/screens/
 * tareas-pendientes.md § Known limitations.
 *
 * Retrofit 2026-08-11 (005-alert-toast-filter): agrega el topbar (AlertBar "N TAREAS
 * PENDIENTES" + íconos colapsar/atrás/adelante, sueltos, no parte de AlertBar) y
 * reemplaza el toolbar `Button`+`TextField` (hack sin base en el PDF) por `FilterField`
 * real (PDF "FILTER" p.23).
 *
 * Corrección 2026-08-12 (Luna, fidelity-check post-implementación): faltaba el heading
 * "Tareas Pendientes" que el PDF real muestra en la misma fila del toolbar, a la
 * izquierda del toggle/filtro/buscador — no estaba en ningún artefacto SDD anterior,
 * encontrado recién al comparar el Storybook contra el PDF con más cuidado.
 */

const menuIcon = (src: string) => <img src={src} alt="" />;

const primaryItems: SideBarItem[] = [
  { icon: menuIcon(Icons.MenuBandejaIcon), label: "Mis tareas", selected: true },
  { icon: menuIcon(Icons.HistorialIcon), label: "Historial" },
  { icon: menuIcon(Icons.ReportsIcon), label: "Reportes" },
  { icon: menuIcon(Icons.CatastrofesIcon), label: "Catástrofes" }
];

const secondaryItems: SideBarItem[] = [
  { icon: menuIcon(Icons.NotificacionesIcon), label: "Notificaciones", badge: 2 },
  { icon: menuIcon(Icons.UsuarioIcon), label: "Mi cuenta" },
  { icon: menuIcon(Icons.ConfiguracionIcon), label: "Configuración" },
  { icon: menuIcon(Icons.AyudaIcon), label: "Ayuda" },
  { icon: menuIcon(Icons.CerrarSesionIcon), label: "Cerrar sesión" }
];

const sidebarLogo = (
  <img
    src={Icons.AlejandriaLogoIcon}
    alt="Alejandría"
    style={{ display: "block", filter: "invert(1)", height: 24, width: "auto" }}
  />
);

interface TareaPendiente {
  code: string;
  title: string;
  status: string;
  tone: TaskTone;
  meta: string[];
  creator: string;
  startDate: string;
  endDate: string;
}

const TAREAS_PENDIENTES: TareaPendiente[] = [
  { code: "#1232142342 - 3408473", title: "Tareas investigativas", status: "En espera", tone: "danger", meta: ["Subactividad", "Causa Corion"], creator: "Dependencia 4", startDate: "Inicio 21/04/2022", endDate: "Vencimiento 23/07/2022" },
  { code: "#1232142343 - 3408474", title: "Verificación de testigos", status: "Asignada", tone: "success", meta: ["Subactividad", "Causa Rioplat"], creator: "Dependencia 1", startDate: "Inicio 03/05/2022", endDate: "Vencimiento 12/08/2022" },
  { code: "#1232142344 - 3408475", title: "Cruce de datos satelitales", status: "En espera", tone: "neutral", meta: ["Subactividad", "Causa Corion"], creator: "Dependencia 4", startDate: "Inicio 10/05/2022", endDate: "Vencimiento 20/08/2022" },
  { code: "#1232142345 - 3408476", title: "Informe de seguimiento", status: "Asignada", tone: "success", meta: ["Subactividad", "Causa Del Sur"], creator: "Dependencia 2", startDate: "Inicio 14/05/2022", endDate: "Vencimiento 24/08/2022" },
  { code: "#1232142346 - 3408477", title: "Relevamiento de campo", status: "Pendiente", tone: "warning", meta: ["Subactividad", "Causa Rioplat"], creator: "Dependencia 1", startDate: "Inicio 18/05/2022", endDate: "Vencimiento 28/08/2022" },
  { code: "#1232142347 - 3408478", title: "Cierre de expediente", status: "En espera", tone: "neutral", meta: ["Subactividad", "Causa Del Sur"], creator: "Dependencia 2", startDate: "Inicio 22/05/2022", endDate: "Vencimiento 01/09/2022" },
  { code: "#1232142348 - 3408479", title: "Auditoría de módulo Evidencias", status: "Pendiente", tone: "warning", meta: ["Subactividad", "Causa Corion"], creator: "Dependencia 4", startDate: "Inicio 26/05/2022", endDate: "Vencimiento 05/09/2022" },
  { code: "#1232142349 - 3408480", title: "Notificación a dependencia", status: "Asignada", tone: "success", meta: ["Subactividad", "Causa Rioplat"], creator: "Dependencia 1", startDate: "Inicio 30/05/2022", endDate: "Vencimiento 09/09/2022" },
  { code: "#1232142350 - 3408481", title: "Verificación de domicilio", status: "En espera", tone: "danger", meta: ["Subactividad", "Causa Del Sur"], creator: "Dependencia 2", startDate: "Inicio 03/06/2022", endDate: "Vencimiento 13/09/2022" },
  { code: "#1232142351 - 3408482", title: "Cruce de antecedentes", status: "Pendiente", tone: "warning", meta: ["Subactividad", "Causa Corion"], creator: "Dependencia 4", startDate: "Inicio 07/06/2022", endDate: "Vencimiento 17/09/2022" },
  { code: "#1232142352 - 3408483", title: "Relevamiento fotográfico", status: "En espera", tone: "neutral", meta: ["Subactividad", "Causa Rioplat"], creator: "Dependencia 1", startDate: "Inicio 11/06/2022", endDate: "Vencimiento 21/09/2022" },
  { code: "#1232142353 - 3408484", title: "Entrega de informe semanal", status: "Asignada", tone: "success", meta: ["Subactividad", "Causa Del Sur"], creator: "Dependencia 2", startDate: "Inicio 15/06/2022", endDate: "Vencimiento 25/09/2022" }
];

/**
 * Contenido del panel de detalle (PDF p.7) — reusa exactamente los mismos datos que
 * `patterns/detail-sheet/DetailSheet.stories.tsx` § `Fichas`, ya confirmados contra el
 * PDF (identifier coincide con la primera tarea de esta misma lista). Nota de fidelidad
 * (Known limitation, ver knowledge/screens/tareas-pendientes.md): el resto de las tareas
 * de la grilla reusan este mismo contenido de ficha al seleccionarse, solo `identifier`
 * cambia dinámicamente — no hay dataset de detalle por tarea en el PDF/mock, mismo
 * criterio de datos estáticos de demo que el resto de las screens de este kit.
 */
function buildDetailContent(task: TareaPendiente): DetailSheetContent {
  return {
    statuses: [
      { label: "EN ESPERA", variant: "neutral" },
      { label: "VENCIDA", variant: "critical" }
    ],
    identifier: task.code,
    descriptionTitle: "DESCRIPCIÓN",
    description:
      "Tarea investigativa con una subactividad generada el dia 04 de marzo. La tarea fue creada por la Dependencia 4, por el teniente Perez.",
    territoryFilter: "TODO EL PAÍS",
    periodFilter: "NOV - FEB",
    operationalMetrics: [
      { label: "TAREAS", value: "13", change: "Allanamientos" },
      { label: "RECURSOS", value: "10", change: "Policias" },
      { label: "RECURSOS", value: "5", change: "Patrulleros" }
    ],
    performanceChart: {
      title: "MÉTRICAS DE RENDIMIENTO DE LA TAREA",
      footer: "NOV - FEB",
      data: [
        { label: "NOV", value: 60 },
        { label: "DIC", value: 55 },
        { label: "ENE", value: 48 },
        { label: "FEB", value: 45 },
        { label: "MAR", value: 42 }
      ]
    },
    mediaTitle: "ARCHIVOS MULTIMEDIA",
    mediaMetrics: [
      { label: "Fotos", value: "13" },
      { label: "Videos", value: "5" },
      { label: "Audios", value: "10" }
    ],
    actionsLabel: "ACCIONES",
    actions: [
      { label: "DECISIÓN A", variant: "a" },
      { label: "DECISIÓN B", variant: "b" },
      { label: "DECISIÓN C", variant: "c" }
    ]
  };
}

/**
 * Única screen de esta feature con interactividad real (`useState` local, sin estado
 * global, sin fetch, sin routing — ver constitution.md MUST-3). Click en una `TaskCard`
 * abre `DetailSheet` como panel lateral superpuesto; "Cerrar" limpia la selección.
 * `initialSelectedTask` solo existe para que el story `ConDetalleAbierto` pueda montar
 * el panel ya abierto sin duplicar el layout — no es una prop pensada para un consumidor.
 */
function TareasPendientesScreen({
  initialSelectedTask = null
}: {
  initialSelectedTask?: TareaPendiente | null;
}) {
  const [selectedTask, setSelectedTask] = useState<TareaPendiente | null>(initialSelectedTask);

  return (
    <div className="screen-tareas-pendientes">
      <BackgroundTextureDots />
      <SideBar
        logo={sidebarLogo}
        menuIcon={<img src={Icons.HamburguesaIcon} alt="" />}
        menuLabel="Menú"
        items={primaryItems}
        secondaryItems={secondaryItems}
        collapsed={false}
        onToggleCollapsed={() => undefined}
      />

      <div className="screen-tareas-pendientes__content">
        <div className="screen-tareas-pendientes__topbar">
          <button
            type="button"
            className="screen-tareas-pendientes__topbar-icon"
            aria-label="Colapsar menú"
            onClick={() => undefined}
          >
            <img src={Icons.OpenCloseSidebarIcon} alt="" />
          </button>
          <button
            type="button"
            className="screen-tareas-pendientes__topbar-icon"
            aria-label="Atrás"
            onClick={() => undefined}
          >
            <img src={Icons.AtrasIcon} alt="" />
          </button>
          <button
            type="button"
            className="screen-tareas-pendientes__topbar-icon"
            aria-label="Adelante"
            onClick={() => undefined}
          >
            <img src={Icons.AdelanteIcon} alt="" />
          </button>
          <AlertBar label="5 TAREAS PENDIENTES" />
        </div>

        <main className="screen-tareas-pendientes__main">
          <div className="screen-tareas-pendientes__toolbar">
            <h1 className="screen-tareas-pendientes__heading">Tareas Pendientes</h1>
            <SegmentedControl
              label="Estado"
              value="en-fecha"
              onValueChange={() => undefined}
              items={[
                { value: "en-fecha", label: "EN FECHA" },
                { value: "vencidas", label: "VENCIDAS" }
              ]}
            />
            <FilterField aria-label="Buscar tarea" placeholder="ID, zona o dependencia" />
          </div>

          <div className="screen-tareas-pendientes__grid">
            {TAREAS_PENDIENTES.map((task) => (
              <TaskCard
                key={task.code}
                code={task.code}
                title={task.title}
                status={task.status}
                tone={task.tone}
                meta={task.meta}
                creator={task.creator}
                startDate={task.startDate}
                endDate={task.endDate}
                onClick={() => setSelectedTask(task)}
              />
            ))}
          </div>

          {selectedTask ? (
            <div className="screen-tareas-pendientes__detail-overlay">
              <DetailSheet
                content={buildDetailContent(selectedTask)}
                className="detail-sheet--wide"
                onClose={() => setSelectedTask(null)}
              />
            </div>
          ) : null}
        </main>
      </div>
    </div>
  );
}

const meta = {
  title: "Alejandria/Screens/TareasPendientes",
  parameters: {
    layout: "fullscreen"
  }
} satisfies Meta;

export default meta;
type Story = StoryObj;

/** Grilla de Tareas Pendientes, sin selección — PDF "Alejandria - Agosto 2026" p.5. */
export const Default: Story = {
  render: () => <TareasPendientesScreen />
};

/**
 * Misma screen con una tarea ya seleccionada al montar (estado "detalle abierto" — PDF
 * p.7), para verificar el panel lateral sin depender de interacción manual en el story.
 */
export const ConDetalleAbierto: Story = {
  render: () => <TareasPendientesScreen initialSelectedTask={TAREAS_PENDIENTES[0]} />
};
