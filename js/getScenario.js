$(document).ready(function() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost/psychologyTest-Website/php/getScenario.php',
        data: {
            gender: localStorage.getItem('gender')
        }
    })
        .done(function(data) {
            var data = JSON.parse(data);

            if (data.scenarioId == 0) {
                $('#scenarioZero').show();
                $('#scenarioOne').html('');
            } else {
                $('#scenarioOne').show();
                $('#scenarioZero').html('');
            }
            localStorage.setItem('scenarioId', data.scenarioId);
        })
        .fail(function(error) {
            console.log(error);
        });
});