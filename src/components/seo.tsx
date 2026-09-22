import { Head } from "vite-react-ssg";
import { useLocale } from "@/i18n/LocaleContext";
import { LOCALES, DEFAULT_LOCALE, urlFor, type RouteKey } from "@/i18n/locales";
import { siteGraph, webPage } from "@/lib/schema";

interface SeoProps {
  /** La página, por clave: de ella salen canonical, hreflang y migas. */
  route: RouteKey;
  title: string;
  description: string;
  /** Datos estructurados propios de la página, además de los comunes. */
  jsonLd?: object | object[];
  /** Tipo Schema.org de la página (WebPage por defecto). */
  pageType?: string;
}

/**
 * Cabecera del documento, por ruta e idioma.
 *
 * Lo que cambia entre páginas va aquí; lo compartido (favicons, `og:image`,
 * verificaciones) sigue en `index.html`. Cada página emite:
 *
 *  · `<html lang>` del idioma, que el prerender inyecta en la etiqueta.
 *  · canonical + `hreflang` para cada idioma y `x-default` (el español).
 *  · `og:locale` y su alternativo.
 *  · el grafo Schema.org común (negocio, persona, sitio) en el idioma de la
 *    página, y un `WebPage` con sus migas. Los `@id` son los mismos en los dos
 *    idiomas: es la misma entidad contada en otra lengua.
 *
 * Los JSON-LD van con `type="application/ld+json"`: el paso de build que
 * externaliza los scripts inline los deja en paz y la CSP no los bloquea (no
 * son ejecutables).
 */
export function Seo({ route, title, description, jsonLd, pageType }: SeoProps) {
  const { locale, t } = useLocale();
  const url = urlFor(locale, route);
  const otros = LOCALES.filter((l) => l !== locale);
  const graph = [
    siteGraph(t, locale),
    webPage(t, locale, route, { title, description, type: pageType }),
    ...(jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : []),
  ];

  return (
    <Head>
      <html lang={t.meta.htmlLang} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {LOCALES.map((l) => (
        <link key={l} rel="alternate" hrefLang={l} href={urlFor(l, route)} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={urlFor(DEFAULT_LOCALE, route)} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:locale" content={t.meta.ogLocale} />
      {otros.map((l) => (
        <meta key={l} property="og:locale:alternate" content={l === "es" ? "es_CO" : "en_US"} />
      ))}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {graph.map((g, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(g)}
        </script>
      ))}
    </Head>
  );
}
