import React from 'react';
import Display from './Display';
import ButtonPanel from './ButtonPanel';
// eslint-disable-next-line
import calculate from '../logic/calculate'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      total: null,
      next: null,
      operation: null
    }

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(buttonName) {
    this.setState(calculate(this.state, buttonName));
  }

  render() {
    return (
      <div id="app-container">
        <Display result={this.operation ? this.next : this.total} />
        <ButtonPanel clickHandler={this.handleClick} />
      </div>
    )
  }

}


export default App;
