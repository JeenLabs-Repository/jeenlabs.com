import type { gsap as GsapType } from "gsap";

type GsapCore = typeof GsapType;

let gsapPromise: Promise<GsapCore> | null = null;
let pluginsPromise: Promise<void> | null = null;

export function getGsap(): Promise<GsapCore> {
  gsapPromise ??= import("gsap").then((mod) => mod.gsap);
  return gsapPromise;
}

export async function registerGsapPlugins(): Promise<void> {
  if (pluginsPromise) return pluginsPromise;

  pluginsPromise = (async () => {
    const gsap = await getGsap();
    const { ScrollTrigger } = await import("gsap/ScrollTrigger");
    gsap.registerPlugin(ScrollTrigger);
  })();

  return pluginsPromise;
}
