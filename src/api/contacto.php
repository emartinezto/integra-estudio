<?php
// Recibe el formulario de /contacto/ y lo envía por email desde el propio servidor.
// Responde en JSON si la petición llega por JavaScript (fetch) y, si no, redirige
// de vuelta a /contacto/ con ?enviado=ok o ?enviado=error.

// ---------------------------------------------------------------------------
// Configuración
// ---------------------------------------------------------------------------

// Correo que recibe las consultas (provisional: cambiar por el del centro)
const DESTINO = 'emartineztores@gmail.com';

// Remitente técnico. Debe ser del dominio alojado en este servidor para que
// el email no acabe en spam; la respuesta irá al email de la persona (Reply-To).
const REMITENTE = 'web@integrastudio.es';
const REMITENTE_NOMBRE = 'Web Integra Studio';

const AREAS = [
    'cuerpo'     => 'Cuerpo · Fisioterapia',
    'mente'      => 'Mente · Orientación y apoyo',
    'movimiento' => 'Movimiento · Pilates',
    'formacion'  => 'Formación · Oposiciones',
];

// Segundos mínimos entre cargar la página y enviar (los robots envían al instante)
const TIEMPO_MINIMO = 3;

// ---------------------------------------------------------------------------

$quiereJson = strpos($_SERVER['HTTP_ACCEPT'] ?? '', 'application/json') !== false;

function responder(bool $ok, string $mensaje, int $status = 200): void
{
    global $quiereJson;
    if ($quiereJson) {
        http_response_code($status);
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode(['ok' => $ok, 'message' => $mensaje], JSON_UNESCAPED_UNICODE);
    } else {
        header('Location: /contacto/?enviado=' . ($ok ? 'ok' : 'error') . '#formulario');
    }
    exit;
}

function campo(string $nombre, int $max): string
{
    $valor = trim((string) ($_POST[$nombre] ?? ''));
    // Quita saltos de línea en campos de una línea (evita inyección de cabeceras)
    if ($nombre !== 'message') {
        $valor = preg_replace('/[\r\n]+/', ' ', $valor);
    }
    return mb_substr($valor, 0, $max);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST');
    responder(false, 'Método no permitido.', 405);
}

// Antispam: campo trampa oculto que las personas no rellenan
if (!empty($_POST['website'])) {
    responder(true, 'Mensaje enviado.'); // se finge éxito para no dar pistas
}

// Antispam: envíos demasiado rápidos (el navegador mide los milisegundos
// desde que se abrió la página; sin JavaScript el campo no llega y no se comprueba)
$transcurrido = isset($_POST['elapsed']) ? (int) $_POST['elapsed'] : null;
if ($transcurrido !== null && $transcurrido < TIEMPO_MINIMO * 1000) {
    responder(true, 'Mensaje enviado.');
}

$nombre   = campo('name', 120);
$email    = campo('email', 160);
$telefono = campo('phone', 40);
$area     = campo('interest', 20);
$mensaje  = campo('message', 5000);
$consent  = !empty($_POST['consent']);

if ($nombre === '' || $mensaje === '' || !isset(AREAS[$area])) {
    responder(false, 'Revisa los campos obligatorios.', 422);
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    responder(false, 'El correo electrónico no es válido.', 422);
}
if (!$consent) {
    responder(false, 'Debes aceptar la política de privacidad.', 422);
}

$asunto = 'Nueva consulta web: ' . AREAS[$area] . ' — ' . $nombre;

$cuerpo = implode("\n", [
    'Nueva consulta desde el formulario de integrastudio.es',
    '',
    'Nombre:   ' . $nombre,
    'Email:    ' . $email,
    'Teléfono: ' . ($telefono !== '' ? $telefono : '(no indicado)'),
    'Área:     ' . AREAS[$area],
    '',
    'Mensaje:',
    $mensaje,
    '',
    '---',
    'Enviado el ' . date('d/m/Y H:i') . '. La persona aceptó la política de privacidad.',
    'Responde a este email para contestar directamente a ' . $email . '.',
]);

$cabeceras = implode("\r\n", [
    'From: =?UTF-8?B?' . base64_encode(REMITENTE_NOMBRE) . '?= <' . REMITENTE . '>',
    'Reply-To: =?UTF-8?B?' . base64_encode($nombre) . '?= <' . $email . '>',
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
]);

$enviado = mail(
    DESTINO,
    '=?UTF-8?B?' . base64_encode($asunto) . '?=',
    $cuerpo,
    $cabeceras,
    '-f' . REMITENTE
);

if (!$enviado) {
    error_log('Formulario de contacto: mail() ha fallado');
    responder(false, 'No hemos podido enviar tu mensaje. Inténtalo de nuevo o escríbenos por email.', 500);
}

responder(true, 'Mensaje enviado.');
