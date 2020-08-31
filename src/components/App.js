import React from 'react';
import Display from './Display';
import ButtonPanel from './ButtonPanel';
// eslint-disable-next-line
import calculate from '../logic/calculate'

const obj = {
  total: '10',
  next: '30',
  operation: null
}

let result = calculate(obj, '%')
console.log(result.total)

const App = () => (
  <div id="app-container">
    <Display result={result.total} />
    <ButtonPanel />
  </div>
);

export default App;
