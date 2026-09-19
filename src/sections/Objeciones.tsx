import { Reveal } from "@/lib/anim";
import { SectionHeading } from "@/components/SectionHeading";
import { objeciones } from "@/data/site";

/**
 * Las cuatro preguntas que frenan una suscripción.
 *
 * No duplica el FAQ de `/servicios`: aquel responde dudas de un proyecto
 * —cuánto cuesta, cuánto tarda, qué incluye— y estas son las de un cobro
 * recurrente, que son otras: permanencia, salida, propiedad y prueba.
 *
 * La cuarta —"¿ya lo has hecho con alguien más?"— es la difícil y va
 * contestada de frente. Es la que va a pensar todo el que llegue, y decirla tú
 * primero convierte la debilidad en el motivo para entrar ahora.
 */
export function Objeciones({ kicker = "06 — Preguntas frecuentes" }: { kicker?: string }) {
  return (
    <section className="mx-auto max-w-[1200px] px-6 pb-20 md:px-8 md:pb-28">
      <SectionHeading kicker={kicker} title="Respondo tus dudas" />

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {objeciones.map((o, i) => (
          <Reveal key={o.q} delay={i * 0.06}>
            <div className="card-flat h-full rounded-2xl p-6">
              <h3 className="text-[15.5px] font-bold leading-snug text-ink">
                {o.q}
              </h3>
              <p className="mt-2.5 text-[13.5px] leading-[1.7] text-mute">
                {o.a}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
