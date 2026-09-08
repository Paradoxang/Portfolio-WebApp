import { elegirModo, usePerf } from "@/lib/perf";

/**
 * Conmutador de «Modo ligero», en el pie.
 *
 * Existe porque la detección automática no acierta siempre: hay portátiles con
 * la aceleración desactivada que aun así declaran cuatro núcleos y pasan la
 * sonda de fotogramas, y hay gente que simplemente prefiere el sitio sobrio.
 * La elección se guarda y **gana sobre la detección**, también si la sonda
 * intenta degradar después.
 *
 * Es un `switch` de verdad —`role="switch"` con `aria-checked`— y no un enlace
 * disfrazado: un lector de pantalla tiene que poder decir si está puesto.
 */
export function ModoLigero() {
  const modo = usePerf();
  const puesto = modo === "low";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={puesto}
      onClick={() => elegirModo(puesto ? "high" : "low")}
      className="modo-ligero"
      title={
        puesto
          ? "Modo ligero activado: menos efectos, más fluidez"
          : "Activa el modo ligero si el sitio te va lento"
      }
    >
      <span className="modo-ligero__via" aria-hidden="true">
        <span className="modo-ligero__punto" />
      </span>
      Modo ligero
    </button>
  );
}
