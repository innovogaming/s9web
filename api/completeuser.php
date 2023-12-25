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
    
    $name_user = $input['nameUser'];
    $last_name = $input['lastUser']; 
    $rut = $input['rut'];
    $phone = $input['phone'];
    $address = $input['address'];
    $sexo = $input['sexo'];
    $nacimiento = $input['nacimiento'];

    $stmt = $pdo->prepare("UPDATE usuarios SET nombre = :nombre, apellido = :lastname, telefono = :phone, direccion = :address, sexo = :sexo, fecha_nacimiento = :nacimiento WHERE rut = :rut");
    $stmt->bindParam(':nombre', $name_user);
    $stmt->bindParam(':lastname', $last_name);
    $stmt->bindParam(':phone', $phone);
    $stmt->bindParam(':address', $address);
    $stmt->bindParam(':sexo', $sexo);
    $stmt->bindParam(':nacimiento', $nacimiento);
    $stmt->bindParam(':rut', $rut);

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

