import { Seo } from "@/components/seo";
import { PaginaFx } from "@/components/PaginaFx";
import { ContactPanel } from "@/components/ContactPanel";
import { ContactForm } from "@/components/ContactForm";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal, RevealLine } from "@/lib/anim";
import { useLocale } from "@/i18n/LocaleContext";
import { contactSchema } from "@/lib/schema";
import { partirH1 } from "@/pages/Plans";

/**
 * `/contacto` — las vías directas y el formulario.
 *
 * El panel es el mismo de la sección 07 de la portada; lo que esta página
 * añade es el formulario, que compone el mensaje y lo abre en WhatsApp o en
 * el correo. El sitio vende formularios conectados; ya tiene uno.
 */
export function Contact() {
  const { t, locale } = useLocale();
  const c = t.pages.contact;
  const [antes, brillo] = partirH1(c.h1);

  return (
    <div className="pagina">
      <PaginaFx semilla={9} />

      <Seo
        route="contact"
        title={c.seo.title}
        description={c.seo.description}
        pageType="ContactPage"
        jsonLd={contactSchema(t, locale)}
      />

      <section
        id={t.anchors.contact}
        aria-labelledby="contacto-h1"
        className="mx-auto max-w-[1200px] scroll-mt-24 px-6 pb-12 pt-32 md:px-8 md:pt-40"
      >
        <Reveal mount>
          <div className="kicker">{c.kicker}</div>
        </Reveal>
        <h1 id="contacto-h1" className="display mt-4 text-[clamp(51px,8.4vw,111px)] leading-[0.92]">
          <RevealLine delay={0.06} mount>
            {antes}
          </RevealLine>
          <RevealLine delay={0.14} mount>
            <span className="text-shimmer">{brillo}</span>
          </RevealLine>
        </h1>
        <Reveal delay={0.2} mount>
          <p className="mt-6 max-w-[52ch] text-[clamp(15px,1.5vw,18px)] leading-[1.65] text-mute">{c.intro}</p>
        </Reveal>

        <div className="mt-12">
          <ContactPanel
            mount
            heading={<h2 className="kicker !text-[10px]">{c.channels}</h2>}
          />
        </div>
      </section>

      <section aria-labelledby="formulario-titulo" className="mx-auto max-w-[1200px] px-6 pb-28 md:px-8">
        <div className="card-flat p-7 md:p-10">
          <SectionHeading
            id="formulario-titulo"
            kicker={t.form.kicker}
            title={t.form.title}
            titleClass="text-[clamp(28px,4vw,44px)] leading-[1]"
          >
            <Reveal delay={0.1}>
              <p className="mt-4 max-w-[58ch] text-[14.5px] leading-[1.7] text-mute">{t.form.intro}</p>
            </Reveal>
          </SectionHeading>
          <div className="mt-8">
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
