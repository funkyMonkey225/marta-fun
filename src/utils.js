import axios from 'axios';
const MARTA_URL='http://developer.itsmarta.com/RealtimeTrain/RestServiceNextTrain/GetRealtimeArrivals?apikey=2c514350-0c26-47dd-b872-7936af81c8e1'

const getMartaData = (cb) => {
    axios.get(MARTA_URL)
        .then(function(response) {
            return response.data;
        }).then(function(resp) {
            cb(resp);
        }).catch(function(err) {
            // Error :(
        });
    // fetch('http://developer.itsmarta.com/RealtimeTrain/RestServiceNextTrain/GetRealtimeArrivals?apikey=2c514350-0c26-47dd-b872-7936af81c8e1', {
	// method: 'get',
    // }).then(function(response) {
    //     return response.json()
    // }).then(function(resp) {
    //     cb(resp);
    // })
    // .catch(function(err) {
    //     // Error :(
    // });
}

const titleCase = (str) => {
 var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    return splitStr.join(' '); 
}

const formatStation = (station) => {
    station = station.slice(0, -8);
    station = titleCase(station);
    return station;
}

const formatTime = (time) => {
    time = Number(time);
    if (time <= 0) {
        time = "Boarding"
    } else if (time/60 >= 1) {
        var minutes = Math.round(time / 60);
        var seconds = time % 60;
        minutes = minutes.toString();
        seconds = seconds.toString();
        if (minutes === "1") {
            time = `${minutes} minute and ${seconds} seconds`;
        } else {
            time = `${minutes} minutes ${seconds} seconds`;
        }

    } else {
        time = `${time} seconds`;
    }
    return time;
}

const pushInfo = (jsonData) => {
    console.log(jsonData);
    var destinations = [];
    var directions = [];
    var lines = [];
    var stations = [];
    jsonData.forEach((destination) => {
        if (destinations.indexOf(destination.DESTINATION) === -1 && destination.DESTINATION !== "") {
            destinations.push(destination.DESTINATION);
        }
        if (directions.indexOf(destination.DIRECTION) === -1) {
            directions.push(destination.DIRECTION);
        }
        if (lines.indexOf(destination.LINE) === -1) {
            lines.push(destination.LINE);
        }
        if (stations.indexOf(destination.STATION) === -1) {
            stations.push(destination.STATION);
        }
    })
    destinations = destinations.sort();
    directions = directions.sort();
    lines = lines.sort();
    stations = stations.sort();
    return [destinations, directions, lines, stations]
}

export default {
    pushInfo,
    getMartaData,
    formatTime,
    formatStation,
}