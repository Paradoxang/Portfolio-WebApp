import { Link, useLocation } from "react-router-dom";
import { CONTENT, useLocale } from "@/i18n/LocaleContext";
import { pathFor, routeFromPath, type Locale } from "@/i18n/locales";
import type { AnchorKey } from "@/content/types";

/**
 * Conmutador de idioma: lleva a LA MISMA página en el otro idioma, ancla
 * incluida. No es un enlace a la portada del otro idioma — quien está mirando
 * los planes en español quiere los planes en inglés, no volver a empezar.
 *
 * Es un `<Link>` de verdad y no un `<button>` con `navigate()`: así Google lo
 * sigue, funciona sin JS y se puede abrir en otra pestaña.
 */
export function alternatePath(pathname: string, hash: string, to: Locale): string {
  const actual = routeFromPath(pathname);
  if (!actual) return pathFor(to, "home");
  const de = CONTENT[actual.locale].anchors;
  const a = CONTENT[to].anchors;
  const limpio = hash.replace(/^#/, "");
  const clave = (Object.keys(de) as AnchorKey[]).find((k) => de[k] === limpio);
  return pathFor(to, actual.key, clave ? a[clave] : undefined);
}

export function LangSwitch({ className = "" }: { className?: string }) {
  const { locale, t } = useLocale();
  const location = useLocation();
  const otro: Locale = locale === "es" ? "en" : "es";
  const destino = alternatePath(location.pathname, location.hash, otro);

  return (
    <Link
      to={destino}
      hrefLang={otro}
      lang={otro}
      aria-label={t.meta.switchAria}
      className={`lang-switch ${className}`}
    >
      <span className="lang-switch__actual" aria-hidden="true">
        {locale.toUpperCase()}
      </span>
      <span className="lang-switch__sep" aria-hidden="true">
        /
      </span>
      <span className="lang-switch__otro">{otro.toUpperCase()}</span>
    </Link>
  );
}
