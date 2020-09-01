import React from 'react';
import Display from './Display';
import ButtonPanel from './ButtonPanel';
// eslint-disable-next-line
import calculate from '../logic/calculate'
/* 
const App = () => (

  <div id="app-container">
    <Display />
    <ButtonPanel />
  </div>
); */

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      total: null,
      next: null,
      operation: null
    }
  }

  render() {
    return (
      <div id="app-container">
        <Display />
        <ButtonPanel />
      </div>
    )
  }

}


export default App;
