import { motion, useInView } from "framer-motion";
import {
  ArrowLeft,
  Mail,
  Phone,
  Github,
  Instagram,
  MapPin,
  ExternalLink,
  Server,
  Code2,
  Database,
  GitBranch,
  Wrench,
  Sparkles,
  Languages,
  GraduationCap,
  Briefcase,
  Award,
} from "lucide-react";
import { useEffect, useRef, type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { ParticlesBackground } from "@/components/ui/particles-background";
import { ProjectCover } from "@/components/ui/project-cover";
import { Seo } from "@/components/seo";

/* ---------------- Reveal helper ---------------- */
const Reveal = ({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-70px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 26 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* ---------------- Section header ---------------- */
const SectionTitle = ({ eyebrow, title }: { eyebrow: string; title: string }) => (
  <Reveal className="mb-10">
    <span className="flex items-center gap-3 text-[11px] tracking-[0.3em] text-accent-1/80">
      <span className="eyebrow-rule" />
      {eyebrow}
    </span>
    <h2 className="font-display mt-3 text-4xl font-bold tracking-[-0.02em] sm:text-5xl">
      {title}
    </h2>
  </Reveal>
);

/* ---------------- Data (from CV 2026) ---------------- */
const skillGroups = [
  {
    icon: Server,
    label: "Backend",
    items: [".NET 8 / C#", "APIs REST", "POO", "Arquitecturas de app"],
  },
  {
    icon: Code2,
    label: "Frontend",
    items: ["Angular 19", "TypeScript", "JavaScript", "React", "HTML", "CSS"],
  },
  {
    icon: Database,
    label: "Bases de datos",
    items: ["SQL Server", "MySQL", "Modelado relacional"],
  },
  {
    icon: GitBranch,
    label: "Control de versiones",
    items: ["Git", "Flujos con repositorios"],
  },
  {
    icon: Wrench,
    label: "Otras herramientas",
    items: ["Python", "Java", "Power BI", "Big Data", "Asistentes de IA", "AutoCAD", "Office"],
  },
  {
    icon: Sparkles,
    label: "Habilidades clave",
    items: ["Gestión del tiempo", "Comunicación", "Trabajo en equipo", "Adaptabilidad"],
  },
];

interface Project {
  year: string;
  name: string;
  tag: string;
  desc: string;
  stack: string[];
  link?: string;
  demo?: string;
  mark: string;
  coverLabel: string;
}

const projects: Project[] = [
  {
    year: "2026",
    name: "VITALIS · CONSULTORIO",
    tag: "Web · Landing para consultorio médico",
    desc: "Sitio web para el consultorio médico Vitalis: presentación institucional de servicios de salud con interfaz responsive y desplegada en Vercel. Estructura pensada para comunicar los servicios, generar confianza y facilitar el contacto de los pacientes.",
    stack: ["React", "Tailwind", "Vercel", "Responsive"],
    demo: "https://vitalis-muestreo-app.vercel.app/",
    mark: "VC",
    coverLabel: "SALUD · WEB",
  },
  {
    year: "2026",
    name: "PORTAFOLIO · DR. ADRIÁN",
    tag: "Web · Portafolio profesional médico",
    desc: "Portafolio digital del Dr. Adrián, especialista médico: una carta de presentación en línea que reúne su perfil profesional, servicios y datos de contacto. Diseño responsive y limpio, desplegado en Vercel.",
    stack: ["React", "Tailwind", "Vercel", "Responsive"],
    demo: "https://portfolio-doctor-app.vercel.app/",
    mark: "DA",
    coverLabel: "PORTAFOLIO · WEB",
  },
  {
    year: "2026",
    name: "AURORA · VIDEO HERO",
    tag: "Frontend · React + Tailwind (Vite)",
    desc: "Landing responsive e interactiva construida alrededor de un único video como base de toda la página: el clip queda fijo de fondo y el contenido se desliza encima, reacciona al puntero y responde al scroll. Sirve 720p/1280p/1920p según la pantalla (WebM + MP4), con poster + blur-up, dock para controlar el video y soporte de «reducir movimiento».",
    stack: ["React", "Tailwind", "Vite", "Video adaptativo"],
    link: "https://github.com/Paradoxang/TestWeb1Animated",
    demo: "https://test-web1-animated12354.vercel.app",
    mark: "AV",
    coverLabel: "REACT · TAILWIND",
  },
  {
    year: "2026",
    name: "AUTOMATIZADOR",
    tag: "Desktop · Electron 33 + Node.js",
    desc: "App de escritorio para Windows que centraliza la prospección comercial por correo, Instagram y WhatsApp en un único panel privado. Plantillas dinámicas con variables, importación masiva por CSV, lista de bajas (GDPR/Habeas Data) y credenciales cifradas localmente con DPAPI de Windows.",
    stack: ["Electron 33", "Node.js", "Nodemailer", "JavaScript"],
    link: "https://github.com/Paradoxang/Automat-app",
    mark: "AX",
    coverLabel: "ELECTRON · DESKTOP",
  },
  {
    year: "2026",
    name: "HOTEL MAREA · MUESTREO",
    tag: "Full-stack · Next.js + TypeScript",
    desc: "Aplicación web de muestreo construida con Next.js (App Router) y TypeScript, con persistencia mediante Drizzle ORM y despliegue continuo en Vercel. Arquitectura modular (app, modules, components, db) pensada para escalar.",
    stack: ["Next.js", "TypeScript", "Drizzle ORM", "Vercel"],
    link: "https://github.com/Paradoxang/hotelmarea-muestreo-app",
    demo: "https://hotelmarea-muestreo-app.vercel.app",
    mark: "HM",
    coverLabel: "NEXT.JS · VERCEL",
  },
  {
    year: "2025",
    name: "CRUD CLIENTES",
    tag: "Full-stack · .NET 8 + Angular",
    desc: "Gestor de clientes (prueba técnica) con API REST en .NET 8 / EF Core 8 y frontend Angular con componentes standalone y signals. CRUD completo, búsqueda, paginación, filtros por estado, validación en doble capa, índice único anti-duplicados y documentación Swagger/OpenAPI.",
    stack: [".NET 8", "Angular", "EF Core 8", "SQL Server", "Swagger"],
    link: "https://github.com/Paradoxang/CRUDclientes",
    mark: "CC",
    coverLabel: ".NET · ANGULAR",
  },
  {
    year: "2025",
    name: "Integración de IA",
    tag: "Chat-bot · Tecnologías META",
    desc: "Chat-bot de atención al cliente para un consultorio de Psicología. Mediante tokens y entrenamiento enfocado, alcanzó ~90% en pruebas de satisfacción del cliente.",
    stack: ["IA", "META", "Tokens", "~90% CSAT"],
    mark: "IA",
    coverLabel: "CHAT-BOT · META",
  },
];

const timeline = [
  {
    icon: Briefcase,
    kind: "Experiencia",
    title: "Dispatcher Bilingüe",
    place: "Gallant Luxury Transportation",
    period: "Más de 1 año",
    points: [
      "Coordinación de asignación y despacho de servicios de transporte, gestionando horarios y rutas.",
      "Comunicación con conductores y clientes en inglés y español, resolviendo incidencias en tiempo real bajo presión.",
      "Registros precisos de operaciones, asegurando trazabilidad de cada servicio.",
    ],
  },
  {
    icon: GraduationCap,
    kind: "Educación",
    title: "Ingeniería Informática",
    place: "Universidad Autónoma de Occidente · Cali",
    period: "Ene 2021 – Actualidad",
    points: ["Pregrado próximo a graduarse, orientado al desarrollo de software full-stack."],
  },
  {
    icon: GraduationCap,
    kind: "Educación",
    title: "Bachillerato Académico",
    place: "Colegio Americano de Cali",
    period: "2014 – 2020",
    points: [],
  },
];

const achievements = [
  "Experiencia galardonada en modelos intercolegiales tipo ONU.",
  "Organizador y promotor de un concurso de robótica.",
  "Capacitación en protocolos de gala.",
  "Autor del libro «Encerrados» (no publicado).",
];

const collage = [
  { src: "/foto-1.webp", ratio: "950 / 1416", span: "" },
  { src: "/foto-3.webp", ratio: "950 / 1179", span: "" },
  { src: "/foto-4.webp", ratio: "950 / 1424", span: "" },
];

/* ---------------- About page ---------------- */
export function About() {
  const location = useLocation();

  // Scroll to #section when navigated from the home navbar
  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 60);
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <Seo
        title="Sobre mí · Santiago Miranda | Dox Designs"
        description="Conoce a Santiago Miranda (Dox Designs): experiencia, habilidades y proyectos — React, Next.js, .NET, Angular y Electron. Desarrollador full-stack y diseñador web en Cali, Colombia."
        path="/sobre-mi"
      />
      {/* Backdrop — same vibe as the hero, calmer for reading */}
      <div className="aurora-bg fixed inset-0 -z-30" />
      <div className="fixed inset-0 -z-20 opacity-50">
        <ParticlesBackground count={48} />
      </div>
      <div className="noise-overlay pointer-events-none fixed inset-0 -z-10 opacity-[0.35] mix-blend-overlay" />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-b from-ink/50 via-transparent to-ink/85" />

      {/* Top bar */}
      <header className="sticky top-0 z-30 flex items-center justify-between px-5 py-4 backdrop-blur-sm sm:px-8">
        <Link
          to="/"
          className="text-xs font-medium tracking-[0.3em] text-accent-1/80 transition-colors hover:text-accent-1"
        >
          SANTIAGO · 2026
        </Link>
        <Link
          to="/"
          className="chip gap-2 px-4 py-2 text-[11px] tracking-[0.15em] text-primary/80"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          INICIO
        </Link>
      </header>

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        {/* ── Intro ── */}
        <section className="pb-20 pt-16 sm:pt-24">
          <Reveal>
            <span className="flex items-center gap-3 text-[11px] tracking-[0.3em] text-accent-1/80">
              <span className="eyebrow-rule" />
              DESARROLLADOR FULL-STACK · .NET / ANGULAR
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="font-display mt-4 text-[18vw] font-bold leading-[0.82] tracking-[-0.04em] sm:text-[13vw] lg:text-[10vw]">
              <span className="text-gradient">SOBRE</span> MÍ
            </h1>
          </Reveal>

          <div className="mt-10 grid gap-10 lg:grid-cols-12">
            <Reveal delay={0.1} className="lg:col-span-7">
              <p className="max-w-2xl text-sm leading-relaxed text-primary/80 sm:text-base">
                Soy <span className="text-primary">Santiago Alejandro Miranda Ortiz</span>,
                Ingeniero en Informática centrado en el desarrollo de software y con
                especialización en Ciberseguridad. Construyo aplicaciones con{" "}
                <span className="text-accent-1">.NET 8</span>,{" "}
                <span className="text-accent-1">Angular 19</span> y{" "}
                <span className="text-accent-1">SQL Server</span>, con experiencia académica
                y personal en desarrollo web, bases de datos relacionales e integración de
                inteligencia artificial. Me defino por la adaptabilidad, la comunicación clara
                y el compromiso con la calidad.
              </p>

              <div className="mt-8 flex flex-wrap gap-3 text-[11px] tracking-[0.12em] text-primary/70">
                <span className="chip gap-2 px-4 py-2">
                  <MapPin className="h-3.5 w-3.5 text-accent-1" /> CALI, COLOMBIA
                </span>
                <span className="chip gap-2 px-4 py-2">
                  <Languages className="h-3.5 w-3.5 text-accent-1" /> INGLÉS C1
                </span>
                <a
                  href="https://github.com/Paradoxang"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="chip gap-2 px-4 py-2"
                >
                  <Github className="h-3.5 w-3.5 text-accent-1" /> Dox Desings
                </a>
              </div>
            </Reveal>

            {/* Featured editorial photo */}
            <Reveal delay={0.15} className="lg:col-span-5">
              <div className="photo-frame mx-auto max-w-xs">
                <img
                  src="/foto-2.webp"
                  alt="Santiago Miranda — editorial"
                  className="w-full"
                  style={{ aspectRatio: "950 / 1416", objectFit: "cover" }}
                />
                <div className="portrait-shine" />
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── Habilidades ── */}
        <section id="habilidades" className="scroll-mt-24 py-16">
          <SectionTitle eyebrow="STACK & HERRAMIENTAS" title="Habilidades técnicas" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {skillGroups.map((g, i) => (
              <Reveal key={g.label} delay={i * 0.06}>
                <div className="surface surface-hover h-full p-6">
                  <div className="flex items-center gap-3">
                    <g.icon className="h-5 w-5 text-accent-1" />
                    <h3 className="font-display text-lg font-semibold">{g.label}</h3>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {g.items.map((it) => (
                      <span key={it} className="chip px-3 py-1 text-xs text-primary/75">
                        {it}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── Photo collage ── */}
        <section className="py-16">
          <div className="grid gap-5 sm:grid-cols-3">
            {collage.map((p, i) => (
              <Reveal key={p.src} delay={i * 0.08} className={i === 1 ? "sm:mt-10" : ""}>
                <div className="photo-frame">
                  <img
                    src={p.src}
                    alt="Santiago Miranda"
                    className="w-full"
                    style={{ aspectRatio: p.ratio, objectFit: "cover" }}
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── Proyectos ── */}
        <section id="proyectos" className="scroll-mt-24 py-16">
          <SectionTitle eyebrow="ACADÉMICOS & PERSONALES" title="Proyectos" />
          <div className="space-y-5">
            {projects.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.06}>
                <div className="surface surface-hover group grid gap-0 overflow-hidden sm:grid-cols-[minmax(0,11rem)_1fr] lg:grid-cols-[minmax(0,14rem)_1fr]">
                  {/* Generated cover preview */}
                  <div className="h-36 sm:h-full">
                    <ProjectCover mark={p.mark} label={p.coverLabel} variant={i} />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col p-6 sm:p-7">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h3 className="font-display text-xl font-bold sm:text-2xl">
                          {p.name}
                        </h3>
                        <p className="mt-1 text-xs tracking-[0.12em] text-accent-1/80">
                          {p.tag}
                        </p>
                      </div>
                      <span className="shrink-0 text-sm tracking-[0.2em] text-primary/40">
                        [{p.year}]
                      </span>
                    </div>

                    <p className="mt-4 max-w-3xl text-sm leading-relaxed text-primary/75">
                      {p.desc}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {p.stack.map((s) => (
                        <span key={s} className="chip px-3 py-1 text-xs text-primary/70">
                          {s}
                        </span>
                      ))}
                    </div>

                    {(p.link || p.demo) && (
                      <div className="mt-6 flex flex-wrap gap-3">
                        {p.demo && (
                          <a
                            href={p.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group/btn inline-flex items-center gap-2 rounded-full bg-accent-1 py-1.5 pl-4 pr-1.5 text-xs font-medium text-black transition-all hover:gap-3"
                          >
                            Demo en vivo
                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-black">
                              <ExternalLink className="h-3.5 w-3.5 text-accent-1" />
                            </span>
                          </a>
                        )}
                        {p.link && (
                          <a
                            href={p.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="chip gap-2 px-4 py-2 text-xs tracking-[0.12em] text-primary/80 transition-colors hover:text-accent-1"
                          >
                            <Github className="h-3.5 w-3.5 text-accent-1" /> CÓDIGO
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── Experiencia & Educación ── */}
        <section id="experiencia" className="scroll-mt-24 py-16">
          <SectionTitle eyebrow="TRAYECTORIA" title="Experiencia & educación" />
          <div className="space-y-4">
            {timeline.map((t, i) => (
              <Reveal key={t.title} delay={i * 0.06}>
                <div className="surface flex flex-col gap-4 p-6 sm:flex-row sm:gap-6 sm:p-7">
                  <div className="flex items-center gap-3 sm:w-44 sm:shrink-0 sm:flex-col sm:items-start">
                    <t.icon className="h-5 w-5 text-accent-1" />
                    <span className="text-[10px] tracking-[0.2em] text-primary/45">
                      {t.kind.toUpperCase()}
                    </span>
                    <span className="text-xs text-primary/55">{t.period}</span>
                  </div>
                  <div className="border-l border-white/10 pl-0 sm:pl-6">
                    <h3 className="font-display text-lg font-semibold">{t.title}</h3>
                    <p className="text-sm text-accent-1/80">{t.place}</p>
                    {t.points.length > 0 && (
                      <ul className="mt-3 space-y-1.5">
                        {t.points.map((pt) => (
                          <li
                            key={pt}
                            className="flex gap-2 text-sm leading-relaxed text-primary/70"
                          >
                            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent-1/70" />
                            {pt}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── Otros logros ── */}
        <section className="py-16">
          <SectionTitle eyebrow="MÁS ALLÁ DEL CÓDIGO" title="Otros logros" />
          <div className="grid gap-4 sm:grid-cols-2">
            {achievements.map((a, i) => (
              <Reveal key={a} delay={i * 0.05}>
                <div className="surface surface-hover flex items-start gap-3 p-5">
                  <Award className="mt-0.5 h-5 w-5 shrink-0 text-accent-1" />
                  <p className="text-sm text-primary/80">{a}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── Contacto ── */}
        <section id="contacto" className="scroll-mt-24 py-20">
          <Reveal>
            <div className="surface overflow-hidden p-8 text-center sm:p-12">
              <span className="flex items-center justify-center gap-3 text-[11px] tracking-[0.3em] text-accent-1/80">
                <span className="eyebrow-rule" /> HABLEMOS <span className="eyebrow-rule" />
              </span>
              <h2 className="font-display mt-4 text-3xl font-bold tracking-[-0.02em] sm:text-5xl">
                ¿Construimos algo juntos?
              </h2>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href="tel:+573189819384"
                  className="chip w-full justify-center gap-2 px-5 py-3 text-xs tracking-[0.12em] text-primary/80 sm:w-auto"
                >
                  <Phone className="h-4 w-4 shrink-0 text-accent-1" /> +57 318 981 9384
                </a>
                <a
                  href="https://instagram.com/paradoxxan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="chip w-full justify-center gap-2 px-5 py-3 text-xs tracking-[0.12em] text-primary/80 sm:w-auto"
                >
                  <Instagram className="h-4 w-4 shrink-0 text-accent-1" /> @paradoxxan
                </a>
                <a
                  href="mailto:santiago.miranda.trabajo@gmail.com"
                  className="chip w-full max-w-full justify-center gap-2 px-5 py-3 text-xs tracking-[0.12em] text-primary/80 sm:w-auto"
                >
                  <Mail className="h-4 w-4 shrink-0 text-accent-1" />
                  <span className="break-all">santiago.miranda.trabajo@gmail.com</span>
                </a>
              </div>
            </div>
          </Reveal>

          <div className="mt-10 flex items-center justify-between text-[10px] tracking-[0.25em] text-primary/45">
            <Link to="/" className="transition-colors hover:text-accent-1">
              ← VOLVER AL INICIO
            </Link>
            <span>CALI · CO</span>
          </div>
        </section>
      </div>
    </div>
  );
}
