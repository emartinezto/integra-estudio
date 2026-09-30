// Envía el formulario de contacto a /api/contacto.php sin recargar la página.
// Sin JavaScript el formulario se envía igual y el PHP redirige a /contacto/?enviado=ok|error.

const MESSAGES = {
  ok: "¡Gracias! Hemos recibido tu mensaje y te responderemos en un plazo máximo de 24 horas laborables.",
  error: "No hemos podido enviar tu mensaje. Inténtalo de nuevo o escríbenos por email.",
};

function showStatus(status, type, text) {
  status.textContent = text;
  status.className = `contact-form__status contact-form__status--${type}`;
  status.hidden = false;
}

export function initContactForm() {
  const form = document.querySelector("[data-contact-form]");
  if (!form) return;

  const status = form.querySelector("[data-form-status]");
  const submit = form.querySelector('button[type="submit"]');
  const loadedAt = Date.now();

  // Resultado del envío sin JavaScript (vuelta desde el PHP)
  const result = new URLSearchParams(location.search).get("enviado");
  if (MESSAGES[result]) showStatus(status, result, MESSAGES[result]);

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const data = new FormData(form);
    data.append("elapsed", String(Date.now() - loadedAt));

    submit.disabled = true;
    const label = submit.textContent;
    submit.textContent = "Enviando…";

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      const json = await response.json().catch(() => ({}));

      if (response.ok && json.ok) {
        form.reset();
        showStatus(status, "ok", MESSAGES.ok);
      } else {
        showStatus(status, "error", json.message || MESSAGES.error);
      }
    } catch {
      showStatus(status, "error", MESSAGES.error);
    } finally {
      submit.disabled = false;
      submit.textContent = label;
    }
  });
}
