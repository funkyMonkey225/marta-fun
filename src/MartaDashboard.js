import React, { Component } from 'react';

const getMartaData = (cb) => {
    fetch('http://developer.itsmarta.com/RealtimeTrain/RestServiceNextTrain/GetRealtimeArrivals?apikey=2c514350-0c26-47dd-b872-7936af81c8e1', {
	method: 'get'
}).then(function(response) {
	return response.json()
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
        let martaOutput = this.state.martaData.map((datum) => <p>{datum}</p>)
        return (
            <div>
                <h2>Martaaaah</h2>
                <div>
                    {martaOutput}
                </div>
            </div>
        )
    }
}

export default MartaDashboard;