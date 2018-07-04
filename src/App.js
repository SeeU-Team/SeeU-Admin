import React, { Component } from 'react';
import logo from './logo.svg';
import 'typeface-roboto'
import './App.css';
import SimpleTables from './Menu.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to SeeU administration panel</h1>
        </header>
        <SimpleTables/>
      </div>
    );
  }
}

export default App;
