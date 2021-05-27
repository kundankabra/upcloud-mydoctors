import React, { Component } from 'react';
import Doc_Parent from './Components/Doc_Parent';
import Header from './Components/TrendingIssues/Header';
export class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        <Doc_Parent/>
      </div>
    );
  }
}

export default App
