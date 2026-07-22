import {
  ArrowRight,
  Bot,
  Check,
  Globe,
  MessageCircle,
  Server,
  ShieldCheck,
  ShoppingCart,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Seo } from "@/components/seo";
import { OrbitRings } from "@/components/Cosmic";
import { Magnetic, Reveal, RevealLine } from "@/lib/anim";
import { trackContact } from "@/lib/analytics";
import { contact } from "@/data/site";

/* Servicios en lenguaje de cliente (no de programador): así es como los
   buscan en Google — "página web para mi negocio", "tienda online", etc. */
const servicios = [
  {
    icon: Globe,
    title: "Páginas web para negocios",
    desc: "Tu negocio en internet con una web moderna que carga rápido, se ve bien en el celular y transmite confianza.",
    incluye: [
      "Diseño a la medida de tu marca",
      "Adaptada a celular, tablet y computador",
      "Optimizada para aparecer en Google",
      "Botón de WhatsApp para que te escriban",
    ],
    ejemplo: "Vitalis · Consultorio",
  },
  {
    icon: ShoppingCart,
    title: "Tiendas online (e-commerce)",
    desc: "Vende tus productos por internet 24/7, con catálogo, carrito y una experiencia de compra pensada para convertir.",
    incluye: [
      "Catálogo de productos",
      "Carrito y proceso de compra",
      "Diseño enfocado en vender",
      "Integración con tus redes",
    ],
    ejemplo: "Calidoso · Café",
  },
  {
    icon: Server,
    title: "Aplicaciones a la medida",
    desc: "Sistemas internos, paneles de administración y herramientas que resuelven el problema específico de tu operación.",
    incluye: [
      "Análisis de tu proceso actual",
      "Base de datos y panel de control",
      "Usuarios y permisos",
      "Documentación y soporte",
    ],
    ejemplo: "Hotel Marea",
  },
  {
    icon: Bot,
    title: "Chat-bots e inteligencia artificial",
    desc: "Un asistente que atiende a tus clientes en WhatsApp o tu web, responde dudas y agenda citas mientras tú trabajas.",
    incluye: [
      "Entrenado con la info de tu negocio",
      "Atención 24/7 sin costo por hora",
      "Agenda citas y responde preguntas",
      "Integración con META (WhatsApp)",
    ],
    ejemplo: "Integración de IA · ~90% CSAT",
  },
];

const faqs = [
  {
    q: "¿Cuánto cuesta una página web?",
    a: "Depende del alcance: no es lo mismo una landing de una sección que una tienda online con catálogo completo. Escríbeme por WhatsApp, cuéntame qué necesitas y te doy un precio claro y cerrado, sin sorpresas ni costos ocultos.",
  },
  {
    q: "¿Cuánto se demora el proyecto?",
    a: "Una landing o web sencilla suele estar lista en 1 a 2 semanas. Una tienda online o una aplicación a la medida toma entre 3 y 6 semanas, según la complejidad. Siempre te doy una fecha estimada antes de empezar.",
  },
  {
    q: "¿Trabajas solo en Cali o en toda Colombia?",
    a: "Trabajo desde Cali para toda Colombia y también con clientes en el exterior. Todo el proceso se puede llevar de forma remota, y hablo inglés (nivel C1) si tu proyecto lo requiere.",
  },
  {
    q: "¿La página va a aparecer en Google?",
    a: "Sí. Todos mis sitios se entregan optimizados para buscadores: estructura correcta, velocidad de carga, datos estructurados y configuración de Google Search Console. Este mismo portafolio es la prueba.",
  },
  {
    q: "¿Qué pasa después de entregar el sitio?",
    a: "Te entrego el sitio funcionando, con acceso completo y una guía para administrarlo. Si quieres, puedo encargarme del mantenimiento, actualizaciones y nuevas funcionalidades.",
  },
  {
    q: "¿Mi sitio va a ser seguro?",
    a: "Sí, y es parte del trato, no un extra. Tengo especialización en Ciberseguridad: cada proyecto sale con HTTPS, cabeceras de seguridad estrictas y buenas prácticas aplicadas desde el diseño.",
  },
];

