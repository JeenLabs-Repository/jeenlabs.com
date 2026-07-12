"use client";

import { JEENLABS_BREAKPOINTS } from "@/lib/breakpoints";
import { useEffect, useState } from "react";

/** Cap WebGL DPR for performance on high-density screens. */
export function useCanvasDpr() {
  const [dpr, setDpr] = useState(1);

  useEffect(() => {
    const update = () => {
      const width = window.innerWidth;
      const deviceRatio = window.devicePixelRatio || 1;

      if (width < JEENLABS_BREAKPOINTS.tablet.min) {
        setDpr(1);
      } else if (width < JEENLABS_BREAKPOINTS.desktop.min) {
        setDpr(Math.min(deviceRatio, 1.5));
      } else {
        setDpr(Math.min(deviceRatio, 2));
      }
    };

    update();
    window.addEventListener("resize", update, { passive: true });

    return () => {
      window.removeEventListener("resize", update);
    };
  }, []);

  return dpr;
}
