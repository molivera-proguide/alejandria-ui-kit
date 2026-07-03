import type { Meta, StoryObj } from "@storybook/react-vite";
import { ModuleCard } from "./ModuleCard";
import * as Icons from "../Icons";

const meta = {
  title: "Alejandria/ModuleCard",
  component: ModuleCard,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "alejandria-dark",
      values: [
        { name: "alejandria-dark", value: "#060606" },
        { name: "alejandria-paper", value: "#eef4f3" }
      ]
    }
  },
  decorators: [
    (Story) => (
      <div style={{ padding: 32 }}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof ModuleCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Investigaciones: Story = {
  render: () => (
    <ModuleCard
      title="INVESTIGACIONES"
      icon={<img src={Icons.InvestigacionesIcon} alt="" />}
      metrics={[
        { label: "Casos abiertos", value: 15 },
        { label: "Alertas", value: 4 }
      ]}
    />
  )
};

export const Ciberseguridad: Story = {
  render: () => (
    <ModuleCard
      title="CIBERSEGURIDAD"
      icon={<img src={Icons.CiberseguridadIcon} alt="" />}
      metrics={[
        { label: "Incidentes", value: 12 },
        { label: "Críticos", value: 2 }
      ]}
    />
  )
};

export const Evidencias: Story = {
  render: () => (
    <ModuleCard
      title="EVIDENCIAS"
      icon={<img src={Icons.EvidenciasIcon} alt="" />}
      metrics={[
        { label: "Archivos", value: 154 },
        { label: "Pendientes", value: 8 }
      ]}
    />
  )
};

export const Género: Story = {
  render: () => (
    <ModuleCard
      title="GÉNERO"
      icon={<img src={Icons.GeneroIcon} alt="" />}
      metrics={[
        { label: "Casos", value: 42 },
        { label: "Seguimientos", value: 9 }
      ]}
    />
  )
};

export const GridExample: Story = {
  parameters: {
    layout: "fullscreen"
  },
  render: () => (
    <div
      style={{
        display: "grid",
        gap: 20,
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        padding: 32,
        width: "100%"
      }}
    >
      <ModuleCard
        title="INVESTIGACIONES"
        icon={<img src={Icons.InvestigacionesIcon} alt="" />}
        metrics={[
          { label: "Casos abiertos", value: 15 },
          { label: "Alertas", value: 4 }
        ]}
      />
      <ModuleCard
        title="CIBERSEGURIDAD"
        icon={<img src={Icons.CiberseguridadIcon} alt="" />}
        metrics={[
          { label: "Incidentes", value: 12 },
          { label: "Críticos", value: 2 }
        ]}
      />
      <ModuleCard
        title="EVIDENCIAS"
        icon={<img src={Icons.EvidenciasIcon} alt="" />}
        metrics={[
          { label: "Archivos", value: 154 },
          { label: "Pendientes", value: 8 }
        ]}
      />
      <ModuleCard
        title="GÉNERO"
        icon={<img src={Icons.GeneroIcon} alt="" />}
        metrics={[
          { label: "Casos", value: 42 },
          { label: "Seguimientos", value: 9 }
        ]}
      />
      <ModuleCard
        title="CATÁSTROFES"
        icon={<img src={Icons.CatastrofesIcon} alt="" />}
        metrics={[
          { label: "Áreas", value: 3 },
          { label: "Alertas", value: 6 }
        ]}
      />
      <ModuleCard
        title="DESPLIEGUE"
        icon={<img src={Icons.DespliegueIcon} alt="" />}
        metrics={[
          { label: "Nodos", value: 5 },
          { label: "Activos", value: 7 }
        ]}
      />
      <ModuleCard
        title="BANDEJA"
        icon={<img src={Icons.ModulesBandejaIcon} alt="" />}
        metrics={[
          { label: "Tareas", value: 18 },
          { label: "Nuevas", value: 5 }
        ]}
      />
    </div>
  )
};
