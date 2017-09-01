import React, { Component } from 'react';
import utils from './utils.js';

class MartaDashboard extends Component {
    constructor(props) {
        super(props);
        this.state={
            martaData: []
        };
    }
    
    componentWillMount() {
        this.martaDataGrabber = setInterval(() => {
            utils.getMartaData((jsonData) => {
                this.setState({
                    martaData: jsonData
                });
            });
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.martaDataGrabber);
    }

    render() {
        let martaOutput = this.state.martaData
        if (this.props.filterDest !== "Select a destination") {
            martaOutput = martaOutput.filter((datum) => (
                datum.DESTINATION === this.props.filterDest
            ))
        }
        if (this.props.filterDir !== "Select a direction") {
            martaOutput = martaOutput.filter((datum) => (
                datum.DIRECTION === this.props.filterDir
            ))
        }

        if (this.props.filterLine !== "Select a line") {
            martaOutput = martaOutput.filter((datum) => (
                datum.LINE === this.props.filterLine
            ))
        }

        if (this.props.filterStat !== "Select a station") {
            martaOutput = martaOutput.filter((datum) => (
                datum.STATION === this.props.filterStat
            ))
        }
        if (martaOutput.length !== 0) {
            martaOutput = martaOutput.map((datum, idx) => (
                    <tr key={idx}>
                        <td>{datum.DIRECTION}</td> 
                        <td>{datum.DESTINATION}</td> 
                        <td>{datum.LINE}</td> 
                        <td>{datum.STATION}</td> 
                        <td>{utils.formatTime(datum.WAITING_SECONDS)}</td>
                    </tr>
            ))
        } else {
            martaOutput = <tr><td colSpan="5">No trains found for the selected direction, destination, line, and station. Please select again.</td></tr>
        }

        return (
            <table className="marta-dashboard">
                <thead>
                    <tr>
                        <th>Direction</th>
                        <th>Destination</th>
                        <th>Line</th>
                        <th>Station</th>
                        <th>Next Arrival</th>
                    </tr>
                </thead>
                <tbody>{martaOutput}</tbody>
            </table>
        )
    }
}

export default MartaDashboard;