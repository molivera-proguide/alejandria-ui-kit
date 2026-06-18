import type { Meta, StoryObj } from "@storybook/react-vite";
import { Crosshair, Filter, Save } from "lucide-react";
import { Button } from "./Button";

const meta = {
  title: "Alejandria/Button",
  component: Button,
  parameters: {
    layout: "centered"
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "ghost", "danger"]
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"]
    },
    iconLeft: { control: false },
    iconRight: { control: false }
  },
  args: {
    children: "Asignar",
    variant: "primary",
    size: "md",
    fullWidth: false,
    loading: false,
    disabled: false
  },
  decorators: [
    (Story) => (
      <div style={{ minWidth: 360, padding: 32 }}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
      <Button iconLeft={<Crosshair />}>Asignar</Button>
      <Button variant="secondary" iconLeft={<Filter />}>
        Filtros
      </Button>
      <Button variant="ghost">Ver log</Button>
      <Button variant="danger">Cancelar</Button>
    </div>
  )
};

export const Sizes: Story = {
  render: () => (
    <div style={{ alignItems: "center", display: "flex", flexWrap: "wrap", gap: 12 }}>
      <Button size="sm" variant="secondary">
        Pequeno
      </Button>
      <Button size="md">Medio</Button>
      <Button size="lg" iconLeft={<Save />}>
        Grande
      </Button>
    </div>
  )
};

export const Loading: Story = {
  args: {
    children: "Procesando",
    loading: true
  }
};
