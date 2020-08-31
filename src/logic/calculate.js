
import operate from './operate.js'
import Big from 'big.js'

const calculate = (calcData, buttonName) => {

    let { total, next, operation } = calcData;

    console.log('button name llega: ' + buttonName)

    if (buttonName === '+/-') {
        if (operation) {
            return {
                total,
                next: (parseFloat(next) * -1).toString(),
                operation
            }
        } else {
            return {
                total: (parseFloat(total) * -1).toString(),
                next,
                operation
            }
        }
    }

    if (buttonName === '%') {
        if (operation) {
            console.log('operation existe y es %');
            return {
                total: (parseFloat(operate(total, next, operation)) / 100).toString(),
                next: null,
                operation: null
            }
        } else {
            return {
                total: (parseFloat(total) * -1).toString(),
                next,
                operation
            }
        }
    }

    /*     switch (buttonName) {
    
            case '÷':
                total /= 100;
                return {
                    total: (Big(total) / 100).toString(),
                    next: (Big(next) / 100).toString(),
                    operation
                };
    
            case 'AC':
                return {
                    total: null,
                    next: null,
                    operation: null
                };
            case '=':
                return {
                    total, next, operation
                };
            default:
                return {
                    total: operate(total, next, buttonName),
                    next,
                    operation
                }
    
        } */
}


export default calculate;