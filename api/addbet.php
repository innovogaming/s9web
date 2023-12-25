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
    
    $idStore = $input['idStore'];
    $valor = $input['valor']; 
    $premio = $input['premio'];
    $nombre = $input['nombre'];
    $descripcion = $input['descripcion'];
    $dataHora = $input['dataHora'];
    
    try 
    {

        $token = bin2hex(random_bytes(16));
        $stmt = $pdo->prepare("INSERT INTO promociones (nombre, id_tienda, premio, fecha_premio, description, ticket_value, token ) VALUES (?, ?, ?, ?, ?, ?, MD5(?) )");
        $stmt->execute([$nombre, $idStore, $premio, $dataHora, $descripcion, $valor, $token]);
        $id_usuario = $pdo->lastInsertId();

        echo json_encode(['status' => 'success']);

    } 
    catch (PDOException $e) 
    {
        echo json_encode(['status' => 'fail', 'reason' => $e->getMessage() ]);
        return;
    }       
    
} 
else 
{
    $reason = "server";
    echo json_encode(['status' => 'fail', 'reason' => $reason]);
}

?>

