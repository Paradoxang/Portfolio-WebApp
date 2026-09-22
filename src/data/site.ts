import {
  Server,
  Code2,
  Database,
  GitBranch,
  Wrench,
  Sparkles,
  Briefcase,
  GraduationCap,
  LayoutTemplate,
  Bot,
  Search,
  Shield,
  ShieldCheck,
  Lock,
  Globe,
  KeyRound,
  Monitor,
  CalendarCheck,
  Radar,
  Rocket,
  RefreshCw,
  LineChart,
  type LucideIcon,
} from "lucide-react";
import type {
  PlanId,
  ProjectSlug,
  ProjectType,
  ServiceId,
  SkillGroupId,
  TimelineId,
} from "@/content/types";
import type { RouteKey } from "@/i18n/locales";
import type { AnchorKey } from "@/content/types";

/**
 * Datos NEUTROS del sitio: lo que no cambia con el idioma.
 *
 * Iconos, rutas de assets, colores, slugs, stack, enlaces. Todo el texto que
 * un visitante lee vive en `src/content/{es,en}.ts`, indexado por las mismas
 * claves (`ServiceId`, `PlanId`, `ProjectSlug`…) que aparecen aquí. Un
 * componente junta las dos mitades por clave.
 */

/* ── Contacto ── */
export const contact = {
  email: "santiago.miranda.trabajo@gmail.com",
  phone: "+57 318 981 9384",
  phoneHref: "tel:+573189819384",
  /** Solo el número: el mensaje lo pone cada idioma. */
  whatsappNumber: "573189819384",
  instagram: "https://instagram.com/paradoxxan",
  instagramHandle: "@paradoxxan",
  github: "https://github.com/Paradoxang",
  githubHandle: "Paradoxang",
  facebook: "https://www.facebook.com/profile.php?id=61591547326067",
  domain: "doxdesigns.dev",
  /** Coordenadas de Cali, para los datos estructurados de negocio local. */
  geo: { lat: 3.4516, lng: -76.532 },
};

