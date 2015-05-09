<?php

error_reporting(E_ERROR | E_PARSE);

require_once('db.php');
require_once('ParamsValidator.php');

$db = new MysqliDb ('localhost', 'root', '', 'psychology');
$paramsValidator = new ParamsValidator();
$data = $_GET;

function getCurrentScenarioId($lastScenarioId) {
    return ($lastScenarioId == 0) ? 1 : 0;
}

if ($paramsValidator->validateGender($data)) {
    $lastGivenScenario = $db->orderBy('timestamp', 'desc')
        ->where('gender', $data['gender'])
        ->get('results');

    if (count($lastGivenScenario) == 0) {
        $currentScenarioId = 0;
    } else {
        $currentScenarioId = getCurrentScenarioId($lastGivenScenario[0]['scenarioId']);
    }

    echo json_encode(['scenarioId' => $currentScenarioId]);
} else {
    http_response_code(500);
}


