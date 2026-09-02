"use client";
import * as React from "react";
import { Input } from "@/components/core/input";
import {
  parseNumber,
  sanitize,
  toEmittedValue,
  toSettledNumber,
} from "@/components/core/number-input/numeric-entry";

export interface MoneyInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value" | "type"> {
  label?: string;
  error?: string;
  hint?: string;
  value?: number | string;
  onChange?: (value: number | string) => void;
  currencySymbol?: string;
  maxDecimals?: number;
  required?: boolean;
}

/** Money is always decimal, so the shared helpers are used in FLOATS mode. */
const MONEY_MODE = "FLOATS" as const;

function formatMoney(value: number | string | undefined, maxDecimals: number): string {
  if (value === undefined || value === null || value === "") return "";

  if (typeof value === "string") return value;

  return value.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: maxDecimals,
  });
}

export const MoneyInput = React.forwardRef<HTMLInputElement, MoneyInputProps>(
  (
    {
      label,
      error,
      hint,
      value,
      onChange,
      currencySymbol = "$",
      maxDecimals = 2,
      onBlur,
      onFocus,
      required,
      ...props
    },
    ref
  ) => {
    const [display, setDisplay] = React.useState(() => formatMoney(value, maxDecimals));

    React.useEffect(() => {
      if (typeof value !== "number") return;
      // Only overwrite display when the numeric value differs from what's shown,
      // so an externally-driven change (e.g. reset to 0) takes effect without
      // stomping an in-progress decimal like "1000.".
      const current = toSettledNumber(sanitize(display, MONEY_MODE), MONEY_MODE);
      if (current !== value) setDisplay(formatMoney(value, maxDecimals));
    }, [value, maxDecimals]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const sanitized = sanitize(e.target.value, MONEY_MODE);

      const parts = sanitized.split(".");
      if (parts.length > 1 && parts[1] && parts[1].length > maxDecimals) return;

      const parsed = parseNumber(sanitized, MONEY_MODE);

      // A string result is a partial entry — show it as typed. Anything else is
      // a real number and gets re-grouped for display. Either way the value
      // passed out is sanitized, never the raw separator-laden input.
      setDisplay(typeof parsed === "number" ? formatMoney(parsed, maxDecimals) : sanitized);
      onChange?.(toEmittedValue(parsed));
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      // Blur always settles on a number: a partial entry left in the field would
      // otherwise escape to the consumer as an unparseable string.
      const final = toSettledNumber(sanitize(e.target.value, MONEY_MODE), MONEY_MODE);

      setDisplay(formatMoney(final, maxDecimals));
      onChange?.(final);

      onBlur?.(e);
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setDisplay(sanitize(e.target.value, MONEY_MODE));
      onFocus?.(e);
    };

    return (
      <Input
        ref={ref}
        label={label}
        error={error}
        hint={hint}
        required={required}
        type="text"
        inputMode="decimal"
        value={display}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        leftAdornment={<span className="text-sm">{currencySymbol}</span>}
        className="text-right"
        {...props}
      />
    );
  }
);

MoneyInput.displayName = "MoneyInput";
