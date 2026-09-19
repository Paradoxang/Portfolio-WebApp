import { useRef } from "react";
import { gsap, useGSAP, SplitText } from "@/lib/gsap";
import { modoActual } from "@/lib/perf";

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
      /* En modo ligero, el nombre tal cual. El descifrado reescribe el texto
         caracter a caracter en cada fotograma —de lo mas caro que puede hacerse
         sin aceleracion— y si el temporizador se atasca a medias el titular se
         queda en letras sueltas. */
      if (modoActual() === "low") return;

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
    /* `p` y no `h1`: el titular de la portada es ahora la promesa, que va en
       la banda de debajo. El nombre se ve exactamente igual —misma clase,
       mismo descifrado— y solo cambia de rango.
       Las dos líneas siguen ocultas al lector de pantalla porque el scramble
       les reescribe los caracteres fotograma a fotograma; el nombre legible lo
       pone el `sr-only`. */
    <p className="hero-name" ref={ref}>
      <span className="sr-only">Santiago Miranda</span>
      {LINEAS.map((t) => (
        <span key={t} className="hero-name__linea block" aria-hidden="true">
          {t}
        </span>
      ))}
    </p>
  );
}
