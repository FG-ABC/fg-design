import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Scoped accent themes for the template pages. Each is a plain style object of
 * token overrides — the same trick documented in docs/agents/theming.md, applied
 * to a wrapper element instead of :root so four brands can coexist in one Storybook.
 */
export const THEMES = {
  /** Car rental — signal orange. Light enough that on-accent must be dark ink. */
  drift: {
    "--color-accent-50": "#fff7ed",
    "--color-accent-100": "#ffedd5",
    "--color-accent-200": "#fed7aa",
    "--color-accent-300": "#fdba74",
    "--color-accent-500": "#f97316",
    "--color-accent-600": "#ea580c",
    "--color-accent-700": "#c2410c",
    "--color-accent-900": "#7c2d12",
    "--color-on-accent": "#ffffff",
    "--radius-md": "12px",
    "--radius-lg": "18px",
  },
  /** SaaS — indigo/violet, tight radii for a technical feel. */
  cadence: {
    "--color-accent-50": "#eef2ff",
    "--color-accent-100": "#e0e7ff",
    "--color-accent-200": "#c7d2fe",
    "--color-accent-300": "#a5b4fc",
    "--color-accent-500": "#6366f1",
    "--color-accent-600": "#4f46e5",
    "--color-accent-700": "#4338ca",
    "--color-accent-900": "#312e81",
    "--color-on-accent": "#ffffff",
    "--radius-md": "8px",
    "--radius-lg": "12px",
  },
  /** Property rental — deep teal, generous radii for a soft hospitality look. */
  haven: {
    "--color-accent-50": "#f0fdfa",
    "--color-accent-100": "#ccfbf1",
    "--color-accent-200": "#99f6e4",
    "--color-accent-300": "#5eead4",
    "--color-accent-500": "#0d9488",
    "--color-accent-600": "#0f766e",
    "--color-accent-700": "#115e59",
    "--color-accent-900": "#134e4a",
    "--color-on-accent": "#ffffff",
    "--radius-md": "14px",
    "--radius-lg": "22px",
  },
  /** Dashboard — cool slate blue, compact radii for dense data. */
  ledger: {
    "--color-accent-50": "#eff6ff",
    "--color-accent-100": "#dbeafe",
    "--color-accent-200": "#bfdbfe",
    "--color-accent-300": "#93c5fd",
    "--color-accent-500": "#2563eb",
    "--color-accent-600": "#1d4ed8",
    "--color-accent-700": "#1e40af",
    "--color-accent-900": "#1e3a8a",
    "--color-on-accent": "#ffffff",
    "--radius-md": "8px",
    "--radius-lg": "12px",
  },
} satisfies Record<string, Record<string, string>>;

export type ThemeName = keyof typeof THEMES;

/**
 * Wraps a template page in its scoped theme and paints the page canvas.
 *
 * Storybook pads the story container. `-m-4` alone would bleed the background
 * to the edges but also add 32px of width, overflowing narrow viewports — so
 * the width is pinned back to the viewport and overflow-x is clipped.
 */
export function TemplateFrame({
  theme,
  className,
  children,
}: {
  theme: ThemeName;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={THEMES[theme] as React.CSSProperties}
      className={cn(
        "-m-4 w-[100vw] max-w-[100vw] overflow-x-hidden",
        "min-h-screen bg-[var(--color-canvas)] font-[var(--font-sans)] antialiased",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Horizontal rhythm shared by every marketing section. */
export function Section({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <section
      className={cn("mx-auto w-full max-w-6xl px-6 md:px-10", className)}
      {...props}
    >
      {children}
    </section>
  );
}

/**
 * Deterministic gradient stand-in for photography. Real projects drop an <img>
 * here — this keeps the templates dependency-free and offline-safe.
 */
export function ImagePlaceholder({
  label,
  className,
  tint = "accent",
}: {
  label?: string;
  className?: string;
  tint?: "accent" | "neutral";
}) {
  const tints =
    tint === "accent"
      ? "from-[var(--color-accent-200)] via-[var(--color-accent-100)] to-[var(--color-surface)]"
      : "from-[var(--color-overlay)] via-[var(--color-surface)] to-[var(--color-canvas)]";

  return (
    <div
      role="img"
      aria-label={label ?? "Placeholder image"}
      className={cn(
        "relative overflow-hidden rounded-[var(--radius-lg)] bg-gradient-to-br",
        "border border-[var(--color-border)]",
        tints,
        className,
      )}
    >
      {label && (
        <span className="absolute bottom-3 left-3 rounded-[var(--radius-sm)] bg-[var(--color-elevated)]/80 px-2 py-1 text-xs font-medium text-[var(--color-base)] backdrop-blur">
          {label}
        </span>
      )}
    </div>
  );
}

/**
 * DatePicker emits `null` when the field is cleared. Templates keep dates as
 * plain strings, so collapse the clear to an empty string at the boundary.
 */
export function dateSetter(set: (value: string) => void) {
  return (value: string | null) => set(value ?? "");
}
