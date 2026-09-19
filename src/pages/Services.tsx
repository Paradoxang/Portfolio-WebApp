import {
  ArrowRight,
  Bot,
  CalendarCheck,
  Check,
  LineChart,
  MessageCircle,
  Radar,
  RefreshCw,
  Rocket,
  Search,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Seo } from "@/components/seo";
import { PaginaFx } from "@/components/PaginaFx";
import { OrbitRings } from "@/components/Cosmic";
import { Magnetic, Reveal, RevealLine } from "@/lib/anim";
import { trackContact, trackViewContent } from "@/lib/analytics";
import { contact } from "@/data/site";

/**
 * `/servicios` — qué hago, no cuánto cuesta.
 *
 * La página anterior vendía la oferta vieja: "páginas web, tiendas online y
 * aplicaciones a la medida", cotización a medida y precio por WhatsApp. Con el
 * pivote eso dejó de ser lo que se vende, así que la página entera se rehizo.
 *
 * ── El reparto con /planes ──
 * Las dos páginas se tocan y hay que mantenerlas separadas o se canibalizan:
 *
 *   · `/planes`    → CUÁNTO CUESTA. Los tres planes, la telemetría y las
 *                    cuatro preguntas que frenan una suscripción.
 *   · `/servicios` → QUÉ HAGO. Los cuatro frentes desarrollados, el ciclo de
 *                    trabajo mensual y las dudas operativas.
 *
 * De ahí que aquí no haya ni un precio y allí no haya un listado de tareas: el
 * enlace entre las dos es el que cierra.
 *
 * ── Los cuatro frentes son los mismos que en la portada ──
 * "Que te encuentren", "Que la IA te cite", "Que reserven solos" y "Que estés
 * protegido" son las cuatro tarjetas del bloque 01. Aquí se desarrollan. Si
 * cambian allí, tienen que cambiar aquí: es la misma promesa contada con más
 * detalle, y si dicen cosas distintas se nota.
 */

interface Frente {
  icon: LucideIcon;
  title: string;
  desc: string;
  incluye: string[];
  /** Cómo se comprueba que funcionó. Sin esto, cada punto es una promesa. */
  mide: string;
}

const frentes: Frente[] = [
  {
    icon: Search,
    title: "Que te encuentren",
    desc: "Cuando alguien busca “odontólogo cerca de mí” o “consultorio en Cali”, el objetivo es que aparezcas en ese puñado de resultados que la gente sí mira.",
    incluye: [
      "Ficha de Google creada, verificada y completa",
      "Categorías, horarios, fotos y servicios al día",
      "Páginas propias por cada servicio que ofreces",
      "Trabajo de reseñas: pedirlas, ordenarlas y responderlas",
      "Datos estructurados de negocio local",
    ],
    mide: "Llamadas desde Google, solicitudes de “cómo llegar” y posición en el mapa.",
  },
  {
    icon: Bot,
    title: "Que la IA te cite",
    desc: "Cada vez más pacientes preguntan antes de buscar. Si alguien le pide a ChatGPT una recomendación en tu ciudad, hay un consultorio en esa respuesta.",
    incluye: [
      "Contenido que responde preguntas concretas de pacientes",
      "Estructura legible para los modelos, no solo para Google",
      "Datos estructurados de preguntas frecuentes",
      "Ficha coherente en los directorios que las IA leen",
      "Revisión mensual de en qué respuestas apareces",
    ],
    mide: "Menciones detectadas en respuestas de IA. Te lo digo claro: la atribución todavía es parcial y no vendo esto como un canal medible.",
  },
  {
    icon: CalendarCheck,
    title: "Que reserven solos",
    desc: "Que te encuentren no sirve de nada si al llegar no saben qué hacer. La web tiene que convertir la visita en una cita sin que nadie levante el teléfono.",
    incluye: [
      "Sitio propio, rápido y en tu dominio",
      "Agenda o formulario de cita conectado",
      "WhatsApp a un toque desde cualquier página",
      "Textos pensados para que el paciente decida",
      "Carga rápida también en datos móviles",
    ],
    mide: "Formularios enviados, clics a WhatsApp y citas pedidas desde el sitio.",
  },
  {
    icon: ShieldCheck,
    title: "Que estés protegido",
    desc: "Un consultorio maneja datos sensibles. Esto es lo que casi nadie que hace webs puede acompañarte a resolver, y es donde mi especialización deja de ser un adorno.",
    incluye: [
      "HTTPS, cabeceras estrictas y CSP desde el diseño",
      "Respaldos automáticos y restauración probada",
      "Cifrado, mínimo privilegio y control de accesos",
      "Acompañamiento técnico en la Ley 1581 y el registro ante la SIC",
      "Revisión de seguridad en cada reporte mensual",
    ],
    mide: "Estado del escudo en la telemetría del mes y registro de parches aplicados.",
  },
];

