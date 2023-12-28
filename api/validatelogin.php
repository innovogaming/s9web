<?php
header("Access-Control-Allow-Origin: http://localhost:8100"); // permite solicitações apenas de http://localhost:8100
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");  // Métodos permitidos
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Cabeçalhos permitidos

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS')
{
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
$login = $data['login'];
$senha = $data['senha'];
$token = $data['token'];
$senhaHash = md5($senha);
//$tokenHash = md5($token);

$stmt = $pdo->prepare("SELECT promociones.premio, tiendas.nombre as tienda, usuarios.id_usuario FROM tickets INNER JOIN promociones ON tickets.id_promocion = promociones.id_promocion INNER JOIN tiendas ON promociones.id_tienda = tiendas.id_tienda INNER JOIN usuarios ON tiendas.id_tienda = usuarios.id_tienda WHERE tickets.ticket_token = :token AND usuarios.correo = :login AND usuarios.password = :senha");
$stmt->bindParam(':login', $login);
$stmt->bindParam(':senha', $senhaHash);
$stmt->bindParam(':token', $token);
$stmt->execute();
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if ($stmt->rowCount()) 
{
    $stmt = $pdo->prepare("SELECT usuarios.nombre, usuarios.apellido, usuarios.rut, tickets.date_paid FROM tickets INNER JOIN usuarios ON tickets.id_usuario = usuarios.id_usuario WHERE tickets.ticket_token = :token");
    $stmt->bindParam(':token', $token);
    $stmt->execute();
    $res = $stmt->fetch(PDO::FETCH_ASSOC);
    if( isset($res['date_paid']) )
    {
        $stmt = $pdo->prepare("SELECT tickets.date_paid, promociones.fecha_pago
                            FROM tickets
                            JOIN promociones ON tickets.id_usuario = promociones.id_usuario
                            WHERE tickets.ticket_token = :token");
        $stmt->bindParam(':token', $token);
        $stmt->execute();

        $result = $stmt->fetch(PDO::FETCH_ASSOC);    
        
        echo json_encode([
            'status' => 'success',
            'user' => [
                'premio' => $user['premio'],
                'tienda' => $user['tienda'],
                'nombre' => $res['nombre'],
                'apellido' => $res['apellido'],
                'rut' => $res['rut'],
                'date' => $result['date_paid']
            ]
        ]);
    }
    else
    {
        $dataHoraAtual = date('Y-m-d H:i:s');
        
        $stmt = $pdo->prepare("UPDATE tickets
        JOIN promociones ON tickets.id_usuario = promociones.id_usuario
        SET tickets.date_paid = :datelinux, promociones.fecha_pago = :datelinux2
        WHERE tickets.ticket_token = :token");
        $stmt->bindParam(':datelinux', $dataHoraAtual);
        $stmt->bindParam(':datelinux2', $dataHoraAtual);
        $stmt->bindParam(':token', $token);
        $stmt->execute();

        $stmt = $pdo->prepare("SELECT tickets.date_paid, promociones.fecha_pago
                            FROM tickets
                            JOIN promociones ON tickets.id_usuario = promociones.id_usuario
                            WHERE tickets.ticket_token = :token");
        $stmt->bindParam(':token', $token);
        $stmt->execute();

        $result = $stmt->fetch(PDO::FETCH_ASSOC);    
        
        echo json_encode([
            'status' => 'success',
            'user' => [
                'premio' => $user['premio'],
                'tienda' => $user['tienda'],
                'nombre' => $res['nombre'],
                'apellido' => $res['apellido'],
                'rut' => $res['rut'],
                'date' => $result['date_paid']
            ]
        ]);
        
        
    }
} 
else 
{
    echo json_encode(['status' => 'fail']);
}

?>

