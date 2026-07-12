import { getGsap, registerGsapPlugins } from "./gsap-lazy";

type GsapCore = Awaited<ReturnType<typeof getGsap>>;

export async function runGsap(
  setup: (gsap: GsapCore) => (() => void) | void,
): Promise<() => void> {
  await registerGsapPlugins();
  const gsap = await getGsap();
  return setup(gsap) ?? (() => {});
}
