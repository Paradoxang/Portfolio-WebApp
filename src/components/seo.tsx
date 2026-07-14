import { useEffect } from "react";
import { Head } from "vite-react-ssg";

const SITE = "https://doxdesigns.dev";

interface SeoProps {
  /** Page title (also used for og:title / twitter:title). */
  title: string;
  /** Meta description (also used for og:description / twitter:description). */
  description: string;
  /** Path starting with "/" — used for canonical and og:url. */
  path: string;
}

/**
 * Per-route document head. Overrides the title/description/canonical/og:url that
 * change between pages; the shared tags (favicon, og:image, locale, JSON-LD, …)
 * live in index.html.
 */
export function Seo({ title, description, path }: SeoProps) {
  const url = SITE + path;
  // Head (react-helmet-async) covers the prerendered HTML & crawlers; this guarantees
  // the tab title also updates on client-side (SPA) navigation.
  useEffect(() => {
    document.title = title;
  }, [title]);
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Head>
  );
}
