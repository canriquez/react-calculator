import React from 'react';
import PropTypes from 'prop-types';

const Display = props => {
  //const { result } = props;

  console.log('props in display :' + props.result)
  return (

    <div id="display-container">
      <h2 id="displayNumbers">
        {props.result || '0'}
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
