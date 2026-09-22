import type { Content } from "./types";

/**
 * Español — el idioma de la casa.
 *
 * Todo el texto del sitio, tal cual estaba repartido por secciones, páginas y
 * `site.ts`, ahora en un solo sitio. Los comentarios de por qué cada bloque
 * dice lo que dice siguen en los componentes: aquí solo está lo que se lee.
 */
export const es: Content = {
  locale: "es",

  meta: {
    htmlLang: "es",
    ogLocale: "es_CO",
    siteName: "Dox Designs · Santiago Miranda",
    ogImageAlt: "Santiago Miranda — Dox Designs",
    langName: "Español",
    switchTo: "English",
    switchAria: "Switch to English",
  },

  routes: {
    home: { label: "Inicio" },
    plans: { label: "Planes" },
    services: { label: "Servicios" },
    security: { label: "Seguridad" },
    projects: { label: "Muestrario" },
    about: { label: "Sobre mí" },
    contact: { label: "Contacto" },
    privacy: { label: "Privacidad" },
  },

  anchors: {
    services: "especialidades",
    plans: "planes",
    telemetry: "telemetria",
    showcase: "muestrario",
    shield: "escudo",
    faq: "preguntas",
    contact: "contacto",
  },

  contact: {
    location: "Cali · CO",
    whatsappMessage: "Hola Santiago, vengo de tu portafolio y me interesa un proyecto.",
    whatsappPlan: (plan) =>
      `Hola Santiago, vengo de tu portafolio y me interesa el plan ${plan}.`,
    available: "Disponible para proyectos",
    availableShort: "Disponible para misiones",
    timezone: "GMT-5 · Colombia",
  },

  nav: {
    links: [
      { key: "home", label: "Inicio" },
      { key: "plans", label: "Planes" },
      { key: "services", label: "Servicios" },
      { key: "security", label: "Seguridad" },
      { key: "projects", label: "Muestrario" },
      { key: "about", label: "Sobre mí" },
      { key: "contact", label: "Contacto" },
    ],
    cta: "Diagnóstico gratis",
    ctaShort: "Diagnóstico",
    open: "Abrir menú",
    close: "Cerrar menú",
    navigation: "Navegación",
    directContact: "Contacto directo",
    whatsapp: "WhatsApp",
    form: "Formulario",
    skip: "Saltar al contenido",
    language: "Idioma",
  },

  footer: {
    tagline: "Webs a medida que se hacen encontrar, en un plan mensual con seguridad incluida.",
    navigation: "Navegación",
    contact: "Contacto",
    legal: "Legal y ajustes",
    rights: "Todos los derechos reservados",
    madeBy: "Diseñado y desarrollado por",
    lightMode: {
      label: "Modo ligero",
      on: "Modo ligero activado: menos efectos, más fluidez",
      off: "Activa el modo ligero si el sitio te va lento",
    },
  },

  hero: {
    kicker: "Webs a medida que se hacen encontrar · Cali",
    h1: "Que te encuentren cuando te **buscan**.",
    ctaPrimary: "Diagnóstico gratis",
    ctaSecondary: "Ver planes",
    credential: "Santiago Miranda · Ing. Informático · Esp. Ciberseguridad",
    railServices: "Especialidades",
    railPlans: "Planes de vuelo",
    railPlansAria: "Ver los planes de vuelo",
    available: "Disponible para misiones",
    nameSr: "Santiago Miranda",
    hud: {
      rows: [
        { key: "SYS", values: ["DOX//DESIGNS", "SM · 01", "NUCLEO OK"] },
        { key: "STACK", values: ["REACT 18.3", ".NET 8.0", "NODE 20"] },
        { key: "ORIGEN", values: ["CALI · CO", "3.4516 N", "76.5320 W"] },
        { key: "ENLACE", values: ["DOXDESIGNS.DEV", "TLS 1.3", "HSTS ON"] },
        { key: "BUILD", values: ["SSG · PRERENDER", "CLS 0.00", "TTFB 42MS"] },
        { key: "ESTADO", values: ["DISPONIBLE", "ACEPTANDO", "PARA MISIONES"] },
      ],
      bracket: ["ESPECIALIDADES", "FULL-STACK", "UI · UX", "SEGURIDAD"],
      ticker:
        "SYS://DOX · UPLINK ESTABLE · LAT 3.4516 N · LON 76.5320 W · REACT 18.3 · .NET 8.0 · NODE 20 · TTFB 42MS · CLS 0.00 · ESTADO: DISPONIBLE PARA MISIONES · ",
    },
  },

  services: {
    kicker: "01 — Especialidades",
    title: "What I Do",
    intro:
      "Posicionamiento local, presencia en buscadores con IA y protección de los datos de tu negocio, en un plan mensual. **La página web va incluida.**",
    items: {
      seo: {
        title: "Que te encuentren",
        desc: "Posicionamiento local, ficha de Google y reseñas para aparecer cuando alguien busca cerca de ti.",
        summary: "Aparecer al buscar cerca.",
        label: "Posicionamiento",
        cta: "Ver planes",
      },
      ai: {
        title: "Que la IA te cite",
        desc: "Contenido y datos estructurados para salir en las respuestas de ChatGPT, Perplexity y los resúmenes de Google.",
        summary: "Salir en respuestas de IA.",
        label: "Buscadores con IA",
        cta: "Ver planes",
      },
      convert: {
        title: "Que te escriban",
        desc: "Web a medida con formularios, agenda y WhatsApp para que el contacto salga sin tener que llamar.",
        summary: "Formularios y WhatsApp directos.",
        label: "Conversión",
        cta: "Ver muestrario",
      },
      protect: {
        title: "Que estés protegido",
        desc: "Los datos de tus clientes cifrados, el sitio monitoreado y el cumplimiento de la Ley 1581 al día.",
        summary: "Datos y cumplimiento al día.",
        label: "Cumplimiento",
        cta: "Ver el escudo",
      },
    },
  },

  plans: {
    kicker: "02 — Planes de vuelo",
    title: "Elige tu órbita",
    intro:
      "Trabajo por cuota mensual, no por proyecto suelto. Estar arriba en Google no se consigue una vez y se abandona — se sostiene. La página web va incluida en los tres.",
    currency: "COP",
    items: {
      base: {
        label: "Órbita baja",
        name: "Base",
        who: "Para el negocio que todavía no está en internet.",
        price: "350.000",
        period: "/mes",
        includes: [
          "Sitio web propio, rápido y en tu dominio",
          "Ficha de Google optimizada y verificada",
          "Formulario y WhatsApp conectados",
          "Respaldos, actualizaciones y monitoreo",
          "Telemetría mensual",
        ],
      },
      growth: {
        label: "El más contratado",
        name: "Crecimiento",
        who: "Para el que ya está y quiere que lo encuentren primero.",
        price: "690.000",
        period: "/mes · mín. 6 meses",
        includes: [
          "Todo lo del plan Base",
          "Posicionamiento local y trabajo de reseñas",
          "Dos contenidos al mes en tu sitio",
          "Presencia en buscadores con IA",
          "Telemetría mensual ampliada",
        ],
      },
      shield: {
        label: "Datos sensibles",
        name: "Blindaje",
        who: "Para quien guarda datos de clientes y no puede permitirse una fuga.",
        price: "1.150.000",
        period: "/mes",
        includes: [
          "Todo lo del plan Crecimiento",
          "Auditoría técnica de seguridad",
          "Acompañamiento en Ley 1581 y registro ante la SIC",
          "Cifrado, mínimo privilegio y control de accesos",
          "Revisión de seguridad en cada telemetría",
        ],
      },
    },
    cta: (name) => `Empezar con ${name}`,
    featuredAria: "Plan recomendado",
    founder: {
      kicker: "Programa fundador",
      text: "Los **tres primeros clientes** entran a precio reducido a cambio de permiso para publicar sus números. Lo digo de frente: todavía no tengo un caso propio que enseñarte, y prefiero que lo sepas por mí. Tú ganas el precio; yo, el caso.",
      slots: "3 cupos libres",
      cta: "Pedir un cupo",
    },
  },

  telemetry: {
    kicker: "03 — Telemetría",
    title: "Qué recibes",
    intro:
      "Un reporte con las cifras que de verdad importan: **cuánta gente te llamó**, cuánta escribió y cuánta buscó cómo llegar. Sin jerga y sin capturas de paneles que no dicen nada.",
    badge: "Comparado contra el mes anterior",
    report: "Reporte de misión",
    sample: "Muestra",
    metrics: [
      { k: "Llamadas", value: "38", delta: "+12" },
      { k: "Formularios", value: "14", delta: "+5" },
      { k: "Cómo llegar", value: "61", delta: "+19" },
      { k: "Posición local", value: "3.º", delta: "+4" },
      { k: "Citas en IA", value: "7", delta: "+3" },
      { k: "Escudo", value: "OK" },
    ],
    note: "Cifras de ejemplo · tu reporte lleva tus propios datos",
  },

  showcase: {
    kicker: "04 — Muestrario",
    title: "Así se vería el tuyo",
    intro:
      "Demostraciones que construí para probar ideas — un estudio creativo, una marca de café, una joyería, un hotel, un consultorio. Ninguna se parece a la otra, y esa es la idea.",
    cta: "Ver los seis",
    cardAria: (name) => `Ver caso: ${name}`,
  },

  security: {
    kicker: "05 — Escudo",
    title: "Security **First**",
    text: "Cuento con **especialización en Ciberseguridad**: cada proyecto que entrego nace endurecido — no como un parche al final, sino como parte del diseño. Tu sitio, tus datos y tus clientes, protegidos desde el día uno.",
    badge: "Ing. Informático · Esp. Ciberseguridad",
    practices: [
      { title: "Cabeceras y CSP estrictas", desc: "Sin scripts de terceros no autorizados." },
      { title: "HTTPS + HSTS", desc: "Cifrado de extremo a extremo, siempre." },
      { title: "Dominio blindado", desc: "DNS protegido y anti-suplantación de correo." },
      { title: "Datos protegidos", desc: "Credenciales cifradas y mínimo privilegio." },
    ],
    more: "Ver cómo protejo cada sitio",
  },

  faq: {
    kicker: "06 — Preguntas frecuentes",
    title: "Respondo tus dudas",
    items: [
      {
        q: "¿En cuánto tiempo veo resultados?",
        a: "La ficha de Google y las reseñas suelen moverse en semanas. El posicionamiento por búsquedas tarda de tres a seis meses — te lo digo antes de que firmes, no después.",
      },
      {
        q: "¿Hay permanencia? ¿Y si me quiero ir?",
        a: "Base no tiene permanencia. Crecimiento y Blindaje piden seis meses, porque antes de eso no hay nada que medir. Avisas con un mes y se cierra sin penalización.",
      },
      {
        q: "Si cancelo, ¿la web sigue siendo mía?",
        a: "Sí. El dominio y el contenido son tuyos desde el primer día y te los entrego funcionando. Lo que se acaba es el trabajo mensual, no tu sitio.",
      },
      {
        q: "¿Ya lo has hecho con alguien más?",
        a: "Todavía no con este modelo de trabajo, y prefiero decirlo yo. Por eso los tres primeros entran a precio de fundador a cambio de permiso para publicar sus números. Lo que sí puedes revisar es cómo trabajo: todo el muestrario está en línea y se puede navegar, y hay piezas de sectores muy distintos.",
      },
    ],
  },

  cta: {
    kicker: "07 — Contacto",
    title: "Let's Work **Together**",
    whatsapp: "WhatsApp",
    facebook: "Facebook",
    mockAlt: "Vista del portafolio doxdesigns.dev en un portátil",
  },

  form: {
    kicker: "Formulario",
    title: "Cuéntame qué necesitas",
    intro:
      "Rellena esto y te llega a mi WhatsApp o a mi correo con todo ordenado. Respondo en menos de 24 horas hábiles.",
    name: "Tu nombre",
    business: "Tu negocio",
    plan: "Plan que te interesa",
    planPlaceholder: "Elige uno (opcional)",
    planNone: "Todavía no lo sé",
    message: "Qué necesitas",
    messagePlaceholder: "Qué vendes, en qué ciudad, y qué te gustaría conseguir.",
    submitWhatsapp: "Enviar por WhatsApp",
    submitEmail: "Enviar por correo",
    note: "No se guarda nada en el sitio: el mensaje sale directo a WhatsApp o a tu app de correo.",
    subject: "Consulta desde doxdesigns.dev",
    compose: ({ name, business, plan, message }) =>
      [
        `Hola Santiago, soy ${name || "—"}${business ? ` de ${business}` : ""}.`,
        plan ? `Me interesa el plan ${plan}.` : "",
        message ? `\n${message}` : "",
        "\n(Enviado desde el formulario de doxdesigns.dev)",
      ]
        .filter(Boolean)
        .join("\n"),
    errors: { name: "Escribe tu nombre.", message: "Cuéntame al menos una línea." },
  },

  pages: {
    home: {
      seo: {
        title: "Santiago Miranda · Desarrollador y Diseñador Web | Dox Designs",
        description:
          "Dox Designs · Santiago Miranda: páginas web a medida para negocios en Cali y toda Colombia, con posicionamiento local, presencia en buscadores con IA y seguridad incluida. Planes mensuales desde COP 350.000.",
      },
    },

    plans: {
      seo: {
        title: "Planes y precios · Webs con posicionamiento y seguridad | Dox Designs",
        description:
          "Planes mensuales para negocios en Cali y toda Colombia: posicionamiento local, presencia en buscadores con IA, seguridad y cumplimiento de la Ley 1581. Desde COP 350.000 al mes, con la página web a medida incluida.",
      },
      word: "PLANES",
      kicker: "Planes de vuelo — Cali · Colombia",
      h1: "Elige tu **órbita**",
      intro:
        "Todo lo que incluye cada plan, el reporte que llega cada mes y las cuatro preguntas que suelen frenar la decisión. Sin letra pequeña: lo que ves aquí es lo que se cobra.",
      plansKicker: "Planes y precios",
      plansTitle: "Los tres planes",
      telemetryKicker: "Tu reporte mensual",
      faqKicker: "Antes de decidir",
    },

    services: {
      seo: {
        title: "Páginas web a medida, posicionamiento y seguridad en Cali | Dox Designs",
        description:
          "Qué incluye cada mes: posicionamiento local y ficha de Google, presencia en buscadores con IA, web a medida con formularios y WhatsApp, y seguridad con acompañamiento en la Ley 1581. Para negocios en Cali y toda Colombia.",
      },
      word: "SERVICIOS",
      kicker: "Servicios — Cali · Colombia",
      h1: "Lo que hago **cada mes**",
      intro:
        "Hago webs **a medida** —sin plantillas y sin sector preferido— y después las sostengo en cuatro frentes: que te **encuentren**, que la **IA te cite**, que te **escriban** y que estés **protegido**. Aquí está el detalle de cada uno y cómo se comprueba que funcionó.",
      ctaPrimary: "Diagnóstico gratis",
      ctaSecondary: "Ver precios",
      fronts: [
        {
          title: "Que te encuentren",
          desc: "Cuando alguien busca lo que tú vendes y le añade “cerca de mí” o el nombre de la ciudad, el objetivo es que aparezcas en ese puñado de resultados que la gente sí mira.",
          includes: [
            "Ficha de Google creada, verificada y completa",
            "Categorías, horarios, fotos y servicios al día",
            "Páginas propias por cada servicio o producto",
            "Trabajo de reseñas: pedirlas, ordenarlas y responderlas",
            "Datos estructurados de negocio local",
          ],
          measure: "Llamadas desde Google, solicitudes de “cómo llegar” y posición en el mapa.",
        },
        {
          title: "Que la IA te cite",
          desc: "Cada vez más gente pregunta antes de buscar. Si alguien le pide a ChatGPT una recomendación de lo que tú haces en tu ciudad, hay un negocio en esa respuesta.",
          includes: [
            "Contenido que responde preguntas concretas de tus clientes",
            "Estructura legible para los modelos, no solo para Google",
            "Datos estructurados de preguntas frecuentes",
            "Ficha coherente en los directorios que las IA leen",
            "Revisión mensual de en qué respuestas apareces",
          ],
          measure:
            "Menciones detectadas en respuestas de IA. Te lo digo claro: la atribución todavía es parcial y no vendo esto como un canal medible.",
        },
        {
          title: "Que te escriban",
          desc: "Que te encuentren no sirve de nada si al llegar no saben qué hacer. La web tiene que convertir la visita en un mensaje, una cotización o una cita, sin que nadie levante el teléfono.",
          includes: [
            "Sitio a medida, rápido y en tu dominio",
            "Formulario, cotizador o agenda, según lo que pidas",
            "WhatsApp a un toque desde cualquier página",
            "Textos pensados para que el visitante decida",
            "Carga rápida también en datos móviles",
          ],
          measure: "Formularios enviados, clics a WhatsApp y contactos llegados desde el sitio.",
        },
        {
          title: "Que estés protegido",
          desc: "Cualquier negocio que guarde datos de sus clientes está bajo la Ley 1581. Esto es lo que casi nadie que hace webs puede acompañarte a resolver, y es donde mi especialización deja de ser un adorno.",
          includes: [
            "HTTPS, cabeceras estrictas y CSP desde el diseño",
            "Respaldos automáticos y restauración probada",
            "Cifrado, mínimo privilegio y control de accesos",
            "Acompañamiento técnico en la Ley 1581 y el registro ante la SIC",
            "Revisión de seguridad en cada reporte mensual",
          ],
          measure: "Estado del escudo en la telemetría del mes y registro de parches aplicados.",
        },
      ],
      measureLabel: "Cómo se mide",
      cycle: {
        kicker: "Cómo se trabaja",
        title: "Un arranque y un bucle",
        intro:
          "No es un proyecto que se entrega y se acaba. Hay un primer mes de montaje y después un ciclo que se repite, porque el posicionamiento se sostiene o se pierde.",
        steps: [
          {
            num: "01",
            title: "Diagnóstico",
            desc: "Gratis y en 48 horas. Miro cómo estás hoy en Google, qué tiene la competencia que tú no, y qué riesgos hay con los datos que manejas. Te lo entrego por escrito, contrates o no.",
          },
          {
            num: "02",
            title: "Montaje",
            desc: "El primer mes: sitio en tu dominio, ficha de Google verificada, agenda y WhatsApp conectados, y la base de seguridad puesta. Es el mes con más trabajo y el que deja todo funcionando.",
          },
          {
            num: "03",
            title: "Ciclo mensual",
            desc: "Lo que sostiene el resultado: contenido nuevo, reseñas, ajustes de posicionamiento, parches y respaldos. Esto es lo que no se puede hacer una vez y abandonar.",
          },
          {
            num: "04",
            title: "Telemetría",
            desc: "Cada mes recibes el reporte con llamadas, formularios, cómo llegar, posición y estado de seguridad. Si un número no se mueve, ahí decidimos qué cambiar.",
          },
        ],
      },
      security: {
        title: "La seguridad no es un extra",
        text: "Tengo especialización en Ciberseguridad. Todo sitio sale con HTTPS, cabeceras estrictas y buenas prácticas desde el diseño. Y si guardas datos de tus clientes —cualquier negocio que lo haga está bajo la Ley 1581—, eso es el punto de partida y no la meta: el plan Blindaje añade auditoría, monitoreo y acompañamiento en el cumplimiento.",
        note: "Acompañamiento **técnico**: preparo tu sitio y tus procesos para cumplir, no sustituyo el criterio de un abogado.",
      },
      faq: {
        kicker: "Dudas comunes",
        title: "Preguntas frecuentes",
        introPre: "Las de permanencia, salida y propiedad del sitio están en ",
        introLink: "planes y precios",
        introPost: ".",
        items: [
          {
            q: "¿Y si ya tengo página web?",
            a: "Mejor: nos ahorramos el montaje. Reviso lo que tienes, te digo si conviene conservarla o rehacerla, y arrancamos por la ficha de Google y el posicionamiento, que suele ser lo que de verdad falta.",
          },
          {
            q: "¿Cuánto tengo que trabajar yo en esto?",
            a: "Poco, pero no cero. Necesito una reunión corta al arrancar, acceso a tu ficha de Google y que me cuentes cosas que solo tú sabes: qué te preguntan tus clientes, qué producto o servicio quieres mover. El resto lo llevo yo.",
          },
          {
            q: "¿El dominio y el hosting van aparte?",
            a: "El hosting va incluido en el plan. El dominio se compra a tu nombre y queda tuyo desde el primer día — son unos pocos dólares al año que pagas tú directamente, y prefiero que sea así para que nunca dependa de mí.",
          },
          {
            q: "¿Trabajas con cualquier tipo de negocio?",
            a: "Sí. Cada proyecto se diseña para el negocio que lo pide: no hay plantilla ni sector preferido. En el muestrario hay piezas de un estudio creativo, una marca de café, una joyería, un hotel y un consultorio, y ninguna se parece a la otra — precisamente por eso.",
          },
          {
            q: "¿Trabajas solo en Cali?",
            a: "Estoy en Cali y trabajo con toda Colombia. Todo el proceso se lleva de forma remota sin perder nada, y si tu caso lo necesita, hablo inglés a nivel C1.",
          },
          {
            q: "¿Qué pasa si quiero algo que no está en los planes?",
            a: "Se cotiza aparte y te lo digo antes, no después. Una aplicación interna, una integración con tu software de facturación o inventario, o una tienda en línea completa son otro tipo de trabajo y no tiene sentido meterlos en una cuota mensual.",
          },
        ],
      },
      final: {
        title: "Empieza por el diagnóstico",
        text: "En 48 horas te digo por escrito cómo estás hoy en Google, qué tiene la competencia que tú no, y qué riesgos hay con los datos que manejas. Es gratis y es tuyo, contrates o no.",
        cta: "Pedir mi diagnóstico",
        secondary: "Ver planes y precios",
      },
    },

    security: {
      seo: {
        title: "Seguridad web desde el diseño · Especialista en Ciberseguridad | Dox Designs",
        description:
          "Qué hace Dox Designs para que tu sitio y los datos de tus clientes estén protegidos: HTTPS con HSTS, cabeceras estrictas y CSP, respaldos, cifrado, control de accesos y acompañamiento técnico en la Ley 1581. Con el propio sitio como prueba.",
      },
      word: "ESCUDO",
      kicker: "Seguridad — Ing. Informático · Esp. Ciberseguridad",
      h1: "Seguridad desde el **diseño**",
      intro:
        "Cada sitio que entrego nace endurecido. HTTPS, cabeceras estrictas, respaldos y mínimo privilegio no son un extra que se añade al final: son la forma en que se construye. Aquí está qué hago exactamente, cómo lo compruebas tú mismo y qué añade el plan Blindaje.",
      summary:
        "Dox Designs (Santiago Miranda, Ingeniero Informático con especialización en Ciberseguridad, Cali) entrega sitios web endurecidos desde el diseño: HTTPS con HSTS, Content-Security-Policy estricta, respaldos automáticos, cifrado y control de accesos, con acompañamiento técnico en la Ley 1581 de protección de datos.",
      pillars: [
        {
          title: "Transporte y cabeceras",
          desc: "Lo que el navegador exige antes de fiarse de una página.",
          items: [
            "HTTPS siempre, con HSTS y precarga",
            "Content-Security-Policy sin scripts inline ni terceros no autorizados",
            "Protección contra iframes, sniffing y filtración del referer",
            "Permisos del navegador cerrados (cámara, micrófono, geolocalización)",
          ],
        },
        {
          title: "Datos",
          desc: "Los de tus clientes y los tuyos.",
          items: [
            "Cifrado en tránsito y en reposo",
            "Mínimo privilegio: cada acceso solo ve lo que necesita",
            "No se guarda lo que no hace falta guardar",
            "Contraseñas y credenciales nunca en texto plano",
          ],
        },
        {
          title: "Continuidad",
          desc: "Que un fallo no sea una pérdida.",
          items: [
            "Respaldos automáticos y restauración probada",
            "Monitoreo de disponibilidad y de cambios",
            "Parches y actualizaciones dentro del ciclo mensual",
            "Registro de qué se cambió y cuándo",
          ],
        },
        {
          title: "Dominio y correo",
          desc: "Que nadie pueda hacerse pasar por ti.",
          items: [
            "DNS protegido y bloqueo de transferencias",
            "SPF, DKIM y DMARC contra la suplantación de correo",
            "security.txt para que un investigador sepa a quién avisar",
            "Renovaciones de dominio y certificado vigiladas",
          ],
        },
      ],
      proof: {
        kicker: "Este sitio es la prueba",
        title: "Las cabeceras con las que corre doxdesigns.dev",
        intro:
          "No es una lista de intenciones: son las cabeceras reales que este sitio envía en cada respuesta. Cualquier sitio que entrego sale con las mismas.",
        headers: [
          {
            name: "Content-Security-Policy",
            why: "Solo se ejecuta código propio y el de las dos herramientas de medición autorizadas. Un script inyectado no corre.",
          },
          {
            name: "Strict-Transport-Security",
            why: "Dos años de HTTPS obligatorio, subdominios incluidos y en la lista de precarga de los navegadores.",
          },
          { name: "X-Frame-Options: DENY", why: "Nadie puede meter la página en un iframe para engañar a un visitante." },
          {
            name: "X-Content-Type-Options: nosniff",
            why: "El navegador no adivina tipos de archivo: un archivo disfrazado no se ejecuta.",
          },
          { name: "Referrer-Policy", why: "Al salir hacia otro sitio no se filtra la URL completa de la que vienes." },
          {
            name: "Permissions-Policy",
            why: "Cámara, micrófono, geolocalización, pagos y sensores desactivados: la página no los necesita y no los pide.",
          },
          { name: "Cross-Origin-Opener-Policy", why: "Una pestaña abierta desde otro sitio no puede manipular esta." },
        ],
        check: "Compruébalo con securityheaders.com o el Observatory de Mozilla: basta con pegar el dominio.",
        securityTxt: "Ver el security.txt del sitio",
      },
      plans: {
        kicker: "En cada plan",
        title: "Qué seguridad lleva cada órbita",
        intro:
          "La base va en todos los planes, porque no se entrega un sitio a medias. El plan Blindaje es para quien guarda datos de clientes y necesita, además, auditoría y cumplimiento.",
        tiers: [
          { name: "Base", items: ["HTTPS + HSTS y cabeceras estrictas", "Respaldos y monitoreo", "Dominio y correo protegidos"] },
          {
            name: "Crecimiento",
            items: ["Todo lo de Base", "Estado del escudo en cada telemetría", "Revisión de accesos y parches al mes"],
          },
          {
            name: "Blindaje",
            items: [
              "Todo lo de Crecimiento",
              "Auditoría técnica de seguridad",
              "Cifrado, mínimo privilegio y control de accesos",
              "Acompañamiento en Ley 1581 y registro ante la SIC",
            ],
          },
        ],
        cta: "Ver planes y precios",
      },
      compliance: {
        kicker: "Ley 1581",
        title: "Datos personales y cumplimiento",
        text: "Cualquier negocio en Colombia que guarde datos de sus clientes —nombres, teléfonos, correos, historias— está bajo la Ley 1581 de 2012: necesita una política de tratamiento, autorización para recoger los datos, medidas de seguridad y, en muchos casos, el registro de sus bases ante la SIC. El plan Blindaje te acompaña en la parte técnica: cómo se recogen, dónde se guardan, quién accede y cómo se borran.",
        note: "Acompañamiento **técnico**: preparo tu sitio y tus procesos para cumplir, no sustituyo el criterio de un abogado.",
      },
      faq: {
        kicker: "Dudas de seguridad",
        title: "Lo que suelen preguntar",
        items: [
          {
            q: "¿Necesito esto si solo tengo una página informativa?",
            a: "Sí, aunque menos. Una página sin formularios sigue teniendo un dominio que pueden suplantar, un certificado que caduca y un servidor que puede quedarse sin actualizar. La base —HTTPS, cabeceras, respaldos— va en todos los planes precisamente por eso.",
          },
          {
            q: "¿Qué pasa si hackean mi sitio?",
            a: "Se restaura desde el último respaldo probado, se cierra la puerta por la que entraron y te lo cuento por escrito: qué pasó, qué datos pudieron verse y qué se cambió. Con el plan Blindaje la revisión mensual de accesos y parches hace que esa puerta no se quede abierta meses sin que nadie lo note.",
          },
          {
            q: "¿Guardas tú los datos de mis clientes?",
            a: "No. Los datos viven en tu dominio y en los servicios contratados a tu nombre; yo tengo el acceso mínimo para mantenerlos, y ese acceso se revoca cuando termina la relación. El formulario de este mismo sitio no guarda nada: abre el mensaje en tu WhatsApp o en tu correo.",
          },
          {
            q: "¿La Ley 1581 me aplica a mí?",
            a: "Si tienes clientes y guardas su nombre y su teléfono, sí. Aplica a cualquier persona o empresa que trate datos personales en Colombia, no solo a clínicas o bancos. Lo que cambia es cuánto hay que hacer: un consultorio con historias clínicas tiene más obligaciones que una cafetería con una lista de reservas.",
          },
        ],
      },
      final: {
        title: "El diagnóstico incluye seguridad",
        text: "En el diagnóstico gratuito reviso el certificado, las cabeceras, qué datos expone tu sitio hoy y qué riesgos hay con la información que manejas. Por escrito, en 48 horas, contrates o no.",
        cta: "Pedir mi diagnóstico",
        secondary: "Ver el plan Blindaje",
      },
    },

    projects: {
      seo: {
        title: "Muestrario de proyectos · Santiago Miranda | Dox Designs",
        description:
          "Nueve demostraciones navegables de Santiago Miranda (Dox Designs): un estudio creativo, una marca de café, una joyería, un hotel, un consultorio y más — React, Next.js, .NET y Angular, desplegadas en Vercel.",
      },
      word: "PROJECTS",
      kicker: "Proyectos",
      h1: "Proyec**tos**",
      intro:
        "Demostraciones que construí para probar ideas: cada caso con su contexto, mi rol, el stack y el resultado. Los que tienen demo en vivo están desplegados en Vercel y se pueden recorrer.",
      table: {
        caption: "Índice de proyectos",
        num: "#",
        project: "Proyecto",
        type: "Tipo",
        stack: "Stack",
        year: "Año",
        featured: "Destacado",
      },
      labels: {
        context: "Contexto",
        role: "Rol",
        result: "Resultado",
        demo: "Demo en vivo",
        code: "Código",
        teaserAlt: (name) => `Teaser de ${name}`,
      },
      types: { web: "Web", fullstack: "Full-stack", frontend: "Frontend", chatbot: "Chat-bot" },
      items: {
        "gem-eyes": {
          name: "Gem Eyes",
          tag: "Concepto · estudio creativo",
          desc: "Demo de sitio para un estudio creativo, con identidad visual audaz: ilustración a pantalla completa, animaciones expresivas y secciones de galería, proceso y contacto.",
          role: "Concepto, diseño y desarrollo",
          result:
            "Experiencia inmersiva y responsive que destaca el arte del estudio sin sacrificar la velocidad de carga.",
        },
        "dr-adrian": {
          name: "Portafolio Dr. Adrián",
          tag: "Concepto · portafolio médico",
          desc: "Demo de portafolio para un especialista médico: una carta de presentación en línea que reúne perfil profesional, servicios y datos de contacto.",
          role: "Concepto, diseño y desarrollo",
          result: "Diseño responsive y limpio, desplegado en Vercel.",
        },
        calidoso: {
          name: "Calidoso · Café",
          tag: "Concepto · e-commerce de café",
          desc: "Demo de tienda en línea para una marca de café: catálogo de producto, presentación de marca e interfaz responsive desplegada en Vercel.",
          role: "Concepto, diseño y desarrollo",
          result:
            "E-commerce enfocado en conversión, con identidad cálida y navegación clara del catálogo.",
        },
        vitalis: {
          name: "Vitalis · Consultorio",
          tag: "Concepto · consultorio médico",
          desc: "Demo de sitio para un consultorio médico: presentación institucional de servicios de salud con interfaz responsive, desplegada en Vercel.",
          role: "Concepto, diseño y desarrollo",
          result:
            "Estructura pensada para comunicar los servicios, generar confianza y facilitar el contacto.",
        },
        "eco-muestreo": {
          name: "Eco Muestreo · Joyería",
          tag: "Concepto · joyería artesanal",
          desc: "Demo de tienda en línea para una joyería artesanal: catálogo de piezas, presentación de marca e interfaz responsive desplegada en Vercel.",
          role: "Concepto, diseño y desarrollo",
          result:
            "E-commerce con estética artesanal, pensado para resaltar cada pieza y facilitar la compra.",
        },
        "hotel-marea": {
          name: "Hotel Marea",
          tag: "Next.js + TypeScript",
          desc: "Aplicación web de muestreo construida con Next.js (App Router) y TypeScript, con persistencia mediante Drizzle ORM y despliegue continuo en Vercel.",
          role: "Full-stack",
          result:
            "Arquitectura modular (app, modules, components, db) pensada para escalar, con despliegue continuo en Vercel.",
        },
        aurora: {
          name: "Aurora · Video Hero",
          tag: "React + Tailwind (Vite)",
          desc: "Landing responsive e interactiva construida alrededor de un único video como base de toda la página: el clip queda fijo de fondo y el contenido se desliza encima, reacciona al puntero y responde al scroll.",
          role: "Diseño y desarrollo completo",
          result:
            "Sirve 720p/1280p/1920p según la pantalla (WebM + MP4), con poster + blur-up, dock para controlar el video y soporte de «reducir movimiento».",
        },
        "integracion-ia": {
          name: "Integración de IA",
          tag: "Tecnologías META",
          desc: "Ejercicio de chat-bot de atención sobre tecnologías META: manejo de tokens y entrenamiento acotado a un guion de negocio.",
          role: "Concepto, integración y entrenamiento",
          result:
            "Flujo de conversación completo sobre un guion cerrado, con manejo de tokens y respuestas entrenadas para un dominio concreto.",
        },
        "crud-clientes": {
          name: "CRUD Clientes",
          tag: ".NET 8 + Angular",
          desc: "Gestor de clientes (prueba técnica) con API REST en .NET 8 / EF Core 8 y frontend Angular con componentes standalone y signals.",
          role: "Full-stack · prueba técnica",
          result:
            "CRUD completo con búsqueda, paginación, filtros por estado, validación en doble capa, índice único anti-duplicados y documentación Swagger/OpenAPI.",
        },
      },
    },

    about: {
      seo: {
        title: "Sobre mí · Santiago Miranda, Ing. Informático y Esp. en Ciberseguridad | Dox Designs",
        description:
          "Quién está detrás de Dox Designs: Santiago Miranda, Ingeniero Informático con especialización en Ciberseguridad, en Cali. Hace webs a medida y las sostiene cada mes con posicionamiento, presencia en IA y seguridad.",
      },
      word: "ABOUT",
      kicker: "Sobre mí — Ing. Informático · Esp. Ciberseguridad",
      h1: "Sobre **Mí**",
      bio: "Soy **Santiago Alejandro Miranda Ortiz**, Ingeniero en Informática con especialización en Ciberseguridad, en Cali. Hago páginas web a medida para negocios y después las sostengo cada mes: posicionamiento local, presencia en buscadores con IA y protección de los datos que manejan. Vengo del desarrollo de software —.NET, Angular, React, SQL Server— y de la seguridad, y eso es lo que hace que cada sitio que entrego nazca endurecido y no parcheado al final.",
      summary:
        "Santiago Miranda (Dox Designs) es Ingeniero Informático con especialización en Ciberseguridad, en Cali, Colombia. Diseña y desarrolla páginas web a medida y las mantiene bajo un plan mensual que incluye posicionamiento local, presencia en buscadores con IA y seguridad.",
      pills: { english: "Inglés C1", github: "GitHub" },
      photoAlt: (i) => `Santiago Miranda, retrato ${i + 1} de 3`,
      skills: {
        kicker: "01 — Habilidades técnicas",
        title: "Habilidades",
        groups: {
          backend: { label: "Backend", items: [".NET 8 / C#", "APIs REST", "POO", "Arquitecturas de app"] },
          frontend: { label: "Frontend", items: ["Angular 19", "TypeScript", "JavaScript", "React", "HTML", "CSS"] },
          db: { label: "Bases de datos", items: ["SQL Server", "MySQL", "Modelado relacional"] },
          git: { label: "Control de versiones", items: ["Git", "Flujos con repositorios"] },
          tools: {
            label: "Otras herramientas",
            items: ["Python", "Java", "Power BI", "Big Data", "Asistentes de IA", "AutoCAD", "Office"],
          },
          soft: {
            label: "Habilidades clave",
            items: ["Gestión del tiempo", "Comunicación", "Trabajo en equipo", "Adaptabilidad"],
          },
        },
      },
      timeline: {
        kicker: "02 — Trayectoria",
        title: "Experiencia & Educación",
        items: {
          dispatcher: {
            kind: "Experiencia",
            title: "Dispatcher Bilingüe",
            place: "Gallant Luxury Transportation",
            period: "Más de 1 año",
            points: [
              "Coordinación de asignación y despacho de servicios de transporte, gestionando horarios y rutas.",
              "Comunicación con conductores y clientes en inglés y español, resolviendo incidencias en tiempo real bajo presión.",
              "Registros precisos de operaciones, asegurando trazabilidad de cada servicio.",
            ],
          },
          degree: {
            kind: "Educación",
            title: "Ingeniería Informática",
            place: "Universidad Autónoma de Occidente · Cali",
            period: "Ene 2021 – Actualidad",
            points: ["Pregrado próximo a graduarse, orientado al desarrollo de software full-stack."],
          },
          school: {
            kind: "Educación",
            title: "Bachillerato Académico",
            place: "Colegio Americano de Cali",
            period: "2014 – 2020",
            points: [],
          },
        },
      },
      achievements: {
        kicker: "03 — Otros logros",
        items: [
          "Experiencia galardonada en modelos intercolegiales tipo ONU.",
          "Organizador y promotor de un concurso de robótica.",
          "Capacitación en protocolos de gala.",
          "Autor del libro «Encerrados» (no publicado).",
        ],
      },
      together: {
        kicker: "¿Trabajamos juntos?",
        text: "Siempre abierto a nuevos proyectos y colaboraciones.",
        cta: "Contacto",
      },
    },

    contact: {
      seo: {
        title: "Contacto · Santiago Miranda | Dox Designs",
        description:
          "Hablemos de tu proyecto. WhatsApp, correo, formulario y redes de Santiago Miranda (Dox Designs), diseñador y desarrollador web en Cali, Colombia.",
      },
      kicker: "Contacto",
      h1: "Let's Work **Together**",
      intro:
        "Cuéntame qué necesitas y te respondo con un plan y un presupuesto. Lo más rápido es WhatsApp; si prefieres el formulario o el correo, también funcionan.",
      channels: "Vías directas",
      schemaName: "Contacto · Dox Designs",
    },

    privacy: {
      seo: {
        title: "Política de privacidad y tratamiento de datos | Dox Designs",
        description:
          "Cómo trata Dox Designs (Santiago Miranda) los datos personales de quienes visitan doxdesigns.dev o escriben por el formulario: qué se recoge, para qué, cuánto tiempo y cómo ejercer tus derechos según la Ley 1581 de 2012.",
      },
      kicker: "Legal",
      h1: "Política de **privacidad**",
      updated: "Última actualización: septiembre de 2026",
      intro:
        "Esta política explica qué datos personales trata Santiago Alejandro Miranda Ortiz (Dox Designs), con domicilio en Cali, Colombia, cuando visitas doxdesigns.dev o te pones en contacto, y cómo puedes ejercer tus derechos conforme a la Ley 1581 de 2012 y el Decreto 1377 de 2013.",
      sections: [
        {
          title: "Responsable del tratamiento",
          body: [
            "Santiago Alejandro Miranda Ortiz, que opera bajo el nombre comercial Dox Designs, en Cali (Valle del Cauca), Colombia. Correo de contacto: santiago.miranda.trabajo@gmail.com.",
          ],
        },
        {
          title: "Qué datos se recogen y para qué",
          body: [
            "**Datos de contacto que tú envías.** Cuando escribes por WhatsApp, correo o el formulario del sitio, recibo el nombre, el negocio, el plan de interés y el mensaje que decides incluir. El formulario no guarda nada en el sitio: compone el mensaje y lo abre en tu WhatsApp o en tu aplicación de correo. Uso esos datos únicamente para responderte y preparar una propuesta.",
            "**Datos de navegación.** El sitio usa Google Analytics 4 y el píxel de Meta para saber cuántas personas lo visitan, desde dónde y qué páginas miran, y para medir campañas. Estas herramientas usan identificadores y cookies propios; no recibo tu nombre ni tu dirección a través de ellas.",
          ],
        },
        {
          title: "Cookies y medición",
          body: [
            "Puedes bloquear o borrar las cookies desde la configuración de tu navegador. Google ofrece además un complemento para desactivar Analytics, y Meta permite ajustar las preferencias de anuncios desde tu cuenta. El sitio funciona igual sin ellas.",
          ],
        },
        {
          title: "Conservación",
          body: [
            "Los mensajes de contacto se conservan mientras dure la conversación comercial y, si hay contrato, mientras dure la relación y los plazos legales de facturación. Si no hay relación comercial, se eliminan en un plazo máximo de doce meses.",
          ],
        },
        {
          title: "Tus derechos",
          body: [
            "Puedes conocer, actualizar, rectificar y suprimir tus datos, pedir prueba de la autorización, saber qué uso se les ha dado y revocar la autorización en cualquier momento, salvo que exista un deber legal o contractual de conservarlos. Basta con escribir a santiago.miranda.trabajo@gmail.com indicando qué quieres hacer; respondo en un máximo de diez días hábiles, como marca la ley.",
            "Si consideras que el tratamiento no se ajusta a la normativa, puedes acudir a la Superintendencia de Industria y Comercio (SIC), autoridad de protección de datos en Colombia.",
          ],
        },
        {
          title: "Cambios en esta política",
          body: [
            "Si cambia lo que se recoge o para qué, esta página se actualiza y cambia la fecha de arriba. No se usan tus datos para nada que no esté escrito aquí.",
          ],
        },
      ],
    },
  },

  a11y: {
    visorAlt: "Casco con un agujero negro girando en el visor",
    newTab: "(se abre en una pestaña nueva)",
    breadcrumbHome: "Inicio",
    pauseCarousel: "Pausar el carrusel",
  },

  schema: {
    businessDescription:
      "Diseño y desarrollo de páginas web a medida en Cali, Colombia, con planes mensuales que incluyen posicionamiento local, presencia en buscadores con IA y seguridad. Sitios rápidos, seguros y responsive.",
    catalogName: "Planes mensuales de crecimiento digital",
    offers: [
      {
        name: "Páginas web a medida",
        description:
          "Sitios diseñados para cada negocio, sin plantillas: rápidos, responsive, en tu propio dominio y con formularios y WhatsApp conectados.",
      },
      {
        name: "Posicionamiento local",
        description:
          "Ficha de Google verificada, trabajo de reseñas y contenido para aparecer en las búsquedas cercanas de tu ciudad.",
      },
      {
        name: "Presencia en buscadores con IA",
        description:
          "Contenido y datos estructurados para salir citado en las respuestas de ChatGPT, Perplexity y los resúmenes de Google.",
      },
      {
        name: "Seguridad y cumplimiento",
        description:
          "Endurecimiento del sitio, respaldos, monitoreo y acompañamiento técnico en la Ley 1581 de protección de datos personales.",
      },
    ],
    jobTitle: "Diseñador y desarrollador web · Ingeniero Informático",
    knowsAbout: [
      "Diseño web",
      "Desarrollo web",
      "Posicionamiento local (SEO local)",
      "Optimización para buscadores con IA",
      "Ciberseguridad",
      "React",
      "Next.js",
      "TypeScript",
      ".NET",
      "Angular",
    ],
    credential: "Especialización en Ciberseguridad",
    degree: "Ingeniería Informática",
    university: "Universidad Autónoma de Occidente",
    planDescription: (plan) => `Plan mensual ${plan} de Dox Designs: página web a medida incluida.`,
  },

  llms: {
    summary:
      "Dox Designs es el estudio de Santiago Miranda, Ingeniero Informático con especialización en Ciberseguridad, en Cali, Colombia. Diseña y desarrolla páginas web a medida para negocios y las sostiene con un plan mensual (COP 350.000, 690.000 o 1.150.000 al mes) que incluye posicionamiento local, presencia en buscadores con IA, telemetría mensual y seguridad con acompañamiento en la Ley 1581. Ofrece un diagnóstico gratuito por escrito en 48 horas. Contacto: WhatsApp +57 318 981 9384 · santiago.miranda.trabajo@gmail.com.",
    pages: {
      home: "Portada: la promesa, las cuatro especialidades, los planes, la telemetría, el muestrario y la seguridad.",
      plans: "Los tres planes mensuales con precio, qué incluye cada uno, el reporte mensual y las preguntas frecuentes de la suscripción.",
      services: "Qué se hace cada mes en cada frente (posicionamiento, IA, conversión, seguridad), el ciclo de trabajo y las dudas operativas.",
      security: "Cómo se protege cada sitio: cabeceras reales del propio doxdesigns.dev, datos, continuidad, dominio, qué lleva cada plan y la Ley 1581.",
      projects: "Nueve demostraciones navegables con contexto, rol, stack y resultado.",
      about: "Quién es Santiago Miranda: formación, habilidades y trayectoria.",
      contact: "WhatsApp, correo, formulario y redes.",
      privacy: "Política de privacidad y tratamiento de datos (Ley 1581 de 2012).",
    },
  },
};
