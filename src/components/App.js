import React from 'react';
import Display from './Display';
import ButtonPanel from './ButtonPanel';
import Big from 'big.js';

const x = Big(0.002).toString();

const App = () => {

    return (
        <>
            <Display result={x} />
            <ButtonPanel />
        </>
    )

}

export default App;