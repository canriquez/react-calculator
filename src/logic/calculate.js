
const calculate = (calcData, buttonName) => {

    const { total, next, operation } = calcData;
    if (buttonName('+/-')) {
        return calcData.total *= -1
    }

    switch (buttonName) {
        case '÷':
            return calcData.total *= -1;
            break;
        case 'AC':
            return calcData.total = 0;
            break;
        case '%':
            return calcData.total /= 100;
            break;
    }
}


export default calculate;