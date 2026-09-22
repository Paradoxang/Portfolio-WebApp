import type { Content } from "./types";

/**
 * English — adapted, not translated.
 *
 * The Spanish site sells to businesses in Cali. This version speaks to an
 * international client: prices in USD, "Google Business Profile" instead of
 * "ficha de Google", privacy compliance framed as GDPR/CCPA-ready technical
 * work instead of Colombia's Ley 1581, and the location framed as a remote
 * studio in the GMT-5 timezone rather than a local shop.
 *
 * USD pricing is the COP ladder converted at the day's rate (3,173.06 COP per
 * USD on 22 Sep 2026: 350,000 → 110.3 · 690,000 → 217.5 · 1,150,000 → 362.4),
 * rounded to the nearest 5. Change it here and only here.
 */
export const en: Content = {
  locale: "en",

  meta: {
    htmlLang: "en",
    ogLocale: "en_US",
    siteName: "Dox Designs · Santiago Miranda",
    ogImageAlt: "Santiago Miranda — Dox Designs",
    langName: "English",
    switchTo: "Español",
    switchAria: "Cambiar a español",
  },

  routes: {
    home: { label: "Home" },
    plans: { label: "Plans" },
    services: { label: "Services" },
    security: { label: "Security" },
    projects: { label: "Showcase" },
    about: { label: "About" },
    contact: { label: "Contact" },
    privacy: { label: "Privacy" },
  },

  anchors: {
    services: "services",
    plans: "plans",
    telemetry: "telemetry",
    showcase: "showcase",
    shield: "shield",
    faq: "faq",
    contact: "contact",
  },

  contact: {
    location: "Cali · CO · Remote worldwide",
    whatsappMessage: "Hi Santiago, I found your portfolio and I'm interested in a project.",
    whatsappPlan: (plan) =>
      `Hi Santiago, I found your portfolio and I'm interested in the ${plan} plan.`,
    available: "Available for projects",
    availableShort: "Available for missions",
    timezone: "GMT-5 · overlaps US business hours",
  },

  nav: {
    links: [
      { key: "home", label: "Home" },
      { key: "plans", label: "Plans" },
      { key: "services", label: "Services" },
      { key: "security", label: "Security" },
      { key: "projects", label: "Showcase" },
      { key: "about", label: "About" },
      { key: "contact", label: "Contact" },
    ],
    cta: "Free audit",
    ctaShort: "Audit",
    open: "Open menu",
    close: "Close menu",
    navigation: "Navigation",
    directContact: "Direct contact",
    whatsapp: "WhatsApp",
    form: "Contact form",
    skip: "Skip to content",
    language: "Language",
  },

  footer: {
    tagline: "Custom websites that get found — on a monthly plan, with security built in.",
    navigation: "Navigation",
    contact: "Contact",
    legal: "Legal & settings",
    rights: "All rights reserved",
    madeBy: "Designed and built by",
    lightMode: {
      label: "Light mode",
      on: "Light mode is on: fewer effects, smoother scrolling",
      off: "Turn on light mode if the site feels slow",
    },
  },

  hero: {
    kicker: "Custom websites that get found · Remote, GMT-5",
    h1: "Get found when they **search**.",
    ctaPrimary: "Free audit",
    ctaSecondary: "See plans",
    credential: "Santiago Miranda · Computer Engineer · Cybersecurity specialist",
    railServices: "Specialties",
    railPlans: "Flight plans",
    railPlansAria: "See the flight plans",
    available: "Available for missions",
    nameSr: "Santiago Miranda",
    hud: {
      rows: [
        { key: "SYS", values: ["DOX//DESIGNS", "SM · 01", "CORE OK"] },
        { key: "STACK", values: ["REACT 18.3", ".NET 8.0", "NODE 20"] },
        { key: "ORIGIN", values: ["CALI · CO", "3.4516 N", "76.5320 W"] },
        { key: "LINK", values: ["DOXDESIGNS.DEV", "TLS 1.3", "HSTS ON"] },
        { key: "BUILD", values: ["SSG · PRERENDER", "CLS 0.00", "TTFB 42MS"] },
        { key: "STATUS", values: ["AVAILABLE", "ACCEPTING", "MISSIONS"] },
      ],
      bracket: ["SPECIALTIES", "FULL-STACK", "UI · UX", "SECURITY"],
      ticker:
        "SYS://DOX · UPLINK STABLE · LAT 3.4516 N · LON 76.5320 W · REACT 18.3 · .NET 8.0 · NODE 20 · TTFB 42MS · CLS 0.00 · STATUS: AVAILABLE FOR MISSIONS · ",
    },
  },

  services: {
    kicker: "01 — Specialties",
    title: "What I Do",
    intro:
      "Local search visibility, presence in AI answers and protection of your business data, on one monthly plan. **The website is included.**",
    items: {
      seo: {
        title: "Get found",
        desc: "Local SEO, Google Business Profile and reviews, so you show up when someone searches near them.",
        summary: "Show up in local search.",
        label: "Local SEO",
        cta: "See plans",
      },
      ai: {
        title: "Get cited by AI",
        desc: "Content and structured data built to appear in ChatGPT, Perplexity and Google AI Overviews.",
        summary: "Appear in AI answers.",
        label: "AI search",
        cta: "See plans",
      },
      convert: {
        title: "Get the message",
        desc: "A custom site with forms, booking and WhatsApp, so contact happens without a phone call.",
        summary: "Forms and WhatsApp, direct.",
        label: "Conversion",
        cta: "See the showcase",
      },
      protect: {
        title: "Stay protected",
        desc: "Customer data encrypted, the site monitored and your privacy setup kept GDPR/CCPA-ready.",
        summary: "Data and compliance, current.",
        label: "Compliance",
        cta: "See the shield",
      },
    },
  },

  plans: {
    kicker: "02 — Flight plans",
    title: "Choose your orbit",
    intro:
      "I work on a monthly fee, not one-off projects. Ranking on Google isn't something you achieve once and walk away from — it's sustained. The website is included in all three.",
    currency: "USD",
    items: {
      base: {
        label: "Low orbit",
        name: "Base",
        who: "For the business that isn't online yet.",
        price: "110",
        period: "/month",
        includes: [
          "Your own fast website, on your domain",
          "Google Business Profile set up and verified",
          "Contact form and WhatsApp connected",
          "Backups, updates and monitoring",
          "Monthly telemetry report",
        ],
      },
      growth: {
        label: "Most popular",
        name: "Growth",
        who: "For the business that's online and wants to be found first.",
        price: "220",
        period: "/month · 6-month minimum",
        includes: [
          "Everything in Base",
          "Local SEO and review management",
          "Two new pieces of content a month",
          "Presence in AI search answers",
          "Extended monthly telemetry",
        ],
      },
      shield: {
        label: "Sensitive data",
        name: "Shield",
        who: "For anyone who stores customer data and can't afford a leak.",
        price: "365",
        period: "/month",
        includes: [
          "Everything in Growth",
          "Technical security audit",
          "GDPR/CCPA-ready privacy setup and guidance",
          "Encryption, least privilege and access control",
          "Security review in every report",
        ],
      },
    },
    cta: (name) => `Start with ${name}`,
    featuredAria: "Recommended plan",
    founder: {
      kicker: "Founder program",
      text: "The **first three clients** get founder pricing in exchange for permission to publish their numbers. I'll say it plainly: I don't have a case study of my own to show you yet, and I'd rather you hear it from me. You get the price; I get the case.",
      slots: "3 spots open",
      cta: "Claim a spot",
    },
  },

  telemetry: {
    kicker: "03 — Telemetry",
    title: "What you get",
    intro:
      "A report with the numbers that actually matter: **how many people called you**, how many wrote, how many asked for directions. No jargon, no screenshots of dashboards that say nothing.",
    badge: "Compared with the previous month",
    report: "Mission report",
    sample: "Sample",
    metrics: [
      { k: "Calls", value: "38", delta: "+12" },
      { k: "Form leads", value: "14", delta: "+5" },
      { k: "Directions", value: "61", delta: "+19" },
      { k: "Local rank", value: "3rd", delta: "+4" },
      { k: "AI citations", value: "7", delta: "+3" },
      { k: "Shield", value: "OK" },
    ],
    note: "Sample figures · your report carries your own data",
  },

  showcase: {
    kicker: "04 — Showcase",
    title: "This is how yours could look",
    intro:
      "Demos I built to test ideas — a creative studio, a coffee brand, a jewelry shop, a hotel, a clinic. None of them looks like the others, and that's the point.",
    cta: "See all six",
    cardAria: (name) => `View case: ${name}`,
  },

  security: {
    kicker: "05 — Shield",
    title: "Security **First**",
    text: "I hold a **specialization in Cybersecurity**: every project I deliver is born hardened — not patched at the end, but designed that way. Your site, your data and your customers, protected from day one.",
    badge: "Computer Engineer · Cybersecurity specialist",
    practices: [
      { title: "Strict headers and CSP", desc: "No unauthorized third-party scripts." },
      { title: "HTTPS + HSTS", desc: "End-to-end encryption, always." },
      { title: "Hardened domain", desc: "Protected DNS and email anti-spoofing." },
      { title: "Protected data", desc: "Encrypted credentials and least privilege." },
    ],
    more: "See how I protect every site",
  },

  faq: {
    kicker: "06 — FAQ",
    title: "Your questions, answered",
    items: [
      {
        q: "How soon will I see results?",
        a: "Google Business Profile and reviews usually move within weeks. Search rankings take three to six months — I tell you before you sign, not after.",
      },
      {
        q: "Is there a lock-in? What if I want to leave?",
        a: "Base has no minimum term. Growth and Shield ask for six months, because before that there's nothing to measure. Give a month's notice and it closes with no penalty.",
      },
      {
        q: "If I cancel, is the website still mine?",
        a: "Yes. The domain and the content are yours from day one, and I hand them over working. What ends is the monthly work, not your site.",
      },
      {
        q: "Have you done this for someone else?",
        a: "Not yet under this model, and I'd rather say so myself. That's why the first three clients get founder pricing in exchange for permission to publish their numbers. What you can check is how I work: the whole showcase is live and navigable, with pieces from very different industries.",
      },
    ],
  },

  cta: {
    kicker: "07 — Contact",
    title: "Let's Work **Together**",
    whatsapp: "WhatsApp",
    facebook: "Facebook",
    mockAlt: "The doxdesigns.dev portfolio on a laptop",
  },

  form: {
    kicker: "Contact form",
    title: "Tell me what you need",
    intro:
      "Fill this in and it lands in my WhatsApp or my inbox, already organized. I reply within one business day.",
    name: "Your name",
    business: "Your business",
    plan: "Plan you're interested in",
    planPlaceholder: "Pick one (optional)",
    planNone: "Not sure yet",
    message: "What you need",
    messagePlaceholder: "What you sell, where you are, and what you'd like to achieve.",
    submitWhatsapp: "Send via WhatsApp",
    submitEmail: "Send by email",
    note: "Nothing is stored on this site: the message goes straight to WhatsApp or to your email app.",
    subject: "Inquiry from doxdesigns.dev",
    compose: ({ name, business, plan, message }) =>
      [
        `Hi Santiago, I'm ${name || "—"}${business ? ` from ${business}` : ""}.`,
        plan ? `I'm interested in the ${plan} plan.` : "",
        message ? `\n${message}` : "",
        "\n(Sent from the doxdesigns.dev contact form)",
      ]
        .filter(Boolean)
        .join("\n"),
    errors: { name: "Please enter your name.", message: "Tell me at least one line." },
  },

  pages: {
    home: {
      seo: {
        title: "Santiago Miranda · Web Designer & Developer | Dox Designs",
        description:
          "Dox Designs · Santiago Miranda: custom websites for small businesses, with local SEO, presence in AI search and security built in. Monthly plans from USD 110. Remote studio in the GMT-5 timezone.",
      },
    },

    plans: {
      seo: {
        title: "Plans & pricing · Websites with SEO and security | Dox Designs",
        description:
          "Monthly plans for small businesses: local SEO, presence in AI search answers, security and GDPR/CCPA-ready privacy. From USD 110 a month, custom website included.",
      },
      word: "PLANS",
      kicker: "Flight plans — remote, worldwide",
      h1: "Choose your **orbit**",
      intro:
        "Everything each plan includes, the report you get every month and the four questions that usually stall the decision. No fine print: what you see here is what you pay.",
      plansKicker: "Plans & pricing",
      plansTitle: "The three plans",
      telemetryKicker: "Your monthly report",
      faqKicker: "Before you decide",
    },

    services: {
      seo: {
        title: "Custom websites, local SEO and security | Dox Designs",
        description:
          "What's done every month: local SEO and Google Business Profile, presence in AI search, a custom website with forms and WhatsApp, and security with GDPR/CCPA-ready privacy guidance. For small businesses anywhere.",
      },
      word: "SERVICES",
      kicker: "Services — remote, worldwide",
      h1: "What I do **every month**",
      intro:
        "I build **custom** websites — no templates, no preferred industry — and then keep them working on four fronts: getting you **found**, getting you **cited by AI**, getting people to **write to you**, and keeping you **protected**. Here's the detail of each one and how you check it worked.",
      ctaPrimary: "Free audit",
      ctaSecondary: "See pricing",
      fronts: [
        {
          title: "Get found",
          desc: "When someone searches for what you sell and adds “near me” or their city, the goal is to be in that handful of results people actually look at.",
          includes: [
            "Google Business Profile created, verified and complete",
            "Categories, hours, photos and services kept current",
            "A dedicated page for each service or product",
            "Review management: asking, organizing and replying",
            "Local business structured data",
          ],
          measure: "Calls from Google, direction requests and map position.",
        },
        {
          title: "Get cited by AI",
          desc: "More and more people ask before they search. If someone asks ChatGPT for a recommendation for what you do in their area, there's a business in that answer.",
          includes: [
            "Content that answers your customers' concrete questions",
            "A structure that language models can read, not just Google",
            "FAQ structured data",
            "A consistent profile across the directories AI reads",
            "Monthly review of which answers you appear in",
          ],
          measure:
            "Mentions detected in AI answers. To be clear: attribution is still partial and I don't sell this as a measurable channel.",
        },
        {
          title: "Get the message",
          desc: "Being found is useless if visitors don't know what to do when they arrive. The site has to turn a visit into a message, a quote or a booking, without anyone picking up the phone.",
          includes: [
            "A custom site, fast, on your domain",
            "Form, quote tool or booking, whichever you need",
            "One-tap WhatsApp from every page",
            "Copy written to help the visitor decide",
            "Fast loading on mobile data too",
          ],
          measure: "Forms submitted, WhatsApp clicks and contacts that came through the site.",
        },
        {
          title: "Stay protected",
          desc: "Any business that stores customer data is under a privacy law — GDPR, CCPA or its local equivalent. This is what almost nobody who builds websites can help you with, and it's where my specialization stops being decoration.",
          includes: [
            "HTTPS, strict headers and CSP from the design stage",
            "Automatic backups and tested restores",
            "Encryption, least privilege and access control",
            "Technical guidance on GDPR/CCPA-ready privacy setup",
            "Security review in every monthly report",
          ],
          measure: "Shield status in the month's telemetry and a log of patches applied.",
        },
      ],
      measureLabel: "How it's measured",
      cycle: {
        kicker: "How it works",
        title: "A launch and a loop",
        intro:
          "It's not a project that gets delivered and ends. There's a first month of setup and then a cycle that repeats, because rankings are either sustained or lost.",
        steps: [
          {
            num: "01",
            title: "Audit",
            desc: "Free, within 48 hours. I look at where you stand on Google today, what your competitors have that you don't, and what risks there are in the data you handle. You get it in writing, whether you hire me or not.",
          },
          {
            num: "02",
            title: "Setup",
            desc: "The first month: site on your domain, Google Business Profile verified, booking and WhatsApp connected, and the security baseline in place. It's the month with the most work, and the one that leaves everything running.",
          },
          {
            num: "03",
            title: "Monthly cycle",
            desc: "What sustains the result: new content, reviews, ranking adjustments, patches and backups. This is what can't be done once and abandoned.",
          },
          {
            num: "04",
            title: "Telemetry",
            desc: "Every month you get the report with calls, forms, directions, rank and security status. If a number isn't moving, that's where we decide what to change.",
          },
        ],
      },
      security: {
        title: "Security isn't an add-on",
        text: "I hold a specialization in Cybersecurity. Every site ships with HTTPS, strict headers and good practices from the design stage. And if you store customer data — any business that does is under a privacy law — that's the starting point, not the goal: the Shield plan adds auditing, monitoring and compliance guidance.",
        note: "**Technical** guidance: I prepare your site and processes to comply; I don't replace a lawyer's judgment.",
      },
      faq: {
        kicker: "Common questions",
        title: "Frequently asked",
        introPre: "Questions about minimum terms, leaving and site ownership are on the ",
        introLink: "plans & pricing",
        introPost: " page.",
        items: [
          {
            q: "What if I already have a website?",
            a: "Even better: we skip the setup. I review what you have, tell you whether to keep it or rebuild it, and we start with Google Business Profile and local SEO, which is usually what's actually missing.",
          },
          {
            q: "How much work is this for me?",
            a: "Little, but not zero. I need a short kickoff call, access to your Google Business Profile, and the things only you know: what your customers ask, which product or service you want to push. I handle the rest.",
          },
          {
            q: "Are domain and hosting extra?",
            a: "Hosting is included in the plan. The domain is bought in your name and it's yours from day one — a few dollars a year that you pay directly, and I prefer it that way so it never depends on me.",
          },
          {
            q: "Do you work with any kind of business?",
            a: "Yes. Every project is designed for the business that asks for it: no template, no preferred industry. The showcase has a creative studio, a coffee brand, a jewelry shop, a hotel and a clinic, and none of them looks like the others — on purpose.",
          },
          {
            q: "Where are you based? Do you work with clients abroad?",
            a: "I'm in Cali, Colombia (GMT-5, which overlaps US business hours) and I work fully remotely. Everything runs over video calls, WhatsApp and email, in English (C1) or Spanish.",
          },
          {
            q: "What if I want something that's not in the plans?",
            a: "It's quoted separately and I tell you before, not after. An internal app, an integration with your invoicing or inventory software, or a full online store are a different kind of work and don't belong in a monthly fee.",
          },
        ],
      },
      final: {
        title: "Start with the audit",
        text: "Within 48 hours I tell you, in writing, where you stand on Google today, what your competitors have that you don't, and what risks there are in the data you handle. It's free and it's yours, whether you hire me or not.",
        cta: "Request my audit",
        secondary: "See plans & pricing",
      },
    },

    security: {
      seo: {
        title: "Web security by design · Cybersecurity specialist | Dox Designs",
        description:
          "What Dox Designs does to keep your site and your customers' data protected: HTTPS with HSTS, strict headers and CSP, backups, encryption, access control and GDPR/CCPA-ready privacy guidance. With this very site as proof.",
      },
      word: "SHIELD",
      kicker: "Security — Computer Engineer · Cybersecurity specialist",
      h1: "Security by **design**",
      intro:
        "Every site I deliver is born hardened. HTTPS, strict headers, backups and least privilege aren't an add-on bolted on at the end: they're how it gets built. Here's exactly what I do, how you can verify it yourself, and what the Shield plan adds.",
      summary:
        "Dox Designs (Santiago Miranda, Computer Engineer with a specialization in Cybersecurity, Cali, Colombia) delivers websites hardened by design: HTTPS with HSTS, a strict Content-Security-Policy, automatic backups, encryption and access control, with technical guidance for GDPR/CCPA-ready privacy.",
      pillars: [
        {
          title: "Transport and headers",
          desc: "What a browser demands before trusting a page.",
          items: [
            "HTTPS always, with HSTS and preload",
            "Content-Security-Policy with no inline scripts and no unauthorized third parties",
            "Protection against framing, MIME sniffing and referrer leaks",
            "Browser permissions locked down (camera, microphone, geolocation)",
          ],
        },
        {
          title: "Data",
          desc: "Your customers' and your own.",
          items: [
            "Encryption in transit and at rest",
            "Least privilege: every access sees only what it needs",
            "Nothing is stored that doesn't need storing",
            "Passwords and credentials never in plain text",
          ],
        },
        {
          title: "Continuity",
          desc: "So a failure isn't a loss.",
          items: [
            "Automatic backups and tested restores",
            "Uptime and change monitoring",
            "Patches and updates inside the monthly cycle",
            "A log of what changed and when",
          ],
        },
        {
          title: "Domain and email",
          desc: "So nobody can impersonate you.",
          items: [
            "Protected DNS and transfer lock",
            "SPF, DKIM and DMARC against email spoofing",
            "security.txt so a researcher knows who to tell",
            "Domain and certificate renewals watched",
          ],
        },
      ],
      proof: {
        kicker: "This site is the proof",
        title: "The headers doxdesigns.dev runs with",
        intro:
          "Not a list of intentions: these are the real headers this site sends with every response. Every site I deliver ships with the same ones.",
        headers: [
          {
            name: "Content-Security-Policy",
            why: "Only first-party code and the two authorized analytics tools run. An injected script doesn't.",
          },
          {
            name: "Strict-Transport-Security",
            why: "Two years of mandatory HTTPS, subdomains included, on the browsers' preload list.",
          },
          { name: "X-Frame-Options: DENY", why: "Nobody can wrap the page in an iframe to trick a visitor." },
          {
            name: "X-Content-Type-Options: nosniff",
            why: "The browser doesn't guess file types: a disguised file doesn't execute.",
          },
          { name: "Referrer-Policy", why: "Leaving for another site doesn't leak the full URL you came from." },
          {
            name: "Permissions-Policy",
            why: "Camera, microphone, geolocation, payments and sensors are off: the page doesn't need them and doesn't ask.",
          },
          { name: "Cross-Origin-Opener-Policy", why: "A tab opened from another site can't manipulate this one." },
        ],
        check: "Verify it with securityheaders.com or Mozilla's Observatory: just paste the domain.",
        securityTxt: "See this site's security.txt",
      },
      plans: {
        kicker: "In every plan",
        title: "What security each orbit carries",
        intro:
          "The baseline goes into every plan, because a site isn't delivered half-done. The Shield plan is for anyone who stores customer data and also needs auditing and compliance.",
        tiers: [
          { name: "Base", items: ["HTTPS + HSTS and strict headers", "Backups and monitoring", "Protected domain and email"] },
          {
            name: "Growth",
            items: ["Everything in Base", "Shield status in every telemetry report", "Monthly access and patch review"],
          },
          {
            name: "Shield",
            items: [
              "Everything in Growth",
              "Technical security audit",
              "Encryption, least privilege and access control",
              "GDPR/CCPA-ready privacy setup and guidance",
            ],
          },
        ],
        cta: "See plans & pricing",
      },
      compliance: {
        kicker: "Privacy law",
        title: "Personal data and compliance",
        text: "Any business that stores customer data — names, phone numbers, emails, records — falls under a privacy law: the GDPR in Europe, the CCPA in California, Law 1581 in Colombia and their equivalents elsewhere. All of them ask for the same things: a privacy policy, a lawful basis for collecting the data, security measures and a way for people to exercise their rights. The Shield plan covers the technical side: how data is collected, where it lives, who can access it and how it's deleted.",
        note: "**Technical** guidance: I prepare your site and processes to comply; I don't replace a lawyer's judgment.",
      },
      faq: {
        kicker: "Security questions",
        title: "What people usually ask",
        items: [
          {
            q: "Do I need this if I only have an informational site?",
            a: "Yes, though less of it. A site with no forms still has a domain that can be spoofed, a certificate that expires and a server that can go unpatched. That's exactly why the baseline — HTTPS, headers, backups — is in every plan.",
          },
          {
            q: "What happens if my site gets hacked?",
            a: "It's restored from the last tested backup, the door they came through gets closed, and you get it in writing: what happened, what data may have been exposed and what changed. With the Shield plan, the monthly access and patch review keeps that door from staying open for months unnoticed.",
          },
          {
            q: "Do you store my customers' data?",
            a: "No. The data lives on your domain and in services contracted in your name; I hold the minimum access needed to maintain them, and that access is revoked when the relationship ends. This site's own form stores nothing: it opens the message in your WhatsApp or your email.",
          },
          {
            q: "Does a privacy law apply to me?",
            a: "If you have customers and store their name and phone number, yes. GDPR, CCPA and their equivalents apply to any business that handles personal data, not just clinics or banks. What changes is how much you have to do: a clinic with medical records has more obligations than a café with a reservations list.",
          },
        ],
      },
      final: {
        title: "The audit includes security",
        text: "In the free audit I check your certificate, your headers, what data your site exposes today and what risks there are in the information you handle. In writing, within 48 hours, whether you hire me or not.",
        cta: "Request my audit",
        secondary: "See the Shield plan",
      },
    },

    projects: {
      seo: {
        title: "Project showcase · Santiago Miranda | Dox Designs",
        description:
          "Nine navigable demos by Santiago Miranda (Dox Designs): a creative studio, a coffee brand, a jewelry shop, a hotel, a clinic and more — React, Next.js, .NET and Angular, deployed on Vercel.",
      },
      word: "PROJECTS",
      kicker: "Projects",
      h1: "Proj**ects**",
      intro:
        "Demos I built to test ideas: each case with its context, my role, the stack and the result. The ones with a live demo are deployed on Vercel and you can click through them.",
      table: {
        caption: "Project index",
        num: "#",
        project: "Project",
        type: "Type",
        stack: "Stack",
        year: "Year",
        featured: "Featured",
      },
      labels: {
        context: "Context",
        role: "Role",
        result: "Result",
        demo: "Live demo",
        code: "Code",
        teaserAlt: (name) => `${name} teaser`,
      },
      types: { web: "Web", fullstack: "Full-stack", frontend: "Frontend", chatbot: "Chatbot" },
      items: {
        "gem-eyes": {
          name: "Gem Eyes",
          tag: "Concept · creative studio",
          desc: "Demo site for a creative studio with a bold visual identity: full-screen illustration, expressive animations and gallery, process and contact sections.",
          role: "Concept, design and development",
          result:
            "An immersive, responsive experience that showcases the studio's art without sacrificing load speed.",
        },
        "dr-adrian": {
          name: "Dr. Adrián Portfolio",
          tag: "Concept · medical portfolio",
          desc: "Portfolio demo for a medical specialist: an online calling card that brings together professional profile, services and contact details.",
          role: "Concept, design and development",
          result: "Clean, responsive design, deployed on Vercel.",
        },
        calidoso: {
          name: "Calidoso · Coffee",
          tag: "Concept · coffee e-commerce",
          desc: "Online store demo for a coffee brand: product catalog, brand presentation and a responsive interface deployed on Vercel.",
          role: "Concept, design and development",
          result: "Conversion-focused e-commerce with a warm identity and clear catalog navigation.",
        },
        vitalis: {
          name: "Vitalis · Clinic",
          tag: "Concept · medical clinic",
          desc: "Site demo for a medical clinic: institutional presentation of health services with a responsive interface, deployed on Vercel.",
          role: "Concept, design and development",
          result: "A structure designed to communicate services, build trust and make contact easy.",
        },
        "eco-muestreo": {
          name: "Eco Muestreo · Jewelry",
          tag: "Concept · handmade jewelry",
          desc: "Online store demo for a handmade jewelry brand: piece catalog, brand presentation and a responsive interface deployed on Vercel.",
          role: "Concept, design and development",
          result: "E-commerce with an artisanal aesthetic, built to highlight each piece and make buying easy.",
        },
        "hotel-marea": {
          name: "Hotel Marea",
          tag: "Next.js + TypeScript",
          desc: "Sample web application built with Next.js (App Router) and TypeScript, with persistence through Drizzle ORM and continuous deployment on Vercel.",
          role: "Full-stack",
          result:
            "Modular architecture (app, modules, components, db) designed to scale, with continuous deployment on Vercel.",
        },
        aurora: {
          name: "Aurora · Video Hero",
          tag: "React + Tailwind (Vite)",
          desc: "Responsive, interactive landing page built around a single video as the base of the whole page: the clip stays fixed in the background while the content slides over it, reacts to the pointer and responds to scroll.",
          role: "Full design and development",
          result:
            "Serves 720p/1280p/1920p depending on the screen (WebM + MP4), with poster + blur-up, a dock to control the video and reduced-motion support.",
        },
        "integracion-ia": {
          name: "AI Integration",
          tag: "Meta technologies",
          desc: "Customer-service chatbot exercise on Meta technologies: token handling and training scoped to a business script.",
          role: "Concept, integration and training",
          result:
            "A complete conversation flow over a closed script, with token handling and responses trained for a specific domain.",
        },
        "crud-clientes": {
          name: "Customer CRUD",
          tag: ".NET 8 + Angular",
          desc: "Customer manager (technical test) with a REST API in .NET 8 / EF Core 8 and an Angular frontend with standalone components and signals.",
          role: "Full-stack · technical test",
          result:
            "Complete CRUD with search, pagination, status filters, two-layer validation, a unique anti-duplicate index and Swagger/OpenAPI documentation.",
        },
      },
    },

    about: {
      seo: {
        title: "About · Santiago Miranda, Computer Engineer & Cybersecurity specialist | Dox Designs",
        description:
          "Who's behind Dox Designs: Santiago Miranda, Computer Engineer with a specialization in Cybersecurity, based in Cali, Colombia. Builds custom websites and keeps them working every month with SEO, AI presence and security.",
      },
      word: "ABOUT",
      kicker: "About — Computer Engineer · Cybersecurity specialist",
      h1: "About **Me**",
      bio: "I'm **Santiago Alejandro Miranda Ortiz**, a Computer Engineer with a specialization in Cybersecurity, based in Cali, Colombia and working remotely with clients anywhere. I build custom websites for businesses and then keep them working every month: local SEO, presence in AI search and protection of the data they handle. I come from software development — .NET, Angular, React, SQL Server — and from security, which is why every site I deliver is born hardened, not patched at the end.",
      summary:
        "Santiago Miranda (Dox Designs) is a Computer Engineer with a specialization in Cybersecurity, based in Cali, Colombia (GMT-5). He designs and develops custom websites and maintains them under a monthly plan that includes local SEO, presence in AI search and security.",
      pills: { english: "English C1", github: "GitHub" },
      photoAlt: (i) => `Santiago Miranda, portrait ${i + 1} of 3`,
      skills: {
        kicker: "01 — Technical skills",
        title: "Skills",
        groups: {
          backend: { label: "Backend", items: [".NET 8 / C#", "REST APIs", "OOP", "App architecture"] },
          frontend: { label: "Frontend", items: ["Angular 19", "TypeScript", "JavaScript", "React", "HTML", "CSS"] },
          db: { label: "Databases", items: ["SQL Server", "MySQL", "Relational modeling"] },
          git: { label: "Version control", items: ["Git", "Repository workflows"] },
          tools: {
            label: "Other tools",
            items: ["Python", "Java", "Power BI", "Big Data", "AI assistants", "AutoCAD", "Office"],
          },
          soft: {
            label: "Key skills",
            items: ["Time management", "Communication", "Teamwork", "Adaptability"],
          },
        },
      },
      timeline: {
        kicker: "02 — Background",
        title: "Experience & Education",
        items: {
          dispatcher: {
            kind: "Experience",
            title: "Bilingual Dispatcher",
            place: "Gallant Luxury Transportation",
            period: "Over 1 year",
            points: [
              "Coordinated assignment and dispatch of transportation services, managing schedules and routes.",
              "Communicated with drivers and clients in English and Spanish, resolving incidents in real time under pressure.",
              "Kept accurate operational records, ensuring traceability for every service.",
            ],
          },
          degree: {
            kind: "Education",
            title: "Computer Engineering",
            place: "Universidad Autónoma de Occidente · Cali",
            period: "Jan 2021 – Present",
            points: ["Undergraduate degree nearing completion, focused on full-stack software development."],
          },
          school: {
            kind: "Education",
            title: "High school diploma",
            place: "Colegio Americano de Cali",
            period: "2014 – 2020",
            points: [],
          },
        },
      },
      achievements: {
        kicker: "03 — Other achievements",
        items: [
          "Award-winning experience in intercollegiate Model UN.",
          "Organizer and promoter of a robotics competition.",
          "Training in gala protocol.",
          "Author of the book “Encerrados” (unpublished).",
        ],
      },
      together: {
        kicker: "Shall we work together?",
        text: "Always open to new projects and collaborations.",
        cta: "Contact",
      },
    },

    contact: {
      seo: {
        title: "Contact · Santiago Miranda | Dox Designs",
        description:
          "Let's talk about your project. WhatsApp, email, contact form and social links for Santiago Miranda (Dox Designs), web designer and developer based in Cali, Colombia, working remotely.",
      },
      kicker: "Contact",
      h1: "Let's Work **Together**",
      intro:
        "Tell me what you need and I'll reply with a plan and a quote. WhatsApp is fastest; the form and email work just as well.",
      channels: "Direct channels",
      schemaName: "Contact · Dox Designs",
    },

    privacy: {
      seo: {
        title: "Privacy policy | Dox Designs",
        description:
          "How Dox Designs (Santiago Miranda) handles the personal data of people who visit doxdesigns.dev or get in touch: what's collected, why, for how long, and how to exercise your rights.",
      },
      kicker: "Legal",
      h1: "Privacy **policy**",
      updated: "Last updated: September 2026",
      intro:
        "This policy explains what personal data Santiago Alejandro Miranda Ortiz (Dox Designs), based in Cali, Colombia, processes when you visit doxdesigns.dev or get in touch, and how you can exercise your rights. It's written to meet Colombia's Law 1581 of 2012 and to follow the principles of the GDPR and the CCPA for visitors from the EU, the UK and the US.",
      sections: [
        {
          title: "Who is responsible",
          body: [
            "Santiago Alejandro Miranda Ortiz, trading as Dox Designs, in Cali (Valle del Cauca), Colombia. Contact: santiago.miranda.trabajo@gmail.com.",
          ],
        },
        {
          title: "What data is collected and why",
          body: [
            "**Contact details you send.** When you write via WhatsApp, email or the site's form, I receive the name, business, plan of interest and message you choose to include. The form stores nothing on the site: it composes the message and opens it in your WhatsApp or your email app. I use that data only to reply to you and prepare a proposal. The legal basis is your request (pre-contractual steps) and, once we work together, the contract.",
            "**Browsing data.** The site uses Google Analytics 4 and the Meta pixel to know how many people visit, from where and which pages they view, and to measure campaigns. These tools use their own identifiers and cookies; I don't receive your name or address through them. The legal basis is legitimate interest in understanding how the site is used.",
          ],
        },
        {
          title: "Cookies and analytics",
          body: [
            "You can block or delete cookies from your browser settings. Google also offers an opt-out add-on for Analytics, and Meta lets you adjust ad preferences from your account. The site works the same without them.",
          ],
        },
        {
          title: "Retention",
          body: [
            "Contact messages are kept while the commercial conversation lasts and, if there's a contract, for the duration of the relationship and the legal invoicing periods. If there's no commercial relationship, they're deleted within twelve months at most.",
          ],
        },
        {
          title: "Your rights",
          body: [
            "You can access, update, correct and delete your data, ask what it's been used for, object to or restrict its processing, request portability and withdraw consent at any time, unless there's a legal or contractual duty to keep it. Just write to santiago.miranda.trabajo@gmail.com saying what you'd like done; I reply within ten business days at most.",
            "If you believe the processing doesn't comply with the law, you can contact Colombia's data protection authority (Superintendencia de Industria y Comercio) or, if you're in the EU or the UK, your local supervisory authority.",
          ],
        },
        {
          title: "International transfers",
          body: [
            "I'm based in Colombia, so the data you send me is processed there. Google and Meta may process browsing data on servers in other countries under their own safeguards.",
          ],
        },
        {
          title: "Changes to this policy",
          body: [
            "If what's collected or why changes, this page is updated and the date above changes. Your data isn't used for anything that isn't written here.",
          ],
        },
      ],
    },
  },

  a11y: {
    visorAlt: "Helmet with a black hole spinning in the visor",
    newTab: "(opens in a new tab)",
    breadcrumbHome: "Home",
    pauseCarousel: "Pause the carousel",
  },

  schema: {
    businessDescription:
      "Custom website design and development from Cali, Colombia, for clients worldwide, with monthly plans that include local SEO, presence in AI search and security. Fast, secure, responsive sites.",
    catalogName: "Monthly digital growth plans",
    offers: [
      {
        name: "Custom websites",
        description:
          "Sites designed for each business, no templates: fast, responsive, on your own domain, with forms and WhatsApp connected.",
      },
      {
        name: "Local SEO",
        description:
          "Verified Google Business Profile, review management and content to appear in nearby searches in your city.",
      },
      {
        name: "Presence in AI search",
        description:
          "Content and structured data to get cited in ChatGPT, Perplexity and Google AI Overviews.",
      },
      {
        name: "Security and compliance",
        description:
          "Site hardening, backups, monitoring and technical guidance on GDPR/CCPA-ready privacy setup.",
      },
    ],
    jobTitle: "Web designer and developer · Computer Engineer",
    knowsAbout: [
      "Web design",
      "Web development",
      "Local SEO",
      "Generative engine optimization (AI search)",
      "Cybersecurity",
      "React",
      "Next.js",
      "TypeScript",
      ".NET",
      "Angular",
    ],
    credential: "Specialization in Cybersecurity",
    degree: "Computer Engineering",
    university: "Universidad Autónoma de Occidente",
    planDescription: (plan) => `Dox Designs ${plan} monthly plan: custom website included.`,
  },

  llms: {
    summary:
      "Dox Designs is the studio of Santiago Miranda, a Computer Engineer with a specialization in Cybersecurity, based in Cali, Colombia (GMT-5) and working remotely with clients worldwide. He designs and develops custom websites for small businesses and maintains them on a monthly plan (USD 110, 220 or 365 a month) that includes local SEO, presence in AI search answers, a monthly telemetry report and security with GDPR/CCPA-ready privacy guidance. He offers a free written audit within 48 hours. Contact: WhatsApp +57 318 981 9384 · santiago.miranda.trabajo@gmail.com.",
    pages: {
      home: "Home: the promise, the four specialties, the plans, telemetry, the showcase and security.",
      plans: "The three monthly plans with pricing, what each includes, the monthly report and subscription FAQs.",
      services: "What's done every month on each front (SEO, AI, conversion, security), the work cycle and operational FAQs.",
      security: "How every site is protected: the real headers of doxdesigns.dev itself, data, continuity, domain, what each plan carries and privacy law.",
      projects: "Nine navigable demos with context, role, stack and result.",
      about: "Who Santiago Miranda is: education, skills and background.",
      contact: "WhatsApp, email, contact form and social links.",
      privacy: "Privacy policy (Law 1581 of 2012, GDPR/CCPA principles).",
    },
  },
};
