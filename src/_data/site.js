module.exports = {
  name: "Integra Studio",
  tagline: "Cuerpo · Mente · Movimiento. Práctica holística, terapéutica y consciente.",
  address: ["Calle Alcorcón 12", "28981 Parla, Madrid"],
  mapsUrl: "https://maps.google.com/?q=Calle+Alcorcón+12,+28981+Parla,+Madrid",
  mapsEmbedUrl: "https://www.google.com/maps?q=Calle+Alcorc%C3%B3n+12,+28981+Parla,+Madrid&z=16&output=embed",
  phone: "+34 690 677 479",
  email: "hola@integrastudio.es",
  emailConsultas: "consultas@integrastudio.es",
  currentYear: new Date().getFullYear(),
  // Datos para Aviso Legal, Privacidad y Cookies. Los valores entre [corchetes]
  // los debe facilitar el titular; los vacíos ("") ocultan esa línea en la web.
  legal: {
    titular: "[Nombre y apellidos o razón social]",
    nif: "[NIF/CIF]",
    registroMercantil: "", // solo sociedades: "Registro Mercantil de Madrid, Tomo X, Folio X, Hoja M-X"
    registroSanitario: "[CS-XXXX]", // n.º en el Registro de Centros Sanitarios de la Comunidad de Madrid
    dpd: "", // Delegado de Protección de Datos: "Nombre — correo@dominio.es"
    hosting: "SW Hosting (SW Panel)",
    formularios: "El formulario se procesa en nuestro propio servidor (SW Hosting) y nos llega por correo electrónico a través de [Proveedor de correo]",
    conservacion: "un año",
    ultimaActualizacion: "30 de septiembre de 2026",
  },
  nav: [
    { label: "Inicio", url: "/" },
    { label: "El Método Integra", url: "/metodo/" },
    { label: "Cuerpo", url: "/cuerpo/" },
    { label: "Mente", url: "/mente/" },
    { label: "Movimiento", url: "/movimiento/" },
    { label: "Contacto", url: "/contacto/" },
  ],
  footer: {
    tagline: "Centro terapéutico — cuerpo, mente, movimiento. Un enfoque holístico donde la persona está en el centro.",
    tag: "Bienestar Consciente",
    address: "Calle Alcorcón 12, Parla",
    hours: "Lunes a Viernes 9:00–20:00",
    pilares: [
      { label: "Cuerpo", url: "/cuerpo/" },
      { label: "Mente", url: "/mente/" },
      { label: "Movimiento", url: "/movimiento/" },
    ],
    nav: [
      { label: "Inicio", url: "/" },
      { label: "El Método Integra", url: "/metodo/" },
      { label: "Servicios", url: "/#areas-de-trabajo" },
      { label: "Contacto", url: "/contacto/" },
    ],
    legal: [
      { label: "Aviso Legal", url: "/aviso-legal/" },
      { label: "Política de Privacidad", url: "/privacidad/" },
      { label: "Cookies", url: "/cookies/" },
    ],
  },
};
