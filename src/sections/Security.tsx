import { ShieldCheck, Lock, Globe, KeyRound } from "lucide-react";
import { Reveal, RevealLine } from "@/lib/anim";
import { OrbitRings } from "@/components/Cosmic";

const practices = [
  {
    icon: ShieldCheck,
    title: "Cabeceras y CSP estrictas",
    desc: "Sin scripts de terceros no autorizados.",
  },
  {
    icon: Lock,
    title: "HTTPS + HSTS",
    desc: "Cifrado de extremo a extremo, siempre.",
  },
  {
    icon: Globe,
    title: "Dominio blindado",
    desc: "DNS protegido y anti-suplantación de correo.",
  },
  {
    icon: KeyRound,
    title: "Datos protegidos",
    desc: "Credenciales cifradas y mínimo privilegio.",
  },
];

export function Security() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-20 md:px-8 md:py-28">
      <Reveal>
        <div className="glow-quote relative overflow-hidden rounded-2xl border border-neb/20 bg-space/60">
          <div className="scan-line-y" />
          <OrbitRings className="absolute -left-24 -top-24 h-[340px] w-[340px] opacity-40" />

          <div className="relative grid items-center gap-10 p-8 md:p-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <div className="kicker">04 — Valor agregado</div>
              <h2 className="display mt-4 text-[clamp(40px,6.5vw,72px)] leading-[0.92]">
                <RevealLine delay={0.06}>Security</RevealLine>
                <RevealLine delay={0.14}>
                  <span className="text-shimmer">First</span>
                </RevealLine>
              </h2>
              <p className="mt-6 max-w-[46ch] text-[15px] leading-[1.7] text-mute">
                Cuento con{" "}
                <strong className="font-bold text-ink">
                  especialización en Ciberseguridad
                </strong>
                : cada proyecto que entrego nace endurecido — no como un
                parche al final, sino como parte del diseño. Tu sitio, tus
                datos y tus clientes, protegidos desde el día uno.
              </p>
              <div className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-neb/30 bg-neb/10 px-4 py-2 font-mono text-[10px] font-semibold tracking-[0.14em] uppercase text-neb">
                <ShieldCheck className="h-4 w-4" strokeWidth={1.8} />
                Ing. Informático · Esp. Ciberseguridad
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {practices.map((p, i) => (
                <Reveal key={p.title} delay={0.1 + i * 0.08}>
                  <div className="card card-hover group h-full p-5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-[9px] border border-neb/30 bg-neb/10 transition-all duration-300 group-hover:scale-110 group-hover:border-neb/60 group-hover:shadow-[0_0_20px_rgba(143,162,255,.35)]">
                      <p.icon className="h-4.5 w-4.5 text-neb" strokeWidth={1.6} />
                    </div>
                    <div className="mt-4 text-[14px] font-bold text-ink">
                      {p.title}
                    </div>
                    <p className="mt-1 text-[12.5px] leading-[1.55] text-faint">
                      {p.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
