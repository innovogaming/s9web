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
     
    $stmt = $pdo->prepare("SELECT promociones.id_promocion as id, promociones.nombre,  promociones.premio,  promociones.fecha_premio as fecha,  promociones.description,  promociones.ticket_value as valor,  promociones.fecha_pago, tiendas.nombre as tienda,  CONCAT(usuarios.nombre, ' ', usuarios.apellido) as cliente, usuarios.rut FROM promociones LEFT JOIN tiendas ON promociones.id_tienda = tiendas.id_tienda LEFT JOIN usuarios ON promociones.id_usuario = usuarios.id_usuario WHERE tiendas.id_tienda = ?");
    $stmt->execute([$id]);
    $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    if ($stmt->rowCount()) 
    {
        foreach ($results as $key => $value) 
        {
            if ($value['fecha_pago']) {
                $date = new DateTime($value['fecha_pago']);
                $results[$key]['fecha_pago'] = $date->format('Y-m-d H:i:s');
            }
        }

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

