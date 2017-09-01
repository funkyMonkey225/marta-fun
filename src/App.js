import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MartaDashboard from "./MartaDashboard.js";
import UserFilter from "./UserFilter.js";

class App extends Component {
    constructor(props) {
    super(props);
    this.state = {
      filterDest: null,
      filterDir: null,
      filterStat: null,
      filterLine: null
    };
}

    _handleDestInput = (dest) => {
        this.setState({
            filterDest: dest
        })
    }

    _handleDirInput = (dir) => {
        this.setState({
            filterDir: dir
        })
    }

    _handleLineInput = (line) => {
        this.setState({
            filterLine: line
        })
    }

    _handleStatInput = (stat) => {
        this.setState({
            filterStat: stat
        })
    }
    render() {
    return (
      <div className="App">
          <h1>Welcome to Martaaaaah</h1>
          <p>Please select your preferences to filter the information</p>
          <UserFilter 
            destHandler={this._handleDestInput}
            dirHandler={this._handleDirInput}
            statHandler={this._handleStatInput}
            lineHandler={this._handleLineInput}
          />
          <MartaDashboard 
            filterDest={this.state.filterDest}
            filterDir={this.state.filterDir}
            filterStat={this.state.filterStat}
            filterLine={this.state.filterLine}
          />
      </div>
    );
  }
}

export default App;
