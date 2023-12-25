<?php
// login.php
header("Access-Control-Allow-Origin: http://localhost:8100"); // permite solicitações apenas de http://localhost:8100
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");  // Métodos permitidos
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Cabeçalhos permitidos
require_once "../vendor/autoload.php";
use PHPMailer\PHPMailer\PHPMailer;

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit; // termina as solicitações preflight CORS aqui
}

$host = 'localhost';
$db   = 'promosis';
$user = 'root';
$pass = 'cala*999865';
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
    throw new \PDOException($e->getMessage(), (int)$e->getCode());
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    

    $id_tienda = $input['idStore'];
    $user_type = $input['tipoUsuario'];

    $name_user = $input['nameUser'];
    $last_name = $input['lastUser']; 
    $rut = $input['rut'];
    $email = $input['mail'];
    $phone = $input['phone'];

    $stmt = $pdo->prepare("SELECT * FROM usuarios WHERE rut = ?");
    $stmt->execute([$rut]);
    $id_cliente = $stmt->fetchColumn();

    if (!$id_cliente) 
    {
        $token = bin2hex(random_bytes(16));
        $stmt = $pdo->prepare("INSERT INTO usuarios (rut, nombre, apellido, correo, telefono, token, expiry_date, id_tienda, tipo_usuario ) VALUES (?, ?, ?, ?, ?, MD5(?), NOW() + INTERVAL 24 HOUR, ?, ?)");
        $stmt->execute([$rut, $name_user, $last_name, $email, $phone, $token, $id_tienda, $user_type]);
        //$id_cliente = $pdo->lastInsertId();        
        $mail = new PHPMailer();

        $mail->isSMTP();
        $mail->Host = 'mail.innovogaming.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'fabio@innovogaming.com';
        $mail->Password = 'oibaf5891';
        //$mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        $mail->setFrom($mail->Username, 'Sorteo Facil');
        $mail->addAddress($email, $name_user);
        $mail->Subject = 'Sorteo Facil - Crear Contrasena';
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
                        <h1>Hola '.$name_user.' '.$last_name.'</h1>
                        <p>Pinche en el boton abajo para confirmar su correo y generar su contrasena.</p>
                        <a href='.$tokenString.' class="email-button">Crear contrasena</a>
                    </div>
                </div>
            </body>
            </html>
        ';
        $mail->Body = $htmlContent;
        //$mail->send();
        if(!$mail->send())
        {            
            echo json_encode(['status' => 'fail', 'reason' => $mail->ErrorInfo]);
            return;
        } 
        else 
        {
            //echo 'Message has been sent: ' . $tokenString;
            echo json_encode(['status' => 'success']);
        }
    }
    else
    {
        $reason = "admitted";
        echo json_encode(['status' => 'fail', 'reason' => $reason]);
        return;
    }  

    //echo json_encode(['status' => 'success']);
    
} 
else 
{
    $reason = "server";
    echo json_encode(['status' => 'fail', 'reason' => $reason]);
}

?>

