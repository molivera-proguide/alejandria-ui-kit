import type { Meta, StoryObj } from "@storybook/react-vite";
import { AlertBar } from "./AlertBar";

const meta = {
  title: "Alejandria/AlertBar",
  component: AlertBar,
  parameters: {
    layout: "padded",
    backgrounds: {
      default: "alejandria-dark",
      values: [{ name: "alejandria-dark", value: "#060606" }]
    }
  },
  argTypes: {
    tone: {
      control: "select",
      options: ["default", "alerta"]
    }
  }
} satisfies Meta<typeof AlertBar>;

export default meta;
type Story = StoryObj<typeof meta>;

/** PDF "ALERT" p.22 § "Alert Sigcat" — ejemplo "3 ALERTAS NUEVAS". */
export const Default: Story = {
  args: {
    label: "3 ALERTAS NUEVAS"
  }
};

/** Mismo componente, tono `alerta` — ejemplo "INCENDIO TIPO A - FASE 1". */
export const Alerta: Story = {
  args: {
    label: "INCENDIO TIPO A - FASE 1",
    tone: "alerta"
  }
};

/** Uso real en las screens de Familia Tareas: topbar con el conteo de tareas. */
export const ComoTopbar: Story = {
  args: {
    label: "5 TAREAS PENDIENTES"
  }
};
