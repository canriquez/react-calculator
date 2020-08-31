
import operate from './operate.js'
import Big from 'big.js'

const calculate = (calcData, buttonName) => {

    let { total, next, operation } = calcData;

    console.log('button name llega: ' + buttonName)

    if (buttonName === '+/-') {

        console.log('we got in plus minus');
        if (operation) {
            return {
                total,
                next: (Big(next).times(-1)).toString(),
                operation
            }
        } else {
            return {
                total: (Big(total).times(-1)).toString(),
                next,
                operation
            }
        }
    }

    if (buttonName === '%') {
        if (operation) {
            console.log('operation existe y es %');
            return {
                total: (Big(operate(total, next, operation)).div(100)).toString(),
                next: null,
                operation: null
            }
        } else {
            return {
                total: (Big(total).div(100).toString()),
                next,
                operation
            }
        }
    }

    if (buttonName === 'AC') {
        return {
            total: null,
            next: null,
            operation: null
        };
    }

    if (buttonName === '=') {
        if (operation) {
            console.log('operation existe y es =');
            return {
                total: (parseFloat(operate(total, next, operation))).toString(),
                next: next,
                operation: null
            }
        } else {
            return {
                total: total,
                next: next,
                operation
            }
        }
    }

    //If button name has an operator other than the previous cases
    // I consider it can only be [÷x-+]

    if (buttonName && total && next) {
        console.log('is an exception');
        //User wants to add a new operation. so we solve the current first
        return {
            total: (parseFloat(operate(total, next, operation))).toString(),
            next: null,
            operation: buttonName
        }
    } else {
        //if user hit operations but total and next are null, we do nothing and come back
        return {
            total,
            next,
            operation
        }
    }

}


export default calculate;