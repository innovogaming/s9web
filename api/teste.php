<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$data = [
    'nome' => 'João',
    'idade' => 30,
    'profissao' => 'Engenheiro'
];

echo json_encode($data);
?>