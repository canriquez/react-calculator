
import Big from 'big.js/big.mjs'

const operate = (numberOne, numberTwo, operation) => {

    const nOne = Big(numberOne);
    const nTwo = Big(numberTwo);

    switch (operation) {
        case '÷':
            console.log('es una div en switch');
            if (numberTwo === 0) {
                console.log('nTwo is zero');
                return 'infinit'
            } else {
                return nOne.div(nTwo).toString();
            }
        case 'x':
            console.log('es una mult en switch');
            return nOne.times(nTwo).toString();
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