import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import Categories from './Categories';
import Posts from './Posts';
import PostDetail from './PostDetail';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <div className="App-logo">
          </div>
          <div className="App-title">Readable</div>
        </div>
        <div>
          <div className="left-nav"><Categories/></div>
          <div className="center-frame">
              <Route exact path="/:category" component={Posts}/>
              <Route exact path="/postdetail/:id" component={PostDetail} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;