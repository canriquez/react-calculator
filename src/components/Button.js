import React from 'react';
import PropTypes from 'prop-types';

const Button = props => {
  const { buttonName, buttonType } = props;
  return (
    <button
      type="button"
      key={`tecla_${buttonName}`}
      className={buttonType}
    >
      {' '}
      {buttonName}
      {' '}
    </button>
  );
};

Button.defaultProps = {
  buttonName: 'H',
  buttonType: '',
};
Button.propTypes = {
  buttonName: PropTypes.string,
  buttonType: PropTypes.string,
};

export default Button;
