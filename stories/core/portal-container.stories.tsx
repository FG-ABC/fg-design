import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { PortalContainerProvider } from "@/components/core/portal-container";
import { FormSelect } from "@/components/form/form-select";
import { DatePicker } from "@/components/form/date-picker";

const meta: Meta = {
  title: "Core/PortalContainer",
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

/** A theme scoped to a class rather than :root — the case portals break in. */
const scopedTheme: React.CSSProperties = {
  "--color-elevated": "#1f261c",
  "--color-field": "#1f261c",
  "--color-border": "#2a3326",
  "--color-base": "#c8d5c4",
  "--color-ink": "#e8efe5",
  "--color-canvas": "#111510",
  "--color-accent-500": "#4db082",
  "--color-on-accent": "#0f2e21",
  padding: "1.5rem",
  borderRadius: "12px",
  background: "var(--color-canvas)",
} as React.CSSProperties;

const ROLES = [
  { label: "Engineer", value: "engineer" },
  { label: "Designer", value: "designer" },
];

/**
 * Without a container, the overlay portals to document.body, lands outside the
 * scoped tokens and renders with no background. Open the select to see it.
 */
export const WithoutProvider: Story = {
  render: () => (
    <div style={scopedTheme}>
      <FormSelect label="Role" placeholder="Open me" options={ROLES} />
    </div>
  ),
};

/** With the provider, overlays mount inside the scope and pick up its tokens. */
export const WithProvider: Story = {
  render: function Render() {
    const [scope, setScope] = React.useState<HTMLElement | null>(null);

    return (
      <div ref={setScope} style={scopedTheme}>
        <PortalContainerProvider container={scope}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <FormSelect label="Role" placeholder="Open me" options={ROLES} />
            <DatePicker label="Start date" />
          </div>
        </PortalContainerProvider>
      </div>
    );
  },
};
