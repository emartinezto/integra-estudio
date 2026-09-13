# Integra Studio — sitio web

Proyecto estático (HTML + SCSS + JS) generado con [Eleventy](https://www.11ty.dev/), a partir del diseño de Figma "Integra Studio".

## Estructura

```
src/
  _data/site.js          Datos globales (nombre, dirección, navegación...)
  _includes/
    layouts/base.njk      Plantilla base (head, header, footer, scripts)
    partials/              Header y footer reutilizables
    macros/ui.njk          Módulos reutilizables: botones, tarjetas, pilares, CTA, breadcrumb...
  assets/
    scss/                  Estilos organizados en abstracts / base / layout / components
    js/                    JS modular (assets/js/modules/*.js), sin build de bundling
    images/                Coloca aquí las imágenes reales (hoy se muestran placeholders)
  index.njk, metodo.njk, cuerpo.njk, mente.njk, movimiento.njk,
  formacion.njk, contacto.njk, cuerpo/fisioterapia.njk   Páginas del sitio
```

Cada página reutiliza los mismos módulos (botón, tarjeta, pilar, CTA, cita) definidos una sola vez
en `src/_includes/macros/ui.njk` y estilados una sola vez en `src/assets/scss/components/`.

## Desarrollo

```bash
npm install
npm run dev      # servidor local con recarga en vivo (http://localhost:8080)
```

## Generar la web para subir a hosting

```bash
npm run build
```

Esto genera la carpeta **`dist/`** con HTML, CSS y JS ya compilados y con rutas absolutas (`/cuerpo/`, `/mente/`, etc.),
lista para subir tal cual a cualquier hosting estático:

- **Netlify / Vercel / Render (Static Site):** conectar el repo y configurar `Build command: npm run build`, `Publish directory: dist`.
- **Cualquier hosting por FTP/panel:** subir el contenido de `dist/` a la raíz pública (`public_html`, `www`, etc.).

La navegación entre páginas usa enlaces reales (no anclas ni JS), por lo que funciona igual en local, en `dist/` y en cualquier hosting.

## Pendiente de revisar

- **Imágenes**: hoy todas las fotos son placeholders (`media-placeholder`). Exporta las imágenes reales desde Figma y colócalas en `src/assets/images/`, sustituyendo los placeholders en las páginas.
- **Teléfono y email** en `src/_data/site.js` son de ejemplo (`+34 000 000 000` / `hola@integrastudio.es`) — cámbialos por los reales.
- **Textos**: la API de Figma alcanzó su límite de peticiones a mitad de la extracción de contenido, así que algunos textos (botones, testimonios, tarjetas de "para quién", itinerarios de Formación) son copy editorial coherente con el diseño, no texto literal del archivo de Figma. Los títulos y textos marcados como reales (hero de Home, cita de Mente, nombres de áreas de Cuerpo/Mente, dirección y copyright del footer) sí vienen del archivo.
- **Formulario de contacto**: el HTML/CSS está listo pero no envía datos a ningún sitio — hay que conectarlo a un servicio (Formspree, Netlify Forms, backend propio, etc.).
