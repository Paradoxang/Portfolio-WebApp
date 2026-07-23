/**
 * Google Analytics 4 + base para Google Ads.
 *
 * Notas de seguridad: no usamos ningún <script> inline — el tag externo se
 * inyecta desde este bundle ('self') y la inicialización de gtag es JS normal,
 * así la CSP sigue sin necesitar 'unsafe-inline'. Solo hubo que autorizar los
 * dominios de Google en vercel.json.
 *
 * Para activarlo: pon tu ID de medición GA4 en `GA_MEASUREMENT_ID` (G-XXXXXXXXXX).
 * Mientras esté vacío no se carga nada ni se rastrea a nadie.
 */

/** ID de medición de GA4, p. ej. "G-ABC123XYZ". Vacío = analytics desactivado. */
export const GA_MEASUREMENT_ID = "G-RSRJR75JKC";

/** ID de conversión de Google Ads, p. ej. "AW-123456789". Opcional. */
export const GOOGLE_ADS_ID = "";

/** Etiqueta de la conversión de Ads para "contacto por WhatsApp", p. ej. "AW-123/abcDEF". */
export const ADS_CONTACT_CONVERSION_LABEL = "";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export const analyticsEnabled = () =>
  typeof window !== "undefined" && Boolean(GA_MEASUREMENT_ID || GOOGLE_ADS_ID);

let loaded = false;

/** Carga el tag de Google una sola vez (GA4 y/o Ads). */
export function loadAnalytics() {
  if (loaded || !analyticsEnabled()) return;
  loaded = true;

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

/** Registra una vista de página (llamar en cada cambio de ruta). */
export function trackPageView(path: string, title?: string) {
  if (!GA_MEASUREMENT_ID || !window.gtag) return;
  window.gtag("event", "page_view", {
    page_path: path,
    page_location: window.location.href,
    page_title: title ?? document.title,
  });
}

/**
 * Conversión de contacto (clic a WhatsApp, correo o teléfono). Es *la* métrica
 * que importa: mide clientes potenciales, no visitas.
 */
export function trackContact(method: "whatsapp" | "email" | "phone" | "facebook") {
  if (!window.gtag) return;
  window.gtag("event", "contacto", { method });
  if (ADS_CONTACT_CONVERSION_LABEL) {
    window.gtag("event", "conversion", {
      send_to: ADS_CONTACT_CONVERSION_LABEL,
    });
  }
}
