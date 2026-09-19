import { Seo } from "@/components/seo";
import { Hero } from "@/sections/Hero";
import { Services } from "@/sections/Services";
import { Planes } from "@/sections/Planes";
import { Telemetria } from "@/sections/Telemetria";
import { SelectedProjects } from "@/sections/SelectedProjects";
import { Security } from "@/sections/Security";
import { Objeciones } from "@/sections/Objeciones";
import { Cta } from "@/sections/Cta";

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
 *
  * La barra de cifras se quitó: con seis demos y un título, los tres números
 * no sostenían una fila entera de esa altura — el bloque 01 dice lo mismo con
 * más contexto. `Stats` sigue en `src/sections` por si vuelve.
 *
 * Proceso y herramientas siguen fuera, en `src/sections`, por si vuelven.
 */
export function Home() {
  return (
    <>
      <Seo
        title="Santiago Miranda · Desarrollador y Diseñador Web | Dox Designs"
        description="Dox Designs · Santiago Miranda: páginas web a medida para negocios en Cali y toda Colombia, con posicionamiento local, presencia en buscadores con IA y seguridad incluida. Planes mensuales desde COP 350.000."
        path="/"
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
