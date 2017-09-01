import React, { Component } from 'react';


const getMartaDataz = (cb) => {
    fetch('http://developer.itsmarta.com/RealtimeTrain/RestServiceNextTrain/GetRealtimeArrivals?apikey=2c514350-0c26-47dd-b872-7936af81c8e1', {
	method: 'get',
    }).then(function(response) {
        return response.json()
    }).then(pushInfo)
    .then(function(resp) {
        cb(resp);
    })
    .catch(function(err) {
        // Error :(
    });
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

const CreateOption = ({value}, {key}) =>  {
    return <option key={key} value={value}>{value}</option>
}

class UserFilter extends Component {
    constructor(props) {
        super(props);
        this.state={
            valueDest: "Choose a destination",
            valueLine: "Choose a line",
            valueDir: "Choose a direction",
            valueStat: "Choose a station", 
            destinations: [],
            directions: [],
            lines: [],
            stations: []
        };
    }

    componentWillMount() {
        getMartaDataz((resp) => {
            this.setState({
                destinations: resp[0],
                directions: resp[1],
                lines: resp[2],
                stations: resp[3]
            });
        })
    }

    _handleInput = (event) => {
        console.log(event.target.value);
    }

    render() {
        var directions = this.state.directions.map((direction, idx) => (
            <CreateOption
                value={direction}
                key={idx}
                />
            ));
        var destinations = this.state.destinations.map((destination, idx) => (
            <CreateOption
                value={destination}
                key={idx}
                />
            ));
        var lines = this.state.lines.map((line, idx) => (
            <CreateOption
                value={line}
                key={idx}
                />
            ));
         var stations = this.state.stations.map((station, idx) => (
            <CreateOption
                value={station}
                key={idx}
                />
            ));

            return ( 
                <form>
                    <select value={this.state.valueDir} onChange={this._handleInput}>
                        <option key="default" value={this.state.valueDir}>{this.state.valueDir}</option>
                        {directions}
                    </select>
                    <select value={this.state.valueDest} onChange={this._handleInput}>
                        <option key="default" value={this.state.valueDest}>{this.state.valueDest}</option>
                        {destinations}
                    </select>
                    <select value={this.state.valueLine} onChange={this._handleInput}>
                        <option key="default" value={this.state.valueLine}>{this.state.valueLine}</option>
                        {lines}
                    </select>
                    <select value={this.state.valueStat} onChange={this._handleInput}>
                        <option key="default" value={this.state.valueStat}>{this.state.valueStat}</option>
                        {stations}
                    </select>
                </form>
            );
        }
}

export default UserFilter;