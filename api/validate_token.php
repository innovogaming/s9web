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
    
    //echo $token;

    $stmt = $pdo->prepare("SELECT id_usuario FROM usuarios WHERE token = ? AND expiry_date > NOW()");
    $stmt->execute([$token]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    //echo "result: " . $stmt->rowCount();
    if ($stmt->rowCount()) 
    {
        //echo "usuario" . $user['id_usuario'];
        //$stmt = $pdo->prepare("UPDATE usuarios SET token = NULL, expiry_date = NULL, habilitado = 1 WHERE id_usuario = ?");
        //$stmt->execute([$user['id_usuario']]);

        /*echo json_encode([
            'status' => 'success',
            'user' => [
                'id' => $user['id_usuario']
            ]
        ]);*/
        header("Location: generarclave.html?token=$token");
        exit;

        
        //echo $user['id_usuario'];
        //echo json_encode(['status' => 'success']);   
    }
    else {
        // Exibe uma mensagem de erro formatada
        echo "
        <!DOCTYPE html>
        <html lang='pt'>
        <head>
            <meta charset='UTF-8'>
            <meta name='viewport' content='width=device-width, initial-scale=1.0'>
            <title>Erro</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    margin: 0;
                    background-color: #f5f5f5;
                }
                .error-container {
                    text-align: center;
                    background-color: #ffcccc;
                    border: 1px solid #ff0000;
                    padding: 20px;
                    border-radius: 5px;
                }
            </style>
        </head>
        <body>
            <div class='error-container'>
                <h2>Error</h2>
                <p>Link expirado.</p>
            </div>
        </body>
        </html>
        ";
    }

     
} 
else 
{
    $reason = "server";
    echo json_encode(['status' => 'fail', 'reason' => $reason]);
}

?>

