// Consentimiento de cookies de terceros (solo Google Maps en Contacto).
// - Sin elección guardada: se muestra el banner y el mapa no se carga.
// - "Aceptar": se carga el mapa. "Rechazar": se muestra el aviso en su lugar.
// - La elección caduca a los 12 meses y se vuelve a preguntar.
// - "Configurar cookies" (pie de página) reabre el banner para cambiarla.
// La elección se guarda en localStorage: no es una cookie y está exenta de consentimiento.

const STORAGE_KEY = "integra-cookie-consent";
const MAX_AGE_MS = 365 * 24 * 60 * 60 * 1000;

function readChoice() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved || Date.now() - saved.date > MAX_AGE_MS) return null;
    return saved.value;
  } catch {
    return null;
  }
}

function saveChoice(value) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ value, date: Date.now() }));
  } catch {
    // Sin almacenamiento (modo privado estricto): la elección vale solo para esta página
  }
}

// Carga o retira los iframes que dependen del consentimiento
function applyChoice(value) {
  document.querySelectorAll("[data-consent-src]").forEach((container) => {
    const placeholder = container.querySelector("[data-consent-placeholder]");
    let iframe = container.querySelector("iframe");

    if (value === "accepted") {
      if (!iframe) {
        iframe = document.createElement("iframe");
        iframe.className = container.dataset.consentClass || "";
        iframe.src = container.dataset.consentSrc;
        iframe.title = container.dataset.consentTitle || "";
        iframe.loading = "lazy";
        iframe.referrerPolicy = "no-referrer-when-downgrade";
        iframe.allowFullscreen = true;
        container.append(iframe);
      }
      if (placeholder) placeholder.hidden = true;
    } else {
      if (iframe) iframe.remove();
      if (placeholder) placeholder.hidden = false;
    }
  });
}

export function initCookieConsent() {
  const banner = document.querySelector("[data-cookie-banner]");
  if (!banner) return;

  const choice = readChoice();
  applyChoice(choice);
  banner.hidden = choice !== null;

  document.querySelectorAll("[data-cookie-choice]").forEach((button) => {
    button.addEventListener("click", () => {
      const value = button.dataset.cookieChoice;
      saveChoice(value);
      applyChoice(value);
      banner.hidden = true;
    });
  });

  document.querySelectorAll("[data-cookie-settings]").forEach((button) => {
    button.addEventListener("click", () => {
      banner.hidden = false;
      banner.querySelector("[data-cookie-choice]").focus();
    });
  });
}
