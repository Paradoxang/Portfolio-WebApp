import { forwardRef, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { gsap, useGSAP } from "@/lib/gsap";
import type { VarianteWdid } from "@/data/site";
import { useNitidez } from "@/components/WdidFx";

/**
 * Tarjeta de la sección "What I Do".
 *
 * Adaptada del `GradientCard` del brief, no copiada. Se conserva su esqueleto
 * —variantes, el par `cardAnimation`/`imageAnimation` de Framer, el
 * `forwardRef` y la flecha que se desplaza en hover— y se cambia todo lo que
 * venía calibrado para un sitio claro:
 *
 *  · Sin `cva` ni `cn`. El proyecto no tiene shadcn, ni
 *    `class-variance-authority`, ni `clsx`/`tailwind-merge`, y traerlos para
 *    cuatro variantes sin clases condicionales sería peso muerto. Un mapa de
 *    variante a par de hex hace exactamente lo mismo aquí.
 *
 *  · Sin `dark:opacity-30` en el objeto. El sitio es oscuro siempre: esa regla
 *    apagaría la pieza justo cuando más tiene que verse.
 *
 *  · Colores de texto explícitos en vez de `text-foreground`. Sobre estos
 *    degradados el token del tema no da el contraste que hace falta.
 *
 *  · Sin `shadow-sm`/`hover:shadow-lg`. Sobre #0B0A18 una sombra no existe;
 *    el relieve lo dan el borde hairline y un halo suave al pasar el ratón.
 */

export interface WdidCardProps {
  variante: VarianteWdid;
  objeto: string;
  etiqueta: string;
  color: string;
  title: string;
  desc: string;
  /** El descriptivo de bolsillo que se pinta cuando la tarjeta va suelta. */
  resumen: string;
  cta: string;
  href: string;
  /** En móvil las tarjetas rodean al astronauta, sueltas y con el resumen. */
  suelta?: boolean;
  /** Rotación del desorden, en grados. */
  giro?: number;
  /** Índice: de él salen la duración y el retardo, distintos en cada tarjeta. */
  indice?: number;
}

/** Hex medidos sobre los platos aprobados, no inventados. */
const DEGRADADO: Record<VarianteWdid, [string, string]> = {
  modulo: ["#454368", "#7C70B3"],
  astrolabio: ["#6659A0", "#C8B7ED"],
  cristal: ["#343253", "#4F4897"],
  vela: ["#6D5880", "#BB8891"],
};

/** Cada objeto tiene su encuadre: el ancho y cuánto sangra por la esquina. */
const ENCUADRE: Record<VarianteWdid, { w: string; right: string; bottom: string }> = {
  modulo: { w: "74%", right: "-18%", bottom: "-12%" },
  astrolabio: { w: "70%", right: "-20%", bottom: "-16%" },
  cristal: { w: "68%", right: "-14%", bottom: "-20%" },
  vela: { w: "78%", right: "-22%", bottom: "-10%" },
};

const animTarjeta = {
  rest: { scale: 1 },
  hover: { scale: 1.03 },
};
const animObjeto = {
  rest: { scale: 1, rotate: 0 },
  hover: { scale: 1.07, rotate: 2 },
};
const muelle = { type: "spring" as const, stiffness: 400, damping: 15 };

export const WdidCard = forwardRef<HTMLDivElement, WdidCardProps>(function WdidCard(
  { variante, objeto, etiqueta, color, title, desc, resumen, cta, href, suelta, giro = 0, indice = 0 },
  ref
) {
  const quieto = useReducedMotion();
  const carpeta = useNitidez();
  const [a, b] = DEGRADADO[variante];
  const enc = ENCUADRE[variante];

  const cajaRef = useRef<HTMLDivElement>(null);
  const tituloRef = useRef<HTMLSpanElement>(null);
  /** El título no se descifra hasta que la tarjeta se ve: si no, la animación
   *  se gasta fuera de pantalla y el usuario llega al texto ya quieto. */
  const [enVista, setEnVista] = useState(false);
  /** Cada incremento vuelve a descifrar el título. Sube al pasar el ratón y,
   *  en táctil —donde no hay hover—, cada cierto tiempo. */
  const [pulso, setPulso] = useState(0);

  useEffect(() => {
    const el = cajaRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setEnVista(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* Repetición en táctil. Los periodos se separan por tarjeta para que las
     cuatro no se descifren a la vez, que se leería como un parpadeo de la
     sección entera en vez de como cuatro rótulos vivos. */
  useEffect(() => {
    if (!suelta || !enVista || quieto) return;
    if (window.matchMedia("(hover: hover)").matches) return;
    const id = window.setInterval(() => setPulso((p) => p + 1), 5200 + indice * 900);
    return () => window.clearInterval(id);
  }, [suelta, enVista, quieto, indice]);

  useGSAP(
    () => {
      if (!enVista || !tituloRef.current || quieto) return;
      gsap.to(tituloRef.current, {
        duration: 0.85,
        delay: pulso === 0 ? indice * 0.12 : 0,
        scrambleText: {
          text: title,
          chars: "01ABCDEF/·<>",
          speed: 0.6,
          revealDelay: 0.12,
        },
      });
    },
    { dependencies: [enVista, pulso, title, quieto] }
  );

  /* Levitación. En las dos versiones, no solo en móvil: es lo que separa una
     rejilla de tarjetas de una composición que respira. Duraciones distintas
     y sin divisores comunes para que no se sincronicen. */
  const flota = quieto
    ? undefined
    : {
        y: suelta ? [0, -14, 0] : [0, -9, 0],
        rotate: [giro, giro + (suelta ? 1.2 : 0.5), giro],
        transition: {
          duration: (suelta ? 7 : 8.5) + indice * 1.3,
          repeat: Infinity,
          ease: "easeInOut" as const,
          delay: indice * 0.6,
        },
      };

  return (
    <motion.div
      ref={ref}
      className={`wdid${suelta ? " wdid--suelta" : ""}`}
      style={
        {
          "--c-a": a,
          "--c-b": b,
          /* El giro va en `style` y no solo en la animación: así con
             `prefers-reduced-motion` la composición desordenada se mantiene y
             lo único que desaparece es el movimiento. */
          ...(giro ? { rotate: `${giro}deg` } : null),
        } as React.CSSProperties
      }
      initial="rest"
      animate={flota ?? "rest"}
      whileHover="hover"
      variants={animTarjeta}
      transition={muelle}
      onHoverStart={() => setPulso((p) => p + 1)}
    >
      <div ref={cajaRef} className="wdid__medida" aria-hidden="true" />

      {/* El objeto va por debajo del texto y nunca recibe punteros. */}
      <motion.img
        src={`/wdid/${carpeta}/${objeto}.webp`}
        alt=""
        aria-hidden="true"
        draggable={false}
        decoding="async"
        loading="lazy"
        className="wdid__obj"
        style={{ width: enc.w, right: enc.right, bottom: enc.bottom }}
        variants={animObjeto}
        transition={muelle}
      />

      <div className="wdid__body">
        <span className="wdid__badge">
          <span className="wdid__punto" style={{ background: color }} aria-hidden="true" />
          {etiqueta}
        </span>

        <div className="wdid__texto">
          {/* El texto real vive en el `aria-label`: dentro, GSAP reescribe el
              span carácter a carácter y un lector lo deletrearía. */}
          <h3 className="wdid__titulo" aria-label={title}>
            <span ref={tituloRef} aria-hidden="true">
              {title}
            </span>
          </h3>
          {/* Las dos versiones llevan descriptivo; en la suelta es el corto.
              No es el largo recortado por CSS: a dos líneas de 20 caracteres
              un truncado partiría todas las frases por la mitad. */}
          <p className={suelta ? "wdid__desc wdid__desc--corto" : "wdid__desc"}>
            {suelta ? resumen : desc}
          </p>
        </div>

        <Link to={href} className="wdid__cta group" aria-label={`${cta}: ${title}`}>
          {!suelta && cta}
          <ArrowRight
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </Link>
      </div>
    </motion.div>
  );
});
