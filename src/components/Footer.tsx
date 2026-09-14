import { Facebook, Github, Instagram } from "lucide-react";
import { contact } from "@/data/site";
import { ModoLigero } from "@/components/ModoLigero";

/**
 * El año va como constante y no como `new Date().getFullYear()`.
 * El sitio se prerenderiza: el HTML estático llevaría el año del build y el
 * cliente pintaría el actual, que es exactamente la discrepancia de hidratación
 * que React avisa por consola cada 1 de enero. Se actualiza a mano, una vez al
 * año, y a cambio el prerender y el cliente dicen siempre lo mismo.
 */
const ANIO = 2026;

export function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-4 px-6 pt-8 pb-6 font-mono text-[10px] font-medium tracking-[0.16em] uppercase text-faint sm:flex-row md:px-8">
        <span className="flex items-center gap-2.5">
          <img
            src="/brand/isotipo.webp"
            alt="Dox Designs"
            width="24"
            height="24"
            className="h-6 w-6 rounded-md ring-1 ring-white/10"
          />
          DOX DESIGNS<span className="text-neb">*</span> — Santiago Miranda
        </span>
        {/* Con salto: los cuatro enlaces suman más que el ancho de un móvil y
            sin él desbordaban la página, lo que ensanchaba el nav fijo. */}
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          <a
            href={contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 transition-colors hover:text-neb"
          >
            <Github className="h-3.5 w-3.5" /> GitHub
          </a>
          <a
            href={contact.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 transition-colors hover:text-neb"
          >
            <Instagram className="h-3.5 w-3.5" /> Instagram
          </a>
          <a
            href={contact.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 transition-colors hover:text-neb"
          >
            <Facebook className="h-3.5 w-3.5" /> Facebook
          </a>
          <span>{contact.domain}</span>
          <ModoLigero />
        </div>
      </div>

      {/* ── Derechos reservados ──
          En una fila propia y no pegada a la marca: la de arriba es
          navegación —enlaces y el conmutador de modo ligero— y esta es
          jurídica. Mezcladas, el aviso se lee como un enlace más.
          El año sale solo de aquí; se quitó de la línea de la marca para no
          decirlo dos veces en el mismo pie. */}
      <div className="border-t border-white/5">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-2 px-6 py-5 text-center font-mono text-[9.5px] font-medium tracking-[0.14em] uppercase text-faint/80 sm:flex-row sm:text-left md:px-8">
          <p>
            © {ANIO} Santiago Miranda · Todos los derechos reservados
          </p>
          <p>
            Diseñado y desarrollado por{" "}
            <span className="text-mute">Dox Designs</span>
            <span className="text-neb">*</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
