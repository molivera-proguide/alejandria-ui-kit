import type { Meta, StoryObj } from "@storybook/react-vite";
import * as Icons from "../../Icons";
import { SideBar, type SideBarItem } from "../../components/SideBar";
import { ModuleCard } from "../../components/ModuleCard";
import { BackgroundTextureDots } from "../../utils/backgroundTexture";
import "./dashboard.css";

/**
 * @description "DASHBOARD MÓDULOS" — PDF de pantallas compuestas "Alejandria - Agosto
 * 2026" (no en el repo, ver knowledge/component-roadmap.md § "Screens triage"), p.4.
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

/**
 * Nota de fidelidad (Known limitation, ver knowledge/screens/dashboard.md): el PDF pide
 * 8 módulos, pero `Icons/Modules/` solo tiene 7 ícono dedicados (180×180). El 8vo
 * ("Usuarios") reusa `UsuarioIcon` (Menu, 50×50) — el ícono más cercano semánticamente
 * disponible hoy, no una medida nueva inventada. No se generó un ícono nuevo (fuera de
 * scope de esta feature, es un asset, no un componente).
 */
const MODULES = [
  {
    title: "INVESTIGACIONES",
    icon: Icons.InvestigacionesIcon,
    metrics: [
      { label: "Investigaciones abiertas", value: 30 },
      { label: "Casos pendientes", value: 6 }
    ]
  },
  {
    title: "CIBERSEGURIDAD",
    icon: Icons.CiberseguridadIcon,
    metrics: [
      { label: "Incidentes", value: 12 },
      { label: "Críticos", value: 2 }
    ]
  },
  {
    title: "EVIDENCIAS",
    icon: Icons.EvidenciasIcon,
    metrics: [{ label: "Archivos", value: 154 }]
  },
  {
    title: "GÉNERO",
    icon: Icons.GeneroIcon,
    metrics: [
      { label: "Casos", value: 42 },
      { label: "Seguimientos", value: 9 }
    ]
  },
  {
    title: "CATÁSTROFES",
    icon: Icons.CatastrofesIcon,
    metrics: [{ label: "Áreas activas", value: 3 }]
  },
  {
    title: "DESPLIEGUE",
    icon: Icons.DespliegueIcon,
    metrics: [
      { label: "Nodos", value: 5 },
      { label: "Activos", value: 7 }
    ]
  },
  {
    title: "BANDEJA",
    icon: Icons.ModulesBandejaIcon,
    metrics: [{ label: "Tareas", value: 18 }]
  },
  {
    title: "USUARIOS",
    icon: Icons.UsuarioIcon,
    metrics: [
      { label: "Usuarios creados", value: 47 },
      { label: "Activos hoy", value: 12 }
    ]
  }
];

function DashboardScreen() {
  return (
    <div className="screen-dashboard">
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

      <main className="screen-dashboard__main">
        <div className="screen-dashboard__grid">
          {MODULES.map((module) => (
            <ModuleCard
              key={module.title}
              title={module.title}
              icon={<img src={module.icon} alt="" />}
              metrics={module.metrics}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

const meta = {
  title: "Alejandria/Screens/Dashboard",
  parameters: {
    layout: "fullscreen"
  }
} satisfies Meta;

export default meta;
type Story = StoryObj;

/** Dashboard de módulos — PDF "Alejandria - Agosto 2026" p.4. */
export const Default: Story = {
  render: () => <DashboardScreen />
};
