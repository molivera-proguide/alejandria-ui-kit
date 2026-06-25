import type { Meta, StoryObj } from "@storybook/react-vite";
import { ModuleCard } from "./ModuleCard";
import * as Icons from "../Icons";

const meta = {
  title: "Alejandria/ModuleCard",
  component: ModuleCard,
  parameters: {
    layout: "centered"
  }
} satisfies Meta<typeof ModuleCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const template = (args: Parameters<Story["render"]>[0]) => <ModuleCard {...args} />;

export const Investigaciones: Story = {
  render: () => (
    <ModuleCard
      title="INVESTIGACIONES"
      icon={<img src={Icons.InvestigacionesIcon} alt="Investigaciones" />}
      metrics={[{ label: "Casos abiertos", value: 15 }, { label: "Alertas", value: 4 }]}
    />
  )
};

export const Ciberseguridad: Story = {
  render: () => (
    <ModuleCard
      title="CIBERSEGURIDAD"
      icon={<img src={Icons.CiberseguridadIcon} alt="Ciberseguridad" />}
      metrics={[{ label: "Incidentes", value: 12 }, { label: "Críticos", value: 2 }]}
    />
  )
};

export const Evidencias: Story = {
  render: () => (
    <ModuleCard
      title="EVIDENCIAS"
      icon={<img src={Icons.EvidenciasIcon} alt="Evidencias" />}
      metrics={[{ label: "Archivos", value: 154 }, { label: "Pendientes", value: 8 }]}
    />
  )
};

export const Género: Story = {
  render: () => (
    <ModuleCard
      title="GÉNERO"
      icon={<img src={Icons.GeneroIcon} alt="Género" />}
      metrics={[{ label: "Casos", value: 42 }, { label: "Seguimientos", value: 9 }]}
    />
  )
};

export const GridExample: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 20, gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", width: "100%" }}>
      <ModuleCard
        title="INVESTIGACIONES"
        icon={<img src={Icons.InvestigacionesIcon} alt="Investigaciones" />}
        metrics={[{ label: "Casos abiertos", value: 15 }, { label: "Alertas", value: 4 }]}
      />
      <ModuleCard
        title="CIBERSEGURIDAD"
        icon={<img src={Icons.CiberseguridadIcon} alt="Ciberseguridad" />}
        metrics={[{ label: "Incidentes", value: 12 }, { label: "Críticos", value: 2 }]}
      />
      <ModuleCard
        title="EVIDENCIAS"
        icon={<img src={Icons.EvidenciasIcon} alt="Evidencias" />}
        metrics={[{ label: "Archivos", value: 154 }, { label: "Pendientes", value: 8 }]}
      />
      <ModuleCard
        title="GÉNERO"
        icon={<img src={Icons.GeneroIcon} alt="Género" />}
        metrics={[{ label: "Casos", value: 42 }, { label: "Seguimientos", value: 9 }]}
      />
      <ModuleCard
        title="CATÁSTROFES"
        icon={<img src={Icons.CatastrofesIcon} alt="Catástrofes" />}
        metrics={[{ label: "Áreas", value: 3 }, { label: "Alertas", value: 6 }]}
      />
      <ModuleCard
        title="DESPLIEGUE"
        icon={<img src={Icons.DespliegueIcon} alt="Despliegue" />}
        metrics={[{ label: "Nodos", value: 5 }, { label: "Activos", value: 7 }]}
      />
      <ModuleCard
        title="BANDEJA"
        icon={<img src={Icons.ModulesBandejaIcon} alt="Bandeja" />}
        metrics={[{ label: "Tareas", value: 18 }, { label: "Nuevas", value: 5 }]}
      />
    </div>
  )
};
