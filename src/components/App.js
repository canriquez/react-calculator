/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import Display from './Display';
import ButtonPanel from './ButtonPanel';
import calculate from '../logic/calculate';
import talkPolly from '../logic/polly';
import {
  onBtn, offBtn, onIcon, offIcon,
} from '../logic/helper';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: null,
      next: null,
      operation: null,
      ondisplay: null,
      speech: false,
      lang: 'Joanna',
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleKey = this.handleKey.bind(this);
    this.toggleSpeech = this.toggleSpeech.bind(this);
    this.toggleLanguage = this.toggleLanguage.bind(this);
    this.pttDisplay = this.pttDisplay.bind(this);
  }

  componentDidMount() {
    document.body.addEventListener('keydown', this.handleKey);
  }

  handleClick(buttonName) {
    // eslint-disable-next-line
    const {
      total, speech, lang,
    } = this.state;
    const speechBar = ['Speech', 'En', 'Sp', 'PTT'];

    if (buttonName === 'Speech') {
      this.toggleSpeech();
      return;
    }
    if ((buttonName === 'En' || buttonName === 'Sp') && speech) {
      this.toggleLanguage();
      return;
    } if (buttonName === 'En' || buttonName === 'Sp') {
      return;
    }

    if ((buttonName === 'PTT') && speech) {
      this.pttDisplay();
      return;
    } if (buttonName === 'PTT') {
      return;
    }

    const currentResult = calculate(this.state, buttonName);
    this.setState(currentResult);
    let ttSpeech = buttonName;
    if (speech && !speechBar.includes(buttonName)) {
      if (buttonName === '-' && lang === 'Joanna') { ttSpeech = 'minus'; }
      if (buttonName === 'x' && lang === 'Mia') { ttSpeech = 'multiplicado por'; }
      if (buttonName === '÷' && lang === 'Mia') { ttSpeech = 'dividido entre'; }
      if (buttonName === '-' && lang === 'Mia') { ttSpeech = 'menos'; }
      if (buttonName === 'x' && lang === 'Joanna') { ttSpeech = 'multiplied by'; }
      if (buttonName === '+/-' && lang === 'Joanna') { ttSpeech = 'negative'; }
      if (buttonName === '+/-' && lang === 'Mia') { ttSpeech = 'negativo'; }
      if (buttonName === '=') { ttSpeech = `= ${total || '0'}`; }
      talkPolly(this.state, ttSpeech);
    }
  }

  handleKey(e) {
    const {
      total, speech, lang,
    } = this.state;
    const allowedKeys = ['s', 'l', 'p', 'Enter', 'Backspace',
      '%', '/', '7', '8', '9', 'x', '4', '5', '6',
      '-', '_', '*', '1', '2', '3', '+', '0', '.', '='];
    if (!allowedKeys.includes(e.key)) { return; }
    e.stopPropagation();

    let keyName = e.key;
    if (e.key === 's') {
      this.toggleSpeech();
      return;
    }

    if ((keyName === 'l') && speech) {
      this.toggleLanguage();
      return;
    } if (keyName === 'l') {
      return;
    }

    if ((keyName === 'p') && speech) {
      this.pttDisplay();
      return;
    } if (keyName === 'p') {
      return;
    }

    if (e.key === '/') { keyName = '÷'; }
    if (e.key === 'x' || e.key === '*') { keyName = 'x'; }
    if (e.key === 'Backspace') { keyName = 'AC'; }
    if (e.key === 'Enter') { keyName = '='; }
    if (e.key === '_') { keyName = '+/-'; }
    const currentResult = calculate(this.state, keyName);
    this.setState(currentResult);
    if (speech /* && !speechBar.includes(keyName) */) {
      if (keyName === '-' && lang === 'Joanna') { keyName = 'minus'; }
      if (keyName === 'x' && lang === 'Mia') { keyName = 'multiplicado por'; }
      if (keyName === '÷' && lang === 'Mia') { keyName = 'dividido entre'; }
      if (keyName === 'x' && lang === 'Joanna') { keyName = 'multiplied by'; }
      if (keyName === '+/-' && lang === 'Joanna') { keyName = 'negative'; }
      if (keyName === '+/-' && lang === 'Mia') { keyName = 'negativo'; }
      if (keyName === 'Shift') { return; }
      if (keyName === '=' || keyName === 'Enter') { keyName = `= ${total || '0'}`; }

      talkPolly(this.state, keyName);
    }
  }

  toggleSpeech() {
    const { speech } = this.state;
    if (!speech) {
      talkPolly(this.state, 'Speech enabled.');
      this.setState(state => ({ speech: !state.speech }));
      onBtn('Speech');
      onIcon('speechico');
      onBtn('En');
      onIcon('en');
      // show little icon on speach top left of screen
      // show little icon on English language per default
    } else {
      talkPolly(this.state, 'Speech disabled.');
      this.setState(state => ({ speech: !state.speech }));
      offBtn('Speech');
      offIcon('speechico');
      offBtn('En');
      offBtn('Sp');
      offIcon('es');
      offIcon('en');
      // hide little icon on speach top left of screen
    }
  }

  toggleLanguage() {
    const { lang } = this.state;
    if (lang === 'Joanna') {
      this.setState({ lang: 'Mia' }, () => {
        talkPolly(this.state, 'espanol activado.');
      });
      onBtn('Sp');
      offBtn('En');
      onIcon('es');
      offIcon('en');
      // show little icon on speach top left of screen
      // show little icon on English language per default
    } else {
      this.setState({ lang: 'Joanna' }, () => {
        talkPolly(this.state, 'English activated.');
      });
      onBtn('En');
      offBtn('Sp');
      onIcon('en');
      offIcon('es');
      // hide little icon on speach top left of screen
    }
  }

  pttDisplay() {
    const { total, next, operation } = this.state;
    let resultToRender = '';
    if (operation && !next) { resultToRender = total; }
    if (operation && next) { resultToRender = next; }
    if (!operation) { resultToRender = total; }

    talkPolly(this.state, resultToRender || '0');
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
        <a className="brand" href="https://www.carlosanriquez.com">
          <img src="https://img.shields.io/badge/Developed%20by-Carlos%20Anriquez-red" alt="carlos anriquez" />
        </a>
      </div>
    );
  }
}

export default App;
