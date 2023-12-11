<?php 

require_once "../vendor/autoload.php";
use PHPMailer\PHPMailer\PHPMailer;
$mail = new PHPMailer();
// configure an SMTP
$mail->isSMTP();
$mail->Host = 'mail.innovogaming.com';
$mail->SMTPAuth = true;
$mail->Username = 'fabio@innovogaming.com';
$mail->Password = 'oibaf5891';
//$mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
$mail->Port = 587;

$token = bin2hex(random_bytes(16));

$mail->setFrom($mail->Username, 'Your Hotel');
$mail->addAddress('fabio@calabazachile.com', 'Me');
$mail->Subject = 'Validação de Token';
// Set HTML 
$mail->isHTML(TRUE);
$tokenString = "http://www.innovogaming.com/api/validate_token.php?token=". urlencode($token);
$htmlContent = '
    <html>
    <head>
        <style>
            .email-container {
                font-family: Arial, sans-serif;
                color: #333333;
                margin: 0;
                padding: 0;
            }
            .email-content {
                padding: 20px;
                background-color: #f4f4f4;
            }
            .email-button {
                background-color: #007bff;
                color: white;
                padding: 10px 20px;
                text-decoration: none;
                border-radius: 5px;
                display: inline-block;
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            <div class="email-content">
                <h1>Bem-vindo ao Nosso Site!</h1>
                <p>Este é um exemplo de e-mail HTML estilizado.</p>
                <a href='.$tokenString.' class="email-button">Visite Nosso Site</a>
            </div>
        </div>
    </body>
    </html>
';
$mail->Body = $htmlContent;
//$mail->AltBody = "http://www.innovogaming.com/api/validate_token.php?token=" . urlencode($token);
// add attachment 
// just add the '/path/to/file.pdf'
/*$attachmentPath = './confirmations/yourbooking.pdf';
if (file_exists($attachmentPath)) {
    $mail->addAttachment($attachmentPath, 'yourbooking.pdf');
}*/

// send the message
if(!$mail->send()){
    echo 'Message could not be sent.';
    echo 'Mailer Error: ' . $mail->ErrorInfo;
} else {
    echo 'Message has been sent: ' . $tokenString;
}
?>