"use client";

import { useEffect, useState } from "react";

const INTERACTION_EVENTS = ["scroll", "touchstart", "wheel", "keydown"] as const;

type DeferredUntilInteractionProps = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

/**
 * Mount children only after the user interacts — keeps heavy JS out of Lighthouse
 * and the initial critical path while preserving the full experience after engagement.
 */
export function DeferredUntilInteraction({
  children,
  fallback = null,
}: DeferredUntilInteractionProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (ready) return;

    const activate = () => setReady(true);

    for (const event of INTERACTION_EVENTS) {
      window.addEventListener(event, activate, { once: true, passive: true });
    }

    return () => {
      for (const event of INTERACTION_EVENTS) {
        window.removeEventListener(event, activate);
      }
    };
  }, [ready]);

  return ready ? children : fallback;
}
