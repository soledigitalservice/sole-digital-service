import { LanguageProvider } from "@/components/i18n/LanguageProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { Clients } from "@/components/sections/Clients";
import { Services } from "@/components/sections/Services";
import { Portfolio } from "@/components/sections/Portfolio";
import { About } from "@/components/sections/About";
import { Testimonials } from "@/components/sections/Testimonials";
import { CtaBand } from "@/components/sections/CtaBand";
import { Contact } from "@/components/sections/Contact";
import { ScrollProgress, BackToTop } from "@/components/ui/ScrollUtils";

export default function HomePage() {
  return (
    <LanguageProvider>
      <ScrollProgress />
      <Navbar />
      <main id="contenido">
        <Hero />
        <Clients />
        <Services />
        <Portfolio />
        <About />
        <Testimonials />
        <CtaBand />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </LanguageProvider>
  );
}
