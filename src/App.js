import React, { Component } from 'react';

import Highlight from './components/Highlight';
import FilterHighlights from './components/FilterHighlights';

import './styles/index.scss';

class App extends Component {
  render() {
    return (
      <div className="app">
      	<Highlight />
      	<FilterHighlights />
      </div>
    );
  }
}

export default App;
