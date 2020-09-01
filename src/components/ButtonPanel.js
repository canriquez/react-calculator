import React from 'react';
import Button from './Button';

const ButtonPanel = (props) => {

  const handleClick = (buttonName) => {
    console.log('back in Panel, butonName is : ' + buttonName)
    props.clickHandler(buttonName);
  }

  const panelKeys = {
    1: ['AC', '+/-', '%', '÷'],
    2: ['7', '8', '9', 'x'],
    3: ['4', '5', '6', '-'],
    4: ['1', '2', '3', '+'],
    5: ['0', '.', '='],
  };
  const panelTag = [];

  Object.keys(panelKeys).forEach(key => {
    panelTag.push(
      <div className="buttonRow" key={`row_${key}`}>
        {panelKeys[key].map((bttn, i) => (
          <Button
            clickHandler={handleClick}
            key={`btn_${bttn}`}
            buttonName={bttn}
            wide={bttn === '0'}
            color={i !== panelKeys[key].length - 1 ? 'gray' : 'orange'}
          />
        ))}
      </div>,
    );
  });

  return (
    <div id="button-panel">
      {panelTag}
    </div>

  );
};

export default ButtonPanel;
