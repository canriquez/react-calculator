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
    this.handleKey = this.handleKey.bind(this);
  }

  handleClick(buttonName) {
    const currentResult = calculate(this.state, buttonName);
    this.setState(currentResult);
  }

  handleKey(e) {
    let keyName = e.key;

    if (e.key === '/') { keyName = '÷' };
    if (e.key === 'Backspace') { keyName = 'AC' };
    if (e.key === 'Enter') { keyName = '=' };
    if (e.key === '_') { keyName = '+/-' }
    const currentResult = calculate(this.state, keyName);
    this.setState(currentResult);
  }

  componentDidMount() {
    document.body.addEventListener('keydown', this.handleKey);
  }

  render() {
    const { total, next, operation } = this.state;
    let resultToRender = '';
    if (operation && !next) { resultToRender = total; }
    if (operation && next) { resultToRender = next; }
    if (!operation) { resultToRender = total; }

    return (
      <div id="app-container">
        <Display result={resultToRender} />
        <ButtonPanel clickHandler={this.handleClick} />
      </div>
    );
  }
}

export default App;
