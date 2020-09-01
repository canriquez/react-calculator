import Big from 'big.js';
import { render } from '@testing-library/react';
import operate from './operate';

const calculate = (calcData, buttonName) => {
    let { total, next, operation } = calcData;
    const operationTypes = ['+', '-', '÷', 'x'];

    const isOperation = ops => operationTypes.includes(ops);

    if (buttonName === '+/-') {
        if (operation && next != '0') {
            return {
                total,
                next: (Big(next).times(-1)).toString(),
                operation,
            };
        }
        if (!total || total === '0') { return { total, next, operation } }
        return {
            total: (Big(total).times(-1)).toString(),
            next,
            operation,
        };
    }
    // applies percentage calculation
    if (buttonName === '%') {
        // when operation exist, applies to the percent to total after
        // executing operation
        if (operation) {
            return {
                total: (Big(operate(total, next, operation)).div(100)).toString(),
                next: null,
                operation: null,
            };
        }
        // when no operation exist, applies percent to total only
        return {
            total: (Big(total).div(100).toString()),
            next,
            operation,
        };
    }

    if (buttonName === 'AC') {
        // clear second number in the operation
        if (next && operation) {
            return {
                total,
                next: '0',
                operation,
            };
        }
        return {
            total: null,
            next: null,
            operation: null,
        };
    }

    // If use hits equal

    if (buttonName === '=') {
        if (operation) {
            // when opertion exist. executes the operation
            return {
                total: operate(total, next, operation),
                next: null,
                operation: null,
            };
        }
        // If no operation exist, exits with no change
        return {
            total,
            next,
            operation,
        };
    }

    // if user hist an operation after valid first number
    if (isOperation(buttonName) && total && !operation) {
        // store operation when no operation exists.
        console.log('first number is there, catching now next :');
        return {
            total,
            next,
            operation: buttonName,
        };
    }
    // if user hist another operation with total and next. (solve opeartions concatenation)
    if (isOperation(buttonName) && total && operation) {
        // solves the current operatoin. clear next and stores new operation
        console.log('first number is there, catching now next :');
        return {
            total: Big(operate(total, next, operation)).toString(),
            next: null,
            operation: buttonName,
        };
    }

    // if user hits a number key, we start constructing the operations input

    if (buttonName.match(/\d/)) {
        console.log('it is a number');
        if (!operation) {
            // builds first number
            console.log('first number');
            !total ? total = buttonName
                : ((total === '0' || total === 'Error')
                    ? total = buttonName : total += buttonName);
        } else {
            // builds second number.
            console.log('second number');
            !next ? next = buttonName
                : (next === '0' ? next = buttonName : next += buttonName);
        }
        return {
            total,
            next,
            operation,
        };
    }
    // if user hit operations but total and next are null, we do nothing and come back
    if (buttonName === '.' && (total || next)) {
        // if total gets a valid decimal period
        if (!next && !total.includes('.')) {
            return {
                total: total += '.',
                next,
                operation,
            };
        } if (!next.includes('.')) {
            // if next gets a valid decimal period
            return {
                total,
                next: next += '.',
                operation,
            };
        }
    }

    console.log('nothing to do or calculate');
};

export default calculate;
