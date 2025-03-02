<?php
require("class.phpmailer.php");
require("class.smtp.php");

if (!isset($_POST["nombre"]) || !isset($_POST["email"]) || !isset($_POST["mensaje"])) {
    echo json_encode(['status' => 'error', 'message' => 'Es necesario completar todos los datos del formulario']);
    exit;
}

$nombre = $_POST["nombre"];
$email = $_POST["email"];
$mensaje = $_POST["mensaje"];

// Datos SMTP de Donweb
$smtpHost = "c2760921.ferozo.com";  // Host SMTP de Ferozo
$smtpUsuario = "contacto@universalstone.com.ar";
$smtpClave = "Universal/Stone/2025";

// Email donde se enviarán los datos del formulario
$emailDestino = "marmoleriauniversalstone@gmail.com"; 

$mail = new PHPMailer();
$mail->IsSMTP();
$mail->SMTPAuth = true;
$mail->Port = 465; 
$mail->SMTPSecure = 'ssl';
$mail->IsHTML(true); 
$mail->CharSet = "utf-8";

// Configuración SMTP
$mail->Host = $smtpHost; 
$mail->Username = $smtpUsuario; 
$mail->Password = $smtpClave;

// Datos del email
$mail->From = $smtpUsuario;
$mail->FromName = $nombre;
$mail->AddAddress($emailDestino); 
$mail->Subject = "Nuevo mensaje desde el formulario de Universal Stone"; 

// Establecer el campo Reply-To con el correo del usuario
$mail->AddReplyTo($email, $nombre);

$mensajeHtml = nl2br($mensaje);
$mail->Body = "Mensaje de: <strong>{$nombre}</strong> <br>
               Email: <strong>{$email}</strong> <br><br>
               <strong>Mensaje:</strong> <br> {$mensajeHtml} <br><br>
               <hr>
               Enviado desde la web de Universal Stone.";

$mail->AltBody = "{$mensaje} \n\n Enviado desde la web de Universal Stone"; 

// Enviar el email al administrador
$estadoEnvio = $mail->Send(); 

if($estadoEnvio){
    // Enviar correo de confirmación al cliente
    $mailCliente = new PHPMailer();
    $mailCliente->IsSMTP();
    $mailCliente->SMTPAuth = true;
    $mailCliente->Port = 465; 
    $mailCliente->SMTPSecure = 'ssl';
    $mailCliente->IsHTML(true); 
    $mailCliente->CharSet = "utf-8";

    // Configuración SMTP
    $mailCliente->Host = $smtpHost; 
    $mailCliente->Username = $smtpUsuario; 
    $mailCliente->Password = $smtpClave;

    // Datos del email de confirmación
    $mailCliente->From = $smtpUsuario;
    $mailCliente->FromName = 'Universal Stone';
    $mailCliente->AddAddress($email); 
    $mailCliente->Subject = "Confirmación de recepción de mensaje"; 

    // Mensaje para el cliente
    $mensajeCliente = "
    <html>
    <head>
        <title>Confirmación de recepción</title>
    </head>
    <body>
        <h2>Hola, {$nombre}</h2>
        <p>Hemos recibido tu mensaje correctamente. Nuestro equipo se pondrá en contacto contigo a la brevedad.</p>
        <p>Gracias por escribirnos.</p>
        <p>Saludos cordiales,</p>
        <p>Universal Stone</p>
    </body>
    </html>
    ";
    
    $mailCliente->Body = $mensajeCliente;
    $mailCliente->AltBody = "Hola, {$nombre}\nHemos recibido tu mensaje correctamente. Nuestro equipo se pondrá en contacto contigo a la brevedad.\nGracias por escribirnos.\nSaludos cordiales, El equipo de Universal Stone";

    // Enviar el correo al cliente
    if($mailCliente->Send()) {
        echo json_encode(['status' => 'success', 'message' => 'El correo fue enviado correctamente.']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Ocurrió un error al enviar el correo al cliente.']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Ocurrió un error inesperado al enviar el correo al administrador.']);
}
?>

