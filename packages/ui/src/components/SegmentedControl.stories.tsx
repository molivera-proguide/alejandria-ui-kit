import type { Meta, StoryObj } from "@storybook/react-vite";
import { CalendarClock, CheckCircle2, ListFilter, Siren } from "lucide-react";
import { SegmentedControl } from "./SegmentedControl";

const items = [
  { value: "all", label: "Todas", icon: <ListFilter /> },
  { value: "today", label: "Hoy", icon: <CalendarClock /> },
  { value: "done", label: "Cerradas", icon: <CheckCircle2 /> },
  { value: "critical", label: "Criticas", icon: <Siren /> }
];

const meta = {
  title: "Alejandria/SegmentedControl",
  component: SegmentedControl,
  parameters: {
    layout: "centered"
  },
  argTypes: {
    items: { control: false },
    onValueChange: { control: false }
  },
  args: {
    items,
    value: "all",
    label: "Filtro de tareas"
  },
  decorators: [
    (Story) => (
      <div style={{ minWidth: 520, padding: 32 }}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof SegmentedControl>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const CriticalSelected: Story = {
  args: {
    value: "critical"
  }
};

export const WithDisabledItem: Story = {
  args: {
    value: "today",
    items: [
      { value: "all", label: "Todas", icon: <ListFilter /> },
      { value: "today", label: "Hoy", icon: <CalendarClock /> },
      { value: "done", label: "Cerradas", icon: <CheckCircle2 />, disabled: true },
      { value: "critical", label: "Criticas", icon: <Siren /> }
    ]
  }
};
