import React from 'react';
import Big from 'big.js';
import Display from './Display';
import ButtonPanel from './ButtonPanel';

const x = Big(0.002).toString();

const App = () => (
  <div id="app-container">
    <Display result={x} />
    <ButtonPanel />
  </div>
);

export default App;
