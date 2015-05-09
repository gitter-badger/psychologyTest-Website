<?php
/**
 * Created by PhpStorm.
 * User: Gramadnikov-PC
 * Date: 5/9/2015
 * Time: 05:27 PM
 */

class ParamsValidator {

    private $otherFields = [
        'gender',
        'age',
        'scenarioId'
    ];

    private $scenarioQuestions = [
        'scenarioQuestionOne',
        'scenarioQuestionTwo',
        'scenarioQuestionThree',
        'scenarioQuestionFour',
        'scenarioQuestionFive',
        'scenarioQuestionSix',
        'scenarioQuestionSeven'
    ];

    private $blameQuestions = [
        'blameQuestionOne',
        'blameQuestionTwo',
        'blameQuestionThree',
        'blameQuestionFour',
        'blameQuestionFive',
        'blameQuestionSix'
    ];

    private $expectedFieldNames = [];

    private $validationFunctionNames = [
        'checkFieldsPresence',
        'checkFieldsNumericality',
        'checkGenderAndScenarioId',
        'checkAge',
        'checkScenarioQuestions',
        'checkBlameQuestions',
        'checkForEmptyFields'
    ];

    private $data = [];

    function __construct() {
        $this->expectedFieldNames = array_merge($this->otherFields, $this->scenarioQuestions, $this->blameQuestions);
    }

    function validate($data) {
        $this->data = $data;

        $validated = true;

        foreach ($this->validationFunctionNames as $function) {
            if (!$this->$function()) {
                $validated = false;
                break;
            }
        }

        return $validated;
    }

    private function checkFieldsPresence() {
        if (count(array_intersect_key(array_flip($this->expectedFieldNames), $this->data)) === count($this->expectedFieldNames)) {
            return true;
        }

        return false;
    }

    private function checkForEmptyFields() {
        $validated = true;

        foreach ($this->data as $key => $value) {
            if ($value == '') {
                $validated = false;
                break;
            }
        }

        return $validated;
    }

    private function checkFieldsNumericality() {
        $validated = true;

        foreach ($this->data as $key => $value) {
            if (!is_numeric($value)) {
                $validated = false;
                break;
            }
        }

        return $validated;
    }

    private function checkGenderAndScenarioId() {
        if (($this->data['gender'] == 0 || $this->data['gender'] == 1) && ($this->data['scenarioId'] == 0 || $this->data['scenarioId'] == 1)) {
            return true;
        }

        return false;
    }

    private function checkAge() {
        if ($this->data['age'] >= 18 && $this->data['age'] <= 70) {
            return true;
        }

        return false;
    }

    private function checkScenarioQuestions() {
        $validated = true;

        foreach ($this->scenarioQuestions as $key => $value) {
            if (!($this->data[$value] >= 0 && $this->data[$value] <= 100)) {
                $validated = false;
                break;
            }
        }

        return $validated;
    }

    private function checkBlameQuestions() {
        $validated = true;

        foreach ($this->blameQuestions as $key => $value) {
            if (!($this->data[$value] >= 1 && $this->data[$value] <= 6)) {
                $validated = false;
                break;
            }
        }

        return $validated;
    }

    public function validateGender($data) {
        if ($data['gender'] == 0 || $data['gender'] == 1) {
            return true;
        }

        return false;
    }
}