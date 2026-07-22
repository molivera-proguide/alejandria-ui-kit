import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import * as Icons from "../Icons";
import { SideBar, type SideBarItem, type SideBarProps } from "./SideBar";

const menuIcon = (src: string) => <img src={src} alt="" />;

const primaryItems: SideBarItem[] = [
  {
    icon: menuIcon(Icons.MenuBandejaIcon),
    label: "Mis tareas",
    caption: "Bandeja operativa",
    selected: true
  },
  { icon: menuIcon(Icons.HistorialIcon), label: "Historial" },
  { icon: menuIcon(Icons.ReportsIcon), label: "Reportes" },
  {
    icon: menuIcon(Icons.NotificacionesIcon),
    label: "Notificaciones",
    badge: 2
  },
  { icon: menuIcon(Icons.UsuarioIcon), label: "Mi cuenta" },
  { icon: menuIcon(Icons.ConfiguracionIcon), label: "Configuración" },
  { icon: menuIcon(Icons.AyudaIcon), label: "Ayuda" },
  { icon: menuIcon(Icons.CerrarSesionIcon), label: "Cerrar sesión" }
];

const secondaryItems: SideBarItem[] = [
  {
    icon: menuIcon(Icons.CatastrofesIcon),
    label: "CATÁSTROFES",
    status: "EN VIVO"
  }
];

const frameStyle = {
  height: 520,
  padding: 32
} as const;

const meta = {
  title: "Alejandria/SideBar",
  component: SideBar,
  parameters: {
    layout: "fullscreen",
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
      <div style={frameStyle}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof SideBar>;

export default meta;
type Story = StoryObj<typeof meta>;

const sharedArgs: Omit<SideBarProps, "collapsed" | "onToggleCollapsed"> = {
  logo: <span style={{ color: "#fff", fontFamily: "Montserrat, sans-serif", fontSize: 12 }}>ALEJANDRIA</span>,
  menuLabel: "Menú",
  items: primaryItems,
  secondaryItems
};

export const Expanded: Story = {
  args: {
    ...sharedArgs,
    collapsed: false,
    onToggleCollapsed: () => undefined
  }
};

export const Collapsed: Story = {
  args: {
    ...sharedArgs,
    collapsed: true,
    onToggleCollapsed: () => undefined
  }
};

export const Playground: Story = {
  args: {
    ...sharedArgs,
    collapsed: false,
    onToggleCollapsed: () => undefined
  },
  render: function PlaygroundStory() {
    const [collapsed, setCollapsed] = useState(false);
    const [selectedLabel, setSelectedLabel] = useState("Mis tareas");

    const items = primaryItems.map((item) => ({
      ...item,
      selected: item.label === selectedLabel,
      onClick: () => setSelectedLabel(item.label)
    }));

    const modules = secondaryItems.map((item) => ({
      ...item,
      selected: item.label === selectedLabel,
      onClick: () => setSelectedLabel(item.label)
    }));

    return (
      <SideBar
        logo={sharedArgs.logo}
        menuLabel="Menú"
        items={items}
        secondaryItems={modules}
        collapsed={collapsed}
        onToggleCollapsed={() => setCollapsed((value) => !value)}
      />
    );
  }
};
