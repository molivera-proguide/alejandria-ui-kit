import { useState } from "react";
import { MoreHorizontal } from "lucide-react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import * as Icons from "../../Icons";
import { SideBar, type SideBarItem } from "../../components/SideBar";
import { AlertBar } from "../../components/AlertBar";
import { FilterField } from "../../components/FilterField";
import { TaskCard, type TaskTone } from "../../components/TaskCard";
import { BackgroundTextureDots } from "../../utils/backgroundTexture";
import "./tareas-kanban.css";

/**
 * @description "TAREAS KANBAN" — PDF de pantallas compuestas "Alejandria - Agosto 2026"
 * (no en el repo, ver knowledge/component-roadmap.md § "Screens triage"), p.8. Screen
 * estática, sin interacción (a diferencia de `screens/tareas-pendientes/`) — el draft no
 * muestra ningún estado de detalle para esta vista. El bug de sizing de `TaskCard`
 * kanban que el roadmap documentaba (§ "2026-07-28 sizing pass") ya está cerrado en el
 * componente (`TaskCard.tsx:57-61` descarta `width`/`maxWidth` de cualquier `style`
 * entrante) — no se reabre acá.
 *
 * Retrofit 2026-08-11 (005-alert-toast-filter): agrega el topbar (AlertBar + íconos
 * colapsar/atrás/adelante), la fila de `FilterField` que le faltaba, y una barra de
 * progreso + ícono "..." por columna (hallazgo del fidelity-check — el PDF no anota un
 * % exacto por columna, valores decorativos aproximados, ver tareas-kanban.css).
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

interface KanbanColumn {
  title: string;
  /**
   * @description % de la barra de progreso bajo el título — decorativo, el PDF no
   * anota un valor exacto por columna (hallazgo del fidelity-check, ver header de
   * este archivo).
   */
  progress: number;
  tasks: { code: string; title: string; status: string; tone: TaskTone; meta: string[] }[];
}

const KANBAN_COLUMNS: KanbanColumn[] = [
  {
    title: "EN FECHA",
    progress: 90,
    tasks: [
      { code: "#1232142342 - 3408473", title: "Tareas investigativas", status: "En espera", tone: "danger", meta: ["Subactividad", "Causa Corion"] },
      { code: "#1232142343 - 3408474", title: "Verificación de testigos", status: "Asignada", tone: "success", meta: ["Subactividad", "Causa Rioplat"] },
      { code: "#1232142344 - 3408475", title: "Cruce de datos satelitales", status: "Pendiente", tone: "warning", meta: ["Subactividad", "Causa Del Sur"] },
      { code: "#1232142345 - 3408476", title: "Informe de seguimiento", status: "Monitoreo", tone: "neutral", meta: ["Subactividad", "Causa Corion"] }
    ]
  },
  {
    title: "RETRASADAS",
    progress: 70,
    tasks: [
      { code: "#1232142346 - 3408477", title: "Relevamiento de campo", status: "Vencida", tone: "danger", meta: ["Subactividad", "Causa Rioplat"] },
      { code: "#1232142347 - 3408478", title: "Cierre de expediente", status: "Vencida", tone: "warning", meta: ["Subactividad", "Causa Del Sur"] }
    ]
  },
  {
    title: "FINALIZADAS",
    progress: 30,
    tasks: [
      { code: "#1232142348 - 3408479", title: "Auditoría de módulo Evidencias", status: "Cerrada", tone: "success", meta: ["Subactividad", "Causa Corion"] }
    ]
  }
];

/**
 * Interactividad real de esta screen (`useState` local, sin estado global, sin fetch,
 * sin routing — ver constitution.md de 006-sidebar-ancho-toggle, MUST-6/MUST-7 enmienda
 * a 004-familia-tareas MUST-3): colapso/expansión real del `SideBar`, disparado tanto
 * por el heading "Menú" (control interno) como por el ícono `OpenCloseSidebarIcon` del
 * topbar (control externo) — ambos alternan el mismo estado, independiente de las otras
 * 2 screens de Tareas. Arranca colapsado (`true`), igual que el mockup real de esta
 * screen (PDF "Alejandria - Agosto 2026" p.8 muestra el SideBar colapsado).
 */
function TareasKanbanScreen() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const toggleSidebar = () => setSidebarCollapsed((collapsed) => !collapsed);

  return (
    <div className="screen-tareas-kanban">
      <BackgroundTextureDots />
      <SideBar
        logo={sidebarLogo}
        menuIcon={<img src={Icons.HamburguesaIcon} alt="" />}
        menuLabel="Menú"
        items={primaryItems}
        secondaryItems={secondaryItems}
        collapsed={sidebarCollapsed}
        onToggleCollapsed={toggleSidebar}
      />

      <div className="screen-tareas-kanban__content">
        <div className="screen-tareas-kanban__topbar">
          <button
            type="button"
            className="screen-tareas-kanban__topbar-icon"
            aria-label={sidebarCollapsed ? "Expandir menú" : "Colapsar menú"}
            aria-expanded={!sidebarCollapsed}
            onClick={toggleSidebar}
          >
            <img src={Icons.OpenCloseSidebarIcon} alt="" />
          </button>
          <button
            type="button"
            className="screen-tareas-kanban__topbar-icon"
            aria-label="Atrás"
            onClick={() => undefined}
          >
            <img src={Icons.AtrasIcon} alt="" />
          </button>
          <button
            type="button"
            className="screen-tareas-kanban__topbar-icon"
            aria-label="Adelante"
            onClick={() => undefined}
          >
            <img src={Icons.AdelanteIcon} alt="" />
          </button>
          <AlertBar label="5 TAREAS PENDIENTES" />
        </div>

        <main className="screen-tareas-kanban__main">
          <div className="screen-tareas-kanban__toolbar">
            <FilterField aria-label="Buscar tarea" placeholder="ID, zona o dependencia" />
          </div>

          <div className="screen-tareas-kanban__columns">
            {KANBAN_COLUMNS.map((column) => (
              <section key={column.title} className="screen-tareas-kanban__column">
                <div className="screen-tareas-kanban__column-header">
                  <h2 className="screen-tareas-kanban__column-title">{column.title}</h2>
                  <MoreHorizontal
                    className="screen-tareas-kanban__column-menu"
                    aria-hidden="true"
                    size={16}
                  />
                </div>
                <div className="screen-tareas-kanban__column-progress">
                  <span style={{ width: `${column.progress}%` }} />
                </div>
                <div className="screen-tareas-kanban__column-tasks">
                  {column.tasks.map((task) => (
                    <TaskCard key={task.code} variant="kanban" {...task} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

const meta = {
  title: "Alejandria/Screens/TareasKanban",
  parameters: {
    layout: "fullscreen"
  }
} satisfies Meta;

export default meta;
type Story = StoryObj;

/** Vista Kanban de Tareas — PDF "Alejandria - Agosto 2026" p.8. */
export const Default: Story = {
  render: () => <TareasKanbanScreen />
};
