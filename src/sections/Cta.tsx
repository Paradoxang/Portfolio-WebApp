import { SectionHeading } from "@/components/SectionHeading";
import { ContactPanel } from "@/components/ContactPanel";
import { useT } from "@/i18n/LocaleContext";

/** 07 — Contacto: el cierre de la portada. */
export function Cta() {
  const t = useT();
  return (
    <section
      id={t.anchors.contact}
      aria-labelledby="contacto-titulo"
      className="mx-auto max-w-[1200px] scroll-mt-24 px-6 pb-24 pt-8 md:px-8"
    >
      <ContactPanel
        heading={
          <SectionHeading
            id="contacto-titulo"
            kicker={t.cta.kicker}
            title={t.cta.title}
            lines
            titleClass="text-[clamp(37.5px,5.6vw,60px)] leading-[0.92]"
          />
        }
      />
    </section>
  );
}
