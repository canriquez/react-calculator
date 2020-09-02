import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

const ButtonPanel = props => {


  const handleClick = buttonName => {
    props.clickHandler(buttonName);
  };

  const panelKeys = {
    0: ['Speech', 'En', 'Sp', 'PTT'],
    1: ['AC', '+/-', '%', '÷'],
    2: ['7', '8', '9', 'x'],
    3: ['4', '5', '6', '-'],
    4: ['1', '2', '3', '+'],
    5: ['0', '.', '='],
  };

  const buttonType = (bttn) => {
    if (panelKeys[0].includes(bttn)) { return 1 }
    if (bttn === '0') { return 3 }
    return 2
  }

  const panelTag = [];

  Object.keys(panelKeys).forEach(key => {
    panelTag.push(
      <div className="buttonRow" key={`row_${key}`}>
        {panelKeys[key].map((bttn, i) => (
          <Button
            clickHandler={handleClick}
            key={`btn_${bttn}`}
            buttonName={bttn}
            wide={buttonType(bttn)}
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

ButtonPanel.defaultProps = {
  clickHandler: null,
};
ButtonPanel.propTypes = {
  clickHandler: PropTypes.func,
};

export default ButtonPanel;
