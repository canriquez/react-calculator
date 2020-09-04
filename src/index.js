import React from 'react';
import ReactDOM from 'react-dom';
import TagManager from 'react-gtm-module';
import './index.css';
import App from './components/App';

const tagManagerArgs = {
  gtmId: 'GTM-MWKTMHC',
};

TagManager.initialize(tagManagerArgs);

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);
