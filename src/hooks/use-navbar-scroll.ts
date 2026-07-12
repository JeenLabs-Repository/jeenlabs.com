"use client";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { useEffect, useRef, useState } from "react";

const TOP_THRESHOLD = 12;
const BG_FADE_DISTANCE = 96;
const HIDE_AFTER_SCROLL = 72;
const SCROLL_DELTA = 6;

type NavbarScrollState = {
  isVisible: boolean;
  backgroundOpacity: number;
  isAtTop: boolean;
};

export function useNavbarScroll(forceVisible = false): NavbarScrollState {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [state, setState] = useState<NavbarScrollState>({
    isVisible: true,
    backgroundOpacity: 0,
    isAtTop: true,
  });
  const lastScrollY = useRef(0);

  useEffect(() => {
    const update = () => {
      const scrollY = window.scrollY;
      const atTop = scrollY <= TOP_THRESHOLD;
      const scrollingDown = scrollY > lastScrollY.current + SCROLL_DELTA;
      const scrollingUp = scrollY < lastScrollY.current - SCROLL_DELTA;

      if (forceVisible) {
        setState({
          isVisible: true,
          backgroundOpacity: atTop ? 0 : 1,
          isAtTop: atTop,
        });
        lastScrollY.current = scrollY;
        return;
      }

      if (prefersReducedMotion) {
        const backgroundOpacity = atTop
          ? 0
          : Math.min(1, scrollY / BG_FADE_DISTANCE);
        setState({
          isVisible: true,
          backgroundOpacity,
          isAtTop: atTop,
        });
        lastScrollY.current = scrollY;
        return;
      }

      setState((prev) => {
        let isVisible = prev.isVisible;
        let backgroundOpacity = atTop
          ? 0
          : Math.min(1, scrollY / BG_FADE_DISTANCE);

        if (atTop) {
          isVisible = true;
          backgroundOpacity = 0;
        } else if (scrollingUp) {
          isVisible = true;
          backgroundOpacity = 1;
        } else if (scrollingDown && scrollY > HIDE_AFTER_SCROLL) {
          isVisible = false;
        }

        return {
          isVisible,
          backgroundOpacity,
          isAtTop: atTop,
        };
      });

      lastScrollY.current = scrollY;
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [forceVisible, prefersReducedMotion]);

  return state;
}
