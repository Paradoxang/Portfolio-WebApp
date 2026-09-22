import type { Locale, RouteKey } from "@/i18n/locales";

/**
 * La forma de TODO el texto del sitio, en cualquier idioma.
 *
 * Una sola interfaz para los dos ficheros de contenido (`es.ts`, `en.ts`): si
 * a uno le falta una clave, TypeScript lo dice en el build y no un visitante en
 * producción. Aquí no hay iconos, ni rutas de assets, ni colores —eso es dato
 * neutro y vive en `src/data/site.ts`—; solo lo que un traductor tocaría.
 *
 * Los textos con énfasis llevan `**así**`: el componente `Rich` lo convierte
 * en un `<strong>` (o en la clase que se le pida). Es la única marca que se
 * admite dentro de una cadena, y así el contenido sigue siendo texto plano.
 */

export type ServiceId = "seo" | "ai" | "convert" | "protect";
export type PlanId = "base" | "growth" | "shield";
export type ProjectType = "web" | "fullstack" | "frontend" | "chatbot";
export type ProjectSlug =
  | "gem-eyes"
  | "dr-adrian"
  | "calidoso"
  | "vitalis"
  | "eco-muestreo"
  | "hotel-marea"
  | "aurora"
  | "integracion-ia"
  | "crud-clientes";
export type SkillGroupId = "backend" | "frontend" | "db" | "git" | "tools" | "soft";
export type TimelineId = "dispatcher" | "degree" | "school";
export type AnchorKey =
  | "services"
  | "plans"
  | "telemetry"
  | "showcase"
  | "shield"
  | "faq"
  | "contact";

export interface Seo {
  title: string;
  description: string;
}

export interface Faq {
  q: string;
  a: string;
}

export interface FormData {
  name: string;
  business: string;
  plan: string;
  message: string;
}

export interface Content {
  locale: Locale;

  meta: {
    htmlLang: string;
    ogLocale: string;
    siteName: string;
    ogImageAlt: string;
    /** Nombre del idioma, en el propio idioma. */
    langName: string;
    /** Etiqueta del conmutador: el OTRO idioma, en el otro idioma. */
    switchTo: string;
    switchAria: string;
  };

  routes: Record<RouteKey, { label: string }>;
  anchors: Record<AnchorKey, string>;

  contact: {
    location: string;
    whatsappMessage: string;
    whatsappPlan: (plan: string) => string;
    available: string;
    availableShort: string;
    timezone: string;
  };

  nav: {
    links: { key: RouteKey; anchor?: AnchorKey; label: string }[];
    cta: string;
    ctaShort: string;
    open: string;
    close: string;
    navigation: string;
    directContact: string;
    whatsapp: string;
    form: string;
    skip: string;
    language: string;
  };

  footer: {
    tagline: string;
    navigation: string;
    contact: string;
    legal: string;
    rights: string;
    madeBy: string;
    lightMode: { label: string; on: string; off: string };
  };

  hero: {
    kicker: string;
    /** Con `**palabra**` marcando la que lleva el brillo. */
    h1: string;
    ctaPrimary: string;
    ctaSecondary: string;
    credential: string;
    railServices: string;
    railPlans: string;
    railPlansAria: string;
    available: string;
    nameSr: string;
    hud: {
      rows: { key: string; values: string[] }[];
      bracket: string[];
      ticker: string;
    };
  };

  services: {
    kicker: string;
    title: string;
    intro: string;
    items: Record<
      ServiceId,
      { title: string; desc: string; summary: string; label: string; cta: string }
    >;
  };

  plans: {
    kicker: string;
    title: string;
    intro: string;
    currency: string;
    items: Record<
      PlanId,
      { label: string; name: string; who: string; price: string; period: string; includes: string[] }
    >;
    cta: (name: string) => string;
    featuredAria: string;
    founder: { kicker: string; text: string; slots: string; cta: string };
  };

  telemetry: {
    kicker: string;
    title: string;
    intro: string;
    badge: string;
    report: string;
    sample: string;
    metrics: { k: string; value: string; delta?: string }[];
    note: string;
  };

  showcase: {
    kicker: string;
    title: string;
    intro: string;
    cta: string;
    cardAria: (name: string) => string;
  };

