"use client";
import * as React from "react";
import { Input } from "@/components/core/input";
import {
  parseNumber,
  sanitize,
  toEmittedValue,
  toSettledNumber,
  type NumberInputMode,
} from "./numeric-entry";

export type { NumberInputMode };

export interface NumberInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value" | "type"> {
  label?: string;
  error?: string;
  hint?: string;
  value?: number | string;
  onChange?: (value: number | string) => void;
  mode?: NumberInputMode;
  maxDecimals?: number;
  required?: boolean;
}

function formatNumber(value: number | string | undefined, mode: NumberInputMode, maxDecimals: number): string {
  if (value === undefined || value === null || value === "") return "";

  if (typeof value === "string") return value;

  if (mode === "FLOATS") {
    return value.toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: maxDecimals,
    });
  }

  return value.toLocaleString("en-US", { maximumFractionDigits: 0 });
}

export const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      label,
      error,
      hint,
      value,
      onChange,
      mode = "INTEGERS",
      maxDecimals = 2,
      onBlur,
      onFocus,
      required,
      ...props
    },
    ref
  ) => {
    const [display, setDisplay] = React.useState(() => formatNumber(value, mode, maxDecimals));

    React.useEffect(() => {
      if (typeof value !== "number") return;
      // Only overwrite display when the numeric value differs from what's shown,
      // so an externally-driven change (e.g. reset to 0) takes effect without
      // stomping an in-progress decimal like "1000.".
      const current = toSettledNumber(sanitize(display, mode), mode);
      if (current !== value) setDisplay(formatNumber(value, mode, maxDecimals));
    }, [value, mode, maxDecimals]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const sanitized = sanitize(e.target.value, mode);

      if (mode === "FLOATS") {
        const parts = sanitized.split(".");
        if (parts.length > 1 && parts[1] && parts[1].length > maxDecimals) return;
      }

      const parsed = parseNumber(sanitized, mode);

      // A string result is a partial entry — show it as typed. Anything else is
      // a real number and gets re-grouped for display. Either way the value
      // passed out is sanitized, never the raw separator-laden input.
      setDisplay(typeof parsed === "number" ? formatNumber(parsed, mode, maxDecimals) : sanitized);
      onChange?.(toEmittedValue(parsed));
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      // Blur always settles on a number: a partial entry left in the field would
      // otherwise escape to the consumer as an unparseable string.
      const final = toSettledNumber(sanitize(e.target.value, mode), mode);

      setDisplay(formatNumber(final, mode, maxDecimals));
      onChange?.(final);

      onBlur?.(e);
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setDisplay(sanitize(e.target.value, mode));
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
        inputMode={mode === "FLOATS" ? "decimal" : "numeric"}
        value={display}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        className="text-right"
        {...props}
      />
    );
  }
);

NumberInput.displayName = "NumberInput";
