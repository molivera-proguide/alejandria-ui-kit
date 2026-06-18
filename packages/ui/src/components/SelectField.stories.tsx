import type { Meta, StoryObj } from "@storybook/react-vite";
import { SelectField } from "./SelectField";

const countryOptions = [
  { label: "Todo el pais", value: "country" },
  { label: "Zona centro", value: "center" },
  { label: "Zona sur", value: "south" },
  { label: "Zona norte", value: "north" }
];

const meta = {
  title: "Alejandria/SelectField",
  component: SelectField,
  parameters: {
    layout: "centered"
  },
  args: {
    label: "Region",
    options: countryOptions,
    defaultValue: "country",
    hint: "Filtro de alcance operativo."
  },
  decorators: [
    (Story) => (
      <div style={{ minWidth: 420, padding: 32 }}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof SelectField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true
  }
};

export const Invalid: Story = {
  args: {
    error: "Selecciona una region disponible."
  }
};

export const CompactFilters: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 14, gridTemplateColumns: "repeat(2, minmax(0, 1fr))" }}>
      <SelectField label="Region" options={countryOptions} defaultValue="south" />
      <SelectField
        label="Estado"
        options={[
          { label: "Todas", value: "all" },
          { label: "En espera", value: "waiting" },
          { label: "Asignadas", value: "assigned" },
          { label: "Criticas", value: "critical" }
        ]}
        defaultValue="all"
      />
    </div>
  )
};
