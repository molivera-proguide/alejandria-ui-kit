import type { Meta, StoryObj } from "@storybook/react-vite";
import { FilterField } from "./FilterField";

const meta = {
  title: "Alejandria/FilterField",
  component: FilterField,
  parameters: {
    layout: "padded",
    backgrounds: {
      default: "alejandria-dark",
      values: [{ name: "alejandria-dark", value: "#060606" }]
    }
  }
} satisfies Meta<typeof FilterField>;

export default meta;
type Story = StoryObj<typeof meta>;

/** PDF "FILTER" p.23 — ejemplo del mock: "Investigación". */
export const Default: Story = {
  args: {
    defaultValue: "Investigación",
    "aria-label": "Filtrar"
  }
};

/** Sin valor, solo placeholder. */
export const Placeholder: Story = {
  args: {
    placeholder: "Buscar tarea",
    "aria-label": "Buscar tarea"
  }
};
