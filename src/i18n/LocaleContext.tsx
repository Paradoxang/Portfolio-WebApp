import { createContext, useContext, useMemo, type ReactNode } from "react";
import { Link, type LinkProps } from "react-router-dom";
import { es } from "@/content/es";
import { en } from "@/content/en";
import type { AnchorKey, Content } from "@/content/types";
import { whatsappUrl } from "@/data/site";
import { pathFor, type Locale, type RouteKey } from "./locales";

/**
 * El idioma, como contexto de React.
 *
 * Lo pone el `Layout` de cada subárbol de rutas (`/` y `/en`), así que dentro
 * de una página nadie tiene que preguntarse en qué idioma está: `useLocale()`
 * devuelve el contenido, el idioma y un `href()` que ya sabe qué prefijo y qué
 * slug toca. Ningún componente escribe una ruta a mano.
 */

export const CONTENT: Record<Locale, Content> = { es, en };

interface LocaleValue {
  locale: Locale;
  t: Content;
  /** Ruta interna de una página, con ancla opcional (por clave, no literal). */
  href: (key: RouteKey, anchor?: AnchorKey) => string;
  /** Enlace a WhatsApp con el mensaje del idioma; con plan, el mensaje del plan. */
  whatsapp: (plan?: string) => string;
}

const LocaleContext = createContext<LocaleValue | null>(null);

export function LocaleProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  const value = useMemo<LocaleValue>(() => {
    const t = CONTENT[locale];
    return {
      locale,
      t,
      href: (key, anchor) => pathFor(locale, key, anchor ? t.anchors[anchor] : undefined),
      whatsapp: (plan) => whatsappUrl(plan ? t.contact.whatsappPlan(plan) : t.contact.whatsappMessage),
    };
  }, [locale]);
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale(): LocaleValue {
  const v = useContext(LocaleContext);
  if (!v) throw new Error("useLocale fuera de <LocaleProvider>");
  return v;
}

/** Atajo: solo el contenido. */
export function useT(): Content {
  return useLocale().t;
}

/**
 * `<Link>` que apunta a una página por clave. `to` acepta la clave y, si hace
 * falta, `anchor` la sección.
 */
export function L({
  to,
  anchor,
  ...rest
}: Omit<LinkProps, "to"> & { to: RouteKey; anchor?: AnchorKey }) {
  const { href } = useLocale();
  return <Link to={href(to, anchor)} {...rest} />;
}

/**
 * Texto con `**énfasis**`. Cada tramo marcado sale como `<strong>` con la
 * clase que se pida; el resto, tal cual. Es la única marca que admite el
 * contenido, y por eso el analizador es de tres líneas.
 */
export function Rich({
  text,
  strong = "font-bold text-ink",
  as: Strong = "strong",
}: {
  text: string;
  strong?: string;
  as?: "strong" | "span";
}) {
  const partes = text.split("**");
  return (
    <>
      {partes.map((p, i) =>
        i % 2 === 1 ? (
          <Strong key={i} className={strong}>
            {p}
          </Strong>
        ) : (
          p
        )
      )}
    </>
  );
}
