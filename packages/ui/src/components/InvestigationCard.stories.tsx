import type { Meta, StoryObj } from "@storybook/react-vite";
import { InvestigationCard } from "./InvestigationCard";
import * as Icons from "../Icons";

const canonicalUtilities = [
  { type: "edit" as const, onClick: () => undefined },
  { type: "delete" as const, onClick: () => undefined },
  { type: "close" as const, onClick: () => undefined }
];

const canonicalInvestigation = {
  title: "VUELO XR2180",
  icon: <img src={Icons.AvionIcon} alt="" />,
  metrics: [
    { value: "04/05", label: "Fecha de ingreso" },
    { value: "EZE", label: "Aeropuerto" },
    { value: "04:13", label: "Horario" },
    { value: "2", label: "Acompañantes" }
  ],
  actions: [
    { label: "ACCIÓN A", variant: "primary" as const },
    { label: "ACCIÓN B", variant: "ghost" as const }
  ],
  utilities: canonicalUtilities
};

const meta = {
  title: "Alejandria/InvestigationCard",
  component: InvestigationCard,
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
} satisfies Meta<typeof InvestigationCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: canonicalInvestigation
};

export const Flight: Story = {
  render: () => <InvestigationCard {...canonicalInvestigation} />
};

export const GridExample: Story = {
  parameters: {
    layout: "fullscreen"
  },
  render: () => (
    <div
      style={{
        display: "grid",
        gap: 16,
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        padding: 32,
        width: "100%"
      }}
    >
      <InvestigationCard
        title="VUELO XR2180"
        icon={<img src={Icons.AvionIcon} alt="" />}
        metrics={canonicalInvestigation.metrics}
        actions={canonicalInvestigation.actions}
        utilities={canonicalUtilities}
      />
      <InvestigationCard
        title="AUTO AB123CD"
        icon={<img src={Icons.AutoIcon} alt="" />}
        metrics={[
          { value: "12/05", label: "Fecha de ingreso" },
          { value: "CABA", label: "Zona" },
          { value: "18:40", label: "Horario" },
          { value: "1", label: "Ocupantes" }
        ]}
        actions={[
          { label: "ACCIÓN A", variant: "primary" },
          { label: "ACCIÓN B", variant: "ghost" }
        ]}
        utilities={canonicalUtilities}
      />
      <InvestigationCard
        title="PERSONA ID 8842"
        icon={<img src={Icons.PersonaIcon} alt="" />}
        metrics={[
          { value: "03/05", label: "Fecha de ingreso" },
          { value: "ROS", label: "Origen" },
          { value: "09:15", label: "Horario" },
          { value: "0", label: "Acompañantes" }
        ]}
        actions={[
          { label: "ACCIÓN A", variant: "primary" },
          { label: "ACCIÓN B", variant: "ghost" }
        ]}
        utilities={canonicalUtilities}
      />
    </div>
  )
};
