import React from 'react';
import PropTypes from 'prop-types';

const Display = props => {
    const { result } = props;
    return (

        <div id="displayWrap">
            <h2 className="displayNumbers">
                {result}
            </h2>
        </div>
    );
};

//Defaults and proptypes
Display.propTypes = {
    result: PropTypes.string,
};

Display.defaultProps = {
    result: '0.0',
};


const Button = props => {
    const { buttonName, buttonType } = props;
    return (
        <p key={'tecla_' + buttonName} className={buttonType} > {buttonName} </p>
    )
}

Button.defaultProps = {
    buttonName: 'H',
};
Button.propTypes = {
    buttonName: PropTypes.string,
    buttonType: PropTypes.string,
};

const ButtonPanel = props => {

    const panelKeys = {
        1: ['AC', '+/-', '%', '÷'],
        2: ['7', '8', '9', 'X'],
        3: ['4', '5', '6', '-'],
        4: ['1', '2', '3', '+'],
        5: ['0', '.', '=']
    }
    let panelTag = []
    Object.keys(panelKeys).forEach(key => {
        //console.log(key, panelKeys[key]);
        if (key === '5') { console.log(' i am n 5') }
        //panelTag.push('<div>');
        panelTag.push(<div key={'row_' + key}> {
            panelKeys[key].map(bttn =>
                <Button
                    key={'btn_' + bttn}
                    buttonName={bttn}
                    buttonType={bttn === '0' ? 'zeroBtn' : 'allBtn'}
                />
            )
        } </div>);
        //panelTag.push('</div>');
        console.log(panelTag);
    });

    return (
        <>
            <h1>
                Here is the Pannel
        </h1>
            <div className="pannelBoard">
                {panelTag}
            </div>
        </>
    )
}

export { Display, ButtonPanel };