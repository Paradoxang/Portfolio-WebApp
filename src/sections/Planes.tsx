import { Check, ArrowRight, Rocket } from "lucide-react";
import { Magnetic, Reveal } from "@/lib/anim";
import { SectionHeading } from "@/components/SectionHeading";
import { OrbitRings } from "@/components/Cosmic";
import { trackContact } from "@/lib/analytics";
import { contact, planes } from "@/data/site";

/**
 * "Planes de vuelo" — el bloque que cobra.
 *
 * Es una de las dos secciones nuevas del replanteo, y la que cambia el modelo
 * de negocio: se deja de vender el proyecto y se pasa a vender la cuota. Todo
 * lo que hay aquí se construye con piezas que ya existían —`card`,
 * `card-hover`, `shine-hover`, `SectionHeading`, `OrbitRings`, `Magnetic`—, así
 * que no entra ni un asset nuevo.
 *
 * ── Por qué el precio va a la vista ──
 * Hoy el único camino del sitio es WhatsApp → cotización a medida → regateo.
 * El número en pantalla filtra a quien no puede pagarlo antes de gastar una
 * hora cotizándole, y cambia la conversación de "cuánto me cobras" a "cuál me
 * sirve". Aunque sea un "desde".
 *
 * ── El del medio ──
 * Lleva `destacado` y es el que se quiere vender: borde de nebulosa, fondo
 * `panel-hi` y las órbitas por detrás. Las órbitas van dentro de la tarjeta y
 * no en la sección para que el realce siga a la tarjeta si algún día cambia el
 * orden.
 */
