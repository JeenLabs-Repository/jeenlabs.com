import { HashScrollHandler } from "@/components/hash-scroll-handler";
import { HeroSection } from "@/components/hero/hero-section";
import { HomeSections } from "@/components/home-sections";

export const metadata = {
  title: "JeenLabs",
  description:
    "We partner with teams to design and ship thoughtful digital experiences — from idea to production.",
};

export default function Home() {
  return (
    <>
      <HashScrollHandler />
      <HeroSection />
      <HomeSections />
    </>
  );
}
