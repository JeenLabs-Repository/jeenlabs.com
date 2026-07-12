"use client";

import type { JeenlabsBreakpoint } from "@/lib/breakpoints";
import { JEENLABS_BREAKPOINTS } from "@/lib/breakpoints";
import { useEffect, useState } from "react";

function getBreakpoint(width: number): JeenlabsBreakpoint {
  if (width >= JEENLABS_BREAKPOINTS.desktop.min) {
    return "desktop";
  }

  if (width >= JEENLABS_BREAKPOINTS.tablet.min) {
    return "tablet";
  }

  return "mobile";
}

export function useJeenlabsBreakpoint(): JeenlabsBreakpoint {
  const [breakpoint, setBreakpoint] = useState<JeenlabsBreakpoint>("mobile");

  useEffect(() => {
    const update = () => {
      setBreakpoint(getBreakpoint(window.innerWidth));
    };

    update();
    window.addEventListener("resize", update, { passive: true });

    return () => {
      window.removeEventListener("resize", update);
    };
  }, []);

  return breakpoint;
}
