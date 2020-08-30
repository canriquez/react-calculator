import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Big from 'big.js';

const x = Big(1.023);

const theBestString = `The Best Calc App - v${x}`;

ReactDOM.render(
  <div>
    <h1>{theBestString}</h1>
  </div>,
  document.getElementById('root'),
);
