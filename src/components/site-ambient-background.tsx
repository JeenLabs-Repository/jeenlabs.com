"use client";

import { cn } from "@/lib/utils";

import { useSmoothMousePosition } from "@/hooks/use-smooth-mouse-position";
import { siteGridClass } from "@/lib/site-layout";

/** One shared grid + mouse-follow glow for the whole page (replaces per-section aurora). */
export function SiteAmbientBackground() {
  const { x, y } = useSmoothMousePosition();

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <div className={cn("absolute inset-0", siteGridClass)} />
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(
            clamp(280px, 42vmax, 720px) circle at ${x}% ${y}%,
            color-mix(in oklch, var(--foreground) 9%, transparent) 0%,
            color-mix(in oklch, var(--brand) 4%, transparent) 32%,
            transparent 72%
          )`,
        }}
      />
    </div>
  );
}
