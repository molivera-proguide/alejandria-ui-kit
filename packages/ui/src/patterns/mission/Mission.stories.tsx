import type { Meta, StoryObj } from "@storybook/react-vite";
import { Mission } from "./Mission";
import type { MissionContent } from "./Mission";

/**
 * @description Datos estáticos de la misión de evacuación (generada vía visual grammar; sin lámina PDF)
 * @type {MissionContent}
 */
const evacuationContent: MissionContent = {
  liveLabel: "EN VIVO",
  missionType: "EVACUACIÓN",
  title: "MISIÓN — 00:01:45",
  incidentTitle: "INCENDIO TIPO A — FASE 1",
  metrics: [
    { label: "Evacuados", value: 75, tone: "success" },
    { label: "Habitantes", value: 50, tone: "danger" },
    { label: "Hectáreas", value: 75, tone: "warning" },
    { label: "Animales", value: 80, tone: "success" }
  ],
  imageryTitle: "Imágenes en vivo",
  cameraFeeds: [
    { id: "dron-1", label: "Dron 1 — Norte" },
    { id: "dron-2", label: "Dron 2 — Sur" },
    { id: "body-cam", label: "Body cam — Lote 1" }
  ],
  logTitle: "Log IA",
  logSearchLabel: "Buscar en log",
  logSearchPlaceholder: "Código, zona o acción",
  logEntries: [
    {
      code: "EV-01",
      timestamp: "00:01:12",
      text: "Evacuación del cuadrante B iniciada"
    },
    {
      code: "IA-04",
      timestamp: "00:01:28",
      text: "Calor residual detectado en perímetro oeste",
      options: [{ label: "Reforzar perímetro" }, { label: "Continuar ruta" }]
    },
    {
      code: "DR-02",
      timestamp: "00:01:36",
      text: "Dron 2 confirma columna de humo estable"
    },
    {
      code: "IA-07",
      timestamp: "00:01:41",
      text: "Habitantes restantes superan umbral crítico",
      options: [{ label: "Priorizar manzana 4" }, { label: "Mantener plan" }]
    },
    {
      code: "BC-01",
      timestamp: "00:01:45",
      text: "Body cam Lote 1: acceso bloqueado por vehículo"
    }
  ],
  statusSummary: {
    missionName: "Evacuación barrio sur",
    progressPercent: 75,
    evacuated: 348,
    total: 464
  }
};

const meta = {
  title: "Alejandria/Patterns/Mission",
  component: Mission,
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "alejandria-dark",
      values: [
        { name: "alejandria-dark", value: "#060606" },
        { name: "alejandria-paper", value: "#e6e6e6" }
      ]
    }
  }
} satisfies Meta<typeof Mission>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * @description Panel de misión de evacuación en vivo sobre el mapa operativo
 */
export const Evacuacion: Story = {
  args: {
    content: evacuationContent
  }
};
