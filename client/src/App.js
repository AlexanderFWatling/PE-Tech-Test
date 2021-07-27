import React, { Component } from "react";
import logo from './logo.svg';
import './App.css';
import CelestialBodies from './CelestialBodies.js';

class App extends Component {
  state = {
    celestialBodyTable : null
  };

  render() {

    return (
    <div className="App">
    <CelestialBodies  />
    </div>
  );
  }
}
export default App;
