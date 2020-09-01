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
                next,
                operation: null,
            };
        }
        return {
            total,
            next,
            operation,
        };
    }

    // If button name has an operator other than the previous cases
    // I consider it can only be [÷x-+]

    /* if (buttonName && total && next) {
        // User wants to add a new operation. so we solve the current first
        return {
            total: operate(total, next, operation),
            next: null,
            operation: buttonName,
        };
    } */

    if (isOperation(buttonName) && total && !operation) {
        console.log('first number is there, catching now next :');
        return {
            total,
            next,
            operation: buttonName,
        };
    }

    //if user his a number key, we start constructing the operations input

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
        console.log('nothing to do or calculate')
    };
};

export default calculate;
