"use client";

import {
  type ComponentType,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

type LazySectionProps = {
  id: string;
  loader: () => Promise<{ default: ComponentType }>;
};

/**
 * Loads a section chunk when it scrolls into view — defers below-fold GSAP / ScrollTrigger work.
 */
export function LazySection({ id, loader }: LazySectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [Component, setComponent] = useState<ComponentType | null>(null);
  const loadingRef = useRef(false);

  const load = useCallback(() => {
    if (loadingRef.current || Component) return;
    loadingRef.current = true;
    void loader().then((mod) => {
      setComponent(() => mod.default);
    });
  }, [Component, loader]);

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash === id) load();
  }, [id, load]);

  useEffect(() => {
    if (Component) return;

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          load();
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px 120px 0px", threshold: 0 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [Component, load]);

  return (
    <div ref={ref} className="min-h-px">
      {Component ? <Component /> : null}
    </div>
  );
}
