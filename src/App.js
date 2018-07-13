import React, { Component } from 'react';
import 'typeface-roboto'
import './App.css';
import SimpleTables from './design/Menu.js';
import RaisedButton from 'material-ui/RaisedButton';
import history from './route/History';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

class App extends Component {

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Welcome to SeeU administration panel</h1>
                    <MuiThemeProvider>
                        <RaisedButton label="Logout" secondary={true}  onClick={(event) => this.handleClick(event)}/>
                    </MuiThemeProvider>
                </header>
                <SimpleTables/>
            </div>
        );
    }

  handleClick(event){
      history.push("/logout");
  }
}

export default App;
