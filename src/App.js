import React, { Component } from 'react';

import './App.css';

class App extends Component {
  state = {
    auth: false
  }
  componentWillMount() {
  }
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default App;