/* El ciclo de trabajo. No es el de un proyecto —descubrir, diseñar, entregar—
   sino el de una cuota: hay un arranque y después un bucle que se repite todos
   los meses. Contarlo como proyecto es lo que hace que el cliente crea que al
   tercer mes ya no hay nada que hacer. */
const ciclo: { num: string; icon: LucideIcon; title: string; desc: string }[] = [
  {
    num: "01",
    icon: Radar,
    title: "Diagnóstico",
    desc: "Gratis y en 48 horas. Miro cómo estás hoy en Google, qué tiene la competencia que tú no, y qué riesgos hay con los datos que manejas. Te lo entrego por escrito, contrates o no.",
  },
  {
    num: "02",
    icon: Rocket,
    title: "Montaje",
    desc: "El primer mes: sitio en tu dominio, ficha de Google verificada, agenda y WhatsApp conectados, y la base de seguridad puesta. Es el mes con más trabajo y el que deja todo funcionando.",
  },
  {
    num: "03",
    icon: RefreshCw,
    title: "Ciclo mensual",
    desc: "Lo que sostiene el resultado: contenido nuevo, reseñas, ajustes de posicionamiento, parches y respaldos. Esto es lo que no se puede hacer una vez y abandonar.",
  },
  {
    num: "04",
    icon: LineChart,
    title: "Telemetría",
    desc: "Cada mes recibes el reporte con llamadas, formularios, cómo llegar, posición y estado de seguridad. Si un número no se mueve, ahí decidimos qué cambiar.",
  },
];

/* Dudas OPERATIVAS. Las comerciales —permanencia, salida, propiedad, prueba—
   viven en /planes y no se repiten aquí: duplicarlas partiría la respuesta en
   dos páginas y ninguna quedaría completa. */
const faqs = [
  {
    q: "¿Y si ya tengo página web?",
    a: "Mejor: nos ahorramos el montaje. Reviso lo que tienes, te digo si conviene conservarla o rehacerla, y arrancamos por la ficha de Google y el posicionamiento, que suele ser lo que de verdad falta.",
  },
  {
    q: "¿Cuánto tengo que trabajar yo en esto?",
    a: "Poco, pero no cero. Necesito una reunión corta al arrancar, acceso a tu ficha de Google y que me cuentes cosas que solo tú sabes: qué te preguntan los pacientes, qué tratamientos quieres llenar. El resto lo llevo yo.",
  },
  {
    q: "¿El dominio y el hosting van aparte?",
    a: "El hosting va incluido en el plan. El dominio se compra a tu nombre y queda tuyo desde el primer día — son unos pocos dólares al año que pagas tú directamente, y prefiero que sea así para que nunca dependa de mí.",
  },
  {
    q: "¿Solo trabajas con consultorios?",
    a: "Es donde me estoy especializando, porque es donde mi formación en ciberseguridad suma de verdad: los datos de salud tienen un régimen más estricto. Pero si tienes otro negocio y encaja con los planes, escríbeme y lo hablamos.",
  },
  {
    q: "¿Trabajas solo en Cali?",
    a: "Estoy en Cali y trabajo con toda Colombia. Todo el proceso se lleva de forma remota sin perder nada, y si tu caso lo necesita, hablo inglés a nivel C1.",
  },
  {
    q: "¿Qué pasa si quiero algo que no está en los planes?",
    a: "Se cotiza aparte y te lo digo antes, no después. Una aplicación interna, una integración con tu software de historias clínicas o una tienda en línea son otro tipo de trabajo y no tiene sentido meterlos en una cuota mensual.",
  },
];

