<?php
// login.php
header("Access-Control-Allow-Origin: http://localhost:8100"); // permite solicitações apenas de http://localhost:8100
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");  // Métodos permitidos
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Cabeçalhos permitidos

// Lidar com solicitações preflight OPTIONS
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit; // termina as solicitações preflight CORS aqui
}

//$data = json_decode(file_get_contents("php://input"));

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
    
    $idPromocion = $input['idPromocion'];
    $idUsuario = $input['idUsuario']; 
    $rut = $input['rut'];

    $stmt = $pdo->prepare("SELECT * FROM clientes WHERE rut = ?");
    $stmt->execute([$rut]);
    $id_cliente = $stmt->fetchColumn();

    if (!$id_cliente) {
        // Se o RUT não existir, insira um novo cliente
        $stmt = $pdo->prepare("INSERT INTO clientes (rut) VALUES (?)");
        $stmt->execute([$rut]);
        $id_cliente = $pdo->lastInsertId();
    }

    $stmt = $pdo->prepare("SELECT * FROM participacion WHERE id_cliente = ?");
    $stmt->execute([$id_cliente]);
    if ($stmt->rowCount()) 
    {
        $reason = "admitted";
        echo json_encode(['status' => 'fail', 'reason' => $reason]);
        return;
    }

    $stmt = $pdo->prepare("INSERT INTO participacion (id_cliente, id_usuario, id_promocion) VALUES (?, ?, ?)");
    $stmt->execute([$id_cliente, $idUsuario, $idPromocion]);

    echo json_encode(['status' => 'success']);
    
} 
else 
{
    $reason = "server";
    echo json_encode(['status' => 'fail', 'reason' => $reason]);
}

?>

