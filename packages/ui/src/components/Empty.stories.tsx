import type { Meta, StoryObj } from "@storybook/react-vite";
import { ClipboardList, Search } from "lucide-react";
import { Empty } from "./Empty";
import { Button } from "./Button";

const meta = {
  title: "Alejandria/Empty",
  component: Empty,
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
    icon: { control: false },
    action: { control: false }
  },
  args: {
    title: "No hay tareas pendientes",
    description: "Empezá creando una tarjeta para tu tarea.",
    icon: <ClipboardList />,
    action: (
      <Button variant="pdf" size="sm">
        CREÁ UNA TAREA
      </Button>
    )
  },
  decorators: [
    (Story) => (
      <div style={{ background: "var(--ds-color-pdf-surface)", padding: 32 }}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof Empty>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const NoTasks: Story = {
  args: {
    title: "No hay tareas pendientes",
    description: "Empezá creando una tarjeta para tu tarea.",
    icon: <ClipboardList />,
    action: (
      <Button variant="pdf" size="sm">
        CREÁ UNA TAREA
      </Button>
    )
  }
};

export const NoInvestigations: Story = {
  args: {
    title: "No hay investigaciones",
    description: "Empezá sumando una entidad a tu investigación.",
    icon: <Search />,
    action: (
      <Button variant="pdf" size="sm">
        NUEVA ENTIDAD
      </Button>
    )
  }
};
