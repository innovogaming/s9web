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
    
    $tienda = $input['tienda'];
    $nombre = $input['nombre']; 
    $rut = $input['rut'];
    $mail = $input['mail'];
    $phone = $input['phone'];
    $direccion = $input['direccion'];

    $stmt = $pdo->prepare("UPDATE tiendas SET nombre = :tienda, razon_social = :nombre, telefono = :phone, correo = :mail, direccion = :direccion WHERE rut = :rut");
    $stmt->bindParam(':tienda', $tienda);
    $stmt->bindParam(':nombre', $nombre);
    $stmt->bindParam(':phone', $phone);
    $stmt->bindParam(':mail', $mail);
    $stmt->bindParam(':rut', $rut);
    $stmt->bindParam(':direccion', $direccion);

    if ($stmt->execute()) 
    {
        echo json_encode(['status' => 'success']);

    }
    else
    {
        echo json_encode(['status' => 'fail']);
    }  
} 
else 
{
    $reason = "server";
    echo json_encode(['status' => 'fail', 'reason' => $reason]);
}

?>

