/**
 * Idiomas y rutas del sitio.
 *
 * Este módulo es DATO PURO —sin React, sin DOM— a propósito: lo importan el
 * cliente, el prerender y `vite.config.ts` (que genera el sitemap y el
 * `llms.txt` desde aquí). Cualquier cosa que sepa de ventanas o de componentes
 * vive en `LocaleContext.tsx`.
 *
 * ── Por qué prefijo de ruta y no un conmutador ──
 * El sitio se prerenderiza y vive de Google. Un conmutador en cliente dejaría
 * el inglés invisible para los buscadores y para las IA; con `/en/*` cada
 * idioma tiene su HTML, su canonical y su `hreflang`, que es lo único que
 * Google acepta como "esta página existe en dos idiomas".
 *
 * El español no lleva prefijo: son las URLs que ya están indexadas y
 * compartidas, y no se tocan.
 */

export type Locale = "es" | "en";

export const LOCALES: readonly Locale[] = ["es", "en"] as const;
export const DEFAULT_LOCALE: Locale = "es";

export const SITE_URL = "https://doxdesigns.dev";

/** Las páginas del sitio, por clave estable. Los slugs cambian por idioma. */
export type RouteKey =
  | "home"
  | "plans"
  | "services"
  | "security"
  | "projects"
  | "about"
  | "contact"
  | "privacy";

export const ROUTE_KEYS: readonly RouteKey[] = [
  "home",
  "plans",
  "services",
  "security",
  "projects",
  "about",
  "contact",
  "privacy",
] as const;

export const ROUTE_SLUGS: Record<Locale, Record<RouteKey, string>> = {
  es: {
    home: "",
    plans: "planes",
    services: "servicios",
    security: "seguridad",
    projects: "proyectos",
    about: "sobre-mi",
    contact: "contacto",
    privacy: "privacidad",
  },
  en: {
    home: "",
    plans: "plans",
    services: "services",
    security: "security",
    projects: "projects",
    about: "about",
    contact: "contact",
    privacy: "privacy",
  },
};

export function localePrefix(locale: Locale): string {
  return locale === DEFAULT_LOCALE ? "" : `/${locale}`;
}

/** Ruta absoluta (sin dominio) de una página en un idioma, con ancla opcional. */
export function pathFor(locale: Locale, key: RouteKey, hash?: string): string {
  const slug = ROUTE_SLUGS[locale][key];
  const base = `${localePrefix(locale)}/${slug}`.replace(/\/+$/, "") || "/";
  return hash ? `${base}#${hash}` : base;
}

/** URL completa, para canonical, hreflang, sitemap y datos estructurados. */
export function urlFor(locale: Locale, key: RouteKey): string {
  return SITE_URL + pathFor(locale, key);
}

/** Resuelve una ruta a su idioma y su clave. `null` si no es una página del sitio. */
export function routeFromPath(
  pathname: string
): { locale: Locale; key: RouteKey } | null {
  const limpio = pathname.replace(/\/+$/, "") || "/";
  for (const locale of LOCALES) {
    const prefijo = localePrefix(locale);
    if (prefijo && limpio !== prefijo && !limpio.startsWith(`${prefijo}/`)) continue;
    if (!prefijo && limpio.startsWith("/en/")) continue;
    if (!prefijo && limpio === "/en") continue;
    const resto = limpio === prefijo || limpio === "/" ? "" : limpio.slice(prefijo.length + 1);
    for (const key of ROUTE_KEYS) {
      if (ROUTE_SLUGS[locale][key] === resto) return { locale, key };
    }
  }
  return null;
}

/** Idioma de una ruta, aunque no sea una página conocida. */
export function localeFromPath(pathname: string): Locale {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "es";
}

/** Todas las rutas prerenderizables, en los dos idiomas. */
export function allPaths(): string[] {
  return LOCALES.flatMap((l) => ROUTE_KEYS.map((k) => pathFor(l, k)));
}
