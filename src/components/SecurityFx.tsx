import { useNitidez, useTramo, type Tramo } from "@/components/WdidFx";
import { useModoLigero } from "@/lib/perf";

/**
 * Capa gráfica de "Security First".
 *
 * El apilado, que es lo que mantiene el texto legible:
 *
 *   z0 nebulosa · z1 partículas y eco · z2 estela · z3 nave
 *   z4 la tarjeta · z5 las tres piezas de seguridad
 *
 * La sección es la más oscura del sitio —el fondo está en 9.6 de luminancia y
 * el interior de la tarjeta en 43.5—, así que la estela es el objeto más
 * brillante de toda la página. Va **por debajo** de la tarjeta y solo se ve por
 * los lados y por abajo, que es donde no hay texto.
 *
 * ── Aquí no hay `mix-blend-mode` ──
 * El brief entrega estela, partículas y nebulosa sobre negro para componerlas
 * con `screen`. No se puede: el `<main>` del layout lleva `z-index` y
 * transiciones de Framer, ya es un contexto de apilado y atrapa el blend; las
 * tres saldrían como rectángulos negros tapando el campo de estrellas global.
 * Es el mismo muro de los briefs 6, 8 y 9, y se resuelve igual: las tres se
 * pasaron a RGBA de verdad.
 *
 * La receta sí cambia respecto a las rondas anteriores, y por un motivo
 * medido. Hasta ahora era «alfa = canal máximo, RGB intacto», que sobre un
 * fondo casi negro oscurece: un píxel gris al 50 % sale a 0.27 en vez de a
 * 0.52. Con opacidades de .26 no se notaba; con la estela al .80 sí. Aquí el
 * RGB se **desmultiplica** —se divide por el alfa hasta saturar el canal
 * máximo—, que es lo que hace que `bg(1-a) + C·a` reproduzca el `screen`
 * original. Error cuadrático medio contra el `screen` real, sobre el fondo de
 * la página: 14.44 con la receta vieja, 1.76 con esta. Los archivos ya salen
 * convertidos en `public/security/`.
 *
 * Las cuatro de alfa —nave, llave, bóveda y escudo— vienen recortadas del
 * brief y se copiaron tal cual: ni un blend, ni un reoptimizado.
 *
 * ── Este brief no anima nada ──
 * Cada pieza va en su propio elemento posicionado y con clase propia, lista
 * para envolverse en un `motion.div` en la ronda siguiente. Toda la geometría
 * vive en el CSS y no en `style` en línea, porque los tres tramos no son un
 * ajuste fino de la misma composición: en móvil la estela gira 90° y la nave
 * desciende con ella.
 */

const NIVEL: Record<Tramo, number> = { movil: 0, medio: 1, ancho: 2 };

/* ── z5 · las tres piezas de seguridad ──
   Son las únicas que van POR ENCIMA de la tarjeta, así que son las únicas que
   tienen prohibido entrar en ella y en sus 24 px de margen. La bóveda se cae a
   partir de 1280 y la llave a partir de 768: por debajo de esas anchuras la
   tarjeta se come el margen lateral y no queda hueco limpio donde ponerlas. */
const SEGURIDAD: { id: string; clase: string; desde: Tramo }[] = [
  { id: "sf_05_llave", clase: "sf-llave", desde: "medio" },
  { id: "sf_06_boveda", clase: "sf-boveda", desde: "ancho" },
  { id: "sf_07_escudo", clase: "sf-escudo", desde: "movil" },
];

/* ── z1 · eco de otras secciones ──
   Seis instancias de archivos que YA están en el repo. No se copia ni se
   genera nada: mismas rutas que el hero, "What I Do" y "Selected Projects", y
   cero peso añadido. Siempre `x1`: a 1.4–2.2 % del ancho, el `x2` es
   desperdicio puro.
   Las seis entran por alfa. Las dos que el brief marca como `screen`
   —retícula y nodo— ya se convirtieron a RGBA en su ronda, así que componen
   normal como las demás. */
interface Eco {
  src: string;
  x: number;
  y: number;
  w: number;
  o: number;
  rot: number;
  orden: number;
}
const ECO: Eco[] = [
  { src: "/hero/fx/x1/elem_04_esfera_b", x: 3.5, y: 50, w: 2.0, o: 0.45, rot: 0, orden: 1 },
  { src: "/projects/x1/sp_21_cartucho", x: 30, y: 91, w: 2.2, o: 0.45, rot: -12, orden: 2 },
  { src: "/wdid/fx/x1/wdid_05_guijarro", x: 71, y: 6, w: 2.0, o: 0.4, rot: 0, orden: 3 },
  { src: "/hero/fx/x1/elem_02_reticula", x: 24.5, y: 6, w: 1.6, o: 0.4, rot: 0, orden: 4 },
  { src: "/wdid/fx/x1/wdid_01_nodo", x: 51, y: 93.5, w: 1.4, o: 0.4, rot: 0, orden: 5 },
  { src: "/hero/fx/x1/elem_05_fragmento_b", x: 96.5, y: 70, w: 1.9, o: 0.4, rot: 18, orden: 6 },
];
/* Seis, cuatro y dos. Las que sobreviven al estrechar son las que caen en los
   márgenes altos y bajos: las de media altura quedarían detrás de la tarjeta,
   que en cuanto la pantalla se estrecha ocupa el ancho entero. */
