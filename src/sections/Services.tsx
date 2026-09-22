import { useCallback, useEffect, useRef, useState } from "react";
import { useMotionValue } from "framer-motion";
import { Reveal } from "@/lib/anim";
import { SectionHeading } from "@/components/SectionHeading";
import { Constellation } from "@/components/Cosmic";
import { VisorLoop } from "@/components/VisorLoop";
import { WdidCard } from "@/components/WdidCard";
import { WdidFx, WdidNebulosa, useTramo } from "@/components/WdidFx";
import { modoActual } from "@/lib/perf";
import { services } from "@/data/site";
import { Rich, useLocale } from "@/i18n/LocaleContext";

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
 *
 * ── El apilado ──
 *   z0 velo lateral · z1 eco del hero · z2 fondos · z3 sueltas
 *   z4 astronauta   · z5 nebulosa     · z6 tarjetas y texto
 *
 * El eco va detrás del astronauta y de las tarjetas porque son ecos, no
 * protagonistas. La nebulosa va por encima de la figura —el efecto es que
 * quede dentro del gas— pero por debajo de las tarjetas, porque en móvil se
 * superponen a la figura y el texto gana siempre.
 */

/**
 * Composición móvil: las cuatro tarjetas rodean al astronauta.
 *
 * Las coordenadas están elegidas para que ninguna entre en la banda del 40 al
 * 65 % de ancho entre el 30 y el 55 % de alto — que es donde cae el visor con
 * el agujero negro. Las profundidades arrancan en 2 para dejar el 0 al
 * astronauta y el 1 a la nebulosa, que van debajo.
 */
const RONDA = [
  { x: 1, y: 3, giro: -4, z: 4 },
  { x: 56, y: 22, giro: 3, z: 5 },
  { x: 4, y: 54, giro: 5, z: 3 },
  { x: 53, y: 70, giro: -2, z: 2 },
];

