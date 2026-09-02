# NumberInput / MoneyInput

Formatted number fields built on top of `Input`.

## NumberInput

Three modes controlled by `mode`:

```tsx
import { NumberInput } from "fg-design";

// Digits only, no sign
<NumberInput label="Quantity" mode="POSITIVE_INTEGERS" />

// Any integer, negative allowed (default)
<NumberInput label="Offset" mode="INTEGERS" />

// Decimals
<NumberInput label="Rate" mode="FLOATS" maxDecimals={2} />
```

## Props — NumberInput

| Prop          | Type                                      | Default    |
| ------------- | ----------------------------------------- | ---------- |
| `mode`        | `POSITIVE_INTEGERS \| INTEGERS \| FLOATS` | `INTEGERS` |
| `maxDecimals` | `number`                                  | `2`        |
| `value`       | `number \| string`                        | —          |
| `onChange`    | `(value: number \| string) => void`       | —          |
| `label`       | `string`                                  | —          |
| `error`       | `string`                                  | —          |
| `hint`        | `string`                                  | —          |

Controlled via `value` + `onChange`.

### The emitted value

`onChange` receives a `number` for any complete value. It receives a **string**
only while the entry is mid-keystroke and cannot yet be represented as a number
without losing what was typed — `"12."` or `"12.0"`, where parsing to `12` would
delete the character just entered.

That string is always sanitized: it never contains the grouping separators shown
in the field, and it is never a bare `"-"` or `"."` (those emit `0` while staying
on screen). So the emitted value is **always safe to hand to `Number()`,
`parseFloat`, or a decimal library**:

```tsx
const [amount, setAmount] = React.useState<number | string>(0);

<NumberInput mode="FLOATS" maxDecimals={4} value={amount} onChange={setAmount} />;

// Safe — no separators, no partial-token strings.
new Decimal(String(amount));
```

On blur the value always settles to a `number`, so a string never survives past
the field losing focus.

---

## MoneyInput

Currency input with a `$` prefix adornment. Always decimal.

```tsx
import { MoneyInput } from "fg-design";

<MoneyInput label="Amount" />
<MoneyInput label="Amount" currencySymbol="€" />
```

## Props — MoneyInput

| Prop             | Type     | Default |
| ---------------- | -------- | ------- |
| `currencySymbol` | `string` | `$`     |
| `maxDecimals`    | `number` | `2`     |
| `label`          | `string` | —       |
| `error`          | `string` | —       |
| `hint`           | `string` | —       |

## Notes

- Both format numbers with `toLocaleString` on blur
- On focus the raw number is shown for editing
- Don't use `Input type="number"` — use these components instead
