import { SectionHeading } from "@/components/SectionHeading";
import { Acordeon } from "@/components/Acordeon";
import { useT } from "@/i18n/LocaleContext";

/**
 * Las cuatro preguntas que frenan una suscripción.
 *
 * No duplica el FAQ de la página de servicios: aquel responde dudas de un
 * proyecto —cuánto cuesta, cuánto tarda, qué incluye— y estas son las de un
 * cobro recurrente, que son otras: permanencia, salida, propiedad y prueba.
 *
 * La cuarta —"¿ya lo has hecho con alguien más?"— es la difícil y va
 * contestada de frente.
 *
 * Es un acordeón y no una rejilla de tarjetas: las respuestas son largas y
 * cuatro bloques de texto seguidos se saltaban; con las preguntas a la vista
 * y las respuestas plegadas se lee la que importa. Las respuestas siguen en
 * el HTML —plegadas, no ausentes— para Google y para las IA.
 */
export function Objeciones({ kicker }: { kicker?: string }) {
  const t = useT();
  return (
    <section
      id={t.anchors.faq}
      aria-labelledby="faq-titulo"
      className="mx-auto max-w-[1200px] scroll-mt-24 px-6 pb-20 md:px-8 md:pb-28"
    >
      <SectionHeading id="faq-titulo" kicker={kicker ?? t.faq.kicker} title={t.faq.title} />
      <Acordeon items={t.faq.items} idBase="faq" className="mt-10 max-w-[820px]" />
    </section>
  );
}
