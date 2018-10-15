import React, { Component } from 'react';
import logo from 'logo.svg';
import './App.css';
import { TimerPage } from 'layouts/timer/Page';



class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Laktimer</h1>
        </header>
        <main>
          <TimerPage />
        </main>
      </div>
    );
  }
}

export default App;
