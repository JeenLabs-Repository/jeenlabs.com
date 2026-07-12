"use client";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { useEffect, useRef, useState } from "react";

const LERP = 0.07;
const DEFAULT = { x: 50, y: 38 };

export function useSmoothMousePosition() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [position, setPosition] = useState(DEFAULT);
  const targetRef = useRef(DEFAULT);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const canTrackPointer = window.matchMedia(
      "(pointer: fine) and (min-width: 48rem)",
    ).matches;
    if (!canTrackPointer) return;

    const updateTarget = (clientX: number, clientY: number) => {
      targetRef.current = {
        x: (clientX / window.innerWidth) * 100,
        y: (clientY / window.innerHeight) * 100,
      };
    };

    const onMouseMove = (event: MouseEvent) => {
      updateTarget(event.clientX, event.clientY);
    };

    const animate = () => {
      setPosition((current) => {
        const target = targetRef.current;
        return {
          x: current.x + (target.x - current.x) * LERP,
          y: current.y + (target.y - current.y) * LERP,
        };
      });
      frameRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    frameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [prefersReducedMotion]);

  return prefersReducedMotion ? DEFAULT : position;
}
