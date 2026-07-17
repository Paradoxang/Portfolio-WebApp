import {
  Server,
  Code2,
  Database,
  GitBranch,
  Wrench,
  Sparkles,
  Briefcase,
  GraduationCap,
  PenTool,
  LayoutTemplate,
  Bot,
  Search,
  Lightbulb,
  Rocket,
  Languages,
  Hourglass,
  FolderCheck,
  type LucideIcon,
} from "lucide-react";

/* ── Contacto ── */
export const contact = {
  email: "santiago.miranda.trabajo@gmail.com",
  phone: "+57 318 981 9384",
  phoneHref: "tel:+573189819384",
  whatsapp:
    "https://wa.me/573189819384?text=Hola%20Santiago%2C%20vengo%20de%20tu%20portafolio%20y%20me%20interesa%20un%20proyecto.",
  instagram: "https://instagram.com/paradoxxan",
  instagramHandle: "@paradoxxan",
  github: "https://github.com/Paradoxang",
  githubHandle: "Paradoxang",
  facebook: "https://www.facebook.com/profile.php?id=61591547326067",
  location: "Cali · CO",
  domain: "doxdesigns.dev",
};

/* ── Stats (cifras reales, sin inventar clientes) ── */
export const stats = [
  { icon: FolderCheck, value: 25, suffix: "+", label: "Proyectos realizados" },
  { icon: Languages, display: "C1", label: "Inglés bilingüe" },
  { icon: Hourglass, value: 4, suffix: "+", label: "Años construyendo" },
] as const;

/* ── What I do ── */
export interface Service {
  icon: LucideIcon;
  title: string;
  desc: string;
}
export const services: Service[] = [
  {
    icon: Code2,
    title: "Desarrollo full-stack",
    desc: "APIs y aplicaciones de extremo a extremo con .NET, Next.js y SQL Server.",
  },
  {
    icon: PenTool,
    title: "Diseño de interfaz",
    desc: "UI oscura y editorial: sistemas de diseño con tipografía protagonista.",
  },
  {
    icon: LayoutTemplate,
    title: "Landings & web",
    desc: "Sitios rápidos, responsive y accesibles con React + Tailwind.",
  },
  {
    icon: Bot,
    title: "Integración de IA",
    desc: "Chat-bots y asistentes con entrenamiento enfocado al negocio.",
  },
];

/* ── Work process ── */
export interface Step {
  num: string;
  icon: LucideIcon;
  title: string;
  desc: string;
}
export const process: Step[] = [
  { num: "01", icon: Search, title: "Descubrir", desc: "Objetivos, audiencia y requisitos del proyecto." },
  { num: "02", icon: Lightbulb, title: "Idear", desc: "Planeación, wireframes y la solución correcta." },
  { num: "03", icon: PenTool, title: "Diseñar", desc: "Visual limpio, moderno y centrado en el usuario." },
  { num: "04", icon: Code2, title: "Desarrollar", desc: "Código rápido, responsive y de alto rendimiento." },
  { num: "05", icon: Rocket, title: "Entregar", desc: "Pruebas, ajustes y lanzamiento pixel-perfect." },
];

/* ── Tools ── */
export const tools = [
  ".NET",
  "React",
  "Next.js",
  "Angular",
  "TypeScript",
  "Tailwind",
  "SQL Server",
  "Git",
];

/* ── Cita ── */
export const quote = {
  text: "El buen diseño no es cómo se ve, es cómo funciona.",
  author: "Santiago Miranda",
};

/* ── Proyectos (contenido real) ── */
export interface Project {
  num: string;
  slug: string;
  name: string;
  tipo: string;
  tag: string;
  desc: string;
  rol: string;
  resultado: string;
  stack: string[];
  link?: string;
  demo?: string;
  mark: string;
  year: string;
  featured?: boolean;
  /** Teaser en video (GIF convertido a MP4/WebM) + poster estático. */
  preview?: { mp4: string; webm: string; poster: string };
}

