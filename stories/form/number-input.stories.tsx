import type { Meta, StoryObj } from "@storybook/react";
import { NumberInput } from "@/components/core/number-input";
import * as React from "react";

const meta: Meta<typeof NumberInput> = {
  title: "Form/NumberInput",
  component: NumberInput,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  decorators: [(Story) => <div className="w-80"><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof NumberInput>;

export const Integers: Story = {
  args: { label: "Quantity", mode: "INTEGERS", placeholder: "0" },
};

export const PositiveIntegers: Story = {
  args: { label: "Stock count", mode: "POSITIVE_INTEGERS", placeholder: "0", value: 1000 },
};

export const Floats: Story = {
  args: { label: "Weight (kg)", mode: "FLOATS", placeholder: "0.00", value: 12.5 },
};

export const FloatsHighPrecision: Story = {
  args: { label: "Latitude", mode: "FLOATS", maxDecimals: 6, value: 14.599512 },
};

export const WithError: Story = {
  args: { label: "Units", mode: "POSITIVE_INTEGERS", error: "Must be at least 1.", value: 0 },
};

/**
 * The emitted value is always safe to parse — no grouping separators, no bare
 * "-" or ".". Type a large number past the thousands separator, then add a
 * decimal point, and check that the emitted value stays parseable.
 */
export const EmittedValue: Story = {
  render: () => {
    const [value, setValue] = React.useState<number | string>(65950);
    const asNumber = Number(value);
    const parsed = Number.isFinite(asNumber) ? String(asNumber) : "unparseable";
    return (
      <div className="flex flex-col gap-3 w-80">
        <NumberInput
          label="Amount"
          mode="FLOATS"
          maxDecimals={4}
          value={value}
          onChange={setValue}
        />
        <div className="flex flex-col gap-1 rounded-[var(--radius-md)] bg-[var(--color-surface)] px-3 py-2">
          <span className="text-[var(--text-xs)] text-[var(--color-base)]">
            emitted: <code>{JSON.stringify(value)}</code>
          </span>
          <span className="text-[var(--text-xs)] text-[var(--color-base)]">
            Number(): <code>{parsed}</code>
          </span>
        </div>
      </div>
    );
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <NumberInput label="Integers" mode="INTEGERS" value={-42} />
      <NumberInput label="Positive integers" mode="POSITIVE_INTEGERS" value={1000000} />
      <NumberInput label="Floats" mode="FLOATS" value={3.14159} maxDecimals={5} />
      <NumberInput label="With error" mode="POSITIVE_INTEGERS" error="Required" />
    </div>
  ),
};