  security: {
    kicker: string;
    title: string;
    text: string;
    badge: string;
    practices: { title: string; desc: string }[];
    /** Enlace a la página de seguridad desde la sección de la portada. */
    more: string;
  };

  faq: {
    kicker: string;
    title: string;
    items: Faq[];
  };

  cta: {
    kicker: string;
    title: string;
    whatsapp: string;
    facebook: string;
    mockAlt: string;
  };

  form: {
    kicker: string;
    title: string;
    intro: string;
    name: string;
    business: string;
    plan: string;
    planPlaceholder: string;
    planNone: string;
    message: string;
    messagePlaceholder: string;
    submitWhatsapp: string;
    submitEmail: string;
    note: string;
    subject: string;
    compose: (d: FormData) => string;
    errors: { name: string; message: string };
  };

  pages: {
    home: { seo: Seo };
    plans: {
      seo: Seo;
      word: string;
      kicker: string;
      h1: string;
      intro: string;
      plansKicker: string;
      plansTitle: string;
      telemetryKicker: string;
      faqKicker: string;
    };
    services: {
      seo: Seo;
      word: string;
      kicker: string;
      h1: string;
      intro: string;
      ctaPrimary: string;
      ctaSecondary: string;
      fronts: { title: string; desc: string; includes: string[]; measure: string }[];
      measureLabel: string;
      cycle: {
        kicker: string;
        title: string;
        intro: string;
        steps: { num: string; title: string; desc: string }[];
      };
      security: { title: string; text: string; note: string };
      faq: { kicker: string; title: string; introPre: string; introLink: string; introPost: string; items: Faq[] };
      final: { title: string; text: string; cta: string; secondary: string };
    };
    security: {
      seo: Seo;
      word: string;
      kicker: string;
      h1: string;
      intro: string;
      /** Frase citable: quién, qué, cómo. */
      summary: string;
      pillars: { title: string; desc: string; items: string[] }[];
      proof: {
        kicker: string;
        title: string;
        intro: string;
        headers: { name: string; why: string }[];
        check: string;
        securityTxt: string;
      };
      plans: { kicker: string; title: string; intro: string; tiers: { name: string; items: string[] }[]; cta: string };
      compliance: { kicker: string; title: string; text: string; note: string };
      faq: { kicker: string; title: string; items: Faq[] };
      final: { title: string; text: string; cta: string; secondary: string };
    };
    projects: {
      seo: Seo;
      word: string;
      kicker: string;
      /** Con `**letras**` marcando el tramo que brilla. */
      h1: string;
      intro: string;
      table: { caption: string; num: string; project: string; type: string; stack: string; year: string; featured: string };
      labels: { context: string; role: string; result: string; demo: string; code: string; teaserAlt: (name: string) => string };
      types: Record<ProjectType, string>;
      items: Record<ProjectSlug, { name: string; tag: string; desc: string; role: string; result: string }>;
    };
    about: {
      seo: Seo;
      word: string;
      kicker: string;
      h1: string;
      /** Con `**nombre**` en negrita. */
      bio: string;
      summary: string;
      pills: { english: string; github: string };
      photoAlt: (i: number) => string;
      skills: { kicker: string; title: string; groups: Record<SkillGroupId, { label: string; items: string[] }> };
      timeline: {
        kicker: string;
        title: string;
        items: Record<TimelineId, { kind: string; title: string; place: string; period: string; points: string[] }>;
      };
      achievements: { kicker: string; items: string[] };
      together: { kicker: string; text: string; cta: string };
    };
    contact: {
      seo: Seo;
      kicker: string;
      h1: string;
      intro: string;
      channels: string;
      schemaName: string;
    };
    privacy: {
      seo: Seo;
      kicker: string;
      h1: string;
      updated: string;
      intro: string;
      sections: { title: string; body: string[] }[];
    };
  };

  a11y: {
    visorAlt: string;
    newTab: string;
    breadcrumbHome: string;
    pauseCarousel: string;
  };

  /** Lo que solo leen los buscadores y las IA. */
  schema: {
    businessDescription: string;
    catalogName: string;
    offers: { name: string; description: string }[];
    jobTitle: string;
    knowsAbout: string[];
    credential: string;
    degree: string;
    university: string;
    planDescription: (plan: string) => string;
  };

  /** Resumen citable del sitio, para `llms.txt`. */
  llms: {
    summary: string;
    pages: Record<RouteKey, string>;
  };
}