const ECO_POR_TRAMO: Record<Tramo, number[]> = {
  ancho: [1, 2, 3, 4, 5, 6],
  medio: [2, 3, 4, 5],
  movil: [3, 5],
};
/* Un 2 % del ancho de la sección son 38 px en un escritorio de 1920 y 7 en un
   teléfono de 390. A 7 px la pieza no se lee: ensucia. Mismo criterio que en
   "What I Do" y en "Selected Projects". */
const ESCALA_ECO: Record<Tramo, number> = { ancho: 1, medio: 1.35, movil: 2.9 };

/**
 * z0–z3 · todo lo que va DETRÁS de la tarjeta.
 *
 * La estela y la nave van juntas dentro de `.sf-grupo` a propósito, y es lo
 * único no evidente del montaje. La estela no acompaña a la nave: **sale de
 * sus toberas**, y el ojo va justo a esa unión, así que un desfase de 10 px se
 * ve al instante.
 *
 * El brief da la posición de la nave en porcentajes de la SECCIÓN
 * (`left:86.68%; top:62.28%`), calculados para un lienzo de 1920x900. Aquí la
 * sección no mide siempre eso —el alto lo pone la tarjeta, que crece al
 * estrecharse—, y en cuanto la proporción cambia esos dos porcentajes dejan de
 * coincidir con la punta del núcleo: la de la estela se mueve con
 * `20% + 0.41·altoDeLaEstela` y la de la nave con `62.28%·altoDeLaSección`,
 * que no es la misma función.
 *
 * Metiendo la nave DENTRO de un envoltorio que es exactamente la caja de la
 * estela, sus porcentajes pasan a medirse contra la estela y la unión queda
 * clavada a cualquier altura de sección. Y en móvil sale gratis lo que el
 * brief resuelve a mano: al girar el grupo entero 90°, la nave gira con él y
 * su rotación efectiva pasa de −25.6° a +64.4° sin tocar un número.
 *
 * Medidas verificadas sobre los assets, no a ojo:
 *   · punta del núcleo de la estela → 87.41 % / 40.92 % (el brief da 87.47/41.00)
 *   · ángulo del núcleo en la punta → −26.27° (el brief da −26.7°)
 *   · centroide del resplandor de toberas → 7.02 % / 46.30 % (el brief ancla
 *     el plano de salida en 0.71 % / 46.48 %, que es su borde izquierdo)
 */
export function SecurityFondo() {
  const tramo = useTramo();
  const carpeta = useNitidez();
  const ligero = useModoLigero();
  const ecos = ECO.filter((e) => ECO_POR_TRAMO[tramo].includes(e.orden));
  const escala = ESCALA_ECO[tramo];

  return (
    <div className="security__lienzo" aria-hidden="true">
      {/* z0 y z1. En modo ligero no se montan siquiera: son dos capas a
          pantalla completa, y sin GPU cuestan más que todo lo demás junto.
          El CSS también las oculta, pero ocultarlas no evita descargar los
          400 KB; no montarlas, sí. */}
      {!ligero && (
        <>
          <img
            src={`/security/${carpeta}/sf_04_nebulosa.webp`}
            alt=""
            decoding="async"
            loading="lazy"
            draggable={false}
            className="sf-nebulosa"
          />
          <img
            src={`/security/${carpeta}/sf_03_particulas.webp`}
            alt=""
            decoding="async"
            loading="lazy"
            draggable={false}
            className="sf-particulas"
          />
          <div className="sf-eco">
            {ecos.map((e) => (
              <img
                key={e.orden}
                src={`${e.src}.webp`}
                alt=""
                decoding="async"
                loading="lazy"
                draggable={false}
                style={{
                  left: `${e.x}%`,
                  top: `${e.y}%`,
                  width: `${+(e.w * escala).toFixed(2)}%`,
                  opacity: e.o,
                  rotate: `${e.rot}deg`,
                }}
              />
            ))}
          </div>
        </>
      )}

      {/* z2 y z3. La estela se queda incluso en modo ligero: es la sección. */}
      <div className="sf-grupo">
        <img
          src={`/security/${carpeta}/sf_02_estela.webp`}
          alt=""
          decoding="async"
          loading="lazy"
          draggable={false}
          className="sf-estela"
        />
        <img
          src={`/security/${carpeta}/sf_01_nave.webp`}
          alt=""
          decoding="async"
          loading="lazy"
          draggable={false}
          className="sf-nave"
        />
      </div>
    </div>
  );
}

/**
 * z5 · las tres piezas de seguridad, por encima de la tarjeta.
 *
 * Van en un lienzo propio y no en el de atrás porque la tarjeta se interpone:
 * está en el flujo normal con `z-index: 4`, así que lo que tiene que quedar
 * por delante necesita su propio contenedor por encima.
 */
export function SecurityDelante() {
  const tramo = useTramo();
  const carpeta = useNitidez();
  const ligero = useModoLigero();
  if (ligero) return null;
  const piezas = SEGURIDAD.filter((p) => NIVEL[tramo] >= NIVEL[p.desde]);
  if (!piezas.length) return null;
  return (
    <div className="security__delante" aria-hidden="true">
      {piezas.map((p) => (
        <img
          key={p.id}
          src={`/security/${carpeta}/${p.id}.webp`}
          alt=""
          decoding="async"
          loading="lazy"
          draggable={false}
          className={p.clase}
        />
      ))}
    </div>
  );
}
