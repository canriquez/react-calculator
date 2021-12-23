/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import Display from './Display';
import ButtonPanel from './ButtonPanel';
import calculate from '../logic/calculate';
import talkPolly from '../logic/polly';
import {
  onBtn, offBtn, onIcon, offIcon, key2Click,
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
      lang: 0,
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleKey = this.handleKey.bind(this);
    this.toggleSpeech = this.toggleSpeech.bind(this);
    this.toggleLanguage = this.toggleLanguage.bind(this);
    this.pttDisplay = this.pttDisplay.bind(this);
  }

  componentDidMount() {
    document.title = 'Accesible React Calculator';
    document.body.addEventListener('keydown', this.handleKey);
  }

  handleClick(buttonName) {
    // eslint-disable-next-line
    const {
      speech, lang,
    } = this.state;

    if (buttonName === 'Speech') {
      this.toggleSpeech(buttonName);
      return;
    }
    if ((buttonName === 'En' || buttonName === 'Sp') && speech) {
      this.toggleLanguage(buttonName);
      return;
    } if (buttonName === 'En' || buttonName === 'Sp') {
      return;
    }

    if ((buttonName === 'PTT') && speech) {
      this.pttDisplay(buttonName);
      return;
    } if (buttonName === 'PTT') {
      return;
    }

    const currentResult = calculate(this.state, buttonName);
    this.setState(currentResult, () => {
      let ttSpeech = buttonName;
      if (speech) {
        if (buttonName === '-' && lang === 0) { ttSpeech = 'minus'; }
        if (buttonName === 'x' && lang === 1) { ttSpeech = 'multiplicado por'; }
        if (buttonName === '÷' && lang === 1) { ttSpeech = 'dividido entre'; }
        if (buttonName === '-' && lang === 1) { ttSpeech = 'menos'; }
        if (buttonName === 'x' && lang === 0) { ttSpeech = 'multiplied by'; }
        if (buttonName === '+/-' && lang === 0) { ttSpeech = 'negative'; }
        if (buttonName === '+/-' && lang === 1) { ttSpeech = 'negativo'; }

        if (ttSpeech === '=') {
          this.pttDisplay('= ');
        } else {
          talkPolly(this.state, ttSpeech, buttonName);
        }
      }
    });
  }

  handleKey(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
    }
    const {
      speech, lang,
    } = this.state;
    const allowedKeys = ['s', 'l', 'p', 'Enter', 'Backspace',
      '%', '/', '7', '8', '9', 'x', '4', '5', '6',
      '-', '_', '*', '1', '2', '3', '+', '0', '.', '='];

    if (!allowedKeys.includes(e.key)) { return; }
    e.stopPropagation();

    let keyName = e.key;
    if (e.key === 's') {
      this.toggleSpeech(key2Click(e.key));
      return;
    }

    if ((keyName === 'l') && speech) {
      this.toggleLanguage(key2Click(e.key));
      return;
    } if (keyName === 'l') {
      return;
    }

    if ((keyName === 'p') && speech) {
      this.pttDisplay(key2Click(e.key), '');
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
    if (speech) {
      if (keyName === '-' && lang === 0) { keyName = 'minus'; }
      if (keyName === '-' && lang === 1) { keyName = 'menos'; }
      if (keyName === 'x' && lang === 1) { keyName = 'multiplicado por'; }
      if (keyName === '÷' && lang === 1) { keyName = 'dividido entre'; }
      if (keyName === 'x' && lang === 0) { keyName = 'multiplied by'; }
      if (keyName === '+/-' && lang === 0) { keyName = 'negative'; }
      if (keyName === '+/-' && lang === 1) { keyName = 'negativo'; }
      if (keyName === 'Shift') { return; }
      if (keyName === '=' || keyName === 'Enter') {
        this.pttDisplay('= ');
      } else {
        talkPolly(this.state, keyName, key2Click(e.key));
      }
    }
  }

  toggleSpeech(buttonName) {
    const { speech } = this.state;
    if (!speech) {
      talkPolly(this.state, 'Speech enabled.', buttonName);
      this.setState(state => ({ speech: !state.speech }));
      onBtn('Speech');
      onIcon('speechico');
      onBtn('En');
      onIcon('en');
      // show little icon on speach top left of screen
      // show little icon on English language per default
    } else {
      talkPolly(this.state, 'Speech disabled.', buttonName);
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

  toggleLanguage(buttonName) {
    const { lang } = this.state;
    if (lang === 0) {
      this.setState({ lang: 1 }, () => {
        talkPolly(this.state, 'espanol activado.', buttonName);
      });
      onBtn('Sp');
      offBtn('En');
      onIcon('es');
      offIcon('en');
      // show little icon on speach top left of screen
      // show little icon on English language per default
    } else {
      this.setState({ lang: 0 }, () => {
        talkPolly(this.state, 'English activated.', buttonName);
      });
      onBtn('En');
      offBtn('Sp');
      onIcon('en');
      offIcon('es');
      // hide little icon on speach top left of screen
    }
  }

  pttDisplay(buttonName, txt = '') {
    const { total, next, operation } = this.state;
    let resultToRender = '';
    if (operation && !next) { resultToRender = total; }
    if (operation && next) { resultToRender = next; }
    if (!operation && total) { resultToRender = total; }
    resultToRender = txt + resultToRender;
    if (resultToRender === '') { resultToRender = '= 0'; }

    talkPolly(this.state, resultToRender, buttonName);
  }

  render() {
    const { total, next, operation } = this.state;
    let resultToRender = '';
    if (operation && !next) { resultToRender = total; }
    if (operation && next) { resultToRender = next; }
    if (!operation) { resultToRender = total; }

    return (
      <div id="app-container">
        {/*  <audio id="polly">
          <source src="" className="track" type="audio/mpeg" />
        </audio> */}
        <Display result={resultToRender} />
        <ButtonPanel clickHandler={this.handleClick} />
        <a id="brand" className="brand" href="https://github.com/canriquez">
          <img src="https://img.shields.io/badge/Developed%20by-Carlos%20Anriquez-red" alt="carlos anriquez" />
        </a>
        <a id="repo" className="repo" href="https://github.com/canriquez/react-calculator">
          <img src="https://img.shields.io/badge/Github-Repo-green" alt="repo" />
        </a>
      </div>
    );
  }
}

export default App;
