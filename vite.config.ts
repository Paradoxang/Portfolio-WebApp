import path from "path";
import fs from "node:fs";
import crypto from "node:crypto";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import type {} from "vite-react-ssg"; // augments UserConfig with `ssgOptions`
import {
  LOCALES,
  ROUTE_KEYS,
  SITE_URL,
  pathFor,
  urlFor,
  type Locale,
  type RouteKey,
} from "./src/i18n/locales";
import { es } from "./src/content/es";
import { en } from "./src/content/en";

const CONTENIDO = { es, en } as const;

/** Recorre `dist/` entero: las páginas en inglés viven en `dist/en/`. */
function htmlsDe(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const ruta = path.join(dir, e.name);
    if (e.isDirectory()) return htmlsDe(ruta);
    return e.name.endsWith(".html") ? [ruta] : [];
  });
}

/**
 * `sitemap.xml` con las dos versiones de cada página enlazadas entre sí
 * (`xhtml:link rel="alternate"`), que es como Google quiere saber que
 * `/planes` y `/en/plans` son la misma página en dos idiomas.
 */
function sitemap(): string {
  const hoy = new Date().toISOString().slice(0, 10);
  const prioridad: Record<RouteKey, string> = {
    home: "1.0",
    plans: "0.9",
    services: "0.9",
    security: "0.8",
    projects: "0.8",
    about: "0.6",
    contact: "0.7",
    privacy: "0.2",
  };
  const urls = LOCALES.flatMap((l: Locale) =>
    ROUTE_KEYS.map((k) => {
      const alternos = [
        ...LOCALES.map((a) => `    <xhtml:link rel="alternate" hreflang="${a}" href="${urlFor(a, k)}"/>`),
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${urlFor("es", k)}"/>`,
      ].join("\n");
      return [
        "  <url>",
        `    <loc>${urlFor(l, k)}</loc>`,
        `    <lastmod>${hoy}</lastmod>`,
        `    <changefreq>${k === "privacy" ? "yearly" : "monthly"}</changefreq>`,
        `    <priority>${prioridad[k]}</priority>`,
        alternos,
        "  </url>",
      ].join("\n");
    })
  );
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...urls,
    "</urlset>",
    "",
  ].join("\n");
}

/**
 * `llms.txt`: el resumen del sitio para los modelos de lenguaje, en los dos
 * idiomas y con los enlaces de cada página. Sale del mismo contenido que las
 * páginas, así que no se desactualiza solo.
 */
function llms(): string {
  const bloque = (l: Locale) => {
    const t = CONTENIDO[l];
    return [
      `## ${t.meta.langName}`,
      "",
      t.llms.summary,
      "",
      ...ROUTE_KEYS.map((k) => `- [${t.routes[k].label}](${urlFor(l, k)}): ${t.llms.pages[k]}`),
      "",
    ].join("\n");
  };
  return [
    "# Dox Designs · Santiago Miranda",
    "",
    `> ${SITE_URL} — diseño y desarrollo web a medida, Cali (Colombia) y remoto. Español e inglés.`,
    "",
    bloque("es"),
    bloque("en"),
    "## Contact",
    "",
    "- WhatsApp: +57 318 981 9384",
    "- Email: santiago.miranda.trabajo@gmail.com",
    "- GitHub: https://github.com/Paradoxang",
    "",
  ].join("\n");
}

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    watch: {
      // Don't watch heavy source images sitting in the project root.
      // They are large/locked and crash the file watcher (EBUSY); the
      // optimized assets actually used by the app live in /public as .webp.
      ignored: ["**/*.png", "**/*.jpg", "**/*.jpeg"],
    },
  },
  ssgOptions: {
    /* Las rutas a prerenderizar salen del mismo mapa de idiomas que usa la
       app: las siete páginas en los dos idiomas. */
    includedRoutes: () => LOCALES.flatMap((l) => ROUTE_KEYS.map((k) => pathFor(l, k))),

    onFinished(dir: string) {
      /* Externaliza los <script> inline del bootstrap de vite-react-ssg a
         ficheros hasheados, para que la CSP de producción pueda ser
         `script-src 'self'` sin 'unsafe-inline' ni hashes por build. JSON-LD y
         los scripts con `type` no se tocan. Recursivo: las páginas en inglés
         están en `dist/en/`, y una que se quedara con el script inline la
         bloquearía la CSP entera. */
      for (const filePath of htmlsDe(dir)) {
        const html = fs.readFileSync(filePath, "utf8");
        const out = html.replace(
          /<script>([\s\S]*?)<\/script>/g,
          (_m, code: string) => {
            const hash = crypto.createHash("sha256").update(code).digest("hex").slice(0, 16);
            const name = `ssg-boot-${hash}.js`;
            fs.writeFileSync(path.join(dir, name), code);
            return `<script src="/${name}"></script>`;
          }
        );
        if (out !== html) fs.writeFileSync(filePath, out);
      }

      fs.writeFileSync(path.join(dir, "sitemap.xml"), sitemap());
      fs.writeFileSync(path.join(dir, "llms.txt"), llms());
    },
  },
});
