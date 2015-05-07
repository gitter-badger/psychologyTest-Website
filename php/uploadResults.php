<?php
include 'db.php';
$query = "INSERT INTO results(";

foreach ($_POST as $key => $val) {
    $query .= $key . ",";
}
$query = rtrim(trim($query),",");

$query .= ") VALUES (";

foreach ($_POST as $key => $val) {
    $query .= $val . ",";
}
$query = rtrim(trim($query),",");

$query .= ")";


var_dump($query);

if ($mysqli->query($query)) {
    echo "success";
}
else {
    echo "error" . $mysqli->error;
}

$mysqli->close();