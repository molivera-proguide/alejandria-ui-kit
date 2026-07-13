import type { Meta, StoryObj } from "@storybook/react-vite";
import { Search } from "lucide-react";
import { Button } from "./Button";
import { TextField } from "./TextField";

const meta = {
  title: "Alejandria/TextField",
  component: TextField,
  parameters: {
    layout: "centered"
  },
  argTypes: {
    iconLeft: { control: false },
    action: { control: false },
    appearance: {
      control: "select",
      options: ["default", "pdf"]
    }
  },
  args: {
    label: "Busqueda",
    placeholder: "ID, zona o dependencia",
    hint: "Acepta IDs de tarea, nombres de zona o dependencia.",
    appearance: "default"
  },
  decorators: [
    (Story) => (
      <div style={{ minWidth: 420, padding: 32 }}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const WithIcon: Story = {
  args: {
    iconLeft: <Search />
  }
};

export const WithAction: Story = {
  args: {
    action: (
      <Button size="sm" variant="ghost">
        Limpiar
      </Button>
    ),
    iconLeft: <Search />
  }
};

export const Invalid: Story = {
  args: {
    iconLeft: <Search />,
    error: "No se encontro una tarea con ese identificador."
  }
};

export const PdfAppearance: Story = {
  args: {
    appearance: "pdf",
    label: "Usuario",
    placeholder: "USUARIO",
    hint: undefined
  },
  decorators: [
    (Story) => (
      <div style={{ background: "#060606", minWidth: 420, padding: 32 }}>
        <Story />
      </div>
    )
  ]
};
