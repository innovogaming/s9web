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
    
    $username = $input['username'];
    $password = md5($input['password']);  // Usando md5 para senha (não é seguro para produção!)

    /*$stmt = $pdo->prepare("SELECT usuarios.nombre as usuario, usuarios.id_usuario, 
    tiendas.nombre as tienda, tiendas.id_tienda, promociones.id_promocion, 
    promociones.nombre as promocion, promociones.premio, promociones.fecha_premio, 
    promociones.habilitado, usuarios.tipo_usuario  FROM usuarios LEFT JOIN tiendas ON usuarios.id_tienda = tiendas.id_tienda 
    LEFT JOIN promociones ON tiendas.id_tienda = promociones.id_tienda WHERE usuarios.correo = ? AND password = ?");*/
    $stmt = $pdo->prepare("SELECT usuarios.id_usuario, usuarios.nombre, usuarios.apellido, usuarios.habilitado, usuarios.tipo_usuario, usuarios.id_tienda, tiendas.nombre as tienda
    FROM usuarios LEFT JOIN tiendas ON usuarios.id_tienda = tiendas.id_tienda WHERE usuarios.correo = ? AND password = ?");
    $stmt->execute([$username, $password]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($stmt->rowCount()) {
        echo json_encode([
            'status' => 'success',
            'user' => [
                'id' => $user['id_usuario'],
                'nombre' => $user['nombre'],
                'apellido' => $user['apellido'],
                'idStore' => $user['id_tienda'],
                'tienda' => $user['tienda'],
                'habilitado' => $user['habilitado'],
                'tipoUsuario' => $user['tipo_usuario']
            ]
        ]);
    }
    else {
        echo json_encode(['status' => 'fail']);
    }
}

?>

