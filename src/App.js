import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import {CityWeather} from "./components/cityweather";

class App extends Component {
  render() {
    return (
      <div className="App">
        <CityWeather/>
      </div>
    );
  }
}

/*

*/
export default App;
