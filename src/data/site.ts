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
  Hourglass,
  FolderCheck,
  Braces,
  Atom,
  Zap,
  Shield,
  FileCode,
  Wind,
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

/* ── La barra de credencial ──
   Antes decía "25+ proyectos", "Inglés C1" y "4+ años". Ninguna de las tres era
   una razon para contratar: son datos de hoja de vida, no de propuesta. Y el
   25+ tampoco se sostiene cuando lo navegable son seis.
   Las tres de ahora son las unicas cosas comprobables que se pueden ofrecer sin
   tener todavia un cliente con cifras: lo que se puede mirar, lo que se entrega
   antes de cobrar, y el titulo. */
export const stats = [
  { icon: FolderCheck, value: 6, suffix: "", label: "Demostraciones navegables" },
  { icon: Hourglass, display: "48h", label: "Diagnóstico gratuito" },
  { icon: Shield, display: "Esp.", label: "Especialización en Ciberseguridad" },
] as const;

/* ── What I do ──
   Cada servicio lleva su tarjeta: la variante decide el degradado y el objeto
   3D que sangra por la esquina. `icon` se conserva porque la página /servicios
   sigue usándolo en su propio listado. */
export type VarianteWdid = "modulo" | "astrolabio" | "cristal" | "vela";

export interface Service {
  icon: LucideIcon;
  title: string;
  desc: string;
  /** Versión de bolsillo del descriptivo, para la tarjeta suelta de móvil.
      Ahí la caja mide unos 147x147 px y el `desc` completo no cabe: se
      recorta el concepto a una línea, no se trunca la frase larga. */
  resumen: string;
  variante: VarianteWdid;
  objeto: string;
  etiqueta: string;
  /** Punto del degradado que le toca al punto de la etiqueta. */
  color: string;
  cta: string;
  href: string;
}
export const services: Service[] = [
  {
    icon: Search,
    title: "Que te encuentren",
    desc: "Posicionamiento local, ficha de Google y reseñas para aparecer cuando alguien busca cerca de ti.",
    resumen: "Aparecer al buscar cerca.",
    variante: "modulo",
    objeto: "wdid_01_modulo",
    etiqueta: "Posicionamiento",
    color: "#F0A868",
    cta: "Ver planes",
    href: "/planes",
  },
  {
    icon: Bot,
    title: "Que la IA te cite",
    desc: "Contenido y datos estructurados para salir en las respuestas de ChatGPT, Perplexity y los resúmenes de Google.",
    resumen: "Salir en respuestas de IA.",
    variante: "astrolabio",
    objeto: "wdid_02_astrolabio",
    etiqueta: "Buscadores con IA",
    color: "#E7DCFF",
    cta: "Ver planes",
    href: "/planes",
  },
  {
    icon: LayoutTemplate,
    title: "Que reserven solos",
    desc: "Web rápida con agenda, formularios y WhatsApp para que la cita se pida sin llamar.",
    resumen: "Agenda y WhatsApp sin llamar.",
    variante: "cristal",
    objeto: "wdid_03_cristal",
    etiqueta: "Conversión",
    color: "#8FA2FF",
    cta: "Ver muestrario",
    href: "/proyectos",
  },
  {
    icon: Shield,
    title: "Que estés protegido",
    desc: "Los datos de tus pacientes cifrados, el sitio monitoreado y el cumplimiento de la Ley 1581 al día.",
    resumen: "Datos y cumplimiento al día.",
    variante: "vela",
    objeto: "wdid_04_vela",
    etiqueta: "Cumplimiento",
    color: "#FFB39C",
    cta: "Ver el escudo",
    href: "/#escudo",
  },
];

/* ── Planes de vuelo ──
   El bloque que cambia el modelo: deja de venderse el proyecto y se vende la
   cuota. Tres columnas, mensual y con el número a la vista — el precio en
   pantalla filtra a quien no puede pagar antes de gastar una hora cotizando, y
   cambia la conversación de "cuánto me cobras" a "cuál me sirve".

   ── La escalera de precios ──
   350.000 / 690.000 / 1.150.000 COP al mes. Es una escalera de entrada
   deliberadamente baja: el salto Base→Crecimiento es x2 y el de Crecimiento→
   Blindaje x1.7, que es el reparto que hace que el del medio se lea como el
   razonable y no como el caro.
   Conviene saber lo que cuesta entrar así de abajo: subirle la cuota a un
   cliente que ya entró es mucho más difícil que entrar caro, y con el programa
   fundador encima hay dos descuentos apilados sobre el mismo plan. Cuando
   estén los tres primeros casos con cifras, esto se revisa. */
