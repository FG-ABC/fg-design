# PortalContainerProvider / usePortalContainer

Controls which element overlays portal into. Only needed when the design tokens
are scoped to a class rather than declared on `:root`.

## The problem it solves

`Select`, `Autocomplete` (and its variants), `DatePicker`, `DateTimePicker`,
`MonthPicker`, `DropdownMenu`, `Tooltip`, `Modal` and `CommandDialog` all render
through a Radix Portal, which mounts to `document.body`.

Tokens on `:root` reach `document.body`, so the default needs no configuration.
Tokens scoped to a class do not — the overlay lands outside that subtree, so
`--color-elevated` resolves to nothing and the overlay renders transparent.

## Minimal example

```tsx
import { PortalContainerProvider } from "fg-design";

function ThemedSection() {
  const [scope, setScope] = React.useState<HTMLElement | null>(null);

  return (
    <div ref={setScope} className="theme-marketing">
      <PortalContainerProvider container={scope}>
        <FormSelect label="Role" options={roles} />
      </PortalContainerProvider>
    </div>
  );
}
```

Use a state callback ref rather than `useRef`. The container has to be a real
element on the render that mounts the portal, and a `useRef` is still `null` then.

## Props — PortalContainerProvider

| Prop        | Type                 | Default | Description                                        |
| ----------- | -------------------- | ------- | -------------------------------------------------- |
| `container` | `HTMLElement \| null` | —       | Element to portal into. `null` keeps `document.body`. |
| `children`  | `ReactNode`          | —       | Required                                             |

## usePortalContainer return value

| Type                  | Description                                            |
| --------------------- | ------------------------------------------------------ |
| `HTMLElement \| null` | The configured container, or `null` for `document.body`. |

Pass it straight to a Radix `Portal`'s `container` prop when building a new
overlay component inside this library.

## Notes

- Omitting the provider preserves the previous behaviour exactly.
- Give the scope element a containing block (`position: relative`) if a fixed
  overlay inside it should position against the scope rather than the viewport.
- Unrelated to the `modal` prop on the pickers and autocompletes — that one keeps
  a popover inside a dialog's focus trap, and the two can be combined.
