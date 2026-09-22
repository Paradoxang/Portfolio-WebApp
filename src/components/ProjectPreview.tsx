import { useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { Project } from "@/data/site";

/**
 * Teaser de proyecto: video mudo en loop (GIF convertido a MP4/WebM, ~10×
 * más ligero). Con prefers-reduced-motion muestra solo el poster estático.
 *
 * Solo se reproduce mientras está en pantalla: en la página de proyectos hay
 * nueve, y nueve decodificadores a la vez —la mayoría fuera de vista— se
 * notaban en el scroll. `preload="metadata"` + poster: el archivo pesa solo
 * cuando llega a reproducirse.
 */
export function ProjectPreview({
  preview,
  alt,
  className = "",
}: {
  preview: NonNullable<Project["preview"]>;
  alt: string;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLVideoElement>(null);
  const [enPantalla, setEnPantalla] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v || reduced) return;
    const io = new IntersectionObserver(([e]) => setEnPantalla(e.isIntersecting), {
      threshold: 0,
      rootMargin: "120px 0px",
    });
    io.observe(v);
    return () => io.disconnect();
  }, [reduced]);

  // Autoplay programático: más fiable que el atributo tras hidratación SSG.
  useEffect(() => {
    const v = ref.current;
    if (!v || reduced) return;
    if (enPantalla) {
      v.play().catch(() => {
        /* autoplay bloqueado: se queda el poster */
      });
    } else {
      v.pause();
    }
  }, [enPantalla, reduced]);

  if (reduced) {
    return (
      <img
        src={preview.poster}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={`h-full w-full object-cover ${className}`}
      />
    );
  }

  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      preload="metadata"
      poster={preview.poster}
      aria-label={alt}
      className={`h-full w-full object-cover ${className}`}
    >
      <source src={preview.webm} type="video/webm" />
      <source src={preview.mp4} type="video/mp4" />
    </video>
  );
}
