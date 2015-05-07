$(document).ready(function() {

    $('#forwardFirst').on('click', function(e) {
        e.preventDefault();
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
           console.log(question.val());
        });

    });

});
