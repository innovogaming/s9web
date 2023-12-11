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

if (isset($_GET['token']))
//if ($_SERVER['REQUEST_METHOD'] == 'POST') 
{
    $token = md5($_GET['token']);
    
    echo $token;

    $stmt = $pdo->prepare("SELECT id_usuario FROM usuarios WHERE token = ? AND expiry_date > NOW()");
    $stmt->execute([$token]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    echo "result: " . $stmt->rowCount();
    if ($stmt->rowCount()) 
    {
        echo "usuario" . $user['id_usuario'];
        $stmt = $pdo->prepare("UPDATE usuarios SET token = NULL, expiry_date = NULL, habilitado = 1 WHERE id_usuario = ?");
        $stmt->execute([$user['id_usuario']]);

        echo json_encode([
            'status' => 'success',
            'user' => [
                'id' => $user['id_usuario']
            ]
        ]);

        
        //echo $user['id_usuario'];
        //echo json_encode(['status' => 'success']);   
    }
    else
    {
        echo json_encode(['status' => 'fail']);
        return;
    }

     
} 
else 
{
    $reason = "server";
    echo json_encode(['status' => 'fail', 'reason' => $reason]);
}

?>

