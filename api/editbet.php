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

if ($_SERVER['REQUEST_METHOD'] == 'POST') 
{
    $input = json_decode(file_get_contents('php://input'), true);
    
    $id = $input['id'];
    $dataHora = $input['dataHora']; 
    $descripcion = $input['descripcion'];
    $nombre = $input['nombre'];
    $premio = $input['premio']; 
    $valor = $input['valor'];

    $stmt = $pdo->prepare("UPDATE promociones SET promociones.description = ?, promociones.nombre = ?, promociones.ticket_value = ?, promociones.premio = ?, promociones.fecha_premio = STR_TO_DATE(?, '%Y-%m-%dT%H:%i:%s.%fZ') WHERE promociones.id_promocion = ?");
    if ($stmt->execute([$descripcion, $nombre, $valor, $premio, $dataHora, $id])) 
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

