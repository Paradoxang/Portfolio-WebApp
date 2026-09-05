import { useEffect, useState } from "react";
import { Reveal } from "@/lib/anim";
import { SectionHeading } from "@/components/SectionHeading";
import { Constellation } from "@/components/Cosmic";
import { VisorLoop } from "@/components/VisorLoop";
import { WdidCard } from "@/components/WdidCard";
import { services } from "@/data/site";

/**
 * "What I Do".
 *
 * Dos composiciones distintas, no una responsive:
 *
 *  · De 768 px en adelante, el astronauta y una rejilla de dos por dos, con
 *    aire generoso entre el titular, la animación y las tarjetas.
 *
 *  · Por debajo, el astronauta pasa a ser el fondo y las cuatro tarjetas se
 *    superponen encima en desorden, cada una con su desplazamiento, su giro y
 *    su profundidad, flotando con duraciones distintas.
 *
 * El corte se resuelve en JS y no con clases responsive porque las dos ramas
 * son estructuralmente distintas: en móvil el astronauta va posicionado dentro
 * de la composición, y montar los dos árboles a la vez duplicaría el bucle de
 * cuatro imágenes grandes.
 */

/** Desorden de la composición móvil. Punto de partida del brief. */
const DESORDEN = [
  { dx: -6, giro: -4, z: 3 },
  { dx: 8, giro: 3, z: 4 },
  { dx: -4, giro: 5, z: 2 },
  { dx: 6, giro: -2, z: 1 },
];

function useEsMovil() {
  const [movil, setMovil] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const leer = () => setMovil(mq.matches);
    leer();
    mq.addEventListener("change", leer);
    return () => mq.removeEventListener("change", leer);
  }, []);
  return movil;
}

export function Services() {
  const movil = useEsMovil();

  return (
    /* Más ancha que el resto del sitio a propósito: aquí el bloque tiene que
       abrirse hasta cerca de los bordes —tarjetas y titular a la izquierda,
       astronauta a la derecha— conservando una sangría real, que es lo que
       hace el padding en `clamp`. El tope de 1600 evita que en pantallas muy
       anchas la composición se despegue de sí misma. */
    <section className="wdid-sec relative mx-auto w-full max-w-[1600px] overflow-hidden px-[clamp(1.5rem,5vw,5rem)] [padding-block:clamp(6rem,12vh,11rem)]">
      <Constellation className="absolute right-4 top-16 hidden h-[150px] w-[200px] opacity-70 md:block" />
      <SectionHeading kicker="01 — Qué hago" title="What I Do" />

      {movil ? (
        /* ── Móvil: las tarjetas encima del astronauta ──
           El aire se traslada a los extremos: por dentro la composición está
           apretada a propósito, pero respira por arriba y por abajo. */
        <div className="wdid-comp [margin-block:clamp(3rem,8vh,6rem)]">
          <VisorLoop className="wdid-comp__fondo" />
          <div className="wdid-pila">
            {services.map((s, i) => (
              <WdidCard
                key={s.title}
                variante={s.variante}
                objeto={s.objeto}
                etiqueta={s.etiqueta}
                color={s.color}
                title={s.title}
                desc={s.desc}
                cta={s.cta}
                href={s.href}
                flotante
                dx={DESORDEN[i].dx}
                giro={DESORDEN[i].giro}
                z={DESORDEN[i].z}
                indice={i}
              />
            ))}
          </div>
        </div>
      ) : (
        /* Tarjetas a la izquierda en cuadro 2x2, astronauta a la derecha. El
           aire del brief se reparte: vertical respecto al titular y horizontal
           entre las dos columnas, que es donde se nota con este reparto. */
        <div className="grid items-center gap-x-[clamp(3rem,7vw,7rem)] gap-y-16 [margin-top:clamp(4rem,9vh,8rem)] lg:grid-cols-[1.4fr_1fr]">
          <div className="grid gap-5 sm:grid-cols-2 lg:gap-6">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.08}>
                <WdidCard
                  variante={s.variante}
                  objeto={s.objeto}
                  etiqueta={s.etiqueta}
                  color={s.color}
                  title={s.title}
                  desc={s.desc}
                  cta={s.cta}
                  href={s.href}
                />
              </Reveal>
            ))}
          </div>

          <div className="flex justify-center lg:justify-end">
            <VisorLoop />
          </div>
        </div>
      )}
    </section>
  );
}
