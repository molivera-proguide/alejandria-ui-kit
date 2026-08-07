import type { Meta, StoryObj } from "@storybook/react-vite";
import { FormDatePicker } from "./FormDatePicker";

const meta = {
  title: "Alejandria/FormDatePicker",
  component: FormDatePicker,
  parameters: {
    layout: "centered"
  },
  decorators: [
    (Story) => (
      <div style={{ background: "#060606", minWidth: 320, padding: 32 }}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof FormDatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Estático — 2 triggers independientes, FECHA y HORA. PDF p.21. */
export const Default: Story = {};

/** Activo — panel de FECHA (calendario) abierto. PDF p.21. */
export const Activo: Story = {
  play: async ({ canvasElement }) => {
    const trigger = canvasElement.querySelector<HTMLButtonElement>(".ds-form-date__field--fecha .ds-form-date__trigger");
    trigger?.click();
  }
};

/** Día y hora seleccionada — ejemplo "Julio 2026", 14:10 del PDF p.21. */
export const DiaHoraSeleccionada: Story = {
  args: {
    defaultValue: new Date(2026, 6, 20, 14, 10)
  }
};

/** Disabled — no especificado por el PDF, ver DECISIONS.md. */
export const Disabled: Story = {
  args: {
    disabled: true
  }
};
