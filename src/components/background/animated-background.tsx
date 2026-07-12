"use client";

import { useTheme } from "next-themes";

import { CanvasRevealEffect } from "@/components/background/canvas-reveal-effect";
import { useJeenlabsBreakpoint } from "@/hooks/use-jeenlabs-breakpoint";
import { useMounted } from "@/hooks/use-mounted";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";
import { CANVAS_BACKGROUND_COLORS } from "./constants";

export function AnimatedBackground({ className }: { className?: string }) {
  const { resolvedTheme } = useTheme();
  const mounted = useMounted();
  const breakpoint = useJeenlabsBreakpoint();
  const prefersReducedMotion = usePrefersReducedMotion();

  const theme = mounted && resolvedTheme === "light" ? "light" : "dark";
  const dotSize = breakpoint === "mobile" ? 3 : breakpoint === "tablet" ? 4 : 5;
  // Aceternity speed range is ~0.1–1.0 (monorepo GLSL effectively used 0.5)
  const animationSpeed = prefersReducedMotion
    ? 0
    : breakpoint === "mobile"
      ? 0.45
      : 0.55;

  const colors = CANVAS_BACKGROUND_COLORS[theme].map((rgb) => [
    rgb[0]!,
    rgb[1]!,
    rgb[2]!,
  ]);

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden bg-background",
        className,
      )}
      aria-hidden
    >
      {prefersReducedMotion ? (
        <div className="size-full bg-background" />
      ) : (
        <CanvasRevealEffect
          key={theme}
          animationSpeed={animationSpeed}
          containerClassName="bg-background"
          colors={colors}
          dotSize={dotSize}
          showGradient
        />
      )}
      <div
        className={cn(
          "absolute top-0 right-0 left-0 h-1/4 bg-gradient-to-b from-background to-transparent sm:h-1/3",
        )}
      />
    </div>
  );
}
