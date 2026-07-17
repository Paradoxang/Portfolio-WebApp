import { useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import type { Project } from "@/data/site";

/**
 * Teaser de proyecto: video mudo en loop (GIF convertido a MP4/WebM, ~10×
 * más ligero). Con prefers-reduced-motion muestra solo el poster estático.
 * `preload="none"` + poster: el video pesa solo cuando llega a reproducirse.
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

  // Autoplay programático: más fiable que el atributo tras hidratación SSG.
  useEffect(() => {
    if (reduced) return;
    ref.current?.play().catch(() => {
      /* autoplay bloqueado: se queda el poster */
    });
  }, [reduced]);

  if (reduced) {
    return (
      <img
        src={preview.poster}
        alt={alt}
        loading="lazy"
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
      autoPlay
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
