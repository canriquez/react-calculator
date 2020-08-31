
import Big from 'big.js/big.mjs'

const operate = (numberOne, numberTwo, operation) => {

    const nOne = Big(numberOne);
    const nTwo = Big(numberTwo);
    console.log('n1: ' + nOne);
    console.log('n2: ' + nTwo);

    /*     if (operation === '+') {
            console.log('es una suma');
            return nOne.plus(nTwo);
        }
    
        if (operation === '-') {
            console.log('es una suma');
            return nOne.plus(nTwo);
        } */

    switch (operation) {
        case '÷':
            return (nOne / nTwo).toString();
        case 'x':
            return (nOne * nTwo).toString();
        case '-':
            console.log('es una resta en switch');
            return nOne.minus(nTwo).toString();
        case '+':
            console.log('es una suma en switch');
            return nOne.plus(nTwo).toString();
        default:
            return 'error'
    }
}

export default operate;