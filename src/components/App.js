import React from 'react';
import Display from './Display';
import ButtonPanel from './ButtonPanel';
import calculate from '../logic/calculate'
import talkPolly from '../logic/polly'
import { onBtn, offBtn, onIcon, offIcon } from '../logic/helper'


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: null,
      next: null,
      operation: null,
      ondisplay: null,
      speech: false,
      lang: 'en'
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleKey = this.handleKey.bind(this);
    this.toggleSpeech = this.toggleSpeech.bind(this);
  }

  handleClick(buttonName) {

    if (buttonName === 'Speech') {
      this.toggleSpeech();
      return
    }
    const currentResult = calculate(this.state, buttonName);
    this.setState(currentResult);
    talkPolly(this.state.total || '');
  }

  handleKey(e) {
    let keyName = e.key;

    if (e.key === '/') { keyName = '÷' };
    if (e.key === 'Backspace') { keyName = 'AC' };
    if (e.key === 'Enter') { keyName = '=' };
    if (e.key === '_') { keyName = '+/-' }
    const currentResult = calculate(this.state, keyName);
    this.setState(currentResult);
    talkPolly(this.state.total || '');
  }

  toggleSpeech() {
    if (!this.state.speech) {
      talkPolly('Speech enabled.');
      this.setState(state => ({ speech: !state.speech }));
      onBtn('Speech')
      onIcon('speechico')
      //show little icon on speach top left of screen
      //show little icon on English language per default
    } else {
      talkPolly('Speech disabled.');
      this.setState(state => ({ speech: !state.speech }));
      offBtn('Speech')
      offIcon('speechico')
      //hide little icon on speach top left of screen
    }
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
        <audio id="polly">
          <source src="" className="track" type="audio/mpeg" />
        </audio>
        <Display result={resultToRender} />
        <ButtonPanel clickHandler={this.handleClick} />
      </div>
    );
  }
}

export default App;
