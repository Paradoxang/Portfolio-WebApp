import { Seo } from "@/components/seo";
import { Hero } from "@/sections/Hero";
import { Stats } from "@/sections/Stats";
import { Services } from "@/sections/Services";
import { SelectedProjects } from "@/sections/SelectedProjects";
import { Process } from "@/sections/Process";
import { QuoteTools } from "@/sections/QuoteTools";
import { Cta } from "@/sections/Cta";

export function Home() {
  return (
    <>
      <Seo
        title="Santiago Miranda · Desarrollador y Diseñador Web | Dox Designs"
        description="Portafolio de Santiago Miranda (Dox Designs): desarrollador full-stack y diseñador web en Cali, Colombia. Creo experiencias digitales donde el código y el diseño se encuentran — React, Next.js, .NET, Angular y Electron."
        path="/"
      />
      <Hero />
      <Stats />
      <Services />
      <SelectedProjects />
      <Process />
      <QuoteTools />
      <Cta />
    </>
  );
}
