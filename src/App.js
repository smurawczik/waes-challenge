import React, { Component } from 'react';

import Header from './components/Header';
import Highlight from './components/Highlight';
import FilterHighlights from './components/FilterHighlights';

import './styles/index.scss';

class App extends Component {
  render() {
    return (
      <div className="app">
      	<Header />
      	<Highlight />
      	<FilterHighlights />
      </div>
    );
  }
}

export default App;
