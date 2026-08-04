/**
 * Google Analytics 4 + Google Ads + Meta Pixel.
 *
 * Notas de seguridad: no usamos ningún <script> inline — los tags externos se
 * inyectan desde este bundle ('self') y la inicialización es JS normal, así la
 * CSP sigue sin necesitar 'unsafe-inline'. Solo hubo que autorizar los dominios
 * de Google y Meta en vercel.json.
 *
 * Cada plataforma se activa poniendo su ID abajo; con el ID vacío no se carga
 * nada ni se rastrea a nadie.
 */

/** ID de medición de GA4, p. ej. "G-ABC123XYZ". Vacío = GA4 desactivado. */
export const GA_MEASUREMENT_ID = "G-RSRJR75JKC";

/** ID de conversión de Google Ads, p. ej. "AW-123456789". Opcional. */
export const GOOGLE_ADS_ID = "";

/** Etiqueta de la conversión de Ads para "contacto por WhatsApp", p. ej. "AW-123/abcDEF". */
export const ADS_CONTACT_CONVERSION_LABEL = "";

/** ID del Meta Pixel (Facebook/Instagram). Vacío = pixel desactivado. */
export const META_PIXEL_ID = "1908259770134955";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: FbqFn;
    _fbq?: FbqFn;
  }
}

interface FbqFn {
  (...args: unknown[]): void;
  callMethod?: (...args: unknown[]) => void;
  queue?: unknown[];
  push?: unknown;
  loaded?: boolean;
  version?: string;
}

export const analyticsEnabled = () =>
  typeof window !== "undefined" &&
  Boolean(GA_MEASUREMENT_ID || GOOGLE_ADS_ID || META_PIXEL_ID);

let loaded = false;

/** Carga los tags de Google (GA4 / Ads) y el Meta Pixel una sola vez. */
export function loadAnalytics() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  loadGoogle();
  loadMetaPixel();
}

function loadGoogle() {
  if (!GA_MEASUREMENT_ID && !GOOGLE_ADS_ID) return;

  const primaryId = GA_MEASUREMENT_ID || GOOGLE_ADS_ID;
  const tag = document.createElement("script");
  tag.async = true;
  tag.src = `https://www.googletagmanager.com/gtag/js?id=${primaryId}`;
  document.head.appendChild(tag);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer!.push(args);
  };
  window.gtag("js", new Date());
  if (GA_MEASUREMENT_ID) {
    // send_page_view: false — las vistas se envían a mano en cada cambio de ruta
    // (es una SPA, no hay recarga completa entre páginas).
    window.gtag("config", GA_MEASUREMENT_ID, { send_page_view: false });
  }
  if (GOOGLE_ADS_ID) window.gtag("config", GOOGLE_ADS_ID);
}

/** La vista inicial la envía `loadMetaPixel` (junto al init, como el snippet
 * oficial); esta bandera hace que `trackPageView` omita esa primera llamada
 * para no contarla dos veces. */
let metaSkipFirstPageView = false;

/**
 * Meta Pixel. Equivale al snippet oficial de Facebook, pero escrito como JS
 * normal en vez de un <script> inline (que la CSP bloquearía).
 *
 * Estructura calcada del snippet oficial, y el detalle importa: la salida
 * anticipada por "ya existe window.fbq" solo debe omitir la creación del stub,
 * NO el init. Si se salta el init (p. ej. porque la extensión Pixel Helper ya
 * creó su propio fbq), los eventos se envían sin pixel asociado y la extensión
 * reporta "Track event before pixel init" con pixel_ids vacío.
 */
function loadMetaPixel() {
  if (!META_PIXEL_ID) return;

  // Stub + carga de fbevents.js: solo si nadie lo creó antes.
  if (!window.fbq) {
    const fbq: FbqFn = function (...args: unknown[]) {
      if (fbq.callMethod) fbq.callMethod.apply(fbq, args);
      else fbq.queue!.push(args);
    };
    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = "2.0";
    fbq.queue = [];
    window.fbq = fbq;
    if (!window._fbq) window._fbq = fbq;

    const script = document.createElement("script");
    script.async = true;
    script.src = "https://connect.facebook.net/en_US/fbevents.js";
    document.head.appendChild(script);
  }

  // init + primera vista: siempre, pase lo que pase con el stub.
  window.fbq("init", META_PIXEL_ID);
  window.fbq("track", "PageView");
  metaSkipFirstPageView = true;
}

/** Registra una vista de página (llamar en cada cambio de ruta). */
export function trackPageView(path: string, title?: string) {
  if (GA_MEASUREMENT_ID && window.gtag) {
    window.gtag("event", "page_view", {
      page_path: path,
      page_location: window.location.href,
      page_title: title ?? document.title,
    });
  }
  if (META_PIXEL_ID && window.fbq) {
    // La vista de la carga inicial ya se envió junto al init.
    if (metaSkipFirstPageView) metaSkipFirstPageView = false;
    else window.fbq("track", "PageView");
  }
}

/**
 * Conversión de contacto (clic a WhatsApp, correo o teléfono). Es *la* métrica
 * que importa: mide clientes potenciales, no visitas.
 */
export function trackContact(method: "whatsapp" | "email" | "phone" | "facebook") {
  if (window.gtag) {
    window.gtag("event", "contacto", { method });
    if (ADS_CONTACT_CONVERSION_LABEL) {
      window.gtag("event", "conversion", {
        send_to: ADS_CONTACT_CONVERSION_LABEL,
      });
    }
  }
  // En Meta, "Lead" es el evento estándar para un cliente potencial que hace
  // contacto — es el que se optimiza en las campañas de Instagram/Facebook.
  if (META_PIXEL_ID && window.fbq) {
    window.fbq("track", "Lead", { content_category: method });
  }
}
