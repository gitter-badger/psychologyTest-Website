<?php

error_reporting(E_ALL);

//include 'db.php';
//$query = "INSERT INTO results(";
//
//foreach ($_POST as $key => $val) {
//    $query .= $key . ",";
//}
//$query = rtrim(trim($query),",");
//
//$query .= ") VALUES (";
//
//foreach ($_POST as $key => $val) {
//    $query .= $val . ",";
//}
//$query = rtrim(trim($query),",");
//
//$query .= ")";
//
//
//var_dump($query);
//
//if ($mysqli->query($query)) {
//    echo "success";
//}
//else {
//    echo "error" . $mysqli->error;
//}
//
//$mysqli->close();

require_once('db.php');

$db = new MysqliDb ('localhost', 'root', '', 'psychology');

$id = $db->insert ('results', $_POST);
if ($id)
    echo 'user was created. Id=' . $id;
else
    echo 'insert failed: ' . $db->getLastError();