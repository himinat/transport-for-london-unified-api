//my developers app_id and app_key from Tfl
var app_id = 'fc22d013';
var app_key = 'adc37e0f8602f1f44235ecbb5b24176e';


var StopPointSearch = function () {
    var query = $('#name-of-stop-point').val();
    var url = 'https://api.tfl.gov.uk/StopPoint/Search/'+ query + '?faresOnly=False&&' + app_id + '&' + app_key;

    $.getJSON(url).done(function (data) {
        var listOfStopPoints = data;
        GetStopPointsById(listOfStopPoints);
    });
};

var GetStopPointsById = function (listOfStopPoints) {
    $('#table-of-stop-points').empty()
        .append('<th>StopPoints name</th><th>Modes</th><th>Lines name</th><th>Route Section Name</th>');
    for (var i = 0; i < listOfStopPoints.matches.length; i++) {
        $('#table-of-stop-points').append('<tr><td>' + listOfStopPoints.matches[i].name + '</td><td id="col-of-station-mode_' + i + '"></td><td id="col-of-station-lines_' + i + '"></td><td id="col-of-route-name_' + i + '"></td>');
        for (var j = 0; j < listOfStopPoints.matches[i].modes.length; j++)
            $('#col-of-station-mode_' + i).append(listOfStopPoints.matches[i].modes[j] + '<br>');
        $('#table-of-stop-points').append('</tr>');

        var stopPointId = listOfStopPoints.matches[i].id;
        loadLines(i, stopPointId);
    }
};

function loadLines(i, stopPointId) {
    var url = 'https://api.tfl.gov.uk/StopPoint/' + stopPointId + '/Route?' + app_id + '&' + app_key;
    $.getJSON(url).done(function (data) {
        for (var j = 0; j < data.length; j++) {
            $('#col-of-station-lines_' + i).append(data[j].lineId + '<br>');
            $('#col-of-route-name_' + i).append(data[j].routeSectionName + '<br>');
        }
    });
}