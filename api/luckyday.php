<?php
//date_default_timezone_set('America/Sao_Paulo');

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

$stmt = $pdo->prepare("SELECT promociones.fecha_premio, promociones.id_promocion FROM promociones INNER JOIN tiendas ON promociones.id_tienda = tiendas.id_tienda where promociones.habilitado = 1 and tiendas.habilitado = 1 AND promociones.ticket_token IS NULL");
$stmt->execute();
$resultados = $stmt->fetchAll(PDO::FETCH_ASSOC);

$dataHoraAtual = date("Y-m-d H:i:s");
echo "Data e Hora Atual: " . $dataHoraAtual . " - ";
echo "Sorteios vigentes: " . $stmt->rowCount() . "";

foreach ($resultados as $linha) 
{
    
    echo "Sorteio: " . $linha['fecha_premio'] . ", Data atual: " . $dataHoraAtual . "\n";

    if ($dataHoraAtual > $linha['fecha_premio']) 
    {
        echo "Vamos sortear um ganhador.";
        $stmt = $pdo->prepare("SELECT tickets.id_ticket, tickets.ticket_token, usuarios.id_usuario, usuarios.rut, promociones.token FROM tickets INNER JOIN usuarios ON tickets.id_usuario = usuarios.id_usuario INNER JOIN promociones ON tickets.id_promocion = promociones.id_promocion WHERE tickets.id_promocion = ? AND usuarios.tipo_usuario = 2 ORDER BY RAND() LIMIT 1");
        $stmt->execute([$linha['id_promocion']]);
        $resultados = $stmt->fetch(PDO::FETCH_ASSOC);
        /*echo "Ganhador: " . $resultados['rut'] . "<\br>";
        echo "ticket_token: " . $resultados['ticket_token'] . "<\br>";
        echo "token: " . $resultados['token'] . "<\br>";
        echo "id_usuario: " .  $resultados['id_usuario'] . "<\br>";
        echo "id_ticket: " .  $resultados['id_ticket'] . "<\br>";
        echo "id_promocion: " . $linha['id_promocion'] . "<\br>";*/

        //atualiza promo com o ticket_token
        $stmt = $pdo->prepare("UPDATE promociones SET ticket_token = :token, id_usuario = :idusuario WHERE id_promocion = :id");
        $stmt->bindParam(':token', $resultados['ticket_token'] );
        $stmt->bindParam(':idusuario', $resultados['id_usuario'], PDO::PARAM_INT);
        $stmt->bindParam(':id', $linha['id_promocion'], PDO::PARAM_INT);
        $stmt->execute();
        /*if ($stmt->execute()) 
        {
            echo "SIM <\br>";
        } 
        else 
        {
            echo "NAO <\br>";
        } */

        //atualiza tickets com o token de promo
        $stmt = $pdo->prepare("UPDATE tickets SET token_promocion = :token WHERE id_ticket = :id");
        $stmt->bindParam(':token', $resultados['token'] );
        $stmt->bindParam(':id', $resultados['id_ticket'], PDO::PARAM_INT);
        $stmt->execute();
        /*if ($stmt->execute()) 
        {
            echo "SIM <\br>";
        } 
        else 
        {
            echo "NAO <\br>";
        }  */ 
    } 
    else 
    {
        echo "Ainda nao é hora...";
    }
}


?>