export function Services() {
  // Señal de interés: quien llega aquí está evaluando contratar. Sirve para
  // crear públicos de remarketing en Meta.
  useEffect(() => {
    trackViewContent("Servicios", "crecimiento_digital");
  }, []);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    /* `.pagina` es el contenedor posicionado contra el que mide la capa
       decorativa, y el que recorta lo que sobresale por los lados. */
    <div className="pagina">
      <PaginaFx semilla={0} />

      <Seo
        title="Posicionamiento web y seguridad para consultorios en Cali | Dox Designs"
        description="Qué incluye cada mes: posicionamiento local y ficha de Google, presencia en buscadores con IA, web con agenda y WhatsApp, y seguridad con acompañamiento en la Ley 1581. Para consultorios y clínicas en Cali y toda Colombia."
        path="/servicios"
        jsonLd={jsonLd}
      />

      {/* Header */}
      <section className="glow-hero relative overflow-hidden pt-32 pb-16">
        <div
          aria-hidden="true"
          className="outline-word absolute left-[-2%] top-[6%] z-0 text-[clamp(110px,22vw,290px)] leading-[0.8]"
        >
          SERVICIOS
        </div>
        <div className="relative z-10 mx-auto max-w-[1200px] px-6 md:px-8">
          <Reveal mount>
            <div className="kicker">Servicios — Cali · Colombia</div>
          </Reveal>
          <h1 className="display mt-4 text-[clamp(43.5px,8.4vw,111px)] leading-[0.88]">
            <RevealLine delay={0.08} mount>
              Lo que hago
            </RevealLine>
            <RevealLine delay={0.16} mount>
              <span className="text-shimmer">cada mes</span>
            </RevealLine>
          </h1>
          <Reveal delay={0.24} mount>
            <p className="mt-7 max-w-[62ch] text-[16px] leading-[1.75] text-mute">
              Cuatro frentes que trabajan juntos: que te{" "}
              <strong className="text-ink">encuentren</strong>, que la{" "}
              <strong className="text-ink">IA te cite</strong>, que{" "}
              <strong className="text-ink">reserven solos</strong> y que estés{" "}
              <strong className="text-ink">protegido</strong>. Aquí está el detalle
              de cada uno y cómo se comprueba que funcionó.
            </p>
          </Reveal>
          <Reveal delay={0.34} mount>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Magnetic>
                <a
                  href={contact.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackContact("whatsapp")}
                  className="btn-neb group py-2 pl-7 pr-2 text-[15px]"
                >
                  Diagnóstico gratis
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-space transition-transform group-hover:scale-110">
                    <MessageCircle className="h-4 w-4 text-neb" />
                  </span>
                </a>
              </Magnetic>
              <Link
                to="/planes"
                className="pill px-6 py-3.5 font-mono text-[11px] font-semibold tracking-[0.14em] uppercase text-mute"
              >
                Ver precios
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Los cuatro frentes */}
      <section className="mx-auto max-w-[1200px] px-6 py-12 md:px-8">
        <div className="grid gap-5 lg:grid-cols-2">
          {frentes.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <div className="card card-hover shine-hover group h-full p-7 md:p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-[10px] border border-neb/30 bg-neb/10 transition-all duration-300 group-hover:-rotate-6 group-hover:scale-110 group-hover:border-neb/60 group-hover:shadow-[0_0_24px_rgba(143,162,255,.35)]">
                  <s.icon className="h-5 w-5 text-neb" strokeWidth={1.6} />
                </div>
                <h2 className="display mt-5 text-[clamp(21px,2.4vw,28.5px)] leading-[1.05]">
                  {s.title}
                </h2>
                <p className="mt-3 text-[14.5px] leading-[1.65] text-mute">
                  {s.desc}
                </p>
                <ul className="mt-5 flex list-none flex-col gap-2 p-0">
                  {s.incluye.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-[13.5px] leading-[1.5] text-faint"
                    >
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-neb"
                        strokeWidth={2}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
                {/* Cada frente dice cómo se comprueba. Sin esta línea, los
                    cinco puntos de arriba son cinco promesas. */}
                <div className="mt-6 border-t border-white/10 pt-4">
                  <span className="font-mono text-[9.5px] tracking-[0.16em] uppercase text-faint">
                    Cómo se mide
                  </span>
                  <p className="mt-2 text-[13px] leading-[1.6] text-mute">
                    {s.mide}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* El ciclo de trabajo */}
      <section className="mx-auto max-w-[1200px] px-6 py-12 md:px-8">
        <Reveal>
          <div className="kicker">Cómo se trabaja</div>
        </Reveal>
        <h2 className="display mt-3 text-[clamp(30px,5.2vw,58.5px)] leading-[0.96]">
          <RevealLine delay={0.06}>Un arranque y un bucle</RevealLine>
        </h2>
        <Reveal delay={0.14}>
          <p className="mt-6 max-w-[62ch] text-[15px] leading-[1.75] text-mute">
            No es un proyecto que se entrega y se acaba. Hay un primer mes de
            montaje y después un ciclo que se repite, porque el posicionamiento
            se sostiene o se pierde.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ciclo.map((p, i) => (
            <Reveal key={p.num} delay={0.08 + i * 0.07}>
              <div className="card card-hover group h-full p-6">
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-[9px] border border-neb/30 bg-neb/10 transition-all duration-300 group-hover:scale-110 group-hover:border-neb/60">
                    <p.icon className="h-4 w-4 text-neb" strokeWidth={1.7} />
                  </div>
                  <span className="display text-[27px] leading-none text-white/10">
                    {p.num}
                  </span>
                </div>
                <div className="mt-5 text-[15px] font-bold text-ink">
                  {p.title}
                </div>
                <p className="mt-2 text-[13px] leading-[1.65] text-faint">
                  {p.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Seguridad */}
      <section className="mx-auto max-w-[1200px] px-6 py-12 md:px-8">
        <Reveal>
          <div className="glow-quote relative overflow-hidden rounded-2xl border border-neb/20 bg-space/60 p-8 md:p-10">
            <div className="scan-line-y" />
            <OrbitRings className="absolute -right-24 -top-24 h-[300px] w-[300px] opacity-40" />
            <div className="relative flex flex-col gap-5 md:flex-row md:items-center md:gap-8">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-neb/30 bg-neb/10">
                <ShieldCheck className="h-7 w-7 text-neb" strokeWidth={1.6} />
              </div>
              <div>
                <h2 className="display text-[clamp(22.5px,3vw,33px)] leading-[1.05]">
                  La seguridad no es un extra
                </h2>
                <p className="mt-3 max-w-[70ch] text-[14.5px] leading-[1.7] text-mute">
                  Tengo especialización en Ciberseguridad. Todo sitio sale con
                  HTTPS, cabeceras estrictas y buenas prácticas desde el diseño.
                  Y si manejas datos de pacientes, eso es el punto de partida y
                  no la meta: el plan Blindaje añade auditoría, monitoreo y
                  acompañamiento en la Ley 1581.
                </p>
                <p className="mt-3 max-w-[70ch] text-[13px] leading-[1.65] text-faint">
                  Acompañamiento <strong className="text-mute">técnico</strong>: preparo
                  tu sitio y tus procesos para cumplir, no sustituyo el criterio
                  de un abogado.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Preguntas frecuentes */}
      <section className="mx-auto max-w-[1200px] px-6 py-12 md:px-8">
        <Reveal>
          <div className="kicker">Dudas comunes</div>
        </Reveal>
        <h2 className="display mt-3 text-[clamp(33px,5.6vw,63px)] leading-[0.94]">
          <RevealLine delay={0.06}>Preguntas frecuentes</RevealLine>
        </h2>
        <Reveal delay={0.12}>
          <p className="mt-5 max-w-[60ch] text-[14.5px] leading-[1.7] text-faint">
            Las de permanencia, salida y propiedad del sitio están en{" "}
            <Link to="/planes" className="link-underline text-neb">
              planes y precios
            </Link>
            .
          </p>
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={i * 0.05}>
              <div className="card-flat h-full rounded-2xl p-6">
                <h3 className="text-[15.5px] font-bold leading-snug text-ink">
                  {f.q}
                </h3>
                <p className="mt-2.5 text-[13.5px] leading-[1.7] text-mute">
                  {f.a}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA final */}
      <section className="mx-auto max-w-[1200px] px-6 pb-28 pt-8 md:px-8">
        <Reveal>
          <div className="glow-cta relative overflow-hidden rounded-2xl border border-white/10 bg-space/60 p-8 text-center md:p-14">
            <h2 className="display text-[clamp(30px,4.7vw,52.5px)] leading-[0.98]">
              Empieza por el diagnóstico
            </h2>
            <p className="mx-auto mt-4 max-w-[54ch] text-[15px] leading-[1.7] text-mute">
              En 48 horas te digo por escrito cómo estás hoy en Google, qué tiene
              la competencia que tú no, y qué riesgos hay con los datos que
              manejas. Es gratis y es tuyo, contrates o no.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Magnetic>
                <a
                  href={contact.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackContact("whatsapp")}
                  className="btn-neb px-7 py-3.5 text-sm"
                >
                  Pedir mi diagnóstico
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Magnetic>
              <Link
                to="/planes"
                className="pill px-6 py-3.5 font-mono text-[11px] font-semibold tracking-[0.14em] uppercase text-mute"
              >
                Ver planes y precios
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
