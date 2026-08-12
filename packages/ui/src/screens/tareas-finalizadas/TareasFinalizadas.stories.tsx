import type { Meta, StoryObj } from "@storybook/react-vite";
import * as Icons from "../../Icons";
import { SideBar, type SideBarItem } from "../../components/SideBar";
import { AlertBar } from "../../components/AlertBar";
import { FilterField } from "../../components/FilterField";
import { SelectField } from "../../components/SelectField";
import { TaskCard } from "../../components/TaskCard";
import { BackgroundTextureDots } from "../../utils/backgroundTexture";
import "./tareas-finalizadas.css";

/**
 * @description "TAREAS FINALIZADAS" — PDF de pantallas compuestas "Alejandria - Agosto
 * 2026" (no en el repo, ver knowledge/component-roadmap.md § "Screens triage"), p.9.
 * Screen estática, sin interacción (mismo criterio que `screens/tareas-kanban/`). Usa el
 * slot "VER MÁS" nuevo de `TaskCard` (decorativo, ver `TaskCardViewMoreAction`) — mismo
 * componente que p.5/p.6 (`screens/tareas-pendientes/`), otro filtro y sin triángulo de
 * acento (`tone="neutral"`).
 *
 * Retrofit 2026-08-11 (005-alert-toast-filter): agrega el topbar (AlertBar + íconos
 * colapsar/atrás/adelante), reemplaza `TextField` por `FilterField` real, y agrega
 * `creator`/`startDate`/`endDate` al dataset — el PDF real (p.9) muestra contenido
 * completo por card, igual que `screens/tareas-pendientes/`, no la versión recortada
 * que tenía esta screen antes.
 *
 * Corrección 2026-08-12 (Luna, fidelity-check post-implementación): faltaba el heading
 * "Tareas Finalizadas" que el PDF real muestra en la misma fila del toolbar.
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

const TAREAS_FINALIZADAS = [
  { code: "#1232142342 - 3408473", title: "Tareas investigativas", status: "Cerrada", meta: ["Subactividad", "Causa Corion"], creator: "Dependencia 4", startDate: "Inicio 21/04/2022", endDate: "Vencimiento 23/07/2022" },
  { code: "#1232142343 - 3408474", title: "Verificación de testigos", status: "Cerrada", meta: ["Subactividad", "Causa Rioplat"], creator: "Dependencia 1", startDate: "Inicio 03/05/2022", endDate: "Vencimiento 12/08/2022" },
  { code: "#1232142344 - 3408475", title: "Cruce de datos satelitales", status: "Cerrada", meta: ["Subactividad", "Causa Del Sur"], creator: "Dependencia 2", startDate: "Inicio 10/05/2022", endDate: "Vencimiento 20/08/2022" },
  { code: "#1232142345 - 3408476", title: "Informe de seguimiento", status: "Cerrada", meta: ["Subactividad", "Causa Corion"], creator: "Dependencia 4", startDate: "Inicio 14/05/2022", endDate: "Vencimiento 24/08/2022" },
  { code: "#1232142346 - 3408477", title: "Relevamiento de campo", status: "Cerrada", meta: ["Subactividad", "Causa Rioplat"], creator: "Dependencia 1", startDate: "Inicio 18/05/2022", endDate: "Vencimiento 28/08/2022" },
  { code: "#1232142347 - 3408478", title: "Cierre de expediente", status: "Cerrada", meta: ["Subactividad", "Causa Del Sur"], creator: "Dependencia 2", startDate: "Inicio 22/05/2022", endDate: "Vencimiento 01/09/2022" },
  { code: "#1232142348 - 3408479", title: "Auditoría de módulo Evidencias", status: "Cerrada", meta: ["Subactividad", "Causa Corion"], creator: "Dependencia 4", startDate: "Inicio 26/05/2022", endDate: "Vencimiento 05/09/2022" },
  { code: "#1232142349 - 3408480", title: "Notificación a dependencia", status: "Cerrada", meta: ["Subactividad", "Causa Rioplat"], creator: "Dependencia 1", startDate: "Inicio 30/05/2022", endDate: "Vencimiento 09/09/2022" }
];

function TareasFinalizadasScreen() {
  return (
    <div className="screen-tareas-finalizadas">
      <BackgroundTextureDots />
      <SideBar
        logo={sidebarLogo}
        menuIcon={<img src={Icons.HamburguesaIcon} alt="" />}
        menuLabel="Menú"
        items={primaryItems}
        secondaryItems={secondaryItems}
        collapsed
        onToggleCollapsed={() => undefined}
      />

      <div className="screen-tareas-finalizadas__content">
        <div className="screen-tareas-finalizadas__topbar">
          <button
            type="button"
            className="screen-tareas-finalizadas__topbar-icon"
            aria-label="Colapsar menú"
            onClick={() => undefined}
          >
            <img src={Icons.OpenCloseSidebarIcon} alt="" />
          </button>
          <button
            type="button"
            className="screen-tareas-finalizadas__topbar-icon"
            aria-label="Atrás"
            onClick={() => undefined}
          >
            <img src={Icons.AtrasIcon} alt="" />
          </button>
          <button
            type="button"
            className="screen-tareas-finalizadas__topbar-icon"
            aria-label="Adelante"
            onClick={() => undefined}
          >
            <img src={Icons.AdelanteIcon} alt="" />
          </button>
          <AlertBar label="5 TAREAS PENDIENTES" />
        </div>

        <main className="screen-tareas-finalizadas__main">
          <div className="screen-tareas-finalizadas__toolbar">
            <h1 className="screen-tareas-finalizadas__heading">Tareas Finalizadas</h1>
            <SelectField
              label="Comisaría"
              defaultValue="todas"
              options={[{ label: "Todas", value: "todas" }]}
            />
            <SelectField
              label="Fecha"
              defaultValue="nov-feb"
              options={[{ label: "NOV - FEB", value: "nov-feb" }]}
            />
            <FilterField aria-label="Buscar tarea" placeholder="ID, zona o dependencia" />
          </div>

          <div className="screen-tareas-finalizadas__grid">
            {TAREAS_FINALIZADAS.map((task) => (
              <TaskCard
                key={task.code}
                code={task.code}
                title={task.title}
                status={task.status}
                meta={task.meta}
                creator={task.creator}
                startDate={task.startDate}
                endDate={task.endDate}
                tone="neutral"
                viewMore={{ label: "VER MÁS", onClick: () => undefined }}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

const meta = {
  title: "Alejandria/Screens/TareasFinalizadas",
  parameters: {
    layout: "fullscreen"
  }
} satisfies Meta;

export default meta;
type Story = StoryObj;

/** Grilla de Tareas Finalizadas — PDF "Alejandria - Agosto 2026" p.9. */
export const Default: Story = {
  render: () => <TareasFinalizadasScreen />
};
