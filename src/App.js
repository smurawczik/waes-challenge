import React, { Component } from 'react';

import Highlight from './components/Highlight';

import './styles/index.scss';

class App extends Component {
  render() {
    return (
      <div className="app">
      	<Highlight />
      </div>
    );
  }
}

export default App;
