import { useRef } from "react";
import { gsap, useGSAP, SplitText } from "@/lib/gsap";

/**
 * El nombre, descifrándose al entrar.
 *
 * `SplitText` parte cada línea en caracteres y cada uno se resuelve con
 * `scrambleText`: en vez de aparecer, el nombre se decodifica. Encaja con la
 * Astro y con la telemetría de los contenedores, que hace lo mismo.
 *
 * El `aria-label` vive en el `h1` y las líneas van ocultas al lector: SplitText
 * reescribe el interior en decenas de `span`, y sin eso un lector de pantalla
 * deletrearía el nombre letra a letra.
 */

const LINEAS = ["SANTIAGO", "MIRANDA"];

export function HeroNombre({ listo }: { listo: boolean }) {
  const ref = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      if (!listo || !ref.current) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const lineas = ref.current.querySelectorAll<HTMLElement>(".hero-name__linea");
      const partes = Array.from(lineas).map(
        (l) => new SplitText(l, { type: "chars" })
      );

      const tl = gsap.timeline();
      partes.forEach((parte, i) => {
        tl.from(
          parte.chars,
          {
            duration: 0.5,
            opacity: 0,
            y: 12,
            stagger: 0.03,
            ease: "power3.out",
          },
          i * 0.22
        ).to(
          parte.chars,
          {
            duration: 0.7,
            stagger: 0.025,
            scrambleText: { text: "{original}", chars: "upperCase", speed: 0.7 },
          },
          i * 0.22
        );
      });

      return () => partes.forEach((p) => p.revert());
    },
    { scope: ref, dependencies: [listo] }
  );

  return (
    <h1 className="hero-name" ref={ref} aria-label="Santiago Miranda">
      {LINEAS.map((t) => (
        <span key={t} className="hero-name__linea block" aria-hidden="true">
          {t}
        </span>
      ))}
    </h1>
  );
}
