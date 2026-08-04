import type { Meta, StoryObj } from "@storybook/react-vite";
import { TaskCard } from "./TaskCard";

const canonicalTask = {
  code: "#1232142342 - 3408473",
  status: "En espera",
  title: "Tareas investigativas",
  meta: ["Subactividad", "Causa Corion"],
  creator: "Dependencia",
  startDate: "Inicio 21/04/2022",
  endDate: "Vencimiento 23/07/2022"
};

const meta = {
  title: "Alejandria/TaskCard",
  component: TaskCard,
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
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "kanban", "resumen"]
    },
    tone: {
      control: "select",
      options: ["neutral", "success", "warning", "danger"]
    }
  },
  decorators: [
    (Story) => (
      <div style={{ padding: 32, width: "fit-content" }}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof TaskCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gap: 14,
        gridTemplateColumns: "repeat(2, minmax(0, 1fr))"
      }}
    >
      <TaskCard {...canonicalTask} tone="danger" />
      <TaskCard {...canonicalTask} tone="success" />
      <TaskCard {...canonicalTask} tone="warning" />
      <TaskCard {...canonicalTask} tone="neutral" />
    </div>
  )
};

export const Single: Story = {
  args: {
    ...canonicalTask,
    tone: "danger"
  }
};

export const Kanban: Story = {
  args: {
    variant: "kanban",
    code: "#1232142342 - 3408473",
    status: "En espera",
    title: "Tareas investigativas",
    meta: ["Subactividad", "Causa Corion"],
    tone: "danger"
  },
  render: (args) => (
    <div
      style={{
        display: "grid",
        gap: 10,
        gridTemplateColumns: "repeat(2, minmax(0, 1fr))"
      }}
    >
      <TaskCard {...args} />
      <TaskCard {...args} tone="success" status="Asignada" />
      <TaskCard {...args} tone="warning" status="Pendiente" />
      <TaskCard {...args} tone="neutral" status="Monitoreo" />
    </div>
  )
};

export const WithDescription: Story = {
  args: {
    ...canonicalTask,
    description: "Cruce de datos satelitales y dependencia policial.",
    tone: "danger"
  }
};

export const Resumen: Story = {
  args: {
    variant: "resumen",
    code: "#1232142342 - 3408473",
    status: "En espera",
    title: "Tareas investigativas",
    tone: "neutral"
  }
};
