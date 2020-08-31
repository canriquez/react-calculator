import React from 'react';
import PropTypes from 'prop-types';

const Display = props => {
  const { result } = props;
  return (

    <div id="displayWrap">
      <h2 id="displayNumbers">
        {result}
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
