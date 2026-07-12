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
  /** Approximate section height to reduce layout jump while the chunk loads. */
  skeletonMinHeightClassName?: string;
};

function SectionSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={className}
      aria-hidden
      aria-busy="true"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-5 px-4 py-12 sm:gap-6 sm:px-6 sm:py-16 md:px-8 lg:px-12">
        <div className="h-3 w-24 animate-pulse rounded-full bg-foreground/10" />
        <div className="h-10 w-full max-w-md animate-pulse rounded-lg bg-foreground/10" />
        <div className="h-4 w-full max-w-sm animate-pulse rounded-full bg-foreground/8" />
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="h-28 animate-pulse rounded-2xl bg-foreground/8" />
          <div className="h-28 animate-pulse rounded-2xl bg-foreground/8" />
        </div>
      </div>
    </div>
  );
}

/**
 * Loads a section chunk when it scrolls into view — defers below-fold GSAP / ScrollTrigger work.
 */
export function LazySection({
  id,
  loader,
  skeletonMinHeightClassName = "min-h-[20rem] sm:min-h-[24rem] md:min-h-[28rem]",
}: LazySectionProps) {
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
    <div ref={ref} className={Component ? undefined : skeletonMinHeightClassName}>
      {Component ? <Component /> : <SectionSkeleton className={skeletonMinHeightClassName} />}
    </div>
  );
}
