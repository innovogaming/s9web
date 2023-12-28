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
     
    $stmt = $pdo->prepare("SELECT compras.id_compra as id, compras.valor_compra as valor, tiendas.nombre as tienda, compras.fecha_compra as fecha, promociones.nombre as sorteo, COUNT(compras.id_compra) as tickets FROM compras INNER JOIN usuarios ON compras.id_usuario = usuarios.id_usuario INNER JOIN promociones ON compras.id_promocion = promociones.id_promocion INNER JOIN tiendas ON promociones.id_tienda = tiendas.id_tienda LEFT JOIN tickets ON compras.id_compra = tickets.id_compra WHERE compras.id_usuario = ? GROUP BY compras.id_compra");
    $stmt->execute([$id]);
    $users = $stmt->fetchAll(PDO::FETCH_ASSOC);

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

