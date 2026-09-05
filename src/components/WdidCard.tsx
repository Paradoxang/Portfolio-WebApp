import { forwardRef, useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { VarianteWdid } from "@/data/site";

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
  cta: string;
  href: string;
  /** En móvil las tarjetas flotan superpuestas sobre el astronauta. */
  flotante?: boolean;
  /** Rotación base del desorden, en grados. */
  giro?: number;
  /** Desplazamiento horizontal del desorden, en % del ancho de la tarjeta. */
  dx?: number;
  /** Profundidad dentro de la pila. */
  z?: number;
  /** Índice, del que salen la duración y el retardo de la flotación. */
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
  rest: { y: 0, scale: 1 },
  hover: { y: -4, scale: 1.02 },
};
const animObjeto = {
  rest: { scale: 1, rotate: 0 },
  hover: { scale: 1.07, rotate: 2 },
};
const muelle = { type: "spring" as const, stiffness: 400, damping: 15 };

/** `x1` por debajo de 2 dppx. Se resuelve tras montar: en el prerender no hay
 *  `window`, y servir x2 a todo el mundo son 530 KB en vez de 206. */
function useNitidez() {
  const [x2, setX2] = useState(false);
  useEffect(() => {
    setX2((window.devicePixelRatio || 1) >= 2);
  }, []);
  return x2 ? "x2" : "x1";
}

export const WdidCard = forwardRef<HTMLDivElement, WdidCardProps>(function WdidCard(
  {
    variante, objeto, etiqueta, color, title, desc, cta, href,
    flotante, giro = 0, dx = 0, z = 1, indice = 0,
  },
  ref
) {
  const quieto = useReducedMotion();
  const carpeta = useNitidez();
  const [a, b] = DEGRADADO[variante];
  const enc = ENCUADRE[variante];

  /* Flotación de móvil. Duraciones primas entre sí (7 · 8,3 · 9,6 · 10,9 s)
     para que las cuatro no vuelvan a coincidir: si suben a la vez deja de
     leerse como flotación y parece que se mueve la sección entera. */
  const flota =
    flotante && !quieto
      ? {
          y: [0, -14, 0],
          rotate: [giro, giro + 1.2, giro],
          transition: {
            duration: 7 + indice * 1.3,
            repeat: Infinity,
            ease: "easeInOut" as const,
            delay: indice * 0.6,
          },
        }
      : undefined;

  return (
    <motion.div
      ref={ref}
      className={`wdid${flotante ? " wdid--flota" : ""}`}
      style={
        {
          "--c-a": a,
          "--c-b": b,
          /* El desorden va en `style`, no en la animación: así con
             `prefers-reduced-motion` la composición sigue siendo la misma y
             solo desaparece el movimiento. */
          ...(flotante ? { rotate: `${giro}deg`, x: `${dx}%`, zIndex: z } : null),
        } as React.CSSProperties
      }
      initial="rest"
      animate={flota ?? "rest"}
      whileHover="hover"
      variants={animTarjeta}
      transition={muelle}
    >
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
          <h3 className="wdid__titulo">{title}</h3>
          <p className="wdid__desc">{desc}</p>
        </div>

        <Link to={href} className="wdid__cta group">
          {cta}
          <ArrowRight
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </Link>
      </div>
    </motion.div>
  );
});
