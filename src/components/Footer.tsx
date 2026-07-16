import { Facebook, Github, Instagram } from "lucide-react";
import { contact } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-4 px-6 py-8 font-mono text-[10px] font-medium tracking-[0.16em] uppercase text-faint sm:flex-row md:px-8">
        <span>
          DOX DESIGNS<span className="text-neb">*</span> — Santiago Miranda · 2026
        </span>
        <div className="flex items-center gap-5">
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
        </div>
      </div>
    </footer>
  );
}
