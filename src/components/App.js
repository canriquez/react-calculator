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
      lang: 'Joanna'
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleKey = this.handleKey.bind(this);
    this.toggleSpeech = this.toggleSpeech.bind(this);
    this.toggleLanguage = this.toggleLanguage.bind(this);
    this.pttDisplay = this.pttDisplay.bind(this);
  }



  handleClick(buttonName) {
    const speechBar = ['Speech', 'En', 'Sp', 'PTT'];

    if (buttonName === 'Speech') {
      this.toggleSpeech();
      return
    }
    if ((buttonName === 'En' || buttonName === 'Sp') && this.state.speech) {
      console.log('about to toggle language')
      this.toggleLanguage();
      return
    } else if (buttonName === 'En' || buttonName === 'Sp') {
      return
    }

    if ((buttonName === 'PTT') && this.state.speech) {
      console.log('about to toggle ptt')
      this.pttDisplay();
      return
    } else if (buttonName === 'PTT') {
      return
    }

    const currentResult = calculate(this.state, buttonName);
    this.setState(currentResult);

    if (this.state.speech && !speechBar.includes(buttonName)) {
      talkPolly(this.state, buttonName);
    }
  }

  handleKey(e) {
    const speechBar = ['Speech', 'En', 'Sp', 'PTT'];
    e.stopPropagation();

    let keyName = e.key;
    if (e.key === 's') {
      this.toggleSpeech()
      return
    };

    if ((keyName === 'l') && this.state.speech) {
      console.log('about to toggle language')
      this.toggleLanguage();
      return
    } else if (keyName === 'l') {
      return
    }

    if ((keyName === 'p') && this.state.speech) {
      console.log('about to toggle ptt')
      this.pttDisplay();
      return
    } else if (keyName === 'p') {
      return
    }

    if (e.key === '/') { keyName = '÷' };
    if (e.key === 'x' || e.key === '*') { keyName = 'x' };
    if (e.key === 'Backspace') { keyName = 'AC' };
    if (e.key === 'Enter') { keyName = '=' };
    if (e.key === '_') { keyName = '+/-' }
    const currentResult = calculate(this.state, keyName);
    this.setState(currentResult);
    if (this.state.speech && !speechBar.includes(keyName)) {
      if (keyName === '-') { keyName = 'minus' };
      if (keyName === 'x' && this.lang === 'Mia') { keyName = 'multiplicado por' };
      if (keyName === 'x' && this.lang === 'Joanna') { keyName = 'multiplied by' };
      if (keyName === '+/-') { keyName = 'negative' };
      if (keyName === 'Shift') { return };

      talkPolly(this.state, keyName);
    }
  }

  toggleSpeech() {
    if (!this.state.speech) {
      talkPolly(this.state, 'Speech enabled.');
      this.setState(state => ({ speech: !state.speech }));
      onBtn('Speech')
      onIcon('speechico')
      onBtn('En');
      onIcon('en');
      //show little icon on speach top left of screen
      //show little icon on English language per default
    } else {
      talkPolly(this.state, 'Speech disabled.');
      this.setState(state => ({ speech: !state.speech }));
      offBtn('Speech')
      offIcon('speechico')
      offBtn('En');
      offBtn('Sp');
      offIcon('es');
      offIcon('en');
      //hide little icon on speach top left of screen
    }
  }

  toggleLanguage() {
    console.log('toggling language')
    if (this.state.lang === 'Joanna') {
      console.log('to Mia');
      this.setState({ lang: 'Mia' }, () => {
        talkPolly(this.state, 'Idioma espanol activado.');
      });
      onBtn('Sp');
      offBtn('En');
      onIcon('es');
      offIcon('en');
      //show little icon on speach top left of screen
      //show little icon on English language per default
    } else {
      console.log('to Joanna');
      this.setState({ lang: 'Joanna' }, () => {
        talkPolly(this.state, 'English language activated.');
      });
      onBtn('En');
      offBtn('Sp');
      onIcon('en');
      offIcon('es');
      //hide little icon on speach top left of screen
    }
  }

  pttDisplay() {
    const { total, next, operation } = this.state;
    let resultToRender = '';
    if (operation && !next) { resultToRender = total; }
    if (operation && next) { resultToRender = next; }
    if (!operation) { resultToRender = total; }
    talkPolly(this.state, resultToRender);
    return
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
        <audio id="polly" >
          <source src="" className="track" type="audio/mpeg" />
        </audio>
        <Display result={resultToRender} />
        <ButtonPanel clickHandler={this.handleClick} />
      </div>
    );
  }
}

export default App;
