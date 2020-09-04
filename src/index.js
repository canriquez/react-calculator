import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import TagManager from 'react-gtm-module'

const tagManagerArgs = {
  gtmId: 'GTM-MWKTMHC'
}

TagManager.initialize(tagManagerArgs)

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);
