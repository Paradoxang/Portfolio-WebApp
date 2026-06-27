# Portfolio · Santiago Miranda

Portafolio web personal de **Santiago Alejandro Miranda Ortiz** — Ingeniero en
Informática, centrado en el desarrollo de software y con especialización en
Ciberseguridad.

Una single-page app moderna con un **Hero** animado (retrato flotante, título
con gradiente y fondo de partículas interactivo) y una página **Sobre mí** con
secciones de habilidades, proyectos, experiencia, educación y contacto.

## ✨ Características

- **Hero interactivo** — red de partículas en `<canvas>` que reacciona al cursor,
  fondo aurora animado y título "MIRANDA" con texto en gradiente.
- **Sobre mí** — perfil, stack técnico, galería de fotos, línea de tiempo de
  experiencia/educación y logros.
- **Proyectos** — tarjetas con portada generada, stack y enlaces a código /
  demo en vivo.
- **Diseño responsive** y animaciones con Framer Motion.
- Respeta `prefers-reduced-motion`.

## 🛠️ Stack

- [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) (bundler / dev server)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/) (animaciones)
- [React Router](https://reactrouter.com/) (navegación)
- [lucide-react](https://lucide.dev/) (iconos)

## 🚀 Desarrollo

```bash
npm install      # instalar dependencias
npm run dev      # servidor de desarrollo (http://localhost:5173)
npm run build    # build de producción en /dist
npm run preview  # previsualizar el build
```

## ▲ Despliegue en Vercel

El proyecto está listo para Vercel (incluye `vercel.json` con el *rewrite* de SPA
para que las rutas del cliente funcionen al recargar).

1. Entra a [vercel.com/new](https://vercel.com/new) e importa este repositorio.
2. Vercel autodetecta el framework **Vite** — no hay que configurar nada:
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. Pulsa **Deploy**.

## 📁 Estructura

```
src/
├─ components/ui/
│  ├─ hero.tsx                 # Hero de la página de inicio
│  ├─ about.tsx               # Página "Sobre mí"
│  ├─ particles-background.tsx # Fondo de partículas (canvas)
│  └─ project-cover.tsx        # Portadas generadas de proyectos
├─ App.tsx                     # Rutas
├─ main.tsx                    # Punto de entrada
└─ index.css                   # Tema y estilos globales
public/                        # Imágenes (.webp)
```

## 📬 Contacto

- Instagram: [@paradoxxan](https://instagram.com/paradoxxan)
- Email: santiago.miranda.trabajo@gmail.com
- GitHub: [@Paradoxang](https://github.com/Paradoxang)

---

© 2026 Santiago Miranda.
