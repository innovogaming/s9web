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

    $stmt = $pdo->prepare("SELECT COUNT(*) as cantidad FROM participacion WHERE id_promocion = ?");
    $stmt->execute([$idPromocion]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($stmt->rowCount()) 
    {
        $amount = $user['cantidad'];
        echo json_encode(['status' => 'success', 'amount' => $amount]);
        
    }
    
} 
else 
{
    $reason = "server";
    echo json_encode(['status' => 'fail', 'reason' => $reason]);
}

?>

