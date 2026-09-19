import { useNitidez, useTramo, type Tramo } from "@/components/WdidFx";
import { useModoLigero } from "@/lib/perf";

/**
 * Capa decorativa para las páginas interiores.
 *
 * La portada tiene cinco escenas gráficas propias; `/servicios`, `/proyectos`,
 * `/sobre-mi` y `/contacto` no tenían ninguna, y al lado de la landing se leían
 * como otro sitio. Esto les presta el mismo vocabulario.
 *
 * ── No hay un solo asset nuevo ──
 * Las catorce piezas salen de `/hero/fx/`, `/wdid/fx/`, `/projects/` y
 * `/security/`, que ya están aprobadas y ya viajan en el repo. Siempre la
 * versión `x1`: a 1,4–3 % del ancho, servir `x2` es tirar bytes.
 *
 * ── Por qué absoluta y no fija ──
 * Una capa `fixed` se queda quieta mientras la página se desplaza y se lee como
 * un telón pegado al cristal. Absoluta sobre el alto completo de la página, las
 * piezas pasan con el scroll y se comportan como lo que son: objetos que
 * flotan en la misma escena que el contenido. Eso obliga a que la página la
 * envuelva en un contenedor `relative`, que es lo que hace `.pagina`.
 *
 * ── z-index negativo ──
 * El `<main>` del layout ya es un contexto de apilado en z-10. Dentro de él, un
 * `-1` deja la decoración por detrás del contenido en flujo y por delante del
 * campo de estrellas global — que es exactamente el hueco donde tiene que
 * vivir. Con `z-0` se pondría por ENCIMA del texto: los elementos posicionados
 * ganan a los que están en flujo normal aunque compartan nivel.
 */

interface Pieza {
  src: string;
  /** Centro, en % del ancho y del alto de la página. */
  x: number;
  y: number;
  /** Ancho en % del ancho de la página. */
  w: number;
  o: number;
  rot: number;
  /** Tramo más estrecho en el que aparece. */
  desde: Tramo;
}

const NIVEL: Record<Tramo, number> = { movil: 0, medio: 1, ancho: 2 };

/* Repartidas por el alto entero y pegadas a los márgenes: el corredor central
   es donde vive el texto, y ninguna pieza entra ahí. En móvil sobreviven solo
   las que caen por debajo del 12 % de ancho o por encima del 88 %. */
const PIEZAS: Pieza[] = [
  { src: "/hero/fx/x1/elem_04_esfera_b", x: 5, y: 7, w: 2.6, o: 0.4, rot: 0, desde: "movil" },
  { src: "/hero/fx/x1/elem_05_fragmento_c", x: 94, y: 12, w: 2.4, o: 0.38, rot: 22, desde: "movil" },
  { src: "/wdid/fx/x1/wdid_01_nodo", x: 88, y: 23, w: 1.6, o: 0.34, rot: 0, desde: "medio" },
  { src: "/hero/fx/x1/elem_02_reticula", x: 9, y: 29, w: 1.8, o: 0.32, rot: 0, desde: "medio" },
  { src: "/wdid/fx/x1/wdid_05_guijarro", x: 93, y: 37, w: 2.6, o: 0.4, rot: 0, desde: "movil" },
  { src: "/hero/fx/x1/elem_12_esfera_d", x: 6, y: 45, w: 2.2, o: 0.36, rot: 0, desde: "movil" },
  { src: "/projects/x1/sp_21_cartucho", x: 91, y: 52, w: 2.2, o: 0.38, rot: -12, desde: "medio" },
  { src: "/hero/fx/x1/elem_13_fragmento_d", x: 11, y: 59, w: 2, o: 0.32, rot: -18, desde: "medio" },
  { src: "/wdid/fx/x1/wdid_03_sello", x: 95, y: 66, w: 2.3, o: 0.36, rot: 0, desde: "movil" },
  { src: "/security/x1/sf_05_llave", x: 7, y: 73, w: 2.4, o: 0.34, rot: -8, desde: "medio" },
  { src: "/hero/fx/x1/elem_04_esfera_c", x: 90, y: 80, w: 2, o: 0.36, rot: 0, desde: "medio" },
  { src: "/hero/fx/x1/elem_05_fragmento_a", x: 8, y: 87, w: 2.2, o: 0.34, rot: -16, desde: "movil" },
  { src: "/security/x1/sf_07_escudo", x: 94, y: 92, w: 2.8, o: 0.32, rot: 6, desde: "medio" },
  { src: "/wdid/fx/x1/wdid_01_nodo", x: 5, y: 96, w: 1.5, o: 0.3, rot: 0, desde: "medio" },
];

/* Un 2 % del ancho son 38 px en un escritorio de 1920 y 7 en un teléfono de
   390. A 7 px la pieza no se lee: ensucia. Mismo criterio que en "What I Do" y
   en "Selected Projects". */
const ESCALA: Record<Tramo, number> = { ancho: 1, medio: 1.3, movil: 2.6 };

/**
 * @param semilla Desplaza la lista para que dos páginas seguidas no repartan
 *                las piezas igual. No genera nada al azar: el orden tiene que
 *                ser el mismo en el prerender y en el cliente, o React avisa de
 *                discrepancia de hidratación.
 */
export function PaginaFx({ semilla = 0 }: { semilla?: number }) {
  const tramo = useTramo();
  const carpeta = useNitidez();
  const ligero = useModoLigero();

  /* En modo ligero no se monta: son catorce capas de composición que no dicen
     nada que el contenido no diga ya. El CSS también las ocultaría, pero
     ocultarlas no evita descargarlas; no montarlas, sí. */
  if (ligero) return null;

  const escala = ESCALA[tramo];
  const visibles = PIEZAS.filter((p) => NIVEL[tramo] >= NIVEL[p.desde]);
  const giro = ((semilla % visibles.length) + visibles.length) % visibles.length;
  const piezas = [...visibles.slice(giro), ...visibles.slice(0, giro)];

  return (
    <div className="pagina-fx" aria-hidden="true">
      {/* Las POSICIONES no rotan, solo las piezas: los catorce huecos están
          repartidos a mano por el alto y por los márgenes, y girarlos también
          amontonaría dos en el mismo sitio. Cada página recibe el mismo reparto
          con distinto reparto de objetos. */}
      {visibles.map((hueco, i) => {
        const p = piezas[i];
        return (
          <img
            key={`${hueco.x}-${hueco.y}`}
            src={`${p.src.replace("/x1/", `/${carpeta}/`)}.webp`}
            alt=""
            decoding="async"
            loading="lazy"
            draggable={false}
            style={{
              left: `${hueco.x}%`,
              top: `${hueco.y}%`,
              width: `${+(p.w * escala).toFixed(2)}%`,
              opacity: p.o,
              rotate: `${p.rot}deg`,
            }}
          />
        );
      })}
    </div>
  );
}
