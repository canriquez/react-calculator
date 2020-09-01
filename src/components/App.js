import React from 'react';
import Display from './Display';
import ButtonPanel from './ButtonPanel';
// eslint-disable-next-line
import calculate from '../logic/calculate'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: null,
      next: null,
      operation: null,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(buttonName) {
    console.log(`back in App, butonName is : ${buttonName}`);
    const currentResult = calculate(this.state, buttonName);
    this.setState(currentResult);
  }

  render() {
    console.log(this.state)
    const { total, next, operation } = this.state;
    let resultToRender = '';
    /*     if (operation) {
          if (!next) {
            resultToRender = total;
          } else {
            resultToRender = next;
          }
        } else {
          resultToRender = total;
        } */

    if (operation && !next) { resultToRender = total };
    if (operation && next) { resultToRender = next };
    if (!operation) { resultToRender = total };

    return (
      <div id="app-container">
        <Display result={resultToRender} />
        <ButtonPanel clickHandler={this.handleClick} />
      </div>
    );
  }
}

export default App;
