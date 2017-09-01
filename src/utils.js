import React from 'react';


const getMartaData = (cb) => {
    fetch('http://developer.itsmarta.com/RealtimeTrain/RestServiceNextTrain/GetRealtimeArrivals?apikey=2c514350-0c26-47dd-b872-7936af81c8e1', {
	method: 'get',
    }).then(function(response) {
        return response.json()
    }).then(function(resp) {
        cb(resp);
    })
    .catch(function(err) {
        // Error :(
    });
}

const formatTime = (time) => {
    time = Number(time);
    time= Math.abs(time);
    if (time/60 >= 1) {
        var minutes = Math.round(time / 60);
        var seconds = time % 60;
        minutes = minutes.toString();
        seconds = seconds.toString();
        if (minutes === "1") {
            time = `${minutes} minute`;
        } else {
            time = `${minutes} minutes`;
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
    return [destinations, directions, lines, stations]
}

export default {
    pushInfo,
    getMartaData,
    formatTime,
}