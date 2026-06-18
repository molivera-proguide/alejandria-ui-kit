import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "./Badge";
import { DataTable } from "./DataTable";

const columns = [
  { key: "id", label: "ID" },
  { key: "zone", label: "Zona" },
  { key: "status", label: "Estado" },
  { key: "units", label: "Unidades", align: "right" as const }
];

const rows = [
  { id: "#3408473", zone: "Costa sur", status: <Badge tone="danger">Critica</Badge>, units: "05" },
  { id: "#3408474", zone: "Barrio sur", status: <Badge tone="success">Asignada</Badge>, units: "12" },
  { id: "#3408475", zone: "Ruta 11", status: <Badge tone="warning">Pendiente</Badge>, units: "03" },
  { id: "#3408476", zone: "Nodo central", status: <Badge tone="info">Monitoreo</Badge>, units: "08" }
];

const meta = {
  title: "Alejandria/DataTable",
  component: DataTable,
  parameters: {
    layout: "centered"
  },
  argTypes: {
    columns: { control: false },
    rows: { control: false }
  },
  args: {
    columns,
    rows,
    caption: "Tareas recientes"
  },
  decorators: [
    (Story) => (
      <div style={{ minWidth: 720, padding: 32 }}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof DataTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const WithoutCaption: Story = {
  args: {
    caption: undefined
  }
};

export const DenseOperationalRows: Story = {
  args: {
    caption: "Recursos",
    columns: [
      { key: "resource", label: "Recurso" },
      { key: "owner", label: "Responsable" },
      { key: "eta", label: "ETA", align: "center" },
      { key: "state", label: "Estado", align: "right" }
    ],
    rows: [
      { id: "r1", resource: "Helicoptero", owner: "Equipo Norte", eta: "00:14", state: <Badge tone="success">Activo</Badge> },
      { id: "r2", resource: "Dron 1", owner: "Observacion", eta: "00:04", state: <Badge tone="info">En vuelo</Badge> },
      { id: "r3", resource: "Ambulancia", owner: "Sanidad", eta: "00:21", state: <Badge tone="warning">Demora</Badge> }
    ]
  }
};
