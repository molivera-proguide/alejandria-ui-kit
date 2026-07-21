import type { Meta, StoryObj } from "@storybook/react-vite";
import { CalendarCard } from "./CalendarCard";

const meta = {
  title: "Alejandria/CalendarCard",
  component: CalendarCard,
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
  decorators: [
    (Story) => (
      <div style={{ padding: 32, width: "fit-content" }}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof CalendarCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    day: "13",
    month: "AGO",
    description: "Reunión con el teniente por el proyecto."
  }
};

export const WithoutDescription: Story = {
  args: {
    day: "13",
    month: "AGO"
  }
};

export const List: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gap: 10
      }}
    >
      <CalendarCard
        day="13"
        month="AGO"
        description="Reunión con el teniente por el proyecto."
      />
      <CalendarCard
        day="21"
        month="ABR"
        description="Resumen minimo e indispensable de la tarea a realizar."
      />
      <CalendarCard day="23" month="JUL" description="Subactividad — Causa Corion." />
      <CalendarCard day="02" month="SEP" description="En espera — Dependencia Sur." />
    </div>
  )
};
