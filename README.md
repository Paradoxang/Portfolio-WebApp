# Dox Designs · doxdesigns.dev

Sitio de **Dox Designs**, el estudio de **Santiago Alejandro Miranda Ortiz** —
Ingeniero Informático con especialización en Ciberseguridad, en Cali. Vende
páginas web a medida sostenidas con un plan mensual (posicionamiento local,
presencia en buscadores con IA, telemetría y seguridad).

Es un sitio **estático prerenderizado** (SSG), **bilingüe** (español en la raíz,
inglés bajo `/en/*`) y construido para que lo lean bien tres cosas: las
personas, Google y los modelos de lenguaje.

## Stack

- [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite 5](https://vitejs.dev/) + [vite-react-ssg](https://github.com/Daydreamer-riri/vite-react-ssg) — un HTML por ruta e idioma
- [Tailwind CSS v4](https://tailwindcss.com/) + tokens propios en `src/index.css`
- [Framer Motion](https://www.framer.com/motion/) (entradas, hover, acordeón) · [GSAP](https://gsap.com/) (texto, SVG, física del enjambre, ScrollTrigger) · [Lenis](https://lenis.darkroom.engineering/) (scroll)
- [React Router 6](https://reactrouter.com/) · [lucide-react](https://lucide.dev/)
- Fuentes autoalojadas: Manrope (`@fontsource`) y Kenney Future (`public/fonts`)

## Desarrollo

```bash
npm install      # dependencias
npm run dev      # http://localhost:5173
npm run build    # tsc + prerender de las 16 páginas en /dist (+ sitemap.xml y llms.txt)
npm run preview  # previsualizar /dist
```

## Estructura

```
src/
├─ i18n/
│  ├─ locales.ts        # idiomas, rutas y slugs por idioma (dato puro; lo usa también vite.config)
│  └─ LocaleContext.tsx # useLocale(): t, href(), whatsapp(); <L>, <Rich>
├─ content/
│  ├─ types.ts          # la forma de TODO el texto del sitio
│  ├─ es.ts             # español
│  └─ en.ts             # inglés (adaptado a cliente internacional, precios en USD)
├─ data/site.ts         # datos neutros: iconos, assets, slugs, stack, enlaces
├─ pages/               # Home, Plans, Services, SecurityPage, Projects, About, Contact, Privacy
├─ sections/            # los bloques de la portada (Hero → Cta)
├─ components/          # Nav, Footer, capas de efectos (HeroFx, WdidFx, ProjectsFx…),
│                       # Acordeon, ContactPanel, ContactForm, LangSwitch, seo
├─ lib/
│  ├─ anim.tsx          # Reveal, RevealLine, Counter, Magnetic, Lenis
│  ├─ scroll.ts         # useParallax, useStaggerReveal (GSAP ScrollTrigger)
│  ├─ gsap.ts           # registro único de plugins
│  ├─ schema.ts         # JSON-LD (negocio, persona, páginas, planes, proyectos, FAQ)
│  ├─ analytics.ts      # GA4 + Meta Pixel, sin scripts inline (CSP)
│  └─ perf.ts           # modo ligero (`data-perf`)
├─ App.tsx              # dos subárboles de rutas: `/` (es) y `/en` (en)
└─ index.css            # tema, sistema de botones/chips, efectos, modo ligero
public/                 # assets optimizados (.webp / .mp4 / .webm), fuentes, robots.txt
```

## Idiomas

- El español no lleva prefijo; el inglés vive en `/en/*` con slugs propios
  (`/en/plans`, `/en/services`, `/en/security`, `/en/projects`, `/en/about`,
  `/en/contact`, `/en/privacy`).
- Todo el texto está en `src/content/{es,en}.ts`, tipado por `types.ts`: si
  falta una clave en un idioma, el build falla.
- Los componentes nunca escriben rutas a mano: `href("plans")` o `<L to="plans">`.
  Las anclas de sección también son por idioma (`t.anchors`).
- El énfasis dentro de un texto va con `**así**` y lo pinta `<Rich>`.
- Cada página emite `<html lang>`, canonical, `hreflang` (es / en / x-default)
  y `og:locale`; el conmutador ES/EN lleva a la misma página en el otro idioma.

## SEO y AI SEO

- JSON-LD por página desde `src/lib/schema.ts`: `ProfessionalService` +
  `Person` + `WebSite` (mismos `@id` en ambos idiomas), `WebPage` con migas,
  planes con precio (`UnitPriceSpecification` mensual), `FAQPage`, `ItemList`
  de proyectos, `ContactPage`.
- `sitemap.xml` (con `xhtml:link` alternates) y `llms.txt` se generan en
  `vite.config.ts` a partir del mismo contenido de las páginas.
- `robots.txt` admite explícitamente a los rastreadores de IA.

## Seguridad

`vercel.json` fija CSP estricta (`script-src 'self'` sin `unsafe-inline`),
HSTS con precarga, `X-Frame-Options: DENY`, `Permissions-Policy` cerrada y
COOP. Para que la CSP funcione, el hook `onFinished` del build externaliza los
scripts inline del bootstrap de SSG a ficheros hasheados. La página
`/seguridad` enseña esas mismas cabeceras como prueba.

## Despliegue

Vercel autodetecta Vite (`npm run build` → `dist`). `cleanUrls` sirve
`dist/en/plans.html` en `/en/plans`. Tras desplegar, enviar
`https://doxdesigns.dev/sitemap.xml` en Search Console.

## Contacto

- WhatsApp: +57 318 981 9384
- Email: santiago.miranda.trabajo@gmail.com
- Instagram: [@paradoxxan](https://instagram.com/paradoxxan) · GitHub: [@Paradoxang](https://github.com/Paradoxang)

---

© 2026 Santiago Miranda.
