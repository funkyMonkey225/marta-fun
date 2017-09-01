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
            valueDest: "Select a destination",
            valueLine: "Select a line",
            valueDir: "Select a direction",
            valueStat: "Select a station", 
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

    _handleDestInput = (event) => {
        this.props.destHandler(event.target.value);
        this.setState({
            valueDest: event.target.value
        })
    }

    _handleDirInput = (event) => {
        this.props.dirHandler(event.target.value);
        this.setState({
            valueDir: event.target.value
        })
    }

    _handleLineInput = (event) => {
        this.props.lineHandler(event.target.value);
        this.setState({
            valueLine: event.target.value
        })
    }

    _handleStatInput = (event) => {
        this.props.statHandler(event.target.value);
        this.setState({
            valueStat: event.target.value
        })
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
                    <select value={this.state.valueDir} onChange={this._handleDirInput}>
                        <option key="default" value="Select a direction">Select a direction</option>
                        {directions}
                    </select>
                    <select value={this.state.valueDest} onChange={this._handleDestInput}>
                        <option key="default" value="Select a destination">Select a destination</option>
                        {destinations}
                    </select>
                    <select value={this.state.valueLine} onChange={this._handleLineInput}>
                        <option key="default" value="Select a line">Select a line</option>
                        {lines}
                    </select>
                    <select value={this.state.valueStat} onChange={this._handleStatInput}>
                        <option key="default" value="Select a stationx">Select a station</option>
                        {stations}
                    </select>
                </form>
            );
        }
}

export default UserFilter;