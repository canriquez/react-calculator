import React from 'react';
import PropTypes from 'prop-types';

const Button = props => {
  const { buttonName, wide, color } = props;
  let buttonStyles = '';
  if (wide) {
    buttonStyles += 'wide button';
  } else {
    buttonStyles += 'small button';
  }
  buttonStyles += ` ${color}`;

  return (
    <button
      type="button"
      key={`tecla_${buttonName}`}
      className={buttonStyles}
    >
      {' '}
      {buttonName}
      {' '}
    </button>
  );
};

Button.defaultProps = {
  buttonName: '',
  wide: false,
  color: 'orange',
};
Button.propTypes = {
  buttonName: PropTypes.string,
  wide: PropTypes.bool,
  color: PropTypes.string,
};

export default Button;
