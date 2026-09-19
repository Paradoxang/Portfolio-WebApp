import { Seo } from "@/components/seo";
import { PaginaFx } from "@/components/PaginaFx";
import { Reveal, RevealLine } from "@/lib/anim";
import { Planes } from "@/sections/Planes";
import { Telemetria } from "@/sections/Telemetria";
import { Objeciones } from "@/sections/Objeciones";
import { Cta } from "@/sections/Cta";

/**
 * `/planes` — la oferta con su propia página.
 *
 * Los tres bloques comerciales son los mismos componentes que monta la
 * portada, no una copia: si mañana cambia un precio o una respuesta, cambia en
 * los dos sitios a la vez. Lo único que se les pasa distinto es el kicker — la
 * numeración 02/03/06 pertenece a la secuencia de la portada y aquí no
 * significa nada.
 *
 * ── Lo que hay que vigilar ──
 * Portada y página dicen ahora lo mismo con distinta cabecera. Es el patrón
 * normal de "sección que resume / página que desarrolla", pero si esto crece
 * conviene decidir cuál manda: lo natural sería que la portada se quede con los
 * planes y mande aquí para la letra pequeña.
 */
export function Plans() {
  return (
    <div className="pagina">
      <PaginaFx semilla={12} />

      <Seo
        title="Planes y precios · Webs con posicionamiento y seguridad | Dox Designs"
        description="Planes mensuales para negocios en Cali y toda Colombia: posicionamiento local, presencia en buscadores con IA, seguridad y cumplimiento de la Ley 1581. Desde COP 350.000 al mes, con la página web a medida incluida."
        path="/planes"
      />

      {/* Misma cabecera que /servicios y /proyectos: palabra gigante de fondo,
          kicker y titular a dos líneas. Es lo que hace que las páginas se lean
          como del mismo sitio. */}
      <section className="glow-hero relative overflow-hidden pt-32 pb-14">
        <div
          aria-hidden="true"
          className="outline-word absolute left-[-2%] top-[6%] z-0 text-[clamp(110px,22vw,290px)] leading-[0.8]"
        >
          PLANES
        </div>
        <div className="relative z-10 mx-auto max-w-[1200px] px-6 md:px-8">
          <Reveal mount>
            <div className="kicker">Planes de vuelo — Cali · Colombia</div>
          </Reveal>
          <h1 className="display mt-4 text-[clamp(43.5px,8.4vw,111px)] leading-[0.88]">
            <RevealLine delay={0.08} mount>
              Elige tu
            </RevealLine>
            <RevealLine delay={0.16} mount>
              <span className="text-shimmer">órbita</span>
            </RevealLine>
          </h1>
          <Reveal delay={0.24} mount>
            <p className="mt-7 max-w-[62ch] text-[16px] leading-[1.75] text-mute">
              Todo lo que incluye cada plan, el reporte que llega cada mes y las
              cuatro preguntas que suelen frenar la decisión. Sin letra pequeña:
              lo que ves aquí es lo que se cobra.
            </p>
          </Reveal>
        </div>
      </section>

      <Planes kicker="Planes y precios" titulo="Los tres planes" />
      <Telemetria kicker="Tu reporte mensual" />
      <Objeciones kicker="Antes de decidir" />
      <Cta />
    </div>
  );
}
