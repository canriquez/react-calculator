import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Big from 'big.js';
import { Display, ButtonPanel } from './components/App';

const x = Big(0.023);

const theBestString = `The Best Calc App - v${x}`;

ReactDOM.render(
  <div>
    <h1>{theBestString}</h1>
    <Display result="22.234" />
    <ButtonPanel />
  </div>,
  document.getElementById('root'),
);