export function Services() {
  const { t, href } = useLocale();
  const tramo = useTramo();
  const movil = tramo === "movil";
  const ref = useRef<HTMLElement>(null);

  /* Los bucles solo corren con la sección en pantalla.
     Son siete animaciones continuas sobre imágenes grandes; dejarlas corriendo
     mientras el visitante está en otra parte de la página es lo que hacía que
     el scroll se notara pesado. Con 200 px de margen arrancan justo antes de
     entrar, así que nunca se ve el momento en que empiezan. */
  const [enPantalla, setEnPantalla] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let intersecta = false;
    const revisar = () => setEnPantalla(intersecta && !document.hidden);
    const io = new IntersectionObserver(
      ([e]) => {
        intersecta = e.isIntersecting;
        revisar();
      },
      { threshold: 0, rootMargin: "200px 0px" }
    );
    io.observe(el);
    document.addEventListener("visibilitychange", revisar);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", revisar);
    };
  }, []);

  /* ── Ancla del casco ──
     La lente y el velo de nebulosa se centran en el casco del astronauta, y esa
     posición NO es un porcentaje fijo de la sección: las capas gráficas miden
     contra la sección, que va a sangre, mientras la figura vive en la columna
     topada a 1600 px. Se mide en cada cambio de tamaño y se publica como dos
     variables CSS. El 52.9 / 35.1 % es el centroide del casco dentro del
     archivo del visor, que es 1792x2398 y lleva la figura pegada abajo. */
  const anclarCasco = useCallback(() => {
    const sec = ref.current;
    const img = sec?.querySelector<HTMLImageElement>(".visor .visor__f");
    if (!sec || !img) return;
    const sb = sec.getBoundingClientRect();
    const ib = img.getBoundingClientRect();
    if (!sb.width || !ib.width) return;
    // `object-fit: contain` con `object-position: center bottom`
    const esc = Math.min(ib.width / 1792, ib.height / 2398);
    const rw = 1792 * esc;
    const rh = 2398 * esc;
    const cx = ib.left + (ib.width - rw) / 2 + rw * 0.529;
    const cy = ib.top + (ib.height - rh) + rh * 0.351;
    sec.style.setProperty("--casco-x", `${((cx - sb.left) / sb.width) * 100}%`);
    sec.style.setProperty("--casco-y", `${((cy - sb.top) / sb.height) * 100}%`);
  }, []);

  useEffect(() => {
    anclarCasco();
    const sec = ref.current;
    if (!sec) return;
    const ro = new ResizeObserver(anclarCasco);
    ro.observe(sec);
    const img = sec.querySelector(".visor .visor__f");
    if (img) ro.observe(img);
    // La figura entra tras decodificar: sin esto la primera medida sale a cero.
    const t = window.setTimeout(anclarCasco, 600);
    return () => {
      ro.disconnect();
      window.clearTimeout(t);
    };
  }, [anclarCasco, movil]);

  /* Un solo par de motion values para toda la capa gráfica. El listener vive en
     la sección, no en cada pieza: cada una deriva su recorrido de aquí con su
     propia profundidad, y eso es lo que crea la sensación de espacio. */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const onPointer = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      if (e.pointerType !== "mouse" || modoActual() === "low") return;
      const r = ref.current?.getBoundingClientRect();
      if (!r) return;
      mx.set(((e.clientX - r.left) / r.width - 0.5) * 2);
      my.set(((e.clientY - r.top) / r.height - 0.5) * 2);
    },
    [mx, my]
  );

  const tarjetas = services.map((s) => ({ ...s, ...t.services.items[s.id], to: href(s.href.route, s.href.anchor) }));

  return (
    /* La sección va a sangre: sin `max-width`, para que el fondo y la capa
       gráfica lleguen a los dos bordes de la pantalla. El contenido sí se topa
       por dentro, en `.wdid-sec__contenido`. */
    <section
      ref={ref}
      onPointerMove={onPointer}
      id={t.anchors.services}
      aria-labelledby="especialidades-titulo"
      className="wdid-sec relative w-full scroll-mt-24 overflow-hidden px-[clamp(1.5rem,5vw,5rem)] [padding-block:clamp(6rem,12vh,11rem)]"
    >
      <WdidFx mx={mx} my={my} tramo={tramo} corriendo={enPantalla} />

      <Constellation className="absolute right-4 top-16 z-[6] hidden h-[150px] w-[200px] opacity-70 md:block" />

      <div className="wdid-sec__contenido relative mx-auto w-full max-w-[1600px]">
        <div className="relative z-[6]">
          {/* El kicker dice lo mismo que el raíl del hero que trae hasta aquí. */}
          <SectionHeading id="especialidades-titulo" kicker={t.services.kicker} title={t.services.title}>
            <Reveal delay={0.12}>
              <p className="mt-6 max-w-[56ch] text-[15.5px] leading-[1.7] text-mute">
                <Rich text={t.services.intro} />
              </p>
            </Reveal>
          </SectionHeading>
        </div>

        {movil ? (
          /* ── Móvil: las tarjetas encima del astronauta ──
             La nebulosa entra aquí dentro y no en la sección: el bloque aísla
             su propio contexto de apilado. */
          <ul className="wdid-comp relative z-[4] m-0 list-none p-0 [margin-block:clamp(3rem,8vh,6rem)]" role="list">
            <VisorLoop className="wdid-comp__fondo" alt={t.a11y.visorAlt} />
            <WdidNebulosa clase="wdid-fx__nebulosa--movil" corriendo={enPantalla} />
            {tarjetas.map((s, i) => (
              <li
                key={s.id}
                className="wdid-comp__hueco"
                style={{
                  left: `${RONDA[i].x}%`,
                  top: `${RONDA[i].y}%`,
                  zIndex: RONDA[i].z,
                }}
              >
                <WdidCard
                  variante={s.variante}
                  objeto={s.objeto}
                  etiqueta={s.label}
                  color={s.color}
                  title={s.title}
                  desc={s.desc}
                  resumen={s.summary}
                  cta={s.cta}
                  href={s.to}
                  suelta
                  giro={RONDA[i].giro}
                  indice={i}
                />
              </li>
            ))}
          </ul>
        ) : (
          /* Tarjetas a la izquierda en cuadro 2x2, astronauta a la derecha. */
          <div className="grid items-center gap-x-[clamp(3rem,7vw,7rem)] gap-y-16 [margin-top:clamp(4rem,9vh,8rem)] lg:grid-cols-[1.4fr_1fr]">
            <ul className="relative z-[6] m-0 grid list-none gap-5 p-0 sm:grid-cols-2 lg:gap-6" role="list">
              {tarjetas.map((s, i) => (
                <li key={s.id}>
                  <Reveal delay={i * 0.08}>
                    <WdidCard
                      variante={s.variante}
                      objeto={s.objeto}
                      etiqueta={s.label}
                      color={s.color}
                      title={s.title}
                      desc={s.desc}
                      resumen={s.summary}
                      cta={s.cta}
                      href={s.to}
                    />
                  </Reveal>
                </li>
              ))}
            </ul>

            {/* z4: la figura queda por debajo del velo de nebulosa. */}
            <div className="relative z-[4] flex justify-center lg:justify-end">
              <VisorLoop alt={t.a11y.visorAlt} />
            </div>
          </div>
        )}
      </div>

      {/* z5, entre la figura y las tarjetas. Cuelga de la SECCIÓN y no del
          contenedor topado: su ancla es un porcentaje de la sección. */}
      {!movil && <WdidNebulosa corriendo={enPantalla} />}
    </section>
  );
}
