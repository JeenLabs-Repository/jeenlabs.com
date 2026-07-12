"use client";

import { cn } from "@/lib/utils";

import { useSmoothMousePosition } from "@/hooks/use-smooth-mouse-position";
import { siteGridClass } from "@/lib/site-layout";

/** One shared grid + mouse-follow glow + grain for the whole page. */
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
            color-mix(in oklch, var(--brand) 5%, transparent) 34%,
            transparent 72%
          )`,
        }}
      />
      <div
        className="absolute -top-32 left-1/2 size-[min(70vw,42rem)] -translate-x-1/2 rounded-full bg-brand/[0.07] blur-[120px]"
      />
      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "180px 180px",
        }}
      />
    </div>
  );
}
