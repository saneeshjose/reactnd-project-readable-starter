import React, { Component } from 'react';
import Categories from './Categories';
import Posts from './Posts';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">

        <div className="App-header">
          <div className="App-logo">
          </div>
          <div className="App-title">Readable Project</div>
        </div>

        <div>
          <div className="left-nav"><Categories/></div>
          <div className="center-frame">
            <Posts/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
