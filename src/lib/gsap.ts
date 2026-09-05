import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { Physics2DPlugin } from "gsap/Physics2DPlugin";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { SplitText } from "gsap/SplitText";

/**
 * Registro único de GSAP.
 *
 * Solo los cinco plugins que se usan, no los veinticinco del paquete: entre
 * todos serían del orden de 300 KB sobre un bundle que ronda los 470.
 *
 * GSAP convive con Framer Motion repartiéndose el terreno, no compitiendo:
 * Framer gobierna los `transform` de las piezas del hero (parallax y bucles) y
 * GSAP se ocupa del texto, de los trazos SVG y de la física del enjambre. Donde
 * hacen falta los dos sobre un mismo elemento, van en capas anidadas — cada uno
 * con su propio nodo — porque dos motores escribiendo el mismo `transform` se
 * pisan.
 *
 * El registro va detrás de un guard: el prerenderizado corre en Node y estos
 * plugins tocan el DOM.
 */
if (typeof window !== "undefined") {
  gsap.registerPlugin(
    useGSAP,
    DrawSVGPlugin,
    MotionPathPlugin,
    Physics2DPlugin,
    ScrambleTextPlugin,
    SplitText
  );
}

export { gsap, useGSAP, SplitText };
