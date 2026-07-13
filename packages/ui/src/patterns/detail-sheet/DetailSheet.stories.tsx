import type { Meta, StoryObj } from "@storybook/react-vite";
import { DetailSheet } from "./DetailSheet";
import type { DetailSheetContent } from "./DetailSheet";

/**
 * @description Datos estáticos de la ficha según la referencia PDF — página 4 (Fichas)
 * @type {DetailSheetContent}
 */
const fichaContent: DetailSheetContent = {
  statuses: [
    { label: "EN ESPERA", variant: "neutral" },
    { label: "VENCIDA", variant: "critical" }
  ],
  identifier: "#1232142342 - 3408473",
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

const meta = {
  title: "Alejandria/Patterns/DetailSheet",
  component: DetailSheet,
  parameters: {
    layout: "fullscreen",
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
} satisfies Meta<typeof DetailSheet>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * @description Ficha completa según la referencia PDF — página 4
 */
export const Fichas: Story = {
  args: {
    content: fichaContent
  }
};
