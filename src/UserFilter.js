import React, { Component } from 'react';
import utils from './utils.js';

const CreateOption = ({value}, {key}) =>  {
    return <option key={key} value={value}>{value}</option>
}

class UserFilter extends Component {
    constructor(props) {
        super(props);
        this.state={
            directions: [],
            destinations: [],
            lines: [],
            stations: [],
            valueDest: "Select a destination",
            valueLine: "Select a line",
            valueDir: "Select a direction",
            valueStat: "Select a station"
        };
    }

    componentWillMount() {
        utils.getMartaData((response) => {
            var resp = utils.pushInfo(response);
            this.setState({
                directions: resp[1],
                destinations: resp[0],
                lines: resp[2],
                stations: resp[3]

            });
        });
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
        var directions;
        var destinations;
        var lines;
        var stations;
        
        directions = (this.state.directions).map((direction, idx) => (
            <CreateOption
                value={direction}
                key={idx}
                />
            ));
        destinations = (this.state.destinations).map((destination, idx) => (
            <CreateOption
                value={destination}
                key={idx}
                />
            ));
        lines = (this.state.lines).map((line, idx) => (
            <CreateOption
                value={line}
                key={idx}
                />
            ));
        stations = (this.state.stations).map((station, idx) => (
            <CreateOption
                value={utils.formatStation(station)}
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
                        <option key="default" value="Select a station">Select a station</option>
                        {stations}
                    </select>
                </form>
            );
        }
    
}

export default UserFilter;