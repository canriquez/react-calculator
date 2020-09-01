import Big from 'big.js';
import operate from './operate';

const calculate = (calcData, buttonName) => {
    let { total, next, operation } = calcData;
    const operationTypes = ['+', '-', '÷', 'x']


    const isOperation = (ops) => {
        return operationTypes.includes(ops);
    }

    if (buttonName === '+/-') {
        if (operation) {
            return {
                total,
                next: (Big(next).times(-1)).toString(),
                operation,
            };
        }
        return {
            total: (Big(total).times(-1)).toString(),
            next,
            operation,
        };
    }

    if (buttonName === '%') {
        if (operation) {
            return {
                total: (Big(operate(total, next, operation)).div(100)).toString(),
                next: null,
                operation: null,
            };
        }
        return {
            total: (Big(total).div(100).toString()),
            next,
            operation,
        };
    }

    if (buttonName === 'AC') {
        //clear second number in the operation
        if (next && operation) {
            return {
                total,
                next: null,
                operation,
            };
        }
        return {
            total: null,
            next: null,
            operation: null,
        };
    }

    if (buttonName === '=') {
        if (operation) {
            return {
                total: (parseFloat(operate(total, next, operation))).toString(),
                next: null,
                operation: null,
            };
        }
        return {
            total,
            next,
            operation,
        };
    }

    //if user hist and operation after valid first number

    if (isOperation(buttonName) && total && !operation) {
        console.log('first number is there, catching now next :');
        return {
            total,
            next,
            operation: buttonName,
        };
    }
    // if user hist operation instead of '='. (solve opeartions concatenation)
    if (isOperation(buttonName) && total && operation) {
        console.log('first number is there, catching now next :');
        return {
            total: Big(operate(total, next, operation)).toString(),
            next: null,
            operation: buttonName,
        };
    }

    //if user hits a number key, we start constructing the operations input

    if (buttonName.match(/\d/)) {
        console.log('it is a number')
        if (!operation) { // is the first number
            console.log('first number')
            !total ? total = buttonName : total += buttonName;
        } else {
            console.log('second number')
            !next ? next = buttonName : next += buttonName;
        }
        return {
            total,
            next,
            operation,
        }

    } else {
        // if user hit operations but total and next are null, we do nothing and come back
        if (buttonName === '.' && (total || next)) {
            //if total gets a valid decimal period
            if (!next && !total.includes('.')) {
                return {
                    total: total += '.',
                    next,
                    operation
                }
            } else if (!next.includes('.')) {
                //if total next a valid decimal period
                return {
                    total,
                    next: next += '.',
                    operation
                }
            }

        }

        console.log('nothing to do or calculate')
    };
};

export default calculate;