export interface Plan {
  /** Ancla para el enlace directo. */
  id: string;
  /** Etiqueta corta de la tarjeta, en el idioma de la casa. */
  etiqueta: string;
  nombre: string;
  /** Para quién es, en una línea. */
  para: string;
  /** Solo la cifra, en pesos y con punto de miles. La moneda la escribe la
      tarjeta: metida aquí, "COP 1.150.000" se come el ancho de la columna y el
      número deja de leerse de un vistazo, que es justo para lo que está. */
  precio: string;
  periodo: string;
  incluye: string[];
  /** El del medio: el que se quiere vender. */
  destacado?: boolean;
}
export const planes: Plan[] = [
  {
    id: "base",
    etiqueta: "Órbita baja",
    nombre: "Base",
    para: "Para el consultorio que todavía no está en internet.",
    precio: "350.000",
    periodo: "/mes",
    incluye: [
      "Sitio web propio, rápido y en tu dominio",
      "Ficha de Google optimizada y verificada",
      "Formulario y WhatsApp conectados",
      "Respaldos, actualizaciones y monitoreo",
      "Telemetría mensual",
    ],
  },
  {
    id: "crecimiento",
    etiqueta: "El más contratado",
    nombre: "Crecimiento",
    para: "Para el que ya está y quiere que lo encuentren primero.",
    precio: "690.000",
    periodo: "/mes · mín. 6 meses",
    destacado: true,
    incluye: [
      "Todo lo del plan Base",
      "Posicionamiento local y trabajo de reseñas",
      "Dos contenidos al mes en tu sitio",
      "Presencia en buscadores con IA",
      "Telemetría mensual ampliada",
    ],
  },
  {
    id: "blindaje",
    etiqueta: "Datos sensibles",
    nombre: "Blindaje",
    para: "Para quien maneja historias clínicas y datos de pacientes.",
    precio: "1.150.000",
    periodo: "/mes",
    incluye: [
      "Todo lo del plan Crecimiento",
      "Auditoría técnica de seguridad",
      "Acompañamiento en Ley 1581 y registro ante la SIC",
      "Cifrado, mínimo privilegio y control de accesos",
      "Revisión de seguridad en cada telemetría",
    ],
  },
];

/* ── Telemetría ──
   El informe mensual. Es el bloque que justifica el cobro recurrente: sin él,
   el cliente paga el mes dos sin saber qué compró y se va en el tres.
   Las métricas son las que él entiende —llamadas, citas, cómo llegar—, no
   posiciones de palabras clave.

   Los valores son de EJEMPLO y la sección lo dice en pantalla. */
export interface Metrica {
  k: string;
  valor: string;
  delta?: string;
}
export const telemetria: Metrica[] = [
  { k: "Llamadas", valor: "38", delta: "+12" },
  { k: "Formularios", valor: "14", delta: "+5" },
  { k: "Cómo llegar", valor: "61", delta: "+19" },
  { k: "Posición local", valor: "3.º", delta: "+4" },
  { k: "Citas en IA", valor: "7", delta: "+3" },
  { k: "Escudo", valor: "OK" },
];

/* ── Objeciones ──
   No son las dudas de un proyecto —esas ya están en /servicios—, son las cuatro
   que frenan una SUSCRIPCIÓN, que son otras. La cuarta es la incómoda y por eso
   va contestada de frente: sin clientes todavía, decirlo tú primero convierte
   la debilidad en el motivo para decidirse ya. */