export const projects: Project[] = [
  {
    num: "01",
    slug: "aurora",
    preview: {
      mp4: "/previews/aurora-960.mp4",
      webm: "/previews/aurora-960.webm",
      poster: "/previews/aurora-poster.jpg",
    },
    name: "Aurora · Video Hero",
    tipo: "Frontend",
    tag: "React + Tailwind (Vite)",
    desc: "Landing responsive e interactiva construida alrededor de un único video como base de toda la página: el clip queda fijo de fondo y el contenido se desliza encima, reacciona al puntero y responde al scroll.",
    rol: "Diseño y desarrollo completo",
    resultado:
      "Sirve 720p/1280p/1920p según la pantalla (WebM + MP4), con poster + blur-up, dock para controlar el video y soporte de «reducir movimiento».",
    stack: ["React", "Tailwind", "Vite", "Video adaptativo"],
    link: "https://github.com/Paradoxang/TestWeb1Animated",
    demo: "https://test-web1-animated12354.vercel.app",
    mark: "AV",
    year: "2026",
    featured: true,
  },
  {
    num: "02",
    slug: "hotel-marea",
    preview: {
      mp4: "/previews/hotel-marea-960.mp4",
      webm: "/previews/hotel-marea-960.webm",
      poster: "/previews/hotel-marea-poster.jpg",
    },
    name: "Hotel Marea",
    tipo: "Full-stack",
    tag: "Next.js + TypeScript",
    desc: "Aplicación web de muestreo construida con Next.js (App Router) y TypeScript, con persistencia mediante Drizzle ORM y despliegue continuo en Vercel.",
    rol: "Full-stack",
    resultado:
      "Arquitectura modular (app, modules, components, db) pensada para escalar, con despliegue continuo en Vercel.",
    stack: ["Next.js", "TypeScript", "Drizzle ORM", "Vercel"],
    link: "https://github.com/Paradoxang/hotelmarea-muestreo-app",
    demo: "https://hotelmarea-muestreo-app.vercel.app",
    mark: "HM",
    year: "2026",
    featured: true,
  },
  {
    num: "03",
    slug: "vitalis",
    preview: {
      mp4: "/previews/vitalis-960.mp4",
      webm: "/previews/vitalis-960.webm",
      poster: "/previews/vitalis-poster.jpg",
    },
    name: "Vitalis · Consultorio",
    tipo: "Web",
    tag: "Landing para consultorio médico",
    desc: "Sitio web para el consultorio médico Vitalis: presentación institucional de servicios de salud con interfaz responsive y desplegada en Vercel.",
    rol: "Diseño y desarrollo",
    resultado:
      "Estructura pensada para comunicar los servicios, generar confianza y facilitar el contacto de los pacientes.",
    stack: ["React", "Tailwind", "Vercel", "Responsive"],
    demo: "https://vitalis-muestreo-app.vercel.app/",
    mark: "VC",
    year: "2026",
    featured: true,
  },
  {
    num: "04",
    slug: "dr-adrian",
    preview: {
      mp4: "/previews/dr-adrian-960.mp4",
      webm: "/previews/dr-adrian-960.webm",
      poster: "/previews/dr-adrian-poster.jpg",
    },
    name: "Portafolio Dr. Adrián",
    tipo: "Web",
    tag: "Portafolio profesional médico",
    desc: "Portafolio digital del Dr. Adrián, especialista médico: una carta de presentación en línea que reúne su perfil profesional, servicios y datos de contacto.",
    rol: "Diseño y desarrollo",
    resultado: "Diseño responsive y limpio, desplegado en Vercel.",
    stack: ["React", "Tailwind", "Vercel", "Responsive"],
    demo: "https://portfolio-doctor-app.vercel.app/",
    mark: "DA",
    year: "2026",
  },
  {
    num: "05",
    slug: "integracion-ia",
    name: "Integración de IA",
    tipo: "Chat-bot",
    tag: "Tecnologías META",
    desc: "Chat-bot de atención al cliente para un consultorio de Psicología, mediante tokens y entrenamiento enfocado.",
    rol: "Integración y entrenamiento",
    resultado: "Alcanzó ~90% en pruebas de satisfacción del cliente.",
    stack: ["IA", "META", "Tokens", "~90% CSAT"],
    mark: "IA",
    year: "2025",
  },
  {
    num: "06",
    slug: "crud-clientes",
    name: "CRUD Clientes",
    tipo: "Full-stack",
    tag: ".NET 8 + Angular",
    desc: "Gestor de clientes (prueba técnica) con API REST en .NET 8 / EF Core 8 y frontend Angular con componentes standalone y signals.",
    rol: "Full-stack · prueba técnica",
    resultado:
      "CRUD completo con búsqueda, paginación, filtros por estado, validación en doble capa, índice único anti-duplicados y documentación Swagger/OpenAPI.",
    stack: [".NET 8", "Angular", "EF Core 8", "SQL Server", "Swagger"],
    link: "https://github.com/Paradoxang/CRUDclientes",
    mark: "CC",
    year: "2025",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

/* ── Sobre mí ── */
export interface SkillGroup {
  icon: LucideIcon;
  label: string;
  items: string[];
}
export const skillGroups: SkillGroup[] = [
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

export const timeline = [
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

export const achievements = [
  "Experiencia galardonada en modelos intercolegiales tipo ONU.",
  "Organizador y promotor de un concurso de robótica.",
  "Capacitación en protocolos de gala.",
  "Autor del libro «Encerrados» (no publicado).",
];

export const collage = [
  { src: "/foto-1.webp", ratio: "950 / 1416" },
  { src: "/foto-3.webp", ratio: "950 / 1179" },
  { src: "/foto-4.webp", ratio: "950 / 1424" },
];
