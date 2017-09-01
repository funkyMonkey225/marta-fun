import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MartaDashboard from "./MartaDashboard.js";
import UserFilter from "./UserFilter.js";

class App extends Component {
  render() {
    return (
      <div className="App">
          <UserFilter />
          {/*<MartaDashboard />*/}
      </div>
    );
  }
}

export default App;
