import { Seo } from "@/components/seo";
import { Hero } from "@/sections/Hero";
import { Services } from "@/sections/Services";
import { Planes } from "@/sections/Planes";
import { Telemetria } from "@/sections/Telemetria";
import { SelectedProjects } from "@/sections/SelectedProjects";
import { Security } from "@/sections/Security";
import { Objeciones } from "@/sections/Objeciones";
import { Cta } from "@/sections/Cta";
import { useLocale } from "@/i18n/LocaleContext";
import { faqPage, plansSchema } from "@/lib/schema";

/**
 * La portada, en el orden de una decisión de compra y no en el de un
 * portafolio.
 *
 *   Hero — la promesa            · qué consigues
 *   01 Especialidades            · qué resuelvo
 *   02 Planes de vuelo           · cuánto cuesta        ← el bloque que cobra
 *   03 Telemetría                · qué recibes cada mes ← lo que lo sostiene
 *   04 Muestrario                · cómo queda
 *   05 Escudo                    · qué te protege
 *   06 Objeciones                · qué te frena
 *   07 Contacto                  · el cierre
 *
 * El orden importa tanto como los bloques: el precio va ANTES del muestrario
 * porque quien llega quiere saber si le alcanza antes de mirar trabajos, y la
 * telemetría va pegada al precio porque es lo que lo justifica.
 */
export function Home() {
  const { t, locale } = useLocale();
  return (
    <>
      <Seo
        route="home"
        title={t.pages.home.seo.title}
        description={t.pages.home.seo.description}
        jsonLd={[plansSchema(t, locale), faqPage(t.faq.items)]}
      />
      <Hero />
      <Services />
      <Planes />
      <Telemetria />
      <SelectedProjects />
      <Security />
      <Objeciones />
      <Cta />
    </>
  );
}
