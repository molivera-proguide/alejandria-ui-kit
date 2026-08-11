import type { Meta, StoryObj } from "@storybook/react-vite";
import * as Icons from "../../Icons";
import { SideBar, type SideBarItem } from "../../components/SideBar";
import { Asistente } from "../../components/Asistente";
import { CalendarCard } from "../../components/CalendarCard";
import { MetricCard } from "../../components/MetricCard";
import { DonutChartCard } from "../../components/DonutChartCard";
import { TaskCard } from "../../components/TaskCard";
import { BackgroundTextureDots } from "../../utils/backgroundTexture";
import "./home.css";

/**
 * @description "HOME" — PDF de pantallas compuestas "Alejandria - Agosto 2026" (no en el
 * repo, ver knowledge/component-roadmap.md § "Screens triage"), p.3. Corregido en el
 * roadmap 2026-08-11: esta página es Home completo, no "Asistente IA (estado vacío)"
 * como decía el triage original — ver drafts/pantallas-grupo-a-b.md § hallazgo p.3/p.5/p.6.
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

const PROXIMOS_EVENTOS = [
  { day: "13", month: "AGO", description: "Reunión con el teniente por el proyecto." },
  { day: "14", month: "AGO", description: "Subactividad — Causa Corion." },
  { day: "16", month: "AGO", description: "En espera — Dependencia Sur." },
  { day: "18", month: "AGO", description: "Resumen mínimo de la tarea a realizar." },
  { day: "21", month: "AGO", description: "Entrega de informe semanal." },
  { day: "23", month: "AGO", description: "Auditoría de módulo Evidencias." }
];

const TAREAS_EN_FECHA = [
  { code: "#1232142342 - 3408473", title: "Tareas investigativas", tone: "danger" as const },
  { code: "#1232142343 - 3408474", title: "Verificación de testigos", tone: "warning" as const },
  { code: "#1232142344 - 3408475", title: "Cruce de datos satelitales", tone: "neutral" as const },
  { code: "#1232142345 - 3408476", title: "Informe de seguimiento", tone: "success" as const },
  { code: "#1232142346 - 3408477", title: "Relevamiento de campo", tone: "warning" as const },
  { code: "#1232142347 - 3408478", title: "Cierre de expediente", tone: "neutral" as const }
];

/**
 * Nota de fidelidad (corrección 2026-08-11, ver Known limitations en
 * knowledge/screens/home.md): "ASISTENCIAS" es `DonutChartCard` (single-segment 75%),
 * no `ProgressRing` — el PDF real tiene ese componente cortado (como si hubiera que
 * scrollear), lo que llevó a asumir `ProgressRing` sin evidencia suficiente en la
 * primera pasada. Confirmado por Luna contra el PDF: es el mismo componente que el
 * donut "Tareas" 45%/30% de p.12 Reportes.
 */
function HomeScreen() {
  return (
    <div className="screen-home">
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

      <main className="screen-home__main">
        <div className="screen-home__layout">
          <div className="screen-home__content">
            <Asistente
              greeting="HOLA SEBASTIÁN,"
              prompt="¿Qué querés hacer hoy?"
              executeLabel="EJECUTAR"
              attachLabel="Adjuntar archivos"
              suggestions={[
                { label: "Ayudame a escribir" },
                { label: "Saber más" },
                { label: "Resumir sumario" },
                { label: "Generar investigación" }
              ]}
            />

            <div className="screen-home__sections">
              <section>
                <h2 className="screen-home__section-title">Próximos eventos</h2>
                <div className="screen-home__events-grid">
                  {PROXIMOS_EVENTOS.map((event) => (
                    <CalendarCard key={`${event.day}-${event.month}`} {...event} />
                  ))}
                </div>
              </section>

              <section>
                <h2 className="screen-home__section-title">Resumen de productividad</h2>
                <div className="screen-home__productivity">
                  <div className="screen-home__metrics">
                    <MetricCard
                      label="Tareas finalizadas"
                      value="24"
                      appearance="reporting"
                      tone="good"
                      utilities={[
                        { type: "edit", onClick: () => undefined },
                        { type: "delete", onClick: () => undefined }
                      ]}
                    />
                    <MetricCard
                      label="Tareas en proceso"
                      value="9"
                      appearance="reporting"
                      tone="watch"
                      utilities={[
                        { type: "edit", onClick: () => undefined },
                        { type: "delete", onClick: () => undefined }
                      ]}
                    />
                  </div>
                  <DonutChartCard
                    title="Asistencias"
                    footer="Registro de asistencia"
                    data={[{ label: "Presentes", value: 75, color: "var(--ds-color-white)" }]}
                    primaryStat={{ value: "75%", label: "Presentes" }}
                  />
                </div>
              </section>
            </div>
          </div>

          <aside className="screen-home__aside">
            <h2 className="screen-home__section-title">Tareas en fecha</h2>
            <div className="screen-home__tasks">
              {TAREAS_EN_FECHA.map((task) => (
                <TaskCard key={task.code} variant="resumen" {...task} />
              ))}
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

const meta = {
  title: "Alejandria/Screens/Home",
  parameters: {
    layout: "fullscreen"
  }
} satisfies Meta;

export default meta;
type Story = StoryObj;

/** Home completo — PDF "Alejandria - Agosto 2026" p.3. */
export const Default: Story = {
  render: () => <HomeScreen />
};
