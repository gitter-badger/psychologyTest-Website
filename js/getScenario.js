$(document).ready(function() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost/psychologyTest-Website/php/getScenario.php',
        data: {
            gender: localStorage.getItem('gender')
        },
        dataType: 'json'
    })
    .done(function(data) {
        if (data.scenarioId == 0) {
            $('#scenarioZero').show();
            $('#scenarioOne').html('');
        } else {
            $('#scenarioOne').show();
            $('#scenarioZero').html('');
        }
        localStorage.setItem('scenarioId', data.scenarioId);
    })
    .fail(function(error, resp) {
        console.log(error);
        console.log(resp);
    });
});