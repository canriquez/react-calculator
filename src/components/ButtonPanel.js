import React from 'react';
import Button from './Button'

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
        panelTag.push(<div key={'row_' + key}> {
            panelKeys[key].map(bttn =>
                <Button
                    key={'btn_' + bttn}
                    buttonName={bttn}
                    buttonType={bttn === '0' ? 'zeroBtn' : 'allBtn'}
                />
            )
        } </div>);
    });

    return (
        <div className="pannelBoard">
            {panelTag}
        </div>

    )
}

export default ButtonPanel;