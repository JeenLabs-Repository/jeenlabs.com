"use client";

import { useEffect, useState } from "react";

type DeferredAfterPaintProps = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

/** Mount children on the frame after first paint — defers heavy JS without waiting for user input. */
export function DeferredAfterPaint({
  children,
  fallback = null,
}: DeferredAfterPaintProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(() => setReady(true));
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  return ready ? children : fallback;
}
