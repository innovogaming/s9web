<?php
header("Access-Control-Allow-Origin: http://localhost:8100"); // permite solicitações apenas de http://localhost:8100
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");  // Métodos permitidos
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Cabeçalhos permitidos

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

$data = json_decode(file_get_contents('php://input'), true);
$token = $data['token'];
$senha = $data['senha'];
$senhaHash = md5($senha);

//$stmt = $pdo->prepare("UPDATE usuarios SET token = NULL, expiry_date = NULL, habilitado = 1 WHERE id_usuario = ?");
//$stmt->execute([$user['id_usuario']]);
$stmt = $pdo->prepare("UPDATE usuarios SET password = :senha, token = NULL, expiry_date = NULL, habilitado = 1 WHERE token = :token");
$stmt->bindParam(':senha', $senhaHash);
$stmt->bindParam(':token', $token);

if ($stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false]);
}

?>

