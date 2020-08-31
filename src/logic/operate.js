
import Big from 'big.js'
const operate = (numberOne, numberTwo, operation) => {

    switch (operation) {
        case '÷':
            return Big(Big(numberOne) / Big(numberTwo));
            break;
        case 'x':
            return Big(Big(numberOne) * Big(numberTwo));
            break;
        case '-':
            return Big(Big(numberOne) - Big(numberTwo));
            break;
        case '+':
            return Big(Big(numberOne) + Big(numberTwo));
            break;
    }
}

export default operate;