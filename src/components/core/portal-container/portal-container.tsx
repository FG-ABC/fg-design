"use client";
import * as React from "react";

/**
 * Every overlay in this library renders through a Radix Portal, which appends
 * to `document.body` by default. That is correct for stacking, but it moves the
 * content outside whatever element the design tokens are declared on.
 *
 * Tokens declared on `:root` still reach it. Tokens scoped to a class — the
 * pattern in docs/agents/theming.md for running two themes on one page — do
 * not, so overlays lose their background and render transparent.
 *
 * This context lets the consumer name the element portals should mount into.
 * Unset, portals keep mounting on `document.body`, so existing apps are
 * unaffected.
 */
const PortalContainerContext = React.createContext<HTMLElement | null>(null);

export interface PortalContainerProviderProps {
  /**
   * Element to mount overlay content into. `null` keeps the Radix default of
   * `document.body`.
   */
  container: HTMLElement | null;
  children: React.ReactNode;
}

export function PortalContainerProvider({
  container,
  children,
}: PortalContainerProviderProps) {
  return (
    <PortalContainerContext.Provider value={container}>
      {children}
    </PortalContainerContext.Provider>
  );
}

/**
 * The element overlays should portal into, or `null` for `document.body`.
 * Pass straight to a Radix `Portal`'s `container` prop.
 */
export function usePortalContainer(): HTMLElement | null {
  return React.useContext(PortalContainerContext);
}
