import { ArrowRight, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { Reveal } from "@/lib/anim";
import { OrbitRings } from "@/components/Cosmic";
import { SectionHeading } from "@/components/SectionHeading";
import { SecurityFondo, SecurityDelante } from "@/components/SecurityFx";
import { securityIcons } from "@/data/site";
import { Rich, useLocale } from "@/i18n/LocaleContext";

/**
 * "Security First".
 *
 * ── La sección va a sangre ──
 * La estela cruza de lado a lado y la nave sale por la derecha; con un
 * contenedor centrado y con tope de ancho las dos se cortan en seco. Las
 * secciones cuelgan del `<main>`, que no tiene `max-width`, así que basta con
 * no ponérselo. La tarjeta sí se queda en la rejilla, con el mismo tope y el
 * mismo sangrado que el resto del sitio. Solo el lienzo gráfico va a pantalla
 * completa.
 */
export function Security() {
  const { t, href } = useLocale();
  const s = t.security;
  return (
    <section id={t.anchors.shield} aria-labelledby="escudo-titulo" className="security scroll-mt-24">
      {/* z0–z3 · nebulosa, partículas, eco, estela y nave. Todo por DEBAJO de
          la tarjeta: la sección es la más oscura del sitio y la estela el
          objeto más brillante de la página; por encima, el titular no se lee. */}
      <SecurityFondo />

      {/* La entrada envuelve la tarjeta y NO al lienzo: `Reveal` anima opacidad
          y un elemento con opacidad distinta de 1 crea un contexto de apilado
          que se llevaría por delante el orden z de las piezas. */}
      <Reveal className="security__card">
        <div className="security__panel relative overflow-hidden rounded-2xl border border-neb/20">
          <div className="scan-line-y" aria-hidden="true" />
          <OrbitRings className="absolute -left-24 -top-24 h-[340px] w-[340px] opacity-40" aria-hidden="true" />

          <div className="relative grid items-center gap-10 p-8 md:p-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <SectionHeading
                id="escudo-titulo"
                kicker={s.kicker}
                title={s.title}
                lines
                titleClass="text-[clamp(37.5px,6vw,67.5px)] leading-[0.92]"
              />
              <p className="mt-6 max-w-[46ch] text-[15px] leading-[1.7] text-mute">
                <Rich text={s.text} />
              </p>
              <div className="tag tag--neb mt-6">
                <ShieldCheck className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
                {s.badge}
              </div>
              <div className="mt-7">
                <Link to={href("security")} className="link-flecha group">
                  {s.more}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <ul className="m-0 grid list-none gap-3 p-0 sm:grid-cols-2" role="list">
              {s.practices.map((p, i) => {
                const Icono = securityIcons[i];
                return (
                  <li key={p.title} className="h-full">
                    <Reveal delay={0.1 + i * 0.08} className="h-full">
                      <div className="card card-hover group h-full p-5">
                        <div className="icon-plate">
                          <Icono className="h-4.5 w-4.5" strokeWidth={1.6} aria-hidden="true" />
                        </div>
                        <h3 className="mt-4 text-[14px] font-bold text-ink">{p.title}</h3>
                        <p className="mt-1 text-[12.5px] leading-[1.55] text-faint">{p.desc}</p>
                      </div>
                    </Reveal>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Reveal>

      {/* z5 · llave, bóveda y escudo. Lo único que va por delante de la
          tarjeta, y por eso lo único que tiene prohibido entrar en ella. */}
      <SecurityDelante />
    </section>
  );
}
