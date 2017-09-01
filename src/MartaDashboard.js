import React, { Component } from 'react';

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
        // this.martaDataGrabber = setInterval(() => {
        getMartaData((jsonData) => {
            this.setState({
                martaData: jsonData
            });
        });
        // }, 10000)
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
        martaOutput = martaOutput.map((datum, idx) => (
                <div key={idx}>
                    <span>{datum.DIRECTION} {datum.DESTINATION} {datum.LINE} {datum.STATION} {datum.EVENT_TIME} {datum.NEXT_ARR}</span>
                </div>
        ))
        return (
            <div>
                {martaOutput}
            </div>
        )
    }
}

export default MartaDashboard;