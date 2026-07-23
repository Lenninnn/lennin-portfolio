<?php

declare(strict_types=1);

use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\PHPMailer;

require __DIR__ . '/vendor/phpmailer/src/Exception.php';
require __DIR__ . '/vendor/phpmailer/src/PHPMailer.php';
require __DIR__ . '/vendor/phpmailer/src/SMTP.php';

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

function respond(int $status, bool $success, string $message): never
{
    http_response_code($status);
    echo json_encode(
        ['success' => $success, 'message' => $message],
        JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES
    );
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(405, false, 'Método no permitido.');
}

$configFile = __DIR__ . '/config/mail.php';
$fileConfig = is_file($configFile) ? require $configFile : [];
$fileConfig = is_array($fileConfig) ? $fileConfig : [];

$setting = static function (string $key, string $fallback = '') use ($fileConfig): string {
    $environmentValue = getenv($key);
    if ($environmentValue !== false && $environmentValue !== '') {
        return (string) $environmentValue;
    }

    return isset($fileConfig[$key]) ? (string) $fileConfig[$key] : $fallback;
};

$smtpHost = $setting('SMTP_HOST', 'smtp.gmail.com');
$smtpPort = (int) $setting('SMTP_PORT', '587');
$smtpUser = $setting('SMTP_USER', 'lenninlincoln@gmail.com');
$smtpPass = $setting('SMTP_PASS');
$mailTo = $setting('MAIL_TO', 'lenninlincoln@gmail.com');

if ($smtpPass === '') {
    error_log('Portfolio contact form: SMTP_PASS is not configured.');
    respond(503, false, 'El formulario está en configuración. Intenta nuevamente más tarde.');
}

$name = trim((string) ($_POST['name'] ?? ''));
$email = trim((string) ($_POST['email'] ?? ''));
$message = trim((string) ($_POST['message'] ?? ''));
$honeypot = trim((string) ($_POST['website'] ?? ''));

if ($honeypot !== '') {
    respond(200, true, 'Mensaje enviado correctamente.');
}

if ($name === '' || mb_strlen($name) > 100) {
    respond(422, false, 'Escribe un nombre válido.');
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL) || mb_strlen($email) > 180) {
    respond(422, false, 'Escribe un correo electrónico válido.');
}

if ($message === '' || mb_strlen($message) > 5000) {
    respond(422, false, 'Escribe un mensaje de máximo 5.000 caracteres.');
}

$safeName = htmlspecialchars($name, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
$safeEmail = htmlspecialchars($email, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
$safeMessage = nl2br(htmlspecialchars($message, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8'));

try {
    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host = $smtpHost;
    $mail->Port = $smtpPort;
    $mail->SMTPAuth = true;
    $mail->Username = $smtpUser;
    $mail->Password = $smtpPass;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->CharSet = PHPMailer::CHARSET_UTF8;
    $mail->Timeout = 15;

    $mail->setFrom($smtpUser, 'Portafolio Lennin Dev');
    $mail->addAddress($mailTo, 'Lennin');
    $mail->addReplyTo($email, $name);

    $mail->isHTML(true);
    $mail->Subject = 'Nuevo mensaje desde el portafolio';
    $mail->Body = <<<HTML
        <h2>Nuevo mensaje desde el portafolio</h2>
        <p><strong>Nombre:</strong> {$safeName}</p>
        <p><strong>Correo:</strong> {$safeEmail}</p>
        <p><strong>Mensaje:</strong></p>
        <p>{$safeMessage}</p>
    HTML;
    $mail->AltBody = "Nuevo mensaje desde el portafolio\n\nNombre: {$name}\nCorreo: {$email}\n\n{$message}";
    $mail->send();

    respond(200, true, 'Mensaje enviado. Te responderé muy pronto.');
} catch (Exception $exception) {
    error_log('Portfolio contact form mail error: ' . $exception->getMessage());
    respond(500, false, 'No fue posible enviar el mensaje. Intenta nuevamente.');
}
