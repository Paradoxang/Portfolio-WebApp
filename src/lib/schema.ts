import type { Content, Faq, PlanId } from "@/content/types";
import { contact, planes, projects } from "@/data/site";
import { SITE_URL, urlFor, type Locale, type RouteKey } from "@/i18n/locales";

/**
 * Datos estructurados (Schema.org) del sitio.
 *
 * Todo lo que Google y las IA leen y el visitante no. Los `@id` son estables
 * y compartidos entre idiomas: `#business`, `#santiago` y `#website` son la
 * misma entidad en español y en inglés; solo cambian `inLanguage` y los
 * textos. Cada función devuelve un objeto plano listo para `JSON.stringify`.
 */

export const IDS = {
  business: `${SITE_URL}/#business`,
  person: `${SITE_URL}/#santiago`,
  website: `${SITE_URL}/#website`,
} as const;

const OG_IMAGE = `${SITE_URL}/og-image.jpg`;
const LOGO = `${SITE_URL}/favicon-512.png`;

const sameAs = [contact.github, contact.instagram, contact.facebook];

/** El grafo común: negocio, persona y sitio, en el idioma de la página. */
export function siteGraph(t: Content, locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": IDS.business,
        name: "Dox Designs",
        alternateName: "Dox Designs — Santiago Miranda",
        description: t.schema.businessDescription,
        url: urlFor(locale, "home"),
        image: OG_IMAGE,
        logo: LOGO,
        email: contact.email,
        telephone: "+57-318-981-9384",
        priceRange: "$$",
        currenciesAccepted: "COP, USD",
        founder: { "@id": IDS.person },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Cali",
          addressRegion: "Valle del Cauca",
          addressCountry: "CO",
        },
        geo: { "@type": "GeoCoordinates", latitude: contact.geo.lat, longitude: contact.geo.lng },
        areaServed:
          locale === "es"
            ? [
                { "@type": "City", name: "Cali" },
                { "@type": "Country", name: "Colombia" },
              ]
            : [
                { "@type": "Country", name: "Colombia" },
                { "@type": "Country", name: "United States" },
                { "@type": "Place", name: "Worldwide (remote)" },
              ],
        knowsLanguage: ["es", "en"],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: t.schema.catalogName,
          itemListElement: t.schema.offers.map((o) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: o.name, description: o.description },
          })),
        },
        sameAs,
      },
      {
        "@type": "Person",
        "@id": IDS.person,
        name: "Santiago Miranda",
        alternateName: "Santiago Alejandro Miranda Ortiz",
        url: urlFor(locale, "about"),
        image: OG_IMAGE,
        jobTitle: t.schema.jobTitle,
        worksFor: { "@id": IDS.business },
        address: { "@type": "PostalAddress", addressLocality: "Cali", addressCountry: "CO" },
        knowsAbout: t.schema.knowsAbout,
        knowsLanguage: ["es", "en"],
        alumniOf: { "@type": "CollegeOrUniversity", name: t.schema.university },
        hasCredential: [
          {
            "@type": "EducationalOccupationalCredential",
            credentialCategory: "degree",
            name: t.schema.degree,
          },
          {
            "@type": "EducationalOccupationalCredential",
            credentialCategory: "specialization",
            name: t.schema.credential,
          },
        ],
        sameAs,
      },
      {
        "@type": "WebSite",
        "@id": IDS.website,
        url: urlFor(locale, "home"),
        name: "Dox Designs — Santiago Miranda",
        inLanguage: t.meta.htmlLang,
        publisher: { "@id": IDS.business },
      },
    ],
  };
}

/** Migas: Inicio → página. En la portada, solo Inicio. */
export function breadcrumbs(t: Content, locale: Locale, route: RouteKey) {
  const items = [{ name: t.a11y.breadcrumbHome, item: urlFor(locale, "home") }];
  if (route !== "home") items.push({ name: t.routes[route].label, item: urlFor(locale, route) });
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.item,
    })),
  };
}

/** La página en sí, con sus migas y su idioma. */
export function webPage(
  t: Content,
  locale: Locale,
  route: RouteKey,
  { title, description, type = "WebPage" }: { title: string; description: string; type?: string }
) {
  const url = urlFor(locale, route);
  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name: title,
    description,
    inLanguage: t.meta.htmlLang,
    isPartOf: { "@id": IDS.website },
    about: { "@id": IDS.business },
    primaryImageOfPage: OG_IMAGE,
    breadcrumb: breadcrumbs(t, locale, route),
  };
}

export function faqPage(items: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** "350.000" → 350000; "99" → 99. */
function precioNumerico(s: string): number {
  return Number(s.replace(/[.,\s]/g, ""));
}

/** Los tres planes como servicios con su oferta mensual. */
export function plansSchema(t: Content, locale: Locale) {
  const url = urlFor(locale, "plans");
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${url}#plans`,
    name: t.pages.plans.plansTitle,
    itemListElement: planes.map((p, i) => {
      const plan = t.plans.items[p.id as PlanId];
      return {
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Service",
          name: `${plan.name} — Dox Designs`,
          description: `${t.schema.planDescription(plan.name)} ${plan.includes.join(". ")}.`,
          provider: { "@id": IDS.business },
          serviceType: t.schema.catalogName,
          url: `${url}#${p.id}`,
          offers: {
            "@type": "Offer",
            url: `${url}#${p.id}`,
            price: precioNumerico(plan.price),
            priceCurrency: t.plans.currency,
            availability: "https://schema.org/InStock",
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: precioNumerico(plan.price),
              priceCurrency: t.plans.currency,
              unitCode: "MON",
              billingIncrement: 1,
            },
          },
        },
      };
    }),
  };
}

/** El muestrario como lista de obras, con su demo en vivo. */
export function projectsSchema(t: Content, locale: Locale) {
  const url = urlFor(locale, "projects");
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${url}#projects`,
    name: t.pages.projects.table.caption,
    itemListElement: projects.map((p, i) => {
      const txt = t.pages.projects.items[p.slug];
      return {
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "CreativeWork",
          name: txt.name,
          description: txt.desc,
          url: `${url}#${p.slug}`,
          ...(p.demo ? { sameAs: p.demo } : {}),
          creator: { "@id": IDS.person },
          dateCreated: p.year,
          keywords: p.stack.join(", "),
          genre: t.pages.projects.types[p.tipo],
        },
      };
    }),
  };
}

/** La página de contacto, enlazada al negocio. */
export function contactSchema(t: Content, locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${urlFor(locale, "contact")}#contact`,
    name: t.pages.contact.schemaName,
    url: urlFor(locale, "contact"),
    mainEntity: { "@id": IDS.business },
  };
}
