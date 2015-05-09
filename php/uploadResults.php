<?php

error_reporting(E_ALL);

require_once('db.php');
require_once('ParamsValidator.php');

$db = new MysqliDb ('localhost', 'root', '', 'psychology');
$paramsValidator = new ParamsValidator();

//$id = $db->insert ('results', $_POST);

//if ($id)
//    echo 'user was created. Id=' . $id;
//else
//    echo 'insert failed: ' . $db->getLastError();

$data = $_POST;

var_dump($paramsValidator->validate($data));