export function Planes({
  kicker = "02 — Planes de vuelo",
  /* En /planes el titular ya lo dice la cabecera de la página; repetirlo aquí
     deja "Elige tu órbita" dos veces en la misma pantalla. */
  titulo = "Elige tu órbita",
}: { kicker?: string; titulo?: string }) {
  return (
    <section id="planes" className="mx-auto max-w-[1200px] scroll-mt-24 px-6 py-20 md:px-8 md:py-28">
      <SectionHeading kicker={kicker} title={titulo}>
        <Reveal delay={0.12}>
          <p className="mt-6 max-w-[58ch] text-[15.5px] leading-[1.7] text-mute">
            Trabajo por cuota mensual, no por proyecto suelto. Estar arriba en
            Google no se consigue una vez y se abandona — se sostiene. La página
            web va incluida en los tres.
          </p>
        </Reveal>
      </SectionHeading>

      <div className="mt-12 grid items-start gap-5 lg:grid-cols-3">
        {planes.map((p, i) => (
          <Reveal key={p.id} delay={0.1 + i * 0.09}>
            <div
              id={p.id}
              className={`card card-hover shine-hover group relative h-full overflow-hidden p-7 md:p-8${
                p.destacado ? " plan--destacado" : ""
              }`}
            >
              {/* Solo en el destacado, y por detrás de todo su contenido. */}
              {p.destacado && (
                <OrbitRings
                  className="pointer-events-none absolute -right-20 -top-24 h-[280px] w-[280px] opacity-30"
                  aria-hidden="true"
                />
              )}

              <div className="relative">
                <div
                  className={`kicker !text-[10px] ${
                    p.destacado ? "!text-cosmo" : ""
                  }`}
                >
                  {p.etiqueta}
                </div>

                <h3 className="display mt-4 text-[clamp(27px,3.4vw,37.5px)] leading-[1]">
                  {p.nombre}
                </h3>

                <p className="mt-3 text-[13.5px] leading-[1.6] text-faint">
                  {p.para}
                </p>

                {/* La moneda va delante y pequeña, y la cifra manda. A cuerpo
                    completo, "COP 1.150.000" no cabe en una columna de tres y
                    partía en dos líneas; separados, el número se lee de un
                    vistazo y la moneda queda donde tiene que estar: dicha, pero
                    sin robar atención.
                    `tabular-nums` para que los tres precios alineen sus dígitos
                    en la comparación, que es lo que hace el bloque. */}
                <div className="mt-6 border-y border-white/10 py-5">
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-mono text-[11px] font-semibold tracking-[0.12em] text-faint">
                      COP
                    </span>
                    <span className="display text-[clamp(27px,3.1vw,37.5px)] leading-none tabular-nums text-ink">
                      {p.precio}
                    </span>
                  </div>
                  <div className="mt-2 font-mono text-[10.5px] tracking-[0.12em] uppercase text-faint">
                    {p.periodo}
                  </div>
                </div>

                <ul className="mt-6 flex list-none flex-col gap-2.5 p-0">
                  {p.incluye.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-[13.5px] leading-[1.55] text-mute"
                    >
                      <Check
                        className={`mt-[3px] h-3.5 w-3.5 shrink-0 ${
                          p.destacado ? "text-cosmo" : "text-neb"
                        }`}
                        strokeWidth={2.4}
                      />
                      {item}
                    </li>
                  ))}
                </ul>

                <a
                  href={contact.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackContact("whatsapp")}
                  className={`mt-8 flex items-center justify-center gap-2 rounded-full px-6 py-3 font-mono text-[11px] font-semibold tracking-[0.14em] uppercase transition-colors ${
                    p.destacado
                      ? "bg-cosmo text-space hover:bg-cosmo/85"
                      : "border border-white/15 text-mute hover:border-neb/50 hover:text-neb"
                  }`}
                >
                  Empezar con {p.nombre}
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* ── Programa fundador ──
          El puente honesto entre "no tengo clientes" y "tengo cifras". Va
          debajo y no encima a propósito: primero se ve el precio normal, para
          que el cupo se lea como una oportunidad y no como que el trabajo vale
          menos.

          ── Por qué está construido así ──
          La primera versión era un rectángulo plano con el texto a la
          izquierda y el botón flotando a la derecha: un aviso de sistema, no un
          panel de esta casa. Los contenedores del sitio comparten tres cosas y
          aquí estaban las tres ausentes — fondo con profundidad (dos capas,
          como `.security__panel`), una placa de icono con borde y fondo del
          acento, y ningún hueco muerto en medio.
          El tercer problema era el peor: el texto moría al 50 % y quedaba media
          barra vacía. Lo que la llena ahora son los tres cupos, dibujados como
          indicador — que es el idioma del sitio, el mismo del punto de
          "disponible para misiones" y de la tira de datos del hero— y además
          dicen literalmente lo que el kicker prometía. */}
      <Reveal delay={0.2}>
        <div className="fundador relative mt-6 overflow-hidden rounded-2xl border border-cosmo/25 p-6 md:p-8">
          <OrbitRings
            className="pointer-events-none absolute -left-24 -bottom-32 h-[300px] w-[300px] opacity-[0.22]"
            aria-hidden="true"
          />

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[10px] border border-cosmo/30 bg-cosmo/10">
              <Rocket className="h-5 w-5 text-cosmo" strokeWidth={1.6} />
            </div>

            <div className="min-w-0 flex-1">
              <div className="kicker !text-cosmo">Programa fundador</div>
              <p className="mt-3 max-w-[58ch] text-[14.5px] leading-[1.7] text-mute">
                Los <strong className="text-ink">tres primeros consultorios</strong>{" "}
                entran a precio reducido a cambio de permiso para publicar sus
                números. Lo digo de frente: todavía no tengo un caso propio que
                enseñarte, y prefiero que lo sepas por mí. Tú ganas el precio;
                yo, el caso.
              </p>
            </div>

            <div className="flex shrink-0 flex-col gap-4 lg:items-end">
              <div className="flex items-center gap-2.5">
                <span className="flex gap-1.5" aria-hidden="true">
                  <span className="fundador__cupo" />
                  <span className="fundador__cupo" />
                  <span className="fundador__cupo" />
                </span>
                <span className="font-mono text-[10px] font-semibold tracking-[0.16em] uppercase text-faint">
                  3 cupos libres
                </span>
              </div>
              <Magnetic>
                <a
                  href={contact.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackContact("whatsapp")}
                  className="flex items-center justify-center gap-2 rounded-full bg-cosmo px-6 py-3 font-mono text-[11px] font-semibold tracking-[0.14em] uppercase text-space transition-colors hover:bg-cosmo/85"
                >
                  Pedir un cupo
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </Magnetic>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
