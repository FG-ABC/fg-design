# Theming

Every component styles itself through CSS custom properties — there are **no hardcoded
hex values anywhere in `src/components/`**. Change the variables and the whole library
follows. You never fork a component to restyle it, so you keep getting upgrades.

Functionality is untouched by theming: the Radix primitives, `asChild`, `loading`,
focus management and keyboard nav live in the component, not the styling layer.

---

## Retheming a new site

Import the library styles, then your overrides **after** so they win the cascade:

```css
@import "fg-design/styles";              /* Tailwind v4 */
@import "./themes/my-theme.css";
```

A starting point ships with the package:

```css
@import "fg-design/styles/themes/example-theme.css";
```

Copy it into your app and edit — it is a template, not a dependency.

Scope to a class instead of `:root` when two themes share a page:

```css
.theme-marketing { --color-accent-500: #7c3aed; }
```

---

## Changing the accent

Replace all 10 stops of the ramp. `500` is the primary fill; `600` and `700` are the
hover and active states and must stay progressively darker in light mode, or pressing
a button looks flat.

```css
:root {
  --color-accent-500: #7c3aed;
  --color-accent-600: #6d28d9;
  --color-accent-700: #5b21b6;
  /* …50–400, 800–900 */
}
```

**Always update `--color-on-accent` alongside it.** That token is the label on the
primary button, the checkbox tick and the toggle knob. It must clear 4.5:1 against
your `--color-accent-500`:

| Accent      | `--color-on-accent` |
| ----------- | ------------------- |
| Dark (deep green, violet, navy) | `#ffffff` |
| Light (amber, lime, cyan, pastel) | a dark ink, e.g. `--color-accent-900` |

Dark mode inverts the ramp — `--color-accent-500` becomes *light* — so
`--color-on-accent` is dark ink inside `[data-theme="dark"]`.

---

## Changing roundness

`--radius-*` is **shared across components**. Raising `--radius-md` rounds inputs,
cards and modals too, not just buttons — usually what you want for a soft look:

```css
:root {
  --radius-md: 16px;
  --radius-lg: 22px;
}
```

### Pill buttons only

To round buttons *without* touching inputs and cards, do it per-component:

```tsx
<Button className="rounded-full">Save</Button>
<Button size="icon" className="rounded-full" />
```

`cn()` runs `tailwind-merge`, so `rounded-full` **replaces** the variant's radius
rather than competing with it — no `!important` needed. This is the general rule for
any override: pass a `className` and it wins.

For app-wide pills, target the element so other components are unaffected:

```css
button { border-radius: var(--radius-full); }
```

---

## Scoped themes and overlays

Overlays — `Select`, the autocompletes, the pickers, `DropdownMenu`, `Tooltip`,
`Modal` and the command palette — render through a Radix Portal, which mounts to
`document.body`. Tokens declared on `:root` still reach them, so nothing extra is
needed for the common case.

Tokens scoped to a class are different. The portal content sits **outside** that
element, so it never sees the scoped variables and renders with no background:

```css
/* Overlays opened inside .theme-marketing will be transparent */
.theme-marketing { --color-elevated: #fff; }
```

Point overlays back inside the scope with `PortalContainerProvider`:

```tsx
import { PortalContainerProvider } from "fg-design";

function ThemedSection() {
  const [scope, setScope] = React.useState<HTMLElement | null>(null);

  return (
    <div ref={setScope} className="theme-marketing">
      <PortalContainerProvider container={scope}>
        {/* Select, DatePicker, Tooltip… all portal into `scope` */}
      </PortalContainerProvider>
    </div>
  );
}
```

Use a state callback ref, not `useRef` — the container must be a real element on
the render that mounts the portal, and a `useRef` is still `null` then.

Unset, portals keep mounting on `document.body`, so this changes nothing for apps
theming through `:root`.

Give the scope element `position: relative` (or another containing block) if a
`position: fixed` overlay inside it should be positioned against the scope.

---

## Which stylesheet to import

| Project                      | Import                        | Notes |
| ---------------------------- | ----------------------------- | ----- |
| Tailwind v4                  | `fg-design/styles`            | Tokens in `@theme`, exposed as utility classes |
| Tailwind v3 / plain CSS      | `fg-design/styles/variables`  | Plain custom properties, no Tailwind syntax |

Both define the same token names and values, so a theme override file works against either.
