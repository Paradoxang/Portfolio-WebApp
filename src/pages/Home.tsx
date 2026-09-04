import { Seo } from "@/components/seo";
import { Hero } from "@/sections/Hero";
import { Services } from "@/sections/Services";
import { SelectedProjects } from "@/sections/SelectedProjects";
import { Security } from "@/sections/Security";

/**
 * Portada reducida a lo esencial: qué hago, qué he hecho y cómo lo aseguro.
 * Las secciones de cifras, proceso y herramientas salen de aquí, y el contacto
 * pasa a tener página propia en /contacto. Los componentes siguen en
 * `src/sections` por si vuelven.
 */
export function Home() {
  return (
    <>
      <Seo
        title="Santiago Miranda · Desarrollador y Diseñador Web | Dox Designs"
        description="Portafolio de Santiago Miranda (Dox Designs): desarrollador full-stack y diseñador web en Cali, Colombia. Creo experiencias digitales donde el código y el diseño se encuentran — React, Next.js, .NET, Angular y Electron."
        path="/"
      />
      <Hero />
      <Services />
      <SelectedProjects />
      <Security />
    </>
  );
}