export function Services() {
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
    <>
      <Seo
        title="Diseño y desarrollo de páginas web en Cali | Dox Designs"
        description="Creo páginas web, tiendas online y aplicaciones a la medida para negocios en Cali y toda Colombia. Sitios rápidos, seguros y listos para aparecer en Google. Cotiza por WhatsApp."
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
          <h1 className="display mt-4 text-[clamp(46px,9vw,120px)] leading-[0.88]">
            <RevealLine delay={0.08} mount>
              Tu negocio,
            </RevealLine>
            <RevealLine delay={0.16} mount>
              <span className="text-shimmer">en internet</span>
            </RevealLine>
          </h1>
          <Reveal delay={0.24} mount>
            <p className="mt-7 max-w-[62ch] text-[16px] leading-[1.75] text-mute">
              Diseño y desarrollo <strong className="text-ink">páginas web</strong>,{" "}
              <strong className="text-ink">tiendas online</strong> y{" "}
              <strong className="text-ink">aplicaciones a la medida</strong> para
              negocios en Cali y toda Colombia. Sitios rápidos, seguros y
              pensados para que tus clientes te encuentren y te escriban.
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
                  Cotizar mi proyecto
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-space transition-transform group-hover:scale-110">
                    <MessageCircle className="h-4 w-4 text-neb" />
                  </span>
                </a>
              </Magnetic>
              <Link
                to="/proyectos"
                className="pill px-6 py-3.5 font-mono text-[11px] font-semibold tracking-[0.14em] uppercase text-mute"
              >
                Ver trabajos
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Servicios */}
      <section className="mx-auto max-w-[1200px] px-6 py-12 md:px-8">
        <div className="grid gap-5 lg:grid-cols-2">
          {servicios.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <div className="card card-hover shine-hover group h-full p-7 md:p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-[10px] border border-neb/30 bg-neb/10 transition-all duration-300 group-hover:-rotate-6 group-hover:scale-110 group-hover:border-neb/60 group-hover:shadow-[0_0_24px_rgba(143,162,255,.35)]">
                  <s.icon className="h-5 w-5 text-neb" strokeWidth={1.6} />
                </div>
                <h2 className="display mt-5 text-[clamp(22px,2.6vw,30px)] leading-[1.05]">
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
                <div className="mt-6 border-t border-white/10 pt-4 font-mono text-[10px] tracking-[0.14em] uppercase text-faint">
                  Ejemplo real: <span className="text-neb">{s.ejemplo}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Seguridad incluida */}
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
                <h2 className="display text-[clamp(24px,3.2vw,36px)] leading-[1.05]">
                  Seguridad incluida, no cobrada aparte
                </h2>
                <p className="mt-3 max-w-[70ch] text-[14.5px] leading-[1.7] text-mute">
                  Tengo especialización en Ciberseguridad. Cada sitio se entrega
                  con HTTPS, cabeceras estrictas y buenas prácticas aplicadas
                  desde el diseño — protegiendo tu negocio y la confianza de tus
                  clientes.
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
        <h2 className="display mt-3 text-[clamp(36px,6vw,68px)] leading-[0.94]">
          <RevealLine delay={0.06}>Preguntas frecuentes</RevealLine>
        </h2>
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
            <h2 className="display text-[clamp(32px,5vw,56px)] leading-[0.98]">
              ¿Hablamos de tu proyecto?
            </h2>
            <p className="mx-auto mt-4 max-w-[52ch] text-[15px] leading-[1.7] text-mute">
              Cuéntame qué necesitas y te doy un precio claro, sin compromiso.
              Respondo el mismo día.
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
                  Escribirme por WhatsApp
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Magnetic>
              <a
                href={`mailto:${contact.email}`}
                onClick={() => trackContact("email")}
                className="pill px-6 py-3.5 font-mono text-[11px] font-semibold tracking-[0.14em] uppercase text-mute"
              >
                Enviar un correo
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
