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

try 
{
    $pdo = new PDO($dsn, $user, $pass, $options);
} 
catch (\PDOException $e) 
{
    throw new \PDOException($e->getMessage(), (int)$e->getCode());
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    $name = $input['nameUser'];
    $razonsocial = $input['razonsocial']; 
    $rut = $input['rut'];
    $email = $input['mail'];
    $phone = $input['phone'];
    $address = $input['direccion'];
    $name_user = $input['name_user'];
    $lastname_user = $input['lastname_user'];
    $mail_user = $input['mail_user'];
    $phone_user = $input['phone_user'];
    $rut_user = $input['rut_user'];

    
    $stmt = $pdo->prepare("SELECT * FROM usuarios WHERE rut = ?");
    $stmt->execute([$rut_user]);
    $id_cliente = $stmt->fetchColumn();

    if (!$id_cliente) 
    {
        $stmt = $pdo->prepare("SELECT * FROM tiendas WHERE rut = ?");
        $stmt->execute([$rut]);
        $id_empresa = $stmt->fetchColumn();

        if (!$id_empresa) 
        {

            $debugSql;

            try 
            {

                $token = bin2hex(random_bytes(16));
                $stmt = $pdo->prepare("INSERT INTO usuarios (rut, nombre, apellido, correo, telefono, token, expiry_date, tipo_usuario ) VALUES (?, ?, ?, ?, ?, MD5(?), NOW() + INTERVAL 24 HOUR, 1)");
                $stmt->execute([$rut_user, $name_user, $lastname_user, $mail_user, $phone_user, $token]);
                $id_usuario = $pdo->lastInsertId();

                $stmt = $pdo->prepare("INSERT INTO tiendas (rut, nombre, razon_social, correo, telefono, direccion, id_usuario ) VALUES (:rut, :nombre, :razon_social, :correo, :telefono, :direccion, :id_usuario)");
                $stmt->bindParam(':rut', $rut);
                $stmt->bindParam(':nombre', $name);
                $stmt->bindParam(':razon_social', $razonsocial);
                $stmt->bindParam(':correo', $email);
                $stmt->bindParam(':telefono', $phone);
                $stmt->bindParam(':direccion', $address);
                $stmt->bindParam(':id_usuario', $id_usuario);

                $stmt->execute();  
                $id_tienda = $pdo->lastInsertId();

                $stmt = $pdo->prepare("UPDATE usuarios SET id_tienda = :idTienda WHERE id_usuario = :idUsuario");
                $stmt->bindParam(':idTienda', $id_tienda);
                $stmt->bindParam(':idUsuario', $id_usuario);

                $stmt->execute();                

                $mail = new PHPMailer();

                $mail->isSMTP();
                $mail->Host = 'mail.innovogaming.com';
                $mail->SMTPAuth = true;
                $mail->Username = 'fabio@innovogaming.com';
                $mail->Password = 'oibaf5891';
                //$mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
                $mail->Port = 587;

                $mail->setFrom($mail->Username, 'Sorteo Facil');
                $mail->addAddress($mail_user, $name_user);
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
                                <h1>Hola '.$name_user.' '.$lastname_user.'</h1>
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
            catch (PDOException $e) 
            {
                echo json_encode(['status' => 'fail', 'reason' => $e->getMessage(), 'debug_sql' => $rut]);
                return;
            }
            
        }
        else
        {
            $reason = "company";
            echo json_encode(['status' => 'fail', 'reason' => $reason]);
            return;
        }
    }
    else
    {
        $reason = "user";
        echo json_encode(['status' => 'fail', 'reason' => $reason]);
        return;
    }  
    
} 
else 
{
    $reason = "server";
    echo json_encode(['status' => 'fail', 'reason' => $reason]);
}

?>

