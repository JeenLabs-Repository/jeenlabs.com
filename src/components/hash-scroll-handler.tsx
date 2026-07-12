"use client";

import { useEffect } from "react";

import { scrollToSection } from "@/lib/scroll";

/** Scrolls to the URL hash after the home page mounts (e.g. /#contact from a service page). */
export function HashScrollHandler() {
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;

    let observer: MutationObserver | undefined;
    let timeoutId: number | undefined;

    const scrollWhenReady = () => {
      const target = document.getElementById(hash);
      if (!target) return false;
      scrollToSection(hash);
      return true;
    };

    const frame = requestAnimationFrame(() => {
      if (scrollWhenReady()) return;

      observer = new MutationObserver(() => {
        if (scrollWhenReady()) observer?.disconnect();
      });
      observer.observe(document.body, { childList: true, subtree: true });

      timeoutId = window.setTimeout(() => observer?.disconnect(), 5_000);
    });

    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
  }, []);

  return null;
}

