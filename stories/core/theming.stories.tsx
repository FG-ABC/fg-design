import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@/components/core/button";
import { Checkbox } from "@/components/core/checkbox";
import { Toggle } from "@/components/core/toggle";
import { Input } from "@/components/core/input";

const meta: Meta = {
  title: "Core/Theming",
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

/** Scoped override — same components, different accent and radius, no forking. */
const violet: React.CSSProperties = {
  "--color-accent-500": "#7c3aed",
  "--color-accent-600": "#6d28d9",
  "--color-accent-700": "#5b21b6",
  "--color-on-accent": "#ffffff",
} as React.CSSProperties;

/** A LIGHT accent — white would fail contrast here, so on-accent is dark ink. */
const amber: React.CSSProperties = {
  "--color-accent-500": "#fbbf24",
  "--color-accent-600": "#f59e0b",
  "--color-accent-700": "#d97706",
  "--color-on-accent": "#1a1917",
} as React.CSSProperties;

function Sampler({ label }: { label: string }) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs text-[var(--color-subtle)]">{label}</p>
      <div className="flex flex-wrap items-center gap-3">
        <Button>Primary</Button>
        <Button variant="outline">Outline</Button>
        <Button className="rounded-full">Pill</Button>
        <Checkbox defaultChecked />
        <Toggle defaultChecked />
        <Input placeholder="Input" />
      </div>
    </div>
  );
}

export const DefaultTheme: Story = {
  render: () => <Sampler label="Default — forest green" />,
};

export const VioletAccent: Story = {
  render: () => (
    <div style={violet}>
      <Sampler label="Dark accent (violet) — white on-accent, 5.7:1" />
    </div>
  ),
};

export const LightAccent: Story = {
  render: () => (
    <div style={amber}>
      <Sampler label="Light accent (amber) — dark on-accent 10.5:1; white would be 1.7:1" />
    </div>
  ),
};

/** Pill buttons only: inputs and cards keep their radius. */
export const PillButtons: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button className="rounded-full">Save</Button>
      <Button variant="outline" className="rounded-full">Cancel</Button>
      <Input placeholder="Input keeps its radius" />
    </div>
  ),
};
