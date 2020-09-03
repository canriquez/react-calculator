import React from 'react';
import PropTypes from 'prop-types';
import speech from '../assets/icons/speech.svg';

const Display = props => {
  const { result } = props;
  return (

    <div id="display-container">
      <img id="speechico" src={speech} className="speech-icon offIcon" alt="S" />
      <span id="en" className="lang-icon offIcon">En</span>
      <span id="es" className="lang-icon offIcon">Sp</span>
      <h2 id="displayNumbers">
        {result || '0'}
      </h2>
    </div>
  );
};

// Defaults and proptypes
Display.propTypes = {
  result: PropTypes.string,
};

Display.defaultProps = {
  result: '0',
};

export default Display;
