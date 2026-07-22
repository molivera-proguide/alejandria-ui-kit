import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Asistente, type AsistenteProps } from "./Asistente";

/**
 * @description Copy estático del asistente según la referencia PDF — página 12 (ASISTENTE)
 */
const defaultArgs: AsistenteProps = {
  greeting: "HOLA SEBASTIÁN,",
  prompt: "¿Qué querés hacer hoy?",
  executeLabel: "EJECUTAR",
  attachLabel: "Adjuntar archivos",
  suggestions: [
    { label: "Ayudame a escribir" },
    { label: "Saber más" },
    { label: "Resumir sumario" },
    { label: "Generar investigación" }
  ]
};

const meta = {
  title: "Alejandria/Asistente",
  component: Asistente,
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "alejandria-paper",
      values: [
        { name: "alejandria-dark", value: "#060606" },
        { name: "alejandria-paper", value: "#e6e6e6" }
      ]
    }
  },
  decorators: [
    (Story) => (
      <div
        style={{
          boxSizing: "border-box",
          minHeight: "100vh",
          padding: "64px 48px",
          width: "100%"
        }}
      >
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof Asistente>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * @description Referencia visual estática según PDF p.12 (sin handlers cableados)
 */
export const Default: Story = {
  args: defaultArgs
};

/**
 * @description Playground interactivo: prompt controlado + handlers de acción
 */
export const Playground: Story = {
  args: defaultArgs,
  render: function PlaygroundStory(args) {
    const [promptValue, setPromptValue] = useState("");

    return (
      <Asistente
        {...args}
        promptValue={promptValue}
        onPromptChange={setPromptValue}
        onExecute={() => {
          console.log("execute", promptValue);
          alert(`EJECUTAR: ${promptValue || "(vacío)"}`);
        }}
        onAttach={() => {
          console.log("attach");
          alert("Adjuntar archivos");
        }}
        onMicClick={() => {
          console.log("mic");
          alert("Entrada por voz");
        }}
        suggestions={args.suggestions.map((suggestion) => ({
          ...suggestion,
          onClick: () => {
            console.log("suggestion", suggestion.label);
            alert(suggestion.label);
          }
        }))}
      />
    );
  }
};
