import React, { Component } from 'react';
import Doc_navbar from './Components/Doc_navbar';
import Main from './Components/Doc_main'
export class App extends Component {
  render() {
    return (
      <div>
           <Doc_navbar/>
           <Main/>
      </div>
    )
  }
}

export default App
