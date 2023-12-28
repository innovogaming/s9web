<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link rel="stylesheet" href="estilos.css">
</head>
<body>

<?php

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
{
    // Se 'variavel' estiver definida, mostre o formulário de login
    ?>
    <div class="container">
        <form id="validatebet" style="display: block;">
            <label for="login">Login:</label><br>
            <input type="text" id="login" name="login" required><br>
            <label for="senha">Senha:</label><br>
            <input type="password" id="senha" name="senha" required><br><br>
            <button type="submit">Crear</button>
        </form>

        <div id="dadosUsuario" style="display: none;">
            <p>Premio: <span id="premio"></span></p>
            <p>Tienda: <span id="tienda"></span></p>
            <p>Nombre: <span id="nombre"></span></p>
            <p>RUT: <span id="rut"></span></p>
            <p>Date: <span id="date"></span></p>
        </div>
    </div>
    <?php
} 
else 
{
    // Se 'variavel' não estiver definida, mostre uma mensagem de erro
    echo "<p>Erro: A variável não foi definida na URL.</p>";
}
?>

<script>

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('validatebet').addEventListener('submit', function(event) {
        event.preventDefault();

        var login = document.getElementById('login').value;
        var senha = document.getElementById('senha').value;

        if (login === "" || senha === "")
        {
            console.log("ERRO");
            alert("El inicio de sesión y la contraseña no coinciden. Inténtalo de nuevo. 1");

        }
        else
        {
            loginSistema(login, senha);
        }
    });
});

function getQueryParam(param) {
    var urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

function formatarData(dataString) {
    var data = new Date(dataString);
    var dia = data.getDate().toString().padStart(2, '0');
    var mes = (data.getMonth() + 1).toString().padStart(2, '0'); // Janeiro é 0!
    var ano = data.getFullYear();
    var horas = data.getHours().toString().padStart(2, '0');
    var minutos = data.getMinutes().toString().padStart(2, '0');

    return dia + '/' + mes + '/' + ano + ' ' + horas + ':' + minutos;
}

function loginSistema(login, senha) 
{
    
    var token = getQueryParam('token');
    //console.log(token);
    //console.log("login: ", login, "Senha: ", senha, "token:", token );

    //return;
    fetch('validatelogin.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ login: login, token: token, senha: senha })
    })
    .then(response => response.json())
    .then(data => 
    {
        //console.log("response: " + data.user);
        if(data.user) 
        {
            /*console.log("premio: " + data.user.premio);
            console.log("tienda: " + data.user.tienda);
            console.log("nombre: " + data.user.nombre);
            console.log("apellido: " + data.user.apellido);
            console.log("rut: " + data.user.rut);
            console.log("date: " + data.user.date);*/

            document.getElementById('premio').textContent = data.user.premio;
            document.getElementById('tienda').textContent = data.user.tienda;
            document.getElementById('nombre').textContent = data.user.nombre + " " + data.user.apellido;
            //document.getElementById('apellido').textContent = data.user.apellido;
            document.getElementById('rut').textContent = data.user.rut; 
            document.getElementById('date').textContent = formatarData(data.user.date);

            document.getElementById('dadosUsuario').style.display = 'block';
            document.getElementById('validatebet').style.display = 'none';
            
        } 
        else 
        {
            alert('El inicio de sesión y la contraseña no coinciden. Inténtalo de nuevo. 2');
        }
    })
    .catch(error => 
    {
        //console.error('Erro ao atualizar a senha:', error);
        alert('Se produjo un error al iniciar sesión en el sistema.');
    });
}
</script>
</body>
</html>

<?php



?>

