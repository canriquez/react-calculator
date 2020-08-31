import React from 'react';
import Big from 'big.js';
import Display from './Display';
import ButtonPanel from './ButtonPanel';

const x = Big(0.002).toString();

const App = () => (
  <>
    <Display result={x} />
    <ButtonPanel />
  </>
);

export default App;
