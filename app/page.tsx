import { Hero } from "@/components/sections/Hero";
import { Clients } from "@/components/sections/Clients";
import { Services } from "@/components/sections/Services";
import { Portfolio } from "@/components/sections/Portfolio";
import { TeamPreview } from "@/components/sections/TeamPreview";
import { CtaBand } from "@/components/sections/CtaBand";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Clients />
      <Services preview />
      <Portfolio noFilters />
      <TeamPreview />
      <CtaBand />
    </>
  );
}
