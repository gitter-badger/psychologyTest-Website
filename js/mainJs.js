$(document).ready(function() {

    $('#forwardToScenario').on('click', function(e) {

        e.preventDefault();

        var validated = true;

        var checkGender = $('input[name="gender"]:checked');
        if (checkGender.val() == 'male' || checkGender.val() == 'female') {
            if(checkGender.val() == 'female') {
                localStorage.setItem('gender', 0);
            }
            else {
                localStorage.setItem('gender', 1);
            }

        } else {
            validated = false;
        }

        var age = $('input[name="age"]');

        if (parseInt(age.val()) >= 18 && parseInt(age.val()) <= 70) {
            age.css("border-color", "green");
            localStorage.setItem('age', age.val());
        } else {
            age.css("border-color", "red");
            validated = false;
        }

        console.log(validated);

        if (validated) {
            window.location.href = $(this).attr('href');
        }



    });

    $('#forwardFirst').on('click', function(e) {
        e.preventDefault();

        var validateScenario = true;

        var questionsSelectors = [
            $('.questions input[name="scenarioQuestionOne"]'),
            $('.questions input[name="scenarioQuestionTwo"]'),
            $('.questions input[name="scenarioQuestionThree"]'),
            $('.questions input[name="scenarioQuestionFour"]'),
            $('.questions input[name="scenarioQuestionFive"]'),
            $('.questions input[name="scenarioQuestionSix"]'),
            $('.questions input[name="scenarioQuestionSeven"]')
        ];

        $.each(questionsSelectors, function(index, question) {
            var currentInput = parseInt(question.val());
            if(currentInput >= 0 && currentInput <= 100){
                localStorage.setItem(question.attr('name'), parseInt(currentInput));
                question.css("border-color", "green");
            } else {
                validateScenario = false;
                question.css("border-color", "red");
                return false;
            }

        });

        if (validateScenario) {
            window.location.href = $(this).attr('href');
        }

    });

    $('#forwardToExit').on('click', function(e) {

        e.preventDefault();
        var anchorHref = $(this).attr('href');

        var validateStatemants = true;

        var blameQuestions = [
            $('input[name="blameQuestionOne"]:checked'),
            $('input[name="blameQuestionTwo"]:checked'),
            $('input[name="blameQuestionThree"]:checked'),
            $('input[name="blameQuestionFour"]:checked'),
            $('input[name="blameQuestionFive"]:checked'),
            $('input[name="blameQuestionSix"]:checked')
        ];

        $.each(blameQuestions, function(index, question) {

            if(question.length == 0){
                validateStatemants = false;
                return false;
            }

            var currentQuestion = parseInt(question.val());

            if(currentQuestion < 1 || currentQuestion > 6){
                validateStatemants = false;
                return false;
            }
            else {
                localStorage.setItem(question.attr('name'), parseInt(currentQuestion));
            }
        });

        if (validateStatemants) {
            uploadResult(function() {
                window.location.href = anchorHref;
            });
        }

    });

    $('.blameQuestions input').on('click', function(e) {
        $('input[name="' + $(this).attr('name') + '"]').parent().css('background-color', 'white');
        $(this).parent().css( "background-color", "green" );
    });

    var uploadResult = function(callback) {
        var result = {
            gender: localStorage.getItem('gender'),
            age: localStorage.getItem('age'),
            scenarioQuestionOne: localStorage.getItem('scenarioQuestionOne'),
            scenarioQuestionTwo: localStorage.getItem('scenarioQuestionTwo'),
            scenarioQuestionThree: localStorage.getItem('scenarioQuestionThree'),
            scenarioQuestionFour: localStorage.getItem('scenarioQuestionFour'),
            scenarioQuestionFive: localStorage.getItem('scenarioQuestionFive'),
            scenarioQuestionSix: localStorage.getItem('scenarioQuestionSix'),
            scenarioQuestionSeven: localStorage.getItem('scenarioQuestionSeven'),
            blameQuestionOne: localStorage.getItem('blameQuestionOne'),
            blameQuestionTwo: localStorage.getItem('blameQuestionTwo'),
            blameQuestionThree: localStorage.getItem('blameQuestionThree'),
            blameQuestionFour: localStorage.getItem('blameQuestionFour'),
            blameQuestionFive: localStorage.getItem('blameQuestionFive'),
            blameQuestionSix: localStorage.getItem('blameQuestionSix')
        };

        $.ajax({
            type: 'POST',
            url: 'http://localhost/psychologyTest-Website/php/uploadResults.php',
            data: result
        })
        .done(function() {
            callback();
        })
        .fail(function(error) {
            alert(error);
        })
        .always(function() {
            $.each(result, function(key, val) {
                localStorage.removeItem(key);
            });
        });
    };

});
