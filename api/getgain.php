<?php
// login.php
header("Access-Control-Allow-Origin: http://localhost:8100"); // permite solicitações apenas de http://localhost:8100
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");  // Métodos permitidos
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Cabeçalhos permitidos

// Lidar com solicitações preflight OPTIONS
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
     
    $stmt = $pdo->prepare("SELECT tickets.ticket_token as token, promociones.nombre, promociones.premio, tiendas.nombre as tienda FROM `tickets` INNER JOIN promociones ON tickets.id_promocion = promociones.id_promocion INNER JOIN tiendas ON promociones.id_tienda = tiendas.id_tienda WHERE tickets.id_usuario = ? AND tickets.token_promocion is not null and tickets.date_paid is null");
    $stmt->execute([$id]);
    $users = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($stmt->rowCount()) 
    {
        echo json_encode(['status' => 'success', 'users' => $users]);
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