/** Enlace de WhatsApp con el texto ya codificado. */
export function whatsappUrl(text: string): string {
  return `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

/* ── What I do ──
   Cada servicio lleva su tarjeta: la variante decide el degradado y el objeto
   3D que sangra por la esquina. `icon` se conserva porque la página de
   servicios sigue usándolo en su propio listado. */
export type VarianteWdid = "modulo" | "astrolabio" | "cristal" | "vela";

export interface ServiceBase {
  id: ServiceId;
  icon: LucideIcon;
  variante: VarianteWdid;
  objeto: string;
  /** Punto del degradado que le toca al punto de la etiqueta. */
  color: string;
  /** A dónde lleva el CTA de la tarjeta. */
  href: { route: RouteKey; anchor?: AnchorKey };
}
export const services: ServiceBase[] = [
  { id: "seo", icon: Search, variante: "modulo", objeto: "wdid_01_modulo", color: "#F0A868", href: { route: "plans" } },
  { id: "ai", icon: Bot, variante: "astrolabio", objeto: "wdid_02_astrolabio", color: "#E7DCFF", href: { route: "plans" } },
  { id: "convert", icon: LayoutTemplate, variante: "cristal", objeto: "wdid_03_cristal", color: "#8FA2FF", href: { route: "projects" } },
  { id: "protect", icon: Shield, variante: "vela", objeto: "wdid_04_vela", color: "#FFB39C", href: { route: "home", anchor: "shield" } },
];

/* ── Planes de vuelo ──
   350.000 / 690.000 / 1.150.000 COP al mes (99 / 199 / 329 USD en inglés). Es
   una escalera de entrada deliberadamente baja: el salto Base→Crecimiento es
   x2 y el de Crecimiento→Blindaje x1.7, que es el reparto que hace que el del
   medio se lea como el razonable y no como el caro. Los precios viven en el
   contenido de cada idioma; aquí solo el orden y cuál se destaca. */
export interface PlanBase {
  id: PlanId;
  /** El del medio: el que se quiere vender. */
  destacado?: boolean;
}
export const planes: PlanBase[] = [{ id: "base" }, { id: "growth", destacado: true }, { id: "shield" }];

/* ── Iconos de las páginas interiores ── */
export const securityIcons: LucideIcon[] = [ShieldCheck, Lock, Globe, KeyRound];
export const frontIcons: LucideIcon[] = [Search, Bot, CalendarCheck, ShieldCheck];
export const cycleIcons: LucideIcon[] = [Radar, Rocket, RefreshCw, LineChart];

/* ── Proyectos ── */
export interface Project {
  slug: ProjectSlug;
  /** Entra en el carrusel del muestrario de la portada.
      El criterio es uno solo: **¿se puede entrar y moverse por él?** El
      argumento de la sección es "míralo funcionando", así que un caso sin
      enlace vivo no pinta nada ahí. */
  muestrario?: boolean;
  num: string;
  tipo: ProjectType;
  stack: string[];
  link?: string;
  demo?: string;
  mark: string;
  year: string;
  featured?: boolean;
  /** Teaser en video (GIF convertido a MP4/WebM) + poster estático. */
  preview?: { mp4: string; webm: string; poster: string };
  /** Aspect ratio del preview en la cover grande. Por defecto panorámico
   * 1896/888 — solo se pisa si el video de origen no lo es. */
  previewAspect?: string;
}

const preview = (slug: string) => ({
  mp4: `/previews/${slug}-960.mp4`,
  webm: `/previews/${slug}-960.webm`,
  poster: `/previews/${slug}-poster.jpg`,
});

export const projects: Project[] = [
  { num: "01", slug: "gem-eyes", muestrario: true, preview: preview("gem-eyes"), tipo: "web", stack: ["React", "Tailwind", "Vite", "Vercel"], demo: "https://gem-eyes-web-app.vercel.app/", mark: "GE", year: "2026", featured: true },
  { num: "02", slug: "dr-adrian", muestrario: true, preview: preview("dr-adrian"), tipo: "web", stack: ["React", "Tailwind", "Vercel", "Responsive"], demo: "https://portfolio-doctor-app.vercel.app/", mark: "DA", year: "2026", featured: true },
  { num: "03", slug: "calidoso", muestrario: true, preview: preview("calidoso"), tipo: "web", stack: ["React", "Tailwind", "Vercel", "E-commerce"], demo: "https://calidoso-test-app.vercel.app/", mark: "CA", year: "2026", featured: true },
  { num: "04", slug: "vitalis", muestrario: true, preview: preview("vitalis"), tipo: "web", stack: ["React", "Tailwind", "Vercel", "Responsive"], demo: "https://vitalis-muestreo-app.vercel.app/", mark: "VC", year: "2026", featured: true },
  { num: "05", slug: "eco-muestreo", muestrario: true, preview: preview("eco-muestreo"), tipo: "web", stack: ["React", "Tailwind", "Vercel", "E-commerce"], demo: "https://eco-muestreo-app-t4p3.vercel.app/", mark: "EM", year: "2026", featured: true },
  { num: "06", slug: "hotel-marea", muestrario: true, preview: preview("hotel-marea"), tipo: "fullstack", stack: ["Next.js", "TypeScript", "Drizzle ORM", "Vercel"], link: "https://github.com/Paradoxang/hotelmarea-muestreo-app", demo: "https://hotelmarea-muestreo-app.vercel.app", mark: "HM", year: "2026", featured: true },
  { num: "07", slug: "aurora", preview: preview("aurora"), tipo: "frontend", stack: ["React", "Tailwind", "Vite", "Adaptive video"], link: "https://github.com/Paradoxang/TestWeb1Animated", demo: "https://test-web1-animated12354.vercel.app", mark: "AV", year: "2026" },
  { num: "08", slug: "integracion-ia", preview: preview("integracion-ia"), tipo: "chatbot", stack: ["IA", "META", "Tokens", "Prompting"], mark: "IA", year: "2025" },
  { num: "09", slug: "crud-clientes", preview: preview("crud-clientes"), tipo: "fullstack", stack: [".NET 8", "Angular", "EF Core 8", "SQL Server", "Swagger"], link: "https://github.com/Paradoxang/CRUDclientes", mark: "CC", year: "2025" },
];

/** Los seis navegables: lo que corre dentro de la tableta de la portada. */
export const muestrario = projects.filter((p) => p.muestrario);

export const tipoIcons: Record<ProjectType, LucideIcon> = {
  frontend: LayoutTemplate,
  fullstack: Server,
  web: Globe,
  chatbot: Bot,
};
/** Por si algún día vuelve un proyecto de escritorio. */
export const desktopIcon: LucideIcon = Monitor;

/* ── Sobre mí ── */
export const skillGroups: { id: SkillGroupId; icon: LucideIcon }[] = [
  { id: "backend", icon: Server },
  { id: "frontend", icon: Code2 },
  { id: "db", icon: Database },
  { id: "git", icon: GitBranch },
  { id: "tools", icon: Wrench },
  { id: "soft", icon: Sparkles },
];

export const timeline: { id: TimelineId; icon: LucideIcon }[] = [
  { id: "dispatcher", icon: Briefcase },
  { id: "degree", icon: GraduationCap },
  { id: "school", icon: GraduationCap },
];

export const collage = [
  { src: "/foto-1.webp", ratio: "950 / 1416" },
  { src: "/foto-3.webp", ratio: "950 / 1179" },
  { src: "/foto-4.webp", ratio: "950 / 1424" },
];
