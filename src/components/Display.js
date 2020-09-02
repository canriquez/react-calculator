import React from 'react';
import PropTypes from 'prop-types';

const Display = props => {
  const { result } = props;
  return (

    <div id="display-container">
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
