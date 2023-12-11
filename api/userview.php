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
    
    $id_tienda = $input['idTienda'];
    $user_type = $input['userType'];
    
    //userType = 0 then Master
    //userType = 1 then Cuenta
    //userType = 2 then Cliente
    if( $user_type == 1 )
    {
        $stmt = $pdo->prepare("SELECT usuarios.id_usuario, usuarios.nombre, usuarios.apellido, usuarios.rut, usuarios.correo, usuarios.telefono, usuarios.habilitado, tiendas.nombre as tienda, usuarios.timeStamp FROM usuarios LEFT JOIN tiendas ON usuarios.id_tienda = tiendas.id_tienda WHERE usuarios.id_tienda = ?");
        $stmt->execute([$id_tienda]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($stmt->rowCount()) {
            echo json_encode([
                'status' => 'success',
                'user' => [
                    'idUsuario' => $user['id_usuario'],
                    'nombre' => $user['nombre'],
                    'apellido' => $user['apellido'],
                    'rut' => $user['rut'],
                    'correo' => $user['correo'],
                    'telefono' => $user['telefono'],
                    'habilitado' => $user['habilitado'],
                    'tienda' => $user['tienda'],
                    'timeStamp' => $user['timeStamp']
                ]
            ]);
        }
        else {
            echo json_encode(['status' => 'fail']);
        }
    }
    else if( $user_type == 0 )
    {
        $stmt = $pdo->prepare("SELECT usuarios.id_usuario, usuarios.nombre, usuarios.apellido, usuarios.rut, usuarios.correo, usuarios.telefono, usuarios.habilitado, usuarios.timeStamp FROM usuarios WHERE tipo_usuario = 0");
        $stmt->execute();
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($stmt->rowCount()) {
            echo json_encode([ 'status' => 'success',
                'user' => [
                    'idUsuario' => $user['id_usuario'],
                    'nombre' => $user['nombre'],
                    'apellido' => $user['apellido'],
                    'rut' => $user['rut'],
                    'correo' => $user['correo'],
                    'telefono' => $user['telefono'],
                    'habilitado' => $user['habilitado'],
                    'timeStamp' => $user['timeStamp']
                ]
            ]);
        }
        else {
            echo json_encode(['status' => 'fail']);
        }
    }

    
    
} 
else 
{
    $reason = "server";
    echo json_encode(['status' => 'fail', 'reason' => $reason]);
}

?>

