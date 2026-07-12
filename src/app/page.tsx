import { HashScrollHandler } from "@/components/hash-scroll-handler";
import { HeroSection } from "@/components/hero/hero-section";
import { HomeSections } from "@/components/home-sections";
import { createPageMetadata } from "@/lib/seo/metadata";
import { SITE_NAME } from "@/lib/site-seo";

export const metadata = createPageMetadata({
  title: SITE_NAME,
  path: "/",
});

export default function Home() {
  return (
    <>
      <HashScrollHandler />
      <HeroSection />
      <HomeSections />
    </>
  );
}
