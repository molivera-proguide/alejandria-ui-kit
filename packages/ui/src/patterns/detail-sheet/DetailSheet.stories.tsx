import type { Meta, StoryObj } from "@storybook/react-vite";
import { DetailSheet } from "./DetailSheet";
import type { DetailSheetContent } from "./DetailSheet";

/**
 * @description Datos estáticos de la ficha según la referencia PDF — página 5 (Fichas).
 * Corregido 2026-08-07: citaba "página 4" (esa es INVESTIGATION CARD); el contenido de
 * este mock ("#1232142342 - 3408473", "DESCRIPCIÓN", "MÉTRICAS DE RENDIMIENTO DE LA
 * TAREA") aparece verbatim en el extract de texto de p.5, confirmado vía PyMuPDF.
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
 * @description Ficha completa según la referencia PDF — página 5
 */
export const Fichas: Story = {
  args: {
    content: fichaContent
  }
};

/**
 * @description Panel lateral ancho (PDF p.7 — 004-familia-tareas): mismo contenido, con
 * `className="detail-sheet--wide"` y `onClose` cableado. Verifica visualmente el estilo del
 * 3er botón "--c" (antes sin regla CSS) y el ancho ampliado.
 */
export const PanelLateral: Story = {
  args: {
    content: fichaContent,
    className: "detail-sheet--wide",
    onClose: () => undefined
  }
};

/**
 * @description Verifica knowledge/design-system-rules.md Rule 11 — el `@container` en
 * detail-sheet.css mide el ancho de ESTE wrapper, no el viewport de Storybook (por eso el
 * addon de Viewport no sirve para probar esto — hay que angostar el contenedor real). Por
 * debajo de 640px (paso `narrow` de la escala), header y body colapsan a una columna para
 * que `.detail-sheet__metrics` (3 MetricCard fijos = piso duro de 261px) tenga el ancho
 * completo del panel en vez de la mitad.
 */
export const PanelAngosto: Story = {
  args: {
    content: fichaContent,
    className: "detail-sheet--wide",
    onClose: () => undefined
  },
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    )
  ]
};