export const objeciones = [
  {
    q: "¿En cuánto tiempo veo resultados?",
    a: "La ficha de Google y las reseñas suelen moverse en semanas. El posicionamiento por búsquedas tarda de tres a seis meses — te lo digo antes de que firmes, no después.",
  },
  {
    q: "¿Hay permanencia? ¿Y si me quiero ir?",
    a: "Base no tiene permanencia. Crecimiento y Blindaje piden seis meses, porque antes de eso no hay nada que medir. Avisas con un mes y se cierra sin penalización.",
  },
  {
    q: "Si cancelo, ¿la web sigue siendo mía?",
    a: "Sí. El dominio y el contenido son tuyos desde el primer día y te los entrego funcionando. Lo que se acaba es el trabajo mensual, no tu sitio.",
  },
  {
    q: "¿Ya lo has hecho con alguien más?",
    a: "Todavía no con un consultorio, y prefiero decirlo yo. Por eso los tres primeros entran a precio de fundador a cambio de permiso para publicar sus números. Lo que sí puedes revisar es cómo trabajo: todo el muestrario de abajo está en línea y se puede navegar.",
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
export interface Tool {
  name: string;
  icon: LucideIcon;
}
export const tools: Tool[] = [
  { name: ".NET", icon: Braces },
  { name: "React", icon: Atom },
  { name: "Next.js", icon: Zap },
  { name: "Angular", icon: Shield },
  { name: "TypeScript", icon: FileCode },
  { name: "Tailwind", icon: Wind },
  { name: "SQL Server", icon: Database },
  { name: "Git", icon: GitBranch },
];

/* ── Cita ── */
export const quote = {
  text: "El buen diseño no es cómo se ve, es cómo funciona.",
  author: "Santiago Miranda",
};

/* ── Proyectos (contenido real) ── */
export interface Project {
  /** Entra en el carrusel del muestrario de la portada.
      El criterio es uno solo: **¿se puede entrar y moverse por él?** El
      argumento de la sección es "míralo funcionando", así que un caso sin
      enlace vivo no pinta nada ahí. Se caen Aurora —ejercicio de vídeo, poco
      que enseñarle a un cliente— y los dos de 2025, que ni siquiera tienen
      demo navegable. No se borran: bajan a la lista de capacidades técnicas,
      donde suman sin ocupar un carril que debería estar vendiendo. */
  muestrario?: boolean;
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
  /** Aspect ratio del preview en la cover grande de /proyectos (CSS). Por
   * defecto panorámico 1896/888 — solo se pisa si el video de origen no lo es. */
  previewAspect?: string;
}

export const projects: Project[] = [
  {
    num: "01",
    slug: "gem-eyes",
    muestrario: true,
    preview: {
      mp4: "/previews/gem-eyes-960.mp4",
      webm: "/previews/gem-eyes-960.webm",
      poster: "/previews/gem-eyes-poster.jpg",
    },
    name: "Gem Eyes",
    tipo: "Web",
    tag: "Concepto · estudio creativo",
    desc: "Demo de sitio para un estudio creativo, con identidad visual audaz: ilustración a pantalla completa, animaciones expresivas y secciones de galería, proceso y contacto.",
    rol: "Concepto, diseño y desarrollo",
    resultado:
      "Experiencia inmersiva y responsive que destaca el arte del estudio sin sacrificar la velocidad de carga.",
    stack: ["React", "Tailwind", "Vite", "Vercel"],
    demo: "https://gem-eyes-web-app.vercel.app/",
    mark: "GE",
    year: "2026",
    featured: true,
  },
  {
    num: "02",
    slug: "dr-adrian",
    muestrario: true,
    preview: {
      mp4: "/previews/dr-adrian-960.mp4",
      webm: "/previews/dr-adrian-960.webm",
      poster: "/previews/dr-adrian-poster.jpg",
    },
    name: "Portafolio Dr. Adrián",
    tipo: "Web",
    tag: "Concepto · portafolio médico",
    desc: "Demo de portafolio para un especialista médico: una carta de presentación en línea que reúne perfil profesional, servicios y datos de contacto.",
    rol: "Concepto, diseño y desarrollo",
    resultado: "Diseño responsive y limpio, desplegado en Vercel.",
    stack: ["React", "Tailwind", "Vercel", "Responsive"],
    demo: "https://portfolio-doctor-app.vercel.app/",
    mark: "DA",
    year: "2026",
    featured: true,
  },
  {
    num: "03",
    slug: "calidoso",
    muestrario: true,
    preview: {
      mp4: "/previews/calidoso-960.mp4",
      webm: "/previews/calidoso-960.webm",
      poster: "/previews/calidoso-poster.jpg",
    },
    name: "Calidoso · Café",
    tipo: "Web",
    tag: "Concepto · e-commerce de café",
    desc: "Demo de tienda en línea para una marca de café: catálogo de producto, presentación de marca e interfaz responsive desplegada en Vercel.",
    rol: "Concepto, diseño y desarrollo",
    resultado:
      "E-commerce enfocado en conversión, con identidad cálida y navegación clara del catálogo.",
    stack: ["React", "Tailwind", "Vercel", "E-commerce"],
    demo: "https://calidoso-test-app.vercel.app/",
    mark: "CA",
    year: "2026",
    featured: true,
  },
  {
    num: "04",
    slug: "vitalis",
    muestrario: true,
    preview: {
      mp4: "/previews/vitalis-960.mp4",
      webm: "/previews/vitalis-960.webm",
      poster: "/previews/vitalis-poster.jpg",
    },
    name: "Vitalis · Consultorio",
    tipo: "Web",
    tag: "Concepto · consultorio médico",
    desc: "Demo de sitio para un consultorio médico: presentación institucional de servicios de salud con interfaz responsive, desplegada en Vercel.",
    rol: "Concepto, diseño y desarrollo",
    resultado:
      "Estructura pensada para comunicar los servicios, generar confianza y facilitar el contacto de los pacientes.",
    stack: ["React", "Tailwind", "Vercel", "Responsive"],
    demo: "https://vitalis-muestreo-app.vercel.app/",
    mark: "VC",
    year: "2026",
    featured: true,
  },
  {
    num: "05",
    slug: "eco-muestreo",
    muestrario: true,
    preview: {
      mp4: "/previews/eco-muestreo-960.mp4",
      webm: "/previews/eco-muestreo-960.webm",
      poster: "/previews/eco-muestreo-poster.jpg",
    },
    name: "Eco Muestreo · Joyería",
    tipo: "Web",
    tag: "Concepto · joyería artesanal",
    desc: "Demo de tienda en línea para una joyería artesanal: catálogo de piezas, presentación de marca e interfaz responsive desplegada en Vercel.",
    rol: "Concepto, diseño y desarrollo",
    resultado:
      "E-commerce con estética artesanal, pensado para resaltar cada pieza y facilitar la compra.",
    stack: ["React", "Tailwind", "Vercel", "E-commerce"],
    demo: "https://eco-muestreo-app-t4p3.vercel.app/",
    mark: "EM",
    year: "2026",
    featured: true,
  },
  {
    num: "06",
    slug: "hotel-marea",
    muestrario: true,
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
    num: "07",
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
  },
  {
    num: "08",
    slug: "integracion-ia",
    preview: {
      mp4: "/previews/integracion-ia-960.mp4",
      webm: "/previews/integracion-ia-960.webm",
      poster: "/previews/integracion-ia-poster.jpg",
    },
    name: "Integración de IA",
    tipo: "Chat-bot",
    tag: "Tecnologías META",
    desc: "Ejercicio de chat-bot de atención sobre tecnologías META, planteado alrededor de un caso de consultorio: manejo de tokens y entrenamiento acotado a un guion.",
    rol: "Concepto, integración y entrenamiento",
    resultado:
      "Flujo de conversación completo sobre un guion cerrado, con manejo de tokens y respuestas entrenadas para un dominio concreto.",
    stack: ["IA", "META", "Tokens", "Prompting"],
    mark: "IA",
    year: "2025",
  },
  {
    num: "09",
    slug: "crud-clientes",
    preview: {
      mp4: "/previews/crud-clientes-960.mp4",
      webm: "/previews/crud-clientes-960.webm",
      poster: "/previews/crud-clientes-poster.jpg",
    },
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
/** Los seis navegables: lo que corre dentro de la tableta de la portada. */
export const muestrario = projects.filter((p) => p.muestrario);

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
