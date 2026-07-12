"use client";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";
import { type ComponentProps, useEffect, useRef } from "react";

import { getGsap } from "@/lib/gsap-lazy";
import { siteFocusRingClass } from "@/lib/site-layout";

const ringClass = cn(
  "flex size-12 items-center justify-center overflow-hidden rounded-full border p-1 transition-[border-color,transform] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] md:size-14",
  "border-[color-mix(in_oklab,var(--brand)_40%,var(--foreground)_12%)]",
  "group-hover:border-brand",
);

const fillClass = cn(
  "flex size-full items-center justify-center rounded-full bg-transparent shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] transition-[background-color,transform] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
  "group-hover:bg-brand group-hover:scale-105 group-active:scale-95",
);

const labelClass = cn(
  "font-mono text-[10px] font-bold tracking-[0.2em] text-foreground uppercase transition-colors duration-300 sm:text-[11px] sm:tracking-[0.22em]",
  "group-hover:text-brand dark:group-hover:text-[color-mix(in_oklab,var(--brand)_90%,white)]",
);

type RingCtaButtonProps = Omit<ComponentProps<"button">, "children"> & {
  label?: string;
};

export function RingCtaButton({
  label = "Get Started",
  className,
  type = "button",
  ...props
}: RingCtaButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const mq = window.matchMedia("(pointer: fine) and (min-width: 64rem)");
    if (!mq.matches) return;

    let cancelled = false;
    let removeListener: (() => void) | undefined;

    void getGsap().then((gsap) => {
      if (cancelled) return;

      const handleMouseMove = (e: MouseEvent) => {
        const button = buttonRef.current;
        if (!button) return;

        const rect = button.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY);

        if (dist < 150) {
          gsap.to(button, {
            x: (e.clientX - centerX) * 0.35,
            y: (e.clientY - centerY) * 0.35,
            duration: 0.55,
            ease: "power3.out",
          });
        } else {
          gsap.to(button, {
            x: 0,
            y: 0,
            duration: 0.75,
            ease: "power3.out",
          });
        }
      };

      window.addEventListener("mousemove", handleMouseMove);
      removeListener = () =>
        window.removeEventListener("mousemove", handleMouseMove);
    });

    return () => {
      cancelled = true;
      removeListener?.();
    };
  }, [prefersReducedMotion]);

  return (
    <button
      ref={buttonRef}
      type={type}
      className={cn(
        "group relative z-10 flex w-fit min-h-11 shrink-0 cursor-pointer touch-manipulation items-center gap-4 self-start rounded-full border-0 bg-transparent p-0 active:scale-[0.98] sm:gap-5",
        siteFocusRingClass,
        className,
      )}
      {...props}
    >
      <div className={ringClass}>
        <div className={fillClass}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-foreground transition-[stroke,transform] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:stroke-white"
            aria-hidden
          >
            <path
              d="M7 17L17 7M17 7H8M17 7V16"
              strokeWidth="2.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      <span className={labelClass}>{label}</span>
    </button>
  );
}
