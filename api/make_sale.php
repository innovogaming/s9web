<?php
// login.php
header("Access-Control-Allow-Origin: http://localhost:8100"); // permite solicitações apenas de http://localhost:8100
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");  // Métodos permitidos
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Cabeçalhos permitidos
require_once "../vendor/autoload.php";
use PHPMailer\PHPMailer\PHPMailer;

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

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    $rut_store = $input['rut'];
    $amount = $input['valor']; 
    $rut_client = $input['cliente'];
    
    try 
    {

        $stmt = $pdo->prepare("SELECT tiendas.habilitado, promociones.habilitado as promocion, promociones.id_promocion, promociones.ticket_value FROM tiendas LEFT JOIN promociones ON tiendas.id_tienda = promociones.id_tienda WHERE tiendas.rut = ?");
        $stmt->execute([$rut_store]);
        $promo = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$stmt->rowCount()) 
        {
            echo json_encode(['status' => 'fail', 'response' => 'not_found']);
        }
        else
        {
            if( $promo['habilitado'] == 1 && $promo['promocion'] == 1 )
            {
                //buscar cliente
                $stmt = $pdo->prepare("SELECT id_usuario, tipo_usuario FROM usuarios where rut = ?");
                $stmt->execute([$rut_client]);
                $user = $stmt->fetch(PDO::FETCH_ASSOC);
                $id_usuario = $user['id_usuario'];
                $count = $stmt->rowCount();

                //se nao existir, criar
                if ($count == 0 )
                {
                    //inserir
                    $stmt = $pdo->prepare("INSERT INTO usuarios ( rut, tipo_usuario ) VALUES (?, 2)");
                    $stmt->execute([$rut_client]);
                    $id_usuario = $pdo->lastInsertId();
                }


                $stmt = $pdo->prepare("INSERT INTO compras ( id_usuario, id_promocion, valor_compra ) VALUES (?, ?, ?)");
                $stmt->execute([$id_usuario, $promo['id_promocion'], $amount ]);
                $id_compra = $pdo->lastInsertId();

                $quantidadeTickets = floor($amount / $promo['ticket_value']);

                $stmt = $pdo->prepare("INSERT INTO tickets (ticket_token, id_usuario, id_compra, id_promocion ) VALUES (MD5(?), ?, ?, ? )");

                for ($i = 0; $i < $quantidadeTickets; $i++) 
                {
                    $token = bin2hex(random_bytes(16));
                    $stmt->execute([$token, $id_usuario, $id_compra, $promo['id_promocion']]);
                }

                echo json_encode([
                    'status' => 'success',
                    'promo' => [
                        'habilitado' => $promo['habilitado'],
                        'promocion' => $promo['promocion'],
                        'idpromocion' => $promo['id_promocion'],
                        'idusuario' => $id_usuario,
                        'id_compra' => $id_compra
                    ]
                ]);  
            }
            else
            {
                echo json_encode([
                    'status' => 'fail',
                    'promo' => [
                        'habilitado' => $promo['habilitado'],
                        'promocion' => $promo['promocion']
                    ]
                ]);   
            }

            

        }
        

    } 
    catch (PDOException $e) 
    {
        echo json_encode(['status' => 'fail', 'reason' => $e->getMessage() ]);
        return;
    }       
    
} 
else 
{
    $reason = "server";
    echo json_encode(['status' => 'fail', 'reason' => $reason]);
}

?>

