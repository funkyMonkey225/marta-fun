import React, { Component } from 'react';

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

const getMartaData = (cb) => {
    fetch('http://developer.itsmarta.com/RealtimeTrain/RestServiceNextTrain/GetRealtimeArrivals?apikey=2c514350-0c26-47dd-b872-7936af81c8e1', {
	method: 'get'
}).then(function(response) {
	return response.json()
}).then(function(resp) {
        cb(resp);
}).catch(function(err) {
	// Error :(
});
}


class MartaDashboard extends Component {
    constructor(props) {
        super(props);
        this.state={
            martaData: []
        };
    }
    
    componentWillMount() {
        this.martaDataGrabber = setInterval(() => {
            getMartaData((jsonData) => {
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
                        <td>{formatTime(datum.WAITING_SECONDS)}</td>
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